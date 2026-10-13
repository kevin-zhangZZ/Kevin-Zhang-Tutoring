// 2025 Specialist Mathematics — Exam 1 Question 1 (4 marks). Implicit differentiation of a
// mixed exponential relation, then the tangent at a given point. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [10, 3, 27, 12, 48],
  average: 2.9,
  comment: (
    <>
      Students used implicit differentiation to find the tangent to the curve at a given point.
      While the implicit differentiation was often performed successfully, arithmetic errors
      prevented some students from obtaining the correct gradient.
      <br />
      A small number of students who successfully found the value of the gradient at the given
      point neglected to give the equation of the tangent at that point and were not awarded full
      marks.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="xe^{-2y}+y^2e^x = 8e^4" />,
    reason: <>Differentiate both sides with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" />. The point lies on the curve: <Katex tex="4e^{4}+4e^{4}=8e^{4}" /> ✓.</>,
    more: <>This is implicit differentiation, the method to use when making <Katex tex="y" /> the subject is impractical (here it is impossible). Because <Katex tex="y" /> is a function of <Katex tex="x" />, the chain rule attaches a factor <Katex tex="\tfrac{dy}{dx}" /> every time you differentiate an expression in <Katex tex="y" />, e.g. <Katex tex="\tfrac{d}{dx}\left(y^2\right)=2y\tfrac{dy}{dx}" />. Checking the point first takes seconds and confirms you have copied the equation correctly.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(xe^{-2y}\right) = e^{-2y}-2x e^{-2y}\frac{dy}{dx}" />,
    reason: <>Product rule (<Katex tex="u=x" />, <Katex tex="v=e^{-2y}" />), with the chain rule producing <Katex tex="-2\tfrac{dy}{dx}" /> from the exponent.</>,
    more: <>In detail: <Katex tex="u'v=1\cdot e^{-2y}" />, and <Katex tex="v'=e^{-2y}\cdot\tfrac{d}{dx}(-2y)=-2e^{-2y}\tfrac{dy}{dx}" />, so <Katex tex="uv'=-2xe^{-2y}\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(y^2e^x\right) = 2y e^x\frac{dy}{dx}+y^2e^x" />,
    reason: <>Product rule again: <Katex tex="y^2" /> differentiates to <Katex tex="2y\tfrac{dy}{dx}" />, while <Katex tex="e^x" /> differentiates to <Katex tex="e^x" /> with no <Katex tex="\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="e^{-2y}-2xe^{-2y}\frac{dy}{dx}+2ye^x\frac{dy}{dx}+y^2e^x = 0" />,
    reason: <>The right side is a constant, so it differentiates to zero.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{At } (4,-2):\\ &e^{4}-8e^{4}\frac{dy}{dx}-4e^{4}\frac{dy}{dx}+4e^{4} = 0\end{aligned}" />,
    reason: <>Substitute <Katex tex="x=4" />, <Katex tex="y=-2" /> before rearranging: <Katex tex="e^{-2y}=e^{4}" /> and <Katex tex="e^{x}=e^{4}" />, so every term carries the factor <Katex tex="e^{4}" />.</>,
    more: <>The report notes that arithmetic errors prevented some students from obtaining the correct gradient. Three places to slow down: <Katex tex="e^{-2y}" /> at <Katex tex="y=-2" /> is <Katex tex="e^{4}" />, not <Katex tex="e^{-4}" />; the term <Katex tex="2ye^x\tfrac{dy}{dx}" /> becomes <Katex tex="2(-2)e^{4}\tfrac{dy}{dx}=-4e^{4}\tfrac{dy}{dx}" /> (negative); and <Katex tex="y^2e^x" /> becomes <Katex tex="(-2)^2e^{4}=+4e^{4}" /> (positive). Substituting now avoids solving for <Katex tex="\tfrac{dy}{dx}" /> in general, which gives a messy fraction in <Katex tex="x" /> and <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="5e^{4} = 12e^{4}\frac{dy}{dx} \implies \frac{dy}{dx} = \frac{5}{12}" />,
    reason: <>Collect the <Katex tex="\tfrac{dy}{dx}" /> terms on one side; the <Katex tex="e^{4}" /> cancels.</>,
    more: <>The report's Method 1 rearranges first: <Katex tex="\tfrac{dy}{dx}=\dfrac{e^{-2y}+y^2e^x}{2xe^{-2y}-2ye^x}" />, which at <Katex tex="(4,-2)" /> is <Katex tex="\dfrac{e^{4}+4e^{4}}{8e^{4}+4e^{4}}=\dfrac{5}{12}" />. Same answer, more to write.</>,
  },
  {
    working: <Katex display tex="y-(-2) = \tfrac{5}{12}(x-4)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> with <Katex tex="m=\tfrac{5}{12}" /> at <Katex tex="(4,-2)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{5x}{12}-\frac{11}{3}}" />,
    reason: <>Expand and simplify: <Katex tex="y+2=\tfrac{5x}{12}-\tfrac{5}{3}" />, and <Katex tex="-\tfrac{5}{3}-2=-\tfrac{11}{3}" />. The question asks for the <em>equation</em>, not just the gradient.</>,
    more: <>The report notes that students who found the gradient but did not give the equation of the tangent were not awarded full marks. Check: at <Katex tex="x=4" />, <Katex tex="y=\tfrac{5}{3}-\tfrac{11}{3}=-2" /> ✓.</>,
  },
]

export default function SpecialistQ1_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (4 marks)</p>
        <p>
          Consider the curve with equation <Katex tex="xe^{-2y}+y^2e^x=8e^4" />.
          <br />
          Find the equation of the tangent to the curve at the point <Katex tex="(4,-2)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={4} />
      </div>
    </div>
  )
}
