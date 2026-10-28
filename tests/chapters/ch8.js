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
  check('71 wait for the lift, jump the wall, chase the door', run(70, () => script([S.R(5.3), lift71(), ...ride71, S.R(13.6), S.J(30, 1), S.R(28)]), {freshMem:true, max:2000}), 'dead');
  check('71 ... then wait for it', run(70, () => script([S.R(5.3), lift71(), ...ride71, S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.W(300)]), {freshMem:true, max:2000}), 'dead');
  check('71 wait for the lift, jump the wall, turn your back', run(70, () => script([S.R(5.3), lift71(), ...ride71, S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.R(19), S.K({left:true}, 400)]), {freshMem:true, max:2000}), 'clear');
  check('71 ... but turn your back on the lift as well', run(70, () => script([S.R(5.3), S.K({left:true}, 3), lift71(), ...ride71, S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.R(19), S.K({left:true}, 400)]), {freshMem:true, max:2000}), 'dead');
  check('71 walk back to pass the time, then wait, then turn back', run(70, () => script([S.R(4.0), S.K({left:true}, 20), S.R(5.3), lift71(), ...ride71, S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.R(19), S.K({left:true}, 400)]), {freshMem:true, max:2000}), 'dead');
  { const creep = {until: () => g.S.lift.x < 6*T + 12 && cx() > 5.0*T, rule: (P, k) => ({k:{right: cx() < 5.25*T && k % 15 < 4}})};
    check('71 creep up to the lift so you never stop, then wait for the door', run(70, () => script([creep, ...ride71, S.R(13.6), S.J(30, 1), S.U(P => P.on, R().k), S.R(19), S.K({left:true}, 6), S.W(400)]), {freshMem:true, max:2000}), 'clear'); }
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
  // ---- 74 two guns: the gold one fires at where you will be, the white one at where you are; turn the gold one on the wall
  { const wallUp = () => g.ents.some(e => e.t === 'bb' && e.alive);
    const feint = (x0, lead, d) => () => { let st = 0, n = 0; return P => { const t = g.S.gs.t, x = cx(), fired = g.S.gs.sh.length > 0;
        if (st === 0) { if (x < x0*T - 4) return R(); if (x > x0*T + 4) return Lk(); if (t > lead || fired) return N(); st = 1; n = 0; }
        if (st === 1) { if (fired && ++n > d) { st = 2; n = 0; } return R(); }
        if (st === 2) { if (++n < 20 || fired) return Lk(); if (wallUp()) { st = 0; return N(); } st = 3; }
        if (t < 45 || fired) return N(); return R(); }; };
    check('74 run', run(73, () => R, {freshMem:true, max:1500}), /dead|timeout/);
    check('74 stand: they cancel, and nothing changes', run(73, () => N, {freshMem:true, max:1500}), 'timeout');
    check('74 wait by the wall', run(73, () => script([S.W(250), S.R(23), S.W(1500)]), {freshMem:true, max:1500}), /dead|timeout/);
    check('74 stop when they fire', run(73, () => P => g.S.gs.sh.length ? N() : R(), {freshMem:true, max:2000}), 'dead');
    check('74 keep going when they fire, stop between', run(73, () => P => g.S.gs.sh.length || g.S.gs.t < 40 ? R() : N(), {freshMem:true, max:2000}), 'dead');
    check('74 turn back whenever they fire, far from the wall', run(73, () => script([S.W(250), S.R(8), S.F(P => g.S.gs.sh.length ? Lk() : (cx() < 8*T ? R() : N()), () => false)]), {freshMem:true, max:2000}), /timeout|dead/);
    for (const [x0, lead, d] of [[10, 30, 0], [13, 50, 20], [13, 30, 10]]) check(`74 head for the wall as they fire, turn back (from ${x0}, ${lead} early, ${d} late)`, run(73, feint(x0, lead, d), {freshMem:true, max:3000}), 'clear'); }
  return out;
})()
