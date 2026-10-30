// 2025 Mathematical Methods NHT — Exam 2, Section B Question 3 (9 marks). The NHT report gives
// sample answers only, with no statistics. Tide height h(t) = 2 sin(4πt/25) + (1/5) sin(3πt) + 3:
// a value, an average value by integration, the total time above 1.4 m between 6 am and 6 pm, the
// absolute maximum after 6 am and when, h(25k) = 3, and the period of a sum of two sines. Question
// text transcribed from the original paper (the 2025 NHT paper has no text layer, so it was read
// from rendered pages). The tide-marker drawing and the graph of h are cropped from the original
// VCAA exam PDF (300 dpi). The figure in part c. is an SVG overlay on that graph crop (never a
// redrawing): the line h = 1.4 and the parts of the curve above it for 6 ≤ t ≤ 18. Calibration
// measured from the crop's gridlines: t = 0 at x = 69 px, 50.125 px per hour; h = 0 at y = 739 px,
// 102.333 px per metre; checked with a PIL composite — the calibrated h lies on VCAA's printed
// curve. Answers checked with scipy and against the VCAA report's sample answers: a. 3.25;
// b. 2.98; c. 9.47; d. 5.20 m at 3.30 pm (t = 15.5); f. 50. The WrongMethods in f. are verified
// slips, not taken from the report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import markerSrc from './meth-2025nhte2-q3-marker.png'
import graphSrc from './meth-2025nhte2-q3-graph.png'

const ORANGE = '#f97316'
const RED = '#ef4444'
const LABEL = { fontSize: 30, fill: '#c2410c', stroke: 'white', strokeWidth: 8, paintOrder: 'stroke' } as const
const hModel = (t: number) => 2 * Math.sin((4 * Math.PI * t) / 25) + 0.2 * Math.sin(3 * Math.PI * t) + 3
const gx = (t: number) => 69 + t * 50.125
const gy = (h: number) => 739 - h * 102.333
const ROOTS = [7.8035, 7.9493, 8.2762, 10.6639]

