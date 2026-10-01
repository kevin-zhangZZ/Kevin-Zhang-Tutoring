// 2021 Specialist Mathematics — Exam 1 Question 5 (3 marks). Implicit differentiation of
// an equation with two exponentials, evaluated at a point. Question text transcribed from
// the original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original. Reviewed Oct 2026 (clarity/completeness pass; no widget, 53% full marks).

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
    reason: <>Start from the equation. Quick check that the point is on the curve: at <Katex tex="(2,1)" /> the left side is <Katex tex="e^2e^{2}+e^{4}=2e^4" /> ✓.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(e^xe^{2y}\right) = e^xe^{2y}+2e^xe^{2y}\frac{dy}{dx}" />,
    reason: <>Product rule with <Katex tex="u=e^x" /> and <Katex tex="v=e^{2y}" />. Because <Katex tex="y" /> depends on <Katex tex="x" />, the chain rule gives <Katex tex="\tfrac{dv}{dx}=e^{2y}\cdot2\tfrac{dy}{dx}" />. (Or combine first: <Katex tex="e^xe^{2y}=e^{x+2y}" />, whose derivative is <Katex tex="e^{x+2y}\left(1+2\tfrac{dy}{dx}\right)" /> — the same thing.)</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(e^{4y^2}\right) = 8ye^{4y^2}\frac{dy}{dx}" />,
    reason: <>Chain rule: <Katex tex="e^{4y^2}" /> differentiates to itself times the derivative of its power. The derivative of <Katex tex="4y^2" /> with respect to <Katex tex="x" /> is <Katex tex="8y\tfrac{dy}{dx}" /> (chain rule again, since <Katex tex="y" /> depends on <Katex tex="x" />).</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(2e^4\right) = 0" />,
    reason: <><Katex tex="2e^4" /> is a constant — the report notes not differentiating it to zero as a common error.</>,
  },
  {
    working: <Katex display tex="e^xe^{2y}+2e^xe^{2y}\frac{dy}{dx}+8ye^{4y^2}\frac{dy}{dx} = 0" />,
    reason: <>Put the pieces together: the derivative of the left side equals the derivative of the right side.</>,
  },
  {
    working: <Katex display tex="\text{at } (2,1): \ e^4+2e^4\frac{dy}{dx}+8e^4\frac{dy}{dx} = 0" />,
    reason: <>Substitute <Katex tex="x=2" />, <Katex tex="y=1" /> straight away, since only the gradient at this point is wanted: <Katex tex="e^xe^{2y}=e^2e^{2}=e^4" />, <Katex tex="e^{4y^2}=e^{4}" /> and <Katex tex="8y=8" />.</>,
  },
  {
    working: <Katex display tex="1+10\frac{dy}{dx} = 0" />,
    reason: <>Collect the <Katex tex="\tfrac{dy}{dx}" /> terms (<Katex tex="2e^4+8e^4=10e^4" />), then divide through by <Katex tex="e^4" />, which is never zero.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{1}{10}}" />,
    reason: <>The gradient of the curve at <Katex tex="(2,1)" />.</>,
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
            The equation mixes <Katex tex="x" /> and <Katex tex="y" /> and can't be rearranged
            into <Katex tex="y=\dots" />, so use <em>implicit differentiation</em>:
            differentiate every term on both sides with respect to <Katex tex="x" />, treating{' '}
            <Katex tex="y" /> as a function of <Katex tex="x" />. By the chain rule, anything
            in <Katex tex="y" /> differentiates as usual and then picks up a factor of{' '}
            <Katex tex="\tfrac{dy}{dx}" />, e.g.{' '}
            <Katex tex="\tfrac{d}{dx}\left(e^{2y}\right)=2e^{2y}\tfrac{dy}{dx}" />.
          </p>
          <p>
            The question asks for a <em>number</em>, not a formula, so there is no need to
            rearrange for <Katex tex="\tfrac{dy}{dx}" /> in general. Differentiate, then
            substitute <Katex tex="x=2" /> and <Katex tex="y=1" /> immediately — the
            exponentials all become <Katex tex="e^4" /> and cancel.
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
