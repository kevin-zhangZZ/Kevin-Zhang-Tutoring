// 2025 Mathematical Methods NHT — Exam 1, Question 8 (6 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// f(x) = x/(2√(x + k)): a.i. show d/dx(x√(x + 6)) = √(x + 6) + x/(2√(x + 6)) by the product rule;
// a.ii. hence ∫₀⁶ f(x) dx by integration by recognition; b. the general ∫₀ᵏ f(x) dx in the form
// ((a − √a)/b)k√k. Question text transcribed from the original paper (read from the page images —
// the 2025 paper has no text layer). Answers checked with sympy and against the VCAA report's
// sample answers (4√3(√2 − 1); ((2 − √2)/3)k√k, so a = 2, b = 3). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_AI: SAExaminerStats = {
  comment: (
    <>
      This question was a &lsquo;show that&rsquo; question. As such, each line of working needed to demonstrate a clear,
      logical and explicit progression, leading to the answer. In particular, the product rule needed to be clearly
      demonstrated.
    </>
  ),
}

const REPORT_AII: SAExaminerStats = {
  comment: (
    <>
      The most common approach to evaluating the definite integral was to use the &lsquo;hence&rsquo; option and set up the
      integration by recognition of the result in Question 8a.i.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: <>This question was a general version of the integral in Question 8a.ii.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &u=x,\quad \frac{du}{dx}=1 \\ &v=\sqrt{x+6}=(x+6)^{\frac12} \\ &\frac{dv}{dx}=\frac12(x+6)^{-\frac12}=\frac{1}{2\sqrt{x+6}} \end{aligned}" />,
    reason: <>
      <Katex tex="x\sqrt{x+6}" /> is a product, so use the product rule. Write the square root as a power to differentiate it
      (power rule, with the chain rule giving a factor of 1 from <Katex tex="x+6" />).
    </>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{d}{dx}\left(x\sqrt{x+6}\right)&=\frac{du}{dx}\,v+u\,\frac{dv}{dx} \\ &=1\cdot\sqrt{x+6}+x\cdot\frac{1}{2\sqrt{x+6}} \end{aligned}" />,
    reason: <>The product rule, <Katex tex="(uv)'=u'v+uv'" />, written out with every factor visible. In a &ldquo;show that&rdquo; this line is the one that earns the mark.</>,
  },
  {
    working: <Katex display tex="=\sqrt{x+6}+\frac{x}{2\sqrt{x+6}}" />,
    reason: <>Tidy each term. As required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\left(x\sqrt{x+6}\right)=\sqrt{x+6}+f(x)" />,
    reason: <>With <Katex tex="k=6" />, <Katex tex="f(x)=\tfrac{x}{2\sqrt{x+6}}" />, which is exactly the second term of the result from part a.i.</>,
  },
  {
    working: <Katex display tex="f(x)=\frac{d}{dx}\left(x\sqrt{x+6}\right)-\sqrt{x+6}" />,
    reason: <>Rearrange to make <Katex tex="f(x)" /> the subject. Now each piece on the right is easy to integrate.</>,
  },
  {
    working: <Katex display tex="\int_0^6 f(x)\,dx=\left[x\sqrt{x+6}-\frac23(x+6)^{\frac32}\right]_0^6" />,
    reason: <>
      Integration by recognition: integrating a derivative gives back the original function, so{' '}
      <Katex tex="\int\tfrac{d}{dx}\left(x\sqrt{x+6}\right)dx=x\sqrt{x+6}" />. And{' '}
      <Katex tex="\int(x+6)^{\frac12}dx=\tfrac{(x+6)^{3/2}}{3/2}=\tfrac23(x+6)^{\frac32}" />.
    </>,
  },
  {
    working: <Katex display tex="=\left(6\sqrt{12}-\frac23(12)^{\frac32}\right)-\left(0-\frac23(6)^{\frac32}\right)" />,
    reason: <>Upper terminal minus lower terminal. At <Katex tex="x=0" /> the first term vanishes but the second does not: <Katex tex="(0+6)^{3/2}\ne0" />.</>,
  },
  {
    working: <Katex display tex="=12\sqrt3-\frac23\cdot12\cdot2\sqrt3+\frac23\cdot6\sqrt6" />,
    reason: <>
      Simplify the surds: <Katex tex="\sqrt{12}=2\sqrt3" />, so <Katex tex="6\sqrt{12}=12\sqrt3" />;{' '}
      <Katex tex="12^{3/2}=12\sqrt{12}=12\cdot2\sqrt3" />; and <Katex tex="6^{3/2}=6\sqrt6" />.
    </>,
  },
  {
    working: <Katex display tex="=12\sqrt3-16\sqrt3+4\sqrt6=4\sqrt6-4\sqrt3" />,
  },
  {
    working: <Katex display tex="\boxed{\int_0^6 f(x)\,dx=4\sqrt6-4\sqrt3}" />,
    reason: <>
      VCAA writes this as <Katex tex="4\sqrt3\left(\sqrt2-1\right)" />, the same number (<Katex tex="\sqrt6=\sqrt2\sqrt3" />).
      Positive, as it should be: <Katex tex="f(x)\ge0" /> on <Katex tex="[0,6]" />.
    </>,
    more: <>
      Size check: <Katex tex="4\sqrt6-4\sqrt3\approx9.80-6.93=2.87" />. The integrand grows from <Katex tex="f(0)=0" /> to{' '}
      <Katex tex="f(6)=\tfrac{6}{2\sqrt{12}}\approx0.87" />, roughly linearly, so the area is roughly a triangle,{' '}
      <Katex tex="\tfrac12\times6\times0.87\approx2.6" />, and a little more, since <Katex tex="f" /> is concave down and bulges above that straight line. ✓
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \frac{d}{dx}\left(x\sqrt{x+k}\right)&=\sqrt{x+k}+\frac{x}{2\sqrt{x+k}} \\ &=\sqrt{x+k}+f(x) \end{aligned}" />,
    reason: <>The same product rule as part a.i, with <Katex tex="k" /> in place of 6.</>,
  },
  {
    working: <Katex display tex="\int_0^k f(x)\,dx=\left[x\sqrt{x+k}-\frac23(x+k)^{\frac32}\right]_0^k" />,
    reason: <>Rearrange for <Katex tex="f(x)" /> and integrate by recognition, exactly as in part a.ii.</>,
  },
  {
    working: <Katex display tex="=\left(k\sqrt{2k}-\frac23(2k)^{\frac32}\right)-\left(0-\frac23k^{\frac32}\right)" />,
    reason: <>Substitute the terminals: at <Katex tex="x=k" />, <Katex tex="x+k=2k" />; at <Katex tex="x=0" />, <Katex tex="x+k=k" />.</>,
  },
  {
    working: <Katex display tex="=\sqrt2\,k\sqrt k-\frac23\cdot2\sqrt2\,k\sqrt k+\frac23\,k\sqrt k" />,
    reason: <>
      Pull out the <Katex tex="k\sqrt k" /> that the answer asks for: <Katex tex="\sqrt{2k}=\sqrt2\sqrt k" />,{' '}
      <Katex tex="(2k)^{3/2}=2\sqrt2\,k\sqrt k" /> and <Katex tex="k^{3/2}=k\sqrt k" />.
    </>,
  },
  {
    working: <Katex display tex="=k\sqrt k\left(\frac{3\sqrt2}{3}-\frac{4\sqrt2}{3}+\frac23\right)=\frac{2-\sqrt2}{3}\,k\sqrt k" />,
    reason: <>Common denominator 3: <Katex tex="3\sqrt2-4\sqrt2=-\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^k f(x)\,dx=\frac{2-\sqrt2}{3}\,k\sqrt k}" />,
    reason: <>
      In the required form <Katex tex="\tfrac{a-\sqrt a}{b}\,k\sqrt k" /> with <Katex tex="a=2" />, <Katex tex="b=3" />, both positive
      integers. Check against part a.ii: <Katex tex="k=6" /> gives{' '}
      <Katex tex="\tfrac{2-\sqrt2}{3}\cdot6\sqrt6=4\sqrt6-2\sqrt{12}=4\sqrt6-4\sqrt3" /> ✓.
    </>,
  },
]

