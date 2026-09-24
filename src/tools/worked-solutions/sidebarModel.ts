// What the question sidebar lists, in what order — kept apart from the UI so the sidebar, the
// phone's previous/next bar, the desktop pager and the settings preview all agree on it.

import { QUESTIONS, type QuestionMeta, type QuestionType, type SubjectId } from './data'
import { PART_STATS, type PartStat } from './partStats'
import { OMITTED, type OmittedQuestion } from './omitted'
import type { ListSort, ListView } from './sidebarPrefs'

// Methods/Specialist always sit two exams, Chemistry one.
export const EXAMS: Record<SubjectId, string[]> = {
  methods: ['Exam 1', 'Exam 2'],
  specialist: ['Exam 1', 'Exam 2'],
  chemistry: ['Exam'],
}

// Every year 2015-2025 has a sourced paper + report (examSources.ts), so the year choices
// cover that whole range even where a subject has no questions for a year.
const SOURCED_YEARS = Array.from({ length: 2025 - 2015 + 1 }, (_, i) => 2015 + i)

export function questionNumber(code: string): number {
  const match = code.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

/** "Q2(a–f)" → "Q2": the sidebar shows the question, not its sub-part range. */
export function mainCode(code: string): string {
  return code.replace(/\(.*\)\s*$/, '').trim()
}

/** "E1", "E2", or '' for Chemistry's single exam. */
export function examShort(exam: string): string {
  return exam === 'Exam' ? '' : `E${exam.slice(-1)}`
}

/** The category half of `topic` ("Complex numbers — …" → "Complex Numbers"), in Title Case
 *  so the two spellings in data.ts group together. The description half is deliberately not
 *  shown in the sidebar — it often names the trick. */
export function topicOf(q: QuestionMeta): string {
  return q.topic
    .split('—')[0]
    .trim()
    .replace(/\S+/g, w => w.charAt(0).toUpperCase() + w.slice(1))
}

export function partsOf(q: QuestionMeta): PartStat[] {
  return PART_STATS[q.id] ?? []
}

/** How students did, as a percentage: an MCQ's % correct, or a short answer's average mark
 *  as a share of the marks available. Null when VCAA's report doesn't give it (e.g. a
 *  flagged MCQ). */
export function difficulty(q: QuestionMeta): number | null {
  if (q.type === 'mc') return q.percentCorrect ?? null
  const parts = partsOf(q)
  if (parts.length === 0 || parts.some(p => p.a === undefined)) return null
  const marks = parts.reduce((s, p) => s + p.m, 0)
  const avg = parts.reduce((s, p) => s + (p.a ?? 0), 0)
  return marks ? Math.round((avg / marks) * 100) : null
}

export const HARD_BELOW = 40

export function yearsFor(subject: SubjectId): number[] {
  const years = new Set(SOURCED_YEARS)
  for (const q of QUESTIONS) if (q.subject === subject) years.add(q.year)
  return [...years].sort((a, b) => a - b)
}

function byDifficulty(a: QuestionMeta, b: QuestionMeta): number {
  const da = difficulty(a) ?? Infinity
  const db = difficulty(b) ?? Infinity
  return da - db || questionNumber(a.code) - questionNumber(b.code)
}

export function examQuestions(subject: SubjectId, year: number, exam: string, type: QuestionType, sort: ListSort): QuestionMeta[] {
  const qs = QUESTIONS.filter(q => q.subject === subject && q.year === year && q.exam === exam && q.type === type)
  return qs.sort(sort === 'hard' ? byDifficulty : (a, b) => questionNumber(a.code) - questionNumber(b.code))
}

/** Which of Multiple Choice / Short Answer an exam has, in display order. */
export function examTypes(subject: SubjectId, year: number, exam: string): QuestionType[] {
  return (['mc', 'sa'] as QuestionType[]).filter(t =>
    QUESTIONS.some(q => q.subject === subject && q.year === year && q.exam === exam && q.type === t),
  )
}

export function omittedFor(subject: SubjectId, year: number, exam: string, type?: QuestionType): OmittedQuestion[] {
  return OMITTED.filter(
    o =>
      o.subject === subject &&
      o.year === year &&
      o.exam === exam &&
      (type === undefined || (o.code.startsWith('MCQ') ? 'mc' : 'sa') === type),
  ).sort((a, b) => questionNumber(a.code) - questionNumber(b.code))
}

export type ListItem = { kind: 'question'; q: QuestionMeta } | { kind: 'omitted'; o: OmittedQuestion }

/** An exam's questions of one type, with any left-out questions slotted in where they'd be
 *  (exam order only — in "Hardest first" they have no place, so they're left out). */
export function examItems(
  subject: SubjectId,
  year: number,
  exam: string,
  type: QuestionType,
  sort: ListSort,
  withOmitted: boolean,
): ListItem[] {
  const items: ListItem[] = examQuestions(subject, year, exam, type, sort).map(q => ({ kind: 'question', q }))
  if (!withOmitted || sort !== 'exam') return items
  for (const o of omittedFor(subject, year, exam, type)) {
    const n = questionNumber(o.code)
    const at = items.findIndex(it => it.kind === 'question' && questionNumber(it.q.code) > n)
    items.splice(at === -1 ? items.length : at, 0, { kind: 'omitted', o })
  }
  return items
}

/** A subject's topics, largest first, each with its questions. */
export function topicGroups(subject: SubjectId): [topic: string, questions: QuestionMeta[]][] {
  const groups = new Map<string, QuestionMeta[]>()
  for (const q of QUESTIONS) {
    if (q.subject !== subject) continue
    const t = topicOf(q)
    groups.set(t, [...(groups.get(t) ?? []), q])
  }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
}

/** One topic's questions: newest year first in exam order, or hardest first. */
export function topicQuestions(subject: SubjectId, topic: string, sort: ListSort): QuestionMeta[] {
  const qs = QUESTIONS.filter(q => q.subject === subject && topicOf(q) === topic)
  return qs.sort(
    sort === 'hard'
      ? byDifficulty
      : (a, b) =>
          b.year - a.year ||
          a.exam.localeCompare(b.exam) ||
          (a.type === b.type ? 0 : a.type === 'mc' ? -1 : 1) ||
          questionNumber(a.code) - questionNumber(b.code),
  )
}

/** The questions in the order the sidebar currently lists them — what previous / next step
 *  through: the open topic in By Topic, otherwise the whole year (every exam, MCQs then short
 *  answers), in the chosen order. */
export function listSequence(opts: {
  subject: SubjectId
  year: number | null
  view: ListView
  sort: ListSort
  topic: string | null
}): QuestionMeta[] {
  if (opts.view === 'topic' && opts.topic) return topicQuestions(opts.subject, opts.topic, opts.sort)
  if (opts.year === null) return []
  return EXAMS[opts.subject].flatMap(exam =>
    (['mc', 'sa'] as QuestionType[]).flatMap(type => examQuestions(opts.subject, opts.year!, exam, type, opts.sort)),
  )
}

/** A short label for a question relative to the one you're on: "MCQ 8" in the same exam,
 *  "E2 MCQ 1" across exams, with the year in front across years. */
export function relativeLabel(q: QuestionMeta, from: QuestionMeta | null): string {
  const sameYear = from && from.year === q.year && from.subject === q.subject
  const sameExam = sameYear && from!.exam === q.exam
  const exam = !sameExam && examShort(q.exam) ? `${examShort(q.exam)} ` : ''
  return `${sameYear ? '' : `${q.year} `}${exam}${mainCode(q.code)}`
}
