# Play page specification

The page the player opens: what it draws, what it listens to, what it shows when
the game is won, and what it does when something is wrong. It renders the model
described in [specs/model/grid.spec.md](../model/grid.spec.md) and owns no game
rules of its own.

Product and stack: [PROJECT.md](../../PROJECT.md). Index:
[SPEC.md](../../SPEC.md).

## 1. Purpose and user-visible behavior

One page, one game, no menus:

1. The player opens `index.html` in a browser — by double-clicking the file, with
   no server running.
2. A dark grid fills the page.
3. A beetle is visible on one cell and a lantern glows on another.
4. A hint line reads: **Use the arrow keys to find the lantern.**
5. Each arrow key press moves the beetle one cell, or nothing when the grid edge
   blocks it.
6. When the beetle reaches the lantern, the page shows the win: the board takes a
   `won` appearance, the lantern brightens, and the status line announces
   **You found the lantern.**

The page holds no rules. It asks the model where the beetle and lantern are and
draws that answer.

## 2. Layout, inputs, outputs, and states

### Layout

| Element | Role |
| --- | --- |
| `<main id="game">` | The whole game surface. |
| `<div id="board">` | The dark grid. Rendered with CSS Grid, one cell per grid position. |
| Beetle element | One element placed on the beetle's cell. |
| Lantern element | One element placed on the lantern's cell. |
| `<p id="status" aria-live="polite">` | The hint line, the win announcement, and the visible error state. |

Cells are dark with a faint edge. The beetle and the lantern are distinguished by
shape and glyph, not by colour alone. The lantern's mark carries a glow.

### Inputs

| Input | Handled | Rule |
| --- | --- | --- |
| `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` | yes | One model move per press. Browser key auto-repeat is allowed, so holding a key walks the beetle. |
| Any other key | yes | Ignored. The model is not called and the page does not scroll. |
| Mouse, touch, gamepad | no | Out of scope for this version, per [PROJECT.md](../../PROJECT.md). |

Arrow keys must not scroll the page: their default browser behaviour is
prevented. Listening happens on `document`, so the game works as soon as the page
is open, with no click to focus a canvas first.

### Outputs

- The beetle element's grid position tracks the model's beetle cell.
- The lantern element's grid position tracks the model's lantern cell.
- The status line text tracks the model's state: hint, win, or error.
- The board's classes track `won`.

### States

| State | Trigger | What the player sees |
| --- | --- | --- |
| `idle` (empty state) | Page loaded, no move yet | Dark grid, beetle, lantern, hint line. |
| `playing` | At least one accepted move, not won | Same, with the beetle elsewhere. |
| `won` | The beetle reached the lantern | Win announcement, board takes the `won` appearance, lantern brighter. |
| `error` | Setup refused, or the script did not load | A plain, readable message in the status line on the dark page. |

## 3. Errors, empty states, and permissions

**Empty state.** `idle` is expected and normal: a game waiting for its first key.
The hint line is what makes it legible instead of an unexplained dark rectangle.

**Error states.** Every failure is visible in the status line. A silent dark page
that swallows keys is a defect.

| Failure | Detection | Shown |
| --- | --- | --- |
| The model refuses the setup | The model reports one of the reasons in [specs/model/grid.spec.md](../model/grid.spec.md) | The reason in plain words, e.g. *The lantern and the beetle cannot share a cell.* |
| `logic.js` did not load, or threw while starting | The page finds no model API on `globalThis` | *The lantern failed to light.* |
| A required element is missing from the HTML | The page checks for the board, beetle, lantern, and status elements before starting | *The lantern failed to light.* |

After an error the page accepts no input and changes nothing. It does not retry
and does not pretend to play.

**Permissions.** None. No account, no consent prompt, no storage, no network
request, no analytics, per [PROJECT.md](../../PROJECT.md).

## 4. Cross-cutting architecture

The runtime is five files in `projects/lantern-beetle/`, loaded in this order,
plus two documents for whoever comes next:

