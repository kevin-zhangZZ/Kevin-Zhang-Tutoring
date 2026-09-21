// 2014 Mathematical Methods (CAS) — Exam 1, Question 10 (7 marks). A tangent to a parabola
// at a fixed point, then minimising and maximising the area between a line and a rectangle
// over a closed interval. Question text transcribed from the original paper; both figures are
// crops of VCAA's own artwork. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import tangentSrc from './meth-2014e1-q10a-tangent.png'
import rectSrc from './meth-2014e1-q10b-rectangle.png'

const EXAM_A: SAExaminerStats = {
  marks: [28, 30, 12, 30],
  average: 1.5,
  comment: (
    <>
      Most students knew to set up two equations to solve simultaneously. The most common
      error was to substitute <Katex tex="x=6" /> and <Katex tex="y=0" /> into{' '}
      <Katex tex="y=ax^2+bx" />, stating incorrectly that the point <Katex tex="(6,0)" /> lay
      on the parabola.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [68, 32],
  average: 0.3,
  comment: (
    <>
      Some students were able to set up a suitable equation; however, errors in algebraic
      manipulation (or poor setting out of working) often resulted in incorrect final answers.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [74, 17, 9],
  average: 0.4,
  comment: (
    <>
      This question was answered poorly. A complete solution required setting up an equation
      for the area in one variable and then testing turning points <em>as well as endpoints</em>{' '}
      to determine the minimum value. Many students set up overly complex equations for the
      area or had difficulty differentiating. Other students simply assumed{' '}
      <Katex tex="u=6" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [92, 8],
  average: 0.1,
  comment: (
    <>
      This question was also answered poorly. Many students who attempted it incorrectly
      assumed that the maximum area occurred at a local stationary point. Some students gave
      only a partial answer and not the values for both <Katex tex="u" /> and the area.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="Q(2,4) \text{ on } y = ax^2+bx: \quad 4 = 4a+2b" />,
    reason: <>The parabola passes through <Katex tex="Q" />. Note <Katex tex="(6,0)" /> is on the <em>tangent line</em>, not the parabola — substituting it into the parabola is the report's headline error.</>,
  },
  {
    working: <Katex display tex="m_{UQ} = \frac{0-4}{6-2} = -1" />,
    reason: <>With <Katex tex="u=6" />, the tangent runs through <Katex tex="U(6,0)" /> and <Katex tex="Q(2,4)" />, so its gradient is fixed by those two points.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2ax+b \implies 4a+b = -1" />,
    reason: <>The parabola's gradient at <Katex tex="x=2" /> must equal the tangent's.</>,
  },
  {
    working: <Katex display tex="\begin{cases}4a+2b = 4\\ 4a+b = -1\end{cases}" />,
    reason: <>Two equations, two unknowns.</>,
  },
  {
    working: <Katex display tex="\text{subtracting: } b = 5" />,
    reason: <>The <Katex tex="4a" /> terms cancel straight away.</>,
  },
  {
    working: <Katex display tex="4a = -1-5 = -6 \implies \boxed{a = -\tfrac32,\ b = 5}" />,
    reason: <>Check: <Katex tex="y=-\tfrac32(4)+5(2)=-6+10=4" /> ✓, and <Katex tex="\tfrac{dy}{dx}=-3(2)+5=-1" /> ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac xu+\frac yv = 1" />,
    reason: <>The intercept form of a line through <Katex tex="(u,0)" /> and <Katex tex="(0,v)" /> — much faster here than gradient form.</>,
  },
  {
    working: <Katex display tex="Q(2,4) \text{ on the line}: \quad \frac2u+\frac4v = 1" />,
    reason: <>The line still passes through <Katex tex="Q" /> as <Katex tex="u" /> varies — that is what ties <Katex tex="v" /> to <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\frac4v = 1-\frac2u = \frac{u-2}{u}" />,
    reason: <>Common denominator on the right.</>,
  },
  {
    working: <Katex display tex="\boxed{v = \frac{4u}{u-2}}" />,
    reason: <>Taking reciprocals and multiplying by 4. Sanity check at <Katex tex="u=6" />: <Katex tex="v=\tfrac{24}4=6" />, matching the part a. tangent <Katex tex="y=-x+6" /> ✓.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="A = \text{area}(\triangle OUV) - \text{area}(OPQR)" />,
    reason: <>The two shaded triangles together are exactly the big triangle with the rectangle removed — far simpler than computing them separately.</>,
  },
  {
    working: <Katex display tex="A = \tfrac12uv - 2\times4 = \tfrac12u\cdot\frac{4u}{u-2} - 8" />,
    reason: <>The rectangle is <Katex tex="2" /> by <Katex tex="4" />, since <Katex tex="Q=(2,4)" />. Substituting part b(i) puts everything in terms of <Katex tex="u" /> alone.</>,
  },
  {
    working: <Katex display tex="A(u) = \frac{2u^2}{u-2}-8, \qquad \tfrac52\le u\le6" />,
    reason: <>One variable, one closed interval — now it is an ordinary optimisation.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{du} = \frac{4u(u-2)-2u^2}{(u-2)^2} = \frac{2u(u-4)}{(u-2)^2}" />,
    reason: <>Quotient rule, then factorise the numerator.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{du} = 0 \implies u = 0 \text{ or } u = 4" />,
    reason: <>Only <Katex tex="u=4" /> lies in <Katex tex="\left[\tfrac52,6\right]" />.</>,
  },
  {
    working: <Katex display tex="A(4) = \frac{32}{2}-8 = 8" />,
    reason: <>The stationary value.</>,
  },
  {
    working: <Katex display tex="A\!\left(\tfrac52\right) = \frac{12.5}{0.5}-8 = 17, \qquad A(6) = \frac{72}{4}-8 = 10" />,
    reason: <>Both endpoints must be checked on a closed interval — the step the report singles out.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum area } 8 \text{ at } u = 4}" />,
    reason: <>Smaller than either endpoint value, so the stationary point is the global minimum.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="A\!\left(\tfrac52\right) = 17, \qquad A(4) = 8, \qquad A(6) = 10" />,
    reason: <>The three candidates are already computed in part b(ii) — nothing new to differentiate.</>,
  },
  {
    working: <Katex display tex="\text{the only stationary point is a minimum}" />,
    reason: <>So the maximum must occur at an endpoint. Assuming it sits at a stationary point is the report's main criticism.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum area } 17 \text{ at } u = \tfrac52}" />,
    reason: <>The left endpoint. Both values are required — <Katex tex="u" /> and the area.</>,
  },
]

export default function MethodsQ10_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (7 marks)</p>
        <p>
          A line intersects the coordinate axes at the points <Katex tex="U" /> and{' '}
          <Katex tex="V" /> with coordinates <Katex tex="(u,0)" /> and <Katex tex="(0,v)" />,
          respectively, where <Katex tex="u" /> and <Katex tex="v" /> are positive real
          numbers and <Katex tex="\tfrac52\le u\le6" />.
        </p>
      </div>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          When <Katex tex="u=6" />, the line is a tangent to the graph of{' '}
          <Katex tex="y=ax^2+bx" /> at the point <Katex tex="Q" /> with coordinates{' '}
          <Katex tex="(2,4)" />, as shown.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={tangentSrc}
            alt="A downward parabola through the origin touching a falling straight line at Q(2, 4); the line crosses the y-axis at V(0, v) and the x-axis at U(u, 0) — from the original 2014 VCAA exam paper"
            className="w-full max-w-[330px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            If <Katex tex="a" /> and <Katex tex="b" /> are non-zero real numbers, find the
            values of <Katex tex="a" /> and <Katex tex="b" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The rectangle <Katex tex="OPQR" /> has a vertex at <Katex tex="Q" /> on the line.
          The coordinates of <Katex tex="Q" /> are <Katex tex="(2,4)" />, as shown.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={rectSrc}
            alt="The line from V(0, v) down to U(u, 0) passing through Q(2, 4), with the rectangle OPQR beneath it and the two remaining triangles VRQ and QPU shaded — from the original 2014 VCAA exam paper"
            className="w-full max-w-[330px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        marks={1}
        statement={<>Find an expression for <Katex tex="v" /> in terms of <Katex tex="u" />.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={2}
        statement={
          <>
            Find the minimum total shaded area and the value of <Katex tex="u" /> for which
            the area is a minimum.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        marks={1}
        statement={
          <>
            Find the maximum total shaded area and the value of <Katex tex="u" /> for which
            the area is a maximum.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>
    </div>
  )
}
