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

Start the quest the adventurer is ready for. Speak with the Voice section in `AGENTS.md`. Do not ask the adventurer to choose a quest file.

## Workflow

1. Read `.agents/references/current-task.md`. Run the Journey gate before changing branches or files. If it fails, stop and tell the learner to run `/start-journey`.
2. Use the rest of that file to select the route and task. Then run the Previous task gate. If it fails, name the unfinished task and stop. Do not create an issue.
3. Read the selected task and require valid `task_id`, `title`, `path`, and `depends_on` frontmatter.
4. If the selected task is already `in_progress`, check out
   `<login>/<task_id>`, then return its task path, issue URL, and pull request
   URL. Do not create another issue or branch.
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
9. Commit the progress file on `<login>/main` when it changed:

```text
Start <task_id>
```

10. Push `<login>/main`. Never push the repository `main` or use `--force`.
11. Create the quest branch `<login>/<task_id>` from the updated
    `<login>/main`. If that branch already exists locally or on `origin`, check
    it out and fast-forward it instead. Stop on divergence.
12. Push the quest branch with upstream tracking.
13. Reuse its existing pull request, or open a draft pull request:

```bash
gh pr create \
  --draft \
  --base "<login>/main" \
  --head "<login>/<task_id>" \
  --title "[<login>] <title from frontmatter>" \
  --body "Quest: <task_id>\n\nIssue: <issue URL>\n\nReview the evidence in this description. Do not read the code."
```

Return the selected road, quest path, quest branch, chronicle path, issue URL,
and petition URL. Tell the adventurer to add the quest's required evidence to
the petition description and mark it ready for review. Do not modify the task
file or begin implementation unless the adventurer also asks to start the work.

Testing mode does not skip the issue or the pull request. After creating them,
run `gh issue view` and `gh pr view` and include both URLs in the reply.
