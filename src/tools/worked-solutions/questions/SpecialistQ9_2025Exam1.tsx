// 2025 Specialist Mathematics — Exam 1 Question 9 (6 marks). A rational function that
// cancels to reveal an oblique asymptote and a removable discontinuity. Question text
// transcribed from the original paper; the part c. graph is our own drawing of the answer on
// VCAA's exact grid (−4 to 4 on both axes, gridlines every 0.5). Answers checked with sympy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2025e1-q9c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [22, 33, 45],
  average: 1.2,
  comment: (
    <>
      Students needed to be very careful to ensure that their working actually produced the
      required result. Some poor algebraic working was observed.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
  comment: <>This question required a numerical answer.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [50, 16, 18, 16],
  average: 1.0,
  comment: (
    <>
      Students were required to label the asymptotes with their equations. An open circle to
      indicate the point of discontinuity at <Katex tex="(1,-1.5)" /> needed to be shown.
      <br />
      A number of students included an incorrect vertical asymptote <Katex tex="x=1" /> or had
      curves that did not pass through the axis intercepts at <Katex tex="(-2,0)" /> and{' '}
      <Katex tex="(0,0)" />. The point of discontinuity at <Katex tex="(1,-1.5)" /> was often
      missing or was placed incorrectly.
      <br />
      Students who were most successful used a ruler to draw the asymptotes and had graphs that did
      not curve away from the asymptotes.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^3+x^2-2x = x\left(x^2+x-2\right) = x(x+2)(x-1)" />,
    reason: <>Factorising the numerator first is what exposes the cancellation.</>,
  },
  {
    working: <Katex display tex="1-x^2 = (1-x)(1+x) = -(x-1)(x+1)" />,
    reason: <>Writing the denominator with <Katex tex="(x-1)" /> rather than <Katex tex="(1-x)" /> makes the shared factor visible, at the cost of one minus sign.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x(x+2)(x-1)}{-(x-1)(x+1)} = \frac{-x(x+2)}{x+1} \qquad (x\ne1)" />,
    reason: <>The <Katex tex="(x-1)" /> cancels, which is why <Katex tex="x=1" /> is a <em>hole</em> rather than an asymptote — the point part c. turns on.</>,
  },
  {
    working: <Katex display tex="-x(x+2) = -\left(x^2+2x\right) = -\left[(x+1)^2-1\right]" />,
    reason: <>Completing the square in the numerator, so that the denominator divides out exactly.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{-(x+1)^2+1}{x+1} = -(x+1)+\frac{1}{x+1}" />,
    reason: <>Splitting the fraction term by term.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = -x-1+\frac{1}{x+1}}" />,
    reason: <>As required. Long division of <Katex tex="-x^2-2x" /> by <Katex tex="x+1" /> reaches the same place.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g \text{ continuous at } x=1 \iff k = \lim_{x\to1}f(x)" />,
    reason: <>The limit exists because the factor <Katex tex="(x-1)" /> cancelled in part a. — that is what makes the discontinuity removable.</>,
  },
  {
    working: <Katex display tex="\lim_{x\to1}\left(-x-1+\frac{1}{x+1}\right) = -1-1+\frac12" />,
    reason: <>The part-a. form is continuous at x = 1, so the limit is just a substitution.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -\frac32}" />,
    reason: <>A number was required. Setting <Katex tex="k=-\tfrac32" /> plugs the hole and makes <Katex tex="g" /> continuous there.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x+1 = 0 \implies \text{vertical asymptote } x = -1" />,
    reason: <>The only one — the factor at <Katex tex="x=1" /> cancelled. The report notes a number of students included an incorrect vertical asymptote <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{1}{x+1}\to0 \implies \text{oblique asymptote } y = -x-1" />,
    reason: <>Read straight off the part-a. form. Both asymptotes must be labelled with their equations.</>,
  },
  {
    working: <Katex display tex="f(x) = 0 \implies \frac{1}{x+1} = x+1 \implies (x+1)^2 = 1" />,
    reason: <>Setting the rule from part a. to zero.</>,
  },
  {
    working: <Katex display tex="x+1 = \pm1 \implies x = 0 \ \text{ or } \ x = -2" />,
    reason: <>The axis intercepts are <Katex tex="(0,0)" /> and <Katex tex="(-2,0)" />; the curve passes through the origin.</>,
  },
  {
    working: <Katex display tex="x = 1 \text{ is excluded from the domain}, \ f\to-\tfrac32" />,
    reason: <>An open circle at <Katex tex="\left(1,-\tfrac32\right)" />, using the value from part b. The report notes it was often missing or placed incorrectly.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The answer on VCAA's grid (−4 to 4 on both axes): two branches either side of the dashed vertical asymptote x = −1, both approaching the dashed oblique asymptote y = −x − 1, the left branch crossing the x-axis at −2 and the right branch passing through the origin, with an open circle at (1, −1.5)"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>Both asymptotes labelled with their equations and the open circle shown. Note <Katex tex="\tfrac{1}{x+1}>0" /> for <Katex tex="x>-1" />, so the right branch sits <em>above</em> the oblique asymptote and the left branch below it.</>,
  },
]

export default function SpecialistQ9_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (6 marks)</p>
        <p>
          Let <Katex tex="f:R\setminus\{-1,1\}\to R" />,{' '}
          <Katex tex="f(x)=\dfrac{x^3+x^2-2x}{1-x^2}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Both excluded values behave differently, and the whole question turns on that. At{' '}
            <Katex tex="x=-1" /> the denominator vanishes and the numerator does not, giving
            a genuine vertical asymptote. At <Katex tex="x=1" /> both vanish, the factor
            cancels, and what is left is a <em>hole</em> — no asymptote at all.
          </p>
          <p>
            The form <Katex tex="-x-1+\tfrac{1}{x+1}" /> then hands you the rest: the oblique
            asymptote <Katex tex="y=-x-1" /> is the polynomial part, and the sign of{' '}
            <Katex tex="\tfrac{1}{x+1}" /> tells you which side of it each branch lies on.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Oblique Asymptote"
        marks={2}
        statement={
          <>
            Show that <Katex tex="f(x)" /> can be written in the form{' '}
            <Katex tex="f(x)=-x-1+\dfrac{1}{x+1}" />, for{' '}
            <Katex tex="x\in R\setminus\{-1,1\}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Removable Discontinuity"
        marks={1}
        statement={
          <>
            Consider the function with rule
            <Katex display tex="g(x)=\begin{cases}\dfrac{x^3+x^2-2x}{1-x^2}, & x\in R\setminus\{-1,1\}\\[6pt] k, & x\in\{1\}\end{cases}" />
            Find the value of <Katex tex="k" /> such that the graph of <Katex tex="g" /> is
            continuous at <Katex tex="x=1" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> on the axes below.
            <br />
            Label the asymptotes with their equations.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
