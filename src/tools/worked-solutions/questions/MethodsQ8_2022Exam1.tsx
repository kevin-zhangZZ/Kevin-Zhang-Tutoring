// 2022 Mathematical Methods — Exam 1 Question 8 (5 marks). An area function is given, and
// the fundamental theorem of calculus runs the whole question. Question text transcribed
// from the original paper; the figure is a crop of VCAA's own artwork. Answers checked with
// sympy and against the VCAA examination report. Solution is original. Interactive diagrams
// (§15): part b. pushes the edge of the area from k to k + h so the extra strip shows why
// A'(k) = f(k), with a toggle testing the k cos(k) slip (interactives/meth-2022e1-q8b-strip.tsx);
// part c. drags k to show the average value as the height of an equal-area rectangle, peaking at
// k = π/2 where the curve passes through its corner (interactives/meth-2022e1-q8c-average.tsx).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2022e1-q8-graph.png'

const StripWidget = lazyWidget(() => import('../interactives/meth-2022e1-q8b-strip'))
const AverageWidget = lazyWidget(() => import('../interactives/meth-2022e1-q8c-average'))

const EXAM_A: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      Generally, this question was well answered. Students need to ensure they write their
      answer in an acceptable form; responses such as{' '}
      <Katex tex="\left(\tfrac\pi3\right)\sin\tfrac\pi3" /> and{' '}
      <Katex tex="\tfrac\pi3\times\tfrac{\sqrt3}{2}" /> needed to be simplified.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [71, 7, 22],
  average: 0.5,
  comment: (
    <>
      This question relied on linking <Katex tex="f(k)=A'(k)" />. Where students recognised
      this fact and used the product rule, they were generally successful. Common incorrect
      solutions gave the derivative of <Katex tex="A(k)" /> as <Katex tex="k\cos(k)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [66, 16, 18],
  average: 0.5,
  comment: (
    <>
      This question was not answered well. Many students obtained <Katex tex="\sin(k)" />,
      found the derivative of this and set it equal to zero to find the maximum. While this
      was acceptable, it was unnecessary and often led to errors. Some students did not
      recognise that k was a variable; other students correctly got <Katex tex="\cos(k)=0" />{' '}
      and then incorrectly wrote <Katex tex="k=1" />.
      <br />
      Some students set up the average rate of change, rather than the average value
      function, and some students tried to find{' '}
      <Katex tex="\tfrac1k\int_0^k x\sin(x)\,dx" /> using the function for{' '}
      <Katex tex="A(x)" /> rather than <Katex tex="f(x)" />. Use of nomenclature in student
      solutions for this question was inconsistently applied, with many students
      interchanging <Katex tex="k" /> and <Katex tex="x" />. Some students incorrectly set up
      integrals with terminals of 0 and 2.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="A(k) = k\sin(k) \implies A\!\left(\tfrac\pi3\right) = \tfrac\pi3\sin\!\left(\tfrac\pi3\right)" />,
    reason: <><Katex tex="A" /> already gives the area, so just substitute <Katex tex="k=\tfrac\pi3" />. No integration is needed.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\tfrac\pi3\right) = \tfrac{\sqrt3}{2}" />,
    reason: <>Exact value from the unit circle. Exam 1 wants an exact answer, so evaluate the sine rather than leaving it.</>,
  },
  {
    working: <Katex display tex="A\!\left(\tfrac\pi3\right) = \tfrac\pi3\times\tfrac{\sqrt3}{2} = \boxed{\frac{\sqrt3\,\pi}{6}}" />,
    reason: <>Multiply the numerators and the denominators to give one simplified fraction.</>,
    more: <>Don&apos;t stop a step early: the report notes responses such as <Katex tex="\left(\tfrac\pi3\right)\sin\tfrac\pi3" /> and <Katex tex="\tfrac\pi3\times\tfrac{\sqrt3}{2}" /> needed to be simplified. As a decimal the area is about 0.91.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="A(k) = \int_0^k f(x)\,dx" />,
    reason: <>In the graph the shaded region runs from the origin, where the curve starts, to the line <Katex tex="x=k" />, with <Katex tex="f" /> above the <Katex tex="x" />-axis. So its area <Katex tex="A(k)" /> is this integral from 0 to <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\implies A'(k) = f(k)" />,
    reason: <>The fundamental theorem of calculus: differentiating an integral with respect to its upper terminal gives back the function at that terminal. So to get the curve <Katex tex="f" /> from the area function <Katex tex="A" />, differentiate <Katex tex="A" />.</>,
    more: <>This is the step the whole part hangs on: the report notes the question relied on linking <Katex tex="f(k)=A'(k)" />. Why it is true: move the right edge from <Katex tex="k" /> to a slightly bigger <Katex tex="k+h" />. The extra area <Katex tex="A(k+h)-A(k)" /> is a thin strip, almost a rectangle of width <Katex tex="h" /> and height <Katex tex="f(k)" />, so <Katex tex="\tfrac{A(k+h)-A(k)}{h}\approx f(k)" />. As <Katex tex="h" /> shrinks to 0 the left side becomes <Katex tex="A'(k)" /> (that is the definition of the derivative) and the approximation becomes exact. The diagram below lets you shrink the strip and watch this happen.</>,
  },
  {
    working: <Katex display tex="f(k) = \frac{d}{dk}\bigl(k\sin(k)\bigr) = \sin(k)+k\cos(k)" />,
    reason: <><Katex tex="k\sin(k)" /> is a product of two factors that both change with <Katex tex="k" />, so use the <em>product</em> rule with <Katex tex="u=k" /> and <Katex tex="v=\sin(k)" />: <Katex tex="u'v+uv' = (1)\sin(k) + k\cos(k)" />.</>,
    more: <>The report notes common incorrect solutions gave the derivative of <Katex tex="A(k)" /> as <Katex tex="k\cos(k)" />. That differentiates only the <Katex tex="\sin(k)" /> and treats the <Katex tex="k" /> in front as a constant. But that <Katex tex="k" /> changes too, and its derivative (1) is what produces the <Katex tex="\sin(k)" /> term.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f\!\left(\tfrac\pi3\right) &= \sin\!\left(\tfrac\pi3\right)+\tfrac\pi3\cos\!\left(\tfrac\pi3\right) \\ &= \tfrac{\sqrt3}{2}+\tfrac\pi3\times\tfrac12 \end{aligned}" />,
    reason: <>Substitute <Katex tex="k=\tfrac\pi3" />, using the exact values <Katex tex="\sin\tfrac\pi3=\tfrac{\sqrt3}{2}" /> and <Katex tex="\cos\tfrac\pi3=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{\sqrt3}{2}+\frac{\pi}{6}}" />,
    reason: <><Katex tex="\tfrac\pi3\times\tfrac12=\tfrac\pi6" />.</>,
    more: <>Writing it as one fraction, <Katex tex="\tfrac{3\sqrt3+\pi}{6}" />, is equally correct (the report gives both forms). As a decimal it is about 1.39. In the stem&apos;s graph, <Katex tex="x=\tfrac\pi3\approx1.05" /> is near the top of the hump, so this is close to the greatest height of <Katex tex="f" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value over } [0,k] = \frac{1}{k}\int_0^k f(x)\,dx" />,
    reason: <>The average value of <Katex tex="f" /> over <Katex tex="[a,b]" /> is <Katex tex="\tfrac{1}{b-a}\int_a^b f(x)\,dx" />. The interval here is <Katex tex="x\in[0,k]" />, so <Katex tex="a=0" /> and <Katex tex="b=k" />.</>,
    more: <>Picture it as the height of the rectangle on <Katex tex="[a,b]" /> with the same area as under the curve. The report flags three set-up slips. The terminals are 0 and <Katex tex="k" />, not 0 and 2: <Katex tex="[0,2]" /> only says where <Katex tex="k" /> may lie. Keep the letters apart: <Katex tex="x" /> is the variable of integration and <Katex tex="k" /> is the upper terminal (the report notes many students interchanged <Katex tex="k" /> and <Katex tex="x" />). And it is the average <em>value</em>, not the average rate of change <Katex tex="\tfrac{f(k)-f(0)}{k-0}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{A(k)}{k} = \frac{k\sin(k)}{k} = \sin(k)" />,
    reason: <><Katex tex="\int_0^k f(x)\,dx" /> is exactly the area <Katex tex="A(k)" /> we are given, so no integration is needed. An interval needs some width, so <Katex tex="k>0" /> and the <Katex tex="k" /> cancels.</>,
    more: <>Do not integrate <Katex tex="x\sin(x)" />: that is the area rule <Katex tex="A" /> with <Katex tex="x" /> written for <Katex tex="k" />, not the curve <Katex tex="f" />. The report notes some students tried to find <Katex tex="\tfrac1k\int_0^k x\sin(x)\,dx" /> this way.</>,
  },
  {
    working: <Katex display tex="\sin(k) \text{ is greatest when } k = \tfrac\pi2 \text{ on } [0,2]" />,
    reason: <><Katex tex="k" /> is a variable: each <Katex tex="k" /> gives a different interval <Katex tex="[0,k]" /> and so a different average <Katex tex="\sin(k)" />. We want the <Katex tex="k" /> that makes <Katex tex="\sin(k)" /> largest, and the sine graph reaches its maximum of 1 at <Katex tex="\tfrac\pi2" />.</>,
    more: <>This is the point the report says some students missed. No calculus is needed, because you already know the shape of the sine graph: on <Katex tex="[0,2]" /> it rises to 1 at <Katex tex="k=\tfrac\pi2" />, then falls. Differentiating and solving <Katex tex="\cos(k)=0" /> gives the same answer, but the report notes this was unnecessary and often led to errors. If you do differentiate, <Katex tex="\cos(k)=0" /> gives <Katex tex="k=\tfrac\pi2" />, not <Katex tex="k=1" /> (<Katex tex="\cos(1)\approx0.54" />, not 0); the report notes some students wrote <Katex tex="k=1" /> after correctly getting <Katex tex="\cos(k)=0" />. The diagram below shows why the average stops rising at <Katex tex="k=\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \tfrac\pi2}" />,
    reason: <><Katex tex="\tfrac\pi2\approx1.57" /> lies inside <Katex tex="[0,2]" />, so it is allowed. The maximum average value is <Katex tex="\sin\tfrac\pi2=1" />.</>,
  },
]

