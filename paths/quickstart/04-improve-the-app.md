---
task_id: quickstart-04
title: "Quickstart 04: Improve the application"
path: quickstart
depends_on:
  - quickstart-03
---

# Improve the application

Greetings, adventurer. This quest is to walk the workshop, find one flaw, and mend it.

## Goal

Use the application as a developer and target user, identify one meaningful
rough edge, bottleneck, or missing feature, and polish it with help from an AI
agent.

## Instructions

Run the application and complete its primary workflow yourself. Observe where
the experience is confusing, slow, repetitive, fragile, or incomplete. In
`IMPROVEMENT.md`, name what you tried, including the actions that changed
nothing.

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

Reuse the measurement command from task 3 and extend it so the new behavior is
checked. Keep a way to show that command failing when the improvement is
broken. Extend `projects/<project-name>/README.md` and
`projects/<project-name>/AGENTS.md` when the improvement changes what that command must observe.

Commit a playable video of the improved behavior and screenshots of the change,
and show them in this quest's petition. The video and screenshots from the
build quest do not count. Use URLs that open on GitHub.

Update `projects/<project-name>/SPEC.md` when the improvement changes product behavior. Avoid a broad
rewrite or unrelated cleanup.

## Deliverables

- `projects/<project-name>/IMPROVEMENT.md`: Evidence, alternatives, selected improvement, and result.
- A focused change to the application in `projects/<project-name>/`.
- Automated tests covering the changed behavior.
- Updated `projects/<project-name>/SPEC.md`, `README.md`, and `AGENTS.md` in that same directory when behavior or the measurement changed.
- A playable video and screenshots of the improved behavior in the quest
  petition.

## Acceptance criteria

- [ ] `projects/<project-name>/IMPROVEMENT.md` records a problem found by using the app, the chosen fix, and the before-and-after result.
- [ ] The fix is in the workshop, and the measurement covers it and still passes.
- [ ] The quest petition contains a playable video of the improved behavior and screenshots of the change.

## Completion record

Comment on the GitHub issue with the observed problem, the selected
improvement, the before-and-after result, the pull request URL, the agent's
contribution, and the validation commands and outcomes.
