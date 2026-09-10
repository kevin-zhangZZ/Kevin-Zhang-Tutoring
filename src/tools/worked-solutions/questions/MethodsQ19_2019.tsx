// 2019 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 25% correct — the
// hardest MCQ on this paper. Sum of the solutions to tan(2x) = d on a given interval, in
// terms of α. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 12, C: 27, D: 30, E: 25 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(2x) = d = \tan(\alpha)" />,
    reason: 'Rewrite the equation using the given relationship.',
  },
  {
    working: <Katex display tex="2x = \alpha + k\pi \;\implies\; x = \frac{\alpha}{2} + \frac{k\pi}{2},\quad k\in\mathbb{Z}" />,
    reason: <>Tan has period <Katex tex="\pi" />, so all solutions to <Katex tex="\tan(2x)=\tan(\alpha)" /> are spaced <Katex tex="\pi/2" /> apart in <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="0 < \alpha < \tfrac{\pi}{2} \;\implies\; 0 < \tfrac{\alpha}{2} < \tfrac{\pi}{4}" />,
    reason: 'Halve the given range for α.',
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="k=0:\ x=\tfrac{\alpha}{2}\in\big(0,\tfrac{\pi}{4}\big)" /> ✓</span>
        <span><Katex tex="k=1:\ x=\tfrac{\alpha}{2}+\tfrac{\pi}{2}\in\big(\tfrac{\pi}{2},\tfrac{3\pi}{4}\big)" /> ✓</span>
        <span><Katex tex="k=2:\ x=\tfrac{\alpha}{2}+\pi\in\big(\pi,\tfrac{5\pi}{4}\big)" /> ✓</span>
        <span><Katex tex="k=3:\ x=\tfrac{\alpha}{2}+\tfrac{3\pi}{2}" /> — exceeds <Katex tex="\tfrac{5\pi}{4}" />, rejected</span>
      </div>
    ),
    reason: <>Test each <Katex tex="k" /> against the given interval <Katex tex="0<x<\tfrac{5\pi}{4}" />: exactly three solutions survive.</>,
  },
  {
    working: <Katex display tex="\text{Sum} = 3\cdot\frac{\alpha}{2} + \left(\frac{\pi}{2}+\pi\right) = \frac{3\alpha}{2}+\frac{3\pi}{2}" />,
    reason: 'Add the three solutions found above.',
  },
  {
    working: <Katex display tex="\boxed{\frac{3(\pi+\alpha)}{2}}" />,
    reason: <>Factor — matches option <b>E</b>.</>,
  },
]

export default function MethodsQ19_2019() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\tan(\alpha)=d" />, where <Katex tex="d>0" /> and <Katex tex="0<\alpha<\tfrac{\pi}{2}" />,
          the sum of the solutions to <Katex tex="\tan(2x)=d" />, where <Katex tex="0<x<\tfrac{5\pi}{4}" />, in terms
          of <Katex tex="\alpha" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="2\alpha" /> },
        { letter: 'C', content: <Katex tex="\pi+2\alpha" /> },
        { letter: 'D', content: <Katex tex="\tfrac{\pi}{2}+\alpha" /> },
        { letter: 'E', content: <Katex tex="\tfrac{3(\pi+\alpha)}{2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
