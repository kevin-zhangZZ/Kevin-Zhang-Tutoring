// 2022 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 78% correct.
// The horizontal asymptote of a translated truncus. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 78, B: 2, C: 2, D: 0, E: 18 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{1}{(x+3)^2}+4" />,
    reason: <>This is the truncus <Katex tex="y=\frac{1}{x^2}" /> translated 3 units left and 4 units up. A horizontal asymptote is the line <Katex tex="y=c" /> that the graph approaches as <Katex tex="x\to\pm\infty" />.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{1}{(x+3)^2}\to0 \implies y \to 4" />,
    reason: <>As <Katex tex="x" /> gets very large (positive or negative), <Katex tex="(x+3)^2" /> becomes huge, so the fraction shrinks towards 0 and only the <Katex tex="+4" /> is left.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 4}" />,
    reason: <>Matches option <b>A</b>. Option E, <Katex tex="x=-3" />, is where the denominator is zero: the <em>vertical</em> asymptote, a correct feature but not what was asked. Option C, <Katex tex="y=0" />, is the horizontal asymptote of <Katex tex="y=\frac{1}{x^2}" /> before the translation 4 up. Option B, <Katex tex="y=3" />, takes the 3 from <Katex tex="(x+3)" />, which only shifts the graph horizontally.</>,
  },
]

export default function MethodsQ2_2022() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\dfrac{1}{(x+3)^2}+4" /> has a horizontal asymptote
          with the equation
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=4" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="y=3" /> },
        { letter: 'C', content: <Katex tex="y=0" /> },
        { letter: 'D', content: <Katex tex="x=-2" /> },
        { letter: 'E', content: <Katex tex="x=-3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
