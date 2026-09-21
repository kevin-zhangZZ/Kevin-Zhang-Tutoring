// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 1. VCAA examination report: 89% correct.
// Two transformations applied to a point, in order. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 89, B: 1, C: 1, D: 1, E: 7 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(4,-3)" />,
    reason: <>Apply the transformations in the stated order — the wording "and then" matters.</>,
  },
  {
    working: <Katex display tex="\text{up }4:\quad (4,-3) \to (4,\,-3+4) = (4,1)" />,
    reason: <>A vertical translation changes only the <Katex tex="y" />-coordinate.</>,
  },
  {
    working: <Katex display tex="\text{reflect in } y\text{-axis}:\quad (4,1) \to (-4,1)" />,
    reason: <>Reflection in the <Katex tex="y" />-axis negates the <Katex tex="x" />-coordinate and leaves <Katex tex="y" /> alone.</>,
  },
  {
    working: <Katex display tex="\boxed{(-4,1)}" />,
    reason: <>Option A. Option E, <Katex tex="(-4,-1)" />, reflects in the <Katex tex="x" />-axis as well; option B negates <Katex tex="y" /> before translating.</>,
  },
]

export default function MethodsQ1_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The point <Katex tex="P(4,-3)" /> lies on the graph of a function <Katex tex="f" />
            . The graph of <Katex tex="f" /> is translated four units vertically up and then
            reflected in the <Katex tex="y" />-axis.
          </p>
          <p>The coordinates of the final image of <Katex tex="P" /> are</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-4,1)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="(-4,3)" /> },
        { letter: 'C', content: <Katex tex="(0,-3)" /> },
        { letter: 'D', content: <Katex tex="(4,-6)" /> },
        { letter: 'E', content: <Katex tex="(-4,-1)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
