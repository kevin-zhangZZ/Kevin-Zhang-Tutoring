// 2020 Specialist Mathematics — Exam 1 Question 7 (5 marks). Making a piecewise function
// and its derivative continuous, then integrating the two branches. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report and itute's solutions (itute also reads the first piece of part b. as a
// trapezium). Solution is original. Marty Ross (Bad Mathematics) points out that f′ continuous
// already forces f to be continuous, so the question's continuity condition is redundant; both
// equations are still needed to find n, so the solution uses both without comment.
// Interactive diagrams (§15): part a. has sliders for m and n that show the jump and the corner
// at x = 1 closing only at m = −2, n = 4, where the line is the curve's tangent
// (interactives/spec-2020e1-q7a-join.tsx); part b. builds the area up in steps — split at the
// join, the trapezium, then the arctan piece bounded by two boxes, with a toggle showing the ¼
// misreading the report names (interactives/spec-2020e1-q7b-area.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const JoinWidget = lazyWidget(() => import('../interactives/spec-2020e1-q7a-join'))
const AreaWidget = lazyWidget(() => import('../interactives/spec-2020e1-q7b-area'))

const EXAM_A: SAExaminerStats = {
  marks: [33, 7, 60],
  average: 1.3,
  comment: (
    <>
      This question was answered well. If <Katex tex="f" /> is continuous at{' '}
      <Katex tex="x=1" /> then <Katex tex="m+n=2" />.
      <br />
      Also{' '}
      <Katex tex="\dfrac{d}{dx}\left(\dfrac{4}{1+x^2}\right)=\dfrac{-8x}{\left(1+x^2\right)^2}" /> and
      so <Katex tex="m=-2" /> in order for <Katex tex="f'(x)" /> to be continuous at{' '}
      <Katex tex="x=1" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [17, 14, 16, 54],
  average: 2.1,
  comment: (
    <>
      This question involved routine integrals and was answered well.
      <br />
      A few students recognised that the region enclosed by the graph between{' '}
      <Katex tex="x=0" /> and <Katex tex="x=1" /> was a trapezium and so were able to avoid
      evaluating one of the integrals. Several students incorrectly applied results from the
      formula sheet. In particular,{' '}
      <Katex tex="\displaystyle\int_1^{\sqrt3}\frac{4}{1+x^2}\,dx=\left[\frac14\arctan(x)\right]_1^{\sqrt3}" />
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{continuity at } x=1: \ \lim_{x\to1^-}f(x) = f(1)" />,
    reason: <>No jump at the join. <Katex tex="f(1)" /> comes from the second rule, since <Katex tex="x\ge1" /> includes <Katex tex="x=1" />; just to the left of 1 the line is in charge, heading for height <Katex tex="m(1)+n" />. The line has to arrive exactly where the curve starts.</>,
  },
  {
    working: <Katex display tex="m(1)+n = \frac{4}{1+1^2} = 2 \implies m+n = 2" />,
    reason: <>One equation, but two unknowns: every line through <Katex tex="(1,2)" /> satisfies it. The second equation has to come from <Katex tex="f'" />, the gradients.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x\ge1: \ \frac{d}{dx}\left(\frac{4}{1+x^2}\right) &= \frac{d}{dx}\left(4\left(1+x^2\right)^{-1}\right)\\ &= \frac{-8x}{\left(1+x^2\right)^2}\end{aligned}" />,
    reason: <>To compare gradients at <Katex tex="x=1" /> we need the curve&apos;s gradient there. Write the fraction as a negative power and use the chain rule: <Katex tex="4\cdot(-1)\left(1+x^2\right)^{-2}\cdot2x" />. The quotient rule gives the same thing with more writing.</>,
  },
  {
    working: <Katex display tex="\text{at } x=1: \ \frac{-8}{2^2} = -2" />,
    reason: <>The curve leaves the join sloping down with gradient <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="x<1: \ f'(x) = m \implies \boxed{m = -2}" />,
    reason: <>The line&apos;s gradient is <Katex tex="m" /> everywhere, including as it arrives at <Katex tex="x=1" />. For <Katex tex="f'" /> to be continuous (no corner), the gradient arriving from the left must equal the gradient leaving on the right.</>,
  },
  {
    working: <Katex display tex="m+n = 2 \implies -2+n = 2 \implies \boxed{n = 4}" />,
    reason: <>Back-substituting into the continuity equation. Check: the line is then <Katex tex="y=-2x+4" />, which is exactly the tangent to <Katex tex="y=\tfrac{4}{1+x^2}" /> at <Katex tex="(1,2)" />. Matching the value and the gradient at a join is the same as asking for the tangent there (move the sliders below to see it). As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}f(x) &= -2x+4 \ \text{ on } [0,1]\\ f(x) &= \frac{4}{1+x^2} \ \text{ on } [1,\sqrt3]\end{aligned}" />,
    reason: <>Using <Katex tex="m=-2" /> and <Katex tex="n=4" /> from part a. Both rules are positive across <Katex tex="[0,\sqrt3]" /> (the line falls only from 4 to 2), so the whole region is above the <Katex tex="x" />-axis and the area is just the integral, with no absolute values needed.</>,
  },
  {
    working: <Katex display tex="A = \int_0^1(-2x+4)\,dx+\int_1^{\sqrt3}\frac{4}{1+x^2}\,dx" />,
    reason: <><Katex tex="f" /> has a different rule on each side of <Katex tex="x=1" />, and an antiderivative needs a single rule, so split the area at the join.</>,
  },
  {
    working: <Katex display tex="\int_0^1(-2x+4)\,dx = \left[-x^2+4x\right]_0^1 = 3" />,
    reason: <>Or, as the report notes a few students did, see that this piece is a trapezium: parallel sides <Katex tex="f(0)=4" /> and <Katex tex="f(1)=2" />, width 1, so its area is <Katex tex="\tfrac{4+2}{2}\times1=3" /> with no integral at all.</>,
  },
  {
    working: <Katex display tex="\int\frac{4}{1+x^2}\,dx = 4\arctan(x)+c" />,
    reason: <>The formula sheet gives <Katex tex="\int\frac{a}{a^2+x^2}\,dx=\tan^{-1}\!\left(\frac xa\right)" />; here <Katex tex="a^2=1" />, so <Katex tex="a=1" /> and <Katex tex="\int\frac{1}{1+x^2}\,dx=\arctan(x)" />. The 4 is a constant multiple, so it stays out the front. It does <em>not</em> become <Katex tex="\tfrac14" />, the formula-sheet misreading the report singles out. Check by differentiating: <Katex tex="\tfrac{d}{dx}\left(4\arctan(x)\right)=\tfrac{4}{1+x^2}" />.</>,
  },
  {
    working: <Katex display tex="4\left[\arctan(x)\right]_1^{\sqrt3} = 4\left(\tfrac\pi3-\tfrac\pi4\right)" />,
    reason: <><Katex tex="\tan\tfrac\pi3=\sqrt3" /> and <Katex tex="\tan\tfrac\pi4=1" />, exact values worth knowing cold.</>,
  },
  {
    working: <Katex display tex="= 4\cdot\tfrac{\pi}{12} = \tfrac\pi3" />,
    reason: <>Common denominator 12: <Katex tex="\tfrac{4\pi}{12}-\tfrac{3\pi}{12}=\tfrac{\pi}{12}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 3+\frac\pi3}" />,
    reason: <>About 4.05 square units. Sanity check on the curved piece: from <Katex tex="x=1" /> to <Katex tex="x=\sqrt3" /> the curve falls from height 2 to height 1, so that piece must lie between <Katex tex="1\times(\sqrt3-1)\approx0.73" /> and <Katex tex="2\times(\sqrt3-1)\approx1.46" />. <Katex tex="\tfrac\pi3\approx1.05" /> does (step 3 of the diagram below).</>,
  },
]

