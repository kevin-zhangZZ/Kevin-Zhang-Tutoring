// 2022 Mathematical Methods — Exam 1 Question 8 (5 marks). An area function is given, and
// the fundamental theorem of calculus runs the whole question. Question text transcribed
// from the original paper; the figure is a crop of VCAA's own artwork. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2022e1-q8-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      Students need to ensure they write their answer in an acceptable form; responses such
      as <Katex tex="\tfrac\pi3\sin\!\left(\tfrac\pi3\right)" /> needed to be simplified.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [71, 7, 22],
  average: 0.5,
  comment: (
    <>
      This question relied on linking <Katex tex="f(k)=A'(k)" />. Where students recognised
      this fact and used the product rule, they were generally successful. Common incorrect
      solutions gave the derivative of <Katex tex="A(k)" /> as <Katex tex="k\cos(k)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [66, 16, 18],
  average: 0.5,
  comment: (
    <>
      Many students obtained <Katex tex="\sin(k)" />, found its derivative and set it equal
      to zero. While acceptable, this was unnecessary and often led to errors. Some students
      did not recognise that <Katex tex="k" /> was a variable; others correctly got{' '}
      <Katex tex="\cos(k)=0" /> and then incorrectly wrote <Katex tex="k=1" />. Some set up
      the average <em>rate of change</em> rather than the average value.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="A(k) = k\sin(k) \implies A\!\left(\tfrac\pi3\right) = \tfrac\pi3\sin\!\left(\tfrac\pi3\right)" />,
    reason: 'Direct substitution — no integration required, because the area function is given.',
  },
  {
    working: <Katex display tex="\sin\!\left(\tfrac\pi3\right) = \tfrac{\sqrt3}{2}" />,
    reason: 'An exact value that must be used, not left unevaluated.',
  },
  {
    working: <Katex display tex="\boxed{\frac{\sqrt3\,\pi}{6}}" />,
    reason: <>About 0.91. Leaving it as <Katex tex="\tfrac\pi3\sin\tfrac\pi3" /> was not accepted.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="A(k) = \int_0^k f(x)\,dx" />,
    reason: <>The area under <Katex tex="f" /> from 0 to <Katex tex="k" /> — which is what the question says <Katex tex="A" /> measures.</>,
  },
  {
    working: <Katex display tex="\implies A'(k) = f(k)" />,
    reason: 'The fundamental theorem of calculus. Spotting this link is the whole question.',
  },
  {
    working: <Katex display tex="A'(k) = \frac{d}{dk}\bigl(k\sin(k)\bigr) = \sin(k)+k\cos(k)" />,
    reason: <>The <em>product</em> rule — writing just <Katex tex="k\cos(k)" /> is the report's named error.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac\pi3\right) = \sin\!\left(\tfrac\pi3\right)+\tfrac\pi3\cos\!\left(\tfrac\pi3\right) = \tfrac{\sqrt3}{2}+\tfrac\pi3\cdot\tfrac12" />,
    reason: <><Katex tex="\cos\tfrac\pi3=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{\sqrt3}{2}+\frac{\pi}{6}}" />,
    reason: <>About 1.39 — consistent with the graph, which peaks a little above 1.4 near <Katex tex="x=1" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value over } [0,k] = \frac{1}{k}\int_0^k f(x)\,dx" />,
    reason: <>The average <em>value</em>, not the average rate of change <Katex tex="\tfrac{f(k)-f(0)}{k}" /> — a distinction the report flags.</>,
  },
  {
    working: <Katex display tex="= \frac{A(k)}{k} = \frac{k\sin(k)}{k} = \sin(k)" />,
    reason: <>The <Katex tex="k" /> cancels, which is why the given form of <Katex tex="A" /> is so convenient.</>,
  },
  {
    working: <Katex display tex="\sin(k) \text{ is greatest when } k = \tfrac\pi2 \text{ on } [0,2\pi]" />,
    reason: <>Sine peaks at 1 there — no calculus needed. Differentiating and solving <Katex tex="\cos(k)=0" /> gives the same answer, but is where the report says errors crept in.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \tfrac\pi2}" />,
    reason: <>Note <Katex tex="\cos(k)=0" /> does not give <Katex tex="k=1" /> — that confusion between the value of <Katex tex="\sin" /> and the value of <Katex tex="k" /> is the report's other named error.</>,
  },
]

export default function MethodsQ8_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (5 marks)</p>
        <p>
          Part of the graph of <Katex tex="y=f(x)" /> is shown below. The rule{' '}
          <Katex tex="A(k)=k\sin(k)" /> gives the area bounded by the graph of{' '}
          <Katex tex="f" />, the horizontal axis and the line <Katex tex="x=k" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A hump-shaped curve from the origin rising to a peak near x = 1.2 and returning to the axis at x = 2, with the region left of the dashed line x = k shaded and labelled A(k) — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            State the value of <Katex tex="A\!\left(\tfrac\pi3\right)" />.
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
            Evaluate <Katex tex="f\!\left(\tfrac\pi3\right)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Consider the average value of the function <Katex tex="f" /> over the interval{' '}
            <Katex tex="x\in[0,k]" />, where <Katex tex="k\in[0,2\pi]" />. Find the value of{' '}
            <Katex tex="k" /> that results in the maximum average value.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
