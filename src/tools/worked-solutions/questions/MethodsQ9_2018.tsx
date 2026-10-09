// 2018 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 57% correct. The
// y-intercept of the tangent to y = log_e(2x) with gradient 2. Question text transcribed from
// the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Answer checked with sympy; C agrees with the report and itute. Solution is original.
// Interactive: meth-2018-mcq9-tangent (slide the point of contact P: gradient 1/x₀ is 2 at
// x₀ = 1/2, where P = (1/2, 0), but the tangent crosses the y-axis at Q = (0, −1); a toggle
// overlays y = log_e(x) to show why the 2 cancels in the derivative). WrongMethod: option A,
// the height of the point of contact (15% chose A; computed to give exactly 0). Option D's slip
// (y-value taken as log_e(1/2)) was computed to give exactly −1 − log_e(2). B and E match no
// slip we could reproduce (dy/dx taken as 2/x or 1/(2x) gives −1.31 and −1.19), so they are not named.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TangentWidget = lazyWidget(() => import('../interactives/meth-2018-mcq9-tangent'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 9, C: 57, D: 11, E: 7 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="y = \log_e(2x)" />
        <Katex display tex="\frac{dy}{dx} = \frac{2}{2x} = \frac1x" />
      </>
    ),
    reason: <>Chain rule: the derivative of <Katex tex="\log_e(u)" /> is <Katex tex="\tfrac{u'}{u}" />, and here <Katex tex="u=2x" /> so the two <Katex tex="2" />s cancel. Worth noticing: <Katex tex="\log_e(2x)=\log_e(2)+\log_e(x)" /> is just <Katex tex="\log_e(x)" /> shifted up by a constant, so it must have the same derivative.</>,
  },
  {
    working: <Katex display tex="\frac1x = 2 \implies x = \frac12" />,
    reason: <>How would I know to start here? The question tells us the tangent's gradient but not where it touches the curve, and a tangent needs a point. So work backwards: set the gradient function equal to <Katex tex="2" /> to find the <Katex tex="x" />-value of the point of contact. On CAS: <Cas fn="solve">solve(d/dx(ln(2x)) = 2, x)</Cas>.</>,
  },
  {
    working: <Katex display tex="y = \log_e\!\left(2\times\tfrac12\right) = \log_e(1) = 0" />,
    reason: <>Substitute into the curve's own rule (not the derivative) to get the <Katex tex="y" />-coordinate. The point of contact is <Katex tex="\left(\tfrac12,\,0\right)" />, on the <Katex tex="x" />-axis, which is what keeps the arithmetic clean.</>,
  },
  {
    working: <Katex display tex="y - 0 = 2\left(x-\tfrac12\right)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> with <Katex tex="m=2" /> through that point.</>,
  },
  {
    working: <Katex display tex="y = 2x - 1" />,
    reason: <>Expanding. In the form <Katex tex="y=mx+c" />, the constant <Katex tex="c" /> is the value of <Katex tex="y" /> when <Katex tex="x=0" />, which is where the line crosses the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="\boxed{y\text{-intercept} = -1}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> <Katex tex="(0)" />, chosen by <Katex tex="15\%" />, is the height of the point of contact. Option <b>D</b> <Katex tex="\left(-1-\log_e(2)\right)" /> finds the right point of contact, <Katex tex="x=\tfrac12" />, but evaluates its <Katex tex="y" />-value as <Katex tex="\log_e\left(\tfrac12\right)" /> instead of <Katex tex="\log_e\left(2\times\tfrac12\right)=0" />.</>,
    more: <>For option <b>A</b>, see the box below.</>,
  },
]

export default function MethodsQ9_2018() {
  return (
    <MCQShell
      question={
        <p>
          A tangent to the graph of <Katex tex="y=\log_e(2x)" /> has a gradient of{' '}
          <Katex tex="2" />. This tangent will cross the <Katex tex="y" />-axis at
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="-0.5" /> },
        { letter: 'C', content: <Katex tex="-1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-1-\log_e(2)" /> },
        { letter: 'E', content: <Katex tex="-2\log_e(2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="A tangent needs a point and a gradient">
          <p>
            Every tangent-line question comes down to the same two ingredients: the point of contact{' '}
            <Katex tex="(x_1,y_1)" /> on the curve and the gradient <Katex tex="m" /> there, which is the
            derivative at <Katex tex="x_1" />. Usually you are given the point and find the gradient.
          </p>
          <p>
            Here it is the other way round: the gradient is given, so you solve{' '}
            <Katex tex="\tfrac{dy}{dx}=m" /> for <Katex tex="x_1" />, then use the curve for{' '}
            <Katex tex="y_1" />. The point of contact is only a stepping stone; the question asks about a
            different point on the line, where it meets the <Katex tex="y" />-axis.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Slide the tangent: gradient 2 touches at (½, 0) but crosses the y-axis at −1">
            <TangentWidget />
          </Explore>
          <WrongMethod
            title="The tangent touches at y = 0, so it crosses at 0"
            source="15% chose A"
            working={<Katex display tex="x=\tfrac12 \implies y=\log_e(1)=0" />}
          >
            <p>
              That <Katex tex="0" /> is the height of the point of contact{' '}
              <Katex tex="\left(\tfrac12,0\right)" />, which lies on the <Katex tex="x" />-axis, not the{' '}
              <Katex tex="y" />-axis. The question asks where the tangent <em>line</em> crosses the{' '}
              <Katex tex="y" />-axis, which is a different point on it: put <Katex tex="x=0" /> into the
              line's equation <Katex tex="y=2x-1" />. To catch it, always finish a tangent question by writing
              the line's equation, then read off exactly what was asked.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
