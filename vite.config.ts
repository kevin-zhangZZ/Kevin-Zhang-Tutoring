import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/math-tools/' to match your GitHub repository name.
// Example: repo at github.com/you/my-site → base: '/my-site/'
export default defineConfig({
  plugins: [react()],
  base: '/Kevin-Zhang-Tutoring/',
})
