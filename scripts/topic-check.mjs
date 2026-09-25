// Lists every archived Methods/Specialist item (each MCQ, each short-answer part) under the
// subtopic the exam analysis files it in, so a misfiled one is easy to spot. See the rules and
// overrides in src/tools/exam-analysis/taxonomy.ts.
//
//   npm run topic-check                       totals per subtopic, both subjects
//   npm run topic-check -- methods diff       every item in Methods subtopics starting "diff"
//   npm run topic-check -- specialist         totals for Specialist only
//
// The taxonomy is TypeScript, so this bundles a small entry with esbuild (already installed as
// part of Vite) and runs the result.

import { build } from 'esbuild'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const entry = `
import { QUESTIONS } from './src/tools/worked-solutions/data'
import { PART_STATS } from './src/tools/worked-solutions/partStats'
import { TAXONOMY, questionSubtopic, partSubtopic, knownSubtopics } from './src/tools/exam-analysis/taxonomy'

const [subjectArg, prefix] = process.argv.slice(2)
let unknown = 0
for (const subject of subjectArg ? [subjectArg] : ['methods', 'specialist']) {
  const known = knownSubtopics(subject)
  const items = {}
  const marks = {}
  const add = (sub, line, m) => {
    ;(items[sub] ??= []).push(line)
    marks[sub] = (marks[sub] ?? 0) + m
  }
  for (const q of QUESTIONS) {
    if (q.subject !== subject) continue
    const tag = q.year + ' ' + q.exam.replace('Exam ', 'E') + ' ' + q.code.replace(/\\(.*/, '').replace('MCQ ', 'M')
    if (q.type === 'mc') add(questionSubtopic(subject, q.id, q.topic), tag + ' | ' + q.topic, 1)
    else
      for (const p of PART_STATS[q.id] ?? [])
        add(partSubtopic(subject, q.id, p.l, p.t, q.topic), tag + p.l + ' [' + (p.t ?? '—') + '] (' + p.m + ') | ' + q.topic, p.m)
  }
  for (const sub of Object.keys(items))
    if (!known.has(sub)) {
      unknown++
      console.log('Not in the taxonomy: ' + subject + ' ' + sub)
    }
  console.log('\\n# ' + subject)
  for (const t of TAXONOMY[subject])
    for (const s of t.subtopics) {
      if (prefix && !s.id.startsWith(prefix)) continue
      console.log('\\n' + s.id.padEnd(20) + ' ' + s.label + ' — ' + (marks[s.id] ?? 0) + ' marks, ' + (items[s.id] ?? []).length + ' items')
      if (prefix) for (const line of items[s.id] ?? []) console.log('  ' + line)
    }
}
if (unknown) process.exitCode = 1
`

const result = await build({
  stdin: { contents: entry, resolveDir: root, loader: 'ts' },
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
  logLevel: 'warning',
})
await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'))
