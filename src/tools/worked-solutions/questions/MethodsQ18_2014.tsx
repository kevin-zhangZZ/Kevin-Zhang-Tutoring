// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 18. VCAA examination report: 53% correct.
// A discriminant condition for two distinct intersections. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 53, C: 17, D: 20, E: 4 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+2x = kx-4" />,
    reason: <>Intersections are where the two rules agree.</>,
  },
  {
    working: <Katex display tex="x^2+(2-k)x+4 = 0" />,
    reason: <>Collecting everything on one side. The number of intersections is the number of real roots.</>,
  },
  {
    working: <Katex display tex="\Delta = (2-k)^2-4(1)(4) = (2-k)^2-16" />,
    reason: <>Two <em>distinct</em> points means <Katex tex="\Delta>0" />, strictly — not <Katex tex="\ge" />.</>,
  },
  {
    working: <Katex display tex="(2-k)^2 > 16 \implies |2-k| > 4" />,
    reason: <>Taking square roots of an inequality brings in the modulus.</>,
  },
  {
    working: <Katex display tex="2-k > 4 \ \text{ or } \ 2-k < -4" />,
    reason: <>The two cases.</>,
  },
  {
    working: <Katex display tex="\boxed{k < -2 \ \text{ or } \ k > 6}" />,
    reason: <>Option B. Option C is the reverse inequality — the values for which the line <em>misses</em> the parabola; <Katex tex="k=6" /> and <Katex tex="k=-2" /> are the two tangent cases.</>,
  },
]

export default function MethodsQ18_2014() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=kx-4" /> intersects the graph of{' '}
          <Katex tex="y=x^2+2x" /> at two distinct points for
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="k = 6" /> },
        { letter: 'B', content: <Katex tex="k > 6 \text{ or } k < -2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="-2 \le k \le 6" /> },
        { letter: 'D', content: <Katex tex="6-2\sqrt3 \le k \le 6+2\sqrt3" /> },
        { letter: 'E', content: <Katex tex="k = -2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
