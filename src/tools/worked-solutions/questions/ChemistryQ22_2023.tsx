// 2023 Chemistry Exam, MCQ 22. VCAA examination report: 41% correct. Comparing methane and
// methanol fuel cells on greenhouse-gas output and electrons transferred per mol of fuel, by
// writing out both fuels' combustion and anode half-equations. Question text transcribed from
// the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 41, C: 17, D: 37 },
  answer: 'B',
  comment: (
    <>
      The amounts of greenhouse gas per mol of fuel are the same — 1 mol CO₂ and 2 mol H₂O — for
      both CH₄ and CH₃OH. The numbers of electrons per mol of fuel are different for the two
      fuels: 8 mol for CH₄ and 6 mol for CH₃OH.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Overall combustion equations: <Chem eq="CH4 + 2O2 -> CO2 + 2H2O" /> and <Chem eq="CH3OH + 1.5O2 -> CO2 + 2H2O" />.</>,
    reason: 'Both fuels produce exactly 1 mol CO₂ and 2 mol H₂O per mol of fuel — the same amount of greenhouse gas.',
  },
  {
    working: <>Anode half-equations (oxidation, releasing electrons to the external circuit): <Chem eq="CH4 + 2H2O -> CO2 + 8H+ + 8e-" /> and <Chem eq="CH3OH + H2O -> CO2 + 6H+ + 6e-" />.</>,
    reason: 'Balancing each half-equation by conserving atoms and charge gives the electrons released per mol of fuel.',
  },
  {
    working: <>Carbon in CH₄ starts at oxidation state −4 and ends at +4 in CO₂ — an 8-electron change. Carbon in CH₃OH starts at −2 (already partly oxidised, since it has an O–H bond) and ends at +4 in CO₂ — only a 6-electron change.</>,
    reason: 'Methanol is already partially oxidised compared to methane, so it releases fewer electrons per mol when fully oxidised to CO₂.',
  },
  {
    working: <>Greenhouse gas output: <b>the same</b> (1 mol CO₂ + 2 mol H₂O each). Electrons per mol of fuel: <b>different</b> (8 mol for CH₄ vs. 6 mol for CH₃OH).</>,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function ChemistryQ22_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Methane, CH₄, and methanol, CH₃OH, can both be used to power fuel cells.
          </p>
          <p>Methane and methanol fuel cells produce</p>
        </>
      }
      options={[
        { letter: 'A', content: 'the same amount of greenhouse gases and the same number of electrons per mol of fuel reacted.' },
        { letter: 'B', content: 'the same amount of greenhouse gases and a different number of electrons per mol of fuel reacted.', isAnswer: true },
        { letter: 'C', content: 'a different amount of greenhouse gases and the same number of electrons per mol of fuel reacted.' },
        { letter: 'D', content: 'a different amount of greenhouse gases and a different number of electrons per mol of fuel reacted.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
