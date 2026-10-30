// 2021 Chemistry Exam, MCQ 13. VCAA examination report: 62% correct. The half-equation at the
// cathode of a lead-acid battery during recharge — the discharge half-equations reversed, with
// reduction still at the cathode. Question text transcribed from the original paper (shared
// stem for Questions 13 and 14). VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 62, C: 15, D: 13 },
  answer: 'B',
  comment: (
    <>
      In the discharge reaction the oxidation number of Pb changes from 0 to +2 at one electrode
      and from +4 to +2 at the other electrode.
      <br />
      Pb(s) is oxidised to PbSO₄ at the anode.
      <br />
      PbO₂(s) is reduced to PbSO₄ at the cathode.
      <br />
      So, during recharge when the half-equations for discharge are reversed.
      <br />
      PbSO₄ is oxidised to PbO₂ at the anode.
      <br />
      PbSO₄ is reduced to Pb at the cathode.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Discharge: Pb in Pb(s) goes 0 → +2 (in <Chem eq="PbSO4" />): <b>oxidised</b>. Pb in <Chem eq="PbO2" /> goes +4 → +2: <b>reduced</b>.</>,
    reason: <>Start from the overall equation you are given and assign oxidation numbers to Pb in each species (O is −2, and <Chem eq="SO4" /> carries −2 as a whole, so Pb in <Chem eq="PbSO4" /> is +2).</>,
  },
  {
    working: (
      <>
        Discharge anode (−): <Chem eq="Pb(s) + SO₄²⁻(aq) -> PbSO4(s) + 2e-" />
        <br />
        Discharge cathode (+): <Chem eq="PbO2(s) + SO₄²⁻(aq) + 4H+(aq) + 2e- -> PbSO4(s) + 2H2O(l)" />
      </>
    ),
    reason: <>During discharge the battery is a galvanic cell: oxidation at the anode (negative), reduction at the cathode (positive). Both electrodes form <Chem eq="PbSO4" />.</>,
  },
  {
    working: (
      <>
        Recharge = discharge reversed:
        <br />
        Recharge anode (+): <Chem eq="PbSO4(s) + 2H2O(l) -> PbO2(s) + SO₄²⁻(aq) + 4H+(aq) + 2e-" />
        <br />
        Recharge cathode (−): <Chem eq="PbSO4(s) + 2e- -> Pb(s) + SO₄²⁻(aq)" />
      </>
    ),
    reason: <>During recharge the battery is an electrolytic cell, driven by the charger. Each half-reaction runs backwards, so oxidation and reduction swap electrodes — but the rule <b>&ldquo;reduction at the cathode&rdquo;</b> holds in every cell. The cathode is now the Pb electrode (still the negative one), where <Chem eq="PbSO4" /> gains electrons and is reduced back to Pb.</>,
  },
  {
    working: <b>Recharge cathode: <Chem eq="PbSO4(s) + 2e- -> Pb(s) + SO₄²⁻(aq)" /></b>,
    reason: <>Matches option <b>B</b> — a reduction (electrons on the left) that reverses the discharge anode reaction. Option <b>C</b> (15%) is the cathode reaction during <i>discharge</i>, not recharge. Option <b>D</b> (13%) is the recharge <i>anode</i> reaction — an oxidation (electrons on the right), at the electrode that was the cathode during discharge. Option <b>A</b> (9%) is the discharge anode reaction, an oxidation, which can never happen at a cathode.</>,
  },
]

export default function ChemistryQ13_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 13 and 14.</p>
          <p className="mb-2">The overall discharge reaction for a lead-acid battery is</p>
          <p className="mb-3 text-center"><Chem eq="Pb(s) + PbO2(s) + 2H2SO4(aq) -> 2PbSO4(s) + 2H2O(l)" /></p>
          <p>During recharge, the reaction at the cathode is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Chem eq="Pb(s) + SO₄²⁻(aq) -> PbSO4(s) + 2e-" /> },
        { letter: 'B', content: <Chem eq="PbSO4(s) + 2e- -> Pb(s) + SO₄²⁻(aq)" />, isAnswer: true },
        { letter: 'C', content: <Chem eq="PbO2(s) + SO₄²⁻(aq) + 4H+ + 2e- -> PbSO4(s) + 2H2O(l)" /> },
        { letter: 'D', content: <Chem eq="PbSO4(s) + 2H2O(l) -> PbO2(s) + SO₄²⁻(aq) + 4H+(aq) + 2e-" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
