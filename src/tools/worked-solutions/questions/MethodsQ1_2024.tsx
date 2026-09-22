// 2024 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 74% correct.
// A log graph has a vertical asymptote and no horizontal one. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 74, B: 2, C: 3, D: 20 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \log_e(x+1)-3" />,
    reason: <>The basic <Katex tex="\log_e(x)" /> translated 1 left and 3 down.</>,
  },
  {
    working: <Katex display tex="x+1>0 \implies x>-1 \implies \text{vertical asymptote } x = -1" />,
    reason: <>The log is undefined at the edge of its domain and plunges to <Katex tex="-\infty" /> there.</>,
  },
  {
    working: <Katex display tex="x\to\infty \implies \log_e(x+1)\to\infty" />,
    reason: 'Slowly, but without bound — so the graph never levels off.',
  },
  {
    working: <Katex display tex="\boxed{x = -1 \text{ only}}" />,
    reason: <>Option <b>A</b>. A fifth of students chose <b>D</b>, adding a horizontal asymptote <Katex tex="y=-3" />; that would be right for an <em>exponential</em>, but a log has none. The <Katex tex="-3" /> only moves the graph down.</>,
  },
]

export default function MethodsQ1_2024() {
  return (
    <MCQShell
      question={
        <p>
          The asymptote(s) of the graph of <Katex tex="y=\log_e(x+1)-3" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=-1 \text{ only}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="x=1 \text{ only}" /> },
        { letter: 'C', content: <Katex tex="y=-3 \text{ only}" /> },
        { letter: 'D', content: <Katex tex="x=-1 \text{ and } y=-3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
