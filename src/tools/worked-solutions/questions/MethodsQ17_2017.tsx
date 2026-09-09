// 2017 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 21% correct —
// the third-hardest MCQ in the 2017-2018 Methods Exam 2 papers.
// Express the total area under an even function's graph, over 4 x-intercepts, as a single
// integral expression. Question text transcribed from the original paper; the diagram is the
// actual VCAA figure (cropped from the official exam PDF), not a redrawing. Solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import evenFunctionSrc from './meth-2017-mcq17-even-function.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
    <img src={evenFunctionSrc} alt="Graph of an even function f with x-intercepts at a, b, c, d, symmetric about the y-axis, from the original 2017 VCAA exam paper" className="w-full max-w-[340px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 37, C: 21, D: 21, E: 17 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\text{Area} = \int_a^b f(x)\,dx - \int_b^c f(x)\,dx + \int_c^d f(x)\,dx = 2\int_a^b f(x)\,dx - \int_b^c f(x)\,dx" />
      <br />
      <Katex tex="= 2\int_a^b f(x)\,dx - 2\int_b^{b+c} f(x)\,dx" />, as <Katex tex="b+c=0" />, since{' '}
      <Katex tex="f(-x)=f(x)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: <>Since <Katex tex="f" /> is even, its graph is symmetric about the <Katex tex="y" />-axis, so <Katex tex="a=-d" /> and <Katex tex="b=-c" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_a^b f(x)\,dx \;-\; \int_b^c f(x)\,dx \;+\; \int_c^d f(x)\,dx" />,
    reason: <>The middle hump dips <em>below</em> the axis, so that piece must be subtracted to turn it into a positive area; the two outer humps are already positive.</>,
  },
  {
    working: <Katex display tex="\int_c^d f(x)\,dx = \int_a^b f(x)\,dx" />,
    reason: <>By evenness, the piece over <Katex tex="[c,d]" /> is the mirror image of the piece over <Katex tex="[a,b]" /> (since <Katex tex="c=-b,\,d=-a" />), so they're equal.</>,
  },
  {
    working: <Katex display tex="\text{Area} = 2\int_a^b f(x)\,dx - \int_b^c f(x)\,dx" />,
  },
  {
    working: <Katex display tex="\begin{aligned} \int_b^c f(x)\,dx &= 2\int_b^{0} f(x)\,dx \\ &= 2\int_b^{b+c} f(x)\,dx \end{aligned}" />,
    reason: <>Since <Katex tex="b+c=0" /> (the interval <Katex tex="[b,c]" /> is symmetric about the origin) and <Katex tex="f" /> is even, the standard "double the half" trick applies.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2\int_a^b f(x)\,dx - 2\int_b^{b+c} f(x)\,dx}" />,
    reason: <>Matches option <b>D</b> exactly.</>,
  },
]

export default function MethodsQ17_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            The graph of a function <Katex tex="f" />, where <Katex tex="f(-x)=f(x)" />, is shown below.
          </p>
          {DIAGRAM}
          <p className="mt-3">
            The graph has <Katex tex="x" />-intercepts at <Katex tex="(a,0), (b,0), (c,0)" /> and{' '}
            <Katex tex="(d,0)" /> only.
          </p>
          <p className="mt-2">The area bound by the curve and the <Katex tex="x" />-axis on the interval <Katex tex="[a,d]" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_a^d f(x)\,dx" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_a^b f(x)\,dx - \int_c^b f(x)\,dx + \int_c^d f(x)\,dx" /> },
        { letter: 'C', content: <Katex tex="\displaystyle 2\int_a^b f(x)\,dx + \int_b^c f(x)\,dx" /> },
        { letter: 'D', content: <Katex tex="\displaystyle 2\int_a^b f(x)\,dx - 2\int_b^{b+c} f(x)\,dx" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\displaystyle\int_a^b f(x)\,dx + \int_c^b f(x)\,dx + \int_d^c f(x)\,dx" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
