// 2023 Mathematical Methods NHT — Exam 2, MCQ 13. The NHT report gives the answer key only, with
// no statistics. Calculus: the tangent to a sum of logarithms that passes through the origin.
// Question text transcribed from the original paper. Solution is original; the answer D agrees
// with the report's key. sympy nsolve gives x = 4.19314… (y = 2.9119…, gradient 0.6945…).
// Verified distractors: A (−0.655…) is the root of the same equation after the logs are combined
// into log_e(2x(x − 2)), whose domain wrongly lets in x < 0; C (2.91) is the y-coordinate.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{domain: } 2x>0 \text{ and } x-2>0\ \Rightarrow\ x>2" />,
    reason: <>Each logarithm needs a positive argument, so the graph only exists for <Katex tex="x>2" />. Any answer must lie in this domain.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{1}{x}+\frac{1}{x-2}" />,
    reason: <><Katex tex="\tfrac{d}{dx}\log_e(2x)=\tfrac{2}{2x}=\tfrac1x" /> and <Katex tex="\tfrac{d}{dx}\log_e(x-2)=\tfrac{1}{x-2}" />.</>,
  },
  {
    working: <Katex display tex="\text{at } x=p:\ \ y-y(p)=y'(p)\,(x-p)" />,
    reason: <>The tangent at the point where <Katex tex="x=p" />, in point–gradient form.</>,
  },
  {
    working: <Katex display tex="(0,0):\ \ -y(p)=-p\,y'(p)\ \Rightarrow\ y(p)=p\,y'(p)" />,
    reason: <>The tangent passes through the origin, so substitute <Katex tex="x=0" />, <Katex tex="y=0" />.</>,
    more: <>Geometrically: a line through the origin and the point <Katex tex="(p,\,y(p))" /> has gradient <Katex tex="\tfrac{y(p)}{p}" />, and for it to be the tangent this must equal <Katex tex="y'(p)" />.</>,
  },
  {
    working: <Katex display tex="\log_e(2p)+\log_e(p-2)=1+\frac{p}{p-2},\quad p>2" />,
    reason: <>Substitute <Katex tex="y(p)" /> and <Katex tex="y'(p)" /> into <Katex tex="y(p)=p\,y'(p)" />; the right side simplifies as <Katex tex="p\left(\tfrac1p+\tfrac{1}{p-2}\right)=1+\tfrac{p}{p-2}" />. This mixes logs and a rational function, so it has no algebraic solution: solve it numerically on CAS.</>,
  },
  {
    working: <Katex display tex="p=4.1931\ldots" />,
    reason: <>On CAS: define <Katex tex="f(x)=\log_e(2x)+\log_e(x-2)" />, then <Cas fn="nSolve" /> the equation <Katex tex="f(x)=x\cdot\tfrac{d}{dx}f(x)" /> for <Katex tex="x" /> with the restriction <Katex tex="x>2" />. There is only one solution in the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{x\approx 4.19}" />,
    reason: <>Round to two decimal places. Matches option <b>D</b>.</>,
    more: <>Check: <Katex tex="y(4.1931\ldots)\approx 2.912" /> and the gradient there is <Katex tex="\approx 0.6945" />; <Katex tex="0.6945\times 4.1931\approx 2.912" />, so the tangent does pass through the origin. Option <b>C</b>, 2.91, is the <Katex tex="y" />-coordinate of the point of contact, not the <Katex tex="x" />-coordinate. Option <b>A</b> comes from combining the logs first (see below).</>,
  },
]

export default function MethodsQ13_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          A tangent line to the graph of <Katex tex="y=\log_e(2x)+\log_e(x-2)" /> passes through the
          origin. The <Katex tex="x" />-coordinate, correct to two decimal places, where the tangent
          line touches the graph is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-0.66" /> },
        { letter: 'B', content: <Katex tex="1.25" /> },
        { letter: 'C', content: <Katex tex="2.91" /> },
        { letter: 'D', content: <Katex tex="4.19" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="6.33" /> },
      ]}
      rows={ROWS}
      extras={
        <WrongMethod
          title="Combine the logs first, then solve"
          working={<Katex display tex="y=\log_e\big(2x(x-2)\big)\ \Rightarrow\ x\approx-0.66" />}
        >
          <Katex tex="\log_e(2x)+\log_e(x-2)=\log_e\big(2x(x-2)\big)" /> only holds where both
          original logs exist. The combined form is also defined for <Katex tex="x<0" /> (where both
          factors are negative), so solving with it turns up an extra root at <Katex tex="x\approx-0.655" />{' '}
          that isn&apos;t on the original graph at all. Always find the domain from the function as
          given, before rewriting it.
        </WrongMethod>
      }
      examinerReport={EXAMINER}
    />
  )
}
