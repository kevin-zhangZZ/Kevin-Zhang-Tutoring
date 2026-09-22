// 2025 Specialist Mathematics — Exam 1 Question 1 (4 marks). Implicit differentiation of a
// mixed exponential relation, then the tangent at a given point. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [10, 3, 27, 12, 48],
  average: 2.9,
  comment: (
    <>
      While the implicit differentiation was often performed successfully, arithmetic errors
      prevented some students from obtaining the correct gradient. A small number of students
      who found the gradient neglected to give the <em>equation</em> of the tangent.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="xe^{-2y}+y^2e^x = 8e^4" />,
    reason: <>Check the point first: at <Katex tex="(4,-2)" />, <Katex tex="4e^{4}+4e^{4}=8e^{4}" /> ✓.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(xe^{-2y}\right) = e^{-2y}-2x e^{-2y}\frac{dy}{dx}" />,
    reason: <>Product rule, with the chain rule producing <Katex tex="-2\tfrac{dy}{dx}" /> from the exponent.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(y^2e^x\right) = 2y e^x\frac{dy}{dx}+y^2e^x" />,
    reason: 'Product rule again; the first term carries dy/dx, the second does not.',
  },
  {
    working: <Katex display tex="e^{-2y}-2xe^{-2y}\frac{dy}{dx}+2ye^x\frac{dy}{dx}+y^2e^x = 0" />,
    reason: <>The right side is a constant, so it differentiates to zero.</>,
  },
  {
    working: <Katex display tex="x=4,\ y=-2: \quad e^{4}-8e^{4}\frac{dy}{dx}-4e^{4}\frac{dy}{dx}+4e^{4} = 0" />,
    reason: <>Substituting before rearranging keeps the algebra light: <Katex tex="e^{-2(-2)}=e^{4}" />, and every term carries the same factor.</>,
  },
  {
    working: <Katex display tex="5e^{4} = 12e^{4}\frac{dy}{dx} \implies \frac{dy}{dx} = \frac{5}{12}" />,
    reason: <>The <Katex tex="e^{4}" /> cancels throughout.</>,
  },
  {
    working: <Katex display tex="y-(-2) = \tfrac{5}{12}(x-4)" />,
    reason: 'Point–gradient form.',
  },
  {
    working: <Katex display tex="\boxed{y = \frac{5x}{12}-\frac{11}{3}}" />,
    reason: <>The <em>equation</em>, not just the gradient — stopping at <Katex tex="\tfrac{5}{12}" /> lost marks.</>,
  },
]

export default function SpecialistQ1_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (4 marks)</p>
        <p>
          Consider the curve with equation <Katex tex="xe^{-2y}+y^2e^x=8e^4" />. Find the
          equation of the tangent to the curve at the point <Katex tex="(4,-2)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Substitute the numbers as early as possible. Solving the differentiated equation
            for <Katex tex="\tfrac{dy}{dx}" /> in general produces a messy expression in{' '}
            <Katex tex="x" /> and <Katex tex="y" />; substituting <Katex tex="(4,-2)" />{' '}
            first turns every exponential into <Katex tex="e^{4}" />, which then cancels
            outright.
          </p>
          <p>
            Note <Katex tex="e^{-2y}" /> with <Katex tex="y=-2" /> is <Katex tex="e^{4}" />,
            not <Katex tex="e^{-4}" /> — the sign slip behind most of the wrong gradients.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
