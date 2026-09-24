// 2018 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 95% correct. The period
// of a scaled cosine. Question text transcribed from the original paper; VCAA printed no
// diagram and neither does the stem here (guide §7). Answer checked with sympy.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 2, C: 95, D: 2, E: 0 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 4\cos\!\left(\frac{2\pi x}{3}\right)+1" />,
    reason: <>Only the coefficient of <Katex tex="x" /> inside the cosine affects the period. The <Katex tex="4" /> sets the amplitude and the <Katex tex="+1" /> shifts the curve vertically — neither changes how often it repeats.</>,
  },
  {
    working: <Katex display tex="\text{Period} = \frac{2\pi}{n} \ \text{ for } \ \cos(nx), \qquad n = \frac{2\pi}{3}" />,
    reason: <>The standard result: a cosine completes one cycle when its argument advances by <Katex tex="2\pi" />.</>,
  },
  {
    working: <Katex display tex="\text{Period} = \frac{2\pi}{\ \frac{2\pi}{3}\ } = 2\pi \times \frac{3}{2\pi}" />,
    reason: <>Dividing by a fraction is multiplying by its reciprocal.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Period} = 3}" />,
    reason: <>Matches option <b>C</b>. The <Katex tex="2\pi" />s cancel exactly, which is the point of writing the coefficient as <Katex tex="\tfrac{2\pi}{3}" /> in the first place — a period of <Katex tex="3" /> was designed in. At <Katex tex="95\%" /> this was the paper's easiest question.</>,
  },
]

export default function MethodsQ1_2018() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=4\cos\!\left(\dfrac{2\pi x}{3}\right)+1" />.
          The period of this function is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
