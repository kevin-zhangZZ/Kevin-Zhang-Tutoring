// 2021 Mathematical Methods — Exam 1 Question 5 (4 marks). An x-intercept of a translated
// parabola, then a dilation and a translation applied in a given order. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Part b has an interactive (interactives/meth-2021e1-q5b-brackets): dilate f by ½, then slide it
// right and watch the rule f(2(x − c)) = (2x − 2c)² − 4, with the bracket-less (2x − 2)² − 4 overlay.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BracketsWidget = lazyWidget(() => import('../interactives/meth-2021e1-q5b-brackets'))

const EXAM_A: SAExaminerStats = {
  marks: [23, 14, 63],
  average: 1.4,
  comment: (
    <>
      Most students were able to set <Katex tex="g(x)=0" /> and solve. Some students used the
      symmetry around the turning point to locate the <Katex tex="x" />-intercept. Some
      erroneously tried to solve <Katex tex="f(x)=g(x)" />. A number of students chose to use
      the quadratic formula, introduced careless errors thereby making a simple solution process
      difficult.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [74, 8, 18],
  average: 0.5,
  comment: (
    <>
      Correctly managing the transformations in this question proved challenging for many
      students. Some could not properly express the horizontal dilation, and, with the
      translation, many did not use brackets around the <Katex tex="(x-2)" /> term leading to
      the incorrect rule of: <Katex tex="h(x)=(2x-2)^2-4" />.
      <br />
      Few students realised that the transformation of the <Katex tex="x" />-intercepts could
      be formed independently of the rule, through simply transforming points. A significant
      number of students either could not, or did not realise they had to, find the{' '}
      <Katex tex="x" />-intercepts.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = 0: \ 4(x-1)^2-4 = 0" />,
    reason: <>A horizontal axis intercept is where the graph of <Katex tex="g" /> meets the <Katex tex="x" />-axis, so set <Katex tex="g(x)=0" />. Solving <Katex tex="f(x)=g(x)" /> would instead find where the two graphs cross each other, which is a different question.</>,
  },
  {
    working: <Katex display tex="(x-1)^2 = 1 \implies x-1 = \pm1" />,
    reason: <>Add 4 to both sides, then divide by 4. The rule is already in turning-point form, so just take the square root of both sides, remembering both the <Katex tex="+" /> and <Katex tex="-" /> roots. There is no need to expand or use the quadratic formula.</>,
  },
  {
    working: <Katex display tex="x = 0 \text{ or } x = 2" />,
    reason: <><Katex tex="x=2" /> is the common intercept given in the question, so <Katex tex="x=0" /> is the other one. Check by symmetry: the turning point of <Katex tex="g" /> is at <Katex tex="x=1" />, and the two intercepts sit 1 unit either side of it.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,\ 0)}" />,
    reason: <>The question asks for coordinates, so give the point, not just <Katex tex="x=0" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{dilation: } (x,\ y) \to \left(\tfrac12 x,\ y\right)" />,
    reason: <>A dilation by a factor of <Katex tex="\tfrac12" /> from the vertical axis halves every point&apos;s distance from the <Katex tex="y" />-axis: each <Katex tex="x" />-coordinate is multiplied by <Katex tex="\tfrac12" /> and each <Katex tex="y" />-coordinate stays the same.</>,
  },
  {
    working: <Katex display tex="y = f(2x) = (2x)^2-4 = 4x^2-4" />,
    reason: <>In the rule, <Katex tex="x" /> is replaced by <Katex tex="2x" />, the <em>reciprocal</em> of the factor. Why: the point now at <Katex tex="x" /> came from the point at <Katex tex="2x" /> on <Katex tex="f" />, so its height is <Katex tex="f(2x)" />. Check: <Katex tex="(2,0)" /> moves to <Katex tex="(1,0)" />, and <Katex tex="f(2\times1)=f(2)=0" /> ✓.</>,
  },
  {
    working: <Katex display tex="\text{translate 2 right: replace } x \text{ by } (x-2)" />,
    reason: <>The translation comes <em>second</em>, so it acts on the dilated rule <Katex tex="y=f(2x)" />. Every <Katex tex="x" /> becomes <Katex tex="(x-2)" />, brackets and all, including the <Katex tex="x" /> that is multiplied by 2.</>,
  },
  {
    working: <Katex display tex="h(x) = f\bigl(2(x-2)\bigr) = \bigl(2(x-2)\bigr)^2-4" />,
    reason: <>Without the brackets you get <Katex tex="f(2x-2)=(2x-2)^2-4" />, the incorrect rule named in the report. Subtracting 2 from <Katex tex="2x" /> only moves the graph 1 unit right.</>,
    more: <>Slide <Katex tex="c" /> in the diagram below to see it.</>,
  },
  {
    working: <Katex display tex="\boxed{h(x) = 4(x-2)^2-4}" />,
    reason: <>The 2 inside the bracket is squared too: <Katex tex="\bigl(2(x-2)\bigr)^2 = 2^2(x-2)^2 = 4(x-2)^2" />, not <Katex tex="2(x-2)^2" />. Expanded, <Katex tex="h(x)=4x^2-16x+12" />; either form is fine.</>,
  },
  {
    working: <Katex display tex="f(x) = 0: \ x^2 = 4 \implies x = \pm 2" />,
    reason: <>The question also asks for the intercepts of <Katex tex="h" />, which many students missed. Start from the intercepts of <Katex tex="f" />, <Katex tex="(-2,0)" /> and <Katex tex="(2,0)" />.</>,
  },
  {
    working: <Katex display tex="(x,\ y) \to \left(\tfrac12 x + 2,\ y\right)" />,
    reason: <>Both transformations together: halve <Katex tex="x" />, then add 2. Neither changes <Katex tex="y" />, so a point on the <Katex tex="x" />-axis stays on the <Katex tex="x" />-axis. The intercepts of <Katex tex="f" /> therefore move to the intercepts of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="(-2,\ 0) \to (1,\ 0), \quad (2,\ 0) \to (3,\ 0)" />,
    reason: <><Katex tex="\tfrac12(-2)+2=1" /> and <Katex tex="\tfrac12(2)+2=3" />. Transforming the points is quicker than solving <Katex tex="h(x)=0" />, a shortcut the report says few students noticed.</>,
  },
  {
    working: <Katex display tex="\boxed{(1,\ 0) \ \text{ and } \ (3,\ 0)}" />,
    reason: <>Check with the rule: <Katex tex="4(x-2)^2-4=0 \Rightarrow (x-2)^2=1 \Rightarrow x=1 \text{ or } 3" /> ✓.</>,
  },
]

export default function MethodsQ5_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (4 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=x^2-4" /> and{' '}
          <Katex tex="g:R\to R" />, <Katex tex="g(x)=4(x-1)^2-4" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Transformations"
        marks={2}
        statement={
          <>
            The graphs of <Katex tex="f" /> and <Katex tex="g" /> have a common horizontal
            axis intercept at <Katex tex="(2,0)" />. Find the coordinates of the other
            horizontal axis intercept of the graph of <Katex tex="g" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Transformations"
        marks={2}
        statement={
          <>
            Let the graph of <Katex tex="h" /> be a transformation of the graph of{' '}
            <Katex tex="f" /> where the transformations have been applied in the following
            order:
            <br />• dilation by a factor of <Katex tex="\tfrac12" /> from the vertical axis
            (parallel to the horizontal axis)
            <br />• translation by two units to the right (in the direction of the positive
            horizontal axis)
            <br />
            State the rule of <Katex tex="h" /> and the coordinates of the horizontal axis
            intercepts of the graph of <Katex tex="h" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore
          title={
            <>
              Why the shift needs brackets: <Katex tex="f\bigl(2(x-2)\bigr)" />, not <Katex tex="f(2x-2)" />
            </>
          }
        >
          <BracketsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
