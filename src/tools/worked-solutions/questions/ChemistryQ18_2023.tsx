// 2023 Chemistry Exam, MCQ 18. VCAA examination report: 37% correct. Reading an HPLC calibration
// curve to find a diluted sample's concentration, then correctly undoing the dilution and fixing
// the units. Question text transcribed from the original paper; the calibration curve is
// cropped from the original VCAA exam PDF. The report's comment ends "18 µg L⁻¹", a slip for
// µg mL⁻¹ — kept verbatim and explained in the working. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import curveSrc from './chem-2023-mcq18-calibration-curve.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 45, C: 37, D: 9 },
  answer: 'C',
  comment: (
    <>
      According to the calibration curve for diluted folic acid solution:
      <br />
      peak at peak area 0.35 → 18 ng mL⁻¹ concentration.
      <br />
      The sample had been diluted by a factor of 1000 (1 mL to 1 L).
      <br />
      So, the concentration of the original undiluted sample was:
      <br />
      1000 x 18 ng mL⁻¹ = 18 x 10³ ng mL⁻¹
      <br />
      According to Table 6 of the Data Book:
      <br />
      1 ng = 10⁻³ µg so 1 µg = 10³ ng
      <br />
      Concentration of original sample = 18 µg L⁻¹
      <br />
      The large number of responses for &lsquo;B&rsquo; is indicative of the failure to allow for the
      dilution that occurred.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Read across from a peak area of <b>0.35</b> to the line and down: about 17.5, i.e. approximately <b>18 ng mL⁻¹</b> (the line passes through (15, 0.30), a slope of 0.020 per ng mL⁻¹). That is the concentration of the <i>diluted</i> sample, not the original one.</>,
    reason: <>The graph only tells you about the sample that was actually run through the instrument.</>,
  },
  {
    working: <>The original 1.00 mL sample was diluted up to 1.00 L before analysis — a dilution factor of 1000 L / 1 mL = 1000 mL / 1 mL = <b>1000×</b>.</>,
    reason: <>The most commonly missed step — many students stop at the graph reading and forget to undo the dilution.</>,
  },
  {
    working: <>Concentration of the original sample = 1000 × 18 ng mL⁻¹ = 18 000 ng mL⁻¹ = 18 × 10³ ng mL⁻¹.</>,
    reason: <>Undiluted concentration is 1000 times more concentrated than what was measured.</>,
  },
  {
    working: <>Converting units: 1 µg = 10³ ng (from the Data Book), so 18 × 10³ ng mL⁻¹ = <b>18 µg mL⁻¹</b>.</>,
    reason: <>Matches option <b>C</b>. Option <b>B</b>, 18 ng mL⁻¹, the most popular answer, leaves out the dilution (the report&rsquo;s point). (The report&rsquo;s comment ends &ldquo;= 18 µg L⁻¹&rdquo;; that is a slip for 18 µg mL⁻¹, which its own working gives.)</>,
  },
]

export default function ChemistryQ18_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The graph below shows the HPLC calibration curve for folic acid.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={curveSrc}
              alt="Calibration curve: peak area (0.00 to 0.50) against folic acid concentration (0 to 25 ng mL⁻¹), a straight line through the origin and (25, 0.49) drawn through five data points — from the original 2023 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p className="mb-2">
            A 1.00 mL sample containing an unknown concentration of folic acid is diluted to
            1.00 L. The diluted sample is analysed using the calibrated equipment at the same
            conditions. The folic acid peak area is found to be 0.35
          </p>
          <p>What is the approximate folic acid concentration in the 1 mL sample?</p>
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
