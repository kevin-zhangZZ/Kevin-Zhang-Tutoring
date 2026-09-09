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
    working: <Katex display tex="y=x^2-5, \qquad y=0 \implies x=\pm\sqrt5" />,
    reason: <>Find the intercepts — the positive <Katex tex="x" />-intercept is <Katex tex="(\sqrt5,0)" />, and the <Katex tex="y" />-intercept is <Katex tex="(0,-5)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{gradient of chord} &= \frac{-5-0}{0-\sqrt5} \\ &= \sqrt5 \end{aligned}" />,
    reason: 'The line connecting the two intercepts.',
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2x" />,
    reason: 'The gradient of the tangent to the curve at any point x.',
  },
  {
    working: (
      <>
        <Katex display tex="2x = \sqrt5" />
        <Katex display tex="\implies\; x = \frac{\sqrt5}{2}" />
      </>
    ),
    reason: 'Set the tangent gradient equal to the chord gradient, since parallel lines share a gradient.',
  },
  {
    working: <Katex display tex="\boxed{x = \dfrac{\sqrt5}{2}}" />,
    reason: <>Matches option <b>D</b>.</>,
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
        { letter: 'A', content: <Katex tex="5" /> },
        { letter: 'B', content: <Katex tex="\sqrt5" /> },
        { letter: 'C', content: <Katex tex="-\sqrt5" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\sqrt5}{2}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{1}{\sqrt5}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
