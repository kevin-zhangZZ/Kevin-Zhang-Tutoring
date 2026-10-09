// 2023 Mathematical Methods — Exam 1 Question 3 (4 marks). Sketching a translated hyperbola,
// then reading an inequality off the sketch. Question text transcribed from the original
// paper; the sketch is our own matplotlib drawing of the answer on VCAA's grid. Answers checked with sympy and against
// the VCAA examination report. Solution is original. Part b. has an interactive
// (interactives/meth-2023e1-q3b-branches.tsx): slide x across both branches to see that only
// 1 < x ≤ 4 puts the curve on or below y = 1, with a toggle testing the common wrong answer (−∞, 4].
// Oct 2026 Concise/Detailed pass: part b.'s Background now sits in part b.; the report's common
// errors, the (−∞, 4] algebra and the spot-checks live in each row's `more` (Detailed only).
// Final review: part b. row 1 now says in Concise that the graph can switch sides of y = 1 at the
// asymptote (so check each branch); part a. row 1's full transformation list moved to `more`;
// row 2 says which way each side of the asymptote goes; the (−∞, 4] note now covers both sign cases.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './meth-2023e1-q3a-sketch.png'

const BranchesWidget = lazyWidget(() => import('../interactives/meth-2023e1-q3b-branches'))

