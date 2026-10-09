import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/math-tools/' to match your GitHub repository name.
// Example: repo at github.com/you/my-site → base: '/my-site/'
// The dev server uses PORT when it's set (the preview tooling assigns a free one, so several
// sessions can each run their own server); otherwise Vite's default, 5173.
const port = process.env.PORT ? Number(process.env.PORT) : undefined

// The worked-solutions chunk a question file belongs to (see manualChunks below).
function paperChunk(id: string): string | undefined {
  const m = id.match(/\/worked-solutions\/questions\/(Methods|Specialist|Chemistry)Q\d+_(\d{4})(Exam[12])?\.tsx$/)
  if (!m) return
  const subject = { Methods: 'meth', Specialist: 'spec', Chemistry: 'chem' }[m[1]]
  return subject === 'chem' ? `q-chem-${m[2]}` : `q-${subject}-${m[2]}-${m[3] === 'Exam1' ? 'e1' : 'e2'}`
}

export default defineConfig({
  plugins: [react()],
  base: '/Kevin-Zhang-Tutoring/',
  server: port ? { port, strictPort: true } : {},
  build: {
    rollupOptions: {
      output: {
        // The worked solutions load their question files on demand (questionLoader.ts). One
        // chunk per question would be ~870 files, so group them a paper at a time:
        // MethodsQ3_2019Exam1 → q-meth-2019-e1, SpecialistQ12_2019 (Exam 2 MCQ) and
        // SpecialistQ2_2019Exam2 → q-spec-2019-e2, ChemistryQ15_2019 → q-chem-2019.
        // Only the question files (and their own images) go in those chunks: without
        // onlyExplicitManualChunks Rollup also drags their shared imports (React, KaTeX, the
        // question kit) into whichever paper chunk sees them first, and Home would preload it.
        // Needs Rollup ≥ 4.52 (the installed Vite 5 resolves 4.60).
        onlyExplicitManualChunks: true,
        manualChunks(id, { getModuleInfo }) {
          const paper = paperChunk(id)
          if (paper) return paper
          // A question's images (each a one-line module exporting its URL) join its paper's
          // chunk rather than becoming hundreds of tiny chunks of their own.
          if (!/\/worked-solutions\/questions\/[^/]+$/.test(id)) return
          const papers = new Set(getModuleInfo(id)?.importers.map(paperChunk))
          if (papers.size === 1) return [...papers][0]
        },
      },
    },
  },
})
