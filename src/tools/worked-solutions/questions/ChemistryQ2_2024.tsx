// 2024 Chemistry Exam, MCQ 2. VCAA examination report: 40% correct. Which statement about
// glucose oxidation and energy comparisons is correct, by elimination against genuine
// biochemistry and thermochemistry facts. Question text transcribed from the original paper
// (rendered from page images — the 2024 exam PDF has no extractable text). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 40, C: 15, D: 25 },
  answer: 'B',
  comment: (
    <>
      From the Data Book, the energy of combustion of glucose is 16 kJ g⁻¹ (or 2840/180 =
      15.8 kJ g⁻¹) and the energy of combustion of hydrogen is 286/2 = 143 kJ g⁻¹. The reduction
      of carbon dioxide to form glucose is photosynthesis, which cannot occur in the body. In
      option C, glucose is not the reactant in the equation given, so it is not undergoing either
      oxidation or reduction. Cellular respiration involves the combustion of glucose.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A: oxidation of glucose in the body is <b>cellular respiration</b>. Its reverse — reduction of CO₂ back to glucose — is <b>photosynthesis</b>, a completely different process (using light energy, occurring in chloroplasts) that the human body cannot carry out.</>,
    reason: 'Not genuinely reversible in the body. Ruled out.',
  },
  {
    working: <>B: from the Data Book, the energy of combustion of glucose is about <b>15.6–16 kJ g⁻¹</b>, while the energy of combustion of hydrogen is 286 kJ mol⁻¹ ÷ 2 g mol⁻¹ ≈ <b>143 kJ g⁻¹</b> — nearly 10 times more energy per gram than glucose.</>,
    reason: 'A genuine, checkable comparison using real Data Book values. Correct.',
  },
  {
    working: <>C: <Chem eq="6CO2 + 6H2O -> C6H12O6 + 6O2" /> is <b>photosynthesis</b> — glucose is a <i>product</i> here, not a reactant, so it isn't the molecule being oxidised or reduced in this equation at all.</>,
    reason: 'Mislabels the reaction — this equation describes glucose being formed, the opposite of oxidation. Ruled out.',
  },
  {
    working: <>D: in cellular respiration, <b>glucose</b> is combusted (oxidised), while O₂ is the oxidising agent that gets <i>reduced</i> — oxygen itself is never "combusted".</>,
    reason: 'Backwards — oxygen is consumed as an oxidant, not burned. Ruled out.',
  },
  {
    working: <b>Only the energy-per-gram comparison between glucose and hydrogen combustion holds up.</b>,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function ChemistryQ2_2024() {
  return (
    <MCQShell
      question={<p>Which one of the following statements is correct?</p>}
      options={[
        { letter: 'A', content: 'The oxidation of glucose is reversible in the body.' },
        { letter: 'B', content: 'The combustion of glucose provides less energy per gram than the combustion of hydrogen.', isAnswer: true },
        { letter: 'C', content: <>The oxidation of glucose is given by the equation <Chem eq="6CO2 + 6H2O -> C6H12O6 + 6O2" /></> },
        { letter: 'D', content: 'The combustion of oxygen occurs during cellular respiration.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
