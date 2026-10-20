---
task_id: quickstart-02
title: "Quickstart 02: Define the specification"
path: quickstart
depends_on:
  - quickstart-01
---

# Define the specification

Greetings, adventurer. This quest turns your brief into a plan your companion
can follow without guessing. From this quest onward, rely on your companion.

## Goal

Specify the entire application as a linked set of small Markdown files before
development begins. The companion writes those files with you.

## Your companion

The companion is the coding agent in this repository. Ask it to draft
`SPEC.md`, the detailed specs, and the user journeys from
`projects/<project-name>/PROJECT.md`. That brief is the basis for this quest.
You decide what is true. The companion may question a decision. The decision
stays yours.

Any companion that can read this repository can take up the work. These are
suggestions:

- **Cursor.** Profusion provides Cursor for some people.
- **Claude.** The most popular companion.
- **Codex.** The alternative.
- **OpenCode.** The cheapest plan, with many free models.

## Instructions

Read `projects/<project-name>/PROJECT.md` and reuse it as the basis for every
file in this quest. The product, the user, the workflow, the exclusions, and
the tech stack in that brief are the scope. In that same directory, create
`SPEC.md` as the map of the realm. It links to every detailed specification
and user journey. Do not turn it into one giant specification.

Choose one structure:

- **Isolated:** keep detailed files under `specs/`, such as
  `specs/pages/home.spec.md`, `specs/auth/login.spec.md`, and
  `specs/journeys/first-visit.md`.
- **Colocated:** mirror the intended code structure, such as
  `pages/home.spec.md` beside the future `pages/home.tsx`.

Use multiple files. Give each feature, page, service, data model, or substantial
behavior its own `*.spec.md` when that makes the contract easier to navigate.
Give each important user journey its own Markdown file.

Every detailed spec includes:

1. purpose and user-visible behavior
2. inputs, outputs, rules, and important states
3. errors, empty states, and permissions
4. how the behavior can be verified, naming a command the companion can run when the stack provides one
5. links to related specs and user journeys

Every journey names the user, goal, starting point, actions, expected result,
failure paths, and links to the specs that implement it.

Follow every link from `SPEC.md` before finishing. The linked files should
cover the complete in-scope application from `PROJECT.md`, including
cross-cutting architecture, data, and non-functional requirements. Resolve
ambiguity with the adventurer now, before development.

Use the tech stack and the reasons already written in `PROJECT.md`. Do not
replace that stack. Prefer the simplest approach that satisfies the brief
inside it. Record major trade-offs instead of presenting a choice as
universally correct.

## Deliverables

- `projects/<project-name>/SPEC.md`: The index linking the complete specification.
- Multiple linked `*.spec.md` files and user-journey files, isolated under
  `specs/` or colocated with the intended code structure.

## Acceptance criteria

- [ ] `SPEC.md` links to multiple small specifications and journeys that cover
      the complete in-scope app from `PROJECT.md`.
- [ ] The linked files describe buildable behavior, verification, and their
      relationships without broken links.

## Completion record

Comment on the GitHub issue with the chosen technical approach and one
important trade-off.
