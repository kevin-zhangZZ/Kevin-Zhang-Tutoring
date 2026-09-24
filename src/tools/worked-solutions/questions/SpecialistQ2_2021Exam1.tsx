// 2021 Specialist Mathematics — Exam 1 Question 2 (3 marks). A definite integral that
// splits into a log and an arctan. Question text transcribed from the original paper.
// Answer checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [22, 9, 6, 63],
  average: 2.1,
  comment: (
    <>
      Most students understood that they needed to write the integrand as the sum of two
      rational functions:
      <br />
      <Katex tex="\displaystyle\int_0^1\frac{2x}{x^2+1}\,dx+\int_0^1\frac{1}{x^2+1}\,dx=\Bigl[\log_e\left(x^2+1\right)\Bigr]_0^1+\Bigl[\arctan(x)\Bigr]_0^1" />
      <br />
      Use of a substitution was unnecessary in this situation and in attempting to use a
      substitution, some students introduced errors into their working.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2x+1}{x^2+1} = \frac{2x}{x^2+1}+\frac{1}{x^2+1}" />,
    reason: <>Splitting the numerator is the whole idea: the first piece is an <Katex tex="\tfrac{f'}{f}" /> log, the second a standard arctan. No substitution is needed for either.</>,
  },
  {
    working: <Katex display tex="\int_0^1\frac{2x}{x^2+1}\,dx = \left[\log_e\left(x^2+1\right)\right]_0^1" />,
    reason: <>The numerator is exactly the derivative of the denominator, so the antiderivative is the log with no extra factor. <Katex tex="x^2+1>0" />, so no absolute value.</>,
  },
  {
    working: <Katex display tex="= \log_e(2)-\log_e(1) = \log_e(2)" />,
    reason: <><Katex tex="\log_e(1)=0" />.</>,
  },
  {
    working: <Katex display tex="\int_0^1\frac{1}{x^2+1}\,dx = \left[\arctan(x)\right]_0^1 = \frac{\pi}{4}" />,
    reason: <>Straight off the formula sheet with <Katex tex="a=1" />; <Katex tex="\arctan(1)=\tfrac\pi4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\log_e(2)+\frac{\pi}{4}}" />,
    reason: <>About <Katex tex="1.478" />. Exact, as the instructions require.</>,
  },
]

export default function SpecialistQ2_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Evaluate <Katex tex="\displaystyle\int_0^1\frac{2x+1}{x^2+1}\,dx" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A rational integrand whose denominator is an irreducible quadratic almost always
            wants splitting, not substituting. Ask whether the numerator can be written as{' '}
            <em>(a multiple of the denominator's derivative) plus (a constant)</em> — here it
            already is, which makes the whole integral two standard forms.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
