// 2018 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 48% correct.
// Track a single point through the same transformation that maps f onto g.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 11, C: 48, D: 13, E: 10 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="A(3,2)" />, <Katex tex="g(x)=\tfrac12 f(x-1)" />. Dilate by a factor of <Katex tex="\tfrac12" />{' '}
      from the <Katex tex="x" />-axis: <Katex tex="(3,1)" />. Translate 1 unit to the right: <Katex tex="(4,1)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \frac12 f(x-1)" />,
    reason: <>Compare to <Katex tex="f(x)" /> to read off the transformation directly.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f(x-1): \text{translate 1 unit right}" />
        <Katex display tex="\tfrac12 f(\cdot): \text{dilate by factor } \tfrac12 \text{ from the } x\text{-axis}" />
      </>
    ),
    reason: <>Replacing <Katex tex="x" /> with <Katex tex="x-1" /> shifts right; multiplying the whole output by <Katex tex="\tfrac12" /> halves every <Katex tex="y" />-value.</>,
  },
  {
    working: <Katex display tex="A(3,2) \xrightarrow{\text{dilate }\times\frac12} (3,\,1)" />,
    reason: <>Apply the transformation to <Katex tex="A" /> itself, in the same order — the <Katex tex="y" />-coordinate halves first (order doesn't actually matter here, since one acts on <Katex tex="x" /> and the other on <Katex tex="y" />).</>,
  },
  {
    working: <Katex display tex="(3,\,1) \xrightarrow{\text{translate right 1}} (4,\,1)" />,
  },
  {
    working: <Katex display tex="\boxed{P = (4,\,1)}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ4_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The point <Katex tex="A(3,2)" /> lies on the graph of the function <Katex tex="f" />. A
            transformation maps the graph of <Katex tex="f" /> to the graph of <Katex tex="g" />, where{' '}
            <Katex tex="g(x) = \dfrac12 f(x-1)" />. The same transformation maps the point <Katex tex="A" /> to
            the point <Katex tex="P" />.
          </p>
          <p>The coordinates of the point <Katex tex="P" /> are</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(2,\,1)" /> },
        { letter: 'B', content: <Katex tex="(2,\,4)" /> },
        { letter: 'C', content: <Katex tex="(4,\,1)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="(4,\,2)" /> },
        { letter: 'E', content: <Katex tex="(4,\,4)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
