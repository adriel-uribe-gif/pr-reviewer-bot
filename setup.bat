@echo off
echo ================================================
echo  PR Reviewer Bot - One-Time Setup
echo ================================================
echo.

REM Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not on your PATH.
    echo.
    echo Please install Node.js from: https://nodejs.org  (LTS version)
    echo Then run this script again.
    pause
    exit /b 1
)

echo [OK] Node.js found:
node --version

echo.
echo [1/3] Installing dependencies...
cd mcp-server
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)

echo.
echo [2/3] Building TypeScript...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b 1
)

echo.
echo [3/3] Checking for .env...
if not exist ".env" (
    copy .env.example .env
    echo.
    echo [ACTION REQUIRED] Created mcp-server\.env
    echo Open it and replace 'your_github_token_here' with your real token.
    echo Get a token at: https://github.com/settings/tokens
    echo Required scope: repo  (or public_repo for public repos only)
) else (
    echo [OK] .env already exists.
)

cd ..
echo.
echo ================================================
echo  Setup complete!
echo ================================================
echo.
echo Next steps:
echo  1. Add your GitHub token to mcp-server\.env
echo  2. Open the pr-reviewer-bot\ folder in IBM Bob
echo  3. Enable 'pr-reviewer' in Bob's MCP settings tab
echo  4. Say: "Review PR #1 in owner/repo"
echo.
pause
