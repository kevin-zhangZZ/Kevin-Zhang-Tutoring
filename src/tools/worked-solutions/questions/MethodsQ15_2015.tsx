// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 15. VCAA examination report: 69% correct.
// Using the linearity of the integral to find a. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 69, C: 20, D: 4, E: 3 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^5\bigl(2g(x)+ax\bigr)dx = 2\int_0^5 g(x)\,dx+a\int_0^5 x\,dx" />,
    reason: <>The integral of a sum is the sum of the integrals, and constants come out the front. No need to know what <Katex tex="g" /> actually is.</>,
  },
  {
    working: <Katex display tex="2\int_0^5 g(x)\,dx = 2\times20 = 40" />,
    reason: <>Using the given value.</>,
  },
  {
    working: <Katex display tex="\int_0^5 x\,dx = \left[\frac{x^2}{2}\right]_0^5 = \frac{25}{2}" />,
    reason: <>Or read it as the area of a triangle with base and height <Katex tex="5" />.</>,
  },
  {
    working: <Katex display tex="40+\frac{25a}{2} = 90 \implies \frac{25a}{2} = 50" />,
    reason: <>Setting the total equal to the given <Katex tex="90" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 4}" />,
    reason: <>Matches option <b>B</b>. Option C (20%), <Katex tex="2" />, comes from antidifferentiating <Katex tex="x" /> as <Katex tex="x^2" /> — dropping the <Katex tex="\tfrac12" /> — which gives <Katex tex="40+25a=90" />. Check: <Katex tex="40+\tfrac{25\times4}{2}=90" /> ✓.</>,
  },
]

export default function MethodsQ15_2015() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_0^5 g(x)\,dx=20" /> and{' '}
          <Katex tex="\displaystyle\int_0^5\bigl(2g(x)+ax\bigr)dx=90" />, then the value of{' '}
          <Katex tex="a" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="4" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="-3" /> },
        { letter: 'E', content: <Katex tex="1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
