---
name: complete
description: Validates a learning task against its acceptance criteria, records evidence on its GitHub issue, and closes the issue. Use when the learner invokes /complete with a task path.
disable-model-invocation: true
---

# Complete Task

Validate and close one curriculum task.

## Input

Require one task file path, for example:

```text
/complete paths/quickstart/01-decide-what-to-build.md
```

## Workflow

1. Read the task file and extract its `task_id`, deliverables, acceptance
   criteria, and completion record requirements.
2. Find the open GitHub issue whose body contains the exact `task_id`. If none
   exists, stop and recommend `/start-task <task-path>`.
3. Inspect repository changes and verify every acceptance criterion. Run all
   relevant validation commands.
4. If anything fails, do not close the issue. Report each unmet criterion and
   the smallest next action needed.
5. If everything passes, prepare a concise completion comment containing:
   - what was produced
   - important decisions
   - validation commands and outcomes
   - known limitations, or `None`
6. Add the comment and close the issue:

```bash
gh issue close <number> --comment "<completion record>"
```

7. Return the closed issue URL and state which task is available next.

Never claim a check passed without running it or directly inspecting the
required artifact. Do not commit or push unless the learner explicitly asks.
