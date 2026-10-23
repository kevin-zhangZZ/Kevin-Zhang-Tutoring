// 2026 Mathematical Methods NHT — Exam 1, Question 4 (4 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// f(x) = 2sin(x − π/6) on [0, 2π]: a value at x = 0, then a sketch with turning points and
// x-intercepts. Question text transcribed from the original paper; the blank axes are cropped from
// the original VCAA exam PDF, and the part b. sketch is this site's own answer, drawn with
// matplotlib on a copy of VCAA's grid (x every π/3, y every 1). Answers checked with sympy and
// against the VCAA report's sample answers (f(0) = −1; x-intercepts (π/6, 0) and (7π/6, 0);
// turning points (2π/3, 2) and (5π/3, −2)). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import axesSrc from './meth-2026nhte1-q4b-axes.png'
import sketchSrc from './meth-2026nhte1-q4b-sketch.png'

const REPORT_A: SAExaminerStats = {
  comment: <>This question involved the calculation of the value of the function when <Katex tex="x=0" />.</>,
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      The graph of the function needed to be sketched over the domain <Katex tex="[0,2\pi]" />. The shape needed to
      represent a sine graph depicting a period of <Katex tex="2\pi" /> and an amplitude of 2. Endpoints, although not
      required to be labelled, needed to be correctly positioned. The two <Katex tex="x" />-intercepts needed to be
      labelled and correctly positioned. The turning points needed to be correctly positioned and labelled.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(0)=2\sin\!\left(-\frac\pi6\right)=-2\sin\!\left(\frac\pi6\right)" />,
    reason: <>Substitute <Katex tex="x=0" />. Sine is an odd function, <Katex tex="\sin(-\theta)=-\sin(\theta)" />: a negative angle is in the fourth quadrant, where sine is negative.</>,
  },
  {
    working: <Katex display tex="\boxed{f(0)=-2\times\frac12=-1}" />,
    reason: <>The exact value <Katex tex="\sin\!\left(\tfrac\pi6\right)=\tfrac12" />. This is also the left endpoint of the graph in part b., <Katex tex="(0,-1)" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{amplitude }2,\qquad \text{period }\frac{2\pi}{1}=2\pi" />,
    reason: <>
      Compare with <Katex tex="y=a\sin\big(n(x-h)\big)" />: <Katex tex="a=2" />, <Katex tex="n=1" />,{' '}
      <Katex tex="h=\tfrac\pi6" />. The graph is <Katex tex="y=2\sin(x)" /> moved <Katex tex="\tfrac\pi6" /> to the right,
      and the domain <Katex tex="[0,2\pi]" /> holds exactly one period.
    </>,
  },
  {
    working: <Katex display tex="\begin{gathered}\sin\!\left(x-\tfrac\pi6\right)=0 \implies x-\tfrac\pi6=0,\ \pi\\ \implies x=\tfrac\pi6,\ \tfrac{7\pi}6\end{gathered}" />,
    reason: <>
      The <Katex tex="x" />-intercepts. For <Katex tex="x\in[0,2\pi]" /> the angle <Katex tex="x-\tfrac\pi6" /> runs over{' '}
      <Katex tex="\left[-\tfrac\pi6,\tfrac{11\pi}6\right]" />, where sine is zero only at 0 and <Katex tex="\pi" />.
    </>,
    more: <>
      <Katex tex="2\pi" /> is outside that range (<Katex tex="\tfrac{11\pi}6<2\pi" />), so there is no third intercept: the
      graph ends at <Katex tex="(2\pi,-1)" />, still below the axis.
    </>,
  },
  {
    working: <Katex display tex="\begin{gathered}x-\tfrac\pi6=\tfrac\pi2 \implies x=\tfrac{2\pi}3,\ y=2\\ x-\tfrac\pi6=\tfrac{3\pi}2 \implies x=\tfrac{5\pi}3,\ y=-2\end{gathered}" />,
    reason: <>
      The turning points are where sine reaches 1 and <Katex tex="-1" />, so <Katex tex="y=\pm2" />, the amplitude.{' '}
      <Katex tex="\tfrac\pi2+\tfrac\pi6=\tfrac{4\pi}6=\tfrac{2\pi}3" /> and{' '}
      <Katex tex="\tfrac{3\pi}2+\tfrac\pi6=\tfrac{10\pi}6=\tfrac{5\pi}3" />.
    </>,
    more: <>
      Both land on VCAA&apos;s gridlines, a good sign. The intercepts sit halfway between gridlines, at{' '}
      <Katex tex="\tfrac\pi6" /> and <Katex tex="\tfrac{7\pi}6" />.
    </>,
  },
  {
    working: <Katex display tex="f(0)=-1,\qquad f(2\pi)=2\sin\!\left(\tfrac{11\pi}6\right)=-1" />,
    reason: <>The endpoints, closed since the domain is a closed interval. Not required to be labelled, but they must be in the right place.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's sketch of y = 2sin(x − π/6) on VCAA's grid from 0 to 2π: from the closed endpoint (0, −1) the curve rises through (π/6, 0) to a maximum at (2π/3, 2), falls through (7π/6, 0) to a minimum at (5π/3, −2), then rises to the closed endpoint (2π, −1)"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>
      One full sine wave, labelled exactly as asked: the two turning points and the two <Katex tex="x" />-intercepts.
      The endpoints are drawn as closed dots at height <Katex tex="-1" />.
    </>,
    more: <>
      The report notes the endpoints needed to be correctly positioned. Both are at <Katex tex="y=-1" />, so the curve
      starts and finishes at the same height, one gridline below the axis.
    </>,
  },
]

export default function MethodsQ4_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (4 marks)</p>
        <p>
          Consider the function <Katex tex="f:[0,2\pi]\to R,\ f(x)=2\sin\!\left(x-\dfrac\pi6\right)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Exact Values"
        marks={1}
        statement={<>Evaluate <Katex tex="f(0)" />.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketching Trig Graphs"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> on the axes below.
            <br />
            Label the coordinates of the turning points and <Katex tex="x" />-intercepts.
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={axesSrc}
                alt="VCAA's blank axes: x from 0 to 2π with gridlines every π/3, y from −3 to 3 with gridlines every 1 — from the original VCAA exam paper"
                className="w-full max-w-[400px]"
              />
            </div>
          </>
        }
        examinerReport={REPORT_B}
      >
        <Background>
          <p>
            A sine graph is fixed by five key points a quarter-period apart: start on the axis, maximum, axis, minimum,
            axis. For <Katex tex="y=2\sin\!\left(x-\tfrac\pi6\right)" /> these are just the key points of{' '}
            <Katex tex="y=2\sin(x)" /> (at <Katex tex="0,\tfrac\pi2,\pi,\tfrac{3\pi}2,2\pi" />) each moved{' '}
            <Katex tex="\tfrac\pi6" /> to the right. The last one, <Katex tex="\tfrac{13\pi}6" />, falls outside the domain, so
            the graph is cut off at <Katex tex="2\pi" />, and the piece it loses on the right is the piece{' '}
            <Katex tex="\left[0,\tfrac\pi6\right]" /> that it gains on the left.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
