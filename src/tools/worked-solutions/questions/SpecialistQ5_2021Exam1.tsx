// 2021 Specialist Mathematics — Exam 1 Question 5 (3 marks). Implicit differentiation of
// an equation with two exponentials, evaluated at a point. Question text transcribed from
// the original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original. Reviewed Oct 2026 (clarity/completeness pass; no widget, 53% full marks); Concise/Detailed
// rebalance 12 Oct 2026 (extras moved to `more`).

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    reason: <>We can't make <Katex tex="y" /> the subject, so differentiate both sides with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" /> (implicit differentiation).</>,
    more: <>Quick check that the point is on the curve: at <Katex tex="(2,1)" /> the left side is <Katex tex="e^2e^{2}+e^{4}=2e^4" />, which matches the right side ✓.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(e^xe^{2y}\right) = e^xe^{2y}+2e^xe^{2y}\frac{dy}{dx}" />,
    reason: <>Product rule with <Katex tex="u=e^x" />, <Katex tex="v=e^{2y}" />. As <Katex tex="y" /> depends on <Katex tex="x" />, the chain rule gives <Katex tex="\tfrac{dv}{dx}=2e^{2y}\tfrac{dy}{dx}" />.</>,
    more: <>Alternatively, combine first: <Katex tex="e^xe^{2y}=e^{x+2y}" />, whose derivative is <Katex tex="e^{x+2y}\left(1+2\tfrac{dy}{dx}\right)" /> — the same thing.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(e^{4y^2}\right) = 8ye^{4y^2}\frac{dy}{dx}" />,
    reason: <>Chain rule: <Katex tex="e^{4y^2}" /> differentiates to itself times the derivative of its power, and <Katex tex="\tfrac{d}{dx}\left(4y^2\right)=8y\tfrac{dy}{dx}" /> (chain rule again).</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(2e^4\right) = 0" />,
    reason: <><Katex tex="2e^4" /> is a constant (a number, with no <Katex tex="x" /> in it), so its derivative is zero.</>,
    more: <>The report lists not differentiating this constant term to zero as a common error — <Katex tex="e^4" /> looks like an exponential function, but it is just a number (about 54.6).</>,
  },
  {
    working: <Katex display tex="e^xe^{2y}+2e^xe^{2y}\frac{dy}{dx}+8ye^{4y^2}\frac{dy}{dx} = 0" />,
    reason: <>Put the pieces together: the derivative of the left side equals the derivative of the right side.</>,
  },
  {
    working: <Katex display tex="\text{at } (2,1): \ e^4+2e^4\frac{dy}{dx}+8e^4\frac{dy}{dx} = 0" />,
    reason: <>Only the gradient at this point is wanted, so substitute <Katex tex="x=2" />, <Katex tex="y=1" /> now: <Katex tex="e^xe^{2y}=e^2e^{2}=e^4" />, <Katex tex="e^{4y^2}=e^{4}" />, <Katex tex="8y=8" />.</>,
    more: <>The report notes incorrect substitution as the other common error. Take care with <Katex tex="e^{4y^2}" />: only <Katex tex="y" /> is squared, so at <Katex tex="y=1" /> it is <Katex tex="e^{4\times1^2}=e^4" />, not <Katex tex="e^{(4\times1)^2}=e^{16}" />.</>,
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
            Here <Katex tex="y" /> can't be written as <Katex tex="y=\dots" />, but the equation
            still ties each <Katex tex="x" /> to a <Katex tex="y" />, so <Katex tex="y" /> is a
            function of <Katex tex="x" />. That is what <em>implicit differentiation</em> uses:
            by the chain rule, anything in <Katex tex="y" /> differentiates as usual and then
            picks up a factor of <Katex tex="\tfrac{dy}{dx}" />, e.g.{' '}
            <Katex tex="\tfrac{d}{dx}\left(y^2\right)=2y\tfrac{dy}{dx}" />.
          </p>
          <p>
            Only a number is asked for, so there is no need for a general formula for{' '}
            <Katex tex="\tfrac{dy}{dx}" />: at <Katex tex="(2,1)" /> every exponential becomes{' '}
            <Katex tex="e^4" />, and these cancel.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={3} />
      </div>
    </div>
  )
}
