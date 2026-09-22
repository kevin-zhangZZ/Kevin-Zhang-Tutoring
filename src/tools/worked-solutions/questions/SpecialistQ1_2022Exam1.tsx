// 2022 Specialist Mathematics — Exam 1 Question 1 (3 marks). Completing the square on a
// quadratic with an imaginary coefficient, then solving it. Question text transcribed from
// the original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was answered well, with most students recognising the need to complete
      the square. Some arithmetic errors were observed.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [10, 19, 70],
  average: 1.6,
  comment: (
    <>
      Students could either use the result from Question 1a. or use the quadratic formula to
      find the solution to the equation.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="(z+ai)^2+b = z^2+2aiz+a^2i^2+b = z^2+2aiz-a^2+b" />,
    reason: <>Expand the target form first, then match it to <Katex tex="p(z)" />. Remember <Katex tex="i^2=-1" />, so the <Katex tex="a^2" /> term arrives negative.</>,
  },
  {
    working: <Katex display tex="2ai = 6i \implies a = 3" />,
    reason: <>Matching the coefficient of <Katex tex="z" />.</>,
  },
  {
    working: <Katex display tex="-a^2+b = -25 \implies -9+b = -25 \implies b = -16" />,
    reason: 'Matching the constant term.',
  },
  {
    working: <Katex display tex="\boxed{p(z) = (z+3i)^2-16}" />,
    reason: <>Both <Katex tex="a=3" /> and <Katex tex="b=-16" /> are real, as required. Check by expanding: <Katex tex="z^2+6iz-9-16=z^2+6iz-25" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(z+3i)^2-16 = 0 \implies (z+3i)^2 = 16" />,
    reason: 'Part a. has already done the hard work.',
  },
  {
    working: <Katex display tex="z+3i = \pm4" />,
    reason: <>Both square roots — dropping the negative one loses a solution, and a quadratic over <Katex tex="\mathbb{C}" /> always has two.</>,
  },
  {
    working: <Katex display tex="\boxed{z = 4-3i \quad\text{or}\quad z = -4-3i}" />,
    reason: <>Note these are <em>not</em> conjugates of each other. Sub back: <Katex tex="(4-3i)^2=7-24i" /> and <Katex tex="6i(4-3i)=18+24i" />, and <Katex tex="7-24i+18+24i-25=0" /> ✓.</>,
  },
]

export default function SpecialistQ1_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
        <p>
          Consider the equation <Katex tex="p(z)=z^2+6iz-25" />, <Katex tex="z\in\mathbb{C}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The coefficients here are <em>not</em> all real — there is a <Katex tex="6i" /> in
            the middle. That single fact kills the habit most students bring to quadratics
            over <Katex tex="\mathbb{C}" />: the conjugate root theorem only applies when
            every coefficient is real, so there is no reason to expect the two solutions to
            be conjugates, and indeed they are not. Completing the square, or the quadratic
            formula, still works exactly as usual.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Express <Katex tex="p(z)" /> in the form{' '}
            <Katex tex="p(z)=(z+ai)^2+b" />, where <Katex tex="a,b\in\mathbb{R}" />.
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
            Hence, or otherwise, find the solutions of the equation{' '}
            <Katex tex="p(z)=0" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
