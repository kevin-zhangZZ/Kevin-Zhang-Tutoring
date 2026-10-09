import { SUBJECTS, type Subject } from './data.ts'
import type { Projection } from './model.ts'

/** "ahead of 78%": the share of the state below a student. Said this way round so that, like a
 *  mark, a bigger number is always better; finer near the top, where ranks bunch up. */
export function aheadOf(pct: number): string {
  const below = pct * 100
  if (below < 1) return 'ahead of under 1%'
  if (below >= 99) return `ahead of ${Math.min(99.9, Math.floor(below * 10) / 10).toFixed(1)}%`
  return `ahead of ${Math.round(below)}%`
}

/** Each exam's own rank, in words ("Exam 1 ahead of 72% · Exam 2 ahead of 78%"), or nothing for a
 *  one-exam study. */
export function examShares(subject: Subject, p: Projection): string {
  const exams = SUBJECTS[subject].exams
  if (exams.length < 2) return ''
  return exams.map((e, i) => `${e.label} ${aheadOf(p.pctExams[i])}`).join(' · ')
}

/** "E1 30/40 · E2 60/80", or "Exam 84/120". */
export function marksText(subject: Subject, marks: number[]): string {
  return SUBJECTS[subject].exams.map((e, i) => `${e.short} ${marks[i]}/${e.rawMax}`).join(' · ')
}
