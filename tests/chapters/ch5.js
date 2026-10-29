(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const clean = id => { g.prof.marks[id] = []; };
  // ---- 41 dark
  clean('dark'); check('41 walk in the dark', run(40, () => R), 'dead');
  clean('dark'); check('41 jump to look around, then stop', run(40, () => script([S.R(3.0), S.J(30, 0), S.W(90)]), {max:400}), 'dead');
  { const gone = S.U(() => g.S.bat.st === 'back' || g.S.bat.st === 'roost'), hop1 = [S.R(4.0), S.JT(7.8, GY)], hop2 = [S.R(9.0), S.JT(11.6, GY)], hop3 = [S.R(13.6), S.JT(17.5, GY)];
    clean('dark'); check('41 jump the gaps and the spike, keep moving', run(40, () => script([...hop1, ...hop2, ...hop3, S.R(28.6)]), {max:900}), 'dead');
    clean('dark'); check('41 full jumps under the roof', run(40, () => script([...hop1, S.R(9.0), S.J(30, 1), S.R(28.6)]), {max:900}), 'dead');
    clean('dark'); check('41 let it pass under the roof only', run(40, () => script([...hop1, ...hop2, gone, ...hop3, S.R(28.6)]), {max:1500}), 'dead');
    clean('dark'); check('41 after each landing, let it come down where you were going', run(40, () => script([...hop1, gone, ...hop2, gone, ...hop3, gone, S.R(28.6)]), {max:1800}), 'clear');
    clean('dark'); check('41 ... or step back after each landing', run(40, () => script([...hop1, S.K({left:true}, 5), gone, ...hop2, S.K({left:true}, 8), gone, ...hop3, S.K({left:true}, 6), gone, S.R(28.6)]), {max:1800}), 'clear'); }
  // ---- 42 sun
  const board42 = X => [14,15,16,17,18,22,23].includes(Math.floor(X/T));
  const ride = gapMax => () => P => { const x = cx(), y = g.P.y + 14, lit = X => g.lv.lit(X, y);
    if (x > 27.3*T) return R();
    if (lit(x)) { let l = null, r = null; for (let d = 4; d < 300; d += 4) { if (l === null && !lit(x - d)) l = d; if (r === null && !lit(x + d)) r = d; } return (r !== null && (l === null || r <= l)) ? R() : Lk(); }
    if (!lit(x + 14)) return R();
    let gap = 0, brd = false; while (x + 14 + gap < 960 && lit(x + 14 + gap)) { if (board42(x + 14 + gap)) brd = true; gap += 4; }
    return (gap <= gapMax && !brd) ? R() : N(); };
  check('42 run for the door', run(41, () => R), 'dead');
  check('42 stand still in the shade', run(41, () => N, {max:3000}), 'dead');
  check('42 go whenever you have cooled down', run(41, () => P => { const here = !g.lv.lit(cx(), g.P.y + 14); if (here && g.S.burn > 0) return N(); return R(); }, {max:3000}), 'dead');
  check('42 go as soon as the boards are in shade', run(41, () => script([S.U(() => !g.lv.lit(16*T, 434)), S.R(28.5)]), {max:3000}), 'dead');
  { const waits = []; for (let w = 0; w <= 1400; w += 100) for (const at of [2, 10]) waits.push(run(41, () => script([S.R(at), S.W(w), S.R(28.5), S.W(20)]), {max:3000})[0]);
    check('42 wait in some shade, then run for it (any wait)', [waits.filter(r => r.startsWith('dead')).length + '/' + waits.length, waits.some(r => r === 'clear') ? 'clear' : 'dead'], 'dead'); }
  for (const gm of [0, 96]) check(`42 move with the shade (crossing lit gaps up to ${gm}px)`, run(41, ride(gm), {max:3000}), 'clear');
  // ---- 43 water
  const swimTo = (tx, ty) => P => { const k = {right: cx() < tx*T, left: cx() > tx*T + 20}; return (g.P.y + 14 > ty) && g.P.vy > -1 ? {k, edge:true} : {k}; };
  const wet = [S.L(0.5), S.W(5)], dive = [S.R(5.6)], exitTo = [S.F(swimTo(24.4, 300), () => cx() > 24.2*T), S.F(P => ({k:{right:true}, edge: g.P.y < 262 || g.P.vy > -1}), () => g.P.on && g.P.y < 240), S.R(28.8)];
  check('43 walk on', run(42, () => R), 'dead');
  check('43 jump the first fire', run(42, () => script([S.R(1.6), S.J(30, 1), S.R(29)])), 'dead');
  check('43 get wet, swim along the bottom', run(42, () => script([...wet, ...dive, S.F(() => ({k:{right:true}}), () => false)]), {max:1500}), 'dead');
  check('43 get wet, breathe at every gap', run(42, () => script([...wet, ...dive, S.F(swimTo(11.6, 300), () => cx() > 11.3*T), S.F(swimTo(11.6, 200), () => g.P.y < 250), S.F(swimTo(17.6, 300), () => g.P.y < 250 || g.S.air < 5), S.F(swimTo(24.5, 300), () => false)]), {max:2000}), 'dead');
  check('43 get wet, breathe at the first gap, swim for the exit', run(42, () => script([...wet, ...dive, S.F(swimTo(11.6, 300), () => cx() > 11.3*T), S.F(swimTo(11.6, 200), () => g.P.y < 250), ...exitTo]), {max:2400}), 'dead');
  check('43 get wet, breathe at the gap and the bubbles', run(42, () => script([...wet, ...dive, S.F(swimTo(11.6, 300), () => cx() > 11.3*T), S.F(swimTo(11.6, 200), () => g.P.y < 250), S.F(swimTo(19.4, 330), () => Math.abs(cx() - 19.5*T) < 8), S.F(swimTo(19.2, 330), () => g.S.air >= 123), ...exitTo]), {max:2400}), 'clear');
  // ---- 44 fire
  const burnt = () => g.S.tiles.every(t => t.fire === 0 || t.fire >= 60) && g.S.tiles[13].fire >= 60;
  const hop = [S.R(2.2), S.J(30, 1), S.U(P => P.on, {right:true})];
  const onStone = S.F(P => ({k:{left: cx() > 3.6*T, right: cx() < 3.4*T}}), () => burnt());
  const lightIt = [...hop, S.R(6.1), S.L(4.7), S.F((P, k) => k === 1 ? {jump:18, dir:0, k:{left:true}} : {k:{left: cx() > 3.55*T, right: cx() < 3.45*T}}, (P, k) => k > 2 && P.on), onStone];
  const bomb = () => g.S.bomb;
  const kickTo = (dist) => () => { let ph = 0; return P => { const b = bomb(); if (!b) return ph > 0 && cx() < 27.8*T ? R() : N();
      const dx = b.x + 12 - cx();
      if (b.x < 700 && b.vx === 0) { ph = 1; return R(); }
      if (b.vx !== 0) return Math.abs(dx) < 200 ? Lk() : N();
      if (Math.abs(dx) > dist + 6) return R(); if (Math.abs(dx) < dist - 6) return Lk(); return N(); }; };
  const both = dist => () => { const a = script(lightIt), b = kickTo(dist)(); let done = false; return (P, f) => { if (!done && !burnt()) return a(P, f); done = true; return b(P, f); }; };
  check('44 walk on, hop the stone', run(43, () => P => (P.on && Math.abs(cx() - 2.5*T) < 5) ? {jump:8, dir:1} : R()), 'dead');
  check('44 knock it over and run back', run(43, () => script([...hop, S.R(6.1), S.L(4.6), S.J(30, -1), S.U(P => P.on, {left:true}), S.L(0.8), S.W(200)])), 'dead');
  check('44 burn the way, then kick the bomb and follow it', run(43, () => { const a = script(lightIt); let done = false; return (P, f) => { if (!done && !burnt()) return a(P, f); done = true; return R(); }; }, {max:3000}), 'dead');
  check('44 burn the way, send the bomb, stand right by it', run(43, both(60), {max:3000}), 'dead');
  check('44 burn the way, send the bomb, wait not too near', run(43, both(140), {max:3000}), 'clear');
  // ---- 45 spark: the floor is live; stand on the cable, and leave it by a jump
  { const onCab = S.U(P => P.on && P.stand === g.S.cab, {right:true}), up = [S.R(7.2), S.J(30, 1), onCab], off = x => [S.R(x), S.J(30, 1), S.U(P => P.on, {right:true}), S.R(27.5), S.W(30)];
    check('45 walk', run(44, () => R), 'dead');
    check('45 hop over the start of the wire', run(44, () => script([S.R(7.0), S.J(8, 1), S.U(P => P.on, {right:true}), S.R(28)]), {max:900}), 'dead');
    check('45 wait before the wire', run(44, () => script([S.R(6.5), S.W(2000)]), {max:600}), 'timeout');
    check('45 onto the cable, walk off its end', run(44, () => script([...up, S.R(28)]), {max:900}), 'dead');
    check('45 onto the cable, jump off it too soon', run(44, () => script([...up, ...off(16.5)]), {max:900}), 'dead');
    for (const x of [18.6, 19.4]) check(`45 onto the cable, jump off its end (at ${x})`, run(44, () => script([...up, ...off(x)]), {max:900}), 'clear');
    check('45 onto the cable from a standstill at the edge', run(44, () => script([S.R(7.2), S.W(20), S.J(30, 1), onCab, ...off(19.0)]), {max:900}), 'clear');
    check('45 onto the cable from a run, a tile back', run(44, () => script([S.R(6.6), S.J(30, 1), onCab, ...off(19.0)]), {max:900}), 'clear'); }
  // ---- 46 wind
  check('46 run and jump', run(45, () => script([S.R(6.5), S.J(30, 1), S.R(28)]), {max:600}), 'dead');
  const letgo = (x) => [S.R(x), S.F((P, k) => k === 1 ? {jump:30, dir:0} : {k:{}}, (P, k) => k > 2 && P.on)];
  check('46 jump and let go, twice', run(45, () => script([...letgo(6.6), ...letgo(16.6), S.R(28)]), {max:900}), 'dead');
  check('46 let go at the first; stand and jump at the second', run(45, () => script([...letgo(6.6), S.R(16.5), S.W(20), S.J(30, 1), S.R(28)]), {max:900}), 'dead');
  check('46 let go at the first; leap backwards at the second', run(45, () => script([...letgo(6.6), S.R(16.5), S.U(P => P.vx < -0.2, {left:true}), S.F((P, k) => k === 1 ? {jump:30, dir:0, k:{left:true}} : {k:{right:true}}, (P, k) => k > 2 && P.on), S.R(28)]), {max:900}), 'dead');
  check('46 let go at the first; at the second jump on and push back', run(45, () => script([...letgo(6.6), S.R(16.6), S.F((P, k) => k === 1 ? {jump:30, dir:0, k:{right:true}} : {k:{left:true}}, (P, k) => k > 2 && P.on), S.R(28)]), {max:900}), 'clear');
  // ---- 47 geyser
  const gy = () => g.S.gy;
  const wary47 = to => S.F(P => { const q = gy(); if (q && q.x > cx() - 20 && q.x - cx() < 110) return N(); return R(); }, () => cx() >= to*T);
  check('47 walk on', run(46, () => R), 'dead');
  check('47 wait where you are', run(46, () => N, {max:600}), 'dead');
  check('47 stop beside the first bubbles, then run for the fire', run(46, () => script([S.R(9), S.U(() => gy() && gy().st === 'bub'), S.F(R, () => cx() > gy().x - 45), S.U(() => !gy() || gy().st !== 'bub'), S.U(() => !gy()), S.R(28.5)]), {max:1500}), 'dead');
  check('47 wait by the fire, step aside toward it, run through', run(46, () => script([wary47(19.0), S.U(() => !gy()), S.U(() => gy() && gy().st === 'bub'), S.R(20.0), S.U(() => g.S.wet > 150), S.R(28.5), S.W(20)]), {max:2000}), 'clear');
  check('47 ... or step aside away from it, and go once the water falls', run(46, () => script([wary47(19.0), S.U(() => !gy()), S.U(() => gy() && gy().st === 'bub'), S.L(17.9), S.U(() => g.S.wet > 150), S.U(() => !gy()), S.R(28.5), S.W(20)]), {max:2000}), 'clear');
  // ---- 48 bubble: come in light enough to reach the high key, then go back out for the weight you left
  { const keys = () => g.S.keys, inB = () => g.S.inB;
    const skip7 = [S.R(5.6), S.J(8, 1), S.U(P => P.on, {right:true})];
    const enter = [S.R(16.6), S.U(() => Math.abs(g.P.vy) < 0.05 && inB(), {})];
    const toDoor = S.F(P => ({k:{right: cx() < 24.6*T, left: cx() > 24.9*T}}), () => false);
    const grab = S.F(() => ({k:{right: cx() < 18.6*T, left: cx() > 18.9*T}}), () => keys() >= 2);
    check('48 walk on with both keys, float to the door', run(47, () => script([...enter, toDoor]), {max:1500}), 'timeout');
    check('48 leave the open key, float up, take the high one, float to the door', run(47, () => script([...skip7, ...enter, grab, S.U(() => Math.abs(g.P.vy) < 0.05, {}), toDoor]), {max:1500}), 'timeout');
    check('48 both keys, then go back out for nothing', run(47, () => script([...enter, S.L(14), S.L(2), S.R(16.6), S.U(() => Math.abs(g.P.vy) < 0.05 && inB(), {}), toDoor]), {max:2000}), 'timeout');
    check('48 leave the open key, take the high one, go back out for it, float to the door', run(47, () => script([...skip7, ...enter, grab, S.L(14), S.L(6.6), S.R(16.6), S.U(() => Math.abs(g.P.vy) < 0.05 && inB(), {}), toDoor]), {max:2500}), 'clear'); }
  // ---- 49 light and dark
  const light49 = [S.R(4.3), S.W(5), S.J(10, 0), S.U(P => P.on)];
  const toGrey49 = [...light49, S.JT(7.5, 416, {tol:9}), S.U(P => P.on), S.JT(10.5, 416, {tol:9}), S.U(P => P.on), S.JT(13.7, 416, {tol:10}), S.U(P => P.on)];
  const end49 = [S.R(22.3), S.W(8), S.J(10, 0), S.U(P => P.on), S.JT(24.5, 416, {tol:9}), S.U(P => P.on), S.JT(26.8, GY, {tol:14}), S.R(28.5), S.W(30)];
  check('49 hop on every stone', run(48, () => P => (P.on && cx() > 3.3*T && cx() < 25*T) ? {jump:8, dir:1} : R()), 'dead');
  check('49 jump for the first white stone in the dark', run(48, () => script([S.R(4.0), S.JT(7.5, 416, {tol:9}), S.W(100)]), {max:600}), 'dead');
  check('49 light it; then on to the grey, and straight onto the black', run(48, () => script([...toGrey49, S.R(21.6), S.W(100)]), {max:1200}), 'dead');
  check('49 light it; then to the grey, wait for the dark, walk the black', run(48, () => script([...toGrey49, S.W(185), ...end49]), {max:1500}), 'clear');
  check('49 ... but jump onto the black', run(48, () => script([...toGrey49, S.W(185), S.JT(16.5, 416, {tol:9}), S.W(60)]), {max:1500}), 'dead');
  // ---- 50 storm: narrow stones in the dark; the bat dives at every sound, except while the thunder rolls, and the thunder comes after the flash
  { const hops = [[5.3, 9.0], [9.4, 13.0], [13.4, 17.0], [17.4, 21.5]];
    const plan = when => () => script([...hops.flatMap(([e, to]) => [S.R(e), S.U(when, {}), S.JT(to, GY, {tol:10}), S.W(6)]), S.R(28.4), S.W(30)]);
    clean('storm'); check('50 run through it', run(49, () => R), 'dead');
    clean('storm'); check('50 jump as soon as you get to each edge', run(49, plan(() => true), {max:3000}), 'dead');
    clean('storm'); check('50 jump when the lightning shows the way', run(49, plan(() => g.S.flash > 14), {max:3000}), 'dead');
    clean('storm'); check('50 jump in the quiet after the thunder', run(49, plan(() => g.S.lt > 165), {max:3000}), 'dead');
    for (const [a, b] of [[2, 30], [20, 48]]) { clean('storm'); check(`50 jump while the thunder rolls (${a}-${b} frames into it)`, run(49, plan(() => g.S.th >= a && g.S.th <= b), {max:4000}), 'clear'); } }
  return out;
})()
