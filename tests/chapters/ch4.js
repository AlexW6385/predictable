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
  const hall33 = [S.JT(7.3, GY, {tol:6}), S.U(P => P.on), S.JT(11.3, GY, {tol:6}), S.U(P => P.on), S.R(12.2), S.J(30, 1), S.U(P => P.on)];
  const steps33 = [S.R(19.6), S.JT(23.6, GY, {tol:10}), S.U(P => P.on), S.R(24.9), S.W(6), S.J(30, 1), S.U(P => P.on), S.W(6), S.R(26.4), S.W(6), S.J(30, 1), S.U(P => P.on), S.W(6),
    S.R(28.0), S.W(6), S.J(30, 1), S.U(P => P.on), S.W(6), S.L(29.0), S.W(6), S.J(30, -1), S.U(P => P.on), S.L(1.0), S.U(P => P.on && P.y > 400), S.R(1.4), S.W(30)];
  check('33 walk to the door', run(32, () => script([S.L(1.6), S.W(200)]), {max:400}), 'timeout');
  check('33 walk on, taking the coins', run(32, () => R, {max:900}), 'timeout');
  check('33 take a coin in the open, then one behind the pillar, home over the roof', run(32, () => script([S.JT(7.3, GY, {tol:6}), S.U(P => P.on), S.R(9.6), S.R(12.2), S.J(30, 1), S.U(P => P.on), ...steps33]), {max:2400}), 'timeout');
  check('33 take a coin behind the pillar, come back over it', run(32, () => script([...hall33, S.R(16.6), S.L(15.0), S.J(30, -1), S.U(P => P.on), S.L(1.6), S.W(30)]), {max:1800}), 'timeout');
  check('33 take both coins behind the pillar', run(32, () => script([...hall33, S.R(21.6), ...steps33.slice(2)]), {max:2400}), 'timeout');
  check('33 come home over the roof with nothing', run(32, () => script([S.F(() => { for (const c of g.S.cs) c.alive = false; return {k:{}}; }, (P, k) => k >= 1), ...hall33, ...steps33]), {max:2400}), 'timeout');
  check('33 take one coin behind the pillar, come home over the roof', run(32, () => script([...hall33, S.R(16.6), ...steps33]), {max:2400}), 'clear');
  // ---- 34 measure
  const enough34 = (P, pit) => { for (let h = 1; h <= 30; h++) { const r = window.LIB.sim(h, 1, GY); if (r.c > pit.x + pit.w + 12) return {jump:h, dir:1}; } return {jump:30, dir:1}; };
  const edge34 = P => g.S.pits.find(p => p.x > P.x && p.x - (P.x + 22) < 6 && p.x - (P.x + 22) > -2);
  check('34 full jumps', run(33, () => P => (P.on && g.S.pits.some(p => p.x > P.x && p.x - (P.x + 22) < 6)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('34 always just enough', run(33, () => P => { const pit = edge34(P); if (P.on && pit) return enough34(P, pit); return R(); }, {freshMem:true}), 'dead');
  check('34 a hop on the spot before each gap, then just enough', run(33, () => { const done = new Set(); let ph = 0, hop = false; return P => {
      if (!P.on) return hop ? {k:{}} : R(); hop = false;
      const nx = g.S.pits.find(p => p.x > P.x + 11);
      if (nx && !done.has(nx) && P.x + 22 >= nx.x - 44) { if (Math.abs(P.vx) > 0.05) return {k:{}}; if (++ph < 8) return {k:{}}; ph = 0; done.add(nx); hop = true; return {jump:3, dir:0}; }
      const pit = edge34(P); if (pit) return enough34(P, pit); return R(); }; }, {freshMem:true, max:2400}), 'clear');
  // ---- 35 up is a choice
  check('35 just walk', run(34, () => R), 'dead');
  check('35 flip up, walk on upside down', run(34, () => script([S.R(6.2), S.J(1, 1), S.U(P => P.on, {right:true}), S.R(29)])), 'dead');
  check('35 flip up, flip down under the door', run(34, () => script([S.R(6.2), S.J(1, 1), S.U(P => P.on, {right:true}), S.R(14.5), S.J(1, 1), S.U(P => P.on, {right:true}), S.R(25.6), S.W(10), S.J(1, 0), S.W(200)]), {max:900}), 'timeout');
  check('35 come down past the hole, step back into it', run(34, () => script([S.R(6.2), S.J(1, 1), S.U(P => P.on, {right:true}), S.R(14.5), S.J(1, 1), S.U(P => P.on, {right:true}), S.L(17.6), S.U(P => P.on && P.y < 200), S.R(26.6)]), {max:1200}), 'clear');
  // ---- 36 portal
  const go36 = (tx, until) => S.F(() => ({k:{left: cx() > tx*T + 3, right: cx() < tx*T - 3}}), until);
  const thru36 = (P, k, st) => { if (P.vy > 0) st.down = true; return st.down && P.vy < -2; };
  const up36 = S.F(() => ({jump:30, dir:0}), (P, k) => k >= 1);
  const onL1 = [go36(11, (P, k) => k > 40), up36, go36(9, thru36), go36(24.5, (P, k) => P.on && k > 5)];
  check('36 walk into a portal', run(35, () => script([S.L(5), go36(3, (P, k) => k > 200), S.L(1), S.W(30)]), {max:900}), 'timeout');
  check('36 jump into a portal from the floor, steer for the door', run(35, () => script([S.R(13), go36(11, (P, k) => k > 30), up36, go36(21.5, thru36), go36(3, (P, k) => P.on && k > 5), S.L(1), S.W(30)]), {max:900}), 'timeout');
  check('36 onto the low ledge, step off into the portal', run(35, () => script([...onL1, go36(21.5, thru36), go36(3, (P, k) => P.on && k > 5), S.L(1), S.W(30)]), {max:900}), 'timeout');
  check('36 onto the low ledge, jump off into the portal', run(35, () => script([...onL1, go36(23.5, (P, k) => k > 30), up36, go36(21.5, thru36), go36(3, (P, k) => P.on && k > 5), S.L(2), S.W(30)]), {max:1200}), 'clear');
  // ---- 37 hard landing
  const creep37 = S.F(P => ({k:{right: Math.abs(P.vx) < 0.4}}), P => !P.on);
  const down37 = [creep37, S.U(P => P.on), S.W(10), creep37, S.U(P => P.on), S.W(4)];
  check('37 run off every ledge', run(36, () => R), 'dead');
  check('37 jump every gap', run(36, () => P => (P.on && [5.5, 7.2, 14.6, 16.2].some(x => Math.abs(cx() - x*T) < 6)) ? {jump:30, dir:1} : R()), 'dead');
  check('37 step down slowly, creep along the brittle step', run(36, () => script([...down37, S.F(P => ({k:{right: Math.abs(P.vx) < 0.4}}), P => cx() > 15*T), S.R(28)])), 'dead');
  check('37 step down slowly, run the brittle step and off its end', run(36, () => script([...down37, S.R(28)])), 'dead');
  check('37 step down slowly, run the brittle step, stop at its end', run(36, () => script([...down37, S.R(14.2), S.U(P => !P.on), S.U(P => P.on), S.R(28)])), 'clear');
  // ---- 38 wheel
  const over38 = [S.R(5.6), S.JT(12.1, GY, {tol:10}), S.U(P => P.on), S.W(4)];
  const top38 = [S.U(() => g.S.A.y <= 192), S.W(10), S.JT(15.5, 192, {tol:16}), S.U(P => P.on), S.R(28)];
  check('38 walk on', run(37, () => R, {freshMem:true}), /dead|timeout/);
  check('38 stand by the block', run(37, () => script([S.R(7.6), S.W(400)]), {max:700}), 'dead');
  check('38 over the block, push the crate off the far side', run(37, () => script([...over38, S.R(13.5), S.W(200)]), {max:900}), /dead|timeout/);
  check('38 no key: push the crate onto the block\'s tray, ride up', run(37, () => script([S.F(() => { for (const e of g.ents) if (e.t === 'key') e.alive = false; return {k:{}}; }, (P, k) => k >= 1), ...over38, S.F(() => ({k:{left:true}}), () => g.S.A.y < 446), ...top38]), {max:2000}), 'timeout');
  check('38 key: push the crate onto the block\'s tray, ride up', run(37, () => script([...over38, S.F(() => ({k:{left:true}}), () => g.S.A.y < 446), ...top38]), {max:2000}), 'clear');
  check('38 key: push the crate across and keep walking', run(37, () => script([...over38, S.L(7), S.W(300)]), {max:2000}), /dead|timeout/);
  // ---- 39 ferry
  const key39 = x => [x > 2 ? S.R(x) : S.L(x), S.K({}, 8), S.J(30, 0), S.U(P => P.on)];
  const ride39 = [S.R(7.6), S.W(20), S.U(() => g.S.g.x >= 20*T), S.R(28)];
  check('39 walk across', run(38, () => R), 'dead');
  check('39 stand on it with no keys', run(38, () => script([S.R(8.4), S.W(500)]), {max:700}), 'timeout');
  check('39 take one key, stand on it', run(38, () => script([...key39(3.875), S.R(8.4), S.W(500)]), {max:900}), 'timeout');
  check('39 take all three keys', run(38, () => script([...key39(3.875), ...key39(5.19), ...key39(6.5), S.R(8.4), S.W(300)]), {max:1200}), 'dead');
  check('39 take two keys and ride', run(38, () => script([...key39(3.875), ...key39(6.5), ...ride39]), {max:1800}), 'clear');
  // ---- 40 balance
  const hopOn = [S.L(13.0), S.W(10), S.R(13.25), S.J(30, 1), S.U(P => P.on, {right:true})];
  const stopShort = [S.F(R, () => g.S.blk.st === 'fall'), S.R(20.4), S.W(80)], home40 = [S.L(1.6), S.W(30)];
  check('40 take the keys as you meet them', run(39, () => script([...upR(9.5), ...upR(11.5), ...hopOn, ...stopShort, ...home40]), {max:2400}), 'timeout');
  check('40 top key first, then walk on', run(39, () => script([...upR(11.5), ...upL(9.5), ...hopOn, S.R(29)]), {max:2000}), 'dead');
  check('40 no keys, stop short of it', run(39, () => script([...hopOn, ...stopShort, ...home40]), {max:2000}), 'timeout');
  check('40 top key first, stop on the box\'s side of the middle', run(39, () => script([...upR(11.5), ...upL(9.5), ...hopOn, S.F(R, () => g.S.blk.st === 'fall'), S.W(80), ...home40]), {max:2400}), 'timeout');
  check('40 top key first, stop short of it on its side', run(39, () => script([...upR(11.5), ...upL(9.5), ...hopOn, ...stopShort, ...home40]), {max:2400}), 'clear');
  return out;
})()
