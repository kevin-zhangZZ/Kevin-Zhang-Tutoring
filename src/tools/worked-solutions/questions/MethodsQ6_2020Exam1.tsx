// 2020 Mathematical Methods — Exam 1, Question 6 (8 marks). The inverse of a square-root
// function, its graph, and the area between the two curves either side of their
// intersection. Question text transcribed from the original paper; the printed axes are a
// crop of VCAA's own artwork, and the part b. sketch and the part c. regions are SVG overlays
// on that crop (never a redrawing of it). Calibration measured from the crop's own gridlines
// (300 dpi): origin at (234.5, 889.5), 315 px per unit on both axes; checked with a PIL
// composite — the calibrated f(x) = √(x/2) lies exactly on VCAA's printed curve. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import axesSrc from './meth-2020e1-q6-graph.png'

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
        <img src={axesSrc} alt="VCAA's axes with f(x) = √x/√2 from (0, 0) to (2, 1), and the answer f⁻¹(x) = 2x² drawn over them from (0, 0) to (1, 2), crossing f at (1/2, 1/2)" className="w-full block" />
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
        <img src={axesSrc} alt="VCAA's axes with f and f⁻¹: region A shaded between the curves from x = 0 to x = 1/2, and region B shaded between them from x = 1/2 to the dashed line x = 1" className="w-full block" />
        <svg viewBox="0 0 1110 1060" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={between(0, 0.5, f, fInv)} fill="#0ea5e9" fillOpacity={0.3} />
          <path d={between(0.5, 1, fInv, f)} fill={ORANGE} fillOpacity={0.3} />
          <path d={functionToPath(fInv, 0, 1, toX, toY)} fill="none" stroke={ORANGE} strokeWidth={6} />
          <line x1={toX(1)} y1={toY(-0.45)} x2={toX(1)} y2={toY(2.45)} stroke="#334155" strokeWidth={5} strokeDasharray="18 12" />
          <text x={toX(1) + 18} y={toY(1.5)} fontSize={44} fill="#334155" stroke="white" strokeWidth={10} paintOrder="stroke">x = 1</text>
          <text x={toX(0.26)} y={toY(0.16)} fontSize={44} fontWeight={700} fill="#0369a1" textAnchor="middle">A</text>
          <text x={toX(0.8)} y={toY(0.95)} fontSize={48} fontWeight={700} fill="#c2410c" textAnchor="middle">B</text>
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
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 2x^2}" />,
    reason: <>Write it as <Katex tex="f^{-1}(x)=\ldots" /> — the report notes many students left their answer as <Katex tex="y=2x^2" />, which says <Katex tex="f(x)" /> was the same as <Katex tex="f^{-1}(x)" />.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(2) = \frac{\sqrt2}{\sqrt2} = 1" />,
    reason: <>The range of <Katex tex="f" /> over its domain <Katex tex="[0,2]" />; <Katex tex="f" /> is increasing, so the endpoints give the ends of the range.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{domain } f^{-1} = \text{range } f = [0,1]}" />,
    reason: <>The question asks for the domain as well as the rule — the report notes some students did not state it, or expressed it incorrectly.</>,
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
    reason: <>Reflections in <Katex tex="y=x" /> meet on that line, so solve <Katex tex="f(x)=x" /> rather than <Katex tex="f=f^{-1}" />.</>,
  },
  {
    working: <Katex display tex="\frac{x}{2} = x^2 \implies x\left(x-\tfrac12\right) = 0 \implies x = 0,\ \tfrac12" />,
    reason: <>Squaring, then factorising.</>,
  },
  {
    working: <InverseOverlay />,
    reason: <>The answer drawn on VCAA's axes, with the endpoint and intersections labelled: the endpoint <Katex tex="(1,2)" /> and the intersections <Katex tex="(0,0)" /> and <Katex tex="\left(\tfrac12,\tfrac12\right)" />. (<Katex tex="(0,0)" /> is already labelled on the printed axes). The curve must stay curved right up to <Katex tex="(1,2)" /> and stop there — the report notes some graphs became vertical as <Katex tex="x" /> approached <Katex tex="1" />, or continued beyond the end point.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <RegionsOverlay />,
    reason: <>The curves swap over at <Katex tex="x=\tfrac12" />, so the two regions need separate integrals — and in each one the upper curve is different.</>,
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
    working: <Katex display tex="\int\frac{x^{1/2}}{\sqrt2}\,dx = \frac{2x^{3/2}}{3\sqrt2} = \frac{\sqrt2\,x^{3/2}}{3}, \qquad \int2x^2\,dx = \frac{2x^3}{3}" />,
    reason: <>The two antiderivatives, each used twice.</>,
  },
  {
    working: <Katex display tex="A_1 = \left[\frac{\sqrt2\,x^{3/2}}{3}-\frac{2x^3}{3}\right]_0^{1/2} = \frac{\sqrt2}{3}\cdot\frac{1}{2\sqrt2}-\frac{2}{3}\cdot\frac18" />,
    reason: <><Katex tex="\left(\tfrac12\right)^{3/2}=\tfrac1{2\sqrt2}" />.</>,
  },
  {
    working: <Katex display tex="A_1 = \tfrac16-\tfrac1{12} = \tfrac1{12}" />,
    reason: <>Evaluating.</>,
  },
  {
    working: <Katex display tex="A_2 = \left[\frac{2x^3}{3}-\frac{\sqrt2\,x^{3/2}}{3}\right]_{1/2}^{1} = \left(\tfrac23-\tfrac{\sqrt2}3\right)-\left(\tfrac1{12}-\tfrac16\right)" />,
    reason: <>Same antiderivatives, opposite order.</>,
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
    reason: <>The required form <Katex tex="\tfrac{a-b\sqrt b}{6}" /> with <Katex tex="a=5" />, <Katex tex="b=2" />. Numerically <Katex tex="0.362" />, which matches the two small shaded pieces. The report notes errors in evaluating the definite integrals and in answering in the specified format were common.</>,
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
          <img
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
      </PartCard>
    </div>
  )
}
