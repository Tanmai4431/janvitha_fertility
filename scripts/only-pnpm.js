#!/usr/bin/env node

// Script to enforce pnpm package manager execution across the monorepo workspace
const userAgent = process.env.npm_config_user_agent || '';

if (!userAgent.startsWith('pnpm')) {
  const usedPM = userAgent.split(' ')[0] || 'npm';
  console.error(`
\x1b[41m\x1b[37m\x1b[1m ATTENTION: WRONG PACKAGE MANAGER DETECTED \x1b[0m

\x1b[31m\x1b[1m================================================================================
  ⛔ Welcome WebWorks Monorepo requires PNPM to manage dependencies and scripts.
================================================================================\x1b[0m

  You attempted to run a command using: \x1b[33m\x1b[1m${usedPM}\x1b[0m
  Running this project with \x1b[31mnpm\x1b[0m or \x1b[31myarn\x1b[0m is disabled to prevent workspace corruption.

  \x1b[32m\x1b[1m💡 HOW TO RESOLVE:\x1b[0m

  \x1b[1m1. Install pnpm globally (if not already installed):\x1b[0m
     \x1b[36mnpm install -g pnpm\x1b[0m

  \x1b[1m2. Install project dependencies using pnpm:\x1b[0m
     \x1b[36mpnpm install\x1b[0m

  \x1b[1m3. Run development server or workspace tasks using pnpm:\x1b[0m
     \x1b[36mpnpm dev\x1b[0m
     \x1b[36mpnpm build\x1b[0m

\x1b[31m\x1b[1m================================================================================\x1b[0m
`);
  process.exit(1);
}
