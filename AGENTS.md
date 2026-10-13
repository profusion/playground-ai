# Agent Instructions

This repository teaches people to work with coding agents. Favor guidance and
small, explainable changes over doing hidden work for the learner.

## Source of truth

- `paths/` contains the curriculum.
- Each task Markdown file defines its own deliverables and acceptance criteria.
- `.cursor/skills/` contains the workflows used to start and complete tasks.
- The Quickstart path is required before any specialized path.

## Working on a task

1. Read the entire task file.
2. Check its `depends_on` entries before changing files.
3. Confirm there is a GitHub issue for its `task_id`; use the `start-task`
   skill when one does not exist.
4. Keep changes within the task's scope.
5. Explain important choices in plain language.
6. Run checks appropriate to the generated technology.
7. Use the `complete` skill only after all acceptance criteria pass.

## Guardrails

- Do not invent requirements that conflict with the learner's product idea.
- Ask a focused question when a product decision materially changes the result.
- Never commit credentials, tokens, or local environment files.
- Do not close a task issue when validation fails.
- Do not skip prerequisite tasks.
- Prefer portable commands and document any required setup.

## Content conventions

New task files must include:

- YAML frontmatter with `task_id`, `title`, `path`, and `depends_on`
- a goal
- learner-facing instructions
- concrete deliverables
- verifiable acceptance criteria
- a completion record

Use `paths/_templates/task.md` as the starting point.
