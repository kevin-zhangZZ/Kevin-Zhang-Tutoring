// 2025 Specialist Mathematics — Exam 1 Question 5 (4 marks). Two particles colliding:
// matching positions, then perpendicular velocities, then equal acceleration magnitudes.
// Question text transcribed from the original paper. Answers checked with sympy and against
// the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

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
    reason: <>Colliding means being at the same point at the same time. Both components must match, but only the <Katex tex="\underset{\sim}{j}" /> components involve <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{j}: \quad -1 &= 2(1)^2+c(1)+1 \\ -1 &= 3+c \end{aligned}" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component of <Katex tex="\underset{\sim}{r_P}" /> is the constant <Katex tex="-1" />; set it equal to that of <Katex tex="\underset{\sim}{r_Q}(1)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c = -4}" />,
    reason: <>As required. The <Katex tex="\underset{\sim}{i}" /> components then give <Katex tex="1+a = b+2" />, i.e. <Katex tex="b = a-1" /> — a relation part b. will need.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{v_P}(t) &= \left(3t^2+2at\right)\underset{\sim}{i} \\ \underset{\sim}{v_Q}(t) &= (b+2)\underset{\sim}{i}+(4t+c+1)\underset{\sim}{j} \end{aligned}" />,
    reason: <>Differentiating each position vector. <Katex tex="\underset{\sim}{r_P}" /> has a constant <Katex tex="\underset{\sim}{j}" /> component, so <Katex tex="\underset{\sim}{v_P}" /> has none.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &t=1,\ c=-4: \\ \underset{\sim}{v_P}(1) &= (3+2a)\underset{\sim}{i} \\ \underset{\sim}{v_Q}(1) &= (b+2)\underset{\sim}{i}+\underset{\sim}{j} \end{aligned}" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component of <Katex tex="\underset{\sim}{v_Q}" /> is <Katex tex="4t-3" />, which is 1 at <Katex tex="t=1" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v_P}(1)\cdot\underset{\sim}{v_Q}(1) = (3+2a)(b+2)+0 = 0" />,
    reason: <>The velocities are at right angles at collision (given), so their dot product is zero. <Katex tex="\underset{\sim}{v_P}(1)" /> has no <Katex tex="\underset{\sim}{j}" /> component, so only the <Katex tex="\underset{\sim}{i}" /> components contribute.</>,
  },
  {
    working: <Katex display tex="b = a-1 \implies (3+2a)(a+1) = 0" />,
    reason: <>One equation, two unknowns — so use the collision itself: matching <Katex tex="\underset{\sim}{i}" /> components at <Katex tex="t=1" /> (part a.) give <Katex tex="1+a=b+2" />.</>,
    more: <>This is the second fact the report says students needed. Replacing <Katex tex="b+2" /> by <Katex tex="a+1" /> leaves an equation in <Katex tex="a" /> alone, already factorised.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\tfrac32 \ \text{ or } \ a = -1}" />,
    reason: <>Setting each factor to zero: <Katex tex="3+2a=0" /> gives <Katex tex="2a=-3" />, so <Katex tex="a=-\tfrac32" />; and <Katex tex="a+1=0" /> gives <Katex tex="a=-1" />.</>,
    more: (
      <>
        The report's common error was <Katex tex="a=-\tfrac23" /> from the first factor — the
        fraction flipped. Check by substituting back: <Katex tex="3+2\left(-\tfrac32\right)=0" />,
        but <Katex tex="3+2\left(-\tfrac23\right)=\tfrac53\ne0" />. Both values are wanted (the
        question asks for two): <Katex tex="a=-\tfrac32" /> makes{' '}
        <Katex tex="\underset{\sim}{v_P}(1)=\underset{\sim}{0}" />, so the dot product is zero
        ("at right angles" is read as a zero dot product, which the zero vector satisfies, and
        the report's answer lists this value);{' '}
        <Katex tex="a=-1" /> gives <Katex tex="b=-2" />, so{' '}
        <Katex tex="\underset{\sim}{v_P}(1)=\underset{\sim}{i}" /> and{' '}
        <Katex tex="\underset{\sim}{v_Q}(1)=\underset{\sim}{j}" />, clearly at right angles.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a_P}(t) = (6t+2a)\underset{\sim}{i}, \qquad \underset{\sim}{a_Q}(t) = 4\underset{\sim}{j}" />,
    reason: <>Differentiating again. <Katex tex="\underset{\sim}{r_Q}" /> has a <em>linear</em> <Katex tex="\underset{\sim}{i}" /> component, so its second derivative there is zero.</>,
  },
  {
    working: <Katex display tex="t=1: \quad \left|\underset{\sim}{a_P}\right| = |6+2a|, \qquad \left|\underset{\sim}{a_Q}\right| = 4" />,
    reason: <>Substituting <Katex tex="t=1" />: <Katex tex="\underset{\sim}{a_P}" /> points along <Katex tex="\underset{\sim}{i}" /> with length <Katex tex="|6+2a|" />; <Katex tex="\underset{\sim}{a_Q}" /> is constant with length 4.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} |6+2a| = 4 &\implies 6+2a = \pm4 \\ &\implies a = -1 \ \text{ or } \ a = -5 \end{aligned}" />,
    reason: <>Equal magnitudes. An absolute value equal to 4 means the inside is <Katex tex="4" /> or <Katex tex="-4" />, giving two candidates.</>,
    more: <>The report's solution writes only <Katex tex="6+2a=4" />; the <Katex tex="-4" /> case gives <Katex tex="a=-5" />, which is the value that has to be ruled out next.</>,
  },
  {
    working: <Katex display tex="\text{part b. also requires } a\in\left\{-\tfrac32,\,-1\right\}" />,
    reason: <>The velocities are still at right angles — that condition has not been withdrawn, so both must hold at once.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1, \qquad b = a-1 = -2}" />,
    reason: <>The only value in both sets; then <Katex tex="b" /> from <Katex tex="b=a-1" /> (part a.).</>,
    more: (
      <>
        Giving <Katex tex="a=-5,\ b=-6" /> as well cost the mark (report). Check why it fails: then{' '}
        <Katex tex="\underset{\sim}{v_P}(1)=-7\underset{\sim}{i}" /> and{' '}
        <Katex tex="\underset{\sim}{v_Q}(1)=-4\underset{\sim}{i}+\underset{\sim}{j}" />, whose
        dot product is <Katex tex="28\ne0" />, so the velocities are not at right angles. The other
        part b. value fails here too: <Katex tex="a=-\tfrac32" /> gives{' '}
        <Katex tex="|6-3|=3\ne4" />.
      </>
    ),
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
            tex="\begin{aligned} \underset{\sim}{r_P}(t) &= \left(t^3+at^2\right)\underset{\sim}{i}-\underset{\sim}{j} \quad\text{and} \\ \underset{\sim}{r_Q}(t) &= (bt+2t)\underset{\sim}{i}+\left(2t^2+ct+t\right)\underset{\sim}{j} \end{aligned}"
          />
        </div>
        <p>
          where <Katex tex="t\ge0" /> and <Katex tex="a,b,c\in R" />.
          <br />
          The particles collide when <Katex tex="t=1" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Every condition in this question is read at the moment of collision, <Katex tex="t=1" />,
              and each one gives an equation: equal positions (part a.), perpendicular velocities
              (part b.) and equal acceleration magnitudes (part c.).
            </p>
            <p>
              The conditions accumulate. Part c. adds a condition rather than replacing one, so its
              answer must satisfy part b.'s as well.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
