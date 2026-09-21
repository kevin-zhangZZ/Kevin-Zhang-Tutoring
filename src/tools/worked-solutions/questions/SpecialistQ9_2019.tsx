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
    working: <Katex display tex="\frac{dy}{dx}=f(y-x) \implies \text{slope constant on } y-x=k" />,
    reason: <>All five options already have this form, so the banding on its own does not separate them. Write <Katex tex="u=y-x" /> and ask instead <em>where along the diagonals</em> the markers go flat.</>,
  },
  {
    working: <Katex display tex="\cos(u)=0 \ \text{ or } \ \sin(u)=0 \implies \frac{dy}{dx}\to\pm\infty" />,
    reason: <>Ruling out <b>D</b> and <b>E</b>: both have <Katex tex="u" /> in a denominator, so on the diagonals where that denominator hits zero the gradient becomes infinite and the markers would be drawn vertical. Every marker in the diagram is finite and gently sloped.</>,
  },
  {
    working: <Katex display tex="\sin(y-x)=0 \ \text{ and } \ \sin(x-y)=0 \ \text{ on } \ y=x" />,
    reason: <>Ruling out <b>A</b> and <b>C</b>: both are zero exactly on the diagonal through the origin, so both would show <em>flat</em> markers along <Katex tex="y=x" />. In the diagram the markers sitting on <Katex tex="y=x" /> are visibly tilted, so the flat diagonal is somewhere else.</>,
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
