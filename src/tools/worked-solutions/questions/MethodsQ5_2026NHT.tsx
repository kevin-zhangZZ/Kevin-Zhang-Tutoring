// 2026 Mathematical Methods NHT — Exam 2, MCQ 5. The NHT report gives the answer key only, with no
// statistics; its worked comment is transcribed below from the rendered report. Calculus: one step of Newton's method with a symbolic starting value. Question text
// transcribed from the original paper. Solution is original; the answer D agrees with the report's
// key (sympy: a − f(a)/f′(a) = a + 1 − 2e^a). Distractors verified: A is the correction term
// f(a)/f′(a) = 2e^a − 1 on its own, B is its negative, and C is f(a)/f′(a) − a, the subtraction
// done the wrong way round.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="f(x)=e^{-x}-2,\ f'(x)=-e^{-x}" />
      <br />
      <Katex tex="x_1=x_0-\dfrac{f(x_0)}{f'(x_0)}" />
      <br />
      <Katex tex="=a-\dfrac{e^{-a}-2}{-e^{-a}}" />
      <br />
      <Katex tex="=a+1-2e^a" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=e^{-x}-2,\qquad f'(x)=-e^{-x}" />,
    reason: <>Newton&apos;s method finds a zero of a function, so write the equation as <Katex tex="f(x)=0" />. Differentiate with the chain rule: the derivative of <Katex tex="e^{-x}" /> is <Katex tex="-e^{-x}" />.</>,
  },
  {
    working: <Katex display tex="x_1=x_0-\frac{f(x_0)}{f'(x_0)}=a-\frac{e^{-a}-2}{-e^{-a}}" />,
    reason: <>Newton&apos;s method: follow the tangent at <Katex tex="x_0" /> down to the <Katex tex="x" />-axis. Substitute <Katex tex="x_0=a" />.</>,
  },
  {
    working: <Katex display tex="\frac{e^{-a}-2}{-e^{-a}}=-1+\frac{2}{e^{-a}}=2e^{a}-1" />,
    reason: <>Simplify the fraction separately first: split it into two terms, and use <Katex tex="\dfrac{1}{e^{-a}}=e^{a}" />.</>,
  },
  {
    working: <Katex display tex="x_1=a-(2e^a-1)" />,
    reason: <>Keep the bracket — the whole correction term is subtracted.</>,
  },
  {
    working: <Katex display tex="\boxed{x_1=1+a-2e^a}" />,
    reason: <>Matches option <b>D</b>. Check with a number: the true root is <Katex tex="x=-\log_e(2)\approx-0.693" />. Start at <Katex tex="a=-0.5" />: <Katex tex="x_1=0.5-2e^{-0.5}\approx-0.713" />, much closer ✓.</>,
    more: <>Option <b>A</b> is the correction term <Katex tex="\tfrac{f(a)}{f'(a)}=2e^a-1" /> by itself, forgetting to subtract it from <Katex tex="a" />; option <b>B</b> is <Katex tex="-\tfrac{f(a)}{f'(a)}" />, the same slip with the sign. Option <b>C</b>, <Katex tex="2e^a-a-1" />, is <Katex tex="\tfrac{f(a)}{f'(a)}-a" />: the subtraction done the wrong way round, giving exactly the negative of the right answer.</>,
  },
]

export default function MethodsQ5_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Newton&apos;s method can be applied to find an approximate solution to <Katex tex="e^{-x}-2=0" />.
          </p>
          <p>
            If the initial value is <Katex tex="x_0=a" />, where <Katex tex="a" /> is a real number, then the value
            of <Katex tex="x_1" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="2e^a-1" /> },
        { letter: 'B', content: <Katex tex="1-2e^a" /> },
        { letter: 'C', content: <Katex tex="2e^a-a-1" /> },
        { letter: 'D', content: <Katex tex="1+a-2e^a" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
