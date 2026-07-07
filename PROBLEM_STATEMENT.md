# The Problem We're Solving — PR Reviewer Bot

---

## First, what is a Pull Request (PR)?

When a software developer finishes writing new code, they can't just add it to the main
project immediately. They have to submit it for review first — kind of like turning in an
essay for a teacher to check before it gets published. That submission is called a
**Pull Request (PR)**.

Another developer (or a senior engineer) then reads through all the new code, looks for
mistakes, security problems, or anything that could break the app, and leaves feedback.
Once the feedback is addressed, the code gets approved and added to the product.

---

## So what's the problem?

This review process is really important — but it's also really slow and inconsistent.

Here's what typically happens on software teams today:

- 😴 **PRs wait hours or even days** before anyone looks at them, because senior engineers
  are busy. The developer who wrote the code just sits there waiting.

- 🎲 **Review quality is a lottery.** If your reviewer is tired, distracted, or unfamiliar
  with that part of the codebase, important bugs or security holes get missed.

- 👨‍💼 **The best engineers waste time on obvious stuff.** Instead of thinking about big
  picture architecture, they spend hours catching small typos and formatting issues that
  a computer could easily spot.

- 🔓 **Security vulnerabilities slip through.** Hackers exploit these — and they can be
  very costly or embarrassing for a company.

---

## Why does this matter at IBM?

IBM engineers write and submit code across hundreds of different projects every single day.
If we can cut even 30 minutes off how long each review takes, multiplied across thousands
of PRs every week — that's an enormous amount of developer time saved. And more
importantly, it means fewer bugs and security holes reaching real customers.

---

## Our Solution: PR Reviewer Bot

We built a tool called **PR Reviewer Bot** that uses IBM's AI assistant (called **Bob**)
to do the first pass of a code review automatically — typically in under a minute.

Here's how it works, in plain terms:

1. 🧑‍💻 A developer finishes their code and submits it for review on GitHub
   (GitHub is just the website where code is stored and shared)

2. 💬 Someone types a simple message to Bob, like:
   **"Review PR #42 in our project"**

3. 🤖 Bob automatically goes to GitHub, reads all the new code changes,
   looks at the surrounding code for context, and checks if anyone has already
   left comments

4. 🔍 Bob analyzes everything and looks for specific, concrete problems:
   - **Hardcoded secrets** — API keys or passwords written directly in the code
   - **SQL injection** — code that lets hackers run their own database commands
   - **Missing authentication** — pages or actions anyone can access without logging in
   - **Null pointer crashes** — code that crashes when it gets an empty or missing value
   - **Missing tests** — new code with no verification that it actually works
   - **Logic errors** — things like charging a card before confirming it succeeded

5. ✅ Bob posts a detailed, structured review directly back to GitHub —
   with exact file names and line numbers for every issue found

---

## How Is This Different From Other AI Review Tools?

Tools like GitHub Copilot or CodeRabbit also do automated PR reviews.
Here's what makes this different:

- **It runs inside IBM.** It uses IBM Bob, which means it respects IBM's data and
  security policies. Your code never leaves IBM's environment to go to a third-party service.

- **It's customizable.** The review checklist is a plain text file we control.
  IBM teams can add their own specific rules — IBM coding standards, security policies,
  internal patterns — and Bob will check for those on every single PR.

- **It uses both MCP and Skills together.** The MCP server handles the GitHub connection.
  The Skill file handles the review logic. Together they demonstrate the full power of
  what IBM Bob can do — not just one capability, but both working in combination.

---

## The Impact

| What we're measuring | Before our bot | After our bot |
|---|---|---|
| Time to get a first review | Hours or days | 15–45 seconds |
| Consistency of reviews | Different every time | Same format, every time |
| Security checks | Only if the reviewer remembers | Always checked, every PR |
| Senior engineer time | Wasted on basic mistakes | Freed up for real thinking |

---

## The Bottom Line

We're not replacing human reviewers. We're giving them a smart assistant that does the
boring, time-consuming parts instantly — so humans can focus on the parts that actually
require human judgment.
