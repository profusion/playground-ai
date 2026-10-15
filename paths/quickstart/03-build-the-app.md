---
task_id: quickstart-03
title: "Quickstart 03: Build the application"
path: quickstart
depends_on:
  - quickstart-02
---

# Build the application

## Goal

Implement, test, and document the application described by `PROJECT.md` and
`SPEC.md`, and leave the agent a measurement it can run itself.

## Instructions

Ask the agent to propose a short implementation sequence based on `SPEC.md`.
Build in small, verifiable increments and run relevant checks after each
increment.

Do not expand the product scope while building. If the specification is
missing a necessary decision, update `SPEC.md` and record why.

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
works. Use this loop: run the app, measure, change, measure again. Read the
command output. A screenshot or a learner saying "it works" is not the
measurement.

Keep the agent on that loop until the measurement passes. Teach it in both of
these ways:

1. Use `/goal` with an objective that names the behavior to prove and the exact
   command that proves it. `/goal` has no time limit. It continues until that
   measurement passes.
2. Write the same loop into `app/AGENTS.md`: how to start the app, the
   measurement command, and the rule that the agent reruns that command after
   every change that can affect the workflow.

The agent may install Playwright CLI or an agent browser, or vibecode the
helper tool. The helper must check real application behavior, not only that a
process started or a file exists.

### Show the working application

Open a pull request from `learners/<github-login>` into `main`. Record a video
of the primary workflow working and put that video in the pull request
description. A screenshot or a link the reviewer cannot play does not count.

## Deliverables

- Application source code in `app/`.
- Automated tests for the primary workflow and important edge cases.
- Setup, run, test, and measurement instructions in `app/README.md`.
- `app/AGENTS.md` with the start, measure, and rerun instructions.
- Any justified specification updates in `SPEC.md`.
- A pull request into `main` whose description contains a video of the primary
  workflow.

## Acceptance criteria

- [ ] The application implements every in-scope requirement in `SPEC.md`.
- [ ] A new contributor can install and run it by following `app/README.md`.
- [ ] The primary workflow works end to end.
- [ ] Automated tests cover the primary workflow and key failure states.
- [ ] The agent ran `curl`, Playwright CLI, an agent browser, or a purpose-built
      tool against the running application.
- [ ] That measurement checks the primary workflow and its saved output shows
      the pass result.
- [ ] `app/README.md` gives the exact command to repeat the measurement.
- [ ] `app/AGENTS.md` tells an agent how to start the app, measure it, and rerun
      the measurement after each relevant change.
- [ ] The completion record quotes the `/goal` objective, including the behavior
      to prove and the measurement command.
- [ ] Formatting, linting, type checking, and tests pass when supported by the
      chosen stack.
- [ ] No credentials or generated local secrets are committed.
- [ ] A pull request from `learners/<github-login>` into `main` is open.
- [ ] The pull request description contains a playable video of the primary
      workflow working.

## Completion record

Comment on the GitHub issue with a summary, the pull request URL, the `/goal`
objective, the measurement command, its result, the other validation commands
and their results, and any remaining limitations.
