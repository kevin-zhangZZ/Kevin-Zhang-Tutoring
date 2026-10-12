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
    reason: <>Start from the basic <Katex tex="y=\log_e(x)" /> graph: <Katex tex="x+1" /> shifts it 1 left and the <Katex tex="-3" /> shifts it 3 down.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x+1>0 \implies x>-1 \\ &\text{vertical asymptote } x = -1 \end{aligned}" />,
    reason: <>A log needs a positive input. As <Katex tex="x\to-1^{+}" />, <Katex tex="x+1\to0^{+}" /> and <Katex tex="\log_e(x+1)\to-\infty" />, so the edge of the domain is a vertical asymptote.</>,
    more: <>This is the asymptote <Katex tex="x=0" /> of <Katex tex="\log_e(x)" /> moved 1 to the left. Option <b>B</b>, <Katex tex="x=1" />, is the sign error of solving <Katex tex="x+1=0" /> as <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="x\to\infty \implies \log_e(x+1)\to\infty" />,
    reason: <>A log keeps growing without bound (just slowly), so the graph never levels off: there is no horizontal asymptote.</>,
    more: <>For example, the graph reaches <Katex tex="y=0" /> at <Katex tex="x=e^3-1\approx19.1" />, and any height <Katex tex="h" /> is reached at <Katex tex="x=e^{h+3}-1" />. In fact the graph passes through <Katex tex="(0,-3)" />, since <Katex tex="\log_e(1)=0" />: <Katex tex="y=-3" /> is just a value the graph reaches and rises past, not a level it approaches as <Katex tex="x\to\infty" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -1 \text{ only}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>A fifth of students chose <b>D</b>, adding a horizontal asymptote <Katex tex="y=-3" />. That would be right for an <em>exponential</em> such as <Katex tex="y=e^{x}-3" />, which does level off at <Katex tex="y=-3" />; a log is the inverse of an exponential, so its asymptote is vertical instead, and the <Katex tex="-3" /> only moves the graph down. Option <b>C</b> makes the same mistake and also loses the genuine vertical asymptote.</>,
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
