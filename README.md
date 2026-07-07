# PR Reviewer Bot 🤖

## What Is This?

This is a tool that uses IBM's AI assistant **Bob** to automatically review code on GitHub.

Instead of waiting hours for a human to review code, you just type one message to Bob and
it does the whole review in 15–45 seconds — then posts the feedback directly to GitHub.

---

## What Is GitHub?

GitHub is a website where software developers store, share, and collaborate on code.
Think of it like Google Docs, but for code. Every change a developer makes gets saved
there, and other developers can leave comments and feedback on it.

---

## What Is a Pull Request (PR)?

When a developer writes new code, they don't add it to the main project right away.
They first submit it for review — that submission is called a **Pull Request (PR)**.

It's like saying: *"Hey, I made some changes. Can someone check my work before we
add it to the real product?"*

A reviewer then reads the new code and either:
- ✅ **Approves it** — looks good, merge it in
- 🔄 **Requests changes** — found some problems, please fix these first
- 💬 **Comments** — leaving notes without blocking the merge

---

## What Does Bob Do?

You just say to Bob:

> *"Review PR #42 in microsoft/vscode"*

Bob then automatically:

1. **Reads the pull request** — who wrote it, what it's trying to do
2. **Reads all the code changes** — every line that was added or removed
3. **Reads the surrounding code** — for extra context on how things work
4. **Checks existing comments** — so it doesn't repeat feedback already given
5. **Writes a full review** — with sections for bugs, security issues, and suggestions
6. **Posts it to GitHub** — the review appears live on the PR page

All of this happens in about 15 seconds with a single message.

---

## What Does the Review Look Like?

Bob always produces the review in the same clean format:

```
## PR Review: Add user authentication (#42)

### Summary
What the PR does and overall quality in 1-2 sentences.

### ✅ What's Good
- Things that are done well

### 🐛 Bugs & Logic Errors
- Specific file and line number where a bug was found, and how to fix it

### 🔒 Security Concerns
- Any security holes that could be exploited by hackers

### 🧪 Test Coverage
- Whether the new code has been properly tested

### Verdict
APPROVE / REQUEST_CHANGES / COMMENT — one sentence reason
```

---

## How to Use It

Once it's set up, just talk to Bob naturally. The formula is simple:

```
"Review PR #[number] in [owner]/[repo]"
```

- **`#[number]`** — the PR number (every PR has a unique one — you can see it on GitHub)
- **`[owner]`** — whose GitHub account the repo is under
- **`[repo]`** — the name of the project

### Examples

| What you type | What happens |
|---|---|
| `"Review PR #1 in adriel-uribe-gif/demo-ecommerce-app"` | Reviews PR #1 in that specific repo |
| `"Review PR #3 in adriel-uribe-gif/demo-ecommerce-app"` | Reviews PR #3 in the same repo |
| `"Review PR #324787 in microsoft/vscode"` | Reviews that PR in Microsoft's vscode repo |
| `"List open PRs in adriel-uribe-gif/demo-ecommerce-app"` | Shows all open PRs waiting for review |

This is how Bob knows exactly which PR you mean — even if there are multiple
repos and multiple PRs. The owner + repo name + PR number together point to
one specific submission, anywhere on GitHub.

Bob handles everything else.

---

## How It Was Built

This project has two main pieces:

1. **A custom connector** (called an MCP server) — a small program we wrote that
   lets Bob talk to GitHub. Without this, Bob has no way to read or post to GitHub.

2. **A skill file** — a set of instructions we gave Bob that tells it exactly how
   to do a code review, what to look for, and how to format the results.

---

## Who This Is For

This demo was built for the **IBM Bob-a-Thon** — IBM's internal hackathon for
showcasing what you can build with IBM Bob. It demonstrates how Bob can be
connected to external tools (like GitHub) to automate real engineering workflows.
