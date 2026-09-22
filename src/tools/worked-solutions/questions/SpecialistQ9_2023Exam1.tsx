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
      perpendicular to the plane. Some arithmetic errors were seen, both in the cross product
      and in substituting a point to find the Cartesian equation.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      This question was answered well, with students realising that they needed to substitute
      the coordinates of <Katex tex="C" /> into the equation of the plane.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      A small number of students gave the area of <Katex tex="\triangle ABD" /> rather than
      the parallelogram. A common error was to compute{' '}
      <Katex tex="\left|\overrightarrow{AB}\right|\left|\overrightarrow{AD}\right|" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{A } y\text{-axis intercept has } x = 0 \text{ and } z = 0" />,
    reason: 'A point on the y-axis has both other coordinates zero.',
  },
  {
    working: <Katex display tex="\boxed{D(0,\,2,\,0)}" />,
    reason: 'The intercept value 2 goes in the y slot.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{AB} = \underset{\sim}{b}-\underset{\sim}{a} = \left(-\underset{\sim}{i}-2\underset{\sim}{j}+4\underset{\sim}{k}\right)-\left(\underset{\sim}{i}+3\underset{\sim}{j}-2\underset{\sim}{k}\right)" />,
    reason: 'Head minus tail, component by component.',
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{AB} = -2\underset{\sim}{i}-5\underset{\sim}{j}+6\underset{\sim}{k}} \ \checkmark" />,
    reason: <><Katex tex="-1-1=-2" />, <Katex tex="-2-3=-5" />, <Katex tex="4-(-2)=6" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{AD} = \underset{\sim}{d}-\underset{\sim}{a} = 2\underset{\sim}{j}-\left(\underset{\sim}{i}+3\underset{\sim}{j}-2\underset{\sim}{k}\right)" />,
    reason: <>Using <Katex tex="D" /> from part a. — if this does not come out as stated, part a. was wrong.</>,
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{AD} = -\underset{\sim}{i}-\underset{\sim}{j}+2\underset{\sim}{k}} \ \checkmark" />,
    reason: <><Katex tex="0-1=-1" />, <Katex tex="2-3=-1" />, <Katex tex="0-(-2)=2" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n} = \overrightarrow{AB}\times\overrightarrow{AD} = \begin{vmatrix}\underset{\sim}{i}&\underset{\sim}{j}&\underset{\sim}{k}\\-2&-5&6\\-1&-1&2\end{vmatrix}" />,
    reason: 'The cross product of two vectors in the plane is normal to it.',
  },
  {
    working: <Katex display tex="= \underset{\sim}{i}\bigl((-5)(2)-(6)(-1)\bigr)-\underset{\sim}{j}\bigl((-2)(2)-(6)(-1)\bigr)+\underset{\sim}{k}\bigl((-2)(-1)-(-5)(-1)\bigr)" />,
    reason: <>Expanding along the first row. The minus in front of the <Katex tex="\underset{\sim}{j}" /> term is the usual casualty.</>,
  },
  {
    working: <Katex display tex="= -4\underset{\sim}{i}-2\underset{\sim}{j}-3\underset{\sim}{k}" />,
    reason: <><Katex tex="-10+6=-4" />; <Katex tex="-(-4+6)=-2" />; <Katex tex="2-5=-3" />.</>,
  },
  {
    working: <Katex display tex="-4x-2y-3z = -4(1)-2(3)-3(-2) = -4" />,
    reason: <>Substituting <Katex tex="A(1,3,-2)" /> to find the constant.</>,
  },
  {
    working: <Katex display tex="\boxed{4x+2y+3z = 4}" />,
    reason: <>Multiplying by <Katex tex="-1" /> for tidiness. Check with <Katex tex="D(0,2,0)" />: <Katex tex="0+4+0=4" /> ✓ and <Katex tex="B(-1,-2,4)" />: <Katex tex="-4-4+12=4" /> ✓.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="C(a,-1,5) \text{ lies on the plane} \implies 4a+2(-1)+3(5) = 4" />,
    reason: 'Substitute and solve — that is the whole question.',
  },
  {
    working: <Katex display tex="4a-2+15 = 4 \implies 4a = -9" />,
    reason: 'Collecting.',
  },
  {
    working: <Katex display tex="\boxed{a = -\frac94}" />,
    reason: <>Check: <Katex tex="4\left(-\tfrac94\right)-2+15=-9+13=4" /> ✓.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \left|\overrightarrow{AB}\times\overrightarrow{AD}\right|" />,
    reason: <>The magnitude of the cross product <em>is</em> the area of the parallelogram — not the product of the two lengths, which would be the area only if they were perpendicular.</>,
  },
  {
    working: <Katex display tex="= \left|-4\underset{\sim}{i}-2\underset{\sim}{j}-3\underset{\sim}{k}\right| = \sqrt{16+4+9}" />,
    reason: 'The cross product is already sitting there from part c.',
  },
  {
    working: <Katex display tex="\boxed{\sqrt{29} \ \text{square units}}" />,
    reason: <>About <Katex tex="5.39" />. The triangle <Katex tex="ABD" /> would be half this — the report's other named error.</>,
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
            The cross product earns its keep twice over — once as the normal in part c., and
            again in part e., where its <em>magnitude</em> is the area of the parallelogram
            the two vectors span.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Write down the coordinates of point <Katex tex="D" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
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
        marks={2}
        statement={<>Hence find the equation of the plane in Cartesian form.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={1}
        statement={<>Find <Katex tex="a" />.</>}
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
            <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" /> are
            adjacent sides of a parallelogram. Find the area of this parallelogram.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
