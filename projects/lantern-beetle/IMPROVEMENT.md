# IMPROVEMENT.md — quickstart-04

One rough edge, chosen by using the game, recorded before the change was made.

## 1. What I tried, and what I observed

I played it the way a first-time player would: opened `index.html`, pressed the
arrow keys, and walked the beetle to the lantern.

What happened, in order:

- The page opened on the dark grid with the hint line. Good.
- Each arrow press moved the beetle exactly one cell. Good.
- Pressing into an edge did nothing at all, silently. That is a recorded decision,
  not a defect.
- Then the win: **You found the lantern.**, the board warmed, the lantern
  brightened.
- And that was the end of the application. The game was over and the page offered
  nothing else.

I then tried every key a stuck player would try on a won board. These are live DOM
readings, not impressions:

| Key tried on the won board | What changed |
| --- | --- |
| `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` | Nothing |
| `R` | Nothing |
| `Enter` | Nothing |
| `Space` | Nothing |

The page contains no button, no link, and no control for another run; the only
focusable things are the board and the two documentation links. The only way to
play again is to reload the page in the browser — ⌘R or F5 — which is browser
chrome, not the game. The build-quest screenshot of that state,
`screenshots/03-won.png`, shows a finished board with no affordance at all.

**The rough edge:** the won page is a dead end. The player has solved the only
puzzle, the product has nothing left to offer, and it never says so.

## 2. Alternatives considered

| # | Improvement | Cost | Verdict |
| --- | --- | --- | --- |
| A | **Restart after winning.** From the won state, offer a way back to a fresh run. | Small: the model already exposes `reset()`; the page needs a key and a line of text. | **Chosen.** |
| B | **Randomise the lantern's cell behind a pinnable seed.** The same puzzle every time is the deeper reason a replay is dull. | Medium: the model gains seeded placement, the specification's recorded trade-off changes, and the measurement has to pin the seed. | Runner-up. The specification defers this to a later quest, and it is a bigger change than one focused fix. |
| C | **Stop being silent at the edges.** Flash the board or print a line when a move is blocked. | Small. | Rejected: the specification chooses silence deliberately — "a message here would nag" — so this is a taste change, not a defect. |
| D | **Announce the beetle's cell for screen readers.** | Small. | Rejected for now: a live position line adds a third element update per move, past the two-update budget recorded in the page specification, and deserves its own announcement design. |
| E | **Show a move counter.** | Small. | Rejected: the brief excludes score, and a bare move count is close enough to score to argue about. |

## 3. The one improvement chosen, and why

**A — restart after winning.**

It is the only alternative where the application becomes *unusable* rather than
merely duller or quieter. After a win, a player cannot keep using the product at
all; every other item on the list is a matter of polish. It is also small, it
needs no new rule, and it does not overturn any recorded scope decision: the
fixed placement stays fixed, the edges stay silent, and touch stays out of scope.

**Boundary, kept deliberately narrow.** The restart is offered only from the won
state. Restarting in the middle of a run is a different feature — a pause-menu
concern — and this quest makes one focused change.

## 4. Expected behavior, and how it is verified

Expected after the change:

1. On winning, the status line reads
   **You found the lantern. Press R to play again.**
2. Pressing `R` returns the run to its start: the beetle back on its start cell,
   the hint line restored, the board no longer warm, the lantern unchanged.
3. The lantern can then be reached and won again, without reloading the page.
4. Pressing `R` before a win does nothing. Arrow keys on a won board still do
   nothing, exactly as before.

Verification:

- **Model, automated.** A new check 9 in `check.mjs`: after a win, `game.reset()`
  returns the idle start state — beetle at its start cell, `moves` 0, `won` false,
  `status` `idle`, lantern unmoved — and from that state the lantern is reachable
  and the win can be achieved a second time.
- **Page, in a browser.** Win the game, read the status line, press `R`, read the
  board and status again, then win a second time. New screenshots record the won
  state with the offer, the restarted board, and the second win.
- **Measurement discipline.** `node check.mjs` must still exit 0 for the normal
  game, and `node check.mjs --blocked` must still exit non-zero for the blocked
  path.

## 5. How the AI agent helped

- It replayed the game in a headless browser and confirmed the dead end
  mechanically, reading the live DOM: four arrow keys, `R`, `Enter`, and `Space`
  all left the state byte-for-byte unchanged, and the page holds no control for
  another run.
- It inspected the code and found the cause: the keyboard handler in `play.js`
  returns early once the game is finished, and nothing else can reset the board.
- It challenged my assumption that a restart needed new rules. It did not:
  `logic.js` already exposes `reset()` as part of the documented API, so the
  change stayed in the page and no model surface was invented.
- It proposed the smallest plan — page change, one new model-level check, spec and
  docs updates — implemented it, extended the measurement, and reran the loop,
  including the deliberately failing mode.

## 6. Before and after

| | Before | After |
| --- | --- | --- |
| Won state, status line | **You found the lantern.** | **You found the lantern. Press R to play again.** |
| Keys that do something on a won board | None | `R` (restart) |
| Playing a second run | Reload the browser page | Press `R` |
| Board after the won state | Stays warm, unbeatable, permanent | Returns to idle on `R`, and can be won again |
| Measurement coverage of the behaviour | None | Check 9: reset returns the idle start state and a second win is reachable |
| Rules changed | — | None: the model already had `reset()`; this is a page affordance |
