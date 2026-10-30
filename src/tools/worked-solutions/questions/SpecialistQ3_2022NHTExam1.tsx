// 2022 Specialist NHT — Exam 1, Question 3 (3 marks). The NHT report gives sample answers only,
// with no statistics. Volume of the solid formed by rotating about the x-axis the region between
// y = x² − 2x + 1 = (x − 1)² and the line y = 1 − x through its intercepts (0, 1) and (1, 0): a
// washer integral, π∫₀¹((1 − x)² − (x − 1)⁴) dx = 2π/15. Question text transcribed from the
// original paper (read from a rendered page image); the paper prints no figure. The graph of the
// region (spec-2022nhte1-q3-region.png) is this site's own explanatory figure, drawn with
// matplotlib (the report prints a similar sketch in its sample answer; ours is not a copy of it).
// The Explore widget (interactives/spec-2022nhte1-q3-washer.tsx) shows each slice as a washer and
// the π(R − r)² trap. Answer checked with sympy and against the report's sample answer (2π/15).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import regionSrc from './spec-2022nhte1-q3-region.png'

const WasherWidget = lazyWidget(() => import('../interactives/spec-2022nhte1-q3-washer'))

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y=x^2-2x+1=(x-1)^2" />,
    reason: <>A perfect square. In this form the intercepts can be read straight off.</>,
  },
  {
    working: <Katex display tex="x=0:\ y=1;\qquad y=0:\ x=1" />,
    reason: <>The parabola touches the <Katex tex="x" />-axis at its turning point <Katex tex="(1,0)" />, its only <Katex tex="x" />-intercept, and cuts the <Katex tex="y" />-axis at <Katex tex="(0,1)" />.</>,
  },
  {
    working: <Katex display tex="\text{line through }(0,1)\text{ and }(1,0):\quad y=1-x" />,
    reason: <>Gradient <Katex tex="\tfrac{0-1}{1-0}=-1" /> and <Katex tex="y" />-intercept <Katex tex="1" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={regionSrc} alt="This site's own graph: the parabola y = (x − 1)² in blue and the line y = 1 − x in orange, meeting at (0, 1) and (1, 0), with the region between them on 0 ≤ x ≤ 1 shaded. A vertical slice at one x shows the outer radius R up to the line and the inner radius r up to the parabola." className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <>For <Katex tex="0<x<1" />, <Katex tex="0<1-x<1" />, and squaring a number between 0 and 1 makes it smaller, so <Katex tex="(1-x)^2<1-x" />: the line is on top. Rotated about the <Katex tex="x" />-axis, each slice is a washer with outer radius <Katex tex="R=1-x" /> and inner radius <Katex tex="r=(x-1)^2" />.</>,
    more: <>The region does not touch the <Katex tex="x" />-axis except at <Katex tex="x=1" />, so the solid has a hole down the middle: it is the solid made by the line (a cone) with the solid made by the parabola removed from inside it. That is exactly what the subtraction in the next line does.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} V&=\pi\int_0^1\left[(1-x)^2-\left((x-1)^2\right)^2\right]dx \\ &=\pi\int_0^1\left[(x-1)^2-(x-1)^4\right]dx \end{aligned}" />,
    reason: <>Washer formula: <Katex tex="V=\pi\int_a^b\left(R^2-r^2\right)dx" />, with the terminals at the two intersection points. Since <Katex tex="(1-x)^2=(x-1)^2" />, both terms become powers of <Katex tex="x-1" />.</>,
    more: <>Square each radius separately, then subtract. <Katex tex="\pi\int(R-r)^2\,dx" /> is a different (and wrong) quantity: here it gives <Katex tex="\tfrac{\pi}{30}" />, a quarter of the true volume. The widget below shows why.</>,
  },
  {
    working: <Katex display tex="=\pi\left[\frac{(x-1)^3}{3}-\frac{(x-1)^5}{5}\right]_0^1" />,
    reason: <>Antidifferentiate <Katex tex="(x-1)^n" /> as <Katex tex="\tfrac{(x-1)^{n+1}}{n+1}" />: the inside is linear with coefficient 1, so nothing else is needed.</>,
    more: <>Expanding <Katex tex="(x-1)^4" /> would also work, but keeping <Katex tex="x-1" /> as a block makes the upper terminal give zero at once.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &=\pi\left[(0-0)-\left(\frac{(-1)^3}{3}-\frac{(-1)^5}{5}\right)\right] \\ &=\pi\left(\frac13-\frac15\right) \end{aligned}" />,
    reason: <>At <Katex tex="x=1" /> both terms are <Katex tex="0" />. At <Katex tex="x=0" />: <Katex tex="\tfrac{(-1)^3}{3}=-\tfrac13" /> and <Katex tex="\tfrac{(-1)^5}{5}=-\tfrac15" />; subtracting that bracket changes both signs.</>,
  },
  {
    working: <Katex display tex="\boxed{V=\frac{2\pi}{15}\ \text{units}^3}" />,
    reason: <><Katex tex="\tfrac13-\tfrac15=\tfrac{5-3}{15}" />, so the volume is <Katex tex="\tfrac{2\pi}{15}" /> cubic units.</>,
    more: <>Check: <Katex tex="\tfrac\pi3" /> is the volume of the cone the line makes (radius 1, height 1, <Katex tex="\tfrac13\pi r^2h" />) and <Katex tex="\tfrac\pi5" /> is the solid the parabola makes, so the answer is cone minus inner solid ✓. As a size check, <Katex tex="\tfrac{2\pi}{15}\approx0.42" />, a bit under half the cone's <Katex tex="\tfrac\pi3\approx1.05" />. That fits: the shaded region is a thin crescent, much narrower than the triangle under the line.</>,
  },
]

export default function SpecialistQ3_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (3 marks)</p>
        <p>
          The region enclosed by the graph of <Katex tex="y=x^2-2x+1" /> and the straight line
          that passes through the <Katex tex="x" /> and <Katex tex="y" /> intercepts of this
          parabola is rotated about the <Katex tex="x" />-axis to form a solid of revolution.
        </p>
        <p>Find the volume of this solid of revolution.</p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Rotating a region that lies between two curves (rather than between one curve and
            the axis) gives a solid with a hole in it. Each thin slice is a <b>washer</b>: a disc
            of the outer radius <Katex tex="R" /> with a disc of the inner radius{' '}
            <Katex tex="r" /> cut out, area <Katex tex="\pi R^2-\pi r^2" />. So{' '}
            <Katex tex="V=\pi\int_a^b\left(R^2-r^2\right)dx" />, where <Katex tex="R" /> is
            whichever curve is further from the axis of rotation.
          </p>
          <p>
            The question gives no diagram, so the first job is to sketch one: find the
            intercepts, the line, and which curve is on top between them.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Each slice is a washer: π(R² − r²), not π(R − r)²">
          <WasherWidget />
        </Explore>
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
