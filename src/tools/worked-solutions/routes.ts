// Readable, shareable URLs for the worked-solutions tool, so a tutor can send a link straight
// to one question and refresh/Back/bookmarks all land where the student was:
//
//   #/worked-solutions                                   landing
//   #/worked-solutions/specialist                        subject chosen
//   #/worked-solutions/specialist/2023                   year open
//   #/worked-solutions/specialist/2023/exam-2/mcq-7      one question
//
// The exam and question segments are derived from data.ts ("Exam 2" → exam-2, "MCQ 7" → mcq-7,
// "Q2(a–f)" → q2), and are unique within a subject/year/exam.

import { QUESTIONS, SUBJECTS, type QuestionMeta, type SubjectId } from './data'

export const TOOL_PATH = '/worked-solutions'

export function examSlug(exam: string): string {
  return exam.trim().toLowerCase().replace(/\s+/g, '-')
}

export function codeSlug(code: string): string {
  return code.replace(/\(.*\)\s*$/, '').trim().toLowerCase().replace(/\s+/g, '-')
}

export function subjectPath(subject: SubjectId): string {
  return `${TOOL_PATH}/${subject}`
}

export function yearPath(subject: SubjectId, year: number): string {
  return `${TOOL_PATH}/${subject}/${year}`
}

export function questionPath(q: QuestionMeta): string {
  return `${TOOL_PATH}/${q.subject}/${q.year}/${examSlug(q.exam)}/${codeSlug(q.code)}`
}

export interface ParsedPath {
  subject: SubjectId | null
  year: number | null
  question: QuestionMeta | null
}

/** Parses the part of the hash route after `/worked-solutions/`. Anything it can't make sense
 *  of is dropped from that segment onwards, so a stale or mistyped link still opens as much as
 *  it can (e.g. the right subject and year) rather than failing. */
export function parsePath(rest: string): ParsedPath {
  const [s, y, e, c] = rest.split('/').filter(Boolean).map(seg => decodeURIComponent(seg).toLowerCase())
  const subject = SUBJECTS.find(x => x.id === s)?.id ?? null
  if (!subject) return { subject: null, year: null, question: null }
  const year = y && /^\d{4}$/.test(y) ? Number(y) : null
  if (year === null) return { subject, year: null, question: null }
  const question =
    e && c
      ? QUESTIONS.find(
          q => q.subject === subject && q.year === year && examSlug(q.exam) === e && codeSlug(q.code) === c,
        ) ?? null
      : null
  return { subject, year, question }
}
