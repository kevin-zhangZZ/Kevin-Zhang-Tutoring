// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 18. VCAA examination report: 53% correct.
// A discriminant condition for two distinct intersections. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 53, C: 17, D: 20, E: 4 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+2x = kx-4" />,
    reason: <>Intersections are where the two rules give the same <Katex tex="y" />, so equate them.</>,
  },
  {
    working: <Katex display tex="x^2+(2-k)x+4 = 0" />,
    reason: <>Collect everything on one side to get a quadratic in <Katex tex="x" />. Each real root is the <Katex tex="x" />-coordinate of an intersection.</>,
  },
  {
    working: <Katex display tex="\Delta = (2-k)^2-4(1)(4) = (2-k)^2-16" />,
    reason: <>Two <em>distinct</em> real roots means <Katex tex="\Delta>0" />, strictly — not <Katex tex="\Delta\ge0" />.</>,
    more: <>With <Katex tex="a=1" />, <Katex tex="b=2-k" />, <Katex tex="c=4" />. If <Katex tex="\Delta=0" /> the line is a tangent and touches the parabola at just one point; if <Katex tex="\Delta<0" /> it misses the parabola altogether.</>,
  },
  {
    working: <Katex display tex="(2-k)^2 > 16 \implies |2-k| > 4" />,
    reason: <>Take the square root of both sides; since <Katex tex="\sqrt{(2-k)^2}=|2-k|" />, the modulus appears.</>,
    more: <>Equivalently, expand and factorise: <Katex tex="(2-k)^2-16=k^2-4k-12=(k-6)(k+2)" />. This is an upright parabola in <Katex tex="k" /> with roots <Katex tex="-2" /> and <Katex tex="6" />, so it is positive <em>outside</em> the roots. On CAS, <Cas fn="solve">solve((2-k)^2-16&gt;0, k)</Cas> gives the same answer.</>,
  },
  {
    working: <Katex display tex="2-k > 4 \ \text{ or } \ 2-k < -4" />,
    reason: <>A modulus bigger than 4 means the inside is above 4 or below <Katex tex="-4" />. Solve each; multiplying by <Katex tex="-1" /> flips the inequality.</>,
  },
  {
    working: <Katex display tex="\boxed{k < -2 \ \text{ or } \ k > 6}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>
      Options <b>A</b> (<Katex tex="k=6" />) and <b>E</b> (<Katex tex="k=-2" />) are the
      tangent cases, <Katex tex="\Delta=0" />: one point of contact, not two. Option <b>C</b>{' '}
      is the opposite region, <Katex tex="\Delta\le0" />: the line misses the parabola or just
      touches it. Option <b>D</b>, the most common wrong answer, fails for the same reason as C: it is a
      closed interval <em>between</em> two values, so it cannot be right — <Katex tex="\Delta" /> is an upright parabola in <Katex tex="k" />,
      positive only outside its roots — and its endpoints <Katex tex="6\pm2\sqrt3" /> are not
      roots of this <Katex tex="\Delta" /> at all. A quick check: <Katex tex="k=10" /> gives{' '}
      <Katex tex="x^2-8x+4=0" />, <Katex tex="\Delta=48>0" />, two points, as B predicts.
    </>,
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
