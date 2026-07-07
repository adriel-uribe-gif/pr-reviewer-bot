import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Octokit } from "@octokit/rest";
import { z } from "zod";
import "dotenv/config";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("WARN: GITHUB_TOKEN not set — running in unauthenticated mode (read-only, rate limited).");
}

const octokit = new Octokit({
  ...(token ? { auth: token } : {}),
  baseUrl: process.env.GITHUB_API_URL ?? "https://api.github.com",
});

const server = new McpServer({
  name: "pr-reviewer",
  version: "1.0.0",
});

// ─── Tool 1: Get Pull Request Details ────────────────────────────────────────
server.registerTool(
  "get_pull_request",
  {
    description:
      "Fetch metadata for a GitHub pull request — title, description, author, branch info, and current status.",
    inputSchema: {
      owner: z.string().describe("GitHub repository owner (username or org)"),
      repo: z.string().describe("Repository name"),
      pull_number: z.number().describe("Pull request number"),
    },
  },
  async ({ owner, repo, pull_number }) => {
    const { data: pr } = await octokit.pulls.get({ owner, repo, pull_number });
    const { data: files } = await octokit.pulls.listFiles({ owner, repo, pull_number });

    const summary = {
      number: pr.number,
      title: pr.title,
      description: pr.body ?? "(no description provided)",
      author: pr.user?.login,
      state: pr.state,
      base_branch: pr.base.ref,
      head_branch: pr.head.ref,
      commits: pr.commits,
      additions: pr.additions,
      deletions: pr.deletions,
      changed_files: pr.changed_files,
      files_changed: files.map((f) => ({
        filename: f.filename,
        status: f.status,
        additions: f.additions,
        deletions: f.deletions,
      })),
      created_at: pr.created_at,
      updated_at: pr.updated_at,
      url: pr.html_url,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
    };
  }
);

// ─── Tool 2: Get PR Diff ──────────────────────────────────────────────────────
server.registerTool(
  "get_pr_diff",
  {
    description:
      "Fetch the full unified diff of a pull request — the actual code changes across all files.",
    inputSchema: {
      owner: z.string().describe("GitHub repository owner"),
      repo: z.string().describe("Repository name"),
      pull_number: z.number().describe("Pull request number"),
    },
  },
  async ({ owner, repo, pull_number }) => {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner,
        repo,
        pull_number,
        headers: { accept: "application/vnd.github.v3.diff" },
      }
    );

    const diff = response.data as unknown as string;
    // Truncate very large diffs to avoid overflowing context
    const MAX_DIFF_CHARS = 80_000;
    const truncated = diff.length > MAX_DIFF_CHARS;
    const outputDiff = truncated ? diff.slice(0, MAX_DIFF_CHARS) + "\n\n[DIFF TRUNCATED — showing first 80k chars]" : diff;

    return {
      content: [{ type: "text", text: outputDiff }],
    };
  }
);

// ─── Tool 3: Get File Content from Repo ──────────────────────────────────────
server.registerTool(
  "get_file_content",
  {
    description:
      "Read the current contents of a file in a GitHub repository. Use this to get surrounding context for files changed in a PR.",
    inputSchema: {
      owner: z.string().describe("GitHub repository owner"),
      repo: z.string().describe("Repository name"),
      filepath: z.string().describe("Path to the file within the repository"),
      ref: z.string().optional().describe("Branch, tag, or commit SHA (defaults to default branch)"),
    },
  },
  async ({ owner, repo, filepath, ref }) => {
    const params: Parameters<typeof octokit.repos.getContent>[0] = {
      owner,
      repo,
      path: filepath,
    };
    if (ref) params.ref = ref;

    const { data } = await octokit.repos.getContent(params);

    if (Array.isArray(data) || data.type !== "file") {
      return {
        content: [{ type: "text", text: `'${filepath}' is a directory, not a file.` }],
      };
    }

    const content = Buffer.from(data.content, "base64").toString("utf-8");
    const MAX_FILE_CHARS = 40_000;
    const truncated = content.length > MAX_FILE_CHARS;
    const output = truncated ? content.slice(0, MAX_FILE_CHARS) + "\n\n[FILE TRUNCATED]" : content;

    return {
      content: [{ type: "text", text: `// ${filepath}\n\n${output}` }],
    };
  }
);

// ─── Tool 4: List PR Comments ─────────────────────────────────────────────────
server.registerTool(
  "list_pr_comments",
  {
    description:
      "Fetch all existing review comments and general comments on a pull request.",
    inputSchema: {
      owner: z.string().describe("GitHub repository owner"),
      repo: z.string().describe("Repository name"),
      pull_number: z.number().describe("Pull request number"),
    },
  },
  async ({ owner, repo, pull_number }) => {
    const [{ data: reviewComments }, { data: issueComments }] = await Promise.all([
      octokit.pulls.listReviewComments({ owner, repo, pull_number }),
      octokit.issues.listComments({ owner, repo, issue_number: pull_number }),
    ]);

    const combined = [
      ...issueComments.map((c) => ({
        type: "general",
        author: c.user?.login,
        body: c.body,
        created_at: c.created_at,
      })),
      ...reviewComments.map((c) => ({
        type: "inline",
        author: c.user?.login,
        file: c.path,
        line: c.line,
        body: c.body,
        created_at: c.created_at,
      })),
    ];

    return {
      content: [{ type: "text", text: JSON.stringify(combined, null, 2) }],
    };
  }
);

// ─── Tool 5: Post Review ──────────────────────────────────────────────────────
server.registerTool(
  "post_review",
  {
    description:
      "Post a formal code review to a GitHub pull request. Can APPROVE, REQUEST_CHANGES, or leave a COMMENT.",
    inputSchema: {
      owner: z.string().describe("GitHub repository owner"),
      repo: z.string().describe("Repository name"),
      pull_number: z.number().describe("Pull request number"),
      body: z.string().describe("The full review body — summary, findings, and recommendations"),
      event: z
        .enum(["APPROVE", "REQUEST_CHANGES", "COMMENT"])
        .describe("Review action: APPROVE, REQUEST_CHANGES, or COMMENT"),
    },
  },
  async ({ owner, repo, pull_number, body, event }) => {
    const { data: review } = await octokit.pulls.createReview({
      owner,
      repo,
      pull_number,
      body,
      event,
    });

    return {
      content: [
        {
          type: "text",
          text: `Review posted successfully!\nEvent: ${event}\nReview URL: ${review.html_url}`,
        },
      ],
    };
  }
);

// ─── Tool 6: List Open PRs ────────────────────────────────────────────────────
server.registerTool(
  "list_open_prs",
  {
    description: "List all open pull requests in a GitHub repository.",
    inputSchema: {
      owner: z.string().describe("GitHub repository owner"),
      repo: z.string().describe("Repository name"),
    },
  },
  async ({ owner, repo }) => {
    const { data: prs } = await octokit.pulls.list({
      owner,
      repo,
      state: "open",
      per_page: 30,
    });

    const summary = prs.map((pr) => ({
      number: pr.number,
      title: pr.title,
      author: pr.user?.login,
      base: pr.base.ref,
      head: pr.head.ref,
      draft: pr.draft,
      created_at: pr.created_at,
      url: pr.html_url,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
    };
  }
);

// ─── Start Server ─────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("PR Reviewer MCP Server running on stdio");
