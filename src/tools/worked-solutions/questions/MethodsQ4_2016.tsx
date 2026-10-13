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
    reason: <>Average rate of change is the gradient of the straight line joining the two endpoints: rise over run. No differentiation involved.</>,
    more: <>Don't confuse it with the <em>instantaneous</em> rate of change, <Katex tex="f'(x)" />, which is the gradient of a tangent at one point. "Average rate of change between <Katex tex="x=a" /> and <Katex tex="x=b" />" always means <Katex tex="\frac{f(b)-f(a)}{b-a}" />.</>,
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
    reason: <>Subtracting a negative adds: <Katex tex="23-(-2)=25" />. Then divide by the run, <Katex tex="3-0=3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{25}{3}}" />,
    reason: <>Matches option <b>D</b>, about <Katex tex="8.33" />.</>,
    more: <>Option C, <Katex tex="\frac{53}{9}" />, is the average <em>value</em> of <Katex tex="f" />, <Katex tex="\frac{1}{3-0}\int_0^3 f(x)\,dx" />: a different quantity from the average <em>rate of change</em>. Option B, <Katex tex="25" />, is the rise without dividing by the run. On CAS, define <Katex tex="f" /> and enter <Katex tex="(f(3)-f(0))/3" /> to check.</>,
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
