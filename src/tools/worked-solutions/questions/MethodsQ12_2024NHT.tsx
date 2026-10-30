// 2024 Mathematical Methods NHT — Exam 2, MCQ 12. The NHT report gives the answer key only, with
// no statistics. Newton's method: three iterations from x₀ = 0 for a log-minus-power function.
// Question text transcribed from the original paper. Solution is original; the answer C agrees
// with the report's key. sympy iteration: x₁ = 2, x₂ = 1.562807…, x₃ = 1.475180…; the actual
// x-intercept is 1.471785….

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}" />,
    reason: <>Newton&apos;s method: follow the tangent at <Katex tex="x_n" /> down to the <Katex tex="x" />-axis and take that crossing as the next estimate.</>,
  },
  {
    working: <Katex display tex="f'(x)=\frac{2}{2x+1}+\frac52x^{\frac32}" />,
    reason: <>Chain rule on the log (<Katex tex="\tfrac{d}{dx}\log_e(2x+1)=\tfrac{2}{2x+1}" />); the <Katex tex="-\left(4-x^{5/2}\right)" /> term becomes <Katex tex="+\tfrac52x^{3/2}" />.</>,
  },
  {
    working: <Katex display tex="x_1=0-\frac{f(0)}{f'(0)}=0-\frac{0-4}{2}=2" />,
    reason: <><Katex tex="f(0)=\log_e(1)-4=-4" /> and <Katex tex="f'(0)=2+0=2" />.</>,
  },
  {
    working: <Katex display tex="x_2=2-\frac{f(2)}{f'(2)}=2-\frac{3.2662\ldots}{7.4710\ldots}=1.5628\ldots" />,
    reason: <>Substitute <Katex tex="x=2" />: <Katex tex="f(2)=\log_e(5)-4+2^{5/2}=\log_e(5)-4+4\sqrt2" /> and <Katex tex="f'(2)=\tfrac25+5\sqrt2" />. Keep every value unrounded and feed it straight into the next step.</>,
  },
  {
    working: <Katex display tex="x_3=1.5628\ldots-\frac{0.4704\ldots}{5.3690\ldots}=1.47518\ldots" />,
    reason: <>Third iteration, the same formula applied to <Katex tex="x_2" />. <Katex tex="x_3=1.475180\ldots" />, which rounds to <Katex tex="1.4752" />.</>,
    more: <>Fastest on CAS: <Cas fn="define" /> <Katex tex="f(x)" /> and <Katex tex="g(x)=x-\tfrac{f(x)}{f'(x)}" /> (with <Cas fn="derivative" />), then evaluate <Katex tex="g(0)" />, <Katex tex="g(\text{ans})" />, <Katex tex="g(\text{ans})" />, pressing enter once per step: the three answers are <Katex tex="x_1" />, <Katex tex="x_2" />, <Katex tex="x_3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x_3\approx 1.4752}" />,
    reason: <>Matches option <b>C</b>. Sanity check: the estimates 2, 1.56, 1.475 are closing in on the root from above.</>,
    more: <>Option <b>E</b> (2.0000) is <Katex tex="x_1" /> and option <b>D</b> (1.5628) is <Katex tex="x_2" />: stopping too early. Option <b>B</b> (1.4718) is the true <Katex tex="x" />-intercept, <Katex tex="1.471785\ldots" />, found by solving <Katex tex="f(x)=0" /> directly; the question asks for the estimate after three steps, not the root itself. Option <b>A</b> (1.4717) is that root truncated rather than rounded.</>,
  },
]

export default function MethodsQ12_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Newton&apos;s method is used to estimate the <Katex tex="x" />-intercept of the function</p>
          <p><Katex tex="f:[0,\infty)\to R," /> <Katex tex="f(x)=\log_e(2x+1)-\left(4-x^{\frac52}\right)" /></p>
          <p>
            With an initial estimate of <Katex tex="x_0=0" />, the estimate for <Katex tex="x_3" /> is closest to
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.4717" /> },
        { letter: 'B', content: <Katex tex="1.4718" /> },
        { letter: 'C', content: <Katex tex="1.4752" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="1.5628" /> },
        { letter: 'E', content: <Katex tex="2.0000" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
