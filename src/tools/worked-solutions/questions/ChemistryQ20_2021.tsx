// 2021 Chemistry Exam, MCQ 20. VCAA examination report: 52% correct. Faraday's laws in an
// electroplating cell: 320 F of charge = 320 mol of electrons, the cathode half-equation
// Ni²⁺ + 2e⁻ → Ni gives n(Ni) = n(e⁻)/2, then m = nM. Question text transcribed from the
// original paper; the electrolysis cell diagram (shared stem for Questions 20 and 21) is cropped
// from the original VCAA exam PDF. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellSrc from './chem-2021-mcq20-cell.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 15, C: 52, D: 18 },
  answer: 'C',
  comment: (
    <>
      <Chem eq="Ni2+ + 2e- -> Ni(s)" />
      <br />
      <i>n</i>(e<sup>-</sup>) = 320 mol
      <br />
      <i>n</i>(Ni) = <i>n</i>(e<sup>-</sup>) / 2
      <br />
      = 160 mol
      <br />
      <i>m</i>(Ni) = 160 mol x 58.7 g mol<sup>-1</sup>
      <br />
      = 9.39 x 10<sup>3</sup> g
      <br />
      Students who selected Option D did not make use of the reduction half-equation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Pt electrode (connected to the <b>negative</b> terminal) = <b>cathode</b>: <Chem eq="Ni2+(l) + 2e- -> Ni(s)" /></>,
    reason: <>In an electrolytic cell the electrode connected to the negative terminal of the power supply is the cathode, where <b>reduction</b> happens. Molten <Chem eq="Ni(NO3)2" /> contains free <Chem eq="Ni2+" /> ions (there is no water present), and <Chem eq="Ni2+" /> is the oxidising agent reduced at the cathode, so nickel metal is plated onto the Pt. (The Ni electrode, on the + terminal, is the anode, where Ni is oxidised to <Chem eq="Ni2+" /> — that is Question 21.)</>,
  },
  {
    working: <><i>n</i>(e⁻) = 320 mol</>,
    reason: <>The question defines 1 F as the charge on 1 mol of electrons, so 320 F <b>is</b> 320 mol of electrons. There is no need to convert to coulombs — the charge is already given in faradays.</>,
  },
  {
    working: <>mole ratio <i>n</i>(Ni) : <i>n</i>(e⁻) = 1 : 2</>,
    reason: <>From the half-equation: each <Chem eq="Ni2+" /> ion needs <b>2</b> electrons to become one Ni atom.</>,
  },
  {
    working: (
      <>
        <i>n</i>(Ni) = <i>n</i>(e⁻) / 2
        <br />
        = 320 mol / 2
        <br />
        = 160 mol
      </>
    ),
    reason: <>Two electrons per nickel atom, so the amount of nickel is half the amount of electrons.</>,
  },
  {
    working: (
      <>
        <i>m</i>(Ni) = <i>n</i> × <i>M</i>
        <br />
        = 160 mol × 58.7 g mol⁻¹
        <br />
        = 9392 g
      </>
    ),
    reason: <>Data Book periodic table: <i>M</i>(Ni) = 58.7 g mol⁻¹.</>,
  },
  {
    working: <><i>m</i>(Ni) = <b>9.39 × 10³ g</b></>,
    reason: <>Matches option <b>C</b>. Three significant figures, as in <i>M</i>(Ni) = 58.7. Option <b>D</b>, 1.88 × 10⁴ g, is 320 × 58.7 — the report notes these students did not use the reduction half-equation, so they missed the 2 : 1 electron-to-nickel ratio. Options <b>A</b> and <b>B</b> treat 320 F as if it were 320 <b>coulombs</b> and divide by the Faraday constant (96 500 C mol⁻¹): 320 ÷ 96 500 × 58.7 = 1.95 × 10⁻¹ g (B, also missing the ÷ 2), and 320 ÷ 96 500 ÷ 2 × 58.7 = 9.73 × 10⁻² g (A).</>,
  },
]

export default function ChemistryQ20_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 20 and 21.</p>
          <p className="mb-2">An electrolysis cell with a 5 V power supply is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={cellSrc}
              alt="Electrolysis cell: a Ni electrode connected to the + terminal and a Pt electrode connected to the − terminal of a 5 V supply, both dipping into molten Ni(NO₃)₂(l) — from the original 2021 VCAA exam paper"
              className="w-full max-w-[340px]"
            />
          </div>
          <p>
            1 F is equivalent to the charge on 1 mol of electrons.
            <br />
            The mass of nickel, Ni, that can be electroplated onto the platinum, Pt, electrode with
            320 F of charge is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>9.73 × 10⁻² g</> },
        { letter: 'B', content: <>1.95 × 10⁻¹ g</> },
        { letter: 'C', content: <>9.39 × 10³ g</>, isAnswer: true },
        { letter: 'D', content: <>1.88 × 10⁴ g</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
