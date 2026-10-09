// 2023 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 55% correct.
// Equal gradients are necessary but not sufficient for infinite solutions; each candidate k is checked by substitution
// (gradient method, since matrices/determinants are not in the current Methods course). Question text transcribed from the original paper.
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
    working: <Katex display tex="\begin{aligned}\text{Eq. 1: } y &= -\tfrac{k}{5}x+\tfrac{k+5}{5}\\ \text{Eq. 2: } y &= -\tfrac{4}{k+1}x \quad (k\ne-1)\end{aligned}" />,
    reason: <>Each equation is a straight line, and two lines share infinitely many points only when they are the <em>same</em> line: equal gradients <em>and</em> equal <Katex tex="y" />-intercepts. Rearrange each into <Katex tex="y=mx+c" /> form to read both off. (Dividing by <Katex tex="k+1" /> needs <Katex tex="k\ne-1" />. At <Katex tex="k=-1" /> the second line is <Katex tex="x=0" />, which the first line crosses only once, so that value can be set aside.)</>,
    more: <>Checking <Katex tex="k=-1" /> in full: the equations become <Katex tex="-x+5y=4" /> and <Katex tex="4x=0" />. The second gives <Katex tex="x=0" />, and then the first gives <Katex tex="y=\tfrac45" />, so the only solution is <Katex tex="\left(0,\tfrac45\right)" />. A vertical line has no <Katex tex="y=mx+c" /> form, which is why it is checked separately.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}-\tfrac{k}{5} &= -\tfrac{4}{k+1}\\ k(k+1) &= 20\\ k^2+k-20 &= 0\\ (k+5)(k-4) &= 0\\ k &= -5 \ \text{ or } \ k=4\end{aligned}" />,
    reason: <>Set the gradients equal and cross-multiply. Only these two values make the lines parallel; for every other <Katex tex="k" /> they cross at exactly one point. Parallel lines can still be the same line or two separate lines that never meet, so test each value.</>,
  },
  {
    working: <Katex display tex="k=4: \quad 4x+5y = 9 \ \text{ and } \ 4x+5y = 0" />,
    reason: <>Substitute each value back into the original equations. Same left-hand sides, different right-hand sides: <Katex tex="4x+5y" /> can't equal both <Katex tex="9" /> and <Katex tex="0" />, so these are parallel lines that never meet. No solutions at all.</>,
  },
  {
    working: <Katex display tex="k=-5: \quad -5x+5y = 0 \ \text{ and } \ 4x-4y = 0" />,
    reason: <>Divide the first by <Katex tex="5" /> and the second by <Katex tex="4" />: they become <Katex tex="-x+y=0" /> and <Katex tex="x-y=0" />, which both rearrange to <Katex tex="y=x" />. The same line twice, so every point on it satisfies both equations: infinitely many solutions.</>,
    more: <>A quicker way to tell the two values apart uses the <Katex tex="y" />-intercepts from the first line of working. The second line always passes through the origin (intercept <Katex tex="0" />), while the first has intercept <Katex tex="\tfrac{k+5}{5}" />, which is <Katex tex="0" /> only when <Katex tex="k=-5" />. So at <Katex tex="k=-5" /> the parallel lines coincide, and at <Katex tex="k=4" /> they are separate.</>,
  },
  {
    working: <Katex display tex="\boxed{k \in \{-5\}}" />,
    reason: <>Matches option <b>B</b>: only <Katex tex="k=-5" /> gives the same line twice.</>,
    more: <>Stopping at the equal-gradient step gives option <b>A</b>, <Katex tex="k\in\{-5,4\}" />, but <Katex tex="k=4" /> gives no solutions: <Katex tex="k\in\{4\}" /> (option <b>C</b>) is the no-solution case. Option <b>D</b>, <Katex tex="k\in R\setminus\{-5,4\}" />, is the set of values that give a unique solution, and option <b>E</b>, <Katex tex="k\in R\setminus\{-5\}" />, is every value that does <em>not</em> give infinitely many solutions.</>,
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
