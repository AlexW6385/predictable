(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 62 steps
  const climb = (n) => () => { let jumps = 0, was = true, ph = 0; return P => { const x = cx();
      if (ph === 0) { if (x < 5.6*T) return R(); ph = 1; return {jump:30, dir:1}; }
      if (ph === 1) { if (!P.on) return R(); if (P.stand && P.stand.step) return {jump:30, dir:1}; if (x < 15*T) return R(); ph = 2; }
      if (ph === 2) { if (P.on && jumps < n) { jumps++; return {jump:16, dir:1}; } return R(); } }; };
  check('62 just go', run(61, () => script([S.R(5.6), S.J(30, 1), S.R(29)]), {freshMem:true, max:600}), 'timeout');
  check('62 climb, climb, climb, climb', run(61, climb(4), {freshMem:true, max:2000}), 'dead');
  check('62 three steps up, then walk on', run(61, climb(3), {freshMem:true, max:2000}), 'clear');
  // ---- 63 fire
  check('63 walk, hop the stones', run(62, () => P => (P.on && [3.3, 12.3].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:8, dir:1} : R(), {freshMem:true}), 'dead');
  check('63 knock it over and run back', run(62, () => script([S.R(3.3), S.J(8, 1), S.R(9.2), S.L(0.5)]), {freshMem:true}), 'dead');
  check('63 knock it over, get up on the stone, wait', run(62, () => script([S.R(3.3), S.J(8, 1), S.R(9.2), S.R(11.6), S.JT(13.5, 416, {tol:8}), S.F(P => ({k:{left: cx() > 13.6*T, right: cx() < 13.4*T}}), () => g.S.tiles.every(t => t.fire === 0 || t.fire >= 60) && g.S.tiles[25].fire >= 60), S.R(27.3)]), {freshMem:true, max:3000}), 'clear');
  // ---- 64 shadow
  const lampOver = (L, x) => L.on && L.x < x + 40;
  check('64 run across', run(63, () => R, {freshMem:true}), 'dead');
  check('64 let the first light go, then run across', run(63, () => script([S.R(3.5), S.U(() => !g.S.lamps[0].on && g.S.t > 10, {}), S.R(27.3)]), {freshMem:true, max:2000}), 'dead');
  check('64 let it go, cross to the stone, let the next one go too', run(63, () => script([S.R(3.5), S.U(() => !g.S.lamps[0].on && g.S.t > 10, {}), S.R(14.9), S.U(() => !g.S.lamps[1].on && g.S.t > 400, {}), S.R(27.3)]), {freshMem:true, max:2000}), 'clear');
  check('64 wait on the boards instead', run(63, () => script([S.R(3.5), S.U(() => !g.S.lamps[0].on && g.S.t > 10, {}), S.R(18.5), S.U(() => !g.S.lamps[1].on && g.S.t > 400, {}), S.R(27.3)]), {freshMem:true, max:2000}), 'dead');
  // ---- 65 measure
  check('65 full jumps', run(64, () => P => (P.on && g.S.pits.some(p => p.x > P.x && p.x - (P.x + 22) < 6)) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  check('65 always just enough', run(64, () => P => { const pit = g.S.pits.find(p => p.x > P.x && p.x - (P.x + 22) < 6 && p.x - (P.x + 22) > -2); if (P.on && pit) { for (let h = 1; h <= 30; h++) { const r = window.LIB.sim(h, 1, GY); if (r.c > pit.x + pit.w + 12) return {jump:h, dir:1}; } return {jump:30, dir:1}; } return R(); }, {freshMem:true}), 'clear');
  return out;
})()
