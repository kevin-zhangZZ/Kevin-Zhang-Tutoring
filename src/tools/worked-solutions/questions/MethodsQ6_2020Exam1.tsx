// 2020 Mathematical Methods — Exam 1, Question 6 (8 marks). The inverse of a square-root
// function, its graph, and the area between the two curves either side of their
// intersection. Question text transcribed from the original paper; the printed axes are a
// crop of VCAA's own artwork, and the part b. sketch and the part c. regions are SVG overlays
// on that crop (never a redrawing of it). Calibration measured from the crop's own gridlines
// (300 dpi): origin at (234.5, 889.5), 315 px per unit on both axes; checked with a PIL
// composite — the calibrated f(x) = √(x/2) lies exactly on VCAA's printed curve. Answers checked with sympy and against the VCAA examination
// report. Solution is original. Interactive diagrams (§15): part b. drags a point along f to
// trace its mirror image f⁻¹ (interactives/meth-2020e1-q6b-mirror.tsx); part c. sweeps a strip
// across both regions, with a toggle showing a single unsplit integral going negative
// (interactives/meth-2020e1-q6c-strips.tsx).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { functionToPath } from '../graphUtils'
import axesSrc from './meth-2020e1-q6-graph.png'

const MirrorWidget = lazyWidget(() => import('../interactives/meth-2020e1-q6b-mirror'))
const StripsWidget = lazyWidget(() => import('../interactives/meth-2020e1-q6c-strips'))

const OX = 234.5
const OY = 889.5
const S = 315
const toX = (x: number) => OX + x * S
const toY = (y: number) => OY - y * S
const f = (x: number) => Math.sqrt(x / 2)
const fInv = (x: number) => 2 * x * x
const ORANGE = '#f97316'
const GREEN = '#16a34a'

// Part b.: f⁻¹ drawn over VCAA's own axes, which already carry f.
function InverseOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[380px]">
        <img loading="lazy" decoding="async" src={axesSrc} alt="VCAA's axes with f(x) = √x/√2 from (0, 0) to (2, 1), and the answer f⁻¹(x) = 2x² drawn over them from (0, 0) to (1, 2), crossing f at (1/2, 1/2)" className="w-full block" />
        <svg viewBox="0 0 1110 1060" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={functionToPath(fInv, 0, 1, toX, toY)} fill="none" stroke={ORANGE} strokeWidth={6} />
          <circle cx={toX(1)} cy={toY(2)} r={13} fill={ORANGE} />
          <circle cx={toX(0.5)} cy={toY(0.5)} r={13} fill={GREEN} />
          <text x={toX(1) + 26} y={toY(2) + 14} fontSize={44} fill="#c2410c" stroke="white" strokeWidth={10} paintOrder="stroke">(1, 2)</text>
          <text x={toX(0.56)} y={toY(0.3)} fontSize={44} fill="#15803d" stroke="white" strokeWidth={10} paintOrder="stroke">(1/2, 1/2)</text>
        </svg>
      </div>
    </div>
  )
}

