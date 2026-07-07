# How We Built It — PR Reviewer Bot

---

## The Big Picture

We built this entire project using IBM Bob itself.
Bob didn't just end up being the product — it was also our builder.
We described what we wanted in plain English, and Bob wrote the code.

Here's how it came together in 4 steps.

---

## Step 1 — We Asked Bob to Build the Bridge

The first thing we needed was a way for Bob to talk to GitHub.
Bob doesn't come with GitHub built in — it's just an AI assistant.

So we asked Bob to build the bridge program (explained in `HOW_IT_WORKS.md`).

**We said to Bob:**
> *"Build me a connector that lets you talk to GitHub. It needs to be able to
> read pull requests, read code changes, read files, see existing comments,
> and post reviews."*

**Bob built the whole thing.** It wrote all the code, set up all the files,
and made it ready to use. We didn't write that code ourselves — Bob did.

---

## Step 2 — We Taught Bob How to Do a Code Review

Just having the bridge wasn't enough. Bob could now *read* GitHub,
but it didn't know *how* to do a good code review.

So we created something called a **skill** — basically a written instruction manual
we gave to Bob that tells it:

- What steps to always follow
  (read the PR → read the code → check for existing comments → write review → post it)
- What to always look for
  (bugs, security holes, missing tests, hard-to-read code)
- How to always format the output
  (same sections every time, always include the exact file and line number)

**We said to Bob:**
> *"Create a skill that turns you into an expert code reviewer. Always follow
> the same steps and always produce the review in the same structured format."*

**Bob wrote its own instruction manual.** This is what makes every review
consistent — no matter who asks for it, no matter what PR, Bob follows the
same checklist every single time.

---

## Step 3 — We Wired Everything Together

With the bridge built and the instruction manual written, we needed to tell Bob
*where* everything lives so it all loads up automatically.

**We said to Bob:**
> *"Set up the project so the GitHub bridge and the review skill are automatically
> ready every time I open this project in Bob."*

Bob updated the settings files so everything connects on its own.
Open the project, and it's ready to go — no manual setup each time.

---

## Step 4 — The Live Demo

This is where everything comes together. You type one message:

> *"Review PR #1 in adriel-uribe-gif/demo-ecommerce-app"*

And Bob does all of this on its own:

| Step | What Bob does |
|---|---|
| 1 | Reads the PR title and description — understands what the change is trying to do |
| 2 | Reads every line of code that was added or removed |
| 3 | Reads the surrounding files — for context, like reading a whole paragraph not just one sentence |
| 4 | Checks if anyone already left comments — so it doesn't repeat feedback |
| 5 | Writes a full structured review — bugs, security, tests, style |
| 6 | Posts the review directly to GitHub — live on the PR page |

**Total time: 15–45 seconds per PR. One message.**

---

## What Makes This Stand Out

### 🤖 It acts on its own
Bob doesn't just answer a question — it takes 6 actions in a row, completely
on its own, without being asked to do each one individually.
You give it one instruction and it runs the whole process.

### 📋 It's always consistent
Because Bob has a written skill (its instruction manual), every review looks
exactly the same. Same sections, same checklist, same level of detail — every time.
A human reviewer might miss things when tired or rushing. Bob doesn't.

### 🔗 It works where developers already are
The review doesn't just appear in a chat window.
It gets posted directly to GitHub — where the developer is already working.
It fits right into the existing workflow with zero extra steps for the developer.

### ⚡ It's fast
What takes a human 30–60 minutes takes Bob 15–45 seconds.

### 🏢 It stays inside IBM
Unlike third-party tools like CodeRabbit or GitHub Copilot, your code never
leaves IBM's environment. Bob runs internally, which matters for security-sensitive
or proprietary codebases.

---

## Technical Appendix — How the MCP Server Works

For those who want to understand the technical side:

We built a custom **MCP server** (Model Context Protocol) in TypeScript that gives
Bob 6 new abilities it didn't have before. Here's exactly what each one does:

| # | Plain English (from HOW_IT_WORKS.md) | Tool name | GitHub API call |
|---|---|---|---|
| 1 | List open PRs | `list_open_prs` | `GET /repos/{owner}/{repo}/pulls` |
| 2 | Read a PR | `get_pull_request` | `GET /repos/{owner}/{repo}/pulls/{number}` |
| 3 | Read the code changes | `get_pr_diff` | `GET /repos/{owner}/{repo}/pulls/{number}/files` |
| 4 | Read surrounding files | `get_file_content` | `GET /repos/{owner}/{repo}/contents/{path}` |
| 5 | Check existing comments | `list_pr_comments` | `GET /repos/{owner}/{repo}/pulls/{number}/comments` |
| 6 | Post a review | `post_review` | `POST /repos/{owner}/{repo}/pulls/{number}/reviews` |

Bob calls these tools automatically in sequence — no human prompting between steps.
The review checklist logic lives in a separate **Skill file** (`SKILL.md`), which means
the MCP server handles the *connection* and the Skill handles the *thinking*.
This combination of MCP + Skills is what makes the bot both reliable and customizable.

---

## Things We Learned

**1. The instruction manual is everything.**
Without the skill file, Bob's reviews were inconsistent — sometimes great,
sometimes missing big things. Once we wrote the instruction manual,
every review became structured and thorough.

**2. Big code changes need a limit.**
If a PR changes thousands of lines of code, it can be too much to process at once.
We added a limit so Bob only reads the most important parts and stays focused.

**3. You need the right permission to post.**
To post a review back to GitHub, Bob needs a token with write access.
A read-only token lets Bob read everything but silently fails when trying to post.

**4. The live demo is the wow moment.**
Watching Bob chain 6 automatic tool calls and post a real review to a real GitHub PR
in 15–45 seconds — that's what gets people's attention.
