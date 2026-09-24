// 2021 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 73% correct.
// Testing four functional relations against f(x) = x. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 12, C: 73, D: 7, E: 2 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x \implies f(-x) = -x, \quad f\!\left(x^2\right) = x^2" />,
    reason: <>Write down the three things every relation will need, then test each in turn.</>,
  },
  {
    working: <Katex display tex="f(x) = f(-x): \ x = -x \ \text{ only at } x=0 \quad \times" />,
    reason: <>A relation must hold for <em>all</em> <Katex tex="x" />, so one point is not enough. This says <Katex tex="f" /> is even; <Katex tex="f(x)=x" /> is odd.</>,
  },
  {
    working: <Katex display tex="-f(x) = f(-x): \ -x = -x \ \text{ for all } x \quad \checkmark" />,
    reason: <>The definition of an odd function, which <Katex tex="f(x)=x" /> is.</>,
  },
  {
    working: <Katex display tex="f(x) = -f(x): \ x = -x \ \text{ only at } x=0 \quad \times" />,
    reason: <>This would force <Katex tex="f" /> to be identically zero.</>,
  },
  {
    working: <Katex display tex="\bigl(f(x)\bigr)^2 = f\!\left(x^2\right): \ x^2 = x^2 \quad \checkmark" />,
    reason: <>True for every real <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2}" />,
    reason: <>The second and fourth relations hold. Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ5_2021() {
  return (
    <MCQShell
      question={
        <>
          <p>Consider the following four functional relations.</p>
          <p className="py-1">
            <Katex
              display
              tex="f(x)=f(-x) \qquad -f(x)=f(-x) \qquad f(x)=-f(x) \qquad \bigl(f(x)\bigr)^2=f\!\left(x^2\right)"
            />
          </p>
          <p>
            The number of these functional relations that are satisfied by the function{' '}
            <Katex tex="f:R\to R" />, <Katex tex="f(x)=x" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
