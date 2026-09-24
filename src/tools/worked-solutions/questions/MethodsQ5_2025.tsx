// 2025 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 76% correct.
// Two conditions: a function first, then one-to-one. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 76, C: 13, D: 5 },
  answer: 'B',
  comment: (
    <>
      <Katex tex="\{(-1,3),(2,2),(3,1)\}" /> is a <Katex tex="1:1" /> function and hence has an
      inverse function.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{a function: each } x \text{ appears once} \implies \text{rules out A and D}" />,
    reason: <>In <b>A</b> the input 2 maps to both 0 and 1; in <b>D</b> the input 1 maps to both 0 and 3. Neither is a function at all, so neither can have an inverse.</>,
  },
  {
    working: <Katex display tex="\text{an inverse: each } y \text{ appears once (one-to-one)}" />,
    reason: <>The inverse swaps the coordinates, so repeated outputs would become repeated inputs.</>,
  },
  {
    working: <Katex display tex="\text{C: } \{(-1,3),(0,1),(1,3)\} \ \text{ has } y=3 \text{ twice}" />,
    reason: <>A function, but many-to-one. Its "inverse" would send 3 to both <Katex tex="-1" /> and 1.</>,
  },
  {
    working: <Katex display tex="\text{B: } \{(-1,3),(2,2),(3,1)\}: \ x\text{-values } -1,2,3 \ \text{ and } y\text{-values } 3,2,1" />,
    reason: <>All three inputs distinct and all three outputs distinct.</>,
  },
  {
    working: <Katex display tex="\boxed{\{(-1,3),(2,2),(3,1)\}}" />,
    reason: <>Matches option <b>B</b>. Its inverse is <Katex tex="\{(3,-1),(2,2),(1,3)\}" />, which is itself a function.</>,
  },
]

export default function MethodsQ5_2025() {
  return (
    <MCQShell
      question={<p>Which of the following sets represents a function that has an inverse function?</p>}
      options={[
        { letter: 'A', content: <Katex tex="\{(1,3),(2,0),(2,1)\}" /> },
        { letter: 'B', content: <Katex tex="\{(-1,3),(2,2),(3,1)\}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\{(-1,3),(0,1),(1,3)\}" /> },
        { letter: 'D', content: <Katex tex="\{(1,0),(2,3),(1,3)\}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
