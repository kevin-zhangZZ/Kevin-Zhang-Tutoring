// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 5. VCAA examination report: 71% correct.
// Picking the graph of the inverse from five options. Question text transcribed from the
// original paper; the graph of f and each of the five option graphs are cropped from the original
// VCAA exam PDF. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2015-mcq5-graph.png'
import optASrc from './meth-2015-mcq5-optA.png'
import optBSrc from './meth-2015-mcq5-optB.png'
import optCSrc from './meth-2015-mcq5-optC.png'
import optDSrc from './meth-2015-mcq5-optD.png'
import optESrc from './meth-2015-mcq5-optE.png'

function OptionGraph({ src, letter }: { src: string; letter: string }) {
  return <img src={src} alt={`Option ${letter}: a small sketch on x and y axes, from the original 2015 VCAA exam paper`} className="w-full max-w-[180px]" />
}

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 5, C: 3, D: 16, E: 71 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f \text{ is decreasing throughout}" />,
    reason: <>The graph runs from upper left to lower right and never turns back up.</>,
  },
  {
    working: <Katex display tex="f \text{ decreasing} \implies f^{-1} \text{ decreasing}" />,
    reason: <>Reflecting in <Katex tex="y=x" /> cannot change the direction of travel. That alone rules out A, B and D, which rise from left to right, and C, which is not even one-to-one.</>,
  },
  {
    working: <Katex display tex="\text{gradient } m \;\longrightarrow\; \tfrac{1}{m}" />,
    reason: <>A check on shape: <Katex tex="f" />'s straight right-hand piece (in the fourth quadrant) reflects to a straight piece in the second quadrant, and its curved left-hand piece, which meets the origin almost vertically, reflects to a curve that leaves the origin almost horizontally, in the fourth quadrant — exactly what E shows.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}}" />,
    reason: <>Matches option <b>E</b>, the only decreasing option. Option D (16%) is the reflection in the <Katex tex="x" />-axis rather than in <Katex tex="y=x" />.</>,
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
        <img
          src={graphSrc}
          alt="Part of the graph of f: a decreasing curve from the upper left that steepens to meet the origin, then a straight line falling to the lower right — from the original 2015 VCAA exam paper"
          className="w-full max-w-[200px]"
        />
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
        { letter: 'A', content: <OptionGraph src={optASrc} letter="A" /> },
        { letter: 'B', content: <OptionGraph src={optBSrc} letter="B" /> },
        { letter: 'C', content: <OptionGraph src={optCSrc} letter="C" /> },
        { letter: 'D', content: <OptionGraph src={optDSrc} letter="D" /> },
        { letter: 'E', content: <OptionGraph src={optESrc} letter="E" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
