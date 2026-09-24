// 2022 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 78% correct.
// The horizontal asymptote of a translated truncus. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 78, B: 2, C: 2, D: 0, E: 18 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{1}{(x+3)^2}+4" />,
    reason: <>A truncus translated 3 left and 4 up.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{1}{(x+3)^2}\to0" />,
    reason: <>The fractional part dies away; only the constant survives.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 4}" />,
    reason: <>Matches option <b>A</b>. Option E, <Katex tex="x=-3" />, is the <em>vertical</em> asymptote — a correct feature, but not what was asked.</>,
  },
]

export default function MethodsQ2_2022() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\dfrac{1}{(x+3)^2}+4" /> has a horizontal asymptote
          with the equation
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=4" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="y=3" /> },
        { letter: 'C', content: <Katex tex="y=0" /> },
        { letter: 'D', content: <Katex tex="x=-2" /> },
        { letter: 'E', content: <Katex tex="x=-3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
