// 2023 Mathematical Methods — Exam 1 Question 3 (4 marks). Sketching a translated hyperbola,
// then reading an inequality off the sketch. Question text transcribed from the original
// paper; the sketch is our own drawing of the answer. Answers checked with sympy and against
// the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2023e1-q3a-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [7, 7, 19, 66],
  average: 2.4,
  comment: (
    <>
      Most students presented graphs that were well drawn and appropriately labelled. The most
      common errors were labelling the <Katex tex="y" />-intercept as{' '}
      <Katex tex="(5,0)" />, the <Katex tex="x" />-intercept as{' '}
      <Katex tex="\left(\tfrac32,0\right)" />, the vertical asymptote as{' '}
      <Katex tex="y=1" /> and the horizontal asymptote as <Katex tex="x=2" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [62, 38],
  average: 0.4,
  comment: (
    <>
      Unfortunately, many students did not use their graph from part a. to help them correctly
      identify the interval required, and many erroneously gave{' '}
      <Katex tex="(-\infty,4]" /> as their answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 2-\frac{3}{x-1}" />,
    reason: <>A hyperbola: <Katex tex="y=\tfrac1x" /> dilated by <Katex tex="-3" />, translated 1 right and 2 up.</>,
  },
  {
    working: <Katex display tex="x-1 = 0 \implies x = 1 \ \text{(vertical asymptote)}" />,
    reason: <>The <Katex tex="x" /> value the function can never take. Its equation starts with <Katex tex="x=" />, not <Katex tex="y=" />.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{3}{x-1}\to0 \implies y = 2 \ \text{(horizontal asymptote)}" />,
    reason: <>And this one starts with <Katex tex="y=" />. The report lists both variables being swapped as a common error.</>,
  },
  {
    working: <Katex display tex="f(0) = 2-\frac{3}{-1} = 2+3 = 5 \implies (0,\,5)" />,
    reason: <>The <Katex tex="y" />-intercept. Watch the double negative.</>,
  },
  {
    working: <Katex display tex="2-\frac{3}{x-1} = 0 \implies \frac{3}{x-1} = 2 \implies x-1 = \frac32" />,
    reason: <>Now <em>add the 1 back</em> — stopping at <Katex tex="\tfrac32" /> is exactly the named wrong intercept.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac52 \implies \left(\tfrac52,\,0\right)}" />,
    reason: <>The <Katex tex="x" />-intercept, on the right branch. With both asymptotes and both intercepts, the two branches are forced.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 1 \implies 2-\frac{3}{x-1} = 1 \implies \frac{3}{x-1} = 1 \implies x = 4" />,
    reason: <>Find where the curve <em>meets</em> the line <Katex tex="y=1" /> first; the inequality is then read off the sketch.</>,
  },
  {
    working: <Katex display tex="\text{On } x>1: \ f \text{ increases from } -\infty \text{ towards } 2" />,
    reason: <>So on this branch <Katex tex="f(x)\le1" /> from the asymptote up to <Katex tex="x=4" />.</>,
  },
  {
    working: <Katex display tex="\text{On } x<1: \ f(x)>2 > 1 \ \text{ always}" />,
    reason: <>The left branch sits entirely above the horizontal asymptote, so it never satisfies the inequality. Ignoring this branch is what produces the report's wrong answer <Katex tex="(-\infty,4]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{1 < x \le 4}" />,
    reason: <>Or <Katex tex="(1,4]" />. Open at 1 because <Katex tex="f(1)" /> does not exist; closed at 4 because the inequality allows equality. Spot-check <Katex tex="x=2" />: <Katex tex="f(2)=2-3=-1\le1" /> ✓, and <Katex tex="x=5" />: <Katex tex="f(5)=1.25>1" /> ✓.</>,
  },
]

export default function MethodsQ3_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (4 marks)</p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Part b. is a one-mark question that 62% of the state got wrong, and the reason is
            in its first word of part a.: <em>sketch</em>. Solving{' '}
            <Katex tex="f(x)=1" /> gives the single value <Katex tex="x=4" />; only the
            picture tells you which side of it — and which branch — actually satisfies the
            inequality. A hyperbola has two branches, and an inequality can easily hold on one
            and fail on the other.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f(x)=2-\dfrac{3}{x-1}" /> on the axes provided,
            labelling all asymptotes with their equations and axial intercepts with their
            coordinates.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="A hyperbola with dashed asymptotes x = 1 and y = 2: the left branch rises from just above y = 2 through (0, 5) towards the vertical asymptote, and the right branch climbs from below, crossing the x-axis at (5/2, 0) and flattening towards y = 2"
            className="w-full max-w-[420px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="x" /> for which <Katex tex="f(x)\le1" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
