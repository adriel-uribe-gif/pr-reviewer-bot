# Prompt and Bob Usage — PR Reviewer Bot

## How Did We Use Bob? At Every Step.

This document answers two questions the judges asked:
- *"Show us the prompts — how did you do it?"*
- *"At which steps did you use Bob (with examples)?"*

The short answer: **we used Bob for everything.** Not just the final demo —
Bob was our designer, our coder, our writer, and our tester throughout the entire project.

---

## Step 1 — Designing the System

Before writing a single line of code, we used Bob to think through the architecture.

**Prompt we used:**
> *"I want to build a bot that uses IBM Bob to automatically review GitHub pull requests
> and post the review back to GitHub. What pieces would I need to build? What's the
> simplest way to connect Bob to GitHub?"*

**What Bob did:**
Bob explained the MCP (Model Context Protocol) server pattern — the idea of building
a small bridge program that gives Bob new abilities it doesn't have by default.
It outlined exactly what 6 tools we'd need: list PRs, read a PR, read code changes,
read files, check comments, and post a review. This became the blueprint for the
entire project.

---

## Step 2 — Building the MCP Server (The GitHub Bridge)

Once we knew what to build, we asked Bob to build it.

**Prompt we used:**
> *"Build me a custom MCP server in TypeScript that connects Bob to GitHub.
> It needs 6 tools: list_open_prs, get_pull_request, get_pr_diff, get_file_content,
> list_pr_comments, and post_review. Use the GitHub REST API and the Octokit library.
> Read the GitHub token from an environment variable called GITHUB_TOKEN."*

**What Bob did:**
Bob wrote the entire MCP server — all the TypeScript code, the package.json,
the build configuration, and the environment variable setup. We didn't write
any of this code ourselves. Bob produced a working, compilable program
that connected to GitHub on the first try.

**File it created:** `mcp-server/src/index.ts`

---

## Step 3 — Writing the Review Skill

Having the bridge wasn't enough — Bob needed to know *how* to do a good code review.

**Prompt we used:**
> *"Create a Bob skill file that turns Bob into an expert code reviewer.
> The skill should tell Bob to always: read the PR, read all code changes,
> read surrounding files for context, check for existing comments, write a structured review,
> and post it to GitHub. The review must always check for: hardcoded secrets, SQL injection,
> missing authentication, null pointer crashes, missing tests, and logic errors.
> Always include exact file names and line numbers for every finding."*

**What Bob did:**
Bob wrote its own instruction manual — the skill file that now lives at
`.bob/skills/pr-reviewer/SKILL.md`. This file is what makes every review
consistent and thorough. Bob essentially wrote the rules it follows.

---

## Step 4 — Wiring Everything Together

We needed Bob to automatically find the bridge and skill every time the project opens.

**Prompt we used:**
> *"Set up the project so the GitHub MCP server and the PR reviewer skill are
> automatically loaded whenever I open this workspace in Bob. Create the mcp.json
> config file in the .bob folder."*

**What Bob did:**
Bob created `.bob/mcp.json` with the correct configuration schema and wired
the MCP server path and GitHub token to the right environment variables.
Opening the workspace is now all that's needed — everything loads automatically.

---

## Step 5 — Creating the Demo Repo with Realistic Bugs

We needed a GitHub repository full of intentionally buggy pull requests
to demonstrate the bot's capabilities during the demo.

**Prompt we used:**
> *"Create 5 pull requests in a GitHub demo repo. Each PR should have different
> realistic security bugs and coding mistakes: PR 1 — payment processing with
> hardcoded API keys and SQL injection; PR 2 — user registration with plain text
> passwords; PR 3 — product search with crash bugs and performance issues;
> PR 4 — admin dashboard with zero authentication; PR 5 — a clean, correct bug fix
> that should get approved."*

**What Bob did:**
Bob created all the code files for each feature, committed them to branches,
and opened all 5 pull requests on GitHub — including writing realistic PR descriptions
and planting the right bugs in the right places.

**GitHub repo:** `adriel-uribe-gif/demo-ecommerce-app`

---

## Step 6 — Writing All Documentation

Every document in this project was written with Bob.

**Prompts we used (examples):**
> *"Write a plain-English explanation of what a Pull Request is and why code review
> is slow and inconsistent — written so a non-technical person can understand it."*

> *"Write a HOW_IT_WORKS document using a phone/bridge analogy to explain the MCP server."*

> *"Write a demo script with word-for-word narration for each PR, including what to
> show on screen and what to say while Bob is processing."*

**What Bob did:**
Bob wrote `PROBLEM_STATEMENT.md`, `HOW_IT_WORKS.md`, `HOW_WE_BUILT_IT.md`,
`DEMO_SCRIPT.md`, `README.md`, `SETUP_GUIDE.md`, and this document — all in
plain, simple English with no jargon.

---

## Step 7 — Building the Demo Presentation

**Prompt we used:**
> *"Build an 11-slide HTML demo presentation covering: title, problem, IBM impact,
> solution, how it works, the 5 PRs we'll review, what Bob does behind the scenes,
> the live demo prompt, the differentiation vs other tools, and a closing slide.
> Make it look like a clean professional slide deck."*

**What Bob did:**
Bob produced the complete self-contained HTML slideshow at `demo-presentation/index.html`.
It works in any browser with no internet connection required.

---

## Summary — Where Bob Was Used Across the SDLC

| Phase | What we did | Bob's role |
|---|---|---|
| **Design** | Planned the architecture | Bob designed the system |
| **Development** | Built the MCP server | Bob wrote all the TypeScript code |
| **Configuration** | Set up auto-loading | Bob wrote the config files |
| **Testing** | Created demo data | Bob created the buggy PRs on GitHub |
| **Documentation** | Wrote all 6 docs | Bob wrote all the plain-English content |
| **Presentation** | Built the slide deck | Bob produced the HTML slideshow |
| **Live Demo** | Reviewing real PRs | Bob reviews and posts to GitHub in 15–45s |

Bob was used at every single phase — from the first design conversation to the live demo.
