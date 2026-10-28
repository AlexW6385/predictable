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
  return out;
})()
