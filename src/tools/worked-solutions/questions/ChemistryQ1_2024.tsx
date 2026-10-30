// 2024 Chemistry Exam, MCQ 1. VCAA examination report: 54% correct. Classifying photosynthesis
// as endothermic/exothermic and as a redox/condensation reaction. Question text transcribed from
// the original paper (rendered from page images — the 2024 exam PDF has no extractable text).
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 54, C: 10, D: 27 },
  answer: 'B',
  comment: (
    <>
      The reaction <Chem eq="6CO2 + 6H2O -> C6H12O6 + 6O2" /> is an endothermic process, as it is
      the reverse of a combustion reaction, which is exothermic.
      <br />
      It should not be classed as a condensation reaction as this type of reaction is usually
      defined as occuring when two molecules are joined together in order to eliminate a single
      water molecule (small molecule).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Photosynthesis: <Chem eq="6CO2(g) + 6H2O(l) -> C6H12O6(aq) + 6O2(g)" /></>,
    reason: <>Start from the equation — it answers both halves of the question (energy change, then reaction type).</>,
  },
  {
    working: <>It is the <b>reverse of the combustion (cellular respiration) of glucose</b>, which is exothermic, so photosynthesis is <b>endothermic</b> (Δ<i>H</i> &gt; 0).</>,
    reason: <>Reversing a reaction reverses the sign of Δ<i>H</i>. The Data Book lists the molar enthalpy of combustion of glucose as a negative value (exothermic), so making glucose from CO₂ and H₂O must absorb energy — in plants that energy comes from sunlight. This rules out A and C.</>,
  },
  {
    working: <>Oxidation numbers:<br />C: +4 in CO₂ → 0 in C₆H₁₂O₆ (decreases: <b>reduced</b>)<br />O: −2 in H₂O → 0 in O₂ (increases: <b>oxidised</b>)</>,
    reason: <>In glucose, 6<i>x</i> + 12(+1) + 6(−2) = 0 gives <i>x</i> = 0 for C. One element is reduced and another is oxidised, so electrons are transferred: photosynthesis is a <b>redox</b> reaction.</>,
  },
  {
    working: <>Not a condensation reaction: water is a <b>reactant</b>, not a product, and the reaction is not two molecules joining with loss of a small molecule.</>,
    reason: <>A condensation reaction joins two molecules and eliminates a small molecule such as H₂O (e.g. forming an ester or an amide). This rules out C and D.</>,
  },
  {
    working: <b>Photosynthesis is an endothermic redox reaction.</b>,
    reason: <>Matches option <b>B</b>. Option <b>D</b>, chosen by 27%, gets the energy change right but calls the reaction a condensation; option <b>A</b> gets the reaction type right but has the energy change backwards — exothermic is the reverse process, respiration.</>,
  },
]

export default function ChemistryQ1_2024() {
  return (
    <MCQShell
      question={<p>Photosynthesis is an</p>}
      options={[
        { letter: 'A', content: 'exothermic redox reaction.' },
        { letter: 'B', content: 'endothermic redox reaction.', isAnswer: true },
        { letter: 'C', content: 'exothermic condensation reaction.' },
        { letter: 'D', content: 'endothermic condensation reaction.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
