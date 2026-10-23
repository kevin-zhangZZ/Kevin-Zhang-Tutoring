// 2026 Mathematical Methods NHT — Exam 1, Question 1 (4 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// a. the product rule on x³log_e(5x); b. an antiderivative of (x − 2)³ fixed by f(1) = 1.
// Question text transcribed from the original paper (no diagram). Answers checked with sympy and
// against the VCAA report's sample answers (x²(3log_e(5x) + 1); ¼(x − 2)⁴ + ¾, which the report
// also gives expanded as x⁴/4 − 2x³ + 6x² − 8x + 19/4). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: <>This question involved using the product rule for differentiation.</>,
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      This question could be solved by applying the integration rule from the formula sheet, or by expanding the
      expression first and then finding the antiderivative. The resulting antiderivative expression then needed to be
      evaluated using the boundary condition <Katex tex="f(1)=1" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}u=x^3,\ \ u'=3x^2\\ v=\log_e(5x),\ \ v'=\frac{5}{5x}=\frac1x\end{gathered}" />,
    reason: <>
      <Katex tex="y" /> is a product of two functions of <Katex tex="x" />, so use the product rule{' '}
      <Katex tex="\tfrac{dy}{dx}=u'v+uv'" />. The derivative of <Katex tex="\log_e(5x)" /> needs the chain rule: the inside
      derivative 5 over the inside <Katex tex="5x" />.
    </>,
    more: <>
      Or use a log law first: <Katex tex="\log_e(5x)=\log_e(5)+\log_e(x)" />, and <Katex tex="\log_e(5)" /> is a constant, so
      its derivative is 0. Either way <Katex tex="\tfrac{d}{dx}\log_e(5x)=\tfrac1x" />: the 5 has no effect on the gradient.
    </>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=3x^2\log_e(5x)+x^3\cdot\frac1x" />,
    reason: <>Substitute into <Katex tex="u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}\frac{dy}{dx}&=3x^2\log_e(5x)+x^2\\ &=x^2\big(3\log_e(5x)+1\big)\end{aligned}}" />,
    reason: <>
      <Katex tex="x^3\cdot\tfrac1x=x^2" />. The factorised form is the report&apos;s final line; either form is correct.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\int(x-2)^3\,dx=\frac{(x-2)^4}{4}+c" />,
    reason: <>
      The formula sheet&apos;s <Katex tex="\int(ax+b)^n\,dx=\tfrac{(ax+b)^{n+1}}{a(n+1)}+c" /> with <Katex tex="a=1" />,{' '}
      <Katex tex="n=3" />: raise the power by one and divide by the new power.
    </>,
    more: <>
      Check by differentiating back: <Katex tex="\tfrac{d}{dx}\tfrac{(x-2)^4}{4}=\tfrac{4(x-2)^3}{4}\cdot1=(x-2)^3" />. Keep
      the <Katex tex="+c" />: knowing <Katex tex="f'" /> fixes the shape of <Katex tex="f" /> but not its height, and the
      condition <Katex tex="f(1)=1" /> is what fixes the height.
    </>,
  },
  {
    working: <Katex display tex="f(1)=\frac{(1-2)^4}{4}+c=\frac14+c=1 \implies c=\frac34" />,
    reason: <>Substitute the boundary condition <Katex tex="x=1" />, <Katex tex="f(1)=1" />. <Katex tex="(-1)^4=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x)=\frac{(x-2)^4}{4}+\frac34}" />,
    reason: <>
      Check: <Katex tex="f(1)=\tfrac14+\tfrac34=1" />. The report also accepts the expanded form{' '}
      <Katex tex="\tfrac{x^4}{4}-2x^3+6x^2-8x+\tfrac{19}{4}" />.
    </>,
    more: <>
      If you expand <Katex tex="(x-2)^3=x^3-6x^2+12x-8" /> first, the constant you find is <Katex tex="\tfrac{19}{4}" />, not{' '}
      <Katex tex="\tfrac34" />: the expanded antiderivative leaves out the <Katex tex="\tfrac{16}{4}=4" /> hidden inside{' '}
      <Katex tex="\tfrac{(x-2)^4}{4}" />. Both functions are the same.
    </>,
  },
]

export default function MethodsQ1_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="y=x^3\log_e(5x)" />.
            <br />
            Find <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Differentiate log_e(5x) as 5/x"
          working={<Katex display tex="\begin{aligned}\frac{dy}{dx}&=3x^2\log_e(5x)+x^3\cdot\frac5x\\ &=3x^2\log_e(5x)+5x^2\end{aligned}" />}
        >
          The chain rule gives the inside derivative 5 divided by the inside function <Katex tex="5x" />, not by{' '}
          <Katex tex="x" />. The 5s cancel: <Katex tex="\tfrac{5}{5x}=\tfrac1x" />. A quick check is the log law{' '}
          <Katex tex="\log_e(5x)=\log_e(5)+\log_e(x)" />, which shows the 5 only shifts the graph up.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Antiderivative"
        marks={2}
        statement={
          <>
            Let <Katex tex="f'(x)=(x-2)^3" />.
            <br />
            Find <Katex tex="f(x)" />, where <Katex tex="f(1)=1" />.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