// Part c.: where the water is above 1.4 m between t = 6 and t = 18, on VCAA's own graph.
function SafeOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[520px]">
        <img loading="lazy" decoding="async" src={graphSrc} alt="VCAA's graph of h with the answer drawn over it: a dashed red line at h = 1.4 from t = 6 to t = 18, and the curve highlighted in orange where it is above that line — from t = 6 to about 7.80, briefly from about 7.95 to 8.28, and from about 10.66 to 18" className="w-full block" />
        <svg viewBox="0 0 1449 819" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1={gx(6)} y1={gy(1.4)} x2={gx(18)} y2={gy(1.4)} stroke={RED} strokeWidth={5} strokeDasharray="16 10" />
          <path d={functionToPath(hModel, 6, ROOTS[0], gx, gy, 200)} fill="none" stroke={ORANGE} strokeWidth={8} />
          <path d={functionToPath(hModel, ROOTS[1], ROOTS[2], gx, gy, 60)} fill="none" stroke={ORANGE} strokeWidth={8} />
          <path d={functionToPath(hModel, ROOTS[3], 18, gx, gy, 600)} fill="none" stroke={ORANGE} strokeWidth={8} />
          {ROOTS.map((t) => (
            <circle key={t} cx={gx(t)} cy={gy(1.4)} r={9} fill={ORANGE} />
          ))}
          <text x={gx(18) + 12} y={gy(1.4) + 10} {...LABEL}>h = 1.4</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="h(6) = 2\sin\!\left(\tfrac{24\pi}{25}\right)+\tfrac15\sin(18\pi)+3" />,
    reason: <>6.00 am is <Katex tex="t=6" />, as the stem says.</>,
  },
  {
    working: <Katex display tex="= 2\sin\!\left(\tfrac{24\pi}{25}\right)+3 = 3.2506\ldots" />,
    reason: <><Katex tex="\sin(18\pi)=0" />, since <Katex tex="18\pi" /> is a whole number of half-turns. Calculator in radian mode for the rest.</>,
  },
  {
    working: <Katex display tex="\boxed{3.25 \text{ m}}" />,
    reason: <>Correct to two decimal places. Matches the graph, which is a little above 3 at <Katex tex="t=6" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average} = \frac{1}{18-6}\int_6^{18} h(t)\,dt" />,
    reason: <>The average value of a function over <Katex tex="[a,b]" /> is <Katex tex="\tfrac{1}{b-a}\int_a^b h(t)\,dt" />: the height of the rectangle with the same area. 6.00 pm is <Katex tex="t=18" />.</>,
  },
  {
    working: <Cas fn="nInt">nInt(h(t), t, 6, 18)/12</Cas>,
    reason: <>Numerical integration, with <Katex tex="h" /> defined.</>,
    more: (
      <>
        By hand it is also possible: an antiderivative is{' '}
        <Katex tex="-\tfrac{25}{2\pi}\cos\!\left(\tfrac{4\pi t}{25}\right)-\tfrac{1}{15\pi}\cos(3\pi t)+3t" />, and
        the integral is <Katex tex="35.751\ldots" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= 2.9793\ldots \approx \boxed{2.98 \text{ m}}" />,
    reason: <>Correct to two decimal places.</>,
    more: <>Plausible: the curve oscillates about its centre line <Katex tex="h=3" />, and the window 6 am–6 pm catches a little more of a low tide than a high one, so the average is just under 3.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(h(t) = 1.4, t) | 6 ≤ t ≤ 18</Cas>,
    reason: <>Safe means <Katex tex="h(t)>1.4" />. Find where the curve crosses <Katex tex="h=1.4" /> first; the wiggles of the <Katex tex="\tfrac15\sin(3\pi t)" /> term make it cross more than twice.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} t = 7.8035\ldots,\ 7.9493\ldots, \\ 8.2761\ldots,\ 10.6638\ldots \end{gathered}" />,
    reason: <>Four crossings. Near the low tide the curve dips below 1.4, pops back above for a short time, then dips below again.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} h(t)>1.4 \text{ on } [6,\,7.8035\ldots), \\ (7.9493\ldots,\,8.2761\ldots) \text{ and } (10.6638\ldots,\,18] \end{gathered}" />,
    reason: <>Read from the graph: <Katex tex="h(6)=3.25>1.4" />, so the water starts above the line, and the intervals alternate from there.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &(7.8035-6) + (8.2761-7.9493) \\ &\quad + (18-10.6638) \\ &= 9.4665\ldots \end{aligned}"
      />
    ),
    reason: <>Add the lengths of the three safe intervals, using the unrounded solutions.</>,
  },
  {
    working: <Katex display tex="\boxed{9.47 \text{ hours}}" />,
    reason: <>Correct to two decimal places. Sanity check: the unsafe time is <Katex tex="12-9.47=2.53" /> hours around the low tide near <Katex tex="t\approx9" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Cas fn="fMax">fMax(h(t), t, 6, 24)</Cas>,
    reason: <>&ldquo;On this Monday after 6.00 am&rdquo; means <Katex tex="6\le t\le 24" />. Restrict the search to that interval: the global maximum of <Katex tex="h" /> is on a different day.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} t = 15.5034\ldots \\ h(15.5034\ldots) = 5.1961\ldots \end{gathered}" />,
    reason: <>The highest of the little peaks on the high tide around <Katex tex="t\approx15.5" />.</>,
    more: <>The neighbouring wiggle peaks, at <Katex tex="t\approx14.85" /> and <Katex tex="t\approx16.15" />, reach only about 5.05 m and 5.13 m, so judging from the graph alone is risky. The peaks before 6 am (near <Katex tex="t=3" />) are excluded by the question.</>,
  },
  {
    working: <Katex display tex="0.5034\ldots \text{ h} \times 60 = 30.2\ldots \text{ min}" />,
    reason: <>Convert the decimal part of the hour to minutes, then round to the nearest minute.</>,
  },
  {
    working: <Katex display tex="\boxed{5.20 \text{ m at 3.30 pm}}" />,
    reason: <>Height correct to two decimal places, time to the nearest minute. VCAA also accepts <Katex tex="t=15.5" />, 15 h 30 min, or 930 min.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="h(25k) = 2\sin\!\left(\tfrac{4\pi\times25k}{25}\right)+\tfrac15\sin(3\pi\times25k)+3" />,
    reason: <>Substitute <Katex tex="t=25k" /> into each term of <Katex tex="h(t)" />.</>,
  },
  {
    working: <Katex display tex="= 2\sin(4k\pi)+\tfrac15\sin(75k\pi)+3" />,
    reason: <>Simplify each angle: <Katex tex="\tfrac{4\pi\times25k}{25}=4k\pi" /> and <Katex tex="3\pi\times25k=75k\pi" />.</>,
  },
  {
    working: <Katex display tex="= 2(0)+\tfrac15(0)+3 = 3" />,
    reason: <>For a positive integer <Katex tex="k" />, both <Katex tex="4k" /> and <Katex tex="75k" /> are integers, and <Katex tex="\sin(n\pi)=0" /> for every integer <Katex tex="n" />. As required.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period of } 2\sin\!\left(\tfrac{4\pi t}{25}\right) = \frac{2\pi}{4\pi/25} = \frac{25}{2}" />,
    reason: <>The period of <Katex tex="\sin(nt)" /> is <Katex tex="\tfrac{2\pi}{n}" />. This is the main tide, high water about every 12.5 hours.</>,
  },
  {
    working: <Katex display tex="\text{period of } \tfrac15\sin(3\pi t) = \frac{2\pi}{3\pi} = \frac23" />,
    reason: <>The small, fast wiggle.</>,
  },
  {
    working: <Katex display tex="T = \tfrac{25}{2}m = \tfrac23 n \implies 75m = 4n" />,
    reason: <><Katex tex="h" /> repeats only when <em>both</em> terms repeat at the same time, so the period <Katex tex="T" /> is the smallest time that is a whole number <Katex tex="m" /> of the first period and also a whole number <Katex tex="n" /> of the second (<Katex tex="m" />, <Katex tex="n" /> positive integers). Multiply both sides by 6 to clear the fractions.</>,
  },
  {
    working: <Katex display tex="m=4,\ n=75 \implies T = 4\times\tfrac{25}{2} = \boxed{50}" />,
    reason: <><Katex tex="75m" /> must be a multiple of 4, and 75 has no factor of 2, so the smallest choice is <Katex tex="m=4" />. The period is 50 hours.</>,
    more: <>This is why the two high tides on the printed graph don't look identical: after 12.5 hours the main tide has repeated, but the wiggle hasn't.</>,
  },
]

