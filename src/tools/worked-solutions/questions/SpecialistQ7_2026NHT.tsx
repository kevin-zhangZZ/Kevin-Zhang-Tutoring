// 2026 Specialist NHT — Exam 2, MCQ 7. The NHT report gives the answer key and a short comment
// only, with no statistics. Differential equations: matching a direction field to dy/dx = x − y
// by checking where the slopes are zero, vertical, positive and negative. Question text
// transcribed from the original paper; the direction field is the actual VCAA figure, cropped
// from the official exam PDF at 300 dpi. Solution is original; the answer B agrees with the
// report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2026nht-mcq7-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      Exclude C and D as there are not vertical tangents on the line <Katex tex="y=x" />.
      <br />
      The sign of gradient is positive when <Katex tex="x>y" />.
    </>
  ),
}

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={fieldSrc}
      alt="VCAA's direction field for −2 ≤ x ≤ 2, −2 ≤ y ≤ 2: segments are horizontal near the line y = x, slope upwards below and to the right of it, becoming steeper towards (2, −2), and slope downwards above and to the left of it, becoming steeper towards (−2, 2)"
      className="w-full max-w-[380px]"
    />
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Along } y=x:\ \text{slopes} \approx 0\ (\text{horizontal})" />,
    reason: <>Start with the most recognisable feature: the horizontal segments run along the diagonal <Katex tex="y=x" />, e.g. near <Katex tex="(-1,-1)" /> and <Katex tex="(1.5,1.5)" />.</>,
  },
  {
    working: <Katex display tex="\text{C, D: } \frac{dy}{dx}=\frac{1}{\pm(x-y)}\ \text{undefined on } y=x" />,
    reason: <>For C and D the denominator is zero on <Katex tex="y=x" />, so the segments there would be <b>vertical</b>, not horizontal. Rule both out.</>,
  },
  {
    working: <Katex display tex="(2,-2):\ \text{field slope} > 0\ (\text{steep, upwards})" />,
    reason: <>Below and to the right of <Katex tex="y=x" />, where <Katex tex="x>y" />, every segment slopes upwards, and the steepness grows with distance from the diagonal.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: } y-x&=-2-2=-4<0\ \ \times\\ \text{B: } x-y&=2-(-2)=4>0\ \ \checkmark\end{aligned}" />,
    reason: <>Test the point in A and B. Only <Katex tex="x-y" /> is positive when <Katex tex="x>y" />, and it is zero on <Katex tex="y=x" /> and grows with distance from it, as the field shows.</>,
    more: <>One more check: at <Katex tex="(0,1)" />, <Katex tex="x-y=-1" />, and the segment there does slope down at about 45°.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx}=x-y}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>A</b> has the right zero line but every slope has the wrong sign. Options <b>C</b> and <b>D</b> are the reciprocals, which would be vertical on <Katex tex="y=x" /> and almost flat far from it, the opposite of the picture.</>,
  },
]

export default function SpecialistQ7_2026NHT() {
  return (
    <MCQShell
      question={<p>The direction field above best represents the differential equation</p>}
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx}=y-x" /> },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx}=x-y" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{1}{x-y}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{1}{y-x}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
