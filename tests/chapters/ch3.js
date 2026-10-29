(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), Lf = Lk;
  const hopAt = (xs, h) => P => (P.on && xs.some(c => Math.abs(cx() - c*T) < 3)) ? {jump:h, dir:1} : R();
  const solve = (L, o) => { const r = SOLVE.solve(L, Object.assign({beam:150, depth:120}, o || {})); if (!r.ok) return ['nosol']; if (o && o.setup) o.setup(); else g.setLvl(L); return [SOLVE.replay(SOLVE.strat(r.seq, o || {}))]; };
  // ---- 21 offset
  check('21 walk on what you see', run(20, () => R), 'dead');
  check('21 jump the hole you see', run(20, () => script([S.R(6.2), S.J(30, 1), S.R(29)])), 'dead');
  check('21 learned "+2": jump at true edge, then +2 again', run(20, () => script([S.R(8.6), S.J(30, 1), S.R(14.2), S.J(30,1), S.R(23.6), S.J(30,1), S.R(29)])), 'dead');
  check('21 follow the dotted shadows', run(20, () => script([S.R(8.6), S.J(30, 1), S.R(14.0), S.J(30, 1), S.R(19.4), S.J(30, 1), S.R(26.6)])), 'clear');
  // ---- 22 forged
  check('22 walk', run(21, () => R), 'dead');
  check('22 avoid the X marks', run(21, () => script([S.R(3.3), S.JT(6.5), S.R(29)])), 'dead');
  check('22 the marks lie everywhere', run(21, () => script([S.R(5.5), S.J(10, 1), S.R(10.5), S.J(10, 1), S.R(29)])), /dead@1[78]/);
  check('22 left: the marks lie; right: the marks are true', run(21, () => script([S.R(5.5), S.J(10, 1), S.R(10.5), S.J(10, 1), S.R(17.5), S.J(10, 1), S.R(22.5), S.J(10, 1), S.R(27.5)])), 'clear');
  // ---- 23 fourth wall
  check('23 press jump when you die', run(22, () => P => g.S.over && g.S.over.kind === 'death' && g.S.over.t > 25 ? {jump:1} : R()), 'dead');
  check('23 wait out the death, press start on the title', run(22, () => P => g.S.over && g.S.over.kind === 'title' && g.S.over.t > 30 ? {jump:1} : R()), 'dead');
  check('23 never press anything, walk on (into the flag)', run(22, () => R, {max:1500}), 'dead');
  check('23 never press on a screen, jump the flag', run(22, () => P => (P.on && !g.S.over && Math.abs(cx() - 22.6*T) < 6) ? {jump:30, dir:1} : R(), {max:1500}), 'clear');
  // ---- 24 mirror
  const lagUp = () => g.S.hist.length ? g.S.hist[0][2] : false;
  check('24 walk on the floor', run(23, () => R), 'dead');
  check('24 jump what the mirror shows, trust it everywhere', run(23, () => script([S.R(4.4), S.J(30, 1), S.R(10.3), S.J(30, 1), S.R(16.3), S.J(30, 1), S.R(22.0), S.U(() => !lagUp()), S.R(25.4), S.J(8, 1), S.R(29)]), {max:1500}), 'dead');
  check('24 jump what it shows; where it lags, go when it shows the spike', run(23, () => script([S.R(4.4), S.J(30, 1), S.R(10.3), S.J(30, 1), S.R(16.3), S.J(30, 1), S.R(22.0), S.U(() => !lagUp()), S.U(() => lagUp()), S.R(25.4), S.J(8, 1), S.R(29)]), {max:1500}), 'clear');
  // ---- 25 imitation
  const nearC = (c, a, b) => c.alive && c.x - g.P.x > a && c.x - g.P.x < b;
  check('25 just walk', run(24, () => R), 'dead');
  check('25 jump over anything that comes', run(24, () => P => (P.on && (nearC(g.S.c1, 20, 70) || nearC(g.S.c2, 20, 90))) ? {jump:30, dir:1} : R()), 'dead');
  check('25 jump the first, walk away from the second', run(24, () => P => { const c1 = g.S.c1, c2 = g.S.c2;
      if (P.on && nearC(c1, 20, 70) && c1.on) return {jump:30, dir:1};
      if (c2.alive && c2.act) { if (P.on && nearC(c1, -70, -20)) return {jump:30, dir:-1}; return Lk(); }
      if (!c2.alive && P.on && cx() > 25.2*T && cx() < 25.8*T) return {jump:30, dir:1};
      return R(); }, {max:1500}), 'clear');
  // ---- 26 opposites
  const near26 = [S.R(4.3), S.J(30, 1), S.U(P => P.on), S.JT(13.5, GY, {tol:10}), S.U(P => P.on)];
  const isles26 = [S.JT(17.5, 432, {tol:8}), S.U(P => P.on), S.JT(20.5, 432, {tol:8}), S.U(P => P.on), S.JT(23.5, 432, {tol:8}), S.U(P => P.on)];
  check('26 walk on, as usual', run(25, () => P => (P.on && [4.3, 11.0].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('26 full jumps past the line', run(25, () => script([...near26, S.J(30, 1), S.U(P => P.on), S.W(30)]), {freshMem:true, max:1500}), 'dead');
  check('26 hop along the ground past the line', run(25, () => script([...near26, S.R(15.6), S.W(30)]), {freshMem:true, max:1500}), 'dead');
  check('26 thorn to thorn, then the door', run(25, () => script([...near26, ...isles26, S.JT(27, 432, {tol:20}), S.R(28.3), S.W(30)]), {freshMem:true, max:1500}), 'dead');
  check('26 thorn to thorn, then down the hole', run(25, () => script([...near26, ...isles26, S.R(24.5), S.W(60)]), {freshMem:true, max:1500}), 'clear');
  // ---- 27 gallery
  check('27 walk in the door', run(26, () => R, {freshMem:true}), 'fake');
  check('27 jump the painted door, walk to the wall', run(26, () => script([S.R(3.0), S.J(30, 1), S.R(29)]), {freshMem:true, max:900}), 'timeout');
  check('27 run and jump at the pictures', run(26, () => script([S.R(3.0), S.J(30, 1), S.R(13.0), S.J(30, 1), S.R(29)]), {freshMem:true, max:900}), 'timeout');
  check('27 stop and jump in front of the first picture', run(26, () => script([S.R(3.0), S.J(30, 1), S.R(9.4), S.W(10), S.F(() => ({jump:4, dir:0}), (P, k) => k >= 1), S.W(120)]), {freshMem:true}), 'dead');
  check('27 stop and jump in front of the one with the door', run(26, () => script([S.R(3.0), S.J(30, 1), S.R(14.4), S.W(10), S.F(() => ({jump:4, dir:0}), (P, k) => k >= 1), S.W(30), S.R(29)]), {freshMem:true}), 'clear');
  // ---- 28 double
  check('28 walk it to its door', run(27, () => Lf), 'dead');
  check('28 jump for it when it reaches its pit (still holding left)', run(27, () => P => (P.on && g.S.tw.x + 22 > 21*T - 10 && g.S.tw.x < 21*T) ? {jump:30, dir:-1} : Lf()), 'clear');
  check('28 against the block, jump in place for it, then hop on', run(27, () => { let ph = 0; return P => {
      if (ph === 0) { if (g.S.tw.x + 22 < 21*T - 6) return Lf(); ph = 1; return {jump:30, dir:0, k:{}}; }
      if (ph === 1) { if (!P.on) return {k:{}}; ph = 2; return {k:{}}; }
      if (ph === 2) { ph = 3; return {jump:2, dir:-1}; }
      if (ph === 3) { if (!P.on) return Lf(); ph = 4; }
      return Lf(); }; }, {max:1200}), 'clear');
  // ---- 29 mime
  check('29 walk on', run(28, () => R, {max:600}), 'timeout');
  check('29 jump the wall you bump into', run(28, () => P => (P.on && Math.abs(P.vx) < 0.5 && cx() > 4*T) ? {jump:30, dir:1} : R(), {max:600}), /timeout|dead/);
  check('29 follow its hands, and its door', run(28, () => script([S.R(3.6), S.J(10, 1), S.U(P => P.on, {right:true}), S.R(5.2), S.J(30, 1), S.U(P => P.on && cx() > 8.2*T, {right:true}), S.R(29)]), {max:1500}), 'dead');
  check('29 follow its hands, not its door', run(28, () => script([S.R(3.6), S.J(10, 1), S.U(P => P.on, {right:true}), S.R(5.2), S.J(30, 1), S.U(P => P.on && cx() > 8.2*T, {right:true}), S.R(22.2), S.J(30, 1), S.R(29)]), {max:1500}), 'clear');
  // ---- 30 cave
  check('30 trust the shadows', run(29, () => hopAt([6.6, 14.6, 22.6], 30), {freshMem:true, max:600}), 'dead');
  check('30 look back, then go', solve(29), 'clear');
  return out;
})()
