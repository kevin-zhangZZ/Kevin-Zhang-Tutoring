// 2024 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Gradient of √f(x) at a point, given
// f and f′ there — a chain-rule application without knowing f's actual rule. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 14, C: 27, D: 36 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\tfrac{dy}{dx}=\tfrac12\left(f(x)\right)^{-\frac12}\times f'(x)" />
      <br />
      <Katex tex="=\tfrac12\left(f(4)\right)^{-\frac12}\times f'(4)" />
      <br />
      <Katex tex="=\tfrac{15}{2\times\sqrt{25}}" />
      <br />
      <Katex tex="=\tfrac32" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(4)=25,\qquad f'(4)=15" />,
    reason: <>We aren't told the rule for <Katex tex="f" />, so the answer must come from these two numbers alone.</>,
  },
  {
    working: <Katex display tex="y = \sqrt{f(x)} = \big(f(x)\big)^{1/2}" />,
    reason: <>A square root of a function: write it as a power so the chain rule can be used.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac12\big(f(x)\big)^{-1/2}\cdot f'(x)" />,
    reason: <>Chain rule: bring down the power <Katex tex="\tfrac12" /> and lower it by 1 (to <Katex tex="-\tfrac12" />), then multiply by the derivative of the inside, <Katex tex="f'(x)" />.</>,
    more: <>Here the inside is <Katex tex="u=f(x)" /> and the outside is <Katex tex="y=u^{1/2}" />, so <Katex tex="\tfrac{dy}{dx}=\tfrac{dy}{du}\times\tfrac{du}{dx}=\tfrac12 u^{-1/2}\times f'(x)" />. It is the same step as differentiating <Katex tex="\sqrt{x^2+9}" />; the only difference is that <Katex tex="f'(x)" /> stays as a symbol until we substitute <Katex tex="x=4" />. Equivalently, <Katex tex="\tfrac{dy}{dx}=\dfrac{f'(x)}{2\sqrt{f(x)}}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\bigg|_{x=4} = \frac12\big(25\big)^{-1/2}\times15 = \frac{15}{2\sqrt{25}}" />,
    reason: <>Substitute <Katex tex="f(4)=25" /> and <Katex tex="f'(4)=15" />.</>,
    more: <>Keep every factor: <Katex tex="(25)^{-1/2}=\tfrac15" /> is easy to drop, and dropping it gives <Katex tex="\tfrac{15}{2}" />, option C.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{15}{2\times5} = \frac{15}{10} = \frac32}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Each wrong option is a broken chain rule. <b>C</b> (27%, the most common wrong answer), <Katex tex="\tfrac{15}{2}=\tfrac12\times15" />, leaves out the factor <Katex tex="\left(f(4)\right)^{-1/2}=\tfrac15" />: the power came down as <Katex tex="\tfrac12" /> but the new power, <Katex tex="-\tfrac12" />, was never applied to <Katex tex="f(4)" />. <b>B</b>, <Katex tex="\tfrac1{10}=\tfrac12\times\tfrac15" />, differentiates the outside but forgets to multiply by <Katex tex="f'(4)" />. <b>A</b>, <Katex tex="\sqrt{15}=\sqrt{f'(4)}" />, takes the square root of the derivative, but the derivative of <Katex tex="\sqrt{f(x)}" /> is not <Katex tex="\sqrt{f'(x)}" />.</>,
  },
]

export default function MethodsQ16_2024() {
  return (
    <MCQShell
      question={
        <p>
          Suppose that a differentiable function <Katex tex="f:R\to R" /> and its derivative{' '}
          <Katex tex="f':R\to R" /> satisfy <Katex tex="f(4)=25" /> and <Katex tex="f'(4)=15" />.
          <br />
          Determine the gradient of the tangent line to the graph of <Katex tex="y=\sqrt{f(x)}" /> at{' '}
          <Katex tex="x=4" />.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt{15}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{1}{10}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{15}{2}" /> },
        { letter: 'D', content: <Katex tex="\tfrac32" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
