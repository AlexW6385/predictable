(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const to = (x) => ({until: () => Math.abs(cx() - x*T) < 4 && Math.abs(g.P.vx) < 0.5, rule: () => Math.abs(cx() - x*T) < 4 ? N() : cx() < x*T ? R() : Lk()});
  const hop = [S.J(6, 0), S.U(P => P.on, {}), S.W(6)];
  // ---- 81 canvas: a landing paints the tile and both its neighbours
  const paint = (cols) => () => script([...cols.flatMap(c => [to(c + 0.5), ...hop]), S.R(27.5), S.W(30)]);
  check('81 walk across', run(80, () => R, {freshMem:true, max:600}), 'timeout');
  check('81 land on the red tiles of the picture', run(80, paint([6, 8, 9, 10]), {freshMem:true, max:1200}), 'timeout');
  check('81 land where the splashes add up to the picture', run(80, paint([6, 8, 11, 12]), {freshMem:true, max:1200}), 'clear');
  check('81 ... in any order, with a mistake undone', run(80, paint([12, 9, 8, 9, 11, 6]), {freshMem:true, max:1500}), 'clear');
  // ---- 82 round: your echo, a moment behind you, is solid; leave it standing where you will need a step
  const onEcho = (x, y) => ({until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on; }, rule: (P, k, st) => st.air ? {k:{right: cx() < x*T - 2, left: cx() > x*T + 2, jump:true}} : {jumpTo: x*T, landY: y, tol:10, dir: cx() < x*T ? 1 : -1}});
  const upRight = (y) => ({until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on; }, rule: (P, k, st) => st.air ? {k:{jump:true, right: P.vy > -2}} : {jump:30, dir:0}});
  const step1 = (w, back) => [to(14.4), S.W(w), to(14.4 - back), S.W(4), onEcho(14.4, 420), S.W(4), upRight(336)];
  const toNote = [to(19.4), S.JT(22.2, 288, {tol:10}), S.W(2)];
  const climb82 = (w, back, stay) => () => script([...step1(w, back), ...toNote, S.W(stay), S.JT(18.6, 336, {dir:-1, tol:16}), S.W(2), to(19.4), S.U(() => g.S.held, {}), onEcho(22.2, 260), S.W(4), upRight(176), S.R(27.5), S.W(30)]);
  check('82 run and jump at the ledge', run(81, () => P => P.on && cx() > 13.5*T ? {jump:30, dir:1} : R(), {freshMem:true, max:800}), 'timeout');
  check('82 wait at the foot of the ledge', run(81, () => script([to(14.0), S.W(800)]), {freshMem:true, max:800}), 'timeout');
  check('82 climb the echo; then leap from the note for the high ledge', run(81, () => script([...step1(100, 1.6), ...toNote, S.W(10), S.J(30, 1), S.R(28), S.W(60)]), {freshMem:true, max:1500}), /dead|timeout/);
  check('82 climb the echo; then stand on the note and wait for your echo there', run(81, () => script([...step1(100, 1.6), ...toNote, S.W(40), S.R(22.7), S.W(300)]), {freshMem:true, max:1500}), 'dead');
  check('82 climb the echo; then use it again on the ledge\'s edge', run(81, () => script([...step1(100, 1.6), to(19.3), S.W(100), to(18.4), S.W(4), onEcho(19.3, 308), S.W(4), upRight(176), S.W(200)]), {freshMem:true, max:1500}), /dead|timeout/);
  check('82 climb the echo; hop on the note and straight back, then jump at the air', run(81, () => script([...step1(100, 1.6), ...toNote, S.JT(18.6, 336, {dir:-1, tol:16}), S.W(150), to(19.4), {jumpTo:22.2*T, landY:260, tol:10}, S.W(200)].map(x => x.until ? x : S.J(30, 1))), {freshMem:true, max:1500}), /dead|timeout/);
  for (const [w, b, st] of [[100, 1.6, 90], [80, 1.2, 60], [140, 2.2, 100]]) check(`82 climb the echo; stand on the note while it fades, step back, climb the echo left in the air (${w}, ${b}, ${st})`, run(81, climb82(w, b, st), {freshMem:true, max:1800}), 'clear');
  // ---- 83 dancer: facing you, it is a mirror; with its back to you, copy it as it is
  const dance = (mirror1, mirror2) => () => { let done = 0, ph = -1, sc = null; return P => { const st = g.S;
      if (st.ph >= 2) return R();
      if (!st.turn) { sc = null; return N(); }
      if (!sc) { const seq = st.seqs[st.ph], mir = st.ph === 0 ? mirror1 : mirror2; sc = script(seq.flatMap(j => { const i = mir ? 2 - j : j; return [to([4, 6, 8][i] + 0.5), ...hop]; })); }
      return sc(P); }; };
  check('83 copy it as you see it', run(82, dance(false, false), {freshMem:true, max:2000}), 'dead');
  check('83 mirror it, and keep mirroring', run(82, dance(true, true), {freshMem:true, max:2000}), 'dead');
  check('83 mirror it while it faces you, copy it when it turns away', run(82, dance(true, false), {freshMem:true, max:2000}), 'clear');
  check('83 stand', run(82, () => N, {freshMem:true, max:1200}), 'timeout');
  // the dance is new every life: what was right last time, stepped by heart, is wrong now
  const byHeart = (pads) => () => { let sc = null, ph = -1; return P => { const st = g.S; if (st.ph >= 2) return R(); if (!st.turn) return N();
      if (ph !== st.ph) { ph = st.ph; sc = script(pads[ph].flatMap(i => [to([4, 6, 8][i] + 0.5), ...hop])); } return sc(P); }; };
  check('83 die once, then dance last life\'s right answer by heart', run(82, life => life === 0 ? dance(false, false)() : byHeart([[2, 0, 1], [2, 1, 0]])(), {freshMem:true, lives:2, max:2000}), 'dead');
  check('83 die once, then mirror it facing you and copy it turned away', run(82, life => life === 0 ? dance(false, false)() : dance(true, false)(), {freshMem:true, lives:2, max:2000}), 'clear');
  // ---- 84 curtain: the set changes behind the curtain, which shows the next one; be on a fixed platform when it changes
  const act = () => g.S.act, tc = () => g.S.t % 300;
  const route84 = () => script([S.R(3.4), S.JT(6.0, 416, {tol:14}), S.W(4), S.JT(10.5, 384, {tol:14}), S.W(4), S.JT(14.0, 352, {tol:14}), S.W(4), S.JT(18.5, 352, {tol:14}),
    S.U(() => act() === 'B' && tc() > 290, {}), S.JT(22.8, 320, {tol:14}), S.W(4), S.JT(28.0, 448, {tol:24}), {until: () => Math.abs(cx() - 28.5*T) < 6, rule: () => cx() < 28.5*T ? R() : Lk()}, S.W(30)]);
  check('84 run and jump', run(83, () => P => P.on && [3.4, 7.4, 11.4, 15.4, 19.4].some(x => Math.abs(cx() - x*T) < 5) ? {jump:30, dir:1} : R(), {freshMem:true, max:1200}), 'dead');
  check('84 wait on the near set as the curtain falls', run(83, () => script([S.R(3.4), S.JT(6.0, 416, {tol:14}), S.W(600)]), {freshMem:true, max:800}), 'dead');
  check('84 race up while the first set stands, and leap from the last fixed platform to the far bank', run(83, () => script([S.R(3.4), S.JT(6.0, 416, {tol:14}), S.W(4), S.JT(10.5, 384, {tol:14}), S.W(4), S.JT(14.0, 352, {tol:14}), S.W(4), S.JT(18.5, 352, {tol:14}), S.R(19.8), S.J(30, 1), S.R(28.5), S.W(30)]), {freshMem:true, max:1500}), 'dead');
  check('84 go while the set is up, wait out each change on a fixed platform', run(83, route84, {freshMem:true, max:1500}), 'clear');
  // ---- 85 keystone: an arch stands by itself once its keystone is in; so put the stone in, then knock the scaffold away from under it
  { const tapL = (x) => ({until: () => cx() <= x*T, rule: (P, k) => ({k:{left: k % 12 < 3}})});
    // walk left along the deck, hopping out of the gap at the crown if you drop into it
    const backL = (x) => ({until: () => cx() <= x*T, rule: P => P.on && P.y > 232 ? {jump:12, dir:-1} : {k:{left:true}}});
    const behind = [S.K({left:true}, 25), S.J(30, -1), S.U(P => P.on, {})], over = [S.J(30, -1), S.U(P => P.on, {})];
    const down = [S.R(27.3), S.U(P => P.on, {})], acrossGap = [S.R(15.6), S.J(30, 1), S.U(P => P.on, R().k)];
    const climb = [to(27.2), S.J(30, 1), S.U(P => P.on, {}), S.J(30, 1), S.U(P => P.on, {}), S.J(30, -1), S.U(P => P.on, {})];
    check('85 run', run(84, () => R, {freshMem:true, max:900}), 'timeout');
    check('85 stand', run(84, () => N, {freshMem:true, max:900}), 'timeout');
    check('85 jump at everything', run(84, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true, max:1200}), /timeout|dead/);
    check('85 jump the gap, go down, pull the pin', run(84, () => script([...acrossGap, ...down, S.L(13.5), S.W(60)]), {freshMem:true, max:1500}), 'dead');
    check('85 ... and run back out from under the arch', run(84, () => script([...acrossGap, ...down, S.L(17.9), S.R(29), S.W(60)]), {freshMem:true, max:1500}), 'dead');
    check('85 ... and stand still at the pin', run(84, () => script([...acrossGap, ...down, S.L(17.9), S.W(120)]), {freshMem:true, max:1500}), 'dead');
    check('85 go down, jump at the scaffold to get past it', run(84, () => script([...acrossGap, ...down, to(18.8), S.J(30, -1), S.U(P => P.on, {}), S.J(30, -1), S.W(200)]), {freshMem:true, max:1500}), /timeout|dead/);
    check('85 push the keystone halfway, go down, pull', run(84, () => script([...behind, S.R(10), S.W(10), S.J(30, 1), S.U(P => P.on, R().k), ...acrossGap, ...down, S.L(13.5), S.W(60)]), {freshMem:true, max:2000}), 'dead');
    check('85 keystone in, then wait on the deck', run(84, () => script([...behind, S.R(20), S.W(600)]), {freshMem:true, max:1500}), 'timeout');
    check('85 keystone in, go down, pull the pin, walk in', run(84, () => script([...behind, ...down, S.L(13.5), S.W(40)]), {freshMem:true, max:1500}), 'clear');
    check('85 ... jumping straight over it', run(84, () => script([...over, ...down, S.L(13.5), S.W(40)]), {freshMem:true, max:1500}), 'clear');
    check('85 ... with pauses: after it drops in, and under the arch', run(84, () => script([...behind, S.R(17.5), S.W(90), ...down, to(21), S.W(120), tapL(13.5), S.W(40)]), {freshMem:true, max:2500}), 'clear');
    check('85 down first to look, back up, keystone in, down, pull', run(84, () => script([...acrossGap, ...down, to(20), S.W(30), ...climb, backL(3.5), ...behind, ...down, S.L(13.5), S.W(40)]), {freshMem:true, max:3000}), 'clear');
    check('85 stone pushed back to the wall: you can still get behind it', run(84, () => script([...behind, S.R(9), S.J(30, 1), S.U(P => P.on, {}), S.K({left:true}, 200), S.J(30, -1), S.U(P => P.on, {}), ...down, S.L(13.5), S.W(40)]), {freshMem:true, max:3000}), 'clear'); }
  // ---- 86 leap: it holds whoever walks off the edge and keeps walking
  check('86 jump the gap', run(85, () => P => P.on && cx() > 6.4*T && cx() < 7*T ? {jump:30, dir:1} : R(), {freshMem:true, max:800}), 'dead');
  check('86 wait at the edge', run(85, () => script([S.R(6.4), S.W(600)]), {freshMem:true, max:600}), 'timeout');
  check('86 walk off, and stop to look', run(85, () => script([S.R(10), S.W(30), S.R(28)]), {freshMem:true, max:800}), 'dead');
  check('86 walk off, and hop halfway', run(85, () => script([S.R(13), S.J(10, 1), S.R(28)]), {freshMem:true, max:800}), 'dead');
  check('86 run off the edge', run(85, () => R, {freshMem:true, max:800}), 'dead');
  check('86 stop at the edge, then jump the gap', run(85, () => script([S.R(6.4), S.W(60), S.J(30, 1), S.R(28)]), {freshMem:true, max:800}), 'dead');
  check('86 stop at the edge, walk off, and hop halfway', run(85, () => script([S.R(6.4), S.W(60), S.R(13), S.J(10, 1), S.R(28)]), {freshMem:true, max:800}), 'dead');
  check('86 stop at the edge until the feather rests, then walk off and keep walking', run(85, () => script([S.R(6.4), S.U(() => g.S.fe && g.S.fe.m === 'rest', {}), S.R(28)]), {freshMem:true, max:800}), 'clear');
  check('86 stop at the edge, then walk off and keep walking', run(85, () => script([S.R(6.4), S.W(40), S.R(28)]), {freshMem:true, max:800}), 'clear');
  check('86 stop at the edge, then walk off, stop halfway', run(85, () => script([S.R(6.4), S.W(40), S.R(14), S.W(30), S.R(28)]), {freshMem:true, max:800}), 'dead');
  // ---- 87 spirit: stand still and you leave your body; pass the walls; be somewhere with room when it ends
  const ghost = () => g.S.ghost, left = () => g.S.sp;
  check('87 run', run(86, () => R, {freshMem:true, max:600}), 'timeout');
  check('87 leave your body at the first wall, and keep going', run(86, () => script([S.R(8.4), S.U(ghost, {}), S.R(29)]), {freshMem:true, max:900}), 'dead');
  check('87 leave your body twice: between the walls, then on to the end', run(86, () => script([S.R(8.4), S.U(ghost, {}), S.R(12.5), S.U(() => !ghost(), {}), S.U(ghost, {}), S.R(24.6), S.U(() => !ghost(), {}), S.R(27.5), S.W(30)]), {freshMem:true, max:1500}), 'clear');
  check('87 ... but come back inside the thick wall', run(86, () => script([S.R(8.4), S.U(ghost, {}), S.R(12.5), S.U(() => !ghost(), {}), S.U(ghost, {}), S.R(16.0), S.U(() => !ghost(), {}), S.W(30)]), {freshMem:true, max:1500}), 'dead');
  // ---- 88 needle: coins come to you and make you wider; give them to the beggar
  check('88 walk to the gate', run(87, () => script([S.R(29), S.W(300)]), {freshMem:true, max:900}), 'timeout');
  check('88 go back to the beggar and stand there, looking at him', run(87, () => script([S.R(23), S.L(4.9), S.W(400), S.R(27.5), S.W(30)]), {freshMem:true, max:1500}), 'timeout');
  check('88 stand by him at the start, before anything came to you', run(87, () => script([to(4.8), S.W(300), S.R(27.5), S.W(30)]), {freshMem:true, max:1500}), 'timeout');
  check('88 go back to him, turn your back, and let him take it all', run(87, () => script([S.R(23), S.L(4.9), S.K({right:true}, 2), S.U(() => g.S.coins === 0, {}), S.R(27.5), S.W(30)]), {freshMem:true, max:1500}), 'clear');
  // ---- 89 sea: it parts for whoever keeps going; stop anywhere but the rock and it closes on you; stop on the rock and it closes on the chariot
  check('89 run straight across', run(88, () => R, {freshMem:true, max:900}), 'dead');
  check('89 run, hop over the rock, keep going', run(88, () => P => P.on && cx() > 13.0*T && cx() < 13.4*T ? {jump:30, dir:1} : R(), {freshMem:true, max:900}), 'dead');
  check('89 stop in the sea', run(88, () => script([S.R(10), S.W(30), S.R(38)]), {freshMem:true, max:900}), 'dead');
  check('89 stop before the sea', run(88, () => script([S.R(5), S.W(300)]), {freshMem:true, max:900}), /dead|timeout/);
  check('89 run in, stand on the rock until the chariot has gone, run on', run(88, () => script([S.R(13.0), S.JT(15.6, 416, {tol:14}), S.U(() => !g.S.ch.alive, {}), S.W(10), S.R(37.5), S.W(30)]), {freshMem:true, max:1500}), /clear|win/);
  // ---- 90 joke: nothing falls while the Eye laughs; it laughs at a pratfall, and at each kind only once
  const down = () => g.S.down, after = () => S.U(() => down() === 0, {});
  const underPot = [to(24.0), S.U(() => g.S.dk === 'daze' && down() > 0, {}), after()];
  check('90 run', run(89, () => R, {freshMem:true, max:1500}), 'dead');
  check('90 jump at everything', run(89, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true, max:1500}), 'dead');
  check('90 stand', run(89, () => N, {freshMem:true, max:900}), 'timeout');
  check('90 slip on the first peel, take every joke after it', run(89, () => script([S.R(7.3), after(), S.R(20.8), after(), S.R(22.4), after(), ...underPot, S.R(36.3), S.R(48), S.W(30)]), {freshMem:true, max:2500}), 'dead');
  check('90 save the peel: rake first, then walk past the pot', run(89, () => script([S.R(3.6), S.JT(6.0, 448, {tol:14}), S.R(7.3), after(), S.R(20.8), S.JT(23.0, 448, {tol:14}), S.R(36.3), S.R(48), S.W(30)]), {freshMem:true, max:2500}), 'dead');
  check('90 rake, then the rake again, then the pot, then the peel', run(89, () => script([S.R(3.6), S.JT(6.0, 448, {tol:14}), S.R(7.3), after(), S.R(22.4), after(), ...underPot, S.R(36.3), S.R(48), S.W(30)]), {freshMem:true, max:2500}), /clear|win/);
  check('90 rake, pot, peel: each joke once, the peel kept for the last', run(89, () => script([S.R(3.6), S.JT(6.0, 448, {tol:14}), S.R(7.3), after(), S.R(20.8), S.JT(23.0, 448, {tol:14}), ...underPot, S.R(36.3), S.R(48), S.W(30)]), {freshMem:true, max:2500}), /clear|win/);
  return out;
})()
