# Setup Guide — PR Reviewer Bot

## How to Get This Running on Your Own Bob

You don't need to know how to code to follow this.
Just go step by step and it'll be working in about 10 minutes.

---

## Before You Start — 3 Things You Need

**1. IBM Bob** — installed on your computer

**2. Node.js** — a free program that runs our bridge server.
Download it at 👉 https://nodejs.org
Click the big green **"LTS"** button to download the right version.

**3. A GitHub account** — free at 👉 https://github.com

---

## Step 1 — Get the Project onto Your Computer

Get a copy of the `pr-reviewer-bot` folder and save it somewhere easy to find —
like your Desktop.

---

## Step 2 — Set Up the Bridge (One Time Only)

The bridge between Bob and GitHub needs to be built once before it can be used.

Open your terminal:
- On **Windows**: search for "PowerShell" in the Start menu and open it
- On **Mac**: search for "Terminal" in Spotlight and open it

Then type these commands one at a time, pressing Enter after each:

```
cd Desktop\pr-reviewer-bot\mcp-server
npm install
npm run build
```

What those commands do:
- **`cd ...`** — moves you into the right folder
- **`npm install`** — downloads all the small pieces the bridge needs to work
- **`npm run build`** — assembles everything into a finished, runnable program

When it's done you'll see a new folder called `dist` appear inside `mcp-server`.
That's the finished bridge — you're ready for the next step.

---

## Step 3 — Get Your GitHub Key Card

The bridge needs permission to read and post to GitHub.
Here's how to get that permission:

1. Go to 👉 https://github.com/settings/tokens/new
   *(Make sure you're logged into your GitHub account)*

2. In the **"Note"** box, type anything — like: `Bob PR Reviewer`

3. Under **"Expiration"**, choose **90 days**

4. Scroll down to the **"Select scopes"** section and check the box next to **`repo`**
   *(it's the very first checkbox in the list)*

5. Scroll all the way to the bottom and click **"Generate token"**

6. 🚨 **Copy the token right now** — GitHub only shows it once and then it's gone forever.
   It will look something like: `ghp_abc123xyz456...`

Paste it somewhere safe temporarily (like a Notepad file) while you finish setup.

---

## Step 4 — Tell Bob Where the Bridge Is

Inside the project folder, find and open this file:
📄 `.bob/mcp.json`

It will look like this:

```
{
  "mcpServers": {
    "pr-reviewer": {
      "command": "node",
      "args": ["YOUR_PATH_HERE\\mcp-server\\dist\\index.js"],
      "env": {
        "GITHUB_TOKEN": "ghp_paste_your_token_here",
        "GITHUB_API_URL": "https://api.github.com"
      }
    }
  }
}
```

You need to change **two things**:

**1. Replace `YOUR_PATH_HERE`** with the full location of the project on your computer.

To find this on Windows:
- Open the `pr-reviewer-bot` folder in File Explorer
- Click the address bar at the top — it shows the full path
- Copy that path and paste it in

Example of what it should look like:
```
C:\\Users\\YourName\\Desktop\\pr-reviewer-bot\\mcp-server\\dist\\index.js
```

*(Note: use double backslashes `\\` between each folder name)*

**2. Replace `ghp_paste_your_token_here`** with the token you copied in Step 3.

Save the file when you're done.

---

## Step 5 — Open the Project in Bob

Open IBM Bob and open the `pr-reviewer-bot` folder as your workspace.

Bob will automatically find the settings file, connect to the bridge,
and the GitHub tools will be ready to use.

---

## You're All Set! Try These:

Type any of these messages to Bob:

> *"List open PRs in microsoft/vscode"*

> *"Review PR #1 in adriel-uribe-gif/demo-ecommerce-app"*

> *"Review PR #3 in adriel-uribe-gif/demo-ecommerce-app and post the feedback to GitHub"*

Bob handles everything from there.

---

## Something Not Working?

| What you're seeing | What to do |
|---|---|
| Bob says it doesn't know the tool | The path in `mcp.json` is probably wrong — make sure it ends with `mcp-server\\dist\\index.js` |
| GitHub says "Unauthorized" or "Bad credentials" | Your token expired or was copied wrong — go back to Step 3 and create a new one |
| The review shows up as a comment, not a change request | This is normal — GitHub doesn't allow requesting changes on your own PRs |
| `npm run build` shows a red error | Node.js might not be installed — open a terminal and type `node --version` to check |
| Nothing happens when you talk to Bob | Make sure you opened the `pr-reviewer-bot` folder as the workspace, not a subfolder |
