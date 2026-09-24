// 2024 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 58% correct.
// Optimising a trapezium: build the area, then maximise the square of it. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import figSrc from './meth-2024-mcq18-trapezium.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 58, C: 12, D: 10 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h = \sqrt{10^2-x^2} = \sqrt{100-x^2}" />,
    reason: <>Pythagoras in one of the right triangles the dashed heights cut off. This is the only unmarked length.</>,
  },
  {
    working: <Katex display tex="A = \frac12\left(x+3x\right)h = 2x\sqrt{100-x^2}, \quad 0<x<10" />,
    reason: <>The parallel sides are <Katex tex="x" /> and <Katex tex="x+x+x=3x" />; the domain comes from needing <Katex tex="100-x^2>0" />.</>,
  },
  {
    working: <Katex display tex="A^2 = 4x^2\left(100-x^2\right) = 400x^2-4x^4" />,
    reason: <>Maximising <Katex tex="A^2" /> is the same as maximising <Katex tex="A" /> (both are positive here) and avoids the quotient from the square root.</>,
  },
  {
    working: <Katex display tex="\frac{d\left(A^2\right)}{dx} = 800x-16x^3 = 16x\left(50-x^2\right) = 0" />,
    reason: <>Factorising rather than expanding keeps the roots visible.</>,
  },
  {
    working: <Katex display tex="x^2 = 50 \implies \boxed{x = 5\sqrt2}" />,
    reason: <>Matches option <b>B</b>; <Katex tex="x=0" /> is rejected. Or go straight at it on CAS with <Cas fn="fMax" /> applied to <Katex tex="2x\sqrt{100-x^2}" />.</>,
  },
  {
    working: <Katex display tex="h = \sqrt{100-50} = 5\sqrt2 = x" />,
    reason: <>A pleasing check — the optimal trapezium is exactly as tall as its short side, and its area is <Katex tex="100" />. Option <b>A</b> (<Katex tex="x=10" />) would flatten the shape to zero height.</>,
  },
]

export default function MethodsQ18_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Find the value of <Katex tex="x" /> which maximises the area of the trapezium below.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={figSrc}
              alt="A trapezium with top side x, slant sides 10, and a base split into three lengths of x by the two dashed perpendicular heights — from the original 2024 VCAA exam paper"
              className="w-full max-w-[340px]"
            />
          </div>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="10" /> },
        { letter: 'B', content: <Katex tex="5\sqrt2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="7" /> },
        { letter: 'D', content: <Katex tex="\sqrt{10}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
