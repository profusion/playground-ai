---
name: mentor
description: Reads the learner's progress, route, and GitHub issues, then explains where they are and the single next step. Use when the learner invokes /mentor or asks where they are, what to do next, or for help continuing. Do not use the name /help.
compatibility: Requires git and the GitHub CLI (gh)
disable-model-invocation: true
metadata:
  opencode/slash: "true"
  opencode/autoinvoke: "false"
---

# Mentor

Tell the learner where they are and the next step. Do not do that step. You may run Catch up first, so an adventurer who already began is not left behind the guild road.

The skill is named `mentor` because `/help` is already used by other agents.

## Workflow

1. Do not start or finish a quest. Do not edit a chronicle, create an issue, or run `git config` for `user.name` or `user.email`. Catch up in `.agents/references/current-task.md` is the one repair you may run.
2. Run `gh auth status`, `gh api user --jq .login`, `git config user.name`, and `git config user.email`.
   - If `gh` is missing, not authenticated, the name is missing, or the email does not end in `@profusion.mobi`, the next step is `/start-journey`. Name the failed check and stop.
3. Fetch `origin`. The learner's main branch is `<login>/main`. If it does not exist locally or on `origin`, the next step is `/start-journey`, even when the GitHub CLI and email are valid. Say that an adventurer cannot proceed without that branch, then stop.
4. Run Catch up from `.agents/references/current-task.md`. If it stops on a dirty worktree, a conflict, or a rejected push, that is the next step. Name the blocker and stop. Do not send the learner to `/start-journey` only because the hook path was missing or the stronghold was behind `origin/main`.
5. Read `progress/<login>/*.md` from `origin/<login>/main` when that branch exists. Also read the local copy when it is already checked out. If another branch is checked out and the worktree is dirty, do not switch. Say which copy of the progress you could read.
6. Read `.agents/references/current-task.md`. Use "Choose the route" and "Choose the task". Do not apply "Repair mismatches". Also apply "Start gates".
   - If the Journey gate fails, the next step is `/start-journey`.
   - If the Previous task gate fails, name the unfinished task. The next step is to finish it with `/complete`, or `/start-task` only when that unfinished task is not started yet.
   - If the progress file and the assigned issues conflict, describe both states. Point to `/start-task` or `/complete` as the place that resolves it. Do not resolve it here.
7. Read the selected task file and use its goal to explain the work. Follow the Voice section in `AGENTS.md`. Begin with "Greetings, adventurer." when this is the first reply.

## What to say

Give four short parts:

1. **Where you are:** branch, route, task, and status. If Catch up changed the hook path or brought the guild road into the stronghold, say what it repaired.
2. **What is recorded:** the progress-file status and the assigned issue URL, or that neither exists yet.
3. **Next step:** exactly one of `/start-journey`, `/start-task`, or `/complete`.
4. **What that step is for:** one or two sentences from the task goal. Do not start the task.

Choose the next step this way:

- Setup is incomplete: `/start-journey`.
- No task is `in_progress`, and a later task is ready: `/start-task`.
- A task is `in_progress`: keep working, then `/complete`.
- The current route is complete: say so. Name another route only when one exists and its prerequisites are met.

If the learner also asks you to start or finish the task, do that only after this report, and follow `start-task` or `complete`.
