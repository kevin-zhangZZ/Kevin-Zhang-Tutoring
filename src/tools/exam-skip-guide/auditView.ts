import type { AuditRow } from './audit'
import { QUESTIONS, type SubjectId } from '../worked-solutions/data'
import { questionPath, yearPath } from '../worked-solutions/routes'

// Turns audit.ts rows into what the page shows: one card per paper, with a list of questions to
// skip and a list of questions that are doable with a tip, each tip linked to its worked solution.

export type Status = 'skip' | 'tip'

export interface PaperItem {
  /** Written the way the paper and Exam Explanations write it: "MCQ 13", "Q4(g)", "Q5(b–e)". */
  code: string
  /** The whole question ("Entire Q5" in the audit). */
  allParts: boolean
  kind: 'mc' | 'sa'
  num: number
  status: Status
  topic: string
  note?: string
  /** Worked solution for a tip, when Exam Explanations has the question. */
  link?: string
}

export interface Paper {
  year: number
  exam: string
  items: PaperItem[]
}

/** The years a paper picker offers: the old-study-design papers this guide is about. */
export const PICKER_YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]

export function examsFor(subject: string): string[] {
  return subject === 'chemistry' ? ['Exam'] : ['Exam 1', 'Exam 2']
}

export const examSlug = (exam: string) => exam.trim().toLowerCase().replace(/\s+/g, '-')

/** "SAQ4g" → Q4(g), "SAQ1dii" → Q1(d)(ii), "SAQ5b,c,d,e" → Q5(b–e), "Entire SAQ5" → Q5 (all parts). */
export function parseCode(question: string): Pick<PaperItem, 'code' | 'allParts' | 'kind' | 'num'> {
  let q = question.trim()
  const allParts = /^entire\s+/i.test(q)
  q = q.replace(/^entire\s+/i, '')
  const mc = /^MCQ\s*(\d+)$/i.exec(q)
  if (mc) return { code: `MCQ ${mc[1]}`, allParts, kind: 'mc', num: Number(mc[1]) }
  const sa = /^(?:SAQ|Q)\s*(\d+)(.*)$/i.exec(q)
  if (!sa) return { code: q, allParts, kind: 'sa', num: 0 }
  const num = Number(sa[1])
  const rest = sa[2].trim()
  let code = `Q${num}`
  if (rest.includes(',')) {
    const parts = rest.split(',').map(p => p.trim()).filter(Boolean)
    code += `(${parts[0]}–${parts[parts.length - 1]})`
  } else if (rest) {
    const letter = rest[0]
    const roman = rest.slice(1)
    code += `(${letter})${roman ? `(${roman})` : ''}`
  }
  return { code, allParts, kind: 'sa', num }
}

/** Notes still say "SAQ5d" or "MCQ15" in places; write those the same way as the codes. */
export function tidyNote(note: string): string {
  return note
    .replace(/\bSAQ ?(\d+)([a-e])\b/g, 'Q$1($2)')
    .replace(/\bSAQ ?(\d+)\b/g, 'Q$1')
    .replace(/\bMCQ(\d+)/g, 'MCQ $1')
}

export function statusOf(row: AuditRow): Status {
  if (row.status) return row.status
  return row.note && /\bdoable\b/i.test(row.note) && !/impractical/i.test(row.note) ? 'tip' : 'skip'
}

function findQuestion(subject: string, year: number, exam: string, item: Pick<PaperItem, 'kind' | 'num'>) {
  return QUESTIONS.find(q =>
    q.subject === subject && q.year === year && q.exam === exam &&
    (item.kind === 'mc' ? q.code === `MCQ ${item.num}` : q.code === `Q${item.num}` || q.code.startsWith(`Q${item.num}(`)),
  )
}

function toItem(subject: string, row: AuditRow): PaperItem {
  const parsed = parseCode(row.question)
  const status = statusOf(row)
  const q = status === 'tip' ? findQuestion(subject, row.year, row.exam, parsed) : undefined
  return {
    ...parsed,
    status,
    topic: row.topic,
    note: row.note ? tidyNote(row.note) : undefined,
    link: q ? questionPath(q) : undefined,
  }
}

const byPaperOrder = (a: PaperItem, b: PaperItem) =>
  (a.kind === b.kind ? 0 : a.kind === 'mc' ? -1 : 1) || a.num - b.num || a.code.localeCompare(b.code)

export function papersFor(subject: string, rows: AuditRow[]): Paper[] {
  const map = new Map<string, Paper>()
  for (const row of rows) {
    const key = `${row.year}|${row.exam}`
    if (!map.has(key)) map.set(key, { year: row.year, exam: row.exam, items: [] })
    map.get(key)!.items.push(toItem(subject, row))
  }
  const papers = [...map.values()]
  papers.forEach(p => p.items.sort(byPaperOrder))
  return papers.sort((a, b) => a.year - b.year || a.exam.localeCompare(b.exam))
}

/** A year with any row was reviewed question by question, both exams — so a paper from that
 *  year with no rows has nothing to skip. Other years haven't been checked. */
export function reviewedYears(rows: AuditRow[]): Set<number> {
  return new Set(rows.map(r => r.year))
}

/** Exam Explanations' page for that year, if it has any questions from it. */
export function explanationsFor(subject: string, year: number): string | undefined {
  return QUESTIONS.some(q => q.subject === subject && q.year === year) ? yearPath(subject as SubjectId, year) : undefined
}

/** Short topic list for the skip reasons line, e.g. "Dynamics and force analysis, and arc length from Cartesian form". */
export function reasonLine(items: PaperItem[]): string {
  const topics = [...new Set(items.map(i => i.topic))]
  // Lower-case every topic after the first, except ones that start with an acronym ("AAS", "DNA").
  const lower = topics.map((t, i) => (i === 0 || t.charAt(1) !== t.charAt(1).toLowerCase() ? t : t.charAt(0).toLowerCase() + t.slice(1)))
  // Topics often contain "and" themselves, so the last one is joined with ", and".
  return lower.length <= 1 ? lower.join('') : `${lower.slice(0, -1).join(', ')}, and ${lower[lower.length - 1]}`
}

/** Skip notes, with questions that share the same note listed together. */
export function groupedNotes(items: PaperItem[]): Array<{ codes: string[]; note: string }> {
  const groups: Array<{ codes: string[]; note: string }> = []
  for (const it of items) {
    if (!it.note) continue
    const code = it.allParts ? `${it.code} (all parts)` : it.code
    const g = groups.find(x => x.note === it.note)
    if (g) g.codes.push(code)
    else groups.push({ codes: [code], note: it.note })
  }
  return groups
}
