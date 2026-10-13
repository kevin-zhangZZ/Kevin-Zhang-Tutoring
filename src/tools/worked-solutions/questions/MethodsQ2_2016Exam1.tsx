// 2016 Mathematical Methods — Exam 1, Question 2 (3 marks).
// Differentiate √(1 − 2x), then turn the gradient into an angle measured anticlockwise
// from the positive x-axis. Only 20% scored both marks on part (b). Question text
// transcribed from the original paper (no diagram given). Answers checked against the VCAA
// examination report. Solution is original.
// Interactive (Detailed only): b. meth-2016e1-q2b-angle (tangent, its anticlockwise angle,
// reference angle, and the calculator's clockwise tan⁻¹). a. does not qualify (69% full marks).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const AngleWidget = lazyWidget(() => import('../interactives/meth-2016e1-q2b-angle'))

const EXAM_A: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      Most students utilised the chain rule on an expression involving a fractional
      exponent. However, many students then missed the negative sign in the final answer,
      forgetting that the derivative of <Katex tex="(1-2x)" /> is <Katex tex="-2" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 39, 20],
  average: 0.8,
  comment: (
    <>
      This question was not answered well. Many students who knew the connection between{' '}
      <Katex tex="\tan(\theta)" /> and <Katex tex="f'(-1)" /> had difficulty in finding the
      required angle. Students should know the exact values of circular functions in all
      quadrants. Many students incorrectly assumed that gradient <Katex tex="=f(-1)" /> or
      wasted time finding the equation of the tangent.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (1-2x)^{\frac12}" />,
    reason: <>Rewrite the surd as a power so the chain rule applies.</>,
  },
  {
    working: <Katex display tex="f'(x) = \tfrac12(1-2x)^{-\frac12}\times(-2)" />,
    reason: <>Chain rule: bring down the <Katex tex="\tfrac12" />, lower the power by 1, then multiply by the derivative of the inside, <Katex tex="-2" />.</>,
    more: <>That factor of <Katex tex="-2" /> is the one the report says many students dropped, leaving the sign of the answer wrong.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{-1}{\sqrt{1-2x}}}" />,
    reason: <><Katex tex="\tfrac12\times(-2)=-1" />, and the power <Katex tex="-\tfrac12" /> puts <Katex tex="\sqrt{1-2x}" /> in the denominator.</>,
    more: <>Check the sign: as <Katex tex="x" /> increases, <Katex tex="1-2x" /> shrinks, so <Katex tex="f" /> is decreasing and <Katex tex="f'(x)" /> must be negative. It is, for every <Katex tex="x<\tfrac12" />. At the endpoint <Katex tex="x=\tfrac12" /> the denominator is 0, so <Katex tex="f'" /> is not defined there.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\theta) = f'(-1)" />,
    reason: <>A line's gradient is the tangent of the angle it makes, measured anticlockwise, with the positive <Katex tex="x" />-axis.</>,
    more: <>Use the <em>gradient</em> <Katex tex="f'(-1)" />, not the height <Katex tex="f(-1)=\sqrt3" />: the report notes students who assumed gradient <Katex tex="=f(-1)" />. The equation of the tangent is not needed either, since only its direction matters; the report notes students who wasted time finding it.</>,
  },
  {
    working: <Katex display tex="f'(-1) = \frac{-1}{\sqrt{1-2(-1)}} = \frac{-1}{\sqrt3}" />,
    reason: <>Substitute <Katex tex="x=-1" /> into the answer to part a:{' '}<Katex tex="1-2(-1)=3" />.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = -\frac{1}{\sqrt3}" />,
    reason: <>A negative gradient means the tangent slopes down to the right, so <Katex tex="\theta" /> is obtuse: <Katex tex="\tfrac{\pi}{2}<\theta<\pi" />.</>,
  },
  {
    working: <Katex display tex="\text{reference angle} = \frac{\pi}{6}" />,
    reason: <>Ignore the sign first: <Katex tex="\tan\tfrac{\pi}{6}=\tfrac{1}{\sqrt3}" /> is an exact value to know.</>,
    more: <>The report says students should know the exact values of circular functions in all quadrants. If you remember only sine and cosine: <Katex tex="\tan\tfrac{\pi}{6}=\dfrac{1/2}{\sqrt3/2}=\tfrac{1}{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \pi-\frac{\pi}{6} = \frac{5\pi}{6} \ \left(=150^\circ\right)}" />,
    reason: <><Katex tex="\theta" /> is in the second quadrant, where tangent is negative, so take the reference angle from <Katex tex="\pi" />.</>,
    more: <>
      Why not <Katex tex="-\tfrac{\pi}{6}" />? That is <Katex tex="\tan^{-1}\!\left(-\tfrac{1}{\sqrt3}\right)" />, and <Katex tex="\tan^{-1}" /> always gives an angle between <Katex tex="-\tfrac{\pi}{2}" /> and <Katex tex="\tfrac{\pi}{2}" />: a negative angle is measured <em>clockwise</em>. The question asks for the anticlockwise angle, which is <Katex tex="-\tfrac{\pi}{6}+\pi=\tfrac{5\pi}{6}" />. Check: <Katex tex="\tan\tfrac{5\pi}{6}=-\tfrac{1}{\sqrt3}" />. It also looks right: a gradient of about <Katex tex="-0.58" /> is a gentle downhill slope, <Katex tex="30^\circ" /> short of flat. The report gives <Katex tex="\tfrac{5\pi}{6}" /> or <Katex tex="150^\circ" />.
    </>,
  },
]

export default function MethodsQ2_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Let <Katex tex="f:\left(-\infty,\tfrac12\right]\to R" />, where{' '}
          <Katex tex="f(x)=\sqrt{1-2x}" />.
        </p>
      </div>

      <PartCard letter="a" topic="Chain Rule" marks={1} statement={<>Find <Katex tex="f'(x)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Tangent Angle"
        marks={2}
        statement={
          <>
            Find the angle <Katex tex="\theta" /> from the positive direction of the{' '}
            <Katex tex="x" />-axis to the tangent to the graph of <Katex tex="f" /> at{' '}
            <Katex tex="x=-1" />, measured in the anticlockwise direction.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Gradient to angle">
          <p>
            Why a gradient is a tangent ratio: where an uphill line crosses the{' '}
            <Katex tex="x" />-axis, its run and rise form a right-angled triangle with angle{' '}
            <Katex tex="\theta" /> at the axis, and rise over run is opposite over adjacent, so{' '}
            <Katex tex="\tan(\theta)=m" />. The same holds for a downhill line, with{' '}
            <Katex tex="\theta" /> obtuse. Measured anticlockwise from the positive{' '}
            <Katex tex="x" />-direction, <Katex tex="0\le\theta<\pi" />. For a curve, the line is
            the tangent at the point, so <Katex tex="m" /> is the derivative there.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="A downhill tangent makes an obtuse angle: θ = 180° − reference angle">
          <AngleWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
