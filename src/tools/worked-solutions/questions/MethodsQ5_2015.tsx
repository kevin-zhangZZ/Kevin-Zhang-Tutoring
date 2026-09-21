// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 5. VCAA examination report: 71% correct.
// Picking the graph of the inverse from five options. Question text transcribed from the
// original paper; both figures are crops of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2015-mcq5-graph.png'
import optionsSrc from './meth-2015-mcq5-options.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 5, C: 3, D: 16, E: 71 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f \text{ is decreasing throughout}" />,
    reason: <>The curve runs from upper left to lower right, flattening near the origin but never turning back up.</>,
  },
  {
    working: <Katex display tex="f \text{ decreasing} \implies f^{-1} \text{ decreasing}" />,
    reason: <>Reflecting in <Katex tex="y=x" /> cannot change the direction of travel. That alone eliminates A, B, C and D, all of which rise from left to right.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}}" />,
    reason: <>The only decreasing option.</>,
  },
  {
    working: <Katex display tex="\text{gradient } m \;\longrightarrow\; \tfrac{1}{m}" />,
    reason: <>A confirming check on shape: <Katex tex="f" /> is shallow on the left and steep on the right, so its inverse should be steep on the left and shallow on the right — which is what E shows.</>,
  },
]

export default function MethodsQ5_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Part of the graph of <Katex tex="y=f(x)" /> is shown below.
          </p>
          <p>
            The corresponding part of the graph of the inverse function{' '}
            <Katex tex="y=f^{-1}(x)" /> is best represented by
          </p>
        </>
      }
      diagram={
        <div className="flex flex-col gap-3">
          <img
            src={graphSrc}
            alt="Part of the graph of f: a decreasing curve entering from the upper left, flattening as it passes through the origin, then falling steeply to the lower right — from the original 2015 VCAA exam paper"
            className="w-full max-w-[200px]"
          />
          <img
            src={optionsSrc}
            alt="The five options A to E, each a small sketch on x and y axes, from the original 2015 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      }
      background={
        <p>
          Reflection in <Katex tex="y=x" /> preserves whether a curve is increasing or
          decreasing, and turns a gradient of <Katex tex="m" /> into{' '}
          <Katex tex="\tfrac1m" />. The first fact usually settles a pick-the-inverse
          question on its own.
        </p>
      }
      options={[
        { letter: 'A', content: <>the sketch labelled A above</> },
        { letter: 'B', content: <>the sketch labelled B above</> },
        { letter: 'C', content: <>the sketch labelled C above</> },
        { letter: 'D', content: <>the sketch labelled D above</> },
        { letter: 'E', content: <>the sketch labelled E above</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
