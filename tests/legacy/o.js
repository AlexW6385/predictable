(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const hopAt = (xs, h) => P => (P.on && xs.some(c => Math.abs(cx() - c*T) < 3)) ? {jump:h, dir:1} : R();
  const solve = (L, o) => { const r = SOLVE.solve(L, Object.assign({beam:150, depth:120}, o || {})); if (!r.ok) return ['nosol']; if (o && o.setup) o.setup(); else g.setLvl(L); return [SOLVE.replay(SOLVE.strat(r.seq, o || {}))]; };
  // ---- 86 exodus
  check('86 walk into the sea', run(85, () => R, {freshMem:true, max:600}), 'dead');
  check('86 stop at the shore to look', run(85, () => script([S.R(5.0), S.W(80), S.R(28)]), {freshMem:true, max:600}), 'dead');
  check('86 leap the rocks', run(85, () => hopAt([11.2, 17.2], 30), {freshMem:true, max:600}), 'dead');
  check('86 hop the rocks, never stop', run(85, () => hopAt([11.1, 17.1], 6), {freshMem:true, max:600}), 'clear');
  check('86 hop the rocks, catch your breath on the far shore', run(85, () => script([S.F(hopAt([11.1, 17.1], 6), () => cx() > 24.5*T), S.W(60), S.R(28)]), {freshMem:true, max:800}), 'clear');
  // ---- 87 babel
  check('87 climb as you always would', run(86, () => script([S.R(4.3), S.JT(6.8, 384), S.JT(9.6, 320), S.JT(12.6, 256), S.JT(15.6, 192), S.JT(21, 128)]), {freshMem:true, max:600}), 'dead');
  check('87 climb, solved', solve(86), 'clear');
  // ---- 88 theseus
  check('88 stand on the ship', run(87, () => script([S.R(5.5), S.W(400)]), {freshMem:true, max:600}), 'dead');
  check('88 keep walking on the ship', run(87, () => P => (g.S.pl.some(p => p.st === 'ship' && p.x > P.x + 40)) ? R() : N(), {freshMem:true, max:1500}), 'dead');
  check('88 drop as soon as it starts to fall', run(87, () => P => g.S.t > 100 ? R() : N(), {freshMem:true, max:600}), 'dead');
  check('88 wait for the old planks, ride them home', run(87, () => P => !g.S.formed ? N() : g.S.pl.some(p => p.st === 'boat' && p.x + 32 > 25*T - 2) ? R() : (cx() < 5.2*T ? R() : N()), {freshMem:true, max:1500}), 'clear');
  check('88 ride the new ship, step down onto the old', solve(87, {setup(){ g.prof.mem = null; g.setLvl(87); for (let i = 0; i < 20; i++) { Object.assign(g.keys, {right:true, left:false, jump:false}); g.step(); } }}), 'clear');
  // ---- 89 cave
  check('89 trust the shadows', run(88, () => hopAt([6.6, 14.6, 22.6], 30), {freshMem:true, max:600}), 'dead');
  check('89 look back, then go', solve(88), 'clear');
  // ---- 90 zeno
  check('90 walk to the door', run(89, () => R, {freshMem:true, max:900}), 'timeout');
  check('90 hop to the door', run(89, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true, max:900}), 'timeout');
  const top = jumpAt => [[17.2, 192, {tol:12}], (() => { let st = 0; return P => { if (st === 0) { if (cx() >= jumpAt*T) { st = 1; return {right:true, jump:true, edge:true}; } return {right:true}; } st++; return st < 70 ? {right:true, jump:st < 30} : null; }; })()];
  check('90 climb and walk off the top', [SOLVE.legs(89, top(99), {after:600})], 'timeout');
  check('90 climb and leap from the middle of the top', [SOLVE.legs(89, top(16.6), {after:600})], 'timeout');
  check('90 climb and leap from the edge', [SOLVE.legs(89, top(18.6), {after:200})], 'clear');
  check('90 solved', solve(89), 'clear');
  return out;
})()
