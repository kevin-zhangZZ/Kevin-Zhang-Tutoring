// 2021 Mathematical Methods — Exam 1 Question 3 (5 marks). Range and period of a sine, then
// a general solution. Question text transcribed from the original paper. Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: (
    <>
      This question was well answered. Common errors were writing the interval as{' '}
      <Katex tex="(-2,2)" />, as a set, or simply writing 2.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>Students were mostly successful with this question.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [15, 20, 48, 17],
  average: 1.7,
  comment: (
    <>
      Most students attempted to find more than one solution. Those who could find the
      initial reference angle generally knew they needed to find multiple angles. Some gave
      only specific solutions within a period. The construction of a general solution, while
      attempted, was not done well. Common errors included writing <Katex tex="k\in R" /> or{' '}
      <Katex tex="k\in R^+" /> rather than <Katex tex="k\in Z" />, or leaving{' '}
      <Katex tex="k" /> uncategorised.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \sin(2x) \le 1" />,
    reason: <>The <Katex tex="2" /> inside affects only how fast the graph oscillates, never how high.</>,
  },
  {
    working: <Katex display tex="-2 \le 2\sin(2x) \le 2" />,
    reason: 'The amplitude 2 scales the output.',
  },
  {
    working: <Katex display tex="\boxed{[-2,\ 2]}" />,
    reason: <>A closed interval: a sine <em>attains</em> its extremes, so round brackets are wrong.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period of } \sin(nx) = \frac{2\pi}{n}" />,
    reason: <>Here <Katex tex="n=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\pi}" />,
    reason: 'The amplitude 2 has no effect on the period.',
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="2\sin(2x) = \sqrt3 \implies \sin(2x) = \frac{\sqrt3}{2}" />,
    reason: 'Divide by the amplitude first.',
  },
  {
    working: <Katex display tex="\text{reference angle: } \sin^{-1}\!\left(\tfrac{\sqrt3}{2}\right) = \tfrac\pi3" />,
    reason: 'An exact value worth knowing without a calculator.',
  },
  {
    working: <Katex display tex="2x = \tfrac\pi3+2k\pi \ \text{ or } \ 2x = \pi-\tfrac\pi3+2k\pi = \tfrac{2\pi}{3}+2k\pi, \quad k\in Z" />,
    reason: <>Sine is positive in the first and second quadrants, so there are two families — and <Katex tex="+2k\pi" /> makes each one general, because the domain is all of <Katex tex="R" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac\pi6+k\pi \ \text{ or } \ x = \tfrac\pi3+k\pi" />,
    reason: <>Dividing everything by 2 — including the <Katex tex="2k\pi" />, which becomes <Katex tex="k\pi" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac\pi6+k\pi \ \text{ or } \ x = \tfrac\pi3+k\pi, \quad k\in Z}" />,
    reason: <>State <Katex tex="k\in Z" /> explicitly. The two families sit <Katex tex="\tfrac\pi6" /> apart inside each period of <Katex tex="\pi" />, matching part b.</>,
  },
]

export default function MethodsQ3_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (5 marks)</p>
        <p>
          Consider the function <Katex tex="g:R\to R" />, <Katex tex="g(x)=2\sin(2x)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>State the range of <Katex tex="g" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={<>State the period of <Katex tex="g" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Solve <Katex tex="2\sin(2x)=\sqrt3" /> for <Katex tex="x\in R" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
