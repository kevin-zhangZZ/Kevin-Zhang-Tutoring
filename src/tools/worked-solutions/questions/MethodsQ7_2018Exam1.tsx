// 2018 Mathematical Methods — Exam 1, Question 7 (5 marks). The point on y = 2x − 4 closest
// to the origin, then that distance in a prescribed surd form. Question text transcribed from
// the original paper (no diagram given). Answers checked independently with sympy and against
// the VCAA examination report, which presents the perpendicular-line method as Method 1 and
// differentiating OP = √(5x² − 16x + 16) as Method 2. Solution is original.
// Interactives: part a — drag P along the line inside a circle of radius OP (the closest point is
// where the circle just touches, so OP ⟂ line; buttons jump to the report's wrong answers (2, 0)
// and (1, −2)), and OP and OP² graphed against x (both bottom out at x = 8/5, which is why the
// calculus route can minimise OP² instead); part b — the distance formula built as Pythagoras,
// squares on the gaps 8/5 and 4/5.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ClosestWidget = lazyWidget(() => import('../interactives/meth-2018e1-q7a-closest'))
const SquaredWidget = lazyWidget(() => import('../interactives/meth-2018e1-q7a-squared'))
const PythagorasWidget = lazyWidget(() => import('../interactives/meth-2018e1-q7b-pythagoras'))

