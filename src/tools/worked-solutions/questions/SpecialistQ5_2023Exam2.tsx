// 2023 Specialist Mathematics — Exam 2, Section B Question 5 (11 marks). Planes and lines in
// three dimensions: a cross-product area, a perpendicular distance, the angle a line makes
// with a plane, and where the normal through the origin meets it. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [8, 29, 63],
  average: 1.6,
  comment: (
    <>
      Most students successfully obtained the required vectors. Not all were able to "show
      that" the required area was 1.5 square units.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [60, 11, 29],
  average: 0.7,
  comment: <>A wide variety of valid approaches were applied by successful students.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [29, 21, 50],
  average: 1.2,
  comment: (
    <>
      A significant number of students did not proceed beyond finding the angle of{' '}
      <Katex tex="64^\circ" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = { marks: [48, 52], average: 0.5 }

const EXAM_E: SAExaminerStats = {
  marks: [37, 7, 55],
  average: 1.2,
  comment: (
    <>
      Many students who did not initially use absolute values dealt inappropriately with
      inconvenient negative values, with working such as "<Katex tex="=-6=6" />".
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [53, 13, 34],
  average: 0.8,
  comment: (
    <>
      Most students recognised that the parametric form from part d. was an efficient
      approach. Some other approaches were seen but these were generally less successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{AB} = \underset{\sim}{b}-\underset{\sim}{a} = \underset{\sim}{j}+\underset{\sim}{k}" />,
    reason: <><Katex tex="(1,2,3)-(1,1,2)" /> — the <Katex tex="x" /> components cancel.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{AC} = \underset{\sim}{c}-\underset{\sim}{a} = 2\underset{\sim}{i}+\underset{\sim}{j}+2\underset{\sim}{k}" />,
    reason: <><Katex tex="(3,2,4)-(1,1,2)" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{AB}\times\overrightarrow{AC} = \begin{vmatrix}\underset{\sim}{i}&\underset{\sim}{j}&\underset{\sim}{k}\\0&1&1\\2&1&2\end{vmatrix} = \underset{\sim}{i}+2\underset{\sim}{j}-2\underset{\sim}{k}" />,
    reason: <><Katex tex="(1)(2)-(1)(1)=1" />; <Katex tex="-[(0)(2)-(1)(2)]=2" />; <Katex tex="(0)(1)-(1)(2)=-2" />.</>,
  },
  {
    working: <Katex display tex="\left|\overrightarrow{AB}\times\overrightarrow{AC}\right| = \sqrt{1+4+4} = 3" />,
    reason: 'The area of the parallelogram the two vectors span.',
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \tfrac12\times3 = 1.5 \ \text{square units}} \ \checkmark" />,
    reason: 'A triangle is half its parallelogram. The halving step must be shown — this is a "show that".',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \tfrac12\times\text{base}\times\text{height}" />,
    reason: <>Take <Katex tex="AC" /> as the base; the height is then exactly the distance from <Katex tex="B" /> to the line <Katex tex="AC" />.</>,
  },
  {
    working: <Katex display tex="\left|\overrightarrow{AC}\right| = \sqrt{4+1+4} = 3" />,
    reason: 'Another tidy 3 — the numbers in this question are chosen to be friendly.',
  },
  {
    working: <Katex display tex="1.5 = \tfrac12\times3\times h" />,
    reason: 'Using the area from part a.',
  },
  {
    working: <Katex display tex="\boxed{h = 1 \ \text{unit}}" />,
    reason: <>Equivalently <Katex tex="h=\tfrac{\left|\overrightarrow{AB}\times\overrightarrow{AC}\right|}{\left|\overrightarrow{AC}\right|}=\tfrac33" />, which is the same calculation in one line.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Line direction } \underset{\sim}{d} = \underset{\sim}{i}-2\underset{\sim}{j}+2\underset{\sim}{k}; \qquad \text{plane normal } \underset{\sim}{n} = 2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: <>The coefficients in <Katex tex="2x-2y-z=-18" /> are the normal.</>,
  },
  {
    working: <Katex display tex="\cos(\alpha) = \frac{\left|\underset{\sim}{d}\cdot\underset{\sim}{n}\right|}{\left|\underset{\sim}{d}\right|\left|\underset{\sim}{n}\right|} = \frac{|2+4-2|}{3\times3} = \frac49" />,
    reason: 'The angle between the line and the normal. Absolute value keeps it acute.',
  },
  {
    working: <Katex display tex="\alpha = \arccos\!\left(\tfrac49\right) = 63.61^\circ" />,
    reason: 'This is not the answer — it is the angle to the normal, not to the plane. Half the marks were lost right here.',
  },
  {
    working: <Katex display tex="\theta = 90^\circ-\alpha" />,
    reason: 'The normal is perpendicular to the plane, so the two angles are complementary.',
  },
  {
    working: <Katex display tex="\boxed{\theta \approx 26^\circ}" />,
    reason: <>To the nearest degree. Equivalently <Katex tex="\sin\theta=\tfrac49" /> directly.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="L \text{ is normal to } \Gamma \implies \text{its direction is } \underset{\sim}{n} = 2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: 'A line perpendicular to a plane runs along the plane\u2019s normal.',
  },
  {
    working: <Katex display tex="\text{Through the origin} \implies \underset{\sim}{r}(t) = t\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)" />,
    reason: 'No constant term, since the line passes through (0, 0, 0).',
  },
  {
    working: <Katex display tex="\boxed{x = 2t, \quad y = -2t, \quad z = -t}" />,
    reason: 'The parametric form. The vector form was also accepted.',
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="d = \frac{\left|ax_0+by_0+cz_0-k\right|}{\sqrt{a^2+b^2+c^2}}" />,
    reason: <>The distance from a point to the plane <Katex tex="ax+by+cz=k" />.</>,
  },
  {
    working: <Katex display tex="= \frac{|2(0)-2(0)-(0)-(-18)|}{\sqrt{4+4+1}} = \frac{|18|}{3}" />,
    reason: <>The absolute value belongs in the formula from the start — writing <Katex tex="-6" /> and then silently making it positive is what the report objects to.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 6 \ \text{units}}" />,
    reason: <>Equivalently, project <Katex tex="\overrightarrow{OP}" /> for any point <Katex tex="P" /> on the plane onto the unit normal.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Substitute } x=2t,\ y=-2t,\ z=-t \text{ into } 2x-2y-z = -18" />,
    reason: <><Katex tex="D" /> is where the line <Katex tex="L" /> meets the plane, so its coordinates satisfy both.</>,
  },
  {
    working: <Katex display tex="2(2t)-2(-2t)-(-t) = 4t+4t+t = 9t" />,
    reason: 'All three terms have the same sign, which is exactly what being along the normal guarantees.',
  },
  {
    working: <Katex display tex="9t = -18 \implies t = -2" />,
    reason: 'One linear equation in one unknown.',
  },
  {
    working: <Katex display tex="\boxed{D(-4,\ 4,\ 2)}" />,
    reason: <>Check: <Katex tex="-8-8-2=-18" /> ✓, and <Katex tex="|OD|=\sqrt{16+16+4}=6" />, agreeing with part e. ✓</>,
  },
]

