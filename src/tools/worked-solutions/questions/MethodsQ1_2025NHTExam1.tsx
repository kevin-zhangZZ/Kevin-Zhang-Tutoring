// 2025 Mathematical Methods NHT — Exam 1, Question 1 (4 marks). The NHT report gives sample
// answers only, with no statistics; its one-line notes on each part are quoted as the examiner
// comments. a. the quotient rule on log_e(x)/x³; b. the chain rule (twice) on sin(πe^{3x}) at
// x = 0. Question text transcribed from the original paper (read from the page images — the 2025
// paper has no text layer). Answers checked with sympy and against the VCAA report's sample answers
// ((1 − 3log_e(x))/x⁴ and −3π). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      This question involved using either the quotient rule or product rule for differentiation. The answer was
      required to be presented in a simplified form.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      This question involved using the chain rule for differentiation and then evaluating the derivative at{' '}
      <Katex tex="x=0" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="u=\log_e(x),\ \ u'=\frac1x \qquad v=x^3,\ \ v'=3x^2" />,
    reason: <>
      <Katex tex="y" /> is one function divided by another, so use the quotient rule{' '}
      <Katex tex="\tfrac{dy}{dx}=\tfrac{u'v-uv'}{v^2}" />. Name the pieces and their derivatives first.
    </>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{\frac1x\cdot x^3-\log_e(x)\cdot 3x^2}{\left(x^3\right)^2}" />,
    reason: <>Substitute into the quotient rule. The order on top matters: <Katex tex="u'v" /> first, then subtract <Katex tex="uv'" />.</>,
  },
  {
    working: <Katex display tex="=\frac{x^2-3x^2\log_e(x)}{x^6}" />,
    reason: <><Katex tex="\tfrac1x\cdot x^3=x^2" /> and <Katex tex="\left(x^3\right)^2=x^6" />.</>,
  },
  {
    working: <Katex display tex="=\frac{x^2\left(1-3\log_e(x)\right)}{x^6}" />,
    reason: <>Both terms on top share a factor of <Katex tex="x^2" />; take it out so it can cancel with the denominator.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx}=\frac{1-3\log_e(x)}{x^4}}" />,
    reason: <>
      <Katex tex="\tfrac{x^2}{x^6}=\tfrac{1}{x^4}" />. The question says &ldquo;simplify&rdquo;, so the common factor must be
      cancelled. VCAA also accepts <Katex tex="x^{-4}\left(1-3\log_e(x)\right)" />.
    </>,
    more: <>
      Sanity check: the derivative is zero when <Katex tex="\log_e(x)=\tfrac13" />, i.e. at <Katex tex="x=e^{1/3}" />. That
      is the familiar maximum of a &ldquo;<Katex tex="\log_e(x)" /> over a power&rdquo; curve: it rises from <Katex tex="0" /> at{' '}
      <Katex tex="x=1" />, peaks, then decays as <Katex tex="x^3" /> overtakes the log.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\sin\!\left(\pi e^{3x}\right)" />,
    reason: <>
      A function inside a function inside a function: <Katex tex="\sin(\,\cdot\,)" /> of <Katex tex="\pi e^{3x}" />, and{' '}
      <Katex tex="e^{(\cdot)}" /> of <Katex tex="3x" />. The chain rule peels them off from the outside in.
    </>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(\pi e^{3x}\right)=3\pi e^{3x}" />,
    reason: <>The inner function. <Katex tex="\tfrac{d}{dx}e^{3x}=3e^{3x}" /> (itself a chain rule: the derivative of <Katex tex="3x" /> is 3), and <Katex tex="\pi" /> is just a constant factor.</>,
  },
  {
    working: <Katex display tex="f'(x)=3\pi e^{3x}\cos\!\left(\pi e^{3x}\right)" />,
    reason: <>Chain rule: the derivative of <Katex tex="\sin(u)" /> is <Katex tex="\cos(u)\cdot\tfrac{du}{dx}" />, with <Katex tex="u=\pi e^{3x}" />. The inside of the cosine is left unchanged.</>,
  },
  {
    working: <Katex display tex="f'(0)=3\pi e^{0}\cos\!\left(\pi e^{0}\right)=3\pi\cos(\pi)" />,
    reason: <>Substitute <Katex tex="x=0" />. <Katex tex="e^0=1" />, so both <Katex tex="e^{3x}" /> factors become 1.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(0)=-3\pi}" />,
    reason: <><Katex tex="\cos(\pi)=-1" />. An exact answer, as the instructions require.</>,
    more: <>
      Sanity check on the sign: as <Katex tex="x" /> increases through 0, <Katex tex="\pi e^{3x}" /> increases through{' '}
      <Katex tex="\pi" />, and <Katex tex="\sin" /> is decreasing at <Katex tex="\pi" /> (it is about to go negative). So{' '}
      <Katex tex="f" /> is decreasing at <Katex tex="x=0" />, and a negative derivative is right.
    </>,
  },
]

export default function MethodsQ1_2025NHTExam1() {
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
            Let <Katex tex="y=\dfrac{\log_e(x)}{x^3}" />.
            <br />
            Find and simplify <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            The product rule works just as well: write <Katex tex="y=\log_e(x)\cdot x^{-3}" />, so{' '}
            <Katex tex="\tfrac{dy}{dx}=\tfrac1x\cdot x^{-3}+\log_e(x)\cdot\left(-3x^{-4}\right)=\tfrac{1}{x^4}-\tfrac{3\log_e(x)}{x^4}" />,
            the same answer. Use whichever you are less likely to slip on; the quotient rule&rsquo;s minus sign and its{' '}
            <Katex tex="v^2" /> are where most errors happen.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Swap the order on top of the quotient rule"
          working={<Katex display tex="\frac{3x^2\log_e(x)-\frac1x\cdot x^3}{x^6}=\frac{3\log_e(x)-1}{x^4}" />}
        >
          This is the right answer multiplied by <Katex tex="-1" />. The quotient rule is <Katex tex="u'v-uv'" />, derivative of
          the <b>top</b> first. A quick check: just above <Katex tex="x=1" /> the curve rises from 0 (<Katex tex="\log_e(x)" /> becomes
          positive), so <Katex tex="\tfrac{dy}{dx}" /> must be positive at <Katex tex="x=1" />: the correct form gives{' '}
          <Katex tex="1" />, the swapped form <Katex tex="-1" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=\sin\!\left(\pi e^{3x}\right)" />.
            <br />
            Evaluate <Katex tex="f'(0)" />.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Forget the inner derivative"
          working={<Katex display tex="\begin{aligned} f'(x)&=\cos\!\left(\pi e^{3x}\right) \\ \implies f'(0)&=\cos(\pi)=-1 \end{aligned}" />}
        >
          Differentiating only the outer sine leaves out the factor <Katex tex="3\pi e^{3x}" /> from the inside. Every layer of a
          composite contributes a factor to the derivative, so a function three layers deep gives a product of three
          pieces (here <Katex tex="\cos" />, <Katex tex="\pi e^{3x}" /> and 3).
        </WrongMethod>
      </PartCard>
    </div>
  )
}
