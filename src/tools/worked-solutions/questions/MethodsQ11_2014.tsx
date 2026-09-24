// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 11. VCAA examination report: 62% correct.
// Two marbles of different colours, drawn without replacement. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 10, C: 8, D: 10, E: 62 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(RB) = \tfrac59\times\tfrac48 = \tfrac{20}{72}" />,
    reason: <>Red then blue. Nine marbles to start, eight left for the second draw — <em>without</em> replacement, so the denominator drops.</>,
  },
  {
    working: <Katex display tex="\Pr(BR) = \tfrac49\times\tfrac58 = \tfrac{20}{72}" />,
    reason: <>Blue then red gives the same product, as it always does for draws without replacement.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{different}) = \tfrac{20}{72}+\tfrac{20}{72} = \tfrac{40}{72}" />,
    reason: <>Both orders count. Giving only one of them lands on <Katex tex="\tfrac5{18}" />, option B.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac59}" />,
    reason: <>Matches option <b>E</b>, after dividing top and bottom by 8. Options A and D use <Katex tex="81=9^2" /> as the denominator, which would be right <em>with</em> replacement.</>,
  },
]

export default function MethodsQ11_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A bag contains five red marbles and four blue marbles. Two marbles are drawn from
            the bag, without replacement, and the results are recorded.
          </p>
          <p>The probability that the marbles are different colours is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{20}{81}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{5}{18}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{4}{9}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{40}{81}" /> },
        { letter: 'E', content: <Katex tex="\tfrac{5}{9}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
