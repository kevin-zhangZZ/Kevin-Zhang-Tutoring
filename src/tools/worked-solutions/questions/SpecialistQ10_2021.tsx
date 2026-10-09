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
    reason: <>Each dash in a direction field is drawn with gradient equal to <Katex tex="\tfrac{dy}{dx}" /> at that point. So substitute a point into each option and compare the sign with the dash drawn there. Every option gives <Katex tex="0" /> at <Katex tex="(0,0)" />, so the origin separates nothing. Pick points where the options disagree, such as a corner.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} (2,2)&: \ \text{A}: 6, \ \text{B}: 2, \ \text{C}: 2, \\ &\phantom{:} \ \text{D}: -2, \ \text{E}: 6 \end{aligned}" />,
    reason: <>The top-right corner, e.g. option D gives <Katex tex="2-2(2)=-2" />.</>,
  },
  {
    working: <Katex display tex="\text{the field there slopes } down \text{ to the right}" />,
    reason: <>So the gradient there is negative, and only <b>D</b> gives a negative value. That already rules out A, B, C and E.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} (-2,-2)&: \ \text{A}: -6, \ \text{B}: -2, \ \text{C}: -2, \\ &\phantom{:} \ \text{D}: 2, \ \text{E}: -6 \end{aligned}" />,
    reason: <>The bottom-left corner, as a second check.</>,
  },
  {
    working: <Katex display tex="\text{the field there slopes } up \text{ to the right}" />,
    reason: <>So the gradient there is positive, and again only <b>D</b> fits.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 0: \ y-2x=0 \iff y=2x" />,
    reason: <>A final check: the dashes are horizontal where <Katex tex="\tfrac{dy}{dx}=0" />. For D that is the line <Katex tex="y=2x" />, through <Katex tex="(0.5, 1)" /> and <Katex tex="(1, 2)" />, and that is where the flat dashes run in the diagram. (Option B, <Katex tex="2x-y" />, is flat along the same line, but it is D with every sign flipped, which the corner checks already ruled out.)</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = y-2x}" />,
    reason: <>Matches option <b>D</b>. Option C, the most common wrong choice, gives the wrong sign at both corners, and its flat dashes would lie along <Katex tex="2y-x=0" />, i.e. <Katex tex="y=\tfrac{x}{2}" />, a much shallower line than the one in the diagram.</>,
  },
]

export default function SpecialistQ10_2021() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img loading="lazy" decoding="async"
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
