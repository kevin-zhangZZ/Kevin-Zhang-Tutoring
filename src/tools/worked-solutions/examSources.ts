// Links to the original VCAA exam papers and examiner reports, hosted locally under
// public/exams/ (fetched from vcaa.vic.edu.au). Covers 2015-2025 for all three subjects —
// Exam 1 and Exam 2 for Methods/Specialist, the single Exam for Chemistry. Papers are always
// PDF; VCAA switched examiner reports from PDF to DOCX starting with the 2020 exams, so the
// report extension is tracked per year. For those DOCX-only years we also host a locally
// converted PDF copy (via Word) so visitors without a DOCX viewer still have a PDF option.
import type { SubjectId } from './data'

const BASE = `${import.meta.env.BASE_URL}exams`

export interface ExamSource {
  paper: string
  report: string
  /** A converted-to-PDF copy of `report`, present only when `report` itself is a DOCX file. */
  reportPdf?: string
}

// Keyed by "<subject>-<year>-<exam>", e.g. "methods-2016-Exam 2" or "chemistry-2017-Exam".
const SOURCES: Record<string, ExamSource> = {}

function reportExt(year: number): 'pdf' | 'docx' {
  return year >= 2020 ? 'docx' : 'pdf'
}

function register(subject: SubjectId, folder: string, year: number, exam: string, fileStem: string) {
  const ext = reportExt(year)
  SOURCES[`${subject}-${year}-${exam}`] = {
    paper: `${BASE}/${folder}/${fileStem}.pdf`,
    report: `${BASE}/${folder}/${fileStem}-report.${ext}`,
    // The converted PDF sits alongside the DOCX under the same file stem.
    reportPdf: ext === 'docx' ? `${BASE}/${folder}/${fileStem}-report.pdf` : undefined,
  }
}

for (let year = 2015; year <= 2025; year++) {
  register('methods', 'methods', year, 'Exam 1', `${year}-exam1`)
  register('methods', 'methods', year, 'Exam 2', `${year}-exam2`)
  register('specialist', 'specialist', year, 'Exam 1', `${year}-exam1`)
  register('specialist', 'specialist', year, 'Exam 2', `${year}-exam2`)
  register('chemistry', 'chemistry', year, 'Exam', `${year}-exam`)
}

// Methods also has transcribed 2014 questions, so its source archive extends one year earlier
// than the other subjects.
register('methods', 'methods', 2014, 'Exam 1', '2014-exam1')
register('methods', 'methods', 2014, 'Exam 2', '2014-exam2')

// Returns undefined for any subject/year/exam combination outside 2015-2025, so callers can
// simply skip rendering the links rather than guess at a URL.
export function examSourceFor(subject: SubjectId, year: number, exam: string): ExamSource | undefined {
  return SOURCES[`${subject}-${year}-${exam}`]
}
