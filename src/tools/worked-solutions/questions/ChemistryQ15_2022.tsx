// 2022 Chemistry Exam, MCQ 15. VCAA examination report: 55% correct. Cellular respiration as an
// exothermic redox reaction: sign of ΔH, products, direction of electron transfer, and the energy
// released per mole of O₂ from the mole ratio in the balanced equation. Question text transcribed
// from the original paper. The report's comment has a small typo ("This an exothermic"), kept
// verbatim. VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 5, C: 22, D: 55 },
  answer: 'D',
  comment: (
    <>
      The equation for respiration is
      <br />
      <Chem eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" />; Δ<i>H</i> = −2805 kJ mol⁻¹.
      <br />
      This an exothermic redox reaction, in which C₆H₁₂O₆ is oxidised and so loses electrons.
      Oxidation number of carbon increases from an average of 0 to +4.
      <br />
      The production of 2805 kJ of energy requires the consumption of 6 mol O₂, so when 1 mol O₂ is
      consumed 2805/6 = 467.5 kJ of energy is released.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><Chem eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" /><br />Δ<i>H</i> = −2805 kJ mol⁻¹</>,
    reason: <>Cellular respiration is the oxidation of glucose by oxygen — chemically the same overall reaction as the complete combustion of glucose. A <b>heat of combustion</b> is quoted as a positive amount of energy released (2805 kJ mol⁻¹), so as a Δ<i>H</i> it carries a negative sign.</>,
  },
  {
    working: <>Δ<i>H</i> &lt; 0, so respiration is <b>exothermic</b>.</>,
    reason: <>Option <b>A</b> is false: energy is released, not absorbed.</>,
  },
  {
    working: <>Products: CO₂(g) and H₂O(l).</>,
    reason: <>Option <b>B</b> is false: complete oxidation gives carbon dioxide and water; no elemental carbon is formed.</>,
  },
  {
    working: <>Average oxidation number of C in C₆H₁₂O₆: 6<i>x</i> + 12(+1) + 6(−2) = 0, so <i>x</i> = 0.<br />In CO₂: <i>x</i> + 2(−2) = 0, so <i>x</i> = +4.<br />O: 0 in O₂ → −2 in CO₂ and H₂O.</>,
    reason: <>Carbon&rsquo;s oxidation number increases, so glucose is <b>oxidised</b> — it <b>loses</b> electrons. Oxygen&rsquo;s decreases, so O₂ is <b>reduced</b> — it <b>gains</b> electrons. Option <b>C</b> has the direction backwards: glucose <i>donates</i> electrons to oxygen.</>,
  },
  {
    working: <>Mole ratio: 6 mol O₂ ↔ 2805 kJ released</>,
    reason: <>The &ldquo;per mol&rdquo; in Δ<i>H</i> = −2805 kJ mol⁻¹ means per mole of the equation as written: 1 mol C₆H₁₂O₆ reacting with 6 mol O₂.</>,
  },
  {
    working: <><i>E</i>(per mol O₂) = <i>E</i>(per mol glucose) ÷ 6<br /><i>E</i> = 2805 kJ ÷ 6<br /><i>E</i> = 467.5 kJ</>,
    reason: <>Divide the energy for the whole equation by the coefficient of O₂. (The 6 is an exact coefficient, so the answer keeps the precision of 2805 kJ.)</>,
  },
  {
    working: <b>467.5 kJ is released when 1 mol of O₂ is consumed.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b>, the most popular wrong answer, reverses the electron transfer: the reductant (glucose) gives electrons to the oxidant (oxygen). Option <b>A</b> mistakes the positive heat of combustion (2805 kJ mol⁻¹) for a positive Δ<i>H</i>.</>,
  },
]

export default function ChemistryQ15_2022() {
  return (
    <MCQShell
      question={
        <p>
          The molar heat of combustion of glucose, C₆H₁₂O₆, in the cellular respiration equation is
          2805 kJ mol⁻¹ at standard laboratory conditions (SLC).
          <br />
          Which one of the following statements about cellular respiration is correct?
        </p>
      }
      options={[
        { letter: 'A', content: 'Cellular respiration is an endothermic reaction.' },
        { letter: 'B', content: 'The products of cellular respiration are carbon and carbon dioxide.' },
        { letter: 'C', content: <>Cellular respiration is a redox reaction because C₆H₁₂O₆ accepts electrons from oxygen.</> },
        { letter: 'D', content: 'When one mole of oxygen is consumed in the reaction, 467.5 kJ of energy is released.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
