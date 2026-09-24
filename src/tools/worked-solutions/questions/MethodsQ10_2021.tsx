// 2021 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 70% correct.
// The maximal domain of a sum of two square roots. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 4, C: 7, D: 70, E: 3 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \sqrt{x+2}: \ x+2 \ge 0 \implies x \ge -2" />,
    reason: <>A square root needs a non-negative argument, and <Katex tex="\ge" />, not <Katex tex=">" /> — zero is allowed.</>,
  },
  {
    working: <Katex display tex="g(x) = \sqrt{1-2x}: \ 1-2x \ge 0 \implies x \le \tfrac12" />,
    reason: <>Dividing by <Katex tex="-2" /> flips the inequality.</>,
  },
  {
    working: <Katex display tex="\text{dom}(f+g) = \text{dom}(f)\cap\text{dom}(g)" />,
    reason: <>A sum only exists where <em>both</em> pieces do — the intersection of the two domains.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[-2,\ \tfrac12\right]}" />,
    reason: <>Closed at both ends. Matches option <b>D</b>; option A has the same numbers with the wrong brackets.</>,
  },
]

export default function MethodsQ10_2021() {
  return (
    <MCQShell
      question={
        <p>
          Consider the functions <Katex tex="f(x)=\sqrt{x+2}" /> and{' '}
          <Katex tex="g(x)=\sqrt{1-2x}" />, defined over their maximal domains.
          <br />
          The maximal domain of the function <Katex tex="h=f+g" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(-2,\ \tfrac12\right)" /> },
        { letter: 'B', content: <Katex tex="[-2,\ \infty)" /> },
        { letter: 'C', content: <Katex tex="(-\infty,-2)\cup\left(\tfrac12,\ \infty\right)" /> },
        { letter: 'D', content: <Katex tex="\left[-2,\ \tfrac12\right]" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="[-2,\ 1]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
