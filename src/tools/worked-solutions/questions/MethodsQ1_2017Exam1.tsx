// 2017 Mathematical Methods — Exam 1, Question 1 (4 marks).
// Quotient rule on x/(x+2), then the chain rule on (2 - x³)³. Question text transcribed
// from the original paper (no diagram given). Answers verified with sympy; they agree with the
// examiner's report and itute (2/(x+2)², −9). Solution is original.
// Widgets: (a) meth-2017e1-q1a-tangent-check — slide a point along f and test a derivative formula
// by whether its line only touches the curve (correct vs the report's "cancelled x + 2" and a
// swapped-numerator version); (b) meth-2017e1-q1b-chain-stretch — a step Δx passed down the chain
// x → u = 2 − x³ → g = u³ on three number lines, showing the ×(−3) reversal and ×3 stretch that
// multiply to −9.
// Wrong methods: (a) cancelling x + 2 (report) → (1 − x)/(x + 2); (b) sign slip on the inner
// derivative (report: "especially with negatives") → +9. Both computed with sympy.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TangentCheckWidget = lazyWidget(() => import('../interactives/meth-2017e1-q1a-tangent-check'))
const ChainStretchWidget = lazyWidget(() => import('../interactives/meth-2017e1-q1b-chain-stretch'))

const EXAM_A: SAExaminerStats = {
  marks: [12, 19, 69],
  average: 1.3,
  comment: (
    <>
      This question was well handled. Students choosing to use the quotient rule tended to
      progress better than those using the product rule. Some very poor algebraic slips were
      made. The most common was &lsquo;cancelling&rsquo; <Katex tex="x+2" /> in the numerator with{' '}
      <Katex tex="x+2" /> in the denominator. Others unnecessarily expanded{' '}
      <Katex tex="(x+2)^2" /> and did so incorrectly.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [14, 21, 66],
  average: 1.1,
  comment: (
    <>
      Students competently applied the chain rule; however, some erred with the derivative of{' '}
      <Katex tex="(2-x^3)^3" />, especially with negatives. Some students opted unnecessarily
      to take the longer route by (often incorrectly) expanding the rule given by{' '}
      <Katex tex="g" />. Others forgot to evaluate <Katex tex="g'(1)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="u=x,\quad v=x+2" />
        <Katex display tex="u'=1,\quad v'=1" />
      </>
    ),
    reason: (
      <>
        <Katex tex="f" /> is one function divided by another, so reach for the quotient rule
        (it&apos;s on the formula sheet). Name the top <Katex tex="u" /> and the bottom{' '}
        <Katex tex="v" />, and write their derivatives down <em>before</em> substituting —
        that keeps the next line mechanical.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = \frac{(x+2)\times 1 - x\times 1}{(x+2)^2}" />,
    reason: (
      <>
        <Katex tex="\dfrac{v\,u'-u\,v'}{v^2}" />: the bottom function <Katex tex="v" /> goes
        first in the numerator. Swapping the order would flip the sign of the whole answer.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{x+2-x}{(x+2)^2}" />,
    reason: (
      <>
        Simplify the numerator first. The <Katex tex="x+2" /> on top is only one <em>term</em>{' '}
        (the other is <Katex tex="-x" />), so it can&apos;t cancel with the denominator — the
        slip the report calls the most common. Leave <Katex tex="(x+2)^2" /> factorised:
        expanding it is extra work and a second chance to slip.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{2}{(x+2)^2}}" />,
    reason: (
      <>
        A check: <Katex tex="f(x)=1-\tfrac{2}{x+2}=1-2(x+2)^{-1}" />, whose derivative is{' '}
        <Katex tex="2(x+2)^{-2}" /> — the same. It is positive everywhere on{' '}
        <Katex tex="(-2,\infty)" />, which fits the graph: a hyperbola that only rises, towards
        the asymptote <Katex tex="y=1" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 3(2-x^3)^2 \times (-3x^2)" />,
    reason: (
      <>
        <Katex tex="g" /> is a bracket cubed, so it&apos;s a chain rule: with{' '}
        <Katex tex="u=2-x^3" />, <Katex tex="g=u^3" /> and{' '}
        <Katex tex="\tfrac{dg}{dx}=\tfrac{dg}{du}\times\tfrac{du}{dx}=3u^2\times(-3x^2)" />. The
        derivative of <Katex tex="2-x^3" /> is <Katex tex="0-3x^2" /> — keep that minus, it is
        where marks were lost. Expanding <Katex tex="(2-x^3)^3" /> first also works, but it is
        the longer route the report warns about.
      </>
    ),
  },
  {
    working: <Katex display tex="= -9x^2(2-x^3)^2" />,
    reason: <>Tidying <Katex tex="3\times(-3)=-9" />.</>,
  },
  {
    working: <Katex display tex="g'(1) = -9(1)^2\bigl(2-1^3\bigr)^2 = -9(1)(1)" />,
    reason: (
      <>
        The question asks for a number, <Katex tex="g'(1)" />, not the rule{' '}
        <Katex tex="g'(x)" />, so substitute <Katex tex="x=1" />. The report notes students who
        differentiated correctly and then stopped here.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{g'(1) = -9}" />,
    reason: (
      <>
        Sense check: near <Katex tex="x=1" /> the inside <Katex tex="2-x^3" /> is decreasing
        (rate <Katex tex="-3" />), and cubing keeps the order (rate{' '}
        <Katex tex="3u^2=3" /> at <Katex tex="u=1" />), so <Katex tex="g" /> decreases, at{' '}
        <Katex tex="3\times 3=9" /> times the rate of <Katex tex="x" />.
      </>
    ),
  },
]

export default function MethodsQ1_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f:(-2,\infty)\to R" />, <Katex tex="f(x)=\dfrac{x}{x+2}" />.
            Differentiate <Katex tex="f" /> with respect to <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Quotient rule or product rule?">
          <p>
            Both work. The quotient rule applies directly; the product rule needs{' '}
            <Katex tex="f(x)=x(x+2)^{-1}" /> and then a chain rule on the second factor, and
            the negative index is where slips creep in. The report says as much — students who
            used the quotient rule fared better.
          </p>
          <p>
            <Katex tex="\dfrac{d}{dx}\!\left(\dfrac{u}{v}\right)=\dfrac{v\,u'-u\,v'}{v^2}" />{' '}
            — note the order in the numerator. Getting it backwards flips the sign of the whole
            answer.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="A correct derivative gives a line that just touches the curve, at every point">
          <TangentCheckWidget />
        </Explore>
        <WrongMethod
          title="Cancel the x + 2 on top with an x + 2 underneath"
          source="Examiner's report"
          working={<Katex display tex="\frac{(x+2)\times 1-x\times 1}{(x+2)^2}\;\to\;\frac{1-x}{x+2}" />}
        >
          Cancelling needs a common <em>factor</em> of the whole numerator and the whole
          denominator. Here <Katex tex="x+2" /> is only one term of the numerator, so nothing
          cancels until the numerator is simplified to <Katex tex="2" />. To catch it, test a
          point: at <Katex tex="x=2" /> this answer gives <Katex tex="-\tfrac14" />, a negative
          slope, yet <Katex tex="f" /> is increasing there (the true slope is{' '}
          <Katex tex="\tfrac18" />). Test more than one point — at <Katex tex="x=0" /> both
          versions happen to give <Katex tex="\tfrac12" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="g(x)=(2-x^3)^3" />. Evaluate <Katex tex="g'(1)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Why the chain rule multiplies">
          <p>
            Write <Katex tex="g" /> as a chain: <Katex tex="x" /> goes into{' '}
            <Katex tex="u=2-x^3" />, and <Katex tex="u" /> goes into <Katex tex="g=u^3" />. Each
            link has its own rate: <Katex tex="\tfrac{du}{dx}" /> says how fast <Katex tex="u" />{' '}
            moves per unit of <Katex tex="x" />, and <Katex tex="\tfrac{dg}{du}" /> how fast{' '}
            <Katex tex="g" /> moves per unit of <Katex tex="u" />. Rates in a chain multiply, the
            way converting km/h to m/s multiplies conversion factors:{' '}
            <Katex tex="\tfrac{dg}{dx}=\tfrac{dg}{du}\times\tfrac{du}{dx}" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the chain rule multiplies, and where the minus sign comes from">
          <ChainStretchWidget />
        </Explore>
        <WrongMethod
          title="The derivative of 2 − x³ is 3x²"
          source="Examiner's report"
          working={<Katex display tex="g'(1)=3(2-1)^2\times 3(1)^2=9" />}
        >
          The <Katex tex="2" /> differentiates to <Katex tex="0" /> and <Katex tex="-x^3" /> to{' '}
          <Katex tex="-3x^2" />; the minus belongs to the <Katex tex="x^3" /> and stays. Catch it
          with the sense check: as <Katex tex="x" /> increases through <Katex tex="1" />, the
          inside <Katex tex="2-x^3" /> gets smaller, so its cube gets smaller too — the answer
          must be negative.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
