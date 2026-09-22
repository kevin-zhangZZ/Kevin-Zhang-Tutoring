// 2023 Mathematical Methods — Exam 1 Question 7 (7 marks). A restricted parabola and its
// inverse: range, sketch, rule and domain, and the area the two curves cut off with y = −x.
// Question text transcribed from the original paper; the stem figure is a crop of VCAA's own
// artwork and the answer sketches are ours. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2023e1-q7-graph.png'
import sketchSrc from './meth-2023e1-q7b-sketch.png'
import regionSrc from './meth-2023e1-q7d-region.png'

const EXAM_A: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: (
    <>
      The most common errors involved stating the correct range values with incorrect
      brackets, or swapping the interval values, as in{' '}
      <Katex tex="(\infty,-1]" />. Students are reminded that mathematical notation is a
      precise language.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [33, 20, 47],
  average: 1.1,
  comment: (
    <>
      Most students knew that the graph of <Katex tex="f^{-1}" /> was a reflection of{' '}
      <Katex tex="f" /> in the line <Katex tex="y=x" />. Students are reminded that the grid
      should serve as a guide to ensure the graph is correctly presented.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 54, 21],
  average: 1.0,
  comment: (
    <>
      Some students did not know how to proceed and solve for <Katex tex="y" /> once they had
      obtained <Katex tex="x=y^2-2y" />. The most common error was writing the function as{' '}
      <Katex tex="f^{-1}(x)=1+\sqrt{x+1}" />, the positive arm of the inverse. Students are
      reminded to use their graph from part b. to assist.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [71, 10, 19],
  average: 0.5,
  comment: (
    <>
      Students needed to identify that there were two identical areas. Using symmetry
      eliminated the need for an additional integration, however many students did not use it.
      Most common errors arose from the signs of the terms: without brackets students obtained{' '}
      <Katex tex="-x^2-3x" /> rather than <Katex tex="-x^2+x" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2-2x = (x-1)^2-1" />,
    reason: 'Completing the square shows the vertex is at (1, −1).',
  },
  {
    working: <Katex display tex="\text{Domain } (-\infty,1] \implies \text{the vertex is the right-hand endpoint}" />,
    reason: 'On this restricted domain the parabola is decreasing throughout, so its lowest point is at x = 1.',
  },
  {
    working: <Katex display tex="\boxed{\text{range} = [-1,\,\infty)}" />,
    reason: <>Square bracket at <Katex tex="-1" /> because <Katex tex="x=1" /> is included; round bracket at <Katex tex="\infty" /> always. Both the brackets and the order are part of the answer.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Reflect } y=f(x) \text{ in the line } y=x" />,
    reason: 'That reflection is the definition of the inverse — every point (a, b) becomes (b, a).',
  },
  {
    working: <Katex display tex="(1,-1) \mapsto (-1,\,1)" />,
    reason: 'The endpoint of f becomes the endpoint of f⁻¹, and it stays closed.',
  },
  {
    working: <Katex display tex="(0,0) \mapsto (0,\,0)" />,
    reason: <>The origin is on <Katex tex="y=x" />, so it is fixed — it is the only axial intercept of either curve, and both graphs pass through it.</>,
  },
  {
    working: <Katex display tex="\text{Curves meet exactly on } y=x \text{ and are mirror images elsewhere}" />,
    reason: <>Use the printed grid: the two graphs must be visibly symmetric about <Katex tex="y=x" />, which is the property assessors look for.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="y = (x-1)^2-1" />,
    reason: 'Turning-point form makes the rearrangement possible; the expanded form does not.',
  },
  {
    working: <Katex display tex="\text{Swap } x \leftrightarrow y: \quad x = (y-1)^2-1" />,
    reason: 'The standard first move, and worth signposting in your working.',
  },
  {
    working: <Katex display tex="(y-1)^2 = x+1 \implies y-1 = \pm\sqrt{x+1}" />,
    reason: 'Both roots appear; one of them has to go.',
  },
  {
    working: <Katex display tex="\text{range of } f^{-1} = \text{domain of } f = (-\infty,1] \implies y\le1 \implies y-1\le0" />,
    reason: <>So the <em>negative</em> root is the right one. Choosing <Katex tex="1+\sqrt{x+1}" /> is the report's most common error, and the sketch in part b. rules it out at a glance.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 1-\sqrt{x+1}, \quad \text{domain } [-1,\infty)}" />,
    reason: <>The domain of <Katex tex="f^{-1}" /> is the range of <Katex tex="f" /> from part a. Check: <Katex tex="f^{-1}(3)=1-2=-1" /> and <Katex tex="f(-1)=1+2=3" /> ✓.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="-x = x^2-2x \implies x^2-x = 0 \implies x = 0 \ \text{ or } \ x = 1" />,
    reason: <>Where <Katex tex="y=-x" /> cuts <Katex tex="f" />: the points <Katex tex="(0,0)" /> and <Katex tex="(1,-1)" />.</>,
  },
  {
    working: <Katex display tex="\text{Reflecting in } y=x \text{ maps } y=-x \text{ to itself}" />,
    reason: <>So the second region is the mirror image of the first, cut off between <Katex tex="(-1,1)" /> and <Katex tex="(0,0)" />, and has exactly the same area. One integral does for both.</>,
  },
  {
    working: <Katex display tex="A = 2\int_0^1\Bigl(-x-\left(x^2-2x\right)\Bigr)dx" />,
    reason: <>Upper curve minus lower: on <Katex tex="(0,1)" /> the line sits above the parabola. Keep the bracket — dropping it gives <Katex tex="-x^2-3x" />, the report's named error.</>,
  },
  {
    working: <Katex display tex="= 2\int_0^1\left(x-x^2\right)dx" />,
    reason: <><Katex tex="-x-x^2+2x=x-x^2" />.</>,
  },
  {
    working: <Katex display tex="= 2\left[\frac{x^2}{2}-\frac{x^3}{3}\right]_0^1 = 2\left(\frac12-\frac13\right)" />,
    reason: 'Antidifferentiate and substitute.',
  },
  {
    working: <Katex display tex="\boxed{A = 2\times\frac16 = \frac13 \ \text{square units}}" />,
    reason: <>Each region is <Katex tex="\tfrac16" />. A sanity check: the two regions sit inside the unit squares either side of the origin, so a total well under 1 is right.</>,
  },
]

