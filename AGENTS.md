# Agent Instructions

This repository teaches people to work with coding agents. Favor guidance and
small, explainable changes over doing hidden work for the learner.

## Source of truth

- `paths/` contains the curriculum.
- Each task Markdown file defines its own deliverables and acceptance criteria.
- `.cursor/skills/` contains the workflows used to start the journey, start a task, and complete a task.
- `/start-journey` is the entry skill. Follow it before starting a task.
- `progress/<github-login>/<path>.md` tracks that learner's status for one path.
- The Quickstart path is required before any specialized path.

## Working on a task

1. Select the task from `progress/<github-login>/*.md`, the current route, and
   issues assigned to the learner. Read `.cursor/skills/current-task.md`. Do
   not ask the learner to name a task file.
2. Read the entire selected task file.
3. Work on `learners/<github-login>`, never on `main`.
4. Check the path progress file and the task's `depends_on` entries before
   changing files.
5. Confirm the learner has their own GitHub issue for its `task_id`; use the
   `start-task` skill when one does not exist.
6. Keep changes within the task's scope.
7. Explain important choices in plain language.
8. Run checks appropriate to the generated technology.
9. When a task requires a running application, prove it with the task's
   measurement command. Rerun that command after changes that can affect the
   workflow.
10. Use the `complete` skill only after all acceptance criteria pass.

## Guardrails

- Do not invent requirements that conflict with the learner's product idea.
- Ask a focused question when a product decision materially changes the result.
- Never commit credentials, tokens, or local environment files.
- Do not close a task issue when validation fails.
- Do not mark a task `completed` in the progress file when validation fails.
- Do not skip prerequisite tasks.
- Do not push `main` or force-push a learner branch.
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
