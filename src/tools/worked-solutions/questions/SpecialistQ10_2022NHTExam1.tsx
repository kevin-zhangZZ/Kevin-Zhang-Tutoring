// 2022 Specialist NHT — Exam 1, Question 10 (5 marks). The NHT report gives sample answers only,
// with no statistics. Part a. differentiates an arcsin-plus-product function to show
// f′(x) = √(9 − 3x²); part b. uses that as dy/dt in a parametric arc length, where the expression
// under the root is a perfect square, ((6 − t²)/2)², giving 63/16. Question text transcribed from
// the original paper. Answers checked with sympy (f′(x) − √(9 − 3x²) simplifies to 0; arc length
// integral 63/16, also confirmed numerically) and against the VCAA report's sample answers, which
// agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &\frac{d}{dx}\arcsin\!\left(\frac{\sqrt3x}{3}\right) \\ &= \frac{\sqrt3}{3}\cdot\frac{1}{\sqrt{1-\frac{x^2}{3}}} \\ &= \frac{\sqrt3}{3}\cdot\frac{\sqrt3}{\sqrt{3-x^2}} = \frac{1}{\sqrt{3-x^2}} \end{aligned}"
      />
    ),
    reason: <>Chain rule with <Katex tex="\tfrac{d}{du}\arcsin(u)=\tfrac{1}{\sqrt{1-u^2}}" /> and <Katex tex="u=\tfrac{\sqrt3x}{3}" />, so <Katex tex="u'=\tfrac{\sqrt3}{3}" /> and <Katex tex="u^2=\tfrac{3x^2}{9}=\tfrac{x^2}{3}" />. Then tidy the root: <Katex tex="1-\tfrac{x^2}{3}=\tfrac{3-x^2}{3}" />, so <Katex tex="\sqrt{1-\tfrac{x^2}{3}}=\tfrac{\sqrt{3-x^2}}{\sqrt3}" />.</>,
    more: <>The formula sheet also gives <Katex tex="\tfrac{d}{dx}\arcsin\!\left(\tfrac xa\right)=\tfrac{1}{\sqrt{a^2-x^2}}" />. Since <Katex tex="\tfrac{\sqrt3x}{3}=\tfrac{x}{\sqrt3}" />, that is <Katex tex="a=\sqrt3" /> and the result <Katex tex="\tfrac{1}{\sqrt{3-x^2}}" /> drops out in one line.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \frac{d}{dx}\left(x\sqrt{3-x^2}\right) &= \sqrt{3-x^2} + x\cdot\frac{-2x}{2\sqrt{3-x^2}} \\ &= \sqrt{3-x^2} - \frac{x^2}{\sqrt{3-x^2}} \end{aligned}"
      />
    ),
    reason: <>Product rule, <Katex tex="(uv)'=u'v+uv'" />, with <Katex tex="u=x" /> and <Katex tex="v=(3-x^2)^{1/2}" />. The chain rule gives <Katex tex="v'=\tfrac12(3-x^2)^{-1/2}\times(-2x)" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f'(x) = \frac{\sqrt3}{2}\Bigg(&\frac{3}{\sqrt{3-x^2}} + \sqrt{3-x^2} \\ &- \frac{x^2}{\sqrt{3-x^2}}\Bigg) \end{aligned}"
      />
    ),
    reason: <>Put the pieces together. The constant <Katex tex="\tfrac{\sqrt3}{2}" /> stays out the front, and the arcsin term is multiplied by its coefficient 3.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &= \frac{\sqrt3}{2}\cdot\frac{3 + (3-x^2) - x^2}{\sqrt{3-x^2}} = \frac{\sqrt3}{2}\cdot\frac{2(3-x^2)}{\sqrt{3-x^2}} \\ &= \sqrt3\,\sqrt{3-x^2} \end{aligned}"
      />
    ),
    reason: <>Write <Katex tex="\sqrt{3-x^2}=\tfrac{3-x^2}{\sqrt{3-x^2}}" /> to get a common denominator. Then <Katex tex="\tfrac{3-x^2}{\sqrt{3-x^2}}=\sqrt{3-x^2}" />, which is fine because <Katex tex="3-x^2>0" /> on <Katex tex="\left[0,\tfrac32\right]" />.</>,
  },
  {
    working: <Katex display tex="= \sqrt{3\left(3-x^2\right)} = \sqrt{9-3x^2}" />,
    reason: <>Bring the <Katex tex="\sqrt3" /> inside the root. As required.</>,
    more: <>In a &ldquo;show that&rdquo;, every line between the start and the given result has to be written, and you can&apos;t work backwards from the answer. The step most worth showing is the common denominator: it is where <Katex tex="3+3-2x^2" /> collapses to <Katex tex="2(3-x^2)" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{t^2}{2},\qquad \frac{dy}{dt} = f'(t) = \sqrt{9-3t^2}" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component of <Katex tex="\underset{\sim}{r}(t)" /> is exactly the function <Katex tex="f" /> from part a., with <Katex tex="t" /> in place of <Katex tex="x" />. So its derivative is already done: that is the &ldquo;hence&rdquo; link between the parts, even though the question doesn&apos;t say it.</>,
    more: <>The time interval <Katex tex="\left[0,\tfrac32\right]" /> is the same as the domain of <Katex tex="f" />, so part a.&apos;s result applies on the whole interval.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} s &= \int_0^{3/2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt \\ &= \int_0^{3/2}\sqrt{\frac{t^4}{4}+9-3t^2}\,dt \end{aligned}" />,
    reason: <>The distance travelled along a curve is the integral of the speed, <Katex tex="\left|\dot{\underset{\sim}{r}}(t)\right|" />, over the time interval. Square each component: <Katex tex="\left(\tfrac{t^2}{2}\right)^2=\tfrac{t^4}{4}" />, and squaring removes the root on <Katex tex="\tfrac{dy}{dt}" />.</>,
  },
  {
    working: <Katex display tex="\frac{t^4}{4}+9-3t^2 = \frac{t^4-12t^2+36}{4} = \frac{\left(t^2-6\right)^2}{4}" />,
    reason: <>Over a common denominator of 4, the top is a perfect square: <Katex tex="(t^2-6)^2=t^4-12t^2+36" />. On a technology-free paper, an arc-length integral that looks impossible almost always hides a perfect square like this.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \sqrt{\frac{\left(t^2-6\right)^2}{4}} &= \frac{\left|t^2-6\right|}{2} \\ &= \frac{6-t^2}{2}\quad\text{for } 0\le t\le\tfrac32 \end{aligned}" />,
    reason: <><Katex tex="\sqrt{a^2}=|a|" />, not <Katex tex="a" />. For <Katex tex="t\le\tfrac32" />, <Katex tex="t^2\le\tfrac94<6" />, so <Katex tex="t^2-6" /> is negative and its absolute value is <Katex tex="6-t^2" />.</>,
    more: <>Writing <Katex tex="\tfrac{t^2-6}{2}" /> here instead would give <Katex tex="-\tfrac{63}{16}" /> at the end: a negative distance, which is the sign that the root was simplified wrongly. A speed is never negative.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} s &= \frac12\int_0^{3/2}\left(6-t^2\right)dt = \frac12\left[6t-\frac{t^3}{3}\right]_0^{3/2} \\ &= \frac12\left(9-\frac{27/8}{3}\right) = \frac12\left(9-\frac98\right) = \frac12\cdot\frac{63}{8} \end{aligned}"
      />
    ),
    reason: <>A polynomial now. At <Katex tex="t=\tfrac32" />: <Katex tex="6\cdot\tfrac32=9" /> and <Katex tex="\left(\tfrac32\right)^3=\tfrac{27}{8}" />; the lower terminal gives 0.</>,
  },
  {
    working: <Katex display tex="\boxed{s = \frac{63}{16}}" />,
    reason: <>Exact, as Exam 1 expects (about 3.94).</>,
    more: <>Sanity check: the particle starts at <Katex tex="(0,0)" /> and ends at <Katex tex="\left(\tfrac{9}{16},\,f\!\left(\tfrac32\right)\right)" />, where <Katex tex="f\!\left(\tfrac32\right)=\tfrac{\sqrt3}{2}\left(3\cdot\tfrac\pi3+\tfrac32\cdot\tfrac{\sqrt3}{2}\right)=\tfrac{\sqrt3\pi}{2}+\tfrac98\approx3.85" />. The straight-line distance is about 3.89, a little less than the distance along the curve, as it must be.</>,
  },
]

