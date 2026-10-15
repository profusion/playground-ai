# Learning Paths

A path is an ordered set of Markdown tasks that teaches one workflow.

## Available paths

| Path | Status | Prerequisite |
| --- | --- | --- |
| [Quickstart](quickstart/README.md) | Ready | None |

More paths can be added after the Quickstart format has been tested with
learners.

## Rules

1. Begin with `/start-journey`.
2. Complete Quickstart first.
3. Complete tasks in filename order unless a task says otherwise.
4. Run `/start-task` on your `learners/<github-login>` branch. The agent chooses the task.
5. Finish the task in progress with `/complete`.
6. Track each path in `progress/<github-login>/<path>.md`.
7. A task is complete only when its acceptance criteria are verifiably true and its progress status is `completed`.
