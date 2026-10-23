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

1. Read `.agents/references/current-task.md`. Run the Journey gate before changing branches or files. If it fails, stop and tell the learner to run `/start-journey`. A missing hook path or a stronghold behind `origin/main` is Catch up, not a failed journey.
2. Run Catch up from that file before creating an issue or branch. If it stops, report the blocker and stop.
3. Use the rest of that file to select the route and task. Then run the Previous task gate. If it fails, name the unfinished task and stop. Do not create an issue.
4. Read the selected task and require valid `task_id`, `title`, `path`, and `depends_on` frontmatter.
5. If the selected task is already `in_progress`, check out
   `<login>/<task_id>` and run Catch up step 8 for that branch. Then return
   its task path, issue URL, and pull request URL. If the issue exists but
   the petition does not, and the quest branch has a commit `<login>/main`
   does not, open the draft petition in step 14. Do not create another issue
   or branch. Do not create an empty commit.
6. Create `progress/<login>/<path>.md` from `paths/_templates/progress.md` when the route does not yet have one. List every task file in `paths/<path>/`, excluding `README.md`, in filename order.
7. Confirm every `depends_on` task is `completed` and its issue is closed. Stop and name any unmet prerequisite.
8. Reuse the open issue assigned to `@me` whose body contains the exact `task_id`. Otherwise create one:

```bash
gh issue create \
  --title "[<login>] <title from frontmatter>" \
  --body-file "<task file path>" \
  --assignee "@me"
```

9. Set this task to `in_progress`, record the issue URL, and set `Updated` to today's date in `YYYY-MM-DD` form.
10. Commit the progress file on `<login>/main` when it changed:

```text
chore: start <task_id>
```

11. Push `<login>/main`. Never push the repository `main` or use `--force`.
12. Create the quest branch `<login>/<task_id>` from the updated
    `<login>/main`. If that branch already exists locally or on `origin`,
    check it out and run Catch up step 8. Do not leave it diverged.
13. Push the quest branch with upstream tracking.
14. Reuse its existing pull request, or open a draft pull request once
    `<login>/<task_id>` has a commit that `<login>/main` does not:

```bash
gh pr create \
  --draft \
  --base "<login>/main" \
  --head "<login>/<task_id>" \
  --title "[<login>] <title from frontmatter>" \
  --body "Quest: <task_id>\n\nIssue: <issue URL>\n\nReview the evidence in this description. Do not read the code."
```

GitHub rejects that command when the two branches point at the same commit.
Do not create an empty commit to force it. Create the issue and the branch,
say the petition opens after the first real quest commit, and open it as soon
as that commit is pushed.

Return the selected road, quest path, quest branch, chronicle path, issue URL,
and petition URL when one exists. Tell the adventurer to add the quest's
required evidence to the petition description and mark it ready for review.
Do not modify the task file or begin implementation unless the adventurer also
asks to start the work.

Testing mode does not skip the issue or the pull request. Confirm the issue
with `gh issue view`. Confirm the pull request with `gh pr view` once it
exists. Include both URLs in the reply.
