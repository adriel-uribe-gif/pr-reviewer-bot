# PR Reviewer Bot 🤖

**Team:** Adriel Team | **IBM Bob-a-Thon 2025**

---

## Problem Statement

Code review is one of the most important steps in software development — and one of the
slowest and most inconsistent. When a developer finishes writing new code, they submit
it for review before it goes live. That submission is called a **Pull Request (PR)**.

Here's what happens on most engineering teams today:

- **PRs wait hours or days** — senior engineers are busy, so developers sit blocked waiting
- **Review quality is a lottery** — tired or distracted reviewers miss important bugs and security holes
- **Best engineers waste time on obvious stuff** — instead of big-picture thinking, they spend hours on things a computer could catch
- **Security vulnerabilities slip through** — hackers exploit these, which is costly and embarrassing

At IBM this is even bigger. Engineers submit code across hundreds of projects every single day.
Cut 30 minutes off each review, multiply across thousands of PRs per week — that's an
enormous amount of time saved, and fewer bugs reaching real customers.

---

## Our Solution

We built **PR Reviewer Bot** — a tool that uses IBM Bob to automatically do the first
pass of a code review in under a minute, then post the feedback directly to GitHub.

You type one message:
```
Review PR #1 in adriel-uribe-gif/demo-ecommerce-app
```

Bob automatically does all of this on its own:

| Step | What Bob does |
|---|---|
| 1 | Reads the PR title and description — understands what the change is trying to do |
| 2 | Reads every line of code that was added or removed |
| 3 | Reads surrounding files — for context, like reading a whole paragraph not just one sentence |
| 4 | Checks if anyone already left comments — so it doesn't repeat feedback |
| 5 | Writes a full structured review — bugs, security, tests, style |
| 6 | Posts the review directly to GitHub — live on the PR page |

**Total time: 15–45 seconds per PR. One message.**

### What the review always checks for:
- 🔑 Hardcoded secrets — API keys or passwords written directly in the code
- 💉 SQL injection — code that lets hackers run their own database commands
- 🔓 Missing authentication — pages anyone can access without logging in
- 💥 Null pointer crashes — code that crashes on empty or missing values
- 🧪 Missing tests — new code with no verification it actually works
- 🐛 Logic errors — things like charging a card before confirming it succeeded

### Before vs. After

| What we measure | Before | After our bot |
|---|---|---|
| Time to first review | Hours or days | 15–45 seconds |
| Consistency | Different every time | Same format, every time |
| Security checks | Only if reviewer remembers | Always checked, every PR |
| Senior engineer time | Wasted on basic mistakes | Freed up for real thinking |

---

## How It Works — Approach & Assumptions

Bob doesn't come with GitHub built in — they're completely separate. We built a bridge
that connects them. It has three pieces:

**1. The Bridge (MCP Server)**
A small program written in TypeScript that sits between Bob and GitHub.
It gives Bob 6 new abilities: list open PRs, read a PR, read code changes,
read files, check existing comments, and post a review.

**2. The Key Card (GitHub Token)**
A secret code that proves to GitHub that Bob is authorized to read and post.
Stored as an environment variable — never hardcoded.

**3. The Settings File (mcp.json)**
A config file that tells Bob the bridge exists and how to start it.
Without this, Bob wouldn't know the bridge was there.

**Key assumption:** The MCP server pattern (Model Context Protocol) is the right
abstraction for connecting Bob to external services. The MCP server handles the
*connection* and a separate Skill file handles the *thinking* — keeping them
cleanly separated so either can be changed independently.

---

## How Bob Was Used

Bob was used at every phase of this project — not just the final demo.

| Phase | Bob's role |
|---|---|
| **Design** | Bob designed the architecture — outlined the 6 tools needed and the MCP pattern |
| **Development** | Bob wrote all the TypeScript code for the MCP server (`mcp-server/src/index.ts`) |
| **Configuration** | Bob created the config files and wired everything together |
| **Testing** | Bob created 5 buggy pull requests in the demo GitHub repo |
| **Documentation** | Bob wrote all documentation files in plain English |
| **Presentation** | Bob built the HTML slideshow (`demo-presentation/index.html`) |
| **Live demo** | Bob reviews real PRs and posts structured feedback to GitHub in 15–45s |

**Example prompts used during development:**
> *"Build me a custom MCP server in TypeScript that connects Bob to GitHub with 6 tools..."*

> *"Create a Bob skill file that turns Bob into an expert code reviewer — always follow
> the same steps and always produce the review in the same structured format."*

> *"Create 5 pull requests in a GitHub demo repo with different realistic security bugs..."*

---

## How This Is Different From Other Tools

Tools like GitHub Copilot and CodeRabbit also do automated PR reviews. Here's the difference:

- **It stays inside IBM.** Other tools send your code to a third-party cloud. This uses
  IBM Bob, which runs internally — your code never leaves IBM's environment.

- **It's fully customizable.** The review checklist is a plain text file we control.
  IBM teams can add their own rules — IBM coding standards, internal security policies —
  and Bob will enforce them on every single PR.

- **It uses MCP + Skills together.** The MCP server handles the GitHub connection.
  The Skill file handles the review logic. This combination demonstrates the full
  capability of IBM Bob working across both features simultaneously.

---

## Project Structure

```
pr-reviewer-bot/
├── .bob/
│   ├── mcp.json.example          # Config template — copy to mcp.json and fill in your token
│   └── skills/pr-reviewer/
│       └── SKILL.md              # Bob's review instruction manual
├── mcp-server/
│   └── src/index.ts              # The MCP server — 6 GitHub tools in TypeScript
├── demo-presentation/
│   └── index.html                # 11-slide HTML slideshow (open in any browser)
├── PROBLEM_STATEMENT.md          # Full problem + solution writeup
├── HOW_IT_WORKS.md               # Plain-English technical explanation
├── HOW_WE_BUILT_IT.md            # Build story + technical appendix
├── PROMPT_AND_BOB_USAGE.md       # Every prompt used + Bob's role at each step
├── FEEDBACK_ON_BOB.md            # What worked, what was harder, lessons learned
└── SETUP_GUIDE.md                # Step-by-step setup for anyone installing it
```

**Demo repo with 5 buggy PRs:** https://github.com/adriel-uribe-gif/demo-ecommerce-app

---

## Setup (Quick Version)

1. Clone this repo
2. In `mcp-server/`: run `npm install` then `npm run build`
3. Copy `.bob/mcp.json.example` → `.bob/mcp.json`
4. Fill in your GitHub token and the full path to `mcp-server/dist/index.js`
5. Open the `pr-reviewer-bot` folder as your workspace in IBM Bob
6. Type: `Review PR #1 in adriel-uribe-gif/demo-ecommerce-app`

Full instructions: see [`SETUP_GUIDE.md`](SETUP_GUIDE.md)
