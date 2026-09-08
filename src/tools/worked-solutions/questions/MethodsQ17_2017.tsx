// 2017 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 21% correct —
// the third-hardest MCQ in the 2017-2018 Methods Exam 2 papers.
// Express the total area under an even function's graph, over 4 x-intercepts, as a single
// integral expression. Question text/diagram transcribed from the original paper; solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

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
    working: (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 w-fit">
        <EvenFunctionGraph />
      </div>
    ),
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
    working: <Katex display tex="\int_b^c f(x)\,dx = 2\int_b^{0} f(x)\,dx = 2\int_b^{b+c} f(x)\,dx" />,
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
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3">
            <EvenFunctionGraph />
          </div>
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

// Schematic even function: a hump above the axis on (a,b), a dip below on (b,c), and a
// mirrored hump above on (c,d) — matching the shape given in the original question.
function EvenFunctionGraph() {
  return (
    <svg viewBox="0 0 400 220" width={340} height={187}>
      <line x1={20} y1={130} x2={380} y2={130} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={200} y1={20} x2={200} y2={200} stroke="#9ca3af" strokeWidth={1.5} />
      <path
        d="M 60 200 C 75 140, 90 60, 120 60 C 145 60, 150 100, 165 130 C 180 155, 185 195, 200 195 C 215 195, 220 155, 235 130 C 250 100, 255 60, 280 60 C 310 60, 325 140, 340 200"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth={2.5}
      />
      <circle cx={98} cy={130} r={4} fill="#111827" className="dark:fill-gray-200" />
      <circle cx={165} cy={130} r={4} fill="#111827" className="dark:fill-gray-200" />
      <circle cx={235} cy={130} r={4} fill="#111827" className="dark:fill-gray-200" />
      <circle cx={302} cy={130} r={4} fill="#111827" className="dark:fill-gray-200" />
      <text x={90} y={150} fontSize={13} className="fill-gray-700 dark:fill-gray-300">a</text>
      <text x={158} y={150} fontSize={13} className="fill-gray-700 dark:fill-gray-300">b</text>
      <text x={228} y={150} fontSize={13} className="fill-gray-700 dark:fill-gray-300">c</text>
      <text x={295} y={150} fontSize={13} className="fill-gray-700 dark:fill-gray-300">d</text>
      <text x={385} y={134} fontSize={13} className="fill-gray-700 dark:fill-gray-300">x</text>
      <text x={205} y={26} fontSize={13} className="fill-gray-700 dark:fill-gray-300">y</text>
    </svg>
  )
}
