// 2024 Mathematical Methods — Exam 2, Section B Question 3 (11 marks). Fitting a cubic to
// online-sales data with four simultaneous conditions, then a trigonometric model with two
// cosines of different periods. Question text transcribed from the original paper (2024
// papers are image-only, so read from rendered pages); the chart and the partial graph are
// crops of VCAA's own artwork (the graph at 300 dpi), and the part b.i. answer is an SVG overlay
// on that crop (never a redrawing). Calibration measured from its gridlines: origin (341, 921),
// 39.64 px per month and 0.13225 px per $million; checked with a PIL composite — the calibrated
// f lies exactly on VCAA's printed curve for t in (0, 24].
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import chartSrc from './meth-2024e2-q3-chart.png'
import graphSrc from './meth-2024e2-q3b-graph.png'
import { functionToPath } from '../graphUtils'

const ORANGE = '#f97316'
const LABEL = { fontSize: 44, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const
const fModel = (t: number) => 3000 + 30 * t + 700 * Math.cos((Math.PI * t) / 6) + 400 * Math.cos((Math.PI * t) / 3)
const gx = (t: number) => 341 + t * 39.64
const gy = (y: number) => 921 - y * 0.13225

// Part b.i.: the graph of f completed for t in (24, 36] on VCAA's own axes.
function CompletionOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[560px]">
        <img loading="lazy" decoding="async" src={graphSrc} alt="VCAA's graph of f for t up to 24 with the answer drawn over it: the curve continued from t = 24, dipping to about 3300 near t = 28, rising a little near t = 30, dipping again near t = 32 and climbing to the labelled endpoint (36, 5180)" className="w-full block" />
        <svg viewBox="0 0 1908 1070" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={functionToPath(fModel, 24, 36, gx, gy, 400)} fill="none" stroke={ORANGE} strokeWidth={6} />
          <circle cx={gx(36)} cy={gy(5180)} r={12} fill={ORANGE} />
          <text x={gx(36) - 24} y={gy(5180) - 26} textAnchor="end" {...LABEL}>(36, 5180)</text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_AI: SAExaminerStats = {
  marks: [30, 16, 12, 42],
  average: 1.7,
  comment: (
    <>
      Some students only wrote the answers without showing adequate working. Others had only
      two correct equations.
      <br />
      Some had <Katex tex="p'(2)=2500" /> and <Katex tex="p'(11)=4400" />. Others rounded{' '}
      <Katex tex="101.646\ldots" /> to <Katex tex="101.64" />. The value of <Katex tex="d" /> was
      sometimes missing.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [65, 9, 26],
  average: 0.6,
  comment: (
    <>
      Many students did not realise they only needed to translate the point{' '}
      <Katex tex="(11,4400)" /> to the point <Katex tex="(23,4750)" />. Some gave solutions
      outside the domain. Others translated the local minimum, giving{' '}
      <Katex tex="h=21,\ k=2250" /> as their answers. <Katex tex="h=-12,\ k=350" /> was
      sometimes seen.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [19, 18, 63],
  average: 1.5,
  comment: (
    <>
      More care needs to be taken when sketching graphs. The turning points and endpoint needed
      to be in the correct positions. Some students labelled the endpoint incorrectly. Round
      brackets are required around the coordinates. Others made the graph discontinuous at{' '}
      <Katex tex="t=24" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      A common incorrect answer was <Katex tex="30" /> which is found by calculating{' '}
      <Katex tex="f'(12)" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: (
    <>
      This question was answered well. There were some transcription errors:{' '}
      <Katex tex="\pi" /> was often omitted and brackets were not used well.
    </>
  ),
}

const EXAM_BIV: SAExaminerStats = {
  marks: [65, 14, 21],
  average: 0.6,
  comment: (
    <>
      Many students gave extra <Katex tex="t" /> values or only one <Katex tex="t" /> value.
      Others did not give the maximum instantaneous rate of change or found the minimum
      instantaneous rate of change.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}p(t) &= at^3+bt^2+ct+d\\ p'(t) &= 3at^2+2bt+c\end{aligned}" />,
    reason: <>Four unknowns, so four independent conditions are needed. Each turning point gives two: the point is on the curve, and the gradient there is 0.</>,
  },
  {
    working: <Katex display tex="p(2) = 2500: \quad 8a+4b+2c+d = 2500" />,
    reason: <>The local minimum passes through (2, 2500) …</>,
  },
  {
    working: <Katex display tex="p'(2) = 0: \quad 12a+4b+c = 0" />,
    reason: <>… and is stationary there, so the derivative at <Katex tex="t=2" /> is 0.</>,
    more: <>The report notes some students wrote <Katex tex="p'(2)=2500" /> and <Katex tex="p'(11)=4400" />, and its general comments say some did not set the derivative equal to zero at the turning points. 2500 is the <em>height</em> of the turning point; its <em>gradient</em> is 0, because the curve is momentarily flat there.</>,
  },
  {
    working: <Katex display tex="p(11) = 4400: \quad 1331a+121b+11c+d = 4400" />,
    reason: <>The local maximum passes through (11, 4400) …</>,
  },
  {
    working: <Katex display tex="p'(11) = 0: \quad 363a+22b+c = 0" />,
    reason: <>… and is stationary there too.</>,
  },
  {
    working: <Katex display tex="\text{solve the system for } a,b,c,d" />,
    reason: <>Four linear equations in four unknowns — <Cas fn="solve" /> handles it in one line.</>,
    more: <>Define <Katex tex="p(t)" /> first, then solve the four equations together for <Katex tex="a,b,c,d" />. Write the four equations down before the answers: this part is worth 3 marks, and the report notes some students only wrote the answers without adequate working, and others had only two correct equations.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}a &= -5.21, & b &= 101.65,\\ c &= -344.03, & d &= 2823.18\end{aligned}}" />,
    reason: <>Rounded to two decimal places as asked: <Katex tex="b=101.646\ldots" /> rounds up to <Katex tex="101.65" />. All four values are required, including <Katex tex="d" />.</>,
    more: <>The exact values are <Katex tex="a=-\tfrac{3800}{729}" />, <Katex tex="b=\tfrac{24700}{243}" />, <Katex tex="c=-\tfrac{83600}{243}" /> and <Katex tex="d=\tfrac{2058100}{729}" />. The report notes some students rounded <Katex tex="101.646\ldots" /> down to <Katex tex="101.64" />, and that <Katex tex="d" /> was sometimes missing. A quick check: the turning points are at <Katex tex="t=2" /> and <Katex tex="t=11" />, so <Katex tex="p'(t)=3a(t-2)(t-11)=3at^2-39at+66a" />. Matching coefficients, <Katex tex="b=-19.5a\approx101.65" /> and <Katex tex="c=66a\approx-344.03" />, agreeing with the CAS.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="q(t) = p(t-h)+k" />,
    reason: <>Replacing <Katex tex="t" /> by <Katex tex="t-h" /> moves the graph <Katex tex="h" /> right, and <Katex tex="+k" /> moves it <Katex tex="k" /> up. Every point of p moves by these amounts.</>,
    more: <>The report notes <Katex tex="h=-12,\ k=350" /> was sometimes seen: that would move the maximum left to <Katex tex="t=11-12=-1" />, nowhere near 23.</>,
  },
  {
    working: <Katex display tex="p \text{ has its local maximum at } (11,4400)" />,
    reason: <>A translation moves a local maximum to a local maximum, so track the maximum given in the stem. The cubic from part a.i. is not needed.</>,
    more: <>The report notes many students did not realise they only needed to translate the point <Katex tex="(11,4400)" /> to <Katex tex="(23,4750)" />.</>,
  },
  {
    working: <Katex display tex="(11+h,\ 4400+k) = (23,\ 4750)" />,
    reason: <>The maximum moves to <Katex tex="(11+h,\ 4400+k)" />, and this must be the required point. Equate the coordinates.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 12, \qquad k = 350}" />,
    reason: <>Sensible: <Katex tex="h=12" /> is a shift of one whole year, matching a model of 2022 instead of 2021.</>,
    more: <>It also fits the domain: shifting <Katex tex="(0,12]" /> right by 12 gives <Katex tex="(12,24]" />, the domain of q, and <Katex tex="t=23" /> lies in it. The report notes some solutions were outside the domain, and others translated the local <em>minimum</em>, giving <Katex tex="h=21,\ k=2250" />. A minimum moves to a minimum, so it can never become the required local maximum.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f(t) = 3000+30t+700\cos\!\left(\tfrac{\pi t}{6}\right)+400\cos\!\left(\tfrac{\pi t}{3}\right)" />,
    reason: <>The cosines have periods 12 and 6, so both repeat every 12 months. Each year copies the previous year's shape, lifted by <Katex tex="30\times12=360" />.</>,
    more: <>The periods are <Katex tex="\tfrac{2\pi}{\pi/6}=12" /> and <Katex tex="\tfrac{2\pi}{\pi/3}=6" />. So over any 12 months only the line <Katex tex="y=3000+30t" /> changes. Part b.ii. shows this algebraically.</>,
  },
  {
    working: <Katex display tex="f(24) = 3000+720+700+400 = 4820" />,
    reason: <>The printed curve ends here, so the new piece must start at <Katex tex="(24,4820)" />, with no gap or jump.</>,
    more: <>At every multiple of 12 both cosines equal 1 (here <Katex tex="\cos(4\pi)=\cos(8\pi)=1" />), which is why the value is easy to find by hand. The report notes some students made the graph discontinuous at <Katex tex="t=24" />.</>,
  },
  {
    working: <Katex display tex="f(36) = 3000+1080+700+400 = 5180" />,
    reason: <>The endpoint. <Katex tex="\cos(6\pi)=\cos(12\pi)=1" />.</>,
  },
  {
    working: <Katex display tex="\text{shape on } (24,36] = \text{shape on } (12,24] \text{ lifted } 360" />,
    reason: <>So the turning points fall in the same months as the year before, each 360 higher: a dip near <Katex tex="t=28" />, a small rise near 30, a second dip near 32, then the climb to the endpoint.</>,
    more: <>To place them accurately, graph <Katex tex="f" /> on the CAS over <Katex tex="24\le t\le36" />, or use <Cas fn="fMin" /> and <Cas fn="fMax" /> on each section. Correct to the nearest unit: a local minimum near <Katex tex="(27.8,\ 3282)" />, a local maximum near <Katex tex="(30.1,\ 3602)" /> and a local minimum near <Katex tex="(32.0,\ 3410)" />. These are the 2022 turning points <Katex tex="(15.8,\ 2922)" />, <Katex tex="(18.1,\ 3242)" />, <Katex tex="(20.0,\ 3050)" /> moved 12 right and 360 up. The curve also rises very slightly just after <Katex tex="t=24" /> (to about 4821 at <Katex tex="t\approx24.05" />) before falling, just as it does after <Katex tex="t=12" />. The report says the turning points and endpoint needed to be in the correct positions.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{endpoint } (36,\,5180)}" />,
    reason: <>Label the endpoint with both coordinates in round brackets, as the question asks.</>,
    more: <>The report notes some students labelled the endpoint incorrectly, and its general comments note that <Katex tex="(36,\ 5180" /> (with no closing bracket) was often seen.</>,
  },
  {
    working: <CompletionOverlay />,
    reason: <>Drawn on the printed axes: starting from <Katex tex="(24,4820)" />, with the three visible turning points in place and the labelled endpoint <Katex tex="(36,5180)" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="n = f(t+12)-f(t)" />,
    reason: <>The increase over twelve months, whatever the starting month.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac{\pi(t+12)}{6}\right) = \cos\!\left(\tfrac{\pi t}{6}+2\pi\right) = \cos\!\left(\tfrac{\pi t}{6}\right)" />,
    reason: <>The first cosine has period <Katex tex="\tfrac{2\pi}{\pi/6}=12" />, so it is unchanged.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac{\pi(t+12)}{3}\right) = \cos\!\left(\tfrac{\pi t}{3}+4\pi\right) = \cos\!\left(\tfrac{\pi t}{3}\right)" />,
    reason: <>The second has period 6, and 12 is two whole periods. Both cosine terms cancel in the difference.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 30(t+12)-30t = 360}" />,
    reason: <>Only the linear term survives, and it is the same for every <Katex tex="t" />.</>,
    more: <>The report notes 30 was a common incorrect answer, found by calculating <Katex tex="f'(12)" />. That is the instantaneous rate of change at one moment (million dollars per month), not the increase over twelve months. A check: <Katex tex="f(12)=4460" /> and <Katex tex="f(24)=4820" />, a rise of 360.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\frac{d}{dt}\left[700\cos\!\left(\tfrac{\pi t}{6}\right)\right]\\ &= -700\cdot\tfrac{\pi}{6}\sin\!\left(\tfrac{\pi t}{6}\right)\\ &= -\tfrac{350\pi}{3}\sin\!\left(\tfrac{\pi t}{6}\right)\end{aligned}" />,
    reason: <>Chain rule: the derivative of <Katex tex="\cos(kt)" /> is <Katex tex="-k\sin(kt)" />, so the inner derivative π/6 comes down in front.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{d}{dt}\left[400\cos\!\left(\tfrac{\pi t}{3}\right)\right]\\ &= -400\cdot\tfrac{\pi}{3}\sin\!\left(\tfrac{\pi t}{3}\right)\\ &= -\tfrac{400\pi}{3}\sin\!\left(\tfrac{\pi t}{3}\right)\end{aligned}" />,
    reason: <>Same again with π/3.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(t) = 30-\frac{350\pi}{3}\sin\!\left(\frac{\pi t}{6}\right)-\frac{400\pi}{3}\sin\!\left(\frac{\pi t}{3}\right)} " />,
    reason: <>The constant 3000 vanishes and <Katex tex="30t" /> leaves 30.</>,
    more: <>The report notes transcription errors: <Katex tex="\pi" /> was often omitted and brackets were not used well. If you copy this from the CAS, keep the <Katex tex="\pi" /> in each coefficient and put brackets around each sine's argument.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="\text{maximise } f'(t) \text{ on } (0,36]" />,
    reason: <>"Hence" means use the derivative from b.iii. The instantaneous rate of change is <Katex tex="f'(t)" />, so we want the maximum of <Katex tex="f'" />, not of <Katex tex="f" />.</>,
    more: <>The report's general comments note some students found the maximum value of <Katex tex="f" /> instead, and the report notes others found the <em>minimum</em> rate of change (about <Katex tex="-665" />, the steepest fall).</>,
  },
  {
    working: <Katex display tex="\text{max}\left(f'\right) = 725.395\ldots" />,
    reason: <><Cas fn="fMax" /> on <Katex tex="f'(t)" /> over <Katex tex="0<t\le36" /> gives where the maximum occurs, <Katex tex="t=10.24\ldots" />; substitute it into <Katex tex="f'(t)" /> for the maximum rate. (Or use the highest point of the graph of <Katex tex="y=f'(t)" />.)</>,
    more: <>Solving <Katex tex="f''(t)=0" /> by hand is not practical here, so let the CAS find the maximum. The graph of <Katex tex="y=f'(t)" /> has two local maxima each year: a low one near <Katex tex="t=4.9" /> (about 213) and the highest one near <Katex tex="t=10.2" />. Only the highest is the maximum rate.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&f' \text{ has period } 12\\ &\implies \text{three equal peaks in } (0,36]\end{aligned}" />,
    reason: <>Both sine terms repeat every 12 months, so the peak at <Katex tex="t=10.24\ldots" /> recurs 12 and 24 months later, all inside <Katex tex="(0,36]" />.</>,
    more: <>The report notes many students gave extra <Katex tex="t" /> values or only one. One value misses the repeats at 22.2 and 34.2. Extra values are likely to come from also including the lower local maxima near 4.9, 16.9 and 28.9, or every solution of <Katex tex="f''(t)=0" />, which includes the minima.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}&\text{maximum rate } 725 \text{ million dollars per month}\\&\text{at } t = 10.2,\ 22.2,\ 34.2\end{aligned}}" />,
    reason: <>The rate to the nearest million and the times to one decimal place, as asked. Both halves of the answer are required.</>,
    more: <>The report notes some students did not give the maximum instantaneous rate of change itself.</>,
  },
]

