// 2021 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 67% correct.
// Linearity of the definite integral, with a constant term. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 67, B: 6, C: 5, D: 2, E: 20 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^a\bigl(3f(x)+2\bigr)dx = 3\int_0^a f(x)\,dx+\int_0^a 2\,dx" />,
    reason: <>Two properties of definite integrals: the integral of a sum is the sum of the integrals, and a constant factor (the 3) can be taken outside. Split it this way so that the integral you were given, <Katex tex="\int_0^a f(x)\,dx" />, appears on its own.</>,
  },
  {
    working: <Katex display tex="3\int_0^a f(x)\,dx = 3k" />,
    reason: <>Substitute the given value <Katex tex="\int_0^a f(x)\,dx=k" />.</>,
  },
  {
    working: <Katex display tex="\int_0^a 2\,dx = \left[2x\right]_0^a = 2a-0 = 2a" />,
    reason: <>An antiderivative of the constant 2 is <Katex tex="2x" />. The result depends on <Katex tex="a" />: for <Katex tex="a>0" /> it is the area of a rectangle of height 2 and width <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{3k+2a}" />,
    reason: <>Matches option <b>A</b>. Option E treats <Katex tex="\int_0^a 2\,dx" /> as just 2, forgetting the width <Katex tex="a" />. Option B leaves out the <Katex tex="+2" /> term altogether, and option C forgets to multiply <Katex tex="k" /> by 3.</>,
  },
]

export default function MethodsQ11_2021() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_0^a f(x)\,dx=k" />, then{' '}
          <Katex tex="\displaystyle\int_0^a\bigl(3f(x)+2\bigr)dx" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3k+2a" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="3k" /> },
        { letter: 'C', content: <Katex tex="k+2a" /> },
        { letter: 'D', content: <Katex tex="k+2" /> },
        { letter: 'E', content: <Katex tex="3k+2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
