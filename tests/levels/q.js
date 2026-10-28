(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const solve = (L, o) => { const r = SOLVE.solve(L, Object.assign({beam:150, depth:140}, o || {})); if (!r.ok) return ['nosol']; if (o && o.setup) o.setup(); else g.setLvl(L); return [SOLVE.replay(SOLVE.strat(r.seq, o || {}))]; };
  // ---- 96 the door for those leaving
  check('96 walk in', run(95, () => R, {freshMem:true, max:600}), 'dead');
  check('96 face away and ride, stand still', run(95, () => script([S.R(17.0), S.K({left:true}, 2), S.W(300)]), {freshMem:true, max:600}), 'dead');
  check('96 face away, walk away, and keep walking away', run(95, () => script([S.R(17.0), S.K({left:true}, 400)]), {freshMem:true, max:600}), 'dead');
  const dodge = () => { let mode = 0, cones = 0; return P => { const n = (g.S.cones || []).length; if (n !== cones) { cones = n; mode = 1 - mode; } return cx() < 16.3*T ? {k:{right:true}} : mode ? {k:{left:true}} : {k:{}}; }; };
  check('96 face away; change pace whenever the sky moves', run(95, () => dodge(), {freshMem:true, max:600}), 'clear');
  // ---- 97 maxwell
  check('97 run for the door', run(96, () => Lk, {freshMem:true, max:600}), 'dead');
  check('97 solved', solve(96), 'clear');
  check('97 wait for it to calm down, then go', run(96, () => script([S.W(900), S.L(2)]), {freshMem:true, max:1500}), 'dead');
  // ---- 98 laplace
  const E3 = [5, 12, 19].map(c => c*T); const leap = offs => P => { const e = E3.find(e => e > cx() - 4); if (P.on && e != null) { const o = offs[E3.indexOf(e)]; if (e - cx() <= o && e - cx() > o - 6) return {jump:30, dir:1}; } return R(); };
  check('98 always leap from the same distance', run(97, () => leap([30, 30, 30]), {freshMem:true, max:600}), 'dead');
  check('98 a different distance each time, the same each life', run(97, () => leap([20, 55, 30]), {freshMem:true, lives:2, max:600}), 'dead');
  check('98 vary within a life (life 1 dies at the third)', run(97, life => leap([20, 60, 32]), {freshMem:true, max:600}), 'dead');
  check('98 vary within a life', run(97, life => leap([20, 60, 75]), {freshMem:true, max:600}), 'clear');
  const after = () => { g.prof.mem = null; g.setLvl(97); const st = leap([20, 60, 35]); for (let i = 0; i < 600 && g.state === 'play'; i++) frame(st(g.P)); for (let i = 0; i < 200 && g.state !== 'play'; i++) { Object.assign(g.keys, {left:false, right:false, jump:false}); g.step(); } };
  check('98 second life, searched', solve(97, {setup: after}), 'clear');
  check('98 second life, same leaps as the first', (() => { after(); const st = leap([20, 60, 75]); for (let i = 0; i < 600 && g.state === 'play'; i++) frame(st(g.P)); return [g.state === 'dead' ? 'dead@' + (cx()/T).toFixed(1) : g.state]; })(), 'dead');
  // ---- 99 recollection
  check('99 stand still', run(98, () => N, {freshMem:true, max:400}), 'timeout');
  check('99 climb', solve(98), 'clear');
  // ---- 100 the circle
  check('100 chase the door', run(99, () => P => ({k: g.S.door.x + 18 > cx() ? {right:true} : {left:true}}), {max:900}), 'timeout');
  check('100 walk a bit, then wait', run(99, () => script([S.R(5), S.W(2000)]), {max:900}), 'win');
  return out;
})()
