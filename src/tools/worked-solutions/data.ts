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
  /**
   * True for the rare MCQ that VCAA itself later flagged as having no single defensible
   * correct answer — after review, VCAA retroactively accepted two, or all four/five, of
   * the options as correct. `percentCorrect` is omitted for these (there's no single
   * "correct" rate to report); the detail page instead shows an unmissable warning
   * banner via `MCQShell`'s `flawed` prop.
   */
  flagged?: boolean
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
  { id: 'spec-q6-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — Argand diagram parallelogram', type: 'mc', hasDetail: true, hasVideo: true, percentCorrect: 57 },
  { id: 'spec-q2-2016-e2', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q2(a–f)', topic: 'Complex numbers — line and circle loci in the Argand plane', type: 'sa', hasDetail: true, hasVideo: true },
  { id: 'spec-q1-2016-e2', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q1(a–e)', topic: 'Calculus — a stationary point, an inflection, arc length and a volume set-up', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2016-e2', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q5(b–e)', topic: 'Vectors — a model rocket under a decaying thrust, then free flight', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2016-e2', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q6(a–e)', topic: 'Statistics — a one-sided test, its boundary, and a Type II error', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2016-e2', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q3(a–e)', topic: 'Differential equations — rates of mixing (two-tank problem)', type: 'sa', hasDetail: true, hasVideo: true },
  { id: 'spec-q4-2016-e2', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q4(a–d)', topic: 'Vectors — relative position, collision, and minimum distance', type: 'sa', hasDetail: true },

  { id: 'meth-q21-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 21', topic: 'Calculus — maximising the area of a trapezium', type: 'mc', hasDetail: true },
  { id: 'meth-q22-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 22', topic: 'Probability — independent events and ratios', type: 'mc', hasDetail: true },

  // The rest of 2014 Methods Exam 2 Section 1, answers and percentages read off the rendered
  // report table (the correct option is marked only by shading). MCQ 7, 12 and 19 are omitted:
  // the skip guide lists them as a standalone modulus graph, a matrix transformation and a
  // rectangle area-approximation respectively, none of which is on the current study design.
  { id: 'meth-q1-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 1', topic: 'Transformations — a translation then a reflection, in order', type: 'mc', hasDetail: true, percentCorrect: 89 },
  { id: 'meth-q2-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 2', topic: 'Functions — the domain of a decreasing linear function from its range', type: 'mc', hasDetail: true, percentCorrect: 80 },
  { id: 'meth-q3-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 3', topic: 'Calculus — total area between a cubic and the x-axis', type: 'mc', hasDetail: true, percentCorrect: 60 },
  { id: 'meth-q4-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 4', topic: 'Calculus — classifying a stationary point from the sign of f′', type: 'mc', hasDetail: true, percentCorrect: 65 },
  { id: 'meth-q5-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 5', topic: 'Probability — standardising a normal probability', type: 'mc', hasDetail: true, percentCorrect: 58 },
  { id: 'meth-q6-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 6', topic: 'Functions — restricting a cubic so it has an inverse', type: 'mc', hasDetail: true, percentCorrect: 55 },
  { id: 'meth-q8-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 8', topic: 'Calculus — linearity of the definite integral', type: 'mc', hasDetail: true, percentCorrect: 59 },
  { id: 'meth-q9-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 9', topic: 'Functions — the inverse of 1/√x + 4, domain included', type: 'mc', hasDetail: true, percentCorrect: 76 },
  { id: 'meth-q10-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 10', topic: 'Functions — which rule is its own inverse', type: 'mc', hasDetail: true, percentCorrect: 66 },
  { id: 'meth-q11-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 11', topic: 'Probability — two marbles of different colours, without replacement', type: 'mc', hasDetail: true, percentCorrect: 62 },
  { id: 'meth-q13-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 13', topic: 'Functions — restricting cos(log_a x) so it is one-to-one', type: 'mc', hasDetail: true, percentCorrect: 42 },
  { id: 'meth-q14-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 14', topic: 'Probability — a conditional written in terms of two tail probabilities', type: 'mc', hasDetail: true, percentCorrect: 45 },
  { id: 'meth-q15-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 15', topic: 'Calculus — the open-box optimisation', type: 'mc', hasDetail: true, percentCorrect: 44 },
  { id: 'meth-q16-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 16', topic: 'Probability — recovering E(X²) from the mean and variance', type: 'mc', hasDetail: true, percentCorrect: 46 },
  { id: 'meth-q17-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 17', topic: 'Algebra — when simultaneous linear equations have no solution', type: 'mc', hasDetail: true, percentCorrect: 50 },
  { id: 'meth-q18-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 18', topic: 'Algebra — a discriminant condition for two distinct intersections', type: 'mc', hasDetail: true, percentCorrect: 53 },
  { id: 'meth-q20-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 20', topic: 'Calculus — the average value of a piecewise-linear function', type: 'mc', hasDetail: true, percentCorrect: 44 },
  { id: 'meth-q2-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q2(a–h)', topic: 'Calculus — optimisation and related rates (melting ice cylinder)', type: 'sa', hasDetail: true },
  { id: 'meth-q1-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q1(a–d)', topic: 'Trigonometry — a sinusoidal population model and the fraction of a year below a level', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q3(a–d)', topic: 'Calculus — a concentration model, its peak, and average vs instantaneous rate', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q5(a–f)', topic: 'Calculus — factorising x⁴ − 8x, counting intercepts, and tangents through a point', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q4(a–g)', topic: 'Probability — normal heights, a sine density, a binomial, and a two-state chain', type: 'sa', hasDetail: true },

  // The complete 2014 Methods Exam 1 (short answer), checked with sympy against the VCAA
  // examination report.
  { id: 'meth-q1-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q1(a–b)', topic: 'Calculus — a product rule, then a chain rule evaluated at a point', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q2', topic: 'Calculus — a definite integral written as a single logarithm', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q3', topic: 'Trigonometry — solving 2cos(2x) = −√3 on a restricted domain', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q4', topic: 'Algebra — an index equation solved by matching bases', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q5(a–c)', topic: 'Calculus — stationary points of a restricted cubic, and an enclosed area', type: 'sa', hasDetail: true },
  { id: 'meth-q6-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q6', topic: 'Algebra — a logarithm equation and the index law behind it', type: 'sa', hasDetail: true },
  { id: 'meth-q7-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q7', topic: 'Calculus — antidifferentiating a trigonometric derivative', type: 'sa', hasDetail: true },
  { id: 'meth-q8-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q8(a–b)', topic: 'Probability — the median of an exponential density, then a conditional', type: 'sa', hasDetail: true },
  { id: 'meth-q9-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q9(a–b)', topic: 'Probability — total probability, then the reverse conditional', type: 'sa', hasDetail: true },
  { id: 'meth-q10-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q10(a–b)', topic: 'Calculus — a tangent to a parabola, then optimising an area on a closed interval', type: 'sa', hasDetail: true },

  // The 6 hardest Methods MCQs from 2015 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q3-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 3', topic: 'Graphs — identifying a quartic rule from its graph', type: 'mc', hasDetail: true, percentCorrect: 20 },
  { id: 'meth-q16-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — antiderivatives of power functions', type: 'mc', hasDetail: true, percentCorrect: 22, hasVideo: true },
  { id: 'meth-q11-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 11', topic: 'Transformations — identifying a single dilation', type: 'mc', hasDetail: true, percentCorrect: 24 },
  { id: 'meth-q9-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 9', topic: 'Probability — E(X) for a uniform distribution', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'meth-q21-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 21', topic: 'Graphs — a line and a parabola with no intersection', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'meth-q17-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — turning points and number of x-intercepts', type: 'mc', hasDetail: true, percentCorrect: 60 },

  // The rest of 2015 Methods Exam 2 Section 1. MCQ 18 and 22 are on the skip guide as
  // standalone modulus questions, off the current Methods study design; they are kept
  // because analysing f(|x|) is still current Specialist content, and each one says so in
  // its Background.
  { id: 'meth-q1-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 1', topic: 'Trigonometry — period and range of 2sin(3x) − 3', type: 'mc', hasDetail: true, percentCorrect: 95 },
  { id: 'meth-q2-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 2', topic: 'Functions — the inverse of 1/√(x + 2)', type: 'mc', hasDetail: true, percentCorrect: 50 },
  { id: 'meth-q4-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 4', topic: 'Calculus — a point on the tangent to y = x² at (2, 4)', type: 'mc', hasDetail: true, percentCorrect: 77 },
  { id: 'meth-q5-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 5', topic: 'Functions — reading the graph of an inverse off the graph of f', type: 'mc', hasDetail: true, percentCorrect: 71 },
  { id: 'meth-q6-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 6', topic: 'Algebra — finding a coefficient from a given polynomial value', type: 'mc', hasDetail: true, percentCorrect: 91 },
  { id: 'meth-q7-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 7', topic: 'Functions — the range of a quadratic on a half-open domain', type: 'mc', hasDetail: true, percentCorrect: 56 },
  { id: 'meth-q8-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 8', topic: 'Calculus — an average value of zero fixing the endpoint of a line', type: 'mc', hasDetail: true, percentCorrect: 53 },
  { id: 'meth-q10-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 10', topic: 'Probability — recovering n and p from E(X) and Var(X)', type: 'mc', hasDetail: true, percentCorrect: 59 },
  { id: 'meth-q12-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 12', topic: 'Probability — at least one red, selecting without replacement', type: 'mc', hasDetail: true, percentCorrect: 60 },
  { id: 'meth-q13-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 13', topic: 'Probability — normalising a piecewise probability density function', type: 'mc', hasDetail: true, percentCorrect: 63 },
  { id: 'meth-q14-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 14', topic: 'Probability — the mean of a discrete distribution', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'meth-q15-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 15', topic: 'Calculus — linearity of the definite integral', type: 'mc', hasDetail: true, percentCorrect: 69 },
  { id: 'meth-q18-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 18', topic: 'Functions — testing a functional equation against five rules', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'meth-q19-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 19', topic: 'Calculus — the fundamental theorem with a variable upper limit', type: 'mc', hasDetail: true, percentCorrect: 68 },
  { id: 'meth-q20-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 20', topic: 'Functions — recovering f(x) from f(x − 1)', type: 'mc', hasDetail: true, percentCorrect: 61 },
  { id: 'meth-q22-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 22', topic: 'Functions — the graph of g(−f(x)) when f(x) = −|x|', type: 'mc', hasDetail: true, percentCorrect: 35 },

  // Section 2 (short-answer). meth-q4-2015-e2 was previously miscatalogued as 2014 Exam 1
  // Q4 — that question is actually a 2-mark "solve 2^(3x-3)=8^(2-x)" (confirmed against the
  // real 2014 Exam 1 paper), nothing like this 9-mark sine-area question. The content below
  // matches 2015 Exam 2 Q4 exactly (confirmed against the source PDF and report), so it's
  // recatalogued here with its real year/exam and real examiner-report stats added.
  { id: 'meth-q3-2015-e2', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'Q3(a–d)', topic: 'Probability — continuous distribution, binomial, normal, and geometric-style modelling', type: 'sa', hasDetail: true },
  { id: 'meth-q1-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q1(a–b)', topic: 'Calculus — a chain rule, then a quotient rule with a logarithm', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q2', topic: 'Calculus — antidifferentiating 1 − 3/x and pinning the constant', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q3', topic: 'Calculus — a definite integral of x^(−1/2), not a logarithm', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q4(a–c)', topic: 'Calculus — stationary points of a restricted cubic, and an average value', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q5(a–b)', topic: 'Trigonometry — minimum depth and the times at a given depth', type: 'sa', hasDetail: true },
  { id: 'meth-q6-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q6(a–b)', topic: 'Probability — standardising, then a conditional from the 68–95 facts', type: 'sa', hasDetail: true },
  { id: 'meth-q7-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q7(a–b)', topic: 'Algebra — a logarithm equation, then a hidden quadratic in e^t', type: 'sa', hasDetail: true },
  { id: 'meth-q8-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q8(a–c)', topic: 'Probability — a conditional, a complement, and independence', type: 'sa', hasDetail: true },
  { id: 'meth-q9-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q9(a–b)', topic: 'Probability — total probability in terms of p, then solving for p', type: 'sa', hasDetail: true },
  { id: 'meth-q10-2015-e1', subject: 'methods', year: 2015, exam: 'Exam 1', code: 'Q10(a–d)', topic: 'Calculus — a tangent to a circle, then minimising a trapezium area', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2015-e2', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'Q4(a–d)', topic: 'Calculus — area between sine graphs', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2015-e2', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'Q5(a–d)', topic: 'Calculus — optimising a sum of exponentials', type: 'sa', hasDetail: true },
  { id: 'meth-q1-2015-e2', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'Q1(a–d)', topic: 'Calculus — a tangent to a cubic and the area it encloses', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2015-e2', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'Q2(a–f)', topic: 'Calculus — a parabolic bridge frame and a cubic road', type: 'sa', hasDetail: true },

  // The 6 hardest Methods MCQs from 2016 Exam 2 Section A, by VCAA-reported % correct
  // (matrix-representation questions excluded — matrices aren't part of the current VCE
  // Methods study design; MCQ 20 (17%, "the matrix mapping..." per its own report comment)
  // was removed for this, backfilled by MCQ 12).
  { id: 'meth-q19-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 19', topic: 'Probability — bounding E(X) for a discrete distribution', type: 'mc', hasDetail: true, percentCorrect: 15 },
  { id: 'meth-q14-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 14', topic: 'Calculus — maximum area of a rectangle under a parabola', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'meth-q9-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — deriving ∫xe^(kx)dx from a given derivative', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q1-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 1', topic: 'Functions — the domain of a decreasing linear function from its range', type: 'mc', hasDetail: true, percentCorrect: 92 },
  { id: 'meth-q2-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 2', topic: 'Trigonometry — period and range of 1 − 2cos(πx/2)', type: 'mc', hasDetail: true, percentCorrect: 90 },
  { id: 'meth-q3-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 3', topic: 'Calculus — where a cubic is decreasing, from its turning points', type: 'mc', hasDetail: true, percentCorrect: 77 },
  { id: 'meth-q4-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 4', topic: 'Calculus — average rate of change of 3x² − 2√(x+1) over [0, 3]', type: 'mc', hasDetail: true, percentCorrect: 85 },
  { id: 'meth-q5-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 5', topic: 'Functions — the inverse of √(2x − 6), rule and domain', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'meth-q6-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 6', topic: 'Trigonometry — the square of a chord length on y = sin(2x)', type: 'mc', hasDetail: true, percentCorrect: 67 },
  { id: 'meth-q7-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 7', topic: 'Probability — two students owning the same number of pets', type: 'mc', hasDetail: true, percentCorrect: 74 },
  { id: 'meth-q8-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 8', topic: 'Trigonometry — matching a UV-index graph to a cosine model', type: 'mc', hasDetail: true, percentCorrect: 77 },
  { id: 'meth-q13-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 13', topic: 'Calculus — a shaded region where the lower curve stops early', type: 'mc', hasDetail: true, percentCorrect: 69 },
  { id: 'meth-q15-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 15', topic: 'Probability — two marbles of the same colour, without replacement', type: 'mc', hasDetail: true, percentCorrect: 84 },
  { id: 'meth-q16-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 16', topic: 'Probability — standardising a normal probability', type: 'mc', hasDetail: true, percentCorrect: 78 },
  { id: 'meth-q17-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 17', topic: 'Probability — a sample proportion that is a binomial in disguise', type: 'mc', hasDetail: true, percentCorrect: 56 },
  { id: 'meth-q18-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 18', topic: 'Probability — solving Pr(X < a) for a cosine density on [3π, 5π]', type: 'mc', hasDetail: true, percentCorrect: 62 },
  { id: 'meth-q20-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 20', topic: 'Transformations — how a reflection, dilation and translation change an integral', type: 'mc', hasDetail: true, percentCorrect: 17 },
  { id: 'meth-q11-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 11', topic: 'Algebra — testing candidate rules against a functional equation', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'meth-q10-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — tangent parallel to a chord of intercepts', type: 'mc', hasDetail: true, percentCorrect: 52 },
  { id: 'meth-q12-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 12', topic: 'Transformations — a reflection and dilation applied to a square-root rule', type: 'mc', hasDetail: true, percentCorrect: 52 },

  { id: 'meth-q8-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q8(a–b)', topic: 'Calculus — an antiderivative of x^(k-1)ln(x), then a probability and a median comparison', type: 'sa', hasDetail: true },
  { id: 'meth-q1-2016-e2', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'Q1(a–f)', topic: 'Trigonometry — period, range, tangents, and a transformation carrying f to f′', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2016-e2', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'Q2(a–c)', topic: 'Calculus — an antiderivative, a tangent and its perpendicular, and a length', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2016-e2', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'Q3(a–h)', topic: 'Probability — laptops: binomials, normals, a confidence interval and a density', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2016-e2', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'Q4(a–f)', topic: 'Functions — a hyperbola and its inverse, then the whole family (kx+1)/(x+k)', type: 'sa', hasDetail: true },
  { id: 'meth-q1-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q1(a–b)', topic: 'Calculus — a quotient rule, then a product rule evaluated at x = 1', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q2(a–b)', topic: 'Calculus — the derivative of √(1−2x), then a gradient turned into an angle', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q3(a–b)', topic: 'Functions — sketching a hyperbola, then an area under it', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q4(a–c)', topic: 'Probability — four sampled sheep a day, then six independent days', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q5(a–b)', topic: 'Functions — the composite logₑ(x²+1), its stationary point, and its inverse', type: 'sa', hasDetail: true },
  { id: 'meth-q6-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q6(a–b)', topic: 'Calculus — average rate of change versus average value on one interval', type: 'sa', hasDetail: true },
  { id: 'meth-q7-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q7(a–b)', topic: 'Probability — two assembly lines, total probability and the reverse conditional', type: 'sa', hasDetail: true },

  // The 6 hardest Specialist MCQs from 2015 Exam 2 Section A, by VCAA-reported % correct.
  // Mechanics questions (no longer on the VCE study design) are excluded from these picks —
  // spec-q14-2016 and spec-q22-2015 (Mechanics) were removed entirely for the same reason.
  { id: 'spec-q4-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 4', topic: 'Coordinate geometry — hyperbola from its asymptotes', type: 'mc', hasDetail: true, percentCorrect: 43 },
  { id: 'spec-q6-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — matching a relation to a point', type: 'mc', hasDetail: true, percentCorrect: 43 },
  { id: 'spec-q9-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 9', topic: 'Complex numbers — comparing z1 and z1z2 on an Argand diagram', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'spec-q17-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 17', topic: 'Vectors — the cosine of an angle from position vectors', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'spec-q3-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 3', topic: 'Coordinate geometry — classifying a family of conics', type: 'mc', hasDetail: true, percentCorrect: 50 },
  { id: 'spec-q10-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — a definite integral by substitution', type: 'mc', hasDetail: true, percentCorrect: 56 },

  // The rest of 2015 Specialist Exam 2 Section 1, answers and percentages read off the
  // rendered report table (the correct option is marked only by shading). MCQ 16, 19 and 21
  // are omitted — all three are Mechanics (equilibrium of three coplanar forces, connected
  // masses over a pulley, and friction on a rough plane), which is no longer an area of
  // study. MCQ 15, 20 and 22 use mechanics wording but the mathematics is a vector resolute,
  // constant-acceleration kinematics and a separable differential equation respectively, so
  // they are included — matching the skip guide's own note on this paper.
  { id: 'spec-q1-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 1', topic: 'Conics — parametrising a translated ellipse', type: 'mc', hasDetail: true, percentCorrect: 84 },
  { id: 'spec-q2-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 2', topic: 'Functions — the range of (2 − x)arcsin(x/2 − 1)', type: 'mc', hasDetail: true, percentCorrect: 70 },
  { id: 'spec-q5-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex numbers — modulus and argument of a fifth power', type: 'mc', hasDetail: true, percentCorrect: 81 },
  { id: 'spec-q7-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 7', topic: 'Complex numbers — a 63rd power by De Moivre', type: 'mc', hasDetail: true, percentCorrect: 63 },
  { id: 'spec-q8-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 8', topic: 'Complex numbers — which modulus relation is not a circle', type: 'mc', hasDetail: true, percentCorrect: 57 },
  { id: 'spec-q11-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 11', topic: 'Kinematics — displacement as signed area under a velocity–time graph', type: 'mc', hasDetail: true, percentCorrect: 66 },
  { id: 'spec-q12-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 12', topic: 'Differential equations — a separable equation with an initial condition', type: 'mc', hasDetail: true, percentCorrect: 76 },
  { id: 'spec-q13-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 13', topic: 'Differential equations — tracing a solution through a direction field', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'spec-q14-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 14', topic: 'Differential equations — which second-order equation x·sin(x) satisfies', type: 'mc', hasDetail: true, percentCorrect: 76 },
  { id: 'spec-q15-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 15', topic: 'Vectors — the vector resolute of one vector along another', type: 'mc', hasDetail: true, percentCorrect: 49 },
  { id: 'spec-q18-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 18', topic: 'Vectors — when two moving particles collide', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'spec-q20-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 20', topic: 'Kinematics — constant acceleration with a reversal of direction', type: 'mc', hasDetail: true, percentCorrect: 60 },
  { id: 'spec-q22-2015', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'MCQ 22', topic: 'Differential equations — time to maximum height with air resistance', type: 'mc', hasDetail: true, percentCorrect: 42 },

  // 2014 Specialist Exam 2 Section 1, answers and percentages read off the rendered report
  // table (the correct option is marked only by shading). MCQ 18, 19 and 20 are omitted as
  // Mechanics; MCQ 21 and 22 use kinematics wording but involve no forces at all, so they
  // are included.
  { id: 'spec-q1-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 1', topic: 'Coordinate geometry — where a hyperbola’s asymptotes cut the axes', type: 'mc', hasDetail: true, percentCorrect: 85 },
  { id: 'spec-q2-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 2', topic: 'Coordinate geometry — completing the square to read off an ellipse', type: 'mc', hasDetail: true, percentCorrect: 71 },
  { id: 'spec-q3-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 3', topic: 'Functions — an asymptote versus a point of discontinuity', type: 'mc', hasDetail: true, percentCorrect: 66 },
  { id: 'spec-q4-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 4', topic: 'Functions — the domain of arcsin(2x − 1)', type: 'mc', hasDetail: true, percentCorrect: 90 },
  { id: 'spec-q5-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex numbers — squaring in polar form', type: 'mc', hasDetail: true, percentCorrect: 85 },
  { id: 'spec-q6-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — index laws with powers of i', type: 'mc', hasDetail: true, percentCorrect: 65 },
  { id: 'spec-q7-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 7', topic: 'Complex numbers — the sum of the roots of a cubic', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'spec-q8-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 8', topic: 'Complex numbers — the principal argument of a quotient', type: 'mc', hasDetail: true, percentCorrect: 69 },
  { id: 'spec-q9-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 9', topic: 'Complex numbers — which line cuts a circle twice', type: 'mc', hasDetail: true, percentCorrect: 56 },
  { id: 'spec-q10-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 10', topic: 'Differential equations — a mixing problem with a changing volume', type: 'mc', hasDetail: true, percentCorrect: 64 },
  { id: 'spec-q11-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 11', topic: 'Differential equations — one step of Euler’s method', type: 'mc', hasDetail: true, percentCorrect: 77 },
  { id: 'spec-q12-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 12', topic: 'Calculus — an initial value plus a definite integral', type: 'mc', hasDetail: true, percentCorrect: 64 },
  { id: 'spec-q13-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 13', topic: 'Calculus — changing an integral by substitution, terminals included', type: 'mc', hasDetail: true, percentCorrect: 65 },
  { id: 'spec-q14-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 14', topic: 'Differential equations — matching a direction field to its equation', type: 'mc', hasDetail: true, percentCorrect: 72 },
  { id: 'spec-q15-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 15', topic: 'Vectors — the angle between two vectors, then a double angle', type: 'mc', hasDetail: true, percentCorrect: 69 },
  { id: 'spec-q16-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 16', topic: 'Vectors — a magnitude and a perpendicularity condition', type: 'mc', hasDetail: true, percentCorrect: 77 },
  { id: 'spec-q17-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 17', topic: 'Vectors — antidifferentiating an acceleration vector from rest', type: 'mc', hasDetail: true, percentCorrect: 62 },
  { id: 'spec-q21-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 21', topic: 'Kinematics — acceleration as a function of displacement', type: 'mc', hasDetail: true, percentCorrect: 52 },
  { id: 'spec-q22-2014', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'MCQ 22', topic: 'Kinematics — total distance from a velocity–time graph', type: 'mc', hasDetail: true, percentCorrect: 49 },

  // 2014 Specialist Exam 2 Section 2 (extended response), checked with sympy against the
  // VCAA examination report. Question 5 is omitted — blocks connected by ropes over a pulley
  // on an inclined plane, i.e. Mechanics, which is no longer an area of study.
  { id: 'spec-q1-2014-e2', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'Q1(a–d)', topic: 'Calculus — stationary point, asymptotes and a volume of revolution', type: 'sa', hasDetail: true },
  { id: 'spec-q2-2014-e2', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'Q2(a–c)', topic: 'Complex numbers — polar form, cube roots, a circle and a tangent to it', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2014-e2', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'Q3(a–b)', topic: 'Vectors — parallel and perpendicular resolutes, then a parallelogram', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2014-e2', subject: 'specialist', year: 2014, exam: 'Exam 2', code: 'Q4(a–d)', topic: 'Related rates — a conical tank filling and draining, then a bucket', type: 'sa', hasDetail: true },

  // The complete 2014 Specialist Exam 1 (short answer), checked with sympy against the VCAA
  // examination report. Question 8 is omitted: it is a body held in equilibrium by two strings,
  // i.e. Mechanics, which is no longer an area of study. The 2014 Specialist papers and reports
  // were fetched from vcaa.vic.edu.au and now sit alongside the rest under public/exams.
  { id: 'spec-q1-2014-e1', subject: 'specialist', year: 2014, exam: 'Exam 1', code: 'Q1(a–c)', topic: 'Vectors — a unit vector, an angle with the x-axis, and perpendicularity', type: 'sa', hasDetail: true },
  { id: 'spec-q2-2014-e1', subject: 'specialist', year: 2014, exam: 'Exam 1', code: 'Q2(a–c)', topic: 'Vectors — a parametric path in cartesian form, its sketch, and a speed', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2014-e1', subject: 'specialist', year: 2014, exam: 'Exam 1', code: 'Q3(a–b)', topic: 'Complex numbers — factorising a real quartic from one complex root', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2014-e1', subject: 'specialist', year: 2014, exam: 'Exam 1', code: 'Q4', topic: 'Calculus — implicit differentiation and the gradient of a normal', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2014-e1', subject: 'specialist', year: 2014, exam: 'Exam 1', code: 'Q5(a–c)', topic: 'Calculus — a double-angle simplification, then integration by substitution', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2014-e1', subject: 'specialist', year: 2014, exam: 'Exam 1', code: 'Q6(a–b)', topic: 'Calculus — a division identity and the volume of revolution that uses it', type: 'sa', hasDetail: true },
  { id: 'spec-q7-2014-e1', subject: 'specialist', year: 2014, exam: 'Exam 1', code: 'Q7(a–c)', topic: 'Calculus — the range of 3x·arctan(2x) and the area under arctan(2x)', type: 'sa', hasDetail: true },

  // The complete 2015 Specialist Exam 1 (short answer), cross-referenced against the VCAA
  // examination report and checked with sympy. Question 2 is omitted: both its parts are
  // Mechanics (the reaction force on a parcel in an accelerating lift), and Mechanics is no
  // longer an area of study in VCE Specialist Mathematics.
  { id: 'spec-q1-2015-e1', subject: 'specialist', year: 2015, exam: 'Exam 1', code: 'Q1(a–b)', topic: 'Vectors — the side of a rhombus, then perpendicular diagonals', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2015-e1', subject: 'specialist', year: 2015, exam: 'Exam 1', code: 'Q3', topic: 'Vectors — antidifferentiating a velocity vector to a distance from the origin', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2015-e1', subject: 'specialist', year: 2015, exam: 'Exam 1', code: 'Q4(a–b)', topic: 'Complex numbers — the cube roots of 8i, then the same roots translated', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2015-e1', subject: 'specialist', year: 2015, exam: 'Exam 1', code: 'Q5', topic: 'Calculus — a volume of revolution about the y-axis', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2015-e1', subject: 'specialist', year: 2015, exam: 'Exam 1', code: 'Q6', topic: 'Differential equations — acceleration as a function of velocity', type: 'sa', hasDetail: true },
  { id: 'spec-q7-2015-e1', subject: 'specialist', year: 2015, exam: 'Exam 1', code: 'Q7(a–b)', topic: 'Trigonometry — solving sin(2x) = sin(x), then a cosec inequality', type: 'sa', hasDetail: true },
  { id: 'spec-q8-2015-e1', subject: 'specialist', year: 2015, exam: 'Exam 1', code: 'Q8(a–d)', topic: 'Calculus — an antiderivative of tan(2x), the inverse of arctan(x)/2, and an area', type: 'sa', hasDetail: true },
  { id: 'spec-q9-2015-e1', subject: 'specialist', year: 2015, exam: 'Exam 1', code: 'Q9(a–c)', topic: 'Calculus — implicit differentiation, two tangents, and the angle between them', type: 'sa', hasDetail: true },

  // The complete 2015 Specialist Exam 2 Section 2 (extended response), checked with sympy
  // against the VCAA examination report. Question 5 appears as part (d) only: parts (a)-(c)
  // resolve the weight force on a trailer held on a ramp, which is Mechanics and no longer an
  // area of study, while part (d) starts from a differential equation the paper prints in
  // full — the treatment the skip guide's own row for this paper recommends.
  { id: 'spec-q1-2015-e2', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'Q1(a–f)', topic: 'Calculus — implicit differentiation, an inverse function, and a volume of revolution', type: 'sa', hasDetail: true },
  { id: 'spec-q2-2015-e2', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'Q2(a–b)', topic: 'Complex numbers — a perpendicular-bisector line, a circle, and a quadratic in cis form', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2015-e2', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'Q3(a–e)', topic: 'Calculus — a parametric curve, its cartesian form, and the area it encloses', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2015-e2', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'Q4(a–e)', topic: 'Vectors — a helicopter on a helix: elevation, period, speed and distance', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2015-e2', subject: 'specialist', year: 2015, exam: 'Exam 2', code: 'Q5(d)', topic: 'Differential equations — a sinking trailer, by separation and a definite integral', type: 'sa', hasDetail: true },

  // The 6 hardest Specialist MCQs from 2016 Exam 2 Section A, by VCAA-reported % correct
  // (spec-mcq6 above is also a 2016 MCQ, at 57%).
  { id: 'spec-q7-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 7', topic: 'Calculus — parametric differentiation', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'spec-q9-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 9', topic: "Differential equations — three steps of Euler's method", type: 'mc', hasDetail: true, percentCorrect: 55 },
  { id: 'spec-q1-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 1', topic: 'Coordinate geometry — a parabola from cosec/cot parametric equations', type: 'mc', hasDetail: true, percentCorrect: 61 },
  { id: 'spec-q2-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 2', topic: 'Functions — the implied domain of arccos((x − a)/b)', type: 'mc', hasDetail: true, percentCorrect: 84 },
  { id: 'spec-q3-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 3', topic: 'Graphs — the asymptotes of (x³ − ax)/x², including an oblique one', type: 'mc', hasDetail: true, percentCorrect: 71 },
  { id: 'spec-q4-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 4', topic: 'Complex Numbers — b and c from one complex root of a cubic', type: 'mc', hasDetail: true, percentCorrect: 68 },
  { id: 'spec-q5-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex Numbers — finding a from Arg(−1 + ai) = −2π/3', type: 'mc', hasDetail: true, percentCorrect: 72 },
  { id: 'spec-q8-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 8', topic: 'Calculus — rewriting an integral after the substitution u = x⁴', type: 'mc', hasDetail: true, percentCorrect: 73 },
  { id: 'spec-q11-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 11', topic: 'Vectors — a scalar resolute equation solved for a parameter', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'spec-q12-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 12', topic: 'Vectors — finding m so that a − b is perpendicular to b', type: 'mc', hasDetail: true, percentCorrect: 72 },
  { id: 'spec-q15-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 15', topic: 'Vectors — converting v = f(x) into an acceleration, then a force', type: 'mc', hasDetail: true, percentCorrect: 58 },
  { id: 'spec-q16-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 16', topic: 'Vectors — projectile range from an initial speed and angle', type: 'mc', hasDetail: true, percentCorrect: 46 },
  { id: 'spec-q19-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 19', topic: 'Statistics — a 95% confidence interval for a mean', type: 'mc', hasDetail: true, percentCorrect: 78 },
  { id: 'spec-q20-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 20', topic: 'Statistics — the distribution of a sample mean of 25', type: 'mc', hasDetail: true, percentCorrect: 68 },
  { id: 'spec-q2-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q2', topic: 'Statistics — a 95% confidence interval for a mean, using the 95% rule', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q3', topic: 'Calculus — implicit differentiation, then the perpendicular line at a point', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q4', topic: 'Calculus — a related rate: the surface area of a cube of side arctan(t)', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q5(a–b)', topic: 'Vectors — a vector resolute, then linear dependence solved for d', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q6', topic: 'Complex Numbers — a quotient of powers, done in polar form', type: 'sa', hasDetail: true },
  { id: 'spec-q7-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q7', topic: 'Calculus — arc length where the integrand collapses to a perfect square', type: 'sa', hasDetail: true },
  { id: 'spec-q8-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q8(a–c)', topic: 'Vectors — speed from a position vector, and the maximum net force', type: 'sa', hasDetail: true },
  { id: 'spec-q9-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q9', topic: 'Trigonometry — cos(x + y) from cos(x − y) and tan(x)tan(y)', type: 'sa', hasDetail: true },
  { id: 'spec-q10-2016-e1', subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q10', topic: 'Differential Equations — a separable equation with an arcsin antiderivative', type: 'sa', hasDetail: true },
  { id: 'spec-q18-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 18', topic: 'Statistics — mean and sd of a sum of independent variables', type: 'mc', hasDetail: true, percentCorrect: 61 },
  { id: 'spec-q10-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 10', topic: 'Differential equations — tracing a solution through a direction field', type: 'mc', hasDetail: true, percentCorrect: 65 },

  // The 6 hardest Methods MCQs from 2017 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q17-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — area under an even function as one integral', type: 'mc', hasDetail: true, percentCorrect: 21 },
  { id: 'meth-q7-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 7', topic: 'Quadratics — discriminant condition for no real roots', type: 'mc', hasDetail: true, percentCorrect: 32 },
  { id: 'meth-q1-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 1', topic: 'Trigonometry — period and range of 5sin(2x) − 1', type: 'mc', hasDetail: true, percentCorrect: 92 },
  { id: 'meth-q2-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 2', topic: 'Calculus — reading where a cubic is decreasing off its turning points', type: 'mc', hasDetail: true, percentCorrect: 80 },
  { id: 'meth-q3-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 3', topic: 'Probability — two marbles of different colours, drawn without replacement', type: 'mc', hasDetail: true, percentCorrect: 83 },
  { id: 'meth-q4-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 4', topic: 'Functions — evaluating a composite from a table of values', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'meth-q5-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 5', topic: 'Statistics — recovering the sample proportion from a confidence interval', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'meth-q6-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 6', topic: 'Functions — identifying the graph of an inverse', type: 'mc', hasDetail: true, percentCorrect: 88 },
  { id: 'meth-q8-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 8', topic: 'Logarithms — transposing y = a^(b − 4x) + 2 for x', type: 'mc', hasDetail: true, percentCorrect: 64 },
  { id: 'meth-q9-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — average rate of change over [1, a], solved for a', type: 'mc', hasDetail: true, percentCorrect: 78 },
  { id: 'meth-q10-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 10', topic: 'Transformations — two dilations applied to a sine graph, giving a cosine', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'meth-q11-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 11', topic: 'Calculus — finding a and b from where a cubic turns', type: 'mc', hasDetail: true, percentCorrect: 72 },
  { id: 'meth-q14-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 14', topic: 'Probability — variance of a three-valued distribution in terms of p', type: 'mc', hasDetail: true, percentCorrect: 62 },
  { id: 'meth-q15-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 15', topic: 'Calculus — maximising the area of a rectangle under y = −x³ + 8', type: 'mc', hasDetail: true, percentCorrect: 58 },
  { id: 'meth-q19-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 19', topic: 'Probability — the left endpoint of a density function of width 1', type: 'mc', hasDetail: true, percentCorrect: 59 },
  { id: 'meth-q20-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 20', topic: 'Calculus — ratio of a region between two curves to a triangle', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'meth-q18-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 18', topic: 'Probability — smallest n so that binomial mean equals sd', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'meth-q16-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 16', topic: 'Probability — a binomial probability from a given one', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q12-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 12', topic: 'Trigonometry — sum of solutions on an interval', type: 'mc', hasDetail: true, percentCorrect: 45 },
  { id: 'meth-q13-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 13', topic: 'Algebra — the identity that fails for h(x) = 1/(x-1)', type: 'mc', hasDetail: true, percentCorrect: 46 },

  { id: 'meth-q3-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q3(a–b)', topic: 'Calculus — expanding a factorised cubic, then sketching it', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q4', topic: 'Probability — smallest sample size for a bound on sd(P̂)', type: 'sa', hasDetail: true },
  { id: 'meth-q1-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q1(a–b)', topic: 'Calculus — a quotient rule, then a chain rule evaluated at x = 1', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q2(a–b)', topic: 'Calculus — the derivative of x logₑ(3x), then integration by recognition', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q5(a–c)', topic: 'Probability — at most three independent attempts at a password', type: 'sa', hasDetail: true },
  { id: 'meth-q6-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q6(a–b)', topic: 'Trigonometry — a factorised equation, then a difference of two squares in sin and cos', type: 'sa', hasDetail: true },
  { id: 'meth-q7-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q7(a–c)', topic: 'Functions — when a composite exists, and what its range is', type: 'sa', hasDetail: true },
  { id: 'meth-q8-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q8(a–c)', topic: 'Probability — two conditional probabilities, everything else in terms of p', type: 'sa', hasDetail: true },
  { id: 'meth-q9-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q9(a–d)', topic: 'Calculus — area under √x(1−x), a show-that derivative, and a right-angled triangle of tangents', type: 'sa', hasDetail: true },
  { id: 'meth-q1-2017-e2', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'Q1(a–d)', topic: 'Calculus — turning points, a chord, and an area that collapses to (k+1)²/4', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2017-e2', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'Q2(a–h)', topic: 'Trigonometry — a Ferris wheel, a tangent line of sight, and an arc turned into a time', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2017-e2', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'Q3(a–g)', topic: 'Probability — a triangular density function with a binomial layered on top', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2017-e2', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'Q4(a–i)', topic: 'Functions — 2^(x+1) − 2 and its inverse, then the family 2e^(kx) − 2', type: 'sa', hasDetail: true },

  // The 6 hardest Methods MCQs from 2018 Exam 2 Section A, by VCAA-reported % correct
  // (matrix-representation questions excluded; MCQ 20 (20%, an explicit matrix mapping per
  // its own report comment) was removed for this, backfilled by MCQ 19).
  { id: 'meth-q18-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 18', topic: 'Calculus — comparing derivatives of two power functions', type: 'mc', hasDetail: true, percentCorrect: 14 },
  { id: 'meth-q11-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 11', topic: 'Graphs — pinning down tan(ax) from its asymptote', type: 'mc', hasDetail: true, percentCorrect: 26 },
  { id: 'meth-q19-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 19', topic: 'Calculus — total area between cos(πx/2) and sin(πx) across four regions', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q4-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 4', topic: 'Transformations — tracking a point through a dilation and shift', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'meth-q15-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 15', topic: 'Probability — the equation defining a median', type: 'mc', hasDetail: true, percentCorrect: 49 },
  { id: 'meth-q16-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — rectangle approximation vs. exact area', type: 'mc', hasDetail: true, percentCorrect: 49 },

  // The 6 hardest Specialist MCQs from 2017 Exam 2 Section A, by VCAA-reported % correct.
  // spec-q17-2017 (Mechanics) was removed — no longer on the VCE study design.
  { id: 'spec-q10-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — inflection points of |f(x)|', type: 'mc', hasDetail: true, percentCorrect: 6 },
  { id: 'spec-q2-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 2', topic: 'Trigonometry — a cosec inequality', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'spec-q1-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 1', topic: 'Functions — the implied domain of 2arccos(1/x)', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'spec-q4-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 4', topic: 'Complex Numbers — the nth roots of 1 + i', type: 'mc', hasDetail: true, percentCorrect: 53 },
  { id: 'spec-q5-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex Numbers — a point on the perpendicular-bisector locus', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'spec-q7-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 7', topic: 'Calculus — rewriting an integral after the substitution u = 2 − x', type: 'mc', hasDetail: true, percentCorrect: 60 },
  { id: 'spec-q8-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 8', topic: 'Calculus — where the gradient of a cubic is strictly increasing', type: 'mc', hasDetail: true, percentCorrect: 29 },
  { id: 'spec-q11-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 11', topic: 'Vectors — the value of d making three vectors linearly dependent', type: 'mc', hasDetail: true, percentCorrect: 76 },
  { id: 'spec-q12-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 12', topic: 'Vectors — when a parametric path is a circle rather than an ellipse', type: 'mc', hasDetail: true, percentCorrect: 49 },
  { id: 'spec-q13-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 13', topic: 'Vectors — the vector resolute of a in the direction of b', type: 'mc', hasDetail: true, percentCorrect: 78 },
  { id: 'spec-q15-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 15', topic: 'Vectors — constant velocity from two displacements', type: 'mc', hasDetail: true, percentCorrect: 71 },
  { id: 'spec-q18-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 18', topic: 'Statistics — a linear combination of two independent normals', type: 'mc', hasDetail: true, percentCorrect: 42 },
  { id: 'spec-q20-2017', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'MCQ 20', topic: 'Statistics — the decision rule for a one-sided test at 5%', type: 'mc', hasDetail: true, percentCorrect: 77 },
  { id: 'spec-q1-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q1', topic: 'Calculus — implicit differentiation, then the tangent at a point', type: 'sa', hasDetail: true },
  { id: 'spec-q2-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q2', topic: 'Calculus — a definite integral by partial fractions with an irreducible quadratic', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q3', topic: 'Complex Numbers — the other two roots of a real cubic from one complex root', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q4', topic: 'Statistics — the distribution of a sample mean of four', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q5', topic: 'Vectors — solving for a parameter from the angle between two vectors', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q6', topic: 'Calculus — differentiating 1/arcsin(x) and where the derivative exists', type: 'sa', hasDetail: true },
  { id: 'spec-q7-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q7', topic: 'Calculus — arc length of a parametric curve on [0, π/4]', type: 'sa', hasDetail: true },
  { id: 'spec-q8-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q8(a–b)', topic: 'Differential Equations — a slope field and the separable equation behind it', type: 'sa', hasDetail: true },
  { id: 'spec-q10-2017-e1', subject: 'specialist', year: 2017, exam: 'Exam 1', code: 'Q10(a–c)', topic: 'Calculus — a show-that derivative used as the antiderivative in a volume of revolution', type: 'sa', hasDetail: true },
  { id: 'spec-q1-2017-e2', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'Q1(a–c)', topic: 'Calculus — asymptotes, an inflection that is not one, and halving a solid of revolution', type: 'sa', hasDetail: true },
  { id: 'spec-q2-2017-e2', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'Q2(a–e)', topic: 'Differential Equations — a skydiver with quadratic air resistance', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2017-e2', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'Q3(a–d)', topic: 'Calculus — a brooch built from arcsin and arccos branches', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2017-e2', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'Q4(a–g)', topic: 'Complex Numbers — the roots of z² + 4z + 16, a locus, and a major segment', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2017-e2', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'Q5(a–d)', topic: 'Vectors — a boat and a jet ski, their speeds, separation and a collision', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2017-e2', subject: 'specialist', year: 2017, exam: 'Exam 2', code: 'Q6(a–e)', topic: 'Statistics — sums versus means, a tolerance, and a one-sided test', type: 'sa', hasDetail: true },
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

  // The 6 hardest Chemistry MCQs from 2015 Exam Section A, by VCAA-reported % correct. VCAA's
  // own report names these as the year's hardest, in this order (Q29 hardest of all).
  { id: 'chem-q29-2015', subject: 'chemistry', year: 2015, exam: 'Exam', code: 'MCQ 29', topic: 'Electrochemistry — cathode reaction and electrode polarity in electrorefining', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'chem-q15-2015', subject: 'chemistry', year: 2015, exam: 'Exam', code: 'MCQ 15', topic: 'Organic chemistry — comparing C-H bond counts across four 24-carbon compounds', type: 'mc', hasDetail: true, percentCorrect: 40 },
  { id: 'chem-q8-2015', subject: 'chemistry', year: 2015, exam: 'Exam', code: 'MCQ 8', topic: 'Analytical chemistry — polarity and attraction in HPLC', type: 'mc', hasDetail: true, percentCorrect: 42 },
  { id: 'chem-q28-2015', subject: 'chemistry', year: 2015, exam: 'Exam', code: 'MCQ 28', topic: 'Electrochemistry — which impurities end up as sludge when refining copper', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'chem-q4-2015', subject: 'chemistry', year: 2015, exam: 'Exam', code: 'MCQ 4', topic: 'Stoichiometry — gas volume via the ideal gas law, then a mole ratio', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'chem-q22-2015', subject: 'chemistry', year: 2015, exam: 'Exam', code: 'MCQ 22', topic: 'Acids and bases — pH of a barium hydroxide solution', type: 'mc', hasDetail: true, percentCorrect: 49 },

  // The 6 hardest Chemistry MCQs from 2016 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q27-2016', subject: 'chemistry', year: 2016, exam: 'Exam', code: 'MCQ 27', topic: 'Rates of reaction — one change that explains both a faster rate and more product', type: 'mc', hasDetail: true, percentCorrect: 21 },
  { id: 'chem-q20-2016', subject: 'chemistry', year: 2016, exam: 'Exam', code: 'MCQ 20', topic: 'Acids and bases — pH and percentage ionisation on dilution', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'chem-q25-2016', subject: 'chemistry', year: 2016, exam: 'Exam', code: 'MCQ 25', topic: 'Redox — which hypothesis cannot explain an unexpected non-reaction', type: 'mc', hasDetail: true, percentCorrect: 35 },
  { id: 'chem-q24-2016', subject: 'chemistry', year: 2016, exam: 'Exam', code: 'MCQ 24', topic: 'Thermochemistry — energy released per gram, methanol vs. octane', type: 'mc', hasDetail: true, percentCorrect: 40 },
  { id: 'chem-q26-2016', subject: 'chemistry', year: 2016, exam: 'Exam', code: 'MCQ 26', topic: 'Stoichiometry — gas pressure produced in a sealed vessel', type: 'mc', hasDetail: true, percentCorrect: 44 },
  { id: 'chem-q29-2016', subject: 'chemistry', year: 2016, exam: 'Exam', code: 'MCQ 29', topic: 'Electrochemistry — cathode reaction and pH change at a standard hydrogen electrode', type: 'mc', hasDetail: true, percentCorrect: 47 },

  // The 6 hardest Chemistry MCQs from 2017 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q9-2017', subject: 'chemistry', year: 2017, exam: 'Exam', code: 'MCQ 9', topic: 'Food chemistry — percentage energy from protein in a serving', type: 'mc', hasDetail: true, percentCorrect: 36 },
  { id: 'chem-q26-2017', subject: 'chemistry', year: 2017, exam: 'Exam', code: 'MCQ 26', topic: 'Gas laws — temperature change to keep pressure constant after adding gas', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'chem-q14-2017', subject: 'chemistry', year: 2017, exam: 'Exam', code: 'MCQ 14', topic: 'Fuels — comparing environmental impact per 100 km across vehicles', type: 'mc', hasDetail: true, percentCorrect: 44 },
  { id: 'chem-q3-2017', subject: 'chemistry', year: 2017, exam: 'Exam', code: 'MCQ 3', topic: 'Organic chemistry — recognising a genuine hydrolysis reaction', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'chem-q22-2017', subject: 'chemistry', year: 2017, exam: 'Exam', code: 'MCQ 22', topic: 'Analytical chemistry — mass of caffeine via HPLC, with a dilution correction', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'chem-q23-2017', subject: 'chemistry', year: 2017, exam: 'Exam', code: 'MCQ 23', topic: 'Experimental design — precision, accuracy, validity and uncertainty', type: 'mc', hasDetail: true, percentCorrect: 49 },

  // The 6 hardest Chemistry MCQs from 2018 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q26-2018', subject: 'chemistry', year: 2018, exam: 'Exam', code: 'MCQ 26', topic: 'Analytical chemistry — titration design for two weak acids, only one redox-active', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'chem-q2-2018', subject: 'chemistry', year: 2018, exam: 'Exam', code: 'MCQ 2', topic: "Food chemistry — what's actually true about aspartame", type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'chem-q12-2018', subject: 'chemistry', year: 2018, exam: 'Exam', code: 'MCQ 12', topic: 'Electrochemistry — why fuel-cell electrodes are porous', type: 'mc', hasDetail: true, percentCorrect: 49 },
  { id: 'chem-q17-2018', subject: 'chemistry', year: 2018, exam: 'Exam', code: 'MCQ 17', topic: 'Analytical chemistry — concentration of oxalic acid from a permanganate titration', type: 'mc', hasDetail: true, percentCorrect: 56 },
  { id: 'chem-q25-2018', subject: 'chemistry', year: 2018, exam: 'Exam', code: 'MCQ 25', topic: 'Thermochemistry — mass of fuel needed for a given energy release, in tonnes', type: 'mc', hasDetail: true, percentCorrect: 57 },
  { id: 'chem-q27-2018', subject: 'chemistry', year: 2018, exam: 'Exam', code: 'MCQ 27', topic: 'Equilibrium — Kc for a reversed and doubled reaction', type: 'mc', hasDetail: true, percentCorrect: 59 },

  // The 6 hardest Specialist MCQs from 2019 Exam 2 Section A, by VCAA-reported % correct
  // (Mechanics-topic questions excluded, matching the 2015-2018 batch's convention).
  { id: 'spec-q5-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex numbers — where two Argand-plane rays intersect', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'spec-q4-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 4', topic: 'Complex numbers — a sum of i to consecutive factorial powers', type: 'mc', hasDetail: true, percentCorrect: 44 },
  { id: 'spec-q16-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — acceleration from a = v dv/dx', type: 'mc', hasDetail: true, percentCorrect: 49 },
  { id: 'spec-q6-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — the argument of z⁵/w⁴', type: 'mc', hasDetail: true, percentCorrect: 56 },
  { id: 'spec-q9-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 9', topic: 'Differential equations — matching a direction field to its equation', type: 'mc', hasDetail: true, percentCorrect: 57 },
  { id: 'spec-q10-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — related rates for a growing conical sand pile', type: 'mc', hasDetail: true, percentCorrect: 58 },

  // The rest of 2019 Specialist Exam 2 Section A, filling out the 20-question paper (the 6
  // hardest, above, were already covered). MCQ 13, 14 and 17 are omitted — all three are
  // Mechanics (resolving forces, connected masses over a pulley, equilibrium of three coplanar
  // forces), which is no longer an area of study. MCQ 15 and 16 are kept: both mention a force
  // in passing, but the mathematics is pure vector kinematics/calculus with no force analysis.
  { id: 'spec-q1-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 1', topic: 'Graphs — which feature eˣ/(x−1) does not have', type: 'mc', hasDetail: true, percentCorrect: 72 },
  { id: 'spec-q2-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 2', topic: 'Graphs — the oblique asymptote of a rational function', type: 'mc', hasDetail: true, percentCorrect: 86 },
  { id: 'spec-q3-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 3', topic: 'Trigonometry — the implied domain of a secant function', type: 'mc', hasDetail: true, percentCorrect: 65 },
  { id: 'spec-q7-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 7', topic: 'Calculus — the arc-length integral for a parametric curve', type: 'mc', hasDetail: true, percentCorrect: 70 },
  { id: 'spec-q8-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 8', topic: 'Calculus — rewriting a definite integral under a substitution', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'spec-q11-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 11', topic: 'Vectors — unknown coordinates from a midpoint in 3D', type: 'mc', hasDetail: true, percentCorrect: 66 },
  { id: 'spec-q12-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 12', topic: 'Vectors — the equations behind a vector resolute condition', type: 'mc', hasDetail: true, percentCorrect: 62 },
  // MCQ 13 is mechanics-flavoured, but the skip guide's own row marks it doable: one
  // substitution (net force = mass x acceleration) and the rest is vector work.
  { id: 'spec-q13-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 13', topic: 'Vectors — the angle between two forces acting on a mass', type: 'mc', hasDetail: true, percentCorrect: 51 },
  { id: 'spec-q15-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 15', topic: 'Vectors — the path traced under a constant perpendicular acceleration', type: 'mc', hasDetail: true, percentCorrect: 35 },
  { id: 'spec-q18-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 18', topic: 'Statistics — a 98% confidence interval for a mean', type: 'mc', hasDetail: true, percentCorrect: 76 },
  { id: 'spec-q19-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 19', topic: 'Statistics — coefficients of a linear combination from its mean and variance', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'spec-q20-2019', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'MCQ 20', topic: 'Statistics — the p value for a one-sided test', type: 'mc', hasDetail: true, percentCorrect: 70 },

  // The complete 2019 Specialist Exam 2 Section B (extended response), cross-referenced against
  // itute's independent solutions and the VCAA examination report. Question 5 is omitted — it is
  // a full Mechanics question (masses on an inclined plane connected over a pulley, weight and
  // normal reaction forces, equilibrium), and Mechanics is no longer an area of study.
  { id: 'spec-q1-2019-e2', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'Q1(a–e)', topic: 'Calculus — a parametric curve, its cartesian form, gradient and volume of revolution', type: 'sa', hasDetail: true },
  { id: 'spec-q2-2019-e2', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'Q2(a–d)', topic: 'Complex numbers — conjugate roots and the circle of minimum radius through them', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2019-e2', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'Q3(a–b)', topic: 'Differential equations — exponential growth, separation of variables, and no inflection', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2019-e2', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'Q4(a–e)', topic: 'Vectors — a pyramid on a parallelogram base, its area, unit normal and volume', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2019-e2', subject: 'specialist', year: 2019, exam: 'Exam 2', code: 'Q6(a–f)', topic: 'Statistics — sample means, the difference of two means, and a two-tailed test', type: 'sa', hasDetail: true },

  // The complete 2019 Specialist Exam 1 (short answer), cross-referenced against itute's
  // independent solutions and the VCAA examination report. Question 9 is omitted: both its
  // parts are Mechanics (resolving forces on a mass hanging from a string in equilibrium),
  // and Mechanics is no longer an area of study in VCE Specialist Mathematics.
  { id: 'spec-q1-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q1', topic: 'Differential equations — separating variables with an f′/f integral', type: 'sa', hasDetail: true },
  { id: 'spec-q2-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q2', topic: 'Algebra — solving an absolute value equation case by case', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q3(a–c)', topic: 'Probability — mean and variance of a linear function of a random variable', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q4', topic: 'Vectors — when two particles collide, not just where their paths cross', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q5(a–b)', topic: 'Calculus — turning points of cos²x + cos x + 1, then sketching its reciprocal', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q6', topic: 'Vectors — the value of d making three vectors linearly dependent', type: 'sa', hasDetail: true },
  { id: 'spec-q7-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q7(a–d)', topic: 'Complex numbers — polar form, de Moivre, and when a power is real or imaginary', type: 'sa', hasDetail: true },
  { id: 'spec-q8-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q8', topic: 'Calculus — a solid of revolution whose integrand splits into two standard forms', type: 'sa', hasDetail: true },
  { id: 'spec-q10-2019-e1', subject: 'specialist', year: 2019, exam: 'Exam 1', code: 'Q10', topic: 'Calculus — implicit differentiation at a point, answered in exact surd form', type: 'sa', hasDetail: true },

  // The 6 hardest Specialist MCQs from 2020 Exam 2 Section A, by VCAA-reported % correct
  // (Mechanics-topic questions excluded). MCQ 7 is the hardest MCQ on this whole paper at
  // just 2% — a third-party solutions PDF gets it wrong (see SpecialistQ7_2020.tsx).
  { id: 'spec-q7-2020', subject: 'specialist', year: 2020, exam: 'Exam 2', code: 'MCQ 7', topic: 'Algebra — partial fractions of 1/(ax(x²+b)) with b < 0', type: 'mc', hasDetail: true, percentCorrect: 2 },
  { id: 'spec-q4-2020', subject: 'specialist', year: 2020, exam: 'Exam 2', code: 'MCQ 4', topic: 'Functions — a composite function and its range', type: 'mc', hasDetail: true, percentCorrect: 28 },
  { id: 'spec-q8-2020', subject: 'specialist', year: 2020, exam: 'Exam 2', code: 'MCQ 8', topic: 'Complex numbers — (y − ix)¹⁴ from a known (x + iy)¹⁴', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'spec-q9-2020', subject: 'specialist', year: 2020, exam: 'Exam 2', code: 'MCQ 9', topic: 'Differential equations — matching a curve to its slope field', type: 'mc', hasDetail: true, percentCorrect: 35 },
  { id: 'spec-q2-2020', subject: 'specialist', year: 2020, exam: 'Exam 2', code: 'MCQ 2', topic: 'Functions — the range of |b·cos⁻¹(x) − a|', type: 'mc', hasDetail: true, percentCorrect: 42 },
  { id: 'spec-q17-2020', subject: 'specialist', year: 2020, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — acceleration from a = v dv/dx', type: 'mc', hasDetail: true, percentCorrect: 58 },

  // The 6 hardest Specialist MCQs from 2021 Exam 2 Section A, by VCAA-reported % correct
  // (Mechanics-topic questions excluded). This report gives the correct answer directly.
  { id: 'spec-q6-2021', subject: 'specialist', year: 2021, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — possible arguments when z² is real', type: 'mc', hasDetail: true, percentCorrect: 23 },
  { id: 'spec-q5-2021', subject: 'specialist', year: 2021, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex numbers — maximum |z| on a given circle', type: 'mc', hasDetail: true, percentCorrect: 32 },
  { id: 'spec-q4-2021', subject: 'specialist', year: 2021, exam: 'Exam 2', code: 'MCQ 4', topic: 'Complex numbers — Arg(z·z̄/(z − z̄))', type: 'mc', hasDetail: true, percentCorrect: 35 },
  { id: 'spec-q9-2021', subject: 'specialist', year: 2021, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — which derivative gives no points of inflection', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'spec-q7-2021', subject: 'specialist', year: 2021, exam: 'Exam 2', code: 'MCQ 7', topic: 'Coordinate geometry — shortest arc between two points on a circle', type: 'mc', hasDetail: true, percentCorrect: 39 },
  { id: 'spec-q20-2021', subject: 'specialist', year: 2021, exam: 'Exam 2', code: 'MCQ 20', topic: 'Statistics — probability two independent normal times differ', type: 'mc', hasDetail: true, percentCorrect: 43 },

  // The 6 hardest Specialist MCQs from 2022 Exam 2 Section A, by VCAA-reported % correct
  // (Mechanics-topic and redacted questions excluded).
  { id: 'spec-q3-2022', subject: 'specialist', year: 2022, exam: 'Exam 2', code: 'MCQ 3', topic: 'Graphs — which asymptote behaviour always holds', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'spec-q10-2022', subject: 'specialist', year: 2022, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — sign of an implicit tangent gradient at a constrained point', type: 'mc', hasDetail: true, percentCorrect: 21 },
  { id: 'spec-q18-2022', subject: 'specialist', year: 2022, exam: 'Exam 2', code: 'MCQ 18', topic: 'Statistics — probability two independent normal times differ', type: 'mc', hasDetail: true, percentCorrect: 42 },
  { id: 'spec-q2-2022', subject: 'specialist', year: 2022, exam: 'Exam 2', code: 'MCQ 2', topic: 'Trigonometry — simplifying 1 − 4sin²(x)/(tan²(x)+1)', type: 'mc', hasDetail: true, percentCorrect: 59 },
  { id: 'spec-q6-2022', subject: 'specialist', year: 2022, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — which locus meets a given circle twice', type: 'mc', hasDetail: true, percentCorrect: 59 },
  { id: 'spec-q5-2022', subject: 'specialist', year: 2022, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex numbers — the Cartesian form of an Argand-plane ray', type: 'mc', hasDetail: true, percentCorrect: 62 },

  // The 6 hardest Specialist MCQs from 2023 Exam 2 Section A, by VCAA-reported % correct
  // (Mechanics-topic questions excluded).
  { id: 'spec-q15-2023', subject: 'specialist', year: 2023, exam: 'Exam 2', code: 'MCQ 15', topic: 'Vectors — magnitude of the difference of two unit vectors', type: 'mc', hasDetail: true, percentCorrect: 18 },
  { id: 'spec-q10-2023', subject: 'specialist', year: 2023, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — a reduction formula via integration by parts', type: 'mc', hasDetail: true, percentCorrect: 33 },
  { id: 'spec-q5-2023', subject: 'specialist', year: 2023, exam: 'Exam 2', code: 'MCQ 5', topic: 'Complex numbers — z² in terms of z̄ from a given modulus and argument', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'spec-q8-2023', subject: 'specialist', year: 2023, exam: 'Exam 2', code: 'MCQ 8', topic: 'Differential equations — setting up a mixing problem', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'spec-q11-2023', subject: 'specialist', year: 2023, exam: 'Exam 2', code: 'MCQ 11', topic: 'Calculus — setting up a surface-of-revolution integral', type: 'mc', hasDetail: true, percentCorrect: 46 },
  { id: 'spec-q14-2023', subject: 'specialist', year: 2023, exam: 'Exam 2', code: 'MCQ 14', topic: 'Vectors — c·n for n orthogonal to two given vectors', type: 'mc', hasDetail: true, percentCorrect: 48 },

  // The 6 hardest Specialist MCQs from 2024 Exam 2 Section A, by VCAA-reported % correct
  // (Mechanics-topic questions excluded). This year's Section A used 4 options (A-D), not 5.
  { id: 'spec-q4-2024', subject: 'specialist', year: 2024, exam: 'Exam 2', code: 'MCQ 4', topic: 'Trigonometry — cos(x/2) from sin(x) and the quadrant of x', type: 'mc', hasDetail: true, percentCorrect: 27 },
  { id: 'spec-q14-2024', subject: 'specialist', year: 2024, exam: 'Exam 2', code: 'MCQ 14', topic: 'Vectors — scalar resolute from a given vector resolute', type: 'mc', hasDetail: true, percentCorrect: 36 },
  { id: 'spec-q15-2024', subject: 'specialist', year: 2024, exam: 'Exam 2', code: 'MCQ 15', topic: 'Vectors — describing motion along a parametric parabola', type: 'mc', hasDetail: true, percentCorrect: 36 },
  { id: 'spec-q16-2024', subject: 'specialist', year: 2024, exam: 'Exam 2', code: 'MCQ 16', topic: 'Vectors — how often is velocity perpendicular to another particle’s position', type: 'mc', hasDetail: true, percentCorrect: 43 },
  { id: 'spec-q9-2024', subject: 'specialist', year: 2024, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — arc length of a cycloid', type: 'mc', hasDetail: true, percentCorrect: 45 },
  { id: 'spec-q20-2024', subject: 'specialist', year: 2024, exam: 'Exam 2', code: 'MCQ 20', topic: 'Statistics — probability for the sum of four scaled normal variables', type: 'mc', hasDetail: true, percentCorrect: 48 },

  // The 6 hardest Specialist MCQs from 2025 Exam 2 Section A, by VCAA-reported % correct
  // (Mechanics-topic questions excluded). This year's Section A used 4 options (A-D), not 5.
  { id: 'spec-q2-2025', subject: 'specialist', year: 2025, exam: 'Exam 2', code: 'MCQ 2', topic: 'Calculus — a counter-example to a false inflection-point claim', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'spec-q14-2025', subject: 'specialist', year: 2025, exam: 'Exam 2', code: 'MCQ 14', topic: 'Vectors — angle between two vectors from dot and cross products', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'spec-q9-2025', subject: 'specialist', year: 2025, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — setting up a surface-of-revolution integral', type: 'mc', hasDetail: true, percentCorrect: 49 },
  { id: 'spec-q18-2025', subject: 'specialist', year: 2025, exam: 'Exam 2', code: 'MCQ 18', topic: 'Vectors — unknown constants from where two 3D lines intersect', type: 'mc', hasDetail: true, percentCorrect: 49 },
  { id: 'spec-q15-2025', subject: 'specialist', year: 2025, exam: 'Exam 2', code: 'MCQ 15', topic: 'Vectors — the angle-between-planes formula rearranged', type: 'mc', hasDetail: true, percentCorrect: 52 },
  { id: 'spec-q17-2025', subject: 'specialist', year: 2025, exam: 'Exam 2', code: 'MCQ 17', topic: 'Vectors — integrating acceleration to find velocity', type: 'mc', hasDetail: true, percentCorrect: 52 },

  // The 6 hardest Methods MCQs from 2019 Exam 2 Section A, by VCAA-reported % correct
  // (Methods has no Mechanics area of study; no matrix-representation question landed in
  // this year's hardest-6 either, so nothing was excluded here).
  { id: 'meth-q19-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 19', topic: 'Trigonometry — sum of the solutions to tan(2x) = d', type: 'mc', hasDetail: true, percentCorrect: 25 },
  { id: 'meth-q18-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 18', topic: 'Probability — Pr(X > 0) for a piecewise-linear density', type: 'mc', hasDetail: true, percentCorrect: 27 },
  { id: 'meth-q11-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 11', topic: 'Probability — the condition for independence of two events', type: 'mc', hasDetail: true, percentCorrect: 30 },
  { id: 'meth-q12-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 12', topic: 'Calculus — combining two given definite integrals', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'meth-q17-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 17', topic: 'Probability — two marbles drawn without replacement', type: 'mc', hasDetail: true, percentCorrect: 43 },
  { id: 'meth-q20-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 20', topic: 'Algebra — rewriting logs via change of base', type: 'mc', hasDetail: true, percentCorrect: 47 },

  // The remaining 2019 Methods Exam 2 Section A MCQs, filling out the rest of the 20-question
  // paper (the 6 hardest, above, were already covered). MCQ 9 writes its transformation in
  // matrix form but the matrix is diagonal, so the question is two independent one-line
  // equations — see MethodsQ9_2019.tsx and the skip guide's row for that reading.
  { id: 'meth-q1-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 1', topic: 'Graphs — the period and range of a scaled, shifted sine function', type: 'mc', hasDetail: true, percentCorrect: 89 },
  { id: 'meth-q2-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 2', topic: 'Algebra — the set of k giving a quadratic two real solutions', type: 'mc', hasDetail: true, percentCorrect: 59 },
  { id: 'meth-q3-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 3', topic: 'Graphs — the average rate of change of a hyperbola-type function', type: 'mc', hasDetail: true, percentCorrect: 80 },
  { id: 'meth-q4-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 4', topic: 'Calculus — a definite integral of a sin/cos combination', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'meth-q5-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 5', topic: 'Calculus — recovering f from f′ and one function value', type: 'mc', hasDetail: true, percentCorrect: 90 },
  { id: 'meth-q6-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 6', topic: 'Calculus — maximising the volume of a folded open-top box', type: 'mc', hasDetail: true, percentCorrect: 63 },
  { id: 'meth-q7-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 7', topic: 'Probability — the mean of a discrete random variable in terms of a', type: 'mc', hasDetail: true, percentCorrect: 82 },
  { id: 'meth-q8-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 8', topic: 'Probability — a binomial conditional probability', type: 'mc', hasDetail: true, percentCorrect: 71 },
  { id: 'meth-q9-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 9', topic: 'Functions — finding the point whose image under a transformation is the origin', type: 'mc', hasDetail: true, percentCorrect: 57 },
  { id: 'meth-q10-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 10', topic: 'Graphs — which property holds for f(x) = x + sin(x)', type: 'mc', hasDetail: true, percentCorrect: 55 },
  { id: 'meth-q13-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 13', topic: 'Graphs — a point on a dilated and translated graph', type: 'mc', hasDetail: true, percentCorrect: 65 },
  { id: 'meth-q14-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 14', topic: 'Probability — the standard deviation of a normal distribution from a tail probability', type: 'mc', hasDetail: true, percentCorrect: 67 },
  { id: 'meth-q15-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 15', topic: 'Calculus — the derivative of an inverse function at a point', type: 'mc', hasDetail: true, percentCorrect: 55 },
  { id: 'meth-q16-2019', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — matching the graph of f′ to a given graph of f', type: 'mc', hasDetail: true, percentCorrect: 63 },

  // The complete 2018 Methods Exam 2 Section B, cross-referenced against the VCAA
  // examination report and re-derived independently with sympy.
  { id: 'meth-q1-2018-e2', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'Q1', topic: 'Calculus — a quartic, a tangent and the area it cuts off, then the same quartic with a parameter', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2018-e2', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'Q2', topic: 'Calculus — a two-exponential drug model, averages, and two staggered doses', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2018-e2', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'Q3', topic: 'Trigonometry — three sine arches under a bridge, the stone area, and a perpendicular rod', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2018-e2', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'Q4', topic: 'Probability — heart rates: a normal, independence, a sample proportion, a confidence interval and a density function', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2018-e2', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'Q5', topic: 'Calculus — a parameterised cubic and a line, then the cubic against its own inverse', type: 'sa', hasDetail: true },

  // The rest of the 2018 Methods Exam 2 Section A MCQs, filling out the 20-question paper
  // (the 6 hardest were already covered). Stats read off the rendered report table, since
  // the shading that marks the correct answer does not survive text extraction.
  { id: 'meth-q1-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 1', topic: 'Trigonometry — the period of a scaled cosine', type: 'mc', hasDetail: true, percentCorrect: 95 },
  { id: 'meth-q2-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 2', topic: 'Functions — which rule has maximal domain R\{1}', type: 'mc', hasDetail: true, percentCorrect: 88 },
  { id: 'meth-q3-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 3', topic: 'Functions — the range of 1/x on a half-open interval', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'meth-q5-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 5', topic: 'Calculus — finding p from a stationary point', type: 'mc', hasDetail: true, percentCorrect: 67 },
  { id: 'meth-q6-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 6', topic: 'Functions — a composite where g is given at a shifted input', type: 'mc', hasDetail: true, percentCorrect: 58 },
  { id: 'meth-q7-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 7', topic: 'Functions — finding k from an inverse-function value', type: 'mc', hasDetail: true, percentCorrect: 83 },
  { id: 'meth-q8-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 8', topic: 'Calculus — combining definite integrals with a reversed interval', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q9-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — the y-intercept of a tangent to a log curve', type: 'mc', hasDetail: true, percentCorrect: 57 },
  { id: 'meth-q10-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 10', topic: 'Functions — which rule satisfies f(x + f(x)) = f(2x)', type: 'mc', hasDetail: true, percentCorrect: 74 },
  { id: 'meth-q12-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 12', topic: 'Probability — Pr(X < mean) for a discrete distribution', type: 'mc', hasDetail: true, percentCorrect: 58 },
  { id: 'meth-q13-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 13', topic: 'Probability — the chance two marbles score +1', type: 'mc', hasDetail: true, percentCorrect: 59 },
  { id: 'meth-q14-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 14', topic: 'Probability — Pr(A) for independent events from their union', type: 'mc', hasDetail: true, percentCorrect: 60 },
  { id: 'meth-q17-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — the value of b putting a turning point closest to the origin', type: 'mc', hasDetail: true, percentCorrect: 45 },
  { id: 'meth-q20-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 20', topic: 'Functions — the transformation carrying one density function to another', type: 'mc', hasDetail: true, percentCorrect: 20 },

  // The 2018 Specialist Exam 2 Section B questions. Question 5 parts (a) and (b) are
  // omitted — a force diagram and resolving forces along the ramp — but (b)(ii) supplies
  // the acceleration, so parts (c) to (e) are ordinary differential-equation work and are
  // included. Same treatment the skip guide already gives 2015 and 2016 Exam 2 SAQ5.
  { id: 'spec-q1-2018-e2', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'Q1', topic: 'Calculus — an arcsin composite, its graph, and a derivative that splits at zero', type: 'sa', hasDetail: true },
  { id: 'spec-q2-2018-e2', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'Q2', topic: 'Complex Numbers — two descriptions of one circle, a bisector line, and a minor segment', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2018-e2', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'Q3', topic: 'Calculus — a fountain as a volume of revolution, filled against an outflow', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2018-e2', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'Q4', topic: 'Vectors — two yachts: paths, collision, speeds and closest approach', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2018-e2', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'Q5(c-e)', topic: 'Differential Equations — a suitcase sliding down a ramp against resistance (parts c-e)', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2018-e2', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'Q6', topic: 'Statistics — a one-tailed test on buffalo heights, its boundary, and a confidence interval', type: 'sa', hasDetail: true },

  // The rest of the 2018 Specialist Exam 2 Section A MCQs (the 6 hardest were already
  // covered). MCQ 16 is omitted: a statics equilibrium-of-forces question, off the current
  // study design. MCQ 15 and MCQ 17 use mechanics wording but need only one substitution
  // each on top of ordinary constant-acceleration work, so they stay in (see the skip guide).
  // Stats read off the rendered report table, since the shading does not survive extraction.
  { id: 'spec-q1-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 1', topic: 'Graphs — the asymptotes of a scaled arctan', type: 'mc', hasDetail: true, percentCorrect: 85 },
  { id: 'spec-q2-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 2', topic: 'Functions — the maximal domain of a reciprocal square root of arcsin', type: 'mc', hasDetail: true, percentCorrect: 60 },
  { id: 'spec-q6-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex Numbers — the area of the triangle formed by z, iz and z+iz', type: 'mc', hasDetail: true, percentCorrect: 58 },
  { id: 'spec-q7-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 7', topic: 'Calculus — the length of a parametric curve', type: 'mc', hasDetail: true, percentCorrect: 78 },
  { id: 'spec-q8-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 8', topic: 'Calculus — rewriting a definite integral under a substitution', type: 'mc', hasDetail: true, percentCorrect: 71 },
  { id: 'spec-q9-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 9', topic: 'Differential Equations — separating after a compound angle expansion', type: 'mc', hasDetail: true, percentCorrect: 69 },
  { id: 'spec-q10-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 10', topic: 'Differential Equations — matching a direction field to its equation', type: 'mc', hasDetail: true, percentCorrect: 65 },
  { id: 'spec-q11-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 11', topic: 'Vectors — the m giving a 30 degree angle between two vectors', type: 'mc', hasDetail: true, percentCorrect: 80 },
  { id: 'spec-q13-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 13', topic: 'Vectors — the first time the speed on an ellipse is a minimum', type: 'mc', hasDetail: true, percentCorrect: 65 },
  { id: 'spec-q14-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 14', topic: 'Vectors — a scalar resolute in a given direction', type: 'mc', hasDetail: true, percentCorrect: 75 },
  { id: 'spec-q15-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 15', topic: 'Kinematics — the force accelerating a particle between two speeds', type: 'mc', hasDetail: true, percentCorrect: 69 },
  { id: 'spec-q17-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 17', topic: 'Kinematics — a camera dropped from an ascending balloon', type: 'mc', hasDetail: true, percentCorrect: 48 },
  { id: 'spec-q18-2018', subject: 'specialist', year: 2018, exam: 'Exam 2', code: 'MCQ 18', topic: 'Statistics — the population standard deviation from a confidence interval', type: 'mc', hasDetail: true, percentCorrect: 62 },

  // The 2018 Specialist Exam 1 short-answer questions, cross-referenced against the VCAA
  // examination report and re-derived independently with sympy. Question 1 is omitted:
  // it is a connected-masses pulley problem needing force resolution, which is off the
  // current study design (see the skip guide). Question 6 uses the word momentum but the
  // mathematics is vector calculus, so it is in.
  { id: 'spec-q2-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q2', topic: 'Complex Numbers — polar form and de Moivre on a quotient of powers', type: 'sa', hasDetail: true },
  { id: 'spec-q3-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q3', topic: 'Calculus — implicit differentiation at a point, in exact surd form', type: 'sa', hasDetail: true },
  { id: 'spec-q4-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q4', topic: 'Statistics — mean and variance of a linear combination, solved for integers', type: 'sa', hasDetail: true },
  { id: 'spec-q5-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q5', topic: 'Graphs — sketching a rational function with two vertical asymptotes', type: 'sa', hasDetail: true },
  { id: 'spec-q6-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q6', topic: 'Vectors — change in momentum from a position vector', type: 'sa', hasDetail: true },
  { id: 'spec-q7-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q7', topic: 'Trigonometry — a double angle identity collapsing to a multiple of cot(x)', type: 'sa', hasDetail: true },
  { id: 'spec-q8-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q8', topic: 'Differential Equations — a salt tank with unequal inflow and outflow', type: 'sa', hasDetail: true },
  { id: 'spec-q9-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q9', topic: 'Calculus — a parametric hyperbola, its intersections with a line, and a volume of revolution', type: 'sa', hasDetail: true },
  { id: 'spec-q10-2018-e1', subject: 'specialist', year: 2018, exam: 'Exam 1', code: 'Q10', topic: 'Calculus — arc length of a parametric curve reduced to a quadratic integrand', type: 'sa', hasDetail: true },

  // The complete 2018 Methods Exam 1 (short answer), cross-referenced against the VCAA
  // examination report and re-derived independently with sympy.
  { id: 'meth-q1-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q1', topic: 'Calculus — a chain-rule derivative, then a quotient rule evaluated at x = π', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q2', topic: 'Calculus — antidifferentiating a given f′ and pinning the constant', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q3', topic: 'Trigonometry — solving 2cos(x)+1 = 0, then sketching the curve', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q4', topic: 'Probability — normal symmetry, then standardising a tail probability', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q5', topic: 'Functions — the rule and domain of the inverse of a truncus branch', type: 'sa', hasDetail: true },
  { id: 'meth-q6-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q6', topic: 'Probability — total probability across two boxes, then the reverse conditional', type: 'sa', hasDetail: true },
  { id: 'meth-q7-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q7', topic: 'Calculus — the point on a line closest to the origin, and that distance', type: 'sa', hasDetail: true },
  { id: 'meth-q8-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q8', topic: 'Calculus — a show-that derivative, one intersection of f and f′, and a bounded area', type: 'sa', hasDetail: true },
  { id: 'meth-q9-2018-e1', subject: 'methods', year: 2018, exam: 'Exam 1', code: 'Q9', topic: 'Calculus — integrals of x sin(x) over π-intervals, a tangent, a translation and a shaded area', type: 'sa', hasDetail: true },

  // The complete 2019 Methods Exam 1 (short answer), cross-referenced against itute's
  // independent solutions and the VCAA examination report.
  { id: 'meth-q1-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q1(a–b)', topic: 'Calculus — differentiating and antidifferentiating 1/(3x-1), then a quotient-rule evaluation', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q2', topic: 'Functions — the rule and domain of an inverse function, and the translation onto it', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q3(a–b)', topic: 'Probability — a mixed bag of biased and unbiased coins', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q4(a–b)', topic: 'Trigonometry — solving a cosine equation, then sketching 1 minus the given graph', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q5(a–b)', topic: 'Graphs — a truncus, its sketch, and a bounded area', type: 'sa', hasDetail: true },
  { id: 'meth-q6-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q6(a–b)', topic: 'Probability — a sample proportion, then Pr(P̂ < true proportion)', type: 'sa', hasDetail: true },
  { id: 'meth-q7-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q7(a–b)', topic: 'Calculus — maximising the area of a triangle inscribed under a semicircle', type: 'sa', hasDetail: true },
  { id: 'meth-q8-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q8(a–c)', topic: 'Functions — a quartic rule from its graph, then the domain and range of a log composite', type: 'sa', hasDetail: true },
  { id: 'meth-q9-2019-e1', subject: 'methods', year: 2019, exam: 'Exam 1', code: 'Q9(a–f)', topic: 'Functions — composites of a quadratic and an exponential, their calculus, and a solution count', type: 'sa', hasDetail: true },

  // The complete 2019 Methods Exam 2 Section B (extended response), cross-referenced against
  // itute's independent solutions and the VCAA examination report. No matrix or Mechanics
  // content arises in any of these 5 questions, so nothing is excluded here.
  { id: 'meth-q1-2019-e2', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'Q1(a–d)', topic: 'Calculus — a Gaussian-type curve, its stationary points and turning-point area, and a minimum distance', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2019-e2', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'Q2(a–e)', topic: 'Calculus — a zip-line cable following a hill, its gradient, and a smooth join point', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2019-e2', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'Q3(a–f)', topic: 'Trigonometry — a dual-tone signal, its period and zeros, a bounded area, and a transformation', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2019-e2', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'Q4(a–g)', topic: 'Probability — a butterfly life span and wingspan, a binomial sample, and a confidence interval', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2019-e2', subject: 'methods', year: 2019, exam: 'Exam 2', code: 'Q5(a–g)', topic: 'Calculus — a cubic, its tangent, minimised bounded areas, and the mirror problem for its inverse', type: 'sa', hasDetail: true },

  // The complete 2020 Methods Exam 1 (short answer), checked with sympy against the VCAA
  // examination report. 2020 ran on the Adjusted Study Design, with most of the probability
  // and statistics area of study removed; the paper is eight questions rather than nine.
  { id: 'meth-q1-2020-e1', subject: 'methods', year: 2020, exam: 'Exam 1', code: 'Q1(a–b)', topic: 'Calculus — a product rule, then a chain rule evaluated at a point', type: 'sa', hasDetail: true },
  { id: 'meth-q2-2020-e1', subject: 'methods', year: 2020, exam: 'Exam 1', code: 'Q2(a–b)', topic: 'Probability — a Venn-diagram subtraction, then the same in algebra', type: 'sa', hasDetail: true },
  { id: 'meth-q3-2020-e1', subject: 'methods', year: 2020, exam: 'Exam 1', code: 'Q3', topic: 'Trigonometry — finding a and b in y = tan(ax + b) from two points', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2020-e1', subject: 'methods', year: 2020, exam: 'Exam 1', code: 'Q4', topic: 'Algebra — a logarithm equation with a solution to reject', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2020-e1', subject: 'methods', year: 2020, exam: 'Exam 1', code: 'Q5(a–b)', topic: 'Probability — a binomial "three or more", then a conditional', type: 'sa', hasDetail: true },
  { id: 'meth-q6-2020-e1', subject: 'methods', year: 2020, exam: 'Exam 1', code: 'Q6(a–c)', topic: 'Calculus — an inverse function and the area between a curve and its inverse', type: 'sa', hasDetail: true },
  { id: 'meth-q7-2020-e1', subject: 'methods', year: 2020, exam: 'Exam 1', code: 'Q7(a–c)', topic: 'Calculus — tangents from an external point, then a shortest distance', type: 'sa', hasDetail: true },
  { id: 'meth-q8-2020-e1', subject: 'methods', year: 2020, exam: 'Exam 1', code: 'Q8(a–d)', topic: 'Calculus — the minimum, area and vertical translation of x·log(x)', type: 'sa', hasDetail: true },

  // The 6 hardest Methods MCQs from 2020 Exam 2 Section A, by VCAA-reported % correct
  // (matrix-representation questions excluded; MCQ 13 (26%, an explicit matrix mapping per
  // its own report comment) was removed for this, backfilled by MCQ 18).
  { id: 'meth-q19-2020', subject: 'methods', year: 2020, exam: 'Exam 2', code: 'MCQ 19', topic: 'Probability — the "not rolled" probability function from the "rolled" one', type: 'mc', hasDetail: true, percentCorrect: 15 },
  { id: 'meth-q20-2020', subject: 'methods', year: 2020, exam: 'Exam 2', code: 'MCQ 20', topic: 'Functions — a domain giving log₂(cos(ax)) the range [−1, 0]', type: 'mc', hasDetail: true, percentCorrect: 18 },
  { id: 'meth-q15-2020', subject: 'methods', year: 2020, exam: 'Exam 2', code: 'MCQ 15', topic: 'Calculus — average value of a piecewise-linear function', type: 'mc', hasDetail: true, percentCorrect: 32 },
  { id: 'meth-q9-2020', subject: 'methods', year: 2020, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — a definite integral after dilation and translation', type: 'mc', hasDetail: true, percentCorrect: 35 },
  { id: 'meth-q17-2020', subject: 'methods', year: 2020, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — maximum y-intercept of a tangent to −ln(x+2)', type: 'mc', hasDetail: true, percentCorrect: 42 },
  { id: 'meth-q18-2020', subject: 'methods', year: 2020, exam: 'Exam 2', code: 'MCQ 18', topic: 'Functions — range of a hyperbola-type rule split by its asymptote', type: 'mc', hasDetail: true, percentCorrect: 43 },

  // The 6 hardest Methods MCQs from 2021 Exam 2 Section A, by VCAA-reported % correct.
  // This report gives the correct answer directly.
  { id: 'meth-q16-2021', subject: 'methods', year: 2021, exam: 'Exam 2', code: 'MCQ 16', topic: 'Trigonometry — sin(x)+cos(y) from cos(x) and sin²(y) in Q4', type: 'mc', hasDetail: true, percentCorrect: 31 },
  { id: 'meth-q19-2021', subject: 'methods', year: 2021, exam: 'Exam 2', code: 'MCQ 19', topic: 'Calculus — which piecewise function is differentiable everywhere', type: 'mc', hasDetail: true, percentCorrect: 35 },
  { id: 'meth-q18-2021', subject: 'methods', year: 2021, exam: 'Exam 2', code: 'MCQ 18', topic: 'Functions — max solutions of a translated cubic meeting a log curve', type: 'mc', hasDetail: true, percentCorrect: 39 },
  { id: 'meth-q20-2021', subject: 'methods', year: 2021, exam: 'Exam 2', code: 'MCQ 20', topic: 'Probability — Pr(A′ ∪ B) for independent events', type: 'mc', hasDetail: true, percentCorrect: 39 },
  { id: 'meth-q8-2021', subject: 'methods', year: 2021, exam: 'Exam 2', code: 'MCQ 8', topic: 'Calculus — matching a graph to its derivative graph', type: 'mc', hasDetail: true, percentCorrect: 40 },
  { id: 'meth-q15-2021', subject: 'methods', year: 2021, exam: 'Exam 2', code: 'MCQ 15', topic: 'Probability — an equal split of 4 coins, given at least one head', type: 'mc', hasDetail: true, percentCorrect: 48 },

  // The 6 hardest Methods MCQs from 2022 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q20-2022', subject: 'methods', year: 2022, exam: 'Exam 2', code: 'MCQ 20', topic: 'Statistics — probability a projectile clears a distance, given θ~N', type: 'mc', hasDetail: true, percentCorrect: 30 },
  { id: 'meth-q19-2022', subject: 'methods', year: 2022, exam: 'Exam 2', code: 'MCQ 19', topic: 'Calculus — where a cut-corner box reaches maximum volume', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'meth-q13-2022', subject: 'methods', year: 2022, exam: 'Exam 2', code: 'MCQ 13', topic: 'Functions — the maximal domain of ln((x+a)/(x−a))', type: 'mc', hasDetail: true, percentCorrect: 39 },
  { id: 'meth-q17-2022', subject: 'methods', year: 2022, exam: 'Exam 2', code: 'MCQ 17', topic: 'Functions — what a dip in an overall rise implies about a function', type: 'mc', hasDetail: true, percentCorrect: 39 },
  { id: 'meth-q6-2022', subject: 'methods', year: 2022, exam: 'Exam 2', code: 'MCQ 6', topic: 'Functions — which pair of functions is not a genuine inverse pair', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'meth-q18-2022', subject: 'methods', year: 2022, exam: 'Exam 2', code: 'MCQ 18', topic: 'Probability — solving a binomial conditional-probability equation', type: 'mc', hasDetail: true, percentCorrect: 47 },

  // The 6 hardest Methods MCQs from 2023 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q11-2023', subject: 'methods', year: 2023, exam: 'Exam 2', code: 'MCQ 11', topic: 'Calculus — gradient of a product f(x)·g(x) at a point', type: 'mc', hasDetail: true, percentCorrect: 22 },
  { id: 'meth-q17-2023', subject: 'methods', year: 2023, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — volume of a cylinder rolled from a rectangular sheet', type: 'mc', hasDetail: true, percentCorrect: 28 },
  { id: 'meth-q12-2023', subject: 'methods', year: 2023, exam: 'Exam 2', code: 'MCQ 12', topic: 'Probability — maximum possible mean of a discrete random variable', type: 'mc', hasDetail: true, percentCorrect: 29 },
  { id: 'meth-q14-2023', subject: 'methods', year: 2023, exam: 'Exam 2', code: 'MCQ 14', topic: 'Calculus — tangents to a quartic through its own x-intercept', type: 'mc', hasDetail: true, percentCorrect: 29 },
  { id: 'meth-q18-2023', subject: 'methods', year: 2023, exam: 'Exam 2', code: 'MCQ 18', topic: 'Trigonometry — number of local minima of sin(ax) on [−aπ, aπ]', type: 'mc', hasDetail: true, percentCorrect: 29 },
  { id: 'meth-q20-2023', subject: 'methods', year: 2023, exam: 'Exam 2', code: 'MCQ 20', topic: 'Functions — largest interval where two composite functions both exist', type: 'mc', hasDetail: true, percentCorrect: 30 },

  // The 6 hardest Methods MCQs from 2024 Exam 2 Section A, by VCAA-reported % correct.
  // This year's Section A used 4 options (A-D), not 5.
  { id: 'meth-q17-2024', subject: 'methods', year: 2024, exam: 'Exam 2', code: 'MCQ 17', topic: 'Algorithms — tracing a cubic-root-finding algorithm', type: 'mc', hasDetail: true, percentCorrect: 27 },
  { id: 'meth-q16-2024', subject: 'methods', year: 2024, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — gradient of √f(x) from f and f′ at a point', type: 'mc', hasDetail: true, percentCorrect: 36 },
  { id: 'meth-q10-2024', subject: 'methods', year: 2024, exam: 'Exam 2', code: 'MCQ 10', topic: 'Functions — what a sign change in f′ implies about f', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'meth-q11-2024', subject: 'methods', year: 2024, exam: 'Exam 2', code: 'MCQ 11', topic: 'Probability — exactly two of three students from one row', type: 'mc', hasDetail: true, percentCorrect: 40 },
  { id: 'meth-q20-2024', subject: 'methods', year: 2024, exam: 'Exam 2', code: 'MCQ 20', topic: 'Calculus — integral of a period-2 function over two periods', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q13-2024', subject: 'methods', year: 2024, exam: 'Exam 2', code: 'MCQ 13', topic: 'Transformations — tracking a local minimum through two transformations', type: 'mc', hasDetail: true, percentCorrect: 45 },

  // The 6 hardest Methods MCQs from 2025 Exam 2 Section A, by VCAA-reported % correct.
  // This year's Section A used 4 options (A-D), not 5.
  { id: 'meth-q19-2025', subject: 'methods', year: 2025, exam: 'Exam 2', code: 'MCQ 19', topic: 'Calculus — finding c from a minimum-distance condition', type: 'mc', hasDetail: true, percentCorrect: 14 },
  { id: 'meth-q16-2025', subject: 'methods', year: 2025, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — what must be true for a·ln(bx)′ to have range (0,∞)', type: 'mc', hasDetail: true, percentCorrect: 18 },
  { id: 'meth-q20-2025', subject: 'methods', year: 2025, exam: 'Exam 2', code: 'MCQ 20', topic: 'Transformations — which sequence does not map aˣ to a^(2x+2)', type: 'mc', hasDetail: true, percentCorrect: 36 },
  { id: 'meth-q17-2025', subject: 'methods', year: 2025, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — which graph satisfies a definite-integral inequality', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'meth-q15-2025', subject: 'methods', year: 2025, exam: 'Exam 2', code: 'MCQ 15', topic: 'Transformations — a point on a transformed graph', type: 'mc', hasDetail: true, percentCorrect: 44 },
  { id: 'meth-q13-2025', subject: 'methods', year: 2025, exam: 'Exam 2', code: 'MCQ 13', topic: 'Functions — identifying a composite function from a sketch', type: 'mc', hasDetail: true, percentCorrect: 45 },

  // The 6 hardest Chemistry MCQs from 2019 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q13-2019', subject: 'chemistry', year: 2019, exam: 'Exam', code: 'MCQ 13', topic: 'Organic chemistry — reasoning about flashpoint from a substance’s physical state', type: 'mc', hasDetail: true, percentCorrect: 20 },
  { id: 'chem-q18-2019', subject: 'chemistry', year: 2019, exam: 'Exam', code: 'MCQ 18', topic: 'Electrochemistry — comparing four galvanic cells’ voltages', type: 'mc', hasDetail: true, percentCorrect: 24 },
  { id: 'chem-q22-2019', subject: 'chemistry', year: 2019, exam: 'Exam', code: 'MCQ 22', topic: 'Experimental design — precision, accuracy, validity and uncertainty', type: 'mc', hasDetail: true, percentCorrect: 30 },
  { id: 'chem-q15-2019', subject: 'chemistry', year: 2019, exam: 'Exam', code: 'MCQ 15', topic: 'Organic chemistry — chiral centres and optical isomers of aspartame', type: 'mc', hasDetail: true, percentCorrect: 35 },
  { id: 'chem-q27-2019', subject: 'chemistry', year: 2019, exam: 'Exam', code: 'MCQ 27', topic: 'Analytical chemistry — identifying an alcohol from its ¹³C NMR peak count', type: 'mc', hasDetail: true, percentCorrect: 35 },
  { id: 'chem-q29-2019', subject: 'chemistry', year: 2019, exam: 'Exam', code: 'MCQ 29', topic: 'Analytical chemistry — which titration error underestimates vitamin C', type: 'mc', hasDetail: true, percentCorrect: 37 },

  // The 6 hardest Chemistry MCQs from 2020 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q16-2020', subject: 'chemistry', year: 2020, exam: 'Exam', code: 'MCQ 16', topic: 'Organic chemistry — estimating an ester’s boiling point from two related isomers', type: 'mc', hasDetail: true, percentCorrect: 20 },
  { id: 'chem-q19-2020', subject: 'chemistry', year: 2020, exam: 'Exam', code: 'MCQ 19', topic: 'Equilibrium — identifying a temperature change from a rate–time graph', type: 'mc', hasDetail: true, percentCorrect: 22 },
  { id: 'chem-q28-2020', subject: 'chemistry', year: 2020, exam: 'Exam', code: 'MCQ 28', topic: 'Thermochemistry — comparing Maxwell–Boltzmann distributions of combustion products', type: 'mc', hasDetail: true, percentCorrect: 22 },
  { id: 'chem-q15-2020', subject: 'chemistry', year: 2020, exam: 'Exam', code: 'MCQ 15', topic: 'Equilibrium — rate, activation energy and temperature for the Haber process', type: 'mc', hasDetail: true, percentCorrect: 25 },
  { id: 'chem-q10-2020', subject: 'chemistry', year: 2020, exam: 'Exam', code: 'MCQ 10', topic: 'Thermochemistry — what is true of a solution calorimeter', type: 'mc', hasDetail: true, percentCorrect: 26 },
  { id: 'chem-q9-2020', subject: 'chemistry', year: 2020, exam: 'Exam', code: 'MCQ 9', topic: 'Thermochemistry — calculating a calorimeter’s calibration factor', type: 'mc', hasDetail: true, percentCorrect: 28 },

  // The 6 hardest Chemistry MCQs from 2021 Exam Section A, by VCAA-reported % correct
  // (one question was later redacted by VCAA and excluded from consideration).
  { id: 'chem-q25-2021', subject: 'chemistry', year: 2021, exam: 'Exam', code: 'MCQ 25', topic: 'Equilibrium — deducing what change was made from a rate–time graph', type: 'mc', hasDetail: true, percentCorrect: 12 },
  { id: 'chem-q28-2021', subject: 'chemistry', year: 2021, exam: 'Exam', code: 'MCQ 28', topic: 'Equilibrium — deducing K and total energy change from a rate increase', type: 'mc', hasDetail: true, percentCorrect: 22 },
  { id: 'chem-q21-2021', subject: 'chemistry', year: 2021, exam: 'Exam', code: 'MCQ 21', topic: 'Electrochemistry — which cell change reduces nickel electroplated', type: 'mc', hasDetail: true, percentCorrect: 31 },
  { id: 'chem-q22-2021', subject: 'chemistry', year: 2021, exam: 'Exam', code: 'MCQ 22', topic: 'Thermochemistry — octane volume needed at 25% engine efficiency', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'chem-q16-2021', subject: 'chemistry', year: 2021, exam: 'Exam', code: 'MCQ 16', topic: 'Analytical chemistry — which statement about IR spectroscopy is correct', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'chem-q24-2021', subject: 'chemistry', year: 2021, exam: 'Exam', code: 'MCQ 24', topic: 'Thermochemistry — effect of a catalyst on an energy profile diagram', type: 'mc', hasDetail: true, percentCorrect: 38 },

  // The 6 hardest Chemistry MCQs from 2022 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q13-2022', subject: 'chemistry', year: 2022, exam: 'Exam', code: 'MCQ 13', topic: 'Electrochemistry — which electrolyte produces a gas at the cathode', type: 'mc', hasDetail: true, percentCorrect: 29 },
  { id: 'chem-q25-2022', subject: 'chemistry', year: 2022, exam: 'Exam', code: 'MCQ 25', topic: 'Organic chemistry — which statements about biodiesel vs petrodiesel hold', type: 'mc', hasDetail: true, percentCorrect: 33 },
  { id: 'chem-q20-2022', subject: 'chemistry', year: 2022, exam: 'Exam', code: 'MCQ 20', topic: 'Electrochemistry — a metal rod placed directly into a mixed solution', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'chem-q30-2022', subject: 'chemistry', year: 2022, exam: 'Exam', code: 'MCQ 30', topic: 'Electrochemistry — ranking unfamiliar half-cells from reactivity clues', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'chem-q12-2022', subject: 'chemistry', year: 2022, exam: 'Exam', code: 'MCQ 12', topic: 'Organic chemistry — why enzymes fail in acidic conditions', type: 'mc', hasDetail: true, percentCorrect: 42 },
  { id: 'chem-q28-2022', subject: 'chemistry', year: 2022, exam: 'Exam', code: 'MCQ 28', topic: 'Analytical chemistry — identifying a structure from a ¹³C NMR spectrum', type: 'mc', hasDetail: true, percentCorrect: 42 },

  // The 6 hardest Chemistry MCQs from 2023 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q10-2023', subject: 'chemistry', year: 2023, exam: 'Exam', code: 'MCQ 10', topic: 'Equilibrium — what always increases the yield of a reaction', type: 'mc', hasDetail: true, percentCorrect: 26 },
  { id: 'chem-q18-2023', subject: 'chemistry', year: 2023, exam: 'Exam', code: 'MCQ 18', topic: 'Analytical chemistry — reading an HPLC calibration curve after dilution', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'chem-q2-2023', subject: 'chemistry', year: 2023, exam: 'Exam', code: 'MCQ 2', topic: 'Electrochemistry — which statement about fuel cells vs galvanic cells is correct', type: 'mc', hasDetail: true, percentCorrect: 40 },
  { id: 'chem-q15-2023', subject: 'chemistry', year: 2023, exam: 'Exam', code: 'MCQ 15', topic: 'Thermochemistry — comparing petrol-powered and hydrogen-fuel-cell drones', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'chem-q22-2023', subject: 'chemistry', year: 2023, exam: 'Exam', code: 'MCQ 22', topic: 'Electrochemistry — comparing methane and methanol fuel cells', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'chem-q5-2023', subject: 'chemistry', year: 2023, exam: 'Exam', code: 'MCQ 5', topic: 'Biochemistry — which statements about coenzymes are correct', type: 'mc', hasDetail: true, percentCorrect: 42 },
  { id: 'chem-q20-2023', subject: 'chemistry', year: 2023, exam: 'Exam', code: 'MCQ 20', topic: 'Analytical chemistry — a titration-accuracy question VCAA accepted every answer for', type: 'mc', hasDetail: true, flagged: true },

  // The 6 hardest Chemistry MCQs from 2024 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q24-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 24', topic: 'Analytical chemistry — equivalence-point volume in a permanganate/oxalic acid titration', type: 'mc', hasDetail: true, percentCorrect: 26 },
  { id: 'chem-q9-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 9', topic: 'Electrochemistry — balancing an alkaline ethanol fuel cell half-equation', type: 'mc', hasDetail: true, percentCorrect: 29 },
  { id: 'chem-q12-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 12', topic: 'Thermochemistry — why butane combustion is treated as irreversible', type: 'mc', hasDetail: true, percentCorrect: 32 },
  { id: 'chem-q19-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 19', topic: 'Organic chemistry — comparing cyclohexane and benzene', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'chem-q17-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 17', topic: 'Electrochemistry — electrorefining blister copper', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'chem-q2-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 2', topic: 'Thermochemistry — comparing combustion energy of glucose and hydrogen', type: 'mc', hasDetail: true, percentCorrect: 40 },
  { id: 'chem-q10-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 10', topic: 'Thermochemistry — a bioethanol/fuel cell question VCAA accepted every answer for', type: 'mc', hasDetail: true, flagged: true },
  { id: 'chem-q15-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 15', topic: 'Equilibrium — an SO₃/SO₂/O₂ question VCAA accepted two answers for', type: 'mc', hasDetail: true, flagged: true },
  { id: 'chem-q27-2024', subject: 'chemistry', year: 2024, exam: 'Exam', code: 'MCQ 27', topic: 'Analytical chemistry — a spectroscopy-comparison question VCAA accepted every answer for', type: 'mc', hasDetail: true, flagged: true },

  // The 6 hardest Chemistry MCQs from 2025 Exam Section A, by VCAA-reported % correct.
  { id: 'chem-q8-2025', subject: 'chemistry', year: 2025, exam: 'Exam', code: 'MCQ 8', topic: 'Electrochemistry — comparing potential differences of four metal–air cells', type: 'mc', hasDetail: true, percentCorrect: 29 },
  { id: 'chem-q2-2025', subject: 'chemistry', year: 2025, exam: 'Exam', code: 'MCQ 2', topic: 'Thermochemistry — total energy content of a snack bar per 100 g', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'chem-q19-2025', subject: 'chemistry', year: 2025, exam: 'Exam', code: 'MCQ 19', topic: 'Analytical chemistry — ranking laboratory glassware by resolution', type: 'mc', hasDetail: true, percentCorrect: 34 },
  { id: 'chem-q18-2025', subject: 'chemistry', year: 2025, exam: 'Exam', code: 'MCQ 18', topic: 'Electrochemistry — which statement about artificial photosynthesis is correct', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'chem-q27-2025', subject: 'chemistry', year: 2025, exam: 'Exam', code: 'MCQ 27', topic: 'Organic chemistry — distinguishing geranial from linalool by a lab test', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'chem-q28-2025', subject: 'chemistry', year: 2025, exam: 'Exam', code: 'MCQ 28', topic: 'Analytical chemistry — predicting a melting-point range for an impure sample', type: 'mc', hasDetail: true, percentCorrect: 45 },
  { id: 'chem-q10-2025', subject: 'chemistry', year: 2025, exam: 'Exam', code: 'MCQ 10', topic: 'Organic chemistry — a bioethanol-production question VCAA accepted every answer for', type: 'mc', hasDetail: true, flagged: true },
]
