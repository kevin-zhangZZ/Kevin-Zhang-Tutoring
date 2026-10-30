// 2022 Chemistry Exam, MCQ 22. VCAA examination report: 65% correct. Where reduction occurs in
// a lithium ion battery during discharge and during recharge — reduction is always at the
// cathode, even though the electrodes swap anode/cathode roles on recharge. Question text
// transcribed from the original paper (the two-column table of options is written as
// "Column: value · Column: value"). VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const D1 = 'During discharge, reduction occurs at the'
const D2 = 'During recharge, reduction occurs at the'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 22, C: 3, D: 65 },
  answer: 'D',
  comment: (
    <>
      Reduction always occurs at the cathode.
      <br />
      Electrodes are classified according to whether electrons are produced or consumed. Electrons
      are consumed, during reduction, at the cathode.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Anode = electrode where <b>oxidation</b> occurs (electrons produced). <br />Cathode = electrode where <b>reduction</b> occurs (electrons consumed).</>,
    reason: <>These are definitions, and they hold in <i>every</i> cell — galvanic or electrolytic, discharging or recharging. Memory aid: <b>An Ox</b>, <b>Red Cat</b>.</>,
  },
  {
    working: <>Discharge (galvanic): <Chem eq="LiC6(s) + CoO2(s) -> C6(s) + LiCoO2(s)" /> <br />Co: +4 in <Chem eq="CoO2" /> → +3 in <Chem eq="LiCoO2" />, so <Chem eq="CoO2" /> is <b>reduced</b>. <br />Reduction at the <b>cathode</b> (the positive electrode).</>,
    reason: <>Oxidation numbers from the discharge equation: in <Chem eq="CoO2" /> Co = +4 (two O at −2); in <Chem eq="LiCoO2" /> Co = +3 (Li +1, two O at −2). A gain of electrons is reduction, so it happens at the cathode.</>,
  },
  {
    working: <>Recharge (electrolytic): <Chem eq="C6(s) + LiCoO2(s) -> LiC6(s) + CoO2(s)" /> <br />(−) electrode: <Chem eq="C6(s) + Li+ + e- -> LiC6(s)" /> — gain of electrons, <b>reduction</b>, so this electrode is now the <b>cathode</b>. <br />(+) electrode: <Chem eq="LiCoO2(s) -> CoO2(s) + Li+ + e-" /> — oxidation, so it is now the anode.</>,
    reason: <>Recharging forces the discharge reaction in reverse, so each electrode&rsquo;s reaction reverses. The negative electrode was the anode during discharge; during recharge reduction happens there, so by definition it is now the cathode. The <i>names</i> anode/cathode follow the reaction, not the physical electrode.</>,
  },
  {
    working: <b>Reduction occurs at the cathode during discharge and at the cathode during recharge.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b> (22%) keeps the discharge labels on the electrodes during recharge — reduction does occur at the electrode that <i>was</i> the anode during discharge, but during recharge that electrode is the cathode. Options <b>A</b> and <b>C</b> put reduction at an anode during discharge, which contradicts the definition.</>,
  },
]

export default function ChemistryQ22_2022() {
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
          <p>Which of the following is correct about lithium ion batteries?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>{D1}: anode · {D2}: cathode</> },
        { letter: 'B', content: <>{D1}: cathode · {D2}: anode</> },
        { letter: 'C', content: <>{D1}: anode · {D2}: anode</> },
        { letter: 'D', content: <>{D1}: cathode · {D2}: cathode</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
