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

1. Read `.agents/references/current-task.md`. Run the Journey gate before changing branches or files. If it fails, stop and tell the learner to run `/start-journey`.
2. Use the rest of that file to select the route and task. Then run the Previous task gate. If it fails, name the unfinished task and stop. Do not create an issue.
3. Read the selected task and require valid `task_id`, `title`, `path`, and `depends_on` frontmatter.
4. If the selected task is already `in_progress`, return its task path and issue URL. Do not create another issue.
5. Create `progress/<login>/<path>.md` from `paths/_templates/progress.md` when the route does not yet have one. List every task file in `paths/<path>/`, excluding `README.md`, in filename order.
6. Confirm every `depends_on` task is `completed` and its issue is closed. Stop and name any unmet prerequisite.
7. Reuse the open issue assigned to `@me` whose body contains the exact `task_id`. Otherwise create one:

```bash
gh issue create \
  --title "[<login>] <title from frontmatter>" \
  --body-file "<task file path>" \
  --assignee "@me"
```

8. Set this task to `in_progress`, record the issue URL, and set `Updated` to today's date in `YYYY-MM-DD` form.
9. Commit only the progress file when it changed:

```text
Start <task_id>
```

10. Push `<login>/main` with upstream tracking. Never push the repository `main` or use `--force`. If `<login>/main` does not exist, stop and tell the learner to run `/start-journey`.

Return the selected route, task path, progress-file path, and issue URL. Do not modify the task file or begin implementation unless the learner also asks to start the work.
