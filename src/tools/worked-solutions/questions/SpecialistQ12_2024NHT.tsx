// 2024 Specialist NHT — Exam 2, MCQ 12. The NHT report gives the answer key only, with no
// statistics. Differential equations: matching a direction field (ellipse-like curves centred at
// (2, 2)) to its differential equation. Question text transcribed from the original paper; the
// direction field is cropped from the original VCAA exam PDF. Solution is original; the answer E
// agrees with the report's key. Checked: E's solution curves are (y − 2)² + 4(x − 2)² = c,
// ellipses twice as tall as they are wide, as drawn.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2024nht-mcq12-field.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={fieldSrc}
      alt="A direction field for 0 ≤ x ≤ 4 and 0 ≤ y ≤ 4: segments are horizontal along x = 2, vertical along y = 2, and turn around the point (2, 2) like nested ovals taller than they are wide. From the original 2024 NHT VCAA exam paper"
      className="w-full max-w-[380px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Field: negative slopes, e.g. at }(3,3),\ (1,1)" />,
    reason: <>Look for features you can test. Up and to the right of <Katex tex="(2,2)" /> the segments slope down, so <Katex tex="\tfrac{dy}{dx}" /> takes negative values.</>,
  },
  {
    working: <Katex display tex="\text{A, C, D: } \frac{dy}{dx}=(\ldots)^2+(\ldots)^2\ge 0" />,
    reason: <>Options A, C and D are sums of squares, so their gradients are never negative. All three are out.</>,
  },
  {
    working: <Katex display tex="\text{Field: } \frac{dy}{dx}=0 \text{ along } x=2" />,
    reason: <>The segments are horizontal all the way up the vertical line <Katex tex="x=2" />, so the numerator must be zero when <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: } 8-2x=0 &\iff x=4\\ \text{E: } 8-4x=0 &\iff x=2\end{aligned}" />,
    reason: <>Option B is flat along <Katex tex="x=4" />, not <Katex tex="x=2" />; option E is flat along <Katex tex="x=2" />.</>,
    more: <>Both B and E have <Katex tex="y-2" /> in the denominator, so both have vertical segments along <Katex tex="y=2" />, which the field shows. That is why the column of horizontal segments along <Katex tex="x=2" /> is the feature that separates them.</>,
  },
  {
    working: <Katex display tex="\text{E at }(3,3):\ \frac{dy}{dx}=\frac{8-12}{3-2}=-4" />,
    reason: <>A spot check: at <Katex tex="(3,3)" /> the field&apos;s segment is steep and falling, matching a gradient of <Katex tex="-4" />.</>,
    more: <>Separating E gives <Katex tex="(y-2)\,dy=-4(x-2)\,dx" />, so <Katex tex="(y-2)^2+4(x-2)^2=c" />. These are ellipses centred at <Katex tex="(2,2)" />, twice as tall as they are wide, which is the oval pattern in the field.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx}=\frac{8-4x}{y-2}}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ12_2024NHT() {
  return (
    <MCQShell
      question={<p>The direction field shown above best represents the differential equation</p>}
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx}=(x-2)^2+\dfrac{(y-2)^2}{4}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{8-2x}{y-2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{(x-2)^2}{4}+(y-2)^2" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx}=x^2+\dfrac{y^2}{2}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{8-4x}{y-2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
