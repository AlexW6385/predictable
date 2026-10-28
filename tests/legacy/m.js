(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 78 progress bar
  check('78 walk along the bar', run(77, () => R, {freshMem:true}), 'dead');
  check('78 run to the end of the gold, then leap', run(77, () => P => (P.on && cx() > 18.0*T && cx() < 19*T) ? {jump:30, dir:1} : R(), {freshMem:true}), 'clear');
  // ---- 79 curtain
  check('79 run', run(78, () => R, {freshMem:true}), 'dead');
  check('79 wait on a prop', [SOLVE.legs(78, [[6, 416], 400])], 'dead');
  check('79 wait on the stone, then go', [SOLVE.legs(78, [[6, 416], [10.5, 384], [14, 352], [18.5, 352], P => g.S.act === 'B' && g.S.t % 300 > 292 ? null : {}, [23, 320], [27.3, 448, {tol:6}]])], 'clear');
  // ---- 80 comedy
  check('80 walk', run(79, () => R, {freshMem:true, max:900}), 'dead');
  const gl = () => g.S.glove;
  check('80 every gag, dodged', run(79, () => script([S.R(4.3), S.J(30, 1), S.R(9.2), S.J(8, 1), S.R(11.2), S.U(() => gl().t >= 80 && gl().t < 84, {}), S.R(15.4), S.W(45), S.R(16.6), S.J(30, 1), S.R(20.8), S.J(30, 1), S.R(24.2), S.J(10, 1), S.F(P => ({k:{right: cx() < 27.9*T, left: cx() > 28.4*T}}), () => false)]), {freshMem:true, max:2000}), 'clear');
  check('80 everything but the doormat', run(79, () => script([S.R(4.3), S.J(30, 1), S.R(9.2), S.J(8, 1), S.R(11.2), S.U(() => gl().t >= 80 && gl().t < 84, {}), S.R(15.4), S.W(45), S.R(16.6), S.J(30, 1), S.R(20.8), S.J(30, 1), S.R(28.3)]), {freshMem:true, max:2000}), 'dead');
  return out;
})()
