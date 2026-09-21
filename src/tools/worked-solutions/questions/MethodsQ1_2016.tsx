// 2016 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 92% correct.
// Recovering the domain of a decreasing linear function from its range. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 92, B: 1, C: 2, D: 4, E: 1 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = 5-x \implies x = 5-y" />,
    reason: <>Rearranging so the domain value can be read off from each range value.</>,
  },
  {
    working: <Katex display tex="y=-4 \implies x = 9; \qquad y=5 \implies x=0" />,
    reason: <>The two endpoints of the range map to the two endpoints of the domain.</>,
  },
  {
    working: <Katex display tex="f \text{ is decreasing}" />,
    reason: <>The gradient is <Katex tex="-1" />, so larger <Katex tex="x" /> gives smaller <Katex tex="y" /> — the endpoints swap over.</>,
  },
  {
    working: <Katex display tex="[-4,5) \text{: } -4 \text{ included}, \ 5 \text{ excluded}" />,
    reason: <>Brackets travel with their endpoint, not with their position. So <Katex tex="x=9" /> is included and <Katex tex="x=0" /> is excluded.</>,
  },
  {
    working: <Katex display tex="\boxed{D = (0,9]}" />,
    reason: <>Option A. Option E has the right numbers but the wrong bracket at each end — the trap for anyone who copies the bracket pattern across without thinking about the reversal.</>,
  },
]

export default function MethodsQ1_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The linear function <Katex tex="f:D\to R" />, <Katex tex="f(x)=5-x" /> has range{' '}
            <Katex tex="[-4,5)" />.
          </p>
          <p>
            The domain <Katex tex="D" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,9]" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="(0,1]" /> },
        { letter: 'C', content: <Katex tex="[5,-4)" /> },
        { letter: 'D', content: <Katex tex="[-9,0)" /> },
        { letter: 'E', content: <Katex tex="[1,9)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
