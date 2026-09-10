// 2025 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 44% correct. This
// year's paper used four options (A–D) rather than five. Finding a point on a transformed
// graph, given a known point on the original. Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 25, B: 44, C: 22, D: 8 },
  answer: 'B',
  comment: (
    <>
      Reflect <Katex tex="(1,3)" /> in the <Katex tex="x" />-axis gives <Katex tex="(1,-3)" />. Dilate by{' '}
      <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis gives <Katex tex="\left(\tfrac12,-3\right)" />.
      Translate 1 unit up and <Katex tex="\tfrac32" /> units right gives <Katex tex="(2,-2)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = 1-g(2x-3) = -g\!\left(2\left(x-\tfrac32\right)\right)+1" />,
    reason: <>Rewrite the rule to expose the individual transformations applied to <Katex tex="g" />.</>,
  },
  {
    working: <>Reading the transformed rule: reflect in the <Katex tex="x" />-axis, dilate by <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis, translate <Katex tex="\tfrac32" /> right, translate <Katex tex="1" /> up.</>,
    reason: 'Track a known point through each transformation, in order.',
  },
  {
    working: <Katex display tex="(1,3) \xrightarrow{\text{reflect in }x\text{-axis}} (1,-3)" />,
    reason: <>Negating <Katex tex="g" /> flips the <Katex tex="y" />-coordinate.</>,
  },
  {
    working: <Katex display tex="(1,-3) \xrightarrow{\text{dilate }\times\frac12\text{ from }y\text{-axis}} \left(\tfrac12,-3\right)" />,
    reason: <>Replacing <Katex tex="x" /> with <Katex tex="2x" /> halves <Katex tex="x" />-coordinates.</>,
  },
  {
    working: <Katex display tex="\left(\tfrac12,-3\right) \xrightarrow{\text{shift }\tfrac32\text{ right, }1\text{ up}} \left(\tfrac12+\tfrac32,\ -3+1\right)" />,
    reason: 'Apply the remaining shift.',
  },
  {
    working: <Katex display tex="\boxed{(2,-2)}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ15_2025() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=g(x)" /> passes through the point <Katex tex="(1,3)" />.
          <br />
          The graph of <Katex tex="y = 1-g(2x-3)" /> must pass through the point
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-1,-2)" /> },
        { letter: 'B', content: <Katex tex="(2,-2)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(-1,2)" /> },
        { letter: 'D', content: <Katex tex="(2,2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
