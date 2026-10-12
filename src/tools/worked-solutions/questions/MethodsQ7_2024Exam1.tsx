// 2024 Mathematical Methods — Exam 1 Question 7 (9 marks). Three trapezia under x·sin(x),
// then the derivative: its range on an interval, a sign-change argument for a stationary
// point, and a sketch. Question text transcribed from the original paper; both figures are
// crops of VCAA's own artwork (300 dpi), and the part a. trapezia and the part c. answer are
// SVG overlays on them (never redrawings). Calibration measured from each crop's gridlines —
// part a.: origin (173.5, 757.5), 266.74 px per unit across, 181 up; part c.: origin
// (762.5, 638.5), 233.0 across, 151.1 up — and checked with PIL composites: the calibrated
// f(x) = x sin(x) lies on VCAA's printed curve in both. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import graphSrc from './meth-2024e1-q7-graph.png'
import axesSrc from './meth-2024e1-q7c-axes.png'

const ORANGE = '#f97316'
const LABEL = { fontSize: 44, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const
const f = (x: number) => x * Math.sin(x)
const fp = (x: number) => Math.sin(x) + x * Math.cos(x)

// Part a.: the three trapezia drawn on VCAA's own graph of y = f(x).
const ax = (x: number) => 173.5 + x * 266.74
const ay = (y: number) => 757.5 - y * 181
const TRAP_X = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI]
function TrapeziaOverlay() {
  const pts = TRAP_X.map((x) => `${ax(x)},${ay(f(x))}`).join(' ')
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img loading="lazy" decoding="async" src={graphSrc} alt="VCAA's graph of y = x sin(x) with the three trapezia drawn over it: their tops are chords joining the curve at 0, π/3, 2π/3 and π, the first chord just above the curve, the other two just under it" className="w-full block" />
        <svg viewBox="0 0 1164 931" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <polygon points={`${ax(0)},${ay(0)} ${pts} ${ax(Math.PI)},${ay(0)}`} fill={ORANGE} fillOpacity={0.22} stroke={ORANGE} strokeWidth={5} />
          {TRAP_X.slice(1, 3).map((x) => (
            <line key={x} x1={ax(x)} y1={ay(0)} x2={ax(x)} y2={ay(f(x))} stroke={ORANGE} strokeWidth={5} />
          ))}
        </svg>
      </div>
    </div>
  )
}

