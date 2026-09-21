// 2014 Mathematical Methods (CAS) — Exam 1, Question 3 (2 marks). Solving 2cos(2x) = -sqrt3
// on a restricted domain. Question text transcribed from the original paper (no diagram
// given). Answers checked with sympy and against the VCAA examination report. Solution is
// original. This question has no lettered parts, so it uses the plain card layout rather
// than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [19, 27, 55],
  average: 1.4,
  comment: (
    <>
      Many students were unsure of exact values and did not ascertain the correct basic angle
      of <Katex tex="\tfrac\pi6" />, or produced solutions beyond the specified domain.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(2x) = -\frac{\sqrt3}{2}" />,
    reason: <>Divide by 2 first so the equation is in the standard <Katex tex="\cos(\square)=k" /> form.</>,
  },
  {
    working: <Katex display tex="0\le x\le\pi \implies 0\le 2x\le 2\pi" />,
    reason: <>Transform the domain <em>before</em> solving — this is what stops solutions being missed or over-supplied.</>,
  },
  {
    working: <Katex display tex="\text{basic angle} = \tfrac\pi6 \quad\text{since } \cos\!\left(\tfrac\pi6\right) = \tfrac{\sqrt3}2" />,
    reason: <>The exact value the report says students most often could not recall.</>,
  },
  {
    working: <Katex display tex="\cos < 0 \text{ in the 2nd and 3rd quadrants}" />,
    reason: <>So <Katex tex="2x = \pi-\tfrac\pi6" /> or <Katex tex="2x = \pi+\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="2x = \tfrac{5\pi}6,\ \tfrac{7\pi}6" />,
    reason: <>Both lie inside <Katex tex="[0,2\pi]" />; the next pair, <Katex tex="\tfrac{17\pi}6" /> and beyond, does not.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac{5\pi}{12},\ \tfrac{7\pi}{12}}" />,
    reason: <>Halving. Both are in <Katex tex="[0,\pi]" /> ✓.</>,
  },
]

export default function MethodsQ3_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (2 marks)">
        <p>
          Solve <Katex tex="2\cos(2x)=-\sqrt3" /> for <Katex tex="x" />, where{' '}
          <Katex tex="0\le x\le\pi" />.
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
