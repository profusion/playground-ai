# Journey — reach the lantern

The one journey this version of Lantern Beetle has, told from the player's side.
It ties the page and the model together:
[specs/pages/play.spec.md](../pages/play.spec.md) and
[specs/model/grid.spec.md](../model/grid.spec.md). Index:
[SPEC.md](../../SPEC.md).

## User

A single player at a keyboard on a desktop browser. The first such player is the
adventurer who forged the game; the second is anyone handed the folder, who opens
`index.html` and plays without installing anything.

## Goal

Find the lantern in the dark and reach it.

## Starting point

The player has the folder and no server. They double-click `index.html`. The page
opens on the dark grid, the beetle stands at its start cell, the lantern glows
elsewhere, and the status line reads *Use the arrow keys to find the lantern.*
Nothing is stored and nothing is asked of the player.

## Actions

1. The player presses an arrow key.
2. The page hands the direction to the model.
3. The model moves the beetle one cell, or refuses if the edge blocks the move.
4. The page redraws the beetle where the model says it stands.
5. The player repeats, using the glow of the lantern as the only guide, until the
   beetle's cell is the lantern's cell.

## Expected result

On the move that places the beetle on the lantern:

- the model reports `won`;
- the page announces **You found the lantern. Press R to play again.** in the
  status line;
- the board takes its `won` appearance and the lantern brightens;
- the beetle is drawn on the lantern's cell, so the arrival is visible;
- the game is over. Further arrow keys change nothing;
- pressing `R` begins a fresh run on the same page, so this journey can be walked
  again without a reload.

The win is reachable from the default start in eleven accepted moves at the
default 8×8 size, and the verification script proves that path exists.

## Failure paths

| Path | What the player sees | Why it is acceptable |
| --- | --- | --- |
| The player presses into an edge | Nothing moves; no message | The rules are silent about blocked moves, and a message here would nag. |
| The player presses a non-arrow key | Nothing happens | Only arrow keys are in scope. |
| The player wanders and cannot find the lantern | The dark grid and the hint line remain | There is no timer, no score, and no fail state in this version. |
| The player cannot use a keyboard | — | Not supported in this version: touch and pointer input are out of scope, and this is recorded as a known limitation rather than hidden. |
| The model refuses the setup | A plain message naming the reason | The page fails visibly instead of pretending to play. |
| `logic.js` fails to load | *The lantern failed to light.* | A silent dark page would look like a bug the player cannot act on. |
| Arrows pressed after the win | Nothing changes | Winning is absorbing; the journey has ended. |
| `R` pressed after the win | The board returns to the start of a fresh run | The won page must not be a dead end; this is the improvement recorded in `IMPROVEMENT.md`. |
| `R` pressed before a win | Nothing happens | Restarting mid-run is a different feature, deliberately not added. |

## What this journey does not cover

Enemies, score, story, a timer, multiple levels, sound, saved progress, accounts,
a backend, and touch controls: all excluded from this version by
[PROJECT.md](../../PROJECT.md).

## How this journey is verified

- `node check.mjs` proves mechanically that a path from the beetle's start to the
  lantern exists and that the win fires on arrival; see
  [specs/model/grid.spec.md](../model/grid.spec.md), section 4.
- The manual steps in
  [specs/pages/play.spec.md](../pages/play.spec.md), section 6, walk this same
  journey in a browser, including the edge, the unknown key, the win, and the
  failed-load path.

## Related specifications

- Page that renders this journey: [specs/pages/play.spec.md](../pages/play.spec.md)
- Model that decides it: [specs/model/grid.spec.md](../model/grid.spec.md)
- Index: [SPEC.md](../../SPEC.md)
- Product brief: [PROJECT.md](../../PROJECT.md)
