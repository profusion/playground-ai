# AI Playground

AI Playground is a hands-on course for learning how to build software with
coding agents, repository instructions, reusable skills, and GitHub issues.

You will learn by completing small tasks. Each task lives in Markdown, becomes
a GitHub issue assigned to you, and has explicit completion criteria.

## Start here

Everyone completes the [Quickstart path](paths/quickstart/README.md) before
choosing another path:

1. [Decide what to build](paths/quickstart/01-decide-what-to-build.md)
2. [Define the specification](paths/quickstart/02-define-the-spec.md)
3. [Build the application](paths/quickstart/03-build-the-app.md)

## Prerequisites

- [Git](https://git-scm.com/)
- [GitHub CLI](https://cli.github.com/)
- A GitHub account
- An AI coding agent that supports repository instructions and skills

Confirm that GitHub CLI is authenticated:

```bash
gh auth status
```

If it is not, sign in:

```bash
gh auth login
```

## Task workflow

1. Open a task Markdown file.
2. Ask your agent to run `/start-task path/to/task.md`.
3. Work with the agent until every acceptance criterion is satisfied.
4. Ask your agent to run `/complete path/to/task.md`.

`/start-task` creates a GitHub issue assigned to you. `/complete` validates the
work before closing that issue.

## Repository map

```text
.
├── .cursor/skills/       # Reusable agent workflows
├── paths/                # Learning paths
│   ├── README.md
│   ├── _templates/
│   └── quickstart/
├── AGENTS.md             # Instructions for coding agents
└── README.md             # Instructions for learners
```

## Adding a learning path

Copy `paths/_templates/task.md` for each task. Give tasks ordered filenames,
clear deliverables, and acceptance criteria that an agent can verify.
