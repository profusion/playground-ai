---
name: complete
description: Finds the learner's in-progress task from progress files, the current route, and assigned GitHub issues, validates it, and closes it. Use when the learner invokes /complete. The learner does not name the task.
compatibility: Requires git and the GitHub CLI (gh)
disable-model-invocation: true
metadata:
  opencode/slash: "true"
  opencode/autoinvoke: "false"
---

# Complete Task

Validate the task already in progress. Do not ask the learner to choose a task file.

## Workflow

1. Read `.agents/references/current-task.md` and use it to select the route and `in_progress` task.
2. Read that task file and extract its `task_id`, `path`, deliverables, acceptance criteria, and completion-record requirements.
3. Find the open issue assigned to `@me` whose body contains the exact `task_id`. If none exists, stop and recommend `/start-task`.
4. Inspect the learner's work and verify every acceptance criterion. Run all relevant validation commands.
5. If anything fails, leave the progress status at `in_progress` and leave the issue open. Report each unmet criterion and the smallest next action.
6. If everything passes, prepare a completion record containing:
   - what was produced
   - important decisions
   - validation commands and outcomes
   - known limitations, or `None`
7. Set the task to `completed`, keep its issue URL, and set `Updated` to today's date in `YYYY-MM-DD` form.
8. Close the issue:

```bash
gh issue close <number> --comment "<completion record>"
```

9. Commit only the progress file:

```text
Complete <task_id>
```

10. Push `learners/<login>`. Never push `main` or use `--force`.

Return the closed issue URL and progress-file path. Name the next task on that route, or say the route is complete. Tell the learner to run `/start-task` when they want to continue.

Never claim a check passed without running it or directly inspecting the required artifact. Do not commit project files other than the progress file unless the learner explicitly asks.
