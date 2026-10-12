// 2018 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 45% correct.
// Minimise the distance from the origin to the turning point of a parameterised parabola.
// Question text transcribed from the original paper; VCAA printed no diagram and neither does
// the stem here (guide §7). Answer checked with sympy (D² = b⁴ − b² + 1, stationary at b = 0 and
// b = ±1/√2; D²(0) = D²(±1) = 1, D²(±1/√2) = 3/4). itute agrees (C). The VCAA report prints no
// comment for this question. Distractors verified: A (17%) is the stationary point b = 0, which is
// a local maximum of D²; B puts the turning point at (±1, 0), still distance 1; D takes
// 2b² − 1 = 0 to b = ±1/2 without the square root. E (b = ±1/4) has D² = 241/256, no clean slip.
// Interactive (§15): interactives/meth-2018-mcq17-closest-turning-point.tsx slides b, shows the
// turning point riding along y = 1 − x² with a circle about O through it, plus D² against b.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const ClosestWidget = lazyWidget(() => import('../interactives/meth-2018-mcq17-closest-turning-point'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 16, C: 45, D: 14, E: 8 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^2 - 2bx + 1 = (x-b)^2 + 1 - b^2" />,
    reason: <>It&apos;s the <em>turning point</em> that must be close to the origin, so first find it in terms of <Katex tex="b" />. Completing the square reads it straight off.</>,
    more: <>Read the question carefully: it is not asking for the point of the parabola nearest the origin. Calculus works too: <Katex tex="\tfrac{dy}{dx}=2x-2b=0" /> gives <Katex tex="x=b" />.</>,
  },
  {
    working: <Katex display tex="\text{Turning point } \left(b,\ 1-b^2\right)" />,
    reason: <>From <Katex tex="(x-h)^2+k" /> form, the turning point is <Katex tex="(h,k)" />, here <Katex tex="h=b" /> and <Katex tex="k=1-b^2" />.</>,
    more: <>As <Katex tex="b" /> varies, this point traces its own curve, the downward parabola <Katex tex="y=1-x^2" />. The question is which point on <em>that</em> curve is nearest the origin.</>,
  },
  {
    working: <Katex display tex="D^2 = b^2 + \left(1-b^2\right)^2" />,
    reason: <>Distance from the origin, squared (Pythagoras). Minimising <Katex tex="D^2" /> gives the same <Katex tex="b" /> as minimising <Katex tex="D" />, without a square root.</>,
    more: <>Since <Katex tex="D\ge0" />, <Katex tex="D" /> is smallest exactly when <Katex tex="D^2" /> is smallest. This is a standard and expected simplification.</>,
  },
  {
    working: <Katex display tex="D^2 = b^2 + 1 - 2b^2 + b^4 = b^4 - b^2 + 1" />,
    reason: <>Expanding. Only even powers survive, which is why the answer comes in a <Katex tex="\pm" /> pair.</>,
  },
  {
    working: <Katex display tex="\frac{d\left(D^2\right)}{db} = 4b^3 - 2b = 2b\left(2b^2-1\right)" />,
    reason: <>Differentiate with respect to <Katex tex="b" />, the variable being chosen, not <Katex tex="x" />. On CAS, define <Katex tex="d(b)=b^4-b^2+1" /> and use <Cas fn="solve" /> on its derivative equal to zero.</>,
  },
  {
    working: <Katex display tex="2b\left(2b^2-1\right) = 0 \implies b = 0 \ \text{ or } \ b = \pm\frac{1}{\sqrt2}" />,
    reason: <>Three stationary points (values of <Katex tex="b" />). A zero derivative only finds candidates, so test each.</>,
    more: <>From <Katex tex="2b^2-1=0" />: <Katex tex="b^2=\tfrac12" />, so <Katex tex="b=\pm\sqrt{\tfrac12}=\pm\tfrac{1}{\sqrt2}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="b=0: \ D^2 = 1" />
        <Katex display tex="b=\pm\tfrac{1}{\sqrt2}: \ D^2 = \tfrac14-\tfrac12+1 = \tfrac34" />
      </>
    ),
    reason: <>Substitute each candidate. <Katex tex="b=\pm\tfrac{1}{\sqrt2}" /> gives the smaller distance, <Katex tex="D=\tfrac{\sqrt3}{2}\approx0.87" />, against <Katex tex="1" /> at <Katex tex="b=0" />.</>,
    more: <><Katex tex="\tfrac34" /> is the overall minimum, not just a local one: <Katex tex="D^2=\left(b^2-\tfrac12\right)^2+\tfrac34\ge\tfrac34" /> for every <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = -\frac{1}{\sqrt2} \ \text{ or } \ b = \frac{1}{\sqrt2}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>A</b> <Katex tex="(b=0)" /> gives <Katex tex="D=1" />, the larger value. Option <b>B</b> <Katex tex="(b=\pm1)" /> puts the turning point on the <Katex tex="x" />-axis at <Katex tex="(\pm1,0)" />, but that is still <Katex tex="1" /> unit away. Option <b>D</b> <Katex tex="\left(\pm\tfrac12\right)" /> comes from solving <Katex tex="2b^2-1=0" /> as <Katex tex="b^2=\tfrac12 \Rightarrow b=\pm\tfrac12" />, forgetting the square root. Option <b>E</b> <Katex tex="\left(\pm\tfrac14\right)" /> gives <Katex tex="D^2=\tfrac{241}{256}\approx0.94" />, closer than <Katex tex="1" /> but not as close as <Katex tex="\tfrac34" />.</>,
  },
]

