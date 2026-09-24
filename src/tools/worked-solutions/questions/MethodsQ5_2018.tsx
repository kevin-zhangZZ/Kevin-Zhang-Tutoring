// 2018 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 67% correct. Find p
// given a stationary point of x² + p/x at x = −2. Question text transcribed from the original
// paper; VCAA printed no diagram and neither does the stem here (guide §7). Answer checked
// with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 67, B: 7, C: 3, D: 9, E: 15 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2 + \frac{p}{x} = x^2 + p\,x^{-1}" />,
    reason: <>Rewriting the fraction as a negative power makes it differentiable by the ordinary power rule.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x - p\,x^{-2} = 2x - \frac{p}{x^2}" />,
    reason: <>The derivative of <Katex tex="p\,x^{-1}" /> is <Katex tex="-p\,x^{-2}" /> — lose that negative sign and you land on option E.</>,
  },
  {
    working: <Katex display tex="\text{Stationary at } x=-2 \implies f'(-2) = 0" />,
    reason: <>"Stationary point" means the gradient is zero there. That single condition is enough to pin <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="2(-2) - \frac{p}{(-2)^2} = 0 \implies -4 - \frac{p}{4} = 0" />,
    reason: <>Note <Katex tex="(-2)^2 = +4" />: squaring kills the minus sign in the denominator, while the <Katex tex="2x" /> term keeps it.</>,
  },
  {
    working: <Katex display tex="\frac{p}{4} = -4" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="\boxed{p = -16}" />,
    reason: <>Matches option <b>A</b>. Option <b>E</b> <Katex tex="(16)" />, chosen by <Katex tex="15\%" />, is this answer with the sign lost — either from differentiating <Katex tex="p x^{-1}" /> as <Katex tex="+p x^{-2}" />, or from mishandling <Katex tex="(-2)^2" />. Option <b>D</b> <Katex tex="(8)" /> comes from differentiating <Katex tex="\tfrac{p}{x}" /> as <Katex tex="-\tfrac{p}{x}" />, forgetting to square the <Katex tex="x" />. A quick check: with <Katex tex="p=-16" />, <Katex tex="f'(x)=2x+\tfrac{16}{x^2}" />, and <Katex tex="f'(-2)=-4+4=0" /> ✓.</>,
  },
]

export default function MethodsQ5_2018() {
  return (
    <MCQShell
      question={
        <p>
          Consider <Katex tex="f(x)=x^2+\dfrac{p}{x},\ x\ne0,\ p\in R" />. There is a
          stationary point on the graph of <Katex tex="f" /> when <Katex tex="x=-2" />. The
          value of <Katex tex="p" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-16" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-8" /> },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="8" /> },
        { letter: 'E', content: <Katex tex="16" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
