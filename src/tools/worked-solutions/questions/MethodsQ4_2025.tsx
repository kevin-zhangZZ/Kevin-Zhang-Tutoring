// 2025 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 55% correct.
// No solutions needs parallel lines (equal coefficient ratios, the report's method; matrices are not in Methods) AND an inconsistency. Question text transcribed from the original paper.
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
    working: <Katex display tex="\text{parallel} \iff \dfrac{k}{2} = \dfrac{3}{2k+1}" />,
    reason: <>Each equation is a line. Two lines fail to meet at exactly one point only when they are parallel: their <Katex tex="x" />- and <Katex tex="y" />-coefficients are in the same ratio.</>,
    more: <>This is the same as equal gradients. Rearranged, the lines are <Katex tex="y=-\tfrac{k}{3}x+\tfrac{k^2}{3}" /> and <Katex tex="y=-\tfrac{2}{2k+1}x+\tfrac{6-2k}{2k+1}" />, and <Katex tex="-\tfrac{k}{3}=-\tfrac{2}{2k+1}" /> cross-multiplies to the same equation as the next line. The second form needs <Katex tex="k\ne-\tfrac12" />. At <Katex tex="k=-\tfrac12" /> the second line is the vertical line <Katex tex="2x=7" />, which the first line crosses once, so that value gives a unique solution.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}k(2k+1) = 6\\ 2k^2+k-6 = 0\\ (2k-3)(k+2) = 0\\ k =\tfrac32 \text{ or } k=-2\end{gathered}" />,
    reason: <>Cross-multiply and factorise. Parallel lines either coincide (infinitely many solutions) or never meet (no solutions), so each value must be tested.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}k=\tfrac32: \quad \tfrac32x+3y &= \tfrac94\\ 2x+4y &= 3\end{aligned}" />,
    reason: <>Substitute into both equations. Multiplying the first by <Katex tex="\tfrac43" /> gives exactly the second, so the two lines coincide.</>,
    more: <>The report checks this with the constants: <Katex tex="\tfrac{k^2}{6-2k}=\tfrac{9/4}{3}=\tfrac34" />, the same as <Katex tex="\tfrac{k}{2}=\tfrac34" />. When the constant terms are in the same ratio as the coefficients, the equations are multiples of each other: the same line.</>,
  },
  {
    working: <Katex display tex="\implies \text{infinitely many solutions, not none}" />,
    reason: <>So <Katex tex="k=\tfrac32" /> is rejected.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}k=-2: \quad -2x+3y &= 4\\ 2x-3y &= 10\end{aligned}" />,
    reason: <>Adding the two equations gives <Katex tex="0=14" />, which is impossible: parallel lines that never meet.</>,
    more: <>In the report&apos;s ratio form: the constants give <Katex tex="\tfrac{k^2}{6-2k}=\tfrac{4}{10}=\tfrac25" />, but <Katex tex="\tfrac{k}{2}=-1" />. The ratios differ, so the lines are parallel but separate.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -2 \text{ only}}" />,
    reason: <>Matches option <b>A</b>: the only value giving no solutions.</>,
    more: <>Option <b>B</b> (13%) is the value giving infinitely many solutions. Option <b>C</b> (19%) is the trap: it stops at the parallel condition and keeps both values without testing them. Option <b>D</b> (12%) is every value giving a unique solution, the opposite of what was asked.</>,
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
