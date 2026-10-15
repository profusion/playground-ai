---
task_id: quickstart-05
title: "Quickstart 05: Demo the application"
path: quickstart
depends_on:
  - quickstart-04
---

# Demo the application

## Goal

Present the product idea in a narrated video while using the application, then
post that demo in the `#dev-ai` Slack channel.

## Instructions

This is the same skill you will use with a client. A client needs to understand
what the product is, who it is for, and see it working. A silent recording or a
tour of the code does not do that.

Prepare a short demo before you record. Write it in `projects/<project-name>/DEMO.md`:

1. the product idea in plain language
2. the target user and the problem
3. the one workflow you will show
4. the opening line that states why the product matters
5. the closing line that states what the viewer just saw

Record yourself using the application while you narrate. Speak to the viewer
as you would to a client. Show the primary workflow and the improvement from
the previous task. Keep the recording focused on the product in use.

Post the video in the `#dev-ai` Slack channel with a short message that states
the product idea. Put the Slack message link in `projects/<project-name>/DEMO.md`.

Ask the agent to review the outline before you record. You give the demo. The
agent does not narrate it for you.

## Deliverables

- `projects/<project-name>/DEMO.md`: The product idea, demo outline, and Slack message link.
- A narrated video of the application being used, posted in `#dev-ai`.

## Acceptance criteria

- [ ] `projects/<project-name>/DEMO.md` states the product idea, target user, and problem.
- [ ] The outline names the workflow that will be shown and the opening and
      closing lines.
- [ ] The learner narrates the video while using the application.
- [ ] The video shows the primary workflow and the improvement from task 4.
- [ ] The video is posted in the `#dev-ai` Slack channel.
- [ ] The Slack message states the product idea and includes the video.
- [ ] `projects/<project-name>/DEMO.md` contains a link to that Slack message.
- [ ] The learner delivered the narration. The agent did not record it in their
      place.

## Completion record

Comment on the GitHub issue with the product idea, the Slack message link, and
what a client would understand after watching the demo.
