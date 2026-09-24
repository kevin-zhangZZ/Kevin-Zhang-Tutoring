// 2017 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 78% correct.
// Average rate of change of x² − 2x over [1, a]. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 78, B: 4, C: 6, D: 8, E: 4 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate} = \frac{f(a)-f(1)}{a-1}" />,
    reason: <>Average rate of change is the gradient of the chord joining the endpoints — not a derivative.</>,
  },
  {
    working: <Katex display tex="f(1)=1-2=-1,\qquad f(a)=a^2-2a" />,
    reason: <>Evaluating at each end.</>,
  },
  {
    working: <Katex display tex="\frac{a^2-2a-(-1)}{a-1} = \frac{a^2-2a+1}{a-1}" />,
    reason: <>Careful with the double negative — that is what makes the numerator a perfect square.</>,
  },
  {
    working: <Katex display tex="= \frac{(a-1)^2}{a-1} = a-1" />,
    reason: <>Cancelling is legitimate because <Katex tex="a>1" />, so <Katex tex="a-1\ne0" />.</>,
  },
  {
    working: <Katex display tex="a-1=8 \implies \boxed{a=9}" />,
    reason: <>Matches option <b>A</b>. Check: <Katex tex="f(9)=81-18=63" /> and <Katex tex="f(1)=-1" />, so the chord gradient is <Katex tex="\tfrac{63-(-1)}{9-1}=\tfrac{64}{8}=8" />.</>,
  },
]

export default function MethodsQ9_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The average rate of change of the function with the rule{' '}
            <Katex tex="f(x)=x^2-2x" /> over the interval <Katex tex="[1,a]" />, where{' '}
            <Katex tex="a>1" />, is <Katex tex="8" />.
          </p>
          <p>
            The value of <Katex tex="a" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="9" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="8" /> },
        { letter: 'C', content: <Katex tex="7" /> },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="1+\sqrt{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
