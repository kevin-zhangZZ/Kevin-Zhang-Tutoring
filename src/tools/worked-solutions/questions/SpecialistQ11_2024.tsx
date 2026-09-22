// 2024 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 58% correct.
// Signed area under a velocity-time graph gives displacement, not distance. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2024-mcq11-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 58, C: 12, D: 16 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{displacement} = \int_0^{150}v\,dt = \text{signed area under the graph}" />,
    reason: <>"How far east of O" is a displacement, so the area below the axis counts as negative. Adding the areas as positives gives option <b>D</b>.</>,
  },
  {
    working: <Katex display tex="\text{first segment: } v = 40-\tfrac35 t \implies v = 0 \text{ at } t = \tfrac{200}{3}" />,
    reason: <>The line from <Katex tex="(0,40)" /> to <Katex tex="(100,-20)" /> has gradient <Katex tex="-\tfrac{60}{100}" />. Its crossing point splits the triangle above from the triangle below.</>,
  },
  {
    working: <Katex display tex="A_1 = \tfrac12\times\tfrac{200}{3}\times40 = \tfrac{4000}{3}" />,
    reason: 'The triangle above the axis — this is eastward travel.',
  },
  {
    working: <Katex display tex="A_2 = \tfrac12\times\left(100-\tfrac{200}{3}\right)\times20 = \tfrac{1000}{3}" />,
    reason: 'The small triangle below the axis, from the crossing point to t = 100.',
  },
  {
    working: <Katex display tex="A_3 = \tfrac12\times50\times20 = 500" />,
    reason: <>The second line segment, from <Katex tex="(100,-20)" /> to <Katex tex="(150,0)" /> — also below the axis.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{4000}{3}-\tfrac{1000}{3}-500 = 1000-500 = 500 \ \text{m}}" />,
    reason: <>Option <b>B</b>. The particle travelled <Katex tex="\tfrac{4000}{3}\approx1333" /> m east, then <Katex tex="\tfrac{2500}{3}\approx833" /> m back west, ending 500 m east of <Katex tex="O" />. Option <b>C</b> is the eastward peak alone, rounded.</>,
  },
]

export default function SpecialistQ11_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The velocity–time graph of a particle moving along an east–west line with velocity{' '}
            <Katex tex="v" /> m s<Katex tex="^{-1}" /> at time <Katex tex="t" /> seconds,
            starting from a fixed origin <Katex tex="O" />, is shown below. The graph
            comprises two straight line segments.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={graphSrc}
              alt="A velocity-time graph falling in a straight line from (0, 40) through the t-axis to (100, −20), then rising in a straight line to (150, 0) — from the original 2024 VCAA exam paper"
              className="w-full max-w-[440px]"
            />
          </div>
          <p>
            The initial velocity of the particle is 40 m s<Katex tex="^{-1}" /> to the east.
            How far, in metres, is the particle to the east of <Katex tex="O" />, 150 seconds
            later?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="450" /> },
        { letter: 'B', content: <Katex tex="500" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1000" /> },
        { letter: 'D', content: <Katex tex="\frac{6500}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
