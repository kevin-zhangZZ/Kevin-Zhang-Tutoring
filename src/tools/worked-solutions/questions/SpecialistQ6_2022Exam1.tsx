// 2022 Specialist Mathematics — Exam 1 Question 6 (6 marks). The angle between two vectors,
// then a dot product proof that the angle in a semicircle is a right angle. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import semicircleSrc from './spec-2022e1-q6b-semicircle.png'

const EXAM_A: SAExaminerStats = {
  marks: [12, 11, 76],
  average: 1.6,
  comment: (
    <>
      This question was answered very well. A majority of students used the scalar product
      formula. Some arithmetic errors were observed.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: <>This question was answered well. Occasional sign errors were made.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [27, 15, 10, 47],
  average: 1.8,
  comment: (
    <>
      In this question students were required to make use of the scalar (dot) product. Some
      algebraic errors were made and incorrect conclusions drawn.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta) = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{a}|\,|\underset{\sim}{b}|}" />,
    reason: 'The definition of the scalar product, rearranged.',
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (2)(1)+(-3)(2)+(6)(2) = 2-6+12 = 8" />,
    reason: 'Multiply matching components and add. The one negative term is where arithmetic slips happen.',
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}| = \sqrt{4+9+36} = \sqrt{49} = 7" />,
    reason: <>A Pythagorean quadruple — <Katex tex="2,-3,6" /> always gives 7.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{b}| = \sqrt{1+4+4} = \sqrt{9} = 3" />,
    reason: 'And another whole number, which is a hint the arithmetic is right.',
  },
  {
    working: <Katex display tex="\boxed{\cos(\theta) = \frac{8}{21}}" />,
    reason: <>Positive, so <Katex tex="\theta" /> is already the acute angle and no sign adjustment is needed. (Had the dot product come out negative, the acute angle's cosine would be its absolute value.)</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{OP} = x\underset{\sim}{i}+y\underset{\sim}{j}" />,
    reason: <><Katex tex="O" /> is the origin, so the position vector of <Katex tex="P" /> is just its coordinates.</>,
  },
  {
    working: <Katex display tex="= x\underset{\sim}{i}+\sqrt{a^2-(x-a)^2}\,\underset{\sim}{j}" />,
    reason: <>Using the given equation of the semicircle to write <Katex tex="y" /> in terms of <Katex tex="x" /> and <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="Q = (2a,\,0)" />,
    reason: <>The semicircle has centre <Katex tex="(a,0)" /> and radius <Katex tex="a" />, so <Katex tex="OQ" /> is a diameter of length <Katex tex="2a" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{QP} = \overrightarrow{OP}-\overrightarrow{OQ} = (x-2a)\underset{\sim}{i}+y\underset{\sim}{j}" />,
    reason: <>"Head minus tail". The report's "occasional sign errors" are students writing <Katex tex="(2a-x)" /> here — that is <Katex tex="\overrightarrow{PQ}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{QP} = (x-2a)\underset{\sim}{i}+\sqrt{a^2-(x-a)^2}\,\underset{\sim}{j}}" />,
    reason: <>Same substitution for <Katex tex="y" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{OP}\cdot\overrightarrow{QP} = x(x-2a)+y\cdot y" />,
    reason: 'Two perpendicular vectors are exactly those with zero scalar product, so compute it and see.',
  },
  {
    working: <Katex display tex="= x^2-2ax+\left(a^2-(x-a)^2\right)" />,
    reason: <>Replacing <Katex tex="y^2" /> using the equation of the semicircle — the only place the "point is on the curve" condition enters.</>,
  },
  {
    working: <Katex display tex="= x^2-2ax+a^2-\left(x^2-2ax+a^2\right)" />,
    reason: <>Expanding <Katex tex="(x-a)^2" />. Keeping the bracket until it is expanded avoids sign errors.</>,
  },
  {
    working: <Katex display tex="= x^2-2ax+a^2-x^2+2ax-a^2 = 0" />,
    reason: 'Every term cancels — and it does so for every x, not just one special position of P.',
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{OP}\cdot\overrightarrow{QP} = 0, \text{ so } \overrightarrow{OP} \perp \overrightarrow{QP}}" />,
    reason: <>The conclusion must actually be written down; a bare "= 0" is not an answer. Neither vector is the zero vector (<Katex tex="P\neq O,Q" />), so zero dot product really does mean perpendicular.</>,
  },
]

export default function SpecialistQ6_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (6 marks)</p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Find the cosine of the acute angle between the vectors{' '}
            <Katex tex="\underset{\sim}{a}=2\underset{\sim}{i}-3\underset{\sim}{j}+6\underset{\sim}{k}" />{' '}
            and{' '}
            <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+2\underset{\sim}{j}+2\underset{\sim}{k}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          <Katex tex="OPQ" /> is a semicircle of radius <Katex tex="a" /> with equation{' '}
          <Katex tex="y=\sqrt{a^2-(x-a)^2}" />. <Katex tex="P(x,y)" /> is a point on the
          semicircle <Katex tex="OPQ" />, as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={semicircleSrc}
            alt="A semicircle drawn above the x-axis from the origin O to a point Q on the positive x-axis, with centre marked a; a point P(x, y) sits on the arc, with arrows drawn from O to P and from Q to P — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            This is Thales' theorem — the angle in a semicircle is a right angle — which you
            have known since Year 9. Part b. asks you to prove it with vectors, and the
            algebra is engineered to collapse to nothing: the whole point is that{' '}
            <Katex tex="y^2=a^2-(x-a)^2" /> is exactly what is needed to cancel{' '}
            <Katex tex="x^2-2ax" />.
          </p>
          <p>
            Read the diagram before writing anything. The semicircle runs from{' '}
            <Katex tex="O" /> at the origin to <Katex tex="Q" />, with the marked point{' '}
            <Katex tex="a" /> its centre — so <Katex tex="Q" /> is at{' '}
            <Katex tex="(2a,0)" />, not <Katex tex="(a,0)" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="b.i"
        marks={1}
        statement={
          <>
            Express the vectors <Katex tex="\overrightarrow{OP}" /> and{' '}
            <Katex tex="\overrightarrow{QP}" /> in terms of <Katex tex="a" />,{' '}
            <Katex tex="x" />, <Katex tex="y" />, <Katex tex="\underset{\sim}{i}" /> and{' '}
            <Katex tex="\underset{\sim}{j}" />, where <Katex tex="\underset{\sim}{i}" /> is a
            unit vector in the direction of the positive <Katex tex="x" />-axis and{' '}
            <Katex tex="\underset{\sim}{j}" /> is a unit vector in the direction of the
            positive <Katex tex="y" />-axis.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={3}
        statement={
          <>
            Hence, using the vector scalar (dot) product, determine whether{' '}
            <Katex tex="\overrightarrow{OP}" /> is perpendicular to{' '}
            <Katex tex="\overrightarrow{QP}" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
