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
  noAnswer: 1,
  comment: (
    <>
      According to the thermochemical equations supplied:
      <br />
      2 mol <Chem eq="CH3OH" /> → 1450/2 = 725 kJ of heat energy
      <br />
      32.0 g <Chem eq="CH3OH" /> → 725 kJ
      <br />
      1 g <Chem eq="CH3OH" /> → 725/32.0 = 22.7 kJ
      <br />
      So, option B was correct.
      <br />
      1 mol <Chem eq="C8H18" /> → 10900/2 = 5450 kJ of heat energy
      <br />
      114.0 g <Chem eq="C8H18" /> → 5450 kJ
      <br />
      1 g <Chem eq="C8H18" /> → 5450/114.0 = 47.8 kJ
      <br />
      Octane, <Chem eq="C8H18" />, releases approximately twice (47.8/22.7 = 2.1) as much energy
      per gram as methanol, <Chem eq="CH3OH" />.
      <br />
      If oxygen supply is limited, combustion of methanol will be incomplete and less energy will be
      released.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2CH3OH(l) + 3O2(g) -> 2CO2(g) + 4H2O(l)" className="block text-[13.5px]" />,
    reason: <>Methanol: Δ<i>H</i> = −1450 kJ for <b>2 mol</b> as the equation is written; <i>M</i> = 32 g mol⁻¹.</>,
  },
  {
    working: (
      <>
        per mole: 1450 / 2 = 725 kJ mol⁻¹
        <br />
        per gram: 725 / 32 = <b>22.7 kJ g⁻¹</b>
      </>
    ),
    reason: <>Convert per-mole energy to per-gram energy using the molar mass — this is the step that separates options A/B from a per-mole comparison.</>,
  },
  {
    working: <Chem eq="2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(l)" className="block text-[13.5px]" />,
    reason: <>Octane: Δ<i>H</i> = −10 900 kJ for <b>2 mol</b> as the equation is written; <i>M</i> = 114 g mol⁻¹.</>,
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
    reason: <>Rules out option C: per kilogram, as per gram, octane releases about 2.1 times as much, not eight times.</>,
  },
  {
    working: <b>Burning just 1.0 g of methanol releases almost 23 kJ of heat energy.</b>,
    reason: <>Matches option <b>B</b> (22.7 kJ — almost 23). Option <b>A</b>&rsquo;s 96 kJ is 10 900/114: the energy for 2 mol of octane divided by the mass of 1 mol. Option <b>C</b>&rsquo;s &ldquo;eight times&rdquo; is near the per-<em>mole</em> ratio, 5450/725 ≈ 7.5, not the per-kilogram one. Option <b>D</b> is false: with a limited oxygen supply combustion is incomplete and less energy is released. (The report&rsquo;s first line reads &ldquo;2 mol CH₃OH → 1450/2 = 725 kJ&rdquo;; it means 1 mol.)</>,
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
          <p className="my-2 text-[14px]">
            <Chem eq="2CH3OH(l) + 3O2(g) -> 2CO2(g) + 4H2O(l)" /> &nbsp;&nbsp; Δ<i>H</i> = –1450 kJ mol⁻¹
          </p>
          <p className="mb-2">
            Octane is a principal constituent of petrol, which is used in many motor vehicles. The
            thermochemical equation for the complete combustion of octane is
          </p>
          <p className="my-2 text-[14px]">
            <Chem eq="2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(l)" /> &nbsp;&nbsp; Δ<i>H</i> = –10 900 kJ mol⁻¹
          </p>
          <p className="mb-2">
            The molar mass of methanol is 32 g mol⁻¹ and the molar mass of octane is 114 g mol⁻¹.
          </p>
          <p>Which one of the following statements is the <b>most</b> correct?</p>
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
