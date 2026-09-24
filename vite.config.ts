import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/math-tools/' to match your GitHub repository name.
// Example: repo at github.com/you/my-site → base: '/my-site/'
// The dev server uses PORT when it's set (the preview tooling assigns a free one, so several
// sessions can each run their own server); otherwise Vite's default, 5173.
const port = process.env.PORT ? Number(process.env.PORT) : undefined

export default defineConfig({
  plugins: [react()],
  base: '/Kevin-Zhang-Tutoring/',
  server: port ? { port, strictPort: true } : {},
})
