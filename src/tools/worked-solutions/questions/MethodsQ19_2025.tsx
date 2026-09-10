// 2025 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 14% correct — the
// hardest MCQ on this paper. This year's paper used four options (A–D) rather than five.
// Finding c so that the minimum distance between a line and a curve equals a given value.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 35, B: 25, C: 24, D: 14 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      The shortest distance must be perpendicular. At <Katex tex="B" />, the curve's gradient must be 1. Solving
      gives <Katex tex="B=(2,0)" />, and minimising the distance to the line gives <Katex tex="c=-4" /> or{' '}
      <Katex tex="c=0" /> — only <Katex tex="c=0" /> is an available option.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The shortest segment between a line and a smooth curve is <b>perpendicular</b> to the line — and since the line has gradient 1, the curve's tangent at <Katex tex="B" /> must also have gradient 1.</>,
    reason: 'Key geometric fact for minimum-distance problems.',
  },
  {
    working: <Katex display tex="g(x) = \log_e(x-1) \;\implies\; g'(x) = \frac{1}{x-1}" />,
    reason: <>Differentiate the curve <Katex tex="y=\log_e(x-1)" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{x-1} = 1 \;\implies\; x=2" />,
    reason: 'Find where the tangent has gradient 1.',
  },
  {
    working: <Katex display tex="B = (2,\ \log_e(1)) = (2,0)" />,
    reason: 'Coordinates of the closest point on the curve.',
  },
  {
    working: <Katex display tex="\text{Distance from } (2,0) \text{ to } x-y+c=0: \quad \frac{|2-0+c|}{\sqrt2} = \frac{|2+c|}{\sqrt2}" />,
    reason: 'Perpendicular distance from a point to a line.',
  },
  {
    working: <Katex display tex="\frac{|2+c|}{\sqrt2} = \sqrt2 \;\implies\; |2+c| = 2" />,
    reason: 'Set equal to the given minimum distance.',
  },
  {
    working: <Katex display tex="2+c = 2 \ \text{ or } \ 2+c=-2 \;\implies\; c=0 \ \text{ or } \ c=-4" />,
    reason: 'Solve the absolute value equation.',
  },
  {
    working: <Katex display tex="\boxed{c=0}" />,
    reason: <>Since <Katex tex="c=-4" /> isn't offered — matches option <b>D</b>.</>,
  },
]

export default function MethodsQ19_2025() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="A" /> be a point on the line <Katex tex="y=x+c" /> and <Katex tex="B" /> be a point on the
          curve <Katex tex="y=\log_e(x-1)" />.
          <br />
          If <Katex tex="A" /> and <Katex tex="B" /> are placed such that the line segment <Katex tex="AB" /> has the
          minimum possible length, and this length is <Katex tex="\sqrt2" />, the value of <Katex tex="c" /> must be
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt2-2" /> },
        { letter: 'B', content: <Katex tex="\sqrt2" /> },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="0" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
