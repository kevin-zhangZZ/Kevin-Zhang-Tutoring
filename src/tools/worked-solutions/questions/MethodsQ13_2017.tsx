// 2017 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 46% correct.
// Four algebraic identities involving h(x) = 1/(x-1) hold for every x; one doesn't — find it
// by testing each directly.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 14, C: 17, D: 10, E: 46 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \frac{1}{x-1}, \qquad h(x^2) = \frac{1}{x^2-1} = \frac{1}{(x-1)(x+1)}" />,
    reason: <>Write down <Katex tex="h(x^2)" /> too, since every option compares to it — factorising <Katex tex="x^2-1" /> is the key move throughout.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{E: } (h(x))^2 = \frac{1}{(x-1)^2}" />
        <Katex display tex="\text{vs.} \quad h(x^2) = \frac{1}{(x-1)(x+1)}" />
      </>
    ),
    reason: <>These have different denominators — <Katex tex="(x-1)^2 \ne (x-1)(x+1)" /> whenever <Katex tex="x\ne0" />, so <Katex tex="(h(x))^2 \ne h(x^2)" /> in general.</>,
  },
  {
    working: <Katex display tex="\boxed{(h(x))^2 \ne h(x^2) \ \text{— option E fails}}" />,
    reason: <>Matches option <b>E</b> as the statement that is <em>not</em> true.</>,
  },
  {
    working: <Katex display tex="\text{A: } h(x)h(-x) = \frac{1}{x-1}\cdot\frac{1}{-x-1} = \frac{-1}{x^2-1} = -h(x^2) \ \checkmark" />,
    reason: 'Checking the other four confirms they do genuinely hold for every x — the "odd one out" really is unique.',
  },
  {
    working: <Katex display tex="\text{B: } h(x)+h(-x) = \frac{1}{x-1}-\frac{1}{x+1} = \frac{2}{x^2-1} = 2h(x^2) \ \checkmark" />,
  },
  {
    working: <Katex display tex="\text{C: } h(x)-h(0) = \frac{1}{x-1}+1 = \frac{x}{x-1} = x\,h(x) \ \checkmark" />,
  },
  {
    working: <Katex display tex="\text{D: } h(x)-h(-x) = \frac{1}{x-1}+\frac{1}{x+1} = \frac{2x}{x^2-1} = 2x\,h(x^2) \ \checkmark" />,
  },
]

export default function MethodsQ13_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="h:(-1,1)\to\mathbb{R}" />, <Katex tex="h(x) = \dfrac{1}{x-1}" />.
          </p>
          <p>Which one of the following statements about <Katex tex="h" /> is <b>not</b> true?</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="h(x)h(-x) = -h(x^2)" /> },
        { letter: 'B', content: <Katex tex="h(x)+h(-x) = 2h(x^2)" /> },
        { letter: 'C', content: <Katex tex="h(x)-h(0) = xh(x)" /> },
        { letter: 'D', content: <Katex tex="h(x)-h(-x) = 2xh(x^2)" /> },
        { letter: 'E', content: <Katex tex="(h(x))^2 = h(x^2)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
