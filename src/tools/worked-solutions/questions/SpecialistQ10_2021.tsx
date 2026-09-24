// 2021 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 68% correct.
// Matching a direction field to its differential equation. Question text transcribed from
// the original paper; the figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2021-mcq10-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 7, C: 17, D: 68, E: 3 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{test a corner rather than the origin}" />,
    reason: <>Every option gives <Katex tex="0" /> at <Katex tex="(0,0)" />, so the origin separates nothing. Pick points where the options disagree most.</>,
  },
  {
    working: <Katex display tex="(2,2): \ \text{A}: 6, \ \text{B}: 2, \ \text{C}: 2, \ \text{D}: -2, \ \text{E}: 6" />,
    reason: <>The top-right corner.</>,
  },
  {
    working: <Katex display tex="\text{the field there slopes steeply } down \text{ to the right}" />,
    reason: <>So the gradient is clearly negative — only <b>D</b> gives that.</>,
  },
  {
    working: <Katex display tex="(-2,-2): \ \text{A}: -6, \ \text{B}: -2, \ \text{C}: -2, \ \text{D}: 2, \ \text{E}: -6" />,
    reason: <>The bottom-left corner, as a second check.</>,
  },
  {
    working: <Katex display tex="\text{the field there slopes } up \text{ to the right} \implies \text{positive}" />,
    reason: <>Again only <b>D</b> fits, and the two checks together rule out every other option.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = y-2x}" />,
    reason: <>Confirming with the zero-slope locus: <Katex tex="y=2x" />, the line through the origin of gradient 2 — and that is where the near-horizontal dashes run. Matches option <b>D</b>.</>,
  },
]

export default function SpecialistQ10_2021() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img
              src={fieldSrc}
              alt="A direction field on −2 ≤ x ≤ 2, −2 ≤ y ≤ 2, with short dashes that are steeply positive on the left and steeply negative on the right — from the original 2021 VCAA exam paper"
              className="w-full max-w-[400px]"
            />
          </div>
          <p>The differential equation that has the diagram above as its direction field is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{dy}{dx}=y+2x" /> },
        { letter: 'B', content: <Katex tex="\frac{dy}{dx}=2x-y" /> },
        { letter: 'C', content: <Katex tex="\frac{dy}{dx}=2y-x" /> },
        { letter: 'D', content: <Katex tex="\frac{dy}{dx}=y-2x" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\frac{dy}{dx}=x+2y" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
