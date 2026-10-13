// 2015 Mathematical Methods (CAS) — Exam 1, Question 4 (6 marks).
// Stationary points of a restricted cubic, the sketch, and an average value. Question text
// transcribed from the original paper; VCAA supplied blank grid axes for part (b), so the
// sketch below is our own matplotlib figure. Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import cubicSrc from './meth-2015e1-q4b-cubic.png'

const EXAM_A: SAExaminerStats = {
  marks: [14, 24, 62],
  average: 1.5,
  comment: (
    <>
      Most students recognised the need to solve <Katex tex="f'(x)=0" />. Some students
      incorrectly stated the derivative as <Katex tex="3x(x+2)" />. Other students used the
      product rule to obtain a correct derivative, though this was not the most efficient
      method.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [17, 29, 54],
  average: 1.4,
  comment: (
    <>
      This question was generally answered well. Students were wary of the restricted
      domain, though errors occurred with the calculation or the placement of the endpoints.
      While labelling of intercepts and turning points was not required by this question, a
      correct graph was required to be awarded full marks.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [40, 19, 41],
  average: 1.0,
  comment: (
    <>
      Most students recalled the average value definition, which was not stated on the
      formula sheet, but then did not integrate correctly. The main error in student
      responses was the misplacement of <Katex tex="\tfrac12" /> in the integrand. Some
      students split the integration; for example,{' '}
      <Katex tex="\tfrac12\left(\int_0^1 f(x)\,dx+\int_1^2 f(x)\,dx\right)" />. Some students
      confused average value with average rate of change, instead finding a gradient.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \tfrac12\left(3x^2+6x\right) = \tfrac32x(x+2)" />,
    reason: <>Stationary points are where <Katex tex="f'(x)=0" />. Differentiate the expanded form term by term, keeping the <Katex tex="\tfrac12" /> in front.</>,
    more: <>The constant <Katex tex="\tfrac12" /> multiplies every term, so the derivative is <Katex tex="\tfrac32x(x+2)" />, not <Katex tex="3x(x+2)" /> — the report notes students who dropped it. The <Katex tex="x" />-values happen to survive, but a wrong derivative in your working still loses marks, and it would matter wherever the gradient's size is used. Using the product rule on the factorised form <Katex tex="\tfrac12(x-1)(x+2)^2" /> also works, but is slower and easier to get wrong.</>,
  },
  {
    working: <Katex display tex="\tfrac32x(x+2) = 0 \implies x = 0 \text{ or } x = -2" />,
    reason: <>Null factor law. Both lie inside the domain <Katex tex="[-3,2]" />, so both count.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(0) &= \tfrac12(-4) = -2 \\ f(-2) &= \tfrac12(-8+12-4) = 0 \end{aligned}" />,
    reason: <>Substitute into <Katex tex="f" /> (not <Katex tex="f'" />) to get the <Katex tex="y" />-coordinates.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,-2) \text{ and } (-2,0)}" />,
    reason: <>Coordinates, as asked. The leading coefficient is positive, so the left one, <Katex tex="(-2,0)" />, is the local maximum and <Katex tex="(0,-2)" /> the local minimum.</>,
    more: <>The nature was not asked for, but it is needed for the sketch in part (b). To confirm it: <Katex tex="f'(x)=\tfrac32x(x+2)" /> is positive for <Katex tex="x<-2" />, negative between <Katex tex="-2" /> and <Katex tex="0" />, and positive for <Katex tex="x>0" /> — rising, falling, rising.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &f(x) = \tfrac12(x-1)(x+2)^2 \\ &\implies x\text{-intercepts } 1 \text{ and } -2 \end{aligned}" />,
    reason: <>Use the factorised form given just before part (b). <Katex tex="x=-2" /> is a repeated root, so the curve touches the axis there rather than crossing.</>,
    more: <>That touching point, <Katex tex="(-2,0)" />, is the same point as the local maximum from part (a) — a double (squared) root of a cubic is a turning point on the axis. (A triple root, as in <Katex tex="y=x^3" />, is instead a stationary point of inflection.)</>,
  },
  {
    working: <Katex display tex="f(0) = -2" />,
    reason: <>The <Katex tex="y" />-intercept, which is also the local minimum <Katex tex="(0,-2)" /> from part (a).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(-3) &= \tfrac12(-27+27-4) = -2 \\ f(2) &= \tfrac12(8+12-4) = 8 \end{aligned}" />,
    reason: <>The endpoints, from the original rule. Label them <Katex tex="(-3,-2)" /> and <Katex tex="(2,8)" />, as the question asks.</>,
    more: <>The report says errors came from the calculation or the placement of the endpoints. Two things to notice: <Katex tex="(-3,-2)" /> is at the same height as the minimum <Katex tex="(0,-2)" />, so the curve starts level with its lowest turning point; and <Katex tex="(2,8)" /> sits at the very top of VCAA's grid, so the right-hand branch climbs steeply from <Katex tex="(1,0)" />.</>,
  },
  {
    working: <Katex display tex="\text{domain } [-3,2] \text{ only}" />,
    reason: <>Stop the curve at the endpoints and mark them with closed dots (both are included); do not continue the cubic beyond.</>,
    more: <>The report adds that labelling intercepts and turning points was not required for the marks, but the graph itself had to be correct: right shape, touching at <Katex tex="x=-2" />, crossing at <Katex tex="x=1" />, and ending at the right points.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value} = \frac{1}{b-a}\int_a^b f(x)\,dx" />,
    reason: <>The mean <em>height</em> of the graph over the interval. Not on the formula sheet, so it must be remembered.</>,
    more: <>Don't confuse it with the average <em>rate of change</em>, <Katex tex="\dfrac{f(2)-f(0)}{2-0}" />, which is a gradient — the report notes students who found that instead.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{2-0}\int_0^2 \tfrac12\left(x^3+3x^2-4\right)dx" />,
    reason: <>Here <Katex tex="a=0" />, <Katex tex="b=2" />. Two halves now: one from the interval width, one from the rule for <Katex tex="f" />.</>,
    more: <>The report's main error was misplacing the <Katex tex="\tfrac12" /> in the integrand — write out the whole of <Katex tex="f(x)" />, including its own <Katex tex="\tfrac12" />, before simplifying. Splitting at the <Katex tex="x" />-intercept <Katex tex="x=1" />, as some students did, is unnecessary; if you do, keep <Katex tex="\int_0^1 f(x)\,dx=-\tfrac{11}{8}" /> negative — making it positive gives <Katex tex="\tfrac{19}{8}" /> instead of <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="= \frac14\left[\frac{x^4}{4}+x^3-4x\right]_0^2" />,
    reason: <>Combine <Katex tex="\tfrac12\times\tfrac12=\tfrac14" /> and antidifferentiate term by term.</>,
  },
  {
    working: <Katex display tex="= \frac14\left(4+8-8\right)" />,
    reason: <><Katex tex="\tfrac{2^4}{4}=4" />, <Katex tex="2^3=8" />, <Katex tex="4(2)=8" />; every term is <Katex tex="0" /> at the lower terminal.</>,
  },
  {
    working: <Katex display tex="\boxed{1}" />,
    reason: <>The average value of <Katex tex="f" /> over <Katex tex="[0,2]" />.</>,
    more: <>A sense check against the sketch: the curve is below the axis on <Katex tex="[0,1]" /> (never lower than <Katex tex="-2" />), then climbs to <Katex tex="8" /> on <Katex tex="[1,2]" />. The part above the axis clearly outweighs the part below, so a small positive mean like <Katex tex="1" /> is plausible.</>,
  },
]

