// 2023 Chemistry Exam, MCQ 2. VCAA examination report: 40% correct. Which statement correctly
// distinguishes (or fails to distinguish) fuel cells from galvanic cells, by elimination against
// genuine electrochemistry facts. Question text transcribed from the original paper. Solution
// is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 40, B: 5, C: 42, D: 13 },
  answer: 'A',
  comment: (
    <>
      Fuel cells and galvanic cells both produce heat energy as well as electrical energy.
      <br />
      Galvanic cell electrodes may be active, as in the Zn²⁺(aq)/Zn(s) half-cell, or inert, as in
      the Fe³⁺(aq)/Fe²⁺(aq) half-cell where a Pt or C(graphite) electrode could be used.
      <br />
      Both fuel cells and galvanic cells can have porous electrodes because this increases the
      surface area for reaction.
      <br />
      Electrons do not flow through the electrolyte in electrochemical cells; they travel through
      the external circuit between the anode and the cathode.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A fuel cell is really just a <b>galvanic cell</b> that is continuously supplied with fresh reactants from outside, rather than storing them internally — so most of what's true of galvanic cells is also true of fuel cells.</>,
    reason: <>Sets up what to check each option against.</>,
  },
  {
    working: <>A: no real cell converts 100% of its chemical energy into electrical energy — some is always released as heat due to internal resistance and the reactions themselves. This applies equally to fuel cells and ordinary galvanic cells.</>,
    reason: <>True of both kinds of cell. Correct.</>,
  },
  {
    working: <>B: fuel cells commonly use inert electrodes (e.g. platinum) so the electrode itself doesn't react, but this isn't a fixed rule that separates the two categories — some galvanic cells also use inert electrodes (e.g. Pt or graphite in an Fe³⁺(aq)/Fe²⁺(aq) half-cell).</>,
    reason: <>Not a genuine distinguishing feature. Ruled out.</>,
  },
  {
    working: <>C: fuel cells often use porous electrodes to maximise contact between gaseous/liquid reactants and the electrode surface, but again this isn't universally true of every fuel cell, nor is it something galvanic cells never do.</>,
    reason: <>Not a strict, always-true distinction. Ruled out.</>,
  },
  {
    working: <>D: in <i>every</i> galvanic-type cell (fuel cells included), electrons flow through the external wire connecting the electrodes — the electrolyte instead carries the charge internally via ion migration, never via electron flow.</>,
    reason: <>This is backwards — electrons never flow through the electrolyte. Ruled out.</>,
  },
  {
    working: <b>Only the heat-production statement is always true of both cell types.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b>, the most popular answer, fails because galvanic cells can have porous electrodes too (the report&rsquo;s point).</>,
  },
]

export default function ChemistryQ2_2023() {
  return (
    <MCQShell
      question={<p>Which one of the following statements is correct?</p>}
      options={[
        { letter: 'A', content: 'Fuel cells and galvanic cells produce heat.', isAnswer: true },
        { letter: 'B', content: 'Fuel cells have inert electrodes whereas galvanic cells do not.' },
        { letter: 'C', content: 'Fuel cells have porous electrodes whereas galvanic cells do not.' },
        { letter: 'D', content: 'Fuel cells and galvanic cells operate when electrons flow through the electrolyte.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
