(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const to = (x) => ({until: () => Math.abs(cx() - x*T) < 4 && Math.abs(g.P.vx) < 0.5, rule: () => Math.abs(cx() - x*T) < 4 ? N() : cx() < x*T ? R() : Lk()});
  // ---- 91 achilles: near the door your speed is what is left of the way; in the air you keep the speed you left with
  const climb91 = [S.JT(6.5, 384, {tol:12, dir:-1}), S.JT(5.5, 320, {tol:12, dir:-1}), S.JT(4.5, 256, {tol:12, dir:-1}), S.JT(3.5, 192, {tol:12, dir:-1}), S.JT(1.6, 160, {tol:14, dir:-1}), to(1.4)];
  check('91 walk to the door', run(90, () => R, {freshMem:true, max:1500}), 'timeout');
  check('91 hop at the door', run(90, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true, max:1500}), 'timeout');
  check('91 climb the tower and walk off it', run(90, () => script([...climb91, S.R(28)]), {freshMem:true, max:1500}), 'timeout');
  check('91 climb the tower and leap from the top at a run', run(90, () => script([...climb91, {until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on; }, rule: (P, k, st) => st.air ? {k:{right:true, jump:true}} : cx() > 2.6*T ? {jump:30, dir:1} : R()}, S.W(30)]), {freshMem:true, max:1500}), /clear|win/);
  // ---- 92 arrow: the world moves only while you move; the door comes to whoever lets go, and letting go here means moving without going anywhere
  check('92 chase the door', run(91, () => R, {freshMem:true, max:1500}), 'timeout');
  check('92 stand and let it come', run(91, () => N, {freshMem:true, max:1200}), 'timeout');
  check('92 walk away from it', run(91, () => Lk, {freshMem:true, max:1500}), 'timeout');
  check('92 run and jump at it', run(91, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true, max:1500}), 'timeout');
  check('92 hop in place: time passes, and you are not going anywhere', run(91, () => P => P.on ? {jump:30, dir:0} : N(), {freshMem:true, max:1500}), /clear|win/);
  // ---- 93 copernicus: stand still and the room turns a quarter around you; where you stood decides where you fall
  const turns = (n) => S.U(() => g.S.k === n % 4 && !g.S.anim && g.P.on && (g.S.turned || 0) >= n, {});
  check('93 run', run(92, () => R, {freshMem:true, max:900}), /dead|timeout/);
  check('93 stand where you start', run(92, () => N, {freshMem:true, max:900}), 'dead');
  check('93 stand on the low step', run(92, () => script([S.JT(12.0, 442, {tol:12}), S.W(600)]), {freshMem:true, max:900}), /dead|timeout/);
  check('93 stand on the high step; let it turn four times; walk to the door', run(92, () => script([S.JT(12.0, 442, {tol:12}), S.JT(15.0, 378, {tol:12}), turns(4), S.R(19.0), S.W(30)]), {freshMem:true, max:1500}), /clear|win/);
  // ---- 94 theseus: the Eye cannot tell you from the others who look like you; it keeps whichever is where you were going
  const dbx = i => g.S.db[i].x + 11;
  check('94 walk to the door', run(93, () => R, {freshMem:true, max:900}), 'dead');
  check('94 stand where you are', run(93, () => N, {freshMem:true, max:900}), 'dead');
  check('94 walk into one coming your way, and stop inside it', run(93, () => script([{until: () => Math.abs(dbx(1) - cx()) < 4, rule: () => R()}, S.U(() => !g.S.ov, {}), S.R(28)]), {freshMem:true, max:1500}), 'dead');
  check('94 get ahead of one, turn back, catch it up, stop inside it, let it carry the mark away', run(93, () => script([S.R(21), {until: () => g.S.mk !== -1 && !g.S.ov, rule: () => g.S.db[1].dir < 0 && cx() > dbx(1) + 1 ? Lk() : g.S.db[1].dir < 0 ? N() : R()}, S.W(10), S.R(28)]), {freshMem:true, max:1500}), /clear|win/);
  // ---- 95 elevator: the lever on the shelf lets go of the rope that holds the lift; falling with it, you weigh nothing
  const cut95 = S.U(() => g.S.cut > 0, {left:true});
  const up95 = (dir, keys) => ({until: () => false, rule: (P, k) => k === 1 ? {jump:30, dir} : {k:keys || {}}});
  check('95 stand where you start', run(94, () => N, {freshMem:true, max:900}), 'timeout');
  check('95 hold right', run(94, () => R, {freshMem:true, max:900}), 'timeout');
  check('95 jump at the door, again and again', run(94, () => script([S.L(11.5), {until: () => false, rule: P => P.on ? {jump:30, dir:-1} : Lk()}]), {freshMem:true, max:1200}), 'timeout');
  check('95 jump straight up beside the shelf, again and again', run(94, () => script([to(10.6), {until: () => false, rule: P => P.on ? {jump:30, dir:0} : N()}]), {freshMem:true, max:1200}), 'timeout');
  check('95 lean on the lever, see the rope slip, and let go of it', run(94, () => script([S.L(10.4), S.K({left:true}, 40), S.R(16), S.W(400)]), {freshMem:true, max:1200}), 'timeout');
  check('95 let the rope go, and stand', run(94, () => script([cut95, S.W(400)]), {freshMem:true, max:1200}), 'dead');
  check('95 let the rope go, and keep leaning on the lever', run(94, () => script([cut95, S.U(() => false, {left:true})]), {freshMem:true, max:1200}), 'dead');
  check('95 let the rope go, and run back to the far wall', run(94, () => script([cut95, S.R(22.5), S.W(400)]), {freshMem:true, max:1200}), 'dead');
  check('95 let the rope go, run to the far wall and jump there', run(94, () => script([cut95, S.R(22.5), up95(0, {right:true})]), {freshMem:true, max:1200}), 'dead');
  // falling, a jump floats you up, and you can drift where you like
  check('95 lean on the lever until the rope goes; then jump', run(94, () => script([cut95, up95(0)]), {freshMem:true, max:1200}), /clear|win/);
  check('95 ... jump while still leaning on it', run(94, () => script([cut95, up95(-1, {left:true})]), {freshMem:true, max:1200}), /clear|win/);
  check('95 ... freeze for two seconds first', run(94, () => script([cut95, S.W(120), up95(0)]), {freshMem:true, max:1200}), /clear|win/);
  check('95 ... freeze for three seconds first', run(94, () => script([cut95, S.W(180), up95(0)]), {freshMem:true, max:1200}), /clear|win/);
  check('95 ... jump in a panic to the right, then steer back', run(94, () => script([cut95, {until: () => false, rule: (P, k) => k === 1 ? {jump:30, dir:1} : k < 50 ? R() : Lk()}]), {freshMem:true, max:1200}), /clear|win/);
  check('95 ... walk a few steps off, then jump toward the door', run(94, () => script([cut95, S.R(14), S.W(20), up95(-1, {left:true})]), {freshMem:true, max:1200}), /clear|win/);
  check('95 ... run back to the far wall, push off there, and drift home along the roof', run(94, () => script([cut95, S.R(22.5), up95(0, {left:true})]), {freshMem:true, max:1200}), /clear|win/);
  check('95 ... run to the middle, wait, jump, and only then steer for the door', run(94, () => script([cut95, S.R(17), S.W(40), {until: () => false, rule: (P, k) => k === 1 ? {jump:30, dir:0} : k < 60 ? N() : Lk()}]), {freshMem:true, max:1200}), /clear|win/);
  // ---- 96 twin: a moving clock runs slow; the door lets in the younger twin
  check('96 go in at once', run(95, () => Lk, {freshMem:true, max:900}), 'dead');
  check('96 stand at home', run(95, () => N, {freshMem:true, max:1500}), 'dead');
  check('96 run off and stay away', run(95, () => R, {freshMem:true, max:1500}), 'dead');
  check('96 walk slowly away and back', run(95, () => script([{until: () => cx() > 20*T, rule: (P, k, st) => ({k:{right: (st.n = (st.n || 0) + 1) % 3 === 0}})}, S.L(5.6), S.W(30)]), {freshMem:true, max:1500}), 'dead');
  check('96 run to the far wall and back, twice, then go in', run(95, () => script([S.R(29), S.L(8), S.R(29), S.L(5.6), S.W(30)]), {freshMem:true, max:1500}), /clear|win/);
  // ---- 97 maxwell: the quick may go right, the slow may go left; the hot floor burns whoever is slow on it
  const tapL = (until) => ({until, rule: (P, k, st) => ({k:{left: (st.n = (st.n || 0) + 1) % 2 === 0}})});
  check('97 run right through, get the key, run back', run(96, () => script([S.R(26.5), S.L(2.5), S.W(20)]), {freshMem:true, max:1500}), 'dead');
  check('97 walk through slowly', run(96, () => script([{until: () => cx() > 16*T, rule: (P, k, st) => ({k:{right: (st.n = (st.n || 0) + 1) % 4 === 0}})}, S.W(20)]), {freshMem:true, max:1500}), 'dead');
  check('97 ... and come back slowly over the hot floor', run(96, () => script([S.R(26.5), S.L(18), {until: () => cx() < 13*T, rule: (P, k, st) => ({k:{left: (st.n = (st.n || 0) + 1) % 5 === 0}})}, S.L(2.5), S.W(20)]), {freshMem:true, max:1500}), 'dead');
  check('97 run in, get the key, run back, let go just before the gate and tap across', run(96, () => script([S.R(26.5), S.L(15.0), S.U(() => Math.abs(g.P.vx) < 0.3, {}), tapL(() => cx() < 14.2*T), S.L(2.5), S.W(20)]), {freshMem:true, max:1500}), /clear|win/);
  check('97 ... or brake in a low hop across it', run(96, () => script([S.R(26.5), S.L(15.3), {until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on; }, rule: (P, k, st) => st.air ? {k:{right: Math.abs(P.vx) > 1.2 && P.vx < 0}} : {jump:3, dir:-1}}, S.L(2.5), S.W(20)]), {freshMem:true, max:1500}), /clear|win/);
  // ---- 98 newcomb: the closed box holds the key only if it saw you take nothing on the way
  const clean98 = [4, 8, 12, 16].flatMap(c => [to(c - 2.2), S.J(30, 1), S.U(P => P.on, {})]).concat([S.R(17.8)]);
  check('98 take the coins on the way, then both boxes', run(97, () => script([S.R(27.5), S.W(20)]), {freshMem:true, max:1500}), 'dead');
  check('98 leave the coins; take only the closed box', run(97, () => script([...clean98, {until: () => cx() > 21.6*T, rule: () => R()}, S.J(30, 1), S.U(P => P.on && cx() > 22.5*T, {}), S.R(27.5), S.W(20)]), {freshMem:true, max:1500}), 'dead');
  check('98 leave the coins until it has decided; then take both', run(97, () => script([...clean98, S.R(27.5), S.W(20)]), {freshMem:true, max:1500}), /clear|win/);
  // ---- 99 reflection: the Eye looks at you; behind the mirror, at its own height, it looks at itself
  const up99 = [S.R(17.4), to(19.0), S.J(30, 1), S.U(P => P.on, {}), to(20.4), S.JT(22.6, 320, {tol:10}), to(22.25)];
  check('99 run to the door', run(98, () => R, {freshMem:true, max:1200}), /dead|timeout/);
  check('99 stand where you start', run(98, () => N, {freshMem:true, max:600}), 'dead');
  check('99 under the mirror and up the steps, wait at the top', run(98, () => script([...up99, S.W(300), S.R(28.6), S.W(30)]), {freshMem:true, max:1500}), 'timeout');
  check('99 ... and wait on the floor behind the mirror', run(98, () => script([S.R(18.0), S.W(300), S.R(28.6)]), {freshMem:true, max:1500}), 'timeout');
  check('99 up, then back left onto the ledge level with the Eye; when it sees itself, go', run(98, () => script([...up99, S.J(30, -1), S.U(P => P.on, {}), to(17.8), S.U(() => g.S.trance > 0, {}), S.R(19.6), S.U(P => P.on, {}), to(20.4), S.JT(22.6, 320, {tol:10}), S.R(28.6), S.W(30)]), {freshMem:true, max:1500}), /clear|win/);
  // ---- 100 circle: you are the door; the one you were comes after you, then pretends to let go, then truly does
  const me = () => g.S.me, mx = () => g.S.me.x + 11;
  // keep away: run from it, and jump over it when it corners you
  const flee = (until) => ({until, rule: P => { const d = cx() - mx(); if (Math.abs(d) < 70 && P.on && (cx() < 2*T || cx() > 27.5*T)) return {jump:30, dir: d > 0 ? -1 : 1}; return Math.abs(d) < 260 ? (d > 0 ? R() : Lk()) : N(); }});
  check('100 stand', run(99, () => N, {freshMem:true, max:900}), 'dead');
  check('100 run away to the end', run(99, () => R, {freshMem:true, max:900}), 'dead');
  check('100 keep away; go to it when it stands still', run(99, () => script([flee(() => me().st === 'wait'), {until: () => false, rule: () => cx() > mx() ? Lk() : R()}]), {freshMem:true, max:1500}), 'dead');
  check('100 keep away; go to it when it turns its back and leaves', run(99, () => script([flee(() => me().st === 'leave'), {until: () => false, rule: () => cx() > mx() ? Lk() : R()}]), {freshMem:true, max:1800}), /win/);
  return out;
})()
