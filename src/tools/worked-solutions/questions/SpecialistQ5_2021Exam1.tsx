// 2021 Specialist Mathematics — Exam 1 Question 5 (3 marks). Implicit differentiation of
// an equation with two exponentials, evaluated at a point. Question text transcribed from
// the original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [14, 11, 21, 53],
  average: 2.2,
  comment: (
    <>
      This question was answered well, with the majority of students performing implicit
      differentiation correctly. Common errors involved not differentiating the constant term
      to give zero and substituting <Katex tex="x=2" />, <Katex tex="y=1" /> incorrectly.
      <br />
      Students are reminded that if an expression for <Katex tex="\tfrac{dy}{dx}" /> in terms
      of <Katex tex="x" /> and <Katex tex="y" /> is not required, then it may be advantageous
      to substitute the values for <Katex tex="x" /> and <Katex tex="y" /> immediately
      following differentiation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="e^xe^{2y}+e^{4y^2} = 2e^4" />,
    reason: <>Check the point first: at <Katex tex="(2,1)" /> the left side is <Katex tex="e^2e^2+e^4=2e^4" /> ✓, so the point really is on the curve.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(e^xe^{2y}\right) = e^xe^{2y}+e^xe^{2y}\cdot2\frac{dy}{dx}" />,
    reason: <>A product of a function of <Katex tex="x" /> and a function of <Katex tex="y" />, so the product rule with an implicit chain rule on the second factor.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(e^{4y^2}\right) = e^{4y^2}\cdot8y\frac{dy}{dx}" />,
    reason: <>Chain rule twice: the derivative of <Katex tex="4y^2" /> with respect to <Katex tex="x" /> is <Katex tex="8y\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(2e^4\right) = 0" />,
    reason: <><Katex tex="2e^4" /> is a constant — the report notes not differentiating it to zero as a common error.</>,
  },
  {
    working: <Katex display tex="\text{at } (2,1): \ e^4+2e^4\frac{dy}{dx}+8e^4\frac{dy}{dx} = 0" />,
    reason: <>Substituting now rather than rearranging first: every term carries <Katex tex="e^4" />, which is the point of the numbers chosen.</>,
  },
  {
    working: <Katex display tex="1+10\frac{dy}{dx} = 0" />,
    reason: <>Dividing through by <Katex tex="e^4\ne0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{1}{10}}" />,
    reason: <>The gradient at that point.</>,
  },
]

export default function SpecialistQ5_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (3 marks)</p>
        <p>
          Find the gradient of the curve with equation{' '}
          <Katex tex="e^xe^{2y}+e^{4y^2}=2e^4" /> at the point <Katex tex="(2,1)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The question asks for a <em>number</em>, not a formula, so there is no need to
            rearrange for <Katex tex="\tfrac{dy}{dx}" /> in general. Differentiate, then
            substitute <Katex tex="x=2" /> and <Katex tex="y=1" /> immediately — the
            exponentials all collapse to <Katex tex="e^4" /> and cancel.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
