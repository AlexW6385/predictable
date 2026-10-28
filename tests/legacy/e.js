(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 46 habit
  check('46 run, jump each gap at its edge', run(45, () => P => (P.on && [5.6, 11.6, 17.6].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('46 spam full jumps', run(45, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('46 stop at every edge, then jump', run(45, () => script([S.R(5.4), S.W(25), S.J(30, 1), S.R(11.4), S.W(12), S.J(30, 1), S.R(17.4), S.W(40), S.J(30, 1), S.R(28.5)]), {freshMem:true}), 'clear');
  // ---- 47 dream
  const sleepW = () => S.U(() => g.S.sleep, {});
  check('47 run', run(46, () => R, {freshMem:true}), 'dead');
  check('47 jump the pit', run(46, () => script([S.R(4.3), S.J(30, 1), S.W(200)]), {freshMem:true}), 'dead');
  check('47 fall asleep, then walk across', run(46, () => script([S.R(4.3), S.W(10), sleepW(), S.R(27.5)]), {freshMem:true, max:2400}), 'dead');
  check('47 asleep, jump the gap in the dream', run(46, () => script([S.R(4.3), S.W(10), sleepW(), S.R(11.3), S.J(30, 1), S.R(27.5)]), {freshMem:true, max:2400}), 'dead');
  check('47 asleep, hop the thorn, sleep again', run(46, () => script([S.R(4.3), S.W(10), sleepW(), S.F(P => ({k:{right: cx() < 17.3*T && Math.abs(g.P.vx) < 2.5}}), () => cx() > 17.25*T), S.JT(20.4, GY, {tol:12}), S.W(10), sleepW(), S.R(27.5)]), {freshMem:true, max:2400}), 'clear');
  // ---- 48 now
  const bl = (t) => g.S.bl.map(b => g.lv.pos(b, t));
  const p48 = (D) => () => { let go = null; return P => { const t = g.S.t - D, x = cx();
    if (go && x > go.px + 130) go = null;
    if (go) return R();
    const b = g.S.bl.find(b => b.px + 130 > x); if (!b) return R();
    if (x < b.px - 4*T) return R();
    const p = g.lv.pos(b, t), q = g.lv.pos(b, t + 1); if (p.x < b.px && q.x >= b.px) { go = b; return R(); }
    return N(); }; };
  check('48 run', run(47, () => R, {freshMem:true}), 'dead');
  check('48 go when the blade you see has swung away', run(47, p48(26), {freshMem:true, max:2400}), 'dead');
  check('48 go when its shadow has swung away', run(47, p48(0), {freshMem:true, max:2400}), 'clear');
  // ---- 49 the servant
  check('49 alone', run(48, () => script([S.R(4.5), S.W(40), S.R(9.5), S.J(30, 1), S.R(21.4), S.W(600)]), {freshMem:true, max:1200}), 'timeout');
  check('49 hold it, die; then run', run(48, life => life === 0 ? script([S.R(4.5), S.W(240), S.R(10.5), S.W(100)]) : script([S.R(9.4), S.J(30, 1), S.R(27.5)]), {freshMem:true, lives:3, max:1500}), 'clear');
  check('49 just pass over it, die; then run', run(48, life => life === 0 ? script([S.R(10.5), S.W(100)]) : script([S.R(9.4), S.J(30, 1), S.R(27.5), S.W(600)]), {freshMem:true, lives:2, max:900}), /timeout|dead/);
  // ---- 50 desire
  check('50 take them as they come', run(49, () => script([S.R(6.2), S.J(30, 1), S.R(13.6), S.J(30, 1), S.W(60), S.R(17.6), S.J(30, 1), S.R(21.5), S.W(300)]), {freshMem:true, max:1200}), /timeout|dead/);
  check('50 jump over the first, take the second, then the third', run(49, () => script([S.R(3.2), S.J(30, 1), S.R(6.2), S.J(30, 1), S.R(13.6), S.J(30, 1), S.W(60), S.R(17.6), S.J(30, 1), S.R(21.5), S.W(300)]), {freshMem:true, max:1200}), /timeout|dead/);
  check('50 the far one first, then back', run(49, () => script([S.R(3.2), S.J(30, 1), S.R(13.6), S.J(30, 1), S.W(40), S.L(14.4), S.L(11.4), S.J(30, -1), S.W(30), S.L(6.0), S.L(4.6), S.L(3.0), S.R(17.6), S.J(30, 1), S.R(21.6), S.W(20), S.R(27.5)]), {freshMem:true, max:2400}), 'clear');
  return out;
})()
