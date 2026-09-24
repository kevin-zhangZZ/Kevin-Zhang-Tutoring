// 2017 Mathematical Methods — Exam 1, Question 4 (2 marks).
// Sample proportion P̂ for angel fish (population proportion 1/4) — find the smallest
// integer sample size n such that sd(P̂) ≤ 1/100. Question text transcribed from the
// original paper (no diagram given — purely algebraic). Solution is original. This
// question has no lettered parts, so it doesn't use the usual PartCard wrapper — just one
// worked solution and one examiner's-report table for the question as a whole.

import Katex from '../../../components/Katex'
import { WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [28, 41, 31],
  average: 0.7,
  comment: (
    <>
      Most students identified the correct formula; however, many were unable to correctly
      transpose the inequality to solve for <Katex tex="n" /> or to correctly manipulate the
      arithmetic involving rational numbers. Some students had poor use of notation work, in that
      they did not extend the square root sign to include <Katex tex="n" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p = \tfrac14 \implies 1-p = \tfrac34" />,
    reason: <>The population proportion of angel fish.</>,
  },
  {
    working: <Katex display tex="\operatorname{sd}(\hat P) = \sqrt{\dfrac{p(1-p)}{n}} = \sqrt{\dfrac{\tfrac14\cdot\tfrac34}{n}} = \sqrt{\dfrac{3}{16n}}" />,
    reason: <>Standard deviation of the sample proportion.</>,
  },
  {
    working: <Katex display tex="\sqrt{\dfrac{3}{16n}} \le \dfrac{1}{100}" />,
    reason: <>Require this to be at most <Katex tex="\tfrac{1}{100}" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{3}{16n} \le \dfrac{1}{10\,000} \;\implies\; 16n \ge 30\,000 \;\implies\; n \ge 1875" />,
    reason: <>Square both sides (both are positive, so the inequality direction is preserved), then rearrange for <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 1875}" />,
    reason: <>The smallest integer satisfying <Katex tex="n \ge 1875" /> is <Katex tex="1875" /> itself.</>,
  },
]

export default function MethodsQ4_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (2 marks)</p>
        <p className="mb-2">
          In a large population of fish, the proportion of angel fish is <Katex tex="\tfrac14" />.
        </p>
        <p className="mb-2">
          Let <Katex tex="\hat P" /> be the random variable that represents the sample
          proportion of angel fish for samples of size <Katex tex="n" /> drawn from the
          population.
        </p>
        <p>
          Find the smallest integer value of <Katex tex="n" /> such that the standard deviation
          of <Katex tex="\hat P" /> is less than or equal to <Katex tex="\tfrac{1}{100}" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={2} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
