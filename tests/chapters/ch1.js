(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lf = () => ({k:{left:true}});
  // ---- 1 flight
  check('1 chase the door', run(0, () => P => ({k: g.S.door.x + 18 > cx() ? {right:true} : {left:true}}), {max:900}), 'timeout');
  check('1 walk a bit, then let go', run(0, () => script([S.R(5), S.W(2000)]), {max:900}), 'clear');
  // ---- 2 becoming
  const cones = () => g.S.cones.filter(c => c.st === 'fall');
  check('2 stop when something falls', run(1, () => P => cones().length ? {k:{}} : R()), 'dead');
  check('2 just run', run(1, () => R), 'dead');
  check('2 turn back briefly at each cone', run(1, () => { let n = 0, seen = 0; return P => { const c = g.S.cones.length; if (c > seen) { seen = c; n = 10; } if (n > 0) { n--; return Lf(); } return R(); }; }), 'clear');
  check('2 let go like in 1', run(1, () => script([S.R(8), S.W(400)])), 'dead');
  check('2 read each cone, never stop', run(1, () => P => { for (const c of cones()) { const m = Math.max(0, (GY - c.y - 40)/26); const px = cx() + g.P.vx*m; if (Math.abs(px - c.x) < 34) return Lf(); } return R(); }), 'clear');
  check('2 step back from each shadow ahead (a person)', run(1, () => { let back = 0, seen = 0; return P => { const cs = cones(); if (g.S.cones.length > seen) { seen = g.S.cones.length; const c = g.S.cones[seen-1]; back = c.x > cx() - 10 ? 34 : 0; } if (back > 0) { back--; return Lf(); } return R(); }; }), 'clear');
  // ---- 3 the other side
  check('3 let the door come (it is a lie)', run(2, () => script([S.W(900)]), {freshMem:true}), 'fake');
  check('3 chase it to the wall', run(2, () => R, {max:900, freshMem:true}), 'timeout');
  check('3 walk left off the screen', run(2, () => Lf, {freshMem:true}), 'clear');
  // ---- 4 inside out
  check('4 jump straight onto the first block', run(3, () => script([S.R(3.5), S.JT(8, 384), S.W(60)])), 'dead');
  check('4 hop first, then block to block, straight in', run(3, () => script([S.R(3), S.J(1, 0), S.JT(8, 384), S.JT(13, 384), S.JT(18, 384), S.JT(24, GY, {tol:40}), S.R(28)])), 'dead');
  check('4 hop first, block to block, hop again before the door', run(3, () => script([S.R(3), S.J(1, 0), S.JT(8, 384), S.JT(13, 384), S.JT(18, 384), S.JT(24, GY, {tol:40}), S.U(P => P.on), S.J(1, 0), S.U(P => P.on), S.R(28)])), 'clear');
  check('4 the same with full jumps from near each edge', run(3, () => script([S.R(3), S.J(1, 0), S.R(3.6), S.J(30, 1), S.R(9.2), S.J(30, 1), S.R(14.2), S.J(30, 1), S.R(19.2), S.J(30, 1), S.U(P => P.on), S.J(1, 0), S.U(P => P.on), S.R(28)])), 'clear');
  // ---- 5 bashful
  check('5 walk into it', run(4, () => R), 'dead');
  check('5 let go and wait for it', run(4, () => script([S.R(4), S.W(1500)]), {max:1200}), 'timeout');
  check('5 turn round in the air just before it', run(4, () => script([S.R(15.5), S.F(P => ({k:{left: g.P.vy > -6 && !g.P.on, right: g.P.on}, jump: g.P.on ? 30 : 0, dir:1}), P => g.state !== 'play')]), {max:600}), 'dead');
  check('5 run onto the ice, turn round, slide in backwards', run(4, () => script([S.R(6.5), S.K({left:true}, 2), S.W(400)])), 'clear');
  // ---- 6 blink
  check('6 walk into the near door', run(5, () => Lf), 'dead');
  check('6 let go where you start', run(5, () => script([S.W(1200)]), {max:1000}), 'timeout');
  check('6 stop on the bridge', run(5, () => script([S.R(10), S.W(200)])), 'dead');
  check('6 run across to the far door', run(5, () => R), 'dead');
  check('6 stop on the stone, then go too soon', run(5, () => script([S.R(14.7), S.W(60), S.R(28)])), 'dead');
  check('6 stop on the stone, wait for the lid, run', run(5, () => script([S.R(14.7), S.U(() => g.S.lid >= 1), S.R(28)])), 'clear');
  check('6 ... or run back to the near one', run(5, () => script([S.R(14.7), S.U(() => g.S.lid >= 1), S.L(1)])), 'clear');
  // ---- 7 the way you came
  check('7 go for the doors ahead', run(6, () => R), 'dead');
  check('7 let go where you spawn (facing it)', run(6, () => script([S.W(900)])), 'dead');
  check('7 turn your back where you spawn and let go', run(6, () => script([S.K({right:true}, 2), S.W(900)])), 'dead');
  check('7 walk back into it', run(6, () => Lf), 'dead');
  check('7 back over the pit, turn your back, let go', run(6, () => script([S.L(9.6), S.J(30, -1), S.U(P => P.on && cx() < 6.5*T), S.L(4.5), S.K({right:true}, 2), S.W(900)])), 'clear');
  // ---- 8 what it brings
  check('8 let go where you start', run(7, () => script([S.W(1200)])), 'dead');
  check('8 walk at it', run(7, () => R), 'dead');
  check('8 cross the hole, then let go', run(7, () => script([S.L(7.4), S.J(30, -1), S.U(P => P.on && cx() < 3.5*T, {left:true}), S.W(1200)]), {max:1500}), 'clear');
  // ---- 9 asleep
  check('9 run to it', run(8, () => R, {max:900}), 'timeout');
  check('9 jump your way there', run(8, () => P => P.on ? {jump:30, dir:1} : R(), {max:900}), 'timeout');
  check('9 let go and wait (it does not come)', run(8, () => script([S.R(5), S.W(1200)]), {max:900}), 'timeout');
  check('9 run near, then creep the rest', run(8, () => { let t = 0; return P => cx() < 13*T ? R() : {k:{right:(t++ % 8) === 0}}; }, {max:1500}), 'clear');
  // ---- 10 the beginning
  const wake10 = [S.R(10.2), S.J(30, 1), S.R(19.6)];
  check('10 chase the door', run(9, () => P => ({k: g.S.door.x + 18 > cx() ? {right:true} : {left:true}}), {max:900}), /timeout|dead/);
  check('10 let go in the open like in 1', run(9, () => script([S.R(5), S.W(2000)]), {max:900}), 'dead');
  check('10 let go under the roof while it sleeps', run(9, () => script([S.R(10.2), S.J(30, 1), S.R(14.5), S.W(2000)]), {max:900}), 'timeout');
  check('10 wake it, then let go out in the open', run(9, () => script([...wake10, S.W(900)]), {max:1200}), 'dead');
  check('10 wake it, under the roof, let go facing it', run(9, () => script([...wake10, S.L(14.6), S.K({right:true}, 2), S.W(900)]), {max:1500}), 'dead');
  check('10 wake it, under the roof, back to it, let go', run(9, () => script([...wake10, S.L(14.6), S.W(900)]), {max:1500}), 'win');
  return out;
})()
