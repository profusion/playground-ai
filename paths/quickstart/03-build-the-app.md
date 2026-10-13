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
`SPEC.md`.

## Instructions

Ask the agent to propose a short implementation sequence based on `SPEC.md`.
Build in small, verifiable increments and run relevant checks after each
increment.

Do not expand the product scope while building. If the specification is
missing a necessary decision, update `SPEC.md` and record why.

The finished application must include setup and run instructions for someone
who did not participate in the build.

## Deliverables

- Application source code in `app/`.
- Automated tests for the primary workflow and important edge cases.
- Setup, run, and test instructions in `app/README.md`.
- Any justified specification updates in `SPEC.md`.

## Acceptance criteria

- [ ] The application implements every in-scope requirement in `SPEC.md`.
- [ ] A new contributor can install and run it by following `app/README.md`.
- [ ] The primary workflow works end to end.
- [ ] Automated tests cover the primary workflow and key failure states.
- [ ] Formatting, linting, type checking, and tests pass when supported by the
      chosen stack.
- [ ] No credentials or generated local secrets are committed.

## Completion record

Comment on the GitHub issue with a summary, the commands used for validation,
their results, and any remaining limitations.
