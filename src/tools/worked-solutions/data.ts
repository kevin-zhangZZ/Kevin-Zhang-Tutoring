// Catalog of past-exam questions with a worked solution / video walkthrough.
//
// Every row is a real VCE-style question reference (subject, year, exam, question code) that
// the tutor can flesh out over time. `hasDetail: true` means a written solution component
// exists for it in `./questions` and is wired up in `details.tsx` — everything else renders
// the "coming soon" placeholder until it's written up.

export type SubjectId = 'methods' | 'specialist' | 'chemistry'

export interface SubjectInfo {
  id: SubjectId
  label: string
}

export type QuestionType = 'mc' | 'sa'

export interface QuestionMeta {
  id: string
  subject: SubjectId
  year: number
  exam: string
  code: string
  topic: string
  /** Multiple choice vs short answer/extended response — used to section the list by type. */
  type: QuestionType
  /** True once a written worked solution exists for this question (see `details.tsx`). */
  hasDetail: boolean
}

export const QUESTION_TYPE_LABEL: Record<QuestionType, string> = {
  mc: 'Multiple Choice',
  sa: 'Short Answer',
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

// Badge / selection-highlight colors per subject (accessible in both light and dark).
export const SUBJECT_COLOR: Record<SubjectId, { text: string; bg: string; border: string }> = {
  specialist: {
    text: 'text-sky-700 dark:text-sky-300',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-200 dark:border-sky-900',
  },
  methods: {
    text: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-900',
  },
  chemistry: {
    text: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-900',
  },
}

export const QUESTIONS: QuestionMeta[] = [
  { id: 'spec-mcq6', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — Argand diagram parallelogram', type: 'mc', hasDetail: true },
  { id: 'spec-q2-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q2(a–f)', topic: 'Complex numbers — line and circle loci in the Argand plane', type: 'sa', hasDetail: true },
  { id: 'spec-saq3', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q3(a–e)', topic: 'Differential equations — rates of mixing (two-tank problem)', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q4(a–d)', topic: 'Vectors — relative position, collision, and minimum distance', type: 'sa', hasDetail: true },

  { id: 'meth-q3-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 3', topic: 'Graphs — identifying a quartic rule from its graph', type: 'mc', hasDetail: true },
  { id: 'meth-q16-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — antiderivatives of power functions', type: 'mc', hasDetail: true },
  { id: 'meth-q17-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — turning points and number of x-intercepts', type: 'mc', hasDetail: true },
  { id: 'meth-q4-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q4(a–d)', topic: 'Calculus — area between sine graphs', type: 'sa', hasDetail: true },
  { id: 'meth-q21-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 21', topic: 'Calculus — maximising the area of a trapezium', type: 'mc', hasDetail: true },
  { id: 'meth-q22-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 22', topic: 'Probability — independent events and ratios', type: 'mc', hasDetail: true },
  { id: 'meth-q3-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q3(a–h)', topic: 'Calculus — optimisation and related rates (melting ice cylinder)', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q4(f)', topic: 'Probability — conditional probability and Markov-style recursion', type: 'sa', hasDetail: true },
]