const EXAM_A: SAExaminerStats = {
  marks: [7, 7, 19, 66],
  average: 2.4,
  comment: (
    <>
      Most students presented graphs that were well drawn and appropriately labelled.
      Generally students included details and labels as required and produced smooth graph
      lines that displayed appropriately asymptotic behaviour. The most common errors were
      labelling the <Katex tex="y" />-intercept as <Katex tex="(5,0)" />, the{' '}
      <Katex tex="x" />-intercept as <Katex tex="\left(\tfrac32,0\right)" />, the vertical
      asymptote as <Katex tex="y=1" /> and horizontal asymptote as <Katex tex="x=2" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [62, 38],
  average: 0.4,
  comment: (
    <>
      This question required students to solve an inequation involving the function they had
      already sketched in part 3a. Unfortunately, many students did not use their graph from
      part 3a. to assist them to correctly identify the interval required, and many
      erroneously gave <Katex tex="(-\infty,4]" /> as their answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 2-\frac{3}{x-1}" />,
    reason: (
      <>
        A hyperbola: the graph of <Katex tex="y=\tfrac1x" /> reflected in the <Katex tex="x" />-axis (the minus sign),
        moved 1 unit right and 2 units up. Because of the reflection, its branches sit top-left and bottom-right of
        where the asymptotes cross.
      </>
    ),
    more: (
      <>
        In full, compared with <Katex tex="y=\tfrac1x" />: the <Katex tex="-3" /> dilates it by a factor of 3 from
        the <Katex tex="x" />-axis and reflects it in the <Katex tex="x" />-axis, the <Katex tex="x-1" /> translates
        it 1 unit right, and the <Katex tex="2" /> translates it 2 units up. The translations move the asymptotes from
        the two axes to <Katex tex="x=1" /> and <Katex tex="y=2" />, which the next two lines confirm.
      </>
    ),
  },
  {
    working: <Katex display tex="x-1 = 0 \implies x = 1 \ \text{(vertical asymptote)}" />,
    reason: (
      <>
        The denominator can&apos;t be 0, so <Katex tex="x=1" /> is not in the domain, and as <Katex tex="x" /> gets
        close to 1 the fraction <Katex tex="\tfrac{3}{x-1}" /> becomes huge in size: large and positive just right of
        1, so <Katex tex="f(x)" /> plunges down, and large and negative just left of 1, so <Katex tex="f(x)" /> shoots
        up. A vertical line&apos;s equation starts with <Katex tex="x=" />, not <Katex tex="y=" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} x\to\pm\infty &\implies \frac{3}{x-1}\to0 \\ &\implies y = 2 \ \text{(horizontal asymptote)} \end{aligned}" />,
    reason: (
      <>
        As <Katex tex="x" /> gets very large (positive or negative), <Katex tex="\tfrac{3}{x-1}" /> shrinks towards 0
        but never equals 0, so <Katex tex="f(x)" /> gets close to 2 without reaching it. A horizontal line&apos;s
        equation starts with <Katex tex="y=" />.
      </>
    ),
    more: (
      <>
        Swapping these two labels — the vertical asymptote written as <Katex tex="y=1" /> and the horizontal one as{' '}
        <Katex tex="x=2" /> — is among the most common errors in the report. A quick check: every point on the
        vertical asymptote has <Katex tex="x" />-coordinate 1, so its equation is <Katex tex="x=1" />; every point on
        the horizontal one has <Katex tex="y" />-coordinate 2, so its equation is <Katex tex="y=2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f(0) = 2-\frac{3}{-1} = 2+3 = 5 \implies (0,\,5)" />,
    reason: (
      <>
        The <Katex tex="y" />-intercept: substitute <Katex tex="x=0" /> and watch the double negative. Write it as{' '}
        <Katex tex="(0,\,5)" />, with the <Katex tex="x" />-coordinate first.
      </>
    ),
    more: (
      <>
        The report lists <Katex tex="(5,0)" /> for the <Katex tex="y" />-intercept among the most common errors. That
        point is on the <Katex tex="x" />-axis, 5 units right of the origin; a <Katex tex="y" />-intercept always has{' '}
        <Katex tex="x" />-coordinate 0.
      </>
    ),
  },
  {
    working: <Katex display tex="2-\frac{3}{x-1} = 0 \implies \frac{3}{x-1} = 2 \implies x-1 = \frac32" />,
    reason: (
      <>
        The <Katex tex="x" />-intercept: set <Katex tex="f(x)=0" /> and move the fraction to the other side, then
        multiply both sides by <Katex tex="x-1" /> and divide by 2. This gives <Katex tex="x-1" />, not yet{' '}
        <Katex tex="x" />.
      </>
    ),
    more: (
      <>
        The report lists the <Katex tex="x" />-intercept labelled <Katex tex="\left(\tfrac32,0\right)" /> among the most
        common errors — the answer you get by stopping at this line.
      </>
    ),
  },
  {
    working: <Katex display tex="x = \frac52 \implies \left(\tfrac52,\,0\right)" />,
    reason: (
      <>
        Add 1 to both sides. This intercept is on the right branch, which climbs from below the{' '}
        <Katex tex="x" />-axis towards <Katex tex="y=2" />; the left branch stays above <Katex tex="y=2" />, so it has
        no <Katex tex="x" />-intercept.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The answer on VCAA's grid (x from −3 to 4, y from −2 to 6): a hyperbola with dashed asymptotes x = 1 and y = 2, the left branch rising from just above y = 2 through (0, 5) towards the vertical asymptote, the right branch climbing from below through (5/2, 0) and flattening towards y = 2"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: (
      <>
        Draw both asymptotes dashed and labelled with their equations, mark both intercepts with their coordinates, then
        draw each branch bending towards its two asymptotes without ever crossing them.
      </>
    ),
    more: (
      <>
        The report&apos;s general comments stress that hyperbolas must show asymptotic behaviour, the graph moving
        toward but never intersecting the asymptotes. They also warn that faint or dashed lines, such as asymptotes,
        can be hard to see on a scanned script — so draw them firmly — and encourage students to use the grid
        provided, here to place <Katex tex="(0,\,5)" /> and <Katex tex="\left(\tfrac52,\,0\right)" /> accurately.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f(x) = 1 \implies 2-\frac{3}{x-1} &= 1 \\ \frac{3}{x-1} &= 1 \\ x-1 = 3 \implies x &= 4 \end{aligned}" />,
    reason: (
      <>
        Start with the boundary: where the curve <em>meets</em> the line <Katex tex="y=1" />. This is its only
        crossing, but the graph can also switch sides of <Katex tex="y=1" /> where it breaks at the asymptote{' '}
        <Katex tex="x=1" />, so check each branch on the sketch from part a.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{On } x>1: \ f \text{ increases from } -\infty \text{ towards } 2" />,
    reason: (
      <>
        On the sketch, the right branch starts far below the <Katex tex="x" />-axis just right of the asymptote and
        climbs towards <Katex tex="y=2" />, crossing <Katex tex="y=1" /> only at <Katex tex="x=4" />. So on this branch{' '}
        <Katex tex="f(x)\le1" /> from the asymptote up to <Katex tex="x=4" />, and <Katex tex="f(x)>1" /> after 4.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{On } x<1: \ f(x)>2 > 1 \ \text{ always}" />,
    reason: (
      <>
        For <Katex tex="x<1" />, <Katex tex="x-1" /> is negative, so <Katex tex="\tfrac{3}{x-1}" /> is negative and{' '}
        <Katex tex="f(x) = 2-(\text{negative}) > 2" />. On the sketch the whole left branch sits above the horizontal
        asymptote, so none of these <Katex tex="x" />-values work, even though they are all less than 4.
      </>
    ),
    more: (
      <>
        The report notes many students did not use their graph from part a. and erroneously gave{' '}
        <Katex tex="(-\infty,4]" />. That is the answer you get by rearranging to <Katex tex="\tfrac{3}{x-1}\ge1" />{' '}
        and multiplying both sides by <Katex tex="x-1" /> without checking its sign: <Katex tex="3 \ge x-1" />, so{' '}
        <Katex tex="x\le4" />. Multiplying by <Katex tex="x-1" /> keeps the <Katex tex="\ge" /> sign only when{' '}
        <Katex tex="x-1" /> is positive. For <Katex tex="x>1" /> it is, and <Katex tex="x\le4" /> together with{' '}
        <Katex tex="x>1" /> gives <Katex tex="1<x\le4" />. For <Katex tex="x<1" /> it is negative, so the sign flips:{' '}
        <Katex tex="3 \le x-1" />, i.e. <Katex tex="x\ge4" />, which no <Katex tex="x<1" /> satisfies. Done carefully,
        the algebra agrees with the sketch.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{1 < x \le 4}" />,
    reason: (
      <>
        Or <Katex tex="(1,4]" />. Open at 1 because <Katex tex="f(1)" /> does not exist (1 is not in the domain);
        closed at 4 because <Katex tex="f(4)=1" /> and the inequality allows equality.
      </>
    ),
    more: (
      <>
        Spot-check one <Katex tex="x" />-value from each piece: <Katex tex="f(2)=2-3=-1\le1" /> ✓ (inside),{' '}
        <Katex tex="f(5)=\tfrac54>1" /> ✓ (outside), and <Katex tex="f(0)=5>1" /> ✓ (outside).
      </>
    ),
  },
]

export default function MethodsQ3_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Sketch Hyperbola"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f(x)=2-\dfrac{3}{x-1}" /> on the axes below,
            labelling all asymptotes with their equations and axial intercepts with their
            coordinates.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Inequality"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="x" /> for which <Katex tex="f(x)\le1" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            <Katex tex="f(x)\le1" /> asks for the <Katex tex="x" />-values where the graph is <em>on or below</em> the
            horizontal line <Katex tex="y=1" />. A graph can get from one side of that line to the other in only two
            ways: by crossing it, or by breaking at a vertical asymptote, where one branch ends and the next begins —
            possibly on the other side of the line, without ever touching it. Between those points the graph stays on
            one side, so the answer is built piece by piece: mark the crossings and the asymptotes, then decide each
            piece from the sketch (or by testing one <Katex tex="x" />-value in it).
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Only the right-hand branch ever comes down to y = 1">
          <BranchesWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
