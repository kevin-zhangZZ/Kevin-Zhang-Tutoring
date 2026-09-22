// 2021 Mathematical Methods — Exam 2, Section B Question 2 (10 marks). Right-endpoint
// rectangles approximating an area, the exact integral, the same idea read off a printed
// graph, then an area between y = √x and y = ax² that has three solutions. Question text
// transcribed from the original paper; all three figures are crops of VCAA's own artwork.
// Answers checked with sympy/scipy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import rectSrc from './meth-2021e2-q2-rectangles.png'
import graphSrc from './meth-2021e2-q2d-graph.png'
import shadedSrc from './meth-2021e2-q2e-shaded.png'

const EXAM_A: SAExaminerStats = { marks: [4, 96], average: 1, comment: <>This question was done very well.</> }

const EXAM_B: SAExaminerStats = {
  marks: [40, 60],
  average: 0.6,
  comment: <>An exact answer was required. Some students rounded their answer to 0.47.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [14, 6, 80],
  average: 1.7,
  comment: (
    <>
      The definite integral was required to obtain full marks. Some students rounded their
      answer to 0.3.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [84, 16],
  average: 0.2,
  comment: <>A common incorrect answer was <Katex tex="6+2+4+6=18" />.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [12, 88],
  average: 0.9,
  comment: <>An exact answer was required.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [48, 42, 3, 5, 2],
  average: 0.7,
  comment: (
    <>
      Many students were able to find <Katex tex="a=0.77" /> or <Katex tex="a=1.13" /> but
      not both. Others found <Katex tex="x=a^{-2/3}" /> but did not set up the definite
      integral properly.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{four equal rectangles across } [0,1]" />,
    reason: 'The strip runs from 0 to 1, and the four rectangles fill it exactly.',
  },
  {
    working: <Katex display tex="\boxed{\tfrac14 = 0.25}" />,
    reason: <>Total width divided by the number of rectangles.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{right endpoints: } x = \tfrac14,\ \tfrac12,\ \tfrac34,\ 1" />,
    reason: 'Right endpoint means the rectangle takes the height of the curve at its right edge.',
  },
  {
    working: <Katex display tex="\text{heights: } \tfrac{1}{16},\ \tfrac14,\ \tfrac{9}{16},\ 1" />,
    reason: <>Squaring each endpoint, since <Katex tex="y=x^2" />.</>,
  },
  {
    working: <Katex display tex="A = \tfrac14\left(\tfrac{1}{16}+\tfrac{4}{16}+\tfrac{9}{16}+\tfrac{16}{16}\right) = \tfrac14\cdot\tfrac{30}{16}" />,
    reason: 'Common denominator 16 makes the sum trivial.',
  },
  {
    working: <Katex display tex="\boxed{\tfrac{15}{32}}" />,
    reason: <>Exactly 0.46875. Rounding to 0.47 loses the mark — and note it <em>overestimates</em> the true area, as right endpoints must for an increasing curve.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_0^1 x^2\,dx" />,
    reason: 'The definite integral itself is part of what is marked, not just its value.',
  },
  {
    working: <Katex display tex="= \left[\frac{x^3}{3}\right]_0^1 = \boxed{\tfrac13}" />,
    reason: <>Exact. Compare with part b.: <Katex tex="\tfrac{15}{32}=0.469" /> against <Katex tex="0.333" /> — four rectangles overshoot by about 40%.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = \frac{2-(-2)}{4} = 1" />,
    reason: 'Four equal rectangles across an interval of length 4.',
  },
  {
    working: <Katex display tex="\text{right endpoints: } x = -1,\ 0,\ 1,\ 2" />,
    reason: 'Reading heights off the printed graph at each right edge.',
  },
  {
    working: <Katex display tex="f(-1) = 6, \quad f(0) = 2, \quad f(1) = -4, \quad f(2) = -6" />,
    reason: 'Two of the four heights are negative — the graph crosses the axis between 0 and 1.',
  },
  {
    working: <Katex display tex="A \approx 1\times\bigl(6+2+(-4)+(-6)\bigr)" />,
    reason: <>A definite integral counts signed area, so the negative heights must stay negative. Taking absolute values gives <Katex tex="18" />, the report's common error.</>,
  },
  {
    working: <Katex display tex="\boxed{-2}" />,
    reason: 'Only 16% of students scored this mark.',
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="y = \sqrt x \text{ and } y = x^2 \text{ meet at } x = 0 \text{ and } x = 1" />,
    reason: <><Katex tex="\sqrt x = x^2 \Rightarrow x = x^4 \Rightarrow x(x^3-1)=0" />.</>,
  },
  {
    working: <Katex display tex="\sqrt x \ge x^2 \ \text{ on } [0,1]" />,
    reason: 'The square root is the upper curve there, which fixes the order of subtraction.',
  },
  {
    working: <Katex display tex="A = \int_0^1\left(\sqrt x-x^2\right)dx = \left[\tfrac23x^{3/2}-\tfrac13x^3\right]_0^1" />,
    reason: 'Both antiderivatives are power rules.',
  },
  {
    working: <Katex display tex="= \tfrac23-\tfrac13 = \boxed{\tfrac13}" />,
    reason: <>Exact. Neatly, this equals part c. — the two regions are reflections of each other in <Katex tex="y=x" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="ax^2 = \sqrt x \implies a^2x^4 = x \implies x\left(a^2x^3-1\right) = 0" />,
    reason: 'Squaring both sides, then factoring.',
  },
  {
    working: <Katex display tex="x = 0 \ \text{ or } \ x = a^{-2/3}" />,
    reason: <>Call the second one <Katex tex="c" />. Whether <Katex tex="c" /> lands inside <Katex tex="[0,a]" /> is what splits the problem into cases.</>,
  },
  {
    working: <Katex display tex="c \ge a \iff a^{-2/3} \ge a \iff a^{5/3} \le 1 \iff a \le 1" />,
    reason: 'So the two curves cross inside the strip only when a > 1.',
  },
  {
    working: <Katex display tex="a \le 1: \ \int_0^a\left(\sqrt x-ax^2\right)dx = \tfrac13" />,
    reason: <>One region, with <Katex tex="\sqrt x" /> on top throughout.</>,
  },
  {
    working: <Cas fn="solve">solve(∫(√x − a·x², x, 0, a) = 1/3, a) | 0 &lt; a ≤ 1</Cas>,
    reason: <>Gives two roots: <Katex tex="a=0.7702\ldots" /> and <Katex tex="a=1" /> exactly (where the strip ends precisely at the crossing, recovering part e.).</>,
  },
  {
    working: <Katex display tex="a > 1: \ \int_0^{c}\left(\sqrt x-ax^2\right)dx+\int_{c}^{a}\left(ax^2-\sqrt x\right)dx = \tfrac13" />,
    reason: <>Past <Katex tex="c" /> the parabola overtakes the square root, so the integrand flips — two regions, not one.</>,
  },
  {
    working: <Katex display tex="\implies a = 1.1320\ldots" />,
    reason: 'The third root.',
  },
  {
    working: <Katex display tex="\boxed{a = 0.77, \ 1.00, \ 1.13}" />,
    reason: <>All three, to two decimal places, and all inside <Katex tex="(0,2]" />. Fewer than 1 in 10 students found more than one.</>,
  },
]

export default function MethodsQ2_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
        <p>
          Four rectangles of equal width are drawn and used to approximate the area under the
          parabola <Katex tex="y=x^2" /> from <Katex tex="x=0" /> to <Katex tex="x=1" />. The
          heights of the rectangles are the values of the graph of <Katex tex="y=x^2" /> at
          the right endpoint of each rectangle, as shown in the graph below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={rectSrc}
            alt="Four rectangles of increasing height under the parabola y = x² between x = 0 and x = 1, each touching the curve at its right edge — from the original 2021 VCAA exam paper"
            className="w-full max-w-[280px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>State the width of each of the rectangles shown above.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={<>Find the total area of the four rectangles shown above.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Find the area between the graph of <Katex tex="y=x^2" />, the <Katex tex="x" />
            -axis and the line <Katex tex="x=1" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>The graph of <Katex tex="f" /> is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A decreasing S-shaped curve rising to a maximum of 6 near x = −1, crossing the y-axis at 2, and falling through −4 at x = 1 to about −7 at x = 3 — from the original 2021 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            Approximate <Katex tex="\displaystyle\int_{-2}^{2}f(x)\,dx" /> using four
            rectangles of equal width and the right endpoint of each rectangle.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          Parts of the graphs of <Katex tex="y=x^2" /> and <Katex tex="y=\sqrt x" /> are
          shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={shadedSrc}
            alt="The lens-shaped region between y = √x and y = x² from x = 0 to x = 1, shaded — from the original 2021 VCAA exam paper"
            className="w-full max-w-[280px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        marks={1}
        statement={<>Find the area of the shaded region.</>}
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={4}
        statement={
          <>
            The graph of <Katex tex="y=x^2" /> is transformed to the graph of{' '}
            <Katex tex="y=ax^2" />, where <Katex tex="a\in(0,2]" />. Find the values of{' '}
            <Katex tex="a" /> such that the area defined by the region(s) bounded by the
            graphs of <Katex tex="y=ax^2" /> and <Katex tex="y=\sqrt x" /> and the lines{' '}
            <Katex tex="x=0" /> and <Katex tex="x=a" /> is equal to <Katex tex="\tfrac13" />.
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
