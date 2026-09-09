// 2017 Chemistry Exam, MCQ 3. VCAA examination report: 47% correct — the fourth-hardest MCQ on
// the 2017 paper. Which process is actually hydrolysis, as opposed to its opposite,
// condensation? Question text transcribed from the original paper; solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 8, C: 37, D: 47 },
  answer: 'D',
  comment: 'Reaction of water with the glycosidic bond in maltose produces two glucose molecules.',
}

const ROWS: WorkingRow[] = [
  {
    working: 'A hydrolytic reaction: water reacts WITH a compound, breaking it into two or more smaller molecules.',
    reason: 'This is the definition to test each option against.',
  },
  {
    working: <>A — forming a dipeptide, and B — forming a triglyceride: both are examples of <b>condensation</b>, the opposite process (two small molecules join, <em>releasing</em> water).</>,
    reason: 'Condensation and hydrolysis are reverses of each other — mixing them up is the classic trap here.',
  },
  {
    working: <>C — "water is a reaction product": this also describes <b>condensation</b> (water is released), not hydrolysis (where water is <em>consumed</em>, not produced).</>,
  },
  {
    working: <>D — glucose formed from maltose: maltose is a disaccharide of two glucose units joined by a glycosidic bond. Breaking that bond by reacting it with water — releasing two separate glucose molecules — is exactly hydrolysis.</>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ3_2017() {
  return (
    <MCQShell
      question={<p>A hydrolytic reaction occurs when</p>}
      options={[
        { letter: 'A', content: 'a dipeptide is formed.' },
        { letter: 'B', content: 'a triglyceride is formed.' },
        { letter: 'C', content: 'water is a reaction product.' },
        { letter: 'D', content: 'glucose is formed from maltose.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
