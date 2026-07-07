# Submission Checklist — PR Reviewer Bot

## Everything is ready. All you need to add is the video.

---

## Required Deliverables — Status

| # | Hackathon Requirement | File / Location | Status |
|---|---|---|---|
| 1 | Problem Statement and Solution | `PROBLEM_STATEMENT.md` | ✅ Ready |
| 2 | Working Code — GitHub Repo | `adriel-uribe-gif/demo-ecommerce-app` | ✅ Ready |
| 3 | 5-minute Video Demo | Your Teams recording | ⬜ Add to submission |
| 4 | Prompt and Bob Usage | `PROMPT_AND_BOB_USAGE.md` | ✅ Ready |
| 5 | Feedback on Usage of the Prompt | `FEEDBACK_ON_BOB.md` | ✅ Ready |

---

## What Goes in Each Monday.com Comment

### Comment 1 — Problem Statement
**Paste from:** `PROBLEM_STATEMENT.md`
Use the "So what's the problem?" section and the Impact table at the bottom.

### Comment 2 — Working Code / GitHub Repo
**Link:** https://github.com/adriel-uribe-gif/demo-ecommerce-app
Include a screenshot of the repo with the 5 open PRs visible.

### Comment 3 — Video Demo
**Upload:** Your Teams recording (download from OneDrive/Stream first)
5 minutes max. Shows Bob reviewing all 5 PRs and posting reviews to GitHub.

### Comment 4 — Prompt and Bob Usage
**Paste from:** `PROMPT_AND_BOB_USAGE.md`
The summary table at the bottom is especially useful to include.

### Comment 5 — Feedback on Usage
**Paste from:** `FEEDBACK_ON_BOB.md`
The "Overall Assessment" section at the bottom is a strong closer.

---

## Evaluation Criteria — How We Score

| Criterion | What judges look for | How we address it |
|---|---|---|
| **Use of Bob Across SDLC** | Did you use Bob beyond just coding? | Yes — design, coding, config, testing, docs, presentation |
| **Complexity of Enhancement** | Did you enhance an existing system? | We extended IBM Bob itself with a new MCP + Skill combination |
| **Agentic Best Practices** | Did you create reusable agentic patterns? | Yes — documented in `HOW_WE_BUILT_IT.md` and `PROMPT_AND_BOB_USAGE.md` |

---

## All Project Files — Quick Reference

```
pr-reviewer-bot/
├── PROBLEM_STATEMENT.md       → Deliverable #1 — The problem and solution
├── PROMPT_AND_BOB_USAGE.md    → Deliverable #4 — How we used Bob at each step
├── FEEDBACK_ON_BOB.md         → Deliverable #5 — Our experience and lessons learned
├── HOW_IT_WORKS.md            → Plain-English technical explanation
├── HOW_WE_BUILT_IT.md         → Build story + technical appendix
├── DEMO_SCRIPT.md             → Word-for-word video script
├── README.md                  → Project overview and how to use it
├── SETUP_GUIDE.md             → Step-by-step setup for anyone installing it
├── demo-presentation/
│   └── index.html             → 11-slide HTML slideshow (open in Chrome)
└── mcp-server/
    └── src/index.ts           → The MCP server code (GitHub bridge)
```

**GitHub demo repo:** https://github.com/adriel-uribe-gif/demo-ecommerce-app
- PR #1 — Payment processing (critical bugs) — reviewed ✅
- PR #2 — User registration (plain text passwords) — reviewed ✅
- PR #3 — Product search (crash bugs, SQL injection) — reviewed ✅
- PR #4 — Admin dashboard (zero authentication) — reviewed ✅
- PR #5 — Clean bug fix — approved ✅

---

## The One Sentence That Answers "How Is This Different?"

> *"Other tools send your code to a third-party cloud. This runs on IBM Bob internally,
> uses IBM's own AI, and can be customized to enforce IBM-specific coding and security standards."*

Use this if a judge asks how this compares to GitHub Copilot or CodeRabbit.
