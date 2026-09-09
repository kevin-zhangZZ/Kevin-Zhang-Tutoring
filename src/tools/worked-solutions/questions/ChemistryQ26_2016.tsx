// 2016 Chemistry Exam, MCQ 26. VCAA examination report: 44% correct — the fifth-hardest MCQ on
// the 2016 paper. Find the additional gas pressure produced by a reaction in a sealed vessel,
// using the ideal gas law with the final (not initial) temperature.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 44, C: 30, D: 19 },
  answer: 'B',
  comment: <>n(CO₂) = n(Na₂CO₃) = 0.142 mol, then p(CO₂) = nRT/V using the final temperature, 24.1°C.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2HNO3(aq) + Na2CO3(s) -> 2NaNO3(aq) + CO2(g) + H2O(l)" className="block text-[13.5px]" />,
    reason: <>The 1:1 ratio between <Chem eq="Na2CO3" /> and <Chem eq="CO2" /> is the key relationship here.</>,
  },
  {
    working: <>n(CO₂) produced = n(Na₂CO₃) = <b>0.142 mol</b></>,
    reason: <>Given <Chem eq="HNO3" /> is in excess, all 0.142 mol of <Chem eq="Na2CO3" /> reacts, producing an equal number of moles of <Chem eq="CO2" />.</>,
  },
  {
    working: <>p(CO₂) = nRT / V</>,
    reason: <>The <em>additional</em> pressure due to the gas produced is exactly the partial pressure of that <Chem eq="CO2" />, from the ideal gas law.</>,
  },
  {
    working: (
      <>
        p(CO₂) = (0.142 × 8.31 × (24.1 + 273.0)) / 2.00
        <br />
        = (0.142 × 8.31 × 297.1) / 2.00
      </>
    ),
    reason: <>Use the <em>final</em> temperature, 24.1°C — this is the temperature at which the CO₂ now exists, not the vessel's initial 22.0°C.</>,
  },
  {
    working: <b>p(CO₂) ≈ 175 kPa</b>,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function ChemistryQ26_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Dilute nitric acid reacts with anhydrous sodium carbonate to produce carbon dioxide
            gas.
          </p>
          <Chem eq="2HNO3(aq) + Na2CO3(s) -> 2NaNO3(aq) + CO2(g) + H2O(l)" className="block text-[14px] my-2" />
          <p className="mb-2">
            In an experiment, 0.142 mol anhydrous <Chem eq="Na2CO3" /> powder was added to excess{' '}
            <Chem eq="HNO3" /> in solution, in a 2.00 L reinforced, sealed, metal vessel. Pressure
            and temperature sensors were used to monitor the reaction. The vessel was initially at
            101.3 kPa and 22.0°C. When the reaction was complete, the final temperature was 24.1°C.
          </p>
          <p>
            What is the additional pressure, in kPa, inside the vessel due to the carbon dioxide gas
            after the completion of the reaction? (Assume that the volume of the solution in the
            vessel is negligible.)
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '349' },
        { letter: 'B', content: '175', isAnswer: true },
        { letter: 'C', content: '28.3' },
        { letter: 'D', content: '14.2' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
