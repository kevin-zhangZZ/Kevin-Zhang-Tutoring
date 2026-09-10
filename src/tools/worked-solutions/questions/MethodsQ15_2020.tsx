// 2020 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 32% correct. Average
// value of a piecewise-linear V-shaped function over a given interval. Question text and
// diagram transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const DIAGRAM = (
  <svg viewBox="0 0 260 200" className="w-full max-w-[280px]">
    <line x1="15" y1="150" x2="245" y2="150" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" />
    <line x1="90" y1="185" x2="90" y2="15" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" />
    <line x1="35" y1="40" x2="90" y2="165" stroke="currentColor" strokeWidth="2" className="text-sky-600 dark:text-sky-400" />
    <line x1="90" y1="165" x2="170" y2="70" stroke="currentColor" strokeWidth="2" className="text-sky-600 dark:text-sky-400" />
    <circle cx="35" cy="40" r="3" className="fill-sky-600 dark:fill-sky-400" />
    <circle cx="90" cy="165" r="3" className="fill-sky-600 dark:fill-sky-400" />
    <circle cx="170" cy="70" r="3" className="fill-sky-600 dark:fill-sky-400" />
    <text x="8" y="35" fontSize="11" className="fill-gray-600 dark:fill-gray-300">(−2a, 2a)</text>
    <text x="176" y="72" fontSize="11" className="fill-gray-600 dark:fill-gray-300">(a, a)</text>
    <text x="70" y="182" fontSize="11" className="fill-gray-600 dark:fill-gray-300">(0, −a)</text>
    <text x="150" y="60" fontSize="11" className="fill-gray-500 dark:fill-gray-400">f</text>
    <text x="235" y="145" fontSize="11" className="fill-gray-500 dark:fill-gray-400">x</text>
    <text x="80" y="12" fontSize="11" className="fill-gray-500 dark:fill-gray-400">y</text>
  </svg>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 32, C: 28, D: 27, E: 8 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <Katex tex="\text{Average value} = \frac{1}{3a}\left(\int_{-2a}^0\!\left(-\tfrac32x-a\right)dx + \int_0^a(2x-a)\,dx\right) = \frac{a}{3}" />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Left segment } (-2a,2a)\to(0,-a):\ \text{gradient} = \frac{-a-2a}{0-(-2a)} = -\tfrac32" />,
    reason: 'Find the gradient of each linear piece.',
  },
  {
    working: <Katex display tex="y = -\tfrac32x - a,\quad x\in[-2a,0]" />,
    reason: 'Point-gradient form through (0, −a).',
  },
  {
    working: <Katex display tex="\text{Right segment } (0,-a)\to(a,a):\ \text{gradient} = \frac{a-(-a)}{a-0} = 2" />,
    reason: 'Gradient of the second piece.',
  },
  {
    working: <Katex display tex="y = 2x-a,\quad x\in[0,a]" />,
    reason: 'Point-gradient form through (0, −a) again.',
  },
  {
    working: <Katex display tex="\int_{-2a}^0\left(-\tfrac32x-a\right)dx = \Big[-\tfrac34x^2-ax\Big]_{-2a}^0 = 0-(-3a^2+2a^2) = a^2" />,
    reason: 'Integrate the left piece.',
  },
  {
    working: <Katex display tex="\int_0^a(2x-a)\,dx = \Big[x^2-ax\Big]_0^a = (a^2-a^2)-0 = 0" />,
    reason: 'Integrate the right piece.',
  },
  {
    working: <Katex display tex="\text{Average} = \frac{1}{a-(-2a)}\big(a^2+0\big) = \frac{a^2}{3a}" />,
    reason: <>Divide the total integral by the width of the interval, <Katex tex="a-(-2a)=3a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{a}{3}}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ15_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Part of the graph of a function <Katex tex="f" />, where <Katex tex="a>0" />, is shown below.
          </p>
          <div className="mb-3">{DIAGRAM}</div>
          <p>
            The average value of the function <Katex tex="f" /> over the interval <Katex tex="[-2a,a]" /> is
          </p>
        </>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac{a}{3}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac{a}{2}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{3a}{4}" /> },
        { letter: 'E', content: <Katex tex="a" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
