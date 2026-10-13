// 2014 Mathematical Methods (CAS) — Exam 1, Question 5 (7 marks). Stationary points of a
// restricted cubic, its graph, and the area between it and a horizontal line. Question text
// transcribed from the original paper; VCAA supplied blank axes for the sketch, so both
// figures are this site's own matplotlib work. Answers checked with sympy and against the
// VCAA examination report. Solution is original.
// Interactive (Detailed only): part c (21% full marks) — sweep a strip from x = −1 to 2 to see
// the line stays on top, so one integral suffices; toggle shows rectangle − area under curve.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2014e1-q5b-cubic.png'
import areaSrc from './meth-2014e1-q5c-area.png'

const OneIntegral = lazyWidget(() => import('../interactives/meth-2014e1-q5c-one-integral'))

const EXAM_A: SAExaminerStats = {
  marks: [14, 20, 66],
  average: 1.5,
  comment: (
    <>
      Students must be vigilant in ensuring they answer the specific question. In this
      question, <em>coordinates</em> were required and not simply <Katex tex="x" /> values.
      Some students omitted the turning point <Katex tex="(0,0)" /> and others incorrectly
      found <Katex tex="x" />-intercepts.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [21, 15, 63],
  average: 1.4,
  comment: (
    <>
      The correct response to this question required a smooth curve (not V shapes at turning
      points) and endpoints clearly labelled with their coordinates.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [25, 27, 27, 21],
  average: 1.5,
  comment: (
    <>
      Most students knew to seek a difference of two areas and were adept with basic
      integration; however, quite often arithmetic errors in evaluations or the incorrect use
      of negative signs marred their progress towards acquiring full marks. Some students
      unnecessarily ‘overworked’ the problem by creating three or four integrations,
      increasing the likelihood of an error. A few students took a more direct route that
      involved symmetry of the curve.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 3x^2-x^3 \implies f'(x) = 6x-3x^2" />,
    reason: <>Stationary points are where the derivative is zero.</>,
  },
  {
    working: <Katex display tex="3x(2-x) = 0 \implies x = 0 \text{ or } x = 2" />,
    reason: <>Factorise rather than use the quadratic formula. Both values lie in the domain <Katex tex="[-1,3]" />.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(2) = 12-8 = 4" />,
    reason: <>Substitute back to get the <Katex tex="y" />-values.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,0) \text{ and } (2,4)}" />,
    reason: <>As <em>coordinates</em> — the question asks for the stationary points, and the report stresses that bare <Katex tex="x" /> values do not answer it.</>,
    more: (
      <>
        The report also notes two other slips. Some students dropped <Katex tex="(0,0)" />: it is
        still a stationary point even though it is also an <Katex tex="x" />-intercept. Others
        solved <Katex tex="f(x)=0" /> instead of <Katex tex="f'(x)=0" />, which gives the{' '}
        <Katex tex="x" />-intercepts <Katex tex="x=0" /> and <Katex tex="x=3" />, not the stationary
        points.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f(-1) &= 3(1)-(-1) = 4 \\ f(3) &= 27-27 = 0 \end{aligned}" />,
    reason: <>The endpoints, which the question asks to be labelled. Careful with <Katex tex="-x^3" /> at <Katex tex="x=-1" />: it is <Katex tex="+1" />.</>,
  },
  {
    working: <Katex display tex="(0,0) \text{ local minimum}, \qquad (2,4) \text{ local maximum}" />,
    reason: <>From part a. Between them <Katex tex="f'(x)=3x(2-x)>0" />, so the curve rises; outside, it falls.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="The cubic y = 3x² − x³ drawn on [−1, 3]: starting at (−1, 4), falling to a local minimum at the origin, rising to a local maximum at (2, 4), then falling to (3, 0)"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>Rounded (smooth) at both turning points, not V shapes, with the endpoints <Katex tex="(-1,4)" /> and <Katex tex="(3,0)" /> labelled.</>,
    more: (
      <>
        These are the two details the report says a correct graph needed. A turning point is
        where the gradient is zero, so the curve flattens out there rather than coming to a
        point. Note the endpoints happen
        to share their heights with the turning points, <Katex tex="4" /> and <Katex tex="0" />,
        so <Katex tex="(-1,4)" /> and <Katex tex="(2,4)" /> sit level — which part c uses.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="3x^2-x^3 = 4 \implies x^3-3x^2+4 = 0" />,
    reason: <>Find where the curve meets the line first — that fixes the terminals.</>,
  },
  {
    working: <Katex display tex="(x+1)(x-2)^2 = 0 \implies x = -1 \text{ or } x = 2" />,
    reason: <>Part b gave <Katex tex="f(-1)=4" />, so <Katex tex="x=-1" /> is a root; the maximum <Katex tex="(2,4)" /> touches <Katex tex="y=4" />, so <Katex tex="x=2" /> is a double root.</>,
    more: (
      <>
        A line touching a turning point (rather than crossing the curve) always gives a repeated
        factor. Check by expanding:{' '}
        <Katex tex="(x+1)(x^2-4x+4) = x^3-3x^2+4" />. Without part b you would find{' '}
        <Katex tex="x=-1" /> with the factor theorem and then divide by <Katex tex="x+1" />.
      </>
    ),
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img loading="lazy" decoding="async"
          src={areaSrc}
          alt="The same cubic with the horizontal line y = 4 drawn across it, and the region between the line and the curve from x = −1 to x = 2 shaded"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>On <Katex tex="[-1,2]" /> the curve never rises above its maximum <Katex tex="4" />, so the line is on top throughout — one integral does it.</>,
    more: (
      <>
        The report says some students &lsquo;overworked&rsquo; this with three or four integrals.
        There is no need to split at <Katex tex="x=0" />: the curve touching the{' '}
        <Katex tex="x" />-axis there doesn&apos;t matter, because the area is measured from the
        curve up to <Katex tex="y=4" />, not down to the axis. Nothing to the right of{' '}
        <Katex tex="x=2" /> is enclosed either: the graph ends at <Katex tex="(3,0)" /> without
        meeting the line again.
      </>
    ),
  },
  {
    working: <Katex display tex="A = \int_{-1}^{2}\Bigl(4-\left(3x^2-x^3\right)\Bigr)dx" />,
    reason: <>Upper function minus lower.</>,
  },
  {
    working: <Katex display tex="= \left[4x-x^3+\tfrac{x^4}4\right]_{-1}^{2}" />,
    reason: <>Antidifferentiating term by term.</>,
  },
  {
    working: <Katex display tex="= (8-8+4)-\left(-4+1+\tfrac14\right) = 4+\tfrac{11}4" />,
    reason: <>The lower terminal is where the sign errors happen: <Katex tex="-(-1)^3=+1" />, so the bracket is <Katex tex="-\tfrac{11}4" />, and subtracting it adds <Katex tex="\tfrac{11}4" />.</>,
    more: (
      <>
        In full: <Katex tex="4(-1)-(-1)^3+\tfrac{(-1)^4}4 =-4+1+\tfrac14 = -\tfrac{11}4" />, and{' '}
        <Katex tex="-\left(-\tfrac{11}4\right) = +\tfrac{11}4" />. A quick
        check by a second route: the region is the <Katex tex="3\times4" /> rectangle under{' '}
        <Katex tex="y=4" /> from <Katex tex="-1" /> to <Katex tex="2" />, minus the area under the
        curve, <Katex tex="\int_{-1}^{2}(3x^2-x^3)\,dx = 4-\left(-1-\tfrac14\right) = \tfrac{21}4" />,
        so <Katex tex="12-\tfrac{21}4=\tfrac{27}4" />.
        <br />
        <br />
        The report also mentions a route using symmetry. This cubic is point-symmetric about its
        inflection point <Katex tex="(1,2)" />, since <Katex tex="f(1+t)+f(1-t)=4" />. A half-turn
        about <Katex tex="(1,2)" /> swaps the piece between the curve and <Katex tex="y=4" /> on{' '}
        <Katex tex="[0,2]" /> with the piece under the curve on <Katex tex="[0,2]" />, so they are
        equal and together fill the <Katex tex="2\times4" /> rectangle: each is <Katex tex="4" />.
        Adding the piece on <Katex tex="[-1,0]" />,{' '}
        <Katex tex="\int_{-1}^{0}\bigl(4-f(x)\bigr)dx=\tfrac{11}4" />, gives{' '}
        <Katex tex="4+\tfrac{11}4=\tfrac{27}4" /> again.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{A = \tfrac{27}4 = 6.75}" />,
    reason: <>Exact value, as Exam 1 expects; the decimal is optional.</>,
    more: (
      <>
        Sanity check: the region sits inside the <Katex tex="3\times4" /> rectangle above, and
        covers a bit over half of it.
      </>
    ),
  },
]

export default function MethodsQ5_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (7 marks)</p>
        <p>
          Consider the function <Katex tex="f:[-1,3]\to R" />,{' '}
          <Katex tex="f(x)=3x^2-x^3" />.
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

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            On the axes below, sketch the graph of <Katex tex="f" />. Label any end points
            with their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Between Curves"
        marks={3}
        statement={
          <>
            Find the area enclosed by the graph of the function and the horizontal line given
            by <Katex tex="y=4" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="The line stays on top from −1 to 2, so one integral covers it">
          <OneIntegral />
        </Explore>
      </PartCard>
    </div>
  )
}
