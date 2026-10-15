---
task_id: quickstart-02
title: "Quickstart 02: Define the specification"
path: quickstart
depends_on:
  - quickstart-01
---

# Define the specification

## Goal

Convert the product brief into a specification detailed enough for an agent to
implement without guessing at product behavior.

## Instructions

Read `projects/<project-name>/PROJECT.md` and create `SPEC.md` in that same
directory. This task continues that project. Do not create another folder.
Resolve ambiguous behavior with the
learner before selecting an implementation.

Include:

1. user stories
2. the happy-path flow
3. important edge cases and error states
4. functional requirements
5. non-functional requirements
6. a proposed technical approach
7. testable acceptance criteria

Prefer the simplest technical approach that satisfies the brief. Record major
trade-offs instead of presenting a choice as universally correct.

## Deliverables

- `projects/<project-name>/SPEC.md`: The product and technical specification.

## Acceptance criteria

- [ ] Every in-scope behavior from `PROJECT.md` appears in `SPEC.md`.
- [ ] The main workflow has explicit inputs, actions, and expected outputs.
- [ ] Error and empty states are defined.
- [ ] The technical approach names the runtime, main dependencies, and data
      storage strategy.
- [ ] Acceptance criteria are observable and testable.
- [ ] No out-of-scope feature from `PROJECT.md` has silently moved into scope.

## Completion record

Comment on the GitHub issue with the chosen technical approach and one
important trade-off.
