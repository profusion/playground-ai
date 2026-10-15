---
name: start-task
description: Finds the learner's next task from progress files, the current route, and assigned GitHub issues, then starts it on the learner's branch. Use when the learner invokes /start-task. The learner does not name the task.
compatibility: Requires git and the GitHub CLI (gh)
disable-model-invocation: true
metadata:
  opencode/slash: "true"
  opencode/autoinvoke: "false"
---

# Start Task

Start the task the learner is ready for. Do not ask the learner to choose a task file.

## Workflow

1. Read `.agents/references/current-task.md` and use it to select the route and task.
2. Read the selected task and require valid `task_id`, `title`, `path`, and `depends_on` frontmatter.
3. If the selected task is already `in_progress`, return its task path and issue URL. Do not create another issue.
4. Create `progress/<login>/<path>.md` from `paths/_templates/progress.md` when the route does not yet have one. List every task file in `paths/<path>/`, excluding `README.md`, in filename order.
5. Confirm every `depends_on` task is `completed`. Stop and name any unmet prerequisite.
6. Reuse the open issue assigned to `@me` whose body contains the exact `task_id`. Otherwise create one:

```bash
gh issue create \
  --title "[<login>] <title from frontmatter>" \
  --body-file "<task file path>" \
  --assignee "@me"
```

7. Set this task to `in_progress`, record the issue URL, and set `Updated` to today's date in `YYYY-MM-DD` form.
8. Commit only the progress file when it changed:

```text
Start <task_id>
```

9. Push `learners/<login>` with upstream tracking. Never push `main` or use `--force`.

Return the selected route, task path, progress-file path, and issue URL. Do not modify the task file or begin implementation unless the learner also asks to start the work.
