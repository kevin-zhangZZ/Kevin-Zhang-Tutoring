// 2015 Specialist Mathematics — Exam 1, Question 7 (5 marks). Solving sin(2x) = sin(x), then
// the related cosec inequality. Question text transcribed from the original paper (no diagram
// given). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [7, 45, 14, 34],
  average: 1.8,
  comment: (
    <>
      The most common error was to use the double-angle formula for{' '}
      <Katex tex="\sin(2x)" /> but then cancel the <Katex tex="\sin(x)" /> term from both
      sides, thereby losing a set of solutions. Some tried a graphical approach and missed
      solutions. Others got only two solutions for <Katex tex="\sin(x)=0" /> (usually{' '}
      <Katex tex="0" /> and <Katex tex="\pi" />). Some were not able to solve{' '}
      <Katex tex="2\cos(x)=1" />. Errors were made with exact values.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [59, 30, 11],
  average: 0.5,
  comment: (
    <>
      High-scoring students used a graphical argument for this question. Typical errors
      included incorrect simplification with inequalities (multiplying by a term that could be
      negative but not changing the inequality), choosing the incorrect interval in the first
      quadrant, including endpoint(s) and giving single-value answers rather than intervals. A
      common incorrect response was <Katex tex="x=\tfrac\pi3" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(2x) = \sin(x)" />,
    reason: <>Expand the left side with the double-angle formula so both sides are in terms of <Katex tex="x" /> alone.</>,
  },
  {
    working: <Katex display tex="2\sin(x)\cos(x) = \sin(x)" />,
    reason: <><Katex tex="\sin(2x)=2\sin(x)\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="2\sin(x)\cos(x)-\sin(x) = 0" />,
    reason: <>Move everything to one side. Do <em>not</em> divide by <Katex tex="\sin(x)" /> — that throws away every solution where <Katex tex="\sin(x)=0" />, which is exactly what the report says most students did.</>,
  },
  {
    working: <Katex display tex="\sin(x)\bigl(2\cos(x)-1\bigr) = 0" />,
    reason: <>Factorising instead of cancelling.</>,
  },
  {
    working: <Katex display tex="\sin(x) = 0 \implies x = 0,\ \pi,\ 2\pi" />,
    reason: <>All three, since the domain <Katex tex="[0,2\pi]" /> is closed at both ends.</>,
  },
  {
    working: <Katex display tex="\cos(x) = \tfrac12 \implies x = \tfrac\pi3,\ \tfrac{5\pi}3" />,
    reason: <>Cosine is positive in the first and fourth quadrants, so the second solution is <Katex tex="2\pi-\tfrac\pi3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0,\ \tfrac\pi3,\ \pi,\ \tfrac{5\pi}3,\ 2\pi}" />,
    reason: <>Five solutions in all.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{cosec}(2x) < \operatorname{cosec}(x) \iff \frac{1}{\sin(2x)} < \frac{1}{\sin(x)}" />,
    reason: <>Rewriting in terms of sine. Cross-multiplying is unsafe while the signs are unknown, so split the domain at <Katex tex="\tfrac\pi2" /> — which is exactly where the question has already cut it.</>,
  },
  {
    working: <Katex display tex="x\in\left(0,\tfrac\pi2\right):\quad \sin(x)>0,\ \sin(2x)>0" />,
    reason: <>Here <Katex tex="2x\in(0,\pi)" />, so both sines are positive and both cosecants are positive.</>,
  },
  {
    working: <Katex display tex="\frac{1}{\sin(2x)} < \frac{1}{\sin(x)} \iff \sin(2x) > \sin(x)" />,
    reason: <>For positive quantities, the larger reciprocal belongs to the smaller number — so the inequality flips.</>,
  },
  {
    working: <Katex display tex="2\sin(x)\cos(x) > \sin(x) \iff \cos(x) > \tfrac12" />,
    reason: <>Dividing by <Katex tex="\sin(x)" /> is legitimate <em>here</em> because it is strictly positive on this interval.</>,
  },
  {
    working: <Katex display tex="x \in \left(0,\tfrac\pi3\right)" />,
    reason: <>Cosine decreases from 1 across this interval, so <Katex tex="\cos(x)>\tfrac12" /> holds to the <em>left</em> of <Katex tex="\tfrac\pi3" /> — the report notes many students picked the interval on the wrong side. The endpoint is excluded, since part a. showed the two are equal there.</>,
  },
  {
    working: <Katex display tex="x\in\left(\tfrac\pi2,\pi\right):\quad \sin(x)>0\ \text{but}\ \sin(2x)<0" />,
    reason: <>Now <Katex tex="2x\in(\pi,2\pi)" />, where sine is negative.</>,
  },
  {
    working: <Katex display tex="\operatorname{cosec}(2x) < 0 < \operatorname{cosec}(x)" />,
    reason: <>A negative is always less than a positive, so the whole interval satisfies the inequality — no algebra needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(0,\tfrac\pi3\right)\cup\left(\tfrac\pi2,\pi\right)}" />,
    reason: <>The answer is a set of intervals, not a list of values — <Katex tex="x=\tfrac\pi3" /> alone was the common wrong response.</>,
  },
]

export default function SpecialistQ7_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (5 marks)</p>
        <p>
          Part b. is the same trigonometric comparison as part a., but as an inequality —
          and the domain it hands you, split at <Katex tex="\tfrac\pi2" />, is a strong hint
          that the sign of <Katex tex="\sin(2x)" /> changes there and the two halves need
          separate treatment.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={<>Solve <Katex tex="\sin(2x)=\sin(x)" />, <Katex tex="x\in[0,2\pi]" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Find{' '}
            <Katex tex="\left\{x:\operatorname{cosec}(2x)<\operatorname{cosec}(x),\ x\in\left(0,\tfrac\pi2\right)\cup\left(\tfrac\pi2,\pi\right)\right\}" />
            .
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
