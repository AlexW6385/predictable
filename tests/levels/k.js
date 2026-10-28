(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 68 colours
  check('68 hop the first spike', run(67, () => script([S.R(2.3), S.J(1, 1), S.R(29)]), {freshMem:true}), 'dead');
  check('68 walk', run(67, () => R, {freshMem:true}), 'dead');
  check('68 long leaps across each spike and border', run(67, () => P => (P.on && cx() > 28.7*T) ? Lk() : (P.on && [2.0, 11.6, 18.8, 24.6].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'clear');
  // ---- 69 inverted
  check('69 walk on, as usual', run(68, () => P => (P.on && [6.3, 12.3].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:8, dir:1} : R(), {freshMem:true}), 'dead');
  check('69 stand on the thorns, go in the door', run(68, () => script([S.R(6.3), S.J(30, 1), S.R(12.3), S.JT(18, 432, {tol:20}), S.R(18.7), S.JT(21.5, 432, {tol:16}), S.R(22.2), S.JT(27.6, 432, {tol:20}), S.R(28.3)]), {freshMem:true, max:1500}), 'dead');
  check('69 stand on the thorns, drop into the pit', run(68, () => script([S.R(6.3), S.J(30, 1), S.R(12.3), S.JT(18, 432, {tol:20}), S.R(18.7), S.JT(21.5, 432, {tol:16}), S.R(22.4), S.JT(25, 600, {tol:20}), S.W(60)]), {freshMem:true, max:1500}), 'clear');
  // ---- 70 history
  const gaps70 = [5.6, 11.6, 17.6, 29.6, 35.6, 41.6];
  check('70 run and jump each gap', run(69, () => P => (P.on && gaps70.some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true, max:1500}), 'dead');
  check('70 break the rhythm, take it, walk under at the end', run(69, () => script([S.R(5.4), S.W(20), S.J(30, 1), S.R(11.4), S.W(8), S.J(30, 1), S.R(17.4), S.W(30), S.J(30, 1), S.R(29.5), S.J(30, 1), S.R(35.4), S.W(14), S.J(30, 1), S.R(41.5), S.W(5), S.J(30, 1), S.R(50.4)]), {freshMem:true, max:2000}), 'clear');
  check('70 take it, then wait to think', run(69, () => script([S.R(5.4), S.W(20), S.J(30, 1), S.R(11.4), S.W(8), S.J(30, 1), S.R(17.4), S.W(30), S.J(30, 1), S.R(29.5), S.W(120), S.J(30, 1), S.R(50.4)]), {freshMem:true, max:2000}), 'dead');
  return out;
})()
