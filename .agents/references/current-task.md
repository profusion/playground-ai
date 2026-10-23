# Current task

The learner does not name the task. Decide it from the progress files, the route, and the issues assigned to them.

## Gather state

1. Run `gh auth status`, `gh api user --jq .login`, and `gh repo view`. Stop and explain the first failure.
2. Fetch `origin`. The learner's main branch is `<login>/main`. If it does not exist locally or on `origin`, stop. The learner cannot proceed. Tell them to run `/start-journey`.
3. If `<login>/main` exists on `origin`, read every `progress/<login>/*.md` file from it with `git show`.
4. List issues assigned to `@me` in every state:

```bash
gh issue list --assignee @me --state all --limit 100 --json number,title,state,url
```

Read each issue body and match its `task_id`.
5. Run Catch up below. Do not create `<login>/main` here. Do not push the repository `main`. Do not force-push.
6. Read the local `progress/<login>/*.md` files and the task frontmatter under `paths/`.
7. Reconcile each existing progress file with its route directory. Append any
   task that is present under `paths/<path>/` but missing from the table as
   `not_started`. Preserve existing statuses and issue URLs. Stop if a progress
   row refers to a task that no longer exists. Do this after Catch up, so the
   task list is the one on the updated stronghold.

## Catch up

Run this when `<login>/main` already exists. It repairs an adventurer who started before the guild road moved: a missing hook path, a stronghold that needs a rebase onto its own remote, and guild-road commits that never reached the stronghold. Do not create `<login>/main` here. Do not push the repository `main`. Do not force-push.

1. Remember the current branch. `git fetch origin`.
2. If the worktree is dirty, stop. Ask the learner to commit or stash. Do not stash for them.
3. If `git config --get core.hooksPath` is not `.githooks`, run `git config core.hooksPath .githooks`. Testing mode allows this. Do not set `user.name` or `user.email`.
4. Check out `<login>/main`.
5. When `origin/<login>/main` exists, make the local stronghold match it:
   - Fast-forward when the remote is ahead.
   - When the two have diverged, rebase the local commits onto `origin/<login>/main` with `git rebase origin/<login>/main`. If the rebase stops on a conflict, run `git rebase --abort` and stop. Explain the conflict.
   - When the local stronghold is only ahead, leave it. The later push publishes those commits.
6. When `git merge-base --is-ancestor origin/main HEAD` fails, the stronghold is missing guild-road commits. Merge them with `git merge --no-edit origin/main`. If the merge stops on a conflict, run `git merge --abort` and stop. Explain the conflict. Do not rebase `<login>/main` onto `origin/main`. A merge keeps the existing seals, so the push check does not rejudge commits already on the remote.
7. Push `<login>/main` when it is ahead of `origin/<login>/main`. Never use `--force`. If the push is rejected, stop and show the hook output.
8. If the branch remembered in step 1 is `<login>/<task_id>`, or a later step is about to use that quest branch, update it too. Check it out. Fast-forward `origin/<login>/<task_id>` when that remote is ahead. When the local quest branch and that remote have diverged, rebase onto `origin/<login>/<task_id>` and abort on conflict. Then, when `<login>/main` is not an ancestor of the quest branch, merge `<login>/main` with `git merge --no-edit <login>/main` and abort on conflict. Push the quest branch without `--force`. Check the remembered branch back out when this step was only repairing it.

Tell the adventurer which of these were missing and which command repaired them.

A missing `core.hooksPath`, or a stronghold that does not yet contain `origin/main`, is repaired here. Do not send the learner back to `/start-journey` for those two gaps.

## Repair mismatches

- An open assigned issue with progress `not_started` means the progress file is stale. Set that task to `in_progress` and record the issue URL.
- Progress `in_progress` with no issue means the issue is missing. Create it during `/start-task`.
- Progress `completed` with an open issue means completion was not recorded on GitHub. Do not start another task. `/complete` must validate and close that issue.
- A closed issue with progress not `completed`, or two different `in_progress` tasks, is a conflict. Stop and show both states.

## Start gates

`/start-task` must pass both gates before it creates an issue or marks a task `in_progress`. If either gate fails, change nothing.

### Journey

Everything from `start-journey` is present:

- `gh auth status` succeeds and `gh repo view` succeeds.
- `git config user.name` is non-empty.
- `git config user.email` ends in `@profusion.mobi`.
- When `PLAYGROUND_TESTING=1` and git config is empty, `PLAYGROUND_GIT_NAME` is non-empty and `PLAYGROUND_GIT_EMAIL` ends in `@profusion.mobi` instead. Do not run `git config` for `user.name` or `user.email`.
- `<login>/main` exists locally and on `origin`.
- `projects/README.md` exists on `<login>/main`.

The learner's own branch and `projects/` folder are the project setup. A `projects/<project-name>/` directory is created by the first build task, so it is not required here. A missing `core.hooksPath` or a stronghold that does not contain `origin/main` is repaired by Catch up before this gate is judged.

If any item is missing, the next step is `/start-journey`. Do not create the branch or the projects folder from `/start-task`.

### Previous task

On the current route, tasks are ordered by filename.

- The first task may start when the journey gate passes.
- A later task may start only when the immediately previous task is `completed`, its assigned issue is closed, and its pull request has a human approval. A merge without that approval does not count. When `PLAYGROUND_TESTING=1`, the author's own approval or a `TESTING-MODE: approved` comment on that pull request counts.
- If the previous task is `in_progress`, stay on it. Do not open the next issue.
- If any earlier task is `not_started`, `in_progress`, or `completed` with its issue still open, do not start a task after it.

## Choose the route

Routes are directories in `paths/` other than `_templates`.

1. `quickstart` is the route until every task currently defined under
   `paths/quickstart/` is `completed` and its assigned issue is closed.
2. Otherwise, a route with an `in_progress` task is the current route.
3. If no task is `in_progress`, continue the only route that has a progress file and a `not_started` task.
4. If more than one such route exists, ask the learner which route to continue.

## Choose the task

- `/start-task` selects the current route's `in_progress` task. When none exists, select the first task in filename order whose status is `not_started` and whose `depends_on` tasks are `completed`.
- `/complete` selects the current route's `in_progress` task. When none exists, say so and tell the learner to run `/start-task`.

Ignore a task path supplied by the learner. Tell them which task was selected and which route it belongs to.
