// 2024 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 40% correct. This
// year's paper used four options (A–D) rather than five. Probability exactly two of three
// randomly chosen students are from a given row. Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 40, C: 10, D: 37 },
  answer: 'B',
  noAnswer: 1,
  comment: <Katex tex="\dfrac{\binom{7}{2}\binom{5}{1}}{\binom{12}{3}} = \dfrac{21}{44}" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="12 \text{ students total: } 7 \text{ in row 1},\ 5 \text{ in row 2}" />,
    reason: 'Given information.',
  },
  {
    working: <Katex display tex="\binom{7}{2}\binom{5}{1}" />,
    reason: <>Choose 2 of the 3 students from row 1, and the remaining 1 from row 2.</>,
  },
  {
    working: <Katex display tex="\binom{7}{2}=21,\qquad \binom{5}{1}=5" />,
    reason: 'Evaluate each combination.',
  },
  {
    working: <Katex display tex="\binom{12}{3} = 220" />,
    reason: 'Total ways to choose any 3 students from all 12.',
  },
  {
    working: <Katex display tex="\Pr = \frac{21\times5}{220} = \frac{105}{220}" />,
    reason: 'Favourable outcomes over total outcomes.',
  },
  {
    working: <Katex display tex="\boxed{\frac{105}{220} = \frac{21}{44}}" />,
    reason: <>Simplify (divide by 5) — matches option <b>B</b>.</>,
  },
]

export default function MethodsQ11_2024() {
  return (
    <MCQShell
      question={
        <p>
          Twelve students sit in a classroom, with seven students in the first row and the other five students in
          the second row. Three students are chosen randomly from the class.
          <br />
          The probability that exactly two of the three students chosen are in the first row is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{7}{44}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{21}{44}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac{5}{22}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{245}{576}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
