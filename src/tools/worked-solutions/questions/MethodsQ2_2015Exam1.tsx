// 2015 Mathematical Methods (CAS) — Exam 1, Question 2 (3 marks).
// Antidifferentiating 1 − 3/x and pinning the constant from f(e) = −2. Question text
// transcribed from the original paper (no diagram given). Answer checked with sympy and
// against the VCAA examination report. Solution is original. No lettered parts, so this
// uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [14, 14, 21, 51],
  average: 2.1,
  comment: (
    <>
      Most students identified that the antiderivative involved a logarithmic expression.
      Evaluation of the constant of antidifferentiation caused some difficulties.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \int\left(1-\frac3x\right)dx" />,
    reason: <>We are given the derivative and want the function, so antidifferentiate.</>,
  },
  {
    working: <Katex display tex="f(x) = x-3\log_e(x)+c" />,
    reason: <>The domain is <Katex tex="x>0" />, so no absolute value is needed inside the logarithm.</>,
  },
  {
    working: <Katex display tex="f(e) = e-3\log_e(e)+c = e-3+c" />,
    reason: <>Using <Katex tex="\log_e(e)=1" />.</>,
  },
  {
    working: <Katex display tex="e-3+c = -2 \implies c = 1-e" />,
    reason: <>Solving for the constant. Leaving it as a decimal loses the exact form.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x-3\log_e(x)+1-e}" />,
    reason: <>Check: <Katex tex="f(e)=e-3+1-e=-2" /> ✓.</>,
  },
]

export default function MethodsQ2_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 2 (3 marks)">
        <p>
          Let <Katex tex="f'(x)=1-\dfrac3x" />, where <Katex tex="x>0" />. Given that{' '}
          <Katex tex="f(e)=-2" />, find <Katex tex="f(x)" />.
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
