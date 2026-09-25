// The exam analysis's data: every archived Methods/Specialist MCQ and short-answer part as one
// "item" with its marks, VCAA's average, and the subtopic taxonomy.ts files it under, plus the
// sums the charts are drawn from.

import { QUESTIONS, type QuestionMeta } from '../worked-solutions/data'
import { PART_STATS } from '../worked-solutions/partStats'
import { OMITTED } from '../worked-solutions/omitted'
import { TAXONOMY, partSubtopic, questionSubtopic, type AnalysisSubject } from './taxonomy'

export type ExamName = 'Exam 1' | 'Exam 2'
export type ExamFilter = 'all' | ExamName
export type TypeFilter = 'all' | 'mc' | 'sa'

export interface Item {
  key: string
  subject: AnalysisSubject
  year: number
  exam: ExamName
  question: QuestionMeta
  /** The part's letter ("b.ii"), '' for a single-part short answer, null for an MCQ. */
  part: string | null
  type: 'mc' | 'sa'
  marks: number
  /** VCAA's average mark, or null where the report doesn't give one (a VCAA-flagged MCQ). */
  avg: number | null
  topic: string
  sub: string
}

function build(): Item[] {
  const items: Item[] = []
  for (const q of QUESTIONS) {
    if (q.subject !== 'methods' && q.subject !== 'specialist') continue
    const subject = q.subject
    const exam = q.exam as ExamName
    if (q.type === 'mc') {
      const sub = questionSubtopic(subject, q.id, q.topic)
      items.push({
        key: q.id, subject, year: q.year, exam, question: q, part: null, type: 'mc', marks: 1,
        avg: q.percentCorrect !== undefined ? q.percentCorrect / 100 : null,
        topic: sub.split('.')[0], sub,
      })
    } else {
      for (const p of PART_STATS[q.id] ?? []) {
        const sub = partSubtopic(subject, q.id, p.l, p.t, q.topic)
        items.push({
          key: `${q.id}:${p.l}`, subject, year: q.year, exam, question: q, part: p.l, type: 'sa', marks: p.m,
          avg: p.a ?? null, topic: sub.split('.')[0], sub,
        })
      }
    }
  }
  return items
}

export const ITEMS: Item[] = build()

export const FIRST_YEAR = 2014
export const LAST_YEAR = Math.max(...ITEMS.map(i => i.year))
export const ALL_YEARS = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i)
/** The current study design's first exams. */
export const STUDY_DESIGN_YEAR = 2023

// Every paper since 2014: Exam 1 is 40 marks, Exam 2 is 80 (20 or 22 one-mark MCQs, then short
// answer). Marks not in the archive are the questions left out (omitted.ts: Mechanics, modulus
// functions, 2022's redactions) and parts left out of a kept question.
const PAPER_MARKS: Record<ExamName, number> = { 'Exam 1': 40, 'Exam 2': 80 }

export interface Filters {
  subject: AnalysisSubject
  from: number
  to: number
  exam: ExamFilter
  type: TypeFilter
}

export function yearsOf(f: Filters): number[] {
  return ALL_YEARS.filter(y => y >= f.from && y <= f.to)
}

export function examsOf(f: Filters): ExamName[] {
  return f.exam === 'all' ? ['Exam 1', 'Exam 2'] : [f.exam]
}

export function filterItems(f: Filters): Item[] {
  return ITEMS.filter(
    i =>
      i.subject === f.subject &&
      i.year >= f.from &&
      i.year <= f.to &&
      (f.exam === 'all' || i.exam === f.exam) &&
      (f.type === 'all' || i.type === f.type),
  )
}

