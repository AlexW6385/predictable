(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 71 frame
  check('71 go in the door in the picture', run(70, () => script([S.R(13.5)]), {freshMem:true, max:300}), 'fake');
  check('71 walk through the paint, out of the frame', run(70, () => script([S.R(28)]), {freshMem:true, max:600}), /fake|clear/);
  check('71 skirt the painted door, then walk out', run(70, () => script([S.R(12), S.J(30, 1), S.R(28)]), {freshMem:true, max:600}), 'clear');
  // ---- 72 paint
  check('72 walk across', run(71, () => script([S.R(27.3)]), {freshMem:true, max:600}), 'timeout');
  const paintTo = target => () => { let i = 0; return P => { const idx = Math.floor(cx()/T) - 8; const want = target;
      if (cx() > 20.2*T) return cx() < 27.3*T ? R() : N();
      // aim to land only on tiles that should be painted: walk across 1s, hop over 0-runs from the tile before
      if (!P.on) return {k:{right: true}};
      const nx = idx + 1; if (nx >= 0 && nx < 12 && want[nx] === 0 && (cx() - (idx + 8)*T) > 18) { let run0 = 0; while (nx + run0 < 12 && want[nx + run0] === 0) run0++; return {jump: run0 === 1 ? 3 : 6, dir:1, k:{right:true}}; }
      return {k:{right: Math.abs(g.P.vx) < 2.2}}; }; };
  check('72 leave out the blanks', run(71, paintTo([1,1,0,1,0,0,1,1,1,0,1,1]), {freshMem:true, max:1500}), /clear|timeout/);
  // ---- 73 rhythm
  check('73 run and jump', run(72, () => P => (P.on && Math.abs(cx() - 4.4*T) < 5) ? {jump:30, dir:1} : R(), {freshMem:true}), 'dead');
  // ---- 74 dance
  check('74 copy where it stands', run(73, () => script([S.R(2.4), S.J(30, 1), S.R(3.4), S.L(3.5), S.W(20)]), {freshMem:true, max:600}), /dead|timeout/);
  // ---- 75 canon
  check('75 jump at the ledge', run(74, () => P => (P.on && cx() > 18.8*T) ? {jump:30, dir:1} : R(), {freshMem:true, max:600}), 'timeout');
  check('75 climb on your own echo (searched)', (() => { const r = SOLVE.solve(74, {beam:150, depth:60}); if (!r.ok) return ['nosol']; g.setLvl(74); return [SOLVE.replay(SOLVE.strat(r.seq))]; })(), 'clear');
  const replay = (L, seq, o) => { g.prof.mem = null; g.setLvl(L); return [SOLVE.replay(SOLVE.strat(seq.split(' '), o))]; };
  check('72 hop over each blank (a found route)', replay(71, 'R R R R R R R JR1 R JR1 R R R JR1 R R R R R R R R R', {holds:[1, 3, 5, 8]}), 'clear');
  check('74 copy the colours, not the places (a found route)', replay(73, 'JR5 JR30 JR30 JR30 JL30 JL30 JL30 JR30 JN30 JN30 JR1 JR30 JR30 JR30 R', {holds:[1, 3, 5, 8, 30]}), 'clear');
  check('73 a found route', replay(72, 'JR1 JN30 JN1 JN10 JN5 JN30 JN1 N JN1 N R JR30 JN30 JN30 JR30 JR30 JR30 JR30 JR30 JR30 JR30 JR1 R', {}), 'clear');
  // ---- 76 keystone
  check('76 run across', run(75, () => R, {freshMem:true, max:600}), 'dead');
  check('76 stand on the gold stone', run(75, () => script([S.R(14.3), S.W(200)]), {freshMem:true, max:600}), 'clear');
  // ---- 77 gallery
  check('77 walk to the wall', run(76, () => script([S.R(12.8), S.W(300)]), {freshMem:true, max:600}), 'timeout');
  check('77 jump into the picture of thorns', run(76, () => script([S.R(9.9), S.J(30, 0), S.W(100)]), {freshMem:true, max:600}), 'dead');
  check('77 jump into the picture of the door', run(76, () => script([S.R(6.9), S.J(30, 0), S.W(5), S.R(27.3)]), {freshMem:true, max:600}), 'clear');
  return out;
})()
