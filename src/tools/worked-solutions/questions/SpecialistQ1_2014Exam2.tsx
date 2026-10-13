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
      sometimes introduced errors. Other errors involved incorrect results for{' '}
      <Katex tex="f'(x)" />. A small number of students isolated the quadratic denominator and
      used it to find the turning point.
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
      Many students answered this question well; however, some gained only partial marks
      where graphs were not drawn over the correct domain, where the <Katex tex="y" />-intercept
      was not found or where the curve swung away from an asymptote.
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
    reason: <>Expanding the denominator gives a single quadratic to differentiate — quicker and safer than splitting into partial fractions first.</>,
    more: <>The report says a significant number of students used partial fractions first and this sometimes introduced errors. That form is <Katex tex="f(x)=\tfrac32\left(\tfrac{1}{x-4}-\tfrac{1}{x+2}\right)" /> — the <Katex tex="\tfrac32" /> (that is, <Katex tex="\tfrac96" />) and the sign of each term are where slips happen. It does work, but it adds a step that this part doesn't need.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{-9(2x-2)}{\left(x^2-2x-8\right)^2}" />,
    reason: <>Write <Katex tex="f(x)=9\left(x^2-2x-8\right)^{-1}" /> and use the chain rule: bring down the power, then multiply by the inner derivative <Katex tex="2x-2" />.</>,
    more: <>The quotient rule gives the same thing: the numerator 9 has derivative 0, so only <Katex tex="-9\times(2x-2)" /> survives on top. The report lists incorrect <Katex tex="f'(x)" /> as another error; the usual slips are a lost minus sign or a missing inner derivative.</>,
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
    reason: <>A single stationary point, at <Katex tex="x=1" /> where the quadratic denominator turns (midway between its roots <Katex tex="-2" /> and <Katex tex="4" />).</>,
    more: <>Why: the numerator of <Katex tex="f'(x)" /> is <Katex tex="-9" /> times the derivative of the denominator <Katex tex="x^2-2x-8" />, so <Katex tex="f'(x)=0" /> exactly at that parabola's vertex, halfway between its roots: <Katex tex="\tfrac{-2+4}{2}=1" />. That is the shortcut the report mentions some students used. On <Katex tex="-2<x<4" /> the denominator is negative with its most negative value <Katex tex="-9" /> at <Katex tex="x=1" />, so <Katex tex="f" /> is closest to zero there: <Katex tex="(1,-1)" /> is a local maximum, which you need for the sketch in part c.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(x+2)(x-4) = 0 \implies x = -2,\ x = 4" />,
    reason: <>The denominator is zero here and the numerator 9 is not, so nothing cancels: both are vertical asymptotes.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies f(x)\to0" />,
    reason: <>The denominator grows without bound while the numerator stays at 9, so <Katex tex="y=0" /> is a horizontal asymptote.</>,
    more: <>In general, when the numerator's degree (here 0) is less than the denominator's (here 2), the <Katex tex="x" />-axis is the horizontal asymptote. Only the two outer branches approach it, which is perhaps why it was the report's most frequent omission.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -2,\quad x = 4,\quad y = 0}" />,
    reason: <>All three asymptotes, including <Katex tex="y=0" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = \frac{9}{(2)(-4)} = -\tfrac98" />,
    reason: <>The <Katex tex="y" />-intercept: set <Katex tex="x=0" />. There is no <Katex tex="x" />-intercept, since the numerator 9 is never zero.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&-2<x<4:\ (x+2)>0,\ (x-4)<0\\&\implies f(x)<0\end{aligned}" />,
    reason: <>The middle branch is below the axis and <Katex tex="f(x)\to-\infty" /> at both asymptotes, so <Katex tex="(1,-1)" /> is a local maximum at its top.</>,
  },
  {
    working: <Katex display tex="x<-2 \text{ or } x>4 \implies f(x)>0" />,
    reason: <>Both outer branches are above the axis: they rise to <Katex tex="+\infty" /> beside the vertical asymptotes and approach <Katex tex="y=0" /> from above.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img loading="lazy" decoding="async"
          src={graphSrc}
          alt="This site's sketch of the three branches of y = 9/((x+2)(x-4)) on VCAA's −6 ≤ x ≤ 6 grid: two positive branches outside the dashed vertical asymptotes x = −2 and x = 4 falling towards y = 0, and a middle branch below the axis with a maximum at (1, −1) and y-intercept (0, −9/8)"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>Drawn only over <Katex tex="[-6,6]" />, with each branch approaching its asymptotes rather than swinging away from them.</>,
    more: <>The report took marks off for the wrong domain, a missing <Katex tex="y" />-intercept, and curves that swung away from an asymptote. The graph should stop at the endpoints <Katex tex="\left(-6,\tfrac{9}{40}\right)" /> and <Katex tex="\left(6,\tfrac{9}{16}\right)" />, both small and positive. They are not asked for, but they show the outer branches really are flattening towards <Katex tex="y=0" />. Near <Katex tex="x=-2" /> and <Katex tex="x=4" /> the curve must get steeper and closer to the dashed line without ever touching or bending away from it.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b\bigl(f(x)\bigr)^2dx" />,
    reason: <>Rotating about the <Katex tex="x" />-axis makes each thin slice a disc of radius <Katex tex="|f(x)|" />, area <Katex tex="\pi\bigl(f(x)\bigr)^2" />.</>,
    more: <>Adding up those discs of thickness <Katex tex="dx" /> gives the integral. The report says most errors were a missing <Katex tex="\pi" /> or an unsquared <Katex tex="f(x)" />. Both come from the disc area <Katex tex="\pi r^2" />, so remembering where the formula comes from protects you from both.</>,
  },
  {
    working: <Katex display tex="\bigl(f(x)\bigr)^2 = \frac{81}{(x+2)^2(x-4)^2}" />,
    reason: <>Squaring numerator and denominator.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^3\frac{81}{(x+2)^2(x-4)^2}\,dx}" />,
    reason: <>The region runs from the <Katex tex="y" />-axis (<Katex tex="x=0" />) to <Katex tex="x=3" />. It lies below the <Katex tex="x" />-axis, but squaring makes that irrelevant.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">π·∫(81/((x+2)^2(x-4)^2), x, 0, 3)</Cas>,
    reason: <>Evaluate the part d.i integral numerically on CAS.</>,
  },
  {
    working: <Katex display tex="V = 12.8473\ldots" />,
    reason: <>Unrounded.</>,
  },
  {
    working: <Katex display tex="\boxed{V \approx 12.85}" />,
    reason: <>To two decimal places, as asked.</>,
    more: <>Sanity check: <Katex tex="|f|" /> runs from <Katex tex="\tfrac98" /> down to 1 and back to <Katex tex="\tfrac95" /> over <Katex tex="[0,3]" />, so the solid is roughly a cylinder of radius a little over 1 and length 3 — <Katex tex="\pi\times1.2^2\times3\approx13.6" />, close ✓.</>,
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
        topic="Stationary Points"
        marks={3}
        statement={<>Find the coordinates of the stationary point(s).</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Asymptotes"
        marks={2}
        statement={<>State the equations of all asymptotes of the graph of <Katex tex="f" />.</>}
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
        <Katex tex="x=3" />, is rotated about the <Katex tex="x" />-axis to form a solid of
        revolution.
      </div>

      <PartCard
        letter="d.i"
        topic="Volume of Revolution"
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
        topic="Volume of Revolution"
        marks={1}
        statement={<>Find the volume of this solid, correct to two decimal places.</>}
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
