// 2024 Specialist NHT — Exam 2, Section B Question 3 (10 marks). The NHT report gives a sample
// answer for each part only, with no statistics and no comments. Kinematics on a straight road: a
// motorcycle at a constant 20 m/s and a patrol car that sets off 2 s later with velocity
// v(t) = 12.5 − 12.5 cos(π(t − 2)/6) for 6 s, then holds V m/s: V, the acceleration and its
// maximum, the motorcycle's velocity–time graph, distances as areas, and when and where the car
// draws level. Pure kinematics, no force analysis, so on the current study design. Question text
// transcribed from the original paper; "on the axes on page 18" becomes "on the axes above". The
// velocity–time graph is cropped from page 18 of the original VCAA exam PDF at 300 dpi
// (spec-2024nhte2-q3-graph.png); the part c. answer is an SVG overlay on it, calibrated from the
// crop (origin at (115, 684), t = 8 at x = 388.5, so 34.19 px per second; V = 25 at y = 198.5,
// so 19.42 px per m/s), checked with a PIL composite: v(t) computed from its rule sits on VCAA's
// printed curve. Answers checked with sympy and against the report's sample answers, which agree:
// a. 25; b.i (25π/12) sin(π(t − 2)/6); b.ii 6.5; d. 20t; e. 75; f. 25; g. 500. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import graphSrc from './spec-2024nhte2-q3-graph.png'

