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
    reason: <>For <Katex tex="\sin(nx)" /> the period is <Katex tex="\tfrac{2\pi}{n}" />; here <Katex tex="n=3" />. The <Katex tex="2" /> and <Katex tex="-3" /> don't affect the period.</>,
    more: <>The <Katex tex="3" /> squeezes the graph horizontally by a factor of <Katex tex="3" />, so one full cycle, normally <Katex tex="2\pi" /> long, now takes <Katex tex="\tfrac{2\pi}{3}" />. The amplitude and vertical shift change only the range.</>,
  },
  {
    working: <Katex display tex="-1\le\sin(3x)\le1 \implies -2\le2\sin(3x)\le2" />,
    reason: <>Start from the range of sine, <Katex tex="[-1,1]" />, and apply each transformation in turn. Multiplying by <Katex tex="2" /> (the amplitude) doubles it.</>,
  },
  {
    working: <Katex display tex="-5\le2\sin(3x)-3\le-1" />,
    reason: <>Subtracting <Katex tex="3" /> shifts the whole band down by three.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{period } \frac{2\pi}{3}, \quad \text{range } [-5,-1]}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Check: the midpoint of the range, <Katex tex="-3" />, is the vertical shift; the half-width, <Katex tex="2" />, is the amplitude. Option B forgets the vertical shift of <Katex tex="-3" />. Options C and D have range <Katex tex="[-1,5]" />, whose midpoint is <Katex tex="2" /> and half-width <Katex tex="3" />: the <Katex tex="2" /> and the <Katex tex="3" /> have swapped roles (amplitude <Katex tex="3" />, shift up <Katex tex="2" />). Option C also halves the period (<Katex tex="\tfrac{\pi}{n}" /> is the period rule for tan, not sine). Options D and E treat the <Katex tex="3" /> as a horizontal stretch (period <Katex tex="3\pi" />) instead of a squeeze by a factor of <Katex tex="3" />.</>,
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
