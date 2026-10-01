// 2023 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 29% correct. Number of
// distinct tangents to a quartic that pass through its own positive x-intercept. Question
// text transcribed from the original paper. Solution is original.
// Checked in sympy: the tangent at x = a passes through (1/3, 0) iff 27a⁴ + 54a³ − 18a² − 10a + 3
// = (3a − 1)²(3a² + 8a + 3) = 0, so a = 1/3, (−4 ± √7)/3; gradients 40/9, (20 ∓ 14√7)/9 are all
// different, so three distinct lines (D), agreeing with the report.
// Interactive: meth-2023-mcq14-three-tangents (drag the point of contact along the curve and watch
// where its tangent crosses x = 1/3; it passes through P three times; "Show all three" overlays them).

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
    reason: <>The key idea: a tangent that passes through <Katex tex="P" /> does not have to touch the curve <i>at</i>{' '}
      <Katex tex="P" />. It can touch the curve somewhere else and pass through <Katex tex="P" /> further along. We don&apos;t know where it touches, so call the point of contact <Katex tex="x=a" />; this is the tangent there (point&ndash;gradient form).</>,
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
    reason: <>Rearrange into <Katex tex="y=mx+c" /> form: the gradient is <Katex tex="y'(a)" /> and the constant is <Katex tex="y(a)-a\,y'(a)" />, which simplifies nicely once <Katex tex="a\,y'(a)" /> is expanded.</>,
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
    reason: <>On CAS, <Cas fn="solve">solve(27a^4+54a^3-18a^2-10a+3=0, a)</Cas> gives the three solutions straight away. By hand: <Katex tex="a=\tfrac13" /> has to be a solution, because the tangent at <Katex tex="P" /> itself passes through <Katex tex="P" />, so <Katex tex="(3a-1)" /> is a factor; here it is a repeated factor (expand to check). A repeated factor still gives only one value, <Katex tex="a=\tfrac13" />: one point of contact, one tangent.</>,
  },
  {
    working: (
      <>
        <Katex display tex="3a^2+8a+3=0" />
        <Katex display tex="a = \frac{-8\pm\sqrt{64-36}}{6} = \frac{-8\pm2\sqrt7}{6} = \frac{-4\pm\sqrt7}{3}" />
      </>
    ),
    reason: <>Solve the quadratic factor with the quadratic formula; <Katex tex="\sqrt{28}=2\sqrt7" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{array}{c|c} a & y'(a) \\ \hline \tfrac13 & \tfrac{40}{9} \\[4pt] \tfrac{-4+\sqrt7}{3}\approx-0.451 & \tfrac{20-14\sqrt7}{9}\approx-1.89 \\[4pt] \tfrac{-4-\sqrt7}{3}\approx-2.215 & \tfrac{20+14\sqrt7}{9}\approx6.34 \end{array}"
      />
    ),
    reason: <>Each value of <Katex tex="a" /> is a point where a tangent through <Katex tex="P" /> touches the curve. Two different points of contact could in principle share one line (a line can touch a quartic twice), so compare the gradients: all three are different, so these are three different lines.</>,
  },
  {
    working: <Katex display tex="\boxed{3 \text{ tangents}}" />,
    reason: <>Matches option <b>D</b>. Counting only the tangent at <Katex tex="P" /> itself gives <Katex tex="1" /> (option B); counting only the two tangents that touch the curve elsewhere gives <Katex tex="2" /> (option C).</>,
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
