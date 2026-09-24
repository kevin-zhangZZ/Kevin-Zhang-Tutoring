// 2015 Chemistry Exam, MCQ 4. VCAA examination report: 48% correct — tied for fourth-hardest
// MCQ on the 2015 paper. Use the ideal gas law to find a required gas volume, then the mole
// ratio in the equation to find the mass of solid reactant needed to produce it.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 48, B: 41, C: 7, D: 3 },
  answer: 'A',
  comment: (
    <>
      <Chem eq="2NaClO3(s) -> 2NaCl(s) + 3O2(g)" />
      <br />
      <i>n</i>(<Chem eq="O2" />) required = <i>pV</i>/<i>RT</i> = 76.0 × 1.60/(8.31 × 292) = 0.0501 mol
      <br />
      <i>n</i>(<Chem eq="NaClO3" />) = (2/3) × <i>n</i>(<Chem eq="O2" />) reacting = (2/3) × 0.0501 =
      0.0334 mol
      <br />
      <i>m</i>(<Chem eq="NaClO3" />) required = 0.0334 × 106.5 = 3.56 g
      <br />
      The choice of alternative B is consistent with ignoring the <Chem eq="NaClO3" />:
      <Chem eq="O2" /> mole ratio shown in the equation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2NaClO3(s) -> 2NaCl(s) + 3O2(g)" className="block text-[13.5px]" />,
    reason: <>The decomposition equation — the 2:3 mole ratio between NaClO3 and O2 is the crux of this question.</>,
  },
  {
    working: <>Need <Chem eq="1.60" /> L of <Chem eq="O2" /> at <Chem eq="76.0" /> kPa, <Chem eq="292" /> K.</>,
  },
  {
    working: (
      <>
        <span className="block">n(O₂) = PV / RT</span>
        <span className="block">= (76.0 × 1.60) / (8.31 × 292)</span>
        <span className="block">= 0.0501 mol</span>
      </>
    ),
    reason: <>The ideal gas law, with <Chem eq="R" /> in kPa·L·mol⁻¹·K⁻¹ units to match the given pressure and volume.</>,
  },
  {
    working: (
      <>
        <span className="block">n(NaClO₃) = (2/3) × n(O₂)</span>
        <span className="block">= (2/3) × 0.0501 = 0.0334 mol</span>
      </>
    ),
    reason: <>From the 2:3 mole ratio in the balanced equation — this is the step the wrong answers skip.</>,
  },
  {
    working: (
      <>
        <span className="block">m(NaClO₃) = 0.0334 × 106.5</span>
        <span className="block">= 3.56 g</span>
      </>
    ),
    reason: <>Multiply moles by the given molar mass, <Chem eq="M(NaClO3) = 106.5" /> g mol⁻¹.</>,
  },
  {
    working: <b>3.56 g of sodium chlorate is required.</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b>, 5.34 g, is <i>n</i>(O₂) × 106.5 — the moles of oxygen used as if they were moles of sodium chlorate, ignoring the 2 : 3 mole ratio, as the report notes.</>,
  },
]

export default function ChemistryQ4_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The emergency oxygen system in a passenger aircraft uses the decomposition of sodium
            chlorate to produce oxygen. At 76.0 kPa and 292 K, each adult passenger needs about 1.60
            L of oxygen per minute. The equation for the reaction is
          </p>
          <Chem eq="2NaClO3(s) -> 2NaCl(s) + 3O2(g)" className="block text-[14px] mt-2" />
          <p className="mb-2"><Chem eq="M(NaClO3) = 106.5" /> g mol⁻¹</p>
          <p>
            The mass of sodium chlorate required to provide the required volume of oxygen for each
            adult passenger per minute is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '3.56 g', isAnswer: true },
        { letter: 'B', content: '5.34 g' },
        { letter: 'C', content: '7.85 g' },
        { letter: 'D', content: '53.7 g' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
