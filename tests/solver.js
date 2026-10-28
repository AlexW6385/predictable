// beam-search solver over macro actions, using the game's debug snapshot/restore
window.SOLVE = (() => {
  const g = window.__pred, T = 32;
  const DIRS = {R:{right:true}, L:{left:true}, N:{}};
  function macros(o){
    const ms = [], len = o.len || 8;
    for (const d of o.dirs || ['R', 'L', 'N']) ms.push({name:d, n:len, f: () => ({k:DIRS[d], edge:false})});
    for (const d of o.jdirs || ['R', 'L', 'N']) for (const h of o.holds || [1, 5, 10, 30]) ms.push({name:'J' + d + h, n:Math.max(len, Math.min(h, 16)), f: i => ({k:Object.assign({jump: i < h}, DIRS[d]), edge: i === 0, hold:h})});
    if (o.extra) ms.push(...o.extra);
    return ms;
  }
  function doorPos(){ const d = g.ents.find(e => e.t === 'door' && e.alive !== false); return d ? {x:d.x + 18, y:d.y + 28} : {x:28*T, y:420}; }
  // run one macro from current state; returns 'play'|'dead'|'clear'|...
  // a jump hold that is longer than the macro carries on into the next macro (P.holdLeft)
  function exec(m, carry){
    let hold = carry || 0;
    for (let i = 0; i < m.n; i++) {
      const a = m.f(i); const k = Object.assign({left:false, right:false, jump:false}, a.k);
      if (hold > 0 && !a.edge) { k.jump = true; hold--; }
      if (a.edge) hold = Math.max(0, (a.hold || 1) - m.n);
      Object.assign(g.keys, k); if (a.edge) g.jump(); if (a.press) g.press(); g.step();
      if (g.state !== 'play') return {st: g.state === 'clear' && g.S.fake ? 'fake' : g.state, i, hold};
    }
    return {st:'play', i:m.n, hold};
  }
  function solve(L, o){
    o = o || {}; const ms = macros(o), W = o.beam || 120, D = o.depth || 90;
    if (o.setup) o.setup(); else g.setLvl(L);
    const dp = o.door || doorPos();
    const score = o.score || (() => -Math.abs(g.P.x + 11 - dp.x) - 0.6*Math.abs(g.P.y + 14 - dp.y));
    const key = o.key || (() => '');
    let beam = [{z:g.snap(), seq:[], hold:0, sc:score()}];
    const seen = new Set(); let nodes = 0;
    for (let d = 0; d < D; d++) {
      const next = new Map();
      for (const nd of beam) for (const m of ms) {
        g.restore(nd.z); nodes++;
        const r = exec(m, nd.hold);
        if (r.st === 'clear' || r.st === 'win') return {ok:true, seq:nd.seq.concat(m.name), depth:d + 1, nodes};
        if (r.st !== 'play') continue;
        const P = g.P, kk = [Math.round(P.x/3), Math.round(P.y/3), Math.round(P.vx*2), Math.round(P.vy), P.on ? 1 : 0, r.hold > 0 ? 1 : 0, key()].join(',');
        const sc = score() + (o.bonus ? o.bonus() : 0);
        const old = next.get(kk); if (!old || old.sc < sc) next.set(kk, {z:g.snap(), seq:nd.seq.concat(m.name), hold:r.hold, sc, bk: Math.floor(P.x/32) + ',' + Math.floor(P.y/64) + ',' + (P.on ? 1 : 0) + ',' + key()});
      }
      const all = [...next.values()].sort((a, b) => b.sc - a.sc), per = new Map(), pick = [], rest = [];
      for (const n of all) { const c = per.get(n.bk) || 0; if (c < (o.perBucket || 3)) { per.set(n.bk, c + 1); pick.push(n); } else rest.push(n); }
      beam = pick.slice(0, W); if (beam.length < W) beam = beam.concat(rest.slice(0, W - beam.length));
      if (o.dbg) o.dbg.push(d + ': ' + beam.slice(0, 5).map(b => b.seq.join(' ') + ' @' + b.sc.toFixed(0)).join(' | '));
      if (!beam.length) return {ok:false, depth:d, nodes};
    }
    return {ok:false, depth:D, nodes, best: beam[0] && beam[0].seq.join(' ')};
  }
  // turn a solution into a per-frame strategy for LIB.run
  function strat(seq, o){
    o = o || {}; const ms = macros(o), by = Object.fromEntries(ms.map(m => [m.name, m]));
    const frames = []; let hold = 0;
    for (const nm of seq) { const m = by[nm]; for (let i = 0; i < m.n; i++) { const a = m.f(i); const k = Object.assign({left:false, right:false, jump:false}, a.k);
      if (hold > 0 && !a.edge) { k.jump = true; hold--; } if (a.edge) hold = Math.max(0, (a.hold || 1) - m.n); frames.push({k, edge:a.edge, press:a.press}); } }
    return frames;
  }
  // replay frames from the current state; returns final state string
  function replay(frames){ for (const fr of frames) { Object.assign(g.keys, fr.k); if (fr.edge) g.jump(); if (fr.press) g.press(); g.step(); if (g.state !== 'play') break; }
    return g.state === 'dead' ? 'dead@' + ((g.P.x + 11)/T).toFixed(1) : g.state === 'clear' ? (g.S.fake ? 'fake' : 'clear') : g.state === 'play' ? 'timeout' : g.state; }
  return {solve, strat, replay, macros};
})();
// navigate from the current state to a spot (x in tiles, y = feet y), by beam search; executes it.
window.SOLVE.reach = function(x, y, o){
  o = o || {}; const g = window.__pred, T = 32;
  const done = () => g.state === 'clear' || (g.P.on && Math.abs(g.P.x + 11 - x*T) < (o.tol || 10) && Math.abs(g.P.y + 28 - y) < 6);
  if (done()) return {ok:true};
  const ms = SOLVE.macros(o); const W = o.beam || 80, D = o.depth || 60;
  const score = () => -Math.abs(g.P.x + 11 - x*T) - 0.8*Math.abs(g.P.y + 28 - y);
  const z0 = g.snap(); let beam = [{z:z0, seq:[], hold:0}];
  for (let d = 0; d < D; d++) { const next = new Map();
    for (const nd of beam) for (const m of ms) { g.restore(nd.z);
      let hold = nd.hold, st = 'play';
      for (let i = 0; i < m.n; i++) { const a = m.f(i); const k = Object.assign({left:false, right:false, jump:false}, a.k); if (hold > 0 && !a.edge) { k.jump = true; hold--; } if (a.edge) hold = Math.max(0, (a.hold || 1) - m.n);
        Object.assign(g.keys, k); if (a.edge) g.jump(); g.step(); if (g.state !== 'play' || done()) break; }
      if (g.state === 'dead') continue;
      const seq = nd.seq.concat(m.name);
      if (done()) { g.restore(z0); const fr = SOLVE.strat(seq, o); for (const f of fr) { Object.assign(g.keys, f.k); if (f.edge) g.jump(); g.step(); if (g.state !== 'play' || done()) break; } return {ok:true, seq}; }
      const P = g.P, kk = [Math.round(P.x/3), Math.round(P.y/3), Math.round(P.vx*2), Math.round(P.vy), P.on ? 1 : 0, hold > 0 ? 1 : 0].join(',');
      const sc = score(); const old = next.get(kk); if (!old || old.sc < sc) next.set(kk, {z:g.snap(), seq, hold, sc, bk:Math.floor(P.x/32) + ',' + Math.floor(P.y/64) + ',' + (P.on?1:0)}); }
    const all = [...next.values()].sort((a, b) => b.sc - a.sc), per = new Map(), pick = [], rest = [];
    for (const n of all) { const c = per.get(n.bk) || 0; if (c < 3) { per.set(n.bk, c + 1); pick.push(n); } else rest.push(n); }
    beam = pick.slice(0, W); if (beam.length < W) beam = beam.concat(rest.slice(0, W - beam.length)); if (!beam.length) break; }
  g.restore(z0); return {ok:false};
};
// run a level as a list of legs: [x, y] (navigate there) or a number (wait frames) or a function(P) -> keys until it returns null
window.SOLVE.legs = function(L, legs, o){
  o = o || {}; const g = window.__pred, T = 32; if (o.freshMem !== false) g.prof.mem = null; g.setLvl(L);
  for (const leg of legs) { if (g.state !== 'play') break;
    if (typeof leg === 'number') { for (let i = 0; i < leg && g.state === 'play'; i++) { Object.assign(g.keys, {left:false, right:false, jump:false}); g.step(); } continue; }
    if (typeof leg === 'function') { for (let i = 0; i < 3000 && g.state === 'play'; i++) { const k = leg(g.P); if (!k) break; Object.assign(g.keys, Object.assign({left:false, right:false, jump:false}, k)); if (k.edge) g.jump(); g.step(); } continue; }
    const r = SOLVE.reach(leg[0], leg[1], leg[2]); if (!r.ok) return 'stuck@' + leg[0] + ',' + leg[1]; }
  for (let i = 0; i < (o.after || 120) && g.state === 'play'; i++) { Object.assign(g.keys, {left:false, right:false, jump:false}); g.step(); }
  return g.state === 'dead' ? 'dead@' + ((g.P.x + 11)/T).toFixed(1) : g.state === 'clear' ? (g.S.fake ? 'fake' : 'clear') : g.state === 'play' ? 'timeout' : g.state;
};
