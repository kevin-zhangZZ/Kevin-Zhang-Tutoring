// 2022 Mathematical Methods — Exam 1 Question 5 (5 marks). An exponential equation, then
// the maximal domain of a log of a quadratic. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = { marks: [6, 18, 76], average: 1.7 }

const EXAM_B: SAExaminerStats = {
  marks: [30, 13, 30, 27],
  average: 1.6,
  comment: (
    <>
      Many students knew to factorise the quadratic, but were not always able to use this to
      reason the correct domain. Those who sketched the parabola were usually able to
      determine the intervals. A common error was writing the interval as an intersection,{' '}
      <Katex tex="(-\infty,-1)\cap(3,\infty)" />, rather than a union.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="10^{3x-13} = 100 = 10^2" />,
    reason: 'Write both sides as powers of the same base — no logarithms needed.',
  },
  {
    working: <Katex display tex="3x-13 = 2" />,
    reason: <>Since <Katex tex="10^u" /> is one-to-one, the exponents must be equal.</>,
  },
  {
    working: <Katex display tex="3x = 15 \implies \boxed{x = 5}" />,
    reason: <>Check: <Katex tex="10^{15-13}=10^2=100" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(u) \text{ requires } u>0 \implies x^2-2x-3>0" />,
    reason: 'Strictly greater than zero — the logarithm is undefined at zero as well as below it.',
  },
  {
    working: <Katex display tex="x^2-2x-3 = (x-3)(x+1)" />,
    reason: <>Factorising: <Katex tex="-3\times1=-3" /> and <Katex tex="-3+1=-2" /> ✓.</>,
  },
  {
    working: <Katex display tex="(x-3)(x+1)>0 \iff x<-1 \text{ or } x>3" />,
    reason: 'A positive parabola with roots at −1 and 3 is above the axis outside them — sketching it settles the direction instantly.',
  },
  {
    working: <Katex display tex="\boxed{(-\infty,-1)\cup(3,\infty)}" />,
    reason: <>A <em>union</em>: no single <Katex tex="x" /> is both less than <Katex tex="-1" /> and greater than 3, so writing <Katex tex="\cap" /> describes the empty set.</>,
  },
]

export default function MethodsQ5_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Solve <Katex tex="10^{3x-13}=100" /> for <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={
          <>
            Find the maximal domain of <Katex tex="f" />, where{' '}
            <Katex tex="f(x)=\log_e\left(x^2-2x-3\right)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
