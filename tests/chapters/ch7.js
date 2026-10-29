(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const clean = id => { g.prof.marks[id] = []; };
  // ---- 61 bodies
  const build61 = (prehop) => life => { let hopped = !prehop; return P => {
      if (!hopped) { if (P.on && cx() > 2.4*T) { hopped = true; return {jump:1, dir:0}; } return R(); }
      const crates = g.ents.filter(e => e.t === 'crate' && e.set !== g.S.tog).map(e => e.x + 16).sort((a,b) => a-b), pc = cx();
      if (!P.on) return R();
      if (pc > 24.5*T) return R();
      const nxt = crates.filter(x => x > pc + 20 && x < pc + 170);
      if (25.6*T - pc < 168 && P.y > 380) return {jumpTo:26.2*T, landY:448, tol:24, k:{right:true}};
      if (nxt.length) return {jumpTo: nxt[nxt.length-1], landY:432, tol:9, k:{right:true}};
      if (pc > 3.6*T) return {jump:30, dir:1};
      return R(); }; };
  check('61 refuse to die (wait at the edge)', run(60, () => script([S.R(3.4), S.W(3000)]), {max:600, freshMem:true}), 'timeout');
  check('61 build a path of yourself, same rhythm each time', run(60, build61(false), {lives:10, freshMem:true}), 'clear');
  const crates61 = g.prof.mem && g.prof.mem.data.crates ? g.prof.mem.data.crates.length : 0;
  g.setLvl(60);
  check(`61 (same remains, ${crates61}) but hop first`, run(60, build61(true), {lives:1}), 'dead');
  // ---- 62 last time
  check('62 alone', run(61, () => script([S.R(4.5), S.W(40), S.R(9.5), S.J(30, 1), S.R(21.4), S.W(600)]), {freshMem:true, max:1200}), 'timeout');
  check('62 just pass over it, die; then run', run(61, life => life === 0 ? script([S.R(10.5), S.W(100)]) : script([S.R(9.4), S.J(30, 1), S.R(27.5), S.W(600)]), {freshMem:true, lives:2, max:900}), /timeout|dead/);
  check('62 hold it, die; then run', run(61, life => life === 0 ? script([S.R(4.5), S.W(240), S.R(10.5), S.W(100)]) : script([S.R(9.4), S.J(30, 1), S.R(27.5)]), {freshMem:true, lives:3, max:1500}), 'clear');
  // ---- 63 habit
  check('63 run, jump each gap at its edge', run(62, () => P => (P.on && [5.6, 11.6, 17.6].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('63 spam full jumps', run(62, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('63 stop at every edge, then jump', run(62, () => script([S.R(5.4), S.W(25), S.J(30, 1), S.R(11.4), S.W(12), S.J(30, 1), S.R(17.4), S.W(40), S.J(30, 1), S.R(28.5)]), {freshMem:true}), 'clear');
  // ---- 64 habit and shadow
  const gaps64 = [5.6, 11.6, 17.6, 29.6, 35.6, 41.6];
  check('64 run and jump each gap', run(63, () => P => (P.on && gaps64.some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true, max:1500}), 'dead');
  check('64 break the rhythm, take it, walk under at the end', run(63, () => script([S.R(5.4), S.W(20), S.J(30, 1), S.R(11.4), S.W(8), S.J(30, 1), S.R(17.4), S.W(30), S.J(30, 1), S.R(29.5), S.J(30, 1), S.R(35.4), S.W(14), S.J(30, 1), S.R(41.5), S.W(5), S.J(30, 1), S.R(50.4)]), {freshMem:true, max:2000}), 'clear');
  check('64 take it, then wait to think', run(63, () => script([S.R(5.4), S.W(20), S.J(30, 1), S.R(11.4), S.W(8), S.J(30, 1), S.R(17.4), S.W(30), S.J(30, 1), S.R(29.5), S.W(120), S.J(30, 1), S.R(50.4)]), {freshMem:true, max:2000}), 'dead');
  // ---- 65 changed mind
  const upper = () => script([S.JT(4.8, 384), S.JT(8.2, 352, {maxPeak:40, tol:14}), S.R(29)]);
  g.prof.mem = null;
  check('65 alternate corridors (L, U, L)', run(64, life => life % 2 === 0 ? R : upper(), {lives:3, freshMem:true}), 'dead');
  check('65 go back where you died (L, L)', run(64, life => R, {lives:2, freshMem:true}), 'clear');
  // ---- 66 mast
  const dock66 = [S.U(() => g.S.docked), S.W(45), S.R(28.5), S.W(60)];
  const dodge66 = () => P => { if (g.S.docked) return R(); const n = (g.S.notes || []).find(n => Math.abs(n.x - cx()) < 36 && Math.sign(cx() - n.x) === Math.sign(n.vx) && Math.abs(n.vx) > 0);
    if (n && P.on && Math.abs(cx() - g.lv.mx()) > 34) return {jump:30, dir:0}; const bow = g.S.deck.x + 178; if (!P.on) return N(); return cx() < bow - 4 ? R() : cx() > bow + 4 ? Lk() : N(); };
  check('66 ride it loose, in the middle', run(65, () => script([S.R(6.0), S.W(1200)]), {freshMem:true, max:1200}), 'dead');
  check('66 ride it loose, at the bow', run(65, () => script([S.R(9.3), S.W(1200)]), {freshMem:true, max:1200}), 'dead');
  check('66 ride it loose, at the stern', run(65, () => script([S.R(4.6), S.W(1200)]), {freshMem:true, max:1200}), 'dead');
  check('66 (the lock) arrive having heard only two of her notes', run(65, () => script([S.R(6.85), S.W(10), S.J(30, 0), S.U(() => g.S.docked), S.U(() => { g.S.heard[1] = false; return true; }), S.W(45), S.R(28.5), S.W(60)]), {freshMem:true, max:1500}), /dead@2[78]/);
  check('66 bind yourself to the mast, then go', run(65, () => script([S.R(6.85), S.W(10), S.J(30, 0), ...dock66]), {freshMem:true, max:1500}), 'clear');
  check('66 think it over aboard first: the rope is stowed', run(65, () => script([S.R(6.85), S.W(60), S.J(30, 0), S.W(1200)]), {freshMem:true, max:1500}), 'dead');
  check('66 bound, you cannot get off before the ship is in', run(65, () => script([S.R(6.85), S.W(10), S.J(30, 0), S.W(80), S.R(28.5)]), {freshMem:true, max:1500}), /clear|dead/);
  // ---- 67 wanting
  const charge67 = (cond) => ({until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on; }, rule: (P, k, st) => { if (st.air || st.rel) return R(); if (k > 3 && cond()) { st.rel = true; return R(); } return {k:{right:true, jump:true}}; }});
  const p67 = (x, c) => () => script([S.R(8.3), S.W(10), charge67(() => g.S.ch > 0.97), S.R(x), S.W(10), charge67(() => g.S.ch > c), S.R(26.5)]);
  check('67 tap jump', run(66, () => P => P.on && cx() > 8*T ? {jump:1, dir:1} : R(), {freshMem:true, max:600}), 'timeout');
  check('67 all you have, at the foot of the ledge', run(66, p67(21.6, 0.97), {freshMem:true, max:2000}), 'dead');
  check('67 less, at the foot of the ledge', run(66, p67(21.6, 0.75), {freshMem:true, max:2000}), 'clear');
  check('67 all you have, from further back', run(66, p67(18.0, 0.97), {freshMem:true, max:2000}), 'clear');
  // ---- 68 regret (it rewinds instead of restarting, so these run as one long life)
  const life68 = (pol, max) => { g.prof.mem = null; g.setLvl(67); let deaths = 0, was = 'play';
    for (let f = 0; f < (max || 4000); f++) { const st = g.state; if (st === 'dead' && was !== 'dead') deaths++; was = st; if (st === 'clear') return `clear after ${deaths}`; window.LIB.frame(st === 'play' ? pol(g.P, deaths) : {k:{}}); }
    return `timeout after ${deaths}`; };
  const jumpAt = (xs, h) => P => { for (const x of xs) if (P.on && Math.abs(cx() - x*T) < 4) return {jump:h, dir:1}; return R(); };
  const sp68 = [5.6, 12.6, 19.6];
  check('68 walk into the first spike', [life68(R, 900)], /timeout/);
  check('68 jump each spike, the same way every time', [life68(jumpAt(sp68, 30))], /clear after 3/);
  check('68 then from closer, the same way every time', [life68(jumpAt(sp68.map(x => x + 0.9), 30))], /clear after 3/);
  check('68 after a death, jump from a tile further back', [life68((P, d) => jumpAt(sp68.map(x => x - (d ? 1 : 0)), 30)(P), 3000)], /timeout/);
  check('68 after a death, a small hop', [life68((P, d) => jumpAt(sp68.map(x => x + (d ? 0.5 : 0)), d ? 6 : 30)(P), 3000)], /timeout/);
  check('68 after a death, from closer', [life68((P, d) => jumpAt(sp68.map(x => x + (d ? 0.9 : 0)), 30)(P), 3000)], /timeout/);
  // someone who has understood but is not exact: the same jump, give or take a third of a tile, and not quite the full hold
  { const rs = []; for (const dx of [-0.3, -0.15, 0.15, 0.3]) for (const h of [24, 30]) { rs.push(life68((P, d) => jumpAt(sp68.map(x => x + (d ? dx : 0)), d ? h : 30)(P), 3000).split(' ')[0]); }
    check('68 understood, a little sloppy (8 tries)', [rs.filter(r => r === 'clear').length + '/8'], '8/8'); }
  // ---- 69 remembered
  const lidBroken = () => g.ents.filter(e => e.t === 'bb' && e.alive).length < 6;
  clean('remembered'); check('69 jump the thorns, keep off the lid', run(68, () => script([S.R(7.9), S.J(30, 1), S.R(14.6), S.W(600)]), {max:900}), 'timeout');
  clean('remembered'); check('69 die on the lid; then wait for the sky', run(68, life => life === 0 ? script([S.R(7.9), S.J(30, 1), S.R(18)]) : script([S.R(7.9), S.J(30, 1), S.R(14.6), S.U(lidBroken), S.U(() => !(g.S.cones || []).some(c => c.st === 'fall')), S.R(18.8), S.U(P => P.y > 470), S.W(30)]), {lives:2, max:1500}), 'clear');
  // ---- 70 self
  const wall70 = S.R(20.2), firmAt = h => () => g.S.ghosts.some(q => q.p && q.p[3] && Math.abs(q.p[0] - g.P.x) < 8 && q.p[1] === GY - 28*h);
  const base70 = () => script([wall70, S.W(900)]);
  const on1 = () => script([wall70, S.U(firmAt(1)), S.J(30, 0), S.W(900)]);
  const climb = () => script([wall70, S.U(firmAt(2)), S.J(30, 0), S.W(6), S.J(30, 1), S.R(25.6), S.W(60)]);
  check('70 one life: jump at the wall until the sand runs out', run(69, () => script([wall70, ...Array(8).fill(0).map(() => S.J(30, 1)), S.W(900)]), {freshMem:true, max:900}), 'dead');
  check('70 a life at the wall; then climb onto it and jump', run(69, life => life === 0 ? base70() : script([wall70, S.U(firmAt(1)), S.J(30, 0), S.W(6), S.J(30, 1), S.R(25.6), S.W(900)]), {lives:2, freshMem:true, max:900}), 'dead');
  check('70 a life hopping at the wall; then ride its hop', run(69, life => life === 0 ? script([wall70, ...Array(14).fill(0).map(() => S.J(30, 0)), S.W(900)]) : script([wall70, S.J(30, 0), S.J(30, 1), S.R(25.6), S.W(900)]), {lives:2, freshMem:true, max:900}), 'dead');
  check('70 a life at the wall, a life on it; then the third climbs them', run(69, life => [base70, on1, climb][Math.min(life, 2)](), {lives:3, freshMem:true, max:900}), /clear/);
  check('70 ... with a wasted life in between', run(69, life => [base70, () => script([S.R(10), S.W(900)]), on1, climb][Math.min(life, 3)](), {lives:4, freshMem:true, max:900}), /clear/);

  return out;
})()
