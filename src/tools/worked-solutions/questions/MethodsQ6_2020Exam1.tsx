// 2020 Mathematical Methods — Exam 1, Question 6 (8 marks). The inverse of a square-root
// function, its graph, and the area between the two curves either side of their
// intersection. Question text transcribed from the original paper; the printed axes are a
// crop of VCAA's own artwork, while the part (b) sketch and the part (c) regions are this
// site's own matplotlib figures. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import axesSrc from './meth-2020e1-q6-graph.png'
import invSrc from './meth-2020e1-q6b-inverse.png'
import regionsSrc from './meth-2020e1-q6c-regions.png'

const EXAM_A: SAExaminerStats = {
  marks: [17, 29, 54],
  average: 1.4,
  comment: (
    <>
      Many students left their answer as <Katex tex="y=2x^2" />, thus assuming{' '}
      <Katex tex="f(x)\equiv f^{-1}(x)" />, in contradiction to their prior working. Some
      students did not state the required domain, or expressed it incorrectly.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 12, 69],
  average: 1.5,
  comment: (
    <>
      Most students correctly identified the endpoint at <Katex tex="(1,2)" />, but some
      plotted it in the incorrect position, or continued the graph beyond this end point.
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
      a correct antiderivative, though often not all of them. Errors in evaluating definite
      integrals and answering in the format specified by the question were common. Those
      students who took care with setting out and did not attempt several steps in one line
      generally scored well.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{1}{\sqrt2}\sqrt x" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make the new <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x = \frac{1}{\sqrt2}\sqrt y \implies \sqrt2\,x = \sqrt y" />,
    reason: <>Multiplying through by <Katex tex="\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="y = 2x^2" />,
    reason: <>Squaring both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 2x^2}" />,
    reason: <>Write it as <Katex tex="f^{-1}(x)=\ldots" />, not <Katex tex="y=2x^2" /> — the report notes that reads as a claim about <Katex tex="f" /> itself.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(2) = \frac{\sqrt2}{\sqrt2} = 1" />,
    reason: <>The range of <Katex tex="f" /> over its domain <Katex tex="[0,2]" />; <Katex tex="f" /> is increasing, so the endpoints give the ends of the range.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{domain } f^{-1} = \text{range } f = [0,1]}" />,
    reason: <>Half the marks are for the domain, so state it.</>,
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
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={invSrc}
          alt="The printed curve y = f(x) from (0, 0) to (2, 1) together with its mirror image y = f inverse of x from (0, 0) to (1, 2), the two crossing on the dotted line y = x at the half, half point"
          className="w-full max-w-[350px]"
        />
      </div>
    ),
    reason: <>Both labelled points marked: the endpoint <Katex tex="(1,2)" /> and the intersections <Katex tex="(0,0)" /> and <Katex tex="\left(\tfrac12,\tfrac12\right)" />. The curve must stay curved right up to <Katex tex="(1,2)" />, not turn vertical.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={regionsSrc}
          alt="The same two curves with region A shaded between them from x = 0 to x = 1/2, and region B shaded between them from x = 1/2 to the dashed line x = 1"
          className="w-full max-w-[350px]"
        />
      </div>
    ),
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
    reason: <>The required form <Katex tex="\tfrac{a-b\sqrt b}{6}" /> with <Katex tex="a=5" />, <Katex tex="b=2" />. Numerically <Katex tex="0.362" />, which matches the two small shaded pieces.</>,
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

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The graph of <Katex tex="y=f(x)" />, where <Katex tex="x\in[0,2]" />, is shown on
          the axes below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={axesSrc}
            alt="A gridded set of axes from 0 to 2 in both directions, with the curve f(x) = √x/√2 drawn from (0, 0) up to (2, 1) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[360px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
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
