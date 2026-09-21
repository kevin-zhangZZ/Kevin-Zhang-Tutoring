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
  { id: 'spec-mcq6', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'MCQ 6', topic: 'Complex numbers — Argand diagram parallelogram', type: 'mc', hasDetail: true, hasVideo: true, percentCorrect: 57 },
  { id: 'spec-q2-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q2(a–f)', topic: 'Complex numbers — line and circle loci in the Argand plane', type: 'sa', hasDetail: true, hasVideo: true },
  { id: 'spec-saq3', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q3(a–e)', topic: 'Differential equations — rates of mixing (two-tank problem)', type: 'sa', hasDetail: true, hasVideo: true },
  { id: 'spec-q4-2016', subject: 'specialist', year: 2016, exam: 'Exam 2', code: 'Q4(a–d)', topic: 'Vectors — relative position, collision, and minimum distance', type: 'sa', hasDetail: true },

  { id: 'meth-q21-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 21', topic: 'Calculus — maximising the area of a trapezium', type: 'mc', hasDetail: true },
  { id: 'meth-q22-2014', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 22', topic: 'Probability — independent events and ratios', type: 'mc', hasDetail: true },
  { id: 'meth-q3-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q2(a–h)', topic: 'Calculus — optimisation and related rates (melting ice cylinder)', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2014-e2', subject: 'methods', year: 2014, exam: 'Exam 2', code: 'Q4(f)', topic: 'Probability — conditional probability and Markov-style recursion', type: 'sa', hasDetail: true },

  // The 6 hardest Methods MCQs from 2015 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q3-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 3', topic: 'Graphs — identifying a quartic rule from its graph', type: 'mc', hasDetail: true, percentCorrect: 20 },
  { id: 'meth-q16-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 16', topic: 'Calculus — antiderivatives of power functions', type: 'mc', hasDetail: true, percentCorrect: 22, hasVideo: true },
  { id: 'meth-q11-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 11', topic: 'Transformations — identifying a single dilation', type: 'mc', hasDetail: true, percentCorrect: 24 },
  { id: 'meth-q9-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 9', topic: 'Probability — E(X) for a uniform distribution', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'meth-q21-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 21', topic: 'Graphs — a line and a parabola with no intersection', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'meth-q17-2015', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — turning points and number of x-intercepts', type: 'mc', hasDetail: true, percentCorrect: 60 },

  // Section 2 (short-answer). meth-q4-2015-e2 was previously miscatalogued as 2014 Exam 1
  // Q4 — that question is actually a 2-mark "solve 2^(3x-3)=8^(2-x)" (confirmed against the
  // real 2014 Exam 1 paper), nothing like this 9-mark sine-area question. The content below
  // matches 2015 Exam 2 Q4 exactly (confirmed against the source PDF and report), so it's
  // recatalogued here with its real year/exam and real examiner-report stats added.
  { id: 'meth-q3-2015-e2', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'Q3(a–d)', topic: 'Probability — continuous distribution, binomial, normal, and geometric-style modelling', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2015-e2', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'Q4(a–d)', topic: 'Calculus — area between sine graphs', type: 'sa', hasDetail: true },
  { id: 'meth-q5-2015-e2', subject: 'methods', year: 2015, exam: 'Exam 2', code: 'Q5(a–d)', topic: 'Calculus — optimising a sum of exponentials', type: 'sa', hasDetail: true },

  // The 6 hardest Methods MCQs from 2016 Exam 2 Section A, by VCAA-reported % correct
  // (matrix-representation questions excluded — matrices aren't part of the current VCE
  // Methods study design; MCQ 20 (17%, "the matrix mapping..." per its own report comment)
  // was removed for this, backfilled by MCQ 12).
  { id: 'meth-q19-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 19', topic: 'Probability — bounding E(X) for a discrete distribution', type: 'mc', hasDetail: true, percentCorrect: 15 },
  { id: 'meth-q14-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 14', topic: 'Calculus — maximum area of a rectangle under a parabola', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'meth-q9-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — deriving ∫xe^(kx)dx from a given derivative', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q11-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 11', topic: 'Algebra — testing candidate rules against a functional equation', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'meth-q10-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — tangent parallel to a chord of intercepts', type: 'mc', hasDetail: true, percentCorrect: 52 },
  { id: 'meth-q12-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 12', topic: 'Transformations — a reflection and dilation applied to a square-root rule', type: 'mc', hasDetail: true, percentCorrect: 52 },

  { id: 'meth-q8-2016-e1', subject: 'methods', year: 2016, exam: 'Exam 1', code: 'Q8(a–b)', topic: 'Calculus — an antiderivative of x^(k-1)ln(x), then a probability and a median comparison', type: 'sa', hasDetail: true },

  // The 6 hardest Specialist MCQs from 2015 Exam 2 Section A, by VCAA-reported % correct.
  // Mechanics questions (no longer on the VCE study design) are excluded from these picks —
  // spec-q14-2016 and spec-q22-2015 (Mechanics) were removed entirely for the same reason.
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

  // The 6 hardest Methods MCQs from 2017 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q17-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — area under an even function as one integral', type: 'mc', hasDetail: true, percentCorrect: 21 },
  { id: 'meth-q7-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 7', topic: 'Quadratics — discriminant condition for no real roots', type: 'mc', hasDetail: true, percentCorrect: 32 },
  { id: 'meth-q18-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 18', topic: 'Probability — smallest n so that binomial mean equals sd', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'meth-q16-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 16', topic: 'Probability — a binomial probability from a given one', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q12-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 12', topic: 'Trigonometry — sum of solutions on an interval', type: 'mc', hasDetail: true, percentCorrect: 45 },
  { id: 'meth-q13-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 13', topic: 'Algebra — the identity that fails for h(x) = 1/(x-1)', type: 'mc', hasDetail: true, percentCorrect: 46 },

  { id: 'meth-q3-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q3(a–b)', topic: 'Calculus — expanding a factorised cubic, then sketching it', type: 'sa', hasDetail: true },
  { id: 'meth-q4-2017-e1', subject: 'methods', year: 2017, exam: 'Exam 1', code: 'Q4', topic: 'Probability — smallest sample size for a bound on sd(P̂)', type: 'sa', hasDetail: true },

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
