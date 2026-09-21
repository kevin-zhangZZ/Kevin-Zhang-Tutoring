// 2019 Mathematical Methods — Exam 1, Question 8 (4 marks).
// A degree-4 polynomial f touching the x-axis at the origin, with local maxima marked on its
// graph — find the rule (part a), then the domain (part b) and range (part c) of
// h(x)=ln(g(x))-ln(x³+x²), where g has the same rule as f. Question text transcribed from
// the original paper; the diagram is cropped directly from the original VCAA exam PDF, not a
// redrawing. Cross-checked against the VCAA examination report and itute's independent
// solutions — both agree with the derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2019exam1-q8-quartic.png'

const EXAM_A: SAExaminerStats = {
  marks: [86, 14],
  average: 0.2,
  comment: <>This question was well attempted but not done well, with many students overlooking the dilation factor.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [91, 9],
  average: 0.1,
  comment: (
    <>
      Students who did this question well realised that the maximal domain could be obtained
      by considering the common domains for <Katex tex="f(x)\ge0" /> (observed from the graph
      given in part (a)) and <Katex tex="\{x: x^3+x^2>0\}" />. Some students were not clear on
      how to express the interval.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [88, 12, 1],
  average: 0.2,
  comment: <>Not many students attempted this question well. Only a few used logarithm laws; some sketched various graphs with limited success.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f \text{ touches the } x\text{-axis at } x=0 \text{ (double root), and crosses at } x=\pm1 \text{ (simple roots)}" />,
    reason: <>Read the roots' multiplicities straight off the diagram's shape — a "touch" means an even-multiplicity root, a "cross" an odd one; degree 4 total is exactly <Katex tex="2+1+1" />.</>,
  },
  {
    working: <Katex display tex="f(x) = ax^2(x+1)(x-1) = ax^2(x^2-1)" />,
    reason: <>General quartic with those three roots and the correct multiplicities.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac{1}{\sqrt2}\right)=1 \;\implies\; a\left(\tfrac12\right)\left(\tfrac12-1\right) = 1 \;\implies\; a\left(\tfrac12\right)\left(-\tfrac12\right)=1" />,
    reason: <>Use the marked point <Katex tex="\left(\tfrac{1}{\sqrt2},1\right)" /> to pin down <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="-\tfrac{a}{4} = 1 \;\implies\; a=-4" />,
  },
  {
    working: <Katex display tex="\boxed{f(x) = -4x^2(x^2-1) = -4x^4+4x^2}" />,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \ln_e(g(x)) - \ln_e(x^3+x^2), \qquad g(x)=f(x)=-4x^2(x^2-1)" />,
    reason: <>Both logarithms need positive arguments — the domain is where <Katex tex="g(x)>0" /> <em>and</em> <Katex tex="x^3+x^2>0" />.</>,
  },
  {
    working: <Katex display tex="g(x)>0: \quad -4x^2(x^2-1)>0 \;\iff\; x^2(x^2-1)<0" />,
  },
  {
    working: <Katex display tex="\iff x^2>0 \text{ and } x^2-1<0 \;\iff\; x\ne0 \text{ and } -1<x<1" />,
    reason: <>Since <Katex tex="x^2\ge0" /> always, the product is negative exactly when <Katex tex="x^2>0" /> (i.e. <Katex tex="x\ne0" />) and the other factor is negative.</>,
  },
  {
    working: <Katex display tex="x^3+x^2>0: \quad x^2(x+1)>0 \;\iff\; x\ne0 \text{ and } x>-1" />,
  },
  {
    working: <Katex display tex="\boxed{D = (-1,1)\setminus\{0\}}" />,
    reason: <>Intersection of both conditions.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \ln_e\!\left(\dfrac{g(x)}{x^3+x^2}\right) = \ln_e\!\left(\dfrac{-4x^2(x^2-1)}{x^2(x+1)}\right)" />,
    reason: <>Combine into a single log — valid since both arguments are individually positive throughout <Katex tex="D" />.</>,
  },
  {
    working: <Katex display tex="= \ln_e\!\left(\dfrac{-4(x-1)(x+1)}{x+1}\right) = \ln_e\bigl(-4(x-1)\bigr)" />,
    reason: <>Cancel <Katex tex="x^2" /> and <Katex tex="(x+1)" />, both valid since <Katex tex="x\ne0" /> and <Katex tex="x\ne-1" /> on <Katex tex="D" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h(x) = \ln_e\bigl(4(1-x)\bigr)}" />,
  },
  {
    working: <Katex display tex="h \text{ is strictly decreasing on } (-1,1) \text{ (a decreasing linear expression inside an increasing log)}" />,
    reason: <>So <Katex tex="h" /> is one-to-one on the connected interval <Katex tex="(-1,1)" />, and removing the single point <Katex tex="x=0" /> from the domain removes exactly the single value <Katex tex="h(0)" /> from the range — not a whole sub-interval.</>,
  },
  {
    working: <Katex display tex="x\to-1^+ \implies h\to\ln_e(8) = 3\ln_e2 \qquad x\to1^- \implies h\to-\infty" />,
  },
  {
    working: <Katex display tex="h(0) = \ln_e(4) = 2\ln_e2" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Range}(h) = (-\infty,\ 3\ln_e2)\setminus\{2\ln_e2\}}" />,
  },
]

export default function MethodsQ8_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (4 marks)</p>
        <p className="mb-2">
          The function <Katex tex="f:\mathbb{R}\to\mathbb{R}" />, <Katex tex="f(x)" /> is a
          polynomial function of degree 4. Part of the graph of <Katex tex="f" /> is shown
          below. The graph of <Katex tex="f" /> touches the <Katex tex="x" />-axis at the
          origin.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={diagramSrc}
            alt="Degree-4 polynomial touching the x-axis at the origin, crossing at (-1,0) and (1,0), with local maxima marked at (-1/√2,1) and (1/√2,1), from the original 2019 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find the rule of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Let <Katex tex="g" /> be a function with the same rule as <Katex tex="f" />. Let{' '}
        <Katex tex="h:D\to\mathbb{R},\ h(x)=\ln_e(g(x)) - \ln_e(x^3+x^2)" />, where{' '}
        <Katex tex="D" /> is the maximal domain of <Katex tex="h" />.
      </div>

      <PartCard letter="b" marks={1} statement={<>State <Katex tex="D" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>State the range of <Katex tex="h" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
