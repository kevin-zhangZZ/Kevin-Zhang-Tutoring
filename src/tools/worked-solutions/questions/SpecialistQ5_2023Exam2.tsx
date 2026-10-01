// 2023 Specialist Mathematics — Exam 2, Section B Question 5 (11 marks). Planes and lines in
// three dimensions: a cross-product area, a perpendicular distance, the angle a line makes
// with a plane, and where the normal through the origin meets it. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.
// Widgets: b. spec-2023e2-q5b-height (slide P along AC: the shortest BP is the perpendicular
// height, giving part a.'s area); f. spec-2023e2-q5f-foot (walk along L until 9t = −18; toggle
// shows the wrong-side point 6 units along +n).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const HeightWidget = lazyWidget(() => import('../interactives/spec-2023e2-q5b-height'))
const FootWidget = lazyWidget(() => import('../interactives/spec-2023e2-q5f-foot'))

const EXAM_A: SAExaminerStats = {
  marks: [8, 29, 63],
  average: 1.6,
  comment: (
    <>
      Most students successfully obtained the required vectors. Not all of those students were
      able to 'show that' the required area was 1.5 square units. Subsequent to finding the
      vectors, a variety of correct alternative approaches were used.
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
      Many students who did not initially use absolute values, inappropriately dealt with
      inconvenient negative values, with working such as '<Katex tex="\ldots=-6=6" />'.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [53, 13, 34],
  average: 0.8,
  comment: (
    <>
      Most students recognised that the use of the parametric form from Question 5d. was an
      efficient approach. Some other approaches were seen but these were generally less
      successful.
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
    reason: <>
      The magnitude of a cross product, <Katex tex="|\underset{\sim}{u}||\underset{\sim}{v}|\sin\theta" />, is the area
      of the parallelogram with sides <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AC}" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \tfrac12\times3 = 1.5 \ \text{square units}}" />,
    reason: <>
      Triangle <Katex tex="ABC" /> is half of that parallelogram. Because the answer 1.5 is given, every step must be
      written: the magnitude 3 and the halving. As required.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \tfrac12\times\left|\overrightarrow{AC}\right|\times h" />,
    reason: <>
      The shortest distance from <Katex tex="B" /> to <Katex tex="AC" /> is along the perpendicular. With{' '}
      <Katex tex="AC" /> as the base, that perpendicular is the height <Katex tex="h" /> of triangle{' '}
      <Katex tex="ABC" />, and part a. already gave the area — so no new vectors are needed.
    </>,
  },
  {
    working: <Katex display tex="\left|\overrightarrow{AC}\right| = \sqrt{2^2+1^2+2^2} = 3" />,
    reason: <><Katex tex="\overrightarrow{AC}=2\underset{\sim}{i}+\underset{\sim}{j}+2\underset{\sim}{k}" /> from part a.</>,
  },
  {
    working: <Katex display tex="1.5 = \tfrac12\times3\times h \implies h = 1" />,
    reason: <>Using the area 1.5 from part a.</>,
  },
  {
    working: <Katex display tex="\frac{\overrightarrow{AB}\cdot\overrightarrow{AC}}{\left|\overrightarrow{AC}\right|} = \frac{0+1+2}{3} = 1, \quad 0 < 1 < 3" />,
    reason: <>
      The question says line <em>segment</em>, so check the foot of the perpendicular lands between{' '}
      <Katex tex="A" /> and <Katex tex="C" />. The scalar resolute of <Katex tex="\overrightarrow{AB}" /> along{' '}
      <Katex tex="\overrightarrow{AC}" /> puts the foot 1 unit from <Katex tex="A" />, inside a segment of length 3.
      (If it fell outside, the shortest distance would be to an endpoint instead.)
    </>,
  },
  {
    working: <Katex display tex="\boxed{\text{Shortest distance} = 1 \ \text{unit}}" />,
    reason: <>Equivalently <Katex tex="h=\tfrac{\left|\overrightarrow{AB}\times\overrightarrow{AC}\right|}{\left|\overrightarrow{AC}\right|}=\tfrac33" />, which is the same calculation in one line.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}\underset{\sim}{d} = \underset{\sim}{i}-2\underset{\sim}{j}+2\underset{\sim}{k} \\ \underset{\sim}{n} = 2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\end{gathered}" />,
    reason: <>
      The line&apos;s direction <Katex tex="\underset{\sim}{d}" /> is the vector multiplying <Katex tex="t" />. The
      plane&apos;s normal <Katex tex="\underset{\sim}{n}" /> is the coefficients
      of <Katex tex="x" />, <Katex tex="y" />, <Katex tex="z" /> in its Cartesian equation{' '}
      <Katex tex="2x-2y-z=-18" />.
    </>,
  },
  {
    working: <Katex display tex="\cos(\alpha) = \frac{\left|\underset{\sim}{d}\cdot\underset{\sim}{n}\right|}{\left|\underset{\sim}{d}\right|\left|\underset{\sim}{n}\right|} = \frac{|2+4-2|}{3\times3} = \frac49" />,
    reason: <>
      The plane&apos;s equation gives its normal, not a direction lying in the plane, so the dot product
      of <Katex tex="\underset{\sim}{d}" /> and <Katex tex="\underset{\sim}{n}" /> gives the angle{' '}
      <Katex tex="\alpha" /> between the line and the <em>normal</em>. The absolute value keeps{' '}
      <Katex tex="\alpha" /> acute.
    </>,
  },
  {
    working: <Katex display tex="\alpha = \arccos\!\left(\tfrac49\right) \approx 63.61^\circ" />,
    reason: <>This is not the answer — it is the angle to the normal, not to the plane. The report notes a significant number of students did not proceed beyond <Katex tex="64^\circ" />.</>,
  },
  {
    working: <Katex display tex="\theta = 90^\circ-\alpha" />,
    reason: <>
      The angle with the plane is measured from the plane&apos;s surface, but the normal sticks out at{' '}
      <Katex tex="90^\circ" /> to that surface. So the angle to the plane and the angle to the normal add to{' '}
      <Katex tex="90^\circ" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\theta \approx 26^\circ}" />,
    reason: <>To the nearest degree. Equivalently <Katex tex="\sin\theta=\tfrac49" /> directly.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Direction of } L = \underset{\sim}{n} = 2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: <>A line perpendicular to a plane runs along the plane’s normal.</>,
  },
  {
    working: <Katex display tex="\text{Through the origin} \implies \underset{\sim}{r}(t) = t\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)" />,
    reason: <>No constant term, since the line passes through (0, 0, 0).</>,
  },
  {
    working: <Katex display tex="\boxed{x = 2t, \quad y = -2t, \quad z = -t}" />,
    reason: <>
      The parametric form. The vector form was also accepted. Any non-zero multiple of the direction (for
      example <Katex tex="x=-2t,\ y=2t,\ z=t" />) describes the same line.
    </>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="d = \frac{\left|ax_0+by_0+cz_0-k\right|}{\sqrt{a^2+b^2+c^2}}" />,
    reason: <>
      The distance from the point <Katex tex="(x_0,y_0,z_0)" /> to the plane <Katex tex="ax+by+cz=k" />: substitute
      the point into the left side, subtract <Katex tex="k" />, and divide by the length of the normal.
    </>,
  },
  {
    working: <Katex display tex="= \frac{|2(0)-2(0)-(0)-(-18)|}{\sqrt{4+4+1}} = \frac{|18|}{3}" />,
    reason: <>The absolute value belongs in the formula from the start — the report notes many students who did not use absolute values dealt inappropriately with negative values, writing '<Katex tex="\ldots=-6=6" />'.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 6 \ \text{units}}" />,
    reason: <>
      Equivalently, take any point on <Katex tex="\psi" />, such as <Katex tex="P(-9,0,0)" />, and resolve{' '}
      <Katex tex="\overrightarrow{OP}" /> onto the unit normal:{' '}
      <Katex tex="-9\underset{\sim}{i}\cdot\tfrac13\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)=-6" />.
      The negative sign only says <Katex tex="\psi" /> is on the <Katex tex="-\underset{\sim}{n}" /> side of{' '}
      <Katex tex="O" />; a distance is the absolute value, <Katex tex="|-6|=6" />.
    </>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}2x-2y-z = -18 \text{ with} \\ x=2t,\ y=-2t,\ z=-t\end{gathered}" />,
    reason: <>
      <Katex tex="D" /> is on the line <Katex tex="L" /> and on the plane <Katex tex="\psi" />, so its coordinates
      satisfy both. Using the parametric form from part d. turns this into one equation in <Katex tex="t" />.
    </>,
  },
  {
    working: <Katex display tex="2(2t)-2(-2t)-(-t) = 4t+4t+t = 9t" />,
    reason: <>
      Each term is a coefficient of the normal times itself times <Katex tex="t" />, so the left side becomes{' '}
      <Katex tex="t\left|\underset{\sim}{n}\right|^2=9t" />.
    </>,
  },
  {
    working: <Katex display tex="9t = -18 \implies t = -2" />,
    reason: <>
      <Katex tex="t" /> is negative because <Katex tex="\psi" /> lies on the{' '}
      <Katex tex="-\underset{\sim}{n}" /> side of <Katex tex="O" /> (the right-hand side <Katex tex="-18" /> is
      negative). Stepping 6 units along <Katex tex="+\underset{\sim}{n}" /> instead gives{' '}
      <Katex tex="(4,-4,-2)" />, which is not on <Katex tex="\psi" />.
    </>,
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
            Parts a. and b. are about triangle <Katex tex="ABC" /> in the plane{' '}
            <Katex tex="\Pi" />: a cross product gives its area, and that area gives the height
            in part b. Parts c.–f. are about the second plane <Katex tex="\psi" />, and almost
            everything there comes from its normal{' '}
            <Katex tex="\underset{\sim}{n}=2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />,
            read straight off the coefficients of <Katex tex="2x-2y-z=-18" />. It is in the angle
            in part c., the direction of the line <Katex tex="L" /> in part d., and the denominator
            of the distance in part e.
          </p>
          <p>
            The one thing to watch is part c. The dot product gives the angle between the line
            and the <em>normal</em>; the angle with the <em>plane</em> is its complement. The
            report notes a significant number of students stopped at <Katex tex="64^\circ" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Cross Product Area"
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
        topic="Shortest Distance"
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
        <Explore title="The shortest distance from B is the triangle's height on base AC">
          <HeightWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A second plane, <Katex tex="\psi" />, has the Cartesian equation{' '}
          <Katex tex="2x-2y-z=-18" />.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Line-Plane Angle"
        marks={2}
        statement={
          <>
            At what acute angle does the line given by{' '}
            <Katex tex="\underset{\sim}{r}(t)=3\underset{\sim}{i}+2\underset{\sim}{j}+4\underset{\sim}{k}+t\left(\underset{\sim}{i}-2\underset{\sim}{j}+2\underset{\sim}{k}\right)" />
            , <Katex tex="t\in R" />, intersect the plane <Katex tex="\psi" />? Give
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
          <Katex tex="\psi" />. The line <Katex tex="L" /> intersects <Katex tex="\psi" />{' '}
          at a point <Katex tex="D" />.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Line Equation"
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
        topic="Distance to Plane"
        marks={2}
        statement={
          <>
            Find the shortest distance from the origin to the plane <Katex tex="\psi" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Intersection Point"
        marks={2}
        statement={<>Find the coordinates of point <Katex tex="D" />.</>}
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
        <Explore title="Walk along L until the plane's equation is satisfied">
          <FootWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
