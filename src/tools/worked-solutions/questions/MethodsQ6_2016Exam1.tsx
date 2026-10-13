// 2016 Mathematical Methods — Exam 1, Question 6 (5 marks).
// Average rate of change and average value of 2sin(2x) − 1 over the same interval — two
// different averages, deliberately side by side. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Interactives (both parts under 40% full marks): (a) meth-2016e1-q6a-chord — the endpoints, the
// chord, and why averaging the endpoint derivatives fails; (b) meth-2016e1-q6b-rectangle — the
// average value as the height of an equal-area rectangle, with the report's dropped −1 as a toggle.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const ChordWidget = lazyWidget(() => import('../interactives/meth-2016e1-q6a-chord'))
const RectangleWidget = lazyWidget(() => import('../interactives/meth-2016e1-q6b-rectangle'))

const EXAM_A: SAExaminerStats = {
  marks: [37, 31, 32],
  average: 1.0,
  comment: (
    <>
      Most students used the correct gradient rule but erred when evaluating, particularly{' '}
      <Katex tex="f\!\left(-\tfrac{\pi}{3}\right)" /> or in dealing with fractions in the
      denominator. A few students confused average rate of change with average value, and
      some incorrectly found the average of derivatives.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [31, 23, 30, 16],
  average: 1.3,
  comment: (
    <>
      Most students used the correct expression for average value. As with the previous part
      of the question, arithmetic errors, especially when substituting the terminals, caused
      difficulties. Some students omitted the <Katex tex="-1" /> in the integrand, while
      others misplaced negative signs or the constant of <Katex tex="2" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f\!\left(-\frac{\pi}{3}\right) = 2\sin\!\left(-\frac{2\pi}{3}\right)-1" />,
    reason: <>Substitute <Katex tex="x=-\tfrac{\pi}{3}" />, doubling the input inside the sine: <Katex tex="2\times\left(-\tfrac{\pi}{3}\right)=-\tfrac{2\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="= 2\left(-\frac{\sqrt3}{2}\right)-1 = -\sqrt3-1" />,
    reason: <><Katex tex="-\tfrac{2\pi}{3}" /> is in the third quadrant with reference angle <Katex tex="\tfrac{\pi}{3}" />, so its sine is negative: <Katex tex="-\tfrac{\sqrt3}{2}" />.</>,
    more: (
      <>
        The report says most students erred when evaluating, particularly at this point. The usual slips are the sign (writing{' '}
        <Katex tex="+\tfrac{\sqrt3}{2}" />) and the value (writing <Katex tex="\tfrac12" />, which belongs to the cosine).
        A quick route: sine is odd, so <Katex tex="\sin\left(-\tfrac{2\pi}{3}\right)=-\sin\tfrac{2\pi}{3}=-\tfrac{\sqrt3}{2}" />.
        A check: a negative sine puts this point below the graph's midline <Katex tex="y=-1" />, and{' '}
        <Katex tex="-\sqrt3-1\approx-2.73" /> is.
      </>
    ),
  },
  {
    working: <Katex display tex="f\!\left(\frac{\pi}{6}\right) = 2\sin\!\left(\frac{\pi}{3}\right)-1 = \sqrt3-1" />,
    reason: <><Katex tex="2\times\tfrac{\pi}{6}=\tfrac{\pi}{3}" />, in the first quadrant, and <Katex tex="\sin\tfrac{\pi}{3}=\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="\text{rate} = \frac{\left(\sqrt3-1\right)-\left(-\sqrt3-1\right)}{\frac{\pi}{6}-\left(-\frac{\pi}{3}\right)}" />,
    reason: <>Average rate of change <Katex tex="=\dfrac{f(b)-f(a)}{b-a}" />, the gradient of the chord joining the endpoints. Keep the brackets.</>,
    more: (
      <>
        The report notes that a few students found the average <em>value</em> instead (that is part (b), an integral), and
        some averaged the derivatives. Averaging the gradients at the two ends fails badly here:{' '}
        <Katex tex="f'(x)=4\cos(2x)" /> gives <Katex tex="f'\left(-\tfrac{\pi}{3}\right)=-2" /> and{' '}
        <Katex tex="f'\left(\tfrac{\pi}{6}\right)=2" />, which average to <Katex tex="0" />, nowhere near the chord's
        gradient. An average rate of change uses only the two function values.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{2\sqrt3}{\frac{\pi}{2}}" />,
    reason: <>Numerator: <Katex tex="\sqrt3-(-\sqrt3)=2\sqrt3" />; the <Katex tex="-1" />s cancel. Denominator: <Katex tex="\tfrac{\pi}{6}+\tfrac{\pi}{3}=\tfrac{\pi}{6}+\tfrac{2\pi}{6}=\tfrac{\pi}{2}" />.</>,
    more: (
      <>
        The report also mentions slips with the fractions in the denominator. Subtracting a negative becomes adding, and the
        thirds must become sixths before they can be added.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{4\sqrt3}{\pi}}" />,
    reason: <>Dividing by <Katex tex="\tfrac{\pi}{2}" /> means multiplying by <Katex tex="\tfrac{2}{\pi}" />. About <Katex tex="2.21" />.</>,
    more: (
      <>
        Sanity check: the graph goes from about <Katex tex="-2.73" /> up to about <Katex tex="0.73" /> over a run of
        about <Katex tex="1.57" />, so a positive gradient a little over <Katex tex="2" /> is right.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value} = \frac{1}{b-a}\int_a^b f(x)\,dx" />,
    reason: <>The average value formula: the mean <em>height</em> of the graph, not the mean gradient of part (a).</>,
  },
  {
    working: <Katex display tex="b-a = \frac{\pi}{6}-\left(-\frac{\pi}{3}\right) = \frac{\pi}{2}" />,
    reason: <>The same interval width as part (a).</>,
  },
  {
    working: <Katex display tex="\int\bigl(2\sin(2x)-1\bigr)dx = -\cos(2x)-x" />,
    reason: <>Using <Katex tex="\int\sin(kx)\,dx=-\tfrac1k\cos(kx)" />: <Katex tex="2\times\left(-\tfrac12\cos(2x)\right)=-\cos(2x)" />. The <Katex tex="-1" /> integrates to <Katex tex="-x" />.</>,
    more: (
      <>
        The report says some students omitted the <Katex tex="-1" /> in the integrand and others misplaced the constant{' '}
        <Katex tex="2" />. Without the <Katex tex="-1" /> the integral is <Katex tex="-1" /> and the "average" is{' '}
        <Katex tex="-\tfrac{2}{\pi}" />, exactly <Katex tex="1" /> too high. A misplaced <Katex tex="2" /> typically
        looks like <Katex tex="-2\cos(2x)" /> (forgetting to divide by the <Katex tex="2" /> inside the sine). Check any
        antiderivative by differentiating: <Katex tex="\tfrac{d}{dx}\left(-\cos(2x)-x\right)=2\sin(2x)-1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\Bigl[-\cos(2x)-x\Bigr]_{-\pi/3}^{\pi/6} = \left(-\frac12-\frac{\pi}{6}\right)-\left(\frac12+\frac{\pi}{3}\right)" />,
    reason: <>At <Katex tex="\tfrac{\pi}{6}" />: <Katex tex="-\cos\tfrac{\pi}{3}=-\tfrac12" />. At <Katex tex="-\tfrac{\pi}{3}" />: <Katex tex="-\cos\left(-\tfrac{2\pi}{3}\right)=-\left(-\tfrac12\right)=+\tfrac12" /> and <Katex tex="-\left(-\tfrac{\pi}{3}\right)=+\tfrac{\pi}{3}" />.</>,
    more: (
      <>
        Substituting the terminals is where the report says the arithmetic went wrong. Two habits help: bracket the whole
        lower-terminal value before subtracting it, and work out each cosine on its own. Cosine is even, so{' '}
        <Katex tex="\cos\left(-\tfrac{2\pi}{3}\right)=\cos\tfrac{2\pi}{3}=-\tfrac12" /> (second quadrant, cosine negative),
        and therefore <Katex tex="-\cos\left(-\tfrac{2\pi}{3}\right)=+\tfrac12" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= -1-\frac{\pi}{2}" />,
    reason: <>Collect: <Katex tex="-\tfrac12-\tfrac12=-1" /> and <Katex tex="-\tfrac{\pi}{6}-\tfrac{2\pi}{6}=-\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="\text{average} = \frac{2}{\pi}\left(-1-\frac{\pi}{2}\right)" />,
    reason: <>Divide by the interval width <Katex tex="\tfrac{\pi}{2}" />, i.e. multiply by <Katex tex="\tfrac{2}{\pi}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{2}{\pi}-1}" />,
    reason: <>Expand: <Katex tex="\tfrac{2}{\pi}\times(-1)=-\tfrac{2}{\pi}" /> and <Katex tex="\tfrac{2}{\pi}\times\left(-\tfrac{\pi}{2}\right)=-1" />. About <Katex tex="-1.64" />.</>,
    more: (
      <>
        Sanity check: the graph oscillates about its midline <Katex tex="y=-1" />, and on this interval it is below that
        line from <Katex tex="-\tfrac{\pi}{3}" /> to <Katex tex="0" /> (where <Katex tex="\sin(2x)" /> is negative), which is
        two-thirds of the interval. So the average height should be somewhat below <Katex tex="-1" />, and{' '}
        <Katex tex="-1.64" /> is.
      </>
    ),
  },
]

export default function MethodsQ6_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (5 marks)</p>
        <p>
          Let <Katex tex="f:[-\pi,\pi]\to R" />, where <Katex tex="f(x)=2\sin(2x)-1" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Average Rate"
        marks={2}
        statement={
          <>
            Calculate the average rate of change of <Katex tex="f" /> between{' '}
            <Katex tex="x=-\tfrac{\pi}{3}" /> and <Katex tex="x=\tfrac{\pi}{6}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Two different averages">
          <p>
            <strong>Average rate of change</strong> is{' '}
            <Katex tex="\dfrac{f(b)-f(a)}{b-a}" /> — the gradient of the straight line
            joining the endpoints. Only the two endpoint values matter.
          </p>
          <p>
            <strong>Average value</strong> is{' '}
            <Katex tex="\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx" /> — the constant
            height a rectangle on the same base would need to have the same area. Every
            point in between matters.
          </p>
          <p>
            The question asks for both, over the same interval, to see whether you can tell
            them apart.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Only the two endpoint heights matter: the chord's gradient">
          <ChordWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Average Value"
        marks={3}
        statement={
          <>
            Calculate the average value of <Katex tex="f" /> over the interval{' '}
            <Katex tex="-\tfrac{\pi}{3}\le x\le\tfrac{\pi}{6}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="The average value is the height of a rectangle with the same area">
          <RectangleWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
