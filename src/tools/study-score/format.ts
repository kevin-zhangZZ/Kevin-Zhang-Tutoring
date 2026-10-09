import { SUBJECTS, type Subject } from './data'
import type { Projection } from './model'

/** "top 8%" for the share above a student, finer near the top. */
export function topShare(pct: number): string {
  const above = (1 - pct) * 100
  if (above < 0.1) return 'top 0.1%'
  if (above < 1) return `top ${above.toFixed(1)}%`
  if (above > 99) return 'bottom 1%'
  return `top ${Math.round(above)}%`
}

/** Each exam's own rank after the overall one ("E1 11% · E2 8%"), or nothing for a one-exam study. */
export function examShares(subject: Subject, p: Projection): string {
  const exams = SUBJECTS[subject].exams
  if (exams.length < 2) return ''
  return exams.map((e, i) => `${e.short} ${topShare(p.pctExams[i]).replace('top ', '')}`).join(' · ')
}

/** "E1 30/40 · E2 60/80", or "Exam 84/120". */
export function marksText(subject: Subject, marks: number[]): string {
  return SUBJECTS[subject].exams.map((e, i) => `${e.short} ${marks[i]}/${e.rawMax}`).join(' · ')
}
