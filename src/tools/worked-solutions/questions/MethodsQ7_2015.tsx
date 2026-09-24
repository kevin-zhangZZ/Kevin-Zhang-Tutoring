// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 7. VCAA examination report: 56% correct.
// The range of a downward parabola on a half-open interval. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 31, C: 56, D: 4, E: 6 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -x^2+2x-3 = -(x-1)^2-2" />,
    reason: <>Completing the square gives the turning point immediately: a maximum at <Katex tex="(1,-2)" />, since the parabola opens downwards.</>,
  },
  {
    working: <Katex display tex="x=1 \in (-1,2] \implies \text{maximum value } -2 \text{ is attained}" />,
    reason: <>The vertex lies inside the domain, so <Katex tex="-2" /> really is in the range — and the bracket at that end is square.</>,
  },
  {
    working: <Katex display tex="f(-1) = -1-2-3 = -6 \quad\text{(not attained)}" />,
    reason: <>The domain is open at <Katex tex="-1" />, so the curve approaches <Katex tex="-6" /> without reaching it. Round bracket.</>,
  },
  {
    working: <Katex display tex="f(2) = -4+4-3 = -3 \quad\text{(attained)}" />,
    reason: <>The other endpoint is included — but <Katex tex="-3" /> is <em>not</em> the lowest value, since the curve dips lower on the left of the vertex.</>,
  },
  {
    working: <Katex display tex="\boxed{(-6,-2]}" />,
    reason: <>Matches option <b>C</b>. Between <Katex tex="x=-1" /> and <Katex tex="x=1" /> the function sweeps continuously from just above <Katex tex="-6" /> up to <Katex tex="-2" />, which covers everything. Option B stops at <Katex tex="-3" /> — the right endpoint — and misses the top of the curve.</>,
  },
]

export default function MethodsQ7_2015() {
  return (
    <MCQShell
      question={
        <p>
          The range of the function <Katex tex="f:(-1,2]\to R" />,{' '}
          <Katex tex="f(x)=-x^2+2x-3" /> is
        </p>
      }
      background={
        <p>
          On a restricted domain, the range runs between the smallest and largest values{' '}
          <em>actually reached</em> — and the turning point matters as much as the
          endpoints. Check three things: is the vertex inside the domain, which endpoint is
          lower, and is each end open or closed.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="R" /> },
        { letter: 'B', content: <Katex tex="(-6,-3]" /> },
        { letter: 'C', content: <Katex tex="(-6,-2]" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="[-6,-3]" /> },
        { letter: 'E', content: <Katex tex="[-6,-2]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
