// 2023 Mathematical Methods NHT — Exam 1, Question 2 (2 marks). The NHT report gives sample
// answers only, with no statistics; its one note beyond the bare answer (on the constant of
// integration) is quoted as the examiner comment. Antidifferentiating (3 − x)³ with the formula
// sheet's (ax + b)ⁿ rule, then fixing the constant from f(4) = 5/4. Question text transcribed from
// the original paper. Answer checked with sympy and against the report's two sample answers
// (−¼(3 − x)⁴ + 3/2, and the expanded −¼x⁴ + 3x³ − 27/2 x² + 27x − 75/4, which is the same function).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {
  comment: (
    <>
      While most students correctly included a constant of integration, some did not subsequently calculate the value
      correctly.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\int(3-x)^3\,dx" />,
    reason: <>To recover <Katex tex="f" /> from <Katex tex="f'" />, antidifferentiate.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f(x)&=\frac{1}{(-1)(3+1)}(3-x)^{3+1}+c\\&=-\frac{1}{4}(3-x)^4+c\end{aligned}" />,
    reason: <>The formula sheet&apos;s rule <Katex tex="\int(ax+b)^n\,dx=\tfrac{1}{a(n+1)}(ax+b)^{n+1}+c" /> with <Katex tex="a=-1" />, <Katex tex="b=3" />, <Katex tex="n=3" />. Keep the <Katex tex="+c" />: <Katex tex="f'" /> only fixes <Katex tex="f" /> up to a vertical shift.</>,
    more: <>The <Katex tex="a=-1" /> is easy to drop. Check by differentiating with the chain rule: <Katex tex="\tfrac{d}{dx}\left(-\tfrac14(3-x)^4\right)=-\tfrac14\cdot4(3-x)^3\cdot(-1)=(3-x)^3" /> ✓.</>,
  },
  {
    working: <Katex display tex="f(4)=-\frac{1}{4}(3-4)^4+c=\frac{5}{4}" />,
    reason: <>Use the given point to find <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="-\frac{1}{4}+c=\frac{5}{4}\implies c=\frac{5}{4}+\frac{1}{4}=\frac{6}{4}=\frac{3}{2}" />,
    reason: <><Katex tex="(3-4)^4=(-1)^4=1" />: an even power, so positive. Then add <Katex tex="\tfrac14" /> to both sides.</>,
    more: <>The report notes some students included the constant but did not then calculate its value correctly. The usual slip here is <Katex tex="(-1)^4=-1" />, which gives <Katex tex="c=\tfrac{5}{4}-\tfrac14=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x)=-\frac{1}{4}(3-x)^4+\frac{3}{2}}" />,
    reason: <>Check: <Katex tex="f(4)=-\tfrac14+\tfrac32=\tfrac54" /> ✓.</>,
    more: <>The report also accepts the expanded form <Katex tex="f(x)=-\tfrac14x^4+3x^3-\tfrac{27}{2}x^2+27x-\tfrac{75}{4}" />, from expanding <Katex tex="(3-x)^3" /> before integrating. Its constant, <Katex tex="-\tfrac{75}{4}" />, looks different only because <Katex tex="-\tfrac14(3-x)^4" /> expands to have its own constant term <Katex tex="-\tfrac{81}{4}" />, and <Katex tex="-\tfrac{81}{4}+\tfrac{3}{2}=-\tfrac{75}{4}" />.</>,
  },
]

export default function MethodsQ2_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (2 marks)</p>
        <p>
          Let <Katex tex="f'(x)=(3-x)^3" />.
        </p>
        <p>
          Find <Katex tex="f(x)" /> given that <Katex tex="f(4)=\dfrac{5}{4}" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Knowing the gradient function <Katex tex="f'" /> pins down the <em>shape</em> of <Katex tex="f" /> but not its
            height: every curve <Katex tex="y=f(x)+c" /> has the same gradient at every <Katex tex="x" />. One known point,
            here <Katex tex="\left(4,\tfrac54\right)" />, picks out the one curve that passes through it.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Forget the inside derivative of 3 − x"
          working={<Katex display tex="f(x)=\frac{1}{4}(3-x)^4+c" />}
        >
          Differentiating this back gives <Katex tex="(3-x)^3\cdot(-1)=-(3-x)^3" />, the wrong sign. The inner function{' '}
          <Katex tex="3-x" /> has gradient <Katex tex="-1" />, which is the <Katex tex="a" /> in the formula sheet&apos;s rule.
          Always differentiate your antiderivative to check it.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={2} />
      </div>
    </div>
  )
}