export default function MethodsQ3_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (11 marks)</p>
        <p>
          The points shown on the chart below represent monthly online sales in Australia.
          <br />
          The variable <Katex tex="y" /> represents sales in millions of dollars.
          <br />
          The variable{' '}
          <Katex tex="t" /> represents the month when the sales were made, where{' '}
          <Katex tex="t=1" /> corresponds to January 2021, <Katex tex="t=2" /> corresponds to
          February 2021 and so on.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={chartSrc}
            alt="A scatter of 36 monthly sales points from about 2500 to 4800 million dollars, with a dashed cubic curve drawn through the first twelve — from the original 2024 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Part a. fits a cubic to two stated turning points.
            </p>
            <p>
              Part b. turns on periods: the model is a straight line with an annual pattern
              bolted on. That single fact answers b.i. (the next year is last
              year lifted), b.ii. (only the linear term survives a 12-month difference) and
              b.iv. (three identical peaks, not one).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">a.</p>
        <p>
          A cubic polynomial <Katex tex="p:(0,12]\to R" />,{' '}
          <Katex tex="p(t)=at^3+bt^2+ct+d" /> can be used to model monthly online sales in
          2021.
          <br />
          The graph of <Katex tex="y=p(t)" /> is shown as a dashed curve on the set of axes above.
          <br />
          It has a local minimum at <Katex tex="(2,2500)" /> and a local maximum
          at <Katex tex="(11,4400)" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Fitting a Cubic"
        marks={3}
        statement={
          <>
            Find, correct to two decimal places, the values of <Katex tex="a" />,{' '}
            <Katex tex="b" />, <Katex tex="c" /> and <Katex tex="d" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Translation"
        marks={2}
        statement={
          <>
            Let <Katex tex="q:(12,24]\to R" />, <Katex tex="q(t)=p(t-h)+k" /> be a
            cubic function obtained by translating <Katex tex="p" />, which can be used to
            model monthly online sales in 2022.
            <br />
            Find the values of <Katex tex="h" /> and{' '}
            <Katex tex="k" /> such that the graph of <Katex tex="y=q(t)" /> has a local maximum
            at <Katex tex="(23,4750)" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Another function <Katex tex="f" /> can be used to model monthly online sales, where
        </p>
        <div className="py-1">
          <Katex
            display
            tex="\begin{aligned}&f:(0,36]\to R,\\ &f(t)=3000+30t+700\cos\!\left(\frac{\pi t}{6}\right)\\ &\qquad\qquad+400\cos\!\left(\frac{\pi t}{3}\right)\end{aligned}"
          />
        </div>
        <p>Part of the graph of <Katex tex="f" /> is shown on the axes below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The sales scatter with a solid oscillating curve drawn through it for t from 0 to 24 months only, the axes continuing empty to t = 36 — from the original 2024 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            Complete the graph of <Katex tex="f" /> on the set of axes above until December
            2023, that is, for <Katex tex="t\in(24,36]" />.
            <br />
            Label the endpoint at{' '}
            <Katex tex="t=36" /> with its coordinates.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Periodic Increase"
        marks={1}
        statement={
          <>
            The function <Katex tex="f" /> predicts that every 12 months, monthly online sales
            increase by <Katex tex="n" /> million dollars.
            <br />
            Find the value of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard letter="b.iii" topic="Derivative" marks={1} statement={<>Find the derivative <Katex tex="f'(t)" />.</>} examinerReport={EXAM_BIII}>
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="b.iv"
        topic="Maximum Rate"
        marks={2}
        statement={
          <>
            Hence, find the maximum instantaneous rate of change for the function{' '}
            <Katex tex="f" />, correct to the nearest million dollars per month, and the values
            of <Katex tex="t" /> in the interval <Katex tex="(0,36]" /> when this maximum rate
            occurs, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_BIV}
      >
        <WorkingTable rows={ROWS_BIV} />
      </PartCard>
    </div>
  )
}
