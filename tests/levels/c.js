(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}});
  // ---- L21 imitation
  const nearC = (c, a, b) => c.alive && c.x - g.P.x > a && c.x - g.P.x < b;
  check('L21 just walk', run(20, () => R), 'dead');
  check('L21 jump over anything that comes', run(20, () => P => (P.on && (nearC(g.S.c1, 20, 70) || nearC(g.S.c2, 20, 90))) ? {jump:30, dir:1} : R()), 'dead');
  check('L21 jump the first, walk away from the second', run(20, () => P => { const c1 = g.S.c1, c2 = g.S.c2;
      if (P.on && nearC(c1, 20, 70) && c1.on) return {jump:30, dir:1};
      if (c2.alive && c2.act) { if (P.on && nearC(c1, -70, -20)) return {jump:30, dir:-1}; return Lk(); }
      if (!c2.alive && P.on && cx() > 25.2*T && cx() < 25.8*T) return {jump:30, dir:1};
      return R(); }, {max:1500}), 'clear');
  // ---- L22 terror
  const pitAhead = d => g.S.br.some(e => (e.ct != null || e.fall) && e.x + 32 > cx() + 4 && e.x - cx() < d);
  check('L22 jump as soon as the floor shakes ahead', run(21, () => P => (P.on && pitAhead(220)) ? {jump:30, dir:1} : R()), 'dead');
  check('L22 careful taps', run(21, () => { let t = 0; return P => ({k:{right:(t++ % 3) !== 0}}); }), 'dead');
  check('L22 keep running, jump only at the edge', run(21, () => P => (P.on && pitAhead(46)) ? {jump:30, dir:1} : R()), 'clear');
  // ---- L23 screens
  g.prof.retry = [24, 26, 25, 22, 30];
  check('L23 press jump when you die', run(22, () => P => g.S.over && g.S.over.kind === 'death' && g.S.over.t > 25 ? {jump:1} : R()), 'dead');
  check('L23 wait out the death, press start on the title', run(22, () => P => g.S.over && g.S.over.kind === 'title' && g.S.over.t > 30 ? {jump:1} : R()), 'dead');
  check('L23 never press anything on a screen', run(22, () => R, {max:1500}), 'clear');
  // ---- L24 rain
  const fc = () => g.S.cones.filter(c => c.st === 'fall');
  const dodge = P => { for (const c of fc()) { const m = Math.max(0, (GY - c.y - 40)/26); if (Math.abs(cx() + g.P.vx*m - c.x) < 30) return g.P.vx > 0.5 ? {k:{left:true}} : {k:{right:true}}; } return null; };
  check('L24 hide under the first roof', run(23, () => script([S.R(7.5), S.W(3000)]), {max:900, freshMem:true}), 'dead');
  check('L24 just run', run(23, () => R), 'dead');
  check('L24 dodge, then hide under the last roof', run(23, () => P => cx() > 22.6*T && cx() < 23.6*T ? {k:{}} : (dodge(P) || R()), {max:900}), 'dead');
  check('L24 dodge, never settle', run(23, () => P => dodge(P) || R(), {max:1500}), 'clear');
  // ---- L25 coins
  check('L25 chase the coins', run(24, () => P => { const c = g.S.cs.find(c => c.alive); if (!c) return R(); return c.x + 8 > cx() ? R() : Lk(); }, {max:1500}), /timeout|dead/);
  check('L25 herd them slowly into the corner', run(24, () => P => { const c = g.S.cs.filter(c => c.alive).sort((a,b) => Math.abs(a.x - cx()) - Math.abs(b.x - cx()))[0];
      if (!c) return cx() < 27.3*T ? R() : cx() > 27.8*T ? Lk() : {k:{}};
      const dir = c.x + 8 > cx() ? 1 : -1; const slow = Math.abs(g.P.vx) < 2.4;
      return dir > 0 ? {k:{right:slow}} : {k:{left:slow}}; }, {max:3000}), 'clear');
  // ---- L26 dark
  check('L26 full jumps across the dark', run(25, () => P => (P.on && [5.4, 14.4, 23.4].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R()), 'dead');
  check('L26 short jumps, around where you died', run(25, () => script([S.R(5.3), S.J(8, 1), S.R(10.3), S.J(8, 1), S.R(14.3), S.J(8, 1), S.R(19.3), S.J(8, 1), S.R(23.3), S.J(30, 1), S.R(28.5)])), 'clear');
  // ---- L27 colored remains
  const build27 = (prehop) => life => { let hopped = !prehop; return P => {
      if (!hopped) { if (P.on && cx() > 2.4*T) { hopped = true; return {jump:1, dir:0}; } return R(); }
      const crates = g.ents.filter(e => e.t === 'crate' && e.set !== g.S.tog).map(e => e.x + 16).sort((a,b) => a-b), pc = cx();
      if (!P.on) return R();
      if (pc > 24.5*T) return R();
      const nxt = crates.filter(x => x > pc + 20 && x < pc + 170);
      if (25.6*T - pc < 168 && P.y > 380) return {jumpTo:26.2*T, landY:448, tol:24, k:{right:true}};
      if (nxt.length) return {jumpTo: nxt[nxt.length-1], landY:432, tol:9, k:{right:true}};
      if (pc > 3.6*T) return {jump:30, dir:1};
      return R(); }; };
  check('L27 build a path of yourself, same rhythm each time', run(26, build27(false), {lives:10, freshMem:true}), 'clear');
  const crates27 = g.prof.mem && g.prof.mem.data.crates ? g.prof.mem.data.crates.length : 0;
  g.setLvl(26);
  check(`L27 (same remains, ${crates27}) but hop first like in 3`, run(26, build27(true), {lives:1}), 'dead');
  // ---- L28 three doors
  check('L28 the middle door', run(27, () => script([S.R(16.5), S.W(100)])), 'dead');
  check('L28 the far door', run(27, () => script([S.R(9.2), S.J(30, 1), S.R(15.2), S.J(30, 1), S.R(22.5)])), 'dead');
  check('L28 the door you came in by', run(27, () => Lk), 'clear');
  // ---- L29 the end
  check('L29 walk to the flag', run(28, () => script([S.R(8.8), S.JT(10.5, 416), S.R(28)]), {max:900}), 'dead');
  check('L29 leap over it', run(28, () => script([S.R(8.8), S.JT(10.5, 416), S.R(11.2), S.J(30, 1), S.R(28)])), 'clear');
  // ---- L30 the beginning
  check('L30 chase the door', run(29, () => P => ({k: g.S.door.x + 18 > cx() ? {right:true} : {left:true}}), {max:900}), /timeout|dead/);
  check('L30 stand still on the floor like in 1', run(29, () => script([S.R(5), S.W(2000)]), {max:900}), 'dead');
  check('L30 stand still under the roof, off the ground', run(29, () => script([S.R(12.0), S.JT(14.6, 416, {tol:12, maxPeak:62, minPeak:36}), S.W(3000)]), {max:1500}), 'win');
  return out;
})()
