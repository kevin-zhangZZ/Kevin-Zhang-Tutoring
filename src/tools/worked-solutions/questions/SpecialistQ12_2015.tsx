// 2015 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 76% correct.
// Solving a separable differential equation with an initial condition. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 76, C: 6, D: 4, E: 8 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = 1-\frac y3 = \frac{3-y}{3}" />,
    reason: <>Putting the right-hand side over a common denominator makes the separation obvious.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dy} = \frac{3}{3-y}" />,
    reason: <>Inverting rather than separating keeps the integration on one side.</>,
  },
  {
    working: <Katex display tex="x = -3\log_e|3-y| + c" />,
    reason: <>The <Katex tex="-3" /> comes from the chain rule: the derivative of <Katex tex="3-y" /> is <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="2 = -3\log_e|3-4|+c = -3\log_e(1)+c \implies c = 2" />,
    reason: <>Applying <Katex tex="y=4" /> when <Katex tex="x=2" />. Conveniently <Katex tex="\log_e(1)=0" />.</>,
  },
  {
    working: <Katex display tex="x-2 = -3\log_e|3-y| \implies \log_e|3-y| = -\frac{x-2}{3}" />,
    reason: <>Rearranging to isolate the logarithm.</>,
  },
  {
    working: <Katex display tex="|3-y| = e^{-(x-2)/3}" />,
    reason: <>Exponentiating both sides.</>,
  },
  {
    working: <Katex display tex="y > 3 \implies 3-y = -e^{-(x-2)/3}" />,
    reason: <>The initial value <Katex tex="y=4" /> is above 3, and a solution curve cannot cross the equilibrium <Katex tex="y=3" />, so <Katex tex="3-y" /> stays negative and the modulus resolves to the minus sign.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 3+e^{-(x-2)/3}}" />,
    reason: <>Option B. Check both conditions: <Katex tex="y(2)=3+1=4" /> ✓, and <Katex tex="\tfrac{dy}{dx}=-\tfrac13e^{-(x-2)/3}" /> while <Katex tex="1-\tfrac y3 = -\tfrac13e^{-(x-2)/3}" /> ✓.</>,
  },
]

export default function SpecialistQ12_2015() {
  return (
    <MCQShell
      question={
        <p>
          Given <Katex tex="\dfrac{dy}{dx}=1-\dfrac y3" /> and <Katex tex="y=4" /> when{' '}
          <Katex tex="x=2" />, then
        </p>
      }
      background={
        <p>
          Every option is an exponential, so the quickest check on a real exam is to
          substitute <Katex tex="x=2" /> and keep only those giving <Katex tex="y=4" />, then
          differentiate the survivors. Options B, C and E all pass the first test; only B
          passes the second.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y = e^{-(x-2)/3}-3" /> },
        { letter: 'B', content: <Katex tex="y = e^{-(x-2)/3}+3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="y = 4e^{-(x-2)/3}" /> },
        { letter: 'D', content: <Katex tex="y = e^{4(y-x-2)/3}" /> },
        { letter: 'E', content: <Katex tex="y = e^{(x-2)/3}+3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
