# Agent Instructions

This repository teaches people to work with coding agents. Favor guidance and
small, explainable changes over doing hidden work for the learner.

## Source of truth

- `paths/` contains the curriculum.
- Each task Markdown file defines its own deliverables and acceptance criteria.
- `.agents/skills/` contains the workflows used to start the journey, start a
  task, complete a task, and ask `mentor` where the learner is.
- `.agents/references/` contains shared logic the skills read.
- `start-journey` is the entry skill. Follow it before starting a task.
- `progress/<github-login>/<path>.md` tracks that learner's status for one path.
- `projects/<project-name>/` holds one project. A route may start a new
  project or polish an existing one. A polishing route stays in the existing
  folder. Do not put project files in the repository root.
- The Quickstart path is required before any specialized path.

## Harness layout

This repository targets any coding agent, so instructions and skills live in the
shared locations rather than one vendor's directory.

- `AGENTS.md` is the only instruction file. Edit this file, never a symlink to
  it.
- `CLAUDE.md` is a symlink to `AGENTS.md`. Some agents refuse to write through a
  symlink, so apply every edit to `AGENTS.md`.
- `.agents/skills/<name>/SKILL.md` holds each skill. Codex, Cursor, OpenCode,
  and Antigravity read this path directly.
- `.claude/skills` is a symlink to `../.agents/skills`, because Claude Code only
  scans `.claude/skills`.
- Do not copy a skill into a harness-specific directory. Add a symlink instead,
  so every harness loads one source of truth.

Skill frontmatter uses the Agent Skills fields `name`, `description`, and
`compatibility`. `name` must match its directory. Keep harness-specific
behavior in `disable-model-invocation` and `metadata`, not in new top-level
fields.

Learners invoke a skill as `/start-journey`, `/start-task`, `/complete`, or
`/mentor` where slash commands exist, and by name elsewhere. Refer to skills by
name so the instructions hold in either case. Do not name the orientation skill
`/help`.

## Working on a task

1. Select the task from `progress/<github-login>/*.md`, the current route, and
   issues assigned to the learner. Read `.agents/references/current-task.md`. Do
   not ask the learner to name a task file.
2. Read the entire selected task file.
3. Work on `<github-login>/main`, never on the repository `main`. Pull
   requests target `<github-login>/main`.
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
- Do not push the repository `main` or force-push `<github-login>/main`.
- Do not create `<github-login>/main` until the learner has approved the exact
  commands. That approval belongs to `start-journey`.
- Prefer portable commands and document any required setup.
- Do not assume a specific agent, editor, or model. Name the tool only when the
  task requires it.

## Content conventions

New task files must include:

- YAML frontmatter with `task_id`, `title`, `path`, and `depends_on`
- a goal
- learner-facing instructions
- concrete deliverables
- verifiable acceptance criteria
- a completion record

Use `paths/_templates/task.md` as the starting point.

A path starts a new `projects/<project-name>/` or polishes a project that
already exists. Say which in the path README. A polishing path must name the
existing project and must not create a second folder for the same product.
