(() => {
  const {g, S, script, run, cx, T, GY} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(60)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lf = () => ({k:{left:true}});
  const fc = () => (g.S.cones || []).filter(c => c.st === 'fall');
  const left = c => Math.max(0, ((c.floor ?? GY) - c.y - 40)/26);
  // a person who reads each shadow: if it would land on you, step back from it
  const dodge = P => { for (const c of fc()) { const m = left(c); if (Math.abs(cx() + g.P.vx*m - c.x) < 34) return g.P.vx > 0.5 ? Lf() : R(); } return null; };
  // ---- 11 shelter
  const sheltered = () => g.S.roofs.some(r => !r.painted && r.alive && !r.fall && cx() > r.x + 6 && cx() < r.x + r.w - 6);
  const inFlight = () => fc().length > 0;
  // roof to roof: leave a real roof just after the rain lands on it; never trust the last one
  const hop = skipPainted => { let leave = false; return P => { const pc = cx();
      if (pc > 26.5*T) return R();
      if (sheltered()) { if (inFlight()) { leave = true; return {k:{}}; } if (leave) { leave = false; return R(); } return R(); }
      if (!skipPainted && pc > 24.3*T && pc < 25.6*T) return {k:{}};
      return R(); }; };
  check('11 hide under the first roof', run(10, () => script([S.R(6.5), S.W(3000)]), {max:900, freshMem:true}), 'dead');
  check('11 just run', run(10, () => R), 'dead');
  check('11 dodge the rain (and duck under roofs on the way)', run(10, () => P => dodge(P) || R(), {max:1500}), /dead|clear/);
  check('11 roof to roof, resting under the last one', run(10, () => hop(false), {max:1500}), 'dead');
  check('11 roof to roof, then straight past the last one', run(10, () => hop(true), {max:1500}), 'clear');
  // ---- 12 hammer
  check('12 run across', run(11, () => R), 'dead');
  check('12 walk to the lid and stand on it', run(11, () => script([S.R(20.5), S.W(600)])), 'dead');
  check('12 jump on the lid', run(11, () => P => cx() > 19.5*T && P.on ? {jump:30, dir:0} : R(), {max:900}), 'dead');
  check('12 run at it, turn back once', run(11, () => script([S.R(15.3), S.L(11), S.W(60), S.R(29)])), 'dead');
  check('12 run at it, turn back, twice', run(11, () => script([S.R(15.3), S.L(11), S.W(60), S.R(15.3), S.L(11), S.W(60), S.R(29)])), 'dead');
  check('12 run at it, turn back, three times; then drop in', run(11, () => script([S.R(15.3), S.L(11), S.W(60), S.R(15.3), S.L(11), S.W(60), S.R(15.3), S.L(11), S.W(60), S.R(20.5), S.W(120)])), 'clear');
  // ---- 13 one step behind
  check('13 stand still', run(12, () => script([S.W(600)])), 'dead');
  check('13 walk to the ledge and jump at it', run(12, () => P => P.on && cx() > 22.6*T ? {jump:30, dir:1} : R(), {max:900}), 'dead');
  check('13 keep walking back and forth', run(12, () => { let d = 1; return P => { if (cx() > 22*T) d = -1; if (cx() < 4*T) d = 1; return {k:{right:d > 0, left:d < 0}}; }; }, {max:1200}), /dead|timeout/);
  check('13 stand at its foot as one falls, step away, climb the stake', run(12, () => { let ph = 0, mark = -1; return P => {
      const pc = cx(), t = g.S.t;
      if (ph === 0) { if (pc < 23.2*T) return R(); ph = 1; return {k:{}}; }
      if (ph === 1) { if ((t - 1) % 50 === 0) { mark = t; ph = 2; } return {k:{}}; }
      if (ph === 2) { if (pc > 19.5*T) return Lf(); ph = 3; return {k:{}}; }
      if (ph === 3) { if (t - mark < 52) return {k:{left: t % 20 < 10, right: t % 20 >= 10}}; ph = 4; }
      if (ph === 4) { if (P.on && pc > 22.2*T && P.y > 400) return {jump:30, dir:1}; if (P.on && P.y < 400 && P.y > 330) return {jump:30, dir:1}; return R(); }
      return R(); }; }, {max:1200}), 'clear');
  // ---- 14 do nothing
  check('14 just walk', run(13, () => R), 'dead');
  check('14 mash', run(13, () => { let t = 0; return P => ({k:{right: (t++ >> 3) % 2 === 0}}); }), 'dead');
  check('14 touch nothing, ever', run(13, () => P => ({k:{}}), {max:1500}), 'clear');
  // ---- 15 decoy
  const plats = () => script([S.JT(4.8, 384), S.JT(9.5, 352), S.R(12.3), S.JT(15.5, 352), S.R(19.3), S.JT(22.5, 352), S.R(29)]);
  check('15 walk the ground both times', run(14, life => R, {lives:2, freshMem:true}), 'dead');
  check('15 ground first, then the platforms', run(14, life => life === 0 ? R : plats(), {lives:2, freshMem:true}), 'clear');
  // ---- 16 heavy
  const th = () => g.S.th;
  check('16 run straight', run(15, () => R), 'dead');
  check('16 careful: walk slow, stop when one falls', run(15, () => { let t = 0; return P => { for (const b of th()) if (b.st === 'fall' || b.st === 'down' || (b.st === 'rise' && b.y + 40 > GY - 34)) { if (b.x + 20 - cx() > 0 && b.x + 20 - cx() < 140) return {k:{}}; } return {k:{right:(t++ % 3) !== 0}}; }; }), 'dead');
  check('16 learned: dash under everything', run(15, () => P => { for (const b of th()) if (b.mode === 'pred' && (b.st === 'fall' || b.st === 'down' || (b.st === 'rise' && b.y + 40 > GY - 34)) && b.x + 20 - cx() > 0 && b.x + 20 - cx() < 140) return {k:{}}; return R(); }), 'dead');
  check('16 stop / dash / creep', run(15, () => { let t = 0; return P => { const [a, b2, c] = th(), pc = cx();
      const busy = b => (b.st === 'fall' || b.st === 'down' || (b.st === 'rise' && b.y + 40 > GY - 34)) && b.x + 20 - pc > 0 && b.x + 20 - pc < 140;
      if (busy(a) || busy(c)) return {k:{}};
      if (pc > 17*T && pc < c.x + 40) return {k:{right:(t++ % 2) === 0}};
      return R(); }; }), 'clear');
  // ---- 17 ice
  check('17 run', run(16, () => R), 'dead');
  check('17 slow down when it falls (as before)', run(16, () => { let n = 0, t = 99; return P => { const c = fc().length; if (c > n) t = 0; n = c; t++; return {k: t < 20 ? {left:true} : {right:true}}; }; }), 'dead');
  const p17 = () => { let t = 99, dirA = 1; const fired = new Set(); return P => { t++;
      const c = fc().find(c => !fired.has(c));
      if (c && P.on && left(c) <= 25) { fired.add(c); dirA = Math.abs(g.P.vx) > 2.6 ? -1 : 1; t = 0; }
      const k = dirA < 0 ? (t < 14 ? {left:true} : {}) : {right:true};
      if (t === 0) return {jump:30, dir:0, k}; if (!P.on) return {k}; return {k:{right:true}}; }; };
  check('17 wait until the shadow stops, then change', run(16, p17, {max:1500}), 'clear');
  // ---- 18 reflection
  check('18 stand at the foot of the ledge', run(17, () => script([S.R(23.2), S.W(400)]), {max:600}), /dead|timeout/);
  check('18 walk to the middle and wait', run(17, () => script([S.R(14.6), S.W(400)]), {max:600}), 'dead');
  check('18 plant it from the mirror point, cross, climb', run(17, () => { let ph = 0, mark = 0; return P => {
      const pc = cx(), t = g.frame;
      if (ph === 0) { if (pc < 6.4*T) return R(); ph = 1; }
      if (ph === 1) { if (g.S.st === 30) { ph = 2; mark = t; } return {k:{}}; }
      if (ph === 2) { if (t - mark < 42) return {k:{}}; ph = 3; }
      if (ph === 3) { const d = dodge(P); if (d && pc > 10*T && pc < 21*T) return {k:{}};
        const ahead = g.ents.some(e => e.stk && e.alive && e.x > pc && e.x - pc < 40 && e.x < 22*T);
        if (P.on && (ahead || (pc > 22.0*T && P.y > 400))) return {jump:30, dir:1}; if (P.on && P.y < 400 && P.y > 330) return {jump:30, dir:1}; return R(); }
      return R(); }; }, {max:1500}), 'clear');
  // ---- 19 landing
  check('19 jump the pits', run(18, () => P => P.on && [6.2, 14.2, 22.2].some(x => Math.abs(cx() - x*T) < 8) ? {jump:30, dir:1} : R()), 'dead');
  check('19 jump, then let go of the way you were going', run(18, () => { let air = 0; return P => { if (P.on) { air = 0; if ([6.4, 14.4, 22.4].some(x => Math.abs(cx() - x*T) < 6)) return {jump:30, dir:0, k:{right:true}}; return R(); } air++; return air < 3 ? R() : {k:{}}; }; }, {max:1500}), 'clear');
  // ---- 20 the eye and the sky
  check('20 let go in the open', run(19, () => script([S.R(3), S.W(900)]), {max:900}), 'dead');
  check('20 dodge to the last roof, wait facing the door', run(19, () => P => cx() > 23.6*T ? {k:{}} : (dodge(P) || R()), {max:1500}), 'dead');
  check('20 wait under the painted roof', run(19, () => P => cx() > 11.8*T && cx() < 12.6*T ? {k:{}} : (dodge(P) || R()), {max:1500}), 'dead');
  check('20 dodge to the last roof, turn your back, let go', run(19, () => { let ph = 0, n = 0; return P => { if (ph === 0) { if (cx() > 23.6*T) { ph = 1; return Lf(); } return dodge(P) || R(); } if (ph === 1 && n++ < 2) return Lf(); return {k:{}}; }; }, {max:1500}), 'win');
  return out;
})()
