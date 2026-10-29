(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const clean = id => { g.prof.marks[id] = []; };
  // ---- 41 dark: pits you cannot see; a blind bat flies to where you last landed, bites there, and lights the cave as it flies
  { const bat = () => g.S.bat, done = S.U(() => bat().st === 'back' || bat().st === 'roost');
    // hop where you stand, step back the way you came, and look while it comes
    const hop = (x, b) => [S.R(x), S.W(12), S.J(4, 0), S.L(x - b), done];
    // jump a pit you have seen, and step on (s tiles) from where you land
    const leap = (from, to, s, late) => [S.R(from), S.JT(to, GY), S.W(late || 0), s > 0 ? S.R(to + s) : S.L(to + s), done];
    const route = (b, s, o) => { o = o || {}; const t = o.to || [8.5, 13.6, 19.4, 26.2]; return [...hop(3, b), ...hop(5.1, b), ...leap(5.2, t[0], s, o.late), ...(o.pause ? [S.W(o.pause)] : []), ...hop(10.1, b), ...leap(10.2, t[1], s, o.late), ...hop(15.1, b), ...leap(15.2, t[2], s, o.late), ...hop(21.6, b), S.R(21.7), S.JT(t[3], GY), S.R(28.6), S.W(30)]; };
    const beat = from => { let n = 0, tot = 0; for (const h of [4, 8, 12, 16, 20, 25, 30]) for (let react = 0; react <= 20; react++) { tot++; clean('dark');
        const r = run(40, () => { let onT = 0, go = false; return P => { if (cx() >= from*T) go = true; if (g.P.on) onT++; else onT = 0; return (go && g.P.on && onT > react) ? {jump:h, dir:1} : R(); }; }, {max:900});
        if (r[0] === 'clear') n++; } return [n, tot]; };
    clean('dark'); check('41 walk in the dark', run(40, () => R), 'dead');
    clean('dark'); check('41 tap along in the dark', run(40, () => P => (g.frame % 9) < 3 ? R() : N(), {max:2500}), 'dead');
    clean('dark'); check('41 jump to look around, then stay', run(40, () => script([S.J(30, 0), S.W(200)]), {max:400}), 'dead');
    clean('dark'); check('41 hop along, to keep it busy', run(40, () => P => P.on ? {jump:3, dir:1} : R(), {max:2500}), 'dead');
    for (const from of [3, 4.7]) { const [n, tot] = beat(from); check(`41 run and jump at a steady beat, from ${from} (all beats)`, [n + '/' + tot, n/tot <= 0.03 ? 'dead' : 'clear'], 'dead'); }
    { let seed = 4242, w = 0; const n = 300, rnd = () => (seed = (seed*1103515245 + 12345) % 2147483648) / 2147483648;
      // someone who runs and jumps again soon after each landing, unevenly, from the start or from the lip of the first pit
      for (let t = 0; t < n; t++) { const x0 = t % 3 === 0 ? 3 : 5.1 - rnd()*1.6, r0 = Math.floor(rnd()*14), h0 = rnd() < 0.7 ? 30 : 8 + Math.floor(rnd()*16), j = 1 + Math.floor(rnd()*4); clean('dark');
        const r = run(40, () => { let onT = 0, re = r0, go = false; return P => { if (cx() >= x0*T) go = true; if (g.P.on) onT++; else onT = 0; if (go && g.P.on && onT > re) { re = Math.max(0, r0 + Math.floor(rnd()*(2*j + 1)) - j); return {jump:Math.max(2, h0 + Math.floor(rnd()*9) - 4), dir:1}; } return R(); }; }, {max:900});
        if (r[0] === 'clear') w++; }
      check('41 run and jump unevenly (300 runners)', [w + '/' + n, w/n <= 0.03 ? 'dead' : 'clear'], 'dead'); }
    clean('dark'); check('41 look once, then jump the pit you saw and run on', run(40, () => script([...hop(3, 1.6), ...hop(5.1, 1.6), S.R(5.2), S.JT(8.5, GY), S.R(28.6)]), {max:1500}), 'dead');
    clean('dark'); check('41 look before each pit, but stay where you land', run(40, () => script([...hop(3, 1.6), ...hop(5.1, 1.6), S.R(5.2), S.JT(8.5, GY), S.W(150)]), {max:1500}), 'dead');
    clean('dark'); check('41 look, then walk past the edge of what you saw', run(40, () => script([...hop(3, 1.6), ...hop(5.1, 1.6), ...leap(5.2, 8.5, 1.1), S.R(28.6)]), {max:1500}), 'dead');
    clean('dark'); check('41 walk on while it is still biting', run(40, () => script([S.R(3), S.W(12), S.J(4, 0), S.L(1.4), S.U(() => bat().st === 'bite'), S.R(28.6)]), {max:1500}), 'dead');
    clean('dark'); check('41 hop, step back, look; jump, step on; again', run(40, () => script(route(1.6, 1.1)), {max:3000}), 'clear');
    clean('dark'); check('41 ... with short steps', run(40, () => script(route(1.25, 0.95)), {max:3000}), 'clear');
    clean('dark'); check('41 ... with long steps', run(40, () => script(route(2.2, 1.5)), {max:3000}), 'clear');
    clean('dark'); check('41 ... stepping on late, and pausing', run(40, () => script(route(1.6, 1.1, {late:22, pause:90})), {max:3500}), 'clear');
    clean('dark'); check('41 ... landing short', run(40, () => script(route(1.6, 1.1, {to:[8.2, 13.2, 19.0, 25.8]})), {max:3000}), 'clear');
    clean('dark'); check('41 ... landing long', run(40, () => script(route(1.6, 0.9, {to:[9.1, 14.2, 20.2, 26.8]})), {max:3000}), 'clear'); }
  // ---- 42 sun: a bridge of flowers in two halves; a flower is open only in sunlight, and your shadow is the only shade
  { const day = () => g.S.day, th = () => g.S.th, fl = c => g.S.fl.find(e => e.x === c*T);
    const aft = d => () => day() && th() >= 145 + d, noon = () => day() && th() >= 85 && th() < 100, morning = () => day() && th() < 30;
    // wait at an edge until the afternoon has come (d degrees in) and the flower in front of you is open, then go
    const go = (edge, c, d) => [S.R(edge), S.U(() => aft(d)() && fl(c).open > 0.9)];
    const pillar = [S.U(() => !day()), S.U(() => day() && th() < 90)];
    const intended = (d1, d2, o) => { o = o || {}; return [...go(1.6, 2, d1), ...(o.pause1 ? [S.R(5.5), S.W(o.pause1)] : []), ...(o.jump ? [S.R(3.5), S.J(30, 1), S.R(5.5), S.J(30, 1)] : []), S.R(o.rest || 10.6), ...pillar, ...go(19.6, 20, d2), ...(o.pause2 ? [S.R(23.5), S.W(o.pause2)] : []), S.R(28.8), S.W(20)]; };
    check('42 walk now', run(41, () => R, {max:600}), 'dead');
    check('42 jump over your shadow', run(41, () => script([S.R(1.7), S.J(30, 1), S.R(28.8)]), {max:600}), 'dead');
    check('42 hop from flower to flower in the morning', run(41, () => P => (P.on && cx() > 1.5*T) ? {jump:6, dir:1} : R(), {max:600}), 'dead');
    check('42 wait for noon, when your shadow is shortest, then go', run(41, () => script([S.R(1.6), S.U(noon), S.R(28.8)]), {max:2000}), 'dead');
    check('42 jump along at noon', run(41, () => script([S.R(1.6), S.U(noon), S.F(P => P.on ? {jump:30, dir:1} : R(), () => false)]), {max:2000}), 'dead');
    { const res = []; for (let w = 0; w <= 1700; w += 20) res.push(run(41, () => script([S.R(1.6), S.W(w), S.R(28.8), S.W(20)]), {max:2600})[0]);
      check('42 wait any time, then walk to the door', [res.filter(r => r.startsWith('dead')).length + '/' + res.length, res.some(r => r === 'clear') ? 'clear' : 'dead'], 'dead'); }
    for (const d of [0, 4]) check(`42 go in the afternoon and keep going (${d} deg in)`, run(41, () => script([...go(1.6, 2, d), S.R(28.8), S.W(20)]), {max:2600}), 'dead');
    { const res = []; for (let d = -10; d <= 10; d++) for (const x of [0.9, 1.6]) res.push(run(41, () => script([S.R(x), S.U(aft(d)), S.R(28.8), S.W(20)]), {max:2600})[0]);
      check('42 run for it from any moment around the start of the afternoon', [res.filter(r => r.startsWith('dead')).length + '/' + res.length, res.some(r => r === 'clear') ? 'clear' : 'dead'], 'dead'); }
    check('42 go in the afternoon, stop on the flowers for the night', run(41, () => script([...go(1.6, 2, 0), S.R(6), S.W(400)]), {max:2600}), 'dead');
    check('42 rest on the pillar, then go in the morning', run(41, () => script([...go(1.6, 2, 0), S.R(10.6), S.U(() => !day()), S.U(() => day() && th() > 8), S.R(28.8), S.W(20)]), {max:3000}), 'dead');
    check('42 rest on the pillar, then go at noon', run(41, () => script([...go(1.6, 2, 0), S.R(10.6), ...pillar, S.R(19.6), S.U(noon), S.R(28.8), S.W(20)]), {max:3000}), 'dead');
    check('42 cross one half each afternoon, resting on the pillar', run(41, () => script(intended(0, 0)), {max:3200}), 'clear');
    for (const d of [8, 16]) check(`42 ... going ${d} deg into each afternoon`, run(41, () => script(intended(d, d)), {max:3200}), 'clear');
    check('42 ... pausing on the bridge', run(41, () => script(intended(2, 2, {pause1:20, pause2:20})), {max:3200}), 'clear');
    check('42 ... resting at the near end of the pillar', run(41, () => script(intended(0, 4, {rest:11.2})), {max:3200}), 'clear');
    check('42 ... jumping along the flowers', run(41, () => script(intended(0, 0, {jump:true})), {max:3200}), 'clear'); }
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
  { const onCab = S.U(P => P.on && P.stand === g.S.cab, {right:true}), up = [S.R(7.2), S.J(30, 1), onCab], land = x => [S.R(x), S.J(30, 1), S.U(P => P.on, {right:true})], toDoor = S.F(() => ({k:{right: cx() < 28.0*T, left: cx() > 28.4*T}}), () => false), off = x => [...land(x), S.R(25.4), S.J(8, 1), toDoor];
    check('45 walk', run(44, () => R), 'dead');
    check('45 hop over the start of the wire', run(44, () => script([S.R(7.0), S.J(8, 1), S.U(P => P.on, {right:true}), S.R(28)]), {max:900}), 'dead');
    check('45 wait before the wire', run(44, () => script([S.R(6.5), S.W(2000)]), {max:600}), 'timeout');
    check('45 onto the cable, walk off its end', run(44, () => script([...up, S.R(28)]), {max:900}), 'dead');
    check('45 onto the cable, jump off it too soon', run(44, () => script([...up, ...off(16.5)]), {max:900}), 'dead');
    check('45 off the cable, then walk into the hanging wire', run(44, () => script([...up, ...land(19.0), S.R(28.2)]), {max:900}), 'dead');
    check('45 jump at everything', run(44, () => P => P.on ? {jump:30, dir:1} : R(), {max:900}), 'dead');
    for (const x of [18.6, 19.4]) check(`45 onto the cable, jump off its end (at ${x})`, run(44, () => script([...up, ...off(x)]), {max:900}), 'clear');
    check('45 onto the cable from a standstill at the edge', run(44, () => script([S.R(7.2), S.W(20), S.J(30, 1), onCab, ...off(19.0)]), {max:900}), 'clear');
    check('45 ... and a full jump through the hanging wire, then back to the door', run(44, () => script([...up, ...land(19.0), S.R(24.6), S.J(30, 1), toDoor]), {max:900}), 'clear');
    check('45 onto the cable from a run, a tile back', run(44, () => script([S.R(6.6), S.J(30, 1), onCab, ...off(19.0)]), {max:900}), 'clear'); }
  // ---- 46 wind: over each gap it blows against whatever you press, gently over the narrow one and hard over the wide one
  { // run at a gap and jump when your centre is `at` tiles along; in the air press `pre` for d frames, then `post` until you land
    const leap = (at, pre, d, post, hold) => S.F((P, k, st) => { if (st.t == null) { if (cx() < at*T) return R(); st.t = 0; return {jump:hold || 30, dir:0, k:{right:true}}; }
        st.t++; const kk = st.t <= d ? pre : post; return {k:{right:kk === 'R', left:kk === 'L'}}; }, (P, k, st) => st.t > 3 && P.on);
    const first = leap(6.6, 'R', 2, 'N'), toDoor = S.R(28);
    check('46 run and jump', run(45, () => script([S.R(6.5), S.J(30, 1), S.R(28)]), {max:600}), 'dead');
    check('46 jump and let go, twice', run(45, () => script([first, leap(16.6, 'R', 2, 'N'), toDoor]), {max:900}), 'dead');
    check('46 let go at the first; at the second, jump at the very edge and let go', run(45, () => script([first, leap(17.2, 'R', 1, 'N'), toDoor]), {max:900}), 'dead');
    check('46 let go at the first; push across the second', run(45, () => script([first, leap(16.6, 'R', 99, 'R'), S.W(30), S.R(17.3), S.U(() => !g.P.on, {right:true}), S.W(60)]), {max:900}), /dead|timeout/);
    check('46 press back at the first too', run(45, () => script([leap(6.6, 'R', 2, 'L'), toDoor]), {max:900}), 'dead');
    check('46 let go at the first; at the second, press back', run(45, () => script([first, leap(16.6, 'R', 2, 'L'), toDoor]), {max:900}), 'clear');
    for (const [at, pre, d, hold, tag] of [[15.5, 'R', 2, 30, 'from a tile and a half back'], [17.2, 'R', 1, 30, 'from the very edge'], [16.6, 'R', 14, 30, 'late, after pushing a while'], [16.6, 'R', 26, 30, 'very late, after pushing'], [16.6, 'N', 20, 30, 'late, after letting go'], [16.0, 'N', 33, 30, 'at the last moment, after letting go'], [16.6, 'N', 4, 8, 'from a small hop']])
      check(`46 ... ${tag}`, run(45, () => script([first, leap(at, pre, d, 'L', hold), toDoor]), {max:900}), 'clear');
    // where a jump over the wide gap ends: on the far bank, or not
    const far = (at, pre, d, post, hold) => { const r = run(45, () => script([first, leap(at, pre, d, post, hold), S.W(30)]), {max:700}); return r[0] !== 'clear' && g.state === 'play' && cx() > 20.75*T - 11; };
    { let n = 0, bad = 0; for (const at of [15.0, 15.4, 15.8, 16.2, 16.6, 17.0, 17.15, 17.25, 17.3, 17.33]) for (const d of [0, 1, 2, 4, 8]) for (const hold of [30, 14]) { n++; if (far(at, 'R', d, 'N', hold)) bad++; }
      check('46 let go over the wide gap, from any take-off', [bad + '/' + n + ' across', bad ? 'clear' : 'dead'], 'dead'); }
    { let n = 0, ok = 0; for (let at = 15.5; at <= 17.2; at += 0.25) for (let d = 0; d <= 36; d += 4) { n++; if (far(at, 'N', d, 'L')) ok++; }
      check('46 let go, then press back at any moment, from any take-off', [ok + '/' + n + ' across', ok === n ? 'clear' : 'dead'], 'clear'); }
    { let n = 0, ok = 0; for (let at = 15.5; at <= 17.2; at += 0.25) for (let d = 0; d <= 30; d += 5) { n++; if (far(at, 'R', d, 'L')) ok++; }
      check('46 push, then press back at any moment, from any take-off', [ok + '/' + n + ' across', ok === n ? 'clear' : 'dead'], 'clear'); } }
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
    { const res = []; for (let off = 0; off < 210; off += 10) for (const w of [0, 3]) res.push(run(49, () => script([S.W(off), ...hops.flatMap(([e, to]) => [S.R(e), S.JT(to, GY, {tol:10}), S.W(w)]), S.R(28.4), S.W(30)]), {max:3000})[0]);
      // a chain that starts in the quiet is heard at least once on the stones; it may only clear when the thunder happens to cover every jump
      check('50 chain-jump the stones to outrun it (any start)', [res.filter(r => r === 'clear').length + '/' + res.length, res.some(r => r === 'clear') ? 'clear' : 'dead'], 'dead'); }
    for (const [a, b] of [[2, 30], [20, 48]]) { clean('storm'); check(`50 jump while the thunder rolls (${a}-${b} frames into it)`, run(49, plan(() => g.S.th >= a && g.S.th <= b), {max:4000}), 'clear'); } }
  return out;
})()
