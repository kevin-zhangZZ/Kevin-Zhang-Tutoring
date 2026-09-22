// 2024 Mathematical Methods — Exam 1 Question 3 (5 marks). Sketching a truncus, then the
// area it cuts below the x-axis. Question text transcribed from the original paper; the
// sketch is our own drawing of the answer. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2024e1-q3a-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [8, 16, 35, 42],
  average: 2.1,
  comment: (
    <>
      Common errors included not labelling the asymptotes with <Katex tex="x=" /> or{' '}
      <Katex tex="y=" />, incorrectly determining the coordinates of{' '}
      <Katex tex="x" />-intercepts, and not indicating the symmetry of the curve. Some
      students mistakenly sketched a hyperbola.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [48, 25, 27],
  average: 0.8,
  comment: (
    <>
      Common errors included using an <Katex tex="x" />-intercept for one of the terminals
      rather than <Katex tex="0" /> and <Katex tex="-2" />, incorrect integration, and
      arithmetic errors. Many students arrived at a negative answer and knew the area needed
      to be positive, but did not provide correct reasoning; many simply wrote{' '}
      <Katex tex="-\tfrac{10}{3}=\tfrac{10}{3}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \frac{1}{(x+3)^2}-2" />,
    reason: <>A <em>truncus</em>: <Katex tex="y=\tfrac{1}{x^2}" /> translated 3 left and 2 down. Squaring the denominator makes both branches positive before the shift, so the curve is symmetric about its vertical asymptote — unlike a hyperbola, which the report says some students drew.</>,
  },
  {
    working: <Katex display tex="x+3 = 0 \implies x = -3 \ \text{(vertical asymptote)}" />,
    reason: <>Label it with an equation starting <Katex tex="x=" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{(x+3)^2}\to0 \implies y = -2 \ \text{(horizontal asymptote)}" />,
    reason: <>Approached from <em>above</em> on both sides, since <Katex tex="\tfrac{1}{(x+3)^2}>0" /> always.</>,
  },
  {
    working: <Katex display tex="g(x) = 0 \implies (x+3)^2 = \frac12 \implies x+3 = \pm\frac{1}{\sqrt2}" />,
    reason: 'Two x-intercepts, one either side of the asymptote — the symmetry made visible.',
  },
  {
    working: <Katex display tex="x = -3\pm\frac{\sqrt2}{2}" />,
    reason: <>Rationalising: about <Katex tex="-3.71" /> and <Katex tex="-2.29" />.</>,
  },
  {
    working: <Katex display tex="g(0) = \frac19-2 = -\frac{17}{9}" />,
    reason: <>The <Katex tex="y" />-intercept, just above the horizontal asymptote.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Region: } -2\le x\le0 \text{ (between } x=-2 \text{ and the } y\text{-axis)}" />,
    reason: <>The four boundaries named in the question are <Katex tex="x=-2" />, the <Katex tex="x" />-axis, the <Katex tex="y" />-axis and the curve. The terminals are <Katex tex="-2" /> and <Katex tex="0" /> — not an <Katex tex="x" />-intercept, which is the report's first named error.</>,
  },
  {
    working: <Katex display tex="g(-2) = 1-2 = -1, \qquad g(0) = -\frac{17}{9}" />,
    reason: 'Both negative, so the curve lies entirely below the axis across this strip.',
  },
  {
    working: <Katex display tex="A = \int_{-2}^{0}\bigl|g(x)\bigr|\,dx = \int_{-2}^{0}\left(2-\frac{1}{(x+3)^2}\right)dx" />,
    reason: 'Flipping the integrand up front is cleaner than integrating and apologising for a negative afterwards.',
  },
  {
    working: <Katex display tex="= \left[2x+\frac{1}{x+3}\right]_{-2}^{0}" />,
    reason: <><Katex tex="\int(x+3)^{-2}dx=-(x+3)^{-1}" />, so subtracting it gives <Katex tex="+\tfrac{1}{x+3}" />.</>,
  },
  {
    working: <Katex display tex="= \left(0+\frac13\right)-\left(-4+1\right) = \frac13+3" />,
    reason: <>At <Katex tex="x=-2" />: <Katex tex="2(-2)=-4" /> and <Katex tex="\tfrac{1}{1}=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{10}{3} \ \text{square units}}" />,
    reason: <>About <Katex tex="3.33" />. If you integrate <Katex tex="g" /> as it stands you get <Katex tex="-\tfrac{10}{3}" />; say <em>why</em> you are taking the positive value, rather than writing <Katex tex="-\tfrac{10}{3}=\tfrac{10}{3}" />, which is simply false.</>,
  },
]

export default function MethodsQ3_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (5 marks)</p>
        <p>
          Let <Katex tex="g:\mathbb{R}\setminus\{-3\}\to\mathbb{R}" />,{' '}
          <Katex tex="g(x)=\dfrac{1}{(x+3)^2}-2" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The squared denominator is the whole character of this graph. It forces{' '}
            <Katex tex="\tfrac{1}{(x+3)^2}>0" />, so both branches sit <em>above</em> the
            horizontal asymptote and the curve is symmetric about <Katex tex="x=-3" />. A
            hyperbola would have one branch above and one below.
          </p>
          <p>
            That symmetry also explains why part a. has two <Katex tex="x" />-intercepts
            rather than one, and why they come out as <Katex tex="-3\pm\tfrac{\sqrt2}{2}" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            On the axes provided, sketch the graph of <Katex tex="y=g(x)" />, labelling all
            asymptotes with their equations and axis intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="A truncus with two branches rising steeply either side of the dashed asymptote x = −3, crossing the x-axis at −3 ± √2⁄2 and flattening towards the dashed asymptote y = −2, passing through (0, −17/9)"
            className="w-full max-w-[440px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="b"
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
