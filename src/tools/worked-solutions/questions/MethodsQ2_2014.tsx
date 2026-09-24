// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 2. VCAA examination report: 80% correct.
// Recovering the domain of a decreasing linear function from its range. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 2, C: 5, D: 80, E: 2 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 4-x \implies x = 4-y" />,
    reason: <>Make <Katex tex="x" /> the subject so the range can be pushed back through to the domain.</>,
  },
  {
    working: <Katex display tex="\text{gradient} = -1 < 0" />,
    reason: <>The function is <em>decreasing</em>, so the largest <Katex tex="y" /> comes from the smallest <Katex tex="x" /> — the endpoints swap over, brackets and all.</>,
  },
  {
    working: <Katex display tex="y = -2 \implies x = 6, \qquad y = 6 \implies x = -2" />,
    reason: <>Substituting the two range endpoints.</>,
  },
  {
    working: <Katex display tex="y \in [-2,6) \implies x \in (-2,6]" />,
    reason: <>The <em>closed</em> end at <Katex tex="y=-2" /> becomes the closed end at <Katex tex="x=6" />, and the open end at <Katex tex="y=6" /> becomes the open end at <Katex tex="x=-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{D = (-2,6]}" />,
    reason: <>Matches option <b>D</b>. Option A keeps the bracket types where they were, which is the trap for a decreasing function.</>,
  },
]

export default function MethodsQ2_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The linear function <Katex tex="f:D\to R" />, <Katex tex="f(x)=4-x" /> has range{' '}
            <Katex tex="[-2,6)" />.
          </p>
          <p>The domain <Katex tex="D" /> of the function is</p>
        </>
      }
      background={
        <p>
          A decreasing function reverses order: the endpoint that was included at the bottom
          of the range is included at the <em>top</em> of the domain. Getting the square and
          round brackets the right way round is the whole question.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-2,6)" /> },
        { letter: 'B', content: <Katex tex="(-2,2]" /> },
        { letter: 'C', content: <Katex tex="R" /> },
        { letter: 'D', content: <Katex tex="(-2,6]" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="[-6,2]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
