// 2021 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 32% correct.
// Maximum |z| on a given circle in the Argand plane. Question text transcribed from the
// original paper; the diagram is cropped directly from the original VCAA exam PDF, not a
// redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import circleSrc from './spec-2021-mcq5-argand-circle.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 42, B: 6, C: 18, D: 32, E: 2 },
  answer: 'D',
  comment: <Katex tex="\sqrt{2^2+\left(\sqrt3\right)^2}+1=\sqrt7+1" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z - (2+\sqrt3i)| = 1" />,
    reason: <>A circle of radius <Katex tex="1" /> centred at <Katex tex="(2,\sqrt3)" />.</>,
  },
  {
    working: <Katex display tex="\text{Distance from origin to centre} = \sqrt{2^2+(\sqrt3)^2} = \sqrt{4+3} = \sqrt7" />,
    reason: <>Distance formula from the origin to the centre of the circle.</>,
  },
  {
    working: <>The farthest point on a circle from an external point lies on the line through that point and the centre, on the far side.</>,
    reason: <>Maximising <Katex tex="|z|" /> means finding the point on the circle farthest from the origin.</>,
  },
  {
    working: <Katex display tex="\boxed{|z|_{\max} = \sqrt7 + 1}" />,
    reason: <>Distance to the centre, plus the radius. Matches option <b>D</b>. Option A, <Katex tex="\sqrt3+1" />, is the greatest <em>imaginary part</em> on the circle, not the greatest modulus.</>,
  },
]

export default function SpecialistQ5_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graph of the circle given by <Katex tex="|z-2-\sqrt3i|=1" />, where <Katex tex="z\in C" />, is
            shown below.
          </p>
          <div className="mb-2 flex justify-center">
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img src={circleSrc} alt="Argand diagram showing a circle of radius 1 centred at (2, √3) — from the original 2021 VCAA exam paper" className="w-full max-w-[280px]" />
            </div>
          </div>
          <p>For points on this circle, the maximum value of <Katex tex="|z|" /> is</p>
        </>
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