/** Marks in the selected papers that the archive doesn't hold, per year. */
export function missingMarksByYear(f: Filters): Map<number, number> {
  const out = new Map<number, number>()
  for (const year of yearsOf(f)) {
    let missing = 0
    for (const exam of examsOf(f)) {
      const held = ITEMS.filter(i => i.subject === f.subject && i.year === year && i.exam === exam)
      const heldMarks = held.reduce((s, i) => s + i.marks, 0)
      const leftOutMC = OMITTED.filter(o => o.subject === f.subject && o.year === year && o.exam === exam && o.code.startsWith('MCQ')).length
      const total = PAPER_MARKS[exam] - heldMarks
      const mc = Math.min(leftOutMC, total)
      missing += f.type === 'all' ? total : f.type === 'mc' ? mc : total - mc
    }
    out.set(year, Math.max(0, missing))
  }
  return out
}

// ── Sums ──────────────────────────────────────────────────────────────────────────────────

export interface Stat {
  marks: number
  items: number
  /** Marks-weighted average score, 0–1, over the items VCAA reports an average for. */
  score: number | null
}

export function statOf(items: Item[]): Stat {
  let marks = 0
  let scoredMarks = 0
  let scoreSum = 0
  for (const i of items) {
    marks += i.marks
    if (i.avg !== null) {
      scoredMarks += i.marks
      scoreSum += i.avg
    }
  }
  return { marks, items: items.length, score: scoredMarks ? scoreSum / scoredMarks : null }
}

/** An item's own score, 0–1. */
export function itemScore(i: Item): number | null {
  return i.avg === null ? null : i.avg / i.marks
}

export type Level = 'topic' | 'sub'

export interface Group extends Stat {
  id: string
  label: string
  /** The topic this group is, or belongs to. */
  topic: string
  itemList: Item[]
}

export function topicLabel(subject: AnalysisSubject, id: string): string {
  return TAXONOMY[subject].find(t => t.id === id)?.label ?? id
}

export function subLabel(subject: AnalysisSubject, id: string): string {
  for (const t of TAXONOMY[subject]) for (const s of t.subtopics) if (s.id === id) return s.label
  return id
}

/** Every topic (or every subtopic, optionally within one topic) in taxonomy order, including
 *  ones with nothing in the selection, so colours and rows stay put as filters change. */
export function groupsOf(items: Item[], subject: AnalysisSubject, level: Level, withinTopic: string | null = null): Group[] {
  const groups: Group[] = []
  for (const t of TAXONOMY[subject]) {
    if (withinTopic && t.id !== withinTopic) continue
    if (level === 'topic') {
      const list = items.filter(i => i.topic === t.id)
      groups.push({ id: t.id, label: t.label, topic: t.id, itemList: list, ...statOf(list) })
    } else {
      for (const s of t.subtopics) {
        const list = items.filter(i => i.sub === s.id)
        groups.push({ id: s.id, label: s.label, topic: t.id, itemList: list, ...statOf(list) })
      }
    }
  }
  return groups
}

/** Least-squares slope of y against x (per year), or 0 with fewer than two points. */
export function slope(xs: number[], ys: number[]): number {
  const n = xs.length
  if (n < 2) return 0
  const mx = xs.reduce((a, b) => a + b, 0) / n
  const my = ys.reduce((a, b) => a + b, 0) / n
  let num = 0
  let den = 0
  for (let k = 0; k < n; k++) {
    num += (xs[k] - mx) * (ys[k] - my)
    den += (xs[k] - mx) ** 2
  }
  return den ? num / den : 0
}

// ── Labels ────────────────────────────────────────────────────────────────────────────────

/** "2019 E2 Q4f.iii", "2019 E2 MCQ 7". */
export function itemLabel(i: Item): string {
  const e = i.exam === 'Exam 1' ? 'E1' : 'E2'
  const code = i.question.code.replace(/\(.*\)\s*$/, '').trim()
  return `${i.year} ${e} ${code}${i.part ? i.part : ''}`
}

export function pct(x: number | null, digits = 0): string {
  return x === null ? '—' : `${(x * 100).toFixed(digits)}%`
}

export function fmt(x: number, digits = 1): string {
  return Number.isInteger(x) ? String(x) : x.toFixed(digits)
}
