# Truco Game

## Target user

This project is for me. I want to explore how to implement a game with AI
assistance, rather than launch a product for a broader audience.

## Problem

I need a small, playable project through which I can learn how to direct an AI
coding agent and check the correctness of what it builds.

## Primary user workflow

One player creates a room and shares its code with a friend. The friend joins
the room, and the two players play a 1v1 game of Truco Mineiro in their browsers.
The detailed game rules will be recorded in the specification.

## Outside the first version

- Bots.
- Accounts.
- Matchmaking.
- Chat.
- Persistent matches.
- 2v2 play.

## Tech stack

- Frontend: React and TypeScript, using Vite.
- Backend: Python with FastAPI and Pydantic.
- Communication: WebSockets for game actions and state updates.
- State: the server holds authoritative room and game state in memory.
  It validates player actions with Pydantic and broadcasts a filtered game-state
  view to each client. The frontend renders that view.

## Why this stack

I initially considered JavaScript with Flask. After discussing the project with
Gemini PRO on the web, I chose React/TypeScript and FastAPI instead.

FastAPI uses Pydantic to define explicit payload models. I agree with the
oracle's recommendation that this makes mismatched data shapes fail early,
rather than letting an AI-generated client and server silently disagree.
FastAPI's HTTP request validation can return a 422 response for invalid payloads;
WebSocket actions need explicit validation and error responses, rather than
relying on that HTTP behavior.

TypeScript checks frontend types, while MyPy checks backend types. The oracle
recommended strict automatic checks so the coding agent can find its own
mistakes quickly:

- Backend: Ruff for linting and formatting, MyPy in strict mode, and Pytest.
- Frontend: TypeScript (`tsc --noEmit`), ESLint with type-aware checks,
  Prettier, and Vitest.
- A project-level Makefile will provide `make check-backend` and
  `make check-frontend` to run the respective checks.

Authoritative server state keeps the game rules in one place. Filtered views
let each player receive only the state they should see. WebSockets carry
actions and updates during a live two-player game. In-memory rooms keep the
first version small and match the decision not to persist matches.

## Web AI used

Gemini PRO on the web, at <https://gemini.google.com>.

Conversation screenshots:

- [Project structure](evidence/gemini-project-structure.png).
- [Stack and architecture](evidence/gemini-stack-and-architecture.png).
- [Automatic checks and feedback loop](evidence/gemini-checks.png).
