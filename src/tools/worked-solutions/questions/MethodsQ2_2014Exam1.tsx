// 2014 Mathematical Methods (CAS) — Exam 1, Question 2 (2 marks). A definite integral of
// 2/(2x-1) written as a single logarithm. Question text transcribed from the original paper
// (no diagram given). Answer checked with sympy and against the VCAA examination report.
// Reviewed Oct 2026 (2014–2016 pass): review mode, no interactive (part does not qualify).
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
    reason: <>Use <Katex tex="\int\frac{1}{ax+k}\,dx=\tfrac1a\log_e|ax+k|+c" /> with <Katex tex="a=2" />: the <Katex tex="2" /> on top cancels the <Katex tex="\tfrac12" />.</>,
    more: <>Equivalently, the numerator <Katex tex="2" /> is exactly the derivative of the denominator <Katex tex="2x-1" />, which is why no fraction is left out the front. The easy slip is to write <Katex tex="\tfrac12\log_e|2x-1|" /> anyway — forgetting the <Katex tex="2" /> in the numerator. That gives <Katex tex="\tfrac12\log_e\!\left(\tfrac97\right)=\log_e\!\sqrt{\tfrac97}" />, so <Katex tex="b=\tfrac{3}{\sqrt7}" /> — wrong. Check any antiderivative by differentiating: <Katex tex="\tfrac{d}{dx}\log_e(2x-1)=\tfrac{2}{2x-1}" /> ✓.</>,
  },
  {
    working: <Katex display tex="\int_4^5\frac{2}{2x-1}\,dx = \Bigl[\log_e|2x-1|\Bigr]_4^5" />,
    reason: <>Put the antiderivative in square brackets with the terminals: upper <Katex tex="5" />, lower <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="= \log_e(9)-\log_e(7)" />,
    reason: <><Katex tex="2(5)-1=9" /> and <Katex tex="2(4)-1=7" />; both are positive, so the modulus can be dropped.</>,
  },
  {
    working: <Katex display tex="= \log_e\!\left(\tfrac97\right)" />,
    reason: <>The log law <Katex tex="\log_e a-\log_e b=\log_e\tfrac ab" /> turns the difference into the single log the question asks for.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \tfrac97}" />,
    reason: <>Compare with <Katex tex="\log_e(b)" />: equal logs mean equal arguments. The question asks for <Katex tex="b" />, not the integral's value.</>,
    more: <>Sanity check: on <Katex tex="[4,5]" /> the integrand runs from <Katex tex="\tfrac27" /> down to <Katex tex="\tfrac29" />, so the integral (an area over an interval of width <Katex tex="1" />) is about <Katex tex="\tfrac14" /> — and <Katex tex="\log_e\!\left(\tfrac97\right)\approx0.25" /> ✓. Leaving the answer as <Katex tex="\log_e(9)-\log_e(7)" /> does not answer the question: <Katex tex="b" /> must be a single number.</>,
  },
]

export default function MethodsQ2_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 2 (2 marks)" always>
        <p>
          Let <Katex tex="\displaystyle\int_4^5\frac{2}{2x-1}\,dx = \log_e(b)" />. Find the
          value of <Katex tex="b" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={2} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
