export type Confidence = 'skip' | 'note' | 'new'

export interface SkipItem {
  title: string
  detail: string
  confidence: Confidence
  /** Which exam(s) it typically showed up in, if known */
  where?: string
}

export interface SubjectGuide {
  id: string
  name: string
  /** Accreditation period of the CURRENT study design */
  currentSD: string
  /** Accreditation period(s) of the study design(s) the 2014–2022 papers were written under */
  oldSD: string
  intro: string
  items: SkipItem[]
  sources: { label: string; url: string }[]
}

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  skip: 'Skip — no longer on the course',
  note: 'Note — technique or emphasis changed',
  new: 'New content — old papers won’t cover it',
}

export const guides: SubjectGuide[] = [
  {
    id: 'methods',
    name: 'Mathematical Methods',
    currentSD: '2023–2027 study design',
    oldSD: '2016–2022 study design (papers 2014–2022)',
    intro: '',
    items: [
      {
        title: 'Matrix transformations of graphs',
        confidence: 'skip',
        detail:
          'Using a 2×2 matrix to describe a dilation/reflection/translation applied to a function’s graph was removed from Methods entirely (matrices for transformations are gone from the course). Several of these are still doable if you translate the matrix into plain-English transformations first — see the notes in the audit below.',
        where: 'Exam 1 or 2, usually a Functions/Algebra question',
      },
      {
        title: 'Modulus function/graph questions',
        confidence: 'skip',
        detail:
          'Standalone questions built around the graph or algebra of an absolute-value (modulus) function — sketching |f(x)|, solving modulus equations, etc. — showed up repeatedly in 2014–2015 papers but don’t match how the current study design treats this content.',
        where: 'Exam 2, Functions/Algebra section',
      },
      {
        title: 'Transition matrices (Markov chains)',
        confidence: 'skip',
        detail:
          'Questions modelling how a probability changes step-by-step (e.g. the chance an item is "smooth" given the previous one was, repeated over several stages) used to be solvable via a transition matrix raised to a power — it was even on the formula sheet as Sₙ = Tⁿ × S₀. That formula and the underlying "transitional probabilities" content is gone from the current study design.',
        where: 'Exam 2, Probability section — usually the last part of a longer question',
      },
      {
        title: 'Area approximation using rectangles',
        confidence: 'skip',
        detail:
          'Old papers approximate area under a curve with left/right-endpoint rectangles (Riemann sums); the current study design uses the trapezium rule instead. Same underlying idea, different technique — worth understanding the concept, but don’t practice the exact rectangle method expected of you now.',
        where: 'Exam 2, Calculus section',
      },
    ],
    sources: [
      {
        label: 'Mathematical Methods Changes 2023 (study-design comparison, VIC Maths Notes)',
        url: 'https://vicmathsnotes.weebly.com/methods-u34.html',
      },
      {
        label: 'VCAA — Mathematical Methods past examinations',
        url: 'https://www.vcaa.vic.edu.au/assessment/vce/examination-specifications-past-examinations-and-examination-reports/mathematical-methods',
      },
      {
        label: 'itute.com — worked solutions to VCAA Mathematical Methods exams (used to cross-check the audit below)',
        url: 'https://www.itute.com/download-free-vce-maths-resources/free-maths-exams/',
      },
    ],
  },
  {
    id: 'specialist',
    name: 'Specialist Mathematics',
    currentSD: '2023–2027 study design',
    oldSD: '2016–2022 study design (papers 2014–2022)',
    intro:
      'Specialist lost one entire Area of Study — Mechanics — which used to be a full extended-response question in most old Exam 2 papers. That’s the big one to watch for.',
    items: [
      {
        title: 'Mechanics — the whole area of study',
        confidence: 'skip',
        detail:
          'Forces, Newton’s second law, connected particles on strings/pulleys, friction, normal reaction, equilibrium of particles, momentum/impulse — all of it. Mechanics was removed from Specialist Units 3&4 entirely to make room for the new Logic and Proof area of study.',
        where: 'Exam 2 — almost always one of the longer extended-response questions',
      },
      {
        title: 'Arc length from a Cartesian curve',
        confidence: 'skip',
        detail:
          'Finding the arc length of a curve given in Cartesian form y = f(x), rather than as a vector/parametric curve, is no longer required — this specific technique was dropped even though arc length via vector functions is still examinable.',
        where: 'Exam 2, Calculus section',
      },
    ],
    sources: [
      {
        label: 'Specialist Mathematics Changes 2023 (study-design comparison, VIC Maths Notes)',
        url: 'https://vicmathsnotes.weebly.com/specialist-u34.html',
      },
      {
        label: 'VCAA — Specialist Mathematics past examinations',
        url: 'https://www.vcaa.vic.edu.au/assessment/vce/examination-specifications-past-examinations-and-examination-reports/specialist-mathematics',
      },
      {
        label: 'itute.com — worked solutions to VCAA Specialist Mathematics exams (used to cross-check the audit below)',
        url: 'https://www.itute.com/download-free-vce-maths-resources/free-maths-exams/',
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    currentSD: '2024–2027 study design',
    oldSD: '2013–2016 study design (papers 2014–2016) and 2017–2023 study design (papers 2017–2022)',
    intro:
      'Chemistry U3&4 content is roughly 80% unchanged — most of what moved was reorganised between units rather than deleted, and the November exam still covers all of Units 3&4 together regardless of which unit something was taught in. There are only a couple of genuine deletions, plus four things that are brand-new with no past-paper equivalent at all. Because 2014–2016 papers sat under an even older study design than 2017–2022 papers, expect slightly more mismatch in the oldest few years even though the content is broadly stable throughout.',
    items: [
      {
        title: 'Alkynes',
        confidence: 'skip',
        detail:
          'Alkynes were dropped from the list of organic compound classes course-wide — checked the current study design text directly and the word "alkyne" doesn’t appear anywhere in it, in Units 1&2 or 3&4. Skip any question specifically about alkyne structure, naming or reactions.',
      },
      {
        title: 'Old instrumental-analysis techniques (AAS, GC)',
        confidence: 'skip',
        detail:
          'Atomic absorption spectroscopy (AAS) and gas chromatography (GC) turn up as their own named techniques in 2016 questions but don’t appear this way in the current study design — best guess is this content got folded into (or replaced by) the current HPLC/UV-Vis-centred treatment of instrumental analysis, rather than removed outright. Several of these old questions are still doable if you translate them into HPLC terms — see the notes in the audit below.',
        where: '2016 exam — MCQ and short-answer questions on AAS/GC',
      },
      {
        title: 'Old-style nutrition & biomolecule content',
        confidence: 'skip',
        detail:
          'A cluster of 2017–2018 questions on food energy content, fatty acid saturation, oxidative rancidity, vitamins, glycaemic index, essential amino acids, coenzymes, antioxidants and fat metabolism — best guess is this reflects an older, more detailed "nutrition" emphasis in Unit 4 that’s since been trimmed or reorganised. A few of these are still fully doable (energy calculations, biodiesel) — see the notes in the audit below for which.',
        where: '2017–2018 exams — mostly MCQs, plus a couple of short-answer questions',
      },
      {
        title: 'Synthesis of aspirin (specific pathway)',
        confidence: 'skip',
        detail:
          'Used to require memorising a specific synthesis pathway for aspirin — no longer required by the current study design.',
        where: '2016 exam, short-answer question',
      },
      {
        title: 'Other one-off flagged questions',
        confidence: 'skip',
        detail:
          'A handful of questions with no obvious shared theme, individually flagged as no longer matching the current course: DNA complementary base pairing, percentage ionisation of weak acids, acidity constants (Ka), condensation polymerisation, aspartame (artificial sweeteners), coal seam gas, and starch indicator.',
        where: '2016 and 2018 exams',
      },
      {
        title: 'Acid–base titration to find an organic compound’s concentration',
        confidence: 'note',
        detail:
          'In the organic-analysis context, the course now only lists redox titration (e.g. finding Vitamin C content) for determining concentration — the old acid–base titration example (e.g. titrating an organic acid) isn’t in that section anymore. Acid–base titration itself is still standard chemistry, just not framed this way here.',
      },
      {
        title: 'The carbon monoxide poisoning equilibrium example',
        confidence: 'note',
        detail:
          'Old papers sometimes built a Le Chatelier’s principle question around CO poisoning specifically (it was a named example in the old study design). The example itself is gone, but predicting equilibrium shifts with Le Chatelier’s principle is exactly the same skill and still fully examinable.',
      },
      {
        title: 'Medicinal Chemistry (drug design, enzyme inhibition, chirality of medicines)',
        confidence: 'new',
        detail:
          'This is a brand-new topic in Unit 4 — nothing to skip, but also nothing to practice from 2014–2022 papers. You’ll need 2024+ papers or VCAA sample material for this content.',
      },
      {
        title: 'Sustainable/green chemistry (green hydrogen, PEM electrolysis, artificial photosynthesis)',
        confidence: 'new',
        detail:
          'Also brand-new, added across Units 3&4 alongside a "green chemistry principles" framing on lots of existing content. No 2014–2022 exam question will resemble these.',
      },
      {
        title: 'Redox half-equations in basic/alkaline conditions',
        confidence: 'new',
        detail:
          'The current study design explicitly asks for balanced half-equations "in both acidic and basic conditions" — that phrase (and "alkaline") appears nowhere in the old study design, and no 2014–2022 paper ever asks for a redox equation balanced in base. Old papers are still fine for practicing acidic-conditions redox equations, the technique for basic conditions just isn’t there to copy.',
      },
      {
        title: 'Enthalpy calculations from bond enthalpies',
        confidence: 'new',
        detail:
          'Several 2024 exam reports/tutor write-ups flag bond-enthalpy-based enthalpy calculations as new and caught students off guard. Checked all 9 old papers for "bond enthalpy" — zero mentions; old questions calculate enthalpy change from given ΔH values or specific heat capacity/calorimetry instead. Treat this as a genuinely new skill with no past-paper practice available.',
      },
    ],
    sources: [
      {
        label: 'VCE Chemistry 2023–2027 study design (VCAA, official — current)',
        url: 'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/chemistry/chemistry',
      },
      {
        label: 'VCE Chemistry 2016–2021 study design (for comparison, mirrored copy)',
        url: 'https://svpchemistry.weebly.com/uploads/1/2/3/2/123218815/chemistrysd-2016.pdf',
      },
      {
        label: 'Matrix Education — 2024 VCE Chemistry Exam Solutions (flags bond enthalpy as new/surprising)',
        url: 'https://www.matrix.edu.au/2024-vce-chemistry-exam-solutions/',
      },
      {
        label: 'Edrolo — The 2024 VCE Chemistry Exam: insights and advice',
        url: 'https://edrolo.com.au/blog-posts/the-2024-vce-chemistry-exam-insights-and-advice-with-louise-lennard',
      },
    ],
  },
]
