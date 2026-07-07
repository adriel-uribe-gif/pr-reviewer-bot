# Demo Script — PR Reviewer Bot

## Slide-by-slide script. Read the bold lines. Freestyle around them.

---

## Before You Start Recording

- IBM Bob is open with `pr-reviewer-bot` as your workspace
- The slideshow (`demo-presentation/index.html`) is open in Chrome
- GitHub is open to `github.com/adriel-uribe-gif/demo-ecommerce-app`
- You're on **Slide 1**

---

## Slide 1 — Title Slide
**"PR Reviewer Bot — IBM Bob-a-Thon Demo"**

**Say:**
> *"Hi, my name is Adriel and this is PR Reviewer Bot. It uses IBM Bob to automatically
> review code submissions on GitHub — and it does it in under a minute, with a single message."*

➡️ **Click to Slide 2**

---

## Slide 2 — The Problem
**"Code review is broken"**

**Say:**
> *"Let me set the stage. When developers write new code, they can't just add it to the
> product directly. They submit it for someone else to check first — that's called a
> Pull Request, or PR.*
>
> *The problem is this process is slow and inconsistent. PRs wait hours or days because
> senior engineers are busy. When they finally look, they're tired or rushed — so important
> bugs get missed. And security holes? They slip through all the time. Hackers love that."*

➡️ **Click to Slide 3**

---

## Slide 3 — Why It Matters at IBM
**"The scale of the problem"**

**Say:**
> *"At IBM this is even bigger. We have engineers submitting code across hundreds of projects
> every single day. Cut just 30 minutes off each review, multiply that across thousands of
> PRs a week — that's an enormous amount of time saved. And look at this table —
> right now reviews take hours or days, quality is different every time, and security checks
> only happen if the reviewer remembers to do them. Our bot changes all four of those."*

➡️ **Click to Slide 4**

---

## Slide 4 — Our Solution
**"PR Reviewer Bot"**

**Say:**
> *"Here's how it works. You type one message to Bob. Bob reads the PR, reads all the
> code changes, reads the surrounding files for context, checks if anyone already left
> comments — then it analyzes everything for bugs, security holes, missing tests, and
> style issues. And it posts the full review directly to GitHub. One message.
> 15 to 45 seconds.*
>
> *We're not replacing human reviewers. We're giving them a smart assistant that does
> the boring, time-consuming parts instantly — so humans can focus on the parts that
> actually need human judgment."*

➡️ **Click to Slide 5**

---

## Slide 5 — How Bob Connects to GitHub
**"How Bob connects to GitHub"**

**Say:**
> *"Quick technical slide — how does this actually work? Bob doesn't come with GitHub
> built in. We built a bridge that connects them. It has three pieces.*
>
> *First, the bridge itself — a small program we wrote called an MCP server.
> Think of it like a translator between Bob and GitHub.*
>
> *Second, a key card — a GitHub token that proves Bob is authorized to read and post.*
>
> *Third, a settings file that tells Bob the bridge exists. Without that,
> Bob wouldn't even know it was there — like having a phone with no contacts.*
>
> *Bottom line: Bob is the assistant doing the thinking, the MCP server is the phone
> it uses to reach GitHub, and the token is the key to get in."*

➡️ **Click to Slide 6**

---

## Slide 6 — How This Is Different
**"How this is different"**

**Say:**
> *"A judge might ask — why not just use GitHub Copilot or CodeRabbit? Fair question.*
>
> *Three reasons. First: this stays inside IBM. Other tools send your code to a
> third-party cloud. This uses IBM Bob, which runs internally — your code never leaves
> IBM's environment.*
>
> *Second: it's fully customizable. The review checklist is a plain text file we control.
> IBM teams can add their own rules — IBM coding standards, internal security policies —
> and Bob will enforce them on every single PR. No third-party tool gives you that.*
>
> *Third: it uses MCP and Skills together. The bridge handles the GitHub connection.
> The skill file handles the review logic. That combination is exactly what the Bob-a-Thon
> is asking teams to demonstrate."*

➡️ **Click to Slide 7**

---

## Slide 7 — Our Demo Repo
**"Our demo repo"**

**Say:**
> *"OK — let's actually do this. Here's our demo repository. It's a simulated
> e-commerce store with five pull requests waiting to be reviewed. Each one has
> different bugs — some small, some catastrophic. PR 5 is the clean one — it gets approved.*
>
> *Let's go through them one by one. I'll switch over to Bob."*

**Switch to IBM Bob.**

➡️ **Click to Slide 8**

---

## Slide 8 — PR #1 & #2 (Payment & Registration)

### PR #1 — Payment Processing

**Say:**
> *"PR number one is a payment processing feature. All I type is one sentence."*

