// 2016 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 75% correct.
// The inverse of g(x) = √(2x − 6) on [3, ∞): rule and domain. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 2, C: 2, D: 75, E: 12 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = \sqrt{2y-6}" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x^2 = 2y-6 \implies y = \frac{x^2+6}{2}" />,
    reason: <>Squaring, then rearranging.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g) = [0,\infty)" />,
    reason: <>On <Katex tex="[3,\infty)" /> the inside <Katex tex="2x-6" /> runs over <Katex tex="[0,\infty)" />, and so does its square root.</>,
  },
  {
    working: <Katex display tex="g^{-1}(0)=\frac{0+6}{2}=3 \ \checkmark" />,
    reason: <>A quick check: the inverse should send the smallest output of <Katex tex="g" /> back to the smallest input, and <Katex tex="g(3)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g^{-1}:[0,\infty)\to R,\ g^{-1}(x)=\frac{x^2+6}{2}}" />,
    reason: <>Matches option <b>D</b>. The domain of the inverse is the range of the original — getting that right is what separates D from A (10%) and E (12%), which carry the same rule on the wrong domain.</>,
  },
]

export default function MethodsQ5_2016() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following is the inverse function of{' '}
          <Katex tex="g:[3,\infty)\to R" />, <Katex tex="g(x)=\sqrt{2x-6}" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="g^{-1}:[3,\infty)\to R,\ g^{-1}(x)=\tfrac{x^2+6}{2}" /> },
        { letter: 'B', content: <Katex tex="g^{-1}:[0,\infty)\to R,\ g^{-1}(x)=(2x-6)^2" /> },
        { letter: 'C', content: <Katex tex="g^{-1}:[0,\infty)\to R,\ g^{-1}(x)=\sqrt{\tfrac{x}{2}+6}" /> },
        { letter: 'D', content: <Katex tex="g^{-1}:[0,\infty)\to R,\ g^{-1}(x)=\tfrac{x^2+6}{2}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="g^{-1}:R\to R,\ g^{-1}(x)=\tfrac{x^2+6}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
