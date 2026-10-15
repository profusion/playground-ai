# Lantern Beetle — notes for an agent

This folder is the whole application: HTML, CSS, and JavaScript, no framework, no
build step, no dependencies. Keep it that way. The specification is the contract:
start at `SPEC.md` and follow its links before changing behavior.

## Start the page

From the repository root:

```bash
open projects/lantern-beetle/index.html
```

(`xdg-open` on Linux, `start` on Windows, or double-click the file.) The page must
open from the file system with no server.

## Measure

From the repository root:

```bash
node projects/lantern-beetle/check.mjs
```

It must print nine `ok` lines and `exit: 0 — the beetle can reach the lantern by
legal moves`, with process exit code `0`. It drives the real model, so a broken
rule makes it fail and name the broken thing.

Also run the deliberately failing mode, and confirm it still fails:

```bash
node projects/lantern-beetle/check.mjs --blocked
```

It must print `FAIL 7 reachability` and exit `1`. If it exits `0`, the
reachability search has stopped detecting a blocked path, which is a defect in the
measurement itself.

## The rule that matters

**Rerun `node projects/lantern-beetle/check.mjs` after every change that can affect
the game workflow, and rerun the `--blocked` mode to confirm it still exits
non-zero.** Do not report work as done on the strength of a screenshot, a
successful page load, or a claim that it looks right. The measurement is the
proof, and its output belongs in the summary you leave behind.

## How this app is put together

- `logic.js` holds every rule: the grid, the beetle, the lantern, movement, and
  the win. It is pure — no DOM, no browser API, no network, no timers — and that
  is what makes the measurement possible.
- `play.js` wires the keyboard and the DOM to the model, and owns no rules. If a
  rule must change, change `logic.js` and the spec, not `play.js`.
- The won state is not a dead end: `R` calls the model's `reset()` and repaints.
  Keep that in the page — it is an affordance, not a rule — and keep it offered
  only from the won state, as `IMPROVEMENT.md` records.
- `logic.js` is a **classic script**: no `import` and no `export` syntax, because
  browsers refuse ES modules over `file://`. It exposes its API on
  `globalThis.LanternBeetle` and also assigns `module.exports`, so Node can
  require the same file. Do not convert it to an ES module; the page must keep
  opening with no server.
- The page builds the 64 cells once and repaints at most two elements per move.
  Keep a move cheap; do not rebuild the board.
- Nothing is stored, requested, or bundled. No CDN, no fonts, no analytics, no
  install step.

## Changing a decision

If a change needs a decision the specification does not make, update the relevant
file under `specs/` first, keep its links working, and say so in the summary. The
specification is the map; do not let the code drift away from it.
