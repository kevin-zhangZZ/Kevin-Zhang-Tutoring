// 2015 Specialist Mathematics — Exam 2, Section 2 Question 1 (12 marks). Implicit
// differentiation of y = sqrt(2 - sin^2 x), then its inverse, their intersection, and a
// volume of revolution. Question text transcribed from the original paper; the axes VCAA
// supplied for part (d) were blank, so the sketch is this site's own matplotlib figure.
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import sketchSrc from './spec-2015e2-q1d-inverse.png'

const EXAM_A: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: (
    <>
      This question was answered reasonably well. The main error was some answers were given
      only in terms of <Katex tex="x" />. Some
      students moved from a correct answer involving <Katex tex="x" /> and <Katex tex="y" />{' '}
      to an incorrect answer involving only <Katex tex="x" />. Omission of the negative sign
      occurred occasionally.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: (
    <>
      This question was well answered. Some students wrote <Katex tex="2" /> instead of{' '}
      <Katex tex="\sqrt2" /> and others included <Katex tex="\pm" /> alternatives in their
      answers.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      This question was answered quite well. A few students had answers other than zero,
      while some students did not make it clear
      that both answers were zero.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [5, 9, 29, 57],
  average: 2.4,
  comment: (
    <>
      This question was answered fairly well. The main errors were the incorrect domain
      and/or range, or the omission of one or both. A small number of students gave the
      inverse relation by including <Katex tex="\pm" /> in front of the square root. Most students knew to interchange{' '}
      <Katex tex="x" /> and <Katex tex="y" /> as a first step.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [35, 29, 36],
  average: 1,
  comment: (
    <>
      This question was answered moderately well. Many students did not accurately transfer
      the graphs from a CAS screen to the axes
      provided. Of those who managed to draw the graphs correctly, a significant number did
      not label them. Incorrect location of endpoints and incorrect concavity were common.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: <>A significant number of students did not give their answer correct to three decimal places.</>,
}

const EXAM_FI: SAExaminerStats = {
  marks: [10, 10, 79],
  average: 1.7,
  comment: (
    <>
      This question was answered reasonably well. Common errors included not squaring{' '}
      <Katex tex="f(x)" />, incorrect terminals and the
      occasional omission of <Katex tex="\pi" /> and/or <Katex tex="dx" />.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      This question was answered very well by students who set up the integral correctly. A
      number of students who set up the integral correctly did not include the{' '}
      <Katex tex="\pi" /> in their calculations and obtained <Katex tex="1.7" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y^2 = 2-\sin^2(x)" />,
    reason: <>Squaring first avoids differentiating a square root — that is why the question hands you this form.</>,
  },
  {
    working: <Katex display tex="2y\frac{dy}{dx} = -2\sin(x)\cos(x)" />,
    reason: <>Implicit differentiation: a chain rule on the left, and the chain rule on <Katex tex="\sin^2(x)" /> on the right.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{\sin(x)\cos(x)}{y}}" />,
    reason: <>The question asks for an answer in terms of <Katex tex="x" /> <em>and</em> <Katex tex="y" />, so leave the <Katex tex="y" /> where it is. Equivalently <Katex tex="-\tfrac{\sin(2x)}{2y}" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="x=0:\quad y^2 = 2-\sin^2(0) = 2 \implies y = \sqrt2" />,
    reason: <>Taking the positive root, since <Katex tex="y=\sqrt{2-\sin^2(x)}" /> is defined as a square root.</>,
  },
  {
    working: <Katex display tex="x=\tfrac\pi2:\quad y^2 = 2-1 = 1 \implies y = 1" />,
    reason: <><Katex tex="\sin\!\left(\tfrac\pi2\right)=1" />. So <Katex tex="y=\sqrt2" /> and <Katex tex="y=1" /> respectively.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="x=0:\quad \frac{dy}{dx} = -\frac{\sin(0)\cos(0)}{\sqrt2} = 0" />,
    reason: <><Katex tex="\sin(0)=0" /> kills the numerator.</>,
  },
  {
    working: <Katex display tex="x=\tfrac\pi2:\quad \frac{dy}{dx} = -\frac{(1)(0)}{1} = 0" />,
    reason: <>This time <Katex tex="\cos\!\left(\tfrac\pi2\right)=0" /> does it. Both endpoints are stationary — which is exactly the shape the part d. sketch has to show.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x = \sqrt{2-\sin^2(y)}" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make the new <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x^2 = 2-\sin^2(y) \implies \sin^2(y) = 2-x^2" />,
    reason: <>Squaring and rearranging.</>,
  },
  {
    working: <Katex display tex="\sin(y) = \sqrt{2-x^2} \qquad \left(0\le y\le\tfrac\pi2\right)" />,
    reason: <>Only the positive root: the original domain <Katex tex="\left[0,\tfrac\pi2\right]" /> becomes the range of the inverse, and <Katex tex="\sin" /> is non-negative there. Keeping <Katex tex="\pm" /> gives a relation, not a function.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \arcsin\!\left(\sqrt{2-x^2}\right)}" />,
    reason: <>The rule. Check: <Katex tex="f^{-1}\!\left(\sqrt2\right)=\arcsin(0)=0" /> and <Katex tex="f^{-1}(1)=\arcsin(1)=\tfrac\pi2" />, undoing part b(i) ✓.</>,
  },
  {
    working: <Katex display tex="\text{domain } f^{-1} = \text{range } f = \left[1,\sqrt2\right]" />,
    reason: <>From part b(i): <Katex tex="f" /> runs from <Katex tex="\sqrt2" /> down to <Katex tex="1" />, and both endpoints are stationary so nothing outside that band is reached.</>,
  },
  {
    working: <Katex display tex="\text{range } f^{-1} = \text{domain } f = \left[0,\tfrac\pi2\right]" />,
    reason: <>Stating both is worth a mark each — the report says omitting one or both was the main error.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f:\ (0,\sqrt2) \to \left(\tfrac\pi2,1\right), \qquad f^{-1}:\ (\sqrt2,0) \to \left(1,\tfrac\pi2\right)" />,
    reason: <>Plot the endpoints first, as coordinates. The inverse's endpoints are the originals with the coordinates swapped.</>,
  },
  {
    working: <Katex display tex="f'(0) = f'\!\left(\tfrac\pi2\right) = 0" />,
    reason: <>From part b(ii): <Katex tex="f" /> leaves both endpoints horizontally, so it is flat at the left and flat at the right. The inverse is therefore <em>vertical</em> at both of its endpoints.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={sketchSrc}
          alt="This site's sketch on VCAA's 0 to 1.8 grid: the curve y = f(x) falling from (0, √2) to (π/2, 1) with horizontal tangents at both ends, and its mirror image y = f inverse of x falling steeply from (1, π/2) to (√2, 0), the two crossing on the dotted line y = x at P(1.099, 1.099)"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>Each graph is the other reflected in <Katex tex="y=x" /> (dotted), drawn on VCAA's grid. Label which curve is which — the report says a significant number of students who drew the graphs correctly did not label them.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="f(a) = a \iff \sqrt{2-\sin^2(a)} = a" />,
    reason: <>Because the graphs are reflections in <Katex tex="y=x" />, any intersection of the pair on that line is a solution of <Katex tex="f(a)=a" /> — no need to involve <Katex tex="f^{-1}" /> at all.</>,
  },
  {
    working: <Cas fn="nSolve">nSolve(√(2 - sin(x)²) = x, x) | 0 ≤ x ≤ π/2</Cas>,
    reason: <>No closed form exists, so solve numerically. Keep the calculator in radians.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 1.099}" />,
    reason: <>Correct to three decimal places, as asked — <Katex tex="1.0985\ldots" /> rounds up.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b\bigl(f(x)\bigr)^2dx" />,
    reason: <>Rotation about the <Katex tex="x" />-axis, so the integrand is <Katex tex="f(x)" /> <em>squared</em>.</>,
  },
  {
    working: <Katex display tex="\bigl(f(x)\bigr)^2 = 2-\sin^2(x)" />,
    reason: <>The square root disappears — which is the whole reason this volume is doable by hand.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^1\bigl(2-\sin^2(x)\bigr)dx}" />,
    reason: <>The terminals come from "the coordinate axes and the line <Katex tex="x=1" />". Don't lose the <Katex tex="\pi" /> or the <Katex tex="dx" />.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\sin^2(x) = \tfrac12\bigl(1-\cos(2x)\bigr)" />,
    reason: <>The double-angle identity, if you want it by hand; a CAS evaluates the integral directly.</>,
  },
  {
    working: <Katex display tex="V = \pi\left[\tfrac32x+\tfrac14\sin(2x)\right]_0^1" />,
    reason: <>Since <Katex tex="2-\sin^2(x) = \tfrac32+\tfrac12\cos(2x)" />.</>,
  },
  {
    working: <Katex display tex="V = \pi\left(\tfrac32+\tfrac{\sin(2)}4\right) = 5.4265\ldots" />,
    reason: <>Radians throughout: <Katex tex="\sin(2)=0.909\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V \approx 5.4}" />,
    reason: <>To one decimal place. Dropping the <Katex tex="\pi" /> gives <Katex tex="1.7" />, the report's common wrong answer.</>,
  },
]

