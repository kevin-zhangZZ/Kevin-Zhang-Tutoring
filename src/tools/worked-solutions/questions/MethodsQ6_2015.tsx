// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 6. VCAA examination report: 91% correct.
// Finding a from P(3) = 10. Question text transcribed from the original paper; solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 4, C: 91, D: 2, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(3) = 27-9a-12+4" />,
    reason: <>Substituting <Katex tex="x=3" /> into <Katex tex="x^3-ax^2-4x+4" />. Note the minus in front of the <Katex tex="ax^2" />.</>,
  },
  {
    working: <Katex display tex="19-9a = 10" />,
    reason: <>Collecting: <Katex tex="27-12+4=19" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 1}" />,
    reason: <>Matches option <b>C</b>. Check: <Katex tex="27-9-12+4=10" /> ✓. Option B comes from treating the <Katex tex="-ax^2" /> as <Katex tex="+ax^2" />.</>,
  },
]

export default function MethodsQ6_2015() {
  return (
    <MCQShell
      question={
        <p>
          For the polynomial <Katex tex="P(x)=x^3-ax^2-4x+4" />, <Katex tex="P(3)=10" />,
          the value of <Katex tex="a" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-3" /> },
        { letter: 'B', content: <Katex tex="-1" /> },
        { letter: 'C', content: <Katex tex="1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="10" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
