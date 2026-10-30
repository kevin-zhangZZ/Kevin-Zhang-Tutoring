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
    working: <>Read across from a peak area of <b>0.35</b> to the line, then down to the concentration axis: halfway between 15 and 20 ng mL⁻¹, approximately <b>18 ng mL⁻¹</b>.</>,
    reason: <>The line passes through (0, 0) and (15, 0.30), a gradient of 0.30 ÷ 15 = 0.020 per ng mL⁻¹, so 0.35 ÷ 0.020 = 17.5 ≈ 18 ng mL⁻¹. This is the concentration of the <b>diluted</b> sample — the solution that was actually run through the HPLC — not of the original 1 mL sample.</>,
  },
  {
    working: (
      <>
        dilution factor = final volume ÷ initial volume
        <br />
        dilution factor = 1.00 L ÷ 1.00 mL = 1000 mL ÷ 1.00 mL
        <br />
        dilution factor = <b>1000</b>
      </>
    ),
    reason: <>Convert to the same units first: 1.00 L = 1000 mL. Diluting spreads the same amount of folic acid through 1000 times the volume, so the diluted solution is 1000 times <i>less</i> concentrated than the original.</>,
  },
  {
    working: (
      <>
        <i>c</i>(original) = dilution factor × <i>c</i>(diluted)
        <br />
        <i>c</i>(original) = 1000 × 18 ng mL⁻¹
        <br />
        <i>c</i>(original) = 18 × 10³ ng mL⁻¹
      </>
    ),
    reason: <>Undo the dilution by <b>multiplying</b> by the dilution factor — the original sample is the more concentrated one. The report links the large number of &lsquo;B&rsquo; responses to missing this step.</>,
  },
  {
    working: (
      <>
        1 µg = 10³ ng
        <br />
        18 × 10³ ng mL⁻¹ = <b>18 µg mL⁻¹</b>
      </>
    ),
    reason: <>Data Book: metric prefixes (micro = 10⁻⁶, nano = 10⁻⁹), so 1 ng = 10⁻³ µg. The volume unit (mL) is unchanged.</>,
  },
  {
    working: <span className="font-semibold">18 µg mL⁻¹</span>,
    reason: <>Matches option <b>C</b>. Option <b>B</b>, 18 ng mL⁻¹, the most popular answer, is the graph reading with the dilution left out (the report&rsquo;s point). Option <b>A</b>, 18 pg mL⁻¹, divides by the dilution factor instead of multiplying (18 ng mL⁻¹ ÷ 1000 = 18 pg mL⁻¹). Option <b>D</b>, 18 mg mL⁻¹, is another 1000 times too large: 18 × 10³ ng = 18 µg, not 18 mg, because 1 mg = 10⁶ ng. (The report&rsquo;s comment ends &ldquo;= 18 µg L⁻¹&rdquo;; that is a slip for 18 µg mL⁻¹, which its own working gives.)</>,
  },
]

export default function ChemistryQ18_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The graph below shows the HPLC calibration curve for folic acid.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={curveSrc}
              alt="Calibration curve: peak area (0.00 to 0.50) against folic acid concentration (0 to 25 ng mL⁻¹), a straight line from the origin to about (25, 0.50), gradient about 0.020 per ng mL⁻¹, drawn through six data points — from the original 2023 VCAA exam paper"
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
