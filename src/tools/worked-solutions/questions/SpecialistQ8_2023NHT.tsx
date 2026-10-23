// 2023 Specialist NHT — Exam 2, MCQ 8. The NHT report gives the answer key only, with no
// statistics. Differential equations: matching a direction field to dy/dx = y²/x — slopes take the
// sign of x whatever the sign of y, are zero on the x-axis and steep near the y-axis. Question text
// transcribed from the original paper; the direction field is the actual VCAA figure, cropped from
// the official exam PDF at 300 dpi. Solution is original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2023nht-mcq8-field.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={fieldSrc}
      alt="VCAA's direction field on axes from about −8 to 8 horizontally and −5 to 5 vertically: segments slope down left of the y-axis and up right of it, both above and below the x-axis; they are flat along the x-axis and become steep near the y-axis and far from the x-axis"
      className="w-full max-w-[400px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}x>0:&\ \ \tfrac{dy}{dx}>0 \text{ (above and below the } x\text{-axis)}\\ x<0:&\ \ \tfrac{dy}{dx}<0 \text{ (above and below the } x\text{-axis)}\end{aligned}" />,
    reason: <>Read the signs quadrant by quadrant. On the right the segments slope up in both the first and fourth quadrants; on the left they slope down in both the second and third. So the sign of the slope is the sign of <Katex tex="x" />, and doesn&apos;t change when <Katex tex="y" /> changes sign.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{A: } \tfrac{y}{x}>0 \text{ in quadrant 3}\\ &\text{B: } \tfrac{y^2}{x^2}\ge0 \text{ everywhere}\\ &\text{D: } \tfrac{y}{x^2}<0 \text{ in quadrant 4}\\ &\text{E: } -\tfrac{y}{x^2}<0 \text{ in quadrant 1}\end{aligned}" />,
    reason: <>Test each option&apos;s sign against the field. A, D and E depend on the sign of <Katex tex="y" />, and B is never negative, so each one gets at least one quadrant wrong.</>,
  },
  {
    working: <Katex display tex="\text{C: } \frac{dy}{dx}=\frac{y^2}{x}:\ \ y^2\ge0 \implies \text{sign} = \text{sign of } x\ \checkmark" />,
    reason: <>Squaring <Katex tex="y" /> removes its sign, leaving the sign of <Katex tex="x" />, exactly as the field shows.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}y=0:&\ \ \tfrac{dy}{dx}=0\\ (1,2):&\ \ \tfrac{dy}{dx}=4\\ (6,1):&\ \ \tfrac{dy}{dx}=\tfrac16\end{aligned}" />,
    reason: <>Confirm the steepness too: the field is flat along the <Katex tex="x" />-axis, steep close to the <Katex tex="y" />-axis, and gentle far to the right near the <Katex tex="x" />-axis. C matches all three.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx}=\frac{y^2}{x}}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function SpecialistQ8_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The direction field shown above best represents the differential equation
        </p>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{y}{x}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{y^2}{x^2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{y^2}{x}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{y}{x^2}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dy}{dx}=-\dfrac{y}{x^2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
