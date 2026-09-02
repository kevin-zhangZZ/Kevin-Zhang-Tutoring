// Question-by-question audit of VCAA past exams.
//
// Every row below comes from the tutor's own question-by-question exam review (Aug 2026):
// Methods and Specialist 2014–2017, and Chemistry 2016–2018. It also identified several
// "still doable" workarounds — cases where a question looks like it needs removed content
// (a matrix, a force/motion setup, an old technique/instrument) but can actually be solved by
// translating it into non-matrix, non-mechanics, or otherwise current-syllabus terms. Those
// workarounds are kept as a note on the relevant row.
//
// Years not listed here haven't been reviewed yet — that's not a claim they're clean, just
// that nobody has been through them question-by-question. Extend this file's `rows` (and, if
// a whole new topic needs explaining, `data.ts`'s `items`) as more years get reviewed.

export interface AuditRow {
  year: number
  exam: string // e.g. "Exam 1", "Exam 2"
  question: string // e.g. "Q12", "Section B Q4"
  topic: string
  note?: string
}

export interface NotFound {
  topic: string
  detail: string
}

export interface SubjectAudit {
  id: string
  rows: AuditRow[]
  notFound: NotFound[]
}

export const audits: SubjectAudit[] = [
  {
    id: 'methods',
    rows: [
      { year: 2014, exam: 'Exam 2', question: 'MCQ 7', topic: 'Modulus graph' },
      { year: 2014, exam: 'Exam 2', question: 'MCQ 12', topic: 'Matrix transformation' },
      { year: 2014, exam: 'Exam 2', question: 'MCQ 19', topic: 'Approximation of area using rectangles' },
      { year: 2014, exam: 'Exam 2', question: 'SAQ4g', topic: 'Transition matrix (Markov chain)', note: 'Technically doable with a full 16-branch tree diagram — feasible but impractical. (SAQ4f is a similar transition-matrix question but only needs a 4-branch tree, so it’s worth attempting; note that 4f and 4g are both not binomial, since the trials aren’t independent of each other.)' },
      { year: 2015, exam: 'Exam 2', question: 'MCQ 18', topic: 'Modulus function' },
      { year: 2015, exam: 'Exam 2', question: 'MCQ 22', topic: 'Modulus function' },
      { year: 2016, exam: 'Exam 2', question: 'MCQ 20', topic: 'Matrix transformation', note: 'Doable if you read the matrix as: dilation by factor 3 from the x-axis, reflection in the y-axis, then translation 5 units up.' },
      { year: 2016, exam: 'Exam 2', question: 'SAQ1e', topic: 'Matrix transformation', note: 'Doable if you read a as the dilation factor from the x-axis (negative if there’s also a reflection in the y-axis) and b as the vertical translation (positive = up, negative = down).' },
      { year: 2017, exam: 'Exam 2', question: 'MCQ 10', topic: 'Matrix transformation', note: 'Doable if you read the matrix as: dilation by factor 2 from the y-axis, then dilation by factor 1/3 from the x-axis.' },
      { year: 2017, exam: 'Exam 2', question: 'SAQ4a', topic: 'Matrix transformation', note: 'Doable if you read c as the horizontal translation (positive = right, negative = left) and d as the vertical translation (positive = up, negative = down).' },
    ],
    notFound: [
      {
        topic: 'Straight-line motion (kinematics)',
        detail: 'Searched all 18 papers for "particle", "velocity", "acceleration", "displacement" — zero matches. Despite being nominally removed from the study design, this doesn’t appear to have actually been examined as a standalone question in Methods 2014–2022, so there’s nothing concrete to skip here.',
      },
      {
        topic: '"Maximum rate of increase/decrease" and rectangle area-approximation',
        detail: 'These are technique/emphasis changes rather than removed question types, and they’re woven into ordinary calculus questions rather than appearing as an isolated, searchable phrase — not practical to audit question-by-question. Use judgement if you see second-derivative-justified inflection points or a rectangle (not trapezium) area approximation.',
      },
    ],
  },
  {
    id: 'specialist',
    rows: [
      { year: 2014, exam: 'Exam 1', question: 'Entire Q8', topic: 'Dynamics and force analysis' },
      { year: 2014, exam: 'Exam 2', question: 'MCQ 18', topic: 'Dynamics and force analysis' },
      { year: 2014, exam: 'Exam 2', question: 'MCQ 19', topic: 'Dynamics and force analysis' },
      { year: 2014, exam: 'Exam 2', question: 'MCQ 20', topic: 'Dynamics and force analysis' },
      { year: 2014, exam: 'Exam 2', question: 'Entire SAQ5', topic: 'Dynamics and force analysis' },
      { year: 2015, exam: 'Exam 1', question: 'Entire Q2', topic: 'Dynamics and force analysis' },
      { year: 2015, exam: 'Exam 2', question: 'MCQ 16', topic: 'Dynamics and force analysis' },
      { year: 2015, exam: 'Exam 2', question: 'MCQ 19', topic: 'Dynamics and force analysis' },
      { year: 2015, exam: 'Exam 2', question: 'MCQ 21', topic: 'Dynamics and force analysis' },
      { year: 2015, exam: 'Exam 2', question: 'SAQ5a,b,c', topic: 'Dynamics and force analysis', note: 'SAQ5d is still doable — just use the differential equation given right before part (d).\nAlso: MCQ15 in this exam is still doable, since it has nothing to do with actual forces content.' },
      { year: 2016, exam: 'Exam 1', question: 'Entire Q1', topic: 'Dynamics and force analysis' },
      { year: 2016, exam: 'Exam 2', question: 'MCQ 13', topic: 'Dynamics and force analysis' },
      { year: 2016, exam: 'Exam 2', question: 'MCQ 14', topic: 'Dynamics and force analysis' },
      { year: 2016, exam: 'Exam 2', question: 'MCQ 15', topic: 'Dynamics and force analysis', note: 'Doable if you substitute F = 3a into each option and treat it as converting v = f(x) into a = g(x).' },
      { year: 2016, exam: 'Exam 2', question: 'MCQ 16', topic: 'Dynamics and force analysis', note: 'Doable as a challenge — analyse the vertical and horizontal components separately: use the vertical motion (gravity only) to find the time to return to the ground, then substitute into the horizontal motion to find the distance travelled.' },
      { year: 2016, exam: 'Exam 2', question: 'MCQ 17', topic: 'Dynamics and force analysis' },
      { year: 2016, exam: 'Exam 2', question: 'SAQ1dii', topic: 'Arc length from Cartesian form', note: 'No longer required.' },
      { year: 2016, exam: 'Exam 2', question: 'SAQ5a', topic: 'Dynamics and force analysis', note: 'The rest of SAQ5 is doable using the differential equation given in part (a).' },
      { year: 2017, exam: 'Exam 1', question: 'Entire Q9', topic: 'Dynamics and force analysis' },
      { year: 2017, exam: 'Exam 2', question: 'MCQ 14', topic: 'Dynamics and force analysis' },
      { year: 2017, exam: 'Exam 2', question: 'MCQ 16', topic: 'Dynamics and force analysis' },
      { year: 2017, exam: 'Exam 2', question: 'MCQ 17', topic: 'Dynamics and force analysis' },
      { year: 2017, exam: 'Exam 2', question: 'SAQ3e', topic: 'Arc length from Cartesian form', note: 'No longer required.' },
    ],
    notFound: [
      {
        topic: 'Projectile motion / circular motion (as a distinct vector-calculus question)',
        detail: 'Searched for "projectile", "circular motion", "angle of projection", "maximum height" — zero matches across all 18 papers. This content seems to have been folded into the general Mechanics questions above rather than appearing as its own recognisable question type, so it’s covered by "skip anything mechanics-flavoured" rather than needing a separate line item.',
      },
      {
        topic: 'Matrices, anywhere in the paper',
        detail: 'Cross-checked all 18 itute solutions (working, not just question text) plus a direct search of the VCAA papers for "matrix", "transition", "transform" and "linear transformation" — zero hits, in the questions or the working, across all 9 years. Unlike Methods, Specialist U3&4 never actually used matrices in this window — the study design put Specialist’s matrix content in Units 1&2, which don’t feed into the Exam 1/2 papers you’d practice from. There is nothing to remove here.',
      },
    ],
  },
  {
    id: 'chemistry',
    rows: [
      { year: 2016, exam: 'Exam', question: 'MCQ 1', topic: 'AAS, UV-Vis and GC' },
      { year: 2016, exam: 'Exam', question: 'MCQ 5', topic: 'DNA complementary base pairing' },
      { year: 2016, exam: 'Exam', question: 'MCQ 20', topic: 'Percentage ionisation of weak acids' },
      { year: 2016, exam: 'Exam', question: 'MCQ 21', topic: 'Acidity constant (Ka)' },
      { year: 2016, exam: 'Exam', question: 'Entire SAQ1', topic: 'Gas chromatography (GC)', note: 'No longer examined, but the theory is essentially the same as HPLC, which still is — doable if you treat this as an HPLC chromatogram.' },
      { year: 2016, exam: 'Exam', question: 'SAQ3b', topic: 'Mono-/polyunsaturation of fatty acids' },
      { year: 2016, exam: 'Exam', question: 'SAQ4d', topic: 'Condensation polymerisation' },
      { year: 2016, exam: 'Exam', question: 'Entire SAQ6', topic: 'AAS (atomic absorption spectroscopy)', note: 'Technically doable, since it doesn’t directly examine AAS content — treat the calibration curve as you would for HPLC, and "absorbance" on the vertical axis as you would "peak area". For part (c), the first three exam-report options are also no longer on the study design, but you should still identify volumetric analysis (titration) as a possible technique.' },
      { year: 2016, exam: 'Exam', question: 'SAQ7b', topic: 'Synthesis of aspirin', note: 'Used to require memorising a specific pathway — no longer required.' },
      { year: 2017, exam: 'Exam', question: 'MCQ 8', topic: 'Coenzymes', note: 'Coenzymes and the shape-changing nature of enzymes aren’t examined anymore, but both options A and B are still true — option A (the lock-and-key model and inactive enantiomers) is what matters for the current study design.' },
      { year: 2017, exam: 'Exam', question: 'MCQ 9', topic: 'Energy content of foods', note: 'Doable — food energy only comes from macronutrients (protein, fats, carbohydrates) using the Databook values; ignore dietary fibre and sodium, they don’t provide energy.' },
      { year: 2017, exam: 'Exam', question: 'MCQ 12', topic: 'Oxidative rancidity' },
      { year: 2017, exam: 'Exam', question: 'MCQ 16', topic: 'Vitamins' },
      { year: 2017, exam: 'Exam', question: 'MCQ 25', topic: 'Glycaemic index (GI)' },
      { year: 2017, exam: 'Exam', question: 'SAQ2', topic: 'Biodiesel energy content', note: 'Fully doable — the question supplies biodiesel’s energy content on page 18 because the old Databook didn’t include it (the current one does). A value given in the question always takes precedence over the Databook anyway.' },
      { year: 2017, exam: 'Exam', question: 'SAQ3c', topic: 'Essential amino acids' },
      { year: 2017, exam: 'Exam', question: 'SAQ7c', topic: 'Coenzymes' },
      { year: 2018, exam: 'Exam', question: 'MCQ 2', topic: 'Aspartame (artificial sweeteners)' },
      { year: 2018, exam: 'Exam', question: 'MCQ 5', topic: 'Coal seam gas (CSG)' },
      { year: 2018, exam: 'Exam', question: 'MCQ 7', topic: 'Vitamins' },
      { year: 2018, exam: 'Exam', question: 'MCQ 8', topic: 'Omega-3 fatty acids' },
      { year: 2018, exam: 'Exam', question: 'MCQ 26', topic: 'Starch indicator' },
      { year: 2018, exam: 'Exam', question: 'SAQ4b', topic: 'Coenzymes' },
      { year: 2018, exam: 'Exam', question: 'SAQ4d', topic: 'Antioxidants' },
      { year: 2018, exam: 'Exam', question: 'Entire SAQ10', topic: 'Metabolism of fats' },
    ],
    notFound: [
      {
        topic: 'Alkynes',
        detail: 'Searched all 9 papers for "alkyne" — zero matches. Alkynes were on the old study design’s compound list but don’t seem to have actually been built into an exam question in 2014–2022, so there’s nothing to skip here in practice — confirmed alkynes are gone from the current study design entirely (not just Units 3&4) by reading the current document directly.',
      },
      {
        topic: 'The carbon monoxide poisoning equilibrium example',
        detail: 'Searched for "carbon monoxide" — zero matches. It was named in the study design as an illustrative example but VCAA never appears to have written an exam question around it.',
      },
      {
        topic: 'Acid–base titration for an organic compound’s concentration',
        detail: 'Titration itself appears in every single paper, and distinguishing "acid–base titration used specifically to find an organic compound’s concentration" from ordinary acid–base or redox titration questions requires reading each one individually rather than a reliable keyword search — not done here. If you spot an old question titrating an organic acid/base to find its concentration, treat it as a "note", not a hard skip.',
      },
      {
        topic: 'Redox equations in basic/alkaline conditions, and bond-enthalpy calculations',
        detail: 'Searched all 9 papers for "alkaline", "basic conditions" and "bond enthalpy" — zero matches for either. Both are explicitly new in the current study design (confirmed by reading it directly) and were flagged by tutoring companies as catching students off guard in the 2024 exam. Nothing to skip, since no old question resembles them, but worth knowing old papers won’t prepare you for these specifically.',
      },
    ],
  },
]
