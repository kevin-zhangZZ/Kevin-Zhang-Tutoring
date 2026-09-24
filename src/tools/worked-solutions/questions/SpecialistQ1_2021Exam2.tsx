// 2021 Specialist Mathematics — Exam 2, Section B Question 1 (10 marks). A rational
// function: partial-fraction form, asymptotes, a sketch, then a parameter that changes how
// many asymptotes and stationary points it has. Question text transcribed from the original
// paper; the sketch is this site's own matplotlib drawing of the answer, on VCAA's grid
// (x −11 to 11, y −6 to 16, gridlines every 1). Answers checked with sympy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2021e2-q1c-sketch.png'

const EXAM_A: SAExaminerStats = { marks: [21, 79], average: 0.8 }

const EXAM_B: SAExaminerStats = {
  marks: [4, 29, 67],
  average: 1.7,
  comment: (
    <>
      The most common error was to give only the vertical asymptotes, leaving out the
      horizontal asymptote.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [24, 32, 23, 22],
  average: 1.5,
  comment: (
    <>
      A significant number of responses did not include the middle branch. Setting the
      calculator screen to match the grid provided would help avoid this error. Many
      responses lacked at least one of the required details such as coordinates of the
      point of inflection or coordinates of one of the axial intercepts. Students need to
      read the question carefully and fully address the requirements of the question.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [58, 36, 6],
  average: 0.5,
  comment: (
    <>
      Very few students gave all three values. Many responses included only one value:{' '}
      <Katex tex="k=-2" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [82, 5, 13],
  average: 0.3,
  comment: (
    <>
      A common error was to include other incorrect values of <Katex tex="k" />. Many
      students left this question blank.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{(2x-3)(x+5)}{(x-1)(x+2)} = \frac{2x^2+7x-15}{x^2+x-2}" />,
    reason: <>Expanding both products so the division can be done.</>,
  },
  {
    working: <Katex display tex="2x^2+7x-15 = 2\left(x^2+x-2\right)+5x-11" />,
    reason: <>Dividing: the quotient is 2, so <Katex tex="A=2" />. Subtracting <Katex tex="2x^2+2x-4" /> leaves <Katex tex="5x-11" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2+\frac{5x-11}{(x-1)(x+2)}}" />,
    reason: <>So <Katex tex="A=2" />, <Katex tex="B=5" />, <Katex tex="C=-11" />. This form makes the horizontal asymptote in part b. immediate.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(x-1)(x+2) = 0 \implies x = 1, \ x = -2" />,
    reason: <>Neither factor cancels against the numerator, so both give genuine vertical asymptotes.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty: \ \frac{5x-11}{(x-1)(x+2)}\to0" />,
    reason: <>Degree 1 over degree 2, so the fractional part dies away.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1, \quad x = -2, \quad y = 2}" />,
    reason: <>Three asymptotes. The horizontal one is the <Katex tex="A" /> from part a. — the report's most common error was leaving it out.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{intercepts: } (-5,0), \ \left(\tfrac32,0\right), \ \left(0,\tfrac{15}{2}\right)" />,
    reason: <>The numerator's zeros, and <Katex tex="f(0)=\tfrac{(-3)(5)}{(-1)(2)}=7.5" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{-5x^2+22x+1}{\left(x^2+x-2\right)^2} = 0 \implies x = -0.045 \text{ or } x = 4.445" />,
    reason: <>Two stationary points, one on the middle branch and one on the right.</>,
  },
  {
    working: <Katex display tex="\text{middle branch: } f\to+\infty \text{ at both ends} \implies x=-0.045 \text{ is a minimum}" />,
    reason: <>So the <em>maximum</em> turning point is the other one, at <Katex tex="(4.44,\ 2.51)" />.</>,
  },
  {
    working: <Katex display tex="f''(x) = 0 \implies x = 6.788 \implies (6.79,\ 2.45)" />,
    reason: <>The only real point of inflection.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="On VCAA's grid: three branches of the graph of f with dashed asymptotes x = −2, x = 1 and y = 2; the left branch through (−5, 0), the middle branch a valley with its minimum near (0, 7.5), and the right branch through (1.5, 0) rising to the maximum (4.44, 2.51) with the point of inflection at (6.79, 2.45)"
          className="w-full max-w-[440px]"
        />
      </div>
    ),
    reason: <>All three branches must appear — the report notes a significant number of responses left out the middle branch, and that setting the calculator screen to match the grid helps.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="g_k(x) = \frac{(2x-3)(x+5)}{(x-k)(x+2)}" />,
    reason: <>Only the <Katex tex="(x-1)" /> factor has changed, to <Katex tex="(x-k)" />.</>,
  },
  {
    working: <Katex display tex="\text{horizontal asymptote } y=2 \text{ always}" />,
    reason: <>Degree 2 over degree 2 with leading coefficients 2 and 1 — this one never goes away.</>,
  },
  {
    working: <Katex display tex="\text{so two asymptotes} \iff \text{only one vertical asymptote}" />,
    reason: <>Which happens in one of two ways: the two vertical asymptotes coincide, or one of them cancels.</>,
  },
  {
    working: <Katex display tex="k = -2: \ (x+2)^2 \text{ in the denominator} \implies \text{one vertical asymptote}" />,
    reason: <>The repeated factor.</>,
  },
  {
    working: <Katex display tex="k = \tfrac32 \text{ or } k = -5: \ (x-k) \text{ cancels against a numerator factor}" />,
    reason: <>The numerator vanishes at <Katex tex="x=\tfrac32" /> and <Katex tex="x=-5" />, so those give removable points, not asymptotes.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -5, \ -2, \ \tfrac32}" />,
    reason: <>All three. Only 6% of students scored full marks.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="g_k'(x) = 0 \iff -(2k+3)x^2+(30-8k)x+(30-29k) = 0" />,
    reason: <>Only the numerator of the derivative matters; the squared denominator is never zero on the domain.</>,
  },
  {
    working: <Katex display tex="\Delta = (30-8k)^2+4(2k+3)(30-29k) = -84(k+5)(2k-3)" />,
    reason: <>It factorises, which is the sign the question was designed this way.</>,
  },
  {
    working: <Katex display tex="\text{no stationary points} \iff \Delta<0 \iff (k+5)(2k-3)>0" />,
    reason: <>A negative discriminant means the derivative never vanishes.</>,
  },
  {
    working: <Katex display tex="\boxed{k < -5 \ \text{ or } \ k > \tfrac32}" />,
    reason: <>The endpoints <Katex tex="k=-5" /> and <Katex tex="k=\tfrac32" /> are excluded anyway by the "more than two asymptotes" condition from part d.i.</>,
  },
]

