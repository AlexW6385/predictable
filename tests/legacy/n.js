(() => {
  const {g, S, script, run, cx, T, GY, frame} = window.LIB, out = [];
  const check = (name, res, expect) => { const last = res[res.length-1]; const ok = expect instanceof RegExp ? expect.test(last) : last.startsWith(expect); out.push(`${ok ? 'ok ' : 'XX '} ${name.padEnd(58)} ${res.join(' ')}   (want ${expect})`); };
  const R = () => ({k:{right:true}}), Lk = () => ({k:{left:true}}), N = () => ({k:{}});
  // ---- 81 light and dark
  check('81 hop on every stone', run(80, () => P => (P.on && cx() > 3.3*T && cx() < 25*T) ? {jump:8, dir:1} : R(), {freshMem:true}), 'dead');
  // ---- 82 incarnation
  check('82 walk', run(81, () => R, {freshMem:true, max:600}), /dead|timeout/);
  check('82 be still, then walk through everything', run(81, () => script([S.R(8.3), S.W(80), S.R(27.3)]), {freshMem:true, max:1200}), 'dead');
  check('82 be still before each wall, come back to yourself in the open', run(81, () => script([S.R(8.3), S.W(66), S.R(11.5), S.W(10), S.R(14.3), S.W(66), S.R(27.3)]), {freshMem:true, max:1500}), 'clear');
  // ---- 83 resurrection
  check('83 walk into the red light', run(82, () => R, {freshMem:true, max:600}), /dead/);
  check('83 through it, up the steps, back over it, to the door', (() => { g.prof.mem = null; g.setLvl(82); const res = [];
    for (let i = 0; i < 300 && g.state === 'play'; i++) { Object.assign(g.keys, {right:true, left:false, jump:false}); g.step(); } res.push(g.state);
    for (let i = 0; i < 200 && g.state !== 'play'; i++) { Object.assign(g.keys, {right:false, left:false, jump:false}); g.step(); }
    for (const l of [[25.5, 256, {tol:14}], [21, 224, {tol:14}]]) if (!SOLVE.reach(l[0], l[1], l[2]).ok) res.push('stuck');
    for (let i = 0; i < 260 && g.state === 'play'; i++) { Object.assign(g.keys, {right:false, left:true, jump:false}); g.step(); } res.push(g.state);
    for (let i = 0; i < 200 && g.state !== 'play'; i++) { Object.assign(g.keys, {right:false, left:false, jump:false}); g.step(); }
    for (let i = 0; i < 300 && g.state === 'play'; i++) { Object.assign(g.keys, {right:false, left:true, jump:false}); g.step(); } res.push(g.state); return res; })(), 'clear');
  check('83 never die: the ledge is out of reach', run(82, () => P => (P.on && cx() < 9*T) ? {jump:30, dir:-1} : Lk(), {freshMem:true, max:400}), 'timeout');
  // ---- 84 trinity
  check('84 alone', run(83, () => script([S.R(17.3), S.J(30, 1), S.R(23.5), S.W(200)]), {freshMem:true, max:600}), 'timeout');
  check('84 hold the first, die; hold the second, die; then go', run(83, life => life === 0 ? script([S.R(4.5), S.W(300), S.R(18.4), S.W(100)]) : life === 1 ? script([S.R(12.5), S.W(300), S.R(18.4), S.W(100)]) : script([S.R(17.3), S.J(30, 1), S.R(27.3)]), {freshMem:true, lives:3, max:1500}), 'clear');
  // ---- 85 needle
  check('85 take the coins on the way', run(84, () => P => (P.on && Math.abs(cx() - 6*T) < 4) ? {jump:30, dir:1} : R(), {freshMem:true, max:600}), 'timeout');
  check('85 big jumps over the low ones', run(84, () => P => (P.on && [4.0, 10.0, 16.0, 19.2].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:30, dir:1} : R(), {freshMem:true, max:600}), 'timeout');
  check('85 small hops over the low ones, walk under the high ones', run(84, () => P => (P.on && [4.3, 10.3, 16.3].some(x => Math.abs(cx() - x*T) < 5)) ? {jump:6, dir:1} : R(), {freshMem:true, max:600}), 'clear');
  return out;
})()
