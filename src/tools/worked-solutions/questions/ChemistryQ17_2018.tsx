// 2018 Chemistry Exam, MCQ 17. VCAA examination report: 56% correct — the fourth-hardest MCQ on
// the 2018 paper. A redox titration of oxalic acid with permanganate — the mole ratio from the
// balanced equation is the step most easily skipped.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 56, B: 13, C: 26, D: 4 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2MnO4-(aq) + 5C2O42-(aq) + 16H+(aq) -> 2Mn2+(aq) + 10CO2(g) + 8H2O(l)" className="block text-[13px]" />,
    reason: <>The 2:5 mole ratio between <Chem eq="MnO4-" /> and <Chem eq="C2O42-" /> is the key relationship — permanganate's purple colour disappearing marks the endpoint.</>,
  },
  {
    working: <>n(MnO₄⁻) = 0.0200 M × 0.0217 L = <b>4.34 × 10⁻⁴ mol</b></>,
    reason: 'Average titre volume of 21.7 mL.',
  },
  {
    working: (
      <>
        n(C₂O₄²⁻) = (5/2) × n(MnO₄⁻)
        <br />
        = 2.5 × 4.34 × 10⁻⁴ = <b>1.085 × 10⁻³ mol</b>
      </>
    ),
    reason: <>From the 5:2 ratio — 5 mol oxalate reacts per 2 mol permanganate.</>,
  },
  {
    working: <>c(H₂C₂O₄) = n / V = 1.085 × 10⁻³ / 0.02000 = <b>5.43 × 10⁻² M</b></>,
    reason: 'Divide by the 20.00 mL aliquot volume — the concentration in the original rhubarb extract.',
  },
  {
    working: <b>c(H₂C₂O₄) ≈ 5.43 × 10⁻² M</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ17_2018() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-4 py-3 mb-3 text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              A clear, colourless liquid extract of the rhubarb plant was analysed for the
              concentration of oxalic acid, <Chem eq="H2C2O4" />, by direct titration with a
              recently standardised and acidified potassium permanganate solution,{' '}
              <Chem eq="KMnO4(aq)" />. The balanced equation for this titration is
            </p>
            <Chem eq="2MnO4-(aq) + 5C2O42-(aq) + 16H+(aq) -> 2Mn2+(aq) + 10CO2(g) + 8H2O(l)" className="block text-[13px] my-2" />
            <p>
              A 20.00 mL aliquot of the rhubarb extract was titrated with acidified 0.0200 M{' '}
              <Chem eq="KMnO4" />, to a permanent pink endpoint. The average of three concordant
              titres was 21.7 mL.
            </p>
          </div>
          <p>
            The concentration of <Chem eq="H2C2O4" /> in the rhubarb extract is closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '5.43 × 10⁻² M', isAnswer: true },
        { letter: 'B', content: '5.00 × 10⁻² M' },
        { letter: 'C', content: '2.17 × 10⁻² M' },
        { letter: 'D', content: '7.40 × 10⁻⁴ M' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