// Part c.: the two regions shaded on the same axes.
function RegionsOverlay() {
  const n = 120
  const between = (a: number, b: number, top: (x: number) => number, bottom: (x: number) => number) => {
    let d = ''
    for (let i = 0; i <= n; i++) {
      const x = a + ((b - a) * i) / n
      d += `${i === 0 ? 'M' : 'L'} ${toX(x)} ${toY(top(x))} `
    }
    for (let i = n; i >= 0; i--) {
      const x = a + ((b - a) * i) / n
      d += `L ${toX(x)} ${toY(bottom(x))} `
    }
    return d + 'Z'
  }
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[380px]">
        <img loading="lazy" decoding="async" src={axesSrc} alt="VCAA's axes with f and f⁻¹: region A₁ shaded between the curves from x = 0 to x = 1/2, and region A₂ shaded between them from x = 1/2 to the dashed line x = 1" className="w-full block" />
        <svg viewBox="0 0 1110 1060" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={between(0, 0.5, f, fInv)} fill="#0ea5e9" fillOpacity={0.3} />
          <path d={between(0.5, 1, fInv, f)} fill={ORANGE} fillOpacity={0.3} />
          <path d={functionToPath(fInv, 0, 1, toX, toY)} fill="none" stroke={ORANGE} strokeWidth={6} />
          <line x1={toX(1)} y1={toY(-0.45)} x2={toX(1)} y2={toY(2.45)} stroke="#334155" strokeWidth={5} strokeDasharray="18 12" />
          <text x={toX(1) + 18} y={toY(1.5)} fontSize={44} fill="#334155" stroke="white" strokeWidth={10} paintOrder="stroke">x = 1</text>
          <text x={toX(0.26)} y={toY(0.16)} fontSize={44} fontWeight={700} fill="#0369a1" textAnchor="middle">A<tspan dy={12} fontSize={30}>1</tspan></text>
          <text x={toX(0.8)} y={toY(0.95)} fontSize={48} fontWeight={700} fill="#c2410c" textAnchor="middle">A<tspan dy={12} fontSize={32}>2</tspan></text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [17, 29, 54],
  average: 1.4,
  comment: (
    <>
      Students confidently attempted this question; however, some did not use notation well.
      Many students left their answer as <Katex tex="y=2x^2" />, thus assuming <Katex tex="f(x)" />{' '}
      <em>was the same as</em> <Katex tex="f^{-1}(x)" />, in contradiction to their prior working.
      Some students did not state the required domain, or expressed it incorrectly
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 12, 69],
  average: 1.5,
  comment: (
    <>
      Most students correctly identified the endpoint at <Katex tex="(1,2)" />, but some students
      either plotted it in the incorrect position, or continued the graph beyond this end point.
      Some graphs lacked curvature and became vertical as <Katex tex="x" /> approached 1. The
      point of intersection was generally correctly obtained, but often not plotted in the
      correct position.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [28, 22, 23, 18, 10],
  average: 1.6,
  comment: (
    <>
      Most students recognised at least one of the two required areas and generally obtained
      a correct anti-derivative, though often not all the correct anti-derivatives required.
      Errors in evaluating definite integrals and answering in the format specified by the
      question were common. Those students who took care with setting out their working and did
      not attempt to do several steps in one line of working generally scored well.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{1}{\sqrt2}\sqrt x" />,
    reason: <>Start from <Katex tex="y=f(x)" />. For the inverse, swap <Katex tex="x" /> and <Katex tex="y" />, then make the new <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x = \frac{1}{\sqrt2}\sqrt y \implies \sqrt2\,x = \sqrt y" />,
    reason: <>Swapping <Katex tex="x" /> and <Katex tex="y" />, then multiplying through by <Katex tex="\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="y = 2x^2" />,
    reason: <>Squaring both sides.</>,
    more: <>Squaring is safe here: both sides are non-negative, because the new <Katex tex="x" /> is an output of <Katex tex="f" />, so <Katex tex="x\ge0" />. That is also why the inverse is only the right-hand half of the parabola <Katex tex="y=2x^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 2x^2}" />,
    reason: <>Name the answer <Katex tex="f^{-1}(x)=\ldots" />, not <Katex tex="y=\ldots" />.</>,
    more: <>Throughout the working <Katex tex="y" /> stood for <Katex tex="f(x)" />, so leaving the answer as <Katex tex="y=2x^2" /> says <Katex tex="f(x)=2x^2" /> — the report notes many students did this, in contradiction to their prior working.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(2) = \frac{\sqrt2}{\sqrt2} = 1" />,
    reason: <>The range of <Katex tex="f" /> over its domain <Katex tex="[0,2]" />; <Katex tex="f" /> is increasing, so the endpoints give the ends of the range.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{domain } f^{-1} = \text{range } f = [0,1]}" />,
    reason: <>An inverse swaps inputs and outputs, so its domain is the range of <Katex tex="f" />.</>,
    more: <>The report notes some students did not state the domain, or expressed it incorrectly. <Katex tex="[0,1]" /> is closed at both ends because <Katex tex="f" />'s domain <Katex tex="[0,2]" /> includes both endpoints. Writing <Katex tex="f^{-1}:[0,1]\to R,\ f^{-1}(x)=2x^2" /> gives domain and rule together.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f^{-1}:[0,1]\to R, \quad f^{-1}(x) = 2x^2" />,
    reason: <>From part a. Everything is a reflection of the printed curve in the line <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="\text{endpoints } (0,0) \text{ and } (1,2)" />,
    reason: <>The printed endpoints <Katex tex="(0,0)" /> and <Katex tex="(2,1)" /> with their coordinates swapped. The curve <em>stops</em> at <Katex tex="(1,2)" />.</>,
  },
  {
    working: <Katex display tex="f(x) = f^{-1}(x) \iff f(x) = x \implies \frac{\sqrt x}{\sqrt2} = x" />,
    reason: <>For an <em>increasing</em> function, <Katex tex="f" /> and <Katex tex="f^{-1}" /> can only meet on the mirror line <Katex tex="y=x" />, so solve the easier equation <Katex tex="f(x)=x" />.</>,
    more: <>Why: a meeting point lies on a curve <em>and</em> on its mirror image in <Katex tex="y=x" />. For an increasing function that only happens on the mirror line itself. Solving <Katex tex="f(x)=x" /> gives a quadratic after squaring; solving <Katex tex="\tfrac{\sqrt x}{\sqrt2}=2x^2" /> directly gives a quartic. Careful: a <em>decreasing</em> function can meet its inverse off the line, e.g. <Katex tex="y=-x^3" /> meets its inverse at <Katex tex="(1,-1)" />. Drag the point in the diagram below to see the reflection happen.</>,
  },
  {
    working: <Katex display tex="\frac{x}{2} = x^2 \implies x\left(x-\tfrac12\right) = 0 \implies x = 0,\ \tfrac12" />,
    reason: <>Squaring, then factorising. Both roots satisfy <Katex tex="\tfrac{\sqrt x}{\sqrt2}=x" />, and the points lie on <Katex tex="y=x" />, so they are <Katex tex="(0,0)" /> and <Katex tex="\left(\tfrac12,\tfrac12\right)" />.</>,
  },
  {
    working: <InverseOverlay />,
    reason: <>Label the endpoint <Katex tex="(1,2)" /> and the intersections <Katex tex="(0,0)" /> and <Katex tex="\left(\tfrac12,\tfrac12\right)" />. The curve stays curved up to <Katex tex="(1,2)" /> and stops there.</>,
    more: <>(<Katex tex="(0,0)" /> is already labelled on the printed axes.) The report notes some graphs continued beyond the end point, and some lacked curvature and became vertical as <Katex tex="x" /> approached 1. <Katex tex="f^{-1}(x)=2x^2" /> is a parabola: its gradient at <Katex tex="x=1" /> is <Katex tex="4" />, steep but not vertical, and it leaves the origin flat (horizontal), mirroring <Katex tex="f" />'s vertical start. The report also notes the intersection was often plotted in the wrong position: <Katex tex="\left(\tfrac12,\tfrac12\right)" /> sits exactly on the first gridline crossing along <Katex tex="y=x" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <RegionsOverlay />,
    reason: <>The curves swap over at <Katex tex="x=\tfrac12" />, so the two regions need separate integrals — and in each one the upper curve is different. Call their areas <Katex tex="A_1" /> (left) and <Katex tex="A_2" /> (right).</>,
  },
  {
    working: <Katex display tex="A_1 = \int_0^{1/2}\left(\frac{\sqrt x}{\sqrt2}-2x^2\right)dx" />,
    reason: <>Left of the intersection, <Katex tex="f" /> is above <Katex tex="f^{-1}" />.</>,
  },
  {
    working: <Katex display tex="A_2 = \int_{1/2}^{1}\left(2x^2-\frac{\sqrt x}{\sqrt2}\right)dx" />,
    reason: <>Right of it they swap, and the region closes at the line <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \int\frac{x^{1/2}}{\sqrt2}\,dx &= \frac{2x^{3/2}}{3\sqrt2} = \frac{\sqrt2\,x^{3/2}}{3} \\ \int2x^2\,dx &= \frac{2x^3}{3} \end{aligned}" />,
    reason: <>The two antiderivatives, each used twice: raise the power by 1 and divide by the new power, then rationalise: <Katex tex="\tfrac{2}{3\sqrt2}=\tfrac{2\sqrt2}{3\cdot2}=\tfrac{\sqrt2}{3}" />.</>,
  },
  {
    working: <Katex display tex="A_1 = \left[\frac{\sqrt2\,x^{3/2}}{3}-\frac{2x^3}{3}\right]_0^{1/2} = \frac{\sqrt2}{3}\cdot\frac{1}{2\sqrt2}-\frac{2}{3}\cdot\frac18" />,
    reason: <>Substitute the upper limit <Katex tex="x=\tfrac12" />; the bracket at <Katex tex="x=0" /> is <Katex tex="0" />. Use <Katex tex="\left(\tfrac12\right)^{3/2}=\tfrac1{2\sqrt2}" /> and <Katex tex="\left(\tfrac12\right)^3=\tfrac18" />.</>,
  },
  {
    working: <Katex display tex="A_1 = \tfrac16-\tfrac1{12} = \tfrac1{12}" />,
    reason: <>The <Katex tex="\sqrt2" /> cancels in the first product, <Katex tex="\tfrac{\sqrt2}{3}\cdot\tfrac1{2\sqrt2}=\tfrac16" />, and <Katex tex="\tfrac23\cdot\tfrac18=\tfrac1{12}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} A_2 &= \left[\frac{2x^3}{3}-\frac{\sqrt2\,x^{3/2}}{3}\right]_{1/2}^{1} \\ &= \left(\tfrac23-\tfrac{\sqrt2}3\right)-\left(\tfrac1{12}-\tfrac16\right) \end{aligned}" />,
    reason: <>Same antiderivatives, opposite order, so the bracket at <Katex tex="\tfrac12" /> is <Katex tex="A_1" />'s bracket at <Katex tex="\tfrac12" /> with its sign flipped.</>,
  },
  {
    working: <Katex display tex="A_2 = \tfrac23-\tfrac{\sqrt2}3+\tfrac1{12} = \tfrac34-\tfrac{\sqrt2}{3}" />,
    reason: <>Collecting the rationals: <Katex tex="\tfrac23+\tfrac1{12}=\tfrac9{12}=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="A_1+A_2 = \tfrac1{12}+\tfrac34-\tfrac{\sqrt2}3 = \tfrac56-\tfrac{\sqrt2}{3}" />,
    reason: <><Katex tex="\tfrac1{12}+\tfrac9{12}=\tfrac{10}{12}=\tfrac56" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{5-2\sqrt2}{6}}" />,
    reason: <>Over a common denominator, <Katex tex="\tfrac56-\tfrac{2\sqrt2}{6}" />: the required form <Katex tex="\tfrac{a-b\sqrt b}{6}" /> with <Katex tex="a=5" />, <Katex tex="b=2" /> (since <Katex tex="2\sqrt2" /> is <Katex tex="b\sqrt b" /> when <Katex tex="b=2" />).</>,
    more: <>Check: numerically <Katex tex="A_1\approx0.083" /> and <Katex tex="A_2\approx0.279" />, total <Katex tex="0.362" />, which fits the two small shaded pieces. The report notes errors in evaluating the definite integrals and in answering in the specified format were common, and that students who set out their working carefully, without doing several steps in one line, generally scored well — hence one step per row here.</>,
  },
]

