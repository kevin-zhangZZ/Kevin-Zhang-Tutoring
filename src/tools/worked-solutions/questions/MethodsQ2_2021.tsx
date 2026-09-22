// 2021 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 81% correct.
// Combining two logarithms into one. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 11, C: 81, D: 4, E: 1 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(x)+\log_e(2x) = \log_e(x\cdot 2x)" />,
    reason: <>The log law turns a <em>sum</em> of logs into the log of a <em>product</em> — not of a sum, which is where option D's <Katex tex="3x" /> comes from.</>,
  },
  {
    working: <Katex display tex="= \boxed{\log_e\!\left(2x^2\right)}" />,
    reason: <>Matches option <b>C</b>. The restriction <Katex tex="x>0" /> is what makes this identity safe — over a larger domain <Katex tex="\log_e(2x^2)" /> would be defined where the original is not.</>,
  },
  {
    working: <Katex display tex="\text{check } x=1: \ \log_e1+\log_e2 = \log_e2; \quad \log_e\!\left(2\cdot1^2\right) = \log_e2 \ \checkmark" />,
    reason: 'A single substitution kills every wrong option in seconds.',
  },
]

export default function MethodsQ2_2021() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\log_e(x)+\log_e(2x)" />, where <Katex tex="x>0" />, is
          identical, over the same domain, to the graph of
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=2\log_e\!\left(\tfrac12x\right)" /> },
        { letter: 'B', content: <Katex tex="y=2\log_e(2x)" /> },
        { letter: 'C', content: <Katex tex="y=\log_e\!\left(2x^2\right)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="y=\log_e(3x)" /> },
        { letter: 'E', content: <Katex tex="y=\log_e(4x)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
