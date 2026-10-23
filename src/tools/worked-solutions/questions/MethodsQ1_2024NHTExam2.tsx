// 2024 Mathematical Methods NHT — Exam 2, Section B Question 1 (10 marks). The NHT report gives
// sample answers only, with no statistics. The cubic f(x) = x³ − px: x-intercepts and turning
// points when p = 3, the values of p giving one or no stationary points, the tangent at the
// origin, the area between f and that tangent up to x = p, and the cubics y = kx³ with the same
// area. Question text transcribed from the original paper; the graph of f for p = 3 is cropped
// from the original VCAA exam PDF at 300 dpi (meth-2024nhte2-q1-graph.png). The figure in d.ii
// (meth-2024nhte2-q1dii-region.png) is this site's own explanatory matplotlib graph of the region
// for p = 3, which VCAA never printed. Answers checked with sympy and against the VCAA report's
// sample answers: a. 0, ±√3; b. (−1, 2), (1, −2); c.i. p = 0; c.ii. p < 0; d.ii. p⁴/4;
// d.iii. k = ±1. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, DetailOnly } from '../QuestionParts'
import graphSrc from './meth-2024nhte2-q1-graph.png'
import regionSrc from './meth-2024nhte2-q1dii-region.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^3-3x = x\left(x^2-3\right) = 0" />,
    reason: <>With <Katex tex="p=3" />, set <Katex tex="f(x)=0" /> and take out the common factor <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -\sqrt3,\ 0,\ \sqrt3}" />,
    reason: <>Either <Katex tex="x=0" /> or <Katex tex="x^2=3" />. Exact values, as the Section B instructions require.</>,
    more: <>Check against the printed graph: three crossings, one at the origin and the other two equally far either side (<Katex tex="\sqrt3\approx1.73" />), since <Katex tex="f" /> is odd.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 3x^2-3" />,
    reason: <>Differentiate term by term, with <Katex tex="p=3" />. The question asks for the derivative to be used, so show it.</>,
  },
  {
    working: <Katex display tex="3x^2-3 = 0 \implies x^2 = 1 \implies x = \pm1" />,
    reason: <>Turning points are where the gradient is zero.</>,
  },
  {
    working: <Katex display tex="f(-1) = -1+3 = 2, \qquad f(1) = 1-3 = -2" />,
    reason: <>Substitute each <Katex tex="x" /> back into <Katex tex="f" /> (not <Katex tex="f'" />) for the <Katex tex="y" />-coordinates.</>,
  },
  {
    working: <Katex display tex="\boxed{(-1,\ 2) \ \text{ and } \ (1,\ -2)}" />,
    reason: <>A local maximum at <Katex tex="(-1,2)" /> and a local minimum at <Katex tex="(1,-2)" />, matching the printed graph.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 3x^2-p = 0 \iff x^2 = \frac{p}{3}" />,
    reason: <>For a general <Katex tex="p" />, stationary points are where <Katex tex="f'(x)=0" />. The number of stationary points is the number of solutions of <Katex tex="x^2=\tfrac p3" />.</>,
    more: <>A square equal to a positive number has two solutions, equal to zero has one, and equal to a negative number has none. Parts c.i. and c.ii. are the last two cases.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0}" />,
    reason: <>Exactly one solution, <Katex tex="x=0" />, only when <Katex tex="\tfrac p3=0" />.</>,
    more: <>Then <Katex tex="f(x)=x^3" />, whose single stationary point is the stationary point of inflection at the origin.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="x^2 = \frac{p}{3} \text{ has no real solutions when } \frac p3 < 0" />,
    reason: <>A square is never negative.</>,
  },
  {
    working: <Katex display tex="\boxed{p < 0}" />,
    reason: <>Then <Katex tex="f'(x)=3x^2-p=3x^2+|p|>0" /> for every <Katex tex="x" />, so the graph is always increasing and never flat.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 3x^2-p" />,
    reason: <>&ldquo;Use calculus&rdquo;: the gradient of the tangent at a point is the derivative there.</>,
  },
  {
    working: <Katex display tex="f'(0) = -p" />,
    reason: <>So the tangent at the origin has gradient <Katex tex="-p" />.</>,
  },
  {
    working: <Katex display tex="y - 0 = -p\,(x-0)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> through <Katex tex="(0,0)" />, which is on the graph since <Katex tex="f(0)=0" />.</>,
    more: <>VCAA writes this as <Katex tex="y=-px+c" /> with <Katex tex="c=0" /> because the line passes through the origin. Same thing.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -px}" />,
    reason: <>As required.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)-(-px) = x^3-px+px = x^3" />,
    reason: <>Area between two curves is the integral of (upper − lower). For <Katex tex="0<x<p" />, <Katex tex="x^3>0" />, so <Katex tex="f" /> is above the tangent line throughout.</>,
    more: <>The bounds are where the region starts and stops: the curve and line meet at the origin (the point of tangency), and the region is closed off on the right by <Katex tex="x=p" />.</>,
  },
  {
    working: <Katex display tex="A = \int_0^p \left(f(x)+px\right)dx = \int_0^p x^3\,dx" />,
    reason: <>The <Katex tex="-px" /> in <Katex tex="f" /> and the <Katex tex="+px" /> from subtracting the line cancel.</>,
  },
  {
    working: <Katex display tex="= \left[\frac{x^4}{4}\right]_0^p = \frac{p^4}{4}-0" />,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{p^4}{4}}" />,
    reason: <>In terms of <Katex tex="p" />, as asked.</>,
    more: <>Check with <Katex tex="p=3" />: <Katex tex="\tfrac{81}{4}=20.25" />. In the figure above the region runs 3 units across and up to 27 units tall at the right edge, and is a thin sliver near the origin, so about a quarter of <Katex tex="3\times27" /> is plausible.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^p \left|kx^3\right|dx = |k|\,\frac{p^4}{4}" />,
    reason: <>For <Katex tex="k>0" /> the curve <Katex tex="y=kx^3" /> is above the <Katex tex="x" />-axis on <Katex tex="(0,p)" />, giving area <Katex tex="\tfrac{kp^4}{4}" />. For <Katex tex="k<0" /> it is below, and the area is <Katex tex="-\tfrac{kp^4}{4}" />.</>,
    more: <>Area is never negative. A curve below the axis gives a negative integral, so its area is the integral's negative.</>,
  },
  {
    working: <Katex display tex="|k|\,\frac{p^4}{4} = \frac{p^4}{4} \implies |k| = 1" />,
    reason: <>Match the area from part d.ii.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \pm1}" />,
    reason: <>&ldquo;All possible values&rdquo; is the hint that there is more than one: <Katex tex="y=x^3" /> and its reflection <Katex tex="y=-x^3" /> enclose the same area.</>,
    more: <>Notice why part d.ii. came out this way: subtracting the tangent line removed <Katex tex="-px" /> from <Katex tex="f" />, leaving exactly <Katex tex="x^3" />, so the region between <Katex tex="f" /> and its tangent has the same area as the region under <Katex tex="y=x^3" />.</>,
  },
]

