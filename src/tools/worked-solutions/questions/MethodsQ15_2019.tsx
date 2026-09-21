// 2019 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 55% correct. The
// derivative of an inverse function at a point, via the reciprocal-gradient relationship.
// Question text transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 55, B: 26, C: 8, D: 5, E: 4 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g=f^{-1} \text{ and } f(5)=7 \implies g(7)=5" />,
    reason: <>An inverse undoes its function: if <Katex tex="f" /> sends <Katex tex="5" /> to <Katex tex="7" />, then <Katex tex="g" /> sends <Katex tex="7" /> back to <Katex tex="5" />. This is why the question hands you <Katex tex="f(5)=7" /> — it identifies the matching point.</>,
  },
  {
    working: <Katex display tex="\text{Graph of } g \text{ is the graph of } f \text{ reflected in } y=x" />,
    reason: <>Reflection swaps "rise" and "run", so it turns a gradient of <Katex tex="m" /> into a gradient of <Katex tex="\tfrac1m" />. That is the whole idea behind the rule on the next line.</>,
  },
  {
    working: <Katex display tex="g'(7) = \dfrac{1}{f'\bigl(g(7)\bigr)} = \dfrac{1}{f'(5)}" />,
    reason: <>The inverse-function derivative rule. Note the gradient of <Katex tex="g" /> at <Katex tex="x=7" /> is controlled by the gradient of <Katex tex="f" /> at the <em>matching</em> point <Katex tex="x=5" />, not at <Katex tex="x=7" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x-4 \implies f'(5) = 2(5)-4 = 6" />,
  },
  {
    working: <Katex display tex="\boxed{g'(7) = \dfrac16}" />,
    reason: <>Matches option <b>A</b>. The distractors map the common slips exactly: <b>B</b> <Katex tex="(5)" /> is <Katex tex="g(7)" /> rather than <Katex tex="g'(7)" /> — chosen by a quarter of students, who answered the wrong question; <b>D</b> <Katex tex="(6)" /> is <Katex tex="f'(5)" /> without the reciprocal; <b>E</b> <Katex tex="\left(\tfrac17\right)" /> is <Katex tex="\tfrac{1}{f'(7)}" />, evaluated at the wrong point.</>,
  },
]

export default function MethodsQ15_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:[2,\infty)\to\mathbb{R},\ f(x)=x^2-4x+2" /> and <Katex tex="f(5)=7" />.
          The function <Katex tex="g" /> is the inverse function of <Katex tex="f" />.{' '}
          <Katex tex="g'(7)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac16" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="5" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\sqrt7}{14}" /> },
        { letter: 'D', content: <Katex tex="6" /> },
        { letter: 'E', content: <Katex tex="\dfrac17" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
