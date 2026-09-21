// 2017 Specialist Mathematics — Exam 1, Question 6 (3 marks). Differentiate the reciprocal
// of arcsin, then state where the derivative exists. Only 18% scored full marks. Question
// text transcribed from the original paper (no diagram given). Answer checked with sympy
// and against the VCAA examination report. Solution is original. No lettered parts, so this
// uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [33, 30, 19, 18],
  average: 1.2,
  comment: (
    <>
      This question was not answered well. Some students confused the inverse function with
      the reciprocal function. The most common incorrect derivatives were{' '}
      <Katex tex="\tfrac{1}{\sqrt{1-x^2}}" /> and{' '}
      <Katex tex="\log_e(\sin^{-1}x)" />. Common errors for the domain included{' '}
      <Katex tex="R" />, <Katex tex="R\setminus\{-1,0,1\}" />, <Katex tex="[-1,1]" />,{' '}
      <Katex tex="(-1,1)" /> and <Katex tex="[-1,1]\setminus\{0\}" />. Many students did not
      exclude zero.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \bigl(\arcsin(x)\bigr)^{-1}" />,
    reason: <>Rewriting as a power makes the chain rule the obvious tool. This is the <em>reciprocal</em> of arcsin, not the inverse of it — the confusion the report opens with.</>,
  },
  {
    working: <Katex display tex="f'(x) = -\bigl(\arcsin(x)\bigr)^{-2}\times\frac{d}{dx}\arcsin(x)" />,
    reason: <>Chain rule: power down, power reduced by one, times the derivative of the inside.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\arcsin(x) = \frac{1}{\sqrt{1-x^2}}" />,
    reason: <>Straight from the formula sheet.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{-1}{\bigl(\arcsin(x)\bigr)^2\sqrt{1-x^2}}}" />,
    reason: <>Negative everywhere it exists, which fits: <Katex tex="\arcsin" /> is increasing, so its reciprocal decreases wherever it is defined and non-zero.</>,
  },
  {
    working: <Katex display tex="\sqrt{1-x^2}>0 \implies -1<x<1" />,
    reason: <>The surd is in the denominator, so it must be strictly positive: the endpoints <Katex tex="\pm1" /> are out even though <Katex tex="\arcsin" /> itself is defined there.</>,
  },
  {
    working: <Katex display tex="\arcsin(x)\ne0 \implies x\ne0" />,
    reason: <>The other factor in the denominator. <Katex tex="\arcsin(0)=0" />, and that is the condition most students forgot.</>,
  },
  {
    working: <Katex display tex="\boxed{(-1,0)\cup(0,1)}" />,
    reason: <>Both conditions at once. Note this is the domain of <Katex tex="f'" />, which is smaller than the domain of <Katex tex="f" /> itself, <Katex tex="[-1,0)\cup(0,1]" />.</>,
  },
]

export default function SpecialistQ6_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 6 (3 marks)">
        <p>
          Let <Katex tex="f(x)=\dfrac{1}{\arcsin(x)}" />. Find <Katex tex="f'(x)" /> and state
          the largest set of values of <Katex tex="x" /> for which <Katex tex="f'(x)" /> is
          defined.
        </p>
        <p>
          The second half is worth as much as the first, and it needs two separate conditions:
          one from the square root in the denominator of{' '}
          <Katex tex="\tfrac{d}{dx}\arcsin(x)" />, and one from the{' '}
          <Katex tex="\arcsin" /> that is itself in a denominator.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
