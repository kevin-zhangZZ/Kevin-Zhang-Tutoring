// 2022 Specialist NHT — Exam 2, MCQ 8. The NHT report gives the answer key only, with no
// statistics. Differential equations: matching a slope field to dy/dx = xe^(x − y) — the sign of
// the slope follows x, and its steepness grows with x − y. Question text transcribed from the
// original paper; the slope field is the actual VCAA figure, cropped from the official exam PDF
// at 300 dpi, not a redrawing. Solution is original; the answer B agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2022nht-mcq8-field.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={fieldSrc}
      alt="A slope field on axes from −4 to 4: slopes are negative left of the y-axis and positive right of it, nearly flat in the top-left, steep in the bottom-left and nearly vertical in the bottom-right"
      className="w-full max-w-[340px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x<0:\ \tfrac{dy}{dx}\le0;\qquad x>0:\ \tfrac{dy}{dx}>0" />,
    reason: <>Read the field: every segment left of the <Katex tex="y" />-axis slopes down (or is flat), every segment right of it slopes up. The sign of the gradient is the sign of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{A: } e^{x-y}>0 \text{ everywhere}\\ &\text{C: sign of } \tfrac{y}{e^{x-y}} \text{ is the sign of } y\end{aligned}" />,
    reason: <>An exponential is always positive, so A has no negative slopes at all, and C would slope <i>down</i> in the bottom-right, where the field is steeply up. Both are out. B, D and E all have the factor <Katex tex="x" />, so they pass this test.</>,
  },
  {
    working: <Katex display tex="\text{E: } \tfrac{dy}{dx}=xe^x \text{ has no } y" />,
    reason: <>Then the slope would be the same all the way up each vertical line. But on <Katex tex="x=-4" /> the segments are almost flat at the top and steep at the bottom, so the slope depends on <Katex tex="y" />. E is out.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(-4,4):&\quad \text{B: } -4e^{-8}\approx0\\ &\quad \text{D: } -4e^{4}\approx-218\\ (-4,-4):&\quad \text{B: } -4e^{0}=-4\\ &\quad \text{D: } -4e^{-4}\approx-0.07\end{aligned}" />,
    reason: <>Test B and D at two corners. The field is almost flat at <Katex tex="(-4,4)" /> and steep at <Katex tex="(-4,-4)" />. B fits both; D gets them the wrong way round (its slopes get steeper going <i>up</i>).</>,
    more: <>The rule of thumb for B: <Katex tex="e^{x-y}" /> is small when <Katex tex="y" /> is well above <Katex tex="x" /> (top-left, flat) and huge when <Katex tex="y" /> is well below <Katex tex="x" /> (bottom-right, almost vertical). One more check: at <Katex tex="(2,0)" />, B gives <Katex tex="2e^2\approx15" />, matching the near-vertical segments there.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx}=xe^{x-y}}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ8_2022NHT() {
  return (
    <MCQShell
      question={<p>The slope field above would best represent the solutions of the differential equation</p>}
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx}=e^{x-y}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx}=xe^{x-y}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{y}{e^{x-y}}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx}=xe^{y}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dy}{dx}=xe^{x}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
