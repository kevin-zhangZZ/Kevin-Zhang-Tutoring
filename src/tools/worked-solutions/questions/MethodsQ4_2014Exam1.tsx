// 2014 Mathematical Methods (CAS) — Exam 1, Question 4 (2 marks). An index equation solved
// by matching bases. Question text transcribed from the original paper (no diagram given).
// Answer checked with sympy and against the VCAA examination report. Solution is original.
// This question has no lettered parts, so it uses the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [7, 18, 76],
  average: 1.7,
  comment: (
    <>
      Some students chose to work with a common base of 8. Students are reminded to simplify
      their final answer, especially for fraction answers.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2^{3x-3} = 8^{2-x}" />,
    reason: <>Both sides are powers of 2, so rewrite the right-hand side with base 2.</>,
  },
  {
    working: <Katex display tex="8 = 2^3 \implies 8^{2-x} = \left(2^3\right)^{2-x} = 2^{3(2-x)}" />,
    reason: <>The power-of-a-power law multiplies the indices.</>,
  },
  {
    working: <Katex display tex="2^{3x-3} = 2^{6-3x}" />,
    reason: <>Same base, so the indices must be equal.</>,
  },
  {
    working: <Katex display tex="3x-3 = 6-3x \implies 6x = 9" />,
    reason: <>Collecting.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac32}" />,
    reason: <>Simplified — <Katex tex="\tfrac96" /> is the same number but the report says it was not accepted as a final answer.</>,
  },
]

export default function MethodsQ4_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (2 marks)">
        <p>
          Solve the equation <Katex tex="2^{3x-3}=8^{2-x}" /> for <Katex tex="x" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={2} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
