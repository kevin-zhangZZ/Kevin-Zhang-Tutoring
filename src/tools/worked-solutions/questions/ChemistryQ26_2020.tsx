// 2020 Chemistry Exam, MCQ 26. VCAA examination report: 38% correct. Energy transformations and
// electron flow in a primary (Zn/MnO₂ alkaline) cell: the cell produces heat as well as electrical
// energy, and the reductant (Zn) never touches the oxidant (MnO₂). Question text transcribed from
// the original paper. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 38, C: 15, D: 25 },
  answer: 'B',
  noAnswer: 0,
  comment: (
    <>
      Primary cell batteries are not 100 per cent efficient and so will produce heat energy as well
      as the necessary electrical energy.
      <br />
      Since the cell requires a flow of electrons from the site of oxidation to the site of
      reduction, through the device being powered, Zn (reductant) cannot be in contact with MnO₂
      (oxidant).
      <br />
      Students should be aware that in all cells the oxidant and reductant are not in contact, and
      that as well as electrical energy heat energy is generated during discharge, as evident in the
      fact that mobile phones get hotter during extended use.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Zn: oxidation number 0 → +2 (in ZnO), so Zn is <b>oxidised</b> — it is the <b>reductant</b>, at the anode (−).</>,
    reason: <>The first half-equation has electrons on the right, so it is the oxidation. Identify the reductant and oxidant first: the question is about how they react.</>,
  },
  {
    working: <>Mn: oxidation number +4 (in MnO₂) → +3 (in Mn₂O₃), so MnO₂ is <b>reduced</b> — it is the <b>oxidant</b>, at the cathode (+).</>,
    reason: <>The second half-equation has electrons on the left, so it is the reduction.</>,
  },
  {
    working: <Chem eq="Zn + 2MnO2 -> ZnO + Mn2O3" />,
    reason: <>Adding the two half-equations: the 2e⁻ cancel, and the 2OH⁻ and H₂O cancel. This is the <b>overall</b> cell reaction — it tells you what is consumed and produced, not that the two solids touch.</>,
  },
  {
    working: <>In a galvanic cell the reductant and oxidant are <b>kept apart</b> (by the electrolyte/separator), so electrons travel from the Zn anode <b>through the external circuit</b> (the device) to the MnO₂ cathode. So <b>Zn does not react directly with MnO₂</b>.</>,
    reason: <>If Zn touched MnO₂, electrons would pass straight from Zn to MnO₂ — no current would flow through the device, and the energy would all be released as heat. Separating them is what makes the reaction produce electricity.</>,
  },
  {
    working: <>The conversion of chemical energy to electrical energy is <b>less than 100% efficient</b>, so some of the chemical energy is released as <b>heat</b>. So the reaction <b>produces heat</b>.</>,
    reason: <>No energy conversion is perfectly efficient. Everyday check: a phone or torch battery gets warm during long use.</>,
  },
  {
    working: <b>The reaction produces heat and Zn does not react directly with MnO₂.</b>,
    reason: <>Matches option <b>B</b>. Option <b>D</b> (25%) treats the cell as 100% efficient, with all the chemical energy becoming electrical energy. Option <b>A</b> (22%) reads the overall reaction as a direct reaction between Zn and MnO₂ — but then electrons would not flow through the device. Option <b>C</b> makes both errors.</>,
  },
]

export default function ChemistryQ26_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The following reactions occur in a primary cell battery.</p>
          <div className="mb-2 ml-6 flex flex-col gap-1">
            <Chem eq="Zn + 2OH- -> ZnO + H2O + 2e-" />
            <Chem eq="2MnO2 + 2e- + H2O -> Mn2O3 + 2OH-" />
          </div>
          <p>Which one of the following statements about the battery is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'The reaction produces heat and Zn reacts directly with MnO₂.' },
        { letter: 'B', content: 'The reaction produces heat and Zn does not react directly with MnO₂.', isAnswer: true },
        { letter: 'C', content: 'The reaction does not produce heat and Zn reacts directly with MnO₂.' },
        { letter: 'D', content: 'The reaction does not produce heat and Zn does not react directly with MnO₂.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
