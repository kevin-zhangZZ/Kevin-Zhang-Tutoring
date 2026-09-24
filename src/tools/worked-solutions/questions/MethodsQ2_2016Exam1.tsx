// 2016 Mathematical Methods — Exam 1, Question 2 (3 marks).
// Differentiate √(1 − 2x), then turn the gradient into an angle measured anticlockwise
// from the positive x-axis. Only 20% scored both marks on part (b). Question text
// transcribed from the original paper (no diagram given). Answers checked against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    reason: <>Rewriting the surd as a power so the chain rule applies.</>,
  },
  {
    working: <Katex display tex="f'(x) = \tfrac12(1-2x)^{-\frac12}\times(-2)" />,
    reason: <>Chain rule. The derivative of the inside is <Katex tex="-2" />, and that minus is what the report says many students dropped.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{-1}{\sqrt{1-2x}}}" />,
    reason: <>The <Katex tex="\tfrac12" /> and the <Katex tex="-2" /> combine to <Katex tex="-1" />. Negative wherever it is defined (every <Katex tex="x<\tfrac12" />), as it must be: <Katex tex="f" /> is a decreasing function.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\theta) = f'(-1)" />,
    reason: <>The gradient of a line is the tangent of the angle it makes with the positive <Katex tex="x" />-direction. The <em>gradient</em>, note, not the function value — the report flags students who used <Katex tex="f(-1)" />.</>,
  },
  {
    working: <Katex display tex="f'(-1) = \frac{-1}{\sqrt{1-2(-1)}} = \frac{-1}{\sqrt3}" />,
    reason: <><Katex tex="1+2=3" /> under the root.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = -\frac{1}{\sqrt3}" />,
    reason: <>Negative, so the angle is obtuse: between <Katex tex="90^\circ" /> and <Katex tex="180^\circ" /> when measured anticlockwise from the positive <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\text{reference angle} = \frac{\pi}{6}" />,
    reason: <>Since <Katex tex="\tan\tfrac{\pi}{6}=\tfrac{1}{\sqrt3}" /> — one of the exact values the report says students should know.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \pi-\frac{\pi}{6} = \frac{5\pi}{6} \ \left(=150^\circ\right)}" />,
    reason: <>Second quadrant, so subtract the reference angle from <Katex tex="\pi" />. Check: a gentle downhill slope (gradient about <Katex tex="-0.58" />) makes an angle a little short of <Katex tex="180^\circ" />, which is where <Katex tex="150^\circ" /> sits. A steep downhill slope would be just past <Katex tex="90^\circ" />.</>,
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
            <Katex tex="\tan(\theta)=m" /> is the whole idea: the gradient <em>is</em> the
            tangent of the angle of inclination. A positive gradient gives an acute angle; a
            negative gradient gives an obtuse one.
          </p>
          <p>
            No equation of the tangent line is needed — the question asks only about
            direction, and the report notes students who wasted time finding one. Nor is{' '}
            <Katex tex="f(-1)" /> relevant; only <Katex tex="f'(-1)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
