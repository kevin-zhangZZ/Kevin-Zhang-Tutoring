// 2015 Mathematical Methods (CAS) — Exam 1, Question 3 (2 marks).
// A definite integral of x^(−1/2). Only 55% scored both marks — most wrong answers used a
// logarithm. Question text transcribed from the original paper (no diagram given). Answer
// checked with sympy and against the VCAA examination report. Solution is original.
// No lettered parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [38, 6, 55],
  average: 1.2,
  comment: (
    <>
      This question was not answered well. A range of incorrect antiderivatives were given,
      the majority of which involved the logarithm function.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{\sqrt x} = x^{-\frac12}" />,
    reason: <>Rewrite as a power first. The logarithm rule applies only to <Katex tex="x^{-1}" />, and this is <Katex tex="x^{-1/2}" /> — that distinction is the whole question.</>,
  },
  {
    working: <Katex display tex="\int x^{-\frac12}\,dx = \frac{x^{\frac12}}{\frac12} = 2\sqrt x" />,
    reason: <>Add one to the index and divide by the new index: <Katex tex="-\tfrac12+1=\tfrac12" />, and dividing by <Katex tex="\tfrac12" /> means multiplying by <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\int_1^4 x^{-\frac12}\,dx = \Bigl[2\sqrt x\Bigr]_1^4 = 2(2)-2(1)" />,
    reason: <>Substituting the terminals.</>,
  },
  {
    working: <Katex display tex="\boxed{2}" />,
    reason: <>Sensible size: the integrand falls from <Katex tex="1" /> to <Katex tex="\tfrac12" /> across an interval of width <Katex tex="3" />, so an answer around <Katex tex="2" /> is right.</>,
  },
]

export default function MethodsQ3_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (2 marks)">
        <p>
          Evaluate <Katex tex="\displaystyle\int_1^4\left(\frac{1}{\sqrt x}\right)dx" />.
        </p>
      </Background>
      <Background>
        <p>
          <Katex tex="\int\frac1x\,dx=\log_e|x|+c" /> is the exception, not the rule. Every
          other power — <Katex tex="x^{-1/2}" /> included — follows the ordinary
          "add one, divide by the new index" recipe. 38% of students scored zero here, and the
          report says most of the wrong antiderivatives involved a logarithm.
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
