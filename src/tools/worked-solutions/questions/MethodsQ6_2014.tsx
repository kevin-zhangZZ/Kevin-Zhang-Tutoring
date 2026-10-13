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
    reason: <>An inverse function exists exactly when <Katex tex="f" /> is one-to-one. A cubic is one-to-one on any interval with no turning point inside it.</>,
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
    reason: <>Two turning points, so <Katex tex="f" /> is strictly increasing or decreasing on <Katex tex="(-\infty,-4]" />, <Katex tex="[-4,7]" /> and <Katex tex="[7,\infty)" />, but not on any interval straddling <Katex tex="-4" /> or <Katex tex="7" />.</>,
    more: <>On an interval containing a turning point inside it, <Katex tex="f" /> goes up then down (or down then up), so values just either side of the turning point are repeated: two <Katex tex="x" />-values give the same <Katex tex="y" />, and the inverse would not be a function.</>,
  },
  {
    working: <Katex display tex="\boxed{D = (7,\infty)}" />,
    reason: <>Matches option <b>B</b>, the only option that lies inside one of those three intervals.</>,
    more: <>Options C and E contain <Katex tex="x=7" /> and option D contains <Katex tex="x=-4" />, so each straddles a turning point. Option A (20%) is all of <Katex tex="R" />: a cubic with two turning points rises to <Katex tex="f(-4)=400" />, falls to <Katex tex="f(7)=-931" />, then rises again, so it takes some values three times. For example <Katex tex="f(x)=0" /> at <Katex tex="x=0" /> and at <Katex tex="x=\tfrac{9\pm5\sqrt{57}}{4}" />. Only a cubic with no turning points (like <Katex tex="x^3" />) has an inverse on all of <Katex tex="R" />.</>,
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
