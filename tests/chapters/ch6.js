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
    if (!P.on) return R();
    for (const b of g.S.balls) { const dx = wd(b.x, pc); if (dx > 0 && dx < 40) return {jump:30, dir:1}; if (dx <= 0 && dx > -90) return R(); }
    if (g.S.coins >= 3) { const d = wd(27.5*T, pc); return Math.abs(d) < 6 ? N() : R(); }
    if (!slow) return R();
    // a coin with a ball beyond it: close in slowly; a ball still far beyond the coins: wait for it to come
    const ahead = g.S.cs.filter(c => c.alive && wd(c.x + 8, pc) > 0);
    const pinned = ahead.some(c => wd(c.x + 8, pc) < 160 && g.S.balls.some(b => { const e = wd(b.x, c.x + 8); return e > 0 && e < 100; }));
    if (pinned) return {k:{right: Math.abs(g.P.vx) < 2.2}};
    const coming = ahead.some(c => g.S.balls.some(b => { const e = wd(b.x, c.x + 8); return e > 0 && e < 360; }));
    return coming ? N() : {k:{right: Math.abs(g.P.vx) < 2.4}}; };
  check('52 stand and wait', run(51, () => N, {max:1500}), 'dead');
  check('52 run after them', run(51, pol52(false), {max:3000}), /timeout|dead/);
  check('52 walk slowly after them, never dodging', run(51, () => P => ({k:{right: Math.abs(g.P.vx) < 2.4}}), {max:3000}), /timeout|dead/);
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
  check('54 sneak past them all, leave the bull asleep', run(53, () => script([...sneak, S.JT(21.2, GY, {tol:16}), S.F(slowR, () => cx() > 28*T)]), {max:1500}), 'timeout');
  check('54 sneak past the guards, wake the bull at the wall, dodge it', run(53, () => { const a = script([...sneak, S.JT(21.2, GY, {tol:16}), S.U(P => P.on), S.F(slowR, () => cx() > 22.1*T), S.W(8), S.J(30, 0), S.W(2)]); let done = false; return (P, f) => { if (!done) { const r = a(P, f); if (g.S.bull.st !== 'sleep' && P.on) done = true; return r; } return dodge()(P, f); }; }, {max:2000}), 'clear');
  // ---- 55 dream
  const sleepW = () => S.U(() => g.S.sleep, {});
  const sleepWalk = x => S.F(P => ({k:{right: Math.abs(g.P.vx) < 2.4}}), () => cx() > x*T || !g.S.sleep);
  check('55 run', run(54, () => R), 'dead');
  check('55 jump the pit', run(54, () => script([S.R(3.3), S.J(30, 1), S.W(200)])), 'dead');
  check('55 fall asleep, then walk across everything', run(54, () => script([S.R(3.3), S.W(10), sleepW(), sleepWalk(27.5), S.R(27.5)]), {max:2400}), 'dead');
  check('55 asleep to the island, wait for him there, then sleep and cross', run(54, () => script([S.R(3.3), S.W(10), sleepW(), sleepWalk(11.3), S.W(4), S.U(() => g.S.gd.gone), S.W(20), sleepW(), sleepWalk(27.6), S.R(27.6), S.W(30)]), {max:3000}), 'clear');
  check('55 asleep to the island, walk on while he comes', run(54, () => script([S.R(3.3), S.W(10), sleepW(), sleepWalk(11.3), S.W(4), S.U(() => g.S.gd.awake), sleepWalk(27.6), S.R(27.6)]), {max:3000}), 'dead');
  // ---- 56 snake
  check('56 get the key, come back', run(55, () => script([S.R(28.4), S.L(1.5)]), {max:1500}), 'dead');
  check('56 get the key, stop to think', run(55, () => script([S.R(28.4), S.W(150)]), {max:600}), 'dead');
  check('56 pause on the way, then go', run(55, () => script([S.R(20), S.W(40), S.R(28.4), S.L(1.5)]), {max:1500}), 'dead');
  check('56 hop on the spot on the way, walk on, then come back', run(55, () => script([S.R(18), S.W(4), S.J(30, 0), S.U(P => P.on), S.R(28.4), S.W(30), S.L(1.5)]), {max:1500}), 'clear');
  check('56 step back and forth on the way, walk on, then come back', run(55, () => script([S.R(20), S.L(18.6), S.R(28.4), S.W(30), S.L(1.5)]), {max:1500}), 'clear');
  // ---- 57 seed
  const cones = () => (g.S.cones || []).filter(c => c.st === 'fall');
  const seedAt = lo => () => g.S.vg.beds.find(b => b.seed && (b.x + b.w/2) < lo*T);
  const growOn = x => [S.F(P => ({k:{right: cx() < x*T - 3, left: cx() > x*T + 3}}), () => Math.abs(cx() - x*T) <= 3 && Math.abs(g.P.vx) < 0.3), S.W(260)];
  check('57 run right', run(56, () => R), 'dead');
  check('57 cross the line, dodge, grow what lands over there', run(56, () => script([S.R(15.0), S.L(13.0), S.U(() => !cones().length), S.W(5), ...growOn(16.2), S.L(1)]), {max:1500}), /timeout|dead/);
  check('57 grow a vine under the ledge', run(56, () => script([...growOn(4), S.L(2.5), S.W(30)]), {max:1500}), 'timeout');
  check('57 walk back across the line slowly, turn, grow it', run(56, () => script([S.R(14.5), S.W(20), S.F(() => ({k:{left: Math.abs(g.P.vx) < 1.5}}), () => cx() < 11.5*T), S.R(13), S.U(() => !cones().length), S.W(10),
    S.F(P => { const b = g.S.vg.beds.find(b => b.seed); return b ? {k:{right: cx() < b.x + b.w/2 - 3, left: cx() > b.x + b.w/2 + 3}} : {k:{}}; }, () => { const b = g.S.vg.beds.find(b => b.seed); return b && Math.abs(cx() - b.x - b.w/2) <= 3 && Math.abs(g.P.vx) < 0.3; }), S.W(260), S.L(1)]), {max:2000}), /timeout|dead/);
  check('57 run back across the line toward the ledge, turn, grow it', run(56, () => script([S.R(16.5), S.W(40), S.L(9.5), S.R(11.0), S.U(() => !cones().length), S.W(10), ...growOn(6.5), S.U(P => P.y + 28 <= 226), S.L(2.5), S.W(30)]), {max:2000}), 'clear');
  // ---- 58 flock
  const tap = () => ({k:{right: Math.abs(g.P.vx) < 2.4}});
  const soft58 = x => S.F(tap, () => cx() > x*T);
  const tapL = () => ({k:{left: Math.abs(g.P.vx) < 2.4}}), softL58 = x => S.F(tapL, () => cx() < x*T), stamp58 = [S.W(10), S.J(30, 0), S.U(P => P.on), S.U(() => !g.S.fl.away)];
  check('58 run across', run(57, () => R), 'dead');
  check('58 jump onto them', run(57, () => script([S.R(5.2), S.J(30, 1), S.R(29)]), {max:900}), 'dead');
  check('58 stamp at the start: they fly to the far gap', run(57, () => script([S.R(4), S.J(30, 0), S.W(300), soft58(29)]), {max:1200}), 'dead');
  check('58 walk softly across, and on over the second gap', run(57, () => script([soft58(29)]), {max:1500}), 'dead');
  check('58 walk softly across, stamp at the far end of the island', run(57, () => script([soft58(16.3), ...stamp58, soft58(29)]), {max:1500}), 'dead');
  check('58 out, take the key, stamp on the far bank, come back', run(57, () => script([soft58(12.6), ...stamp58, soft58(27.4), S.W(10), S.J(30, 0), S.U(P => P.on), S.U(() => !g.S.fl.away), softL58(1.4)]), {max:2400}), /dead|timeout/);
  check('58 out, take the key, back to the island, stamp at its far end, come back', run(57, () => script([soft58(12.6), ...stamp58, soft58(27.4), softL58(16.3), ...stamp58, softL58(1.4), S.W(30)]), {max:3000}), 'clear');
  // ---- 59 mimic
  const hop = (x, y) => [S.U(P => P.on), S.JT(x, y, {tol:10})];
  const to2 = [...hop(5.5, 416), ...hop(8.5, 384)];
  check('59 step to the next stone after a stone', run(58, () => script([...to2, ...hop(11.5, 384), S.W(30)]), {max:900}), 'dead');
  check('59 wood, stone, wood, then the next wood', run(58, () => script([...to2, ...hop(12.5, 352), ...hop(15.5, 384), S.W(30)]), {max:900}), 'timeout');
  check('59 wood, stone, wood, stone, then the next stone', run(58, () => script([...to2, ...hop(12.5, 352), ...hop(17.5, 416), ...hop(19.5, 384), S.W(30)]), {max:900}), 'dead');
  check('59 never trust the same look twice in a row', run(58, () => script([...to2, ...hop(12.5, 352), ...hop(17.5, 416), S.W(30)]), {max:1500}), 'dead');
  check('59 change your mind twice, then trust the same look again', run(58, () => script([...to2, ...hop(12.5, 352), ...hop(15.5, 384), ...hop(19.5, 384), ...hop(23.5, 416), ...hop(26.0, GY), S.R(27.6), S.W(30)]), {max:1500}), 'clear');
  // ---- 60 life
  const soft60 = x => S.F(tap, () => cx() > x*T), stamp60 = [S.W(6), S.J(30, 0), S.U(P => P.on), S.U(() => !g.S.fl.away)];
  check('60 run', run(59, () => R), 'dead');
  check('60 walk softly across both', run(59, () => script([soft60(28)]), {max:1500}), /dead|timeout/);
  check('60 birds to the second gap, then across to the sleeper', run(59, () => script([soft60(12.6), ...stamp60, soft60(28)]), {max:2000}), 'dead');
  check('60 wake him from the start bank', run(59, () => script([S.F(tap, () => cx() > 4.6*T), S.W(10), S.J(30, 0), S.W(300)]), {max:900}), 'timeout');
  check('60 birds across, wake him, birds back, across', run(59, () => script([soft60(12.6), ...stamp60, S.F(tap, () => cx() > 16.3*T), ...stamp60, S.U(() => g.S.gd.gone),
    S.L(12.6), ...stamp60, soft60(28)]), {max:3000}), 'clear');

  return out;
})()
