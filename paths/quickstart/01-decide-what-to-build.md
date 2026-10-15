---
task_id: quickstart-01
title: "Quickstart 01: Decide what to build"
path: quickstart
depends_on: []
---

# Decide what to build

Greetings, adventurer. This quest asks you to choose what you will forge.

## Goal

Choose any project and any tech stack by discussing them with an oracle on the
web, then record the decision in `PROJECT.md`.

## Instructions

Have the conversation in a web AI, not only with the coding agent in this
repository. Profusion provides paid Gemini PRO on the web. Use that as the
default: open [Gemini](https://gemini.google.com) on the PRO plan. Another web
AI is allowed when the learner has a reason to use it.

If the learner is out of ideas, tell them to prompt that AI for project ideas.
Then discuss the chosen idea until these decisions are explicit:

1. what will be built
2. the tech stack
3. the reason for that tech stack

> TIP: Ask the oracle for a stack that gives your companion a fast feedback
> loop: a type checker, a strict linter, a formatter, and tests that run from
> one command. When the AI's mistakes fail loudly and early, you can trust its
> work more. For example, ask: "Which stack for this idea gives the strongest
> automatic checks, such as static types and linters, so an AI coding agent can
> catch its own mistakes?"

The adventurer may build anything they want. A game, an interactive art
experience, a social network, or something that fits none of those names are
all welcome. Any tech stack is acceptable. Keep the first version small enough
to finish on this path.

Choose a `<project-name>`: lowercase letters, numbers, and hyphens, taken from
the product name. Create `projects/<project-name>/`. This route starts a new
project. A later route may polish this same folder instead of creating another
one. Do not put project files in the repository root.

Create `projects/<project-name>/PROJECT.md` with:

1. the working product name
2. the target user
3. the problem it solves
4. the primary user workflow
5. what is deliberately excluded from the first version
6. the tech stack
7. the reason for that tech stack, including the automatic checks it gives the companion when the tip above was followed
8. which web AI was used

Commit screenshots of the web AI conversation in the workshop and show them in
the quest petition. They must show the discussion of what to build and why
that tech stack was chosen. Use a URL that renders the picture on GitHub. A
path on the adventurer's machine does not count.

The learner makes the product and stack decisions. The web AI and the coding
agent can question those decisions, not replace them.

## Deliverables

- `projects/<project-name>/PROJECT.md`: The product brief, tech stack, and the reason for that stack.
- Screenshots of the web AI conversation in the quest petition.

## Acceptance criteria

- [ ] `projects/<project-name>/PROJECT.md` states the product, the tech stack, and why that stack was chosen.
- [ ] The quest petition shows screenshots of the web AI conversation about that decision.

## Completion record

Comment on the GitHub issue with the chosen idea, the tech stack, the reason
for that stack, and the pull request URL.
