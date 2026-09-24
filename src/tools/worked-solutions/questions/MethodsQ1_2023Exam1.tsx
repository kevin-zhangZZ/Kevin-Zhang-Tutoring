// 2023 Mathematical Methods — Exam 1 Question 1 (4 marks). A quotient rule that has to be
// simplified, then a product rule evaluated at an exact value. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [8, 50, 42],
  average: 1.3,
  comment: (
    <>
      This question was well attempted and required students to use either the product rule or
      quotient rule to find the derivative. The question required students to simplify their
      answers. Many students simplified the quadratic component but left the exponential terms
      unsimplified. Some students did not use brackets around terms and subsequently did not
      correctly develop the signs of terms, or collect 'like terms'. For example,{' '}
      <Katex tex="\tfrac{-x^2+x-1}{e^x}" /> was a common incorrect response.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [9, 26, 65],
  average: 1.6,
  comment: (
    <>
      Students generally responded to this question well. The question required students to use
      the product rule to differentiate and then evaluate the derivative at{' '}
      <Katex tex="x=\tfrac\pi4" />. There was no requirement to give the answer in a
      particular form. Some students did not demonstrate an understanding of how to
      differentiate <Katex tex="e^{2x}" /> correctly and produced responses that had a
      combination of <Katex tex="e^{2x}" /> and <Katex tex="e^x" /> terms. Some students
      presented responses indicating that they did not know how to arithmetically engage with
      the surd terms in their answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{x^2-x}{e^x}" />,
    reason: <>A quotient — though rewriting it as (x² − x)e^(−x) and using the product rule works just as well.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{(2x-1)e^x-\left(x^2-x\right)e^x}{\left(e^x\right)^2}" />,
    reason: <>Quotient rule. Keep the bracket around x² − x; dropping it is where the sign errors start.</>,
  },
  {
    working: <Katex display tex="= \frac{e^x\left(2x-1-x^2+x\right)}{e^{2x}}" />,
    reason: <>Factoring <Katex tex="e^x" /> out of the numerator so it can cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-x^2+3x-1}{e^x}}" />,
    reason: <>Collecting <Katex tex="2x+x=3x" />, and <Katex tex="\tfrac{e^x}{e^{2x}}=\tfrac{1}{e^x}" />. Leaving <Katex tex="\tfrac{e^x(\ldots)}{e^{2x}}" /> is not simplified; nor is <Katex tex="\tfrac{-x^2+x-1}{e^x}" />, which the report notes was a common incorrect response. Equivalently <Katex tex="\left(-x^2+3x-1\right)e^{-x}" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \sin(x)e^{2x}" />,
    reason: <>A product of two functions.</>,
  },
  {
    working: <Katex display tex="f'(x) = \cos(x)e^{2x}+\sin(x)\cdot2e^{2x}" />,
    reason: <>Product rule; the chain rule supplies the 2 in <Katex tex="\tfrac{d}{dx}e^{2x}=2e^{2x}" />. It stays <Katex tex="e^{2x}" /> throughout — no <Katex tex="e^x" /> appears anywhere.</>,
  },
  {
    working: <Katex display tex="f'\!\left(\frac\pi4\right) = \cos\!\left(\frac\pi4\right)e^{\frac\pi2}+2\sin\!\left(\frac\pi4\right)e^{\frac\pi2}" />,
    reason: <><Katex tex="2\times\tfrac\pi4=\tfrac\pi2" /> in the exponent.</>,
  },
  {
    working: <Katex display tex="= \frac{\sqrt2}{2}e^{\frac\pi2}+2\cdot\frac{\sqrt2}{2}e^{\frac\pi2}" />,
    reason: <>Both <Katex tex="\cos\!\left(\tfrac\pi4\right)" /> and <Katex tex="\sin\!\left(\tfrac\pi4\right)" /> equal <Katex tex="\tfrac{\sqrt2}{2}" />, which is why the surds collect so easily.</>,
  },
  {
    working: <Katex display tex="\boxed{f'\!\left(\frac\pi4\right) = \frac{3\sqrt2}{2}e^{\frac\pi2}}" />,
    reason: <>One lot plus two lots is three lots. About <Katex tex="10.2" />. Any equivalent exact form was accepted.</>,
  },
]

export default function MethodsQ1_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="y=\dfrac{x^2-x}{e^x}" />.
            <br />
            Find and simplify <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Product Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=\sin(x)e^{2x}" />.
            <br />
            Find <Katex tex="f'\!\left(\dfrac\pi4\right)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
