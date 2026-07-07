# Feedback on Using Bob — PR Reviewer Bot

## Our Experience Building This With Bob

This document answers the judges' question:
*"Provide feedback on your experience using the prompts and Bob throughout the development process."*

---

## What Worked Really Well

### 1. Bob as a Code Generator

The biggest win was using Bob to write the MCP server code.
We described what we wanted in plain English, and Bob produced working TypeScript
on the first try — with proper error handling, correct API calls, and clean structure.

Without Bob, writing that server from scratch would have taken a day or more of research
and trial and error. With Bob, it took a single conversation.

**Takeaway:** For well-defined technical tasks ("build this, using this library,
with these inputs and outputs"), Bob is extremely fast and accurate.

---

### 2. Bob as a Documentation Writer

Every document in this project was written with Bob. The quality was consistently good —
plain English, well-organized, correct. We could ask for a document, get a draft,
then refine it by saying things like "make this simpler" or "add a table comparing before and after."

The feedback loop was fast: prompt → draft → revision → done.

**Takeaway:** Bob is an excellent writing partner. It holds the full context of the
project and applies it consistently across all documents.

---

### 3. Combining MCP + Skills

The combination of an MCP server (for external connections) and a Skill file
(for review logic) worked very cleanly. Each piece has one job:
- MCP server = how to talk to GitHub
- Skill file = how to think about a code review

Bob understood this separation naturally and kept the two concerns clean.

**Takeaway:** MCP + Skills is a powerful pattern for building agentic tools.
Bob handles the orchestration automatically — you just define the pieces.

---

### 4. Agentic Chaining

Watching Bob chain 6 tool calls in sequence — without being asked to do each one —
was the most impressive part of the whole demo. You type one sentence and Bob:
reads the PR, reads the code, reads related files, checks existing comments,
writes the review, and posts it. All automatically.

**Takeaway:** Once the tools exist, Bob's ability to reason about what to do next
is genuinely impressive. The demo works because of this, not just despite it.

---

## What Was Harder Than Expected

### 1. Getting the Skill Instructions Right

The first version of the skill file produced inconsistent reviews.
Sometimes Bob would skip steps or produce output in a different format.
We had to iterate several times — being more explicit about the exact steps
and the exact output format — before it was reliably consistent.

**Lesson:** Skill files need to be specific and explicit. "Do a good review"
is not enough. "Follow these exact steps and always include file name + line number"
is what actually works.

---

### 2. GitHub's Own Rules Caused Surprises

GitHub doesn't allow posting a `REQUEST_CHANGES` review on your own PR —
it silently blocks it. This caused early demo runs to fail without an obvious error.
We had to switch to using `COMMENT` type reviews, which GitHub allows on your own PRs.

**Lesson:** When connecting Bob to external APIs, the external system has its
own rules that aren't always obvious. Testing the full end-to-end flow
(not just the AI part) is important.

---

### 3. Large PRs Need Limits

When a PR has hundreds of changed files, passing all of it to Bob at once
caused the response to be less focused. We added a limit on how many lines
of diff to include so Bob stays focused on the most important changes.

**Lesson:** Agentic tools need guardrails. Bob is good at reasoning, but
overwhelming it with too much input at once hurts quality.

---

## What We Would Do Differently

1. **Start with the Skill file, not the MCP server.** Getting the review logic
   right first would have made the MCP integration smoother, because we would
   have known exactly what data Bob needs before writing the code to fetch it.

2. **Test edge cases earlier.** We discovered the GitHub `REQUEST_CHANGES` blocker
   late. Hitting the GitHub API manually (with Postman or curl) before integrating
   would have caught this sooner.

3. **Version the Skill file.** As the team improved the review instructions,
   we didn't track what changed. A changelog in the skill file would help future teams
   know which version of the instructions they're running.

---

## Overall Assessment

Building with Bob is genuinely different from building with a traditional AI assistant.
The combination of:
- Natural language to code generation
- MCP tools for real-world connections
- Skill files for consistent behavior
- Automatic multi-step agentic execution

...adds up to something that can do real work, not just answer questions.

The PR Reviewer Bot is not a demo of what Bob *could* do someday.
It is a working tool that reviews real pull requests on real GitHub repositories,
posting structured feedback in under a minute. We use it in this project's own repo.

**The biggest shift in thinking:** Bob is not just a coding assistant.
It's an agent you can give tools and instructions to — and then get out of the way.
