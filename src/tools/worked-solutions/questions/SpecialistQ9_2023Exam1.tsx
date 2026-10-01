// 2023 Specialist Mathematics — Exam 1 Question 9 (6 marks). Planes and cross products, new
// to the 2023 study design. Question text transcribed from the original paper. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: <>This question was answered very well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: <>This question was also answered well and allowed students to confirm their answer from part a.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [21, 23, 56],
  average: 1.4,
  comment: (
    <>
      Most students realised that a cross product could be used to find a vector
      perpendicular to the plane. Some arithmetic errors were seen, both in the calculation of
      the cross product and in the substitution of a point to find the Cartesian equation of
      the plane.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      This question was answered well, with students realising that they needed to substitute
      the coordinates of <Katex tex="C" /> into the equation of the plane and solve the
      resulting linear equation.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      A small number of students gave the area of <Katex tex="\Delta ABD" /> rather than of
      the parallelogram. A common error was to calculate the area of the parallelogram by
      computing the product{' '}
      <Katex tex="\left|\overrightarrow{AB}\right|\times\left|\overrightarrow{AD}\right|" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{A } y\text{-axis intercept has } x = 0 \text{ and } z = 0" />,
    reason: <>A point on the y-axis has both other coordinates zero.</>,
  },
  {
    working: <Katex display tex="\boxed{D(0,\,2,\,0)}" />,
    reason: <>The intercept value 2 goes in the y slot.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\overrightarrow{AB} &= \overrightarrow{OB}-\overrightarrow{OA}\\ &= \left(-\underset{\sim}{i}-2\underset{\sim}{j}+4\underset{\sim}{k}\right)-\left(\underset{\sim}{i}+3\underset{\sim}{j}-2\underset{\sim}{k}\right)\end{aligned}" />,
    reason: <>
      The vector from <Katex tex="A" /> to <Katex tex="B" /> is <Katex tex="B" />'s position
      vector minus <Katex tex="A" />'s (end point minus start point), subtracted component by
      component.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{AB} = -2\underset{\sim}{i}-5\underset{\sim}{j}+6\underset{\sim}{k}}" />,
    reason: <><Katex tex="-1-1=-2" />, <Katex tex="-2-3=-5" />, <Katex tex="4-(-2)=6" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\overrightarrow{AD} &= \overrightarrow{OD}-\overrightarrow{OA}\\ &= 2\underset{\sim}{j}-\left(\underset{\sim}{i}+3\underset{\sim}{j}-2\underset{\sim}{k}\right)\end{aligned}" />,
    reason: <>
      <Katex tex="D(0,2,0)" /> from part a. has position vector{' '}
      <Katex tex="2\underset{\sim}{j}" />. If this does not come out as the vector given in
      the question, part a. was wrong.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{AD} = -\underset{\sim}{i}-\underset{\sim}{j}+2\underset{\sim}{k}}" />,
    reason: <><Katex tex="0-1=-1" />, <Katex tex="2-3=-1" />, <Katex tex="0-(-2)=2" />. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n} = \overrightarrow{AB}\times\overrightarrow{AD} = \begin{vmatrix}\underset{\sim}{i}&\underset{\sim}{j}&\underset{\sim}{k}\\-2&-5&6\\-1&-1&2\end{vmatrix}" />,
    reason: <>
      To write a plane's Cartesian equation you need a normal vector (one perpendicular to
      the plane). The cross product of two vectors is perpendicular to both of them, and{' '}
      <Katex tex="\overrightarrow{AB}" />, <Katex tex="\overrightarrow{AD}" /> both lie in the
      plane and are not parallel (neither is a multiple of the other), so their cross product
      is normal to the plane. "Hence" points you to part b.'s vectors.
    </>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&= \underset{\sim}{i}\bigl((-5)(2)-(6)(-1)\bigr)-\underset{\sim}{j}\bigl((-2)(2)-(6)(-1)\bigr)\\ &\qquad+\underset{\sim}{k}\bigl((-2)(-1)-(-5)(-1)\bigr)\end{aligned}"
      />
    ),
    reason: <>
      Expanding along the first row: each bracket is the <Katex tex="2\times2" /> determinant
      left when you cover that letter's row and column. The minus in front of the{' '}
      <Katex tex="\underset{\sim}{j}" /> term is easy to drop.
    </>,
  },
  {
    working: <Katex display tex="= -4\underset{\sim}{i}-2\underset{\sim}{j}-3\underset{\sim}{k}" />,
    reason: <>
      <Katex tex="-10+6=-4" />; <Katex tex="-(-4+6)=-2" />; <Katex tex="2-5=-3" />. Check
      before moving on: the dot product with <Katex tex="\overrightarrow{AB}" /> gives{' '}
      <Katex tex="8+10-18=0" /> ✓ and with <Katex tex="\overrightarrow{AD}" /> gives{' '}
      <Katex tex="4+2-6=0" /> ✓. A non-zero answer here would mean an arithmetic slip in the
      cross product.
    </>,
  },
  {
    working: <Katex display tex="-4x-2y-3z = -4(1)-2(3)-3(-2) = -4" />,
    reason: <>
      The normal's components are the coefficients of <Katex tex="x" />,{' '}
      <Katex tex="y" /> and <Katex tex="z" /> (see Background). The constant on the right is
      the same for every point in the plane, so substitute a known point,{' '}
      <Katex tex="A(1,3,-2)" />: <Katex tex="-4-6+6=-4" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{4x+2y+3z = 4}" />,
    reason: <>
      Multiplying both sides by <Katex tex="-1" /> for tidiness; the report gives both forms.
      Check with the other two points: <Katex tex="D(0,2,0)" /> gives{' '}
      <Katex tex="0+4+0=4" /> ✓ and <Katex tex="B(-1,-2,4)" /> gives{' '}
      <Katex tex="-4-4+12=4" /> ✓.
    </>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&C(a,-1,5) \text{ lies on the plane}\\ &\implies 4a+2(-1)+3(5) = 4\end{aligned}" />,
    reason: <>
      The plane contains <Katex tex="C" />, so its coordinates must satisfy the equation from
      part c. Substitute <Katex tex="x=a" />, <Katex tex="y=-1" />, <Katex tex="z=5" />.
    </>,
  },
  {
    working: <Katex display tex="4a-2+15 = 4 \implies 4a = -9" />,
    reason: <><Katex tex="-2+15=13" />, so <Katex tex="4a=4-13=-9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\frac94}" />,
    reason: <>
      Check: <Katex tex="4\left(-\tfrac94\right)-2+15=-9+13=4" /> ✓. A wrong plane equation in
      part c. carries straight into this answer, which is why the checks with{' '}
      <Katex tex="B" /> and <Katex tex="D" /> there are worth the time.
    </>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \left|\overrightarrow{AB}\times\overrightarrow{AD}\right|" />,
    reason: <>
      A parallelogram's area is base <Katex tex="\times" /> perpendicular height,{' '}
      <Katex tex="\left|\overrightarrow{AB}\right|\left|\overrightarrow{AD}\right|\sin\theta" />{' '}
      where <Katex tex="\theta" /> is the angle between the sides, and that is exactly{' '}
      <Katex tex="\left|\overrightarrow{AB}\times\overrightarrow{AD}\right|" />. Multiplying
      the two lengths alone leaves out the <Katex tex="\sin\theta" />, so it is only right when
      the sides are perpendicular.
    </>,
  },
  {
    working: <Katex display tex="= \left|-4\underset{\sim}{i}-2\underset{\sim}{j}-3\underset{\sim}{k}\right| = \sqrt{16+4+9}" />,
    reason: <>
      The cross product was found in part c.; its magnitude is{' '}
      <Katex tex="\sqrt{(-4)^2+(-2)^2+(-3)^2}" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt{29} \ \text{square units}}" />,
    reason: <>
      About <Katex tex="5.39" />. The common error,{' '}
      <Katex tex="\left|\overrightarrow{AB}\right|\left|\overrightarrow{AD}\right|=\sqrt{65}\sqrt{6}=\sqrt{390}\approx19.7" />,
      is almost four times too big: these sides are far from perpendicular{' '}
      (<Katex tex="\overrightarrow{AB}\cdot\overrightarrow{AD}=2+5+12=19" />, not 0; the angle
      between them is only about <Katex tex="16^\circ" />). Triangle <Katex tex="ABD" /> is
      half the parallelogram (diagonal <Katex tex="BD" /> cuts it in two), so{' '}
      <Katex tex="\tfrac{\sqrt{29}}{2}" /> answers a different question.
    </>,
  },
]

