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
    working: <Katex display tex="\begin{aligned}f(x)&=\tfrac15(x-2)^2(5-x)\\&= \tfrac15\bigl(-x^3+9x^2-24x+20\bigr)\end{aligned}" />,
    reason: <>Expand: <Katex tex="(x^2-4x+4)(5-x)=-x^3+9x^2-24x+20" />, so the derivative is term by term.</>,
    more: <>On Exam 2 the quickest route is the CAS derivative template (menu → Calculus → Derivative), then factor the result. By hand, the product rule on the factored form works just as well.</>,
  },
  {
    working: <Katex display tex="f'(x) = \tfrac15\bigl(-3x^2+18x-24\bigr)" />,
    reason: <>Term by term, using <Katex tex="\tfrac{d}{dx}(x^n)=nx^{n-1}" />; the constant 20 differentiates to 0.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = -\tfrac35(x-2)(x-4)}" />,
    reason: <>Take out <Katex tex="-\tfrac35" /> and factorise <Katex tex="x^2-6x+8" />. The unfactorised form also earns the mark.</>,
    more: <>Factorising is worth the extra line: it hands you the stationary points at <Katex tex="x=2" /> and <Katex tex="x=4" />, matching the graph's minimum on the <Katex tex="x" />-axis and the maximum just beyond it. The report's only complaint was transcription errors — copy <Katex tex="f(x)" /> into the CAS (or your working) carefully, and check the sign of <Katex tex="(5-x)" /> survives.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(1) = -\tfrac35(1-2)(1-4) = -\tfrac35(-1)(-3) = -\tfrac95" />,
    reason: <>The gradient of the tangent at <Katex tex="P" />. Substitute <Katex tex="x=1" /> into <Katex tex="f'(x)" />: <Katex tex="(-1)(-3)=3" />, so the result is <Katex tex="-\tfrac35\times3" />.</>,
  },
  {
    working: <Katex display tex="y - \tfrac45 = -\tfrac95(x-1)" />,
    reason: <>Point–gradient form through <Katex tex="P\left(1,\tfrac45\right)" />.</>,
  },
  {
    working: <Katex display tex="y = -\tfrac95x + \tfrac95 + \tfrac45" />,
    reason: <>Expanding the bracket and moving <Katex tex="\tfrac45" /> across.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\tfrac95x + \tfrac{13}5}" />,
    reason: <>Since <Katex tex="\tfrac95+\tfrac45=\tfrac{13}5" />. Write the answer as an equation, <Katex tex="y=\dots" />, not just an expression.</>,
    more: <>The report notes students who lost the mark by leaving it as <Katex tex="-\tfrac95x+\tfrac{13}5" /> — a tangent is a line, and a line is an equation. Check: at <Katex tex="x=1" />, <Katex tex="-\tfrac95+\tfrac{13}5=\tfrac45" /> ✓, so the line does pass through <Katex tex="P" />.</>,
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
    reason: <>Give both as labelled coordinate pairs, and exact: <Katex tex="1.44" /> for <Katex tex="\tfrac{13}9" /> was marked wrong.</>,
    more: <>The report also saw answers that weren't written as coordinates, or had the labels swapped. Keep it straight: <Katex tex="S" /> is on the <Katex tex="y" />-axis, so its <Katex tex="x" />-coordinate is 0; <Katex tex="Q" /> is on the <Katex tex="x" />-axis, so its <Katex tex="y" />-coordinate is 0. Check against VCAA's figure: <Katex tex="Q" /> sits just right of <Katex tex="P" /> (<Katex tex="\tfrac{13}9\approx1.44" />), and <Katex tex="S" /> is below the 4 marked on the <Katex tex="y" />-axis (<Katex tex="\tfrac{13}5=2.6" />).</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="P\left(1,\tfrac45\right),\quad S\left(0,\tfrac{13}5\right)" />,
    reason: <>The two points the question names — <Katex tex="P" /> (given) and <Katex tex="S" /> (from b.ii). It is <Katex tex="PS" />, not <Katex tex="QS" />.</>,
    more: <>The report says many students found <Katex tex="QS" /> instead, giving <Katex tex="\sqrt{\left(\tfrac{13}9\right)^2+\left(\tfrac{13}5\right)^2}" />. Re-read which two letters the question names before substituting.</>,
  },
  {
    working: <Katex display tex="PS = \sqrt{(1-0)^2+\left(\tfrac45-\tfrac{13}5\right)^2}" />,
    reason: <>The distance formula, <Katex tex="d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}" />. The <Katex tex="y" />-values share denominator 5, so the difference is quick.</>,
  },
  {
    working: <Katex display tex="= \sqrt{1 + \left(-\tfrac95\right)^2} = \sqrt{1+\tfrac{81}{25}}" />,
    reason: <><Katex tex="\tfrac45-\tfrac{13}5=-\tfrac95" />; squaring removes the negative sign.</>,
  },
  {
    working: <Katex display tex="\boxed{PS = \sqrt{\tfrac{106}{25}} = \frac{\sqrt{106}}{5}}" />,
    reason: <><Katex tex="1+\tfrac{81}{25}=\tfrac{106}{25}" /> and <Katex tex="\sqrt{25}=5" />. So <Katex tex="b=106" />, <Katex tex="c=5" />; <Katex tex="106=2\times53" /> has no square factor to simplify.</>,
    more: <>Sense check: from <Katex tex="S" /> to <Katex tex="P" /> is 1 across and <Katex tex="\tfrac95=1.8" /> down, so <Katex tex="PS" /> must be longer than 1.8 (the longer side) but shorter than <Katex tex="1+1.8=2.8" />. <Katex tex="\tfrac{\sqrt{106}}5\approx2.06" /> ✓.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve((1/5)(x-2)^2(5-x) = -9x/5 + 13/5, x)</Cas>,
    reason: <>First find where the curve and the tangent meet, which sets the terminals.</>,
  },
  {
    working: <Katex display tex="x = 1 \quad\text{or}\quad x = 7" />,
    reason: <><Katex tex="x=1" /> is the point of tangency <Katex tex="P" />; <Katex tex="x=7" /> is where the line cuts back through the curve.</>,
  },
  {
    working: <Katex display tex="A = \int_1^7\Bigl(f(x) - \left(-\tfrac95x+\tfrac{13}5\right)\Bigr)dx" />,
    reason: <>In the figure the curve is above the tangent across the whole region, so one integral of (upper − lower) does it — no splitting at the <Katex tex="x" />-axis.</>,
    more: <>The report flags two presentation errors: a missing <Katex tex="dx" />, and poor bracketing. Without the bracket around the line, <Katex tex="f(x)-\tfrac{-9}{5}x+\tfrac{13}{5}" /> adds <Katex tex="\tfrac{13}5" /> instead of subtracting it. Many students also split the region at the <Katex tex="x" />-axis into separate areas — unnecessary, because the area between two graphs is <Katex tex="\int_a^b(\text{upper}-\text{lower})\,dx" /> wherever the <Katex tex="x" />-axis falls.</>,
  },
  {
    working: <Cas fn="nInt">∫((1/5)(x-2)^2(5-x) - (-9x/5+13/5), x, 1, 7)</Cas>,
    reason: <>Enter it with the integral template (menu → Calculus → Integral) so the CAS returns the exact value.</>,
    more: <>Why the curve really is on top: the integrand simplifies to <Katex tex="-\tfrac15(x-1)^2(x-7)" />, and on <Katex tex="(1,7)" /> the factor <Katex tex="(x-1)^2" /> is positive and <Katex tex="(x-7)" /> is negative, so the whole thing is positive. The repeated factor <Katex tex="(x-1)^2" /> is also why <Katex tex="x=1" /> is a point of tangency.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{108}{5}}" />,
    reason: <>Give the exact value, since no decimal was asked for (it equals 21.6 square units).</>,
    more: <>The report notes some students did this by hand rather than with technology — on Exam 2 that costs time and invites slips. If you want a check anyway, expand: <Katex tex="-\tfrac15\int_1^7(x^3-9x^2+15x-7)\,dx" />{' '}<Katex tex="=-\tfrac15\left[\tfrac{x^4}4-3x^3+\tfrac{15x^2}2-7x\right]_1^7" />{' '}<Katex tex="=-\tfrac15\left(-\tfrac{441}4+\tfrac94\right)=\tfrac{108}5" /> ✓.</>,
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
          <img loading="lazy" decoding="async"
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
          <img loading="lazy" decoding="async"
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