export default function SpecialistQ1_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
        <p>
          Let <Katex tex="f(x)=\dfrac{(2x-3)(x+5)}{(x-1)(x+2)}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Partial Fractions"
        marks={1}
        statement={
          <>
            Express <Katex tex="f(x)" /> in the form{' '}
            <Katex tex="A+\dfrac{Bx+C}{(x-1)(x+2)}" />, where <Katex tex="A" />,{' '}
            <Katex tex="B" /> and <Katex tex="C" /> are real constants.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Asymptotes"
        marks={2}
        statement={<>State the equations of the asymptotes of the graph of <Katex tex="f" />.</>}
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
            Sketch the graph of <Katex tex="f" /> on the set of axes below. Label the
            asymptotes with their equations, and label the maximum turning point and the
            point of inflection with their coordinates, correct to two decimal places. Label
            the intercepts with the coordinate axes.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g_k(x)=\dfrac{(2x-3)(x+5)}{(x-k)(x+2)}" />, where <Katex tex="k" />{' '}
          is a real constant.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Asymptote Count"
        marks={2}
        statement={
          <>
            For what values of <Katex tex="k" /> will the graph of <Katex tex="g_k" /> have
            two asymptotes?
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Stationary Points"
        marks={2}
        statement={
          <>
            Given that the graph of <Katex tex="g_k" /> has more than two asymptotes, for
            what values of <Katex tex="k" /> will the graph of <Katex tex="g_k" /> have no
            stationary points?
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
