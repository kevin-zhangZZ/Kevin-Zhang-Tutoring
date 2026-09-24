// 2025 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 55% correct. This
// year's paper used four options (A–D) rather than five. A ball thrown upward from a height,
// caught below the point of projection. Question text transcribed from the original paper.
// Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 55, C: 25, D: 7 },
  answer: 'B',
  comment: (
    <>
      Constant acceleration formulas may be used. However, care must be taken with the signs.
      Taking upwards as positive then:
      <br />
      <Katex tex="u=20,\ a=-g,\ s=-49" />
      <br />
      <Katex tex="s=ut+\dfrac{1}{2}at^2" />
      <br />
      <Katex tex="-49=20t-4.9t^2" />
      <br />
      <Katex tex="t=-1.72,\ 5.80" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{take up as positive:} \quad u = 20, \quad a = -9.8" />,
    reason: <>The ball is thrown upward but gravity acts downward.</>,
  },
  {
    working: <Katex display tex="s = 1-50 = -49" />,
    reason: <>Displacement, not distance: the tray is 49 m below the point of projection. This sign is the whole question.</>,
  },
  {
    working: <Katex display tex="s = ut+\frac{1}{2}at^2 \implies -49 = 20t-4.9t^2" />,
    reason: <>The constant-acceleration formula linking displacement and time.</>,
  },
  {
    working: <Katex display tex="4.9t^2-20t-49 = 0" />,
    reason: <>Rearranged into a quadratic in t.</>,
  },
  {
    working: <Katex display tex="t = \frac{20\pm\sqrt{400+4(4.9)(49)}}{9.8} = \frac{20\pm\sqrt{1360.4}}{9.8}" />,
    reason: <>By <Cas fn="solve" /> or the quadratic formula.</>,
  },
  {
    working: <Katex display tex="t = 5.8044\ldots \quad \text{or} \quad t = -1.7228\ldots" />,
    reason: <>The negative root is before the throw, so it is rejected.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 5.80 \text{ seconds}}" />,
    reason: <>Matches option <b>B</b>. Option <b>C</b>, 5.83, is the time to reach the <em>ground</em> (<Katex tex="s=-50" />), ignoring the truck; options <b>A</b> and <b>D</b> are the sizes of the rejected negative roots of the truck and ground equations.</>,
  },
]

export default function SpecialistQ13_2025() {
  return (
    <MCQShell
      question={
        <p>
          From an open window, a person projects a ball vertically up using an outstretched arm so
          the ball does not strike any part of the building. The point of projection of the ball is
          50 m above the ground and its velocity of projection is 20 m s<Katex tex="^{-1}" />.
          <br />
          The time, in seconds, it takes for the ball to reach the tray of a truck that is 1 m above
          the ground directly below the point of projection is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.72" /> },
        { letter: 'B', content: <Katex tex="5.80" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="5.83" /> },
        { letter: 'D', content: <Katex tex="1.75" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
