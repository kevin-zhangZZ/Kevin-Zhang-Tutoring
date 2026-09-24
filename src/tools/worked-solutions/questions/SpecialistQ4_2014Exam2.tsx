// 2014 Specialist Mathematics — Exam 2, Section 2 Question 4 (12 marks). Related rates for a
// conical tank filling and draining at once, the time to fill as a definite integral, and a
// separable equation for a bucket-shaped tank. Question text transcribed from the original
// paper; both figures are crops of VCAA's own artwork. Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import coneSrc from './spec-2014e2-q4-cone.png'
import bucketSrc from './spec-2014e2-q4d-bucket.png'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      A number of students substituted <Katex tex="r=\tfrac12" /> to try to show the result.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [13, 5, 17, 7, 58],
  average: 2.9,
  comment: (
    <>
      Most students attempted this question by using the correct form of the chain rule, but
      many only used the "rate in" or the "rate out", instead of the difference between the
      rates.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [58, 10, 32],
  average: 0.8,
  comment: (
    <>
      Many students did not attempt this question. A number attempted to find{' '}
      <Katex tex="t" /> in terms of <Katex tex="h" />, instead of using a definite integral.
      Some attempted to integrate <Katex tex="\tfrac{dh}{dt}" /> with respect to{' '}
      <Katex tex="h" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [21, 7, 9, 10, 40, 12],
  average: 2.8,
  comment: (
    <>
      Many students managed the early steps of working, but only a minority could find{' '}
      <Katex tex="x" /> correctly in terms of <Katex tex="t" />. Students who did not express{' '}
      <Katex tex="\tfrac{dh}{dV}" /> as a complete square had more difficulty in ultimately
      expressing <Katex tex="x" /> in terms of <Katex tex="t" />. A number of equivalent
      technology-derived results for <Katex tex="x(t)" /> were also accepted.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{r}{h} = \frac{0.5}{1} = \frac12" />,
    reason: <>Similar triangles: the water forms a scaled copy of the whole cone, so the radius-to-depth ratio is fixed. Using <Katex tex="r=\tfrac12" /> instead treats the surface as always the full width.</>,
  },
  {
    working: <Katex display tex="r = \tfrac h2" />,
    reason: <>The radius of the water surface at depth <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="V = \tfrac13\pi r^2h = \tfrac13\pi\left(\tfrac h2\right)^2h" />,
    reason: <>The cone volume formula, with <Katex tex="r" /> written in terms of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="= \tfrac13\pi\cdot\tfrac{h^2}{4}\cdot h = \frac{\pi}{12}h^3 \quad \text{as required}" />,
    reason: <>The mark is for the similar-triangles step and the substitution above, not for restating the given result.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dV}{dt} = 0.02\pi - 0.01\pi\sqrt h" />,
    reason: <>In minus out. Using only one of the two rates is the report's main criticism.</>,
  },
  {
    working: <Katex display tex="V = \tfrac{\pi}{12}h^3 \implies \frac{dV}{dh} = \tfrac{\pi}{4}h^2" />,
    reason: <>From part a.</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt} = \frac{dh}{dV}\times\frac{dV}{dt} = \frac{4}{\pi h^2}\left(0.02\pi-0.01\pi\sqrt h\right)" />,
    reason: <>The chain rule, using the <em>reciprocal</em> of <Katex tex="\tfrac{dV}{dh}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{4\left(0.02-0.01\sqrt h\right)}{h^2}" />,
    reason: <>The <Katex tex="\pi" /> cancels — which is why the question put it in the flow rates.</>,
  },
  {
    working: <Katex display tex="h = 0.25:\quad \frac{4(0.02-0.01\times0.5)}{0.0625} = \frac{4(0.015)}{0.0625}" />,
    reason: <><Katex tex="\sqrt{0.25}=0.5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt} = 0.96\ \text{m/min}}" />,
    reason: <>Positive, so the depth is increasing — as it should be while the inflow exceeds the outflow.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dt}{dh} = \frac{\pi h^2}{4\left(0.02\pi-0.01\pi\sqrt h\right)}" />,
    reason: <>The reciprocal of part b. — a definite integral in <Katex tex="h" /> is what turns this into a time.</>,
  },
  {
    working: <Katex display tex="t = \int_0^1\frac{\pi h^2}{4\left(0.02\pi-0.01\pi\sqrt h\right)}\,dh" />,
    reason: <>The tank fills when the depth reaches the full height of 1 m, and starts empty.</>,
  },
  {
    working: <Cas fn="nInt">∫(π·h^2/(4(0.02π - 0.01π·√h)), h, 0, 1)</Cas>,
    reason: <>The integrand is continuous on <Katex tex="[0,1]" /> — the denominator never vanishes, since <Katex tex="0.01\sqrt h\le0.01<0.02" />.</>,
  },
  {
    working: <Katex display tex="t = 7.3688\ldots" />,
    reason: <>Unrounded.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 7.4\ \text{minutes}}" />,
    reason: <>To one decimal place.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="V = \frac{\pi}{48}\left(x^3+6x^2+12x\right) \implies \frac{dV}{dx} = \frac{\pi}{48}\left(3x^2+12x+12\right)" />,
    reason: <>Differentiating.</>,
  },
  {
    working: <Katex display tex="= \frac{3\pi}{48}\left(x^2+4x+4\right) = \frac{\pi(x+2)^2}{16}" />,
    reason: <>The bracket is a perfect square — the step the report says made the difference.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{dx}{dV}\times\frac{dV}{dt} = \frac{16}{\pi(x+2)^2}\times0.05\pi = \frac{0.8}{(x+2)^2}" />,
    reason: <>The <Katex tex="\pi" /> cancels again.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dx} = \frac{(x+2)^2}{0.8}" />,
    reason: <>Inverting, ready to integrate with respect to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="t = \frac{(x+2)^3}{2.4}+c" />,
    reason: <>The constant of integration is essential — the report lists omitting it as a weakness of this whole paper.</>,
  },
  {
    working: <Katex display tex="t = 0,\ x = 0:\quad 0 = \frac{8}{2.4}+c \implies c = -\frac{8}{2.4}" />,
    reason: <>The tank starts empty.</>,
  },
  {
    working: <Katex display tex="2.4t = (x+2)^3-8" />,
    reason: <>Multiplying through by <Katex tex="2.4" /> and rearranging.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \sqrt[3]{2.4t+8}-2}" />,
    reason: <>Check at <Katex tex="t=0" />: <Katex tex="\sqrt[3]8-2=0" /> ✓. The tank is full at <Katex tex="x=1" />, i.e. <Katex tex="t=(27-8)/2.4\approx7.9" /> minutes.</>,
  },
]

