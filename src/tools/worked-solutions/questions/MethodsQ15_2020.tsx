// 2020 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 32% correct. Average
// value of a piecewise-linear V-shaped function over a given interval. Question text
// transcribed from the original paper; the diagram is cropped directly from the original
// VCAA exam PDF, not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2020-mcq15-piecewise-v.png'

const DIAGRAM = <img src={diagramSrc} alt="Piecewise-linear V-shaped graph of f through (-2a, 2a), (0, -a) and (a, a), from the original 2020 VCAA exam paper" className="w-full max-w-[280px]" />

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
