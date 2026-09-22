// 2025 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 72% correct.
// Tracing a while loop that prints inside the body. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 15, C: 72, D: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="n = 17, \quad k = 5" />,
    reason: <>The initial values. <Katex tex="k" /> never changes, so each pass subtracts 5.</>,
  },
  {
    working: <Katex display tex="17>5 \ \checkmark \implies n = 12, \ \text{print } 12" />,
    reason: 'The test happens before the body, and the print happens after the subtraction.',
  },
  {
    working: <Katex display tex="12>5 \ \checkmark \implies n = 7, \ \text{print } 7" />,
    reason: 'Second pass.',
  },
  {
    working: <Katex display tex="7>5 \ \checkmark \implies n = 2, \ \text{print } 2" />,
    reason: 'Third pass.',
  },
  {
    working: <Katex display tex="2>5 \ \times \implies \text{loop ends}" />,
    reason: <>The test fails, so nothing more is printed — <Katex tex="-3" /> never happens, which is what option <b>D</b> assumes.</>,
  },
  {
    working: <Katex display tex="\boxed{12,\ 7,\ 2}" />,
    reason: <>Option <b>C</b>. Note 17 itself is never printed, because the print statement sits after the subtraction.</>,
  },
]

export default function MethodsQ7_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the algorithm below.</p>
          <pre className="text-[13px] leading-relaxed bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-3 w-fit">
{`n ← 17
k ← 5
while n > k
    n ← n − k
    print n
end while`}
          </pre>
          <p>In order, the values printed by the algorithm are</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="12" /> },
        { letter: 'B', content: <Katex tex="12,\ 7" /> },
        { letter: 'C', content: <Katex tex="12,\ 7,\ 2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="12,\ 7,\ 2,\ -3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
