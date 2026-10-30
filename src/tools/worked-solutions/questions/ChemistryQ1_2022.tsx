// 2022 Chemistry Exam, MCQ 1. VCAA examination report: 93% correct. Which section of a
// scientific poster explains the reason for undertaking an investigation — the introduction.
// Question text transcribed from the original paper. VCAA report only; the poster sections are
// checked against the current study design's scientific poster format. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 1, C: 93, D: 1 },
  answer: 'C',
  comment: <>The purpose of an investigation is stated in the introduction.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <>A scientific poster reads in a fixed order: title → introduction → methodology and methods → results → discussion → conclusion → references and acknowledgements.</>,
    reason: <>The study design sets out this poster format for the Unit 4 investigation, and gives each section a specific job.</>,
  },
  {
    working: <>Introduction: a brief explanation or <b>reason for undertaking the investigation</b>, with a clear aim, a hypothesis and/or prediction, and the relevant background chemistry.</>,
    reason: <>This is almost word for word the study design&rsquo;s description of the introduction — the question is asking exactly for this section. The &ldquo;why&rdquo; has to come first, before the reader sees what was done or found.</>,
  },
  {
    working: <>Methodology: <i>how</i> the investigation was done. Discussion: interpreting and evaluating the results, limitations and improvements. Conclusion: the answer to the investigation question, supported by the evidence.</>,
    reason: <>None of these explains <i>why</i> the investigation was undertaken — they describe what was done, what the results mean and what was found.</>,
  },
  {
    working: <b>The reason for the investigation belongs in the introduction.</b>,
    reason: <>Matches option <b>C</b>. Options <b>A</b> (discussion), <b>B</b> (conclusion) and <b>D</b> (methodology) are real poster sections, but they cover the interpretation, the answer and the method respectively, not the purpose.</>,
  },
]

export default function ChemistryQ1_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Scientific posters communicate the findings of scientific investigations.</p>
          <p>Which section of a scientific poster should explain the reason for undertaking an investigation?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'discussion' },
        { letter: 'B', content: 'conclusion' },
        { letter: 'C', content: 'introduction', isAnswer: true },
        { letter: 'D', content: 'methodology' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
