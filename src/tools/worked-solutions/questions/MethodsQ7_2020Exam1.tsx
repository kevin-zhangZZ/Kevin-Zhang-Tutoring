// 2020 Mathematical Methods — Exam 1, Question 7 (8 marks). Tangents from an external point
// to a parabola, then a translation that minimises a distance. Question text transcribed
// from the original paper; the figure is a crop of VCAA's own artwork. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2020e1-q7-parabola.png'

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      This was a "show that" question, so those students who simply stated{' '}
      <Katex tex="f(1)=9" /> without explaining the relevance of this were not awarded the
      mark. Some students found the discriminant of the quadratic to be negative but did not
      relate this to the question.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      Many students wrote down an expression for gradient but went no further. Some students
      made algebraic errors, in particular cancellations of <Katex tex="a" /> or dealing with
      negative coefficients.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      Most students recognised that an evaluation of the derivative was required. Some
      incorrectly assumed the question required the <em>equation</em> of the tangent at{' '}
      <Katex tex="x=a" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [56, 14, 31],
  average: 0.8,
  comment: (
    <>
      Students who equated gradients tended to score more highly. Many of those who used the
      "equation of the tangent" method could not form the correct quadratic equation.
    </>
  ),
}

const EXAM_BIV: SAExaminerStats = {
  marks: [71, 29],
  average: 0.3,
  comment: (
    <>
      The most common error was students assuming that their value of <Katex tex="a" /> was
      the gradient of the line, instead of substituting into <Katex tex="f'(a)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [87, 3, 10],
  average: 0.2,
  comment: (
    <>
      Many students used the distance formula and then attempted to differentiate and equate
      to zero, often with limited success. Students who used a geometric approach tended to
      score more highly.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(1) = 1^2+3(1)+5 = 9" />,
    reason: <>Substituting the <Katex tex="x" />-coordinate of <Katex tex="P" />.</>,
  },
  {
    working: <Katex display tex="9 \ne 0" />,
    reason: <>The point <Katex tex="P" /> has <Katex tex="y=0" />, but the curve is at <Katex tex="y=9" /> when <Katex tex="x=1" />, so <Katex tex="P" /> is not on the graph. Stating <Katex tex="f(1)=9" /> alone does not earn the mark — the comparison is the argument.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="P(1,0), \qquad Q\bigl(a,f(a)\bigr) = \left(a,\,a^2+3a+5\right)" />,
    reason: <>The two points the line joins.</>,
  },
  {
    working: <Katex display tex="m_{PQ} = \frac{f(a)-0}{a-1}" />,
    reason: <>Rise over run. Order the subtraction consistently.</>,
  },
  {
    working: <Katex display tex="\boxed{m_{PQ} = \frac{a^2+3a+5}{a-1}}" />,
    reason: <>Nothing cancels — the numerator does not factorise with <Katex tex="a-1" /> as a factor, since <Katex tex="f(1)=9\ne0" /> from part a.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2+3x+5 \implies f'(x) = 2x+3" />,
    reason: <>Differentiating.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(a) = 2a+3}" />,
    reason: <>The <em>slope</em> at <Katex tex="Q" />, not the equation of the tangent there.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{a^2+3a+5}{a-1} = 2a+3" />,
    reason: <>If the tangent at <Katex tex="Q" /> passes through <Katex tex="P" />, the line <Katex tex="PQ" /> <em>is</em> the tangent, so parts b(i) and b(ii) must agree. Equating gradients is the short route.</>,
  },
  {
    working: <Katex display tex="a^2+3a+5 = (2a+3)(a-1)" />,
    reason: <>Multiplying through by <Katex tex="a-1" /> (and <Katex tex="a\ne1" />, since <Katex tex="P" /> is not on the curve).</>,
  },
  {
    working: <Katex display tex="a^2+3a+5 = 2a^2+a-3" />,
    reason: <>Expanding the right-hand side.</>,
  },
  {
    working: <Katex display tex="a^2-2a-8 = 0 \implies (a-4)(a+2) = 0" />,
    reason: <>Collecting and factorising.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 4 \quad\text{or}\quad a = -2}" />,
    reason: <>Two tangents from an external point, as the geometry demands.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="a = -2: \quad f(-2) = 4-6+5 = 3, \qquad f'(-2) = -4+3 = -1" />,
    reason: <>The point and the gradient. The gradient is <Katex tex="f'(a)" />, not <Katex tex="a" /> — the report's headline error.</>,
  },
  {
    working: <Katex display tex="y-3 = -1(x+2)" />,
    reason: <>Point–gradient form at <Katex tex="(-2,3)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 1-x}" />,
    reason: <>Check it passes through <Katex tex="P(1,0)" />: <Katex tex="1-1=0" /> ✓. (The other tangent, from <Katex tex="a=4" />, is <Katex tex="y=11x-11" />; either answers the question.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2x+3 = 0 \implies x = -\tfrac32" />,
    reason: <>The turning point of <Katex tex="f" />, which is a minimum since the parabola opens upwards.</>,
  },
  {
    working: <Katex display tex="y = f(x-k) \text{ shifts the turning point to } x = -\tfrac32+k" />,
    reason: <>A horizontal translation of <Katex tex="k" /> units right.</>,
  },
  {
    working: <Katex display tex="\text{distance to } P(1,0) \text{ is least when the vertex is directly above } P" />,
    reason: <>The geometric argument the report recommends: the parabola's lowest point is its closest approach to a point directly below it, and moving the vertex off that vertical only lengthens the gap.</>,
  },
  {
    working: <Katex display tex="-\tfrac32+k = 1" />,
    reason: <>Setting the translated vertex's <Katex tex="x" />-coordinate to <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \tfrac52}" />,
    reason: <>The shortest distance is then <Katex tex="f\!\left(-\tfrac32\right)=\tfrac{11}4" />, straight up from <Katex tex="P" />. Only 10% of students scored both marks.</>,
  },
]

export default function MethodsQ7_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (8 marks)</p>
        <p>
          Consider the function <Katex tex="f(x)=x^2+3x+5" /> and the point{' '}
          <Katex tex="P(1,0)" />. Part of the graph of <Katex tex="y=f(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="An upward parabola labelled f, with its minimum just left of the y-axis and well above the x-axis — from the original 2020 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Show that point <Katex tex="P" /> is not on the graph of <Katex tex="y=f(x)" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Consider a point <Katex tex="Q\bigl(a,f(a)\bigr)" /> to be a point on the graph of{' '}
        <Katex tex="f" />.
      </div>

      <PartCard
        letter="b.i"
        marks={1}
        statement={
          <>
            Find the slope of the line connecting points <Katex tex="P" /> and{' '}
            <Katex tex="Q" /> in terms of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={1}
        statement={
          <>
            Find the slope of the tangent to the graph of <Katex tex="f" /> at point{' '}
            <Katex tex="Q" /> in terms of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        marks={2}
        statement={
          <>
            Let the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=a" /> pass
            through point <Katex tex="P" />. Find the values of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="b.iv"
        marks={1}
        statement={
          <>
            Give the equation of one of the lines passing through point <Katex tex="P" /> that
            is tangent to the graph of <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_BIV}
      >
        <WorkingTable rows={ROWS_BIV} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Find the value, <Katex tex="k" />, that gives the shortest possible distance
            between the graph of the function of <Katex tex="y=f(x-k)" /> and point{' '}
            <Katex tex="P" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