// Part c.: y = f'(x) drawn on VCAA's own axes, which already carry y = f(x).
const cx = (x: number) => 762.5 + x * 233.0
const cy = (y: number) => 638.5 - y * 151.1
function DerivativeOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[460px]">
        <img loading="lazy" decoding="async" src={axesSrc} alt="VCAA's axes with y = f(x), and the answer y = f′(x) drawn over them: an odd curve falling from the endpoint (−π, π) through (−2, 0) to a minimum near (−1.1, −1.4), rising through the origin to a maximum near (1.1, 1.4), then falling through (2, 0) to the endpoint (π, −π)" className="w-full block" />
        <svg viewBox="0 0 1582 1176" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={functionToPath(fp, -Math.PI, Math.PI, cx, cy, 600)} fill="none" stroke={ORANGE} strokeWidth={6} />
          <circle cx={cx(-Math.PI)} cy={cy(Math.PI)} r={12} fill={ORANGE} />
          <circle cx={cx(Math.PI)} cy={cy(-Math.PI)} r={12} fill={ORANGE} />
          <text x={cx(-Math.PI) + 26} y={cy(Math.PI) + 14} {...LABEL}>(−π, π)</text>
          <text x={cx(Math.PI) - 26} y={cy(-Math.PI) + 14} textAnchor="end" {...LABEL}>(π, −π)</text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [28, 31, 11, 30],
  average: 1.5,
  comment: (
    <>
      This question required that students use three trapeziums to approximate the area between
      the curve and the <Katex tex="x" />-axis over the interval <Katex tex="[0,\pi]" />, as per
      the trapezium rule. Therefore, any attempt to calculate this area using integral calculus
      was not acceptable. Although many students knew the trapezium rule, some students did not
      apply it correctly, often writing{' '}
      <Katex tex="\tfrac{\pi}{6}\left(f(0)+f\!\left(\tfrac\pi3\right)+f\!\left(\tfrac{2\pi}{3}\right)+f(\pi)\right)" />,
      with the coefficient '2' missing from the middle two terms. Some students gave the formula
      as stated on the formula sheet with values relevant to the question, however, many did
      not proceed to calculate <Katex tex="f\!\left(\tfrac\pi3\right)" /> and{' '}
      <Katex tex="f\!\left(\tfrac{2\pi}{3}\right)" /> correctly. It is expected that students
      will have a way of remembering the exact values of <Katex tex="\sin\theta" />,{' '}
      <Katex tex="\cos\theta" /> and <Katex tex="\tan\theta" /> for values of{' '}
      <Katex tex="\theta" /> between 0 and <Katex tex="\tfrac\pi2" /> inclusive,{' '}
      <Katex tex="\theta\in\left\{0,\tfrac\pi6,\tfrac\pi4,\tfrac\pi3,\tfrac\pi2\right\}" />, as
      specified in the key knowledge of the study design. While some students were able to
      identify the exact value of <Katex tex="\sin\!\left(\tfrac\pi3\right)" /> and{' '}
      <Katex tex="\sin\!\left(\tfrac{2\pi}{3}\right)" />, many did not multiply these by{' '}
      <Katex tex="\tfrac\pi3" /> and <Katex tex="\tfrac{2\pi}{3}" />. The arithmetic
      manipulation of fractions and surds presented a challenge for some students, with some
      leaving their answer as the sum of two or three separate area parts, instead of combining
      them into a single term. Other errors included incorrectly evaluating{' '}
      <Katex tex="\sin\!\left(\tfrac{2\pi}{3}\right)" /> as <Katex tex="-\tfrac{\sqrt3}{2}" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [16, 84],
  average: 0.9,
  comment: (
    <>
      Most students were able to apply the product rule appropriately. Students should be aware
      of the use of notation when naming their answer and use brackets to make their response
      clear.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [80, 20],
  average: 0.2,
  comment: (
    <>
      Some students were able to substitute values effectively here to attain the correct
      endpoints of the interval. Some students were careless with notation and omitted the
      brackets or wrote curved parentheses. Some students, incorrectly, reversed the order of
      the interval. Students are encouraged to use the graph as a guide. A common incorrect
      answer was <Katex tex="[0,1]" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [88, 12],
  average: 0.1,
  comment: (
    <>
      There were many ways students could use the values they found in Question 7b.ii to verify
      that <Katex tex="f(x)" /> has a stationary point in the interval{' '}
      <Katex tex="\left[\tfrac\pi2,\tfrac{2\pi}{3}\right]" />. This question required students
      to 'hence, verify [...]' so it was not appropriate to attempt to use a calculus
      technique. Students are reminded that the word 'verify' means to demonstrate or check the
      truth of a statement, so it was not sufficient to merely discuss the interval in terms of
      general positive or negative tendencies without referring to specific values and showing
      the 'check' had been completed. Of the students who attained the correct interval in
      Question 7b.ii, many were able to provide a correct explanation. A common error was to
      not recognise <Katex tex="\tfrac{\sqrt3}{2}-\tfrac\pi3<0" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [45, 16, 24, 15],
  average: 1.1,
  comment: (
    <>
      The graph of the derivative function needed to extend across the domain as specified.
      Many students calculated the coordinates of the endpoints correctly but then positioned
      them incorrectly. Some students failed to label the coordinates of the endpoints while
      others incorrectly had the endpoints on the <Katex tex="x" />-axis. The gradient of the
      graph of <Katex tex="f(x)" /> is zero at approximately <Katex tex="x=\pm2" /> and at{' '}
      <Katex tex="x=0" />, and so the graph of <Katex tex="f'(x)" /> needs to have{' '}
      <Katex tex="x" />-intercepts at approximately <Katex tex="(-2,0)" /> and{' '}
      <Katex tex="(+2,0)" /> and at <Katex tex="(0,0)" />. The approximate coordinates of the
      local maxima and minima were given in the question and these needed to be positioned and
      represented correctly on the graph.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} h &= \frac\pi3 \implies \text{three strips across } [0,\pi] \\ x &= 0,\ \tfrac\pi3,\ \tfrac{2\pi}{3},\ \pi \end{aligned}" />,
    reason: <>Step size π/3 over an interval of width π gives exactly three trapezia and four ordinates.</>,
  },
  {
    working: <Katex display tex="f(0) = 0\cdot\sin(0) = 0; \qquad f(\pi) = \pi\sin(\pi) = 0" />,
    reason: <>Both end ordinates are zero, since <Katex tex="\sin(0)=\sin(\pi)=0" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac\pi3\right) = \frac\pi3\cdot\frac{\sqrt3}{2} = \frac{\pi\sqrt3}{6}" />,
    reason: <><Katex tex="\sin\!\left(\tfrac\pi3\right)=\tfrac{\sqrt3}{2}" />, and the <Katex tex="x" /> out the front must be multiplied in.</>,
    more: <>The report notes that many students who found the exact sine values did not multiply them by <Katex tex="\tfrac\pi3" /> and <Katex tex="\tfrac{2\pi}{3}" />. The function is <Katex tex="x\sin(x)" />, not <Katex tex="\sin(x)" />: every ordinate is the <Katex tex="x" />-value times its sine.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{2\pi}{3}\right) = \frac{2\pi}{3}\cdot\frac{\sqrt3}{2} = \frac{\pi\sqrt3}{3}" />,
    reason: <><Katex tex="\sin\!\left(\tfrac{2\pi}{3}\right)=\sin\!\left(\pi-\tfrac\pi3\right)=+\tfrac{\sqrt3}{2}" /> — second quadrant, where sine is positive.</>,
    more: <>The report notes some students evaluated it as <Katex tex="-\tfrac{\sqrt3}{2}" />. A quick check: the printed graph is above the <Katex tex="x" />-axis for every <Katex tex="x" /> in <Katex tex="(0,\pi)" />, so no ordinate here can be negative.</>,
  },
  {
    working: <Katex display tex="A \approx \frac h2\Bigl(f(0)+2f\!\left(\tfrac\pi3\right)+2f\!\left(\tfrac{2\pi}{3}\right)+f(\pi)\Bigr)" />,
    reason: <>The trapezium rule (on the formula sheet): each interior ordinate is a side of two trapezia, so it is counted twice.</>,
    more: <>Each trapezium has area <Katex tex="\tfrac h2(\text{left height}+\text{right height})" />. Adding the three, <Katex tex="f\!\left(\tfrac\pi3\right)" /> and <Katex tex="f\!\left(\tfrac{2\pi}{3}\right)" /> each appear twice and the end ordinates once. The report notes some students left out the coefficient 2 on the middle two terms, and that using integral calculus instead was not acceptable: the question asks for the trapezium-rule approximation.</>,
  },
  {
    working: <TrapeziaOverlay />,
    reason: <>The three trapezia on the printed graph. Their slanted tops are chords joining the four points on the curve.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{6}\left(0+\frac{\pi\sqrt3}{3}+\frac{2\pi\sqrt3}{3}+0\right) = \frac{\pi}{6}\cdot\pi\sqrt3" />,
    reason: <><Katex tex="\tfrac h2=\tfrac\pi6" />. Then <Katex tex="2\times\tfrac{\pi\sqrt3}{6}=\tfrac{\pi\sqrt3}{3}" /> and <Katex tex="2\times\tfrac{\pi\sqrt3}{3}=\tfrac{2\pi\sqrt3}{3}" />, which add to <Katex tex="\tfrac{3\pi\sqrt3}{3}=\pi\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{\sqrt3\,\pi^2}{6}}" />,
    reason: <>Multiply out and give a single exact term; this is about <Katex tex="2.85" />.</>,
    more: <>The report notes some students left the answer as the sum of two or three separate areas instead of combining them into a single term. As a check, the exact area is <Katex tex="\int_0^\pi x\sin(x)\,dx=\pi\approx3.14" />, so the approximation is a little low. The first chord (from <Katex tex="0" /> to <Katex tex="\tfrac\pi3" />) lies slightly above the curve, where the graph is concave up, but the other two lie below it, where the graph is concave down, and those two strips dominate.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x\sin(x)" />,
    reason: <>A product of <Katex tex="x" /> and <Katex tex="\sin(x)" />, so use the product rule.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \sin(x)+x\cos(x)}" />,
    reason: <><Katex tex="1\cdot\sin(x)+x\cdot\cos(x)" />. Write the answer as <Katex tex="f'(x)=\dots" />, with brackets, as the report asks.</>,
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
    reason: <>Differentiate <Katex tex="f'" /> again (product rule on <Katex tex="x\cos x" />). On this interval <Katex tex="\cos x\le0" /> and <Katex tex="x\sin x>0" />, so <Katex tex="f''<0" />: <Katex tex="f'" /> is strictly decreasing, so its range runs between its endpoint values.</>,
    more: <>Why check this at all? If <Katex tex="f'" /> turned around inside the interval, its largest or smallest value could be at that turning point rather than at an endpoint. Here <Katex tex="f''(x)" /> is the derivative of <Katex tex="\sin(x)+x\cos(x)" />, which is <Katex tex="\cos(x)+\cos(x)-x\sin(x)" /> by the product rule again. The report also encourages using the printed graph as a guide: <Katex tex="f" /> is still rising at <Katex tex="x=\tfrac\pi2" /> and has started falling by <Katex tex="x=\tfrac{2\pi}{3}" /> (its peak is near <Katex tex="x=2" />), so the gradient goes from positive to negative.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[\frac{\sqrt3}{2}-\frac\pi3,\ 1\right]}" />,
    reason: <>Square brackets, since both endpoint values are attained, and the smaller (negative) value first.</>,
    more: <>The report notes some students omitted the brackets, used round brackets or reversed the order, and that <Katex tex="[0,1]" /> was a common incorrect answer. That misses that <Katex tex="f'\!\left(\tfrac{2\pi}{3}\right)" /> is negative (second row).</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="f'\!\left(\frac\pi2\right) = 1 > 0" />,
    reason: <>"Hence": quote the endpoint values found in part b.ii. The first is positive.</>,
  },
  {
    working: <Katex display tex="f'\!\left(\frac{2\pi}{3}\right) = \frac{\sqrt3}{2}-\frac\pi3 \approx -0.18 < 0" />,
    reason: <>The second is negative, because <Katex tex="\tfrac{\sqrt3}{2}\approx0.87" /> is less than <Katex tex="\tfrac\pi3\approx1.05" />.</>,
    more: <>The report notes a common error was not recognising that <Katex tex="\tfrac{\sqrt3}{2}-\tfrac\pi3<0" />. Without that, there is no sign change and nothing to verify.</>,
  },
  {
    working: <Katex display tex="f' \text{ is continuous on } \left[\tfrac\pi2,\tfrac{2\pi}{3}\right] \text{ and changes sign}" />,
    reason: <><Katex tex="f'" /> is built from <Katex tex="\sin" /> and <Katex tex="\cos" />, so its graph has no breaks. Going from positive to negative, it must cross zero in between.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &\therefore f'(c) = 0 \text{ for some } c\in\left(\tfrac\pi2,\tfrac{2\pi}{3}\right), \\ &\text{so } f \text{ has a stationary point there.} \end{aligned}}" />,
    reason: <>A stationary point is where <Katex tex="f'(x)=0" />. As required.</>,
    more: <>"Hence, verify" means use the values from part b.ii; the report says it was not appropriate to attempt a calculus technique (for example, solving <Katex tex="f'(x)=0" />). "Verify" means show the check with specific values, so a general remark that <Katex tex="f'" /> is positive then negative is not enough. (For interest, the stationary point is at <Katex tex="c\approx2.029" />.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(-\pi) = \sin(-\pi)+(-\pi)\cos(-\pi) = 0+\pi = \pi" />,
    reason: <>The domain is <Katex tex="[-\pi,\pi]" />, so the sketch has endpoints. The left one is <Katex tex="(-\pi,\pi)" />, high above the axis.</>,
  },
  {
    working: <Katex display tex="f'(\pi) = \sin(\pi)+\pi\cos(\pi) = 0-\pi = -\pi" />,
    reason: <>The right endpoint is <Katex tex="(\pi,-\pi)" />. Both must be plotted and labelled with their coordinates.</>,
    more: <>The report notes many students calculated these correctly but then positioned them incorrectly, some did not label them, and some put the endpoints on the <Katex tex="x" />-axis (copying <Katex tex="f" />'s endpoints <Katex tex="(\pm\pi,0)" />). With <Katex tex="\pi\approx3.14" />, they sit just beyond the printed scale, at heights of about <Katex tex="\pm3.14" />.</>,
  },
  {
    working: <Katex display tex="f' = 0 \text{ where } f \text{ is stationary: } x = 0 \text{ and } x \approx \pm2" />,
    reason: <>Read off the printed graph of <Katex tex="f" />: it peaks near <Katex tex="x=\pm2" /> and has a minimum at the origin. Zero gradient there gives <Katex tex="f'" />'s <Katex tex="x" />-intercepts.</>,
    more: <>The sign of <Katex tex="f'" /> follows the slope of <Katex tex="f" />: <Katex tex="f" /> rises on <Katex tex="(-\pi,-2)" /> and <Katex tex="(0,2)" />, so <Katex tex="f'>0" /> there; it falls on <Katex tex="(-2,0)" /> and <Katex tex="(2,\pi)" />, so <Katex tex="f'<0" /> there. That matches the endpoint values: positive at <Katex tex="x=-\pi" />, negative at <Katex tex="x=\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f'(-x) &= \sin(-x)+(-x)\cos(-x) \\ &= -\sin(x)-x\cos(x) = -f'(x) \end{aligned}" />,
    reason: <>Using <Katex tex="\sin(-x)=-\sin(x)" /> and <Katex tex="\cos(-x)=\cos(x)" />: <Katex tex="f'" /> is odd, so the sketch has rotational symmetry about the origin — a free accuracy check.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{Local min } (-1.1,-1.4) \\ &\text{local max } (1.1,1.4) \quad \text{(given)} \end{aligned}" />,
    reason: <>Plot these as smooth turning points: the minimum between <Katex tex="x=-2" /> and <Katex tex="0" />, the maximum between <Katex tex="0" /> and <Katex tex="2" />.</>,
  },
  {
    working: <DerivativeOverlay />,
    reason: <>Join the points smoothly across the whole domain <Katex tex="[-\pi,\pi]" />, and label both endpoints.</>,
    more: <>Reading left to right: start at <Katex tex="(-\pi,\pi)" />, fall through <Katex tex="(-2,0)" /> to the minimum, rise through the origin to the maximum, then fall through <Katex tex="(2,0)" /> to <Katex tex="(\pi,-\pi)" />. Rotating the sketch half a turn about the origin should give the same curve, since <Katex tex="f'" /> is odd. The report notes the graph needed to extend across the domain as specified.</>,
  },
]

export default function MethodsQ7_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (9 marks)</p>
        <p>
          Part of the graph of <Katex tex="f:[-\pi,\pi]\to R" />,{' '}
          <Katex tex="f(x)=x\sin(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The curve y = x sin(x) on [−π, π]: a symmetric pair of humps rising to about 1.8 near x = ±2 and touching zero at the origin and at both ends — from the original 2024 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              <Katex tex="f(x)=x\sin(x)" /> is an <em>even</em> function — two odd factors
              multiplied — which is why the printed graph is symmetric about the{' '}
              <Katex tex="y" />-axis. Its derivative is therefore odd, and that single fact
              settles most of the shape in part c.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Trapezium Rule"
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
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Product Rule"
        marks={1}
        statement={<>Find <Katex tex="f'(x)" />.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Range"
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
        topic="Stationary Point"
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
        topic="Sketch Derivative"
        marks={3}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              On the set of axes below, sketch the graph of <Katex tex="y=f'(x)" /> on the
              domain <Katex tex="[-\pi,\pi]" />, labelling the endpoints with their
              coordinates.
              <br />
              You may use the fact that the graph of <Katex tex="y=f'(x)" /> has a local
              minimum at approximately <Katex tex="(-1.1,-1.4)" /> and a local maximum at
              approximately <Katex tex="(1.1,1.4)" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={axesSrc}
                alt="Axes from −3 to 3 in both directions with the graph of y = f(x) = x sin(x) on [−π, π] drawn and its endpoints (−π, 0) and (π, 0) labelled — from the original 2024 VCAA exam paper"
                className="w-full max-w-[420px]"
              />
            </div>
          </div>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
