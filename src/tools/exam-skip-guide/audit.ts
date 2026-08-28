// Question-by-question audit of 2014–2022 VCAA past exams.
//
// Methodology: downloaded every official VCAA exam PDF for 2014–2022 (Methods exam 1 & 2,
// Specialist exam 1 & 2, Chemistry) directly from vcaa.vic.edu.au, extracted the text, and
// searched it for language distinctive of each removed topic (e.g. "T: R2 -> R2" for matrix
// transformations, "tension"/"equilibrium"/"pulley" for mechanics). Every row below was then
// read in context to confirm the question actually is what the search suggests — this is a
// text-search-and-verify pass, not a claim that every single question in every paper was
// individually read. Treat it as a draft: re-check questions against the actual papers before
// relying on it with students.
//
// Methods was additionally cross-checked against itute.com's worked solutions for all 18
// papers (2014–2022, exam 1 & 2) — reading the actual working, not just the question text,
// surfaces matrix use the VCAA question wording alone doesn't (e.g. "transformed by" instead
// of "transformation", or a plain-English probability question that itute solves with a
// transition matrix). Two rows below (2014 Q4fg, 2015 Q18) and one correction (2019 Q9) came
// from that pass specifically.
//
// 2014–2017 rows for both Methods and Specialist were revised again from the tutor's own
// question-by-question exam review (Aug 2026), which also identified several "still doable"
// workarounds — cases where a question looks like it needs removed content (a matrix, a
// force/motion setup) but can actually be solved by translating it into non-matrix or
// non-mechanics terms. Those workarounds are kept as a note on the relevant row.

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
      { year: 2018, exam: 'Exam 2', question: 'Q20', topic: 'Matrix transformation', note: 'MCQ' },
      { year: 2019, exam: 'Exam 1', question: 'Q2(c)', topic: 'Matrix transformation' },
      { year: 2019, exam: 'Exam 2', question: 'Q9', topic: 'Matrix transformation', note: 'MCQ — question says "transformed by", not "transformation", which is why the first pass missed it' },
      { year: 2019, exam: 'Exam 2', question: 'Section B Q3', topic: 'Matrix transformation', note: 'Later part of the question, after the calculus parts' },
      { year: 2020, exam: 'Exam 2', question: 'Section B Q5(h)', topic: 'Matrix transformation' },
      { year: 2022, exam: 'Exam 2', question: 'Section B Q2(e)', topic: 'Matrix transformation' },
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
      { year: 2018, exam: 'Exam 1', question: 'Q1', topic: 'Mechanics', note: 'Two masses connected over a pulley on an inclined plane' },
      { year: 2018, exam: 'Exam 1', question: 'Q6', topic: 'Mechanics (force/mass DE)', note: 'Particle moves under a force F, position vector given — force/mass differential equation style' },
      { year: 2018, exam: 'Exam 2', question: 'Q15, Q16', topic: 'Mechanics', note: 'MCQs — constant force on a particle; forces in equilibrium' },
      { year: 2018, exam: 'Exam 2', question: 'Section B Q5', topic: 'Mechanics', note: 'Resistance force proportional to speed' },
      { year: 2019, exam: 'Exam 1', question: 'Q9', topic: 'Mechanics', note: 'Mass hanging in equilibrium from a string' },
      { year: 2019, exam: 'Exam 2', question: 'Q13, Q14, Q17', topic: 'Mechanics', note: 'MCQs — forces and acceleration, connected masses, coplanar forces in equilibrium' },
      { year: 2019, exam: 'Exam 2', question: 'Section B Q5', topic: 'Mechanics', note: 'Masses connected by string over pulley on inclined plane — normal reaction, tension' },
      { year: 2020, exam: 'Exam 1', question: 'Q1', topic: 'Mechanics', note: 'Normal reaction force on a mass' },
      { year: 2020, exam: 'Exam 2', question: 'Q15, Q18', topic: 'Mechanics', note: 'MCQs — force components; string tension/equilibrium' },
      { year: 2020, exam: 'Exam 2', question: 'Section B Q5', topic: 'Mechanics', note: 'Pulley system with opposing forces' },
      { year: 2021, exam: 'Exam 1', question: 'Q1', topic: 'Mechanics' },
      { year: 2021, exam: 'Exam 2', question: 'Q14, Q15', topic: 'Mechanics', note: 'MCQs — net force on a body; forces in equilibrium' },
      { year: 2021, exam: 'Exam 2', question: 'Section B Q5', topic: 'Mechanics', note: 'Masses connected over frictionless pulleys' },
      { year: 2022, exam: 'Exam 1', question: 'Q5', topic: 'Mechanics', note: 'Braking force on a body in motion' },
      { year: 2022, exam: 'Exam 2', question: 'Q16, Q17', topic: 'Mechanics', note: 'MCQs — coplanar forces in equilibrium; momentum' },
      { year: 2022, exam: 'Exam 2', question: 'Q20', topic: 'Mechanics', note: 'Pulley and mass system' },
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
    rows: [],
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
