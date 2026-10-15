# Lantern Beetle — specification index

The map of the realm for the first version of **Lantern Beetle**. This file is an
index only. Every detailed contract lives in a linked file below, so no single
document grows into a monolith.

The product and the stack are fixed by [PROJECT.md](PROJECT.md): a one-page
browser game in HTML, CSS, and JavaScript, with no framework and no build step.
This specification describes that game and nothing larger. The game code arrives
in the next quest; this quest decides the contracts.

## The specification

| File | What it covers |
| --- | --- |
| [specs/model/grid.spec.md](specs/model/grid.spec.md) | The dark grid, the beetle, the lantern, the movement rules, the win condition, and the pure logic module that Node can drive |
| [specs/pages/play.spec.md](specs/pages/play.spec.md) | The play page: layout, rendering, keyboard input, win presentation, empty and error states, runtime architecture, and non-functional requirements |
| [specs/journeys/reach-the-lantern.md](specs/journeys/reach-the-lantern.md) | The player's journey from opening the page to winning, including the failure paths |

## How the parts relate

- The **model** decides. It owns the grid, the beetle, the lantern, and whether
  the player has won. It touches no DOM and no browser API.
- The **page** shows and listens. It renders whatever the model reports and turns
  arrow-key presses into model moves.
- The **journey** narrates. It walks the player through the page and the model
  together, so the two can be read as one experience.
- **Verification** is anchored in the model, because a Node script can drive it
  without a browser. [specs/model/grid.spec.md](specs/model/grid.spec.md) defines
  the checks; [specs/pages/play.spec.md](specs/pages/play.spec.md) states plainly
  which slices remain a manual check in this version.

## Scope

In scope: the dark grid, the beetle, the lantern, arrow-key movement, the win,
the empty and error states, and the Node verification of reachability.

Out of scope, per [PROJECT.md](PROJECT.md): enemies, score, story, multiple
levels, a timer, sound, saved progress, accounts, a backend, touch controls, and
any framework or build step.

## Status

Specification only. No game code exists in this quest, and none is described here
beyond the contracts a builder needs: file layout, module boundary, rules,
states, and the checks that must pass.
