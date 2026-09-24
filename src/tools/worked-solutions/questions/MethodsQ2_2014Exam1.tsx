// 2014 Mathematical Methods (CAS) — Exam 1, Question 2 (2 marks). A definite integral of
// 2/(2x-1) written as a single logarithm. Question text transcribed from the original paper
// (no diagram given). Answer checked with sympy and against the VCAA examination report.
// Solution is original. This question has no lettered parts, so it uses the plain card
// layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [18, 28, 54],
  average: 1.4,
  comment: (
    <>
      This was a routine application of{' '}
      <Katex tex="\displaystyle\int\frac{a}{ax+b}\,dx = \log_e|ax+b|+c" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int\frac{2}{2x-1}\,dx = \log_e|2x-1|+c" />,
    reason: <>The numerator is exactly the derivative of the denominator, so this is a straight <Katex tex="\tfrac{f'}{f}" /> integral — no <Katex tex="\tfrac12" /> is needed out the front.</>,
  },
  {
    working: <Katex display tex="\int_4^5\frac{2}{2x-1}\,dx = \Bigl[\log_e|2x-1|\Bigr]_4^5" />,
    reason: <>On <Katex tex="[4,5]" /> the expression <Katex tex="2x-1" /> is positive, so the modulus can be dropped.</>,
  },
  {
    working: <Katex display tex="= \log_e(9)-\log_e(7)" />,
    reason: <><Katex tex="2(5)-1=9" /> and <Katex tex="2(4)-1=7" />.</>,
  },
  {
    working: <Katex display tex="= \log_e\!\left(\tfrac97\right)" />,
    reason: <>The log law <Katex tex="\log a-\log b=\log\tfrac ab" /> — which is what puts the answer in the required form.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \tfrac97}" />,
    reason: <>The question asks for <Katex tex="b" />, not for the integral. Sanity check: on <Katex tex="[4,5]" /> the integrand runs from <Katex tex="\tfrac27" /> down to <Katex tex="\tfrac29" />, so the integral is roughly <Katex tex="\tfrac14" /> — and <Katex tex="\log_e\!\left(\tfrac97\right)\approx0.25" /> ✓.</>,
  },
]

export default function MethodsQ2_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 2 (2 marks)">
        <p>
          Let <Katex tex="\displaystyle\int_4^5\frac{2}{2x-1}\,dx = \log_e(b)" />. Find the
          value of <Katex tex="b" />.
        </p>
      </Background>
      <Background>
        <p>
          The answer is already promised to be a single logarithm, so the last step is always
          going to be combining two logs into one — and that means <Katex tex="b" /> will be a
          fraction, not an integer.
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
