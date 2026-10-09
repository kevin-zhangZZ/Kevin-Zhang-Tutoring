// 2023 Specialist Mathematics — Exam 2, Section B Question 5 (11 marks). Planes and lines in
// three dimensions: a cross-product area, a perpendicular distance, the angle a line makes
// with a plane, and where the normal through the origin meets it. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.
// Widgets: b. spec-2023e2-q5b-height (slide P along AC: the shortest BP is the perpendicular
// height, giving part a.'s area); f. spec-2023e2-q5f-foot (walk along L until 9t = −18; toggle
// shows the wrong-side point 6 units along +n). Both re-audited 9 Oct 2026 (numbers rechecked with
// sympy) and kept: b. and f. are the only parts under 40% full marks. Concise/Detailed pass 9 Oct:
// alternatives, checks, traps and report commentary moved into each row's `more`. Final review
// 9 Oct: Background names the b./c./f. traps; e. `more` explains where the distance formula
// comes from and describes the report's resolute method in the report's order.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
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
      The magnitude of this cross product,{' '}
      <Katex tex="\left|\overrightarrow{AB}\right|\left|\overrightarrow{AC}\right|\sin A" />, is the area of the
      parallelogram with sides <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AC}" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \tfrac12\times3 = 1.5 \ \text{square units}}" />,
    reason: <>Triangle <Katex tex="ABC" /> is half of that parallelogram. As required.</>,
    more: <>
      <p>
        Because the answer 1.5 is given, the marks are for the working: the cross product, its magnitude 3 and the
        halving must all be written. The report notes that not all students who found the vectors were able to
        &lsquo;show that&rsquo; the area was 1.5.
      </p>
      <p>
        One alternative uses the angle at <Katex tex="A" />:{' '}
        <Katex tex="\cos A=\tfrac{\overrightarrow{AB}\cdot\overrightarrow{AC}}{|\overrightarrow{AB}||\overrightarrow{AC}|}=\tfrac{3}{\sqrt2\times3}=\tfrac{1}{\sqrt2}" />,
        so <Katex tex="A=45^\circ" /> and{' '}
        <Katex tex="\text{Area}=\tfrac12\times\sqrt2\times3\times\sin45^\circ=1.5" />.
      </p>
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \tfrac12\times\left|\overrightarrow{AC}\right|\times h" />,
    reason: <>
      The shortest distance from <Katex tex="B" /> to <Katex tex="AC" /> is along the perpendicular. With{' '}
      <Katex tex="AC" /> as the base, that perpendicular is the height <Katex tex="h" /> of triangle{' '}
      <Katex tex="ABC" />, whose area part a. already gave.
    </>,
    more: <>
      Why the perpendicular is shortest: for any other point <Katex tex="P" /> on <Katex tex="AC" />,{' '}
      <Katex tex="BP" /> is the hypotenuse of a right-angled triangle with <Katex tex="h" /> as one side, so{' '}
      <Katex tex="BP>h" />. Seeing the distance as a height means no new vectors are needed. In the diagram below,
      slide <Katex tex="P" /> along <Katex tex="AC" /> and watch <Katex tex="|\overrightarrow{BP}|" /> bottom out
      at 1, exactly where <Katex tex="BP" /> meets <Katex tex="AC" /> at right angles.
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
    </>,
    more: <>
      If the scalar resolute were negative or bigger than <Katex tex="\left|\overrightarrow{AC}\right|" />, the foot
      would lie off the segment, and the shortest distance would be to the nearer endpoint instead. Here the foot is{' '}
      <Katex tex="A+\tfrac13\overrightarrow{AC}=\left(\tfrac53,\tfrac43,\tfrac83\right)" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\text{Shortest distance} = 1 \ \text{unit}}" />,
    reason: <>The perpendicular height, with its foot on the segment.</>,
    more: <>
      The report notes that successful students used a wide variety of valid approaches. Two that use only part a.&apos;s
      vectors:{' '}
      <Katex tex="h=\tfrac{\left|\overrightarrow{AB}\times\overrightarrow{AC}\right|}{\left|\overrightarrow{AC}\right|}=\tfrac33=1" />,
      the same calculation in one line; or Pythagoras with the scalar resolute from the line above,{' '}
      <Katex tex="h^2=\left|\overrightarrow{AB}\right|^2-1^2=2-1=1" />.
    </>,
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
      <Katex tex="\alpha" /> between the line and the <em>normal</em>. Both lengths are{' '}
      <Katex tex="\left|\underset{\sim}{d}\right|=\left|\underset{\sim}{n}\right|=\sqrt{9}=3" />, and the absolute value keeps <Katex tex="\alpha" /> acute.
    </>,
  },
  {
    working: <Katex display tex="\alpha = \arccos\!\left(\tfrac49\right) \approx 63.61^\circ" />,
    reason: <>Calculator in degree mode. Not the answer yet: the question asks for the angle with the plane.</>,
    more: <>
      The report notes a significant number of students did not proceed beyond <Katex tex="64^\circ" />. A quick
      test shows it can&apos;t be the answer: a line standing straight up out of a plane meets it at{' '}
      <Katex tex="90^\circ" />, yet its direction is parallel to <Katex tex="\underset{\sim}{n}" />, so this
      formula would give <Katex tex="0^\circ" />.
    </>,
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
    reason: <><Katex tex="90^\circ-63.61^\circ=26.39^\circ" />, to the nearest degree.</>,
    more: <>
      Equivalently, since <Katex tex="\cos(90^\circ-\theta)=\sin\theta" />, you can go straight to{' '}
      <Katex tex="\sin\theta=\tfrac49" />, giving <Katex tex="\theta=\arcsin\!\left(\tfrac49\right)\approx26.39^\circ" />.
    </>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Direction of } L = \underset{\sim}{n} = 2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: <>
      &lsquo;Normal to the plane&rsquo; means perpendicular to it, so <Katex tex="L" /> runs along the normal{' '}
      <Katex tex="\underset{\sim}{n}" /> from part c., read off <Katex tex="2x-2y-z=-18" />.
    </>,
  },
  {
    working: <Katex display tex="\text{Through the origin} \implies \underset{\sim}{r}(t) = t\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)" />,
    reason: <>
      A line is a point on it plus <Katex tex="t" /> times its direction. The point is the origin, so there is no
      constant term.
    </>,
  },
  {
    working: <Katex display tex="\boxed{x = 2t, \quad y = -2t, \quad z = -t}" />,
    reason: <>Parametric form gives each coordinate on its own, in terms of <Katex tex="t" />.</>,
    more: <>
      The report notes the vector form <Katex tex="\underset{\sim}{r}(t)=2t\underset{\sim}{i}-2t\underset{\sim}{j}-t\underset{\sim}{k}" />{' '}
      was also accepted. Any non-zero multiple of the direction (for example{' '}
      <Katex tex="x=-2t,\ y=2t,\ z=t" />) describes the same line.
    </>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{distance} = \frac{\left|ax_0+by_0+cz_0-k\right|}{\sqrt{a^2+b^2+c^2}}" />,
    reason: <>
      The distance from the point <Katex tex="(x_0,y_0,z_0)" /> to the plane <Katex tex="ax+by+cz=k" />: substitute
      the point into the left side, subtract <Katex tex="k" />, and divide by the length of the normal.
    </>,
    more: <>
      Where the formula comes from: the shortest route from a point to a plane runs along the plane&apos;s normal. So
      take any point <Katex tex="P" /> on the plane; the distance is the size of the scalar resolute of the vector
      from <Katex tex="(x_0,y_0,z_0)" /> to <Katex tex="P" /> in the direction of the unit normal{' '}
      <Katex tex="\hat{\underset{\sim}{n}}=\tfrac{1}{|\underset{\sim}{n}|}\underset{\sim}{n}" />. Every point of
      the plane has <Katex tex="ax+by+cz=k" />, and that turns the resolute into the formula above, whichever{' '}
      <Katex tex="P" /> you chose.
    </>,
  },
  {
    working: <Katex display tex="= \frac{|2(0)-2(0)-(0)-(-18)|}{\sqrt{4+4+1}} = \frac{|18|}{3}" />,
    reason: <>
      The point is the origin and <Katex tex="k=-18" />. The bottom is the length of{' '}
      <Katex tex="\underset{\sim}{n}=2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />, which is 3.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\text{Shortest distance} = 6 \ \text{units}}" />,
    reason: <><Katex tex="18\div3" />. The absolute value bars keep a distance positive.</>,
    more: <>
      <p>
        The report&apos;s solution works out that resolute first, then gives the formula as an alternative. The point{' '}
        <Katex tex="(-9,0,0)" /> is on <Katex tex="\psi" /> (since <Katex tex="2(-9)=-18" />), with position vector{' '}
        <Katex tex="-9\underset{\sim}{i}" />, and{' '}
        <Katex tex="\left|-9\underset{\sim}{i}\cdot\tfrac13\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)\right|=6" />.
        Inside the bars the dot product is <Katex tex="-6" />; that sign only shows which side of <Katex tex="O" /> the
        plane is on.
      </p>
      <p>
        The report flags working such as &lsquo;<Katex tex="\ldots=-6=6" />&rsquo; from students who left the bars
        out and then fixed the sign: <Katex tex="-6" /> does not equal 6. Write the bars from the start, in either
        method, and the sign never has to be patched.
      </p>
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
    reason: <>Substitute into the left side and collect the <Katex tex="t" /> terms.</>,
    more: <>
      Because <Katex tex="L" /> runs along <Katex tex="\underset{\sim}{n}" />, each term is a component of{' '}
      <Katex tex="\underset{\sim}{n}" /> squared, times <Katex tex="t" />:{' '}
      <Katex tex="2(2t)" />, <Katex tex="(-2)(-2t)" /> and <Katex tex="(-1)(-t)" />. So the left side is{' '}
      <Katex tex="t\left|\underset{\sim}{n}\right|^2=9t" />: walking along <Katex tex="L" />, the value of{' '}
      <Katex tex="2x-2y-z" /> changes steadily with <Katex tex="t" />. The diagram below lets you walk along{' '}
      <Katex tex="L" /> until it reaches <Katex tex="-18" />.
    </>,
  },
  {
    working: <Katex display tex="9t = -18 \implies t = -2" />,
    more: <>
      <Katex tex="t" /> is negative because <Katex tex="\psi" /> lies on the{' '}
      <Katex tex="-\underset{\sim}{n}" /> side of <Katex tex="O" /> (the right-hand side <Katex tex="-18" /> is
      negative). The report notes that other approaches were generally less successful. One that is easy to get
      wrong: starting from part e.&apos;s distance and stepping 6 units along{' '}
      <Katex tex="+\underset{\sim}{n}" /> gives <Katex tex="(4,-4,-2)" />, which is 6 units from <Katex tex="O" /> but
      not on <Katex tex="\psi" />: <Katex tex="2(4)-2(-4)-(-2)=18\neq-18" />. Substituting the parametric form gets
      the sign right automatically.
    </>,
  },
  {
    working: <Katex display tex="\boxed{D(-4,\ 4,\ 2)}" />,
    reason: <>
      Put <Katex tex="t=-2" /> into <Katex tex="x=2t" />, <Katex tex="y=-2t" />, <Katex tex="z=-t" />.
    </>,
    more: <>
      Check: <Katex tex="2(-4)-2(4)-2=-18" /> ✓, and <Katex tex="|OD|=\sqrt{16+16+4}=6" />, the distance from part e.
      ✓ That is no coincidence: <Katex tex="D" /> is the foot of the perpendicular from <Katex tex="O" />, the
      point of <Katex tex="\psi" /> closest to the origin.
    </>,
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts a. and b. are about triangle <Katex tex="ABC" /> in the plane{' '}
              <Katex tex="\Pi" />, whose area comes from a cross product. Parts c.–f. are about the second plane <Katex tex="\psi" />, and almost
              everything there comes from its normal{' '}
              <Katex tex="\underset{\sim}{n}=2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />,
              read straight off the coefficients of <Katex tex="2x-2y-z=-18" />. It is in the angle
              in part c., the direction of the line <Katex tex="L" /> in part d., and the denominator
              of the distance in part e.
            </p>
            <p>
              Students lost the most marks in parts b. and f., and many stopped short in part c.
              In b., the distance is a height of triangle <Katex tex="ABC" />, so it follows from
              the area in part a. In c., the dot product gives the angle with the{' '}
              <em>normal</em>; the angle with the <em>plane</em> is its complement. In f., <Katex tex="D" />{' '}
              comes from putting part d.&apos;s parametric form into the plane&apos;s equation.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
        <Explore title="D is at t = −2, on the −n side of O, not 6 units along +n">
          <FootWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
