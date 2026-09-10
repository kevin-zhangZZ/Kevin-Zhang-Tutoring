// 2023 Chemistry Exam, MCQ 18. VCAA examination report: 37% correct. Reading an HPLC calibration
// curve to find a diluted sample's concentration, then correctly undoing the dilution and fixing
// the units. Question text transcribed from the original paper; the calibration curve is
// summarised numerically since only one point on it is needed. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 45, C: 37, D: 9 },
  answer: 'C',
  comment: (
    <>
      According to the calibration curve, a peak area of 0.35 corresponds to an 18 ng mL⁻¹
      concentration. The sample had been diluted by a factor of 1000 (1 mL to 1 L), so the
      concentration of the original undiluted sample was 1000 × 18 ng mL⁻¹ = 18 × 10³ ng mL⁻¹ =
      18 µg mL⁻¹. The large number of responses for "B" is indicative of the failure to allow
      for the dilution that occurred.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Reading the calibration curve at a peak area of <b>0.35</b> gives a concentration of <b>18 ng mL⁻¹</b> — but that's the concentration of the <i>diluted</i> sample, not the original one.</>,
    reason: 'The graph only tells you about the sample that was actually run through the instrument.',
  },
  {
    working: <>The original 1.00 mL sample was diluted up to 1.00 L before analysis — a dilution factor of 1000 L / 1 mL = 1000 mL / 1 mL = <b>1000×</b>.</>,
    reason: 'The most commonly missed step — many students stop at the graph reading and forget to undo the dilution.',
  },
  {
    working: <>Concentration of the original sample = 1000 × 18 ng mL⁻¹ = 18 000 ng mL⁻¹ = 18 × 10³ ng mL⁻¹.</>,
    reason: 'Undiluted concentration is 1000 times more concentrated than what was measured.',
  },
  {
    working: <>Converting units: 1 µg = 10³ ng (from the Data Book), so 18 × 10³ ng mL⁻¹ = <b>18 µg mL⁻¹</b>.</>,
    reason: <>Matches option <b>C</b>. (Answer "B", 18 ng mL⁻¹, is what you'd get by forgetting the dilution factor entirely — the most common wrong answer.)</>,
  },
]

export default function ChemistryQ18_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            An HPLC calibration curve for folic acid shows peak area plotted against folic acid
            concentration; a peak area of 0.35 corresponds to a concentration of 18 ng mL⁻¹ on
            the curve.
          </p>
          <p>
            A 1.00 mL sample containing an unknown concentration of folic acid is diluted to
            1.00 L. The diluted sample is analysed using the calibrated equipment under the same
            conditions, and the folic acid peak area is found to be 0.35.
            <br />
            What is the approximate folic acid concentration in the original 1 mL sample?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '18 pg mL⁻¹' },
        { letter: 'B', content: '18 ng mL⁻¹' },
        { letter: 'C', content: '18 µg mL⁻¹', isAnswer: true },
        { letter: 'D', content: '18 mg mL⁻¹' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
