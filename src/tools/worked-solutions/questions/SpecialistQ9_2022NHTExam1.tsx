// 2022 Specialist NHT — Exam 1, Question 9 (5 marks). The NHT report gives sample answers only,
// with no statistics. Sketch y = 9/((x + 1)(x − 2)²) (asymptotes x = −1, x = 2, y = 0; minimum and
// y-intercept (0, 9/4)), then the area under it from x = 0 to x = 1 by partial fractions:
// log_e(4) + 3/2. Question text transcribed from the original paper; the stem shows VCAA's blank
// axes, cropped from page 10 of the original VCAA exam PDF (spec-2022nhte1-q9a-blank-axes.png),
// which are bare (no grid, no scale). The finished curve (spec-2022nhte1-q9a-sketch.png) is this
// site's own answer-sketch, drawn with matplotlib on bare axes to match, in the working rather
// than the stem. spec-2022nhte1-q9b-area.png is this site's own explanatory figure of the shaded
// region, which VCAA never printed. Answers checked with sympy (partial fractions
// 1/(x+1) − 1/(x−2) + 3/(x−2)², f′(x) = −27x/((x+1)²(x−2)³), area log_e(4) + 3/2 ≈ 2.886) and
// against the VCAA report's sample answers, which agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'
import blankAxesSrc from './spec-2022nhte1-q9a-blank-axes.png'
import sketchSrc from './spec-2022nhte1-q9a-sketch.png'
import areaSrc from './spec-2022nhte1-q9b-area.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &(x+1)(x-2)^2 = 0 \implies x=-1,\ x=2 \\ &\text{are vertical asymptotes} \end{aligned}" />,
    reason: <>The function is undefined where the denominator is zero, and the numerator 9 isn&apos;t zero there, so <Katex tex="y" /> blows up: vertical asymptotes.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x\to\pm\infty: \ y\to0 \\ &\implies y=0 \text{ is a horizontal asymptote} \end{aligned}" />,
    reason: <>The numerator is a constant while the denominator is a cubic, so for large <Katex tex="|x|" /> the fraction shrinks to 0.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &9\neq0 \implies \text{no } x\text{-intercepts} \\ &x=0: \ y=\frac{9}{(1)(-2)^2}=\frac94 \end{aligned}" />,
    reason: <>A fraction is zero only when its numerator is, and 9 never is, so the graph never meets the <Katex tex="x" />-axis. The <Katex tex="y" />-intercept <Katex tex="\left(0,\tfrac94\right)" /> is also the local minimum the question gives us.</>,
    more: <>You can confirm the minimum: by the quotient (or chain) rule, <Katex tex="y'=\dfrac{-27x}{(x+1)^2(x-2)^3}" />, which is zero only at <Katex tex="x=0" />, negative just left of it and positive just right of it (between the asymptotes, <Katex tex="(x-2)^3<0" />). The question tells you this, so you don&apos;t have to show it.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &(x-2)^2 > 0 \text{ for } x\neq2 \\ &\implies y \text{ has the sign of } x+1 \\ &x<-1: \ y<0 \\ &x>-1,\ x\neq2: \ y>0 \end{aligned}"
      />
    ),
    reason: <>The squared factor is never negative, so only <Katex tex="x+1" /> decides the sign. The left branch is below the axis; the middle and right branches are above it.</>,
    more: <>This also fixes how the graph meets each asymptote. At <Katex tex="x=-1" /> the sign changes, so the graph goes to <Katex tex="-\infty" /> on the left and <Katex tex="+\infty" /> on the right. At <Katex tex="x=2" /> the factor is squared, so the sign doesn&apos;t change: both sides go up to <Katex tex="+\infty" />. On the left the graph approaches <Katex tex="y=0" /> from below; on the right, from above.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's answer sketch on bare axes: y = 9/((x+1)(x−2)²) with dashed vertical asymptotes x = −1 and x = 2, horizontal asymptote y = 0 (the x-axis), a left branch below the axis, a U-shaped middle branch with minimum and y-intercept (0, 9/4), and a right branch above the axis falling towards y = 0"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>All three asymptotes labelled with their equations, and the only axis intercept, <Katex tex="\left(0,\tfrac94\right)" />, with its coordinates. VCAA&apos;s axes have no scale, so only the shape, the positions relative to the axes and the labels matter.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={areaSrc}
          alt="This site's explanatory figure: the middle branch of y = 9/((x+1)(x−2)²) with the region under it from x = 0 to x = 1 shaded, between the points (0, 9/4) and (1, 9/2)"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>The region is bounded by the <Katex tex="y" />-axis, the <Katex tex="x" />-axis, the line <Katex tex="x=1" /> and the middle branch from part a.</>,
    more: <>The interval <Katex tex="[0,1]" /> sits between the asymptotes, where the graph is continuous and above the <Katex tex="x" />-axis, so the area is simply the definite integral, with no splitting and no sign change.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_0^1 \frac{9}{(x+1)(x-2)^2}\,dx" />,
  },
  {
    working: <Katex display tex="\frac{9}{(x+1)(x-2)^2} = \frac{A}{x+1}+\frac{B}{x-2}+\frac{C}{(x-2)^2}" />,
    reason: <>There is no standard antiderivative for this product, so split it into partial fractions. A repeated linear factor <Katex tex="(x-2)^2" /> needs <b>two</b> terms, one over <Katex tex="x-2" /> and one over <Katex tex="(x-2)^2" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} 9 &= A(x-2)^2 + B(x+1)(x-2) \\ &\quad + C(x+1) \\ x=-1: \ 9 &= 9A \implies A=1 \\ x=2: \ 9 &= 3C \implies C=3 \\ x^2: \ 0 &= A+B \implies B=-1 \end{aligned}"
      />
    ),
    reason: <>Multiply through by <Katex tex="(x+1)(x-2)^2" />. Substituting each root kills all but one term. No value of <Katex tex="x" /> isolates <Katex tex="B" />, so compare the <Katex tex="x^2" /> coefficients: there is no <Katex tex="x^2" /> on the left.</>,
    more: <>Check at <Katex tex="x=0" />: <Katex tex="\tfrac{1}{1}-\tfrac{1}{-2}+\tfrac{3}{4}=1+\tfrac12+\tfrac34=\tfrac94" />, which matches <Katex tex="y(0)=\tfrac94" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \text{Area} &= \int_0^1\left(\frac{1}{x+1}-\frac{1}{x-2}+\frac{3}{(x-2)^2}\right)dx \\ &= \Big[\log_e|x+1| - \log_e|x-2| \\ &\qquad - \frac{3}{x-2}\Big]_0^1 \end{aligned}"
      />
    ),
    reason: <>The first two terms are of the form <Katex tex="\tfrac{1}{x+c}" />, with antiderivative <Katex tex="\log_e|x+c|" />. For the third, <Katex tex="3(x-2)^{-2}" /> antidifferentiates to <Katex tex="3\cdot\tfrac{(x-2)^{-1}}{-1}=-\tfrac{3}{x-2}" />.</>,
    more: <>Keep the absolute value bars: on <Katex tex="[0,1]" />, <Katex tex="x-2" /> is negative, so <Katex tex="\log_e(x-2)" /> would be undefined. <Katex tex="|x-2|=2-x" /> there.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &= \left(\log_e(2) - \log_e(1) - \frac{3}{-1}\right) \\ &\quad - \left(\log_e(1) - \log_e(2) - \frac{3}{-2}\right) \\ &= \left(\log_e(2)+3\right) - \left(-\log_e(2)+\frac32\right) \end{aligned}"
      />
    ),
    reason: <>Upper terminal minus lower terminal. At <Katex tex="x=1" />: <Katex tex="|1+1|=2" />, <Katex tex="|1-2|=1" />. At <Katex tex="x=0" />: <Katex tex="|0+1|=1" />, <Katex tex="|0-2|=2" />. And <Katex tex="\log_e(1)=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= 2\log_e(2)+\frac32 \\ &\boxed{\text{Area} = \log_e(4)+\frac32 \text{ square units}} \end{aligned}" />,
    reason: <><Katex tex="2\log_e(2)=\log_e\!\left(2^2\right)" />. VCAA&apos;s sample answer gives both forms. Sanity check: <Katex tex="\log_e(4)+\tfrac32\approx2.89" />, between the heights at the ends of the strip (<Katex tex="\tfrac94" /> and <Katex tex="\tfrac92" />, over a width of 1), as it must be.</>,
  },
]

