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
      The relevant equations and half equations are:
      <br />
      <Chem eq="CH4 + 2O2 -> CO2 + 2H2O" />
      <br />
      <Chem eq="CH4 + 2H2O -> CO2 + 8H+ + 8e-" />
      <br />
      <br />
      <Chem eq="CH3OH + 1½O2 -> CO2 + 2H2O" />
      <br />
      <Chem eq="CH3OH + H2O -> CO2 + 6H+ + 6e-" />
      <br />
      The amounts of greenhouse gas per mol of fuel are the same – 1 mol CO₂ and 2 mol H₂O – for
      both CH₄ and CH₃OH.
      <br />
      The numbers of electrons per mol of fuel are different for the two fuels: 8 mol for CH₄ and 6
      mol for CH₃OH.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Overall combustion equations: <Chem eq="CH4 + 2O2 -> CO2 + 2H2O" /> and <Chem eq="CH3OH + 1½O2 -> CO2 + 2H2O" />.</>,
    reason: <>A fuel cell turns the fuel into the same products as burning it, just without a flame. Both fuels produce exactly 1 mol CO₂ and 2 mol H₂O per mol of fuel — and CO₂ and water vapour are both greenhouse gases — so the amount of greenhouse gas is the same.</>,
  },
  {
    working: <>Anode half-equations (oxidation, releasing electrons to the external circuit): <Chem eq="CH4 + 2H2O -> CO2 + 8H+ + 8e-" /> and <Chem eq="CH3OH + H2O -> CO2 + 6H+ + 6e-" />.</>,
    reason: <>Balance each in acid: C first (1 CO₂), then O with H₂O (CH₄ needs 2 H₂O; CH₃OH already has one O, so needs only 1 H₂O), then H with H⁺ (4 + 4 = 8; 4 + 2 = 6), then charge with e⁻. The number of electrons is the amount released per mol of fuel.</>,
  },
  {
    working: <>Carbon in CH₄ starts at oxidation state −4 and ends at +4 in CO₂ — an 8-electron change. Carbon in CH₃OH starts at −2 (already partly oxidised, since it is bonded to an O atom) and ends at +4 in CO₂ — only a 6-electron change.</>,
    reason: <>Methanol is already partially oxidised compared to methane, so it releases fewer electrons per mol when fully oxidised to CO₂.</>,
  },
  {
    working: <>Greenhouse gas output: <b>the same</b> (1 mol CO₂ + 2 mol H₂O each). Electrons per mol of fuel: <b>different</b> (8 mol for CH₄ vs. 6 mol for CH₃OH).</>,
    reason: <>Matches option <b>B</b>. Option <b>D</b>, chosen by 37%, misses that both fuels give the same products per mol, 1 mol CO₂ and 2 mol H₂O. Options <b>A</b> and <b>C</b> assume the same number of electrons, which would be true only if carbon started at the same oxidation state in both fuels.</>,
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
