// 2021 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 32% correct.
// Maximum |z| on a given circle in the Argand plane. Question text and diagram transcribed
// from the original paper (the diagram is the actual VCAA figure, cropped from the official
// exam PDF, not a redrawing). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 42, B: 6, C: 18, D: 32, E: 2 },
  answer: 'D',
  comment: <Katex tex="\sqrt{2^2+2^2} = 2\sqrt2 \approx 2.83 \text{ (centre's distance from origin)};\ \sqrt7+1\approx 3.65" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z - (2+\sqrt3i)| = 1" />,
    reason: <>A circle of radius <Katex tex="1" /> centred at <Katex tex="(2,\sqrt3)" />.</>,
  },
  {
    working: <Katex display tex="\text{Distance from origin to centre} = \sqrt{2^2+(\sqrt3)^2} = \sqrt{4+3} = \sqrt7" />,
    reason: 'Distance formula from the origin to the centre of the circle.',
  },
  {
    working: <>The farthest point on a circle from an external point lies on the line through that point and the centre, on the far side.</>,
    reason: <>Maximising <Katex tex="|z|" /> means finding the point on the circle farthest from the origin.</>,
  },
  {
    working: <Katex display tex="\boxed{|z|_{\max} = \sqrt7 + 1}" />,
    reason: <>Distance to the centre, plus the radius — matches option <b>D</b>.</>,
  },
]

export default function SpecialistQ5_2021() {
  return (
    <MCQShell
      question={
        <p>
          The graph of the circle given by <Katex tex="|z-2-\sqrt3i|=1" />, where <Katex tex="z\in\mathbb{C}" />, is a
          circle of radius 1 centred at <Katex tex="(2,\sqrt3)" /> on the Argand plane.
          <br />
          For points on this circle, the maximum value of <Katex tex="|z|" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt3+1" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="\sqrt{13}" /> },
        { letter: 'D', content: <Katex tex="\sqrt7+1" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="8" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
