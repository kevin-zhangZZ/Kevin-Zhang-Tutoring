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
    reason: <>The area needs the height. Each dashed height cuts off a right triangle with hypotenuse 10 and base <Katex tex="x" />, so use Pythagoras.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}A &= \tfrac12\left(x+3x\right)h\\ &= 2x\sqrt{100-x^2},\quad 0<x<10\end{aligned}" />,
    reason: <>Trapezium area is half the sum of the parallel sides times the height. The parallel sides are <Katex tex="x" /> and <Katex tex="x+x+x=3x" />; <Katex tex="x<10" /> keeps the height positive.</>,
    more: <>The domain: <Katex tex="x" /> is a length, so <Katex tex="x>0" />, and the base of each right triangle must be shorter than its hypotenuse, 10.</>,
  },
  {
    working: <Katex display tex="A^2 = 4x^2\left(100-x^2\right) = 400x^2-4x^4" />,
    reason: <>Since <Katex tex="A>0" />, the <Katex tex="x" /> that maximises <Katex tex="A^2" /> also maximises <Katex tex="A" />, and <Katex tex="A^2" /> has no square root to differentiate.</>,
    more: <>Differentiating <Katex tex="A" /> directly with the product rule works too: <Katex tex="\tfrac{dA}{dx}=\tfrac{4\left(50-x^2\right)}{\sqrt{100-x^2}}" />, which is zero at the same place. On CAS, <Cas fn="fMax" /> applied to <Katex tex="2x\sqrt{100-x^2}" /> with <Katex tex="0<x<10" /> goes straight to the answer.</>,
  },
  {
    working: <Katex display tex="\frac{d\left(A^2\right)}{dx} = 800x-16x^3 = 16x\left(50-x^2\right) = 0" />,
    reason: <>A maximum is a stationary point, so set the derivative to zero. Factorising shows the roots.</>,
  },
  {
    working: <Katex display tex="x^2 = 50 \implies \boxed{x = 5\sqrt2}" />,
    reason: <>Matches option <b>B</b>; <Katex tex="x=0" /> and <Katex tex="x=-5\sqrt2" /> are outside the domain. <Katex tex="A" /> is 0 at both ends and positive between, so this single stationary point is the maximum.</>,
    more: <>
      At the maximum, <Katex tex="h=\sqrt{100-50}=5\sqrt2" />, the same as the short side, and <Katex tex="A=2\times5\sqrt2\times5\sqrt2=100" />.
      {' '}Option <b>A</b>, <Katex tex="x=10" />, flattens the trapezium to zero height and zero area. Option <b>C</b>, 7, is close to <Katex tex="5\sqrt2\approx7.07" /> (area <Katex tex="\approx99.98" />) but not exact. Option <b>D</b>, <Katex tex="\sqrt{10}" />, gives area 60 and is not a stationary point.
    </>,
  },
]

export default function MethodsQ18_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Find the value of <Katex tex="x" /> which maximises the area of the trapezium below.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
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