const EXAM_A: SAExaminerStats = {
  marks: [54, 5, 10, 30],
  average: 1.2,
  comment: (
    <>
      Students who solved this problem using Method 1 were generally successful. Students who
      tackled this question by finding an expression for <Katex tex="OP" /> in terms of{' '}
      <Katex tex="x" />, then setting the derivative to zero, often had difficulty finding the
      derivative correctly, which ended up with an incorrect <Katex tex="x" /> value. However,
      most students calculated a <Katex tex="y" /> coordinate. Some students opted for a
      solution by working with similar triangles. A common incorrect response for{' '}
      <Katex tex="P" /> was <Katex tex="(2,0)" />, which is the point of intersection of the
      line <Katex tex="y=2x-4" /> and the <Katex tex="x" />-axis, while others incorrectly
      assumed the point <Katex tex="P" /> to be midway between the line segment formed by{' '}
      <Katex tex="y=2x-4" /> and its axial intercepts.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [45, 29, 27],
  average: 0.8,
  comment: (
    <>
      This question was attempted well. Some students misquoted the distance formula or made
      arithmetic errors in their calculations.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="m_{\text{line}} = 2 \implies m_{\perp} = -\frac12" />,
    reason: (
      <>
        "Closest point on a line" is the signal to think <em>perpendicular</em>: the shortest
        segment from a point to a line meets the line at right angles. Perpendicular gradients
        multiply to <Katex tex="-1" />, so <Katex tex="2\times m_\perp=-1" />.
      </>
    ),
    more: (
      <>
        See Background, and drag <Katex tex="P" /> in the first diagram below.
      </>
    ),
  },
  {
    working: <Katex display tex="OP: \ y = -\frac{x}{2}" />,
    reason: <>The perpendicular has to start at <Katex tex="O" />, and a line through <Katex tex="(0,0)" /> has no constant term.</>,
  },
  {
    working: <Katex display tex="-\frac{x}{2} = 2x-4" />,
    reason: <><Katex tex="P" /> is on both lines, so it is where they meet: set the two <Katex tex="y" />-values equal.</>,
  },
  {
    working: <Katex display tex="-x = 4x-8 \implies 8 = 5x \implies x = \frac85" />,
    reason: <>Multiplying through by <Katex tex="2" /> first clears the fraction.</>,
  },
  {
    working: <Katex display tex="y = -\frac12\times\frac85 = -\frac45" />,
    reason: <>Substituting back into the easier of the two equations.</>,
  },
  {
    working: <Katex display tex="\boxed{P = \left(\frac85,\ -\frac45\right)}" />,
    reason: (
      <>
        Two quick checks. On the line: <Katex tex="2\left(\tfrac85\right)-4=\tfrac{16}{5}-\tfrac{20}{5}=-\tfrac45" /> ✓.
        Perpendicular: the gradient of <Katex tex="OP" /> is <Katex tex="\tfrac{-4/5}{8/5}=-\tfrac12" /> ✓.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="OP = \sqrt{(x_2-x_1)^2+(y_2-y_1)^2}" />,
    reason: (
      <>
        The distance formula is Pythagoras: the horizontal and vertical gaps between{' '}
        <Katex tex="O" /> and <Katex tex="P" /> are the legs of a right-angled triangle with
        hypotenuse <Katex tex="OP" />. The report notes some students misquoted it, so write it
        out before substituting.
      </>
    ),
    more: <>Step through the diagram below.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\left(\frac85-0\right)^2+\left(-\frac45-0\right)^2}" />,
    reason: <>Substitute <Katex tex="O=(0,0)" /> and <Katex tex="P=\left(\tfrac85,-\tfrac45\right)" /> from part a. The negative gap is fine: squaring removes the sign.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{64}{25}+\frac{16}{25}} = \sqrt{\frac{80}{25}}" />,
    reason: <>A common denominator of <Katex tex="25" /> keeps the arithmetic exact.</>,
  },
  {
    working: <Katex display tex="= \frac{\sqrt{80}}{5} = \frac{4\sqrt{5}}{5}" />,
    reason: (
      <>
        Take the root of top and bottom separately: <Katex tex="\sqrt{25}=5" />, and{' '}
        <Katex tex="\sqrt{80}=\sqrt{16\times5}=4\sqrt5" /> (pull out the largest square factor).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{OP = \frac{4\sqrt{5}}{5}}" />,
    reason: (
      <>
        This is the required form <Katex tex="\tfrac{a\sqrt b}{b}" /> with <Katex tex="a=4" /> and{' '}
        <Katex tex="b=5" />, both positive integers. Sense check:{' '}
        <Katex tex="\tfrac{4\sqrt5}{5}\approx1.79" /> is less than <Katex tex="2" />, the distance
        from <Katex tex="O" /> to <Katex tex="(2,0)" />, which is on the line but is not the
        closest point.
      </>
    ),
  },
]

export default function MethodsQ7_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (5 marks)</p>
        <p>
          Let <Katex tex="P" /> be a point on the straight line <Katex tex="y=2x-4" /> such
          that the length of <Katex tex="OP" />, the line segment from the origin{' '}
          <Katex tex="O" /> to <Katex tex="P" />, is a minimum.
        </p>
      </div>

      <PartCard letter="a" topic="Closest Point" marks={3} statement={<>Find the coordinates of <Katex tex="P" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            <b>Why the shortest segment is perpendicular.</b> Let <Katex tex="P" /> be the foot of
            the perpendicular from <Katex tex="O" /> to the line, and <Katex tex="Q" /> any other
            point on the line. Then triangle <Katex tex="OPQ" /> has a right angle at{' '}
            <Katex tex="P" />, so <Katex tex="OQ" /> is its hypotenuse and{' '}
            <Katex tex="OQ^2 = OP^2 + PQ^2 > OP^2" />. Every other point of the line is further
            away. Another way to see it: grow a circle from <Katex tex="O" /> until it first
            touches the line. The touching point is <Katex tex="P" />, and a radius meets a
            tangent at right angles.
          </p>
          <p>
            "Minimise a distance" also looks like a calculus problem, and it can be done that way
            (the report's Method 2 differentiates <Katex tex="OP=\sqrt{5x^2-16x+16}" />). But the
            report says students who took that route often had difficulty finding the derivative
            correctly. The perpendicular method below (the report's Method 1) needs no calculus
            at all, which is exactly the kind of recognition Exam 1 rewards.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why the closest point is where OP meets the line at 90°">
          <ClosestWidget />
        </Explore>
        <WrongMethod
          title="The closest point is where the line crosses the x-axis, (2, 0)"
          source="Examiner's report"
          working={<Katex display tex="P=(2,0),\quad OP = 2" />}
        >
          <Katex tex="(2,0)" /> is the closest point <em>on the x-axis</em>, but <Katex tex="P" /> has
          to be the closest point on the line, and the line runs off at an angle. Here{' '}
          <Katex tex="OP" /> lies along the axis and meets the line at about{' '}
          <Katex tex="63^\circ" />, not <Katex tex="90^\circ" />, and the point{' '}
          <Katex tex="\left(\tfrac85,-\tfrac45\right)" /> is only about <Katex tex="1.79" /> from{' '}
          <Katex tex="O" />. Catch it by checking the gradient of <Katex tex="OP" />: it is{' '}
          <Katex tex="0" />, and <Katex tex="0\times2\neq-1" />.
        </WrongMethod>
        <WrongMethod
          title="P is halfway between the intercepts, (1, −2)"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{gathered}P=\left(\tfrac{2+0}{2},\ \tfrac{0+(-4)}{2}\right)=(1,-2)\\ OP=\sqrt5\approx2.24\end{gathered}"
            />
          }
        >
          That is even further away than <Katex tex="(2,0)" />. The midpoint of the intercepts is
          only the closest point when the two intercepts are the same distance from{' '}
          <Katex tex="O" /> (a line like <Katex tex="y=-x+c" />). Here <Katex tex="(2,0)" /> is{' '}
          <Katex tex="2" /> away and <Katex tex="(0,-4)" /> is <Katex tex="4" /> away, so the
          closest point is pulled towards the nearer intercept. The gradient check fails again: the
          gradient of <Katex tex="OP" /> is <Katex tex="-2" />, and <Katex tex="-2\times2\neq-1" />.
        </WrongMethod>
        <Explore title="The calculus route: OP and OP² bottom out at the same x">
          <SquaredWidget />
        </Explore>
        <WrongMethod
          title="Calculus route with (2x − 4)² expanded as 4x² − 8x + 16"
          working={
            <Katex
              display
              tex="\begin{gathered}OP^2=5x^2-8x+16\\ 10x-8=0 \implies x=\tfrac45\\ P=\left(\tfrac45,-\tfrac{12}{5}\right)\end{gathered}"
            />
          }
        >
          The middle term of <Katex tex="(2x-4)^2" /> is <Katex tex="2\times2x\times(-4)=-16x" />,
          so <Katex tex="OP^2=5x^2-16x+16" /> and the derivative is <Katex tex="10x-16" />. One
          slip in the expansion moves the whole answer. Two checks catch it: the gradient of{' '}
          <Katex tex="OP" /> is <Katex tex="-3" />, not <Katex tex="-\tfrac12" />; and{' '}
          <Katex tex="OP=\tfrac{4\sqrt{10}}{5}\approx2.53" /> is <em>longer</em> than the{' '}
          <Katex tex="2" /> you get at <Katex tex="(2,0)" />, so it cannot be the minimum. Minimising{' '}
          <Katex tex="OP^2" /> rather than <Katex tex="OP" /> is still the right idea, as the graph
          above shows.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Distance"
        marks={2}
        statement={<>Find the distance <Katex tex="OP" />. Express your answer in the form <Katex tex="\dfrac{a\sqrt{b}}{b}" />, where <Katex tex="a" /> and <Katex tex="b" /> are positive integers.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="The distance formula is Pythagoras on the gaps">
          <PythagorasWidget />
        </Explore>
        <WrongMethod
          title="Stop at 4/√5 without re-reading the required form"
          source="Examiner's report"
          working={<Katex display tex="OP=\sqrt{\frac{16}{5}}=\frac{4}{\sqrt5}" />}
        >
          The value is right but the form is not: <Katex tex="\tfrac{a\sqrt b}{b}" /> needs the
          surd on top. The report's general comments list 7b among the questions where students
          should re-read the question to check the answer matches what is asked: it{' '}
          "specified a given format for the answer". Multiply top and bottom by{' '}
          <Katex tex="\sqrt5" />: <Katex tex="\tfrac{4}{\sqrt5}\times\tfrac{\sqrt5}{\sqrt5}=\tfrac{4\sqrt5}{5}" />.
          Likewise <Katex tex="\tfrac{\sqrt{80}}{5}" /> is equal but not in the form, since the
          number under the root must match the denominator.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