export default function MethodsQ17_2018() {
  return (
    <MCQShell
      question={
        <p>
          The turning point of the parabola <Katex tex="y=x^2-2bx+1" /> is closest to the
          origin when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="b=0" /> },
        { letter: 'B', content: <Katex tex="b=-1 \ \text{or} \ b=1" /> },
        { letter: 'C', content: <Katex tex="b=-\dfrac{1}{\sqrt2} \ \text{or} \ b=\dfrac{1}{\sqrt2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="b=\dfrac12 \ \text{or} \ b=-\dfrac12" /> },
        { letter: 'E', content: <Katex tex="b=\dfrac14 \ \text{or} \ b=-\dfrac14" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The turning point rides along y = 1 − x²: where is that path nearest O?">
            <ClosestWidget />
          </Explore>
          <WrongMethod
            title="The derivative is zero at b = 0, so b = 0 is the answer"
            source="17% chose A"
            working={
              <>
                <Katex display tex="\frac{d\left(D^2\right)}{db}=4b^3-2b=0 \text{ at } b=0" />
                <Katex display tex="\implies b=0 \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              Setting the derivative to zero finds <em>all</em> the stationary points, and here there are three. At{' '}
              <Katex tex="b=0" />, <Katex tex="D^2=1" />, but at{' '}
              <Katex tex="b=\pm\tfrac{1}{\sqrt2}" /> it is <Katex tex="\tfrac34" />, which is smaller. So <Katex tex="b=0" /> is
              the top of a hump in <Katex tex="D^2" />, a local maximum. Always substitute every candidate (or check the
              sign of <Katex tex="\tfrac{d^2(D^2)}{db^2}=12b^2-2" />, which is <Katex tex="-2" /> at <Katex tex="b=0" />).
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
      background={
        <Background title="Two variables, and only one of them is being optimised">
          <p>
            There is an <Katex tex="x" /> in the equation and a <Katex tex="b" /> in the
            answer, and it matters which is which. For each fixed <Katex tex="b" /> the
            parabola has one turning point; <Katex tex="b" /> is then varied to move that
            point around. So the differentiation at the end is with respect to{' '}
            <Katex tex="b" />, after <Katex tex="x" /> has already been eliminated.
          </p>
        </Background>
      }
    />
  )
}
