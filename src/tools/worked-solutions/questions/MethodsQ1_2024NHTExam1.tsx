// 2024 Mathematical Methods NHT — Exam 1, Question 1 (4 marks). The NHT report gives sample
// answers only, with no statistics; its one-line notes on each part are quoted as the parts'
// examiner comments. Product and chain rules on x·e^(x²+1), then the quotient rule on
// x³/log_e(x) evaluated at x = e. Question text transcribed from the original paper. Answers
// checked with sympy and against the VCAA report's sample answers ((2x² + 1)e^(x²+1) and 2e²).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      This question involved using the product and chain rules for differentiation. The answer was required to be
      presented in a factorised form.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      This question involved using either the quotient or product rule for differentiation. Some students did not
      evaluate the derivative at <Katex tex="x=e" />
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="u = x,\quad v = e^{x^2+1}" />,
    reason: <><Katex tex="y" /> is a product of two functions of <Katex tex="x" />, so use the product rule <Katex tex="\tfrac{dy}{dx}=u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="u' = 1,\quad v' = 2x\,e^{x^2+1}" />,
    reason: <><Katex tex="v" /> is <Katex tex="e" /> to a function of <Katex tex="x" />, so the chain rule gives <Katex tex="e^{x^2+1}" /> times the derivative of the power, <Katex tex="2x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{dy}{dx} &= 1\cdot e^{x^2+1} + x\cdot 2x\,e^{x^2+1}\\ &= e^{x^2+1}+2x^2e^{x^2+1}\end{aligned}" />,
    reason: <>Substitute into <Katex tex="u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \left(2x^2+1\right)e^{x^2+1}}" />,
    reason: <>Take out the common factor <Katex tex="e^{x^2+1}" />. The question says <b>factorise</b>, so leaving the answer as a sum would not finish the question.</>,
    more: <>VCAA also accepts <Katex tex="2\left(x^2+\tfrac12\right)e^{x^2+1}" />. Check: at <Katex tex="x=0" /> the curve passes through the origin with gradient <Katex tex="(0+1)e^1=e" />, which matches <Katex tex="y\approx x\cdot e" /> for small <Katex tex="x" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="u = x^3,\ u' = 3x^2;\qquad v = \log_e(x),\ v' = \frac1x" />,
    reason: <><Katex tex="f" /> is a quotient, so use <Katex tex="\left(\tfrac uv\right)'=\tfrac{u'v-uv'}{v^2}" /> (on the formula sheet).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f'(x) &= \frac{3x^2\log_e(x) - x^3\cdot\frac1x}{\left(\log_e(x)\right)^2}\\ &= \frac{x^2\left(3\log_e(x)-1\right)}{\left(\log_e(x)\right)^2}\end{aligned}" />,
    reason: <><Katex tex="x^3\cdot\tfrac1x=x^2" />, then take out the common factor <Katex tex="x^2" /> in the numerator.</>,
    more: <>The product rule on <Katex tex="x^3\left(\log_e(x)\right)^{-1}" /> gives the equivalent form <Katex tex="\tfrac{3x^2}{\log_e(x)}-\tfrac{x^2}{\left(\log_e(x)\right)^2}" />, which VCAA also shows. The order of the numerator matters: <Katex tex="u'v-uv'" />, not <Katex tex="uv'-u'v" />, or the sign flips.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f'(e) &= \frac{e^2\left(3\log_e(e)-1\right)}{\left(\log_e(e)\right)^2}\\ &= \frac{e^2(3-1)}{1^2}\end{aligned}" />,
    reason: <>The question asks for the value at <Katex tex="x=e" />, so substitute. The key fact is <Katex tex="\log_e(e)=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(e) = 2e^2}" />,
    reason: <>The report notes some students did not evaluate the derivative at <Katex tex="x=e" />: a general <Katex tex="f'(x)" /> is only part of the answer.</>,
    more: <>Sanity check on the sign: for <Katex tex="x>e^{1/3}" />, <Katex tex="3\log_e(x)>1" />, so <Katex tex="f" /> is increasing there and <Katex tex="f'(e)" /> should be positive. It is, about <Katex tex="14.8" />.</>,
  },
]

export default function MethodsQ1_2024NHTExam1() {
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
            Let <Katex tex="y=xe^{x^2+1}" />.
            <br />
            Find and factorise <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            Two rules work together here. The <b>product rule</b> handles <Katex tex="x" /> times something; the{' '}
            <b>chain rule</b> handles <Katex tex="e" /> raised to a function: <Katex tex="\tfrac{d}{dx}e^{g(x)}=g'(x)e^{g(x)}" />.
            Exponential terms never vanish, so after differentiating a product with one in it, there is always an
            exponential factor to take out.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Forget the chain rule on the exponential"
          working={<Katex display tex="\frac{dy}{dx} = e^{x^2+1}+x\,e^{x^2+1} = (x+1)e^{x^2+1}" />}
        >
          The derivative of <Katex tex="e^{x^2+1}" /> is not itself: the power is <Katex tex="x^2+1" />, not{' '}
          <Katex tex="x" />, so it picks up a factor <Katex tex="2x" />. Only <Katex tex="e^x" /> differentiates to itself.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=\dfrac{x^3}{\log_e(x)}" />.
            <br />
            Evaluate <Katex tex="f'(x)" /> at <Katex tex="x=e" />.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
