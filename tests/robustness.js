(() => { const g = window.__pred, out = [];
  // stand-ins for someone who has not understood the level: random mashing, jump spam, holding right,
  // and a wanderer that walks a while in a random direction, sometimes jumps, and stops to look around
  let seed = 12345; const rnd = () => (seed = (seed*1103515245 + 12345) % 2147483648) / 2147483648;
  const pol = {
    mash(){ const r = rnd(); if (r < 0.5) return {d:'R', j:0, n:8}; if (r < 0.9) return {d:'R', j:1 + Math.floor(rnd()*30), n:8}; if (r < 0.95) return {d:'N', j:0, n:8}; return {d:'L', j:0, n:8}; },
    spam(){ return {d:'R', j: rnd() < 0.8 ? 30 : 1 + Math.floor(rnd()*29), n:8}; },
    hold(){ return {d:'R', j:0, n:8}; },
    wander(){ const r = rnd(); if (r < 0.3) return {d:'N', j:0, n:20 + Math.floor(rnd()*160)}; const d = rnd() < 0.65 ? 'R' : 'L'; return {d, j: rnd() < 0.35 ? 1 + Math.floor(rnd()*30) : 0, n:10 + Math.floor(rnd()*70)}; },
  };
  const N = window.__N || 60;
  for (const L of window.__LVLS) { g.setLvl(L); const z = g.snap(); const res = [];
    for (const [name, f] of Object.entries(pol)) { let wins = 0, n = name === 'hold' ? 1 : N;
      for (let t = 0; t < n; t++) { g.restore(z); let hold = 0, steps = 0;
        outer: while (steps < 1800) { const a = f(); for (let i = 0; i < a.n; i++, steps++) { const k = {left:a.d === 'L', right:a.d === 'R', jump:false};
            let edge = false; if (i === 0 && a.j && g.P.on) { edge = true; hold = a.j; } if (hold > 0) { k.jump = true; hold--; }
            Object.assign(g.keys, k); if (edge) g.jump(); g.step(); if (g.state !== 'play') break outer; } }
        if (g.state === 'clear' && !g.S.fake || g.state === 'win') wins++; }
      res.push(`${name}:${Math.round(100*wins/n)}%`); }
    out.push(`L${L+1} ${res.join(' ')}`); }
  return out; })()
