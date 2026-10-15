---
task_id: quickstart-03
title: "Quickstart 03: Build the application"
path: quickstart
depends_on:
  - quickstart-02
---

# Build the application

Greetings, adventurer. This quest is to raise the workshop and prove it stands.

## Goal

Implement, test, and document the application described by the complete linked
specification rooted at `projects/<project-name>/SPEC.md`, and leave the agent
a measurement it can run itself. Keep every project file inside that directory.

## Instructions

Before writing code, start at `SPEC.md` and follow every link. Read every
detailed `*.spec.md` and user-journey file. Treat that linked set as the
application contract.

Do not begin development while an in-scope part of `PROJECT.md` is absent,
ambiguous, or disconnected from the map. Complete the specification first.

Ask the agent to map the linked specs and journeys into a short implementation
sequence. Build in small, verifiable increments and run relevant checks after
each increment. If development exposes a missing decision, update the relevant
spec file and its links before implementing it.

The finished application must include setup and run instructions for someone
who did not participate in the build.

### Give the agent a feedback loop

A passing test suite is not enough. The agent must be able to start the
application and measure the primary workflow from the outside. Choose the
measurement that fits the product:

- `curl` for an HTTP interface
- Playwright CLI for a browser flow
- an agent browser for the same kind of flow
- a small tool the agent writes for this app when none of those can observe the
  workflow

The measurement must fail when the primary workflow is broken and pass when it
works. Show both: one run that exits non-zero because the journey is broken,
then the real journey exiting 0. A command that can only pass does not count.
Use this loop: run the app, measure, change, measure again. Read the command
output. A screenshot or a learner saying "it works" is not the measurement.

Also run the type checker, linter, formatter, and tests named in `PROJECT.md`
when that brief lists them. Those checks catch the companion's mistakes early.
They do not replace the measurement of the workflow.

Keep the agent on that loop until the measurement passes. Teach it in both of
these ways:

1. Use `/goal` with an objective that names the behavior to prove and the exact
   command that proves it. `/goal` has no time limit. It continues until that
   measurement passes.
2. Write the same loop into `projects/<project-name>/AGENTS.md`: how to start the app, the
   measurement command, and the rule that the agent reruns that command after
   every change that can affect the workflow.

The agent may install Playwright CLI or an agent browser, or vibecode the
helper tool. The helper must check real application behavior, not only that a
process started or a file exists.

### Show the working application

Commit a playable video of the primary workflow and screenshots of the app in
the workshop, and show them in the quest petition. The video is the proof it
works. The screenshots make the result easy to glance at. Use URLs that open
on GitHub. A path on the adventurer's machine does not count.

## Deliverables

- Application source code in `projects/<project-name>/`.
- Automated tests for the primary workflow and important edge cases.
- Setup, run, test, and measurement instructions in `projects/<project-name>/README.md`.
- `projects/<project-name>/AGENTS.md` with the start, measure, and rerun instructions.
- Any justified updates to the linked specification files.
- A playable video and screenshots of the primary workflow in the quest
  petition.

## Acceptance criteria

- [ ] The app implements the complete linked specification rooted at `SPEC.md`;
      an agent proved a main journey with a measurement that passes for the
      working journey and fails when that journey is broken.
- [ ] `README.md` and `AGENTS.md` in that directory tell an agent how to repeat that measurement.
- [ ] The quest petition contains a playable video of the primary workflow and screenshots of the app.

## Completion record

Comment on the GitHub issue with a summary, the pull request URL, the `/goal`
objective, the measurement command, its result, the other validation commands
and their results, and any remaining limitations.
