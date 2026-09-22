// 2023 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 68% correct.
// Following a solution curve through a direction field. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2023-mcq7-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 3, C: 14, D: 68, E: 10 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Start at } (-1,\,2)" />,
    reason: 'The given point. Put a finger on it and follow the strokes.',
  },
  {
    working: <Katex display tex="\text{Left of the } y\text{-axis the slopes are steeply negative}" />,
    reason: <>So the curve falls sharply as <Katex tex="x" /> increases from <Katex tex="-1" /> towards 0.</>,
  },
  {
    working: <Katex display tex="\text{Near the } y\text{-axis the strokes flatten out}" />,
    reason: 'The curve levels off — it is passing through its minimum somewhere around x = 0.',
  },
  {
    working: <Katex display tex="\text{Right of the } y\text{-axis the slopes turn positive and steepen}" />,
    reason: 'The curve turns and climbs again.',
  },
  {
    working: <Katex display tex="\boxed{y \approx 1.0 \text{ when } x = 1.5}" />,
    reason: <>Option <b>D</b>. A sketch drawn on the field lands just above <Katex tex="y=1" />; the neighbouring options <Katex tex="0.5" /> and <Katex tex="1.5" /> would need the curve to be noticeably flatter or steeper than the strokes allow.</>,
  },
]

export default function SpecialistQ7_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={fieldSrc}
              alt="A direction field on −2 ≤ x ≤ 2, −2 ≤ y ≤ 2 whose strokes fall steeply on the left, flatten near the y-axis and rise on the right — from the original 2023 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>
            The direction field for a differential equation is shown above. On a certain
            solution curve of this differential equation, <Katex tex="y=2" /> when{' '}
            <Katex tex="x=-1" />. The value of <Katex tex="y" /> on the same solution curve
            when <Katex tex="x=1.5" /> is closest to
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="-0.5" /> },
        { letter: 'B', content: <Katex tex="0" /> },
        { letter: 'C', content: <Katex tex="0.5" /> },
        { letter: 'D', content: <Katex tex="1.0" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="1.5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
