// 2024 Specialist NHT — Exam 2, Section B Question 1 (10 marks). The NHT report gives a sample
// answer for each part only, with no statistics and no comments. f(x) = 1 − 4/(x² + 4) on [0, 2]:
// a sketch with its point of inflection, the volume of the bowl formed by rotating the region
// between the curve, the y-axis and y = 0.5 about the y-axis, its curved surface area (a fishpond
// membrane) and a related-rates fill rate. Question text transcribed from the original paper.
// Part a.'s blank axes (x from about −0.66 to 2.25 with gridlines every 0.25, y from about −0.04
// to 0.53 with gridlines every 0.05; cells not square) are cropped from page 12 of the original
// VCAA exam PDF at 300 dpi (spec-2024nhte2-q1a-blank-axes.png); the finished sketch is this
// site's own matplotlib figure drawn on that grid, measured from the crop
// (spec-2024nhte2-q1a-sketch.png). Answers checked with sympy/scipy and against the report's
// sample answers, which agree: a. inflection (2/√3, 1/4); b.ii 2π(2 log_e(2) − 1); c. 13.08
// (the y-integral and the x-integral both give 13.0788…); d. 0.024 (exactly 3/(40π)). Solution
// is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import blankAxesSrc from './spec-2024nhte2-q1a-blank-axes.png'
import sketchSrc from './spec-2024nhte2-q1a-sketch.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x^2+4-4}{x^2+4} = \frac{x^2}{x^2+4}" />,
    reason: <>Writing <Katex tex="f" /> over one denominator shows at a glance that <Katex tex="f(x)\ge0" />, with <Katex tex="f(0)=0" />.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(2) = \frac{4}{8} = \frac12" />,
    reason: <>The domain is the closed interval <Katex tex="[0,2]" />, so the graph starts and stops at these two points, both included.</>,
  },
  {
    working: <Katex display tex="f'(x) = -4\cdot\left(-(x^2+4)^{-2}\right)\cdot 2x = \frac{8x}{(x^2+4)^2}" />,
    reason: <>Write <Katex tex="\tfrac{4}{x^2+4}" /> as <Katex tex="4(x^2+4)^{-1}" /> and use the chain rule; the inner derivative is <Katex tex="2x" />.</>,
    more: <><Katex tex="f'(x)\ge0" /> on <Katex tex="[0,2]" />, so the graph rises the whole way, and <Katex tex="f'(0)=0" />, so it leaves the origin flat.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f''(x) &= \frac{8(x^2+4)^2-8x\cdot 2(x^2+4)\cdot 2x}{(x^2+4)^4} \\ &= \frac{8\left(x^2+4-4x^2\right)}{(x^2+4)^3} = \frac{8\left(4-3x^2\right)}{(x^2+4)^3} \end{aligned}" />,
    reason: <>Quotient rule on <Katex tex="\tfrac{8x}{(x^2+4)^2}" />, with the chain rule for the derivative of the denominator. Cancel one factor of <Katex tex="x^2+4" /> before simplifying.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &f''(x)=0 \\ &\implies x^2=\frac43 \\ &\implies x=\frac{2}{\sqrt3} \quad (x\ge0) \end{aligned}" />,
    reason: <>A point of inflection is where the concavity changes, so look where <Katex tex="f''(x)=0" />. The negative root is outside the domain.</>,
    more: <>The sign really does change there: for <Katex tex="0<x<\tfrac{2}{\sqrt3}" />, <Katex tex="4-3x^2>0" /> (concave up); for <Katex tex="x>\tfrac{2}{\sqrt3}" /> it is negative (concave down). The denominator is always positive.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{2}{\sqrt3}\right) = \frac{\frac43}{\frac43+4} = \frac{\frac43}{\frac{16}{3}} = \frac14" />,
    reason: <>Substitute into the simpler form <Katex tex="\tfrac{x^2}{x^2+4}" />, using <Katex tex="x^2=\tfrac43" /> directly.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's sketch on VCAA's grid: the graph of y = f(x) from the closed endpoint (0, 0), flat at the origin and concave up, through the point of inflection labelled (2/√3, 1/4), then concave down to the closed endpoint (2, 1/2)"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>The curve from <Katex tex="(0,0)" /> to <Katex tex="\left(2,\tfrac12\right)" />, with the point of inflection <Katex tex="\left(\tfrac{2}{\sqrt3},\tfrac14\right)" /> labelled, as asked.</>,
    more: <><Katex tex="\tfrac{2}{\sqrt3}\approx1.15" />, a little past the <Katex tex="x=1" /> gridline, at height 0.25, halfway between the 0.2 and 0.3 lines. VCAA&apos;s sample answer writes the label as <Katex tex="\left(\tfrac{2}{\sqrt3},\ 0.25\right)" />. The curve should be flat where it leaves the origin.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &y = 1-\frac{4}{x^2+4} \\ &\implies \frac{4}{x^2+4} = 1-y \\ &\implies x^2+4 = \frac{4}{1-y} \end{aligned}" />,
    reason: <>Rotating about the <Katex tex="y" />-axis means the radius of each disc is <Katex tex="x" />, so the integrand needs <Katex tex="x^2" /> in terms of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="x^2 = \frac{4}{1-y}-4 = \frac{4y}{1-y}" />,
    reason: <><Katex tex="\tfrac{4-4(1-y)}{1-y}=\tfrac{4y}{1-y}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^{0.5}\frac{4y}{1-y}\,dy}" />,
    reason: <>Volume about the <Katex tex="y" />-axis is <Katex tex="\pi\int x^2\,dy" />. The region runs from the bottom of the curve at <Katex tex="y=0" /> up to the line <Katex tex="y=0.5" />, so those are the terminals.</>,
    more: <>VCAA also writes this as <Katex tex="\pi\int_0^{0.5}\left(\tfrac{4}{1-y}-4\right)dy" />, the same integrand. The terminals are <Katex tex="y" />-values, not the <Katex tex="x" />-values 0 and 2: the integral is <em>in terms of</em> <Katex tex="y" />, as the question says.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{4y}{1-y} = \frac{4-4(1-y)}{1-y} = \frac{4}{1-y}-4" />,
    reason: <>Split the fraction so each piece has a standard antiderivative.</>,
  },
  {
    working: <Katex display tex="V = \pi\Big[-4\log_e(1-y)-4y\Big]_0^{0.5}" />,
    reason: <>The antiderivative of <Katex tex="\tfrac{1}{1-y}" /> is <Katex tex="-\log_e(1-y)" />: the inner derivative of <Katex tex="1-y" /> is <Katex tex="-1" />. On <Katex tex="[0,0.5]" />, <Katex tex="1-y>0" />, so no modulus is needed.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} V &= \pi\big(-4\log_e(0.5)-2\big)-0 \\ &= \pi\big(4\log_e(2)-2\big) \end{aligned}" />,
    reason: <><Katex tex="-\log_e\left(\tfrac12\right)=\log_e(2)" />, and the lower terminal gives <Katex tex="-4\log_e(1)-0=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = 2\pi\big(2\log_e(2)-1\big)}" />,
    reason: <>Exact, since no rounding is asked for (<Katex tex="\approx2.43" />).</>,
    more: <>Sanity check: a cylinder of radius 2 and height 0.5 would hold <Katex tex="\pi\times2^2\times0.5=2\pi\approx6.28" />. The bowl narrows to a point at the bottom, so it holds well under that.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{membrane} = \text{curved surface area}" />,
    reason: <>The pond is open, so there is no lid, and the curve meets the axis at the origin, so there is no flat base. Only the curved surface needs covering.</>,
  },
  {
    working: <Katex display tex="S = 2\pi\int_0^{0.5} x\sqrt{1+\left(\frac{dx}{dy}\right)^2}\,dy" />,
    reason: <>The formula-sheet surface area for rotation about the <Katex tex="y" />-axis: the radius is <Katex tex="x" />, and <Katex tex="\sqrt{1+\left(\tfrac{dx}{dy}\right)^2}\,dy" /> is a short length of the curve.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x^2 = \frac{4}{1-y}-4 \\ &\implies 2x\frac{dx}{dy} = \frac{4}{(1-y)^2} \\ &\implies \frac{dx}{dy} = \frac{2}{x(1-y)^2} \end{aligned}" />,
    reason: <>Differentiate the part b.i equation implicitly with respect to <Katex tex="y" />. This avoids differentiating a square root.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \left(\frac{dx}{dy}\right)^2 &= \frac{4}{x^2(1-y)^4} \\ &= \frac{4(1-y)}{4y(1-y)^4} \\ &= \frac{1}{y(1-y)^3} \end{aligned}" />,
    reason: <>Replace <Katex tex="x^2" /> by <Katex tex="\tfrac{4y}{1-y}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="S = 2\pi\int_0^{0.5}\sqrt{\frac{4y}{1-y}}\,\sqrt{1+\frac{1}{y(1-y)^3}}\,dy" />
        <Cas fn="nInt">2π·nInt(√(4y/(1−y))·√(1+1/(y(1−y)³)), y, 0, 0.5)</Cas>
      </>
    ),
    reason: <>This integrand has no antiderivative you can find by hand, so evaluate it numerically on CAS.</>,
    more: <>The same area comes from the <Katex tex="x" />-form, which skips the rearranging: <Katex tex="S=2\pi\int_0^2 x\sqrt{1+\left(f'(x)\right)^2}\,dx" /> with <Katex tex="f'(x)=\tfrac{8x}{(x^2+4)^2}" /> from part a. Each piece of curve is the same length whichever variable you slice by. VCAA lists all three forms.</>,
  },
  {
    working: <Katex display tex="\boxed{S \approx 13.08 \ \text{m}^2}" />,
    reason: <><Katex tex="13.0788\ldots" />, correct to two decimal places.</>,
    more: <>Sanity check: the pond&apos;s opening is a circle of radius 2, area <Katex tex="4\pi\approx12.57" />. The pond is shallow (0.5 m deep), so its curved inside should be only a little more than the opening: it is. Adding the top disc would be the wrong answer, about 25.65: an open pond has no lid.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dV}{dt} = 0.1, \qquad \text{find } \frac{dy}{dt} \text{ when } y = 0.25" />,
    reason: <>The bottom of the pond is at <Katex tex="y=0" />, so the depth of water is <Katex tex="y" />. Volume is in cubic metres and time in minutes.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_0^{y}\frac{4u}{1-u}\,du \implies \frac{dV}{dy} = \frac{4\pi y}{1-y}" />,
    reason: <>The water to depth <Katex tex="y" /> is the part b.i solid cut off at height <Katex tex="y" />. Differentiating an integral with respect to its upper terminal gives back the integrand.</>,
    more: <>Or use part b.ii&apos;s antiderivative: <Katex tex="V=\pi\left(-4\log_e(1-y)-4y\right)" />, so <Katex tex="\tfrac{dV}{dy}=\pi\left(\tfrac{4}{1-y}-4\right)=\tfrac{4\pi y}{1-y}" />. Either way, <Katex tex="\tfrac{dV}{dy}=\pi x^2" /> is the area of the water surface: a little extra depth adds a thin disc of that area.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dt} = \frac{dV}{dt}\times\frac{dy}{dV} = 0.1\times\frac{1-y}{4\pi y}" />,
    reason: <>Chain rule: the rate the level rises is the rate volume flows in divided by the volume per metre of depth.</>,
  },
  {
    working: <Katex display tex="y=0.25: \quad \frac{dy}{dt} = 0.1\times\frac{0.75}{4\pi\times0.25} = \frac{3}{40\pi}" />,
    reason: <>Substitute the depth only after differentiating.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dt} \approx 0.024 \ \text{m per minute}}" />,
    reason: <><Katex tex="0.02387\ldots" />, correct to three decimal places.</>,
    more: <>Sanity check: at depth 0.25 the water surface has area <Katex tex="\pi x^2=\tfrac{4\pi}{3}\approx4.19" /> m², and <Katex tex="0.1\div4.19\approx0.024" />. The level rises more slowly as the pond widens.</>,
  },
]

