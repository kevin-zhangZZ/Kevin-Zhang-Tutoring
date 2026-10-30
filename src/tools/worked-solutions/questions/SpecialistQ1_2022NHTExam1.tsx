// 2022 Specialist NHT — Exam 1, Question 1 (3 marks). The NHT report gives sample answers only,
// with no statistics. Implicit differentiation of x²e^(y−1) + 4ye^x = 9e at the point (1, 2), using
// the product and chain rules. Question text transcribed from the original paper (read from a
// rendered page image). Answer checked with sympy and against the report's sample answer (−2).
// Solution is original: it substitutes the point before rearranging, where the report rearranges
// first; the two are equivalent.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x=1,\ y=2:\quad 1^2e^{1}+4(2)e^{1}=e+8e=9e" />,
    reason: <>A quick check that <Katex tex="(1,2)" /> really is on the curve, so the gradient there makes sense.</>,
    more: <>It also catches a misread exponent early: with <Katex tex="y=2" />, <Katex tex="e^{y-1}=e^1" />, the same <Katex tex="e" /> as <Katex tex="e^x" /> at <Katex tex="x=1" />. That is why every term below ends up as a multiple of <Katex tex="e" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(x^2e^{y-1}\right)=2xe^{y-1}+x^2e^{y-1}\frac{dy}{dx}" />,
    reason: <>The relation can't be rearranged into <Katex tex="y=\ldots" />, so differentiate every term with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" /> (implicit differentiation). This term is a product of <Katex tex="x^2" /> and <Katex tex="e^{y-1}" />, so use the product rule. Differentiating <Katex tex="e^{y-1}" /> with respect to <Katex tex="x" /> needs the chain rule: <Katex tex="e^{y-1}\cdot\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(4ye^{x}\right)=4e^{x}\frac{dy}{dx}+4ye^{x}" />,
    reason: <>Also a product, of <Katex tex="4y" /> and <Katex tex="e^x" />. The <Katex tex="y" /> factor differentiates to <Katex tex="\tfrac{dy}{dx}" />.</>,
    more: <>Every time a <Katex tex="y" /> is differentiated with respect to <Katex tex="x" />, a <Katex tex="\tfrac{dy}{dx}" /> appears. Forgetting it in either term (writing <Katex tex="4e^x" /> instead of <Katex tex="4e^x\tfrac{dy}{dx}" />) is the usual way implicit differentiation goes wrong.</>,
  },
  {
    working: <Katex display tex="2xe^{y-1}+x^2e^{y-1}\frac{dy}{dx}+4e^{x}\frac{dy}{dx}+4ye^{x}=0" />,
    reason: <>The right side, <Katex tex="9e" />, is a constant, so its derivative is <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="2e+e\frac{dy}{dx}+4e\frac{dy}{dx}+8e=0" />,
    reason: <>Substitute <Katex tex="x=1" />, <Katex tex="y=2" /> now, before rearranging: the equation becomes linear in <Katex tex="\tfrac{dy}{dx}" /> with plain-number coefficients.</>,
    more: <>Term by term: <Katex tex="2(1)e^{1}=2e" />, <Katex tex="1^2e^{1}=e" />, <Katex tex="4e^{1}=4e" /> and <Katex tex="4(2)e^{1}=8e" />.</>,
  },
  {
    working: <Katex display tex="5e\frac{dy}{dx}=-10e" />,
    reason: <>Collect the <Katex tex="\tfrac{dy}{dx}" /> terms on one side and the rest on the other.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx}=-2}" />,
    reason: <>Divide by <Katex tex="5e" />: the <Katex tex="e" /> cancels, leaving an integer.</>,
    more: <>The report rearranges first, <Katex tex="\tfrac{dy}{dx}=-\tfrac{2xe^{y-1}+4ye^x}{x^2e^{y-1}+4e^x}" />, then substitutes to get <Katex tex="-\tfrac{2e+8e}{e+4e}=-2" />: the same numbers in a different order. Sign check: on this curve, near <Katex tex="(1,2)" />, both terms on the left grow when <Katex tex="x" /> grows and when <Katex tex="y" /> grows, so as <Katex tex="x" /> increases <Katex tex="y" /> must fall to keep the total at <Katex tex="9e" />: a negative gradient ✓.</>,
  },
]

export default function SpecialistQ1_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
        <p>
          Consider the relation <Katex tex="x^2e^{y-1}+4ye^x=9e" />.
        </p>
        <p>
          Find <Katex tex="\dfrac{dy}{dx}" /> at the point <Katex tex="(1,2)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The relation can't be rearranged into <Katex tex="y=\ldots" />, because <Katex tex="y" />{' '}
            appears both in an exponent and as a multiplier. So differentiate both sides with
            respect to <Katex tex="x" /> as they stand, treating <Katex tex="y" /> as an unknown
            function of <Katex tex="x" />: that is implicit differentiation.
          </p>
          <p>
            Both terms on the left mix an <Katex tex="x" />-part with a <Katex tex="y" />-part, so
            both need the product rule, and every <Katex tex="y" />-part needs the chain rule,
            which is where the <Katex tex="\tfrac{dy}{dx}" /> factors come from.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
