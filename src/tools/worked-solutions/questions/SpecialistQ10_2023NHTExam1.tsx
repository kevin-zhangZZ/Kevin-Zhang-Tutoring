// 2023 Specialist NHT — Exam 1, Question 10 (4 marks). The NHT report gives sample answers only,
// with no statistics. ∫ from e to e² of log_e(log_e(x))/(x log_e(x)) dx by the substitution
// u = log_e(log_e(x)), whose derivative is the rest of the integrand, giving (1/2)(log_e(2))². The
// report prints two approaches; its "There are two reasonable approaches:" only introduces them, so
// no comment is quoted. Its first approach has a slip: "When x = e, u = log_e(2)" should read u = 0
// (log_e(log_e(e)) = log_e(1) = 0); its integral then correctly runs from 0. Question text
// transcribed from the original paper. Answer checked with sympy (numerical integral ≈ 0.240227 =
// (log_e 2)²/2) and against the report's sample answer. Solution is original; the report's
// two-step route (u = log_e(x), then v = log_e(u)) is in `more`.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}u&=\log_e\!\left(\log_e(x)\right)\\ \frac{du}{dx}&=\frac{1}{\log_e(x)}\times\frac1x\\ &=\frac{1}{x\log_e(x)}\end{aligned}" />,
    reason: <>Look for a function whose derivative is also in the integrand. By the chain rule, the derivative of the inner-log expression is <Katex tex="\tfrac{1}{x\log_e(x)}" />, which is exactly the rest of the integrand.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=e&:\ u=\log_e(1)=0\\ x=e^2&:\ u=\log_e(2)\end{aligned}" />,
    reason: <>Change the terminals to <Katex tex="u" />-values: <Katex tex="\log_e(e)=1" /> and <Katex tex="\log_e\!\left(e^2\right)=2" />, then take the log again.</>,
    more: <>The report&apos;s first approach writes &ldquo;When <Katex tex="x=e" />, <Katex tex="u=\log_e(2)" />&rdquo;; that is a slip for <Katex tex="u=0" />, and its integral does run from 0.</>,
  },
  {
    working: <Katex display tex="\int_e^{e^2}\frac{\log_e\!\left(\log_e(x)\right)}{x\log_e(x)}\,dx=\int_0^{\log_e(2)}u\,du" />,
    reason: <>The numerator becomes <Katex tex="u" /> and <Katex tex="\tfrac{1}{x\log_e(x)}\,dx" /> becomes <Katex tex="du" />.</>,
  },
  {
    working: <Katex display tex="=\left[\frac{u^2}{2}\right]_0^{\log_e(2)}=\frac{\left(\log_e(2)\right)^2}{2}-0" />,
    reason: <>Antidifferentiate, then substitute the new terminals. There is no need to go back to <Katex tex="x" /> because the terminals were changed.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac12\left(\log_e(2)\right)^2}" />,
    reason: <>Sanity check: on <Katex tex="[e,e^2]" /> the integrand rises from 0 to a peak of about 0.06 and is still about 0.05 at the far end (<Katex tex="\tfrac{\log_e(2)}{2e^2}\approx0.047" />); over an interval about 4.7 wide, an area near 0.24 is the right size. (<Katex tex="\tfrac12(0.693)^2\approx0.240" />.)</>,
    more: <>The report&apos;s other route takes two smaller steps. First <Katex tex="u=\log_e(x)" /> turns the integral into <Katex tex="\displaystyle\int_1^2\frac{\log_e(u)}{u}\,du" />; then <Katex tex="v=\log_e(u)" /> turns that into <Katex tex="\displaystyle\int_0^{\log_e(2)}v\,dv" />, the same integral as above.</>,
  },
]

export default function SpecialistQ10_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (4 marks)</p>
        <p>
          Using a suitable substitution, evaluate{' '}
          <Katex tex="\displaystyle\int_e^{e^2}\left(\frac{\log_e\!\left(\log_e(x)\right)}{x\log_e(x)}\right)dx" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Substitution works when the integrand has the shape <Katex tex="f(g(x))\,g'(x)" />: some inner
            function together with its own derivative. Here the nested log is the obvious candidate, and
            differentiating it by the chain rule produces <Katex tex="\tfrac{1}{x\log_e(x)}" />, the other
            factor. In a definite integral, change the terminals as well, so you never have to substitute
            back.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
