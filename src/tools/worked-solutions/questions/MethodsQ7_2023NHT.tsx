// 2023 Mathematical Methods NHT — Exam 2, MCQ 7. The NHT report gives the answer key only, with
// no statistics. Calculus: splitting a definite integral over adjacent intervals. Question text
// transcribed from the original paper. Solution is original; the answer A agrees with the report's
// key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-2}^{5}f(x)\,dx=\int_{-2}^{1}f(x)\,dx+\int_{1}^{5}f(x)\,dx" />,
    reason: <>The interval <Katex tex="[-2,5]" /> splits at <Katex tex="x=1" /> into <Katex tex="[-2,1]" /> and <Katex tex="[1,5]" />, and an integral over the whole is the sum of the integrals over the pieces.</>,
    more: <>Think of each integral as signed area: the signed area from <Katex tex="-2" /> to <Katex tex="5" /> is the signed area from <Katex tex="-2" /> to <Katex tex="1" /> plus the rest. The second integral is negative, so on <Katex tex="[1,5]" /> there is more area below the axis than above.</>,
  },
  {
    working: <Katex display tex="3=\int_{-2}^{1}f(x)\,dx+(-2)" />,
    reason: <>Substitute the two given values.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_{-2}^{1}f(x)\,dx=3-(-2)=5}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>B</b>, 1, adds the two given integrals, <Katex tex="3+(-2)" />, instead of subtracting. Option <b>E</b>, <Katex tex="-5" />, subtracts the wrong way round, <Katex tex="-2-3" />. Check: <Katex tex="5+(-2)=3" /> ✓.</>,
  },
]

export default function MethodsQ7_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_{-2}^{5}f(x)\,dx=3" /> and <Katex tex="\displaystyle\int_{1}^{5}f(x)\,dx=-2" />, then <Katex tex="\displaystyle\int_{-2}^{1}f(x)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="5" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="\dfrac{3}{7}" /> },
        { letter: 'D', content: <Katex tex="-1" /> },
        { letter: 'E', content: <Katex tex="-5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
