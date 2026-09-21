// 2014 Mathematical Methods (CAS) — Exam 1, Question 6 (2 marks). A logarithm equation
// solved with the log laws. Question text transcribed from the original paper (no diagram
// given). Answer checked with sympy and against the VCAA examination report. Solution is
// original. This question has no lettered parts, so it uses the plain card layout rather
// than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [23, 33, 44],
  average: 1.2,
  comment: (
    <>
      Poor performance on this question was mainly attributed to the incorrect application of
      logarithm or index laws. Students should have good facility with logarithm and exponent
      laws.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(x)-3 = \log_e\!\left(\sqrt x\right)" />,
    reason: <>Gather the logarithms on one side so the constant stands alone.</>,
  },
  {
    working: <Katex display tex="\log_e(x)-\log_e\!\left(\sqrt x\right) = 3" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="\log_e\!\left(\frac{x}{\sqrt x}\right) = 3" />,
    reason: <>The subtraction law <Katex tex="\log a-\log b=\log\tfrac ab" />.</>,
  },
  {
    working: <Katex display tex="\frac{x}{\sqrt x} = \frac{x}{x^{1/2}} = x^{1/2} = \sqrt x" />,
    reason: <>The index law that makes this question quick: dividing subtracts the indices, <Katex tex="1-\tfrac12=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\log_e\!\left(\sqrt x\right) = 3 \implies \sqrt x = e^3" />,
    reason: <>Exponentiating both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{x = e^6}" />,
    reason: <>Squaring. Check: <Katex tex="\log_e\!\left(e^6\right)-3 = 6-3 = 3" /> and <Katex tex="\log_e\!\left(\sqrt{e^6}\right)=\log_e\!\left(e^3\right)=3" /> ✓.</>,
  },
]

export default function MethodsQ6_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 6 (2 marks)">
        <p>
          Solve <Katex tex="\log_e(x)-3=\log_e\!\left(\sqrt x\right)" /> for <Katex tex="x" />,
          where <Katex tex="x>0" />.
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