export default function MethodsQ6_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (8 marks)</p>
        <p>
          Let <Katex tex="f:[0,2]\to R" />, where{' '}
          <Katex tex="f(x)=\dfrac{1}{\sqrt2}\sqrt x" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Inverse Function"
        marks={2}
        statement={
          <>
            Find the domain and the rule for <Katex tex="f^{-1}" />, the inverse function of{' '}
            <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The graph of <Katex tex="y=f(x)" />, where <Katex tex="x\in[0,2]" />, is shown on the
          axes below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={axesSrc}
            alt="Gridded axes from −1/2 to 5/2, with gridlines every 1/2, and the curve f(x) = √x/√2 drawn from (0, 0) up to (2, 1) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        topic="Sketch Inverse"
        marks={2}
        statement={
          <>
            On the axes above, sketch the graph of <Katex tex="f^{-1}" /> over its domain.
            Label the endpoints and point(s) of intersection with the function{' '}
            <Katex tex="f" />, giving their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the inverse is a mirror image, and why the curves meet on y = x">
          <MirrorWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Between Curves"
        marks={4}
        statement={
          <>
            Find the total area of the two regions: one region bounded by the functions{' '}
            <Katex tex="f" /> and <Katex tex="f^{-1}" />, and the other region bounded by{' '}
            <Katex tex="f" />, <Katex tex="f^{-1}" /> and the line <Katex tex="x=1" />. Give
            your answer in the form <Katex tex="\dfrac{a-b\sqrt b}{6}" />, where{' '}
            <Katex tex="a,b\in Z^+" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="An area is a sum of strips — and here the top curve changes halfway">
          <StripsWidget />
        </Explore>
        <WrongMethod
          title="Integrate f − f⁻¹ from 0 to 1 in one go"
          working={<Katex display tex="\int_0^1\left(\frac{\sqrt x}{\sqrt2}-2x^2\right)dx = \frac{\sqrt2}{3}-\frac23 = \frac{\sqrt2-2}{3}" />}
        >
          The answer is negative, which no area can be — that is the giveaway. Right of{' '}
          <Katex tex="x=\tfrac12" /> the curve <Katex tex="f^{-1}" /> is on top, so there{' '}
          <Katex tex="f-f^{-1}<0" /> and the integral <em>subtracts</em> region <Katex tex="A_2" /> instead of adding it:
          you get <Katex tex="A_1-A_2" />, not <Katex tex="A_1+A_2" />. Whenever the curves cross inside the
          interval, split at the crossing and take top minus bottom in each piece.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
