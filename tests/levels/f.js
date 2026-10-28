(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 51 crime
  check('51 through the passage and back', run(50, () => script([S.R(27.3), S.L(3.6)]), {freshMem:true}), 'dead');
  check('51 through the passage, back over the top', run(50, () => script([S.R(27.3), S.L(25.4), S.J(30, -1), S.L(3.6)]), {freshMem:true, max:2400}), 'clear');
  check('51 over the top, back through the passage', run(50, () => script([S.R(4.6), S.JT(7.5, 384, {tol:30}), S.R(27.3), S.L(3.6)]), {freshMem:true, max:2400}), 'clear');
  check('51 back over the top, but stop to think', run(50, () => script([S.R(27.3), S.L(25.4), S.J(30, -1), S.L(15), S.W(120), S.L(3.6)]), {freshMem:true, max:2400}), 'dead');
  // ---- 52 intention
  const near = () => g.S.sp.some(s => g.P.x + PW + 10 > s.x && g.P.x < s.x + s.w + 2 && g.P.y + 28 > s.y - 40);
  const PW = 22;
  check('52 walk', run(51, () => R, {freshMem:true}), 'dead');
  check('52 stand against the belt', run(51, () => script([S.R(6.2), S.K({left:true}, 300)]), {freshMem:true}), 'dead');
  check('52 let the belt carry you, then walk on', run(51, () => script([S.R(7.3), S.U(() => cx() > 11.2*T, {}), S.R(28)]), {freshMem:true, max:1500}), 'dead');
  check('52 let go near every spike', run(51, () => P => near() ? N() : R(), {freshMem:true, max:1500}), /clear|dead/);
  check('52 let go at the spikes, then run off the edge', run(51, () => script([S.R(7.3), S.U(() => cx() > 11.2*T, {}), S.R(16.2), S.U(() => cx() > 20.3*T, {}), S.R(29)]), {freshMem:true, max:1500}), 'dead');
  check('52 let go at the spikes, then step down slowly', run(51, () => script([S.R(7.3), S.U(() => cx() > 11.2*T, {}), S.R(16.2), S.U(() => cx() > 20.3*T, {}), S.F(P => ({k:{right: Math.abs(g.P.vx) < 1}}), () => cx() > 27*T)]), {freshMem:true, max:1500}), 'clear');
  // ---- 53 market
  check('53 take the one you see, bring it back', run(52, () => script([S.R(10.6), S.L(4.5)]), {freshMem:true}), 'dead');
  check('53 take the hidden ones, back through the gap', [SOLVE.legs(52, [[20.5, 448], [25.5, 448], [6.0, 448], P => ({left:true})])], 'dead');
  check('53 take the hidden ones, come back high and from behind', [SOLVE.legs(52, [[20.5, 448], [25.5, 448], [27.5, 352], [24.5, 256], [20, 160], [1.5, 160], [0.5, 448], P => ({right:true})])], 'clear');
  check('53 take all three, come back high and from behind', [SOLVE.legs(52, [[10.5, 448], [20.5, 448], [25.5, 448], [27.5, 352], [24.5, 256], [20, 160], [1.5, 160], [0.5, 448], P => ({right:true})])], 'clear');
  // ---- 54 the lamp
  check('54 run and jump the boxes', run(53, () => P => (P.on && [5.2, 10.2, 15.2, 20.2].some(x => Math.abs(cx() - x*T) < 6)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('54 wait until the light is far away, then run for it', run(53, () => { let go = false; return P => { if (!go && g.S.lamp.a < 0.1 && g.S.lamp.dir < 0) go = true; if (!go) return N(); return (P.on && [5.2, 10.2, 15.2, 20.2].some(x => Math.abs(cx() - x*T) < 6)) ? {jump:30, dir:1} : R(); }; }, {freshMem:true, max:2000}), 'dead');
  { const r = SOLVE.solve(53, {depth:120}); out.push(`${r.ok ? 'ok ' : 'XX '} 54 a way through exists (search)                         ${r.ok ? r.seq.length + ' moves' : 'none'}`); }
  const charge55 = (cond) => ({until: (P, k, st) => { if (!P.on) st.air = true; return st.air && P.on; }, rule: (P, k, st) => { if (st.air || st.rel) return R(); if (k > 3 && cond()) { st.rel = true; return R(); } return {k:{right:true, jump:true}}; }});
  const p55 = (x, c) => () => script([S.R(8.3), S.W(10), charge55(() => g.S.ch > 0.97), S.R(x), S.W(10), charge55(() => g.S.ch > c), S.R(26.5)]);
  check('55 tap jump', run(54, () => P => P.on && cx() > 8*T ? {jump:1, dir:1} : R(), {freshMem:true, max:600}), 'timeout');
  check('55 all you have, at the foot of the ledge', run(54, p55(21.6, 0.97), {freshMem:true, max:2000}), 'dead');
  check('55 less, at the foot of the ledge', run(54, p55(21.6, 0.75), {freshMem:true, max:2000}), 'clear');
  check('55 all you have, from further back', run(54, p55(18.0, 0.97), {freshMem:true, max:2000}), 'clear');
  return out;
})()