| File | Purpose |
| --- | --- |
| `index.html` | The document: markup for the board, the two pieces, and the status line. |
| `styles.css` | The dark grid and the two pieces. |
| `logic.js` | The pure model from [specs/model/grid.spec.md](../model/grid.spec.md). |
| `play.js` | Wires keyboard input and the model to the DOM. Owns no rules. |
| `check.mjs` | The Node measurement of the model, defined in [specs/model/grid.spec.md](../model/grid.spec.md), section 4. |
| `README.md` | Setup, run, and measurement instructions for someone who did not take part in the build. |
| `AGENTS.md` | The start and measure commands, and the rule that an agent reruns the measurement after every change that can affect the workflow. |

Two constraints shape these choices, and both come from the brief in
[PROJECT.md](../../PROJECT.md):

1. **The page must open from the file system, with no server.** Browsers refuse
   to load ES modules over `file://`, so `logic.js` is written as a classic
   script: no `import` and no `export` syntax. It exposes its API on
   `globalThis`, which the page uses directly.
2. **Node must be able to drive the same logic.** `logic.js` also assigns to
   `module.exports` when that exists. Node treats it as CommonJS, and the check
   script imports it with no browser and no bundler in the way. This is what
   makes "no build step" compatible with "a script can prove the beetle can reach
   the lantern".

**Trade-off recorded — DOM rendering over canvas.** The board is DOM and CSS
Grid, not a canvas. The choice costs some drawing flexibility and buys
inspectability: each piece is a real element a person or a tool can see, screen
readers can reach it, and there is no drawing code to write or test at 8×8. If a
later version wants animation or a far larger board, canvas becomes the better
tool; that is a change for a later quest, not for this one.

## 5. Non-functional requirements

| Requirement | Target |
| --- | --- |
| First paint | The grid and both pieces are visible well under one second on a modern laptop, from `file://`. |
| Per-move cost | At most two element updates per move (the beetle's placement, and the status text when it changes). No rebuilding of the 64 cells. |
| Network | None after the page loads. No CDN, no fonts, no analytics. |
| Offline | Fully playable with the network off. |
| Browsers | Current Chrome, Safari, Firefox, and Edge. No polyfills and no transpiling. |
| Accessibility | Playable with the keyboard alone; focus stays visible; the status line is announced politely; the beetle and lantern differ by shape as well as colour; the lantern mark meets a 4.5:1 contrast ratio against its cell. |
| Motion | None in this version, so `prefers-reduced-motion` needs no special handling beyond keeping it that way. |
| Data | Nothing is stored, so there is nothing to migrate or clear. |

## 6. How this behavior is verified

**Scripted.** `node check.mjs` (see
[specs/model/grid.spec.md](../model/grid.spec.md), section 4) drives the model
directly: movement, blocked edges, the win, the win freeze, reachability by
search, and the setup errors. It cannot see the DOM, and this version does not
claim otherwise.

**Manual, for this version.** Each step is observable in a browser, and an agent
browser walked steps 1 to 6 while building this, with screenshots kept as
evidence:

1. Open `index.html` from the file system. The dark grid, the beetle, the
   lantern, and the hint line are visible, with no server running.
2. Press `ArrowRight` twice and `ArrowDown` once. The beetle has moved three
   cells.
3. Press `ArrowUp` until the beetle sits on the top row, then press `ArrowUp`
   once more. Nothing moves, nothing breaks, no message appears.
4. Press a letter key. Nothing happens and the page does not scroll.
5. Walk the beetle to the lantern. The win is announced, the board changes, and
   further arrow keys change nothing.
6. Rename `logic.js` and reload. The page shows *The lantern failed to light.*
   rather than a silent dark rectangle. Rename the file back.

Automating steps 1 to 6 in a browser is deferred to a later quest; the model,
where the rules live, is covered by the script today.

## 7. Related specifications and journeys

- Model behind this page: [specs/model/grid.spec.md](../model/grid.spec.md)
- Journey this page serves: [specs/journeys/reach-the-lantern.md](../journeys/reach-the-lantern.md)
- Index: [SPEC.md](../../SPEC.md)
- Product brief: [PROJECT.md](../../PROJECT.md)
