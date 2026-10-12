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
    reason: <>The ball is thrown upward, but gravity (<Katex tex="g=9.8" /> m s<Katex tex="^{-2}" />) acts downward, so a is negative.</>,
  },
  {
    working: <Katex display tex="s = 1-50 = -49" />,
    reason: <>Displacement, not distance: the tray is 49 m below the point of projection, so s is negative.</>,
    more: <>Displacement is measured from where the ball starts (50 m up) to where it ends (the tray, 1 m up), so <Katex tex="s=1-50" />. The report's warning is about exactly this: "care must be taken with the signs". With <Katex tex="s=+49" /> the equation becomes <Katex tex="4.9t^2-20t+49=0" />, whose discriminant <Katex tex="400-960" /> is negative: no solution at all, which is the sign that a sign is wrong.</>,
  },
  {
    working: <Katex display tex="s = ut+\frac{1}{2}at^2 \implies -49 = 20t-4.9t^2" />,
    reason: <>s, u and a are known and t is wanted, so use the constant-acceleration formula without v.</>,
    more: <>There is no need to split the flight into the way up and the way down: the acceleration is <Katex tex="-9.8" /> the whole time, so this one equation covers both. Splitting gives the same answer: up for <Katex tex="\frac{20}{9.8}\approx 2.041" /> s to <Katex tex="\frac{20^2}{2(9.8)}\approx 20.41" /> m above the window, then a fall of <Katex tex="69.41" /> m from rest taking <Katex tex="\sqrt{\frac{2(69.41)}{9.8}}\approx 3.764" /> s, total <Katex tex="5.804" /> s.</>,
  },
  {
    working: <Katex display tex="4.9t^2-20t-49 = 0" />,
    reason: <>Rearranged into a quadratic in t.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t &= \frac{20\pm\sqrt{400+4(4.9)(49)}}{9.8} \\ &=\frac{20\pm\sqrt{1360.4}}{9.8} \end{aligned}" />,
    reason: <>By <Cas fn="solve" /> or the quadratic formula.</>,
  },
  {
    working: <Katex display tex="t = 5.8044\ldots \quad \text{or} \quad t = -1.7228\ldots" />,
    reason: <>The negative root is a time before the throw, so it is rejected.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 5.80 \text{ seconds}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>C</b>, 5.83 (25%), is the time to reach the <em>ground</em>: solving <Katex tex="-50=20t-4.9t^2" /> gives <Katex tex="t\approx 5.831" />, which ignores the truck's 1 m tray. Options <b>A</b> (1.72) and <b>D</b> (1.75) are the sizes of the rejected negative roots of the truck and ground equations, <Katex tex="-1.723" /> and <Katex tex="-1.750" />.</>,
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
