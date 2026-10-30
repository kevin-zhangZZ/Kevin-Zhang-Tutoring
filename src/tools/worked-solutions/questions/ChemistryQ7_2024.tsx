// 2024 Chemistry Exam, MCQ 7. VCAA examination report: 63% correct. Faraday stoichiometry: the
// mass of copper deposited when 0.50 mol of electrons is transferred (Cu²⁺ + 2e⁻ → Cu). Question
// text transcribed from the original paper (rendered from page images — the 2024 exam PDF has no
// extractable text). VCAA report only; M(Cu) = 63.5 g mol⁻¹ from the Data Book (same in 2024 and
// 2026). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 23, C: 11, D: 3 },
  answer: 'A',
  comment: (
    <>
      <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" />
      <br />
      For 0.50 mol of electrons being used, 0.25 mol of copper is deposited.
      <br />
      Therefore, the m(Cu) = 0.25 × 63.5 = 15.9 g.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" />,
    reason: (
      <>
        Start with the reduction half-equation. Its coefficients give the mole ratio between
        electrons and copper: each Cu²⁺ ion needs <b>2</b> electrons to become one Cu atom.
      </>
    ),
  },
  {
    working: (
      <>
        <i>n</i>(Cu) : <i>n</i>(e⁻) = 1 : 2
      </>
    ),
    reason: <>The mole ratio, read from the coefficients of Cu and e⁻.</>,
  },
  {
    working: (
      <>
        <i>n</i>(Cu) = ½ × <i>n</i>(e⁻)
        <br />
        <i>n</i>(Cu) = ½ × 0.50 mol
        <br />
        <i>n</i>(Cu) = 0.25 mol
      </>
    ),
    reason: <>Half as many moles of copper as moles of electrons, because each Cu needs two electrons.</>,
  },
  {
    working: (
      <>
        <i>m</i> = <i>n</i> × <i>M</i>
        <br />
        <i>m</i>(Cu) = 0.25 mol × 63.5 g mol⁻¹
        <br />
        <i>m</i>(Cu) = 15.875 g
      </>
    ),
    reason: <>Data Book: <i>M</i>(Cu) = 63.5 g mol⁻¹. Rearrange <i>n</i> = <i>m</i>/<i>M</i> to <i>m</i> = <i>n</i> × <i>M</i>.</>,
  },
  {
    working: <b><i>m</i>(Cu) ≈ 16 g = 1.6 × 10 g</b>,
    reason: (
      <>
        Matches option <b>A</b>. Two significant figures, set by 0.50 mol of electrons (the report
        writes 15.9 g). Option <b>B</b> (3.2 × 10 g), chosen by 23%, misses the 1 : 2 ratio and
        treats 0.50 mol of electrons as 0.50 mol of Cu: 0.50 × 63.5 = 31.75 g. Option <b>C</b>{' '}
        (6.4 × 10 g) multiplies by 2 instead of halving: 1.0 mol × 63.5 = 63.5 g. Option <b>D</b>{' '}
        (1.3 × 10² g) divides the molar mass by the amount: 63.5 ÷ 0.50 = 127 g.
      </>
    ),
  },
]

export default function ChemistryQ7_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            In a galvanic cell, copper(II) ions, <Chem eq="Cu2+" />, are converted to copper metal, Cu.
          </p>
          <p>What mass of Cu is deposited for each 0.50 mol of electrons transferred in the cell?</p>
        </>
      }
      options={[
        { letter: 'A', content: '1.6 × 10 g', isAnswer: true },
        { letter: 'B', content: '3.2 × 10 g' },
        { letter: 'C', content: '6.4 × 10 g' },
        { letter: 'D', content: <>1.3 × 10<sup>2</sup> g</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
