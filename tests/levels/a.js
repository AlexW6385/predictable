(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}});
  // ---- L1
  check('L1 chase the door', run(0, () => P => ({k: g.S.door.x + 18 > cx() ? {right:true} : {left:true}}), {max:900}), 'timeout');
  check('L1 walk a bit, then wait', run(0, () => script([S.R(5), S.W(2000)]), {max:900}), 'clear');
  // ---- L2
  const cones = () => g.S.cones.filter(c => c.st === 'fall');
  check('L2 stop when something falls', run(1, () => P => cones().length ? {k:{}} : R()), 'dead');
  check('L2 just run', run(1, () => R), 'dead');
  check('L2 same dodge every time (reverse 10f)', run(1, () => { let n = 0, seen = 0; return P => { const c = g.S.cones.length; if (c > seen) { seen = c; n = 10; } if (n > 0) { n--; return {k:{left:true}}; } return R(); }; }), 'dead');
  check('L2 read each cone, never stop', run(1, () => P => { for (const c of cones()) { const m = Math.max(0, (GY - c.y - 40)/26); const px = cx() + g.P.vx*m; if (Math.abs(px - c.x) < 30) return {k:{left:true}}; } return R(); }), 'clear');
  // ---- L3
  check('L3 jump straight onto the first block', run(2, () => script([S.R(3.5), S.JT(7, 384), S.W(60)])), 'dead');
  check('L3 hop first, then hop block to block', run(2, () => script([S.R(3), S.J(1, 0), S.JT(7, 384), S.JT(12, 384), S.JT(15.3, 416), S.W(60)])), 'dead');
  check('L3 hop, jump, jump, drop, jump, jump', run(2, () => script([S.R(3), S.J(1, 0), S.JT(7, 384), S.JT(12, 384), S.R(16.2), S.JT(20.3, 352), S.JT(26.5, GY, {tol:30}), S.R(28)])), 'clear');
  // ---- L4
  check('L4 just walk', run(3, () => R), 'dead');
  check('L4 jump every hole', run(3, () => P => (P.on && (Math.abs(cx() - 6.6*T) < 6 || Math.abs(cx() - 16.6*T) < 6)) ? {jump:30, dir:1} : R(), {max:700}), 'timeout');
  check('L4 hop the first hole, fall into the second', run(3, () => script([S.R(6.3), S.J(30, 1), S.R(17.5), S.U(P => P.y < 200 && P.on, {right:true}), S.R(29)])), 'clear');
  // ---- L5
  check('L5 go right into the door', run(4, () => R, {lives:3, freshMem:true}), 'fake');
  check('L5 walk left off the screen', run(4, () => P => ({k:{left:true}}), {freshMem:true}), 'clear');
  // ---- L6
  check('L6 refuse to die (wait at the edge)', run(5, () => script([S.R(4), S.W(3000)]), {max:600, freshMem:true}), 'timeout');
  check('L6 die forward, then climb your bodies', run(5, life => P => {
      const crates = g.ents.filter(e => e.t === 'crate').map(e => e.x + 16).sort((a,b) => a-b), pc = cx();
      if (!P.on) return R();
      const nxt = crates.filter(x => x > pc + 20 && x < pc + 170);
      if (pc > 22*T) return R();
      if (P.y > 380 && pc > 4*T && pc < 23*T && !nxt.length) { const goal = 24.5*T; if (goal - pc < 175) return {jumpTo:goal, landY:352, tol:20, k:{right:true}}; return {jump:30, dir:1}; }
      if (nxt.length) return {jumpTo: nxt[nxt.length-1], landY:432, tol:9, k:{right:true}};
      if (pc > 3.6*T) return {jump:30, dir:1};
      return R(); }, {lives:10, freshMem:true}), 'clear');
  // ---- L7
  const grab = xs => P => { for (const x of xs) if (Math.abs(cx() - x*T - 16) < 8 && P.on) return {jump:3, dir:1}; return R(); };
  check('L7 take every key', run(6, () => grab([3, 6, 15, 17]), {max:900}), 'dead');
  check('L7 take three before the second plank', run(6, () => grab([3, 6, 15]), {max:900}), 'dead');
  check('L7 two, then let the tunnel give the third', run(6, () => grab([3, 6]), {max:900}), 'clear');
  // ---- L8
  check('L8 walk on what you see', run(7, () => R), 'dead');
  check('L8 jump the hole you see', run(7, () => script([S.R(6.2), S.J(30, 1), S.R(29)])), 'dead');
  check('L8 learned "+2": jump at true edge, then +2 again', run(7, () => script([S.R(8.6), S.J(30, 1), S.R(14.2), S.J(30,1), S.R(23.6), S.J(30,1), S.R(29)])), 'dead');
  check('L8 follow the dotted shadows', run(7, () => script([S.R(8.6), S.J(30, 1), S.R(14.0), S.J(30, 1), S.R(19.4), S.J(30, 1), S.R(26.6)])), 'clear');
  // ---- L9
  const L = {k:{left:true}};
  check('L9 hold right', run(8, () => R, {max:500}), 'timeout');
  check('L9 hold left, hold jump like always', run(8, () => script([S.K({left:true}, 1), S.U(P => cx() > 6.1*T, {left:true}), S.J(40, -1), S.U(() => false, {left:true})])), 'dead');
  check('L9 hold left, tap jump everywhere', run(8, () => script([S.U(P => cx() > 6.1*T, {left:true}), S.J(1, -1), S.U(P => cx() > 13.3*T, {left:true}), S.J(1, -1), S.U(() => false, {left:true})])), 'dead');
  check('L9 left to go right, tap to go high, hold to stay low', run(8, () => script([S.U(P => cx() > 6.1*T, {left:true}), S.J(1, -1), S.U(P => cx() > 13.4*T, {left:true}), S.J(40, -1), S.U(P => cx() > 20.0*T, {left:true}), S.J(1, -1), S.U(() => false, {left:true})])), 'clear');
  // ---- L10
  const th = () => g.S.th;
  check('L10 run straight', run(9, () => R), 'dead');
  check('L10 careful: walk slow, stop when one falls', run(9, () => { let t = 0; return P => { for (const b of th()) if (b.st === 'fall' || b.st === 'down' || (b.st === 'rise' && b.y + 40 > GY - 34)) { if (b.x + 20 - cx() > 0 && b.x + 20 - cx() < 140) return {k:{}}; } return {k:{right:(t++ % 3) !== 0}}; }; }), 'dead');
  check('L10 learned: dash under everything', run(9, () => P => { for (const b of th()) if (b.mode === 'pred' && (b.st === 'fall' || b.st === 'down' || (b.st === 'rise' && b.y + 40 > GY - 34)) && b.x + 20 - cx() > 0 && b.x + 20 - cx() < 140) return {k:{}}; return R(); }), 'dead');
  check('L10 stop / dash / creep', run(9, () => { let t = 0; return P => { const [a, b2, c] = th(), pc = cx();
      const busy = b => (b.st === 'fall' || b.st === 'down' || (b.st === 'rise' && b.y + 40 > GY - 34)) && b.x + 20 - pc > 0 && b.x + 20 - pc < 140;
      if (busy(a) || busy(c)) return {k:{}};
      if (pc > 17*T && pc < c.x + 40) return {k:{right:(t++ % 2) === 0}};
      return R(); }; }), 'clear');
  return out;
})()
