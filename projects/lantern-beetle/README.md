# Lantern Beetle

A one-page browser game. A dark grid fills the page, the arrow keys move a beetle
across it, a lantern glows somewhere in the dark, and reaching the lantern wins.
One beetle, one lantern, one win.

HTML, CSS, and JavaScript in one folder. No framework, no packages, no build step,
and no server.

## What you need

- A browser. That is all, to play.
- [Node.js](https://nodejs.org/) 18 or newer, only to run the measurement.

Nothing is installed, compiled, or bundled.

## Start the page

From the repository root, on macOS:

```bash
open projects/lantern-beetle/index.html
```

On Linux use `xdg-open projects/lantern-beetle/index.html`; on Windows use
`start projects/lantern-beetle/index.html`. Double-clicking `index.html` in a file
manager does the same thing, and so does any static file server — no server is
required, because the page is opened straight from the file system.

Then press the arrow keys. `Up`, `Down`, `Left`, and `Right` each move the beetle
one cell; the edges block it silently.

## Run the measurement

From the repository root:

```bash
node projects/lantern-beetle/check.mjs
```

Expected: eight `ok` lines and

```text
exit: 0 — the beetle can reach the lantern by legal moves
```

The process exit code is `0`. Every line is printed `ok` or `FAIL` with its
reason, so a broken workflow says what broke instead of staying quiet.

The measurement reads the same model the page plays, with no browser and no
server, so it needs nothing running:

| Check | What it proves |
| --- | --- |
| 1 load | The model loads under Node and exposes its API. |
| 2 start state | 8×8 grid, beetle at (0,0), lantern at (5,6), not won, no moves counted. |
| 3 one step per move | Each direction moves exactly one cell and counts one move; unknown directions are refused. |
| 4 blocked edges | Moving into an edge changes nothing; a move after the win does not count. |
| 5 win by arrival | Walking to the lantern fires the win exactly on the landing move. |
| 6 win freeze | Every move after the win leaves the state untouched. |
| 7 reachability | A breadth-first search finds the lantern in 11 legal moves, matching the walk in check 5. |
| 8 setup errors | Five impossible setups are refused with their named reason. |

### Prove that the measurement can fail

```bash
node projects/lantern-beetle/check.mjs --blocked
```

Expected: `FAIL 7 reachability`, the message that the lantern is walled off, and
an **exit code of `1`**:

```text
exit: 1 — the path is blocked, exactly as this scenario requires; the measurement can fail
```

This run walls off the beetle's row with a layout the game itself can never
produce, so it measures the harness, not the game. It exists because a
measurement that can only pass is not a measurement. Both runs together are the
proof: green means the road is clear, and the `--blocked` run means the dark can
still win.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The page: the board, the two pieces, and the status line. |
| `styles.css` | The dark grid, the beetle, and the lantern. |
| `logic.js` | The game rules. Pure: no DOM, no browser API, no network. |
| `play.js` | Turns arrow keys into model moves and draws what the model reports. Owns no rules. |
| `check.mjs` | The measurement above. |
| `screenshots/` | Idle, playing, and won states of the page. |
| `PROJECT.md` | The product brief. |
| `SPEC.md` | The specification index. |
| `specs/` | The linked contracts: the model, the page, and the player journey. |

## Known limitations

- Only the keyboard is supported. Touch and pointer input are out of scope for
  this version.
- The beetle's start cell and the lantern's cell are fixed, so a second
  playthrough is already solved. Random placement is a later quest, and it would
  need a seed the checks can pin.
- The measurement covers the model, where the rules live. The page itself is
  checked by the manual steps in `specs/pages/play.spec.md`, section 6.
- The status line is the announced channel for screen readers; the beetle's cell
  is not announced move by move, to keep a move to two element updates.

## Specification

`SPEC.md` is the index. The contracts are
`specs/model/grid.spec.md` (rules and the measurement),
`specs/pages/play.spec.md` (the page), and
`specs/journeys/reach-the-lantern.md` (the player's journey).
