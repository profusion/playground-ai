# Learning Paths

A path is an ordered set of Markdown tasks that teaches one workflow.

## Available paths

| Path | Status | Prerequisite |
| --- | --- | --- |
| [Quickstart](quickstart/README.md) | Ready | None |

More paths can be added after the Quickstart format has been tested with
learners.

## Rules

1. Begin with `/start-journey`. Run `/mentor` when you need to know where you are.
2. Complete Quickstart first.
3. Complete tasks in filename order unless a task says otherwise.
4. Run `/start-task` on your `<github-login>/main` branch. The agent chooses the task. Pull requests target that branch.
5. Finish the task in progress with `/complete`.
6. Track each path in `progress/<github-login>/<path>.md`.
7. A task is complete only when its acceptance criteria are verifiably true and its progress status is `completed`.
8. A route either starts a project in `projects/<project-name>/` or polishes one that already exists. Polishing routes reuse that folder.
