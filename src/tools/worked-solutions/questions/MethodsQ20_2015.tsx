// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 20. VCAA examination report: 61% correct.
// Recovering f from f(x − 1). Question text transcribed from the original paper; solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 61, C: 10, D: 12, E: 12 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{let } u = x-1 \implies x = u+1" />,
    reason: <>The rule is given for <Katex tex="f" /> of something other than <Katex tex="x" />, so substitute to make the input a single letter.</>,
  },
  {
    working: <Katex display tex="f(u) = (u+1)^2-2(u+1)+3" />,
    reason: <>Replacing every <Katex tex="x" /> on the right-hand side.</>,
  },
  {
    working: <Katex display tex="= u^2+2u+1-2u-2+3" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="= u^2+2" />,
    reason: <>The linear terms cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x^2+2}" />,
    reason: <>Matches option <b>B</b>. Option E substitutes <Katex tex="x-1" /> a second time — it is <Katex tex="f(x-2)" />, a shift the wrong way. Check: <Katex tex="f(x-1)=(x-1)^2+2=x^2-2x+3" /> ✓. A faster route: complete the square, <Katex tex="x^2-2x+3=(x-1)^2+2" />, so <Katex tex="f(\square)=\square^2+2" /> by inspection.</>,
  },
]

export default function MethodsQ20_2015() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="f(x-1)=x^2-2x+3" />, then <Katex tex="f(x)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x^2-2" /> },
        { letter: 'B', content: <Katex tex="x^2+2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="x^2-2x+2" /> },
        { letter: 'D', content: <Katex tex="x^2-2x+4" /> },
        { letter: 'E', content: <Katex tex="x^2-4x+6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
