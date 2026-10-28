# Predictable

A wordless troll platformer that watches how you play and sets its traps for the player you are.

**▶ Play it in your browser: https://alexw6385.github.io/predictable/**

100 levels, no text, no hints. Every trap is meant to be fair: you can always work out afterwards why you died, and the next level is built on what you just learned. Then it uses that against you.

## Play

Play online at **https://alexw6385.github.io/predictable/**, or open `index.html` locally. It is a single self-contained file (vanilla JS + canvas, no build step, no dependencies).

| Action | Keys |
| --- | --- |
| Move | ← → or A D |
| Jump | ↑, W, Space or Z (hold for higher) |
| Continue / retry | Enter or jump |
| Restart this level | R or ↺ |
| Level sheet | ▦ (start any level; cleared ones are marked) |

The page always fits the window and never scrolls. On phones the game fills the screen in landscape, with the touch controls in their own strips beside it (the move pad is one strip: press and slide your thumb to switch direction) (or under it on nearly 16:9 screens) so they never cover the game (on Android the first touch also switches to real full screen; on iPhone, *Add to Home Screen* gives the same). Progress, death marks and the habits the game has learned about you are kept in `localStorage` and are never reset by the game.

## Design

The game is being rebuilt chapter by chapter from the design document. The finished chapters are what you play; the rest are added as they are done. The first version of the game is kept in `legacy/` for reference and is not published.

The full design (the bar every level has to clear, the ten chapters, the recurring cast and every level's idea) is in [DESIGN.md](DESIGN.md).

## How it works

- **Fixed-step engine** (60 fps) with one array of level objects. Each level is a small set of hooks (`build`, `update`, `draw`, `input`, `onJump`, `onLand`, `onDeath`, …) on top of shared pieces: blocks, spikes, doors, cones, eyes, belts, water.
- **Memory.** Each level keeps state across your lives (`M`), and the profile keeps cross-level habits: your running speed, how fast you retry, which way you tend to look, where you died. Several levels predict your next move from these and place traps there.
- **Debug mode.** Open `index.html#debug` to expose `window.__pred` (snapshot/restore, single-step, level select, key injection). The tests use it.

## Tests

Every level has scripted tests in `tests/chapters/` (one file per chapter) that check three things:

1. the naive approach dies,
2. the "I've figured it out" approach dies to the next layer, and
3. a real route clears (scripted, or found by the beam-search solver in `tests/solver.js`).

```bash
pip install playwright && python -m playwright install chromium
python tests/run_tests.py                 # all chapters
python tests/run_tests.py ch1 ch2         # selected chapters
python tests/run_tests.py --robust 0,1 150   # mash / jump-spam / hold-right / wandering bots on 0-indexed levels
```

The robustness bots should almost never clear a level by accident.
