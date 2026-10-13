// 2014 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 56% correct.
// Which line cuts a circle in the complex plane twice. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 56, C: 17, D: 6, E: 4 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      The circle had centre <Katex tex="(3,2)" /> and radius 2. Only the line in option B
      intersected twice. Options A and C did not intersect. Options D and E were tangents.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z-3-2i| = 2:\ \text{centre } (3,2), \text{ radius } 2" />,
    reason: <>A line cuts a circle twice exactly when its distance from the centre is <em>less than</em> the radius.</>,
    more: <>Equal to the radius means the line just touches (a tangent, one point); greater means it misses. So for each option, compare its distance from <Katex tex="(3,2)" /> with 2, or substitute the line into the circle and count solutions.</>,
  },
  {
    working: <Katex display tex="\text{B: } |z-3-2i| = |z-5|" />,
    reason: <>Points equidistant from <Katex tex="(3,2)" /> and <Katex tex="(5,0)" />: their perpendicular bisector. One of those points is the centre itself.</>,
  },
  {
    working: <Katex display tex="d = \tfrac12\sqrt{(5-3)^2+(0-2)^2} = \tfrac12\sqrt8 = \sqrt2" />,
    reason: <>The bisector meets the segment from the centre at right angles at its midpoint, so its distance from the centre is half the segment's length.</>,
  },
  {
    working: <Katex display tex="\sqrt2 \approx 1.41 < 2 \implies \text{two intersections}" />,
    reason: <>Closer than the radius, so the line passes through the inside of the circle.</>,
    more: <>Check by algebra: <Katex tex="(x-3)^2+(y-2)^2=(x-5)^2+y^2" /> simplifies to <Katex tex="y=x-3" />. Substituting into <Katex tex="(x-3)^2+(y-2)^2=4" /> gives <Katex tex="x=3" /> or <Katex tex="x=5" />, i.e. the points <Katex tex="(3,0)" /> and <Katex tex="(5,2)" />.</>,
  },
  {
    working: <Katex display tex="\text{C: } |z-3-2i| = |z-10i|" />,
    reason: <>Again a perpendicular bisector with the centre as one end; the other point is <Katex tex="(0,10)" />.</>,
  },
  {
    working: <Katex display tex="d = \tfrac12\sqrt{3^2+8^2} = \tfrac{\sqrt{73}}2 \approx 4.27 > 2" />,
    reason: <>Farther than the radius, so no intersection.</>,
  },
  {
    working: <Katex display tex="\text{A: } |z-i| = |z+1| \iff y = -x" />,
    reason: <>Equidistant from <Katex tex="(0,1)" /> and <Katex tex="(-1,0)" />; neither is the centre, so find the line and substitute it into the circle.</>,
    more: <>The bisector of <Katex tex="(0,1)" /> and <Katex tex="(-1,0)" /> passes through their midpoint <Katex tex="(-\tfrac12,\tfrac12)" /> at right angles to the segment joining them (gradient 1), giving <Katex tex="y=-x" />. Or expand <Katex tex="x^2+(y-1)^2=(x+1)^2+y^2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} (x-3)^2+(-x-2)^2 &= 4 \\ 2x^2-2x+9 &= 0 \end{aligned}" />,
    reason: <>Replace <Katex tex="y" /> by <Katex tex="-x" /> in the circle's Cartesian equation, <Katex tex="(x-3)^2+(y-2)^2=4" />, and expand.</>,
  },
  {
    working: <Katex display tex="\Delta = (-2)^2-4(2)(9) = -68 < 0" />,
    reason: <>No real solutions, so line A misses the circle.</>,
  },
  {
    working: <Katex display tex="\text{D: } y = 0 \text{ touches at } (3,0)" />,
    reason: <>The circle's lowest point is at <Katex tex="y=2-2=0" />, so the real axis just touches it: a tangent.</>,
  },
  {
    working: <Katex display tex="\text{E: } x = 5 \text{ touches at } (5,2)" />,
    reason: <>The circle's rightmost point is at <Katex tex="x=3+2=5" />, so this vertical line is also a tangent.</>,
  },
  {
    working: <Katex display tex="\boxed{|z-3-2i| = |z-5|}" />,
    reason: <>Matches option <b>B</b>, the only line passing inside the circle.</>,
    more: <>As the report says, A and C (17% each) do not intersect the circle at all, and D and E are tangents: each meets it once, not twice. Line B passes through exactly the two points where D and E touch, <Katex tex="(3,0)" /> and <Katex tex="(5,2)" />.</>,
  },
]

export default function SpecialistQ9_2014() {
  return (
    <MCQShell
      question={
        <p>
          The circle <Katex tex="|z-3-2i|=2" /> is intersected exactly twice by the line
          given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="|z-i| = |z+1|" /> },
        { letter: 'B', content: <Katex tex="|z-3-2i| = |z-5|" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="|z-3-2i| = |z-10i|" /> },
        { letter: 'D', content: <Katex tex="\mathrm{Im}(z) = 0" /> },
        { letter: 'E', content: <Katex tex="\mathrm{Re}(z) = 5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
