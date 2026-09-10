// 2024 Chemistry Exam, MCQ 24. VCAA examination report: 26% correct — the hardest MCQ on this
// paper. Finding the equivalence-point volume of oxalic acid needed to titrate a fixed amount of
// potassium permanganate, via the redox half-equations' electron balance. Question text
// transcribed from the original paper (rendered from page images — the 2024 exam PDF has no
// extractable text). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 35, C: 24, D: 26 },
  answer: 'D',
  comment: (
    <>
      From the Data Book: MnO₄⁻(aq) + 8H⁺(aq) + 5e⁻ → Mn²⁺(aq) + 4H₂O(l). Therefore, the reaction
      between MnO₄⁻ and C₂H₂O₄ has a 2:5 stoichiometric ratio. n(MnO₄⁻) = 0.001 mol, therefore
      n(C₂H₂O₄) = 0.0025 mol, and V(C₂H₂O₄) = 0.0025/0.100 = 0.025 L = 25 mL. Many students did
      not identify and apply the second half-equation and hence establish the stoichiometry
      needed for this question.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The question only gives the oxidation half-equation, <Chem eq="C2H2O4 -> 2CO2 + 2H+ + 2e-" />. The reduction half-equation for permanganate, <Chem eq="MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O" />, has to be recalled from the Data Book to balance the electrons.</>,
    reason: 'Both half-equations are needed — the question only hands you half of what you need.',
  },
  {
    working: <>Oxalic acid releases <b>2 electrons</b> per molecule; permanganate accepts <b>5 electrons</b> per ion. The lowest common multiple of 2 and 5 is 10, so multiply the oxalic acid equation by 5 and the permanganate equation by 2 to balance electrons.</>,
    reason: 'Standard redox-titration balancing step.',
  },
  {
    working: <>This gives the mole ratio <Chem eq="MnO4- : C2H2O4" /> = 2 : 5.</>,
    reason: 'For every 2 mol of permanganate reduced, 5 mol of oxalic acid must be oxidised.',
  },
  {
    working: <>n(MnO₄⁻) = 0.100 M × 0.0100 L = <b>0.00100 mol</b>.</>,
    reason: 'From the given concentration and volume of KMnO₄.',
  },
  {
    working: <>Using the 2:5 ratio: n(C₂H₂O₄) = 0.00100 mol × 5/2 = <b>0.00250 mol</b>.</>,
    reason: 'Scaling by the mole ratio found from the balanced half-equations.',
  },
  {
    working: <>V(C₂H₂O₄) = n/c = 0.00250 mol ÷ 0.100 M = 0.0250 L = <b>25.0 mL</b>.</>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ24_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Evelyn titrates 10.0 mL of 0.100 M potassium permanganate, KMnO₄, with 0.100 M oxalic
            acid, C₂H₂O₄.
          </p>
          <p className="mb-2">
            The half-equation for the oxidation of oxalic acid in acidic conditions is
          </p>
          <Chem eq="C2H2O4(aq) -> 2CO2(g) + 2H+(aq) + 2e-" className="block mb-2" />
          <p>What volume of C₂H₂O₄ should be added to reach the equivalence point?</p>
        </>
      }
      options={[
        { letter: 'A', content: '4.0 mL' },
        { letter: 'B', content: '10.0 mL' },
        { letter: 'C', content: '12.0 mL' },
        { letter: 'D', content: '25.0 mL', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
