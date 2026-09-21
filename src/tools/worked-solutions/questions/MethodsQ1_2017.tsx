// 2017 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 92% correct.
// Period and range of 5sin(2x) − 1. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 1, C: 92, D: 2, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = a\sin(nx)+c \implies \text{period}=\frac{2\pi}{n}" />,
    reason: <>The standard result. Here <Katex tex="n=2" />, which squeezes the graph horizontally by a factor of <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{2} = \pi" />,
    reason: <>That rules out options B, D and E immediately.</>,
  },
  {
    working: <Katex display tex="-1\le\sin(2x)\le1" />,
    reason: <>Sine never leaves this band, whatever is inside it.</>,
  },
  {
    working: <Katex display tex="-5\le 5\sin(2x)\le 5" />,
    reason: <>Multiplying the whole inequality by the amplitude <Katex tex="5" />.</>,
  },
  {
    working: <Katex display tex="-6\le 5\sin(2x)-1\le 4" />,
    reason: <>Subtracting <Katex tex="1" /> shifts the whole band down by one.</>,
  },
  {
    working: <Katex display tex="\boxed{\pi \text{ and } [-6,4]}" />,
    reason: <>Option C. A useful check: the midpoint of the range, <Katex tex="\tfrac{-6+4}{2}=-1" />, is the vertical shift, and the half-width, <Katex tex="5" />, is the amplitude.</>,
  },
]

export default function MethodsQ1_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=5\sin(2x)-1" />.
          </p>
          <p>The period and range of this function are respectively</p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\pi" /> and <Katex tex="[-1,4]" /></> },
        { letter: 'B', content: <><Katex tex="2\pi" /> and <Katex tex="[-1,5]" /></> },
        { letter: 'C', content: <><Katex tex="\pi" /> and <Katex tex="[-6,4]" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="2\pi" /> and <Katex tex="[-6,4]" /></> },
        { letter: 'E', content: <><Katex tex="4\pi" /> and <Katex tex="[-6,4]" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
