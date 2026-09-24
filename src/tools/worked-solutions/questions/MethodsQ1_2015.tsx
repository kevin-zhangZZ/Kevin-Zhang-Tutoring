// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 1. VCAA examination report: 95% correct.
// Period and range of 2sin(3x) − 3. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 95, B: 4, C: 1, D: 0, E: 0 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{3}" />,
    reason: <>The coefficient of <Katex tex="x" /> inside the sine is <Katex tex="3" />, so the graph is squeezed horizontally by a factor of <Katex tex="3" />.</>,
  },
  {
    working: <Katex display tex="-1\le\sin(3x)\le1 \implies -2\le2\sin(3x)\le2" />,
    reason: <>Amplitude <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="-5\le2\sin(3x)-3\le-1" />,
    reason: <>Subtracting <Katex tex="3" /> shifts the whole band down by three.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{period } \frac{2\pi}{3}, \quad \text{range } [-5,-1]}" />,
    reason: <>Matches option <b>A</b>. Option B forgets the vertical shift of <Katex tex="-3" />; options D and E multiply <Katex tex="\pi" /> by 3 instead of dividing <Katex tex="2\pi" /> by it. Check: the midpoint of the range, <Katex tex="-3" />, is the vertical shift; the half-width, <Katex tex="2" />, is the amplitude.</>,
  },
]

export default function MethodsQ1_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=2\sin(3x)-3" />.
          </p>
          <p>The period and range of this function are respectively</p>
        </>
      }
      options={[
        { letter: 'A', content: <>period <Katex tex="=\tfrac{2\pi}{3}" /> and range <Katex tex="=[-5,-1]" /></>, isAnswer: true },
        { letter: 'B', content: <>period <Katex tex="=\tfrac{2\pi}{3}" /> and range <Katex tex="=[-2,2]" /></> },
        { letter: 'C', content: <>period <Katex tex="=\tfrac{\pi}{3}" /> and range <Katex tex="=[-1,5]" /></> },
        { letter: 'D', content: <>period <Katex tex="=3\pi" /> and range <Katex tex="=[-1,5]" /></> },
        { letter: 'E', content: <>period <Katex tex="=3\pi" /> and range <Katex tex="=[-2,2]" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
