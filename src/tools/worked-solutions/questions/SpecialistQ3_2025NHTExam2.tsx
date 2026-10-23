// 2025 Specialist NHT — Exam 2, Section B Question 3 (10 marks). The NHT report gives a sample
// answer for each part only, with no statistics and no comments. A reduction formula for
// ∫sec³(x) dx by parts, the volume of a dish formed by rotating y = I₁(x) (an antiderivative of
// sec x) for π/6 ≤ x ≤ π/3 about the y-axis, then a logistic differential equation for bacteria
// in the dish: its limiting value, the time to reach 7500 as a definite integral and its value,
// and a non-stationary point of inflection at N = 7500. Question text transcribed from the
// original paper (which has no text layer; read from the page images). The graph of y = I₁(x)
// with the dish is the actual VCAA figure, cropped from page 17 of the original exam PDF at
// 300 dpi (spec-2025nhte2-q3-dish.png). Answers checked with sympy and against the report's
// sample answers, which agree: a. I₃ = ½sec x tan x + ½I₁(x); b. 1.6 cm³ (1.6346…);
// c. 15 000; d.ii. 67.3 min (= 20 log_e 29); e. dN/dt = 187.5 ≠ 0, d²N/dt² = 0 and changes sign
// (±28/45 at N = 7000, 8000). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import dishSrc from './spec-2025nhte2-q3-dish.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} u&=\sec(x), & \frac{du}{dx}&=\sec(x)\tan(x) \\ \frac{dv}{dx}&=\sec^2(x), & v&=\tan(x) \end{aligned}" />,
    reason: <>Integration by parts, <Katex tex="\int u\,\tfrac{dv}{dx}\,dx=uv-\int v\,\tfrac{du}{dx}\,dx" />. The stem has already split <Katex tex="\sec^3" /> as <Katex tex="\sec^2\times\sec" />: <Katex tex="\sec^2(x)" /> is the part you can antidifferentiate, so it is <Katex tex="\tfrac{dv}{dx}" />.</>,
    more: <><Katex tex="\tfrac{d}{dx}\sec(x)=\tfrac{d}{dx}(\cos x)^{-1}=\tfrac{\sin x}{\cos^2x}=\sec(x)\tan(x)" />, by the chain rule.</>,
  },
  {
    working: <Katex display tex="I_3(x)=\sec(x)\tan(x)-\int\tan^2(x)\sec(x)\,dx" />,
    reason: <>Apply the formula: <Katex tex="v\tfrac{du}{dx}=\tan(x)\cdot\sec(x)\tan(x)=\tan^2(x)\sec(x)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} I_3(x)&=\sec(x)\tan(x) \\ &\qquad-\int\left(\sec^2(x)-1\right)\sec(x)\,dx \\ &=\sec(x)\tan(x) \\ &\qquad-\int\sec^3(x)\,dx+\int\sec(x)\,dx \end{aligned}" />,
    reason: <>The new integral looks no easier, but the identity <Katex tex="\tan^2(x)=\sec^2(x)-1" /> turns it back into <Katex tex="\sec^3" />, the very integral we started with, plus <Katex tex="\sec" />.</>,
  },
  {
    working: <Katex display tex="I_3(x)=\sec(x)\tan(x)-I_3(x)+I_1(x)" />,
    reason: <>Name the two integrals: <Katex tex="\int\sec^3(x)\,dx=I_3(x)" /> and <Katex tex="\int\sec(x)\,dx=I_1(x)" />.</>,
    more: <>This is the trick of the question: <Katex tex="I_3" /> appears on both sides, so treat it as an unknown and solve for it, instead of trying to integrate again.</>,
  },
  {
    working: <Katex display tex="\boxed{I_3(x)=\frac12\sec(x)\tan(x)+\frac12I_1(x)}" />,
    reason: <>Add <Katex tex="I_3(x)" /> to both sides, <Katex tex="2I_3(x)=\sec(x)\tan(x)+I_1(x)" />, and halve.</>,
    more: <>Strictly, the two sides of an equation between indefinite integrals can differ by a constant; VCAA&apos;s sample answer leaves it out, as here, since it can be absorbed into <Katex tex="I_1(x)" />. Check by differentiating: <Katex tex="\tfrac{d}{dx}\left(\tfrac12\sec x\tan x\right)=\tfrac12\left(\sec x\tan^2x+\sec^3x\right)=\sec^3x-\tfrac12\sec x" />, and adding <Katex tex="\tfrac12I_1'(x)=\tfrac12\sec x" /> gives <Katex tex="\sec^3x" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="V=\pi\int x^2\,dy" />,
    reason: <>The dish is formed by rotating about the <Katex tex="y" />-axis, so slice it horizontally: each thin slice at height <Katex tex="y" /> is a disc of radius <Katex tex="x" /> and thickness <Katex tex="\delta y" />, volume <Katex tex="\pi x^2\,\delta y" />.</>,
    more: <>The given formula is this one with the variable changed from <Katex tex="y" /> to <Katex tex="x" />: <Katex tex="dy=\tfrac{dy}{dx}\,dx" />. That is why its terminals are <Katex tex="x" />-values.</>,
  },
  {
    working: <Katex display tex="y=I_1(x)\implies\frac{dy}{dx}=\sec(x)" />,
    reason: <><Katex tex="I_1(x)=\int\sec(x)\,dx" />, so its derivative is <Katex tex="\sec(x)" />. The rule for <Katex tex="I_1" /> itself is never needed.</>,
  },
  {
    working: <Katex display tex="V=\pi\int_{\pi/6}^{\pi/3}x^2\sec(x)\,dx" />,
    reason: <>The fluid fills the dish from its flat base, a circle of radius <Katex tex="\tfrac{\pi}{6}" />, up to the open top, a circle of radius <Katex tex="\tfrac{\pi}{3}" />. In <Katex tex="x" />, that is from <Katex tex="\tfrac{\pi}{6}" /> to <Katex tex="\tfrac{\pi}{3}" />.</>,
    more: <>Use one side of the graph only. The left-hand part from <Katex tex="-\tfrac{\pi}{3}" /> to <Katex tex="-\tfrac{\pi}{6}" /> is the same surface seen from the other side: rotating the right-hand part already sweeps out the whole dish.</>,
  },
  {
    working: <Cas fn="nInt">π×nInt(x²/cos(x), x, π/6, π/3)</Cas>,
    reason: <><Katex tex="x^2\sec(x)" /> has no elementary antiderivative, so evaluate numerically. On CAS, enter <Katex tex="\sec(x)" /> as <Katex tex="\tfrac{1}{\cos(x)}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V\approx1.6\ \text{cm}^3}" />,
    reason: <><Katex tex="V=1.6346\ldots" />, correct to one decimal place.</>,
    more: <>Sanity check: the dish is <Katex tex="\log_e\left(2+\sqrt3\right)-\log_e\left(\sqrt3\right)\approx0.77" /> cm deep, with radius from 0.52 cm to 1.05 cm. Cylinders of that height with those radii hold about 0.66 and 2.64 cm³, and 1.6 lies between them. Leaving out the <Katex tex="\pi" /> gives 0.52.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dN}{dt}=0 \iff N=0 \ \text{ or } \ N=15\,000" />,
    reason: <>The growth stops when the bracket <Katex tex="1-\tfrac{N}{15\,000}" /> is zero.</>,
  },
  {
    working: <Katex display tex="\boxed{15\,000}" />,
    reason: <>Starting from 500, <Katex tex="\tfrac{dN}{dt}>0" /> while <Katex tex="0<N<15\,000" />, so <Katex tex="N" /> keeps increasing, ever more slowly, towards 15 000 without reaching it.</>,
    more: <>This is the logistic model <Katex tex="\tfrac{dN}{dt}=rN\left(1-\tfrac NK\right)" />: <Katex tex="K=15\,000" /> is the carrying capacity, the population the dish can sustain.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dt}{dN}=\frac{1}{0.05N\left(1-\frac{N}{15\,000}\right)}" />,
    reason: <>The equation gives <Katex tex="\tfrac{dN}{dt}" /> in terms of <Katex tex="N" /> only, so flip it: the time is then the integral of <Katex tex="\tfrac{dt}{dN}" /> with respect to <Katex tex="N" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t=\int_{500}^{7500}\frac{20}{N\left(1-\frac{N}{15\,000}\right)}\,dN}" />,
    reason: <>Integrate from the initial population 500 (at <Katex tex="t=0" />) to 7500. <Katex tex="\tfrac{1}{0.05}=20" />.</>,
    more: <>VCAA accepts any equivalent integrand, including <Katex tex="\tfrac{1}{0.05N\left(1-\frac{N}{15\,000}\right)}" /> and <Katex tex="\tfrac{-300\,000}{N(N-15\,000)}" />. The terminals are values of <Katex tex="N" />, not times.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">nInt(20/(n×(1−n/15000)), n, 500, 7500)</Cas>,
    reason: <>Evaluate the part d.i. integral.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t&=\int_{500}^{7500}20\left(\frac1N+\frac{1}{15\,000-N}\right)dN \\ &=20\Big[\log_e(N)-\log_e(15\,000-N)\Big]_{500}^{7500} \\ &=20\left(\log_e(1)-\log_e\left(\tfrac{500}{14\,500}\right)\right)=20\log_e(29) \end{aligned}" />,
    reason: <>The same value by hand, with partial fractions: <Katex tex="\tfrac{20}{N\left(1-\frac{N}{15\,000}\right)}=\tfrac{300\,000}{N(15\,000-N)}=20\left(\tfrac1N+\tfrac{1}{15\,000-N}\right)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t\approx67.3\ \text{minutes}}" />,
    reason: <><Katex tex="20\log_e(29)=67.3459\ldots" />, correct to one decimal place.</>,
    more: <>Plausible: with no limit at all the population would double every <Katex tex="\tfrac{\log_e2}{0.05}\approx13.9" /> minutes, so growing fifteen-fold would take <Katex tex="20\log_e15\approx54" /> minutes. The slowing near the limit makes the real time a little longer.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} N=7500:\quad \frac{dN}{dt}&=0.05\times7500 \\ &\qquad\times\left(1-\frac{7500}{15\,000}\right) \\ &=187.5\ne0 \end{aligned}" />,
    reason: <>Non-stationary means the gradient of the <Katex tex="N" />–<Katex tex="t" /> graph is not zero there.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} N=7500:\quad \frac{d^2N}{dt^2}&=\frac{7500}{400}\left(1-\frac{7500}{7500}\right) \\ &\qquad\times\left(1-\frac{7500}{15\,000}\right) \\ &=0 \end{aligned}" />,
    reason: <>The bracket <Katex tex="1-\tfrac{N}{7500}" /> is zero, so the second derivative is zero.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} N=7000:\quad \frac{d^2N}{dt^2}&=\frac{7000}{400}\left(\frac{1}{15}\right)\left(\frac{8}{15}\right) \\ &=\frac{28}{45}>0 \\ N=8000:\quad \frac{d^2N}{dt^2}&=\frac{8000}{400}\left(-\frac{1}{15}\right)\left(\frac{7}{15}\right) \\ &=-\frac{28}{45}<0 \end{aligned}" />,
    reason: <>A zero second derivative is not enough: it must also change sign. Test a value either side of 7500.</>,
    more: <>Since <Katex tex="\tfrac{dN}{dt}>0" />, <Katex tex="N" /> increases with time, so <Katex tex="N=7000" /> comes before <Katex tex="N=7500" /> and <Katex tex="N=8000" /> after it. A sign change in <Katex tex="N" /> is therefore a sign change in <Katex tex="t" /> too.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{At } N=7500\text{: } \frac{dN}{dt}\ne0, \\ \frac{d^2N}{dt^2}=0 \text{ and changes sign,} \\ \text{so a non-stationary point of inflection}\end{gathered}}" />,
    reason: <>Concavity changes from up to down while the graph is still rising. As required.</>,
    more: <>This is where the bacteria grow fastest: the logistic curve is steepest halfway to its limit, <Katex tex="\tfrac{15\,000}{2}=7500" />.</>,
  },
]

