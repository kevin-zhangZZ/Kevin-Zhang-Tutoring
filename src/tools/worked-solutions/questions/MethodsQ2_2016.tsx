// 2016 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 90% correct.
// Period and range of 1 − 2cos(πx/2). Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 90, C: 2, D: 4, E: 1 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{n} \text{ where } n=\frac{\pi}{2}" />,
    reason: <>The coefficient of <Katex tex="x" /> inside the cosine.</>,
  },
  {
    working: <Katex display tex="= \frac{2\pi}{\frac{\pi}{2}} = 4" />,
    reason: <>The <Katex tex="\pi" />s cancel, so the period is a plain number, not a multiple of <Katex tex="\pi" />. Options D and E keep the <Katex tex="\pi" /> by mistake.</>,
  },
  {
    working: <Katex display tex="-1\le\cos\!\left(\frac{\pi x}{2}\right)\le1 \implies -2\le-2\cos\!\left(\frac{\pi x}{2}\right)\le2" />,
    reason: <>Multiplying by <Katex tex="-2" /> reverses the inequality, but the band is symmetric so it looks unchanged.</>,
  },
  {
    working: <Katex display tex="-1\le 1-2\cos\!\left(\frac{\pi x}{2}\right)\le 3" />,
    reason: <>Adding <Katex tex="1" /> shifts the whole band up by one.</>,
  },
  {
    working: <Katex display tex="\boxed{4 \text{ and } [-1,3]}" />,
    reason: <>Matches option <b>B</b>. Options A and E forget the shift of <Katex tex="1" /> up. Check: the midpoint of the range, <Katex tex="1" />, is the vertical shift; the half-width, <Katex tex="2" />, is the amplitude.</>,
  },
]

export default function MethodsQ2_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f:R\to R" />,{' '}
            <Katex tex="f(x)=1-2\cos\!\left(\dfrac{\pi x}{2}\right)" />.
          </p>
          <p>The period and range of this function are respectively</p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="4" /> and <Katex tex="[-2,2]" /></> },
        { letter: 'B', content: <><Katex tex="4" /> and <Katex tex="[-1,3]" /></>, isAnswer: true },
        { letter: 'C', content: <><Katex tex="1" /> and <Katex tex="[-1,3]" /></> },
        { letter: 'D', content: <><Katex tex="4\pi" /> and <Katex tex="[-1,3]" /></> },
        { letter: 'E', content: <><Katex tex="4\pi" /> and <Katex tex="[-2,2]" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
