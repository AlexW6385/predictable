(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const slowR = () => ({k:{right: Math.abs(g.P.vx) < 1.9}}), slowL = () => ({k:{left: Math.abs(g.P.vx) < 1.9}});
  const clean = id => { g.prof.marks[id] = []; };
  // ---- 51 garden
  check('51 back the way you came', run(50, () => script([S.R(28.6), S.L(2.6)]), {max:1500}), 'dead');
  check('51 stand and think', run(50, () => script([S.W(400)]), {max:600}), 'dead');
  check('51 key, grow a vine, back over the top', run(50, () => script([S.R(28.6), S.L(27.5), S.W(5), S.U(P => P.y + 28 <= 322 && P.on), S.L(20.5), S.J(6, -1), S.L(15.5), S.J(6, -1), S.L(10.5), S.J(6, -1), S.L(2.6), S.W(30)]), {max:2400}), 'clear');
  // ---- 52 hunger
  check('52 chase the coins', run(51, () => P => { const c = g.S.cs.find(c => c.alive); if (!c) return R(); return c.x + 8 > cx() ? R() : Lk(); }, {max:1500}), /timeout|dead/);
  check('52 herd them slowly into the corner', run(51, () => P => { const c = g.S.cs.filter(c => c.alive).sort((a,b) => Math.abs(a.x - cx()) - Math.abs(b.x - cx()))[0];
      if (!c) return cx() < 27.3*T ? R() : cx() > 27.8*T ? Lk() : {k:{}};
      const dir = c.x + 8 > cx() ? 1 : -1; const slow = Math.abs(g.P.vx) < 2.4;
      return dir > 0 ? {k:{right:slow}} : {k:{left:slow}}; }, {max:3000}), 'clear');
  // ---- 53 gaze
  const b2near = () => g.S.b2.x + 12 - cx();
  check('53 walk to the gate and wait', run(52, () => script([S.R(17.3), S.W(3000)]), {max:900}), 'dead');
  check('53 look back while waiting, then walk on', run(52, () => script([S.R(17.3), S.K({left:true}, 2), S.U(() => g.S.open, {}), S.R(28)]), {max:1500}), /dead|timeout/);
  check('53 jump the dark one, then walk at the door', run(52, () => script([S.R(17.3), S.K({left:true}, 2), S.U(() => g.S.open, {}), S.F(P => (P.on && b2near() > 10 && b2near() < 70) ? {jump:30, dir:1} : R(), () => cx() > 23.5*T), S.R(29)]), {max:1500}), /dead|timeout/);
  check('53 jump the dark one, then look away for the door', run(52, () => script([S.R(17.3), S.K({left:true}, 2), S.U(() => g.S.open, {}), S.F(P => (P.on && b2near() > 10 && b2near() < 70) ? {jump:30, dir:1} : R(), () => cx() > 23.5*T), S.U(P => P.on), S.K({left:true}, 2), S.W(300)]), {max:1500}), 'clear');
  // ---- 54 sleepers
  const dodge = () => P => { const b = g.S.bull; const bx = b.x + b.w/2, dx = bx - cx();
    if (b.st === 'charge' && Math.abs(dx) < 90 && Math.sign(dx) === -b.dir && P.on) return {jump:30, dir:0};
    if (!P.on) return N();
    if (!g.ents.some(e => e.t === 'bb' && e.alive)) { if (bx > cx() && dx < 70 && b.st !== 'charge') return {jump:30, dir:1}; return cx() < 27.6*T ? R() : N(); }
    return N(); };
  const sneak = [S.F(slowR, () => cx() > 3.6*T), S.JT(7.6, GY, {tol:12}), S.F(slowR, () => cx() > 9.6*T), S.JT(13.6, GY, {tol:12}), S.F(slowR, () => cx() > 15.8*T)];
  check('54 run', run(53, () => R), 'dead');
  check('54 sneak, hop over the sleepers anywhere', run(53, () => script([S.F(slowR, () => cx() > 3.6*T), S.J(3, 1), S.F(slowR, () => cx() > 9.6*T), S.J(3, 1), S.F(slowR, () => cx() > 28*T)]), {max:1500}), 'dead');
  check('54 sneak past them all, leave the bull asleep', run(53, () => script([...sneak, S.JT(21.6, GY, {tol:16}), S.F(slowR, () => cx() > 28*T)]), {max:1500}), /dead|timeout/);
  check('54 sneak past the guards, wake the bull at the wall, dodge it', run(53, () => { const a = script([...sneak, S.JT(21.6, GY, {tol:16}), S.W(2)]); let done = false; return (P, f) => { if (!done) { const r = a(P, f); if (g.S.bull.st !== 'sleep' && P.on) done = true; return r; } return dodge()(P, f); }; }, {max:2000}), 'clear');
  // ---- 55 dream
  const sleepW = () => S.U(() => g.S.sleep, {});
  check('55 run', run(54, () => R), 'dead');
  check('55 jump the pit', run(54, () => script([S.R(4.3), S.J(30, 1), S.W(200)])), 'dead');
  check('55 fall asleep, then walk across', run(54, () => script([S.R(4.3), S.W(10), sleepW(), S.R(27.5)]), {max:2400}), 'dead');
  check('55 asleep, jump the gap in the dream', run(54, () => script([S.R(4.3), S.W(10), sleepW(), S.R(11.3), S.J(30, 1), S.R(27.5)]), {max:2400}), 'dead');
  check('55 asleep, hop the thorn, sleep again', run(54, () => script([S.R(4.3), S.W(10), sleepW(), S.F(P => ({k:{right: cx() < 17.3*T && Math.abs(g.P.vx) < 2.5}}), () => cx() > 17.25*T), S.JT(20.4, GY, {tol:12}), S.W(10), sleepW(), S.R(27.5)]), {max:2400}), 'clear');
  // ---- 56 snake
  check('56 get the key, come back along the floor', run(55, () => script([S.L(1.5), S.R(28.4)]), {max:1500}), 'dead');
  check('56 get the key, stop to think', run(55, () => script([S.L(1.5), S.W(150)]), {max:600}), 'dead');
  check('56 get the key, come back along the top', run(55, () => script([S.L(1.5), S.JT(2.6, 384, {tol:14}), S.JT(6.0, 320, {tol:20}), S.R(28.4)]), {max:1500}), 'clear');
  // ---- 57 seed
  const cones = () => (g.S.cones || []).filter(c => c.st === 'fall');
  const seedX = () => { const b = g.S.vg.beds.find(b => b.seed); return b ? (b.x + b.w/2)/T : null; };
  check('57 jump at the ledge', run(56, () => script([S.R(19.3), S.W(5), S.J(30, 0), S.W(100)]), {max:600}), /timeout|dead/);
  check('57 run on', run(56, () => R), 'dead');
  check('57 run across the line, then grow a vine where you stand', run(56, () => script([S.R(15.0), S.L(13.0), S.W(300), S.R(25.5)]), {max:1500}), /timeout|dead/);
  check('57 run across the line, turn back, grow what lands', run(56, () => script([S.R(15.0), S.L(13.0), S.U(() => !cones().length && seedX() !== null), S.F(P => ({k:{right: cx() < seedX()*T - 2, left: cx() > seedX()*T + 2}}), () => Math.abs(cx() - seedX()*T) < 3 && Math.abs(g.P.vx) < 0.2), S.U(P => P.y + 28 <= 226), S.R(25.5), S.W(20)]), {max:1500}), 'clear');
  // ---- 58 flock
  const tap = () => ({k:{right: Math.abs(g.P.vx) < 2.4}});
  check('58 run across', run(57, () => R), 'dead');
  check('58 jump onto them', run(57, () => script([S.R(7.2), S.J(30, 1), S.R(29)]), {max:900}), 'dead');
  check('58 walk softly across their backs', run(57, () => script([S.F(tap, () => cx() > 27.4*T)]), {max:1500}), 'clear');
  // ---- 59 mimic
  const upA = [S.R(5.6), S.JT(8.8, 384, {tol:12, minPeak:72}), S.U(P => P.on)];
  check('59 climb the nearest box', run(58, () => script([...upA, S.R(9.4), S.W(12), S.JT(11.5, 384, {tol:10}), S.W(30)]), {max:600}), 'dead');
  check('59 climb the others, take the first door', run(58, () => script([...upA, S.R(9.4), S.W(12), S.JT(13.6, 320, {tol:16}), S.R(14.3), S.W(12), S.JT(17.0, 256, {tol:16}), S.R(20.6), S.W(30)]), {max:900}), 'dead');
  check('59 climb the others, take the still door', run(58, () => script([...upA, S.R(9.4), S.W(12), S.JT(13.6, 320, {tol:16}), S.R(14.3), S.W(12), S.JT(17.0, 256, {tol:16}), S.R(18.6), S.J(30, 1), S.R(25.6), S.W(30)]), {max:900}), 'clear');
  // ---- 60 life
  const seed60 = () => { const b = g.S.vg.beds.find(b => b.seed); return b ? (b.x + b.w/2)/T : null; };
  const toFlock = [S.F(slowR, () => cx() > 2.8*T), S.JT(6.6, GY, {tol:10}), S.F(tap, () => cx() > 16.4*T)];
  check('60 run', run(59, () => R), 'dead');
  check('60 quiet past the guard, then run', run(59, () => script([S.F(slowR, () => cx() > 2.8*T), S.JT(6.6, GY, {tol:10}), S.R(29)]), {max:1500}), 'dead');
  check('60 quiet and soft, then run on', run(59, () => script([...toFlock, S.R(29)]), {max:2400}), 'dead');
  check('60 quiet, soft, then run past the line and let it grow', run(59, () => script([...toFlock, S.R(19.6), S.L(17.6), S.U(() => !cones().length && seed60() !== null), S.F(P => ({k:{right: cx() < seed60()*T - 2, left: cx() > seed60()*T + 2}}), () => Math.abs(cx() - seed60()*T) < 3 && Math.abs(g.P.vx) < 0.2), S.U(P => P.y + 28 <= 226), S.R(27.5), S.W(20)]), {max:2400}), 'clear');
  return out;
})()
