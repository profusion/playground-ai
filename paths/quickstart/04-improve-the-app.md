---
task_id: quickstart-04
title: "Quickstart 04: Improve the application"
path: quickstart
depends_on:
  - quickstart-03
---

# Improve the application

## Goal

Use the application as a developer and target user, identify one meaningful
rough edge, bottleneck, or missing feature, and polish it with help from an AI
agent.

## Instructions

Run the application and complete its primary workflow yourself. Observe where
the experience is confusing, slow, repetitive, fragile, or incomplete.

Create `projects/<project-name>/IMPROVEMENT.md` and record:

1. what you tried and what you observed
2. at least three possible improvements
3. the one improvement you chose and why
4. the expected behavior and how you will verify it
5. how the AI agent helped you investigate, design, or implement the change

Choose one focused improvement. Ask the agent to inspect the relevant code,
challenge your assumptions, and propose a small implementation plan. Make the
change, test it, and use the application again to compare the result with your
original observation.

Reuse the measurement command from task 3. Extend `projects/<project-name>/README.md` and
`projects/<project-name>/AGENTS.md` when the improvement changes what that command must observe.

Update the task 3 pull request, or open a new pull request into
`<github-login>/main`, with a video that shows the improved behavior working.
The base is `<github-login>/main`, not the repository `main`. A screenshot or
the original workflow video does not count.

Update `projects/<project-name>/SPEC.md` when the improvement changes product behavior. Avoid a broad
rewrite or unrelated cleanup.

## Deliverables

- `projects/<project-name>/IMPROVEMENT.md`: Evidence, alternatives, selected improvement, and result.
- A focused change to the application in `projects/<project-name>/`.
- Automated tests covering the changed behavior.
- Updated `projects/<project-name>/SPEC.md`, `README.md`, and `AGENTS.md` in that same directory when behavior or the measurement changed.
- A pull request into `<github-login>/main` whose description contains a video of the improved behavior.

## Acceptance criteria

- [ ] `projects/<project-name>/IMPROVEMENT.md` describes an issue observed while using the application.
- [ ] It compares at least three possible improvements and justifies one choice.
- [ ] The implementation addresses the selected issue without unrelated scope.
- [ ] Tests demonstrate the expected behavior and pass.
- [ ] The learner used the updated application and recorded the before-and-after
      result.
- [ ] Product behavior and usage documentation match the improved application.
- [ ] Formatting, linting, type checking, and tests pass when supported by the
      chosen stack.
- [ ] `IMPROVEMENT.md` explains the AI agent's contribution and one decision the
      learner made rather than delegating it.
- [ ] A pull request into `<github-login>/main` contains the improvement. Its
      base is not the repository `main`.
- [ ] That pull request description contains a playable video of the improved
      application working.

## Completion record

Comment on the GitHub issue with the observed problem, the selected
improvement, the before-and-after result, the pull request URL, the agent's
contribution, and the validation commands and outcomes.
