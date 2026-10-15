---
name: start-journey
description: Welcomes a learner to AI Playground and verifies that the GitHub CLI is installed and authenticated. Use when the learner invokes /start-journey or asks to begin, start, or enter the playground.
compatibility: Requires git and the GitHub CLI (gh)
disable-model-invocation: true
metadata:
  opencode/slash: "true"
  opencode/autoinvoke: "false"
---

# Start Journey

Open the playground. Welcome the learner before checking any tools.

## Welcome

Show this text in full before running any command:

> You have just stepped into the AI Playground. This is a workshop, not a lecture. Somewhere in this repository a small product is waiting to exist, and you are the person who will decide what it is. An agent walks with you. The choices stay yours.
>
> Every lesson is a task written in Markdown. When you begin one, it becomes a GitHub issue with your name on it. Your work lives on your own branch, `learners/<your-github-login>`, and each path keeps a progress file there. When you finish a task, the issue closes and the file remembers that you passed.
>
> Before any other path, you walk the Quickstart. It has five stops. First you decide what to build. Then you write the specification, so the agent is not left guessing. Next you build the application and give the agent a measurement it can run itself, with `/goal` keeping it on that loop. Then you use what you built, find a rough edge, and work with the agent to make it better. Last, you narrate a demo of the product in use and post it in `#dev-ai`. That is the same skill you will use when you present to a client.
>
> Two commands carry you from stop to stop. `/start-task` looks at your progress and your GitHub issues, then opens the next task. `/complete` checks the task already in progress and closes it. You do not name the task. You are here because you ran `/start-journey`. The gate in front of you is a working GitHub CLI.

## GitHub CLI

After the welcome, verify the CLI in this order. Stop at the first failure.

1. Run `gh --version`.
   - If `gh` is missing, tell the learner to install it from https://cli.github.com/ and run `/start-journey` again.
2. Run `gh auth status`.
   - If it fails, tell the learner to run `gh auth login`, finish the prompts, and run `/start-journey` again.
3. Run `gh api user --jq .login` and `gh repo view`.
   - If the login works but the repository does not, explain the `gh` error and stop.

When all three succeed, address the learner by their GitHub login and give the next command:

```text
/start-task
```

Do not create a branch, issue, or progress file in this skill. Do not start the first task unless the learner asks for that too.
