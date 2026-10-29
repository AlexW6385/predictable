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
  const pol52 = slow => () => P => { const pc = cx(), wd = (a, b) => g.lv.wd(a, b);
    for (const b of g.S.balls) { const dx = wd(b.x, pc); if (Math.hypot(dx, b.y - P.y - 14) < 64) return dx > 0 ? Lk() : R(); }
    if (g.S.coins >= 3) { const d = wd(27.5*T, pc); return Math.abs(d) < 6 ? N() : d > 0 ? R() : Lk(); }
    return {k:{right: slow ? Math.abs(g.P.vx) < 2.4 : true}}; };
  check('52 stand and wait', run(51, () => N, {max:1500}), 'dead');
  check('52 run after them', run(51, pol52(false), {max:3000}), /timeout|dead/);
  check('52 walk after them round the world; close in slowly when a ball has it', run(51, pol52(true), {max:4000}), 'clear');
  // ---- 53 gaze
  const perch53 = [S.R(15.3), S.W(4), S.J(30, 0), S.U(P => P.on && P.y < 340)];
  check('53 walk on', run(52, () => R, {max:900}), 'dead');
  check('53 look back the whole time', run(52, () => script([S.R(10), S.K({left:true}, 2), S.W(900)]), {max:900}), 'timeout');
  check('53 jump the dark one', run(52, () => script([S.R(20), S.J(30, 1), S.R(28)]), {max:900}), 'dead');
  check('53 up into the gap, facing on; when they have met, go', run(52, () => script([...perch53, S.U(() => !g.S.b1.alive), S.W(10), S.R(28), S.W(30)]), {max:1500}), 'clear');
  check('53 up into the gap, but look back', run(52, () => script([...perch53, S.K({left:true}, 2), S.W(900)]), {max:1500}), 'timeout');
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
  const soft58 = x => S.F(tap, () => cx() > x*T);
  check('58 run across', run(57, () => R), 'dead');
  check('58 jump onto them', run(57, () => script([S.R(5.2), S.J(30, 1), S.R(29)]), {max:900}), 'dead');
  check('58 stamp at the start: they fly to the far gap', run(57, () => script([S.R(4), S.J(30, 0), S.W(300), soft58(29)]), {max:1200}), 'dead');
  check('58 walk softly across, and on over the second gap', run(57, () => script([soft58(29)]), {max:1500}), 'dead');
  check('58 walk softly across, stamp at the far end of the island', run(57, () => script([soft58(16.3), S.W(10), S.J(30, 0), S.W(250), soft58(29)]), {max:1500}), 'dead');
  check('58 walk softly across, stamp at the near end, walk softly on', run(57, () => script([soft58(12.6), S.W(10), S.J(30, 0), S.W(250), soft58(27.4)]), {max:1500}), 'clear');
  // ---- 59 mimic
  const hop = (x, y) => [S.U(P => P.on), S.JT(x, y, {tol:10})];
  const to2 = [...hop(5.5, 416), ...hop(8.5, 384)];
  check('59 step to the next stone after a stone', run(58, () => script([...to2, ...hop(11.5, 384), S.W(30)]), {max:900}), 'dead');
  check('59 wood, stone, wood, then the next wood', run(58, () => script([...to2, ...hop(12.5, 352), ...hop(15.5, 384), S.W(30)]), {max:900}), 'dead');
  check('59 wood, stone, wood, stone, then the next stone', run(58, () => script([...to2, ...hop(12.5, 352), ...hop(17.5, 416), ...hop(19.5, 384), S.W(30)]), {max:900}), 'dead');
  check('59 never trust the same look twice in a row', run(58, () => script([...to2, ...hop(12.5, 352), ...hop(17.5, 416), ...hop(20.5, 352), ...hop(23.5, 416), ...hop(26.0, GY), S.R(27.6), S.W(30)]), {max:1500}), 'clear');
  check('59 ... or skip the last stone', run(58, () => script([...to2, ...hop(12.5, 352), ...hop(17.5, 416), ...hop(20.5, 352), ...hop(26.0, GY), S.R(27.6), S.W(30)]), {max:1500}), 'clear');
  // ---- 60 life
  const across60 = [S.F(tap, () => cx() > 20.3*T), S.W(20)];
  const scare60 = [S.R(7.4), S.W(10)];
  const grow60 = [S.U(P => P.y + 28 <= 226), S.R(24.5), S.W(30)];
  check('60 run', run(59, () => R), 'dead');
  check('60 walk softly across, wait by the sleeper', run(59, () => script([S.F(tap, () => cx() > 18.8*T), S.W(600)]), {max:1500}), 'timeout');
  check('60 walk softly across, wake him, go back softly', run(59, () => script([S.F(tap, () => cx() > 18.5*T), S.J(30, 0), S.F(P => ({k:{left: Math.abs(g.P.vx) < 2.4}}), () => cx() < 4*T), S.W(300)]), {max:1500}), 'dead');
  check('60 land hard on the first bird', run(59, () => script([S.R(8.3), S.J(30, 1), S.W(200)]), {max:900}), 'dead');
  check('60 frighten the birds from the bank; then across, and grow', run(59, () => script([...scare60, S.U(() => g.S.gd.gone), S.U(() => !g.S.fl.away), ...across60, ...grow60]), {max:2400}), 'clear');
  check('60 frighten the birds, but do not wait for them', run(59, () => script([...scare60, S.U(() => g.S.gd.gone), S.R(20.5), S.W(300)]), {max:2400}), 'dead');

  return out;
})()
