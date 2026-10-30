// 2021 Chemistry Exam, MCQ 1. VCAA examination report: 82% correct. A rechargeable (secondary)
// cell works because its discharge reaction can be reversed: galvanic on discharge, electrolytic
// on recharge. Question text transcribed from the original paper. VCAA report only. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 82, B: 8, C: 9, D: 1 },
  answer: 'A',
  comment: (
    <>
      Rechargeable batteries act as galvanic cells during discharge and electrolytic cells during
      recharge. The recharge reaction is the reverse of the discharge reaction.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Discharge (in use): <b>galvanic</b> cell — a spontaneous redox reaction converts chemical energy → electrical energy.</>,
    reason: <>While the battery powers a device, the cell reaction runs in its spontaneous direction, exactly like any primary (non-rechargeable) galvanic cell.</>,
  },
  {
    working: <>Recharge: <b>electrolytic</b> cell — an external power supply forces the <b>reverse</b> (non-spontaneous) reaction, converting electrical energy → chemical energy.</>,
    reason: <>The charger pushes electrons the opposite way, so the discharge products are converted back into the original reactants. This only works because the discharge products stay in contact with the electrodes and the reaction is <b>reversible</b>. For example, in a lead–acid battery, discharge is <Chem eq="Pb(s) + PbO2(s) + 2H2SO4(aq) -> 2PbSO4(s) + 2H2O(l)" /> and recharge is the same equation run backwards.</>,
  },
  {
    working: <>Check the other options:<br />B — during recharge the cell is <b>electrolytic</b>, not galvanic.<br />C — a continuous supply of reactants describes a <b>fuel cell</b>.<br />D — higher temperatures speed up <b>all</b> reactions, side reactions included, so there are more of them, not fewer.</>,
    reason: <>Each wrong option takes a true fact about a different situation: B swaps the two modes; C is the defining feature of fuel cells, whose reactants (e.g. <Chem eq="H2" /> and <Chem eq="O2" />) are fed in continuously and whose products are removed, so nothing is ever recharged; D reverses the effect of temperature — unwanted side reactions are one reason rechargeable batteries degrade faster when hot.</>,
  },
  {
    working: <b>Rechargeable batteries use reversible reactions.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b> (9%) describes a fuel cell and option <b>B</b> (8%) confuses discharging (galvanic) with recharging (electrolytic).</>,
  },
]

export default function ChemistryQ1_2021() {
  return (
    <MCQShell
      question={<p>Rechargeable batteries</p>}
      options={[
        { letter: 'A', content: <>use reversible reactions.</>, isAnswer: true },
        { letter: 'B', content: <>operate as galvanic cells during recharge.</> },
        { letter: 'C', content: <>require a continuous flow of reactants to operate.</> },
        { letter: 'D', content: <>have fewer side reactions as temperature increases.</> },
      ]}
      background={
        <Background>
          <p>Three kinds of electrochemical cell to keep apart:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><b>Primary (non-rechargeable) galvanic cell</b> — spontaneous reaction, chemical → electrical energy; once the reactants are used up it is finished.</li>
            <li><b>Secondary (rechargeable) cell</b> — galvanic while discharging, electrolytic while recharging; the reaction must be reversible.</li>
            <li><b>Fuel cell</b> — galvanic, but the reactants are supplied continuously from outside, so it never needs recharging.</li>
          </ul>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
