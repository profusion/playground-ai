---
name: start-journey
description: Welcomes a learner to Playground AI, verifies the GitHub CLI, and confirms their Git commit name and @profusion.mobi email. Use when the learner invokes /start-journey or asks to begin, start, or enter the playground.
compatibility: Requires git and the GitHub CLI (gh)
disable-model-invocation: true
metadata:
  opencode/slash: "true"
  opencode/autoinvoke: "false"
---

# Start Journey

Open the playground. Welcome the learner before checking any tools.

## Welcome

Show this banner first, in a code block, exactly as written. Then show the prose in full. Do both before running any command.

```text
█     █ █████ █     █████  ███  █   █ █████
█  █  █ █     █     █     █   █ ██ ██ █
█ █ █ █ ████  █     █     █   █ █ █ █ ████
██   ██ █     █     █     █   █ █   █ █
█     █ █████ █████ █████  ███  █   █ █████
```

> There is a room in this repository that does not exist yet. It will have a name, a person it was made for, and a reason to be opened. You are the one who will decide those things. An agent can walk beside you, carry the tedious weight, and argue with your choices, but the invention remains yours. That is the bargain of Playground AI.
>
> The way through is written down. Each lesson is a page of Markdown. When you begin one, it becomes a GitHub issue with your name on it, a claim staked in public. Your work lives on a branch of your own, `learners/<your-github-login>`, and each path keeps a progress file, a record of where you have already been. When a lesson is truly finished, the issue closes and the file remembers that you passed.
>
> No one takes another road until they have walked the Quickstart. It has five stops. First you decide what to build. Then you write the specification, so the agent is not left to invent your intent. Next you build the thing and give the agent a measurement it can run itself, with `/goal` holding it to that proof. Then you use what you made, find the rough edge, and make it better. Last, you stand beside the finished work and narrate it, as you would for a client, and post that demo in `#dev-ai`.
>
> Two words move you from stop to stop. `/start-task` looks at your progress and your GitHub issues, then opens the next page. You do not name it. `/complete` tests the page already open and, if it holds, closes it. You are here because you asked to begin. Before the first step, the door asks for two things: a working GitHub CLI, and a commit identity that carries your `@profusion.mobi` email.

## GitHub CLI

After the welcome, verify the CLI in this order. Stop at the first failure.

1. Run `gh --version`.
   - If `gh` is missing, tell the learner to install it from https://cli.github.com/ and run `/start-journey` again.
2. Run `gh auth status`.
   - If it fails, tell the learner to run `gh auth login`, finish the prompts, and run `/start-journey` again.
3. Run `gh api user --jq .login` and `gh repo view`.
   - If the login works but the repository does not, explain the `gh` error and stop.

## Git identity

After the GitHub CLI checks pass, read the identity Git will put on commits:

```bash
git config user.name
git config user.email
```

Show the learner both values and ask whether this is the name and email they want. Do not continue until they answer.

- The email must end in `@profusion.mobi`.
- If either value is missing, the email is not a Profusion address, or the learner says either value is wrong, stop.
- Ask them for the correct name and `@profusion.mobi` email, then tell them to set those values and run `/start-journey` again. Do not run `git config` yourself.

When they confirm a name and an `@profusion.mobi` email, address the learner by their GitHub login and give the next command:

```text
/start-task
```

Do not create a branch, issue, or progress file in this skill. Do not start the first task unless the learner asks for that too.
