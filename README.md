# Predictable

A wordless troll platformer that watches how you play and sets its traps for the player you are.

100 levels, no text, no hints. Every trap is meant to be fair: you can always work out afterwards why you died, and the next level is built on what you just learned. Then it uses that against you.

## Play

Open `index.html` in a browser. It is a single self-contained file (vanilla JS + canvas, no build step, no dependencies).

| Action | Keys |
| --- | --- |
| Move | ← → or A D |
| Jump | ↑, W, Space or Z (hold for higher) |
| Continue / retry | Enter or jump |

Touch controls appear on phones. Progress, death marks and the habits the game has learned about you are kept in `localStorage`; the "forget" button under the game clears them.

## How it works

- **Fixed-step engine** (60 fps) with one array of level objects. Each level is a small set of hooks (`build`, `update`, `draw`, `input`, `onJump`, `onLand`, `onDeath`, …) on top of shared pieces: blocks, spikes, doors, cones, eyes, belts, water.
- **Memory.** Each level keeps state across your lives (`M`), and the profile keeps cross-level habits: your running speed, how fast you retry, which way you tend to look, where you died. Several levels predict your next move from these and place traps there.
- **Debug mode.** Open `index.html#debug` to expose `window.__pred` (snapshot/restore, single-step, level select, key injection). The tests use it.

## Tests

Every level has scripted tests in `tests/levels/` that check three things:

1. the naive approach dies,
2. the "I've figured it out" approach dies to the next layer, and
3. a real route clears (scripted, or found by the beam-search solver in `tests/solver.js`).

```bash
pip install playwright && python -m playwright install chromium
python tests/run_tests.py            # all suites
python tests/run_tests.py n o        # selected suites
python tests/run_tests.py --robust 85,86   # random mash / jump-spam / hold-right bots (0-indexed levels)
```

The robustness bots should almost never clear a level by accident.
