// 2015 Mathematical Methods (CAS) — Exam 2, Section 2 Question 1 (9 marks).
// A tangent to the cubic f(x) = (1/5)(x-2)^2(5-x) at P(1, 4/5): the derivative, the tangent
// line and its axis intercepts, the distance PS in surd form, and the area between the curve
// and the tangent. Question text transcribed from the original paper; both figures are crops
// of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2015e2-q1-graph.png'
import shadedSrc from './meth-2015e2-q1d-shaded.png'

const EXAM_A: SAExaminerStats = {
  marks: [6, 94],
  average: 1,
  comment: <>This question was answered well. However, there were some transcription errors.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: (
    <>
      This question was answered well. However, some students did not write an{' '}
      <em>equation</em>, leaving their answer as <Katex tex="-\tfrac95x+\tfrac{13}5" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [20, 9, 70],
  average: 1.5,
  comment: (
    <>
      This question was answered well. Some students did not write their answers as
      coordinates. Others labelled the coordinates incorrectly. Some wrote{' '}
      <Katex tex="\tfrac{13}9" /> as <Katex tex="1.44" />, which was incorrect. An exact
      answer was required.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [37, 10, 52],
  average: 1.2,
  comment: (
    <>
      Various incorrect formulas for the distance between two points were given. There was
      some poor substitution into the distance formula. Many students found the distance
      using <Katex tex="QS" />.{' '}
      <Katex tex="\sqrt{\left(\tfrac{13}9\right)^2+\left(\tfrac{13}5\right)^2}" /> was a
      common incorrect response.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [25, 14, 7, 54],
  average: 1.9,
  comment: (
    <>
      The ‘<Katex tex="dx" />’ was often missing and brackets were used poorly; for example,{' '}
      <Katex tex="\int_1^7\left(f(x)-\tfrac{-9}{5}x+\tfrac{13}{5}\right)dx" />. Many students
      split the areas up rather than just using{' '}
      <Katex tex="\int_a^b(\text{upper function}-\text{lower function})\,dx" />. Some students completed the
      solution by hand rather than using technology.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\tfrac15(x-2)^2(5-x) = \tfrac15\bigl(-x^3+9x^2-24x+20\bigr)" />,
    reason: <>Expanding first makes the differentiation a one-liner; the product rule on the factored form works just as well.</>,
  },
  {
    working: <Katex display tex="f'(x) = \tfrac15\bigl(-3x^2+18x-24\bigr)" />,
    reason: <>Term by term.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = -\tfrac35(x-2)(x-4)}" />,
    reason: <>Factorising is worth the extra line — it hands you the stationary points at <Katex tex="x=2" /> and <Katex tex="x=4" /> free of charge, matching the graph's minimum on the <Katex tex="x" />-axis and maximum just beyond it. VCAA also accepted the unfactorised form.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(1) = -\tfrac35(1-2)(1-4) = -\tfrac35(-1)(-3) = -\tfrac95" />,
    reason: <>The gradient of the tangent at <Katex tex="P" />. Two negatives multiply to a positive, so the <Katex tex="-\tfrac35" /> out the front survives.</>,
  },
  {
    working: <Katex display tex="y - \tfrac45 = -\tfrac95(x-1)" />,
    reason: <>Point–gradient form through <Katex tex="P\left(1,\tfrac45\right)" />.</>,
  },
  {
    working: <Katex display tex="y = -\tfrac95x + \tfrac95 + \tfrac45" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\tfrac95x + \tfrac{13}5}" />,
    reason: <>Write it as an equation, not just an expression — the report notes students who left it as <Katex tex="-\tfrac95x+\tfrac{13}5" />. Check: <Katex tex="-\tfrac95+\tfrac{13}5=\tfrac45" /> at <Katex tex="x=1" /> ✓.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="x=0:\quad y = -\tfrac95(0)+\tfrac{13}5 = \tfrac{13}5" />,
    reason: <><Katex tex="S" /> is where the tangent cuts the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="S = \left(0,\ \tfrac{13}5\right)" />,
    reason: <>As coordinates, exactly.</>,
  },
  {
    working: <Katex display tex="y=0:\quad -\tfrac95x+\tfrac{13}5 = 0 \implies x = \tfrac{13}9" />,
    reason: <><Katex tex="Q" /> is where it cuts the <Katex tex="x" />-axis. Multiply through by 5, then divide by 9.</>,
  },
  {
    working: <Katex display tex="\boxed{Q = \left(\tfrac{13}9,\ 0\right), \quad S = \left(0,\ \tfrac{13}5\right)}" />,
    reason: <>As coordinates, and exact — <Katex tex="1.44" /> for <Katex tex="\tfrac{13}9" /> was marked wrong. Consistent with the diagram: <Katex tex="Q" /> just right of the origin, <Katex tex="S" /> a little below 4 on the <Katex tex="y" />-axis.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="P\left(1,\tfrac45\right),\quad S\left(0,\tfrac{13}5\right)" />,
    reason: <>The two points the question names. Note it is <Katex tex="PS" />, not <Katex tex="QS" />.</>,
  },
  {
    working: <Katex display tex="PS = \sqrt{(1-0)^2+\left(\tfrac45-\tfrac{13}5\right)^2}" />,
    reason: <>The distance formula. Common denominators already, so the <Katex tex="y" />-difference is easy.</>,
  },
  {
    working: <Katex display tex="= \sqrt{1 + \left(-\tfrac95\right)^2} = \sqrt{1+\tfrac{81}{25}}" />,
    reason: <>Squaring kills the sign.</>,
  },
  {
    working: <Katex display tex="\boxed{PS = \sqrt{\tfrac{106}{25}} = \frac{\sqrt{106}}{5}}" />,
    reason: <>So <Katex tex="b=106" /> and <Katex tex="c=5" />. Since <Katex tex="106=2\times53" /> has no square factor, the surd cannot be simplified further. About 2.06 — a bit longer than the unit horizontal step from <Katex tex="S" /> to <Katex tex="P" />, as it should be.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve((1/5)(x-2)^2(5-x) = -9x/5 + 13/5, x)</Cas>,
    reason: <>First find where the curve and the tangent meet, which sets the terminals.</>,
  },
  {
    working: <Katex display tex="x = 1 \quad\text{or}\quad x = 7" />,
    reason: <><Katex tex="x=1" /> is the point of tangency <Katex tex="P" /> (a repeated root, which is what "tangent" means algebraically); <Katex tex="x=7" /> is where the line cuts back through the curve.</>,
  },
  {
    working: <Katex display tex="A = \int_1^7\Bigl(f(x) - \left(-\tfrac95x+\tfrac{13}5\right)\Bigr)dx" />,
    reason: <>Reading the diagram, the curve is the upper boundary and the tangent the lower one across the whole interval, so a single integral does it — no splitting required.</>,
  },
  {
    working: <Cas fn="nInt">∫((1/5)(x-2)^2(5-x) - (-9x/5+13/5), x, 1, 7)</Cas>,
    reason: <>By hand the integrand factorises as <Katex tex="-\tfrac15(x-1)^2(x-7)" />, which is positive on <Katex tex="(1,7)" /> — confirming the curve really is above the line throughout.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{108}{5}}" />,
    reason: <>An exact answer, as Section 2 requires unless a decimal is specified. By hand, with <Katex tex="u=x-1" />: <Katex tex="-\tfrac15\int_0^6u^2(u-6)\,du=-\tfrac15\left[\tfrac{u^4}4-2u^3\right]_0^6=-\tfrac15(324-432)=\tfrac{108}5" /> ✓.</>,
  },
]

