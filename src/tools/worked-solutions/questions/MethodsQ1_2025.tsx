// 2025 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 91% correct.
// Matching a range to a cosine: read the centre and the amplitude. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 5, C: 91, D: 2 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="f:R\to R,\ f(x)=9-3\cos(6x)" />
      <br />
      The range is <Katex tex="[-3+9,\ 3+9]=[6,\ 12]" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = k+A\cos(nx) \implies \text{range } [k-|A|,\ k+|A|]" />,
    reason: <>The inner coefficient <Katex tex="n" /> changes the period only, so it can be ignored entirely here.</>,
  },
  {
    working: <Katex display tex="[6,12] \implies \text{centre } \tfrac{6+12}{2} = 9, \quad \text{amplitude } \tfrac{12-6}{2} = 3" />,
    reason: <>Half the sum and half the difference of the endpoints.</>,
  },
  {
    working: <Katex display tex="\text{A: } 6\pm3 = [3,9]; \quad \text{B: } 6\pm6 = [0,12]" />,
    reason: <>Both are centred at 6, which is the wrong height.</>,
  },
  {
    working: <Katex display tex="\text{C: } 9\pm3 = [6,12] \ \checkmark; \quad \text{D: } 9\pm6 = [3,15]" />,
    reason: <>Both are centred correctly, but only <b>C</b> has amplitude 3.</>,
  },
  {
    working: <Katex display tex="\boxed{f:R\to R,\ f(x)=9-3\cos(6x)}" />,
    reason: <>Matches option <b>C</b>. The minus sign in front of the cosine makes no difference to the range — it only decides whether the curve starts at the bottom or the top.</>,
  },
]

export default function MethodsQ1_2025() {
  return (
    <MCQShell
      question={<p>A function that has a range of <Katex tex="[6,12]" /> is</p>}
      options={[
        { letter: 'A', content: <Katex tex="f:R\to R,\ f(x)=6+3\cos(9x)" /> },
        { letter: 'B', content: <Katex tex="f:R\to R,\ f(x)=6+6\cos(3x)" /> },
        { letter: 'C', content: <Katex tex="f:R\to R,\ f(x)=9-3\cos(6x)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="f:R\to R,\ f(x)=9-6\cos(3x)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
