(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const solve = (L, o) => { const r = SOLVE.solve(L, Object.assign({beam:150, depth:120}, o || {})); if (!r.ok) return ['nosol']; if (o && o.setup) o.setup(); else g.setLvl(L); return [SOLVE.replay(SOLVE.strat(r.seq, o || {}))]; };
  // ---- 91 achilles
  check('91 chase it', run(90, () => P => (P.on && [14.3, 20.3].some(c => Math.abs(cx() - c*T) < 3)) ? {jump:30, dir:1} : R(), {freshMem:true, max:1500}), /timeout|dead/);
  check('91 wait for it', run(90, () => N, {freshMem:true, max:900}), 'timeout');
  check('91 go the other way round', run(90, () => P => (P.on && [23.7, 16.7].some(c => Math.abs(cx() - c*T) < 3)) ? {jump:30, dir:-1} : Lk(), {freshMem:true, max:1500}), 'clear');
  // ---- 92 heraclitus
  check('92 wait on the bank', run(91, () => N, {freshMem:true, max:600}), 'dead');
  const onLog = () => g.P.on && g.P.stand && g.P.stand.t === 'log';
  const bird = () => g.S.bird.st === 'dive' && g.S.bird.x - cx() < 70 && g.S.bird.x > cx();
  check('92 board a log, hop on the spot when it comes', run(91, () => P => !onLog() ? (cx() < 4.6*T ? R() : P.on ? {jump:12, dir:1} : R()) : bird() ? {jump:20, dir:0} : N(), {freshMem:true, max:900}), 'dead');
  check('92 board a log, hop early', run(91, () => P => !onLog() ? (cx() < 4.6*T ? R() : P.on ? {jump:12, dir:1} : R()) : (g.S.bird.st === 'dive' && g.S.bird.x - cx() < 300 && g.S.bird.x - cx() > 200) ? {jump:30, dir:1} : N(), {freshMem:true, max:900}), 'dead');
  check('92 solved', solve(91), 'clear');
  // ---- 93 copernicus
  check('93 stop to look', run(92, () => N, {freshMem:true, max:300}), 'dead');
  check('93 walk', run(92, () => R, {freshMem:true, max:300}), 'dead');
  const rotLeg = () => { let n = 0, lastK = 0; return P => { if (g.S.k !== lastK) { n++; lastK = g.S.k; } return n >= 4 && P.on ? null : {}; }; };
  const walk = () => P => g.state === 'play' ? {right:true} : null;
  check('93 turn the world from the low step', [SOLVE.legs(92, [[12.5, 442, {tol:8}], rotLeg(), walk()], {after:200})], 'dead');
  check('93 turn the world from the high step, four times', [SOLVE.legs(92, [[15.0, 378, {tol:8}], rotLeg(), walk()], {after:200})], 'clear');
  // ---- 94 bad infinity
  g.setLvl(93); const fd = g.ents.find(e => e.t === 'door' && e.x > 40*T); out.push('first false door at ' + ((fd.x + 2)/T));
  check('94 onward, to the next door', [SOLVE.legs(93, [[(fd.x + 20)/T - 1.2, 448, {tol:10}], P => g.state === 'play' ? {right:true} : null], {after:100})], 'dead');
  check('94 turn around', run(93, () => Lk, {freshMem:true, max:600}), 'clear');
  // ---- 95 wind
  check('95 run and jump', run(94, () => script([S.R(6.5), S.J(30, 1), S.R(28)]), {freshMem:true, max:600}), 'dead');
  const letgo = (x) => [S.R(x), S.F((P, k) => k === 1 ? {jump:30, dir:0} : {k:{}}, (P, k) => k > 2 && P.on)];
  check('95 jump and let go, twice', run(94, () => script([...letgo(6.6), ...letgo(16.6), S.R(28)]), {freshMem:true, max:900}), 'dead');
  check('95 let go at the first; stand and jump at the second', run(94, () => script([...letgo(6.6), S.R(16.5), S.W(20), S.J(30, 1), S.R(28)]), {freshMem:true, max:900}), 'dead');
  check('95 let go at the first; leap backwards at the second', run(94, () => script([...letgo(6.6), S.R(16.5), S.U(P => P.vx < -0.2, {left:true}), S.F((P, k) => k === 1 ? {jump:30, dir:0, k:{left:true}} : {k:{right:true}}, (P, k) => k > 2 && P.on), S.R(28)]), {freshMem:true, max:900}), 'clear');
  return out;
})()
