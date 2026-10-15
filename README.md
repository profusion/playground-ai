# AI Playground

AI Playground is a hands-on course for learning how to build software with
coding agents, repository instructions, reusable skills, and GitHub issues.

You will learn by completing small tasks. Each task lives in Markdown, becomes
a GitHub issue assigned to you, and has explicit completion criteria. Your work
stays on your own branch, and each path keeps a progress file there.

## Start here

Ask your agent to run `/start-journey`. It welcomes you and checks that the
GitHub CLI is installed and signed in.

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

1. Ask your agent to run `/start-journey`.
2. Ask your agent to run `/start-task`.
3. Work with the agent until every acceptance criterion is satisfied.
4. Ask your agent to run `/complete`.

You do not name the task. `/start-task` checks your progress file, your current
route, and your GitHub issues, then opens the next task on
`learners/<your-github-login>`. `/complete` validates the task already in
progress, marks it `completed`, and closes your issue. Both commands commit
the progress file and push your learner branch. They do not push `main`.

## Repository map

```text
.
├── .cursor/skills/       # Reusable agent workflows
├── paths/                # Learning paths
│   ├── README.md
│   ├── _templates/
│   └── quickstart/
├── progress/             # Created per learner and path on their branch
│   └── <github-login>/
│       └── quickstart.md
├── AGENTS.md             # Instructions for coding agents
└── README.md             # Instructions for learners
```

## Adding a learning path

Copy `paths/_templates/task.md` for each task. Give tasks ordered filenames,
clear deliverables, and acceptance criteria that an agent can verify.
