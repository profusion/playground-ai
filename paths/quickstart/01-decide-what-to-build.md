---
task_id: quickstart-01
title: "Quickstart 01: Decide what to build"
path: quickstart
depends_on: []
---

# Decide what to build

## Goal

Turn an initial idea into a small product brief that can be completed during
this playground.

## Instructions

Work with your agent to explore a few ideas, then choose one. Keep the first
version small: one target user, one core problem, and one primary workflow.

Choose a `<project-name>`: lowercase letters, numbers, and hyphens, taken from
the product name. Create `projects/<project-name>/`. This route starts a new
project. A later route may polish this same folder instead of creating another
one. Do not put project files in the repository root.

Create `projects/<project-name>/PROJECT.md`. Describe:

1. the working product name
2. the target user
3. the problem it solves
4. the primary user workflow
5. what is deliberately excluded from the first version

The agent should ask questions and surface trade-offs, but the learner makes
the product decisions.

## Deliverables

- `projects/<project-name>/PROJECT.md`: A concise product brief.

## Acceptance criteria

- [ ] The brief lives at `projects/<project-name>/PROJECT.md`.
- [ ] `<project-name>` is lowercase letters, numbers, and hyphens.
- [ ] `PROJECT.md` names one target user.
- [ ] It states one clear problem in plain language.
- [ ] It describes one end-to-end primary workflow.
- [ ] It lists at least three out-of-scope features.
- [ ] The proposed first version is small enough to build in one learning
      session.

## Completion record

Comment on the GitHub issue with the chosen idea and the most important scope
decision.
