// 2015 Specialist Mathematics — Exam 1, Question 9 (6 marks). Implicit differentiation of an
// ellipse, two tangents, and the acute angle between them. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [14, 16, 70],
  average: 1.6,
  comment: (
    <>
      This question was answered well. Most students correctly used the product and chain
      rules. A number of sign errors appeared on the left-hand scale, while some left the
      right-hand side as 9 after differentiating the left-hand scale. Algebraic
      simplification errors were common.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [18, 20, 62],
  average: 1.5,
  comment: (
    <>
      This question was answered well. The most common errors were finding only one equation
      and arithmetic errors in converting one or both equations to the required form.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [77, 6, 16],
  average: 0.4,
  comment: (
    <>
      Most students had little idea of how to proceed with this question. Students were
      expected to apply <Katex tex="\tan(A-B)" /> or use a vector method, but other methods
      were possible. Some correctly applied <Katex tex="\tan(A-B)" /> but made simplification
      errors. There were also some poor attempts to use a vector method. In attempting to
      convert to vectors, sometimes equations such as <Katex tex="y=mx+c" /> became{' '}
      <Katex tex="m\underset{\sim}{i}+c\underset{\sim}{j}" />. Some found the intersection point of the tangents but were unable to progress
      from there. A small number attempted to use the cosine rule, with a few of these being
      successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-xy+\tfrac32y^2 = 9" />,
    reason: <>Differentiate both sides with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}(xy) = y + x\frac{dy}{dx}" />,
    reason: <>Product rule on the middle term — the step the report highlights.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\!\left(\tfrac32y^2\right) = 3y\frac{dy}{dx}" />,
    reason: <>Chain rule on <Katex tex="y^2" />, since <Katex tex="y" /> depends on <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="2x - y - x\frac{dy}{dx} + 3y\frac{dy}{dx} = 0" />,
    reason: <>The right-hand side is the constant 9, whose derivative is 0 — not 9.</>,
  },
  {
    working: <Katex display tex="(3y-x)\frac{dy}{dx} = y-2x" />,
    reason: <>Collecting the <Katex tex="\tfrac{dy}{dx}" /> terms on one side.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{y-2x}{3y-x}}" />,
    reason: <>Equivalently <Katex tex="\tfrac{2x-y}{x-3y}" />, multiplying numerator and denominator by <Katex tex="-1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(3,0):\quad \frac{dy}{dx} = \frac{0-6}{0-3} = 2" />,
    reason: <>Substituting into part a. Check the point is on the curve first: <Katex tex="9-0+0=9" /> ✓.</>,
  },
  {
    working: <Katex display tex="y-0 = 2(x-3)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="y = 2x-6" />,
    reason: <>In the required form <Katex tex="y=ax+b" />.</>,
  },
  {
    working: <Katex display tex="\left(0,\sqrt6\right):\quad \tfrac32\bigl(\sqrt6\bigr)^2 = \tfrac32\times6 = 9 \ \checkmark" />,
    reason: <>The second point is on the curve too.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{\sqrt6-0}{3\sqrt6-0} = \frac13" />,
    reason: <>The surds cancel outright.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 2x-6 \quad\text{and}\quad y = \tfrac13x+\sqrt6}" />,
    reason: <>Both equations are needed — the report says giving only one was the most common error. The second already passes through <Katex tex="\left(0,\sqrt6\right)" />, so <Katex tex="b=\sqrt6" /> by inspection.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(A) = 2,\qquad \tan(B) = \tfrac13" />,
    reason: <>A line of gradient <Katex tex="m" /> makes an angle <Katex tex="\arctan(m)" /> with the positive <Katex tex="x" />-axis; the angle between the two lines is the difference <Katex tex="A-B" />.</>,
  },
  {
    working: <Katex display tex="\tan(A-B) = \frac{\tan A-\tan B}{1+\tan A\tan B}" />,
    reason: <>The compound-angle formula lets you find the angle without ever finding <Katex tex="A" /> or <Katex tex="B" /> separately — neither of which is a nice value.</>,
  },
  {
    working: <Katex display tex="= \frac{2-\tfrac13}{1+2\times\tfrac13} = \frac{\tfrac53}{\tfrac53}" />,
    reason: <>Numerator and denominator come out equal, which is the whole point of the chosen numbers.</>,
  },
  {
    working: <Katex display tex="\tan(A-B) = 1" />,
    reason: <>Positive, so <Katex tex="A-B" /> is already the acute angle — no adjustment needed.</>,
  },
  {
    working: <Katex display tex="\boxed{A-B = \frac\pi4}" />,
    reason: <>So <Katex tex="k=\tfrac14" /> in the required form <Katex tex="k\pi" />. A vector check: the direction vectors <Katex tex="\underset{\sim}{i}+2\underset{\sim}{j}" /> and <Katex tex="3\underset{\sim}{i}+\underset{\sim}{j}" /> have dot product 5 and magnitudes <Katex tex="\sqrt5" /> and <Katex tex="\sqrt{10}" />, giving <Katex tex="\cos\theta=\tfrac{5}{\sqrt{50}}=\tfrac1{\sqrt2}" /> ✓.</>,
  },
]

export default function SpecialistQ9_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (6 marks)</p>
        <p>
          Consider the curve represented by <Katex tex="x^2-xy+\tfrac32y^2=9" />.
        </p>

      </div>

      <PartCard
        letter="a"
        topic="Implicit Differentiation"
        marks={2}
        statement={<>Find the gradient of the curve at any point <Katex tex="(x,y)" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Tangent Lines"
        marks={2}
        statement={
          <>
            Find the equation of the tangent to the curve at the point <Katex tex="(3,0)" />{' '}
            <b>and</b> find the equation of the tangent to the curve at the point{' '}
            <Katex tex="\left(0,\sqrt6\right)" />. Write each equation in the form{' '}
            <Katex tex="y=ax+b" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Angle Between Tangents"
        marks={2}
        statement={
          <>
            Find the acute angle between the tangent to the curve at the point{' '}
            <Katex tex="(3,0)" /> and the tangent to the curve at the point{' '}
            <Katex tex="\left(0,\sqrt6\right)" />. Give your answer in the form{' '}
            <Katex tex="k\pi" />, where <Katex tex="k" /> is a real constant.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background>
          <p>
            Only 16% of students scored full marks here. The angle between two lines is the
            difference of the angles each makes with the <Katex tex="x" />-axis, and{' '}
            <Katex tex="\tan(A-B)" /> turns two gradients into that angle without ever
            evaluating an inverse tangent.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
