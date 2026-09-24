// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 6. VCAA examination report: 55% correct.
// Restricting a cubic's domain so that it has an inverse function. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 55, C: 12, D: 9, E: 3 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 2x^3-9x^2-168x" />,
    reason: <>An inverse function exists exactly when <Katex tex="f" /> is one-to-one, and a cubic is one-to-one precisely on an interval containing no turning point in its interior.</>,
  },
  {
    working: <Katex display tex="f'(x) = 6x^2-18x-168 = 6\left(x^2-3x-28\right)" />,
    reason: <>Differentiate to find where the turning points are.</>,
  },
  {
    working: <Cas fn="solve">solve(6x^2 - 18x - 168 = 0, x)</Cas>,
    reason: <>Or factorise by hand: <Katex tex="x^2-3x-28=(x-7)(x+4)" />.</>,
  },
  {
    working: <Katex display tex="x = -4 \text{ and } x = 7" />,
    reason: <>Two turning points, so <Katex tex="f" /> is monotonic on <Katex tex="(-\infty,-4]" />, on <Katex tex="[-4,7]" /> and on <Katex tex="[7,\infty)" /> — and on no interval that straddles either value.</>,
  },
  {
    working: <Katex display tex="\boxed{D = (7,\infty)}" />,
    reason: <>Matches option <b>B</b>, the only choice contained in one of those three intervals. Option C contains <Katex tex="7" />, option D contains <Katex tex="-4" />, option E contains <Katex tex="7" />, and option A (20%) is all of <Katex tex="R" /> — a positive cubic with two turning points is not one-to-one.</>,
  },
]

export default function MethodsQ6_2014() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f:D\to R" /> with rule{' '}
          <Katex tex="f(x)=2x^3-9x^2-168x" /> will have an inverse function for
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="D = R" /> },
        { letter: 'B', content: <Katex tex="D = (7,\infty)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="D = (-4,8)" /> },
        { letter: 'D', content: <Katex tex="D = (-\infty,0)" /> },
        { letter: 'E', content: <Katex tex="D = \left[-\tfrac12,\infty\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
