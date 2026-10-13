---
name: start-task
description: Creates a GitHub issue from a learning task Markdown file and assigns it to the current GitHub user. Use when the learner invokes /start-task with a task path.
disable-model-invocation: true
---

# Start Task

Start one curriculum task from its Markdown source.

## Input

Require one task file path, for example:

```text
/start-task paths/quickstart/01-decide-what-to-build.md
```

## Workflow

1. Read the task and require valid `task_id`, `title`, `path`, and
   `depends_on` frontmatter.
2. Run `gh auth status` and `gh repo view`. If either fails, explain the exact
   setup needed and stop.
3. For every `depends_on` task ID, use GitHub CLI to confirm that its issue
   exists and is closed. Stop and name any unmet prerequisite.
4. Search open and closed issues for the exact `task_id`.
5. If an issue already exists, return its URL instead of creating a duplicate.
6. Create the issue from the task:

```bash
gh issue create \
  --title "<title from frontmatter>" \
  --body-file "<task file path>" \
  --assignee "@me"
```

7. Return the issue URL and summarize the first action the learner should take.

Do not modify the task file. Do not begin implementation unless the learner
also asks to start the work.
