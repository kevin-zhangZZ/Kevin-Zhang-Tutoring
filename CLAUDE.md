# math-tools

React/Vite/Tailwind static site for Kevin Zhang Tutoring — VCE Tools, deployed to GitHub
Pages. Read this before making changes.

## Worked solutions

Adding or editing anything under `src/tools/worked-solutions/` (a new exam question, a
diagram, a VCAA-flagged/ambiguous question, etc.) — **read
[`src/tools/worked-solutions/AUTHORING_GUIDE.md`](src/tools/worked-solutions/AUTHORING_GUIDE.md)
first.** It covers file/ID naming, the question template, sourcing/verification
discipline, notation conventions, and the registration steps — all established the hard
way across the 2015–2025 buildout. Don't re-derive these from scratch.

## Type-checking

Always run `npx tsc -p tsconfig.app.json --noEmit` — a bare `tsc --noEmit` checks 0 files.
One pre-existing, unrelated error in `src/tools/monte-carlo/index.tsx` shows up in every
run and is not a regression.

## Deploying

`git push origin master`, then `npm run deploy` (builds + `gh-pages -d dist`) — only when
asked, never on a routine commit. Transient Dropbox-lock errors (`EPERM`, "Device or
resource busy" on `dist/`) are common on this machine; just retry the same command, or
`rm -rf dist` first if the build itself can't clear it. After deploying, GitHub Pages'
CDN takes up to ~30–60s to propagate — verify with a poll loop, not an immediate check,
and use a fresh browser tab (an already-open one can keep serving a cached bundle).

## Git hygiene

Exclude `scratch/` and `vite.config.ts.timestamp-*` from commits — both are local
session/build junk:
```
git add -A -- ':!scratch' ':!vite.config.ts.timestamp-*'
```
