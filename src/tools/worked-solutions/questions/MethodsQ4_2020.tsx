// 2020 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 67% correct.
// A general solution to a cosine equation. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 7, C: 18, D: 67, E: 2 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2\cos\!\left(2x-\tfrac\pi3\right)+1 = 0 \implies \cos\!\left(2x-\tfrac\pi3\right) = -\tfrac12" />,
    reason: <>Isolate the cosine first.</>,
  },
  {
    working: <Katex display tex="2x-\tfrac\pi3 = \pm\tfrac{2\pi}{3}+2k\pi, \quad k\in Z" />,
    reason: <>The general solution of <Katex tex="\cos\theta=-\tfrac12" />: the basic angle is <Katex tex="\tfrac\pi3" />, and cosine is negative in the second and third quadrants, giving <Katex tex="\pi\mp\tfrac\pi3=\pm\tfrac{2\pi}3" /> up to full turns.</>,
  },
  {
    working: <Katex display tex="\text{plus: } 2x = \tfrac\pi3+\tfrac{2\pi}3+2k\pi = \pi+2k\pi" />,
    reason: <>Adding <Katex tex="\tfrac\pi3" /> to both sides.</>,
  },
  {
    working: <Katex display tex="x = \tfrac\pi2+k\pi = \frac{\pi(6k+3)}{6}" />,
    reason: <>Writing it over 6 to match the options: <Katex tex="\tfrac{3\pi}{6}+\tfrac{6k\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\text{minus: } 2x = \tfrac\pi3-\tfrac{2\pi}3+2k\pi = -\tfrac\pi3+2k\pi" />,
    reason: <>The other branch.</>,
  },
  {
    working: <Katex display tex="x = -\tfrac\pi6+k\pi = \frac{\pi(6k-1)}{6}" />,
    reason: <><Katex tex="-\tfrac\pi6+\tfrac{6k\pi}6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{\pi(6k-1)}{6} \ \text{ or } \ x = \frac{\pi(6k+3)}{6}}" />,
    reason: <>Option D. A quick sanity check: <Katex tex="k=0" /> gives <Katex tex="x=-\tfrac\pi6" /> and <Katex tex="x=\tfrac\pi2" />, and both satisfy the original equation.</>,
  },
]

export default function MethodsQ4_2020() {
  return (
    <MCQShell
      question={
        <p>
          The solutions of the equation{' '}
          <Katex tex="2\cos\!\left(2x-\tfrac\pi3\right)+1=0" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=\tfrac{\pi(6k-2)}{6} \text{ or } x=\tfrac{\pi(6k-3)}{6},\ k\in Z" /> },
        { letter: 'B', content: <Katex tex="x=\tfrac{\pi(6k-2)}{6} \text{ or } x=\tfrac{\pi(6k+5)}{6},\ k\in Z" /> },
        { letter: 'C', content: <Katex tex="x=\tfrac{\pi(6k-1)}{6} \text{ or } x=\tfrac{\pi(6k+2)}{6},\ k\in Z" /> },
        { letter: 'D', content: <Katex tex="x=\tfrac{\pi(6k-1)}{6} \text{ or } x=\tfrac{\pi(6k+3)}{6},\ k\in Z" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="x=\pi k \text{ or } x=\tfrac{\pi(6k+2)}{6},\ k\in Z" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
