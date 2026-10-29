(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const clean = id => { g.prof.marks[id] = []; };
  // ---- 61 bodies
  const build61 = (prehop) => life => { let hopped = !prehop; return P => {
      if (!hopped) { if (P.on && cx() > 2.4*T) { hopped = true; return {jump:1, dir:0}; } return R(); }
      const crates = g.ents.filter(e => e.t === 'crate' && e.set !== g.S.tog).map(e => e.x + 16).sort((a,b) => a-b), pc = cx();
      if (!P.on) return R();
      if (pc > 24.5*T) return R();
      const nxt = crates.filter(x => x > pc + 20 && x < pc + 170);
      if (25.6*T - pc < 168 && P.y > 380) return {jumpTo:26.2*T, landY:448, tol:24, k:{right:true}};
      if (nxt.length) return {jumpTo: nxt[nxt.length-1], landY:432, tol:9, k:{right:true}};
      if (pc > 3.6*T) return {jump:30, dir:1};
      return R(); }; };
  // there and back: out over your bodies to the key, then home over them; jump only onto bodies of the side the jump will take you to
  const both61 = (fix) => life => { const out = build61(false)(life); let ph = 0; return P => {
      const pc = cx();
      if (ph === 0) { if (P.on && pc > 25.4*T) ph = 1; else return out(P); }
      if (ph === 1) { if (!g.S.key.alive) { ph = 2; return N(); } if (!P.on) return N(); if (pc > 26.4*T) return Lk(); if (pc < 25.6*T) return R(); return {jumpTo:27.5*T, landY:416, tol:10, k:{right:true}}; }
      if (ph === 2) { if (!P.on) return N(); if (P.y < 400) return Lk(); if (pc > 25.4*T) return Lk(); ph = 3; }
      if (!P.on) return Lk();
      if (pc < 3.5*T) return Lk();
      const all = g.ents.filter(e => e.t === 'crate'), ok = all.filter(e => e.set !== g.S.tog).map(e => e.x + 16).filter(x => x < pc - 20 && x > pc - 170).sort((a,b) => a-b);
      if (pc - 3.4*T < 168 && P.y > 380) return {jumpTo:2.6*T, landY:448, tol:24, dir:-1, k:{left:true}};
      if (ok.length) return {jumpTo: ok[0], landY:432, tol:9, dir:-1, k:{left:true}};
      if (fix && all.some(e => e.x + 16 < pc - 20 && e.x + 16 > pc - 170)) return {jump:1, dir:0};
      return {jump:30, dir:-1}; }; };
  check('61 refuse to die (wait at the edge)', run(60, () => script([S.R(3.4), S.W(3000)]), {max:600, freshMem:true}), 'timeout');
  check('61 out over your bodies to the key, home over them (a hop in place to change sides)', run(60, both61(true), {lives:12, freshMem:true, max:3000}), 'clear');
  const crates61 = g.prof.mem && g.prof.mem.data.crates ? g.prof.mem.data.crates.length : 0;
  g.setLvl(60);
  check(`61 (same remains, ${crates61}) but hop first`, run(60, build61(true), {lives:1}), 'dead');
  // ---- 62 last time
  const die62a = [S.R(5.4), S.W(10), S.J(30, 0), S.W(60)], die62b = [S.R(15.4), S.W(10), S.J(30, 0), S.W(60)];
  check('62 alone', run(61, () => script([S.R(3.5), S.W(40), S.R(7.4), S.W(600)]), {freshMem:true, max:1200}), 'timeout');
  check('62 hold the first, die; then go', run(61, life => life === 0 ? script([S.R(3.5), S.W(240), ...die62a]) : script([S.R(19.4), S.W(600)]), {freshMem:true, lives:2, max:1500}), 'timeout');
  check('62 hold the first, die; then go through and hold the second, die; then go', run(61, life => life === 0 ? script([S.R(3.5), S.W(240), ...die62a])
    : life === 1 ? script([S.R(12.5), S.W(240), ...die62b]) : script([S.R(19.4), S.W(600)]), {freshMem:true, lives:3, max:1500}), 'timeout');
  check('62 hold the first, die; then hold the first, go through, hold the second, die; then follow', run(61, life => life === 0 ? script([S.R(3.5), S.W(240), ...die62a])
    : life === 1 ? script([S.R(3.5), S.W(200), S.R(12.5), S.W(200), ...die62b]) : script([S.R(7.0), S.U(() => g.S.open[0]), S.R(11.4), S.U(() => g.S.open[1]), S.R(27.5), S.W(30)]), {freshMem:true, lives:3, max:2000}), 'clear');
  // ---- 63 habit
  const rhythm63 = P => (P.on && [5.6, 11.6, 17.6].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R();
  check('63 hold right', run(62, () => R, {freshMem:true}), 'dead');
  check('63 stop at every edge, then jump', run(62, () => script([S.R(5.4), S.W(25), S.J(30, 1), S.R(11.4), S.W(12), S.J(30, 1), S.R(17.4), S.W(40), S.J(30, 1), S.R(23.4), S.W(20), S.J(30, 1), S.R(45.5)]), {freshMem:true, max:1500}), 'dead');
  check('63 run in rhythm, and jump the fourth yourself', run(62, () => P => (P.on && [5.6, 11.6, 17.6, 23.3].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true, max:1500}), 'dead');
  check('63 run in rhythm, hands off over its gap, keep running', run(62, () => script([S.F(rhythm63, () => cx() > 45*T)]), {freshMem:true, max:1500}), 'dead');
  check('63 run in rhythm, hands off over its gap, then stop', run(62, () => script([S.F(rhythm63, () => cx() > 30*T), S.U(P => P.on), S.W(20), S.R(45.5), S.W(30)]), {freshMem:true, max:1500}), 'clear');
  check('63 run in rhythm, hands off over its gap, then a tap back', run(62, () => script([S.F(rhythm63, () => cx() > 27.5*T), S.K({left:true}, 2), S.R(45.5), S.W(30)]), {freshMem:true, max:1500}), 'clear');
  // ---- 64 habit and shadow
  const rhythm64 = P => (P.on && [5.6, 11.6, 17.6].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R();
  const broke64 = [S.F(rhythm64, () => cx() > 20*T), S.U(P => P.on), S.W(20)], careful64 = [S.R(5.4), S.W(20), S.J(30, 1), S.R(11.4), S.W(8), S.J(30, 1), S.R(17.4), S.W(30), S.J(30, 1)];
  const hops64 = n => Array(n).fill(0).map(() => S.J(8, 1));
  check('64 run and jump each gap', run(63, () => script([S.F(rhythm64, () => cx() > 62*T)]), {freshMem:true, max:1500}), /dead@3/);
  check('64 (63) break the rhythm before the roof, take it, wait for the door', run(63, () => script([...broke64, S.R(46), S.W(400)]), {freshMem:true, max:2000}), 'dead');
  check('64 careful stop and jump, take it, wait for the door', run(63, () => script([...careful64, S.R(46), S.W(400)]), {freshMem:true, max:2000}), 'dead');
  check('64 take it, jump about by hand (no rhythm), then wait', run(63, () => script([...broke64, S.R(42), S.J(30, 1), S.R(48), S.J(30, 1), S.R(55), S.J(30, 1), S.W(400)]), {freshMem:true, max:2000}), 'dead');
  check('64 take it, two hops in rhythm, then wait', run(63, () => script([...broke64, S.R(41.5), ...hops64(2), S.W(400)]), {freshMem:true, max:2000}), 'dead');
  check('64 take it, teach your body a rhythm, let it jump once for you, then let go', run(63, () => script([...broke64, S.R(41.5), ...hops64(3), S.U(() => g.S.sh.lost, {right:true}), S.W(500)]), {freshMem:true, max:2500}), 'clear');
  check('64 ... the same, with long hops', run(63, () => script([...broke64, S.R(41.5), ...Array(3).fill(0).map(() => S.J(30, 1)), S.U(() => g.S.sh.lost, {right:true}), S.W(500)]), {freshMem:true, max:2500}), 'clear');
  // ---- 65 changed mind
  const up65 = [S.R(17.3), S.JT(20.5, 352, {tol:14}), S.R(28.5), S.W(30)], onP1 = [S.R(2.6), S.JT(5.5, 384, {tol:14})];
  check('65 hold right', run(64, () => R, {freshMem:true}), 'dead');
  check('65 up on the first lane, over the hole, up at the second', run(64, () => script([...onP1, S.R(8.5), S.J(30, 1), ...up65]), {freshMem:true, max:1200}), 'dead');
  check('65 jump at everything', run(64, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true, max:1200}), 'dead');
  check('65 up on the first lane, drop through the hole, climb at the second', run(64, () => script([...onP1, S.R(17.9), S.J(30, 1), S.R(28.5), S.W(30)]), {freshMem:true, max:1200}), 'dead');
  check('65 walk under, stay low, climb at the second', run(64, () => script([S.R(18.0), S.W(10), S.J(30, 1), S.R(28.5), S.W(30)]), {freshMem:true, max:1200}), 'dead');
  check('65 walk under, stay low, try the pit', run(64, () => script([S.R(20.9), S.J(30, 1), S.R(28.5)]), {freshMem:true, max:1200}), 'dead');
  check('65 hop under the lane, then up through the hole, up at the second', run(64, () => script([S.R(6), S.J(30, 1), S.R(9.3), S.W(12), S.JT(12.9, 384, {tol:14}), ...up65]), {freshMem:true, max:1200}), 'dead');
  check('65 walk under, up through the hole (into its fist), up at the second', run(64, () => script([S.R(9.3), S.W(12), S.JT(12.9, 384, {tol:14}), ...up65]), {freshMem:true, max:1200}), 'clear');
  check('65 ... the same at a run', run(64, () => script([S.R(10), S.J(30, 1), ...up65]), {freshMem:true, max:1200}), 'clear');
  // ---- 66 mast
  const dock66 = [S.U(() => g.S.docked), S.W(45), S.R(28.5), S.W(60)];
  const dodge66 = () => P => { if (g.S.docked) return R(); const n = (g.S.notes || []).find(n => Math.abs(n.x - cx()) < 36 && Math.sign(cx() - n.x) === Math.sign(n.vx) && Math.abs(n.vx) > 0);
    if (n && P.on && Math.abs(cx() - g.lv.mx()) > 34) return {jump:30, dir:0}; const bow = g.S.deck.x + 178; if (!P.on) return N(); return cx() < bow - 4 ? R() : cx() > bow + 4 ? Lk() : N(); };
  check('66 ride it loose, in the middle', run(65, () => script([S.R(6.0), S.W(1200)]), {freshMem:true, max:1200}), 'dead');
  check('66 ride it loose, at the bow', run(65, () => script([S.R(9.3), S.W(1200)]), {freshMem:true, max:1200}), 'dead');
  check('66 ride it loose, at the stern', run(65, () => script([S.R(4.6), S.W(1200)]), {freshMem:true, max:1200}), 'dead');
  check('66 (the lock) arrive having heard only two of her notes', run(65, () => script([S.R(6.85), S.W(10), S.J(30, 0), S.U(() => g.S.docked), S.U(() => { g.S.heard[1] = false; return true; }), S.W(45), S.R(28.5), S.W(60)]), {freshMem:true, max:1500}), /dead@2[78]/);
  check('66 bind yourself to the mast, then go', run(65, () => script([S.R(6.85), S.W(10), S.J(30, 0), ...dock66]), {freshMem:true, max:1500}), 'clear');
  check('66 think it over aboard first: the rope is stowed', run(65, () => script([S.R(6.85), S.W(60), S.J(30, 0), S.W(1200)]), {freshMem:true, max:1500}), 'dead');
  check('66 bound, you cannot get off before the ship is in', run(65, () => script([S.R(6.85), S.W(10), S.J(30, 0), S.W(80), S.R(28.5)]), {freshMem:true, max:1500}), /clear|dead/);
  // ---- 67 wanting
  const charge67 = (cond) => ({until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on; }, rule: (P, k, st) => { if (st.air || st.rel) return R(); if (k > 3 && cond()) { st.rel = true; return R(); } return {k:{right:true, jump:true}}; }});
  const p67 = (x, c) => () => script([S.R(8.3), S.W(10), charge67(() => g.S.ch > 0.97), S.R(x), S.W(10), charge67(() => g.S.ch > c), S.R(26.5)]);
  check('67 tap jump', run(66, () => P => P.on && cx() > 8*T ? {jump:1, dir:1} : R(), {freshMem:true, max:600}), 'timeout');
  check('67 all you have, at the foot of the ledge', run(66, p67(21.6, 0.97), {freshMem:true, max:2000}), 'dead');
  check('67 less, at the foot of the ledge', run(66, p67(21.6, 0.75), {freshMem:true, max:2000}), 'dead');
  check('67 all you have, from further back', run(66, p67(18.0, 0.97), {freshMem:true, max:2000}), 'dead');
  const feint67 = c => () => script([S.R(8.3), S.W(10), charge67(() => g.S.ch > 0.97), S.R(21.6), S.W(10), charge67(() => g.S.cd < 0 && g.S.ch < c), S.R(26.5)]);
  check('67 charge past it, let go as soon as it turns', run(66, feint67(0.95), {freshMem:true, max:2000}), 'dead');
  check('67 charge past it, let go on the way down, still high enough', run(66, feint67(0.8), {freshMem:true, max:2000}), 'clear');
  check('67 charge past it, let go too low', run(66, feint67(0.62), {freshMem:true, max:2000}), 'timeout');
  // ---- 68 regret (it rewinds instead of restarting, so these run as one long life)
  const life68 = (pol, max) => { g.prof.mem = null; g.setLvl(67); let deaths = 0, was = 'play';
    for (let f = 0; f < (max || 4000); f++) { const st = g.state; if (st === 'dead' && was !== 'dead') deaths++; was = st; if (st === 'clear') return `clear after ${deaths}`; window.LIB.frame(st === 'play' ? pol(g.P, deaths) : {k:{}}); }
    return `timeout after ${deaths}`; };
  const jumpAt = (xs, h) => P => { for (const x of xs) if (P.on && Math.abs(cx() - x*T) < 4) return {jump:h, dir:1}; return R(); };
  const sp68 = [5.6, 11.6, 18.6];
  check('68 walk into the first spike', [life68(R, 900)], /timeout/);
  check('68 jump each spike, the same way every time', [life68(jumpAt(sp68, 30))], /clear after 3/);
  check('68 then from closer, the same way every time', [life68(jumpAt(sp68.map(x => x + 0.9), 30))], /clear after 3/);
  check('68 after a death, jump from a tile further back', [life68((P, d) => jumpAt(sp68.map(x => x - (d ? 1 : 0)), 30)(P), 3000)], /timeout/);
  check('68 after a death, a small hop', [life68((P, d) => jumpAt(sp68.map(x => x + (d ? 0.5 : 0)), d ? 6 : 30)(P), 3000)], /timeout/);
  check('68 after a death, from closer', [life68((P, d) => jumpAt(sp68.map(x => x + (d ? 0.9 : 0)), 30)(P), 3000)], /timeout/);
  // someone who has understood but is not exact: the same jump, give or take a third of a tile, and not quite the full hold
  { const rs = []; for (const dx of [-0.3, -0.15, 0.15, 0.3]) for (const h of [24, 30]) { rs.push(life68((P, d) => jumpAt(sp68.map(x => x + (d ? dx : 0)), d ? h : 30)(P), 3000).split(' ')[0]); }
    check('68 understood, a little sloppy (8 tries)', [rs.filter(r => r === 'clear').length + '/8'], '8/8'); }
  // ---- 69 remembered
  const lidBroken = () => g.ents.filter(e => e.t === 'bb' && e.alive).length < 4;
  clean('remembered'); check('69 walk into the lid, then wait for the sky', run(68, life => life === 0 ? script([S.R(7.9), S.J(30, 1), S.R(17)]) : script([S.R(7.9), S.J(30, 1), S.R(14.6), S.W(400), S.R(17)]), {lives:2, max:1200}), 'dead');
  clean('remembered'); check('69 run and jump the well, then wait for the sky', run(68, life => life === 0 ? script([S.R(7.9), S.J(30, 1), S.R(15.0), S.J(30, 1), S.W(60)]) : script([S.R(7.9), S.J(30, 1), S.R(14.6), S.W(400), S.R(17)]), {lives:2, max:1200}), 'dead');
  clean('remembered'); check('69 jump the thorns, keep off the lid', run(68, () => script([S.R(7.9), S.J(30, 1), S.R(14.6), S.W(600)]), {max:900}), 'timeout');
  clean('remembered'); check('69 die on the lid, not above the door; then wait for the sky', run(68, life => life === 0 ? script([S.R(7.9), S.J(30, 1), S.R(14.4), S.JT(16.8, 432, {tol:10}), S.W(60)]) : script([S.R(7.9), S.J(30, 1), S.R(14.6), S.U(lidBroken), S.U(() => !(g.S.cones || []).some(c => c.st === 'fall')), S.F(P => { const h = g.ents.find(e => e.t === 'bb' && !e.alive); return {k:{right: cx() < h.x + 14, left: cx() > h.x + 18}}; }, P => P.y > 470), S.W(60)]), {lives:2, max:1500}), 'dead');
  clean('remembered'); check('69 die on the lid above the door; then wait for the sky, and jump into the hole', run(68, life => life === 0 ? script([S.R(7.9), S.J(30, 1), S.R(14.4), S.JT(18.6, 432, {tol:10}), S.W(60)]) : script([S.R(7.9), S.J(30, 1), S.R(14.0), S.U(lidBroken), S.U(() => !(g.S.cones || []).some(c => c.st === 'fall')), S.JT(18.8, 432, {tol:6}), S.W(60)]), {lives:2, max:1500}), 'clear');
  // ---- 70 self
  const wall70 = S.R(20.2), firmAt = h => () => g.S.ghosts.some(q => q.p && q.p[3] && Math.abs(q.p[0] - g.P.x) < 8 && q.p[1] === GY - 28*h);
  const base70 = () => script([wall70, S.W(900)]);
  const on1 = () => script([wall70, S.U(firmAt(1)), S.J(30, 0), S.W(900)]);
  const climb = () => script([wall70, S.U(firmAt(2)), S.J(30, 0), S.W(6), S.J(30, 1), S.R(25.6), S.W(60)]);
  check('70 one life: jump at the wall until the sand runs out', run(69, () => script([wall70, ...Array(8).fill(0).map(() => S.J(30, 1)), S.W(900)]), {freshMem:true, max:900}), 'dead');
  check('70 a life at the wall; then climb onto it and jump', run(69, life => life === 0 ? base70() : script([wall70, S.U(firmAt(1)), S.J(30, 0), S.W(6), S.J(30, 1), S.R(25.6), S.W(900)]), {lives:2, freshMem:true, max:900}), 'dead');
  check('70 a life hopping at the wall; then ride its hop', run(69, life => life === 0 ? script([wall70, ...Array(14).fill(0).map(() => S.J(30, 0)), S.W(900)]) : script([wall70, S.J(30, 0), S.J(30, 1), S.R(25.6), S.W(900)]), {lives:2, freshMem:true, max:900}), 'dead');
  check('70 a life at the wall, a life on it; then the third climbs them', run(69, life => [base70, on1, climb][Math.min(life, 2)](), {lives:3, freshMem:true, max:900}), /clear/);
  check('70 ... with a wasted life in between', run(69, life => [base70, () => script([S.R(10), S.W(900)]), on1, climb][Math.min(life, 3)](), {lives:4, freshMem:true, max:900}), /clear/);

  return out;
})()
