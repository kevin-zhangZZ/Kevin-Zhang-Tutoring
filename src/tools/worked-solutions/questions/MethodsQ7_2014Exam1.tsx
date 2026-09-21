// 2014 Mathematical Methods (CAS) — Exam 1, Question 7 (3 marks). Antidifferentiating a
// trigonometric derivative and pinning the constant. Question text transcribed from the
// original paper (no diagram given). Answer checked with sympy and against the VCAA
// examination report. Solution is original. This question has no lettered parts, so it uses
// the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [19, 12, 30, 38],
  average: 1.9,
  comment: (
    <>
      The students who omitted a constant of integration when completing the
      antidifferentiation were then unable to find the specific equation required.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2\cos(x)-\sin(2x)" />,
    reason: <>Antidifferentiate each term. The second needs the <Katex tex="2x" /> accounted for.</>,
  },
  {
    working: <Katex display tex="\int 2\cos(x)\,dx = 2\sin(x)" />,
    reason: <>Straightforward.</>,
  },
  {
    working: <Katex display tex="\int -\sin(2x)\,dx = \tfrac12\cos(2x)" />,
    reason: <>The antiderivative of <Katex tex="\sin(2x)" /> is <Katex tex="-\tfrac12\cos(2x)" />; the minus sign in front flips it to <Katex tex="+\tfrac12\cos(2x)" />.</>,
  },
  {
    working: <Katex display tex="f(x) = 2\sin(x)+\tfrac12\cos(2x)+c" />,
    reason: <>The constant is essential — without it there is nothing for the given value to determine, which is exactly what the report describes.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac\pi2\right) = 2(1)+\tfrac12(-1)+c = \tfrac32+c" />,
    reason: <><Katex tex="\sin\!\left(\tfrac\pi2\right)=1" /> and <Katex tex="\cos(\pi)=-1" />.</>,
  },
  {
    working: <Katex display tex="\tfrac32+c = \tfrac12 \implies c = -1" />,
    reason: <>Using the given value.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2\sin(x)+\tfrac12\cos(2x)-1}" />,
    reason: <>Check: at <Katex tex="x=\tfrac\pi2" />, <Katex tex="2-\tfrac12-1=\tfrac12" /> ✓.</>,
  },
]

export default function MethodsQ7_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 7 (3 marks)">
        <p>
          If <Katex tex="f'(x)=2\cos(x)-\sin(2x)" /> and{' '}
          <Katex tex="f\!\left(\tfrac\pi2\right)=\tfrac12" />, find <Katex tex="f(x)" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