export default function MethodsQ7_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (7 marks)</p>
        <p>
          Consider <Katex tex="f:(-\infty,1]\to\mathbb{R}" />,{' '}
          <Katex tex="f(x)=x^2-2x" />. Part of the graph of <Katex tex="y=f(x)" /> is shown
          below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="The left half of a parabola on a grid, falling from above y = 3 near x = −1 through the origin to a closed endpoint at (1, −1) — from the original 2023 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Everything in this question comes out of one picture: <Katex tex="f" /> and{' '}
            <Katex tex="f^{-1}" /> are mirror images in <Katex tex="y=x" />. That swaps the
            domain and range (part a. feeds part c.), it fixes which square root to keep in
            part c., and in part d. it means the two regions are congruent, so only one
            integral is needed.
          </p>
          <p>
            The line <Katex tex="y=-x" /> is perpendicular to <Katex tex="y=x" /> and so is
            its own mirror image — which is why it cuts a matching piece off each curve.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>State the range of <Katex tex="f" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Sketch the graph of the inverse function <Katex tex="y=f^{-1}(x)" /> on the axes
            above. Label any endpoints and axial intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="The restricted parabola in blue with endpoint (1, −1) and the inverse in orange with endpoint (−1, 1), the two curves mirror images in the dashed line y = x and crossing at the origin"
            className="w-full max-w-[420px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Determine the equation and the domain for the inverse function{' '}
            <Katex tex="f^{-1}" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Calculate the area of the regions enclosed by the curves of <Katex tex="f" />,{' '}
            <Katex tex="f^{-1}" /> and <Katex tex="y=-x" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={regionSrc}
            alt="The line y = −x cutting a lens-shaped region off the parabola between (0, 0) and (1, −1) and a congruent region off the inverse between (−1, 1) and (0, 0), both shaded"
            className="w-full max-w-[380px]"
          />
        </div>
      </PartCard>
    </div>
  )
}
