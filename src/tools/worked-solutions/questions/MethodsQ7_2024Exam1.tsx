// 2024 Mathematical Methods — Exam 1 Question 7 (9 marks). Three trapezia under x·sin(x),
// then the derivative: its range on an interval, a sign-change argument for a stationary
// point, and a sketch. Question text transcribed from the original paper; the stem figure is
// a crop of VCAA's own artwork and the two answer sketches are ours. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2024e1-q7-graph.png'
import trapSrc from './meth-2024e1-q7a-trapezia.png'
import derivSrc from './meth-2024e1-q7c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [28, 31, 11, 30],
  average: 1.5,
  comment: (
    <>
      Any attempt to calculate this area using integral calculus was not acceptable. Although
      many students knew the trapezium rule, some wrote{' '}
      <Katex tex="\tfrac{\pi}{6}\left(f(0)+f\!\left(\tfrac\pi3\right)+f\!\left(\tfrac{2\pi}{3}\right)+f(\pi)\right)" />
      , with the coefficient 2 missing from the middle two terms. Other errors included
      evaluating <Katex tex="\sin\!\left(\tfrac{2\pi}{3}\right)" /> as{' '}
      <Katex tex="-\tfrac{\sqrt3}{2}" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [16, 84],
  average: 0.9,
  comment: (
    <>
      Most students were able to apply the product rule appropriately. Students should be
      aware of the use of notation when naming their answer.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [80, 20],
  average: 0.2,
  comment: (
    <>
      Some students were careless with notation and omitted the brackets or wrote curved
      parentheses. Some reversed the order of the interval. A common incorrect answer was{' '}
      <Katex tex="[0,1]" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [88, 12],
  average: 0.1,
  comment: (
    <>
      This question required students to "hence, verify", so it was not appropriate to use a
      calculus technique. It was not sufficient to discuss the interval in terms of general
      positive or negative tendencies without referring to specific values. A common error
      was to not recognise that <Katex tex="\tfrac{\sqrt3}{2}-\tfrac\pi3<0" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [45, 16, 24, 15],
  average: 1.1,
  comment: (
    <>
      Many students calculated the coordinates of the endpoints correctly but then positioned
      them incorrectly; some failed to label them, while others incorrectly had the endpoints
      on the <Katex tex="x" />-axis. The gradient of <Katex tex="f" /> is zero at
      approximately <Katex tex="x=\pm2" /> and at <Katex tex="x=0" />, so the graph of{' '}
      <Katex tex="f'" /> needs <Katex tex="x" />-intercepts there.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="h = \frac\pi3 \implies \text{three strips across } [0,\pi] \text{ at } 0,\ \tfrac\pi3,\ \tfrac{2\pi}{3},\ \pi" />,
    reason: 'Step size π/3 over an interval of width π gives exactly three trapezia and four ordinates.',
  },
  {
    working: <Katex display tex="f(0) = 0\cdot\sin(0) = 0; \qquad f(\pi) = \pi\sin(\pi) = 0" />,
    reason: 'Both end ordinates vanish.',
  },
  {
    working: <Katex display tex="f\!\left(\frac\pi3\right) = \frac\pi3\cdot\frac{\sqrt3}{2} = \frac{\pi\sqrt3}{6}" />,
    reason: <><Katex tex="\sin\!\left(\tfrac\pi3\right)=\tfrac{\sqrt3}{2}" />, and the <Katex tex="x" /> out the front must be multiplied in.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{2\pi}{3}\right) = \frac{2\pi}{3}\cdot\frac{\sqrt3}{2} = \frac{\pi\sqrt3}{3}" />,
    reason: <><Katex tex="\sin\!\left(\tfrac{2\pi}{3}\right)=+\tfrac{\sqrt3}{2}" /> — second quadrant, so positive. The report names the negative version as a common slip.</>,
  },
  {
    working: <Katex display tex="A \approx \frac h2\Bigl(f(0)+2f\!\left(\tfrac\pi3\right)+2f\!\left(\tfrac{2\pi}{3}\right)+f(\pi)\Bigr)" />,
    reason: 'The trapezium rule: the two interior ordinates are each shared by two trapezia, hence the coefficient 2.',
  },
  {
    working: <Katex display tex="= \frac{\pi}{6}\left(0+\frac{\pi\sqrt3}{3}+\frac{2\pi\sqrt3}{3}+0\right) = \frac{\pi}{6}\cdot\pi\sqrt3" />,
    reason: <><Katex tex="2\times\tfrac{\pi\sqrt3}{6}=\tfrac{\pi\sqrt3}{3}" /> and <Katex tex="2\times\tfrac{\pi\sqrt3}{3}=\tfrac{2\pi\sqrt3}{3}" />; the two add to <Katex tex="\pi\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{\sqrt3\,\pi^2}{6}}" />,
    reason: <>About <Katex tex="2.849" />. The exact integral is <Katex tex="\pi\approx3.142" />, so the trapezia underestimate — as they must for a curve that is concave down across most of the interval.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x\sin(x)" />,
    reason: 'A product.',
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \sin(x)+x\cos(x)}" />,
    reason: <>Product rule. Name it <Katex tex="f'(x)" />, as the question does.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f'\!\left(\frac\pi2\right) = \sin\!\left(\frac\pi2\right)+\frac\pi2\cos\!\left(\frac\pi2\right) = 1+0 = 1" />,
    reason: <><Katex tex="\cos\!\left(\tfrac\pi2\right)=0" /> kills the second term.</>,
  },
  {
    working: <Katex display tex="f'\!\left(\frac{2\pi}{3}\right) = \frac{\sqrt3}{2}+\frac{2\pi}{3}\left(-\frac12\right) = \frac{\sqrt3}{2}-\frac\pi3" />,
    reason: <><Katex tex="\cos\!\left(\tfrac{2\pi}{3}\right)=-\tfrac12" />. Numerically <Katex tex="0.866-1.047=-0.181" />, so this is <em>negative</em>.</>,
  },
  {
    working: <Katex display tex="f''(x) = 2\cos(x)-x\sin(x) < 0 \ \text{ on } \left[\tfrac\pi2,\tfrac{2\pi}{3}\right]" />,
    reason: <>There <Katex tex="\cos x\le0" /> and <Katex tex="\sin x>0" />, so <Katex tex="f'" /> is strictly decreasing and the endpoints give the extremes.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[\frac{\sqrt3}{2}-\frac\pi3,\ 1\right]}" />,
    reason: <>A <em>range</em>, so square brackets and smaller value first. The report's common wrong answer <Katex tex="[0,1]" /> misses that <Katex tex="f'" /> goes below zero.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="f'\!\left(\frac\pi2\right) = 1 > 0" />,
    reason: 'One specific value, quoted from part b.ii. — not a general remark about tendencies.',
  },
  {
    working: <Katex display tex="f'\!\left(\frac{2\pi}{3}\right) = \frac{\sqrt3}{2}-\frac\pi3 \approx -0.18 < 0" />,
    reason: <>The other. Establishing this is negative is the step the report says most students missed: <Katex tex="\tfrac{\sqrt3}{2}\approx0.87" /> while <Katex tex="\tfrac\pi3\approx1.05" />.</>,
  },
  {
    working: <Katex display tex="f' \text{ is continuous on } \left[\tfrac\pi2,\tfrac{2\pi}{3}\right] \text{ and changes sign}" />,
    reason: 'Continuity plus a sign change forces a zero somewhere in between.',
  },
  {
    working: <Katex display tex="\boxed{\therefore f'(c) = 0 \text{ for some } c\in\left(\tfrac\pi2,\tfrac{2\pi}{3}\right), \text{ so } f \text{ has a stationary point there.}}" />,
    reason: <>"Hence, verify" means use part b.ii., not solve <Katex tex="f'(x)=0" />. (For interest, <Katex tex="c\approx2.029" />.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(-\pi) = \sin(-\pi)+(-\pi)\cos(-\pi) = 0+\pi = \pi" />,
    reason: <>The left endpoint is <Katex tex="(-\pi,\pi)" /> — high above the axis, not on it.</>,
  },
  {
    working: <Katex display tex="f'(\pi) = \sin(\pi)+\pi\cos(\pi) = 0-\pi = -\pi" />,
    reason: <>And the right endpoint is <Katex tex="(\pi,-\pi)" />. Both must be plotted and labelled.</>,
  },
  {
    working: <Katex display tex="f' = 0 \text{ where } f \text{ is stationary: } x = 0 \text{ and } x \approx \pm2" />,
    reason: <>Read off the printed graph of <Katex tex="f" />: it turns near <Katex tex="x=\pm2" /> and has a minimum at the origin. These become the <Katex tex="x" />-intercepts of <Katex tex="f'" />.</>,
  },
  {
    working: <Katex display tex="f'(-x) = \sin(-x)+(-x)\cos(-x) = -f'(x) \implies \text{odd}" />,
    reason: <>The derivative of an even function is odd, so the sketch has rotational symmetry about the origin — a free accuracy check.</>,
  },
  {
    working: <Katex display tex="\text{Local min } (-1.1,-1.4), \quad \text{local max } (1.1,1.4) \ \text{(given)}" />,
    reason: 'Position these correctly relative to the intercepts; the report says many students had the right numbers in the wrong places.',
  },
]

export default function MethodsQ7_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (9 marks)</p>
        <p>
          Part of the graph of <Katex tex="f:[-\pi,\pi]\to\mathbb{R}" />,{' '}
          <Katex tex="f(x)=x\sin(x)" />, is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="The curve y = x sin(x) on [−π, π]: a symmetric pair of humps rising to about 1.8 near x = ±2 and touching zero at the origin and at both ends — from the original 2024 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            <Katex tex="f(x)=x\sin(x)" /> is an <em>even</em> function — two odd factors
            multiplied — which is why the printed graph is symmetric about the{' '}
            <Katex tex="y" />-axis. Its derivative is therefore odd, and that single fact
            settles most of the shape in part c.
          </p>
          <p>
            Part b.iii. says "hence, verify". That rules out solving{' '}
            <Katex tex="f'(x)=0" />: the marks are for quoting the two <em>specific</em>{' '}
            values from part b.ii., noting they have opposite signs, and invoking continuity.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            Use the trapezium rule with a step size of <Katex tex="\dfrac\pi3" /> to
            determine an approximation of the total area between the graph of{' '}
            <Katex tex="y=f(x)" /> and the <Katex tex="x" />-axis over the interval{' '}
            <Katex tex="x\in[0,\pi]" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={trapSrc}
            alt="The curve y = x sin(x) on [0, π] with three shaded trapezia beneath it, their tops joining the ordinates at 0, π/3, 2π/3 and π"
            className="w-full max-w-[460px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="b.i"
        marks={1}
        statement={<>Find <Katex tex="f'(x)" />.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={1}
        statement={
          <>
            Determine the range of <Katex tex="f'(x)" /> over the interval{' '}
            <Katex tex="\left[\dfrac\pi2,\dfrac{2\pi}{3}\right]" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        marks={1}
        statement={
          <>
            Hence, verify that <Katex tex="f(x)" /> has a stationary point for{' '}
            <Katex tex="x\in\left[\dfrac\pi2,\dfrac{2\pi}{3}\right]" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            On the set of axes provided, sketch the graph of <Katex tex="y=f'(x)" /> on the
            domain <Katex tex="[-\pi,\pi]" />, labelling the endpoints with their
            coordinates. You may use the fact that the graph of <Katex tex="y=f'(x)" /> has a
            local minimum at approximately <Katex tex="(-1.1,-1.4)" /> and a local maximum at
            approximately <Katex tex="(1.1,1.4)" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={derivSrc}
            alt="An odd S-shaped curve falling from the endpoint (−π, π) through an x-intercept near −2 to a local minimum at (−1.1, −1.4), rising through the origin to a local maximum at (1.1, 1.4), then falling through an intercept near 2 to the endpoint (π, −π)"
            className="w-full max-w-[440px]"
          />
        </div>
      </PartCard>
    </div>
  )
}