export default function SpecialistQ1_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
        <p>
          Consider the function <Katex tex="f:[0,2]\to R,\ f(x)=1-\dfrac{4}{x^2+4}" />
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Rotating the curve about the <Katex tex="y" />-axis makes a bowl: flat at the bottom
              (the curve leaves the origin horizontally), 2 m in radius and 0.5 m deep at the top.
              Every part after a. is about that bowl, and all of them slice it horizontally, so
              everything has to be written in terms of <Katex tex="y" />.
            </p>
            <p>
              Discs give the volume (<Katex tex="\pi\int x^2\,dy" />), the formula-sheet surface
              area gives the membrane, and <Katex tex="\tfrac{dV}{dy}" /> is the area of the water
              surface at depth <Katex tex="y" />, which turns the inflow rate into a rate of rise.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Point of Inflection"
        marks={3}
        statement={
          <>
            <p>
              Sketch the graph of <Katex tex="y=f(x)" /> on the axes below, and label the point of
              inflection with its coordinates.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank axes from the original VCAA exam paper: x from 0 to 2, numbered at 1 and 2, with gridlines every 0.25; y from 0 to 0.5, numbered every 0.1, with gridlines every 0.05"
                className="w-full max-w-[460px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          The region bounded by the <Katex tex="y" />-axis, the graph of <Katex tex="y=f(x)" /> and
          the line <Katex tex="y=0.5" /> is rotated about the <Katex tex="y" />-axis to form a solid
          of revolution.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Write down a definite integral in terms of <Katex tex="y" /> that gives the volume of the solid of revolution.</>}
      >
        <WorkingTable rows={ROWS_BI} />
        <WrongMethod
          title="Use π∫f(x)² dx from 0 to 2"
          working={<Katex display tex="\pi\int_0^2\left(\frac{x^2}{x^2+4}\right)^2dx" />}
        >
          That is the volume of a different solid: the region under the curve spun about the{' '}
          <Katex tex="x" />-axis. Spinning about the <Katex tex="y" />-axis makes the discs
          horizontal, so their radius is <Katex tex="x" /> and their thickness is <Katex tex="dy" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Find the volume of the solid.</>}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Surface Area"
        marks={2}
        statement={
          <>
            <p>
              The solid of revolution is used to model an open fishpond where lengths are measured in
              metres. A waterproof membrane of negligible thickness is to be applied to the interior
              surface of the pond.
            </p>
            <p className="mt-2">
              Find the number of square metres of membrane needed. Give your answer correct to two
              decimal places.
            </p>
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Related Rates"
        marks={3}
        statement={
          <>
            <p>
              The pond, which is initially empty, is filled with water flowing in at a rate of 0.1
              cubic metres per minute.
            </p>
            <p className="mt-2">
              At what rate is the water level rising when the depth is <Katex tex="0.25\ \text{m}" />?
              Give your answer in metres per minute, correct to three decimal places.
            </p>
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
