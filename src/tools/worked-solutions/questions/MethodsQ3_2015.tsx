// 2015 Mathematical Methods — Exam 2, MCQ 3.
// Identify the rule of a quartic from its graph: simple roots at b, d and a repeated (touching)
// root at c. Question text/diagram transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow } from '../QuestionParts'

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = k(x-b)(x-c)^2(x-d)" />,
    reason: (
      <>
        <Katex tex="b" /> and <Katex tex="d" /> are simple roots (the curve crosses the axis there);{' '}
        <Katex tex="c" /> is a turning point sitting ON the axis, so it's a repeated root — it needs a
        squared factor.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{y=-2(x-b)(x-c)^2(x-d)}" />,
    reason: (
      <>
        Matches option <b>C</b> — the only option with roots at exactly <Katex tex="x=b" /> and{' '}
        <Katex tex="x=d" /> (not <Katex tex="-b" />, <Katex tex="-c" />, <Katex tex="-d" />) and a squared
        factor at <Katex tex="c" />.
      </>
    ),
  },
]

export default function MethodsQ3_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">The rule for a function with the graph above could be:</p>
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3">
            <QuarticGraph />
          </div>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=-2(x+b)(x-c)^2(x-d)" /> },
        { letter: 'B', content: <Katex tex="y=2(x+b)(x-c)^2(x-d)" /> },
        { letter: 'C', content: <Katex tex="y=-2(x-b)(x-c)^2(x-d)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="y=2(x-b)(x-c)(x-d)" /> },
        { letter: 'E', content: <Katex tex="y=-2(x-b)(x+c)^2(x+d)" /> },
      ]}
      rows={ROWS}
    />
  )
}

// Schematic quartic: crosses at b (negative), touches (repeated root) at c, crosses at d,
// with a small hump between c and d — matching the shape given in the original question.
function QuarticGraph() {
  return (
    <svg viewBox="0 0 400 260" width={340} height={221}>
      <line x1={20} y1={180} x2={380} y2={180} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={100} y1={20} x2={100} y2={230} stroke="#9ca3af" strokeWidth={1.5} />
      <path
        d="M 20 230 C 35 195, 40 182, 45 178 C 60 130, 75 55, 105 50 C 135 45, 155 110, 182 180 C 200 178, 215 145, 235 140 C 255 136, 280 150, 300 165 C 310 172, 315 176, 320 180 C 335 195, 355 225, 375 258"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth={2.5}
      />
      <circle cx={45} cy={178} r={4} fill="#111827" className="dark:fill-gray-200" />
      <circle cx={182} cy={180} r={4} fill="#111827" className="dark:fill-gray-200" />
      <circle cx={320} cy={180} r={4} fill="#111827" className="dark:fill-gray-200" />
      <text x={38} y={200} fontSize={13} className="fill-gray-700 dark:fill-gray-300">b</text>
      <text x={177} y={200} fontSize={13} className="fill-gray-700 dark:fill-gray-300">c</text>
      <text x={315} y={200} fontSize={13} className="fill-gray-700 dark:fill-gray-300">d</text>
      <text x={108} y={195} fontSize={13} className="fill-gray-700 dark:fill-gray-300">O</text>
      <text x={385} y={184} fontSize={13} className="fill-gray-700 dark:fill-gray-300">x</text>
      <text x={95} y={30} fontSize={13} className="fill-gray-700 dark:fill-gray-300">y</text>
    </svg>
  )
}
