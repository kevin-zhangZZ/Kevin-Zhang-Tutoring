// 2025 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 55% correct.
// No solutions needs a zero determinant AND an inconsistency. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 55, B: 13, C: 19, D: 12 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="kx+3y=k^2" />
      <br />
      <Katex tex="2x+(2k+1)y=6-2k" />
      <br />
      <Katex tex="\dfrac{k}{2}=\dfrac{3}{2k+1},\ k=\dfrac{3}{2}" /> or <Katex tex="k=-2" />
      <br />
      When <Katex tex="k=\dfrac{3}{2}" />
      <br />
      <Katex tex="\dfrac{k^2}{6-2k}=\dfrac{3}{4}=\dfrac{k}{2}" />, infinite solutions
      <br />
      When <Katex tex="k=-2" />
      <br />
      <Katex tex="\dfrac{k^2}{6-2k}=\dfrac{2}{5}.\ \dfrac{k}{2}=-1" />, no real solutions
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{vmatrix}k & 3\\2 & 2k+1\end{vmatrix} = k(2k+1)-6 = 2k^2+k-6" />,
    reason: <>A unique solution exists exactly when this determinant is non-zero, so the candidates come from setting it to zero.</>,
  },
  {
    working: <Katex display tex="2k^2+k-6 = (2k-3)(k+2) = 0 \implies k = \tfrac32 \ \text{ or } \ k = -2" />,
    reason: <>Two candidates — and this is where the question really starts. A zero determinant means <em>either</em> no solutions <em>or</em> infinitely many, so each must be tested.</>,
  },
  {
    working: <Katex display tex="k=\tfrac32: \quad \tfrac32x+3y = \tfrac94 \ \text{ and } \ 2x+4y = 3" />,
    reason: <>The second equation is <Katex tex="\tfrac43" /> times the first, so the two lines coincide.</>,
  },
  {
    working: <Katex display tex="\implies \text{infinitely many solutions, not none}" />,
    reason: <>So <Katex tex="k=\tfrac32" /> is rejected. Option <b>C</b>, chosen by 19%, keeps it.</>,
  },
  {
    working: <Katex display tex="k=-2: \quad -2x+3y = 4 \ \text{ and } \ 2x-3y = 10" />,
    reason: <>Adding the two gives 0 = 14.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -2 \text{ only}}" />,
    reason: <>Matches option <b>A</b>: parallel but distinct lines, so no solutions.</>,
  },
]

export default function MethodsQ4_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Consider the system of equations below containing the parameter{' '}
            <Katex tex="k" />, where <Katex tex="k\in R" />.
          </p>
          <Katex display tex="\begin{aligned}kx+3y &= k^2\\ 2x+(2k+1)y &= 6-2k\end{aligned}" />
          <p>
            Find the value(s) of <Katex tex="k" /> for which this system has no real
            solutions.
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="k=-2 \text{ only}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="k=\tfrac32 \text{ only}" /> },
        { letter: 'C', content: <Katex tex="k=-2 \text{ or } \tfrac32" /> },
        { letter: 'D', content: <Katex tex="k\in R\setminus\left\{-2,\tfrac32\right\}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
