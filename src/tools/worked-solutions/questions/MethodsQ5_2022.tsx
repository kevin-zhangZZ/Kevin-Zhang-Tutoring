// 2022 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 74% correct.
// The largest domain restriction making a parabola one-to-one. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 5, C: 74, D: 5, E: 6 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2+3x-10" />,
    reason: <>A parabola is two-to-one, so it becomes one-to-one only once the domain is cut at the turning point.</>,
  },
  {
    working: <Katex display tex="x_{\text{vertex}} = -\frac{b}{2a} = -\frac{3}{2}" />,
    reason: <>Or from the roots <Katex tex="-5" /> and <Katex tex="2" />, whose midpoint is <Katex tex="-1.5" />.</>,
  },
  {
    working: <Katex display tex="f \text{ is decreasing on } \left(-\infty,-\tfrac32\right]" />,
    reason: <>The domain is <Katex tex="(-\infty,a]" />, so the cut must be at or before the vertex — and "largest" means exactly at it.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -1.5}" />,
    reason: <>Matches option <b>C</b>. Option A, <Katex tex="-12.25" />, is the <em>minimum value</em> <Katex tex="f\!\left(-\tfrac32\right)" />; options B and E are the <Katex tex="x" />-intercepts.</>,
  },
]

export default function MethodsQ5_2022() {
  return (
    <MCQShell
      question={
        <p>
          The largest value of <Katex tex="a" /> such that the function{' '}
          <Katex tex="f:(-\infty,a]\to R" />, <Katex tex="f(x)=x^2+3x-10" />, where{' '}
          <Katex tex="f" /> is one-to-one, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-12.25" /> },
        { letter: 'B', content: <Katex tex="-5" /> },
        { letter: 'C', content: <Katex tex="-1.5" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0" /> },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
