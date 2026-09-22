// 2025 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 72% correct. This
// year's paper used four options (A–D) rather than five. Tracing a while loop that
// accumulates disc volumes. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 72, C: 15, D: 3 },
  answer: 'B',
  comment: <>Work through the algorithm methodically, one pass of the loop at a time.</>,
}

const CODE = (
  <pre className="text-[13px] leading-relaxed font-mono bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 overflow-x-auto">
{`define f(x)
    return √(x + 1)
sum ← 0
a ← 1
b ← 3
left ← a
while left ≤ b
    volume ← π(f(left))²
    sum ← sum + volume
    left ← left + 1
end while
print sum`}
  </pre>
)

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\pi\big(f(x)\big)^2 = \pi\left(\sqrt{x+1}\right)^2 = \pi(x+1)" />,
    reason: 'The squaring undoes the square root, so each pass adds a simple multiple of π.',
  },
  {
    working: <Katex display tex="\text{left}=1: \quad \text{volume} = 2\pi, \quad \text{sum} = 2\pi" />,
    reason: 'First pass. left becomes 2.',
  },
  {
    working: <Katex display tex="\text{left}=2: \quad \text{volume} = 3\pi, \quad \text{sum} = 5\pi" />,
    reason: 'Second pass. left becomes 3.',
  },
  {
    working: <Katex display tex="\text{left}=3: \quad \text{volume} = 4\pi, \quad \text{sum} = 9\pi" />,
    reason: <>Third pass — the condition is <Katex tex="\text{left}\leq b" /> with <Katex tex="b=3" />, so 3 is included. left becomes 4.</>,
  },
  {
    working: <Katex display tex="\text{left}=4 > 3 \implies \text{loop ends}" />,
    reason: 'The test fails, so nothing more is added.',
  },
  {
    working: <Katex display tex="\boxed{9\pi}" />,
    reason: <>Option <b>B</b>. Stopping at left = 2 gives <Katex tex="5\pi" />; running to left = 4 gives <Katex tex="14\pi" /> — both are offered as distractors.</>,
  },
]

export default function SpecialistQ4_2025() {
  return (
    <MCQShell
      question={
        <>
          <p>Consider the following algorithm used to estimate a volume of revolution.</p>
          {CODE}
          <p>The algorithm above will print the value</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="5\pi" /> },
        { letter: 'B', content: <Katex tex="9\pi" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="14\pi" /> },
        { letter: 'D', content: <Katex tex="29\pi" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
