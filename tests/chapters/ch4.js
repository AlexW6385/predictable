(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const clean = id => { g.prof.marks[id] = []; };
  // stop under something, then jump straight up
  const upR = c => [S.R(c + 0.5), S.W(15), S.J(30, 0)], upL = c => [S.L(c + 0.5), S.W(15), S.J(30, 0)];
  // ---- 31 enough
  check('31 take each key as you meet it', run(30, () => script([...upR(9), ...upR(14), ...upR(19), ...upR(24), S.L(1.8), S.W(120)]), {max:1800}), 'timeout');
  check('31 take all four, from the top down', run(30, () => script([...upR(24), ...upL(19), ...upL(14), ...upL(9), S.L(1.8), S.W(60)]), {max:1800}), 'dead');
  check('31 three from the top down, leave the last', run(30, () => script([...upR(24), ...upL(19), ...upL(14), S.L(1.8), S.W(60)]), {max:1800}), 'clear');
  check('31 the second-highest first works too', run(30, () => script([...upR(19), ...upL(14), ...upL(9), S.L(1.8), S.W(60)]), {max:1800}), 'clear');
  // ---- 32 seesaw
  check('32 jump at the ledge', run(31, () => script([S.R(7.6), S.W(10), S.J(30, -1), S.W(30), S.R(7.6), S.W(10), S.J(30, -1), S.W(60)]), {max:900}), 'timeout');
  check('32 cross the plank', run(31, () => R), 'dead');
  check('32 run at it, turn back to the far end, ride up', run(31, () => script([S.R(14.6), S.L(9.6), S.U(P => !P.on), S.U(P => P.on && P.y < 300, {left:true}), S.L(2.6), S.W(30)]), {max:1200}), 'clear');
  check('32 turn back too late', run(31, () => script([S.R(17.0), S.L(9.6), S.W(200)]), {max:900}), /timeout|dead/);
  // ---- 33 price
  const toSpikes23 = [S.R(8.6), S.J(30, 1), S.R(29)];
  const take23 = [S.R(8.6), S.J(30, 1), S.R(22.3), S.W(12)];
  const homeFloor = [S.L(12.7), S.J(30, -1), S.U(P => P.on, {left:true}), S.L(2.6), S.W(60)];
  const climb = [S.J(30, 1), S.U(P => P.on, {right:true}), S.W(10), S.R(27.0), S.W(10), S.JT(24.0, 288, {dir:-1}), S.W(8), S.L(23.5), S.W(10), S.JT(20.8, 208, {dir:-1}), S.L(0.5), S.U(P => P.on && P.y > 400), S.R(2.6), S.W(30)];
  clean('price'); check('33 walk to the door', run(32, () => script([S.L(2.6), S.W(200)]), {max:400}), 'timeout');
  clean('price'); check('33 die in the open, take that coin home', run(32, life => life === 0 ? R : script([S.R(9.55), S.J(30, 1), S.U(P => P.on, {right:true}), ...homeFloor]), {lives:2, max:1200}), 'timeout');
  clean('price'); check('33 die in its blind spot, carry the coin back past it', run(32, life => life === 0 ? script(toSpikes23) : script([...take23, S.L(13.5), ...homeFloor]), {lives:2, max:1800}), 'timeout');
  clean('price'); check('33 die in its blind spot, come home over the roof', run(32, life => life === 0 ? script(toSpikes23) : script([...take23, ...climb]), {lives:2, max:2400}), 'clear');
  clean('price'); check('33 come home over the roof with nothing', run(32, () => script([S.R(8.6), S.J(30, 1), S.R(22.3), S.W(12), ...climb]), {max:2400}), 'timeout');
  // ---- 34 measure
  check('34 full jumps', run(33, () => P => (P.on && g.S.pits.some(p => p.x > P.x && p.x - (P.x + 22) < 6)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('34 always just enough', run(33, () => P => { const pit = g.S.pits.find(p => p.x > P.x && p.x - (P.x + 22) < 6 && p.x - (P.x + 22) > -2); if (P.on && pit) { for (let h = 1; h <= 30; h++) { const r = window.LIB.sim(h, 1, GY); if (r.c > pit.x + pit.w + 12) return {jump:h, dir:1}; } return {jump:30, dir:1}; } return R(); }, {freshMem:true}), 'clear');
  // ---- 35 up is a choice
  check('35 just walk', run(34, () => R), 'dead');
  check('35 flip up, walk on upside down', run(34, () => script([S.R(6.2), S.J(1, 1), S.U(P => P.on, {right:true}), S.R(29)])), 'dead');
  check('35 flip up, flip down under the door', run(34, () => script([S.R(6.2), S.J(1, 1), S.U(P => P.on, {right:true}), S.R(14.5), S.J(1, 1), S.U(P => P.on, {right:true}), S.R(25.6), S.W(10), S.J(1, 0), S.W(200)]), {max:900}), 'timeout');
  check('35 come down past the hole, step back into it', run(34, () => script([S.R(6.2), S.J(1, 1), S.U(P => P.on, {right:true}), S.R(14.5), S.J(1, 1), S.U(P => P.on, {right:true}), S.L(17.6), S.U(P => P.on && P.y < 200), S.R(26.6)]), {max:1200}), 'clear');
  // ---- 36 portal
  check('36 run off the ledge', run(35, () => R), 'dead');
  check('36 walk down and step into the gold hole', run(35, () => script([S.R(5.5), S.U(() => g.P.y > 430, {right:true}), S.F(P => ({k:{right: cx() < 7.6*T, left: cx() > 8*T}}), () => g.P.vy < -1), S.W(80)]), {max:600}), /timeout|dead/);
  check('36 drop straight in from the top, then drift', run(35, () => script([S.F(P => ({k:{right: Math.abs(g.P.vx) < 0.9}}), () => !g.P.on), S.F(P => ({k:{}}), () => g.P.vy < -1), S.F(R, () => g.P.on), S.R(26.5)]), {max:900}), 'clear');
  // ---- 37 hard landing
  check('37 jump every gap', run(36, () => P => (P.on && [4.4, 10.5, 15.5, 19.5, 23.5].some(x => Math.abs(cx() - x*T) < 6)) ? {jump:30, dir:1} : R()), 'dead');
  check('37 jump the first gap, then step off slowly', run(36, () => script([S.R(4.3), S.J(30, 1), S.F(P => ({k:{right: Math.abs(g.P.vx) < 1}}), () => g.P.y > 430), S.W(30)])), 'dead');
  check('37 jump the first gap, then run off each ledge', run(36, () => script([S.R(4.3), S.J(30, 1), S.R(28)])), 'clear');
  // ---- 38 wheel
  const p38 = (a0, a1) => () => { let jumped = false; return P => { const w = g.S.wh, onW = P.stand && P.stand.wheel;
    if (!jumped) { if (cx() < 5.3*T) return R(); if (Math.abs(P.vx) > 0.1) return N();
      for (let k = 0; k < 4; k++) { const ang = ((w.a + k*Math.PI/2) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI); if (ang > a0 && ang < a1) { jumped = true; return {jump:30, dir:1}; } } return N(); }
    if (onW) { const p = P.stand, ang = Math.atan2(p.y - w.cy, p.x + 32 - w.cx); return Math.abs(ang) < 0.25 ? {jump:30, dir:1} : N(); }
    return R(); }; };
  check('38 jump at the platform when it is in front of you', run(37, p38(3.65, 3.8), {max:900}), 'dead');
  check('38 jump where it will be after it hurries', run(37, p38(2.95, 3.1), {max:1500}), 'clear');
  // ---- 39 shy raft
  check('39 walk across on it', run(38, () => R), 'dead');
  check('39 stand on it, facing the far bank', run(38, () => script([S.R(7.0), S.W(400)]), {max:600}), 'timeout');
  check('39 face back, ride, then walk to the door', run(38, () => script([S.R(7.0), S.K({left:true}, 2), S.U(() => g.S.raft.x >= 21*T), S.R(29)]), {max:1500}), /dead|timeout/);
  check('39 face back, ride, and keep your back to the door', run(38, () => script([S.R(7.0), S.K({left:true}, 2), S.W(900)]), {max:1500}), 'clear');
  // ---- 40 balance
  const hopOn = [S.L(13.0), S.W(10), S.R(13.25), S.J(30, 1), S.U(P => P.on, {right:true})];
  const stopShort = [S.F(R, () => g.S.blk.st === 'fall'), S.W(80)], home40 = [S.L(1.6), S.W(30)];
  check('40 take the keys as you meet them', run(39, () => script([...upR(9.5), ...upR(11.5), ...hopOn, ...stopShort, ...home40]), {max:2400}), 'timeout');
  check('40 top key first, then walk on', run(39, () => script([...upR(11.5), ...upL(9.5), ...hopOn, S.R(29)]), {max:2000}), 'dead');
  check('40 no keys, stop short of it', run(39, () => script([...hopOn, ...stopShort, ...home40]), {max:2000}), 'timeout');
  check('40 top key first, stop short of it on its side', run(39, () => script([...upR(11.5), ...upL(9.5), ...hopOn, ...stopShort, ...home40]), {max:2400}), 'clear');
  return out;
})()
