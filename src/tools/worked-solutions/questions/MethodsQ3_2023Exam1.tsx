// 2023 Mathematical Methods — Exam 1 Question 3 (4 marks). Sketching a translated hyperbola,
// then reading an inequality off the sketch. Question text transcribed from the original
// paper; the sketch is our own matplotlib drawing of the answer on VCAA's grid. Answers checked with sympy and against
// the VCAA examination report. Solution is original. Part b. has an interactive
// (interactives/meth-2023e1-q3b-branches.tsx): slide x across both branches to see that only
// 1 < x ≤ 4 puts the curve on or below y = 1, with a toggle testing the common wrong answer (−∞, 4].

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
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
        A hyperbola. Compared with <Katex tex="y=\tfrac1x" />, the <Katex tex="-3" /> reflects it in the{' '}
        <Katex tex="x" />-axis and dilates it by a factor of 3 from the <Katex tex="x" />-axis, the{' '}
        <Katex tex="x-1" /> translates it 1 unit right, and the <Katex tex="2" /> translates it 2 units up. So the
        asymptotes move from the axes to <Katex tex="x=1" /> and <Katex tex="y=2" />, and because of the reflection the
        branches sit top-left and bottom-right of where the asymptotes cross.
      </>
    ),
  },
  {
    working: <Katex display tex="x-1 = 0 \implies x = 1 \ \text{(vertical asymptote)}" />,
    reason: (
      <>
        The denominator can&apos;t be 0, so <Katex tex="x=1" /> is not in the domain, and as <Katex tex="x" /> gets
        close to 1 the fraction <Katex tex="\tfrac{3}{x-1}" /> becomes huge. A vertical line&apos;s equation starts
        with <Katex tex="x=" />, not <Katex tex="y=" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} x\to\pm\infty &\implies \frac{3}{x-1}\to0 \\ &\implies y = 2 \ \text{(horizontal asymptote)} \end{aligned}" />,
    reason: (
      <>
        As <Katex tex="x" /> gets very large (positive or negative), <Katex tex="\tfrac{3}{x-1}" /> shrinks towards 0
        but never equals 0, so <Katex tex="f(x)" /> gets close to 2 without reaching it. A horizontal line&apos;s
        equation starts with <Katex tex="y=" />. The report lists the two asymptotes labelled the wrong way round,
        as <Katex tex="y=1" /> and <Katex tex="x=2" />, as a common error.
      </>
    ),
  },
  {
    working: <Katex display tex="f(0) = 2-\frac{3}{-1} = 2+3 = 5 \implies (0,\,5)" />,
    reason: (
      <>
        The <Katex tex="y" />-intercept: substitute <Katex tex="x=0" /> and watch the double negative. Write it as{' '}
        <Katex tex="(0,\,5)" />, with the <Katex tex="x" />-coordinate first; the report lists <Katex tex="(5,0)" /> as
        a common error.
      </>
    ),
  },
  {
    working: <Katex display tex="2-\frac{3}{x-1} = 0 \implies \frac{3}{x-1} = 2 \implies x-1 = \frac32" />,
    reason: (
      <>
        The <Katex tex="x" />-intercept: set <Katex tex="f(x)=0" />, then multiply both sides by{' '}
        <Katex tex="x-1" /> and divide by 2. Now <em>add the 1 back</em> — stopping at <Katex tex="\tfrac32" /> gives
        the <Katex tex="x" />-intercept the report lists among the most common errors.
      </>
    ),
  },
  {
    working: <Katex display tex="x = \frac52 \implies \left(\tfrac52,\,0\right)" />,
    reason: (
      <>
        It is on the right branch, which climbs from below the <Katex tex="x" />-axis towards <Katex tex="y=2" />. The
        left branch stays above <Katex tex="y=2" />, so it has no <Katex tex="x" />-intercept.
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
    reason: <>Draw both asymptotes dashed and labelled, mark both intercepts with their coordinates, then draw each branch bending towards its two asymptotes. The report's general comments stress that hyperbolas must show asymptotic behaviour, approaching but never crossing the asymptotes.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f(x) = 1 \implies 2-\frac{3}{x-1} &= 1 \\ \frac{3}{x-1} &= 1 \\ x-1 = 3 \implies x &= 4 \end{aligned}" />,
    reason: (
      <>
        Start with the boundary: where the curve <em>meets</em> the line <Katex tex="y=1" />. This gives one crossing
        point only; which <Katex tex="x" />-values satisfy the inequality is then read off the sketch from part a.
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
        asymptote, so none of these <Katex tex="x" />-values work, even though they are all less than 4. The report
        notes many students did not use their graph this way and erroneously gave <Katex tex="(-\infty,4]" />. That is
        the answer you get by treating the inequation like an equation: rearranging to{' '}
        <Katex tex="\tfrac{3}{x-1}\ge1" /> and multiplying both sides by <Katex tex="x-1" /> gives{' '}
        <Katex tex="3 \ge x-1" />, so <Katex tex="x\le4" />. But multiplying by <Katex tex="x-1" /> keeps the{' '}
        <Katex tex="\ge" /> sign only when <Katex tex="x-1" /> is positive, which is false for every{' '}
        <Katex tex="x<1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{1 < x \le 4}" />,
    reason: (
      <>
        Or <Katex tex="(1,4]" />. Open at 1 because <Katex tex="f(1)" /> does not exist (1 is not in the domain);
        closed at 4 because <Katex tex="f(4)=1" /> and the inequality allows equality. Spot-check one{' '}
        <Katex tex="x" />-value from each piece: <Katex tex="f(2)=2-3=-1\le1" /> ✓ (inside),{' '}
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Part b. is worth one mark, and 62% of students scored 0 on it. The key is the first
              word of part a.: <em>sketch</em>. Solving{' '}
              <Katex tex="f(x)=1" /> gives the single value <Katex tex="x=4" />; only the
              picture tells you which side of it — and which branch — actually satisfies the
              inequality. A hyperbola has two branches, and an inequality can hold on one and fail
              on the other.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
        <WorkingTable rows={ROWS_B} />
        <Explore title="Only the right-hand branch ever comes down to y = 1">
          <BranchesWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
