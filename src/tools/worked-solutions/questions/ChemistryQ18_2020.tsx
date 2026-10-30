// 2020 Chemistry Exam, MCQ 18. VCAA examination report: 67% correct. Calculating the molar
// enthalpy of combustion of propan-1-ol from a simple water-heating calorimetry experiment
// (q = mcΔT, then ΔH = −q/n). Question text transcribed from the original paper, including its
// "propan-1-o1" typo for propan-1-ol. The report's comment writes the specific heat capacity's
// units as "J °C⁻¹ K⁻¹" (a slip for J g⁻¹ K⁻¹) — kept verbatim and explained in the working.
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 16, C: 67, D: 9 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      Energy added to water = 4.18 J °C⁻¹ K⁻¹ x <i>m</i>(H₂O) x Δ<i>T</i>
      <br />
      = 4.18 x 150 x (40.6 – 22.1)
      <br />
      = 1.16x10⁴ J
      <br />
      = 11.6 kJ
      <br />
      <i>n</i>(C₃H₈O) = 0.557 g / 60.0 g mol⁻¹ = 9.28x10⁻³ mol
      <br />
      Enthalpy of combustion = - (11.6 kJ / 9.28x10⁻³ mol)
      <br />
      = -1250 kJ mol⁻¹
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Δ<i>T</i> = 40.6 °C − 22.1 °C = 18.5 °C</>,
    reason: <>The water&rsquo;s temperature <b>change</b> is what matters, not its final temperature. A change of 1 °C is the same size as a change of 1 K, so 18.5 °C = 18.5 K.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><i>q</i> = <i>m</i><i>c</i>Δ<i>T</i></span>
        <span><i>q</i> = 150 g × 4.18 J g⁻¹ K⁻¹ × 18.5 K</span>
        <span><i>q</i> = 11 599.5 J = 11.5995 kJ</span>
      </div>
    ),
    reason: <>The heat released by the burning fuel is assumed to be all absorbed by the water. Data Book: specific heat capacity of water = 4.18 J g⁻¹ K⁻¹. (The report writes the units as &ldquo;J °C⁻¹ K⁻¹&rdquo; — a slip for J g⁻¹ K⁻¹; its numbers are right.)</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><i>M</i>(<Chem eq="C3H7OH" />) = 3(12.0) + 8(1.0) + 16.0 = 60.0 g mol⁻¹</span>
        <span><i>n</i> = <i>m</i>/<i>M</i></span>
        <span><i>n</i> = 0.557 g / 60.0 g mol⁻¹</span>
        <span><i>n</i> = 9.2833… × 10⁻³ mol</span>
      </div>
    ),
    reason: <>Propan-1-ol is CH₃CH₂CH₂OH, molecular formula C₃H₈O (the paper prints &ldquo;propan-1-o1&rdquo;, a typo for propan-1-ol). Convert the mass to grams first: 557 mg = 0.557 g. Data Book: <i>M</i>(C) = 12.0, <i>M</i>(H) = 1.0, <i>M</i>(O) = 16.0 g mol⁻¹. Count all 8 hydrogens — the one on the O counts too.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>Δ<i>H</i> = −<i>q</i>/<i>n</i></span>
        <span>Δ<i>H</i> = −11.5995 kJ / 9.2833… × 10⁻³ mol</span>
        <span>Δ<i>H</i> = −1249.5 kJ mol⁻¹</span>
      </div>
    ),
    reason: <>Divide the energy by the amount of fuel to get the energy per mole. The sign is <b>negative</b> because combustion is exothermic: the fuel <i>released</i> the heat the water gained. Carry the unrounded values through.</>,
  },
  {
    working: <b>Δ<i>H</i>(combustion) ≈ −1250 kJ mol⁻¹</b>,
    reason: <>Matches option <b>C</b> (3 significant figures, set by 557 mg, 150 g and Δ<i>T</i> = 18.5 °C). Option <b>A</b> (−2742 kJ mol⁻¹) comes from using the final temperature, 40.6 °C, instead of the temperature <i>change</i>. Option <b>B</b> (−1208 kJ mol⁻¹) comes from using <i>M</i> = 58.0 g mol⁻¹ — the formula two hydrogens short (C₃H₆O). Option <b>D</b> (−1540 kJ mol⁻¹) matches using <i>M</i> = 74.0 g mol⁻¹, the molar mass of butan-1-ol (C₄H₉OH) — the wrong alcohol, one carbon too many. Sanity check: the accepted value for propan-1-ol is about −2020 kJ mol⁻¹, so a simple experiment where much of the heat escapes to the surroundings should give a smaller (less negative) value, as −1250 kJ mol⁻¹ does.</>,
  },
]

export default function ChemistryQ18_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            An experiment was carried out to determine the enthalpy of combustion of propan-1-o1.
            Combustion of 557 mg of propan-1-o1 increased the temperature of 150 g of water from
            22.1 °C to 40.6 °C.
            <br />
            The enthalpy of combustion is closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '−2742 kJ mol⁻¹' },
        { letter: 'B', content: '−1208 kJ mol⁻¹' },
        { letter: 'C', content: '−1250 kJ mol⁻¹', isAnswer: true },
        { letter: 'D', content: '−1540 kJ mol⁻¹' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
