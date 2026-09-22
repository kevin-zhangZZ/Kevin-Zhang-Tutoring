// 2025 Mathematical Methods — Exam 1 Question 2 (2 marks). Antidifferentiating a
// reciprocal-linear derivative and fixing the constant. Question text transcribed from the
// original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [22, 38, 40],
  average: 1.2,
  comment: (
    <>
      Some students did not recognise that the integral would involve a logarithmic
      function. A common error was writing <Katex tex="\log_e(2x+3)" /> as the first step,
      without accounting for the necessary factor of <Katex tex="\tfrac12" /> in front.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \int\frac{1}{2x+3}\,dx" />,
    reason: 'A reciprocal of a linear expression, so the antiderivative is a logarithm.',
  },
  {
    working: <Katex display tex="\frac{d}{dx}\log_e(2x+3) = \frac{2}{2x+3}" />,
    reason: <>Checking the derivative first shows where the <Katex tex="\tfrac12" /> comes from — the single most common slip was omitting it.</>,
  },
  {
    working: <Katex display tex="g(x) = \tfrac12\log_e(2x+3)+c" />,
    reason: <>No absolute value is needed: the domain <Katex tex="x>-\tfrac32" /> makes <Katex tex="2x+3>0" /> throughout.</>,
  },
  {
    working: <Katex display tex="g(1) = 0: \quad \tfrac12\log_e(5)+c = 0 \implies c = -\tfrac12\log_e(5)" />,
    reason: 'Substituting the given condition.',
  },
  {
    working: <Katex display tex="\boxed{g(x) = \tfrac12\log_e(2x+3)-\tfrac12\log_e(5) = \tfrac12\log_e\!\left(\frac{2x+3}{5}\right)}" />,
    reason: <>Either form was accepted. Check: <Katex tex="g(1)=\tfrac12\log_e(1)=0" /> ✓.</>,
  },
]

export default function MethodsQ2_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (2 marks)</p>
        <p>
          Let <Katex tex="g(x)" /> be a function defined for <Katex tex="x>-\tfrac32" /> so
          that <Katex tex="g'(x)=\dfrac{1}{2x+3}" /> and <Katex tex="g(1)=0" />. Find{' '}
          <Katex tex="g(x)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Antidifferentiating <Katex tex="\tfrac{1}{ax+b}" /> gives{' '}
            <Katex tex="\tfrac{1}{a}\log_e(ax+b)" />, and here <Katex tex="a=2" />. The
            quickest way to be sure of that factor is to differentiate your candidate answer
            and see what comes back.
          </p>
          <p>
            The domain <Katex tex="x>-\tfrac32" /> is doing real work: it guarantees{' '}
            <Katex tex="2x+3>0" />, so the answer needs no absolute value, and it contains{' '}
            <Katex tex="x=1" />, so the given condition is usable.
          </p>
        </Background>
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
