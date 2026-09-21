// 2019 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 65% correct. A point
// on a transformed graph, combining a horizontal dilation and a vertical translation. Question
// text transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 11, C: 65, D: 8, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = f\!\left(\dfrac{x}{2}\right)+5" />,
    reason: <>A horizontal dilation of factor <Katex tex="2" /> from the <Katex tex="y" />-axis, then a vertical translation of <Katex tex="5" /> units up.</>,
  },
  {
    working: <Katex display tex="\text{Need } \dfrac{x}{2}=-2 \implies x=-4" />,
    reason: <>To reuse the known point <Katex tex="(-2,7)" /> on <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="h(-4) = f(-2)+5 = 7+5 = 12" />,
  },
  {
    working: <Katex display tex="\boxed{(-4,12)}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ13_2019() {
  return (
    <MCQShell
      question={
        <p>
          The graph of the function <Katex tex="f" /> passes through the point{' '}
          <Katex tex="(-2,7)" />. If <Katex tex="h(x)=f\!\left(\dfrac{x}{2}\right)+5" />, then the
          graph of the function <Katex tex="h" /> must pass through the point
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-1,-12)" /> },
        { letter: 'B', content: <Katex tex="(-1,19)" /> },
        { letter: 'C', content: <Katex tex="(-4,12)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="(-4,-14)" /> },
        { letter: 'E', content: <Katex tex="(3,3.5)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