export default function SpecialistQ9_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Sketch Rational Function"
        marks={2}
        statement={
          <>
            Given that there is a local minimum turning point at <Katex tex="x=0" />, sketch the graph of{' '}
            <Katex tex="y=\dfrac{9}{(x+1)(x-2)^2}" /> on the axes provided below. Label any asymptotes with their
            equations and axes intercepts with their coordinates.
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank x–y axes with no grid or scale, from the original 2022 NHT VCAA exam paper"
                className="w-full max-w-[420px]"
              />
            </div>
          </>
        }
      >
        <Background>
          <p>
            To sketch a rational function, find in turn: where the denominator is zero (vertical asymptotes), what happens
            for large <Katex tex="|x|" /> (horizontal asymptote), where the numerator is zero (<Katex tex="x" />-intercepts),
            the value at <Katex tex="x=0" /> (<Katex tex="y" />-intercept), and the sign of <Katex tex="y" /> in each
            interval. A factor that appears squared doesn&apos;t change sign, so the graph goes the same way on both sides
            of that asymptote.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Partial Fractions Area"
        marks={3}
        statement={
          <>
            Find the area bounded by the graph of <Katex tex="y=\dfrac{9}{(x+1)(x-2)^2}" />, the coordinate axes and the
            line <Katex tex="x=1" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