**Type to Bob:**
```
Review PR #1 in adriel-uribe-gif/demo-ecommerce-app
```

**While Bob is working, narrate:**
> *"Watch what Bob is doing — it's pulling up the PR description, reading every line
> of code that was added, pulling up other files for context, checking existing comments…"*

**When the review appears:**
> *"There it is. A developer accidentally left code that prints customers' credit card
> numbers directly into the server logs. Bob also found SQL injection, an unprotected
> refund endpoint, a hardcoded API key, and a logic error where the order gets marked
> as paid before the payment actually goes through. A human reviewer might catch one or
> two of these. Bob caught all five."*

### PR #2 — User Registration

**Type to Bob:**
```
Review PR #2 in adriel-uribe-gif/demo-ecommerce-app
```

**When the review appears:**
> *"User registration — and Bob immediately spotted that passwords are being saved
> in plain text. If this database ever got hacked, every user's password would be
> immediately readable. It also found that new passwords are being sent back in
> the API response — so anyone watching network traffic could steal them.
> These are exactly the bugs that cause the data breaches you read about in the news."*

➡️ **Click to Slide 9**

---

## Slide 9 — PR #3 & #4 (Search & Admin)

### PR #3 — Product Search

**Type to Bob:**
```
Review PR #3 in adriel-uribe-gif/demo-ecommerce-app
```

**When the review appears:**
> *"Search feature. Bob found a bug where the server completely crashes if a search
> returns no results — that would take down the whole store. Another SQL injection.
> And a performance problem where the code loads the entire product database into memory
> every time someone clicks 'related products'. Fine with 10 products. With 100,000
> products, it would grind the server to a halt."*

### PR #4 — Admin Dashboard

**Type to Bob:**
```
Review PR #4 in adriel-uribe-gif/demo-ecommerce-app
```

**When the review appears:**
> *"This one is the most dangerous. A developer built an admin dashboard and put
> absolutely zero login checks on any of the pages. Literally anyone on the internet
> could go to the right URL and see every customer's email, address, and phone number.
> They could delete user accounts. They could see the company's total revenue.
> Bob flagged it immediately."*

➡️ **Click to Slide 10**

---

## Slide 10 — PR #5 (The Clean Fix)

**Say before typing:**
> *"Now here's the important one. Bob isn't just a tool that finds problems.
> Let's look at PR 5 — this one was written by a developer who did everything right."*

**Type to Bob:**
```
Review PR #5 in adriel-uribe-gif/demo-ecommerce-app
```

**When the review appears:**
> *"Bob approved it. It recognized safe parameterized queries, proper input validation,
> correct stock checking, helpful error messages, and clean readable code. Bob gave it
> the green light.*
>
> *That's important — this isn't a tool that just complains about everything.
> It recognizes good work too. And it gives the same fair, consistent review
> whether it's 2pm on a Tuesday or 2am the night before a deadline."*

➡️ **Switch back to the slideshow. Click to Slide 11.**

---

## Slide 11 — Closing
**"The bottom line"**

**Say:**
> *"Five pull requests. Five complete, structured reviews. Posted directly to GitHub.
> Each one in under a minute. On a real engineering team, that same work might take
> a senior engineer the better part of a day — and they'd still miss things.*
>
> *It acts on its own — six automatic actions from one message.
> It's always consistent — same checklist every time, never tired, never distracted.
> It stays inside IBM — your code never leaves IBM's environment.
> And it's fully customizable — IBM teams can add their own rules to the checklist.*
>
> *This is IBM Bob — connected to the real world, doing real work. Thank you."*

---

## Tips

- 🗣️ **Talk while Bob is working** — don't let there be silence. Narrate what you see Bob doing.
- 📌 **Point out one specific bug out loud** on each PR — reading one real finding lands harder than summarizing.
- ⏱️ **Don't rush** — the 15–45 second wait is part of the wow factor.
- ✅ **End on PR #5** — finishing with an APPROVE shows balance and makes a strong close.
- 🎙️ **Freestyle is fine** — these are talking points, not a script to read word for word.

---

## If a Judge Asks…

**"How is this different from GitHub Copilot?"**
> *"Copilot sends your code to Microsoft's servers. This runs on IBM Bob internally —
> your code never leaves IBM's environment. And we control the review checklist,
> so IBM teams can add their own specific standards to every review."*

**"Could this work on real IBM repos?"**
> *"Yes — you just point it at any GitHub repo and PR number. The only thing needed
> is a GitHub token with access to that repo."*

**"How long did it take to build?"**
> *"The core was built in a single day using Bob itself. Bob wrote the MCP server code,
> wrote its own skill file, and wrote all the documentation."*
