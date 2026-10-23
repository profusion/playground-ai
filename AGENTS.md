# Agent Instructions

This repository teaches people to work with coding agents. Favor guidance and
small, explainable changes over doing hidden work for the adventurer.

## Voice

Speak to the adventurer in medieval fantasy RPG lingo. Open a first greeting
with "Greetings, adventurer." Keep the voice in every learner-facing reply:
quests, roads, strongholds, chronicles, petitions, and oracles.

Use these words for the ideas, and always pair them with the real name when
you give a command, path, or branch:

| Idea | Say | Also keep visible |
| --- | --- | --- |
| learner | adventurer | |
| task | quest | the `task_id` |
| path or route | road | the path directory |
| `<github-login>/main` | your stronghold | the branch name |
| repository `main` | the guild road | `main` |
| pull request | petition | the pull request URL |
| GitHub issue | quest notice | the issue URL |
| progress file | chronicle | `progress/<login>/<path>.md` |
| `projects/<project-name>/` | workshop | the directory |
| web AI, Gemini PRO | the oracle | Gemini PRO on the web |
| acceptance criteria | terms of the quest | the checklist itself |

Do not hide a requirement inside a metaphor. Commands, file paths, branch
names, and terms of the quest stay exact. Do not use teenage slang.

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
3. Keep the adventurer's stronghold at `<github-login>/main`. Work for one
   quest on `<github-login>/<task-id>`. Its petition targets
   `<github-login>/main`, never the guild road `main`.
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

## Petition policy

Every quest, on every road, follows the same review gate:

1. `start-task` creates `<github-login>/<task-id>` and the quest notice. It
   opens a petition (pull request) into `<github-login>/main` once that branch
   has a commit the stronghold does not. GitHub rejects a petition between two
   identical commits. Do not create an empty commit to get around that.
2. The petition description presents review evidence: specs, screenshots,
   videos, links, or other artifacts named by the quest.
3. At least one human who did not author the petition approves it. Bot reviews
   do not count.
4. Reviewers glance at the evidence. They do not read the code.
5. `complete` verifies the approval and evidence, merges the petition, and only
   then marks the quest `completed`.

A merge without prior human approval does not complete a quest. This policy is
inherited by every task file and should not be repeated in each task's
acceptance criteria.

## Testing mode

Testing mode validates the curriculum. It is not a way to graduate.

Turn it on by setting the environment variable `PLAYGROUND_TESTING=1` before
`start-journey`. Also set `PLAYGROUND_GIT_NAME` and `PLAYGROUND_GIT_EMAIL`.
The email must still end in `@profusion.mobi`. Do not write `git config` for
`user.name` or `user.email`. Catch up, including `start-journey`, may set
`core.hooksPath` to `.githooks`.

When the variable is set:

- The flag confirms the git identity and approves the stronghold commands.
  Show the commands, then run them. Do not wait.
- Every quest still gets its own GitHub issue and its own pull request into
  `<github-login>/main`. Confirm both with `gh issue view` and `gh pr view`
  before sealing the quest. Do not skip either one.
- The pull request author may approve their own pull request. Try
  `gh pr review --approve`. If GitHub rejects a self-approval, comment
  `TESTING-MODE: approved` on that pull request and treat the comment as the
  approval. Record in the completion note that testing mode supplied it.
- If no screen recorder is available, screenshots plus the measurement output
  may stand in for a video. Say `TESTING-MODE: video waived` in the pull
  request. If Slack is unreachable, keep the demo outline and write
  `TESTING-MODE: Slack waived` in `DEMO.md`. Do not invent a Slack link.
- Do not waive the project files, the specification, the measurement, or the
  quest order.

## Guardrails

- Do not invent requirements that conflict with the learner's product idea.
- Ask a focused question when a product decision materially changes the result.
- Never commit credentials, tokens, or local environment files.
- Do not close a task issue when validation fails.
- Do not mark a task `completed` in the progress file when validation fails.
- Do not skip prerequisite tasks.
- Do not push the repository `main` or force-push an adventurer branch.
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
- a few verifiable acceptance criteria that prove the outcome, not a restatement of every instruction
- a completion record

Use `paths/_templates/task.md` as the starting point.

A path starts a new `projects/<project-name>/` or polishes a project that
already exists. Say which in the path README. A polishing path must name the
existing project and must not create a second folder for the same product.
