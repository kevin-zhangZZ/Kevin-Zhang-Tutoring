// 2023 Mathematical Methods NHT — Exam 2, MCQ 11. The NHT report gives the answer key only, with
// no statistics; it prints a short worked comment for this question (transcribed below from the
// rendered report). Calculus: product rule with a chain-rule factor inside an exponential.
// Question text transcribed from the original paper. Solution is original; the answer D agrees
// with the report's key, and sympy's derivative of g(x)e^{g(2x)} confirms it.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="u=g(x)" />, <Katex tex="v=e^{g(2x)}" />
      <br />
      <Katex tex="\dfrac{d}{dx}(uv)" />
      <br />
      <Katex tex="=\dfrac{d}{dx}\left[g(x)e^{g(2x)}\right]" />
      <br />
      <Katex tex="=g'(x)e^{g(2x)}+g(x)\times 2g'(2x)e^{g(2x)}" /> using the product and chain rules
      <br />
      <Katex tex="=e^{g(2x)}\left(2g(x)g'(2x)+g'(x)\right)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}(uv)=u'v+uv'" />,
    reason: <>The question wants the derivative of a product of two functions of <Katex tex="x" />, so use the product rule.</>,
  },
  {
    working: <Katex display tex="u=g(x)\ \Rightarrow\ u'=g'(x)" />,
  },
  {
    working: <Katex display tex="\begin{aligned}v=e^{g(2x)}\ \Rightarrow\ v'&=\frac{d}{dx}\big(g(2x)\big)\,e^{g(2x)}\\&=2g'(2x)\,e^{g(2x)}\end{aligned}" />,
    reason: <>Chain rule twice: <Katex tex="e^{\text{(inside)}}" /> differentiates to (derivative of the inside) <Katex tex="\times\, e^{\text{(inside)}}" />, and the inside <Katex tex="g(2x)" /> is itself a composite, so its derivative is <Katex tex="g'(2x)\times 2" />.</>,
    more: <>The 2 comes from differentiating the innermost <Katex tex="2x" />. Dropping it is the easiest slip here: it gives option <b>C</b>.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}(uv)=g'(x)e^{g(2x)}+g(x)\cdot 2g'(2x)e^{g(2x)}" />,
    reason: <>Substitute into <Katex tex="u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{e^{g(2x)}\left(2g(x)g'(2x)+g'(x)\right)}" />,
    reason: <>Factorise out the common <Katex tex="e^{g(2x)}" />. Matches option <b>D</b>.</>,
    more: <>Option <b>C</b> is the same expression without the factor 2 from the inner <Katex tex="2x" />. Option <b>B</b> treats <Katex tex="\tfrac{d}{dx}e^{g(2x)}" /> as <Katex tex="2e^{g(2x)}" />, losing the <Katex tex="g'(2x)" />. Option <b>E</b> has the right first term&apos;s coefficient but writes <Katex tex="e^{g'(2x)}" /> in place of <Katex tex="e^{g(2x)}" />: the exponential keeps its own exponent when differentiated. A quick check: with <Katex tex="g(x)=x^2" />, <Katex tex="uv=x^2e^{4x^2}" /> has derivative <Katex tex="e^{4x^2}(8x^3+2x)" />, and only option D gives that. (Testing with <Katex tex="g(x)=x" /> is too weak: it can&apos;t tell B from D, because then <Katex tex="g'(2x)=1" />.)</>,
  },
]

export default function MethodsQ11_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="u=g(x)" /> and <Katex tex="v=e^{g(2x)}" />, where <Katex tex="g" /> is a
          differentiable function, then <Katex tex="\dfrac{d}{dx}(uv)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3g(x)e^{g(2x)}" /> },
        { letter: 'B', content: <Katex tex="e^{g(2x)}\left(2g(x)+g'(x)\right)" /> },
        { letter: 'C', content: <Katex tex="e^{g(2x)}\left(g(x)g'(2x)+g'(x)\right)" /> },
        { letter: 'D', content: <Katex tex="e^{g(2x)}\left(2g(x)g'(2x)+g'(x)\right)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2g(x)g'(2x)e^{g'(2x)}+e^{g(2x)}g'(x)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