// Calibration of VCAA's v–t graph in the crop's own pixels (1080 × 770).
const OX = 115
const OY = 684
const ST = (388.5 - 115) / 8
const SV = (684 - 198.5) / 25
const pt = (t: number) => OX + t * ST
const pv = (v: number) => OY - v * SV
const ORANGE = '#f97316'
const LABEL = { fontSize: 46, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

function MotorcycleAnswer() {
  const y = pv(20)
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[460px]">
        <img loading="lazy" decoding="async" src={graphSrc}
          alt="VCAA's velocity–time graph with the answer drawn over it: a horizontal line at v = 20 starting on the v-axis, labelled 20 there, running right across the whole graph and crossing the patrol car's curve a little before t = 8"
          className="w-full block" />
        <svg viewBox="0 0 1080 770" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1={pt(0)} y1={y} x2={pt(25)} y2={y} stroke={ORANGE} strokeWidth={8} />
          <circle cx={pt(0)} cy={y} r={12} fill={ORANGE} />
          <text x={pt(0) - 22} y={y + 16} textAnchor="end" {...LABEL}>20</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} V &= v(8) \\ &= 12.5-12.5\cos\left(\frac{\pi}{6}\times6\right) \\ &= 12.5-12.5\cos(\pi) \end{aligned}" />,
    reason: <>The car stops accelerating at <Katex tex="t=8" /> and holds the speed it has reached, so <Katex tex="V" /> is the velocity at the end of the accelerating phase.</>,
  },
  {
    working: <Katex display tex="\boxed{V = 25}" />,
    reason: <><Katex tex="\cos(\pi)=-1" />, so <Katex tex="V=12.5+12.5=25" /> m/s. This is the maximum of <Katex tex="12.5-12.5\cos(\cdot)" />, matching the curve levelling off at <Katex tex="t=8" /> on the graph.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="a(t) = \frac{dv}{dt} = -12.5\times\left(-\sin\left(\frac{\pi}{6}(t-2)\right)\right)\times\frac{\pi}{6}" />,
    reason: <>Acceleration is the derivative of velocity. Chain rule: the derivative of <Katex tex="\cos(u)" /> is <Katex tex="-\sin(u)" />, times <Katex tex="\tfrac{du}{dt}=\tfrac{\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a(t) = \frac{25\pi}{12}\sin\left(\frac{\pi}{6}(t-2)\right)}" />,
    reason: <><Katex tex="12.5\times\tfrac{\pi}{6}=\tfrac{25}{2}\times\tfrac{\pi}{6}=\tfrac{25\pi}{12}" />. Check the sign: for <Katex tex="2<t<8" /> the angle is between 0 and <Katex tex="\pi" />, so <Katex tex="a>0" />, as it should be while the car speeds up.</>,
    more: <>VCAA also accepts <Katex tex="-\tfrac{25\pi}{12}\cos\left(\tfrac{\pi}{6}(t+1)\right)" />, the same function shifted by a quarter period.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\sin\left(\frac{\pi}{6}(t-2)\right) = 1 \\ &\implies \frac{\pi}{6}(t-2) = \frac{\pi}{2} \\ &\implies t = 5 \end{aligned}" />,
    reason: <>The largest value of sine is 1, and it is reached inside the interval: <Katex tex="t=5" /> is between 2 and 8.</>,
  },
  {
    working: <Katex display tex="a_{\max} = \frac{25\pi}{12} = 6.5449\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{a_{\max} \approx 6.5 \ \text{m s}^{-2}}" />,
    reason: <>Correct to one decimal place.</>,
    more: <>On the graph, <Katex tex="t=5" /> is halfway through the S-shaped rise, where the curve is steepest: the steepest point of a velocity–time graph is the moment of greatest acceleration.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="v_{\text{motorcycle}} = 20 \ \text{for } t \ge 0" />,
    reason: <>The motorcycle travels at a constant 20 m/s throughout, so its graph is a horizontal line, starting on the <Katex tex="v" />-axis at <Katex tex="(0,20)" />.</>,
  },
  {
    working: <MotorcycleAnswer />,
    reason: <>A horizontal line at height 20, starting on the <Katex tex="v" />-axis, with its intercept labelled 20.</>,
    more: <>20 is below <Katex tex="V=25" />, so draw it about four-fifths of the way up to the <Katex tex="V" /> line. It crosses the car&apos;s curve at <Katex tex="t\approx6.2" />: from then on the car is the faster, which is why it eventually catches up.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{20t}" />,
    reason: <>Constant velocity: distance = speed × time, with <Katex tex="t" /> counted from the moment the motorcycle passes the patrol car.</>,
    more: <>As an area, it is the rectangle under the line from part c., height 20 and width <Katex tex="t" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="d = \int_2^8\left(12.5-12.5\cos\left(\frac{\pi}{6}(t-2)\right)\right)dt" />,
    reason: <>Distance travelled is the area under the velocity–time graph. The velocity is never negative, so the integral is the distance.</>,
  },
  {
    working: <Katex display tex="= \left[12.5t-\frac{75}{\pi}\sin\left(\frac{\pi}{6}(t-2)\right)\right]_2^8" />,
    reason: <>The antiderivative of <Katex tex="\cos\left(\tfrac{\pi}{6}(t-2)\right)" /> is <Katex tex="\tfrac{6}{\pi}\sin\left(\tfrac{\pi}{6}(t-2)\right)" />, and <Katex tex="12.5\times\tfrac{6}{\pi}=\tfrac{75}{\pi}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= \left(100-\frac{75}{\pi}\sin(\pi)\right) \\ &\quad -\left(25-\frac{75}{\pi}\sin(0)\right) \\ &= 75 \end{aligned}" />,
  },
  {
    working: <Katex display tex="\boxed{75 \ \text{m}}" />,
    reason: <>Sanity check: the curve rises symmetrically from 0 to 25, so its average over the 6 seconds is 12.5 m/s, and <Katex tex="12.5\times6=75" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="t \ge 8: \quad x_{\text{car}} = 75+25(t-8)" />,
    reason: <>By <Katex tex="t=8" /> the car has covered 75 m (part e.); after that it adds 25 m every second.</>,
    more: <>The car hasn&apos;t caught up before then: at <Katex tex="t=8" /> it has gone 75 m but the motorcycle has gone 160 m.</>,
  },
  {
    working: <Katex display tex="75+25(t-8) = 20t" />,
    reason: <>Both start from the same point (where the car was parked when the motorcycle passed it), so they draw level when they have travelled the same distance from it.</>,
  },
  {
    working: <Katex display tex="25t-125 = 20t \implies 5t = 125" />,
  },
  {
    working: <Katex display tex="\boxed{t = 25}" />,
    reason: <>So 25 seconds after the motorcycle passed, 23 seconds after the car set off.</>,
    more: <>Another way to see it: at <Katex tex="t=8" /> the motorcycle is <Katex tex="160-75=85" /> m ahead, and the car closes the gap at <Katex tex="25-20=5" /> m/s, taking another 17 s: <Katex tex="8+17=25" />.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="20\times25 = 500" />,
    reason: <>They draw level at the same point, so the car has travelled as far as the motorcycle has by <Katex tex="t=25" />, and the motorcycle&apos;s distance is part d. at <Katex tex="t=25" />.</>,
  },
  {
    working: <Katex display tex="\boxed{500 \ \text{m}}" />,
    reason: <>Check with the car&apos;s own expression from part f.: <Katex tex="75+25(25-8)=75+425=500" />.</>,
  },
]

