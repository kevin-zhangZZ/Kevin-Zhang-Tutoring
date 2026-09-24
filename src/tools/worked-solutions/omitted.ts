// Questions deliberately left out of the archive, so the sidebar can show a greyed row where
// each one would be (with the reason) instead of a silent gap in the numbering. The reasons
// are the ones recorded in data.ts's block comments — when you leave a question out, note it
// there as usual (AUTHORING_GUIDE §12.8) and add it here too.
//
// Questions left out only in part (e.g. 2018 Specialist Exam 2 Q5 a–b) aren't listed: the
// question itself is still in the list.

import type { SubjectId } from './data'

export interface OmittedQuestion {
  subject: SubjectId
  year: number
  exam: string
  /** Same form as QuestionMeta.code without sub-parts, e.g. 'MCQ 18' or 'Q5'. */
  code: string
  /** Shown in the sidebar. 'Mechanics' and similar read as "… · not in the current study
   *  design"; 'Redacted by VCAA' is shown as is. */
  reason: string
}

const mechanics = (year: number, exam: string, codes: string[]): OmittedQuestion[] =>
  codes.map(code => ({ subject: 'specialist', year, exam, code, reason: 'Mechanics' }))

export const OMITTED: OmittedQuestion[] = [
  { subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 7', reason: 'Modulus graph' },
  { subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 12', reason: 'Matrix transformation' },
  { subject: 'methods', year: 2014, exam: 'Exam 2', code: 'MCQ 19', reason: 'Area by rectangles' },
  { subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 18', reason: 'Modulus function' },
  { subject: 'methods', year: 2015, exam: 'Exam 2', code: 'MCQ 22', reason: 'Modulus function' },

  ...mechanics(2014, 'Exam 1', ['Q8']),
  ...mechanics(2014, 'Exam 2', ['MCQ 18', 'MCQ 19', 'MCQ 20', 'Q5']),
  ...mechanics(2015, 'Exam 1', ['Q2']),
  ...mechanics(2015, 'Exam 2', ['MCQ 16', 'MCQ 19', 'MCQ 21']),
  ...mechanics(2016, 'Exam 1', ['Q1']),
  { subject: 'specialist', year: 2016, exam: 'Exam 1', code: 'Q7', reason: 'Arc length from Cartesian form' },
  ...mechanics(2016, 'Exam 2', ['MCQ 13', 'MCQ 14', 'MCQ 17']),
  ...mechanics(2017, 'Exam 1', ['Q9']),
  ...mechanics(2017, 'Exam 2', ['MCQ 14', 'MCQ 16', 'MCQ 17']),
  ...mechanics(2018, 'Exam 1', ['Q1']),
  ...mechanics(2018, 'Exam 2', ['MCQ 16']),
  ...mechanics(2019, 'Exam 1', ['Q9']),
  ...mechanics(2019, 'Exam 2', ['MCQ 14', 'MCQ 17', 'Q5']),
  ...mechanics(2020, 'Exam 1', ['Q1']),
  ...mechanics(2020, 'Exam 2', ['MCQ 18', 'MCQ 20', 'Q5']),
  ...mechanics(2021, 'Exam 2', ['MCQ 15', 'MCQ 16', 'Q5']),
  ...mechanics(2022, 'Exam 1', ['Q5']),
  ...mechanics(2022, 'Exam 2', ['MCQ 15', 'Q5']),
  { subject: 'specialist', year: 2022, exam: 'Exam 2', code: 'MCQ 4', reason: 'Redacted by VCAA' },
  { subject: 'specialist', year: 2022, exam: 'Exam 2', code: 'MCQ 19', reason: 'Redacted by VCAA' },
]
