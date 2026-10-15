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

Tell the learner where they are and the next step. Do not do the step.

The skill is named `mentor` because `/help` is already used by other agents.

## Workflow

1. Change nothing. Do not edit files, switch branches, create issues, commit, push, or run `git config`.
2. Run `gh auth status`, `gh api user --jq .login`, `git config user.name`, and `git config user.email`.
   - If `gh` is missing, not authenticated, the name is missing, or the email does not end in `@profusion.mobi`, the next step is `/start-journey`. Name the failed check and stop.
3. Fetch `origin`. The learner's main branch is `<login>/main`. If it does not exist locally or on `origin`, the next step is `/start-journey`, even when the GitHub CLI and email are valid. Say that an adventurer cannot proceed without that branch, then stop.
4. Read `progress/<login>/*.md` from `origin/<login>/main` when that branch exists. Also read the local copy when it is already checked out. If another branch is checked out and the worktree is dirty, do not switch. Say which copy of the progress you could read.
5. Read `.agents/references/current-task.md`. Use "Choose the route" and "Choose the task". Do not apply "Repair mismatches".
   - If the progress file and the assigned issues conflict, describe both states. Point to `/start-task` or `/complete` as the place that resolves it. Do not resolve it here.
6. Read the selected task file and use its goal to explain the work in plain language.

## What to say

Give four short parts:

1. **Where you are:** branch, route, task, and status.
2. **What is recorded:** the progress-file status and the assigned issue URL, or that neither exists yet.
3. **Next step:** exactly one of `/start-journey`, `/start-task`, or `/complete`.
4. **What that step is for:** one or two sentences from the task goal. Do not start the task.

Choose the next step this way:

- Setup is incomplete: `/start-journey`.
- No task is `in_progress`, and a later task is ready: `/start-task`.
- A task is `in_progress`: keep working, then `/complete`.
- The current route is complete: say so. Name another route only when one exists and its prerequisites are met.

If the learner also asks you to start or finish the task, do that only after this report, and follow `start-task` or `complete`.
