// The three subjects, kept apart from the question catalogue (data.ts, which re-exports them) so
// the Home page can name them without pulling the whole catalogue into the entry bundle.

export type SubjectId = 'methods' | 'specialist' | 'chemistry'

export interface SubjectInfo {
  id: SubjectId
  label: string
}

export const SUBJECTS: SubjectInfo[] = [
  { id: 'methods', label: 'Methods' },
  { id: 'specialist', label: 'Specialist' },
  { id: 'chemistry', label: 'Chemistry' },
]

export const SUBJECT_NAME: Record<SubjectId, string> = {
  methods: 'Mathematical Methods',
  specialist: 'Specialist Mathematics',
  chemistry: 'Chemistry',
}
