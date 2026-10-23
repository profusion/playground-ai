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

Validate the quest already in progress. Speak with the Voice section in `AGENTS.md`. Do not ask the adventurer to choose a quest file.

## Workflow

1. Read `.agents/references/current-task.md`. Run Catch up before selecting the task. If Catch up stops, report the blocker and stop. A missing hook path or a stronghold behind `origin/main` is not a reason to send the learner to `/start-journey`.
2. Use that file to select the route and `in_progress` task.
3. Read that task file and extract its `task_id`, `path`, deliverables, acceptance criteria, and completion-record requirements.
4. Find the open issue assigned to `@me` whose body contains the exact `task_id`. If none exists, stop and recommend `/start-task`.
5. Check out `<login>/<task_id>` and run Catch up step 8 for that branch. Inspect the work and verify every acceptance
   criterion. Run all relevant validation commands.
6. Find the petition whose head is `<login>/<task_id>` and base is
   `<login>/main`. If none exists, open the draft petition from `start-task`
   once the quest branch has a commit the stronghold lacks. If the branches
   still match, stop. Do not create an empty commit. Verify the description
   contains the evidence required by the quest.
7. Use `gh pr view` to inspect its author, state, draft status, reviews, head,
   and base. At least one latest review must be `APPROVED` by a human who is
   not the author. Ignore bots. A merge without that approval does not count.
   When `PLAYGROUND_TESTING=1`, the author may approve their own petition.
   Try `gh pr review --approve`. If GitHub rejects that self-approval, comment
   `TESTING-MODE: approved` on the petition and treat the comment as the
   approval. The issue and the pull request must still exist. Confirm both
   with `gh issue view` and `gh pr view`. Record that testing mode supplied
   the approval.
8. If the petition is a draft, evidence is missing, approval is missing, or any
   quest check fails, leave the quest `in_progress` and the issue open. Name
   the smallest next action. Remind the adventurer that reviewers glance at
   specs, screenshots, videos, and links; they do not read the code.
9. If the approved petition is open, merge it into `<login>/main`. If GitHub
   refuses the merge, leave the quest `in_progress` and report the blocker.
10. Check out `<login>/main`, fetch, and fast-forward it. Confirm the merge is
    present.
11. Prepare a completion record containing:
    - what was produced
    - important decisions
    - validation commands and outcomes
    - pull request URL and human approver
    - known limitations, or `None`
12. Set the task to `completed`, keep its issue URL, and set `Updated` to
    today's date in `YYYY-MM-DD` form.
13. Close the issue:

```bash
gh issue close <number> --comment "<completion record>"
```

14. Commit only the progress file on `<login>/main`:

```text
chore: complete <task_id>
```

15. Push `<login>/main`. Never push the repository `main` or use `--force`.
    If `<login>/main` does not exist, stop and tell the learner to run
    `/start-journey`.

Return the closed issue URL and progress-file path. Name the next task on that route, or say the route is complete. Tell the learner to run `/start-task` when they want to continue.

Never claim a check passed without running it or directly inspecting the required artifact. Do not commit project files other than the progress file unless the learner explicitly asks.