export default function SpecialistQ9_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (6 marks)</p>
        <p>
          A plane contains the points <Katex tex="A(1,3,-2)" />,{' '}
          <Katex tex="B(-1,-2,4)" /> and <Katex tex="C(a,-1,5)" />, where <Katex tex="a" /> is
          a real constant. The plane has a <Katex tex="y" />-axis intercept of 2 at the point{' '}
          <Katex tex="D" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Planes and the cross product arrived with the 2023 study design, and this question
            is the standard sequence: two vectors in the plane, their cross product as a
            normal, one known point to fix the constant. Everything after that is
            substitution.
          </p>
          <p>
            Why the normal gives the equation: take a normal vector{' '}
            <Katex tex="\underset{\sim}{n} = n_1\underset{\sim}{i}+n_2\underset{\sim}{j}+n_3\underset{\sim}{k}" />{' '}
            and a known point <Katex tex="A" /> in the plane. For any point{' '}
            <Katex tex="P(x,y,z)" /> in the plane, <Katex tex="\overrightarrow{AP}" /> lies in the
            plane, so it is perpendicular to <Katex tex="\underset{\sim}{n}" /> and{' '}
            <Katex tex="\underset{\sim}{n}\cdot\overrightarrow{AP}=0" />, which rearranges to{' '}
            <Katex tex="\underset{\sim}{n}\cdot\overrightarrow{OP}=\underset{\sim}{n}\cdot\overrightarrow{OA}" />.
            That is the Cartesian equation{' '}
            <Katex tex="n_1x+n_2y+n_3z=k" />: the normal's components are the coefficients, and
            the constant <Katex tex="k" /> comes from substituting any point in the plane.
          </p>
          <p>
            The cross product earns its keep twice over — once as the normal in part c., and
            again in part e., where its <em>magnitude</em> is the area of the parallelogram
            the two vectors span.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Coordinates"
        marks={1}
        statement={<>Write down the coordinates of point <Katex tex="D" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Vectors"
        marks={1}
        statement={
          <>
            Show that <Katex tex="\overrightarrow{AB}" /> and{' '}
            <Katex tex="\overrightarrow{AD}" /> are{' '}
            <Katex tex="-2\underset{\sim}{i}-5\underset{\sim}{j}+6\underset{\sim}{k}" /> and{' '}
            <Katex tex="-\underset{\sim}{i}-\underset{\sim}{j}+2\underset{\sim}{k}" />,
            respectively.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Plane Equation"
        marks={2}
        statement={<>Hence find the equation of the plane in Cartesian form.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Point in Plane"
        marks={1}
        statement={<>Find <Katex tex="a" />.</>}
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Parallelogram Area"
        marks={1}
        statement={
          <>
            <Katex tex="\overline{AB}" /> and <Katex tex="\overline{AD}" /> are adjacent
            sides of a parallelogram. Find the area of this parallelogram.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