export default function SpecialistQ1_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (12 marks)</p>
        <p>
          Consider <Katex tex="y = \sqrt{2-\sin^2(x)}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Implicit Differentiation"
        marks={1}
        statement={
          <>
            Use the relation <Katex tex="y^2=2-\sin^2(x)" /> to find{' '}
            <Katex tex="\tfrac{dy}{dx}" /> in terms of <Katex tex="x" /> and{' '}
            <Katex tex="y" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Endpoint Values"
        marks={1}
        statement={
          <>
            Write down the values of <Katex tex="y" /> where <Katex tex="x=0" /> and where{' '}
            <Katex tex="x=\tfrac\pi2" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Gradient Values"
        marks={1}
        statement={
          <>
            Write down the values of <Katex tex="\tfrac{dy}{dx}" /> where <Katex tex="x=0" />{' '}
            and where <Katex tex="x=\tfrac\pi2" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Now consider the function <Katex tex="f" /> with rule{' '}
        <Katex tex="f(x)=\sqrt{2-\sin^2(x)}" /> for <Katex tex="0\le x\le\tfrac\pi2" />.
      </div>

      <PartCard
        letter="c"
        topic="Inverse Function"
        marks={3}
        statement={
          <>
            Find the rule for the inverse function <Katex tex="f^{-1}" />, and state the
            domain and range of <Katex tex="f^{-1}" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Sketch Inverse"
        marks={2}
        statement={
          <>
            Sketch and label the graphs of <Katex tex="f" /> and <Katex tex="f^{-1}" /> on the
            axes below.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Intersections"
        marks={1}
        statement={
          <>
            The graphs of <Katex tex="f" /> and <Katex tex="f^{-1}" /> intersect at the point{' '}
            <Katex tex="P(a,a)" />. Find <Katex tex="a" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The region bounded by the graph of <Katex tex="f" />, the coordinate axes and the line{' '}
        <Katex tex="x=1" /> is rotated about the <Katex tex="x" />-axis to form a solid of
        revolution.
      </div>

      <PartCard
        letter="f.i"
        topic="Volume of Revolution"
        marks={2}
        statement={
          <>
            Write down a definite integral in terms of <Katex tex="x" /> that gives the volume
            of this solid of revolution.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Find the volume of this solid, correct to one decimal place.</>}
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>
    </div>
  )
}
