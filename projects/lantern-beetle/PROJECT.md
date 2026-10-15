# Lantern Beetle — product brief

Decided in counsel with the oracle before any code was written, as the first
quest of the Quickstart road. The adventurer made the product and stack
decisions; the oracle questioned them.

## 1. Working product name

**Lantern Beetle** — a one-page browser game. The folder is
`projects/lantern-beetle/`.

## 2. Target user

A single player at a keyboard on a desktop browser. The first user is the
adventurer who forges it; the second is anyone the folder is handed to, who opens
one file and plays without installing anything.

## 3. Problem it solves

It offers a small, complete moment of play: you are in the dark, and there is one
light to find. It also answers a builder's question — can the smallest possible
game be finished and checked by a machine, instead of growing until it is
abandoned?

## 4. Primary user workflow

1. Open the game's HTML file in a browser. No server, no install.
2. A dark grid fills the page. A beetle stands on it, and a lantern glows
   somewhere in the dark.
3. Press the arrow keys to move the beetle across the grid.
4. When the beetle reaches the lantern, the player wins.

One beetle, one lantern, one win.

## 5. Deliberately excluded from the first version

- Enemies, score, and story — set aside by the oracle.
- Multiple levels, a timer, sound, saved progress, accounts, and any backend.
- Touch controls for phones; this quest names arrow keys, so the keyboard is the
  only input for now.
- No framework and no build step — see the stack below.

## 6. Tech stack

HTML, CSS, and JavaScript in one folder. No framework, no packages, no build
step. Nothing is compiled, bundled, or installed.

## 7. Reason for that stack

The oracle gave two reasons, and both hold for this version:

1. **The page is static**, so any browser can open it — no server, no pipeline,
   no incantations. The game starts by opening a file.
2. **The logic is checkable.** A small Node script can drive the game logic and
   fail loudly when the beetle cannot reach the lantern. Failed checks mean the
   dark wins; green checks mean the road is clear.

## 8. Web AI used

The oracle session — `Oracle Transcript — Lantern Beetle`, rendered to
`oracle-conversation.png` in this folder and linked from the quest petition. The
counsel followed Profusion's default oracle, Gemini PRO on the web; the
transcript names no other tool.
