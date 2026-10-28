(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}});
  // ---- L11 gravity flip
  const flipAt = xs => () => { let i = 0; return P => { if (i < xs.length && cx() >= xs[i]*T && P.on) { i++; return {jump:1, k:{right:true}}; } return R(); }; };
  check('L11 flip when the spikes are right in front', run(10, flipAt([7.2, 13.2, 19.2])), 'dead');
  check('L11 flip early, and early again before the pair', run(10, flipAt([3.5, 11.0, 17.6])), 'clear');
  // ---- L12 the eye's gaze
  g.prof.eyeLR = [];
  check('L12 go right (most people do)', run(11, () => R), 'dead');
  g.prof.eyeLR = [];
  check('L12 go right, then right again', run(11, () => R, {lives:2}), 'dead');
  g.prof.eyeLR = ['R','L','R'];
  check('L12 alternate (history R L R)', run(11, () => Lk), 'dead');
  g.prof.eyeLR = ['L','L'];
  check('L12 read the eye: take the door it is not watching', run(11, () => P => g.S.trap === 'L' ? R() : Lk()), 'clear');
  // ---- L13 blink
  check('L13 the eye looks at me, so pick a door and go', run(12, () => Lk), 'dead');
  check('L13 wait beside a door for a blink', run(12, () => script([S.L(10.7), S.W(4000)]), {max:900}), 'timeout');
  check('L13 wait in the middle, run when it closes', run(12, () => P => g.S.eye.ph === 'closing' || g.S.eye.ph === 'closed' ? Lk() : {k:{}}, {max:900}), 'clear');
  // ---- L14 the laser
  check('L14 stand still', run(13, () => P => ({k:{}})), 'dead');
  check('L14 walk to the hut and wait for it to open', run(13, () => R, {max:900}), 'dead');
  check('L14 run at the hut so it aims at the hut, then turn', run(13, () => { let phase = 'set'; return P => { const L = g.S.las, pc = cx(), broken = g.ents.some(e => e.t === 'bb' && !e.alive && e.x === 24*T);
      if (broken && L.ph !== 'aim') return pc < 26*T ? (P.on && pc > 22.6*T && pc < 23.2*T ? {jump:30, dir:1} : R()) : {k:{}};
      if (L.ph === 'aim') return Math.abs(L.tx - pc) < 60 ? (P.vx > 1 ? Lk() : R()) : Lk();
      if (L.ph === 'fire') return {k:{}};
      if (pc < 15.5*T && !(L.ph === 'idle' && L.t <= 22)) return R();
      if (L.ph === 'idle' && L.t <= 22) return R();
      return pc > 16.2*T ? Lk() : {k:{}}; }; }, {max:2000}), 'clear');
  // ---- L15 the raft
  check('L15 just walk', run(14, () => R), 'dead');
  check('L15 never touch anything', run(14, () => P => ({k:{}}), {max:1200}), 'dead');
  check('L15 wait, and step off only at the end', run(14, () => P => (g.S.raft.x >= 23*T) ? R() : {k:{}}, {max:1200}), 'clear');
  // ---- L16 marks
  check('L16 walk', run(15, () => R), 'dead');
  check('L16 avoid the X marks', run(15, () => script([S.R(3.3), S.JT(6.5), S.R(29)])), 'dead');
  check('L16 the marks lie everywhere', run(15, () => script([S.R(5.5), S.J(10, 1), S.R(10.5), S.J(10, 1), S.R(29)])), /dead@1[78]/);
  check('L16 left: the marks lie; right: the marks are true', run(15, () => script([S.R(5.5), S.J(10, 1), S.R(10.5), S.J(10, 1), S.R(17.5), S.J(10, 1), S.R(22.5), S.J(10, 1), S.R(27.5)])), 'clear');
  // ---- L17 thorns
  check('L17 key, then walk back the way you came', run(16, () => script([S.R(27.5), S.L(2)]), {max:900}), 'dead');
  check('L17 wait at the start', run(16, () => P => ({k:{}}), {max:400}), 'dead');
  check('L17 key, then come back over the top', run(16, () => script([S.R(27.6), S.JT(25.5, 384, {dir:-1}), S.JT(21.5, 352, {dir:-1}), S.JT(16.5, 352, {dir:-1}), S.JT(11.5, 352, {dir:-1}), S.JT(6.5, 352, {dir:-1}), S.L(2.2)]), {max:1200}), 'clear');
  // ---- L18 box
  check('L18 push the box into the hole', run(17, () => R, {max:600}), /timeout|dead/);
  check('L18 stand on the plate, then run', run(17, () => script([S.L(2.6), S.W(120), S.R(28)])), 'dead');
  check('L18 put the box on the plate and wait', run(17, () => script([S.R(5), S.J(30, 1), S.F(P => ({k:{left:true}}), () => g.S.box.x <= 70), S.W(100), S.R(28)]), {max:1500}), 'clear');
  // ---- L19 fork
  const upper = () => script([S.JT(4.8, 384), S.JT(8.2, 352, {maxPeak:40, tol:14}), S.R(29)]);
  g.prof.mem = null;
  check('L19 alternate corridors (L, U, L)', run(18, life => life % 2 === 0 ? R : upper(), {lives:3, freshMem:true}), 'dead');
  check('L19 go back where you died (L, L)', run(18, life => R, {lives:2, freshMem:true}), 'clear');
  // ---- L20 ghost
  const plats = () => script([S.JT(4.8, 384), S.JT(9.5, 352), S.R(12.3), S.JT(15.5, 352), S.R(19.3), S.JT(22.5, 352), S.R(29)]);
  check('L20 walk the ground both times', run(19, life => R, {lives:2, freshMem:true}), 'dead');
  check('L20 ground first, then the platforms', run(19, life => life === 0 ? R : plats(), {lives:2, freshMem:true}), 'clear');
  return out;
})()
