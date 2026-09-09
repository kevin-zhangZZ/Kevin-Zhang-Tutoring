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
  /**
   * For multiple-choice questions only: the percentage of students who answered correctly,
   * per the official VCAA examination report. Used to flag the hardest MCQs from each subject.
   */
  percentCorrect?: number
  /** True once at least one part of this question has a real recorded video walkthrough. */
  hasVideo?: boolean
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
  { id: 'spec-mcq6', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — Argand diagram parallelogram', type: 'mc', hasDetail: true, hasVideo: true, percentCorrect: 57 },
  { id: 'spec-q2-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q2(a–f)', topic: 'Complex numbers — line and circle loci in the Argand plane', type: 'sa', hasDetail: true, hasVideo: true },
  { id: 'spec-saq3', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q3(a–e)', topic: 'Differential equations — rates of mixing (two-tank problem)', type: 'sa', hasDetail: true, hasVideo: true },
  { id: 'spec-q4-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q4(a–d)', topic: 'Vectors — relative position, collision, and minimum distance', type: 'sa', hasDetail: true },

  { id: 'meth-q3-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 3', topic: 'Graphs — identifying a quartic rule from its graph', type: 'mc', hasDetail: true, percentCorrect: 20 },
  { id: 'meth-q16-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — antiderivatives of power functions', type: 'mc', hasDetail: true, percentCorrect: 22, hasVideo: true },
  { id: 'meth-q17-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — turning points and number of x-intercepts', type: 'mc', hasDetail: true },
  { id: 'meth-q4-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q4(a–d)', topic: 'Calculus — area between sine graphs', type: 'sa', hasDetail: true },
  { id: 'meth-q21-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 21', topic: 'Calculus — maximising the area of a trapezium', type: 'mc', hasDetail: true },
  { id: 'meth-q22-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 22', topic: 'Probability — independent events and ratios', type: 'mc', hasDetail: true },
  { id: 'meth-q3-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q2(a–h)', topic: 'Calculus — optimisation and related rates (melting ice cylinder)', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q4(f)', topic: 'Probability — conditional probability and Markov-style recursion', type: 'sa', hasDetail: true },

  // The 5 hardest Methods MCQs from 2014-2016 Exam 2 Section A, by VCAA-reported % correct.
  // (meth-q3-2015 and meth-q16-2015 above are already 2 of these 5 — see percentCorrect on each.)
  { id: 'meth-q19-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 19', topic: 'Probability — bounding E(X) for a discrete distribution', type: 'mc', hasDetail: true, percentCorrect: 15 },
  { id: 'meth-q20-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 20', topic: 'Transformations — relating definite integrals under a mapping', type: 'mc', hasDetail: true, percentCorrect: 17 },
  { id: 'meth-q11-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 11', topic: 'Transformations — identifying a single dilation', type: 'mc', hasDetail: true, percentCorrect: 24 },

  // The 6 hardest Specialist MCQs from 2015 Exam 2 Section A, by VCAA-reported % correct.
  // Mechanics questions (no longer on the VCE study design) are excluded from these picks —
  // meth-q14-2016 and meth-q22-2015 (Mechanics) were removed entirely for the same reason.
  { id: 'spec-q4-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 4', topic: 'Coordinate geometry — hyperbola from its asymptotes', type: 'mc', hasDetail: true, percentCorrect: 43 },
  { id: 'spec-q6-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — matching a relation to a point', type: 'mc', hasDetail: true, percentCorrect: 43 },
  { id: 'spec-q9-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 9', topic: 'Complex numbers — comparing z1 and z1z2 on an Argand diagram', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'spec-q17-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 17', topic: 'Vectors — the cosine of an angle from position vectors', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'spec-q3-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 3', topic: 'Coordinate geometry — classifying a family of conics', type: 'mc', hasDetail: true, percentCorrect: 50 },
  { id: 'spec-q10-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — a definite integral by substitution', type: 'mc', hasDetail: true, percentCorrect: 56 },

  // The 6 hardest Specialist MCQs from 2016 Exam 2 Section A, by VCAA-reported % correct
  // (spec-mcq6 above is also a 2016 MCQ, at 57%).
  { id: 'spec-q7-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 7', topic: 'Calculus — parametric differentiation', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'spec-q9-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 9', topic: "Differential equations — three steps of Euler's method", type: 'mc', hasDetail: true, percentCorrect: 55 },
  { id: 'spec-q1-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 1', topic: 'Coordinate geometry — a parabola from cosec/cot parametric equations', type: 'mc', hasDetail: true, percentCorrect: 61 },
  { id: 'spec-q18-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 18', topic: 'Statistics — mean and sd of a sum of independent variables', type: 'mc', hasDetail: true, percentCorrect: 61 },
  { id: 'spec-q10-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 10', topic: 'Differential equations — tracing a solution through a direction field', type: 'mc', hasDetail: true, percentCorrect: 65 },

  // The 5 hardest Methods MCQs from 2017-2018 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q18-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 18', topic: 'Calculus — comparing derivatives of two power functions', type: 'mc', hasDetail: true, percentCorrect: 14 },
  { id: 'meth-q20-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 20', topic: 'Transformations — a matrix mapping one pdf to another', type: 'mc', hasDetail: true, percentCorrect: 20 },
  { id: 'meth-q17-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — area under an even function as one integral', type: 'mc', hasDetail: true, percentCorrect: 21 },
  { id: 'meth-q11-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 11', topic: 'Graphs — pinning down tan(ax) from its asymptote', type: 'mc', hasDetail: true, percentCorrect: 26 },
  { id: 'meth-q7-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 7', topic: 'Quadratics — discriminant condition for no real roots', type: 'mc', hasDetail: true, percentCorrect: 32 },

  // The 6 hardest Specialist MCQs from 2017 Exam 2 Section A, by VCAA-reported % correct.
  // spec-q17-2017 (Mechanics) was removed — no longer on the VCE study design.
  { id: 'spec-q10-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — inflection points of |f(x)|', type: 'mc', hasDetail: true, percentCorrect: 6 },
  { id: 'spec-q2-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 2', topic: 'Trigonometry — a cosec inequality', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'spec-q19-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 19', topic: 'Statistics — confidence interval width vs. sample size', type: 'mc', hasDetail: true, percentCorrect: 44 },
  { id: 'spec-q9-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 9', topic: "Differential equations — Euler's method stepping backward", type: 'mc', hasDetail: true, percentCorrect: 45 },
  { id: 'spec-q6-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 6', topic: 'Calculus — second derivative of an implicit relation', type: 'mc', hasDetail: true, percentCorrect: 46 },
  { id: 'spec-q3-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 3', topic: 'Complex numbers — distinct roots of a quartic times a quadratic', type: 'mc', hasDetail: true, percentCorrect: 47 },

  // The 6 hardest Specialist MCQs from 2018 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'spec-q12-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 12', topic: 'Vectors — the equality case of the triangle inequality', type: 'mc', hasDetail: true, percentCorrect: 36 },
  { id: 'spec-q5-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex numbers — z + 1/z real implies |z| = 1', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'spec-q3-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 3', topic: 'Algebra — partial fractions with a hidden common factor', type: 'mc', hasDetail: true, percentCorrect: 46 },
  { id: 'spec-q4-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 4', topic: 'Trigonometry — cosec(-x) from cos(x) and cot(x)', type: 'mc', hasDetail: true, percentCorrect: 49 },
  { id: 'spec-q20-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 20', topic: 'Statistics — comparing two independent normal variables', type: 'mc', hasDetail: true, percentCorrect: 56 },
  { id: 'spec-q19-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 19', topic: 'Statistics — a probability about a sample mean', type: 'mc', hasDetail: true, percentCorrect: 57 },
]
