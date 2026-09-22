// 2021 Specialist Mathematics — Exam 1 Question 7 (5 marks). A separable differential
// equation, then reading the maximum off the solution. Question text transcribed from the
// original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [15, 6, 14, 66],
  average: 2.3,
  comment: (
    <>
      The majority of students were able to separate the differential equation correctly and
      make progress towards the solution. Some sign errors were seen when the trigonometric
      function was integrated.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [58, 34, 8],
  average: 0.5,
  comment: (
    <>
      The maximum displacement of the particle could be found by inspection. Most students
      did not attempt or were unable to give the correct times at which the maximum
      occurred.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = x\sin(t) \implies \frac{1}{x}\,dx = \sin(t)\,dt" />,
    reason: 'Separating: everything in x on the left, everything in t on the right.',
  },
  {
    working: <Katex display tex="\int\frac{1}{x}\,dx = \int\sin(t)\,dt" />,
    reason: 'Integrating both sides.',
  },
  {
    working: <Katex display tex="\log_e|x| = -\cos(t)+c" />,
    reason: <>The antiderivative of <Katex tex="\sin" /> is <em>minus</em> cosine — the sign slip the report names.</>,
  },
  {
    working: <Katex display tex="t=0, \ x=1: \ \log_e(1) = -1+c \implies c = 1" />,
    reason: <><Katex tex="\cos(0)=1" />, and <Katex tex="\log_e(1)=0" />.</>,
  },
  {
    working: <Katex display tex="\log_e(x) = 1-\cos(t)" />,
    reason: <>Since <Katex tex="x=1>0" /> initially and the solution never reaches zero, the absolute value can be dropped.</>,
  },
  {
    working: <Katex display tex="\boxed{x = e^{1-\cos(t)}}" />,
    reason: <>Check: <Katex tex="x(0)=e^0=1" /> ✓, and <Katex tex="\tfrac{dx}{dt}=e^{1-\cos t}\sin t = x\sin t" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x = e^{1-\cos(t)} \text{ is largest when } 1-\cos(t) \text{ is largest}" />,
    reason: <><Katex tex="e^u" /> is increasing, so maximising <Katex tex="x" /> means maximising the exponent — no calculus needed.</>,
  },
  {
    working: <Katex display tex="\cos(t) \ge -1, \text{ so } 1-\cos(t) \le 2" />,
    reason: 'The exponent peaks at 2.',
  },
  {
    working: <Katex display tex="\boxed{x_{\max} = e^2\ \text{cm}}" />,
    reason: <>About 7.39 cm.</>,
  },
  {
    working: <Katex display tex="\cos(t) = -1 \implies t = \pi,\ 3\pi,\ 5\pi,\ \ldots" />,
    reason: 'The odd multiples of π.',
  },
  {
    working: <Katex display tex="\boxed{t = (2k+1)\pi \text{ seconds}, \quad k \in \{0,1,2,\ldots\}}" />,
    reason: <>Both halves are needed. Time starts at <Katex tex="t=0" />, so negative <Katex tex="k" /> is excluded — and the report says this half of the answer is what most students missed.</>,
  },
]

export default function SpecialistQ7_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
        <p>
          The velocity of a particle satisfies the differential equation{' '}
          <Katex tex="\dfrac{dx}{dt}=x\sin(t)" />, where <Katex tex="x" /> centimetres is its
          displacement relative to a fixed point <Katex tex="O" /> at time <Katex tex="t" />{' '}
          seconds. Initially, the displacement of the particle is 1 cm.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            Find an expression for <Katex tex="x" /> in terms of <Katex tex="t" />.
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
            Find the maximum displacement of the particle and the times at which this occurs.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
