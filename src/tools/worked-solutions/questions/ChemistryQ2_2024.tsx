// 2024 Chemistry Exam, MCQ 2. VCAA examination report: 40% correct. Which statement about
// glucose oxidation and energy comparisons is correct, by elimination against genuine
// biochemistry and thermochemistry facts. Question text transcribed from the original paper
// (rendered from page images — the 2024 exam PDF has no extractable text). The working uses the
// 2026 Data Book's glucose value (−2803 kJ mol⁻¹; the report used −2840) — a note says so; the
// answer is unchanged. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 40, C: 15, D: 25 },
  answer: 'B',
  comment: (
    <>
      From the Data Book, energy of combustion of glucose is 16 kJ / g or 2840 / 180 = 15.8 kJ / g
      and the energy of combustion of hydrogen is 286 / 2 = 143 kJ / g.
      <br />
      The reduction of carbon dioxide to form glucose is photosynthesis, which cannot occur in the
      body.
      <br />
      In option C, in the equation glucose is not the reactant, therefore it is not undergoing
      either oxidation or reduction.
      <br />
      Cellular respiration involves the combustion of glucose.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A: oxidation of glucose in the body is <b>cellular respiration</b>. Its reverse — reduction of CO₂ back to glucose — is <b>photosynthesis</b>, a completely different process (using light energy, occurring in chloroplasts) that the human body cannot carry out.</>,
    reason: <>Not genuinely reversible in the body. Ruled out.</>,
  },
  {
    working: <>
      B: energy per gram of glucose = |Δ<i>H</i><sub>c</sub>| ÷ <i>M</i><br />
      = 2803 kJ mol⁻¹ ÷ 180.0 g mol⁻¹<br />
      = <b>15.6 kJ g⁻¹</b>
    </>,
    reason: <>Data Book (molar enthalpies of combustion): Δ<i>H</i><sub>c</sub>(glucose) = −2803 kJ mol⁻¹; <i>M</i>(C₆H₁₂O₆) = 6(12.0) + 12(1.0) + 6(16.0) = 180.0 g mol⁻¹. The Data Book&rsquo;s energy content of carbohydrates, 16 kJ g⁻¹, gives the same comparison.<DataBookNote>the 2026 Data Book gives −2803 kJ mol⁻¹ for glucose (item 12); the Data Book used for the 2024 exam gave −2840 kJ mol⁻¹ (item 13), which is why the report has 2840 / 180 = 15.8 kJ / g. The answer is unchanged.</DataBookNote></>,
  },
  {
    working: <>
      energy per gram of hydrogen = |Δ<i>H</i><sub>c</sub>| ÷ <i>M</i><br />
      = 286 kJ mol⁻¹ ÷ 2.0 g mol⁻¹<br />
      = <b>143 kJ g⁻¹</b>
    </>,
    reason: <>Data Book: Δ<i>H</i><sub>c</sub>(H₂) = −286 kJ mol⁻¹; <i>M</i>(H₂) = 2 × 1.0 = 2.0 g mol⁻¹. Hydrogen releases about 9 times as much energy per gram as glucose, so glucose provides <b>less</b> energy per gram. B is correct. (Compare per <b>gram</b>, not per mole: per mole, glucose releases more, because each molecule is much heavier.)</>,
  },
  {
    working: <>C: <Chem eq="6CO2 + 6H2O -> C6H12O6 + 6O2" /> is <b>photosynthesis</b> — glucose is a <i>product</i> here, not a reactant, so it isn't the molecule being oxidised or reduced in this equation at all.</>,
    reason: <>Mislabels the reaction — this equation describes glucose being formed, the opposite of oxidation. Ruled out.</>,
  },
  {
    working: <>D: in cellular respiration, <b>glucose</b> is combusted (oxidised), while O₂ is the oxidising agent that gets <i>reduced</i> — oxygen itself is never "combusted".</>,
    reason: <>Backwards — oxygen is consumed as an oxidant, not burned. Ruled out.</>,
  },
  {
    working: <b>Only the energy-per-gram comparison between glucose and hydrogen combustion holds up.</b>,
    reason: <>Matches option <b>B</b>. Option <b>D</b>, chosen by 25%, has it backwards: in cellular respiration glucose is combusted and oxygen is the oxidising agent. Option <b>A</b>, chosen by 20%, fails because the reverse of glucose oxidation is photosynthesis, which the body cannot carry out.</>,
  },
]

export default function ChemistryQ2_2024() {
  return (
    <MCQShell
      question={<p>Which one of the following statements is correct?</p>}
      options={[
        { letter: 'A', content: 'The oxidation of glucose is reversible in the body.' },
        { letter: 'B', content: 'The combustion of glucose provides less energy per gram than the combustion of hydrogen.', isAnswer: true },
        { letter: 'C', content: <>The oxidation of glucose is given by the equation <Chem eq="6CO2 + 6H2O -> C6H12O6 + 6O2" />.</> },
        { letter: 'D', content: 'The combustion of oxygen occurs during cellular respiration.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
