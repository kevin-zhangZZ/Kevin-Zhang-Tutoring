// 2019 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 47% correct.
// Rewriting log_x(y) + log_y(z) using the change-of-base identity. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 18, C: 16, D: 47, E: 8 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_x(y) + \log_y(z)" />,
    reason: 'The expression to rewrite.',
  },
  {
    working: <Katex display tex="\log_a(b) = \frac{1}{\log_b(a)}" />,
    reason: <>Change-of-base identity, applied "backwards": swapping the base and argument inverts the logarithm.</>,
  },
  {
    working: <Katex display tex="\log_x(y) = \frac{1}{\log_y(x)}" />,
    reason: 'Apply the identity to the first term.',
  },
  {
    working: <Katex display tex="\log_y(z) = \frac{1}{\log_z(y)}" />,
    reason: 'Apply the identity to the second term.',
  },
  {
    working: <Katex display tex="\boxed{\frac{1}{\log_y(x)} + \frac{1}{\log_z(y)}}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ20_2019() {
  return (
    <MCQShell
      question={
        <p>
          The expression <Katex tex="\log_x(y) + \log_y(z)" />, where <Katex tex="x" />, <Katex tex="y" /> and{' '}
          <Katex tex="z" /> are all real numbers greater than 1, is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{1}{\log_y(x)} - \dfrac{1}{\log_z(y)}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{1}{\log_x(y)} + \dfrac{1}{\log_y(z)}" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{1}{\log_x(y)} - \dfrac{1}{\log_y(z)}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{1}{\log_y(x)} + \dfrac{1}{\log_z(y)}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\log_y(x) + \log_z(y)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
