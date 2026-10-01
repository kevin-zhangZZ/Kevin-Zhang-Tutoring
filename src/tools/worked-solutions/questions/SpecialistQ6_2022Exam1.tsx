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
      This question was answered very well. A majority of students utilised the approach
      shown above. Some arithmetic errors were observed.
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
    reason: <>The scalar product satisfies <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}|\,|\underset{\sim}{b}|\cos(\theta)" />, where <Katex tex="\theta" /> is the angle between the vectors. Divide both sides by <Katex tex="|\underset{\sim}{a}|\,|\underset{\sim}{b}|" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (2)(1)+(-3)(2)+(6)(2) = 2-6+12 = 8" />,
    reason: <>Multiply matching components and add, keeping the minus sign on the middle product: <Katex tex="(-3)(2)=-6" />.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}| = \sqrt{4+9+36} = \sqrt{49} = 7" />,
    reason: <>Square each component and add. Squaring removes the minus sign, so <Katex tex="(-3)^2=9" />.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{b}| = \sqrt{1+4+4} = \sqrt{9} = 3" />,
    reason: <>Both magnitudes come out as whole numbers, which is a hint the arithmetic is right.</>,
  },
  {
    working: <Katex display tex="\boxed{\cos(\theta) = \frac{8}{7\times 3} = \frac{8}{21}}" />,
    reason: <>The cosine is positive, so <Katex tex="0<\theta<\frac{\pi}{2}" />: <Katex tex="\theta" /> is already the acute angle and no adjustment is needed. (Had the dot product been negative, <Katex tex="\theta" /> would be obtuse; the acute angle is then <Katex tex="\pi-\theta" />, and since <Katex tex="\cos(\pi-\theta)=-\cos(\theta)" /> its cosine is the positive version of the same fraction.)</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{OP} = x\underset{\sim}{i}+y\underset{\sim}{j}" />,
    reason: <><Katex tex="O" /> is the origin, so the position vector of <Katex tex="P" /> is just its coordinates.</>,
  },
  {
    working: <Katex display tex="Q = (2a,\,0)" />,
    reason: <><Katex tex="Q" /> is where the semicircle meets the <Katex tex="x" />-axis again. Put <Katex tex="y=0" />: <Katex tex="(x-a)^2=a^2" />, so <Katex tex="x-a=\pm a" />, giving <Katex tex="x=0" /> (that is <Katex tex="O" />) or <Katex tex="x=2a" />. Equivalently, the centre is <Katex tex="(a,0)" /> and the radius is <Katex tex="a" />, so <Katex tex="OQ" /> is a diameter of length <Katex tex="2a" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{QP} = \overrightarrow{OP}-\overrightarrow{OQ} = (x-2a)\underset{\sim}{i}+y\underset{\sim}{j}" />,
    reason: <><Katex tex="\overrightarrow{QP}" /> starts at <Katex tex="Q" /> and ends at <Katex tex="P" />, so subtract the start's position vector from the end's. <Katex tex="\overrightarrow{OQ}=2a\underset{\sim}{i}" /> has no <Katex tex="\underset{\sim}{j}" /> part, so the <Katex tex="y" /> is unchanged. Subtracting the other way round gives <Katex tex="\overrightarrow{PQ}=(2a-x)\underset{\sim}{i}-y\underset{\sim}{j}" />, the reverse arrow — the report notes occasional sign errors.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}\overrightarrow{OP} &= x\underset{\sim}{i}+\sqrt{a^2-(x-a)^2}\,\underset{\sim}{j}\\ \overrightarrow{QP} &= (x-2a)\underset{\sim}{i}+\sqrt{a^2-(x-a)^2}\,\underset{\sim}{j}\end{aligned}}" />,
    reason: <><Katex tex="P" /> is on the semicircle, so its <Katex tex="y" />-coordinate is <Katex tex="\sqrt{a^2-(x-a)^2}" />. The question allows <Katex tex="y" /> in the answer, so the forms above with <Katex tex="y" /> are also fine; substituting now saves a step in part b.ii. The question asks for both vectors, so give both.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{OP}\cdot\overrightarrow{QP} = x(x-2a)+y^2" />,
    reason: <>Two non-zero vectors are perpendicular exactly when their scalar product is 0, so calculate it: multiply matching components from part b.i and add (<Katex tex="y\times y=y^2" />).</>,
  },
  {
    working: <Katex display tex="= x^2-2ax+\left(a^2-(x-a)^2\right)" />,
    reason: <>Squaring <Katex tex="y=\sqrt{a^2-(x-a)^2}" /> gives <Katex tex="y^2=a^2-(x-a)^2" />. This is where the fact that <Katex tex="P" /> lies on the semicircle is used.</>,
  },
  {
    working: <Katex display tex="= x^2-2ax+a^2-\left(x^2-2ax+a^2\right)" />,
    reason: <>Expand <Katex tex="(x-a)^2=x^2-2ax+a^2" /> inside a bracket first, because the minus sign in front applies to all three terms.</>,
  },
  {
    working: <Katex display tex="= x^2-2ax+a^2-x^2+2ax-a^2 = 0" />,
    reason: <>Removing the bracket changes the sign of every term inside it. Everything cancels, for every value of <Katex tex="x" />, so the result holds wherever <Katex tex="P" /> is on the semicircle.</>,
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{OP}\cdot\overrightarrow{QP} = 0, \text{ so } \overrightarrow{OP} \perp \overrightarrow{QP}}" />,
    reason: <>"Determine whether" needs a written conclusion, not just "= 0" (the report notes incorrect conclusions were drawn). With <Katex tex="P" /> on the arc between <Katex tex="O" /> and <Katex tex="Q" />, as in the diagram, neither vector is the zero vector, so a zero scalar product means <Katex tex="\overrightarrow{OP}" /> is perpendicular to <Katex tex="\overrightarrow{QP}" />.</>,
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
        topic="Angle Between Vectors"
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
            may have met in circle geometry in earlier years. Part b. asks you to prove it with
            vectors, and the algebra is set up to cancel completely: the whole point is that{' '}
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
        topic="Vector Expression"
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
        topic="Scalar Product"
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
