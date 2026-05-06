# Meridiana

Premium cultural travel platform — editorial-driven experiences through Colombia and Latin America.

## Quick Start

```bash
# Read the context first
cat CLAUDE.md

# Start with Task 01
cat tasks/01-setup.md

# Execute sequentially through tasks/
```

## For Claude Code / GSD

1. Read `CLAUDE.md` — master context
2. Read the current task in `tasks/XX-*.md`
3. Reference `docs/` for design tokens, content model, and editorial rules
4. Build in `frontend/`
5. Mark acceptance criteria as complete

## Project Structure

```
CLAUDE.md         ← Start here
docs/             ← Strategy + specs
tasks/            ← Ordered execution queue (01–10)
frontend/         ← Next.js project (to be initialized in Task 01)
```

## Stack

Next.js (App Router) · Tailwind CSS · Framer Motion · TypeScript · Vercel