export default function SpecialistQ10_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Inverse Trig Derivative"
        marks={2}
        statement={
          <>
            Consider{' '}
            <Katex tex="f:\left[0,\dfrac32\right]\to R,\ f(x)=\dfrac{\sqrt3}{2}\left(3\arcsin\!\left(\dfrac{\sqrt3x}{3}\right)+x\sqrt{3-x^2}\right)" />.
            <br />
            Show that <Katex tex="f'(x)=\sqrt{9-3x^2}" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Arc Length"
        marks={3}
        statement={
          <>
            A particle moves along a curve such that its position vector at time <Katex tex="t" /> is
            <br />
            <Katex tex="\underset{\sim}{r}(t)=\dfrac{t^3}{6}\,\underset{\sim}{i}+\dfrac{\sqrt3}{2}\left(3\arcsin\!\left(\dfrac{\sqrt3t}{3}\right)+t\sqrt{3-t^2}\right)\underset{\sim}{j}" />.
            <br />
            Find the distance that the particle travels along the curve from <Katex tex="t=0" /> to{' '}
            <Katex tex="t=\dfrac32" />.
          </>
        }
      >
        <Background>
          <p>
            For a particle with position <Katex tex="\underset{\sim}{r}(t)=x(t)\,\underset{\sim}{i}+y(t)\,\underset{\sim}{j}" />,
            the distance travelled along the curve from <Katex tex="t=a" /> to <Katex tex="t=b" /> is
          </p>
          <Katex display tex="s=\int_a^b\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />
          <p>
            The square root is the speed, so this adds up speed × time. Over a short time <Katex tex="\delta t" /> the
            particle moves about <Katex tex="\dot x\,\delta t" /> across and <Katex tex="\dot y\,\delta t" /> up, and
            Pythagoras gives the length of that small piece of curve.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
