(() => { const g = window.__pred, out = [];
  let seed = 12345; const rnd = () => (seed = (seed*1103515245 + 12345) % 2147483648) / 2147483648;
  const pol = {
    mash(){ const r = rnd(); if (r < 0.5) return {d:'R', j:0}; if (r < 0.9) return {d:'R', j:1 + Math.floor(rnd()*30)}; if (r < 0.95) return {d:'N', j:0}; return {d:'L', j:0}; },
    spam(){ return {d:'R', j: rnd() < 0.8 ? 30 : 1 + Math.floor(rnd()*29)}; },
    hold(){ return {d:'R', j:0}; },
  };
  for (const L of window.__LVLS) { g.setLvl(L); const z = g.snap(); const res = [];
    for (const [name, f] of Object.entries(pol)) { let wins = 0, N = name === 'hold' ? 1 : 60;
      for (let n = 0; n < N; n++) { g.restore(z); let hold = 0;
        outer: for (let m = 0; m < 160; m++) { const a = f(); for (let i = 0; i < 8; i++) { const k = {left:a.d === 'L', right:a.d === 'R', jump:false};
            let edge = false; if (i === 0 && a.j && g.P.on) { edge = true; hold = a.j; } if (hold > 0) { k.jump = true; hold--; }
            Object.assign(g.keys, k); if (edge) g.jump(); g.step(); if (g.state !== 'play') break outer; } }
        if (g.state === 'clear' && !g.S.fake || g.state === 'win') wins++; }
      res.push(`${name}:${Math.round(100*wins/N)}%`); }
    out.push(`L${L+1} ${res.join(' ')}`); }
  return out; })()
