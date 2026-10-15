# DEMO.md — Lantern Beetle

The demo for quickstart-05: the product idea, who it is for, the one workflow it
shows, and the narration the adventurer speaks while using the app. A client
should understand the product after reading or hearing this.

## The product idea, in plain language

Lantern Beetle is a small game that lives in one folder on your machine. You open
a single page and you are in the dark: a grid of black cells, one beetle, and one
lantern glowing somewhere out there. You move the beetle with the arrow keys. When
it reaches the lantern, you win.

There is no account, no install, no build step, no server, and no network call.
You double-click a file and play. That is the whole product.

## Who it is for, and the problem it solves

**The user:** one player at a keyboard on a desktop browser. First the adventurer
who forged it, then anyone the folder is handed to.

**The problem:** most small game ideas die of their own ambition — a framework, a
dependency tree, and a build pipeline arrive before the game does. Lantern Beetle
takes the other road. It is deliberately the smallest complete game: one beetle,
one lantern, one win. It gives the player a finished moment of play, and it gives
the builder two things that are harder than they sound — something small enough to
actually finish, and something a machine can check.

## The one workflow this demo shows

**Open the page → find the lantern with the arrow keys → win → press `R` → win
again.**

Everything else in the product serves that path: the dark grid, the glow, the
silent edges, the win state, and the restart.

## The improvement this demo shows

The build quest left a dead end: after the win the application was over, and the
only way to play again was to reload the browser page. quickstart-04 fixed it.

- **Before:** the won page offered nothing; arrows, `R`, `Enter`, and `Space` all
  did nothing.
- **After:** the status line reads *You found the lantern. Press R to play again.*
  and `R` returns to the start of a fresh run on the same page — no reload.
  `node check.mjs` gained a ninth check for exactly this.

## The narration script

Spoken by the adventurer, while using the app. Roughly two minutes. The bracketed
line is what is on screen; the rest is what you say.

**[The page just opened: dark grid, beetle top-left, lantern glowing]**

> Every abandoned project starts the same way: too big to finish. This one starts
> the other way. This is Lantern Beetle — a whole game in a single page, and
> nothing to install. A dark grid, one beetle, and one lantern somewhere out
> there in the dark.

**[Press `ArrowRight`, `ArrowRight`, `ArrowDown`]**

> Each arrow key moves the beetle one cell. It cannot walk off the grid: press
> into the edge and nothing happens, quietly. There is no wall to argue with and
> no message to nag you.

**[Press `ArrowUp` twice at the top row: the first press reaches the top row, the
second is blocked and nothing moves]**

> That is what a blocked move looks like. Silent, and harmless.

**[Walk the beetle to the lantern: `ArrowDown` until row 5, then `ArrowRight` until
column 6]**

> The only guidance is the glow. So I walk toward it. The lantern does not move,
> and the grid does not change — the whole game is one decision, repeated: which
> way is the light.

**[The win: the board warms, the lantern brightens, the status line changes]**

> And that is the win. The board warms, the lantern brightens, and the page says I
> found it.

**[Pause on the won board, then press `R`]**

> Here is the part that was missing until this week. This board used to be a dead
> end — the game was over, and the only way to play again was to reload the
> browser. That is browser chrome, not a product. Watch: I press `R`, and I am
> back at the start. Same page. No reload.

**[The board is back at its start: beetle top-left, hint line restored]**

> Fresh board, same page.

**[Win a second time]**

> And it plays again. That is the whole product: a complete little game with no
> dead ends.

**[In the terminal: `node projects/lantern-beetle/check.mjs`]**

> One more thing, and this is the part a client should ask about: how do you know
> it still works? One command. Nine checks, driving the real game rules with no
> browser at all. If the beetle cannot reach the lantern, it fails loudly and says
> why. Green means the road is clear — and there is a second mode that proves the
> check can fail, so the green is worth something.

## Opening line

> Every abandoned project starts the same way: too big to finish. Lantern Beetle
> is the opposite — a complete game small enough to finish in an evening, and
> simple enough that one command proves it still works.

## Closing line

> You have just seen the whole product: open the page, walk the beetle to the
> lantern with the arrow keys, win, press `R`, and play again — and one command
> that keeps it honest.

## Recording status

**No video was recorded in this run.** No screen recorder is available in this
environment, so the narration above exists as a script, not as a recording, and
nothing here claims otherwise. The outline and this script are shown in this
quest's petition. On a machine with a recorder, the script is ready to read
straight through: the bracketed beats are the whole demo.

## Slack posting

`#dev-ai` is unreachable from this run, so the demo was **not** posted there and
**no Slack message link exists**. No link is invented to fill the gap.

```text
TESTING-MODE: Slack waived
```

The message that would be posted, once the channel is reachable:

> Lantern Beetle — a complete little browser game in one page. You open a file, a
> beetle stands in a dark grid, and you walk it to the lantern with the arrow
> keys. No install, no build step, no server. After the win, `R` starts a fresh
> run on the same page. One command proves it still works.

## Reproducing the demo

From the repository root:

```bash
open projects/lantern-beetle/index.html          # start the page (macOS)
node projects/lantern-beetle/check.mjs           # the measurement: 9 ok, exit 0
node projects/lantern-beetle/check.mjs --blocked # deliberate failure: exit 1
```