export default function MethodsQ8_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (6 marks)</p>
        <p>
          Let <Katex tex="f:[0,\infty)\to R,\ f(x)=\dfrac{x}{2\sqrt{x+k}}" />, where <Katex tex="k" /> is a positive real number.
        </p>
      </div>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">a.</p>
        <p>
          Consider the particular case where <Katex tex="k=6" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Product Rule"
        marks={1}
        statement={
          <>
            Show that <Katex tex="\dfrac{d}{dx}\left(x\sqrt{x+6}\right)=\sqrt{x+6}+\dfrac{x}{2\sqrt{x+6}}" />.
          </>
        }
        examinerReport={REPORT_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Integration by Recognition"
        marks={3}
        statement={
          <>
            Hence, or otherwise, evaluate the definite integral <Katex tex="\displaystyle\int_0^6 f(x)\,dx" />.
          </>
        }
        examinerReport={REPORT_AII}
      >
        <Background>
          <p>
            <b>Integration by recognition</b> turns a derivative you already know into an antiderivative. If{' '}
            <Katex tex="\tfrac{d}{dx}F(x)=g(x)+h(x)" />, then <Katex tex="h(x)=\tfrac{d}{dx}F(x)-g(x)" />, and so{' '}
            <Katex tex="\int h(x)\,dx=F(x)-\int g(x)\,dx" />. The &ldquo;hence&rdquo; points at part a.i: the function you need
            to integrate, <Katex tex="f" />, appears there as one of the two terms.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <WrongMethod
          title="Integrate the whole of part a.i's result"
          working={<Katex display tex="\int_0^6 f(x)\,dx=\Big[x\sqrt{x+6}\Big]_0^6=12\sqrt3" />}
        >
          <Katex tex="x\sqrt{x+6}" /> is the antiderivative of <Katex tex="\sqrt{x+6}+f(x)" />, not of <Katex tex="f(x)" /> alone, so
          this also counts the area under <Katex tex="\sqrt{x+6}" />. Subtract <Katex tex="\int\sqrt{x+6}\,dx" />. The size gives it
          away: <Katex tex="12\sqrt3\approx20.8" />, far more than a region under a curve no higher than 0.87 over a width of 6
          could hold.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Integration by Recognition"
        marks={2}
        statement={
          <>
            Find <Katex tex="\displaystyle\int_0^k f(x)\,dx" /> in the form <Katex tex="\dfrac{a-\sqrt a}{b}\,k\sqrt k" /> where{' '}
            <Katex tex="a" /> and <Katex tex="b" /> are positive integers.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
