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
    working: <Katex display tex="\text{Known: } f(-2)=7" />,
    reason: <>That is all the information there is about <Katex tex="f" /> — so the whole question is about arranging for <Katex tex="f" /> to be fed <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="h(x) = f\!\left(\dfrac{x}{2}\right)+5 \implies \text{need } \dfrac{x}{2}=-2" />,
    reason: <>The input to <Katex tex="f" /> inside <Katex tex="h" /> is <Katex tex="\tfrac{x}{2}" />, not <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{x}{2}=-2 \implies x=-4" />,
    reason: <>Multiply by <Katex tex="2" />. Replacing <Katex tex="x" /> by <Katex tex="\tfrac{x}{2}" /> stretches the graph <em>away</em> from the <Katex tex="y" />-axis by a factor of <Katex tex="2" />, so the <Katex tex="x" />-coordinate doubles: <Katex tex="-2\to-4" />. (Halving it to <Katex tex="-1" /> is the trap behind options <b>A</b> and <b>B</b>.)</>,
  },
  {
    working: <Katex display tex="h(-4) = f(-2)+5 = 7+5 = 12" />,
    reason: <>The <Katex tex="+5" /> lifts the <Katex tex="y" />-coordinate by <Katex tex="5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(-4,12)}" />,
    reason: <>Matches option <b>C</b>. In short: the dilation acts on <Katex tex="x" />, the translation acts on <Katex tex="y" />, and they don't interfere with each other.</>,
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
