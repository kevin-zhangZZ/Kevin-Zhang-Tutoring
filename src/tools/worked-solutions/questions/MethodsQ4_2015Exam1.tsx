// 2015 Mathematical Methods (CAS) — Exam 1, Question 4 (6 marks).
// Stationary points of a restricted cubic, the sketch, and an average value. Question text
// transcribed from the original paper; VCAA supplied blank grid axes for part (b), so the
// sketch below is our own matplotlib figure. Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import cubicSrc from './meth-2015e1-q4b-cubic.png'

const EXAM_A: SAExaminerStats = {
  marks: [14, 24, 62],
  average: 1.5,
  comment: (
    <>
      Most students recognised the need to solve <Katex tex="f'(x)=0" />. Some students
      incorrectly stated the derivative as <Katex tex="3x(x+2)" />. Other students used the
      product rule to obtain a correct derivative, though this was not the most efficient
      method.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [17, 29, 54],
  average: 1.4,
  comment: (
    <>
      This question was generally answered well. Students were wary of the restricted
      domain, though errors occurred with the calculation or the placement of the endpoints.
      While labelling of intercepts and turning points was not required by this question, a
      correct graph was required to be awarded full marks.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [40, 19, 41],
  average: 1.0,
  comment: (
    <>
      Most students recalled the average value definition, which was not stated on the
      formula sheet, but then did not integrate correctly. The main error in student
      responses was the misplacement of <Katex tex="\tfrac12" /> in the integrand. Some
      students split the integration; for example,{' '}
      <Katex tex="\tfrac12\left(\int_0^1 f(x)\,dx+\int_1^2 f(x)\,dx\right)" />. Some students
      confused average value with average rate of change, instead finding a gradient.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \tfrac12\left(3x^2+6x\right) = \tfrac32x(x+2)" />,
    reason: <>Differentiate the expanded form — much quicker than the product rule on the factorised one. Note the <Katex tex="\tfrac32" />, not <Katex tex="3" />, which the report flags.</>,
  },
  {
    working: <Katex display tex="\tfrac32x(x+2) = 0 \implies x = 0 \text{ or } x = -2" />,
    reason: <>Both lie inside the domain <Katex tex="[-3,2]" />.</>,
  },
  {
    working: <Katex display tex="f(0) = \tfrac12(-4) = -2, \qquad f(-2) = \tfrac12(-8+12-4) = 0" />,
    reason: <>Substituting back.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,-2) \text{ and } (-2,0)}" />,
    reason: <>Coordinates, as asked. <Katex tex="(-2,0)" /> is a maximum and <Katex tex="(0,-2)" /> a minimum — the shape of a positive cubic.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \tfrac12(x-1)(x+2)^2 \implies x\text{-intercepts } 1 \text{ and } -2" />,
    reason: <>The factorised form is handed to you in the question. <Katex tex="x=-2" /> is a repeated root, so the curve touches the axis there rather than crossing — which is the same point as the maximum from part (a).</>,
  },
  {
    working: <Katex display tex="f(0) = -2" />,
    reason: <>The <Katex tex="y" />-intercept, and also the minimum.</>,
  },
  {
    working: <Katex display tex="f(-3) = \tfrac12(-27+27-4) = -2, \qquad f(2) = \tfrac12(8+12-4) = 8" />,
    reason: <>The endpoints. The report says these are where marks went — both the arithmetic and the placement on the printed grid.</>,
  },
  {
    working: <Katex display tex="\text{domain } [-3,2] \text{ only}" />,
    reason: <>Stop the curve at the endpoints and mark them; do not continue the cubic beyond.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value} = \frac{1}{b-a}\int_a^b f(x)\,dx" />,
    reason: <>The mean <em>height</em> of the graph. Not the average rate of change, which would be a gradient — the report notes students who found one instead of the other.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{2-0}\int_0^2 \tfrac12\left(x^3+3x^2-4\right)dx" />,
    reason: <>Two halves now in play: one from the interval width, one from the rule itself. Mixing them up is the report's main error.</>,
  },
  {
    working: <Katex display tex="= \frac14\left[\frac{x^4}{4}+x^3-4x\right]_0^2" />,
    reason: <>Combining <Katex tex="\tfrac12\times\tfrac12" /> and antidifferentiating.</>,
  },
  {
    working: <Katex display tex="= \frac14\left(4+8-8\right)" />,
    reason: <><Katex tex="\tfrac{16}{4}=4" />, <Katex tex="2^3=8" />, <Katex tex="4(2)=8" />; everything vanishes at the lower terminal.</>,
  },
  {
    working: <Katex display tex="\boxed{1}" />,
    reason: <>Plausible from the sketch: on <Katex tex="[0,2]" /> the curve runs from <Katex tex="-2" /> up to <Katex tex="8" />, spending most of the interval low, so a mean height of <Katex tex="1" /> is about right.</>,
  },
]

export default function MethodsQ4_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (6 marks)</p>
        <p>
          Consider the function <Katex tex="f:[-3,2]\to R" />,{' '}
          <Katex tex="f(x)=\tfrac12\left(x^3+3x^2-4\right)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Stationary Points"
        marks={2}
        statement={<>Find the coordinates of the stationary points of the function.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The rule for <Katex tex="f" /> can also be expressed as{' '}
        <Katex tex="f(x)=\tfrac12(x-1)(x+2)^2" />.
      </div>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            On the axes below, sketch the graph of <Katex tex="f" />, clearly indicating axis
            intercepts and turning points. Label the end points with their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={cubicSrc}
            alt="This site's sketch, on VCAA's −8 to 8 grid, of the cubic y = ½(x−1)(x+2)² drawn only on [−3, 2]: starting at (−3, −2), rising to touch the x-axis at the maximum (−2, 0), falling to the minimum (0, −2), then rising through (1, 0) to the endpoint (2, 8)"
            className="w-full max-w-[400px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="c"
        topic="Average Value"
        marks={2}
        statement={
          <>
            Find the average value of <Katex tex="f" /> over the interval{' '}
            <Katex tex="0\le x\le2" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Average value is not on the formula sheet">
          <p>
            <Katex tex="\overline{f}=\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx" /> — the
            constant height a rectangle on the same base would need to enclose the same
            area. The report notes it is not printed on the formula sheet, so it has to be
            remembered.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
