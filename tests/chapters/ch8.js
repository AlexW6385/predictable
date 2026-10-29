(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  const clean = id => { g.prof.marks[id] = []; };
  // ---- 71 law
  const lift71 = () => S.U(() => g.S.lift.x < 6*T + 1 && (g.S.lt % 260) < 30, {});
  const ride71 = [S.R(7.0), S.U(() => g.S.lift.x > 8*T - 1, {}), S.R(10.6)];
  check('71 run, jump the gap, jump the wall', run(70, () => P => (P.on && (Math.abs(cx() - 5.5*T) < 5 || Math.abs(cx() - 13.6*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('71 run', run(70, () => R, {freshMem:true}), 'dead');
  check('71 wait for the lift, jump the wall, come back to the door', run(70, () => script([S.R(5.3), lift71(), ...ride71, S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.L(17.6), S.W(30)]), {freshMem:true, max:2000}), 'clear');
  check('71 ... but a step back before the lift', run(70, () => script([S.R(5.3), S.K({left:true}, 4), lift71(), ...ride71, S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.L(17.6), S.W(30)]), {freshMem:true, max:2000}), 'dead');
  check('71 ... and a pause before the wall', run(70, () => script([S.R(5.3), lift71(), ...ride71, S.R(12.6), S.W(60), S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.L(17.6), S.W(30)]), {freshMem:true, max:2000}), 'dead');
  { const creep = {until: () => g.S.lift.x < 6*T + 12 && cx() > 5.0*T, rule: (P, k) => ({k:{right: cx() < 5.25*T && k % 15 < 4}})};
    check('71 creep up to the lift so you never stop; then pause before the wall', run(70, () => script([creep, ...ride71, S.R(12.6), S.W(60), S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.L(17.6), S.W(30)]), {freshMem:true, max:2000}), 'clear'); }
  // ---- 72 intention
  const ice72 = [S.R(13.2), S.F(() => ({k:{right: cx() < 15.6*T}}), () => cx() > 15.6*T), S.U(() => cx() > 20.3*T, {})];
  check('72 walk', run(71, () => R, {freshMem:true}), 'dead');
  check('72 jump over the spikes', run(71, () => P => P.on && cx() > 5*T && cx() < 7*T ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('72 hands off on the belt, then walk on', run(71, () => script([S.R(4.5), S.U(() => cx() > 13.2*T, {}), S.R(29)]), {freshMem:true, max:1200}), 'dead');
  check('72 hands off on the belt and the ice, in face first', run(71, () => script([S.R(4.5), S.U(() => cx() > 13.2*T, {}), ...ice72, S.W(300)]), {freshMem:true, max:1200}), 'dead');
  check('72 ... turn round right at the door', run(71, () => script([S.R(4.5), S.U(() => cx() > 13.2*T, {}), ...ice72, S.U(() => cx() > 24.5*T, {}), S.K({left:true}, 3), S.W(300)]), {freshMem:true, max:1200}), 'dead');
  check('72 ... turn round once past the ice spikes', run(71, () => script([S.R(4.5), S.U(() => cx() > 13.2*T, {}), ...ice72, S.K({left:true}, 2), S.W(300)]), {freshMem:true, max:1200}), 'clear');
  check('72 ... turn round on the stone, before the ice', run(71, () => script([S.R(4.5), S.U(() => cx() > 13.2*T, {}), S.R(13.2), S.F(() => ({k:{right: cx() < 15.5*T}}), () => cx() > 15.5*T), S.K({left:true}, 2), S.W(300)]), {freshMem:true, max:1200}), 'clear');
  // ---- 73 searchlight: a watchman that looks where you would have gone, and learns once fooled
  { const L = () => g.S.L, seen = (d) => ({until: () => L().seen > 0, rule: () => d > 0 ? R() : Lk()}), to = (x) => ({until: () => Math.abs(cx() - x*T) < 4, rule: () => cx() < x*T ? R() : Lk()});
    const search = S.U(() => L().mode === 'search', {}), post = S.U(() => L().mode === 'post', {}), feint1 = [to(2.0), seen(1), to(2.0), search, to(12.3)];
    check('73 run', run(72, () => R, {freshMem:true}), 'dead');
    check('73 wait under the first roof', run(72, () => script([to(2.0), S.W(1500)]), {freshMem:true, max:1500}), 'timeout');
    check('73 run for the second roof', run(72, () => script([to(2.0), seen(1), to(12.3), S.W(100)]), {freshMem:true, max:2500}), 'dead');
    check('73 fall back so it looks behind you; then wait', run(72, () => script([...feint1, S.W(1200)]), {freshMem:true, max:2500}), 'timeout');
    check('73 fall back so it looks behind you; then run on', run(72, () => script([...feint1, post, S.R(23.5), S.W(60)]), {freshMem:true, max:2500}), 'dead');
    check('73 ... and fool it the same way again', run(72, () => script([...feint1, post, seen(1), to(12.3), search, S.R(23.5), S.W(60)]), {freshMem:true, max:2500}), 'dead');
    for (const d of [0, 30]) for (const p of [0, 8]) check(`73 ... then the other way round (go ${d} after it turns, peek +${p})`, run(72, () => script([to(2.0), seen(1), S.K({right:true}, p), to(2.0), search, S.W(d), to(12.3), post, seen(-1), S.K({left:true}, p), to(12.3), search, S.W(d), S.R(23.5), S.W(60)]), {freshMem:true, max:2500}), 'clear'); }
  // ---- 74 two guns: whoever alone sees you fires; where both see you (the crossing of the beams), each leaves it to the other
  { const gn = () => g.S.gn, to = (x) => ({until: () => Math.abs(cx() - x*T) < 4 && Math.abs(g.P.vx) < 0.5, rule: () => Math.abs(cx() - x*T) < 4 ? N() : cx() < x*T ? R() : Lk()});
    const tap = (x) => ({until: () => cx() >= x*T, rule: (P, k) => ({k:{right: k % 12 < 3}})});
    const up = [S.J(30, -1), S.U(P => P.on, {}), S.J(30, 1), S.U(P => P.on, R().k)], down = [S.R(26.4), S.U(P => P.on && cx() > 26.3*T, R().k), to(28.0), S.W(30)];
    const noLedge = () => { g.setLvl(73); for (const e of g.ents) if (e.t === 'b' && e.y === 394) e.alive = false; };
    check('74 run along the floor', run(73, () => R, {freshMem:true}), 'dead');
    check('74 stand', run(73, () => N, {freshMem:true, max:1200}), 'timeout');
    check('74 jump at everything', run(73, () => P => P.on ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
    check('74 hop along the floor', run(73, () => P => P.on ? {jump:4, dir:1} : R(), {freshMem:true}), 'dead');
    check('74 tap along the floor', run(73, () => script([tap(20), S.W(100)]), {freshMem:true, max:1500}), 'dead');
    check('74 run, stop when a gun takes aim', run(73, () => P => gn().some(q => q.c > 0) ? N() : R(), {freshMem:true}), 'dead');
    check('74 run, back off when it takes aim, go again', run(73, () => { let back = 0; return P => { if (gn()[1].c > 6) back = 30; if (back > 0) { back--; return Lk(); } return R(); }; }, {freshMem:true, max:1500}), /dead|timeout/);
    { const r = SOLVE.solve(73, {beam:150, depth:120, len:6, setup:noLedge}); check('74 search every way along the floor (no ledge to the catwalk)', [r.ok ? 'found: ' + r.seq.join(' ') : 'none'], 'none'); }
    check('74 climb, wait in the dark by the crossing', run(73, () => script([...up, to(11.3), S.W(900)]), {freshMem:true, max:1200}), 'timeout');
    check('74 climb, hop across the catwalk', run(73, () => script([...up, {until: () => cx() > 26*T, rule: P => P.on ? {jump:10, dir:1} : R()}, ...down]), {freshMem:true, max:1500}), 'dead');
    check('74 climb, run and jump into the crossing', run(73, () => script([...up, to(5), S.R(9), S.J(30, 1), ...down]), {freshMem:true, max:1500}), 'dead');
    check('74 climb, walk through the crossing, drop, door', run(73, () => script([...up, ...down]), {freshMem:true, max:1500}), 'clear');
    check('74 ... tapping', run(73, () => script([...up, tap(26.4), ...down]), {freshMem:true, max:2500}), 'clear');
    check('74 ... stop at the edge, then in the middle', run(73, () => script([...up, to(11.6), S.W(90), to(15), S.W(120), ...down]), {freshMem:true, max:2500}), 'clear');
    check('74 ... step in and out of the crossing', run(73, () => script([...up, to(12.6), S.W(30), to(11.5), S.W(30), to(13), S.W(20), ...down]), {freshMem:true, max:2500}), 'clear');
    check('74 ... a small hop in the middle of the crossing', run(73, () => script([...up, to(15), S.J(4, 0), S.W(30), ...down]), {freshMem:true, max:2500}), 'clear');
    check('74 ... step off the end slowly, walk back to the door', run(73, () => script([...up, S.R(25.5), tap(27), S.U(P => P.on, {}), to(27.9), S.W(30)]), {freshMem:true, max:2500}), 'clear');
    { const r = SOLVE.solve(73, {beam:150, depth:120, len:6}); check('74 search with the ledge: it goes up', [r.ok ? (r.seq[0][0] === 'J' && r.seq[0][1] === 'L' ? 'up-first' : 'other: ' + r.seq.join(' ')) : 'none'], 'up-first'); } }
  // ---- 75 queue: the others count you only once you have taken your place at the back
  { const q = () => g.S.q;
    const joiner = (dx) => () => { let st = 0; return P => { const Q = q(), line = Q.cr.filter(c => c.st === 'come' || c.st === 'wait');
        if (st === 2 || cx() > Q.x1) { st = 2; return R(); }
        if (st === 0) { const w = line.filter(c => c.st === 'wait').sort((a, b) => a.x - b.x)[0]; if (!w) return N(); const tx = w.x - (dx || 40); if (cx() < tx - 6) return R(); if (cx() > tx + 6) return Lk(); if (Q.me) st = 1; return N(); }
        if (Q.meX) return R(); if (!Q.me) return N();
        const ah = line.filter(c => c.x > cx()).sort((a, b) => a.x - b.x)[0];
        if (!ah) { if (Q.cr.some(c => c.st === 'cross') || Q.wait > 0) return N(); return R(); } if (cx() < ah.x - 44) return R(); return N(); }; };
    check('75 rush', run(74, () => R, {freshMem:true}), 'dead');
    check('75 wait at the edge, go when the bridge is clear', run(74, () => script([S.R(11.4), S.U(() => !q().cr.some(c => c.st === 'cross'), {}), S.R(25)]), {freshMem:true, max:3000}), 'dead');
    check('75 wait at the edge', run(74, () => script([S.R(11.4), S.W(3000)]), {freshMem:true, max:2000}), 'timeout');
    check('75 stand in the middle of the line, then go when it is clear', run(74, () => script([S.R(10.0), S.W(60), S.U(() => !q().cr.some(c => c.st === 'cross'), {}), S.R(25)]), {freshMem:true, max:3000}), 'dead');
    for (const dx of [40, 60, 90]) check(`75 take your place at the back (${dx} behind), keep up, go in your turn`, run(74, joiner(dx), {freshMem:true, max:3000}), 'clear'); }
  // ---- 76 identity: every jump changes your colour; count the hops on the white tiles
  { const hop = n => Array.from({length:n}, () => [S.J(30, 0), S.U(P => P.on, {}), S.W(4)]).flat();
    const go = (h, long) => () => script([S.R(2.6), S.W(12), ...hop(h[0]), S.R(3.3), S.J(30, 1), S.U(P => P.on, R().k), S.R(11.6), S.W(12), ...hop(h[1]), S.R(12.3), S.J(30, 1), S.U(P => P.on, R().k), S.R(20.6), S.W(12), ...hop(h[2]), S.R(21.3), S.J(30, 1), S.U(P => P.on, R().k), S.R(28.5), S.W(30)]);
    check('76 walk', run(75, () => R, {freshMem:true}), 'dead');
    check('76 just jump each gap', run(75, go([0, 0, 0]), {freshMem:true, max:2000}), 'dead');
    check('76 one hop before each gap (the first lesson as a habit)', run(75, go([1, 1, 1]), {freshMem:true, max:2000}), 'dead');
    check('76 one, none, none', run(75, go([1, 0, 0]), {freshMem:true, max:2000}), 'dead');
    check('76 one, none, two (count each time)', run(75, go([1, 0, 2]), {freshMem:true, max:2000}), 'clear');
    check('76 four, three, five (the same, counted the long way)', run(75, go([4, 3, 5]), {freshMem:true, max:3000}), 'clear'); }
  // ---- 77 relay: each life lasts a few seconds; the key stays where a life ran out on firm ground
  { const leg = (plan) => life => plan[Math.min(life, plan.length - 1)]();
    const toLift = [S.R(13.2)], ride = S.U(() => g.S.lift.y <= 6*T + 1, {});
    check('77 one life, ride to the top', run(76, () => script([...toLift, S.R(14.6), ride, S.R(28)]), {freshMem:true, max:800}), 'dead');
    check('77 every life, straight on', run(76, leg([() => script([...toLift, S.R(14.6), ride, S.R(28)]), () => script([S.R(14.6), ride, S.R(28)])]), {freshMem:true, lives:5, max:2000}), 'dead');
    for (const w of [0, 40]) check(`77 run out of time at the foot of the lift; then ride it, step off, run out there; then run (waits ${w})`, run(76, leg([() => script([...toLift, S.W(400)]), () => script([S.W(w), S.R(14.6), ride, S.R(17), S.W(300)]), () => script([S.W(w), S.R(28)])]), {freshMem:true, lives:4, max:2000}), 'clear'); }
  // ---- 78 babel: what your keys mean is set by the height you last stood at
  { const climb = (dirs) => () => { const steps = [[4.6, 6.9, 384], [8.0, 9.9, 320], [11.0, 12.9, 256], [14.0, 15.9, 192], [17.0, 20.5, 128]]; let i = 0, air = false;
      return P => { if (i >= steps.length) return {k:{right: dirs[4] > 0, left: dirs[4] < 0}}; const [from, to, y] = steps[i], d = dirs[i], k = {right: d > 0, left: d < 0};
        if (P.on && air) { air = false; if (Math.abs(P.y + 28 - y) < 3) i++; return {k:{}}; }
        if (!P.on) { air = true; const mv = g.P.vx > 0.5; return cx() < to*T ? {k:Object.assign({jump:true}, k)} : {k:{jump:true, right: mv && d < 0, left: mv && d > 0}}; }
        if (cx() >= from*T - 4) return {jump:1, k}; return {k}; }; };
    check('78 climb as you always would', run(77, climb([1, 1, 1, 1, 1]), {freshMem:true, max:900}), 'dead');
    check('78 swap once you are up, and stay swapped', run(77, climb([1, 1, -1, -1, -1]), {freshMem:true, max:900}), 'dead');
    check('78 at each new height, try the keys first, then climb', run(77, climb([1, 1, -1, -1, 1]), {freshMem:true, max:900}), 'clear'); }
  // ---- 79 testimony: one always tells the truth, one never does; ask them about the spikes first
  { const says = (i) => { const t = g.S.topic; if (!t) return null; return i === g.S.liar ? !t.good : t.good; };
    const enter = (c) => [{until: () => Math.abs(cx() - (c + 0.5)*T) < 5, rule: () => cx() < (c + 0.5)*T ? R() : Lk()}, S.W(80)];
    const crossPit = [S.R(3.3), S.W(10), S.J(30, 1), S.U(P => P.on, R().k)];
    const wise = () => { let liar = null, pick = null, phase = 0, sc = null; return P => {
        if (phase === 0) { if (cx() < 3.3*T) return R(); if (Math.abs(g.P.vx) > 0.2) return N(); liar = says(0) ? 0 : 1; phase = 1; sc = script(crossPit); }
        if (phase === 1) { if (P.on && cx() > 7*T) phase = 2; else return sc(P); }
        if (phase === 2) { for (const c of [13, 16, 19, 22, 25]) if (Math.abs(cx() - (c + 0.5)*T) < 12 && says(1 - liar)) pick = c; if (cx() < 25.8*T) return R(); phase = 3; sc = script(enter(pick)); }
        return sc(P); }; };
    const trusting = (who) => () => { let pick = null; return script([...crossPit, {until: () => cx() > 25.8*T, rule: () => { for (const c of [13, 16, 19, 22, 25]) if (Math.abs(cx() - (c + 0.5)*T) < 12 && says(who)) pick = c; return R(); }}, {until: () => pick != null && Math.abs(cx() - (pick + 0.5)*T) < 5, rule: () => pick == null ? R() : cx() < (pick + 0.5)*T ? R() : Lk()}, S.W(80)]); };
    check('79 walk', run(78, () => R, {freshMem:true}), 'dead');
    for (const who of [0, 1]) { let ok = 0; for (let k = 0; k < 6; k++) { const r = run(78, trusting(who), {freshMem:true, max:1500}); if (/clear|win/.test(r[r.length - 1])) ok++; g.prof.deaths++; }
      check(`79 always believe the ${who ? 'right' : 'left'} one (6 times)`, [`${ok}/6`], /^[0-5]\//); }
    let wins = 0; for (let k = 0; k < 8; k++) { const r = run(78, wise, {freshMem:true, max:1500}); if (/clear|win/.test(r[r.length - 1])) wins++; g.prof.deaths++; }
    check('79 ask both about the spikes, then believe the honest one (8 times)', [`${wins}/8`], '8/8'); }
  // ---- 80 state: one offence is reported if the watchman sees it, and the gun fires where it believes you are
  { const wallUp = () => g.ents.some(e => e.t === 'bb' && e.alive), over8 = [S.R(6.4), S.J(30, 1), S.U(P => P.on, R().k)];
    check('80 jump the wall, run', run(79, () => script([...over8, S.R(29), S.W(300)]), {freshMem:true, max:900}), 'timeout');
    check('80 stand', run(79, () => N, {freshMem:true, max:900}), 'timeout');
    check('80 jump at the brick wall', run(79, () => script([...over8, S.R(22.5), S.J(10, 1), S.U(P => P.on, R().k), S.W(200)]), {freshMem:true, max:900}), 'dead');
    check('80 jump everything', run(79, () => P => P.on && (Math.abs(cx() - 6.4*T) < 5 || g.P.vx > 4) ? {jump:30, dir:1} : R(), {freshMem:true, max:900}), 'dead');
    check('80 offend where it cannot see (under the roof)', run(79, () => script([...over8, S.R(18.2), S.W(10), S.J(4, 0), S.U(P => P.on, {}), S.W(200), S.R(29), S.W(60)]), {freshMem:true, max:1200}), 'timeout');
    for (const x of [10, 12, 14, 15.5]) check(`80 offend in its sight at ${x}, run in under the roof, let it fire at where you were going`, run(79, () => script([...over8, S.R(x), S.J(4, 1), S.U(P => P.on, R().k), S.R(18.2), S.W(150), S.R(28), S.W(30)]), {freshMem:true, max:1200}), /clear|win/); }
  return out;
})()
