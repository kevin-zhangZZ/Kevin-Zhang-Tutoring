// The URL builders from routes.ts that don't need the question catalogue, kept apart so the Home
// page can link into the tool without pulling data.ts into the entry bundle. Import them from
// routes.ts everywhere else (it re-exports them).

import type { QuestionMeta } from './data'
import type { SubjectId } from './subjects'

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

export function questionPath(q: Pick<QuestionMeta, 'subject' | 'year' | 'exam' | 'code'>): string {
  return `${TOOL_PATH}/${q.subject}/${q.year}/${examSlug(q.exam)}/${codeSlug(q.code)}`
}
