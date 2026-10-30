// 2021 Chemistry Exam, MCQ 14. VCAA examination report: 46% correct. Identifying the oxidising
// agent in a discharging lead-acid battery from the oxidation numbers of Pb. Question text
// transcribed from the original paper (shared stem for Questions 13 and 14). VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 46, C: 19, D: 18 },
  answer: 'B',
  comment: (
    <>
      PbO₂
      <br />
      An oxidising agent causes oxidation and is itself reduced.
      <br />
      In the discharge reaction:
      <br />
      Pb(0) is oxidised to Pb(+2)SO₄ and Pb(+4)O₂ is reduced to Pb(+2)SO₄.
      <br />
      PbO₂ oxidises Pb to PbSO₄ and is itself reduced to PbSO₄.
      <br />
      The identification of oxidising agents is a clear area for improvement.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Oxidising agent = the reactant that is <b>reduced</b> (gains electrons; its oxidation number decreases).</>,
    reason: <>The oxidising agent causes something else to be oxidised by taking its electrons — so it is itself reduced. Don&rsquo;t confuse &ldquo;oxidising agent&rdquo; with &ldquo;the species that is oxidised&rdquo;: they are opposites.</>,
  },
  {
    working: (
      <>
        <Chem eq="Pb(s) + PbO2(s) + 2H2SO4(aq) -> 2PbSO4(s) + 2H2O(l)" />
        <br />
        Pb: 0 → +2 (oxidised) · Pb in <Chem eq="PbO2" />: +4 → +2 (reduced)
        <br />
        H: +1 → +1 · S: +6 → +6 · O: −2 → −2 (unchanged)
      </>
    ),
    reason: <>Assign oxidation numbers using O = −2 and H = +1: in <Chem eq="PbO2" />, Pb + 2(−2) = 0 gives +4; in <Chem eq="PbSO4" />, the sulfate is −2 overall, so Pb is +2. Only lead changes.</>,
  },
  {
    working: <b>Oxidising agent: <Chem eq="PbO2" /></b>,
    reason: <>Matches option <b>B</b>: <Chem eq="PbO2" /> is reduced (+4 → +2) while oxidising Pb to <Chem eq="PbSO4" />. Option <b>A</b> (17%), Pb, is the species that is <i>oxidised</i> — the <b>reducing</b> agent. Option <b>C</b> (19%), <Chem eq="PbSO4" />, is a <i>product</i> of discharge, not a reactant. Option <b>D</b> (18%), <Chem eq="H2SO4" />, is a reactant, but none of its elements changes oxidation number, so it is neither oxidised nor reduced.</>,
  },
]

export default function ChemistryQ14_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 13 and 14.</p>
          <p className="mb-2">The overall discharge reaction for a lead-acid battery is</p>
          <p className="mb-3 text-center"><Chem eq="Pb(s) + PbO2(s) + 2H2SO4(aq) -> 2PbSO4(s) + 2H2O(l)" /></p>
          <p>When the lead-acid battery is discharging, the oxidising agent is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Chem eq="Pb" /> },
        { letter: 'B', content: <Chem eq="PbO2" />, isAnswer: true },
        { letter: 'C', content: <Chem eq="PbSO4" /> },
        { letter: 'D', content: <Chem eq="H2SO4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