export default function MethodsQ1_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
        <p>
          Consider the function <Katex tex="f:R\to R,\ f(x)=x^3-px" />, where <Katex tex="p\in R" />.
          <br />
          Part of the graph of <Katex tex="f" /> is shown below, when <Katex tex="p=3" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="Part of the graph of y = x³ − 3x, with no scale marked: rising to a local maximum left of the y-axis, falling through the origin to a local minimum on the right, then rising steeply; it crosses the x-axis three times — from the original VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts a. and b. use the particular cubic <Katex tex="x^3-3x" />. Parts c. and d. keep{' '}
              <Katex tex="p" /> as a letter, so every answer there is about the whole family of
              cubics <Katex tex="x^3-px" />.
            </p>
            <p>
              The key fact for c. is that <Katex tex="f'(x)=3x^2-p" /> is a quadratic, and{' '}
              <Katex tex="3x^2=p" /> has two, one or no solutions depending on the sign of{' '}
              <Katex tex="p" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="x-Intercepts"
        marks={1}
        statement={<>Find the values of the <Katex tex="x" />-intercepts of <Katex tex="f" />, when <Katex tex="p=3" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Turning Points"
        marks={2}
        statement={
          <>
            Use the derivative <Katex tex="f'" /> to find the coordinates of the turning points of{' '}
            <Katex tex="f" />, when <Katex tex="p=3" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Stationary Points"
        marks={1}
        statement={<>Find the value of <Katex tex="p" /> for which <Katex tex="f" /> would have exactly one stationary point.</>}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Stationary Points"
        marks={1}
        statement={<>Find the values of <Katex tex="p" /> for which <Katex tex="f" /> would not have any stationary points.</>}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          The graph of <Katex tex="f" /> passes through the origin for all values of <Katex tex="p" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Tangent Line"
        marks={2}
        statement={
          <>
            Use calculus to show that the tangent line to <Katex tex="f" /> at the origin has the
            equation <Katex tex="y=-px" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find, in terms of <Katex tex="p" />, the area of the region bounded by the function{' '}
            <Katex tex="f" />, the line <Katex tex="y=-px" /> and the line <Katex tex="x=p" />,
            where <Katex tex="p>0" />.
          </>
        }
      >
        <Background title="What the Region Looks Like">
          <p>
            This site&apos;s own graph for the case <Katex tex="p=3" /> (not printed by VCAA): the
            tangent <Katex tex="y=-3x" /> touches the cubic at the origin, and the shaded region lies
            between them up to <Katex tex="x=3" />.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={regionSrc}
              alt="This site's explanatory graph for p = 3: the cubic y = x³ − 3x in blue, its tangent at the origin y = −3x in orange, and the dashed line x = 3; the region between the cubic (above) and the tangent (below) from x = 0 to x = 3 is shaded"
              className="w-full max-w-[380px]"
            />
          </div>
        </Background>
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="d.iii"
        topic="Equal Areas"
        marks={1}
        statement={
          <>
            The expression for the area found in <b>part d.ii</b> also gives the area bounded by a
            cubic function <Katex tex="y=kx^3" />, the <Katex tex="x" />-axis and the line{' '}
            <Katex tex="x=p" />, where <Katex tex="p>0" />.
            <br />
            Find all possible values of <Katex tex="k" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_DIII} />
      </PartCard>
    </div>
  )
}
