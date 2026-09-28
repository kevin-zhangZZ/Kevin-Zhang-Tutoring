// 2019 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 55% correct (no comment
// in the report for this question). The derivative of an inverse function at a point, via the
// reciprocal-gradient relationship. Question text transcribed from the original paper (no
// diagram). Solution is original; answer agrees with itute. Interactive: meth-2019-mcq15-reciprocal
// (tangent at (a, f(a)) and its mirror image in y = x, with the rise/run legs swapping; a toggle
// shows f's gradient copied onto g cutting across it). WrongMethods: g(7) = 5 (B, 26%); the inverse
// found from (x − 2)² with the −2 dropped (C, 8%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ReciprocalWidget = lazyWidget(() => import('../interactives/meth-2019-mcq15-reciprocal'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 55, B: 26, C: 8, D: 5, E: 4 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g=f^{-1} \text{ and } f(5)=7 \implies g(7)=5" />,
    reason: <>An inverse undoes its function: if <Katex tex="f" /> sends <Katex tex="5" /> to <Katex tex="7" />, then <Katex tex="g" /> sends <Katex tex="7" /> back to <Katex tex="5" />. That is why the question hands you <Katex tex="f(5)=7" />: it tells you which point of <Katex tex="f" /> matches the point of <Katex tex="g" /> at <Katex tex="x=7" />.</>,
  },
  {
    working: <Katex display tex="\text{Graph of } g \text{ is the graph of } f \text{ reflected in } y=x" />,
    reason: <>Reflecting in <Katex tex="y=x" /> swaps the coordinates of every point, so the tangent at <Katex tex="(5,\,7)" /> on <Katex tex="f" /> becomes the tangent at <Katex tex="(7,\,5)" /> on <Katex tex="g" />, with its rise and run swapped. A gradient of <Katex tex="m=\tfrac{\text{rise}}{\text{run}}" /> becomes <Katex tex="\tfrac{\text{run}}{\text{rise}}=\tfrac1m" />: the reciprocal, not the negative reciprocal (the tangents are mirror images, not perpendicular).</>,
  },
  {
    working: <Katex display tex="g'(7) = \dfrac{1}{f'\bigl(g(7)\bigr)} = \dfrac{1}{f'(5)}" />,
    reason: <>The inverse-function derivative rule, <Katex tex="\tfrac{dx}{dy}=\tfrac{1}{dy/dx}" />, written for this point. The gradient of <Katex tex="g" /> at <Katex tex="x=7" /> is controlled by the gradient of <Katex tex="f" /> at the <em>matching</em> point <Katex tex="x=5" />, not at <Katex tex="x=7" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x-4 \implies f'(5) = 2(5)-4 = 6" />,
    reason: <>Differentiate <Katex tex="f" /> and evaluate at the matching point. There is no need to find the rule for <Katex tex="g" />. If you do, check it carefully: <Katex tex="f(x)=(x-2)^2-2" /> gives <Katex tex="g(x)=2+\sqrt{x+2}" />, so <Katex tex="g'(7)=\tfrac{1}{2\sqrt9}=\tfrac16" />, the same answer the long way.</>,
  },
  {
    working: <Katex display tex="\boxed{g'(7) = \dfrac16}" />,
    reason: <>Matches option <b>A</b>. The distractors are the common slips: <b>B</b> <Katex tex="(5)" /> is <Katex tex="g(7)" />, the value rather than the gradient; <b>D</b> <Katex tex="(6)" /> is <Katex tex="f'(5)" /> without the reciprocal; <b>E</b> <Katex tex="\left(\tfrac17\right)" /> is <Katex tex="\tfrac{1}{f(5)}" />, the reciprocal of the function value rather than of the gradient; <b>C</b> <Katex tex="\left(\tfrac{\sqrt7}{14}\right)" /> comes from a wrong inverse rule (see below).</>,
  },
]

export default function MethodsQ15_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:[2,\infty)\to R,\ f(x)=x^2-4x+2" /> and <Katex tex="f(5)=7" />.
          The function <Katex tex="g" /> is the inverse function of <Katex tex="f" />.{' '}
          <Katex tex="g'(7)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac16" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="5" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\sqrt7}{14}" /> },
        { letter: 'D', content: <Katex tex="6" /> },
        { letter: 'E', content: <Katex tex="\dfrac17" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why the inverse's gradient is the reciprocal: reflection swaps rise and run">
            <ReciprocalWidget />
          </Explore>
          <WrongMethod
            title="f(5) = 7, so g(7) = 5 — the answer is 5"
            source="26% chose B"
            working={<Katex display tex="g(7) = 5 \qquad (\text{B})" />}
          >
            That is the <em>point</em> <Katex tex="(7,\,5)" /> on <Katex tex="g" />, not its gradient. The dash in{' '}
            <Katex tex="g'(7)" /> asks for the slope of the tangent there, so the answer has to come out of a derivative.
            Finding <Katex tex="g(7)=5" /> is only the first step: it tells you where on <Katex tex="f" /> to measure the
            gradient you then take the reciprocal of.
          </WrongMethod>
          <WrongMethod
            title="Complete the square as (x − 2)², so g(x) = 2 + √x"
            source="8% chose C"
            working={
              <>
                <Katex display tex="g(x)=2+\sqrt x \implies g'(x)=\dfrac{1}{2\sqrt x}" />
                <Katex display tex="g'(7)=\dfrac{1}{2\sqrt7}=\dfrac{\sqrt7}{14} \qquad (\text{C})" />
              </>
            }
          >
            <Katex tex="(x-2)^2 = x^2-4x+4" />, so <Katex tex="f(x)=(x-2)^2-2" />: the <Katex tex="-2" /> was dropped.
            The correct inverse is <Katex tex="g(x)=2+\sqrt{x+2}" />, giving{' '}
            <Katex tex="g'(7)=\tfrac{1}{2\sqrt9}=\tfrac16" />. The catch: test the inverse on the given point.{' '}
            <Katex tex="2+\sqrt7\neq5" />, whereas <Katex tex="2+\sqrt{7+2}=5" />. Better still, skip finding the
            inverse and use <Katex tex="g'(7)=\tfrac{1}{f'(5)}" />.
          </WrongMethod>
        </>
      }
    />
  )
}
