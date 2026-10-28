(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 66 generations
  const jumps66 = () => P => (P.on && [6.4, 13.4, 19.4].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R();
  check('66 run', run(65, () => script([S.R(4)]) && jumps66(), {freshMem:true}), 'dead');
  check('66 take it and run, again and again', run(65, () => jumps66(), {freshMem:true, lives:4}), /dead/);
  check('66 take it, stop on safe ground before the end; then go on', run(65, life => life === 0 ? script([S.F(jumps66(), () => cx() > 18.6*T), S.W(400)]) : jumps66(), {freshMem:true, lives:3}), 'clear');
  // ---- 67 bull
  check('67 walk', run(66, () => R, {freshMem:true, max:900}), 'dead');
  const dodge = (spot) => () => P => { const b = g.S.bull; const bx = b.x + b.w/2, dx = bx - cx();
      if (b.st === 'charge' && Math.abs(dx) < 80 && Math.sign(dx) === -b.dir && P.on) return {jump:30, dir:-b.dir};
      if (!P.on) return N();
      if (!g.ents.some(e => e.t === 'bb' && e.alive)) { if (bx < cx()) return cx() < 27.3*T ? R() : N(); if (b.st === 'charge') return N(); return cx() > 8*T ? Lk() : N(); }
      if (b.st === 'charge') return N();
      if (bx < cx()) { if (cx() < spot*T - 4) return R(); return N(); }
      // the bull is between you and the wall: lure it away to the left
      if (cx() > 8*T) return Lk(); return N(); };
  check('67 dodge it in the open', run(66, dodge(12), {freshMem:true, max:1500}), 'timeout');
  check('67 dodge it in front of the wall', run(66, dodge(20.2), {freshMem:true, max:2400}), 'clear');
  return out;
})()
