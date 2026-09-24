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
  },
  {
    working: <Katex display tex="\text{B: } |z-3-2i| = |z-5|" />,
    reason: <>The perpendicular bisector of the centre <Katex tex="(3,2)" /> and the point <Katex tex="(5,0)" />. Its distance from the centre is therefore exactly half the distance between those two points.</>,
  },
  {
    working: <Katex display tex="\tfrac12\sqrt{(5-3)^2+(0-2)^2} = \tfrac12\sqrt8 = \sqrt2 \approx 1.41 < 2" />,
    reason: <>Inside the radius, so two intersections ✓. No algebra needed — the bisector shortcut does it.</>,
  },
  {
    working: <Katex display tex="\text{C: } |z-3-2i| = |z-10i| \implies d = \tfrac12\sqrt{9+64} = \tfrac{\sqrt{73}}2 \approx 4.27 > 2" />,
    reason: <>Too far away — no intersection.</>,
  },
  {
    working: <Katex display tex="\text{A: } |z-i| = |z+1| \iff y = -x, \quad d = \frac{|3+2|}{\sqrt2} \approx 3.54 > 2" />,
    reason: <>Also misses. This is the perpendicular bisector of <Katex tex="(0,1)" /> and <Katex tex="(-1,0)" />, neither of which is the centre, so the shortcut does not apply and the distance formula is needed.</>,
  },
  {
    working: <Katex display tex="\text{D: } y = 0 \text{ and E: } x = 5 \text{ are both exactly } 2 \text{ from } (3,2)" />,
    reason: <>Distance equal to the radius, so each touches once — tangents, not two intersections.</>,
  },
  {
    working: <Katex display tex="\boxed{|z-3-2i| = |z-5|}" />,
    reason: <>Matches option <b>B</b>, the only line that gets inside the circle. Options A and C (17% each) miss it altogether; D and E only touch it.</>,
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
