// 2024 Specialist Mathematics — Exam 2, Section B Question 5 (10 marks). Lines and planes
// in three dimensions: a vector equation, a point-to-line distance, a plane through three
// points, and the triangle a plane cuts from the axes. Question text transcribed from the
// original paper (2024 papers are image-only, so read from rendered pages). Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Some students did not use the correct notation. A common error was to write the vector{' '}
      <Katex tex="\overrightarrow{AB}" /> rather than the vector equation of the line.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [26, 11, 13, 50],
  average: 1.9,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Students used many different techniques to solve this problem.
        </li>
        <li>
          Some students used the wrong line equation, using their answer to part a rather than
          the one given.
        </li>
      </ul>
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [15, 3, 15, 67],
  average: 2.4,
  comment: (
    <>
      Most students answered this question very well. Students should be aware that their CAS
      technology can help them find cross products accurately.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
}

const EXAM_DII: SAExaminerStats = {
  marks: [44, 10, 46],
  average: 1.0,
  comment: (
    <>
      Common errors were:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          incorrectly determining the spanning vectors
        </li>
        <li>
          omitting the division of the cross product by 2 to find the area
        </li>
        <li>
          incorrectly assuming the triangle was either isosceles or right-angled.
        </li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{AB} = (2-1)\underset{\sim}{i}+(-5-(-2))\underset{\sim}{j}+(-1-3)\underset{\sim}{k} = \underset{\sim}{i}-3\underset{\sim}{j}-4\underset{\sim}{k}" />,
    reason: <>Subtract the position vectors to get a direction along the line.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r} = \underset{\sim}{a}+s\underset{\sim}{d}" />,
    reason: <>A point plus a multiple of a direction. Writing down only <Katex tex="\overrightarrow{AB}" /> answers a different question — the report's common error.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{r}(s) = \underset{\sim}{i}-2\underset{\sim}{j}+3\underset{\sim}{k}+s\left(\underset{\sim}{i}-3\underset{\sim}{j}-4\underset{\sim}{k}\right), \quad s\in R}" />,
    reason: <>Using <Katex tex="A" /> as the anchor. Starting from <Katex tex="B" />, or scaling the direction, gives an equally correct answer — "many correct answers exist".</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="L_1: \ \underset{\sim}{a_1} = (2,1,-3), \qquad \underset{\sim}{d} = (-1,2,1)" />,
    reason: <>The <em>given</em> line, not the one from part a. — the report notes some students used their answer to part a instead.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{AP} = (2,1,-3)-(1,-2,3) = (1,3,-6)" />,
    reason: <>A vector from <Katex tex="A" /> to any point of the line.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\overrightarrow{AP}\times\underset{\sim}{d} = \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\1 & 3 & -6\\-1 & 2 & 1\end{vmatrix} = 15\underset{\sim}{i}+5\underset{\sim}{j}+5\underset{\sim}{k}"
      />
    ),
    reason: <>The cross product isolates the component of <Katex tex="\overrightarrow{AP}" /> perpendicular to the line.</>,
  },
  {
    working: <Katex display tex="d = \frac{\left|\overrightarrow{AP}\times\underset{\sim}{d}\right|}{\left|\underset{\sim}{d}\right|} = \frac{\sqrt{225+25+25}}{\sqrt{1+4+1}} = \frac{\sqrt{275}}{\sqrt6}" />,
    reason: <>The standard point-to-line distance. Minimising <Katex tex="\left|\overrightarrow{AP}+t\underset{\sim}{d}\right|" /> directly also works.</>,
  },
  {
    working: <Katex display tex="\frac{5\sqrt{11}}{\sqrt6} = \frac{5\sqrt{11}\sqrt6}{6} = \frac{5\sqrt{66}}{6}" />,
    reason: <><Katex tex="\sqrt{275}=\sqrt{25\times11}=5\sqrt{11}" />, then rationalise.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{5\sqrt{66}}{6}}" />,
    reason: <>About <Katex tex="6.77" />. In the form <Katex tex="\tfrac{a\sqrt b}{c}" /> with <Katex tex="a=5,\ b=66,\ c=6" /> — all positive integers, as required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{AB} = (1,-3,-4), \qquad \overrightarrow{AC} = (0,2,-5)-(1,-2,3) = (-1,4,-8)" />,
    reason: <>Two vectors lying in the plane.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\underset{\sim}{n} = \overrightarrow{AB}\times\overrightarrow{AC} = \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\1 & -3 & -4\\-1 & 4 & -8\end{vmatrix} = 40\underset{\sim}{i}+12\underset{\sim}{j}+\underset{\sim}{k}"
      />
    ),
    reason: <>The normal. Components: <Katex tex="24+16" />, <Katex tex="-(-8-4)" />, <Katex tex="4-3" />. Use <Cas fn="define" /> or the built-in crossP to avoid slips.</>,
  },
  {
    working: <Katex display tex="40x+12y+z = d" />,
    reason: <>The Cartesian form, with the normal supplying the coefficients.</>,
  },
  {
    working: <Katex display tex="A(1,-2,3): \quad 40(1)+12(-2)+3 = 40-24+3 = 19" />,
    reason: <>Substituting any one of the three points fixes the constant.</>,
  },
  {
    working: <Katex display tex="\boxed{40x+12y+z = 19}" />,
    reason: <>Check with <Katex tex="C" />: <Katex tex="0+24-5 = 19" /> ✓, and with <Katex tex="B" />: <Katex tex="80-60-1 = 19" /> ✓.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="y = z = 0: \quad 2x = 12 \implies x = 6" />,
    reason: <>The x-intercept: set the other two variables to zero.</>,
  },
  {
    working: <Katex display tex="x = z = 0: \quad -3y = 12 \implies y = -4" />,
    reason: <>The y-intercept. Note the sign.</>,
  },
  {
    working: <Katex display tex="x = y = 0: \quad 4z = 12 \implies z = 3" />,
    reason: <>The z-intercept.</>,
  },
  {
    working: <Katex display tex="\boxed{(6,0,0), \quad (0,-4,0), \quad (0,0,3)}" />,
    reason: <>Reading them off the "intercept form" <Katex tex="\tfrac{x}{6}+\tfrac{y}{-4}+\tfrac{z}{3}=1" /> is the same calculation done all at once.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{u} = (0,-4,0)-(6,0,0) = (-6,-4,0)" />,
    reason: <>One side of the triangle, taken from the vertex <Katex tex="(6,0,0)" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v} = (0,0,3)-(6,0,0) = (-6,0,3)" />,
    reason: <>The other side from the same vertex. Both must start at the <em>same</em> vertex — the report lists incorrectly determining the spanning vectors among the common errors.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\underset{\sim}{u}\times\underset{\sim}{v} = \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\-6 & -4 & 0\\-6 & 0 & 3\end{vmatrix} = -12\underset{\sim}{i}+18\underset{\sim}{j}-24\underset{\sim}{k}"
      />
    ),
    reason: <>The cross product gives the area of the parallelogram the two sides span.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{u}\times\underset{\sim}{v}\right| = \sqrt{144+324+576} = \sqrt{1044} = 6\sqrt{29}" />,
    reason: <><Katex tex="1044 = 36\times29" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \tfrac12\times6\sqrt{29} = 3\sqrt{29}}" />,
    reason: <>About <Katex tex="16.2" /> square units. Forgetting the half gives <Katex tex="6\sqrt{29}" />, the parallelogram — one of the report's common errors. The triangle is neither isosceles nor right-angled (assuming it was is another), so no shortcut applies.</>,
  },
]

