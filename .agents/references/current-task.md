# Current task

The learner does not name the task. Decide it from the progress files, the route, and the issues assigned to them.

## Gather state

1. Run `gh auth status`, `gh api user --jq .login`, and `gh repo view`. Stop and explain the first failure.
2. Fetch `origin`. The learner branch is `learners/<login>`.
3. If that branch exists on `origin`, read every `progress/<login>/*.md` file from it with `git show`.
4. List issues assigned to `@me` in every state:

```bash
gh issue list --assignee @me --state all --limit 100 --json number,title,state,url
```

Read each issue body and match its `task_id`.
5. Check out `learners/<login>`. If the current branch is different and the worktree is dirty, stop and ask the learner to commit or stash. Create the branch from `origin/main` when it does not exist. Fast-forward it when `origin` has it. If the branches have diverged, stop. Do not rebase or force-push.
6. Read the local `progress/<login>/*.md` files and the task frontmatter under `paths/`.
7. Reconcile each existing progress file with its route directory. Append any
   task that is present under `paths/<path>/` but missing from the table as
   `not_started`. Preserve existing statuses and issue URLs. Stop if a progress
   row refers to a task that no longer exists.

## Repair mismatches

- An open assigned issue with progress `not_started` means the progress file is stale. Set that task to `in_progress` and record the issue URL.
- Progress `in_progress` with no issue means the issue is missing. Create it during `/start-task`.
- Progress `completed` with an open issue means completion was not recorded on GitHub. Do not start another task. `/complete` must validate and close that issue.
- A closed issue with progress not `completed`, or two different `in_progress` tasks, is a conflict. Stop and show both states.

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
