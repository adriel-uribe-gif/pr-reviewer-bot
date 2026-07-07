# How It Works — PR Reviewer Bot

---

## The Short Version

Bob is an AI assistant. GitHub is the website where developers store and share code.
Out of the box, Bob has no idea GitHub exists — they're completely separate.

We built a bridge that connects them. Now Bob can read code, spot problems, and post
reviews on GitHub — all from a single message.

---

## The Bridge Has 3 Pieces

### 🔧 Piece 1 — The Bridge Program (MCP Server)

We wrote a small program that sits between Bob and GitHub.
Think of it like a translator — Bob speaks "AI", GitHub speaks "API",
and our bridge translates between the two.

The bridge gives Bob 6 abilities it didn't have before:

| # | Ability | What it means in plain English |
|---|---|---|
| 1 | List open PRs | "Show me all the code submissions waiting for review" |
| 2 | Read a PR | "Tell me what this submission is trying to do" |
| 3 | Read the code changes | "Show me exactly what lines of code were added or removed" |
| 4 | Read surrounding files | "Let me read the rest of the codebase for context" |
| 5 | Check existing comments | "Has anyone already left feedback on this?" |
| 6 | Post a review | "Submit my review back to GitHub" |

Think of these like **buttons on a remote control** — Bob presses a button,
the bridge goes and does the action on GitHub, and brings the answer back.

---

### 🔑 Piece 2 — The GitHub Token (Key Card)

For the bridge to actually get into GitHub and read or post things, it needs permission.
That permission comes in the form of a **token** — a long secret code that acts like a key card.

When the bridge shows GitHub this token, GitHub says:
*"OK, you're authorized — here's the data you asked for."*

Without the token, the bridge gets blocked at the door.

---

### 📋 Piece 3 — The Settings File (Contact List)

There's a small settings file inside the project (`mcp.json`) that tells Bob:
- *"Hey, there's a bridge program available"*
- *"Here's how to start it"*
- *"Here's the token to use when it runs"*

Without this file, Bob wouldn't even know the bridge exists.
It's like having a phone but no contact saved — you can't call anyone.

---

## How It All Flows Together

Here's the full journey from your message to a review on GitHub:

```
You type: "Review PR #1 in adriel-uribe-gif/demo-ecommerce-app"
                        ↓
        Bob sees you mentioned a PR and a repo.
        Bob knows it has GitHub tools available.
                        ↓
        Bob uses the bridge to call GitHub:
        → "Give me the details of PR #1"
        → "Give me all the code changes"
        → "Give me the files around those changes"
        → "Are there any existing comments?"
                        ↓
        GitHub sends all that information back through the bridge.
                        ↓
        Bob reads everything and thinks:
        "What bugs are here? Any security issues?
         What's missing? What's done well?"
                        ↓
        Bob writes a full structured review.
                        ↓
        Bob uses the bridge to post the review to GitHub.
                        ↓
        The review appears live on the PR page. ✅
```

**Total time: 15–45 seconds per PR, depending on how much code changed.**

---

## The Simple Analogy

Imagine you hired a brilliant assistant to review documents for you.

- 🤖 **Bob** = the brilliant assistant doing the thinking
- 📱 **The bridge (MCP Server)** = the phone the assistant uses to get documents
- 🔑 **The token** = the building key card to get into the file room
- 🌐 **GitHub** = the file room where all the documents live
- 📋 **mcp.json** = the assistant's address book (knows where the file room is)

You just say *"review this document"* — and the assistant handles everything:
makes the call, gets the files, reads them, writes the review, and files it away.
