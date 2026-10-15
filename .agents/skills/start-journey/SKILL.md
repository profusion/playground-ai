---
name: start-journey
description: Welcomes a learner to Playground AI, verifies the GitHub CLI and @profusion.mobi email, and creates their <login>/main branch after they approve the commands. Use when the learner invokes /start-journey or asks to begin, start, or enter the playground.
compatibility: Requires git and the GitHub CLI (gh)
disable-model-invocation: true
metadata:
  opencode/slash: "true"
  opencode/autoinvoke: "false"
---

# Start Journey

Open the playground. Welcome the adventurer before checking any tools. Follow the Voice section in `AGENTS.md`.

## Welcome

Show this banner first, in a code block, exactly as written. Then show the prose in full. Do both before running any command.

```text
█     █ █████ █     █████  ███  █   █ █████
█  █  █ █     █     █     █   █ ██ ██ █
█ █ █ █ ████  █     █     █   █ █ █ █ ████
██   ██ █     █     █     █   █ █   █ █
█     █ █████ █████ █████  ███  █   █ █████
```

> Greetings, adventurer.
>
> There is a workshop in this repository that does not exist yet. It will have a name, a person it was forged for, and a reason to open its doors. You are the one who will decide those things. A companion may walk beside you, carry the tedious weight, and argue with your choices, but the invention remains yours. That is the bargain of Playground AI.
>
> The road is written down. Each quest is a page of Markdown. When you take one up, it becomes a quest notice with your name on it. Your stronghold is your own main, `<your-github-login>/main`. Every petition opens against that branch, never against the guild road `main`. Each project lives in a workshop, `projects/<project-name>/`. A later road may polish that same workshop, or raise another beside it. Each road also keeps a chronicle, a record of the quests you have already sealed. When a quest is truly finished, the notice closes and the chronicle remembers that you passed.
>
> No adventurer takes another road until they have walked the Quickstart. It has five quests. First you decide what to build, in counsel with an oracle. Then you write the specification, so your companion is not left to invent your intent. Next you build the thing and give your companion a measurement it can run itself, with `/goal` holding it to that proof. Then you use what you made, find the rough edge, and make it better. Last, you stand beside the finished work and narrate it, as you would before a client, and post that tale in `#dev-ai`.
>
> Two commands move you from quest to quest. `/start-task` reads your chronicle and your quest notices, then opens the next one. You do not name it. `/complete` tests the quest already open and, if it holds, seals it. If you lose the road, `/mentor` reads the chronicle and tells you the single next step. You are here because you asked to begin. An adventurer does not proceed without the stronghold `<your-github-login>/main`. Before the first step, the gate asks for a working GitHub CLI, a commit identity that carries your `@profusion.mobi` email, and your approval of the commands that raise that stronghold.

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

## Personal main

When they confirm a name and an `@profusion.mobi` email, the GitHub login is `<login>`. The learner cannot start Quickstart without the branch `<login>/main`. Later pull requests use that branch as their base. Never open a pull request against the repository `main`, and never push the repository `main`.

Fetch `origin`.

- If `<login>/main` already exists, check it out and fast-forward it. If the worktree is dirty, or the branch has diverged, stop and explain. Do not recreate it.
- If it does not exist, show the exact commands below with `<login>` filled in. Then ask, in these words: "Greetings, adventurer. I will raise your stronghold with these commands so the quickstart quest may begin. Do you approve?"

```bash
git fetch origin
git checkout -b <login>/main origin/main
mkdir -p projects
cat > projects/README.md << 'EOF'
# Projects

Greetings, adventurer. Each workshop lives in `projects/<project-name>/`.
A road may found a new workshop or polish one that already stands.
A polishing road uses the existing folder. Do not put project files in the repository root.
EOF
git add projects/README.md
git commit -m "Add the projects folder for this journey"
git push -u origin HEAD
```

Wait for an explicit yes. If the learner does not approve, run nothing and stop. After approval, run only those commands.

If `<login>/main` already exists but `projects/README.md` does not, show the `mkdir`, file, commit, and push commands and ask for approval with the same sentence. Do not add the folder without approval.

When `<login>/main` exists locally and on `origin`, and `projects/README.md` is on it, address the learner by their GitHub login and give the next command:

```text
/start-task
```

Do not create an issue or progress file in this skill. Do not start the first task unless the learner asks for that too.
