// 2015 Specialist Mathematics — Exam 2, Section 2 Question 1 (12 marks). Implicit
// differentiation of y = sqrt(2 - sin^2 x), then its inverse, their intersection, and a
// volume of revolution. Question text transcribed from the original paper; the axes VCAA
// supplied for part (d) were blank, so the sketch is this site's own matplotlib figure.
// Answers checked with sympy and against the VCAA examination report. Solution is original.
// Interactive: part d (36% full marks) gets interactives/spec-2015e2-q1d-mirror.tsx — a point
// sliding along f with its reflected point and tangent on f⁻¹, showing the vertical end tangents
// and the matching S-shaped concavity the report says students got wrong. No other part qualifies.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './spec-2015e2-q1d-inverse.png'

const MirrorWidget = lazyWidget(() => import('../interactives/spec-2015e2-q1d-mirror'))

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
    reason: <>Differentiate both sides with respect to <Katex tex="x" />. By the chain rule, <Katex tex="\tfrac{d}{dx}\left(y^2\right)=2y\tfrac{dy}{dx}" /> and <Katex tex="\tfrac{d}{dx}\sin^2(x)=2\sin(x)\cos(x)" />.</>,
    more: <>This is implicit differentiation: <Katex tex="y" /> is a function of <Katex tex="x" />, so differentiating <Katex tex="y^2" /> needs the extra factor <Katex tex="\tfrac{dy}{dx}" />. On the right, <Katex tex="\sin^2(x)=\left(\sin(x)\right)^2" />, so the outer square gives <Katex tex="2\sin(x)" /> and the inner <Katex tex="\sin(x)" /> gives <Katex tex="\cos(x)" />. The minus sign comes from the <Katex tex="-\sin^2(x)" />; the report says it was occasionally dropped.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{\sin(x)\cos(x)}{y}}" />,
    reason: <>Divide by <Katex tex="2y" />. The question asks for <Katex tex="x" /> <em>and</em> <Katex tex="y" />, so stop here. Equivalently <Katex tex="-\tfrac{\sin(2x)}{2y}" />.</>,
    more: <>The report says the main error was giving the answer only in terms of <Katex tex="x" />, and some students who had a correct answer in <Katex tex="x" /> and <Katex tex="y" /> went on to an incorrect one in <Katex tex="x" /> only. When a question names the variables, the answer in those variables is the finished answer; extra rearranging only creates chances to slip.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="x=0:\quad y^2 = 2-\sin^2(0) = 2 \implies y = \sqrt2" />,
    reason: <>Taking the positive root, since <Katex tex="y=\sqrt{2-\sin^2(x)}" /> is defined as a square root.</>,
    more: <>The report notes two slips: writing <Katex tex="2" /> (forgetting the square root, i.e. giving <Katex tex="y^2" />) and writing <Katex tex="\pm\sqrt2" />. The <Katex tex="\pm" /> belongs to the relation <Katex tex="y^2=2-\sin^2(x)" />, not to the given <Katex tex="y=\sqrt{\cdots}" />, which is never negative.</>,
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
    reason: <>This time <Katex tex="\cos\!\left(\tfrac\pi2\right)=0" /> does it. So <Katex tex="\tfrac{dy}{dx}=0" /> at both: the graph is flat at both ends, which the part d. sketch must show.</>,
    more: <>The report says some students did not make it clear that <em>both</em> answers were zero. Write each value against its <Katex tex="x" />, as above, rather than a single "0".</>,
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
    reason: <>Only the positive root: the inverse's range is <Katex tex="f" />'s domain <Katex tex="\left[0,\tfrac\pi2\right]" />, where <Katex tex="\sin(y)\ge0" />.</>,
    more: <>The report says a small number of students wrote <Katex tex="\pm" /> in front of the square root. That describes the inverse <em>relation</em> of the whole curve <Katex tex="y^2=2-\sin^2(x)" />, which fails the vertical line test; <Katex tex="f" /> itself only takes <Katex tex="0\le x\le\tfrac\pi2" />, so the swapped <Katex tex="y" /> is in that interval and <Katex tex="\sin(y)" /> cannot be negative.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \arcsin\!\left(\sqrt{2-x^2}\right)}" />,
    reason: <>Apply <Katex tex="\arcsin" />: <Katex tex="y" /> lies in <Katex tex="\left[0,\tfrac\pi2\right]" />, inside arcsin's range <Katex tex="\left[-\tfrac\pi2,\tfrac\pi2\right]" />, so <Katex tex="\arcsin(\sin y)=y" /> exactly.</>,
    more: <>Check against part b(i): <Katex tex="f^{-1}\!\left(\sqrt2\right)=\arcsin(0)=0" /> and <Katex tex="f^{-1}(1)=\arcsin(1)=\tfrac\pi2" />, which undo <Katex tex="f(0)=\sqrt2" /> and <Katex tex="f\!\left(\tfrac\pi2\right)=1" /> ✓. Also, for <Katex tex="1\le x\le\sqrt2" /> the inside <Katex tex="\sqrt{2-x^2}" /> lies in <Katex tex="[0,1]" />, so <Katex tex="\arcsin" /> is defined throughout.</>,
  },
  {
    working: <Katex display tex="\text{domain } f^{-1} = \text{range } f = \left[1,\sqrt2\right]" />,
    reason: <><Katex tex="\sin^2(x)" /> increases on <Katex tex="\left[0,\tfrac\pi2\right]" />, so <Katex tex="f" /> decreases from <Katex tex="f(0)=\sqrt2" /> to <Katex tex="f\!\left(\tfrac\pi2\right)=1" /> (part b(i)).</>,
  },
  {
    working: <Katex display tex="\text{range } f^{-1} = \text{domain } f = \left[0,\tfrac\pi2\right]" />,
    reason: <>Swapping <Katex tex="x" /> and <Katex tex="y" /> swaps domain and range. State both.</>,
    more: <>The report says the main errors were an incorrect domain and/or range, or leaving one or both out. The question asks for three things — the rule, the domain and the range — so check each is written down before moving on.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f&:\ (0,\sqrt2) \to \left(\tfrac\pi2,1\right) \\ f^{-1}&:\ (\sqrt2,0) \to \left(1,\tfrac\pi2\right) \end{aligned}" />,
    reason: <>Plot the endpoints first, as coordinates. The inverse's endpoints are the originals with the coordinates swapped.</>,
  },
  {
    working: <Katex display tex="f'(0) = f'\!\left(\tfrac\pi2\right) = 0" />,
    reason: <>From part b(ii): <Katex tex="f" /> is flat at both endpoints. Reflecting in <Katex tex="y=x" /> turns horizontal tangents into vertical ones, so <Katex tex="f^{-1}" /> is <em>vertical</em> at both of its endpoints.</>,
    more: <>Reflection swaps the roles of rise and run, so a tangent of gradient <Katex tex="m" /> on <Katex tex="f" /> becomes one of gradient <Katex tex="\tfrac1m" /> on <Katex tex="f^{-1}" />. As <Katex tex="m\to0" />, <Katex tex="\tfrac1m" /> blows up: the inverse arrives at <Katex tex="(\sqrt2,0)" /> and leaves <Katex tex="\left(1,\tfrac\pi2\right)" /> straight up and down. The report lists incorrect location of endpoints as a common error, so plot these four points before drawing any curve.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <Cas fn="nSolve">nSolve(d²/dx²(√(2 - sin(x)²)) = 0, x) | 0 ≤ x ≤ π/2</Cas>
        <Katex display tex="x\approx0.872,\ \ y = 2^{1/4}\approx1.189" />
      </div>
    ),
    reason: <>Starting flat at its maximum, <Katex tex="f" /> must first bend down, then up to arrive flat at <Katex tex="\left(\tfrac\pi2,1\right)" />: an S-shape. Its inflection point solves <Katex tex="f''(x)=0" />; the inverse's is at <Katex tex="(1.189,\ 0.872)" />.</>,
    more: <>The report says incorrect concavity was common. A typical slip is drawing a single smooth arc instead of an S. By hand: <Katex tex="f''(x)=0" /> reduces to <Katex tex="\sin^4(x)-4\sin^2(x)+2=0" />, a quadratic in <Katex tex="\sin^2(x)" /> giving <Katex tex="\sin^2(x)=2-\sqrt2" /> (the other root <Katex tex="2+\sqrt2" /> exceeds 1). Then <Katex tex="y=\sqrt{2-(2-\sqrt2)}=2^{1/4}" />. So <Katex tex="f" /> is concave down for <Katex tex="0\le x<0.872" /> and concave up after. For a decreasing function the matching pieces of <Katex tex="f^{-1}" /> bend the same way: concave down near <Katex tex="(\sqrt2,0)" />, concave up near <Katex tex="\left(1,\tfrac\pi2\right)" />.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's sketch on VCAA's 0 to 1.8 grid: the curve y = f(x) falling from (0, √2) to (π/2, 1) with horizontal tangents at both ends, and its mirror image y = f inverse of x falling steeply from (1, π/2) to (√2, 0), the two crossing on the dotted line y = x at P(1.099, 1.099)"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>Each graph is the other reflected in <Katex tex="y=x" /> (dotted), drawn on VCAA's grid. Label each curve and its endpoints with coordinates.</>,
    more: <>The report says many students did not accurately transfer the graphs from a CAS screen to the axes provided, and a significant number who drew them correctly did not label them. Use the grid: mark the four endpoints, the crossing point on <Katex tex="y=x" /> near <Katex tex="(1.1,\ 1.1)" /> (part e), and, if you want extra guidance, the inflection points (not marked on the sketch above), then join them with the right tangent directions. Write "<Katex tex="y=f(x)" />" and "<Katex tex="y=f^{-1}(x)" />" beside the curves.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="f(a) = a \iff \sqrt{2-\sin^2(a)} = a" />,
    reason: <><Katex tex="P(a,a)" /> lies on the graph of <Katex tex="f" />, so <Katex tex="f(a)=a" />. No need to involve <Katex tex="f^{-1}" /> at all.</>,
    more: <>This works because <Katex tex="P" /> is on <Katex tex="y=x" />: a point <Katex tex="(a,a)" /> on <Katex tex="f" /> reflects onto itself, so it is automatically on <Katex tex="f^{-1}" /> too. Solving <Katex tex="f(x)=f^{-1}(x)" /> directly gives the same answer with a messier equation.</>,
  },
  {
    working: <Cas fn="nSolve">nSolve(√(2 - sin(x)²) = x, x) | 0 ≤ x ≤ π/2</Cas>,
    reason: <>No closed form exists, so solve numerically. Keep the calculator in radians.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 1.099}" />,
    reason: <>Correct to three decimal places, as asked: <Katex tex="1.09858\ldots" /> rounds up to <Katex tex="1.099" />.</>,
    more: <>The report says a significant number of students did not give their answer correct to three decimal places. Write down at least four decimal places from the CAS before rounding, and give exactly three — not <Katex tex="1.1" /> or <Katex tex="1.0986" />.</>,
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
    reason: <>The region runs from the <Katex tex="y" />-axis (<Katex tex="x=0" />) to the line <Katex tex="x=1" />, giving the terminals. Keep the <Katex tex="\pi" /> and the <Katex tex="dx" />.</>,
    more: <>The report lists not squaring <Katex tex="f(x)" />, incorrect terminals and the occasional omission of <Katex tex="\pi" /> and/or <Katex tex="dx" />. The volume formula comes from stacking thin discs of radius <Katex tex="f(x)" />: each has volume <Katex tex="\pi\bigl(f(x)\bigr)^2\,\delta x" />, which is where both the <Katex tex="\pi" /> and the square come from. The upper terminal is <Katex tex="1" />, not <Katex tex="\tfrac\pi2" />: the line <Katex tex="x=1" /> cuts the region off before the end of <Katex tex="f" />'s domain.</>,
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
    reason: <>To one decimal place, as asked.</>,
    more: <>The report says a number of students who set up the integral correctly left out the <Katex tex="\pi" /> and obtained <Katex tex="1.7" />: that is <Katex tex="\int_0^1\bigl(2-\sin^2(x)\bigr)dx=1.727\ldots" /> on its own. On CAS, type the whole of <Katex tex="\pi\int_0^1\bigl(2-\sin^2(x)\bigr)dx" />, <Katex tex="\pi" /> included, in radian mode.</>,
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
        <Explore title="Flat on f means vertical on f⁻¹, and both curves bend the same way">
          <MirrorWidget />
        </Explore>
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
