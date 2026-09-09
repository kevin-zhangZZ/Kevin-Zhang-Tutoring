// 2016 Chemistry Exam, MCQ 24. VCAA examination report: 40% correct — the fourth-hardest MCQ on
// the 2016 paper. Compare the energy released per gram (not per mole) by burning methanol vs.
// octane, from two thermochemical equations. Question text transcribed from the original paper;
// solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 40, C: 23, D: 7 },
  answer: 'B',
  comment: <>Octane releases almost twice (47.8/22.7 ≈ 2.1) as much energy per gram as methanol — not eight times, and not per kilogram vs. per gram confusion.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2CH3OH(l) + 3O2(g) -> 2CO2(g) + 4H2O(l)" className="block text-[13.5px]" />,
    reason: <>Methanol: <Chem eq="ΔH = -1450" /> kJ per <b>2 mol</b>, <Chem eq="M = 32" /> g mol⁻¹.</>,
  },
  {
    working: (
      <>
        per mole: 1450 / 2 = 725 kJ mol⁻¹
        <br />
        per gram: 725 / 32 = <b>22.7 kJ g⁻¹</b>
      </>
    ),
    reason: 'Convert per-mole energy to per-gram energy using the molar mass — this is the step that separates options A/B from a per-mole comparison.',
  },
  {
    working: <Chem eq="2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(l)" className="block text-[13.5px]" />,
    reason: <>Octane: <Chem eq="ΔH = -10900" /> kJ per <b>2 mol</b>, <Chem eq="M = 114" /> g mol⁻¹.</>,
  },
  {
    working: (
      <>
        per mole: 10900 / 2 = 5450 kJ mol⁻¹
        <br />
        per gram: 5450 / 114 = <b>47.8 kJ g⁻¹</b>
      </>
    ),
  },
  {
    working: <>Ratio: 47.8 / 22.7 ≈ <b>2.1</b> — octane releases <em>almost twice</em> as much energy per gram as methanol.</>,
    reason: <>Rules out option C ("eight times") — a common error from mixing up per-gram with per-kilogram or misreading the mole ratios.</>,
  },
  {
    working: <b>Burning just 1.0 g of methanol releases almost 23 kJ of heat energy.</b>,
    reason: <>Matches option <b>B</b> exactly (22.7 ≈ 23 kJ).</>,
  },
]

export default function ChemistryQ24_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Methanol is a liquid fuel that is often used in racing cars. The thermochemical
            equation for its complete combustion is
          </p>
          <Chem eq="2CH3OH(l) + 3O2(g) -> 2CO2(g) + 4H2O(l)    ΔH = -1450 kJ mol-1" className="block text-[14px] my-2" />
          <p className="mb-2">
            Octane is a principal constituent of petrol. The thermochemical equation for its
            complete combustion is
          </p>
          <Chem eq="2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(l)    ΔH = -10900 kJ mol-1" className="block text-[14px] my-2" />
          <p className="mb-2">
            The molar mass of methanol is 32 g mol⁻¹ and the molar mass of octane is 114 g mol⁻¹.
          </p>
          <p>Which one of the following statements is the most correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Burning just 1.0 g of octane releases almost 96 kJ of heat energy.' },
        { letter: 'B', content: 'Burning just 1.0 g of methanol releases almost 23 kJ of heat energy.', isAnswer: true },
        { letter: 'C', content: 'Octane releases almost eight times more energy per kilogram than methanol.' },
        { letter: 'D', content: 'The heat energy released by methanol will not be affected if the oxygen supply is limited.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
