// 2023 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 55% correct.
// A zero determinant is necessary but not sufficient for infinite solutions. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 55, C: 10, D: 14, E: 4 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{pmatrix}k&5\\4&k+1\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}k+5\\0\end{pmatrix}" />,
    reason: <>Matrix form. A unique solution exists exactly when the determinant is non-zero.</>,
  },
  {
    working: <Katex display tex="\det = k(k+1)-20 = k^2+k-20 = (k+5)(k-4)" />,
    reason: <>So the determinant vanishes at <Katex tex="k=-5" /> and <Katex tex="k=4" /> — the only two candidates. Stopping here gives option <b>A</b>.</>,
  },
  {
    working: <Katex display tex="k=4: \quad 4x+5y = 9 \ \text{ and } \ 4x+5y = 0" />,
    reason: <>Same left-hand sides, different right-hand sides: parallel lines that never meet. No solutions at all.</>,
  },
  {
    working: <Katex display tex="k=-5: \quad -5x+5y = 0 \ \text{ and } \ 4x-4y = 0" />,
    reason: <>Both reduce to <Katex tex="y=x" /> — the same line twice.</>,
  },
  {
    working: <Katex display tex="\boxed{k \in \{-5\}}" />,
    reason: <>Matches option <b>B</b>. A zero determinant means "no unique solution"; whether that is <em>none</em> or <em>infinitely many</em> has to be checked case by case.</>,
  },
]

export default function MethodsQ4_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Consider the system of simultaneous linear equations below containing the
            parameter <Katex tex="k" />.
          </p>
          <Katex display tex="\begin{aligned}kx+5y &= k+5\\ 4x+(k+1)y &= 0\end{aligned}" />
          <p>
            The value(s) of <Katex tex="k" /> for which the system of equations has infinite
            solutions are
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="k\in\{-5,4\}" /> },
        { letter: 'B', content: <Katex tex="k\in\{-5\}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="k\in\{4\}" /> },
        { letter: 'D', content: <Katex tex="k\in R\setminus\{-5,4\}" /> },
        { letter: 'E', content: <Katex tex="k\in R\setminus\{-5\}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
