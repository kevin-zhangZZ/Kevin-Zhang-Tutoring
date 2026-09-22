// 2020 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 83% correct.
// The asymptotes of a rational function. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 3, C: 3, D: 7, E: 83 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{3x+2}{5-x}" />,
    reason: <>A vertical asymptote where the denominator vanishes, a horizontal one from the behaviour as <Katex tex="x\to\pm\infty" />.</>,
  },
  {
    working: <Katex display tex="5-x = 0 \implies x = 5" />,
    reason: <>The numerator is non-zero there, so this really is an asymptote.</>,
  },
  {
    working: <Katex display tex="\frac{3x+2}{5-x} = \frac{3+\tfrac2x}{\tfrac5x-1} \to \frac{3}{-1} \text{ as } x\to\pm\infty" />,
    reason: <>Dividing top and bottom by <Katex tex="x" />. The <Katex tex="-x" /> in the denominator is what makes the limit negative.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 5, \quad y = -3}" />,
    reason: <>Option E. Option D has the sign of the horizontal asymptote wrong — the most common slip on this question.</>,
  },
]

export default function MethodsQ5_2020() {
  return (
    <MCQShell
      question={
        <p>
          The graph of the function <Katex tex="f:D\to R" />,{' '}
          <Katex tex="f(x)=\dfrac{3x+2}{5-x}" />, where <Katex tex="D" /> is the maximal
          domain, has asymptotes
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=-5,\ y=\tfrac32" /> },
        { letter: 'B', content: <Katex tex="x=-3,\ y=5" /> },
        { letter: 'C', content: <Katex tex="x=\tfrac23,\ y=-3" /> },
        { letter: 'D', content: <Katex tex="x=5,\ y=3" /> },
        { letter: 'E', content: <Katex tex="x=5,\ y=-3" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
