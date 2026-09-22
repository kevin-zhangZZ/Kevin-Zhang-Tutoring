// 2020 Mathematical Methods — Exam 1, Question 4 (3 marks). A logarithm equation with a
// solution that has to be rejected. Question text transcribed from the original paper (no
// diagram given). Answer checked with sympy and against the VCAA examination report.
// Solution is original. This question has no lettered parts, so it uses the plain card
// layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [12, 19, 43, 26],
  average: 1.8,
  comment: (
    <>
      Students confidently attempted this question; however, many incorrect uses of the
      logarithmic laws were observed. Those who did end up with the appropriate quadratic
      equation and solved it correctly did not always check the validity of their answers;
      these students failed to reject the solution <Katex tex="x=-7" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2\log_2(x+5)-\log_2(x+9) = 1" />,
    reason: <>Three log laws in turn: the coefficient becomes a power, the subtraction becomes a quotient, then undo the logarithm.</>,
  },
  {
    working: <Katex display tex="\log_2\!\left((x+5)^2\right)-\log_2(x+9) = 1" />,
    reason: <><Katex tex="n\log a=\log a^n" />.</>,
  },
  {
    working: <Katex display tex="\log_2\!\left(\frac{(x+5)^2}{x+9}\right) = 1" />,
    reason: <><Katex tex="\log a-\log b=\log\tfrac ab" />.</>,
  },
  {
    working: <Katex display tex="\frac{(x+5)^2}{x+9} = 2^1 = 2" />,
    reason: <>Undoing the base-2 logarithm.</>,
  },
  {
    working: <Katex display tex="x^2+10x+25 = 2x+18" />,
    reason: <>Multiplying out. Taking these steps one line at a time is what the report recommends.</>,
  },
  {
    working: <Katex display tex="x^2+8x+7 = 0 \implies (x+1)(x+7) = 0" />,
    reason: <>Factorising.</>,
  },
  {
    working: <Katex display tex="x = -1 \quad\text{or}\quad x = -7" />,
    reason: <>Two candidates — but a logarithm equation always needs its solutions checked.</>,
  },
  {
    working: <Katex display tex="x = -7: \quad \log_2(-7+5) = \log_2(-2) \text{ is undefined}" />,
    reason: <>Rejecting it. This is the mark the report says students most often lost.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -1}" />,
    reason: <>Check: <Katex tex="2\log_2(4)-\log_2(8) = 4-3 = 1" /> ✓.</>,
  },
]

export default function MethodsQ4_2020Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (3 marks)">
        <p>
          Solve the equation <Katex tex="2\log_2(x+5)-\log_2(x+9)=1" />.
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
