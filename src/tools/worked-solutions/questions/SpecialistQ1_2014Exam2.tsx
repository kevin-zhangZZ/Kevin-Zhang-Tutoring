// 2014 Specialist Mathematics — Exam 2, Section 2 Question 1 (11 marks). The stationary
// point, asymptotes and graph of 9/((x+2)(x-4)), then a volume of revolution. Question text
// transcribed from the original paper; the axes VCAA supplied for part (c) were blank, so
// the sketch is this site's own matplotlib figure. Answers checked with sympy and against
// the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './spec-2014e2-q1c-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [3, 3, 7, 87],
  average: 2.8,
  comment: (
    <>
      This question was answered very well. However, a significant number of students
      expressed <Katex tex="f(x)" /> in partial fraction form before differentiating and this
      sometimes introduced errors.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [3, 18, 79],
  average: 1.8,
  comment: (
    <>
      This question was answered well. The most frequent error was the omission of the
      asymptote <Katex tex="y=0" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [2, 7, 30, 61],
  average: 2.5,
  comment: (
    <>
      Some gained only partial marks where graphs were not drawn over the correct domain,
      where the <Katex tex="y" />-intercept was not found, or where the curve swung away from
      an asymptote.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [6, 9, 85],
  average: 1.8,
  comment: (
    <>
      This question was answered very well. Most errors involved the omission of{' '}
      <Katex tex="\pi" />, or the failure to square <Katex tex="f(x)" /> in the integrand.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: <>This question was answered well by students who managed to set up the integral for volume correctly.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{9}{(x+2)(x-4)} = \frac{9}{x^2-2x-8}" />,
    reason: <>Expanding the denominator is quicker than partial fractions here — the report says partial fractions introduced errors.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{-9(2x-2)}{\left(x^2-2x-8\right)^2}" />,
    reason: <>Quotient rule with a constant numerator, or equivalently <Katex tex="9\left(x^2-2x-8\right)^{-1}" /> and the chain rule.</>,
  },
  {
    working: <Katex display tex="f'(x) = 0 \implies 2x-2 = 0 \implies x = 1" />,
    reason: <>A fraction is zero only when its numerator is, and the denominator is never zero on the domain.</>,
  },
  {
    working: <Katex display tex="f(1) = \frac{9}{(3)(-3)} = -1" />,
    reason: <>Substituting back.</>,
  },
  {
    working: <Katex display tex="\boxed{(1,-1)}" />,
    reason: <>A single stationary point, midway between the two asymptotes — as symmetry would suggest.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(x+2)(x-4) = 0 \implies x = -2,\ x = 4" />,
    reason: <>Neither factor cancels, so both give vertical asymptotes.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies f(x)\to0" />,
    reason: <>The denominator grows without bound while the numerator stays at 9.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -2,\quad x = 4,\quad y = 0}" />,
    reason: <>All three. Forgetting the horizontal one was the report's most frequent error.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = \frac{9}{(2)(-4)} = -\tfrac98" />,
    reason: <>The <Katex tex="y" />-intercept, which the report says was often missing. There is no <Katex tex="x" />-intercept, since the numerator is never zero.</>,
  },
  {
    working: <Katex display tex="-2<x<4:\ (x+2)>0,\ (x-4)<0 \implies f(x)<0" />,
    reason: <>The middle branch sits entirely below the axis, with the maximum <Katex tex="(1,-1)" /> at its top.</>,
  },
  {
    working: <Katex display tex="x<-2 \text{ or } x>4 \implies f(x)>0" />,
    reason: <>Both outer branches are above the axis and approach <Katex tex="y=0" /> from above.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={graphSrc}
          alt="Three branches of y = 9/((x+2)(x-4)) on −6 ≤ x ≤ 6: two positive branches outside the dashed vertical asymptotes x = −2 and x = 4 falling towards y = 0, and a middle branch below the axis with a maximum at (1, −1) and y-intercept (0, −9/8)"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>Drawn over the required <Katex tex="[-6,6]" />, with each branch hugging its asymptotes rather than swinging away from them.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b\bigl(f(x)\bigr)^2dx" />,
    reason: <>Rotation about the <Katex tex="x" />-axis. The <Katex tex="\pi" /> and the square are the two things the report says went missing.</>,
  },
  {
    working: <Katex display tex="\bigl(f(x)\bigr)^2 = \frac{81}{(x+2)^2(x-4)^2}" />,
    reason: <>Squaring numerator and denominator.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^3\frac{81}{(x+2)^2(x-4)^2}\,dx}" />,
    reason: <>The region runs from the <Katex tex="y" />-axis to <Katex tex="x=3" />. It lies below the <Katex tex="x" />-axis, but squaring makes that irrelevant.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">π·∫(81/((x+2)^2(x-4)^2), x, 0, 3)</Cas>,
    reason: <>Straight into the calculator from part d(i).</>,
  },
  {
    working: <Katex display tex="V = 12.8473\ldots" />,
    reason: <>Unrounded.</>,
  },
  {
    working: <Katex display tex="\boxed{V \approx 12.85}" />,
    reason: <>To two decimal places, as asked.</>,
  },
]

export default function SpecialistQ1_2014Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Consider the function <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=\dfrac{9}{(x+2)(x-4)}" /> over its maximal domain.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={<>Find the coordinates of the stationary point(s).</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>State the equations of all asymptotes of the graph of <Katex tex="f" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f" /> for <Katex tex="x\in[-6,6]" /> on the axes
            below, showing asymptotes, the values of the coordinates of any intercepts with
            the axes, and the stationary point(s).
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The region bounded by the coordinate axes, the graph of <Katex tex="f" /> and the line{' '}
        <Katex tex="x=3" /> is rotated about the <Katex tex="x" />-axis to form a solid of
        revolution.
      </div>

      <PartCard
        letter="d.i"
        marks={2}
        statement={
          <>
            Write down a definite integral in terms of <Katex tex="x" /> that gives the volume
            of this solid of revolution.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        marks={1}
        statement={<>Find the volume of this solid, correct to two decimal places.</>}
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
