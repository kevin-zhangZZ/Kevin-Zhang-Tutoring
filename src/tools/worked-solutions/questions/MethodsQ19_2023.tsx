// 2023 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 32% correct.
// Roots of opposite signs: the product of the roots does the work, not the discriminant. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 27, B: 11, C: 13, D: 32, E: 16 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="x^2+(4k+3)x+4k^2-\tfrac94=0" />
      <br />
      <Katex tex="\Delta=(4k+3)^2-4\left(4k^2-\tfrac94\right)>0" /> for two unique solutions.
      <br />
      <Katex tex="k>-\tfrac34" />
      <br />
      One solution has to be positive and the other negative.
      <br />
      Solve <Katex tex="x^2+(4k+3)x+4k^2-\tfrac94=0" /> for <Katex tex="k" />, when{' '}
      <Katex tex="x=0" /> and <Katex tex="k>-\tfrac34" />.
      <br />
      <Katex tex="k=\tfrac34" />
      <br />
      <Katex tex="-\tfrac34<k<\tfrac34" />
      <br />
      OR
      <br />
      Use the quadratic formula and solve:
      <br />
      <Katex tex="\tfrac{-b+\sqrt{b^2-4ac}}{2a}>0" /> and{' '}
      <Katex tex="\tfrac{-b-\sqrt{b^2-4ac}}{2a}<0" />
      <br />
      So solve{' '}
      <Katex tex="\dfrac{-4k-3+\sqrt{(4k+3)^2-4\left(4k^2-\frac94\right)}}{2}>0" />
      <br />
      and <Katex tex="\dfrac{-4k-3-\sqrt{(4k+3)^2-4\left(4k^2-\frac94\right)}}{2}<0" /> for{' '}
      <Katex tex="k" />
      <br />
      <Katex tex="-\tfrac34<k<\tfrac34" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta = (4k+3)^2-4\left(4k^2-\frac94\right) > 0 \ \text{ for two distinct real solutions}" />,
    reason: <>The usual first condition.</>,
  },
  {
    working: <Katex display tex="= 16k^2+24k+9-16k^2+9 = 24k+18 > 0 \implies k > -\frac34" />,
    reason: <>The <Katex tex="k^2" /> terms cancel, leaving a linear condition. Stopping here gives option <b>A</b>, chosen by 27% of students.</>,
  },
  {
    working: <Katex display tex="\alpha\beta = \frac{c}{a} = 4k^2-\frac94" />,
    reason: <>The product of the roots. This is what "one positive and one negative" is really about.</>,
  },
  {
    working: <Katex display tex="\alpha\beta < 0 \iff 4k^2 < \frac94 \iff k^2 < \frac{9}{16}" />,
    reason: <>A negative product means the two roots have opposite signs — and it also guarantees they are real, since a negative product forces a positive discriminant.</>,
  },
  {
    working: <Katex display tex="-\frac34 < k < \frac34" />,
    reason: <>Taking square roots of <Katex tex="k^2<\tfrac{9}{16}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac34 < k < \frac34}" />,
    reason: <>Matches option <b>D</b>; this already sits inside <Katex tex="k>-\tfrac34" />, so the discriminant condition adds nothing. Spot-check <Katex tex="k=0" />: <Katex tex="x^2+3x-\tfrac94=0" /> gives <Katex tex="0.68" /> and <Katex tex="-3.68" /> ✓.</>,
  },
]

export default function MethodsQ19_2023() {
  return (
    <MCQShell
      question={
        <p>
          Find all values of <Katex tex="k" />, such that the equation{' '}
          <Katex tex="x^2+(4k+3)x+4k^2-\dfrac94=0" /> has two real solutions for{' '}
          <Katex tex="x" />, one positive and one negative.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="k>-\frac34" /> },
        { letter: 'B', content: <Katex tex="k\ge-\frac34" /> },
        { letter: 'C', content: <Katex tex="k>\frac34" /> },
        { letter: 'D', content: <Katex tex="-\frac34<k<\frac34" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="k<-\frac34 \ \text{ or } \ k>\frac34" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