export default function SpecialistQ3_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          In a computer simulation, a speeding motorcycle, travelling along a straight, flat road at a
          constant velocity of <Katex tex="20\ \text{m s}^{-1}" />, passes a stationary highway patrol car.
        </p>
        <p>
          Two seconds later, the highway patrol car starts in pursuit of the motorcycle. The highway
          patrol car accelerates for six seconds and then continues at a constant velocity of{' '}
          <Katex tex="V\ \text{m s}^{-1}" />, until it draws level with the motorcycle.
        </p>
        <p>
          The velocity of the highway patrol car while accelerating, in <Katex tex="\text{m s}^{-1}" />,
          is given by
        </p>
        <p>
          <Katex tex="v(t)=12.5-12.5\cos\left(\dfrac{\pi}{6}(t-2)\right)" /> for <Katex tex="2\le t\le 8" />
        </p>
        <p>
          where <Katex tex="t" /> seconds is the time elapsed since the motorcycle passed the highway
          patrol car.
        </p>
        <div className="mt-1 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="Velocity–time graph from the original VCAA exam paper: v is 0 from t = 0 to t = 2, then rises in an S-shaped curve to V at t = 8, with dashed lines marking V on the v-axis and t = 8 on the t-axis"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two facts about a velocity–time graph carry this whole question: its gradient is the
              acceleration, and the area under it is the distance travelled.
            </p>
            <p>
              Both vehicles start from the same point, the place where the patrol car was parked, so
              they draw level when they have covered the same distance. The car&apos;s distance comes
              in two pieces: the curved accelerating part (an integral) and then a constant-speed
              part (a rectangle).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Velocity" marks={1} statement={<>Find the value of <Katex tex="V" />.</>}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Acceleration"
        marks={1}
        statement={
          <>
            Find the acceleration, <Katex tex="a(t)" />, of the highway patrol car at time <Katex tex="t" />{' '}
            for <Katex tex="2<t<8" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Maximum Acceleration"
        marks={1}
        statement={
          <>
            Hence, find the maximum acceleration of the highway patrol car. Give your answer in{' '}
            <Katex tex="\text{m s}^{-2}" />, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Velocity–Time Graph"
        marks={1}
        statement={
          <>
            Sketch the velocity–time graph for the motorcycle on the axes above for{' '}
            <Katex tex="t\ge0" />. Clearly label any intercepts with the axes.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Displacement"
        marks={1}
        statement={
          <>
            Write down an expression for the number of metres travelled by the motorcycle{' '}
            <Katex tex="t" /> seconds after it passes the highway patrol car.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Distance"
        marks={2}
        statement={
          <>
            How many metres will the highway patrol car travel to reach a speed of <Katex tex="V" /> at{' '}
            <Katex tex="t=8" />?
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Meeting Time"
        marks={2}
        statement={<>For what value of <Katex tex="t" /> will the highway patrol car draw level with the motorcycle?</>}
      >
        <WorkingTable rows={ROWS_F} />
        <WrongMethod
          title="Assume the car does 25 m/s from the moment it sets off"
          working={<Katex display tex="25(t-2) = 20t \implies t = 10" />}
        >
          The car only reaches 25 m/s at <Katex tex="t=8" />. While it is accelerating it covers 75 m in
          6 s, not <Katex tex="25\times6=150" /> m, so this overstates its distance by 75 m and has it
          catching up far too early. Use part e.&apos;s 75 m for the first 6 seconds.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="g"
        topic="Distance"
        marks={1}
        statement={<>How many metres will the highway patrol car need to travel to draw level with the motorcycle?</>}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
