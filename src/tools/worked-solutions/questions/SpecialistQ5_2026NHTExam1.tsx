// 2026 Specialist NHT — Exam 1, Question 5 (4 marks). The NHT report gives a sample answer only,
// with no statistics, and no notes. ∫₀³ (x² + 2x)/√(x + 1) dx by the substitution u = x + 1, using
// x² + 2x = (x + 1)² − 1 = u² − 1, giving 52/5. Question text transcribed from the original paper.
// Answer checked with sympy and against the report's sample answer (52/5). Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}u=x+1\implies\frac{du}{dx}=1\\ x^2+2x=(x+1)^2-1=u^2-1\end{gathered}" />,
    reason: <>The awkward part is the square root of <Katex tex="x+1" />, so let <Katex tex="u" /> be what&apos;s inside it. The numerator must also be written in terms of <Katex tex="u" />: completing the square, <Katex tex="x^2+2x=(x+1)^2-1" />.</>,
    more: <>Alternatively <Katex tex="x=u-1" />, so <Katex tex="x^2+2x=(u-1)^2+2(u-1)=u^2-2u+1+2u-2=u^2-1" />. Same result, just more algebra.</>,
  },
  {
    working: <Katex display tex="x=0:\ u=1;\qquad x=3:\ u=4" />,
    reason: <>Change the terminals to <Katex tex="u" />-values, so there&apos;s no need to substitute back at the end.</>,
  },
  {
    working: <Katex display tex="\int_0^3\frac{x^2+2x}{\sqrt{x+1}}\,dx=\int_1^4\frac{u^2-1}{\sqrt u}\,du" />,
    reason: <>Since <Katex tex="\tfrac{du}{dx}=1" />, <Katex tex="dx" /> simply becomes <Katex tex="du" />.</>,
  },
  {
    working: <Katex display tex="=\int_1^4\left(u^{\frac32}-u^{-\frac12}\right)du" />,
    reason: <>Split the fraction and use index laws: <Katex tex="\tfrac{u^2}{u^{1/2}}=u^{\frac32}" /> and <Katex tex="\tfrac{1}{u^{1/2}}=u^{-\frac12}" />. Now each term is a power of <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="=\left[\tfrac25u^{\frac52}-2u^{\frac12}\right]_1^4" />,
    reason: <>Power rule for antiderivatives: add one to the power and divide by the new power.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&=\left(\tfrac25\times32-2\times2\right)-\left(\tfrac25-2\right)\\ &=\tfrac{64}{5}-4-\tfrac25+2=\tfrac{62}{5}-2\end{aligned}" />,
    reason: <>At <Katex tex="u=4" />: <Katex tex="4^{\frac52}=\left(\sqrt4\right)^5=32" /> and <Katex tex="4^{\frac12}=2" />. At <Katex tex="u=1" /> every power of 1 is 1.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{52}{5}}" />,
    reason: <>Sanity check: the integrand rises from 0 at <Katex tex="x=0" /> to <Katex tex="\tfrac{15}{2}=7.5" /> at <Katex tex="x=3" />, curving upwards, so the area should be a little under half of <Katex tex="3\times7.5=22.5" />. <Katex tex="\tfrac{52}{5}=10.4" /> ✓.</>,
  },
]

export default function SpecialistQ5_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          Evaluate <Katex tex="\displaystyle\int_0^3\frac{x^2+2x}{\sqrt{x+1}}\,dx" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A linear substitution, <Katex tex="u=x+1" />, is the standard move when a root (or a power) of a linear
            expression sits in the denominator. Unlike the <Katex tex="f(g(x))g'(x)" /> pattern, nothing needs to cancel:
            the substitution just turns every piece of the integrand into powers of <Katex tex="u" />, which the power
            rule can then handle. The one extra job is rewriting the numerator in terms of <Katex tex="u" /> too.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Substitute but keep the old terminals"
          working={<Katex display tex="\left[\tfrac25u^{\frac52}-2u^{\frac12}\right]_0^3" />}
        >
          The terminals 0 and 3 are <Katex tex="x" />-values. Once the integral is written in <Katex tex="u" />, the terminals must be
          the matching <Katex tex="u" />-values, 1 and 4. (Or substitute <Katex tex="u=x+1" /> back before using 0 and 3.)
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
