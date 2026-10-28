(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 31 time follows motion
  const arrows = () => g.S.arrows;
  check('31 stand and look', run(30, () => N, {max:600}), 'timeout');
  check('31 walk, never jump', run(30, () => R), 'dead');
  check('31 jump all the time', run(30, () => P => P.on ? {jump:30, dir:1} : R()), 'dead');
  const p31 = (D, hl, hc, dir) => () => P => { if (cx() > 28.6*T) return Lk(); const ar = g.S.arrows.filter(a => a.x + 12 > P.x).sort((a, b) => a.x - b.x), a0 = ar[0];
    if (a0) { const combo = ar.filter(a => Math.abs(a.x - a0.x) < 2).length > 1, dist = a0.x - 12 - (P.x + 20);
      if ((a0.y > 420 || combo) && dist < D + 40) return (P.on && dist < D) ? {jump: combo ? hc : hl, dir} : N(); }
    return R(); };
  check('31 hop over the low ones as you go', run(30, p31(40, 3, 3, 1)), 'dead');
  check('31 big jumps as you go', run(30, p31(60, 30, 30, 1)), 'dead');
  check('31 stop when they come, and jump where you stand', run(30, p31(82, 30, 30, 0), {max:2400}), 'clear');
  // ---- 32 the clock
  check('32 run to the door', run(31, () => R), 'dead');
  check('32 stand at the door and wait for it', run(31, () => script([S.R(24.2), S.W(3000)]), {max:1200}), 'timeout');
  check('32 wait a little way off, go when it opens', run(31, () => script([S.R(21.6), S.U(() => !g.S.open, {}), S.U(() => g.S.open, {}), S.R(26)]), {max:2000}), 'clear');
  // ---- 33 ice + cones
  const p33 = (thr, kb, mode) => () => { let n = 0, dirA = 1, t = 0; return P => { const c = (g.S.cones || []).filter(c => c.st === 'fall').length; t++;
      if (c > n && P.on) { n = c; dirA = mode === 'keep' ? 1 : (Math.abs(g.P.vx) > thr ? -1 : 1); t = 0; } else n = c;
      const k = dirA < 0 ? (t < kb ? {left:true} : {}) : {right:true};
      if (t === 0 && mode !== 'nojump') return {jump:30, dir:0, k}; if (!P.on) return {k}; return {k:{right:true}}; }; };
  check('33 run', run(32, () => R), 'dead');
  check('33 slow down when it falls (as on the earlier level)', run(32, () => { let n = 0, t = 99; return P => { const c = (g.S.cones || []).filter(c => c.st === 'fall').length; if (c > n) t = 0; n = c; t++; return {k: t < 20 ? {left:true} : {right:true}}; }; }), 'dead');
  check('33 jump forward when it falls', run(32, p33(0, 0, 'keep')), 'dead');
  const p33b = () => { let t = 99, dirA = 1; const fired = new Set(); return P => { t++;
      const c = (g.S.cones || []).find(c => c.st === 'fall' && !fired.has(c));
      if (c && P.on && (GY - (c.y + 40))/26 <= 25) { fired.add(c); dirA = Math.abs(g.P.vx) > 2.6 ? -1 : 1; t = 0; }
      const k = dirA < 0 ? (t < 14 ? {left:true} : {}) : {right:true};
      if (t === 0) return {jump:30, dir:0, k}; if (!P.on) return {k}; return {k:{right:true}}; }; };
  check('33 jump and pull back just before it lands', run(32, p33b, {max:1500}), 'clear');
  // ---- 34 bubble
  const p34 = h => () => { let j = false; return P => { if (!j) { if (cx() < 12.9*T) return R(); if (Math.abs(g.P.vx) > 0.3) return N(); j = true; return {jump:h, dir:0}; }
      const c = 15.5*T; return {k: g.P.y + 28 < 254 ? {right: cx() < c - 8, left: cx() > c + 8} : {right: cx() < 12.6*T, left: cx() > 13.2*T}}; }; };
  check('34 jump at the platform', run(33, () => P => (P.on && cx() > 12.3*T) ? {jump:30, dir:1} : R(), {max:600}), /timeout|dead/);
  check('34 a big jump from beside it', run(33, p34(60)), 'dead');
  check('34 tiny hops', run(33, () => P => (P.on && cx() > 11.5*T && cx() < 13*T) ? {jump:1, dir:1} : (cx() < 12.5*T ? R() : N()), {max:600}), 'timeout');
  check('34 a measured jump from beside it', run(33, p34(20)), 'clear');
  // ---- 35 falling
  check('35 jump every gap', run(34, () => P => (P.on && [4.4, 10.5, 15.5, 19.5, 23.5].some(x => Math.abs(cx() - x*T) < 6)) ? {jump:30, dir:1} : R()), 'dead');
  check('35 jump the first gap, then step off slowly', run(34, () => script([S.R(4.3), S.J(30, 1), S.F(P => ({k:{right: Math.abs(g.P.vx) < 1}}), () => g.P.y > 430), S.W(30)])), 'dead');
  check('35 jump the first gap, then run off each ledge', run(34, () => script([S.R(4.3), S.J(30, 1), S.R(28)])), 'clear');
  // ---- 36 the wheel
  const p36 = (a0, a1) => () => { let jumped = false; return P => { const w = g.S.wh, onW = P.stand && P.stand.wheel;
    if (!jumped) { if (cx() < 5.3*T) return R(); if (Math.abs(P.vx) > 0.1) return N();
      for (let k = 0; k < 4; k++) { const ang = ((w.a + k*Math.PI/2) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI); if (ang > a0 && ang < a1) { jumped = true; return {jump:30, dir:1}; } } return N(); }
    if (onW) { const p = P.stand, ang = Math.atan2(p.y - w.cy, p.x + 32 - w.cx); return Math.abs(ang) < 0.25 ? {jump:30, dir:1} : N(); }
    return R(); }; };
  check('36 jump at the platform when it is in front of you', run(35, p36(3.65, 3.8), {max:900}), 'dead');
  check('36 jump where it will be after it hurries', run(35, p36(2.95, 3.1), {max:1500}), 'clear');
  // ---- 37 sun
  const p37 = maxGap => () => P => { const L = g.lv, x = P.x + 11, y = P.y + 14, lit = X => L.lit(X, y);
    if (x < 1.6*T) return Lk();
    if (lit(x)) { let l = null, r = null; for (let d = 4; d < 400; d += 4) { if (l === null && x - d > 4 && !lit(x - d)) l = d; if (r === null && x + d < 950 && !lit(x + d)) r = d; }
      if (l !== null && (r === null || l <= r + 64)) return Lk(); if (r !== null) return R(); return Lk(); }
    let edge = 0; while (x - edge > 4 && !lit(x - edge)) edge += 4;
    let gap = 0; while (x - edge - gap > 4 && lit(x - edge - gap)) gap += 4;
    if (gap <= maxGap || edge > 40) return Lk(); return N(); };
  check('37 run for the door', run(36, () => Lk), 'dead');
  check('37 stand still in the shade', run(36, () => N, {max:3000}), 'dead');
  check('37 walk slowly', run(36, () => { let t = 0; return P => ({k:{left:(t++ % 2) === 0}}); }, {max:3000}), 'dead');
  check('37 go whenever you have cooled down', run(36, () => P => { const here = !g.lv.lit(cx(), g.P.y + 14); if (here && g.S.burn > 0) return N(); return Lk(); }, {max:3000}), 'dead');
  check('37 wait for the shade to come to you', run(36, p37(128), {max:3000}), 'clear');
  // ---- 38 noise
  const slowR = () => ({k:{right: Math.abs(g.P.vx) < 1.9}});
  check('38 run', run(37, () => R), 'dead');
  check('38 sneak, hop over the sleepers', run(37, () => script([S.F(slowR, () => cx() > 9.3*T), S.J(3, 1), S.F(slowR, () => cx() > 18.3*T), S.J(3, 1), S.F(slowR, () => cx() > 28.5*T)])), 'dead');
  check('38 sneak, and land only on the rugs', run(37, () => script([S.F(slowR, () => cx() > 8.8*T), S.J(30, 1), S.F(slowR, () => cx() > 17.8*T), S.J(30, 1), S.F(slowR, () => cx() > 28.5*T)])), 'clear');
  // ---- 39 wires
  check('39 walk', run(38, () => R), 'dead');
  check('39 never touch a wire', run(38, () => script([S.R(5.6), S.W(2000)]), {max:600}), 'timeout');
  check('39 jump through them', run(38, () => script([S.R(5.8), S.JT(9.7, GY, {maxPeak:78, tol:12}), S.R(11.6), S.JT(17.2, GY, {tol:20}), S.R(19.7), S.JT(22.8, GY, {maxPeak:78, tol:12}), S.R(28)])), 'clear');
  // ---- 40 chemistry
  check('40 push everything right', run(39, () => R, {max:900}), /timeout|dead/);
  check('40 keep them apart', run(39, () => script([S.R(4.6), S.JT(8.0, GY, {tol:6}), S.F(R, () => !g.S.bx[1].alive), S.L(8.6), S.JT(4.0, GY, {dir:-1, tol:22}), S.F(R, () => !g.S.bx[0].alive), S.R(26.5)]), {max:2400}), 'clear');
  // ---- 41 water
  const swimTo = (tx, ty) => P => { const k = {right: cx() < tx*T, left: cx() > tx*T + 20}; return (g.P.y + 14 > ty) && g.P.vy > -1 ? {k, edge:true} : {k}; };
  check('41 swim along the bottom', run(40, () => P => cx() < 6*T ? R() : ({k:{right:true}}), {max:1500}), 'dead');
  check('41 breathe at every gap in the roof', run(40, () => script([S.R(5.6), S.F(swimTo(11.6, 300), () => cx() > 11.3*T), S.F(swimTo(11.6, 200), () => g.P.y < 250), S.F(swimTo(17.6, 300), () => g.P.y < 250 || g.S.air < 5), S.F(swimTo(24.5, 300), () => false)]), {max:2000}), 'dead');
  check('41 breathe at the first gap, then swim straight for the exit', run(40, () => script([S.R(5.6), S.F(swimTo(11.6, 300), () => cx() > 11.3*T), S.F(swimTo(11.6, 200), () => g.P.y < 250), S.F(swimTo(24.4, 280), () => cx() > 24.2*T), S.F(P => ({k:{right:true}, edge: g.P.y < 262 || g.P.vy > -1}), () => g.P.on && g.P.y < 240), S.R(27.5)]), {max:2400}), 'dead');
  check('41 the bubbles are air too', run(40, () => script([S.R(5.6), S.F(swimTo(11.6, 300), () => cx() > 11.3*T), S.F(swimTo(11.6, 200), () => g.P.y < 250), S.F(swimTo(19.4, 330), () => Math.abs(cx() - 19.5*T) < 8), S.F(swimTo(19.2, 330), () => g.S.air >= 123), S.F(swimTo(24.4, 300), () => cx() > 24.2*T), S.F(P => ({k:{right:true}, edge: g.P.y < 262 || g.P.vy > -1}), () => g.P.on && g.P.y < 240), S.R(27.5)]), {max:2400}), 'clear');
  // ---- 42 fire
  check('42 walk right', run(41, () => R), 'dead');
  check('42 get wet, then walk carefully', run(41, () => script([S.L(1.0), S.F(P => ({k:{right: Math.abs(g.P.vx) < 2.2}}), () => cx() > 28*T)])), 'dead');
  check('42 get wet and run', run(41, () => script([S.L(1.0), S.R(28)])), 'clear');
  // ---- 43 vines
  check('43 jump at the ledges', run(42, () => P => P.on ? {jump:30, dir:1} : R(), {max:800}), 'timeout');
  check('43 stand still on the soil and wait', run(42, () => script([S.R(6.5), S.W(3000)]), {max:1200}), 'dead');
  check('43 grow, and step off at the right height', run(42, () => script([S.R(21.45), S.U(() => g.P.y + 28 < 170, {}), S.JT(24.5, 128, {tol:30}), S.R(26.5)]), {max:2400}), 'clear');
  // ---- 44 the two
  const b2near = () => g.S.b2.x - g.P.x;
  check('44 walk to the gate and wait', run(43, () => script([S.R(17.3), S.W(3000)]), {max:900}), 'dead');
  check('44 look back while waiting, then walk on', run(43, () => script([S.R(17.3), S.K({left:true}, 2), S.U(() => g.S.open, {}), S.R(28)]), {max:1500}), 'dead');
  check('44 look back while waiting, jump the other one', run(43, () => script([S.R(17.3), S.K({left:true}, 2), S.U(() => g.S.open, {}), S.F(P => (P.on && b2near() > 10 && b2near() < 70) ? {jump:30, dir:1} : R(), () => cx() > 28*T)]), {max:1500}), 'clear');
  // ---- 45 portals
  check('45 run off the ledge', run(44, () => R), 'dead');
  check('45 walk down and step into the gold hole', run(44, () => script([S.R(5.5), S.U(() => g.P.y > 430, {right:true}), S.F(P => ({k:{right: cx() < 7.6*T, left: cx() > 8*T}}), () => g.P.vy < -1), S.W(80)]), {max:600}), /timeout|dead/);
  check('45 drop straight in from the top, then drift', run(44, () => script([S.F(P => ({k:{right: Math.abs(g.P.vx) < 0.9}}), () => !g.P.on), S.F(P => ({k:{}}), () => g.P.vy < -1), S.F(R, () => g.P.on), S.R(26.5)]), {max:900}), 'clear');
  return out;
})()