export default function SpecialistQ3_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <div>
          Let <Katex display tex="\begin{aligned} I_3(x)&=\int\left(\sec^3(x)\right)dx \\ &=\int\left(\sec^2(x)\sec(x)\right)dx. \end{aligned}" />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Three separate ideas share one story. Part a. is integration by parts where the original
              integral comes back, so you solve for it like an unknown. Part b. is a volume of revolution
              about the <Katex tex="y" />-axis, with the formula supplied. Parts c.–e. are a logistic
              differential equation: its limiting value, the time to reach a population as a definite
              integral of <Katex tex="\tfrac{dt}{dN}" />, and the point of fastest growth.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Integration by Parts"
        marks={3}
        statement={
          <>
            Use integration by parts to find an expression for <Katex tex="I_3(x)" /> involving{' '}
            <Katex tex="\sec(x)" />, <Katex tex="\tan(x)" /> and <Katex tex="I_1(x)" />, where{' '}
            <Katex tex="I_1(x)=\int\left(\sec(x)\right)dx" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          The graph of <Katex tex="y=I_1(x)" /> for <Katex tex="x\in\left(-\dfrac{\pi}{2},\dfrac{\pi}{2}\right)" /> is
          shown below. The part of the graph where <Katex tex="x\in\left[\dfrac{\pi}{6},\dfrac{\pi}{3}\right]" /> is
          rotated about the <Katex tex="y" />-axis to model the curved surface of a small laboratory dish. The
          dish has a flat circular base and an open top. One unit on each axis represents one centimetre.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={dishSrc}
            alt="Figure from the original VCAA exam paper: the dashed graph of y = I₁(x) for −π/2 < x < π/2, increasing through the origin, with x marked at ±π/6, ±π/3, ±π/2 and y at ±2. The solid parts from x = π/6 to π/3 and from −π/3 to −π/6 form the curved side of a dish, drawn with an elliptical base and an elliptical open top"
            className="w-full max-w-[480px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        topic="Volume of Revolution"
        marks={2}
        statement={
          <>
            Using <Katex tex="V(x)=\pi\int x^2\dfrac{dy}{dx}\,dx" />, where <Katex tex="y=I_1(x)" />, find the volume
            of fluid needed to completely fill the dish.
            <br />
            Give your answer in cubic centimetres correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Rotate about the x-axis out of habit"
          working={<Katex display tex="\pi\int_{\pi/6}^{\pi/3}y^2\,dx" />}
        >
          That would spin the curve about the horizontal axis and make a different solid altogether. The
          dish is formed by rotating about the <Katex tex="y" />-axis, so the radius of each slice is{' '}
          <Katex tex="x" />, not <Katex tex="y" />. The question hands you the right formula; use it as
          given, with <Katex tex="\tfrac{dy}{dx}=\sec(x)" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          The dish is used to study the growth of a certain type of bacteria. Initially 500 bacteria are in the
          dish and the number of bacteria, <Katex tex="N" />, present after <Katex tex="t" /> minutes grows
          according to the differential equation
        </p>
        <Katex display tex="\frac{dN}{dt}=0.05N\left(1-\frac{N}{15\,000}\right)." />
      </div>

      <PartCard
        letter="c"
        topic="Limiting Value"
        marks={1}
        statement={<>What maximum value will <Katex tex="N" /> approach?</>}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Definite Integral"
        marks={1}
        statement={<>Express as a definite integral the time it would take for <Katex tex="N" /> to reach 7500.</>}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Logistic Growth"
        marks={1}
        statement={
          <>
            Find the time it would take for the number of bacteria to grow to 7500.
            <br />
            Give your answer in minutes correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Point of Inflection"
        marks={2}
        statement={
          <>
            Given that{' '}
            <Katex tex="\dfrac{d^2N}{dt^2}=\dfrac{N}{400}\left(1-\dfrac{N}{7500}\right)\left(1-\dfrac{N}{15\,000}\right)" />,
            show calculations to verify that the graph of <Katex tex="N" /> against <Katex tex="t" /> has a
            non-stationary point of inflection where <Katex tex="N=7500" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
