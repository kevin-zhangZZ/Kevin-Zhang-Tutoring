// 2022 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 91% correct.
// The period of a cosine with a phase shift. Question text transcribed from the
// original paper. Solution is original.
// Oct 2026 Concise/Detailed review: not widget-eligible (91% correct); the
// distractor analysis sits in the final row's `more` (Detailed only).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 91, C: 2, D: 2, E: 1 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period of } a\cos(nx+c) = \frac{2\pi}{n} \quad (n>0)" />,
    reason: <>Only the coefficient of <Katex tex="x" /> changes the period. The amplitude 3 and the <Katex tex="+\pi" /> (a sideways shift) don't change how long one cycle takes.</>,
    more: <>The 3 stretches the graph vertically, so it runs between <Katex tex="-3" /> and <Katex tex="3" /> instead of <Katex tex="-1" /> and <Katex tex="1" />. Factorising inside the brackets, <Katex tex="2x+\pi = 2\left(x+\tfrac{\pi}{2}\right)" />, shows the <Katex tex="+\pi" /> is a translation of <Katex tex="\tfrac{\pi}{2}" /> to the left. Stretching up or sliding sideways leaves the length of each cycle unchanged.</>,
  },
  {
    working: <Katex display tex="n = 2 \implies \text{period} = \frac{2\pi}{2}" />,
    reason: <>The coefficient of <Katex tex="x" /> inside the cosine is 2.</>,
    more: <>Why divide by <Katex tex="n" />: cosine completes one cycle each time the angle inside it grows by <Katex tex="2\pi" />. The angle <Katex tex="2x+\pi" /> grows twice as fast as <Katex tex="x" />, so <Katex tex="x" /> only needs to grow by <Katex tex="\tfrac{2\pi}{2}=\pi" />. Check: <Katex tex="f(x+\pi) = 3\cos(2x+3\pi) = 3\cos(2x+\pi) = f(x)" />, because adding <Katex tex="2\pi" /> to the angle changes nothing.</>,
  },
  {
    working: <Katex display tex="\boxed{\pi}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option A, <Katex tex="2\pi" />, is the period of <Katex tex="\cos(x)" />: it forgets to divide by 2. Option C, <Katex tex="\tfrac{2\pi}{3}" />, divides <Katex tex="2\pi" /> by the amplitude instead of by the coefficient of <Katex tex="x" />. Options D and E are just the coefficient of <Katex tex="x" /> (2) and the amplitude (3).</>,
  },
]

export default function MethodsQ1_2022() {
  return (
    <MCQShell
      question={
        <p>
          The period of the function <Katex tex="f(x)=3\cos(2x+\pi)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\pi" /> },
        { letter: 'B', content: <Katex tex="\pi" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac{2\pi}{3}" /> },
        { letter: 'D', content: <Katex tex="2" /> },
        { letter: 'E', content: <Katex tex="3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
