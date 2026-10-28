(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 56 echo
  const jumps56 = [5.2, 11.0, 19.2, 24.3];
  check('56 walk in the dark', run(55, () => R, {freshMem:true}), 'dead');
  check('56 jump to see, then stop to look', run(55, () => script([S.J(1, 0), S.W(70), S.R(28)]), {freshMem:true}), 'dead');
  const j56 = () => { const i = jumps56.findIndex(x => Math.abs(cx() - x*T) < 5); return i < 0 ? null : {jump: i === 1 ? 7 : 30, dir:1}; };
  const keepGoing = () => P => cx() > 28.6*T ? Lk() : (P.on && j56()) || R();
  check('56 jump where needed, keep moving', run(55, keepGoing, {freshMem:true}), 'clear');
  // ---- 57 bomb
  const bomb = () => g.S.bomb, bx = () => bomb() ? bomb().x + 12 : null;
  check('57 kick it and follow it', run(56, () => R, {freshMem:true, max:1500}), 'dead');
  check('57 kick it, then stay away', run(56, () => script([S.R(4.6), S.L(1.5), S.W(600)]), {freshMem:true, max:1200}), 'timeout');
  const kickTo = (dist) => () => { let ph = 0; return P => { const b = bomb(); if (!b) return ph > 0 && cx() < 27*T ? R() : N();
      const dx = b.x + 12 - cx();
      if (b.x < 660 && b.vx === 0) { ph = 1; return R(); }              // kick it again
      if (b.vx !== 0) return Math.abs(dx) < 200 ? Lk() : N();        // keep away while it rolls
      if (Math.abs(dx) > dist + 6) return R(); if (Math.abs(dx) < dist - 6) return Lk(); return N(); }; };
  check('57 send it to the wall, then stand right next to it', run(56, kickTo(60), {freshMem:true, max:2400}), 'dead');
  check('57 send it to the wall, then wait not too near, not too far', run(56, kickTo(140), {freshMem:true, max:2400}), 'clear');
  // ---- 58 laws
  check('58 jump the pit, then the wall', run(57, () => P => (P.on && (Math.abs(cx() - 5.4*T) < 5 || Math.abs(cx() - 13.6*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  const ride = (extra) => script([...(extra || []), S.R(6.5), S.U(() => g.S.lift.x > 7.9*T, {}), S.R(13.6), S.J(30, 1), S.W(5), S.U(() => g.P.on, {}), S.L(17.6), S.W(200)]);
  check('58 wait for the lift, jump the wall, back to the door', run(57, () => script([S.R(5.3), S.U(() => g.S.lift.x < 6.1*T && g.S.lt % 260 < 30, {}), S.R(7.0), S.U(() => g.S.lift.x > 7.9*T, {}), S.R(13.6), S.J(30, 1), S.U(() => g.P.on, {right:true}), S.L(17.5)]), {freshMem:true, max:2000}), 'clear');
  check('58 a little step back before the lift', run(57, () => script([S.R(5.3), S.K({left:true}, 4), S.U(() => g.S.lift.x < 6.1*T && g.S.lt % 260 < 30, {}), S.R(7.0), S.U(() => g.S.lift.x > 7.9*T, {}), S.R(13.6), S.J(30, 1), S.U(() => g.P.on, {right:true}), S.L(17.5)]), {freshMem:true, max:2000}), 'dead');
  check('58 hesitate before the wall', run(57, () => script([S.R(5.3), S.U(() => g.S.lift.x < 6.1*T && g.S.lt % 260 < 30, {}), S.R(7.0), S.U(() => g.S.lift.x > 7.9*T, {}), S.R(12.6), S.W(60), S.R(13.6), S.J(30, 1), S.U(() => g.P.on, {right:true}), S.L(17.5)]), {freshMem:true, max:2000}), 'dead');
  return out;
})()
