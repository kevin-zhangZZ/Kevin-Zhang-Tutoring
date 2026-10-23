// 2025 Mathematical Methods NHT — Exam 2, MCQ 2. The NHT report gives the answer key only, with
// no statistics. Calculus: antidifferentiating a relation between two derivatives and fixing the
// constant from the initial values. Question text transcribed from the original paper (the 2025
// NHT paper is image-only, so read from the rendered page). Solution is original; the answer B
// agrees with the report's key. Checked: g = f + 2x + 1 satisfies f′ = g′ − 2 and g(0) = 2; options
// C and D give g(0) = 3, and D is f′ = g′ − 2 with the dashes dropped.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x)=f'(x)+2" />,
    reason: <>Rearrange the given relation to make <Katex tex="g'" /> the subject, since every option gives <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="g(x)=f(x)+2x+c" />,
    reason: <>Antidifferentiate both sides: an antiderivative of <Katex tex="f'(x)" /> is <Katex tex="f(x)" />, and of <Katex tex="2" /> is <Katex tex="2x" />. Two functions with the same derivative differ by a constant, so a <Katex tex="+c" /> is needed.</>,
  },
  {
    working: <Katex display tex="g(0)=f(0)+0+c\ \Rightarrow\ 2=1+c\ \Rightarrow\ c=1" />,
    reason: <>Use the given values <Katex tex="f(0)=1" /> and <Katex tex="g(0)=2" /> to find the constant.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x)=f(x)+2x+1}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Check each other option against the conditions. Option <b>D</b>, <Katex tex="g=f+2" />, comes from dropping the dashes from <Katex tex="f'=g'-2" />; it gives <Katex tex="g'=f'" />, not <Katex tex="f'+2" />, and <Katex tex="g(0)=3\ne2" />. Option <b>C</b> makes <Katex tex="g'(x)=0" />, so <Katex tex="f'(x)=-2" /> for every <Katex tex="x" /> — nothing in the question says that — and <Katex tex="g(0)=3" /> anyway. Option <b>A</b> would make <Katex tex="g'(x)=f''(x)" />, which has nothing to do with the given <Katex tex="g'(x)=f'(x)+2" />.</>,
  },
]

export default function MethodsQ2_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Suppose that <Katex tex="f:R\to R" /> and <Katex tex="g:R\to R" /> are functions such
          that <Katex tex="f'(x)=g'(x)-2" />, <Katex tex="f(0)=1" /> and <Katex tex="g(0)=2" />.
          <br />
          Then
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="g(x)=f'(x)+2" /> },
        { letter: 'B', content: <Katex tex="g(x)=f(x)+2x+1" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="g(x)=3" /> },
        { letter: 'D', content: <Katex tex="g(x)=f(x)+2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
