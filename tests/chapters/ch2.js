(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lf = () => ({k:{left:true}});
  const fc = () => (g.S.cones || []).filter(c => c.st === 'fall');
  const left = c => Math.max(0, ((c.floor ?? GY) - c.y - 40)/26);
  // a person who reads each shadow: if it would land on you, step back from it
  const dodge = P => { for (const c of fc()) { const m = left(c); if (Math.abs(cx() + g.P.vx*m - c.x) < 34) return g.P.vx > 0.5 ? Lf() : R(); } return null; };
  // ---- 11 shelter
  // roof to roof: stop under each roof (except those in skip) until the rain has come down, then leave `d` frames later
  const hop11 = (skip, d) => () => { let target = 0, seen = false, w = 0; return P => {
      const r = g.S.roofs[target]; if (!r) return R();
      if (skip.includes(target) && cx() > r.x) { target++; return R(); }
      if (cx() < r.x + 18) return R();
      if (fc().length) { seen = true; w = 0; return {k:{}}; }
      if (seen && w++ >= d) { seen = false; target++; return R(); }
      return {k:{}}; }; };
  check('11 hide under the first roof', run(10, () => script([S.R(4.6), S.W(3000)]), {max:900}), 'timeout');
  check('11 just run', run(10, () => R), 'dead');
  check('11 dodge the rain', run(10, () => P => dodge(P) || R(), {max:1500}), 'dead');
  check('11 roof to roof, stopping under every one', run(10, hop11([], 0), {max:2500}), 'dead');
  check('11 ... or stopping at the far edge of the third', run(10, () => { const h = hop11([], 0)(); return P => { const r = g.S.roofs[2]; if (cx() > r.x && cx() < r.x + 40 && g.S.streak >= 2) return R(); return h(P); }; }, {max:2500}), 'dead');
  for (const d of [0, 15, 30]) check(`11 roof to roof, but run on past the third (leave after ${d})`, run(10, hop11([2], d), {max:2500}), 'clear');
  check('11 skip the second instead, stop under the rest', run(10, hop11([1], 0), {max:2500}), 'dead');
  check('11 skip the second and the fifth', run(10, hop11([1, 4], 0), {max:2500}), 'clear');
  // ---- 12 hammer
  check('12 run across', run(11, () => R), 'dead');
  check('12 walk to the lid and stand on it', run(11, () => script([S.R(20.5), S.W(600)])), 'dead');
  check('12 jump on the lid', run(11, () => P => cx() > 19.5*T && P.on ? {jump:30, dir:0} : R(), {max:900}), 'dead');
  check('12 run at it, turn back once', run(11, () => script([S.R(15.3), S.L(11), S.W(60), S.R(29)])), 'dead');
  check('12 run at it, turn back, twice', run(11, () => script([S.R(15.3), S.L(11), S.W(60), S.R(15.3), S.L(11), S.W(60), S.R(29)])), 'dead');
  check('12 run at it, turn back, three times; then drop in', run(11, () => script([S.R(15.3), S.L(11), S.W(60), S.R(15.3), S.L(11), S.W(60), S.R(15.3), S.L(11), S.W(60), S.R(20.5), S.W(120)])), 'clear');
  // ---- 13 one step behind
  check('13 stand still', run(12, () => script([S.W(600)])), 'dead');
  check('13 walk to the ledge and jump at it', run(12, () => P => P.on && cx() > 22.6*T ? {jump:30, dir:1} : R(), {max:900}), 'dead');
  check('13 keep walking back and forth', run(12, () => { let d = 1; return P => { if (cx() > 22*T) d = -1; if (cx() < 4*T) d = 1; return {k:{right:d > 0, left:d < 0}}; }; }, {max:1200}), /dead|timeout/);
  check('13 stand at its foot as one falls, step away, climb the stake', run(12, () => { let ph = 0, mark = -1; return P => {
      const pc = cx(), t = g.S.t;
      if (ph === 0) { if (pc < 23.2*T) return R(); ph = 1; return {k:{}}; }
      if (ph === 1) { if ((t - 1) % 50 === 0) { mark = t; ph = 2; } return {k:{}}; }
      if (ph === 2) { if (pc > 19.5*T) return Lf(); ph = 3; return {k:{}}; }
      if (ph === 3) { if (t - mark < 52) return {k:{left: t % 20 < 10, right: t % 20 >= 10}}; ph = 4; }
      if (ph === 4) { if (P.on && pc > 22.2*T && P.y > 400) return {jump:30, dir:1}; if (P.on && P.y < 400 && P.y > 330) return {jump:30, dir:1}; return R(); }
      return R(); }; }, {max:1200}), 'clear');
  // ---- 14 do nothing
  check('14 just walk', run(13, () => R), 'dead');
  check('14 mash', run(13, () => { let t = 0; return P => ({k:{right: (t++ >> 3) % 2 === 0}}); }), 'dead');
  check('14 touch nothing, ever', run(13, () => P => ({k:{}}), {max:1500}), 'dead');
  check('14 keep a hand on it', run(13, () => { let t = 0; return P => ({k:{left: (t++ % 12) === 0}}); }, {max:1500}), 'timeout');
  // when a shadow lands on you, touch something so the raft stops and the cone falls ahead of you; a step back, or a hop where there is headroom
  const raft14 = (how, delay, len) => () => { let n = null, seen = null; return P => { const c = (g.S.cones || []).find(c => c.st === 'fall');
      if (g.S.raft.x >= 23*T - 1) return {k:{right:true}};
      if (c && c !== seen) { seen = c; n = 0; } if (n != null) { n++; if (n > delay && n <= delay + (len || 4)) return how(P); }
      // between cones, a step forward if you have drifted to the back of the raft
      if (!c && P.on && cx() < g.S.raft.x + 36) return {k:{right:true}};
      return {k:{}}; }; };
  for (const d of [3, 15, 28]) check(`14 when the shadow comes, a step back (after ${d})`, run(13, raft14(() => ({k:{left:true}}), d), {max:1800}), 'clear');
  check('14 when the shadow comes, a step back, too late', run(13, raft14(() => ({k:{left:true}}), 42), {max:1800}), 'dead');
  check('14 when the shadow comes, walk on', run(13, raft14(() => ({k:{right:true}}), 3, 30), {max:1800}), 'dead');
  check('14 when the shadow comes, hop (fine, except under the spikes)', run(13, raft14(() => ({k:{jump:true}}), 3, 10), {max:1800}), /clear|dead/);
  check('14 when the shadow comes, hop, but step back under the spikes', run(13, raft14(P => cx() > 12.5*32 && cx() < 17.5*32 ? {k:{left:true}} : {k:{jump:true}}, 3, 6), {max:1800}), 'clear');
  // ---- 15 decoy
  const plats = () => script([S.JT(4.8, 384), S.JT(9.5, 352), S.R(12.3), S.JT(15.5, 352), S.R(19.3), S.JT(22.5, 352), S.R(29)]);
  check('15 walk the ground both times', run(14, life => R, {lives:2, freshMem:true}), 'dead');
  check('15 ground first, then the platforms', run(14, life => life === 0 ? R : plats(), {lives:2, freshMem:true}), 'clear');
  // ---- 16 heavy
  const th = () => g.S.th, tap16 = () => ({k:{right: Math.abs(g.P.vx) < 2.4}}), N = () => ({k:{}});
  check('16 run straight', run(15, () => R), 'dead');
  check('16 creep the whole way', run(15, () => tap16, {max:2000}), 'dead');
  check('16 run, and stop whenever one falls', run(15, () => P => th().some(b => b.st === 'fall') ? N() : R(), {max:2000}), /dead|timeout/);
  check('16 stop for the first, jump it, run under the second, creep under the third', run(15, () => script([S.U(() => th()[0].st === 'fall', {right:true}), S.U(() => th()[0].st === 'down'), S.J(30, 1), S.R(18.5), S.F(tap16, () => cx() > 23.5*T), S.R(28.5), S.W(20)]), {max:2000}), 'clear');
  check('16 ... but stop under the second', run(15, () => script([S.U(() => th()[0].st === 'fall', {right:true}), S.U(() => th()[0].st === 'down'), S.J(30, 1), S.U(P => P.on), S.R(11.5), S.W(60)]), {max:2000}), 'dead');
  check('16 ... and run under the third too', run(15, () => script([S.U(() => th()[0].st === 'fall', {right:true}), S.U(() => th()[0].st === 'down'), S.J(30, 1), S.R(28.5), S.W(20)]), {max:2000}), /dead|timeout/);
  // ---- 17 ice
  const fc17 = () => (g.S.cones || []).filter(c => c.st === 'fall');
  const act17 = (onLock) => () => { const done = new Set(); let t = 99, mode = null; return P => { t++;
      const c = fc17().find(c => !done.has(c) && (onLock ? c.locked : true));
      if (c) { done.add(c); t = 0; mode = Math.abs(g.P.vx) > 2.4 ? 'brake' : 'go'; }
      if (t < 26) return mode === 'brake' ? {k:{left:true}} : {k:{right:true}};
      return onLock ? R() : (t < 60 ? N() : R()); }; };
  check('17 run', run(16, () => R), 'dead');
  check('17 change as soon as it appears', run(16, act17(false), {max:1500}), 'dead');
  check('17 wait until its ring stops, then change', run(16, act17(true), {max:1500}), 'clear');
  // ---- 18 reflection
  const plant18 = x => [S.R(x), S.U(() => g.S.st >= 31), S.W(8)];
  const climbA = [S.R(17.4), S.JT(19.5, 408, {tol:8}), S.U(P => P.on), S.J(30, 1), S.U(P => P.on && P.y < 300)];
  const climbB = [S.R(22.2), S.JT(24.4, 280, {tol:8}), S.U(P => P.on), S.J(30, 1), S.U(P => P.on && P.y < 170), S.R(27.6), S.W(30)];
  check('18 stand at the foot of the ledge', run(17, () => script([S.R(19.2), S.W(400)]), {max:600}), /dead|timeout/);
  check('18 walk to the middle and wait', run(17, () => script([S.R(14.6), S.W(400)]), {max:600}), 'dead');
  check('18 one stake, from the mirror of the low ledge\'s foot', run(17, () => script([...plant18(10.6), ...climbA, S.R(25), S.W(200)]), {max:1500}), /timeout|dead/);
  check('18 two stakes: the mirror of each ledge\'s foot, then cross and climb', run(17, () => script([...plant18(5.2), ...plant18(10.2), ...climbA, ...climbB]), {max:1500}), 'clear');
  // ---- 19 landing
  check('19 jump the pits', run(18, () => P => P.on && [6.2, 14.2, 22.2].some(x => Math.abs(cx() - x*T) < 8) ? {jump:30, dir:1} : R()), 'dead');
  check('19 stop at each edge, then jump', run(18, () => script([S.R(6.4), S.W(20), S.J(30, 1), S.R(14.4), S.W(20), S.J(30, 1), S.R(22.4), S.W(20), S.J(30, 1), S.R(28)]), {max:1500}), 'dead');
  check('19 jump, then let go of the way you were going', run(18, () => { let air = 0; return P => { if (P.on) { air = 0; if ([6.4, 14.4, 22.4].some(x => Math.abs(cx() - x*T) < 6)) return {jump:30, dir:0, k:{right:true}}; return R(); } air++; return air < 3 ? R() : {k:{}}; }; }, {max:1500}), 'clear');
  // ---- 20 the eye and the sky
  const cones20 = () => (g.S.cones || []).filter(c => c.st === 'fall');
  // walk toward x, but turn back from any cone about to come down where you are going
  const goDodge = x => P => { const pc = cx(), d = x - pc, dir = Math.sign(d); if (Math.abs(d) < 4) return N();
    for (const c of cones20()) { const land = c.x, eta = (c.floor - 40 - c.y)/26; if (eta < 30 && Math.abs(land - (pc + dir*4.4*eta)) < 34) return dir > 0 ? Lf() : R(); }
    return dir > 0 ? R() : Lf(); };
  check('20 let go in the open', run(19, () => script([S.R(3), S.W(900)]), {max:900}), 'dead');
  check('20 jump at the ledge', run(19, () => P => P.on && cx() > 19*T ? {jump:30, dir:1} : R(), {max:900}), 'dead');
  const ledge20 = [S.F(goDodge(15*T), () => g.S.eye.t > 150 && g.S.eye.t < 160), S.F(goDodge(19.4*T), () => g.S.shut), S.L(17.2), S.U(() => g.ents.some(e => e.stk && e.alive)), S.R(18.6), S.J(30, 1), S.U(P => P.on), S.J(30, 1), S.U(P => P.on && P.y < 300)];
  check('20 be at the ledge foot as it shuts, step away, climb the stake', run(19, () => script([...ledge20, S.W(30)]), {max:1500}), /timeout|dead/);
  check('20 ... then on the ledge, feint at the lid until it breaks, and drop in', run(19, () => { const a = script(ledge20); let ph = 0, dir = 1; return P => { if (ph === 0) { const r = a(P); if (P.on && P.y < 300 && cx() > 20*T) ph = 1; return r; }
      const lid = g.ents.find(e => e.t === 'bb'); if (!lid || !lid.alive) return cx() < 25.5*T ? R() : N();
      // pace between the ledge edge and the lid: heading for the lid makes it aim at the lid; turn back before you get there
      if (cx() > 24.3*T) dir = -1; else if (cx() < 21.2*T) dir = 1;
      for (const c of cones20()) { const eta = (c.floor - 40 - c.y)/26; if (eta < 20 && Math.abs(c.x - cx()) < 40) dir = c.x > cx() ? -1 : 1; }
      return dir > 0 ? R() : Lf(); }; }, {max:3000}), 'clear');
  return out;
})()
