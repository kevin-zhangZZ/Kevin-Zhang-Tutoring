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

  { id: 'meth-q4-2014-e1', subject: 'methods', year: 2014, exam: 'Exam 1', code: 'Q4(a–d)', topic: 'Calculus — area between sine graphs', type: 'sa', hasDetail: true },
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

  // The 6 hardest Methods MCQs from 2016 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q19-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 19', topic: 'Probability — bounding E(X) for a discrete distribution', type: 'mc', hasDetail: true, percentCorrect: 15 },
  { id: 'meth-q20-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 20', topic: 'Transformations — relating definite integrals under a mapping', type: 'mc', hasDetail: true, percentCorrect: 17 },
  { id: 'meth-q14-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 14', topic: 'Calculus — maximum area of a rectangle under a parabola', type: 'mc', hasDetail: true, percentCorrect: 37 },
  { id: 'meth-q9-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 9', topic: 'Calculus — deriving ∫xe^(kx)dx from a given derivative', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q11-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 11', topic: 'Algebra — testing candidate rules against a functional equation', type: 'mc', hasDetail: true, percentCorrect: 47 },
  { id: 'meth-q10-2016', subject: 'methods', year: 2016, exam: 'Exam 2', code: 'MCQ 10', topic: 'Calculus — tangent parallel to a chord of intercepts', type: 'mc', hasDetail: true, percentCorrect: 52 },

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

  // The 6 hardest Methods MCQs from 2017 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q17-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 17', topic: 'Calculus — area under an even function as one integral', type: 'mc', hasDetail: true, percentCorrect: 21 },
  { id: 'meth-q7-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 7', topic: 'Quadratics — discriminant condition for no real roots', type: 'mc', hasDetail: true, percentCorrect: 32 },
  { id: 'meth-q18-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 18', topic: 'Probability — smallest n so that binomial mean equals sd', type: 'mc', hasDetail: true, percentCorrect: 38 },
  { id: 'meth-q16-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 16', topic: 'Probability — a binomial probability from a given one', type: 'mc', hasDetail: true, percentCorrect: 41 },
  { id: 'meth-q12-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 12', topic: 'Trigonometry — sum of solutions on an interval', type: 'mc', hasDetail: true, percentCorrect: 45 },
  { id: 'meth-q13-2017', subject: 'methods', year: 2017, exam: 'Exam 2', code: 'MCQ 13', topic: 'Algebra — the identity that fails for h(x) = 1/(x-1)', type: 'mc', hasDetail: true, percentCorrect: 46 },

  // The 6 hardest Methods MCQs from 2018 Exam 2 Section A, by VCAA-reported % correct.
  { id: 'meth-q18-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 18', topic: 'Calculus — comparing derivatives of two power functions', type: 'mc', hasDetail: true, percentCorrect: 14 },
  { id: 'meth-q20-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 20', topic: 'Transformations — a matrix mapping one pdf to another', type: 'mc', hasDetail: true, percentCorrect: 20 },
  { id: 'meth-q11-2018', subject: 'methods', year: 2018, exam: 'Exam 2', code: 'MCQ 11', topic: 'Graphs — pinning down tan(ax) from its asymptote', type: 'mc', hasDetail: true, percentCorrect: 26 },
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
]
