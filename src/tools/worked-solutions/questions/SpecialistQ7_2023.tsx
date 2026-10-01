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
    reason: <>Each short stroke shows the gradient <Katex tex="\tfrac{dy}{dx}" /> of the solution curve through that point, so a solution curve runs along the strokes it passes. Start at the given point and sketch the curve as <Katex tex="x" /> increases, keeping it parallel to the nearby strokes.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{Left of the } y\text{-axis:} \\ \text{slopes steeply negative} \end{gathered}" />,
    reason: <>At <Katex tex="(-1,\,2)" /> the strokes are almost vertical, pointing down to the right, so the curve falls sharply: it is down to about <Katex tex="y=0.8" /> by <Katex tex="x=-0.5" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{Near the } y\text{-axis:} \\ \text{strokes flatten out} \end{gathered}" />,
    reason: <>The curve crosses the <Katex tex="y" />-axis at about <Katex tex="y=0.5" /> and levels off. It bottoms out just right of the <Katex tex="y" />-axis, still at about <Katex tex="y=0.5" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{Right of the } y\text{-axis:} \\ \text{slopes turn positive} \end{gathered}" />,
    reason: <>The curve turns and climbs steadily: about <Katex tex="y=0.7" /> at <Katex tex="x=1" />, and just below <Katex tex="y=1" /> at <Katex tex="x=1.5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y \approx 1.0 \text{ when } x = 1.5}" />,
    reason: <>Matches option <b>D</b>. Option <b>C</b>, 0.5, is about the height of the curve's lowest point near the <Katex tex="y" />-axis, not its value at <Katex tex="x=1.5" />; by then the curve has climbed back up. (A check, not needed in the exam: the field is consistent with <Katex tex="\tfrac{dy}{dx}=x-y^2" />, which is zero along <Katex tex="x=y^2" /> and the same above and below the <Katex tex="x" />-axis. Solving that numerically from <Katex tex="(-1,\,2)" /> gives a lowest point of about <Katex tex="(0.21,\,0.46)" /> and <Katex tex="y(1.5)\approx0.97" />.)</>,
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
            <Katex tex="x=-1" />.
            <br />
            The value of <Katex tex="y" /> on the same solution curve when{' '}
            <Katex tex="x=1.5" /> is closest to
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
