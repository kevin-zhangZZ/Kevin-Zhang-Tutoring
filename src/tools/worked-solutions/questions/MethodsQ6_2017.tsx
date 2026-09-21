// 2017 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 88% correct.
// Picking the graph of the inverse from five options. Question text transcribed from the
// original paper; both figures are crops of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2017-mcq6-graph.png'
import optionsSrc from './meth-2017-mcq6-options.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 3, C: 88, D: 3, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(a,b)\in f \iff (b,a)\in f^{-1}" />,
    reason: <>The inverse swaps the coordinates of every point, which is the same as reflecting the whole graph in the line <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="f \text{ increasing} \implies f^{-1} \text{ increasing}" />,
    reason: <>Reflection in <Katex tex="y=x" /> cannot turn an uphill curve into a downhill one. The graph of <Katex tex="f" /> rises from bottom left to top right, so the answer must too — that eliminates A, B and D at a glance.</>,
  },
  {
    working: <Katex display tex="\text{gradient } m \;\longrightarrow\; \text{gradient } \tfrac{1}{m}" />,
    reason: <>Reflecting swaps run and rise. The near-vertical left-hand piece of <Katex tex="f" /> becomes a near-horizontal piece, and the gentle right-hand piece becomes a steep one.</>,
  },
  {
    working: <Katex display tex="f \text{ steep then gentle} \implies f^{-1} \text{ gentle then steep}" />,
    reason: <>Option E is not increasing and has a break in it, so it is out; of what remains, only C is gentle on the left and steep on the right.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{C}}" />,
    reason: <>A quick confirmation: the curve of <Katex tex="f" /> crosses the axes close to the origin, and C is that same picture with <Katex tex="x" /> and <Katex tex="y" /> interchanged.</>,
  },
]

export default function MethodsQ6_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Part of the graph of the function <Katex tex="f" /> is shown below. The same scale
            has been used on both axes.
          </p>
          <p>
            The corresponding part of the graph of the inverse function{' '}
            <Katex tex="f^{-1}" /> is best represented by
          </p>
        </>
      }
      diagram={
        <div className="flex flex-col gap-3">
          <img
            src={graphSrc}
            alt="Part of the graph of f: an increasing curve, steep and near-vertical just left of the origin, then flattening and rising gently to the right, from the original 2017 VCAA exam paper"
            className="w-full max-w-[200px]"
          />
          <img
            src={optionsSrc}
            alt="The five options A to E, each a small sketch on x and y axes, from the original 2017 VCAA exam paper"
            className="w-full max-w-[620px]"
          />
        </div>
      }
      background={
        <p>
          Two facts settle almost every pick-the-inverse question without any algebra.
          Reflecting in <Katex tex="y=x" /> preserves whether a curve is increasing or
          decreasing, and it turns a gradient of <Katex tex="m" /> into{' '}
          <Katex tex="\tfrac1m" /> — so steep becomes shallow and shallow becomes steep.
        </p>
      }
      options={[
        { letter: 'A', content: <>the sketch labelled A above</> },
        { letter: 'B', content: <>the sketch labelled B above</> },
        { letter: 'C', content: <>the sketch labelled C above</>, isAnswer: true },
        { letter: 'D', content: <>the sketch labelled D above</> },
        { letter: 'E', content: <>the sketch labelled E above</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
