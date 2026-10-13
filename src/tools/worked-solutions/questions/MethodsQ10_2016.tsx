// 2016 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 52% correct.
// Find where a parabola's tangent is parallel to the chord joining its two axis intercepts.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 23, B: 6, C: 10, D: 52, E: 8 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} y=0 &\implies x=\pm\sqrt5 \\ x=0 &\implies y=-5 \end{aligned}" />,
    reason: <>Find the two intercepts the question names: the positive <Katex tex="x" />-intercept is <Katex tex="(\sqrt5,0)" />, and the <Katex tex="y" />-intercept is <Katex tex="(0,-5)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{gradient of chord} &= \frac{-5-0}{0-\sqrt5} \\ &= \frac{5}{\sqrt5} = \sqrt5 \end{aligned}" />,
    reason: <>Gradient of the line joining the two intercepts, rise over run. Note <Katex tex="\tfrac{5}{\sqrt5}=\sqrt5" /> because <Katex tex="5=\sqrt5\times\sqrt5" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2x" />,
    reason: <>The gradient of the tangent at any point <Katex tex="x" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="2x = \sqrt5" />
        <Katex display tex="\implies\; x = \frac{\sqrt5}{2}" />
      </>
    ),
    reason: <>Parallel lines have equal gradients, so set the tangent's gradient equal to the chord's and solve for <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \dfrac{\sqrt5}{2}}" />,
    reason: <>Matches option <b>D</b>. The question asks for the <Katex tex="x" />-value, not the gradient.</>,
    more: <>The most popular wrong answer, option A (23%), is <Katex tex="\sqrt5" />: the chord's gradient itself. Students who found the gradient stopped there instead of going on to ask where the tangent has that gradient. Option E, <Katex tex="\tfrac{1}{\sqrt5}" />, is what run over rise gives; options B and C reuse the intercept values <Katex tex="5" /> and <Katex tex="-5" />. A quick check: for any parabola, the tangent parallel to a chord touches at the midpoint of the chord's <Katex tex="x" />-values, here <Katex tex="\tfrac{0+\sqrt5}{2}=\tfrac{\sqrt5}{2}" />, which agrees.</>,
  },
]

export default function MethodsQ10_2016() {
  return (
    <MCQShell
      question={
        <p>
          For the curve <Katex tex="y=x^2-5" />, the tangent to the curve will be parallel to the line
          connecting the positive <Katex tex="x" />-intercept and the <Katex tex="y" />-intercept when{' '}
          <Katex tex="x" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt5" /> },
        { letter: 'B', content: <Katex tex="5" /> },
        { letter: 'C', content: <Katex tex="-5" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\sqrt5}{2}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{1}{\sqrt5}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
