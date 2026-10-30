// 2025 Chemistry Exam, MCQ 4. VCAA examination report: 83% correct. Recognising that the circular
// economy is about turning waste into a useful resource, applied to bioethanol production by
// fermentation. Question text transcribed from the original paper. VCAA report only. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 9, C: 83, D: 5 },
  answer: 'C',
  comment: (
    <>
      Circular economy is improved when &lsquo;waste&rsquo; materials can be recycled or used. Option C
      is the only option that describes how &lsquo;waste&rsquo; materials are being managed
      successfully.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A <b>circular economy</b> keeps materials in use: products and by-products that would be <b>waste</b> are <b>recycled, reused or turned into new useful products</b>, instead of the linear &lsquo;take → make → dispose&rsquo; model.</>,
    reason: <>So to improve the circularity of a process, look for the option that does something useful with a <i>waste</i> stream. Making the process faster, higher-yielding or more energy-efficient is good, but it is not what &lsquo;circular&rsquo; means.</>,
  },
  {
    working: <>Fermentation: <Chem eq="C6H12O6(aq) -> 2CH3CH2OH(aq) + 2CO2(g)" /><br />The waste product is <Chem eq="CO2" />.</>,
    reason: <>Yeast fermentation of glucose makes bioethanol and carbon dioxide. Unless it is captured, the <Chem eq="CO2" /> is released as waste — the obvious target for a circular-economy improvement.</>,
  },
  {
    working: <>A: higher temperature → faster rate only ✗<br />B: new yeast strain → higher yield only ✗<br />D: better distillation → less energy used only ✗<br />C: waste <Chem eq="CO2" /> → useful product ✓</>,
    reason: <>A improves the rate, B the yield and D the energy efficiency — none of them deals with a waste material. (A is also chemically doubtful: raising the temperature too far denatures the yeast&rsquo;s enzymes and slows fermentation.) Only C closes the loop by turning a waste into a resource.</>,
  },
  {
    working: <b>Convert waste carbon dioxide into a useful product</b>,
    reason: <>Matches option <b>C</b>. Option <b>B</b> (9%) improves the yield, which makes better use of the glucose but does nothing with the waste <Chem eq="CO2" />; option <b>D</b> reduces energy consumption, an energy-efficiency gain rather than a use for waste.</>,
  },
]

export default function ChemistryQ4_2025() {
  return (
    <MCQShell
      question={<>The circular economy of a bioethanol production process could be improved by</>}
      options={[
        { letter: 'A', content: 'increasing the fermentation temperature to accelerate the reaction rate.' },
        { letter: 'B', content: 'using a new strain of yeast to produce a higher yield of ethanol from glucose.' },
        { letter: 'C', content: 'developing a separate process that converts waste carbon dioxide into a useful product.', isAnswer: true },
        { letter: 'D', content: 'carrying out advanced distillation techniques to reduce energy consumption.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
