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
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
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
        <img src={graphSrc} alt="VCAA's graph of f for t up to 24 with the answer drawn over it: the curve continued from t = 24, dipping to about 3300 near t = 28, rising a little near t = 30, dipping again near t = 32 and climbing to the labelled endpoint (36, 5180)" className="w-full block" />
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
    working: <Katex display tex="p(t) = at^3+bt^2+ct+d, \qquad p'(t) = 3at^2+2bt+c" />,
    reason: <>Four unknowns, so four independent conditions are needed.</>,
  },
  {
    working: <Katex display tex="p(2) = 2500: \quad 8a+4b+2c+d = 2500" />,
    reason: <>The local minimum passes through (2, 2500) …</>,
  },
  {
    working: <Katex display tex="p'(2) = 0: \quad 12a+4b+c = 0" />,
    reason: <>… and is stationary there: <Katex tex="p'(2)=0" /> — not <Katex tex="p'(2)=2500" />, which the report notes some students wrote.</>,
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
  },
  {
    working: <Katex display tex="\boxed{a = -5.21,\ b = 101.65,\ c = -344.03,\ d = 2823.18}" />,
    reason: <>Exactly, <Katex tex="a=-\tfrac{3800}{729}" />, <Katex tex="b=\tfrac{24700}{243}" />, <Katex tex="c=-\tfrac{83600}{243}" />, <Katex tex="d=\tfrac{2058100}{729}" />. Two decimal places were asked for, so <Katex tex="b=101.65" />, not <Katex tex="101.64" />.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="q(t) = p(t-h)+k" />,
    reason: <>A translation of <Katex tex="h" /> right and <Katex tex="k" /> up, so every feature of p moves by the same amounts.</>,
  },
  {
    working: <Katex display tex="p \text{ has its local maximum at } (11,4400)" />,
    reason: <>Given in the stem — there is no need to touch the cubic from part a.i. at all.</>,
  },
  {
    working: <Katex display tex="(11+h,\ 4400+k) = (23,\ 4750)" />,
    reason: <>The image of that maximum must be the required point.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 12, \qquad k = 350}" />,
    reason: <>Sensible: <Katex tex="h=12" /> is a shift of one whole year, which is exactly what modelling 2022 instead of 2021 should require. Translating the local <em>minimum</em> instead gives the wrong pair <Katex tex="h=21,\ k=2250" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f(t) = 3000+30t+700\cos\!\left(\tfrac{\pi t}{6}\right)+400\cos\!\left(\tfrac{\pi t}{3}\right)" />,
    reason: <>Two cosines of period 12 and 6 riding on the line <Katex tex="y=3000+30t" />, so the pattern of the first 12 months repeats, lifted 360 higher each year.</>,
  },
  {
    working: <Katex display tex="f(24) = 3000+720+700+400 = 4820" />,
    reason: <>At every multiple of 12 both cosines equal 1, so the curve must join the printed graph smoothly at <Katex tex="t=24" /> — the sketch has to be continuous there.</>,
  },
  {
    working: <Katex display tex="f(36) = 3000+1080+700+400 = 5180" />,
    reason: <>The endpoint. <Katex tex="\cos(6\pi)=\cos(12\pi)=1" />.</>,
  },
  {
    working: <Katex display tex="\text{shape on } (24,36] = \text{shape on } (12,24] \text{ lifted } 360" />,
    reason: <>So the two turning points and the shoulder in between all sit in the same months as the year before, 360 higher.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{endpoint } (36,\,5180)}" />,
    reason: <>Round brackets around the coordinates were required, and the endpoint had to be labelled.</>,
  },
  {
    working: <CompletionOverlay />,
    reason: <>Drawn on the printed axes, continuing smoothly from <Katex tex="t=24" /> — the report notes some graphs were discontinuous there.</>,
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
    reason: <>The second has period 6, and 12 is two whole periods. Both oscillations cancel, which is why the increase is the same every year.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 30(t+12)-30t = 360}" />,
    reason: <>Only the linear term survives. The report notes 30 was a common incorrect answer — that is <Katex tex="f'(12)" />, an instantaneous rate, not the increase over twelve months.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dt}\left[700\cos\!\left(\tfrac{\pi t}{6}\right)\right] = -700\cdot\tfrac{\pi}{6}\sin\!\left(\tfrac{\pi t}{6}\right) = -\tfrac{350\pi}{3}\sin\!\left(\tfrac{\pi t}{6}\right)" />,
    reason: <>Chain rule: the inner derivative π/6 comes down in front.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\left[400\cos\!\left(\tfrac{\pi t}{3}\right)\right] = -400\cdot\tfrac{\pi}{3}\sin\!\left(\tfrac{\pi t}{3}\right) = -\tfrac{400\pi}{3}\sin\!\left(\tfrac{\pi t}{3}\right)" />,
    reason: <>Same again with π/3.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(t) = 30-\frac{350\pi}{3}\sin\!\left(\frac{\pi t}{6}\right)-\frac{400\pi}{3}\sin\!\left(\frac{\pi t}{3}\right)}" />,
    reason: <>The constant 3000 vanishes and <Katex tex="30t" /> leaves 30. The report notes <Katex tex="\pi" /> was often omitted from the coefficients.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="\text{maximise } f'(t) \text{ on } (0,36]" />,
    reason: <>"Hence" means use the derivative from b.iii — the maximum <em>rate</em>, not the maximum of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\text{max}\left(f'\right) = 725.395\ldots" />,
    reason: <>From <Cas fn="fMax" /> applied to <Katex tex="f'(t)" /> over the domain, or by graphing <Katex tex="y=f'(t)" /> and reading the peaks.</>,
  },
  {
    working: <Katex display tex="f' \text{ has period } 12 \implies \text{three equal peaks in } (0,36]" />,
    reason: <>Both sine terms repeat every 12 months, so whatever happens once happens three times. The report notes many students gave extra <Katex tex="t" /> values or only one.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum rate } 725 \text{ million dollars per month at } t = 10.2,\ 22.2,\ 34.2}" />,
    reason: <>The rate to the nearest million and the times to one decimal place, as asked. Both halves of the answer were required.</>,
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
          <img
            src={chartSrc}
            alt="A scatter of 36 monthly sales points from about 2500 to 4800 million dollars, with a dashed cubic curve drawn through the first twelve — from the original 2024 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Part a. is a four-condition fit. A turning point given as a coordinate pair is
            always <em>two</em> pieces of information — the point is on the curve{' '}
            <em>and</em> the derivative is zero there — so two stated turning points supply
            exactly the four equations a cubic needs.
          </p>
          <p>
            Part b. turns on periods. The two cosines have periods 12 and 6 months, so both
            repeat exactly over any 12-month step: the model is a straight line with an
            annual pattern bolted on. That single fact answers b.i. (the next year is last
            year lifted), b.ii. (only the linear term survives a 12-month difference) and
            b.iv. (three identical peaks, not one).
          </p>
        </Background>
      </div>

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
            tex="f:(0,36]\to R,\ f(t)=3000+30t+700\cos\!\left(\frac{\pi t}{6}\right)+400\cos\!\left(\frac{\pi t}{3}\right)"
          />
        </div>
        <p>Part of the graph of <Katex tex="f" /> is shown on the axes below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
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
