# Kevin Zhang Tutoring — VCE Tools

Interactive VCE practice tools (Maths Methods, Specialist Maths, Chemistry) for high school
students, deployed as a static site on GitHub Pages.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/math-tools/](http://localhost:5173/math-tools/) (the base path is `/math-tools/` by default).

## Build

```bash
npm run build
# Output goes to dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## GitHub Pages deployment

### First time setup

1. **Create a GitHub repo** (e.g. `math-tools`) and push this code to the `main` branch.

2. **Set the base path** in `vite.config.ts` — change `/math-tools/` to match your repo name:

   ```ts
   base: '/your-repo-name/',
   ```

   Also update the dev URL above accordingly.

3. **Enable GitHub Pages** in your repo:
   - Go to **Settings → Pages**
   - Under *Source*, choose **GitHub Actions**

4. **Push to `main`** — the workflow in `.github/workflows/deploy.yml` will build and deploy automatically.

Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

### Manual deploy (alternative)

If you prefer deploying from your machine instead of GitHub Actions:

```bash
npm run deploy
```

This runs `gh-pages -d dist` (the `gh-pages` package must be installed, which it is via devDependencies).

For this to work, GitHub Pages source must be set to the `gh-pages` **branch** (not GitHub Actions).

---

## Adding a new tool

1. Create a folder: `src/tools/my-tool/`
2. Add an `index.tsx` that exports a default React component.
3. Register it in **`src/tools/registry.ts`** — add one entry to the `tools` array:

   ```ts
   {
     id: 'my-tool',
     name: 'My Tool',
     description: 'One-line description shown on the home card.',
     route: '/my-tool',
     component: MyTool,   // import from './my-tool'
     icon: '🔢',
   }
   ```

That's it. The sidebar and home page update automatically.

---

## Tech choices

| Decision | Choice | Reason |
|---|---|---|
| Framework | React + Vite + TypeScript | Multiple interactive tools expected; TS catches data bugs early |
| Routing | Hash-based (`#/unit-circle`) | Works on GitHub Pages without a 404 fallback |
| Math rendering | KaTeX | Lighter than MathJax; sufficient for fractions, roots, π |
| Styling | Tailwind CSS | Rapid iteration; dark mode via `class` strategy |
| Deployment | GitHub Actions workflow | Zero-config, no local secrets required |
