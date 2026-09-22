// 2022 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 74% correct.
// Reading a direction field: closed curves, and which way the slopes lean. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2022-mcq8-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 13, C: 74, D: 6, E: 4 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{The slopes form closed loops around } O" />,
    reason: <>Closed orbits come from <Katex tex="\tfrac{dy}{dx}" /> being a ratio like <Katex tex="-\tfrac{\text{something in }x}{\text{something in }y}" />; options <b>D</b> and <b>E</b> are sums of squares, which are never negative, so their fields would lean one way everywhere. Rule both out immediately.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{2x}{y} \implies y\,dy = 2x\,dx \implies \frac{y^2}{2}-x^2 = c" />,
    reason: <>Option <b>A</b> gives hyperbolas, not loops. Out.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = -\frac{2x}{y} \implies y\,dy = -2x\,dx \implies 2x^2+y^2 = c" />,
    reason: <>Option <b>C</b>: ellipses taller than they are wide, since the <Katex tex="x" /> term carries the bigger coefficient.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = -\frac{x}{2y} \implies x^2+2y^2 = c" />,
    reason: <>Option <b>B</b>: also ellipses, but wider than they are tall — the opposite of the picture.</>,
  },
  {
    working: <Katex display tex="\text{At } (1,1): \ \frac{dy}{dx} = -\frac{2(1)}{1} = -2" />,
    reason: <>A final check on the steepness. The strokes near <Katex tex="(1,1)" /> in the field fall steeply, matching <Katex tex="-2" /> rather than <b>B</b>'s <Katex tex="-\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{2x}{y}}" />,
    reason: <>Option <b>C</b>.</>,
  },
]

export default function SpecialistQ8_2022() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={fieldSrc}
              alt="A direction field on −4 ≤ x ≤ 4, −4 ≤ y ≤ 4 whose line segments curl around the origin in closed loops that are taller than they are wide — from the original 2022 VCAA exam paper"
              className="w-full max-w-[420px]"
            />
          </div>
          <p>The direction field shown above best represents the differential equation</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{dy}{dx}=\frac{2x}{y}" /> },
        { letter: 'B', content: <Katex tex="\frac{dy}{dx}=-\frac{x}{2y}" /> },
        { letter: 'C', content: <Katex tex="\frac{dy}{dx}=-\frac{2x}{y}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\frac{dy}{dx}=\frac{y^2}{2}+x^2" /> },
        { letter: 'E', content: <Katex tex="\frac{dy}{dx}=\frac{x^2}{2}+y^2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
