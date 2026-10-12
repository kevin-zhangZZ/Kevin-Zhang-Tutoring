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
    working: <Katex display tex="\begin{aligned}&\text{function: no repeated } x\\ &\implies \text{not A or D}\end{aligned}" />,
    reason: <>In <b>A</b> the input 2 maps to both 0 and 1; in <b>D</b> the input 1 maps to both 0 and 3. Neither is a function, so neither can have an inverse function.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{inverse: no repeated } y\\ &\text{(one-to-one)}\end{aligned}" />,
    reason: <>The inverse swaps each pair's coordinates, so a repeated output would become a repeated input, and the inverse would not be a function.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{C: } &\{(-1,3),(0,1),(1,3)\}\\ &\text{has } y=3 \text{ twice}\end{aligned}" />,
    reason: <>A function, but many-to-one. Its inverse would send 3 to both <Katex tex="-1" /> and 1, so it is not a function.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: } &x\text{-values } -1,\ 2,\ 3\\ &y\text{-values } 3,\ 2,\ 1\end{aligned}" />,
    reason: <>All three inputs are distinct and all three outputs are distinct: a one-to-one function.</>,
  },
  {
    working: <Katex display tex="\boxed{\{(-1,3),(2,2),(3,1)\}}" />,
    reason: <>Matches option <b>B</b>. Its inverse, <Katex tex="\{(3,-1),(2,2),(1,3)\}" />, is itself a function.</>,
    more: <>The most common wrong answer, <b>C</b> (13%), passes the first test but not the second: being a function is not enough, it must also be one-to-one. Options <b>A</b> (6%) and <b>D</b> (5%) fail the first test.</>,
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
