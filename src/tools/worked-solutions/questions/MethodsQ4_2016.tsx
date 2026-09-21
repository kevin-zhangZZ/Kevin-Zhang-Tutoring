// 2016 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 85% correct.
// Average rate of change of 3x² − 2√(x+1) over [0, 3]. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 3, C: 8, D: 85, E: 2 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate} = \frac{f(3)-f(0)}{3-0}" />,
    reason: <>The gradient of the chord between the endpoints — no differentiation involved.</>,
  },
  {
    working: <Katex display tex="f(3) = 3(9)-2\sqrt{4} = 27-4 = 23" />,
    reason: <>The surd is <Katex tex="\sqrt{x+1}" />, so at <Katex tex="x=3" /> it is <Katex tex="\sqrt4=2" /> — a whole number, which is why those endpoints were chosen.</>,
  },
  {
    working: <Katex display tex="f(0) = 0-2\sqrt{1} = -2" />,
    reason: <>And <Katex tex="\sqrt1=1" />. Note this is negative.</>,
  },
  {
    working: <Katex display tex="\frac{23-(-2)}{3} = \frac{25}{3}" />,
    reason: <>Careful with the double negative in the numerator.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{25}{3}}" />,
    reason: <>Option D, about <Katex tex="8.33" />. Option B, <Katex tex="25" />, is the rise without dividing by the run.</>,
  },
]

export default function MethodsQ4_2016() {
  return (
    <MCQShell
      question={
        <p>
          The average rate of change of the function <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=3x^2-2\sqrt{x+1}" />, between <Katex tex="x=0" /> and{' '}
          <Katex tex="x=3" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="8" /> },
        { letter: 'B', content: <Katex tex="25" /> },
        { letter: 'C', content: <Katex tex="\dfrac{53}{9}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{25}{3}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{13}{9}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
