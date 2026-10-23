// 2026 Specialist NHT — Exam 1, Question 8 (3 marks). The NHT report gives a sample answer only,
// with no statistics, and no notes. f'(x) = 4x³ log_e(2x), f(1/2) = 0: integration by parts with
// u = log_e(2x), dv/dx = 4x³, giving f(x) = x⁴ log_e(2x) − x⁴/4 + 1/64. Question text transcribed from
// the original paper. Answer checked with sympy (differentiating back gives 4x³ log_e(2x)) and
// against the report's sample answer. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\int4x^3\log_e(2x)\,dx" />,
    reason: <>Finding <Katex tex="f" /> from <Katex tex="f'" /> means antidifferentiating. The integrand is a product, and neither factor is the derivative of something inside the other, so substitution won&apos;t work: use integration by parts.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}u&=\log_e(2x), & \frac{du}{dx}&=\frac{1}{x}\\ \frac{dv}{dx}&=4x^3, & v&=x^4\end{aligned}" />,
    reason: <>Choose <Katex tex="u" /> as the log: it gets simpler when differentiated (<Katex tex="\tfrac{d}{dx}\log_e(2x)=\tfrac{2}{2x}=\tfrac1x" />), and we don&apos;t have a simple antiderivative for it. <Katex tex="4x^3" /> is easy to antidifferentiate.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f(x)&=x^4\log_e(2x)-\int x^4\cdot\frac{1}{x}\,dx\\ &=x^4\log_e(2x)-\int x^3\,dx\end{aligned}" />,
    reason: <>Integration by parts: <Katex tex="\displaystyle\int u\frac{dv}{dx}\,dx=uv-\int v\frac{du}{dx}\,dx" />. The <Katex tex="\tfrac1x" /> cancels one power of <Katex tex="x" />, leaving a plain power.</>,
  },
  {
    working: <Katex display tex="f(x)=x^4\log_e(2x)-\frac14x^4+c" />,
    reason: <>Keep the constant of integration: it is fixed by the given value <Katex tex="f\!\left(\tfrac12\right)=0" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac12\right)=\tfrac{1}{16}\log_e(1)-\tfrac14\cdot\tfrac{1}{16}+c=0" />,
    reason: <>At <Katex tex="x=\tfrac12" />, <Katex tex="2x=1" /> and <Katex tex="\log_e(1)=0" />, which is why the question chose this point.</>,
  },
  {
    working: <Katex display tex="-\frac{1}{64}+c=0\implies c=\frac{1}{64}" />,
  },
  {
    working: <Katex display tex="\boxed{f(x)=x^4\log_e(2x)-\frac14x^4+\frac{1}{64}}" />,
    reason: <>Check by differentiating: the product rule gives <Katex tex="4x^3\log_e(2x)+x^4\cdot\tfrac1x-x^3=4x^3\log_e(2x)" /> ✓, and <Katex tex="f\!\left(\tfrac12\right)=0-\tfrac{1}{64}+\tfrac{1}{64}=0" /> ✓.</>,
  },
]

export default function SpecialistQ8_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (3 marks)</p>
        <p>
          Given that <Katex tex="f'(x)=4x^3\log_e(2x)" /> and <Katex tex="f\!\left(\dfrac12\right)=0" />, find{' '}
          <Katex tex="f(x)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Integration by parts comes from the product rule: <Katex tex="\tfrac{d}{dx}(uv)=u\tfrac{dv}{dx}+v\tfrac{du}{dx}" />,
            so <Katex tex="\int u\tfrac{dv}{dx}\,dx=uv-\int v\tfrac{du}{dx}\,dx" />. It trades one integral for another,
            and it helps when the new integral is simpler. With a logarithm in the product, let <Katex tex="u" /> be the
            log: its derivative is a simple power that combines with the other factor.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Choose u = 4x³ and antidifferentiate the log"
          working={<Katex display tex="u=4x^3,\quad \frac{dv}{dx}=\log_e(2x),\quad v=\ ?" />}
        >
          You would need an antiderivative of <Katex tex="\log_e(2x)" /> (which itself takes integration by parts), and the
          new integral would have <Katex tex="x^2" /> times a log in it, no simpler than the start. Let the log be <Katex tex="u" />.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
