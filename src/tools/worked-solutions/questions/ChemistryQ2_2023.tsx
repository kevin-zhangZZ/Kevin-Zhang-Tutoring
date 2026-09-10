// 2023 Chemistry Exam, MCQ 2. VCAA examination report: 40% correct. Which statement correctly
// distinguishes (or fails to distinguish) fuel cells from galvanic cells, by elimination against
// genuine electrochemistry facts. Question text transcribed from the original paper. Solution
// is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 40, B: 6, C: 20, D: 34 },
  answer: 'A',
  comment: (
    <>
      Both fuel cells and galvanic cells convert chemical energy into electrical energy, but
      since neither is 100% efficient, some energy is also released as heat in both. Fuel cells
      are not restricted to inert or porous electrodes, and in both types of cell, electrons
      flow through the external circuit, not the electrolyte.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A fuel cell is really just a <b>galvanic cell</b> that is continuously supplied with fresh reactants from outside, rather than storing them internally — so most of what's true of galvanic cells is also true of fuel cells.</>,
    reason: 'Sets up what to check each option against.',
  },
  {
    working: <>A: no real cell converts 100% of its chemical energy into electrical energy — some is always released as heat due to internal resistance and the reactions themselves. This applies equally to fuel cells and ordinary galvanic cells.</>,
    reason: 'A genuinely universal fact about both. Correct.',
  },
  {
    working: <>B: fuel cells commonly use inert electrodes (e.g. platinum) so the electrode itself doesn't react, but this isn't a fixed rule that separates the two categories — some galvanic cells also use inert electrodes (e.g. Pt in a standard hydrogen electrode).</>,
    reason: 'Not a genuine distinguishing feature. Ruled out.',
  },
  {
    working: <>C: fuel cells often use porous electrodes to maximise contact between gaseous/liquid reactants and the electrode surface, but again this isn't universally true of every fuel cell, nor is it something galvanic cells never do.</>,
    reason: 'Not a strict, always-true distinction. Ruled out.',
  },
  {
    working: <>D: in <i>every</i> galvanic-type cell (fuel cells included), electrons flow through the external wire connecting the electrodes — the electrolyte instead carries the charge internally via ion migration, never via electron flow.</>,
    reason: 'This is backwards — electrons never flow through the electrolyte. Ruled out.',
  },
  {
    working: <b>Only the heat-production statement is a fact that's always true of both cell types.</b>,
    reason: <>Matches option <b>A</b>.</>,
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
