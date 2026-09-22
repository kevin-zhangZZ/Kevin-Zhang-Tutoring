// 2021 Mathematical Methods — Exam 1 Question 1 (3 marks). A chain rule on an exponential,
// then a product rule with a square root evaluated at a point. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      This question was well answered. Most students accurately and confidently applied the
      chain rule and knew how to differentiate the exponential.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 28, 43],
  average: 1.2,
  comment: (
    <>
      Students generally handled this question well, applying the product rule to give the
      derivative. A common error was not differentiating the <Katex tex="2x" /> within{' '}
      <Katex tex="\sqrt{2x+1}" />. The evaluation of the derived function involved evaluating
      square roots and this caused problems for some.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = 2e^{-3x}" />,
    reason: <>The 2 is just a multiplier; the chain rule acts on the exponent.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2\cdot(-3)e^{-3x}" />,
    reason: <><Katex tex="\frac{d}{dx}e^{ax}=ae^{ax}" />, with <Katex tex="a=-3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -6e^{-3x}}" />,
    reason: <>Equivalently <Katex tex="-\dfrac{6}{e^{3x}}" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x\sqrt{2x+1} = x(2x+1)^{1/2}" />,
    reason: 'A product of x and a square root, so the product rule — with a chain rule inside the second factor.',
  },
  {
    working: <Katex display tex="f'(x) = (2x+1)^{1/2}+x\cdot\tfrac12(2x+1)^{-1/2}\cdot 2" />,
    reason: <>The trailing <Katex tex="\times2" /> is the derivative of the inside. Leaving it out is the report's most common error.</>,
  },
  {
    working: <Katex display tex="= \sqrt{2x+1}+\frac{x}{\sqrt{2x+1}}" />,
    reason: <>The <Katex tex="\tfrac12" /> and the 2 cancel.</>,
  },
  {
    working: <Katex display tex="= \frac{(2x+1)+x}{\sqrt{2x+1}} = \frac{3x+1}{\sqrt{2x+1}}" />,
    reason: 'A common denominator makes substitution cleaner, though it is not required.',
  },
  {
    working: <Katex display tex="f'(4) = \frac{13}{\sqrt{9}} = \frac{13}{3}" />,
    reason: <><Katex tex="2(4)+1=9" />, whose square root is exactly 3 — the numbers are chosen to come out neatly.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(4) = \tfrac{13}{3}}" />,
    reason: <>About <Katex tex="4.33" />, but the exact fraction is what is wanted.</>,
  },
]

export default function MethodsQ1_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Differentiate <Katex tex="y=2e^{-3x}" /> with respect to <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Evaluate <Katex tex="f'(4)" />, where <Katex tex="f(x)=x\sqrt{2x+1}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
