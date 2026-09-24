// 2020 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 62% correct.
// Which integers make a logarithm a positive integer. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 62, C: 12, D: 10, E: 5 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_2(n+1) = x \iff n+1 = 2^x" />,
    reason: <>Undoing the logarithm.</>,
  },
  {
    working: <Katex display tex="n = 2^x-1" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="x \in Z^+ \implies x = 1,2,3,\ldots" />,
    reason: <>The question restricts <Katex tex="x" /> to the <em>positive</em> integers, so write it as <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 2^k-1, \quad k\in Z^+}" />,
    reason: <>Matches option <b>B</b>, giving <Katex tex="n=1,3,7,15,\ldots" />. Options <b>A</b> and <b>C</b> forget the <Katex tex="-1" /> (e.g. <Katex tex="n=2" /> gives <Katex tex="\log_2(3)" />), and options <b>D</b> and <b>E</b> are linear: <Katex tex="n=5" /> from <b>D</b> gives <Katex tex="\log_2(6)" />, which is not an integer.</>,
  },
]

export default function MethodsQ10_2020() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\log_2(n+1)=x" />, the values of <Katex tex="n" /> for which{' '}
          <Katex tex="x" /> is a positive integer are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="n=2^k,\ k\in Z^+" /> },
        { letter: 'B', content: <Katex tex="n=2^k-1,\ k\in Z^+" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="n=2^{k-1},\ k\in Z^+" /> },
        { letter: 'D', content: <Katex tex="n=2k-1,\ k\in Z^+" /> },
        { letter: 'E', content: <Katex tex="n=2k,\ k\in Z^+" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
