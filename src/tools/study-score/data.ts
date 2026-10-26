// The subjects and their VCAA exam grade distributions, 2014–2025.
//
// Everything per subject — names, what each exam is out of, how the exams are weighted, the
// yearly grade tables — is in subjects.gen.ts, written by scripts/study-score/build.py from
// VCAA's grade-distribution PDFs (every table checked against VCAA's totals) and examination
// specifications. To add a year or fix a subject, change the inputs there and re-run it.
//
// Grade tables are on VCAA's GA scale, which is not always the raw marks (Methods Exam 1 is out
// of 80 for a 40-mark paper; Japanese's oral and written exams are one score out of 400). The
// model turns a mark into a GA score by its share of the paper, so it never assumes a scale.

import { DISTRIBUTION_DATA, SUBJECT_DATA } from './subjects.gen.ts'

export type Subject = keyof typeof SUBJECT_DATA

export interface ExamInfo {
  label: string
  /** Short label for tight spots: "E1". */
  short: string
  /** Raw marks the paper is out of (on the current paper; see `older`). */
  rawMax: number
  /** Which of the year's graded assessments (`YearDist.exams`) this mark feeds. */
  ga: number
  /** The mark's weight in the study score: its stated percentage where VCAA gives one, else its
   *  graded assessment's GA maximum (so exams combine as VCAA's scales add up). Marks feeding one
   *  graded assessment split it in proportion (Japanese: oral 12.5, written 37.5). */
  weight: number
  /** Older papers out of a different total, oldest era first (Economics was out of 90 up to 2016). */
  older?: { upTo: number; rawMax: number }[]
}

export interface SubjectInfo {
  name: string
  /** For the subject switch. */
  label: string
  /** The heading it sits under in the subject search. */
  group: string
  /** Words students type for it, beyond its name and label ("spec", "chem"). */
  aliases: string
  exams: ExamInfo[]
  /** A mark isn't worth the same on every paper (Japanese: an oral mark is worth less than a
   *  written one), so totals are counted as a weighted percentage of the exams, not in marks. */
  weighted?: boolean
  /** The first paper on the current study design. */
  designFrom: number
  /** The study's earlier name, for papers up to a year (General Maths was Further Maths). */
  olderName?: { upTo: number; name: string }
  /** The study also has school-assessed tasks (externally reviewed folios), which aren't in the
   *  projection. */
  tasks?: boolean
}

export interface ExamDist {
  max: number
  bands: [number, number, number][]
}

export interface YearDist {
  year: number
  /** One per graded assessment the subject's marks feed, in `ga` order. */
  exams: ExamDist[]
  source: string
}

export const SUBJECTS: Record<Subject, SubjectInfo> = SUBJECT_DATA
export const DISTRIBUTIONS: Record<Subject, YearDist[]> = DISTRIBUTION_DATA
export const SUBJECT_IDS = Object.keys(SUBJECTS) as Subject[]

/** The exams as they were on a given year's paper (Economics 2014–2016 was out of 90). */
export function examsFor(subject: Subject, year: number): ExamInfo[] {
  return SUBJECTS[subject].exams.map(e => {
    const era = e.older?.find(o => year <= o.upTo)
    return era ? { ...e, rawMax: era.rawMax } : e
  })
}

/** A mark's label without the "(%)" of a mark entered as a percentage. */
export const plainLabel = (e: ExamInfo) => e.label.replace(/\s*\(%\)$/, '')

/** Each graded assessment's name: its mark's label, or its marks' labels joined where several
 *  marks make one ("Written Report + Oral Presentation" in Extended Investigation). */
export function gaLabels(subject: Subject): string[] {
  const out: string[][] = []
  for (const e of SUBJECTS[subject].exams) (out[e.ga] ??= []).push(plainLabel(e))
  return out.map(ls => ls.join(' + '))
}

/** The first paper on each subject's current study design. */
export const designFrom = (subject: Subject) => SUBJECTS[subject].designFrom

/** The last paper whose course had topics the Skip Guide tells students to skip. For Specialist
 *  and Chemistry that is every paper before the current design; each is on an older design, not
 *  always the one just before (Chemistry's 2014–2016 papers are on the 2013–2016 design, two back). Methods
 *  also changed in 2023, but the Skip Guide finds nothing to skip on its 2016–2022 papers; only
 *  the Mathematical Methods (CAS) papers of 2014–2015 (matrices, modulus graphs) are flagged.
 *  The Skip Guide covers no other subject. */
export const OLD_COURSE_UP_TO: Partial<Record<Subject, number>> = {
  methods: 2015,
  specialist: 2022,
  chemistry: 2023,
}

export const oldCourseUpTo = (subject: Subject): number | null => OLD_COURSE_UP_TO[subject] ?? null

export function isOldCourse(subject: Subject, year: number): boolean {
  const last = oldCourseUpTo(subject)
  return last !== null && year <= last
}

/** The first paper after the flagged ones, or null when the subject isn't flagged. */
export function currentCourseFrom(subject: Subject): number | null {
  const last = oldCourseUpTo(subject)
  return last === null ? null : last + 1
}

/** What to call the papers after the flagged ones: "Current Course" only when they really are
 *  the current study design (Specialist, Chemistry); for Methods, 2016–2025 span two designs, so
 *  they go unlabelled and only the older papers get a label. */
export function newerCourseLabel(subject: Subject): string | null {
  return currentCourseFrom(subject) === designFrom(subject) ? 'Current Course' : null
}

/** The fewest students who sat the exam in any year shown: small studies rank less steadily. */
export function smallestCohort(subject: Subject): number {
  return Math.min(...DISTRIBUTIONS[subject].map(d => d.exams[d.exams.length - 1].bands.reduce((s, b) => s + b[2], 0)))
}
