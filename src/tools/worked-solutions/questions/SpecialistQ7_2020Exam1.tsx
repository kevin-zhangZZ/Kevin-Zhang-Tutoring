// 2020 Specialist Mathematics — Exam 1 Question 7 (5 marks). Making a piecewise function
// and its derivative continuous, then integrating the two branches. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [33, 7, 60],
  average: 1.3,
  comment: (
    <>
      This question was answered well. If <Katex tex="f" /> is continuous at{' '}
      <Katex tex="x=1" /> then <Katex tex="m+n=2" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [17, 14, 16, 54],
  average: 2.1,
  comment: (
    <>
      This question involved routine integrals and was answered well. A few students
      recognised that the region enclosed by the graph between <Katex tex="x=0" /> and{' '}
      <Katex tex="x=1" /> was a trapezium and so were able to avoid evaluating one of the
      integrals. Several students incorrectly applied results from the formula sheet — in
      particular, writing{' '}
      <Katex tex="\int\frac{4}{1+x^2}dx=\tfrac14\arctan(x)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{continuity at } x=1: \ \lim_{x\to1^-}f(x) = f(1)" />,
    reason: <>The two branches must agree at the join.</>,
  },
  {
    working: <Katex display tex="m(1)+n = \frac{4}{1+1^2} = 2 \implies m+n = 2" />,
    reason: <>One equation. A second is needed, and it comes from <Katex tex="f'" />.</>,
  },
  {
    working: <Katex display tex="x\ge1: \ \frac{d}{dx}\left(\frac{4}{1+x^2}\right) = \frac{d}{dx}\left(4\left(1+x^2\right)^{-1}\right) = \frac{-8x}{\left(1+x^2\right)^2}" />,
    reason: <>Chain rule on the negative power; the quotient rule gives the same thing with more writing.</>,
  },
  {
    working: <Katex display tex="\text{at } x=1: \ \frac{-8}{2^2} = -2" />,
    reason: <>The gradient the right-hand branch arrives with.</>,
  },
  {
    working: <Katex display tex="x<1: \ f'(x) = m \implies \boxed{m = -2}" />,
    reason: <>The left branch is a straight line, so its gradient is <Katex tex="m" /> everywhere; for <Katex tex="f'" /> to be continuous the two must match.</>,
  },
  {
    working: <Katex display tex="m+n = 2 \implies -2+n = 2 \implies \boxed{n = 4}" />,
    reason: <>Back-substituting. Both shown ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -2x+4 \ \text{ on } [0,1], \quad f(x) = \frac{4}{1+x^2} \ \text{ on } [1,\sqrt3]" />,
    reason: <>With <Katex tex="m" /> and <Katex tex="n" /> now known. Both branches are positive across <Katex tex="[0,\sqrt3]" />, so no absolute values are needed.</>,
  },
  {
    working: <Katex display tex="A = \int_0^1(-2x+4)\,dx+\int_1^{\sqrt3}\frac{4}{1+x^2}\,dx" />,
    reason: <>The join at <Katex tex="x=1" /> forces the split.</>,
  },
  {
    working: <Katex display tex="\int_0^1(-2x+4)\,dx = \left[-x^2+4x\right]_0^1 = 3" />,
    reason: <>Or read it off as a trapezium with parallel sides 4 and 2 and width 1: <Katex tex="\tfrac{4+2}{2}\times1=3" />.</>,
  },
  {
    working: <Katex display tex="\int\frac{4}{1+x^2}\,dx = 4\arctan(x)+c" />,
    reason: <>The constant multiplies the arctan; it does <em>not</em> go inside or become <Katex tex="\tfrac14" />, which is the formula-sheet misreading the report names.</>,
  },
  {
    working: <Katex display tex="4\left[\arctan(x)\right]_1^{\sqrt3} = 4\left(\tfrac\pi3-\tfrac\pi4\right)" />,
    reason: <><Katex tex="\tan\tfrac\pi3=\sqrt3" /> and <Katex tex="\tan\tfrac\pi4=1" /> — exact values worth knowing cold.</>,
  },
  {
    working: <Katex display tex="= 4\cdot\tfrac{\pi}{12} = \tfrac\pi3" />,
    reason: <>Common denominator 12.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 3+\frac\pi3}" />,
    reason: <>About 4.05 square units.</>,
  },
]

export default function SpecialistQ7_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
        <p>Consider the function defined by</p>
        <p className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}mx+n, & x<1\\[4pt] \dfrac{4}{1+x^2}, & x\ge1\end{cases}"
          />
        </p>
        <p>
          where <Katex tex="m" /> and <Katex tex="n" /> are real numbers.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Given that <Katex tex="f(x)" /> and <Katex tex="f'(x)" /> are continuous over{' '}
            <Katex tex="R" />, show that <Katex tex="m=-2" /> and <Katex tex="n=4" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={
          <>
            Find the area enclosed by the graph of the function, the <Katex tex="x" />-axis
            and the lines <Katex tex="x=0" /> and <Katex tex="x=\sqrt3" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
