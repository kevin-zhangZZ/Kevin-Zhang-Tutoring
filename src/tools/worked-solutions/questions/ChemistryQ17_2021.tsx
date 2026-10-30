// 2021 Chemistry Exam, MCQ 17. VCAA examination report: 67% correct. Using the ideal gas
// equation at fixed volume and temperature to find the mass of O₂ that must be added to raise
// the pressure in a 200.0 L container by 250.0 kPa. Question text transcribed from the original
// paper (no figures). VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 15, C: 67, D: 10 },
  answer: 'C',
  comment: (
    <>
      <i>n</i>(O₂) = Δ<i>p</i> x <i>V</i> / <i>RT</i>
      <br />
      = 250.0 x 200.0 / [8.31 x (22.0 + 273)]
      <br />
      = 20.4 mol
      <br />
      <i>m</i>(O₂) = 20.4 mol x 32.0 g mol<sup>-1</sup>
      <br />
      = 653 g
      <br />
      = 6.53 x 10<sup>2</sup> g
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><i>pV</i> = <i>nRT</i>, so at fixed <i>V</i> and <i>T</i>: Δ<i>p</i> × <i>V</i> = Δ<i>n</i> × <i>RT</i></>,
    reason: <>The container has a fixed volume and stays at 22.0 °C, so the only thing that changes is the amount of gas. Pressure is proportional to the amount of gas (<i>p</i> = <i>n</i> × <i>RT</i>/<i>V</i>), so the <b>increase</b> in pressure, 250.0 kPa, tells us the amount of O₂ <b>added</b> — we don&rsquo;t need to know how much gas was there to begin with. (Data Book: ideal gas equation <i>pV</i> = <i>nRT</i>.)</>,
  },
  {
    working: <><i>T</i> = 22.0 + 273 = 295 K</>,
    reason: <>The gas equation needs <b>absolute</b> temperature, in kelvin (Data Book: 0 °C = 273 K). Using 22.0 directly is the classic slip — see the final row.</>,
  },
  {
    working: (
      <>
        Δ<i>n</i>(<Chem eq="O2" />) = Δ<i>p</i> × <i>V</i> / (<i>RT</i>)
        <br />
        = (250.0 kPa × 200.0 L) / (8.31 J mol⁻¹ K⁻¹ × 295 K)
        <br />
        = 20.40 mol
      </>
    ),
    reason: <>With <i>p</i> in kPa and <i>V</i> in L, the product kPa × L is in joules, so <i>R</i> = 8.31 J mol⁻¹ K⁻¹ (Data Book) gives <i>n</i> directly in mol — no unit conversion is needed. Keep the unrounded value (20.396 mol) for the next step.</>,
  },
  {
    working: (
      <>
        <i>m</i>(<Chem eq="O2" />) = <i>n</i> × <i>M</i>
        <br />
        = 20.40 mol × 32.0 g mol⁻¹
        <br />
        = 652.7 g
      </>
    ),
    reason: <><i>M</i>(<Chem eq="O2" />) = 2 × 16.0 = 32.0 g mol⁻¹ (Data Book periodic table: O = 16.0). Oxygen gas is diatomic — using 16.0 g mol⁻¹ would halve the answer.</>,
  },
  {
    working: <><i>m</i>(<Chem eq="O2" />) = <b>6.53 × 10² g</b></>,
    reason: <>Matches option <b>C</b>. Three significant figures, set by 22.0 °C and <i>R</i> = 8.31. Sanity check: at SLC (100 kPa, 25 °C) 1 mol of gas occupies 24.8 L (Data Book), so 200 L at 100 kPa holds about 200 ÷ 24.8 ≈ 8 mol; adding 250 kPa (2.5 times as much pressure) needs about 2.5 × 8 ≈ 20 mol — consistent with 20.4 mol. Option <b>B</b>, 6.37 × 10⁻¹ g, divides the amount by the molar mass instead of multiplying: 20.40 ÷ 32.0 = 0.637 g (check the units: mol ÷ g mol⁻¹ gives mol² g⁻¹, not grams). Option <b>D</b>, 8.75 × 10³ g, is what you get by leaving the temperature in °C (<i>T</i> = 22.0 instead of 295 K): 250.0 × 200.0 / (8.31 × 22.0) × 32.0 = 8.75 × 10³ g. Option <b>A</b>, 1.53 × 10⁻³ g, is the reciprocal of the right answer (1 ÷ 653) — it comes from turning the gas equation upside down (<i>n</i> = <i>RT</i>/<i>pV</i>) and then dividing by <i>M</i> instead of multiplying.</>,
  },
]

export default function ChemistryQ17_2021() {
  return (
    <MCQShell
      question={
        <p>
          The electrolysis of water is used to produce oxygen, O₂, gas.
          <br />
          The O₂ gas produced is piped into a 200.0 L fixed-volume gas storage container at 22.0 °C.
          <br />
          When more O₂ is added, the pressure in the container increases.
          <br />
          What mass of O₂ needs to be added to increase the pressure by 250.0 kPa?
        </p>
      }
      options={[
        { letter: 'A', content: <>1.53 × 10⁻³ g</> },
        { letter: 'B', content: <>6.37 × 10⁻¹ g</> },
        { letter: 'C', content: <>6.53 × 10² g</>, isAnswer: true },
        { letter: 'D', content: <>8.75 × 10³ g</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
