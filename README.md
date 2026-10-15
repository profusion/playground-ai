# Playground AI

Greetings, adventurer.

Playground AI is a guild hall for learning how to build software with coding
agents, repository instructions, reusable skills, and quest notices. Each quest
lives in Markdown, becomes a GitHub issue with your name on it, and has terms
you must meet. Your stronghold is `<your-github-login>/main`, and each road
keeps a chronicle there.

## TLDR

1. Sign in to GitHub CLI if `gh auth status` fails: `gh auth login`
2. Open this repository in your coding agent.
3. Run `/start-journey`.
4. Run `/start-task`. The agent chooses the task.
5. Do the work with the agent.
6. Run `/complete`.
7. Repeat steps 4–6 until Quickstart is done.

If you are unsure where you are, run `/mentor`.

You never name the quest. Your stronghold is `<your-github-login>/main`. Petitions target that branch.

## Start here

Ask your companion to run `/start-journey`. It greets you, checks that the
GitHub CLI is installed and signed in, and asks you to confirm the Git name
and `@profusion.mobi` email that will appear on your commits.

Everyone then completes the [Quickstart path](paths/quickstart/README.md)
before choosing another path:

1. [Decide what to build](paths/quickstart/01-decide-what-to-build.md)
2. [Define the specification](paths/quickstart/02-define-the-spec.md)
3. [Build the application](paths/quickstart/03-build-the-app.md)
4. [Improve the application](paths/quickstart/04-improve-the-app.md)
5. [Demo the application](paths/quickstart/05-demo-the-app.md)

## Prerequisites

- [Git](https://git-scm.com/)
- [GitHub CLI](https://cli.github.com/)
- A GitHub account
- A coding agent that reads `AGENTS.md` and Agent Skills, such as Codex, Claude
  Code, Cursor, OpenCode, or Antigravity

Confirm that GitHub CLI is authenticated:

```bash
gh auth status
```

If it is not, sign in:

```bash
gh auth login
```

## Quest workflow

1. Ask your companion to run `/start-journey`.
2. Ask your companion to run `/start-task`.
3. Work with your companion until every term of the quest is satisfied.
4. Ask your companion to run `/complete`.

You do not name the quest. `/start-journey` raises your stronghold,
`<your-github-login>/main`, only after you approve the commands. `/start-task`
reads your chronicle, your road, and your quest notices, then opens the next
quest on `<your-github-login>/<task-id>` with a petition into your stronghold.
A human other than the author glances at the evidence, not the code, and
approves it. `/complete` tests the quest, verifies that approval, merges the
petition, marks the quest `completed`, and closes the notice. Nothing pushes
the guild road `main`.

## Repository map

```text
.
├── .agents/
│   ├── references/       # Shared logic the skills read
│   └── skills/           # Reusable agent workflows
├── .claude/
│   └── skills -> ../.agents/skills
├── paths/                # Learning paths
│   ├── README.md
│   ├── _templates/
│   └── quickstart/
├── progress/             # Created per learner and path on their branch
│   └── <github-login>/
│       └── quickstart.md
├── projects/             # Created on the learner's main branch
│   └── <project-name>/   # One folder per project; a route may reuse it
├── AGENTS.md             # Instructions for coding agents
├── CLAUDE.md -> AGENTS.md
└── README.md             # Instructions for learners
```

## Works with any agent

Instructions live in `AGENTS.md` and skills live in `.agents/skills/`, the
locations Codex, Cursor, OpenCode, and Antigravity already read. Claude Code
looks elsewhere, so `CLAUDE.md` and `.claude/skills` are symlinks to those same
files rather than copies.

Your agent may expose the skills as `/start-journey`, `/start-task`,
`/complete`, and `/mentor`. If it has no slash commands, ask for the skill by
name. `/mentor` reads your progress and names the next step.

## Adding a learning path

Copy `paths/_templates/task.md` for each task. Give tasks ordered filenames,
clear deliverables, and acceptance criteria that an agent can verify.

Put new skills in `.agents/skills/<name>/SKILL.md` with `name` and
`description` frontmatter, where `name` matches the directory. Do not copy a
skill into a harness-specific directory.
