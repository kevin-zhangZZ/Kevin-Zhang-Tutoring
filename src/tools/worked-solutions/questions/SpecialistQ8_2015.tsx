// 2015 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 57% correct.
// Which complex-plane relation is not a circle. Question text transcribed from the original
// paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 11, C: 57, D: 6, E: 17 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{A: } z\bar z = 4 \iff |z|^2 = 4 \iff |z| = 2" />,
    reason: <>A circle of radius 2 centred at the origin, since <Katex tex="z\bar z=|z|^2" />.</>,
  },
  {
    working: <Katex display tex="\text{B: } |z+3i| = 2|z-i|" />,
    reason: <>Distances to two fixed points in a fixed ratio other than <Katex tex="1:1" /> — an <em>Apollonius circle</em>. Substituting <Katex tex="z=x+yi" /> and squaring gives <Katex tex="x^2+(y+3)^2=4\bigl(x^2+(y-1)^2\bigr)" />, which rearranges to a circle.</>,
  },
  {
    working: <Katex display tex="\text{C: } |z-i| = |z+2|" />,
    reason: <>Equidistant from <Katex tex="i" /> and <Katex tex="-2" />. That is the perpendicular bisector of the segment joining them — a straight <em>line</em>, not a circle.</>,
  },
  {
    working: <Katex display tex="x^2+(y-1)^2 = (x+2)^2+y^2 \implies -2y+1 = 4x+4" />,
    reason: <>Confirming: every squared term cancels, leaving the linear equation <Katex tex="y=-2x-\tfrac32" />.</>,
  },
  {
    working: <Katex display tex="\text{D: } |z-(1-i)| = 4" />,
    reason: <>A circle of radius 4 centred at <Katex tex="1-i" />.</>,
  },
  {
    working: <Katex display tex="\text{E: } |z|+2|\bar z| = 3|z| = 4 \implies |z| = \tfrac43" />,
    reason: <>A circle of radius <Katex tex="\tfrac43" /> centred at the origin, because <Katex tex="|\bar z|=|z|" />. This was the most popular wrong answer at 17%.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{C}}" />,
    reason: <>The one relation whose graph is a line.</>,
  },
]

export default function SpecialistQ8_2015() {
  return (
    <MCQShell
      question={<p>A relation that does not represent a circle in the complex plane is</p>}
      background={
        <p>
          Two shapes come out of modulus equations: <Katex tex="|z-a|=r" /> is a circle, and{' '}
          <Katex tex="|z-a|=|z-b|" /> is the perpendicular bisector of <Katex tex="a" /> and{' '}
          <Katex tex="b" />. The moment the two distances carry <em>different</em> coefficients,
          though, the squared terms no longer cancel and you are back to a circle.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="z\bar z = 4" /> },
        { letter: 'B', content: <Katex tex="|z+3i| = 2|z-i|" /> },
        { letter: 'C', content: <Katex tex="|z-i| = |z+2|" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="|z-1+i| = 4" /> },
        { letter: 'E', content: <Katex tex="|z|+2|\bar z| = 4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
