window.LIB = (() => {
  const g = window.__pred, T = 32, GY = 448, PH = 28, PW = 22;
  function sim(hold, dir, landY){
    const P = g.P; let x = P.x, y = P.y, vx = P.vx, vy = -10.6, top = y;
    for (let f = 0; f < 140; f++) {
      if (dir) vx = Math.max(-4.4, Math.min(4.4, vx + dir*(f === 0 ? 0.9 : 0.6))); else vx *= 0.97;
      if (f >= hold && vy < -3.5) vy = -3.5;
      vy = Math.min(vy + 0.55, 12); x += vx; y += vy; top = Math.min(top, y);
      if (vy > 0 && y + PH >= landY) return {c: x + PW/2, peak: P.y - top};
    }
    return {c: 1e9, peak: 0};
  }
  let hold = 0, holdDir = 1;
  function frame(r){
    r = r || {};
    const P = g.P, k = Object.assign({left:false, right:false, jump:false}, r.k || {});
    let doJump = false;
    if (r.jumpTo != null && P.on && hold <= 0) {
      const dir = r.dir ?? 1;
      for (let h = 1; h <= 30; h++) { const s = sim(h, dir, r.landY ?? GY); if (Math.abs(s.c - r.jumpTo) < (r.tol || 8) && (!r.maxPeak || s.peak < r.maxPeak) && (!r.minPeak || s.peak > r.minPeak)) { doJump = true; hold = h; holdDir = dir; break; } }
    }
    if (r.jump && P.on && hold <= 0) { doJump = true; hold = r.jump; holdDir = r.dir ?? (k.right ? 1 : k.left ? -1 : 0); }
    if (hold > 0) { k.jump = true; hold--; if (holdDir > 0) { k.right = true; k.left = false; } else if (holdDir < 0) { k.left = true; k.right = false; } }
    if (r.edge) { k.jump = true; } Object.assign(g.keys, k); if (doJump || r.edge) g.jump(); if (r.press) g.press(); g.step();
  }
  // sequential script: [{until, rule}] ; helpers build steps
  function script(steps){
    let i = 0, n = 0, st = {};
    return P => {
      while (i < steps.length && steps[i].until(P, n, st)) { i++; n = 0; st = {}; }
      if (i >= steps.length) return {k:{}};
      n++; return steps[i].rule(P, n, st) || {};
    };
  }
  const cx = () => g.P.x + 11;
  const S = {
    R: x => ({until: () => cx() >= x*T, rule: () => ({k:{right:true}})}),
    L: x => ({until: () => cx() <= x*T, rule: () => ({k:{left:true}})}),
    W: n => ({until: (P, k) => k >= n, rule: () => ({k:{}})}),
    K: (keys, n) => ({until: (P, k) => k >= n, rule: () => ({k:keys})}),
    U: (fn, keys) => ({until: P => fn(P), rule: () => ({k:keys || {}})}),
    J: (hold, dir, extra) => ({until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on && k > 2; }, rule: (P, k, st) => k === 1 ? Object.assign({jump: hold, dir}, extra || {}) : {k: dir > 0 ? {right:true} : dir < 0 ? {left:true} : {}}}),
    JT: (x, landY, o) => ({until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on; }, rule: (P, k, st) => st.air ? {k:{right:(o && o.dir) !== -1, left:(o && o.dir) === -1}} : Object.assign({jumpTo: x*T, landY: landY ?? GY, tol: 8, k:{right:(o && o.dir) !== -1, left:(o && o.dir) === -1}}, o || {})}),
    F: (fn, until) => ({until: (P, k, st) => until(P, k, st), rule: (P, k, st) => fn(P, k, st)}),
  };
  function run(L, makeStrat, opts){
    opts = opts || {};
    if (opts.freshMem) g.prof.mem = null;
    hold = 0;
    g.setLvl(L);
    const res = [];
    for (let life = 0; life < (opts.lives || 1); life++) {
      const strat = makeStrat(life); let out = 'timeout'; hold = 0;
      const nz = window.__NOISE, buf = []; let ns = nz ? nz.seed * 7919 + life * 104729 + L : 0;
      const nr = () => (ns = (ns * 1103515245 + 12345) % 2147483648) / 2147483648;
      for (let f = 0; f < (opts.max || 1500); f++) {
        if (g.state !== 'play') break;
        let r = strat(g.P, f);
        if (nz) { // human-ish noise: act on what you decided a few frames ago, and hold jump a little longer or shorter
          if (r && r.jump) r = Object.assign({}, r, {jump: Math.max(1, r.jump + Math.round((nr()*2 - 1)*nz.jit))});
          buf.push(r); r = buf.length > nz.delay ? buf.shift() : {k:{}}; }
        frame(r);
      }
      const st = g.state;
      if (st === 'dead') out = 'dead@' + (cx()/T).toFixed(1);
      else if (st === 'clear') out = g.S.fake ? 'fake' : 'clear';
      else if (st === 'win') out = 'win';
      res.push(out);
      if (out === 'clear' || out === 'win' || out === 'timeout') break;
      for (let i = 0; i < 125 && g.state !== 'play'; i++) { Object.assign(g.keys, {left:false, right:false, jump:false}); g.step(); }
    }
    return res;
  }
  return { g, sim, frame, script, S, run, cx, T, GY };
})();
