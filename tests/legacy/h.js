(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 59 intention
  const cr = () => g.S.cr.find(c => c.x + c.w + 40 > cx());
  check('59 walk', run(58, () => R, {freshMem:true}), 'dead');
  const p59 = (goWhen) => () => { let state = 'walk', target = null; return P => { const c = cr(); if (!c) return R();
      if (state === 'walk') { if (cx() > c.x - 40 && cx() < c.x) { state = 'wait'; target = c; return N(); } return R(); }
      if (state === 'wait') { if (goWhen(target)) { state = 'go'; return R(); } return N(); }
      if (state === 'go') { if (cx() > target.x + target.w + 12) state = 'walk'; return R(); } }; };
  const p59b = () => { let state = 'walk', target = null, seenDown = false; return P => { const c = cr(); if (!c) return R();
      if (state === 'walk') { if (cx() > c.x - 40 && cx() < c.x) { state = 'wait'; target = c; seenDown = false; return N(); } return R(); }
      if (state === 'wait') { if (target.st === 'down') seenDown = true; if (seenDown && target.st === 'up') { state = 'go'; return R(); } return N(); }
      if (state === 'go') { if (cx() > target.x + target.w + 12) state = 'walk'; return R(); } }; };
  check('59 let it fall, wait until it is back up, then go', run(58, p59b, {freshMem:true, max:3000}), 'dead');
  check('59 let it fall, then go as it starts to rise', run(58, p59(c => c.st === 'rise'), {freshMem:true, max:3000}), 'clear');
  // ---- 60 crossfire
  check('60 run', run(59, () => R, {freshMem:true}), 'dead');
  const lobUp = () => g.S.vt > 100 && g.S.sh.length > 0, glowL = () => g.S.vt < 30;
  check('60 stop when the first one fires', run(59, () => P => (g.S.vt > 70 && g.S.sh.length) ? N() : R(), {freshMem:true, max:3000}), 'dead');
  check('60 be still before the first one fires, until both have', run(59, () => P => (g.S.vt < 34 || g.S.vt > 96) ? N() : R(), {freshMem:true, max:3000}), 'clear');
  // ---- 61 capital
  g.prof.marks[60] = [];
  check('61 just go', run(60, () => P => (P.on && (Math.abs(cx() - 9.3*T) < 5 || Math.abs(cx() - 15.2*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true, max:900}), /dead|timeout/);
  g.prof.marks[60] = [];
  check('61 fall in the pit three times, then go', run(60, life => life < 3 ? (() => R) () : (P => (P.on && (Math.abs(cx() - 9.3*T) < 5 || Math.abs(cx() - 15.2*T) < 5)) ? {jump:30, dir:1} : R()), {lives:4, max:900}), /dead|timeout/);
  g.prof.marks[60] = [];
  check('61 let it shoot you near the door three times, then go', run(60, life => life < 3 ? script([S.R(9.3), S.J(30, 1), S.R(15.2), S.J(30, 1), S.R(24 + life*0.6), S.W(400)]) : (P => (P.on && (Math.abs(cx() - 9.3*T) < 5 || Math.abs(cx() - 15.2*T) < 5)) ? {jump:30, dir:1} : (cx() < 27.5*T ? R() : {k:{}})), {lives:4, max:1200}), 'clear');
  return out;
})()
