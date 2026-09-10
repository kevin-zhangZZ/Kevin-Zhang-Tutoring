// 2019 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 57% correct.
// Matching a direction field diagram to its differential equation. Question text and diagram
// transcribed from the original paper (the diagram is the actual VCAA figure, cropped from
// the official exam PDF, not a redrawing). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import dirFieldSrc from './spec-2019-mcq9-dirfield.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img
      src={dirFieldSrc}
      alt="A direction field on axes from -8 to 8, banded diagonally: constant along lines y-x=k, with horizontal tangent marks offset from the y=x diagonal rather than sitting on it"
      className="w-full max-w-[340px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 70, C: 5, D: 2, E: 5 },
  answer: 'B',
  comment: 'The direction field is banded along diagonals of gradient 1, consistent with a right-hand side that depends only on y − x.',
}

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: 'The field repeats identically along every diagonal line of gradient 1 — the slope markers depend only on the value of y − x, not on x and y individually.',
  },
  {
    working: <>All five options are functions of <Katex tex="y-x" /> alone, matching that banding.</>,
    reason: <>Narrows the choice to which specific function of <Katex tex="u=y-x" /> fits.</>,
  },
  {
    working: <>Options <b>D</b> and <b>E</b> involve <Katex tex="\dfrac{1}{\cos(y-x)}" /> and <Katex tex="\dfrac{1}{\sin(y-x)}" />, which blow up to <Katex tex="\pm\infty" /> (vertical tangents) on some diagonals.</>,
    reason: 'The diagram shows only smooth, bounded slope markers everywhere — no near-vertical dashes anywhere — ruling out D and E.',
  },
  {
    working: <>Options <b>A</b> and <b>C</b>, <Katex tex="\sin(y-x)" /> and <Katex tex="\sin(x-y)=-\sin(y-x)" />, are both zero exactly on the diagonal <Katex tex="y=x" /> through the origin.</>,
    reason: <>In the diagram the markers sitting <i>on</i> the line <Katex tex="y=x" /> are visibly tilted, not flat — so the zero-gradient diagonal is not <Katex tex="y=x" /> itself, ruling out A and C.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \cos(y-x)}" />,
    reason: <>Option <b>B</b> is zero (horizontal) on the diagonal <Katex tex="y-x=\tfrac{\pi}{2}" /> — offset from the origin, exactly as shown — and reaches its steepest gradient <Katex tex="\pm1" /> on <Katex tex="y-x=0,\pi" />, matching the diagram.</>,
  },
]

export default function SpecialistQ9_2019() {
  return (
    <MCQShell
      question={<p>The differential equation that has the diagram below as its direction field is</p>}
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx} = \sin(y-x)" /> },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx} = \cos(y-x)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx} = \sin(x-y)" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx} = \dfrac{1}{\cos(y-x)}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dy}{dx} = \dfrac{1}{\sin(y-x)}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
