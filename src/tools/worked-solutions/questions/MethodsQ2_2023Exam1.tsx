// 2023 Mathematical Methods — Exam 1 Question 2 (3 marks). An exponential equation that is
// a hidden quadratic, with one root that must be discarded. Question text transcribed from
// the original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [29, 2, 13, 56],
  average: 2.0,
  comment: (
    <>
      This question required students to solve an exponential equation by treating it as a
      quadratic equation in terms of <Katex tex="e^x" />. The most direct approach was to form
      a quadratic equation set equal to zero, use the null factor law to factorise and then
      solve. Some students chose to use the quadratic formula, albeit not always successfully.
      Most students set up the quadratic equation correctly, however, some students did not
      proceed to factorise and solve. Some students arrived at both <Katex tex="e^x=6" /> or{' '}
      <Katex tex="e^x=-2" /> and then gave <Katex tex="x=\log_e(6)" /> and{' '}
      <Katex tex="x=\log_e(-2)" /> as their solutions without discarding{' '}
      <Katex tex="\log_e(-2)" />. Students need to keep in mind that{' '}
      <Katex tex="\log_e(a)" /> only exists for <Katex tex="a>0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="e^{2x}-12 = 4e^x \implies e^{2x}-4e^x-12 = 0" />,
    reason: <>Everything to one side first. The equation is now recognisably quadratic.</>,
  },
  {
    working: <Katex display tex="\text{Let } m = e^x: \quad m^2-4m-12 = 0" />,
    reason: <><Katex tex="e^{2x}=\left(e^x\right)^2=m^2" />. Naming the substitution makes the structure visible.</>,
  },
  {
    working: <Katex display tex="(m-6)(m+2) = 0 \implies m = 6 \ \text{ or } \ m = -2" />,
    reason: <>Two numbers multiplying to <Katex tex="-12" /> and adding to <Katex tex="-4" />.</>,
  },
  {
    working: <Katex display tex="e^x = 6 \quad\text{or}\quad e^x = -2" />,
    reason: <>Undoing the substitution.</>,
  },
  {
    working: <Katex display tex="e^x > 0 \text{ for all } x \implies e^x = -2 \text{ has no solution}" />,
    reason: <>This rejection must be written down — the report notes some students gave both <Katex tex="x=\log_e(6)" /> and <Katex tex="x=\log_e(-2)" /> without discarding <Katex tex="\log_e(-2)" />, which does not exist.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \log_e(6)}" />,
    reason: <>About <Katex tex="1.79" />. Check: <Katex tex="e^{2x}=36" /> and <Katex tex="36-12=24=4\times6" /> ✓.</>,
  },
]

export default function MethodsQ2_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Solve <Katex tex="e^{2x}-12=4e^x" /> for <Katex tex="x\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Whenever an equation contains <Katex tex="e^{2x}" /> and <Katex tex="e^{x}" /> and
            nothing else, it is a quadratic wearing a disguise. Substitute{' '}
            <Katex tex="m=e^x" />, solve as usual, then undo the substitution — and check each
            root, because <Katex tex="e^x" /> can never be zero or negative. A negative root
            for <Katex tex="m" /> is not an answer to discard quietly; say why it goes.
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