export default function MethodsQ1_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (9 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=\tfrac15(x-2)^2(5-x)" />. The point{' '}
          <Katex tex="P\left(1,\tfrac45\right)" /> is on the graph of <Katex tex="f" />, as
          shown below. The tangent at <Katex tex="P" /> cuts the <Katex tex="y" />-axis at{' '}
          <Katex tex="S" /> and the <Katex tex="x" />-axis at <Katex tex="Q" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="The cubic y = f(x) with a local minimum just right of the y-axis and a local maximum further right, together with the tangent at P(1, 4/5) falling steeply from S on the y-axis through Q on the x-axis — from the original 2015 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Derivative" marks={1} statement={<>Write down the derivative <Katex tex="f'(x)" /> of <Katex tex="f(x)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Tangent Line"
        marks={1}
        statement={<>Find the equation of the tangent to the graph of <Katex tex="f" /> at the point <Katex tex="P\left(1,\tfrac45\right)" />.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Intersections"
        marks={2}
        statement={<>Find the coordinates of points <Katex tex="Q" /> and <Katex tex="S" />.</>}
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Distance"
        marks={2}
        statement={
          <>
            Find the distance <Katex tex="PS" /> and express it in the form{' '}
            <Katex tex="\dfrac{\sqrt b}{c}" />, where <Katex tex="b" /> and <Katex tex="c" />{' '}
            are positive integers.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={shadedSrc}
            alt="The same curve and tangent, with the region between them shaded from the point of tangency P across to where the tangent meets the curve again — from the original 2015 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard letter="d" topic="Area Between Curves" marks={3} statement={<>Find the area of the shaded region in the graph above.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