export default function MethodsQ4_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (6 marks)</p>
        <p>
          Consider the function <Katex tex="f:[-3,2]\to R" />,{' '}
          <Katex tex="f(x)=\tfrac12\left(x^3+3x^2-4\right)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Stationary Points"
        marks={2}
        statement={<>Find the coordinates of the stationary points of the function.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The rule for <Katex tex="f" /> can also be expressed as{' '}
        <Katex tex="f(x)=\tfrac12(x-1)(x+2)^2" />.
      </div>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            On the axes below, sketch the graph of <Katex tex="f" />, clearly indicating axis
            intercepts and turning points. Label the end points with their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={cubicSrc}
            alt="This site's sketch, on VCAA's −8 to 8 grid, of the cubic y = ½(x−1)(x+2)² drawn only on [−3, 2]: starting at (−3, −2), rising to touch the x-axis at the maximum (−2, 0), falling to the minimum (0, −2), then rising through (1, 0) to the endpoint (2, 8)"
            className="w-full max-w-[400px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="c"
        topic="Average Value"
        marks={2}
        statement={
          <>
            Find the average value of <Katex tex="f" /> over the interval{' '}
            <Katex tex="0\le x\le2" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Average value: a rectangle of equal signed area">
          <p>
            <Katex tex="\overline{f}=\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx" /> — the
            constant height a rectangle on the same base would need to enclose the same
            area. Above the axis counts as positive and below as negative, so it can even be
            zero.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
