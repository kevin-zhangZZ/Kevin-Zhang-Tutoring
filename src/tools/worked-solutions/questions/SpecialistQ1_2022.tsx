// 2022 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 85% correct.
// Two absolute values over an interval where both signs are known. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 85, C: 8, D: 3, E: 3 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tfrac12 \le x \le 3 \implies 2x-1 \ge 0" />,
    reason: <>At the left end <Katex tex="2\left(\tfrac12\right)-1=0" />, and it only grows from there. So the first bracket never turns negative.</>,
  },
  {
    working: <Katex display tex="|2x-1| = 2x-1" />,
    reason: <>An absolute value of a non-negative quantity leaves it alone.</>,
  },
  {
    working: <Katex display tex="\tfrac12 \le x \le 3 \implies x-3 \le 0 \implies |x-3| = 3-x" />,
    reason: <>The second bracket is never positive on this interval, so the absolute value flips its sign.</>,
  },
  {
    working: <Katex display tex="y = (2x-1)-(3-x)" />,
    reason: <>Substituting both. The minus sign in front of the second absolute value must be distributed carefully.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 3x-4}" />,
    reason: <>Matches option <b>B</b>. Spot-check <Katex tex="x=1" />: <Katex tex="|1|-|-2|=-1" />, and <Katex tex="3(1)-4=-1" />.</>,
  },
]

export default function SpecialistQ1_2022() {
  return (
    <MCQShell
      question={
        <p>
          For the interval <Katex tex="\tfrac12\le x\le3" />, the graph of{' '}
          <Katex tex="y=|2x-1|-|x-3|" /> is the same as the graph of
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=-x-2" /> },
        { letter: 'B', content: <Katex tex="y=3x-4" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="y=x+2" /> },
        { letter: 'D', content: <Katex tex="y=3x+2" /> },
        { letter: 'E', content: <Katex tex="y=x-4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
