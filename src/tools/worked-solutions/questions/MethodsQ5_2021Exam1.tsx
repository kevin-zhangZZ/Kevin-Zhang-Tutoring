// 2021 Mathematical Methods — Exam 1 Question 5 (4 marks). An x-intercept of a translated
// parabola, then a dilation and a translation applied in a given order. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    reason: <>Only <Katex tex="g" /> matters here — solving <Katex tex="f(x)=g(x)" /> answers a different question.</>,
  },
  {
    working: <Katex display tex="(x-1)^2 = 1 \implies x-1 = \pm1" />,
    reason: <>Dividing by 4 first keeps the numbers trivial; the quadratic formula is overkill.</>,
  },
  {
    working: <Katex display tex="x = 0 \text{ or } x = 2" />,
    reason: <>The turning point is at <Katex tex="x=1" />, so the two intercepts are symmetric about it — a one-line check.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,\ 0)}" />,
    reason: <>The other intercept, since <Katex tex="(2,0)" /> is the one given. Coordinates, not just an <Katex tex="x" />-value.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{dilation by } \tfrac12 \text{ from the vertical axis: } x \to \tfrac{x}{2}" />,
    reason: <>A horizontal dilation by factor <Katex tex="\tfrac12" /> <em>halves</em> distances from the <Katex tex="y" />-axis, so the rule takes <Katex tex="f(2x)" /> — the reciprocal of the factor goes inside.</>,
  },
  {
    working: <Katex display tex="\text{after the dilation: } y = f(2x) = 4x^2-4" />,
    reason: <>Substituting <Katex tex="2x" /> into <Katex tex="x^2-4" />.</>,
  },
  {
    working: <Katex display tex="\text{then translate } 2 \text{ right: } x \to x-2" />,
    reason: <>Applied <em>after</em> the dilation, so it replaces the <Katex tex="x" /> in the already-dilated rule.</>,
  },
  {
    working: <Katex display tex="\boxed{h(x) = f\bigl(2(x-2)\bigr) = 4(x-2)^2-4}" />,
    reason: <>Equivalently <Katex tex="4x^2-16x+12" />. The brackets around <Katex tex="x-2" /> are essential — dropping them gives <Katex tex="(2x-2)^2-4" />, which is the report's named error.</>,
  },
  {
    working: <Katex display tex="\text{intercepts of } f: \ (\pm2,0) \to \text{halve} \to (\pm1,0) \to \text{shift } 2 \to (1,0),(3,0)" />,
    reason: <>Transforming the two points directly is quicker than solving the new rule — the report notes few students realised this.</>,
  },
  {
    working: <Katex display tex="\boxed{(1,\ 0) \ \text{ and } \ (3,\ 0)}" />,
    reason: <>Check against the rule: <Katex tex="4(x-2)^2=4 \Rightarrow x-2=\pm1" /> ✓.</>,
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
      </PartCard>
    </div>
  )
}
