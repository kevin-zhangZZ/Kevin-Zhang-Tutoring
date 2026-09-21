// 2019 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 59% correct. The set of
// k for which a quadratic has two real solutions, via the discriminant. Question text
// transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 59, C: 15, D: 6, E: 9 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta = 2^2-4(1)(-k) = 4+4k" />,
    reason: <>Discriminant of <Katex tex="x^2+2x-k=0" />.</>,
  },
  {
    working: <Katex display tex="\text{Two real solutions} \iff \Delta>0 \iff 4+4k>0" />,
  },
  {
    working: <Katex display tex="\boxed{k>-1, \text{ i.e. } k\in(-1,\infty)}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ2_2019() {
  return (
    <MCQShell
      question={
        <p>
          The set of values of <Katex tex="k" /> for which <Katex tex="x^2+2x-k=0" /> has two
          real solutions is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\{-1,1\}" /> },
        { letter: 'B', content: <Katex tex="(-1,\infty)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(-\infty,-1)" /> },
        { letter: 'D', content: <Katex tex="\{-1\}" /> },
        { letter: 'E', content: <Katex tex="[-1,\infty)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
