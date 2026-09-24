// 2025 Specialist Mathematics — Exam 1 Question 5 (4 marks). Two particles colliding:
// matching positions, then perpendicular velocities, then equal acceleration magnitudes.
// Question text transcribed from the original paper. Answers checked with sympy and against
// the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [6, 94],
  average: 0.9,
  comment: <>This question was answered very well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [33, 37, 30],
  average: 1.0,
  comment: (
    <>
      Students needed to recognise that the dot (scalar) product of the two velocity vectors was
      zero and that <Katex tex="b+2=1+a" /> when <Katex tex="t=1" />.
      <br />
      A common incorrect response to the equation <Katex tex="(3+2a)(1+a)=0" /> was{' '}
      <Katex tex="a=-\dfrac{2}{3}" /> in addition to <Katex tex="a=-1" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [75, 25],
  average: 0.2,
  comment: (
    <>
      Some students gave <Katex tex="a=-5" /> and <Katex tex="b=-6" /> in addition to the correct
      solution. In this case, students were not awarded the mark for this question.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{collision at } t=1 \implies \underset{\sim}{r_P}(1) = \underset{\sim}{r_Q}(1)" />,
    reason: <>Both components must match — but only the j components involve c.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \quad -1 = 2(1)^2+c(1)+1" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component of <Katex tex="\underset{\sim}{r_P}" /> is the constant <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="-1 = 3+c" />,
    reason: <>Evaluating the right side.</>,
  },
  {
    working: <Katex display tex="\boxed{c = -4}" />,
    reason: <>As required. The <Katex tex="\underset{\sim}{i}" /> components then give <Katex tex="1+a = b+2" />, i.e. <Katex tex="b = a-1" /> — a relation part b. will need.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v_P}(t) = \left(3t^2+2at\right)\underset{\sim}{i}, \qquad \underset{\sim}{v_Q}(t) = (b+2)\underset{\sim}{i}+(4t+c+1)\underset{\sim}{j}" />,
    reason: <>Differentiating each position vector. <Katex tex="\underset{\sim}{r_P}" /> has a constant <Katex tex="\underset{\sim}{j}" /> component, so <Katex tex="\underset{\sim}{v_P}" /> has none.</>,
  },
  {
    working: <Katex display tex="t=1, \ c=-4: \quad \underset{\sim}{v_P}(1) = (3+2a)\underset{\sim}{i}, \qquad \underset{\sim}{v_Q}(1) = (b+2)\underset{\sim}{i}+\underset{\sim}{j}" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component of <Katex tex="\underset{\sim}{v_Q}" /> is <Katex tex="4t-3" />, which is 1 at <Katex tex="t=1" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v_P}(1)\cdot\underset{\sim}{v_Q}(1) = (3+2a)(b+2)+0 = 0" />,
    reason: <>Perpendicular means zero dot product. <Katex tex="\underset{\sim}{v_P}(1)" /> has no <Katex tex="\underset{\sim}{j}" /> component, so only the <Katex tex="\underset{\sim}{i}" /> components contribute.</>,
  },
  {
    working: <Katex display tex="b = a-1 \implies (3+2a)(a+1) = 0" />,
    reason: <>Substituting the relation from part a.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\tfrac32 \ \text{ or } \ a = -1}" />,
    reason: <>The first makes <Katex tex="\underset{\sim}{v_P}(1)=\underset{\sim}{0}" />; the second makes <Katex tex="\underset{\sim}{v_Q}(1)=\underset{\sim}{j}" />, at right angles to <Katex tex="\underset{\sim}{v_P}(1)=\underset{\sim}{i}" />. Both were required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a_P}(t) = (6t+2a)\underset{\sim}{i}, \qquad \underset{\sim}{a_Q}(t) = 4\underset{\sim}{j}" />,
    reason: <>Differentiating again. <Katex tex="\underset{\sim}{r_Q}" /> has a <em>linear</em> <Katex tex="\underset{\sim}{i}" /> component, so its second derivative there is zero.</>,
  },
  {
    working: <Katex display tex="t=1: \quad \left|\underset{\sim}{a_P}\right| = |6+2a|, \qquad \left|\underset{\sim}{a_Q}\right| = 4" />,
    reason: <>The magnitudes to equate.</>,
  },
  {
    working: <Katex display tex="|6+2a| = 4 \implies 6+2a = \pm4 \implies a = -1 \ \text{ or } \ a = -5" />,
    reason: <>Two candidates from this condition alone.</>,
  },
  {
    working: <Katex display tex="\text{part b. also requires } a\in\left\{-\tfrac32,\,-1\right\}" />,
    reason: <>The velocities are still at right angles — that condition has not been withdrawn, so both must hold at once.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1, \qquad b = a-1 = -2}" />,
    reason: <>The only value in both sets. Offering <Katex tex="a=-5,\ b=-6" /> as well cost the mark, because that pair fails the perpendicularity condition.</>,
  },
]

export default function SpecialistQ5_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          The position vectors of particles <Katex tex="P" /> and <Katex tex="Q" /> at time{' '}
          <Katex tex="t" /> seconds are given by
        </p>
        <div className="py-1">
          <Katex
            display
            tex="\underset{\sim}{r_P}(t) = \left(t^3+at^2\right)\underset{\sim}{i}-\underset{\sim}{j} \qquad\text{and}\qquad \underset{\sim}{r_Q}(t) = (bt+2t)\underset{\sim}{i}+\left(2t^2+ct+t\right)\underset{\sim}{j}"
          />
        </div>
        <p>
          where <Katex tex="t\ge0" /> and <Katex tex="a,b,c\in R" />.
          <br />
          The particles collide when <Katex tex="t=1" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Particle <Katex tex="P" /> only ever moves along <Katex tex="\underset{\sim}{i}" />,
            so its velocity has no <Katex tex="\underset{\sim}{j}" /> component. The dot product
            of the two velocities at <Katex tex="t=1" /> is therefore just the product of their{' '}
            <Katex tex="\underset{\sim}{i}" /> components, <Katex tex="(3+2a)(b+2)" />, and the
            collision condition <Katex tex="b+2=1+a" /> from part a. turns it into a factorised
            quadratic in <Katex tex="a" />.
          </p>
          <p>
            Part c. adds a condition rather than replacing one. The perpendicularity from
            part b. still holds, so the answer must satisfy both — which is why{' '}
            <Katex tex="a=-5" /> is rejected even though it solves part c.'s equation.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Collision"
        marks={1}
        statement={
          <>
            Show that for collision to occur when <Katex tex="t=1" />, the value of{' '}
            <Katex tex="c" /> is <Katex tex="-4" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>When the particles collide, their velocities are at right angles to each other.</p>
      </div>

      <PartCard
        letter="b"
        topic="Perpendicular Velocities"
        marks={2}
        statement={
          <>
            Find the two possible values of <Katex tex="a" /> for collision to occur when{' '}
            <Katex tex="t=1" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Acceleration"
        marks={1}
        statement={
          <>
            When the particles collide at <Katex tex="t=1" />, the magnitudes of their
            accelerations are equal.
            <br />
            Find the values of <Katex tex="a" /> and{' '}
            <Katex tex="b" /> for collision to occur when <Katex tex="t=1" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
