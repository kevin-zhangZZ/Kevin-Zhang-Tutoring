// 2023 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 29% correct. Number of
// distinct tangents to a quartic that pass through its own positive x-intercept. Question
// text transcribed from the original paper. Solution is original.
// Checked in sympy: the tangent at x = a passes through (1/3, 0) iff 27a⁴ + 54a³ − 18a² − 10a + 3
// = (3a − 1)²(3a² + 8a + 3) = 0, so a = 1/3, (−4 ± √7)/3; gradients 40/9, (20 ∓ 14√7)/9 are all
// different, so three distinct lines (D), agreeing with the report.
// Interactive: meth-2023-mcq14-three-tangents (drag the point of contact along the curve and watch
// where its tangent crosses x = 1/3; it passes through P three times; "Show all three" overlays them).
// Oct 2026 Concise/Detailed pass: reasons trimmed to the step itself; the B trap, the by-hand
// factorisation, a graphical check, the double-tangent check and the option analysis moved to `more`.
// Final review: row 7's reason now explains the factorised line (by hand, CAS solve() as the
// shortcut); the division detail stays in `more`. Checked: quartic = (3a − 1)(9a³ + 21a² + a − 3).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const ThreeTangentsWidget = lazyWidget(() => import('../interactives/meth-2023-mcq14-three-tangents'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 33, C: 22, D: 29, E: 10 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="y=x(3x-1)(x+3)(x+1)" />
      <br />
      The positive <Katex tex="x" />-intercept is <Katex tex="\tfrac13" />.
      <br />
      Find the tangent line at <Katex tex="x=a" />.
      <br />
      <Katex tex="y_T=\left(12a^3+33a^2+10a-3\right)x-a^2\left(9a^2+22a+5\right)" />
      <br />
      Solve <Katex tex="y_T\left(\tfrac13\right)=0" /> for <Katex tex="a" />.
      <br />
      <Katex tex="a=\tfrac{-\sqrt7-4}{3}" />, <Katex tex="a=\tfrac{\sqrt7-4}{3}" /> or{' '}
      <Katex tex="a=\tfrac13" />
      <br />
      Hence there are three solutions.
      <br />
      Alternatively, a graphical approach could be taken.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x(3x-1)(x+3)(x+1)" />,
    reason: <>Read the <Katex tex="x" />-intercepts off the factors: <Katex tex="x=0,\ \tfrac13,\ -3,\ -1" />. The only positive one is <Katex tex="x=\tfrac13" />, so every tangent we count must pass through <Katex tex="P\big(\tfrac13,0\big)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="y = 3x^4+11x^3+5x^2-3x" />
        <Katex display tex="\frac{dy}{dx} = 12x^3+33x^2+10x-3" />
      </>
    ),
    reason: <>Expand so the curve can be differentiated term by term. Write <Katex tex="y'(x)" /> for this derivative, so <Katex tex="y(a)" /> and <Katex tex="y'(a)" /> are the curve&apos;s height and gradient at <Katex tex="x=a" />.</>,
  },
  {
    working: <Katex display tex="y - y(a) = y'(a)\,(x-a)" />,
    reason: <>A tangent that passes through <Katex tex="P" /> need not touch the curve <i>at</i>{' '}
      <Katex tex="P" />: it can touch the curve somewhere else and pass through <Katex tex="P" /> further along. So call the unknown point of contact <Katex tex="x=a" /> and write the tangent there (point&ndash;gradient form).</>,
    more: (
      <>
        This is the step the question tests. Leaving the point of contact as an unknown <Katex tex="a" />, rather than
        assuming it is <Katex tex="P" />, lets the algebra find every point of the curve whose tangent passes through{' '}
        <Katex tex="P" />, all at once. The interactive below lets you slide the point of contact along the curve and
        watch its tangent sweep past <Katex tex="P" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="y = y'(a)\,x + \big[y(a)-a\,y'(a)\big]" />
        <Katex display tex="y(a)-a\,y'(a) = \big(3a^4+11a^3+5a^2-3a\big)" />
        <Katex display tex="\qquad\qquad -\big(12a^4+33a^3+10a^2-3a\big)" />
        <Katex display tex="= -9a^4-22a^3-5a^2 = -a^2\big(9a^2+22a+5\big)" />
        <Katex display tex="y_T = \big(12a^3+33a^2+10a-3\big)x" />
        <Katex display tex="\qquad - a^2\big(9a^2+22a+5\big)" />
      </>
    ),
    reason: <>Rearrange into <Katex tex="y=mx+c" /> form and call this tangent <Katex tex="y_T" />: the gradient is <Katex tex="y'(a)" /> and the constant is <Katex tex="y(a)-a\,y'(a)" />. The second bracket is <Katex tex="a\,y'(a)" /> expanded.</>,
    more: (
      <>
        The <Katex tex="-3a" /> terms cancel and every term left has a factor of <Katex tex="a^2" />, which is why the
        constant factorises so neatly.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="y_T\big(\tfrac13\big) = \tfrac13\big(12a^3+33a^2+10a-3\big)" />
        <Katex display tex="\qquad - a^2\big(9a^2+22a+5\big) = 0" />
      </>
    ),
    reason: <>The tangent passes through <Katex tex="P\big(\tfrac13,0\big)" />, so <Katex tex="x=\tfrac13" />, <Katex tex="y=0" /> must satisfy its equation. That leaves one equation in the one unknown, <Katex tex="a" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="12a^3+33a^2+10a-3" />
        <Katex display tex="\qquad -27a^4-66a^3-15a^2 = 0" />
        <Katex display tex="27a^4+54a^3-18a^2-10a+3 = 0" />
      </>
    ),
    reason: <>Multiply both sides by <Katex tex="3" /> to clear the fraction, expand, collect like terms, then multiply through by <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="(3a-1)^2\big(3a^2+8a+3\big) = 0" />,
    reason: <>Factorise. <Katex tex="a=\tfrac13" /> must be a solution, because the tangent at <Katex tex="P" /> itself passes through <Katex tex="P" />, so <Katex tex="(3a-1)" /> is a factor; here it is a repeated factor (expand to check). The repeated factor gives only one value, <Katex tex="a=\tfrac13" />: one point of contact, one tangent. On CAS, <Cas fn="solve">solve(27a^4+54a^3-18a^2-10a+3=0, a)</Cas> gives all three solutions at once.</>,
    more: (
      <>
        Finding the repeated factor by hand: dividing the quartic by <Katex tex="(3a-1)" /> leaves{' '}
        <Katex tex="9a^3+21a^2+a-3" />, and <Katex tex="a=\tfrac13" /> is a solution of that too, so{' '}
        <Katex tex="(3a-1)" /> divides out a second time, leaving the quadratic <Katex tex="3a^2+8a+3" />. A
        graphical check: graph <Katex tex="27a^4+54a^3-18a^2-10a+3" /> against <Katex tex="a" /> on CAS. It touches
        the axis at <Katex tex="a=\tfrac13" /> and crosses it at two other places, so there are three different
        values of <Katex tex="a" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="3a^2+8a+3=0" />
        <Katex display tex="a = \frac{-8\pm\sqrt{64-36}}{6} = \frac{-8\pm2\sqrt7}{6} = \frac{-4\pm\sqrt7}{3}" />
      </>
    ),
    reason: <>The quadratic factor gives the other two solutions: use the quadratic formula, with <Katex tex="\sqrt{28}=2\sqrt7" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{array}{c|c} a & y'(a) \\ \hline \tfrac13 & \tfrac{40}{9} \\[4pt] \tfrac{-4+\sqrt7}{3}\approx-0.451 & \tfrac{20-14\sqrt7}{9}\approx-1.89 \\[4pt] \tfrac{-4-\sqrt7}{3}\approx-2.215 & \tfrac{20+14\sqrt7}{9}\approx6.34 \end{array}"
      />
    ),
    reason: <>Each value of <Katex tex="a" /> is the point of contact of a tangent through <Katex tex="P" />; substitute it into <Katex tex="y'(a)" /> for that tangent&apos;s gradient. The three gradients are all different, so these are three different lines.</>,
    more: (
      <>
        Why check the gradients? One line can touch a quartic at two different points. If that happened here, two
        values of <Katex tex="a" /> would describe the same line, and it would count only once. Three different
        gradients rule that out.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{3 \text{ tangents}}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: (
      <>
        Counting only the tangent at <Katex tex="P" /> itself gives <Katex tex="1" /> (option B, the most common
        answer, chosen by 33% of students). Counting only the two tangents that touch the curve elsewhere gives <Katex tex="2" /> (option C).
        Counting the repeated solution <Katex tex="a=\tfrac13" /> twice gives <Katex tex="4" /> (option E). Option A is impossible: the tangent at{' '}
        <Katex tex="P" /> always passes through <Katex tex="P" />.
      </>
    ),
  },
]

export default function MethodsQ14_2023() {
  return (
    <MCQShell
      question={
        <p>
          A polynomial has the equation <Katex tex="y=x(3x-1)(x+3)(x+1)" />.
          <br />
          The number of tangents to this curve that pass through the positive <Katex tex="x" />-intercept is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="The tangent at the intercept is only one of three">
          <ThreeTangentsWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