export default function SpecialistQ5_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (10 marks)</p>
        <p>
          Consider the points <Katex tex="A(1,-2,3)" /> and <Katex tex="B(2,-5,-1)" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Three of the five parts turn on a cross product. Point to line:{' '}
            <Katex tex="\left|\overrightarrow{AP}\times\underset{\sim}{d}\right|\div\left|\underset{\sim}{d}\right|" />.
            Plane through three points: the cross product of two side vectors is the normal.
            Area of a triangle:{' '}
            <Katex tex="\tfrac12\left|\underset{\sim}{u}\times\underset{\sim}{v}\right|" />.
            Knowing which divisor belongs to which is most of the question.
          </p>
          <p>
            Two traps. Part b. gives its own line <Katex tex="L_1" />, which has nothing to do
            with the line through <Katex tex="A" /> and <Katex tex="B" /> from part a. And in
            part d.ii. the two spanning vectors must both start at the same vertex — the
            three intercept position vectors are not sides of the triangle.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Line Equation"
        marks={1}
        statement={
          <>
            Find a vector equation, in terms of the components{' '}
            <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> and{' '}
            <Katex tex="\underset{\sim}{k}" />, for the line passing through these points.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Shortest Distance"
        marks={3}
        statement={
          <>
            Consider the different line{' '}
            <Katex tex="L_1:\ \underset{\sim}{r_1}(t) = 2\underset{\sim}{i}+\underset{\sim}{j}-3\underset{\sim}{k}+t\left(-\underset{\sim}{i}+2\underset{\sim}{j}+\underset{\sim}{k}\right)" />,{' '}
            <Katex tex="t\in R" />.
            <br />
            Find the shortest distance from <Katex tex="L_1" /> to point <Katex tex="A" />.
            <br />
            Give your answer in the form{' '}
            <Katex tex="\dfrac{a\sqrt b}{c}" /> where <Katex tex="a" />, <Katex tex="b" /> and{' '}
            <Katex tex="c" /> are positive integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Plane Equation"
        marks={3}
        statement={
          <>
            Let <Katex tex="C" /> be the point <Katex tex="(0,2,-5)" />.
            <br />
            Find the Cartesian equation of the plane that contains the points <Katex tex="A" />,{' '}
            <Katex tex="B" /> and <Katex tex="C" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          Another plane has the Cartesian equation <Katex tex="2x-3y+4z=12" />.
          <br />
          This plane intersects the coordinate axes at three points, which form the vertices of a
          triangle.
        </p>
      </div>

      <PartCard letter="d.i" topic="Axis Intercepts" marks={1} statement={<>Find the coordinates of these three points.</>} examinerReport={EXAM_DI}>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Triangle Area"
        marks={2}
        statement={
          <>
            Find the area of the triangle.
            <br />
            Give your answer in the form{' '}
            <Katex tex="m\sqrt n" /> where <Katex tex="m" /> and <Katex tex="n" /> are
            integers.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
