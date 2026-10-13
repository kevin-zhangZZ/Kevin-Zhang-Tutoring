// 2014 Mathematical Methods (CAS) — Exam 1, Question 10 (7 marks). A tangent to a parabola
// at a fixed point, then minimising and maximising the area between a line and a rectangle
// over a closed interval. Question text transcribed from the original paper; both figures are
// crops of VCAA's own artwork. Answers checked with sympy and against the VCAA examination
// report. Solution is original.
// Interactives (Detailed only): a. meth-2014e1-q10a-tangent (U is on the tangent, not the
// parabola); b.ii meth-2014e1-q10bii-area (the line pivots about Q; A(u) with its stationary
// minimum and endpoint maximum). Skipped: b.i — the marks were lost to algebraic rearrangement,
// which a picture doesn't help; b.iii — the b.ii diagram already shows the endpoint maximum.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import tangentSrc from './meth-2014e1-q10a-tangent.png'
import rectSrc from './meth-2014e1-q10b-rectangle.png'

const TangentWidget = lazyWidget(() => import('../interactives/meth-2014e1-q10a-tangent'))
const AreaWidget = lazyWidget(() => import('../interactives/meth-2014e1-q10bii-area'))

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
      This question was answered poorly. A complete solution to this question required
      setting up an equation for the area in one variable and then testing turning points as
      well as endpoints to determine the minimum value. Many students set up overly complex
      equations for the area or had difficulty in differentiating their equation correctly.
      Other students did the reverse by simply assuming <Katex tex="u=6" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [92, 8],
  average: 0.1,
  comment: (
    <>
      This question was also answered poorly. Many students who attempted this question
      incorrectly assumed that the value of the maximum area occurred at a local stationary
      point. Some students only gave a partial answer to the question and not the values for
      both <Katex tex="u" /> and area.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="Q(2,4) \text{ on } y = ax^2+bx: \quad 4 = 4a+2b" />,
    reason: <>The parabola passes through <Katex tex="Q" />, so its coordinates satisfy the equation. That is one equation; the tangent gives the second.</>,
    more: <>Only <Katex tex="Q" /> is shared by the parabola and the line. <Katex tex="U(6,0)" /> is on the <em>tangent line</em>, not on the parabola (which meets the x-axis at <Katex tex="x=0" /> and <Katex tex="x=\tfrac{10}{3}" />). Substituting <Katex tex="(6,0)" /> into <Katex tex="y=ax^2+bx" /> was the report's most common error: it gives <Katex tex="a=-\tfrac12,\ b=3" />, a parabola that cuts the line at <Katex tex="Q" /> and <Katex tex="U" /> instead of touching it, with gradient <Katex tex="+1" /> at <Katex tex="Q" />.</>,
  },
  {
    working: <Katex display tex="m_{UQ} = \frac{0-4}{6-2} = -1" />,
    reason: <>With <Katex tex="u=6" />, the tangent runs through <Katex tex="U(6,0)" /> and <Katex tex="Q(2,4)" />, so two points fix its gradient.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2ax+b \implies 4a+b = -1" />,
    reason: <>&ldquo;Tangent at <Katex tex="Q" />&rdquo; means the parabola's gradient at <Katex tex="x=2" /> equals the line's gradient, <Katex tex="-1" />.</>,
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
    reason: <>Substitute <Katex tex="b=5" /> into <Katex tex="4a+b=-1" />. Both are non-zero, as the question requires.</>,
    more: <>Check both conditions: <Katex tex="y(2)=-\tfrac32(4)+5(2)=-6+10=4" /> ✓, and <Katex tex="y'(2)=-3(2)+5=-1" /> ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac xu+\frac yv = 1" />,
    reason: <>A line with x-intercept <Katex tex="u" /> and y-intercept <Katex tex="v" />: check that <Katex tex="(u,0)" /> and <Katex tex="(0,v)" /> both satisfy it.</>,
    more: <>This intercept form is the quickest route, but gradient form works too. The gradient through <Katex tex="(0,v)" /> and <Katex tex="(u,0)" /> is <Katex tex="-\tfrac vu" />, so the line is <Katex tex="y=-\tfrac vu x+v" />. Substituting <Katex tex="Q(2,4)" /> gives <Katex tex="4=-\tfrac{2v}{u}+v" />, so <Katex tex="4u=v(u-2)" />, the same answer.</>,
  },
  {
    working: <Katex display tex="Q(2,4) \text{ on the line}: \quad \frac2u+\frac4v = 1" />,
    reason: <>The line always passes through <Katex tex="Q" /> as <Katex tex="u" /> varies — that is what ties <Katex tex="v" /> to <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\frac4v = 1-\frac2u = \frac{u-2}{u}" />,
    reason: <>Isolate the <Katex tex="v" /> term, then write the right side over a common denominator.</>,
  },
  {
    working: <Katex display tex="\boxed{v = \frac{4u}{u-2}}" />,
    reason: <>Flip both sides (<Katex tex="\tfrac v4=\tfrac{u}{u-2}" />), then multiply by 4.</>,
    more: <>The report notes that algebra errors spoiled many answers. A quick check catches most of them: at <Katex tex="u=6" /> this gives <Katex tex="v=\tfrac{24}4=6" />, matching the part a tangent <Katex tex="y=-x+6" /> ✓. Also <Katex tex="v" /> is positive for every <Katex tex="u" /> in <Katex tex="\left[\tfrac52,6\right]" />, as the question says it must be.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="A = \text{area}(\triangle OUV) - \text{area}(OPQR)" />,
    reason: <>The two shaded triangles together are the big triangle <Katex tex="OUV" /> with the rectangle removed — simpler than two separate triangles.</>,
    more: <>The report says many students set up overly complex area equations. Working with the two triangles separately is fine, just longer: <Katex tex="\triangle VRQ" /> has base 2 and height <Katex tex="v-4" />, and <Katex tex="\triangle QPU" /> has base <Katex tex="u-2" /> and height 4, so <Katex tex="A=(v-4)+2(u-2)=v+2u-8" />. After substituting <Katex tex="v" />, this simplifies to the same <Katex tex="A(u)" /> as below.</>,
  },
  {
    working: <Katex display tex="A = \tfrac12uv - 2\times4 = \tfrac12u\cdot\frac{4u}{u-2} - 8" />,
    reason: <>The rectangle is <Katex tex="2" /> by <Katex tex="4" />, since <Katex tex="Q=(2,4)" />. Substituting part b(i) puts everything in terms of <Katex tex="u" /> alone.</>,
  },
  {
    working: <Katex display tex="A(u) = \frac{2u^2}{u-2}-8, \qquad \tfrac52\le u\le6" />,
    reason: <>One variable on a closed interval — now it is an ordinary optimisation.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{du} = \frac{4u(u-2)-2u^2}{(u-2)^2} = \frac{2u(u-4)}{(u-2)^2}" />,
    reason: <>Quotient rule with top <Katex tex="2u^2" /> and bottom <Katex tex="u-2" />; the numerator simplifies to <Katex tex="2u^2-8u" />, then factorise.</>,
    more: <>The report notes many students had trouble differentiating. A division first avoids the quotient rule: <Katex tex="\tfrac{2u^2}{u-2}=2u+4+\tfrac{8}{u-2}" />, so <Katex tex="A=2u-4+\tfrac{8}{u-2}" /> and <Katex tex="A'(u)=2-\tfrac{8}{(u-2)^2}" />. Setting this to 0 gives <Katex tex="(u-2)^2=4" />, so <Katex tex="u=4" /> or <Katex tex="u=0" />, the same as below.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{du} = 0 \implies u = 0 \text{ or } u = 4" />,
    reason: <>The numerator is zero (the denominator never is). Only <Katex tex="u=4" /> lies in <Katex tex="\left[\tfrac52,6\right]" />.</>,
  },
  {
    working: <Katex display tex="A(4) = \frac{32}{2}-8 = 8" />,
    reason: <>The value at the stationary point.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}A\!\left(\tfrac52\right) &= \frac{25/2}{1/2}-8 = 17\\ A(6) &= \frac{72}{4}-8 = 10\end{aligned}" />,
    reason: <>On a closed interval the minimum can be at a stationary point or at an endpoint, so evaluate both endpoints too.</>,
    more: <>The report stresses that a complete solution tests the turning point <em>and</em> the endpoints. Some students instead simply assumed <Katex tex="u=6" />, the tangent case from part a. Its area, 10, is only one endpoint value. At the left end, <Katex tex="2\left(\tfrac52\right)^2=\tfrac{25}{2}" /> and <Katex tex="\tfrac52-2=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum area } 8 \text{ at } u = 4}" />,
    reason: <>8 is smaller than both endpoint values, so the stationary point gives the minimum. Give both the area and <Katex tex="u" />.</>,
    more: <>The sign of <Katex tex="A'" /> confirms it: <Katex tex="A'(3)=-6" /> (decreasing) and <Katex tex="A'(5)=\tfrac{10}{9}" /> (increasing), so <Katex tex="A" /> falls to 8 at <Katex tex="u=4" /> and then rises.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="A\!\left(\tfrac52\right) = 17, \qquad A(4) = 8, \qquad A(6) = 10" />,
    reason: <>The maximum is also at a stationary point or an endpoint, and all three values were found in part b(ii).</>,
  },
  {
    working: <Katex display tex="\text{the only stationary point is a minimum}" />,
    reason: <>So the maximum cannot be at <Katex tex="u=4" />; it must be at an endpoint. Compare the two endpoint values.</>,
    more: <>The report says many students wrongly assumed the maximum occurs at a stationary point. From the sign check in part b(ii), <Katex tex="A" /> decreases on <Katex tex="\left[\tfrac52,4\right]" /> and increases on <Katex tex="[4,6]" />, so the largest value is whichever end is higher: 17 beats 10.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum area } 17 \text{ at } u = \tfrac52}" />,
    reason: <>The left endpoint. The question asks for both the area and the value of <Katex tex="u" />.</>,
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
          <img loading="lazy" decoding="async"
            src={tangentSrc}
            alt="A downward parabola through the origin touching a falling straight line at Q(2, 4); the line crosses the y-axis at V(0, v) and the x-axis at U(u, 0) — from the original 2014 VCAA exam paper"
            className="w-full max-w-[330px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Tangent Line"
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
        <Explore title="U(6, 0) is on the tangent, not on the parabola">
          <TangentWidget />
        </Explore>
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The rectangle <Katex tex="OPQR" /> has a vertex at <Katex tex="Q" /> on the line.
          The coordinates of <Katex tex="Q" /> are <Katex tex="(2,4)" />, as shown.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={rectSrc}
            alt="The line from V(0, v) down to U(u, 0) passing through Q(2, 4), with the rectangle OPQR beneath it and the two remaining triangles VRQ and QPU shaded — from the original 2014 VCAA exam paper"
            className="w-full max-w-[330px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Line Equation"
        marks={1}
        statement={<>Find an expression for <Katex tex="v" /> in terms of <Katex tex="u" />.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Optimisation"
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
        <Explore title="The minimum is at a stationary point; the maximum is at an endpoint">
          <AreaWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Optimisation"
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
