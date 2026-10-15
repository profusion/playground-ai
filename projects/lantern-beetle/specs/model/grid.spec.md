# Grid model specification

The rules of the dark grid: where the beetle and the lantern stand, what a move
does, and when the player has won. The model is pure — no DOM, no browser API, no
network, no timers — so the same file runs in the page and under Node.

Product and stack: [PROJECT.md](../../PROJECT.md). Index:
[SPEC.md](../../SPEC.md).

## 1. Purpose and user-visible behavior

The model decides everything the player sees and feels:

- a dark grid of cells;
- one beetle standing on one cell;
- one lantern glowing on one cell;
- a beetle that moves exactly one cell per arrow-key press;
- a win the moment the beetle occupies the lantern's cell.

The page renders this state; it never invents state of its own. If the model says
the beetle is at a cell, that is where the beetle is drawn.

## 2. Inputs, outputs, rules, and states

### Inputs

| Input | Type | Rule |
| --- | --- | --- |
| Grid size | `rows`, `cols` | Whole numbers, each `>= 2`. Default `8` and `8`. |
| Beetle start | `{ row, col }` | Inside the grid. Default `{ row: 0, col: 0 }` (top-left). |
| Lantern position | `{ row, col }` | Inside the grid, and not the beetle's start. Default `{ row: 5, col: 6 }`. |
| Move | direction | One of `up`, `down`, `left`, `right`. |
| Reset | — | Optional. Returns the model to its start state. |

### Outputs

| Output | Type | Meaning |
| --- | --- | --- |
| `beetle` | `{ row, col }` | The beetle's current cell. |
| `lantern` | `{ row, col }` | The lantern's cell. Never changes during play. |
| `won` | boolean | True once the beetle has reached the lantern. |
| `moves` | whole number | Count of moves that changed the beetle's cell. |
| `state` | object | A snapshot of the above, for the page to render. |

### Rules

1. Movement is orthogonal only: `up` decreases `row`, `down` increases `row`,
   `left` decreases `col`, `right` increases `col`. No diagonals.
2. One move moves exactly one cell.
3. A move whose destination falls outside the grid is **blocked**. The model
   changes nothing: `beetle`, `moves`, and `won` keep the values they had, and
   the returned state is deeply equal to the state before the call.
4. A move that stays inside the grid is **accepted**: the beetle's cell changes
   and `moves` increases by one.
5. After each accepted move the win condition is evaluated:
   `beetle.row === lantern.row && beetle.col === lantern.col`.
6. Winning is absorbing. Once `won` is true, further moves change nothing, and
   `won` never returns to false.
7. The lantern never moves and the grid never changes size during play.
8. The model is deterministic. The same inputs always produce the same state, so
   the same position can be reproduced in a browser and under Node.

### States

| State | Condition | What it means |
| --- | --- | --- |
| `idle` | `moves === 0` and `won === false` | The page has loaded; the player has not moved yet. |
| `playing` | `moves > 0` and `won === false` | The beetle is wandering the dark. |
| `won` | `won === true` | The beetle reached the lantern. The game is over. |
| `setup error` | The start arguments are invalid | The game must not start; see below. |

### Trade-off recorded — one fixed lantern, not a random one

The start cell and the lantern cell are fixed defaults, not a random draw. The
cost is replay variety: a second playthrough is already solved. The gain is that
the same position can be named, so the page and the Node script can be compared
against one expected answer, and check 7 below can state the exact shortest path.
Random placement belongs to a later quest, and it would carry the same obligation
as everything else here: a seed the checks can pin.

## 3. Errors, empty states, and permissions

**Empty state.** The `idle` state is the empty state: a loaded game with no
input. It is a normal state, not a fault. The page shows the grid, the beetle,
the lantern, and a hint that the arrow keys move the beetle.

**Player-caused conditions that are not errors.**

- An arrow key pressed when the move is blocked: silently ignored, no message.
- A non-arrow key pressed: ignored entirely; the model is not called.
- Any arrow key pressed after the win: ignored, because winning is absorbing.

**Setup errors.** The model must reject an impossible setup instead of
pretending to work. Setup is invalid when:

| Condition | Required behavior |
| --- | --- |
| `rows` or `cols` is not a whole number, or is less than `2` | Refuse to start; report `invalid grid size`. |
| Beetle start or lantern position is outside the grid | Refuse to start; report `outside the grid`. |
| Beetle start equals the lantern position | Refuse to start; report `beetle starts on the lantern`. |

Refusing means: no model is created, an error is reported to the caller, and the
page shows its visible error state (see
[specs/pages/play.spec.md](../pages/play.spec.md)). The game must never present a
dark rectangle that silently swallows every key.

**Permissions.** None. The model reads no files, no storage, and no network. It
asks for no consent and needs no account, per [PROJECT.md](../../PROJECT.md).

**Reachability, stated once.** The grid has no walls and no obstacles, so any
in-bounds lantern position is reachable from any in-bounds beetle position. That
is a property of the rules, not a hope: section 4 proves it mechanically.

## 4. How this behavior is verified

A Node script named `check.mjs` in this folder is written in the build quest. It
requires the model file directly — no browser, no server — and **fails loudly**:
each check prints `ok` or `FAIL` with a reason, and the script exits non-zero if
any check fails. Projected checks, each traceable to a rule above:

| # | Check | Passes when |
| --- | --- | --- |
| 1 | Load | The model loads under Node and exposes its API. |
| 2 | Start state | `idle` holds; beetle, lantern, `moves === 0`, `won === false` match the configured defaults. |
| 3 | One step per move | Each accepted move changes the beetle by exactly one cell in the requested direction and increments `moves` by one. (rules 1, 2, 4) |
| 4 | Blocked edges | Repeating `up` from `row 0`, then `left` from `col 0`, leaves the state deeply equal to the state before those calls. (rule 3) |
| 5 | Win by arrival | Lands the beetle on the lantern with accepted moves; `won` becomes true exactly on the landing move and stays true. (rules 5, 6) |
| 6 | Win freeze | After the win, further moves leave the state deeply equal to the won state. (rule 6) |
| 7 | Reachability by search | A breadth-first search over the walkable grid finds a path from the beetle's start to the lantern at the default size, and the found distance equals the number of accepted moves used by check 5. |
| 8 | Setup errors | Each invalid setup in section 3 is refused with the named reason, and no model is created. |

Check 7 is the one the quest asks for in plain words: the script must show that
the beetle *can* reach the lantern, rather than assume it. Checks 3 to 6 then show
that the path is walkable through the same API the page uses.

## 5. Related specifications and journeys

- Page that renders this model: [specs/pages/play.spec.md](../pages/play.spec.md)
- Journey this model serves: [specs/journeys/reach-the-lantern.md](../journeys/reach-the-lantern.md)
- Index: [SPEC.md](../../SPEC.md)
- Product brief: [PROJECT.md](../../PROJECT.md)
