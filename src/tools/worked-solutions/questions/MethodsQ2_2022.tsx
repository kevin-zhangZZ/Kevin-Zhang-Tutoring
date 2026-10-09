// 2022 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 78% correct.
// The horizontal asymptote of a translated truncus. Question text transcribed from the
// original paper. Solution is original.
// Oct 2026 Concise/Detailed review: not widget-eligible (78% correct); the
// distractor analysis sits in the final row's `more` (Detailed only).

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
    reason: <>This is the truncus <Katex tex="y=\frac{1}{x^2}" /> translated 3 units left and 4 units up. A horizontal asymptote is a horizontal line, <Katex tex="y=c" />, that the graph approaches as <Katex tex="x\to\pm\infty" />.</>,
    more: <>Asymptotes move with the graph. <Katex tex="y=\frac{1}{x^2}" /> has asymptotes <Katex tex="x=0" /> and <Katex tex="y=0" />. Translating 3 left moves the vertical one to <Katex tex="x=-3" />; translating 4 up moves the horizontal one to <Katex tex="y=4" />. In general, <Katex tex="y=\frac{1}{(x-h)^2}+k" /> has horizontal asymptote <Katex tex="y=k" /> and vertical asymptote <Katex tex="x=h" />. Here <Katex tex="x+3 = x-(-3)" />, so <Katex tex="h=-3" /> and <Katex tex="k=4" />.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{1}{(x+3)^2}\to0 \implies y \to 4" />,
    reason: <>As <Katex tex="x" /> gets very large (positive or negative), <Katex tex="(x+3)^2" /> becomes huge, so the fraction shrinks towards 0 and only the <Katex tex="+4" /> is left.</>,
    more: <>The fraction <Katex tex="\frac{1}{(x+3)^2}" /> is always positive, so <Katex tex="y>4" /> for every <Katex tex="x\neq-3" />: the graph approaches <Katex tex="y=4" /> from above on both sides and never reaches it.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 4}" />,
    reason: <>Matches option <b>A</b>; option E, <Katex tex="x=-3" />, is the <em>vertical</em> asymptote.</>,
    more: <>Any equation of the form <Katex tex="x=\text{constant}" /> is a vertical line, so neither D nor E can be a horizontal asymptote. Option C, <Katex tex="y=0" />, is the horizontal asymptote of <Katex tex="y=\frac{1}{x^2}" /> before the translation 4 up. Option B, <Katex tex="y=3" />, takes the 3 from <Katex tex="(x+3)" />, which only shifts the graph horizontally.</>,
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
