// 2023 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 22% correct — the
// hardest MCQ on this paper. Gradient of a product f(x)·g(x) at a point, given values of f,
// g and their derivatives there. Question text transcribed from the original paper. Solution
// is original.
// Widget: interactives/meth-2023-mcq11-two-pieces.tsx (shrink h: the chord gradient 24 − 14 + 6h
// becomes the tangent's 10, and the f′ × g′ = 6 piece vanishes).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TwoPiecesWidget = lazyWidget(() => import('../interactives/meth-2023-mcq11-two-pieces'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 13, C: 8, D: 51, E: 22 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\tfrac{d}{dx}\big[f(x)g(x)\big]" />
      <br />
      <Katex tex="=f(x)g'(x)+g(x)f'(x)" />
      <br />
      at <Katex tex="x=-2" />
      <br />
      <Katex tex="=f(-2)g'(-2)+g(-2)f'(-2)" />
      <br />
      <Katex tex="=(-7\times2)+(3\times8)" />
      <br />
      <Katex tex="=10" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="f(-2)=-7,\quad g(-2)=8" />
        <Katex display tex="f'(-2)=3,\quad g'(-2)=2" />
      </>
    ),
    reason: (
      <>
        The gradient of a graph at a point is the value of <Katex tex="\tfrac{dy}{dx}" /> there. We are not given
        rules for <Katex tex="f" /> or <Katex tex="g" />, so the gradient must come from these four values alone.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="y=f(x)g(x)" />
        <Katex display tex="\frac{dy}{dx} = f'(x)g(x) + f(x)g'(x)" />
      </>
    ),
    reason: (
      <>
        <Katex tex="y" /> is a product of two functions of <Katex tex="x" />, so use the product rule,{' '}
        <Katex tex="(uv)'=u'v+uv'" />: differentiate one factor at a time while keeping the other, then add.
      </>
    ),
    more: (
      <>
        It is <i>not</i> <Katex tex="f'(x)g'(x)" />: the derivative of a product is not the product of the derivatives.
        A quick check with <Katex tex="f(x)=g(x)=x" />: then <Katex tex="y=x^2" /> and{' '}
        <Katex tex="\tfrac{dy}{dx}=2x" />, but <Katex tex="f'(x)g'(x)=1\times1=1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\bigg|_{x=-2} = f'(-2)g(-2) + f(-2)g'(-2)" />,
    reason: <>Evaluate the derivative at the point of interest, <Katex tex="x=-2" />.</>,
  },
  {
    working: <Katex display tex="= (3)(8) + (-7)(2) = 24 - 14" />,
    reason: (
      <>
        Substitute the given values. Watch the sign: <Katex tex="f(-2)" /> is negative, so the second term is
        negative.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{10}" />,
    reason: (
      <>
        Matches option <b>E</b>; option <b>D</b>, 6, comes from multiplying the derivatives,{' '}
        <Katex tex="3\times2" />.
      </>
    ),
    more: (
      <>
        A useful habit: when a question hands you the values of the functions as well as their derivatives, expect to
        use all four. Multiplying the derivatives never uses <Katex tex="f(-2)=-7" /> or <Katex tex="g(-2)=8" />, which
        is a sign that something has gone wrong.
      </>
    ),
  },
]

export default function MethodsQ11_2023() {
  return (
    <MCQShell
      question={
        <p>
          Two functions, <Katex tex="f" /> and <Katex tex="g" />, are continuous and differentiable for all{' '}
          <Katex tex="x\in R" />. It is given that <Katex tex="f(-2)=-7" />, <Katex tex="g(-2)=8" /> and{' '}
          <Katex tex="f'(-2)=3" />, <Katex tex="g'(-2)=2" />.
          <br />
          The gradient of the graph <Katex tex="y=f(x)\times g(x)" /> at the point where <Katex tex="x=-2" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-10" /> },
        { letter: 'B', content: <Katex tex="-6" /> },
        { letter: 'C', content: <Katex tex="0" /> },
        { letter: 'D', content: <Katex tex="6" /> },
        { letter: 'E', content: <Katex tex="10" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <Explore title="The gradient is 24 − 14 = 10: f′ × g′ only appears in a piece that shrinks to 0">
          <TwoPiecesWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
