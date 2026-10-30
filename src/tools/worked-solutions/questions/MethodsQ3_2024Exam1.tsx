// 2024 Mathematical Methods — Exam 1 Question 3 (5 marks). Sketching a truncus, then the
// area it cuts below the x-axis. Question text transcribed from the original paper; the
// sketch is our own drawing of the answer. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import sketchSrc from './meth-2024e1-q3a-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [8, 16, 35, 42],
  average: 2.1,
  comment: (
    <>
      Most students presented graphs that were well drawn and appropriately labelled.
      Generally students included details and labels as required and produced smooth graph
      lines that displayed appropriate asymptotic behaviour, with asymptotes indicated as dashed
      or dotted lines. Common errors included not labelling the asymptotes with{' '}
      <Katex tex="x=" /> or <Katex tex="y=" />, incorrectly determining the coordinates of{' '}
      <Katex tex="x" />-intercepts, and not indicating the symmetry of the curve. Some students
      mistakenly sketched a hyperbola.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [48, 25, 27],
  average: 0.8,
  comment: (
    <>
      This question required students to find the area bounded by a graph below the{' '}
      <Katex tex="x" />-axis using integral calculus. Students generally performed well on this
      question. Common errors included setting up the integral using an{' '}
      <Katex tex="x" />-intercept for one of the terminals rather than 0 and <Katex tex="-2" />,
      incorrect integration, and arithmetic errors in the substitution. Many students arrived at
      a negative answer and knew that the area needed to be positive, but did not provide
      correct reasoning steps (e.g. use absolute value sign, or state area must be positive)
      when they attempted to show the final answer as positive. Many simply wrote{' '}
      <Katex tex="-\tfrac{10}{3}=\tfrac{10}{3}" /> as the final answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \frac{1}{(x+3)^2}-2" />,
    reason: <>A <em>truncus</em>: <Katex tex="y=\tfrac{1}{x^2}" /> translated 3 left and 2 down. Both branches sit above <Katex tex="y=-2" />, mirror images about <Katex tex="x=-3" />.</>,
    more: <>The report notes some students mistakenly sketched a hyperbola. Quick check: <Katex tex="g(-4)=1-2=-1" /> and <Katex tex="g(-2)=1-2=-1" /> — the same height either side of <Katex tex="x=-3" />, which rules out a hyperbola.</>,
  },
  {
    working: <Katex display tex="x+3 = 0 \implies x = -3 \ \text{(vertical asymptote)}" />,
    reason: <>The denominator is zero at <Katex tex="x=-3" /> (excluded from the domain). Label the asymptote as an equation, <Katex tex="x=-3" />, not just <Katex tex="-3" />.</>,
    more: <>The report lists not labelling the asymptotes with <Katex tex="x=" /> or <Katex tex="y=" /> as a common error — an easy mark to throw away.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{As } x\to\pm\infty,\ \frac{1}{(x+3)^2}\to0 \\ \implies y = -2 \ \text{(horizontal asymptote)}\end{gathered}" />,
    reason: <>Far from <Katex tex="x=-3" /> the fraction vanishes, leaving <Katex tex="-2" />. Approached from <em>above</em> on both sides, since <Katex tex="\tfrac{1}{(x+3)^2}>0" /> always.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}g(x) = 0 \implies \frac{1}{(x+3)^2} &= 2 \\ (x+3)^2 &= \frac12 \\ x+3 &= \pm\frac{1}{\sqrt2}\end{aligned}" />,
    reason: <>The <Katex tex="x" />-intercepts are where <Katex tex="g(x)=0" />. Add 2, then take reciprocals of both sides to get <Katex tex="(x+3)^2=\tfrac12" />; the square root needs <Katex tex="\pm" />, giving two <Katex tex="x" />-intercepts.</>,
    more: <>Incorrect <Katex tex="x" />-intercepts were a common error in the report — usually from dropping the <Katex tex="\pm" /> (losing the left intercept) or slipping when simplifying <Katex tex="\tfrac{1}{\sqrt2}" />. The two intercepts sit the same distance either side of <Katex tex="x=-3" />: the symmetry made visible.</>,
  },
  {
    working: <Katex display tex="x = -3\pm\frac{\sqrt2}{2} \implies \left(-3\pm\frac{\sqrt2}{2},\,0\right)" />,
    reason: <>Rationalising <Katex tex="\tfrac{1}{\sqrt2}=\tfrac{\sqrt2}{2}" />. Written as coordinates, as the question asks; about <Katex tex="-3.71" /> and <Katex tex="-2.29" />.</>,
  },
  {
    working: <Katex display tex="g(0) = \frac19-2 = -\frac{17}{9} \implies \left(0,\,-\frac{17}{9}\right)" />,
    reason: <>The <Katex tex="y" />-intercept; <Katex tex="-\tfrac{17}{9}\approx-1.89" /> is just above the horizontal asymptote <Katex tex="y=-2" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="The answer on VCAA's grid (x from about −5.3 to 1.3, y from about −3.3 to 2.7): a truncus with two branches rising steeply either side of the dashed asymptote x = −3, crossing the x-axis at −3 ± √2⁄2 and flattening towards the dashed asymptote y = −2, passing through (0, −17/9)"
          className="w-full max-w-[440px]"
        />
      </div>
    ),
    reason: <>Both asymptotes dashed and labelled with equations, all three intercepts with coordinates, and the branches drawn as mirror images about <Katex tex="x=-3" />.</>,
    more: <>The report names not indicating the symmetry as a common error. To draw it, mirror the <Katex tex="y" />-intercept: <Katex tex="g(-6)=\tfrac19-2=-\tfrac{17}{9}" /> too, so the left branch passes through <Katex tex="\left(-6,-\tfrac{17}{9}\right)" /> at the same height.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Region: } -2\le x\le0" />,
    reason: <>The vertical boundaries, <Katex tex="x=-2" /> and the <Katex tex="y" />-axis (<Katex tex="x=0" />), give the terminals; the <Katex tex="x" />-axis (top) and the curve (bottom) close the region.</>,
    more: <>The report notes some students used an <Katex tex="x" />-intercept as a terminal. The nearer intercept, <Katex tex="-3+\tfrac{\sqrt2}{2}\approx-2.29" />, lies left of <Katex tex="x=-2" />, outside the strip, so the curve never meets the axis here and no intercept bounds the region.</>,
  },
  {
    working: <Katex display tex="g(-2) = 1-2 = -1, \qquad g(0) = -\frac{17}{9}" />,
    reason: <>For <Katex tex="x>-3" />, <Katex tex="\tfrac{1}{(x+3)^2}" /> shrinks as <Katex tex="x" /> grows, so <Katex tex="g" /> decreases from <Katex tex="-1" />: the curve is below the axis on the whole strip.</>,
  },
  {
    working: <Katex display tex="A = \int_{-2}^{0}\bigl|g(x)\bigr|\,dx = \int_{-2}^{0}\left(2-\frac{1}{(x+3)^2}\right)dx" />,
    reason: <>Below the axis, area <Katex tex="=\int|g|\,dx=\int(-g)\,dx" />.</>,
    more: <>Writing the absolute value first is the reasoning step that makes the answer come out positive, so there is no negative to fix at the end.</>,
  },
  {
    working: <Katex display tex="= \left[2x+\frac{1}{x+3}\right]_{-2}^{0}" />,
    reason: <><Katex tex="\int 2\,dx=2x" />. Write <Katex tex="\tfrac{1}{(x+3)^2}=(x+3)^{-2}" />: raising the power by one and dividing by it gives <Katex tex="\int(x+3)^{-2}dx=-(x+3)^{-1}" />, so subtracting it gives <Katex tex="+\tfrac{1}{x+3}" />.</>,
    more: <>Check by differentiating: <Katex tex="\tfrac{d}{dx}\left(2x+(x+3)^{-1}\right)=2-(x+3)^{-2}" />, the integrand. The report lists incorrect integration as a common error.</>,
  },
  {
    working: <Katex display tex="= \left(0+\frac13\right)-\left(-4+1\right) = \frac13+3" />,
    reason: <>Upper terminal minus lower terminal. At <Katex tex="x=0" />: <Katex tex="0+\tfrac13" />. At <Katex tex="x=-2" />: <Katex tex="2(-2)=-4" /> and <Katex tex="\tfrac{1}{-2+3}=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{10}{3} \ \text{square units}}" />,
    reason: <>Positive, as an area must be (about <Katex tex="3.33" />).</>,
    more: <>If you integrate <Katex tex="g" /> as it stands you get <Katex tex="-\tfrac{10}{3}" />. That is fine, but then say <em>why</em> you take the positive value — write <Katex tex="A=\left|-\tfrac{10}{3}\right|=\tfrac{10}{3}" /> or state that area must be positive. The report notes many students simply wrote <Katex tex="-\tfrac{10}{3}=\tfrac{10}{3}" /> — a false statement, not a reasoning step.</>,
  },
]

export default function MethodsQ3_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (5 marks)</p>
        <p>
          Let <Katex tex="g:R\setminus\{-3\}\to R" />,{' '}
          <Katex tex="g(x)=\dfrac{1}{(x+3)^2}-2" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The squared denominator is the whole character of this graph. It forces{' '}
              <Katex tex="\tfrac{1}{(x+3)^2}>0" />, so both branches sit <em>above</em> the
              horizontal asymptote and the curve is symmetric about <Katex tex="x=-3" />. A
              hyperbola would have one branch above and one below.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Sketch Truncus"
        marks={3}
        statement={
          <>
            On the axes below, sketch the graph of <Katex tex="y=g(x)" />, labelling all
            asymptotes with their equations and axis intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Determine the area of the region bounded by the line <Katex tex="x=-2" />, the{' '}
            <Katex tex="x" />-axis, the <Katex tex="y" />-axis and the graph of{' '}
            <Katex tex="y=g(x)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