export default function SpecialistQ5_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (11 marks)</p>
        <p>
          The points with coordinates <Katex tex="A(1,1,2)" />, <Katex tex="B(1,2,3)" /> and{' '}
          <Katex tex="C(3,2,4)" /> all lie in a plane <Katex tex="\Pi" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Almost everything here comes from one vector: the normal. A cross product gives
            the area in part a., the coefficients of the Cartesian equation, the direction of
            the perpendicular line in part d., and the denominator of the distance formula in
            part e.
          </p>
          <p>
            The one thing to watch is part c. The dot product gives the angle between the line
            and the <em>normal</em>; the angle with the <em>plane</em> is its complement. Half
            the state stopped at <Katex tex="64^\circ" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Find the vectors <Katex tex="\overrightarrow{AB}" /> and{' '}
            <Katex tex="\overrightarrow{AC}" />, and hence show that the area of triangle{' '}
            <Katex tex="ABC" /> is 1.5 square units.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Find the shortest distance from point <Katex tex="B" /> to the line segment{' '}
            <Katex tex="AC" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A second plane, <Katex tex="\Gamma" />, has the Cartesian equation{' '}
          <Katex tex="2x-2y-z=-18" />.
        </p>
      </div>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            At what acute angle does the line given by{' '}
            <Katex tex="\underset{\sim}{r}(t)=3\underset{\sim}{i}+2\underset{\sim}{j}+4\underset{\sim}{k}+t\left(\underset{\sim}{i}-2\underset{\sim}{j}+2\underset{\sim}{k}\right)" />
            , <Katex tex="t\in\mathbb{R}" />, intersect the plane <Katex tex="\Gamma" />? Give
            your answer in degrees correct to the nearest degree.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A line <Katex tex="L" /> passes through the origin and is normal to the plane{' '}
          <Katex tex="\Gamma" />. The line <Katex tex="L" /> intersects <Katex tex="\Gamma" />{' '}
          at a point <Katex tex="D" />.
        </p>
      </div>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            Write down an equation of the line <Katex tex="L" /> in parametric form.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            Find the shortest distance from the origin to the plane <Katex tex="\Gamma" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={<>Find the coordinates of point <Katex tex="D" />.</>}
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
