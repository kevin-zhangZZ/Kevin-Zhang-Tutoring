// 2024 Chemistry Exam, MCQ 9. VCAA examination report: 29% correct. Balancing the anode
// half-equation for an alkaline ethanol fuel cell to find how much hydroxide reacts per mole of
// ethanol. Question text transcribed from the original paper (rendered from page images — the
// 2024 exam PDF has no extractable text). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 27, C: 23, D: 29 },
  answer: 'D',
  comment: (
    <>
      The negative electrode is the anode, where oxidation occurs: C₂H₆O + 3H₂O → 2CO₂ + 12H⁺ +
      12e⁻ (in acidic conditions), or C₂H₆O + 12OH⁻ → 2CO₂ + 9H₂O + 12e⁻ (in alkaline conditions).
      In general this question was not well answered; the use of alkaline conditions for
      balancing half-equations was not well understood.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Start from the acidic-conditions oxidation half-equation, balancing C, H, and charge directly: <Chem eq="C2H6O + 3H2O -> 2CO2 + 12H+ + 12e-" />.</>,
    reason: 'Ethanol has 2 carbons (→ 2 CO₂) and its H/O atoms need 3 extra H₂O on the left to balance oxygen; the 12H⁺ + 12e⁻ then balances hydrogen and charge.',
  },
  {
    working: <>To convert to alkaline conditions, add 12 OH⁻ to <i>both</i> sides — enough to neutralise all 12 H⁺ into 12 H₂O: <Chem eq="C2H6O + 3H2O + 12OH- -> 2CO2 + 12H2O + 12e-" />.</>,
    reason: 'Standard acidic-to-alkaline conversion: cancel H⁺ with OH⁻ to form water on the product side.',
  },
  {
    working: <>Simplify the water: 3H₂O on the left and 12H₂O on the right leave a net 9H₂O on the right after cancelling: <Chem eq="C2H6O + 12OH- -> 2CO2 + 9H2O + 12e-" />.</>,
    reason: 'Subtracting the smaller water amount from both sides gives the fully reduced alkaline half-equation.',
  },
  {
    working: <>Reading directly off this balanced equation: <b>12 mol</b> of OH⁻ reacts for every 1 mol of ethanol oxidised.</>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ9_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The overall reaction in an alkaline–ethanol fuel cell is shown below.</p>
          <Chem eq="C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)" className="block mb-2" />
          <p>
            What amount of hydroxide ions, OH⁻, reacts with 1 mol of ethanol, C₂H₅OH, at the
            negative electrode of the fuel cell?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '4 mol' },
        { letter: 'B', content: '6 mol' },
        { letter: 'C', content: '8 mol' },
        { letter: 'D', content: '12 mol', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
