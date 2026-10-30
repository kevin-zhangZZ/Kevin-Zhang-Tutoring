// 2021 Chemistry Exam, MCQ 9. VCAA examination report: 62% correct. Converting a charge in
// coulombs into an amount of electrons with n(e⁻) = Q/F — the time given is not needed. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 62, B: 20, C: 12, D: 5 },
  answer: 'A',
  comment: (
    <>
      Since <i>Q</i> = <i>n</i>(e⁻) x <i>F</i>
      <br />
      <i>n</i>(e⁻) = <i>Q</i> / <i>F</i>
      <br />
      = 4.00 C / 96500 C mol⁻¹
      <br />
      = 4.15 x 10⁻⁵ mol
      <br />
      Selection of Option B is consistent with confusing current with charge and using,
      inappropriately, <i>Q</i> = <i>It</i>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Given: <i>Q</i> = 4.00 C (a <b>charge</b>, unit coulomb).</>,
    reason: <>Read the unit: C is coulombs, so 4.00 C is already the total charge that passed. It is <i>not</i> a current (current is measured in amperes, A = C s⁻¹). That means <Katex tex="Q = It" /> isn&rsquo;t needed, and neither is the time of 5.00 minutes — it is extra information.</>,
  },
  {
    working: <Katex tex="n(\text{e}^-) = \dfrac{Q}{F}" />,
    reason: <>Faraday&rsquo;s first law in mole form: the Faraday constant <i>F</i> is the charge carried by one mole of electrons, so dividing the charge by <i>F</i> counts the moles of electrons. Data Book: <i>F</i> = 96 500 C mol⁻¹.</>,
  },
  {
    working: <Katex tex="n(\text{e}^-) = \dfrac{4.00\ \text{C}}{96\,500\ \text{C mol}^{-1}}" />,
    reason: <>The coulombs cancel, leaving mol.</>,
  },
  {
    working: <Katex tex="n(\text{e}^-) = 4.15 \times 10^{-5}\ \text{mol}" />,
    reason: <>4.00 ÷ 96 500 = 4.145… × 10⁻⁵, which is 4.15 × 10⁻⁵ mol to three significant figures (set by 4.00 C).</>,
  },
  {
    working: <Katex tex="\boxed{4.15 \times 10^{-5}\ \text{mol of electrons}}" />,
    reason: <>Matches option <b>A</b>. Sanity check: one mole of electrons carries 96 500 C, so a mere 4 C is a tiny fraction of a mole — the answers of order 10⁴ mol (C and D) are impossible. Option <b>C</b> (1.93 × 10⁴) equals 96 500 ÷ 5.00, the Faraday constant divided by the time. Option <b>D</b> (2.41 × 10⁴) is the formula upside down, <i>F</i>/<i>Q</i> = 96 500 ÷ 4.00. Option <b>B</b> (2.07 × 10⁻⁴) treats 4.00 as a current and multiplies by the time in minutes, <i>Q</i> = 4.00 × 5.00 = 20.0, then 20.0 ÷ 96 500 = 2.07 × 10⁻⁴ — the report notes B is consistent with confusing current with charge and using <Katex tex="Q = It" />.</>,
  },
]

export default function ChemistryQ9_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">An electrolysis cell consumed a charge of 4.00 C in 5.00 minutes.</p>
          <p>This represents a consumption of</p>
        </>
      }
      options={[
        { letter: 'A', content: <>4.15 × 10<sup>−5</sup> mol of electrons.</>, isAnswer: true },
        { letter: 'B', content: <>2.07 × 10<sup>−4</sup> mol of electrons.</> },
        { letter: 'C', content: <>1.93 × 10<sup>4</sup> mol of electrons.</> },
        { letter: 'D', content: <>2.41 × 10<sup>4</sup> mol of electrons.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
