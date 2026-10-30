// 2025 Chemistry Exam, MCQ 6. VCAA examination report: 56% correct. Using the molar enthalpy of
// combustion of glucose to find the energy change per mole of CO₂ during photosynthesis (reverse
// the reaction, flip the sign, divide by the 6 mol of CO₂). Question text transcribed from the
// original paper. VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 56, B: 9, C: 29, D: 6 },
  answer: 'A',
  comment: (
    <>
      <Chem eq="6CO2(g) + 6H2O(l) -> C6H12O6(s) + 6O2(g)" />&nbsp;&nbsp;Δ<i>H</i> = +2840 kJ
      <br />
      <Chem eq="CO2(g) + H2O(l) -> " /> <sup>1</sup>/<sub>6</sub><Chem eq="C6H12O6(s) + O2(g)" /> Δ<i>H</i> = +2840/6 = +473.3 kJ
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Combustion: <Chem eq="C6H12O6(s) + 6O2(g) -> 6CO2(g) + 6H2O(l)" />&nbsp;&nbsp;Δ<i>H</i> = −2840 kJ mol⁻¹</>,
    reason: <>The <b>molar</b> enthalpy of combustion is the energy change when <b>1 mol of glucose</b> burns completely to CO₂(g) and H₂O(l). The negative sign means combustion is <b>exothermic</b> — energy is released.</>,
  },
  {
    working: <>Photosynthesis: <Chem eq="6CO2(g) + 6H2O(l) -> C6H12O6(s) + 6O2(g)" />&nbsp;&nbsp;Δ<i>H</i> = +2840 kJ mol⁻¹</>,
    reason: <>Photosynthesis is exactly the <b>reverse</b> of combustion. Reversing a reaction keeps the size of Δ<i>H</i> but <b>reverses its sign</b>, so photosynthesis is <b>endothermic</b>: energy (from sunlight) is <b>absorbed</b>.</>,
  },
  {
    working: <>6 mol CO₂ ≡ 2840 kJ absorbed</>,
    reason: <>The mole ratio from the balanced equation: the +2840 kJ belongs to the whole equation as written, which uses <b>6 mol of CO₂</b> (enough to make 1 mol of glucose) — not 1 mol of CO₂.</>,
  },
  {
    working: (
      <>
        Δ<i>H</i> per mol CO₂ = Δ<i>H</i>(equation) ÷ <i>n</i>(CO₂)
        <br />
        = +2840 kJ ÷ 6 mol
        <br />
        = +473.3 kJ mol⁻¹
      </>
    ),
    reason: <>Scale the equation down by 6 so that it describes one mole of CO₂: <Chem eq="CO2(g) + H2O(l) -> " /> <sup>1</sup>/<sub>6</sub><Chem eq="C6H12O6(s) + O2(g)" />. The options are given to four significant figures (473.3).</>,
  },
  {
    working: <b>473.3 kJ of energy is absorbed per mole of CO₂.</b>,
    reason: (
      <>
        Matches option <b>A</b>. Option <b>C</b> (29%) has the right number but the wrong
        direction: it treats photosynthesis like combustion and forgets that reversing the
        reaction makes Δ<i>H</i> positive (energy absorbed). Option <b>B</b> uses the full 2840 kJ,
        which is the energy for 6 mol of CO₂ (one mole of glucose), not one mole of CO₂.
        Option <b>D</b> makes both mistakes. Sanity check: photosynthesis needs light energy to
        run, so it must be endothermic — &ldquo;absorbed&rdquo; is right.
      </>
    ),
  },
]

export default function ChemistryQ6_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The molar enthalpy for combustion of glucose, <Chem eq="C6H12O6" />, is −2840 kJ mol⁻¹.
          </p>
          <p>
            Which one of the following describes what occurs to one mole of carbon dioxide,{' '}
            <Chem eq="CO2" />, during photosynthesis?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '473.3 kJ of energy is absorbed.', isAnswer: true },
        { letter: 'B', content: '2840 kJ of energy is absorbed.' },
        { letter: 'C', content: '473.3 kJ of energy is released.' },
        { letter: 'D', content: '2840 kJ of energy is released.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