export default function MethodsQ3_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (9 marks)</p>
        <p>
          Let{' '}
          <Katex tex="h(t)=2\sin\!\left(\dfrac{4\pi t}{25}\right)+\dfrac15\sin(3\pi t)+3" />, where{' '}
          <Katex tex="t\ge0" />.
          <br />
          The function <Katex tex="h" /> models the water height, in metres, on a tide height marker at
          the base of a boat ramp.
          <br />
          The variable <Katex tex="t" /> represents time in hours after midnight on one particular
          Monday morning.
          <br />
          For example, <Katex tex="t=6" /> represents 6.00 am on this Monday morning.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={markerSrc}
            alt="A boat ramp sloping into water, with a vertical tide height marker standing at its base — from the original 2025 NHT VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p>Part of the graph of <Katex tex="h" /> is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={graphSrc}
            alt="Graph of h against t from 0 to about 26 hours: a wavy sinusoid between about 0.8 and 5.2 with small rapid wiggles, peaks near t = 3 and t = 15.5 and troughs near t = 9.5 and t = 22 — from the original 2025 NHT VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              <Katex tex="h" /> is a slow tide (amplitude 2, period 12.5 hours) plus a small fast
              ripple (amplitude 0.2, period 40 minutes) about the centre line <Katex tex="h=3" />.
              The ripple is what makes parts c. and d. hard to read off the graph: it adds extra
              crossings and extra little peaks, so use CAS on the rule rather than the picture.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Function Value"
        marks={1}
        statement={
          <>
            Find the water height at 6.00 am on this Monday morning.
            <br />
            Give your answer in metres, correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Average Value"
        marks={2}
        statement={
          <>
            Find the average height of water between 6.00 am and 6.00 pm on this Monday.
            <br />
            Give your answer in metres, correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Average the heights at 6 am and 6 pm"
          working={<Katex display tex="\tfrac{h(6)+h(18)}{2} = \tfrac{3.2507+3.7362}{2}\approx3.49" />}
        >
          That is the midpoint of two readings, not the average height over the whole twelve hours, and
          it misses the low tide in between entirely. The average <em>value</em> of a function needs
          the integral.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Time Above a Level"
        marks={2}
        statement={
          <>
            A boat requires a water height of more than 1.4 metres to be safely launched off the ramp.
            <br />
            Between 6.00 am and 6.00 pm on this Monday, find the total amount of time when it is safe to
            launch this boat.
            <br />
            Give your answer in hours, correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
        <Background title="Seeing the Four Crossings">
          <p>
            The dashed line is <Katex tex="h=1.4" /> for <Katex tex="6\le t\le18" />, and the orange
            parts of VCAA's curve are the safe times. The short orange piece just after{' '}
            <Katex tex="t=7.9" /> is a single ripple poking back above the line: easy to miss from
            the printed graph, and worth about a third of an hour.
          </p>
          <SafeOverlay />
        </Background>
      </PartCard>

      <PartCard
        letter="d"
        topic="Absolute Maximum"
        marks={2}
        statement={
          <>
            Find the absolute maximum height of the water on this Monday after 6.00 am, and the time
            when it occurs.
            <br />
            Give the height in metres, correct to two decimal places, and the time correct to the
            nearest minute.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Exact Trigonometric Values"
        marks={1}
        statement={<>Show that <Katex tex="h(25k)=3" /> for all positive integers <Katex tex="k" />.</>}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard letter="f" topic="Period" marks={1} statement={<>Find the period of the function <Katex tex="h" />.</>}>
        <WorkingTable rows={ROWS_F} />
        <WrongMethod
          title="Use the period of the main term, 12.5"
          working={<Katex display tex="T=\tfrac{2\pi}{4\pi/25}=12.5" />}
        >
          After 12.5 hours the ripple <Katex tex="\tfrac15\sin(3\pi t)" /> is out of step:{' '}
          <Katex tex="3\pi\times12.5=37.5\pi" /> is not a whole number of full turns. Both terms have
          to come back into step together.
        </WrongMethod>
        <WrongMethod
          title="Part e. gives h(25) = h(0), so the period is 25"
          working={<Katex display tex="h(25)=3=h(0) \implies T=25" />}
        >
          Two equal values don't make a period. Check a different <Katex tex="t" />:{' '}
          <Katex tex="\sin\big(3\pi(t+25)\big)=\sin(3\pi t+75\pi)=-\sin(3\pi t)" />, so{' '}
          <Katex tex="h(t+25)\ne h(t)" /> in general (for example <Katex tex="h(25.3)-h(0.3)\approx-0.12" />).
        </WrongMethod>
      </PartCard>
    </div>
  )
}