export default function SpecialistQ7_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
        <p>Consider the function defined by</p>
        <p className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}mx+n, & x<1\\[4pt] \dfrac{4}{1+x^2}, & x\ge1\end{cases}"
          />
        </p>
        <p>
          where <Katex tex="m" /> and <Katex tex="n" /> are real numbers.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Continuity"
        marks={2}
        statement={
          <>
            Given that <Katex tex="f(x)" /> and <Katex tex="f'(x)" /> are continuous over{' '}
            <Katex tex="R" />, show that <Katex tex="m=-2" /> and <Katex tex="n=4" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="What the Two Conditions Mean at a Join">
          <p>
            Each rule is continuous and differentiable on its own, so the only place anything can go
            wrong is the join, <Katex tex="x=1" />. It can go wrong in two ways. The graph can{' '}
            <b>jump</b>: the two rules give different heights there. Or it can have a <b>corner</b>:
            the heights agree, but the pieces meet at different gradients.
          </p>
          <p>
            &ldquo;<Katex tex="f" /> continuous&rdquo; rules out the jump (the values match), and
            &ldquo;<Katex tex="f'" /> continuous&rdquo; rules out the corner (the gradients match).
            There are two unknowns, and each condition gives one equation.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="A smooth join needs two matches: the same height (no jump) and the same gradient (no corner)">
          <JoinWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Area Under Curve"
        marks={3}
        statement={
          <>
            Find the area enclosed by the graph of the function, the <Katex tex="x" />-axis
            and the lines <Katex tex="x=0" /> and <Katex tex="x=\sqrt3" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Split the area at the join: a trapezium, then an arctan piece you can check with two boxes">
          <AreaWidget />
        </Explore>
        <WrongMethod
          title="The 4 turns into ¼: ∫ 4/(1 + x²) dx = ¼ arctan(x)"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\begin{aligned}\int_1^{\sqrt3}\frac{4}{1+x^2}\,dx &= \left[\tfrac14\arctan(x)\right]_1^{\sqrt3}\\ &= \tfrac14\left(\tfrac\pi3-\tfrac\pi4\right) = \tfrac{\pi}{48}\end{aligned}" />
              <Katex display tex="A = 3+\tfrac{\pi}{48}" />
            </>
          }
        >
          <p>
            In the formula sheet&apos;s <Katex tex="\int\frac{a}{a^2+x^2}\,dx=\tan^{-1}\!\left(\frac xa\right)" />,
            the <Katex tex="a" /> is set by the denominator. Here the denominator is{' '}
            <Katex tex="1+x^2" />, so <Katex tex="a=1" />, and the 4 has nothing to do with it: it is
            a constant factor, <Katex tex="\int\frac{4}{1+x^2}\,dx=4\int\frac{1}{1+x^2}\,dx=4\arctan(x)" />.
          </p>
          <p>
            Two quick ways to catch it. Differentiate your answer:{' '}
            <Katex tex="\tfrac{d}{dx}\left(\tfrac14\arctan(x)\right)=\tfrac{1}{4(1+x^2)}" />, sixteen
            times smaller than <Katex tex="\tfrac{4}{1+x^2}" />. Or check the size: the curve is at
            least 1 high over an interval about 0.73 wide, so that piece can&apos;t be{' '}
            <Katex tex="\tfrac{\pi}{48}\approx0.065" />.
          </p>
        </WrongMethod>
      </PartCard>
    </div>
  )
}