export default function SpecialistQ4_2014Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (12 marks)</p>
        <p>
          At a water fun park, a conical tank of radius 0.5 m and height 1 m is filling with
          water. At the same time, some water flows out from the vertex, wetting those
          underneath. When the tank eventually fills, it tips over and the water falls out,
          drenching all those underneath. The tank then returns to its original position and
          begins to refill.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={coneSrc}
            alt="An inverted cone of radius 0.5 m at the top and height 1 m, with the water depth h measured up from the vertex — from the original 2014 VCAA exam paper"
            className="w-full max-w-[260px]"
          />
        </div>
        <p>
          Water flows in at a constant rate of <Katex tex="0.02\pi" /> m<sup>3</sup>/min and
          flows out at a variable rate of <Katex tex="0.01\pi\sqrt h" /> m<sup>3</sup>/min,
          where <Katex tex="h" /> metres is the depth of the water at any instant.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Cone Volume"
        marks={1}
        statement={
          <>
            Show that the volume, <Katex tex="V" /> cubic metres, of water in the cone when it
            is filled to a depth of <Katex tex="h" /> metres is given by{' '}
            <Katex tex="V=\tfrac{\pi}{12}h^3" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Related Rates"
        marks={4}
        statement={
          <>
            Find the rate, in m/min, at which the depth of the water in the tank is increasing
            when the depth is 0.25 m.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The tank is empty at time <Katex tex="t=0" /> minutes.
      </div>

      <PartCard
        letter="c"
        topic="Time to Fill"
        marks={2}
        statement={
          <>
            By using an appropriate definite integral, find the time it takes for the tank to
            fill. Give your answer in minutes, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          Another water tank, shown below, has the shape of a large bucket (part of a cone)
          with the dimensions given. Water fills the tank at a rate of{' '}
          <Katex tex="0.05\pi" /> m<sup>3</sup>/min, but no water leaks out.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={bucketSrc}
            alt="A bucket-shaped tank, 1 m tall, with a top radius of 0.75 m and a base radius of 0.5 m, with the water depth x measured up from the base — from the original 2014 VCAA exam paper"
            className="w-full max-w-[360px]"
          />
        </div>
        <p>
          When filled to a depth of <Katex tex="x" /> metres, the volume of water,{' '}
          <Katex tex="V" /> cubic metres, in the tank is given by{' '}
          <Katex tex="V=\tfrac{\pi}{48}\left(x^3+6x^2+12x\right)" />.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Separable DE"
        marks={5}
        statement={
          <>
            Given that the tank is initially empty, find the depth, <Katex tex="x" /> metres,
            as a function of time <Katex tex="t" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
