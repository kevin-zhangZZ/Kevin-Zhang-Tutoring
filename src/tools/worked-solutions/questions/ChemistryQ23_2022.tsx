// 2022 Chemistry Exam, MCQ 23. VCAA examination report: 63% correct. Lithium ion battery:
// which statement is correct — reversing the discharge reaction for recharge, the direction of
// Li⁺ (cation) movement during discharge, the effect of temperature on battery life, and
// galvanic vs electrolytic operation. Question text transcribed from the original paper.
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 63, C: 5, D: 11 },
  answer: 'B',
  comment: (
    <>
      The recharge reaction for the Li ion battery is
      <br />
      <Chem eq="C6(s) + LiCoO2(s) -> LiC6(s) + CoO2(s)" />,
      <br />
      so <Chem eq="LiCoO2" /> is consumed, not formed, during recharge.
      <br />
      Cations move towards the cathode, which, during discharge, is the (+) electrode, so Li⁺ ions
      move towards the positive electrode.
      <br />
      The half-equations during the discharge of the lithium-ion battery are:
      <br />
      (-) <Chem eq="LiC6 -> C6 + Li+ + e-" />
      <br />
      (+) <Chem eq="CoO2 + Li+ + e- -> LiCoO2" />
      <br />
      Raising battery temperature will generally decrease battery life.
      <br />
      Discharge is a galvanic process and recharge is an electrolytic process.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Discharge half-equations: <br />(−) anode, oxidation: <Chem eq="LiC6(s) -> C6(s) + Li+ + e-" /> <br />(+) cathode, reduction: <Chem eq="CoO2(s) + Li+ + e- -> LiCoO2(s)" /></>,
    reason: <>Split the given overall equation into its two halves. Co goes from +4 in <Chem eq="CoO2" /> to +3 in <Chem eq="LiCoO2" /> (reduced), so <Chem eq="CoO2" /> reacts at the cathode, which in a galvanic cell is the <b>positive</b> electrode. <Chem eq="LiC6" /> is oxidised at the negative anode, releasing Li⁺ into the electrolyte.</>,
  },
  {
    working: <>B: Li⁺ is <b>produced</b> at the (−) electrode and <b>consumed</b> at the (+) electrode, so during discharge Li⁺ moves towards the <b>positive electrode</b> (the cathode). ✓</>,
    reason: <>In any cell, cations in the electrolyte migrate towards the cathode (where they are used up), and anions towards the anode. During discharge the cathode is the (+) electrode. <b>Correct.</b></>,
  },
  {
    working: <>A: Recharge reverses discharge: <Chem eq="C6(s) + LiCoO2(s) -> LiC6(s) + CoO2(s)" />, so <Chem eq="LiCoO2" /> is <b>consumed</b>, not formed. ✗</>,
    reason: <><Chem eq="LiCoO2" /> is a <i>product</i> of discharge, so recharging uses it up — and it sits at the positive electrode in any case, not the negative one.</>,
  },
  {
    working: <>C: Higher temperature does increase the <b>rate</b> of reaction, but it <b>decreases</b> battery life. ✗</>,
    reason: <>Rate and life are different things. Heat speeds up unwanted side reactions and degradation of the electrodes and electrolyte, so the battery holds less charge over time.</>,
  },
  {
    working: <>D: Discharge is spontaneous → <b>galvanic</b>; recharge needs an external power supply → <b>electrolytic</b>. The statement has them reversed. ✗</>,
    reason: <>A galvanic cell converts chemical energy to electrical energy (discharge, powering the phone); an electrolytic cell uses electrical energy to drive a non-spontaneous reaction (recharge, on the charger).</>,
  },
  {
    working: <b>During discharge, Li⁺ ions move towards the positive electrode.</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> (20%) has recharge forming <Chem eq="LiCoO2" />, when recharge reverses discharge and consumes it. Option <b>D</b> swaps galvanic and electrolytic; option <b>C</b> confuses a faster rate with a longer battery life.</>,
  },
]

export default function ChemistryQ23_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 22 and 23.</p>
          <p className="mb-2">
            Lithium ion batteries are used in a range of electronic devices, including mobile
            phones. The discharge reaction for this type of battery is
          </p>
          <p className="mb-3 pl-8"><Chem eq="LiC6(s) + CoO2(s) -> C6(s) + LiCoO2(s)" /></p>
          <p>Which one of the following statements about lithium ion batteries is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>During recharge, <Chem eq="LiCoO2" /> is formed at the negative electrode.</> },
        { letter: 'B', content: <>During discharge, Li⁺ ions move towards the positive electrode.</>, isAnswer: true },
        { letter: 'C', content: 'Raising the battery temperature increases the rate of reaction, thereby increasing the battery life.' },
        { letter: 'D', content: 'The battery operates as an electrolytic cell during discharge and as a galvanic cell during recharge.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