export default function MethodsQ8_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (5 marks)</p>
        <p>
          Part of the graph of <Katex tex="y=f(x)" /> is shown below. The rule{' '}
          <Katex tex="A(k)=k\sin(k)" /> gives the area bounded by the graph of{' '}
          <Katex tex="f" />, the horizontal axis and the line <Katex tex="x=k" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="A hump-shaped curve from the origin rising to a peak near x = 1 and returning to the axis at about x = 2, with the region left of the dashed line x = k shaded and labelled A(k) — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Area Function"
        marks={1}
        statement={
          <>
            State the value of <Katex tex="A\!\left(\tfrac\pi3\right)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Fundamental Theorem"
        marks={2}
        statement={
          <>
            Evaluate <Katex tex="f\!\left(\tfrac\pi3\right)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Push the edge from k to k + h: the extra strip is almost f(k) tall, so A′(k) = f(k)">
          <StripWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c"
        topic="Average Value"
        marks={2}
        statement={
          <>
            Consider the average value of the function <Katex tex="f" /> over the interval{' '}
            <Katex tex="x\in[0,k]" />, where <Katex tex="k\in[0,2]" />.
            <br />
            Find the value of{' '}
            <Katex tex="k" /> that results in the maximum average value.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="The average value is the height of an equal-area rectangle, and it peaks where the curve meets its corner">
          <AverageWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
