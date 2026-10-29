(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), Lf = Lk;
  const hopAt = (xs, h) => P => (P.on && xs.some(c => Math.abs(cx() - c*T) < 3)) ? {jump:h, dir:1} : R();
  const solve = (L, o) => { const r = SOLVE.solve(L, Object.assign({beam:150, depth:120}, o || {})); if (!r.ok) return ['nosol']; if (o && o.setup) o.setup(); else g.setLvl(L); return [SOLVE.replay(SOLVE.strat(r.seq, o || {}))]; };
  // ---- 21 offset
  const pencil21 = [S.R(6.4), S.JT(9.5, GY, {tol:6}), S.U(P => P.on), S.W(6), S.JT(12.8, GY, {tol:10}), S.U(P => P.on)];
  check('21 walk on what you see', run(20, () => R), 'dead');
  check('21 jump the hole you see', run(20, () => script([S.R(8.4), S.J(30, 1), S.R(29)])), 'dead');
  check('21 learned "two tiles back", hop the spike as drawn two back', run(20, () => script([...pencil21, S.R(15.0), S.J(12, 1), S.U(P => P.on), S.R(23.4), S.J(30, 1), S.R(29)]), {max:900}), 'dead');
  check('21 hop the spike as drawn', run(20, () => script([...pencil21, S.R(16.2), S.J(6, 1), S.U(P => P.on), S.R(29)]), {max:900}), 'dead');
  check('21 leap over everything as drawn', run(20, () => script([...pencil21, S.R(15.8), S.J(30, 1), S.U(P => P.on), S.R(21.8), S.J(30, 1), S.R(29)]), {max:900}), 'dead');
  check('21 leap the spike, then leap at once', run(20, () => script([...pencil21, S.R(16.4), S.J(30, 1), S.U(P => P.on), S.J(30, 1), S.R(29)]), {max:900}), 'dead');
  check('21 follow the pencil lines', run(20, () => script([...pencil21, S.R(17.8), S.JT(20.6, GY, {tol:10}), S.U(P => P.on), S.R(23.4), S.J(30, 1), S.R(29), S.W(20)]), {max:900}), 'clear');
  // ---- 22 forged
  check('22 walk', run(21, () => R), 'dead');
  const hop22 = (xs, h) => P => (P.on && xs.some(c => Math.abs(cx() - c*T) < 3)) ? {jump:h, dir:1} : R();
  for (const h of [8, 14, 30]) for (const d of [0.1, 0.7]) check(`22 leap the marks (hold ${h}, ${d} early)`, run(21, () => hop22([3, 10, 19, 24].map(c => c - d), h), {max:900}), 'dead');
  check('22 the marks lie everywhere', run(21, () => hop22([5.4, 12.4, 21.4, 26.4], 8), {max:900}), /dead@(18.9|19)/);
  check('22 left: walk through the paint; right: it is painted on the spikes', run(21, () => hop22([5.4, 12.4, 18.4, 23.4], 8), {max:900}), 'clear');
  // ---- 23 fourth wall
  const ov23 = k => g.S.over && g.S.over.kind === k, out23 = (P, wait) => g.S.over ? (g.S.over.free && g.S.over.t > (wait || 30) ? R() : {k:{}}) : R();
  check('23 press jump when you die', run(22, () => P => ov23('death') && g.S.over.t > 25 ? {jump:1} : R()), 'dead');
  check('23 wait for the death screen to pass', run(22, () => P => g.S.over ? {k:{}} : R(), {max:1500}), 'timeout');
  check('23 hold right through it all', run(22, () => R, {max:1500}), 'timeout');
  check('23 step out of the death, press start on the title', run(22, () => P => ov23('title') && g.S.over.t > 30 ? {jump:1} : out23(P)), 'dead');
  check('23 step out of both, jump the flag', run(22, () => P => (P.on && !g.S.over && Math.abs(cx() - 21.6*T) < 6) ? {jump:30, dir:1} : out23(P), {max:1500}), 'dead');
  check('23 step out of both, jump the flag as you leave the tunnel', run(22, () => P => (P.on && !g.S.over && cx() > 24.9*T && cx() < 25.3*T) ? {jump:30, dir:1} : ov23('win') ? {k:{}} : out23(P), {max:1500}), 'dead');
  check('23 step out of both, wait out the celebration', run(22, () => P => ov23('win') ? {k:{}} : out23(P), {max:1500}), 'dead');
  check('23 step out of both, keep walking into the celebration', run(22, () => P => ov23('win') ? R() : out23(P), {max:1500}), 'dead');
  check('23 step out of both, press jump to go on', run(22, () => P => ov23('win') && g.S.over.t > 60 ? {jump:1} : ov23('win') ? {k:{}} : out23(P), {max:1500}), 'dead');
  check('23 step out of every screen, the celebration too', run(22, () => P => out23(P, 50), {max:1500}), 'clear');
  // ---- 24 mirror
  const lagUp = () => g.S.hist.length ? g.S.hist[0][2] : false;
  check('24 walk on the floor', run(23, () => R), 'dead');
  const pre24 = [S.R(4.4), S.J(30, 1), S.R(10.3), S.J(30, 1), S.R(16.3), S.J(30, 1)];
  check('24 jump what the mirror shows, walk on under the slab', run(23, () => script([...pre24, S.R(26.0), S.J(8, 1), S.R(29)]), {max:1500}), 'dead');
  check('24 leap the stretch where the spike comes and goes', run(23, () => script([...pre24, S.R(20.2), S.J(30, 1), S.R(26.0), S.J(8, 1), S.R(29)]), {max:1500}), 'dead');
  check('24 jump what the mirror shows, trust it everywhere', run(23, () => script([...pre24, S.R(21.0), S.U(() => !lagUp()), S.R(26.0), S.J(8, 1), S.R(29)]), {max:1500}), 'dead');
  check('24 jump what it shows; where it lags, go when it shows the spike', run(23, () => script([...pre24, S.R(21.0), S.U(() => lagUp()), S.R(26.0), S.J(8, 1), S.R(29)]), {max:1500}), 'clear');
  // ---- 25 imitation
  const nearC = (c, a, b) => c.alive && c.x - g.P.x > a && c.x - g.P.x < b;
  check('25 just walk', run(24, () => R), 'dead');
  check('25 jump the first from a few tiles off', run(24, () => P => (P.on && nearC(g.S.c1, 120, 150)) ? {jump:30, dir:1} : R()), 'dead');
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
  const look27 = x => [S.R(x), S.W(40), S.F(() => ({jump:4, dir:0}), (P, k) => k >= 1), S.W(40)];
  check('27 walk on', run(26, () => R, {freshMem:true}), 'timeout');
  check('27 run and jump at the pictures', run(26, () => script([S.R(8.0), S.J(30, 1), S.R(11.6), S.J(30, 1), S.R(29)]), {freshMem:true, max:900}), 'timeout');
  check('27 hop at the wall', run(26, () => script([S.R(15.4), S.W(40), S.F(() => ({jump:30, dir:0}), (P, k) => k >= 1), S.W(60), S.R(29)]), {freshMem:true, max:900}), 'timeout');
  check('27 stop and jump in front of the first picture', run(26, () => script([...look27(8.0)]), {freshMem:true}), 'dead');
  check('27 stop and jump in front of the second', run(26, () => script([...look27(10.8), S.R(29)]), {freshMem:true, max:900}), 'timeout');
  check('27 stop and jump in front of the window onto the door', run(26, () => script([...look27(13.6), S.R(29)]), {freshMem:true}), 'clear');
  check('27 one picture a life, left to right (they are rehung)', run(26, life => script([...look27([8.0, 10.8, 13.6][life])]), {freshMem:true, lives:3}), 'dead');
  check('27 after a death, the last picture (now the way back)', run(26, life => script([...look27(life ? 13.6 : 8.0), S.R(29)]), {freshMem:true, lives:2}), /dead|timeout/);
  check('27 next life, the window is where the painting was', run(26, life => script([...look27(life ? 8.0 : 8.0), S.R(29)]), {freshMem:true, lives:2}), 'clear');
  // ---- 28 double
  // jump when its box nears an edge: the first gap (col 17) and the step (col 23)
  const dc28 = () => g.S.tw.x + 11, edge28 = () => g.P.on && cx() < 7.2*T && cx() > 6.6*T;
  check('28 walk it to its door', run(27, () => Lf), 'dead');
  check('28 jump your pit', run(27, () => P => edge28() ? {jump:30, dir:-1} : Lf(), {max:900}), 'dead');
  check('28 jump your pit, then jump its pit', run(27, () => P => edge28() || (P.on && dc28() > 19.6*T && dc28() < 20.2*T) ? {jump:30, dir:-1} : Lf(), {max:900}), 'dead');
  check('28 wait for its pit, jump it', run(27, () => P => P.on && dc28() > 19.3*T && dc28() < 20.1*T ? {jump:30, dir:-1} : Lf(), {max:900}), 'dead');
  check('28 walk right to the glass first, then jump both pits', run(27, () => script([S.R(14.6), S.W(10), S.L(7.1), S.J(30, -1), S.K({left:true}, 400)]), {max:900}), 'dead');
  check('28 ... and jump them one at a time', run(27, () => { let st = 0; return P => { if (st === 0) { if (cx() < 14.6*T) return R(); st = 1; } return edge28() || (P.on && dc28() > 19.6*T && dc28() < 20.2*T) ? {jump:30, dir:-1} : Lf(); }; }, {max:900}), 'dead');
  check('28 line its pit up with yours against the glass, then one jump', run(27, () => script([S.R(10.9), S.W(10), S.L(7.1), S.J(30, -1), S.K({left:true}, 400)]), {max:900}), 'clear');
  check('28 ... lined up a little long, jumping early', run(27, () => script([S.R(11.3), S.W(10), S.L(7.6), S.J(30, -1), S.K({left:true}, 400)]), {max:900}), 'clear');
  // ---- 29 mime
  const climb29 = [S.R(1.9), S.J(30, 1), S.U(P => P.on), S.W(8), S.J(30, 1), S.U(P => P.on && cx() > 9.3*T, {right:true})];
  check('29 walk on', run(28, () => R, {max:600}), 'timeout');
  check('29 jump the wall you bump into', run(28, () => P => (P.on && Math.abs(P.vx) < 0.5 && cx() > 4*T) ? {jump:30, dir:1} : R(), {max:600}), /timeout|dead/);
  check('29 over the wall, then walk the bridge', run(28, () => script([...climb29, S.R(29)]), {max:1500}), 'dead');
  check('29 over the wall, leap the gap in the bridge', run(28, () => script([...climb29, S.R(13.3), S.J(30, 1), S.R(29)]), {max:1500}), 'dead');
  check('29 follow its hands, and its door', run(28, () => script([...climb29, S.R(13.3), S.J(4, 1), S.R(29)]), {max:1500}), 'dead');
  for (const h of [1, 4, 7]) check(`29 follow its hands, not its door (hop ${h})`, run(28, () => script([...climb29, S.R(13.3), S.J(h, 1), S.R(22.2), S.J(30, 1), S.R(29)]), {max:1500}), 'clear');
  // ---- 30 cave
  check('30 trust the shadows', run(29, () => hopAt([6.6, 14.6, 22.6], 30), {freshMem:true, max:600}), 'dead');
  check('30 look back, then go', solve(29), 'clear');
  return out;
})()
