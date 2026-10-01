// 2021 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). A vessel made by
// rotating y = x³ − 8 about the y-axis, leaking at a rate proportional to √h. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork. Answers
// checked with sympy/scipy and against the VCAA examination report. Solution is original.
//
// Interactive widgets (interactives/spec-2021e2-q3*): b.ii. the rate of decrease as leak rate ÷
// surface area, peaking at h = 24, with a toggle graphing dh/dt itself (the fastest decrease is its
// minimum); c. the refill time as the area under dt/dh from 25 to 50, with an "ignore the leak" toggle.
// No widget for b.iii: the lost mark was stopping at 4√h instead of substituting h = 50, which the
// working addresses directly.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import vesselSrc from './spec-2021e2-q3-vessel.png'

const FastestFallWidget = lazyWidget(() => import('../interactives/spec-2021e2-q3bii-fastest-fall'))
const RefillTimeWidget = lazyWidget(() => import('../interactives/spec-2021e2-q3c-refill-time'))

const EXAM_AI: SAExaminerStats = { marks: [20, 80], average: 0.8 }

const EXAM_AII: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      A variety of equivalent forms were accepted. A common error concerned notation, such
      as incorrectly placing 32 outside the bracket or using <Katex tex="h" /> rather than{' '}
      <Katex tex="H" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [10, 12, 77],
  average: 1.7,
  comment: <>Students handled this question well, correctly applying the chain rule to obtain the required form.</>,
}

const EXAM_BII: SAExaminerStats = { marks: [37, 41, 22], average: 0.9 }

const EXAM_BIII: SAExaminerStats = {
  marks: [77, 23],
  average: 0.3,
  comment: (
    <>
      Equivalent forms, such as <Katex tex="4\sqrt{50}" />, were accepted. A number of
      students did not proceed past writing <Katex tex="4\sqrt h" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [77, 9, 2, 12],
  average: 0.5,
  comment: (
    <>
      Obtaining this answer required an appreciation of the physical situation, sound
      calculus skills and careful use of a CAS. Relatively few students made a productive
      start. Of those who did, about half reached the correct answer.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^3-8 \implies x = (y+8)^{1/3}" />,
    reason: <>Rotating about the <Katex tex="y" />-axis, so each horizontal slice is a disc whose radius is the <Katex tex="x" />-value. Rearrange to write that radius in terms of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^H(y+8)^{2/3}\,dy}" />,
    reason: <>Volume about the <Katex tex="y" />-axis is <Katex tex="\pi\int x^2\,dy" />, and <Katex tex="x^2=\left((y+8)^{1/3}\right)^2=(y+8)^{2/3}" />. The vessel runs from its base at <Katex tex="y=0" /> up to <Katex tex="y=H" />.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\int(y+8)^{2/3}dy = \frac{3}{5}(y+8)^{5/3}" />,
    reason: <>Add 1 to the power (<Katex tex="\tfrac23+1=\tfrac53" />) and divide by the new power. This works directly because <Katex tex="y+8" /> is linear with coefficient 1.</>,
  },
  {
    working: <Katex display tex="V = \pi\left[\tfrac35(y+8)^{5/3}\right]_0^H = \tfrac{3\pi}{5}\left((H+8)^{5/3}-8^{5/3}\right)" />,
    reason: <>Substituting the terminals <Katex tex="H" /> and <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="8^{5/3} = \left(\sqrt[3]{8}\right)^5 = 2^5 = 32" />,
    reason: <>Cube root first, then fifth power.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{3\pi}{5}\left((H+8)^{5/3}-32\right)}" />,
    reason: <>The 32 stays <em>inside</em> the bracket, and the answer is in terms of capital <Katex tex="H" /> (the vessel&apos;s height), not <Katex tex="h" />. The report names both as common notation errors.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dh}{dt} = \frac{dV}{dt}\times\frac{dh}{dV}" />,
    reason: <>We are given <Katex tex="\tfrac{dV}{dt}" /> and want <Katex tex="\tfrac{dh}{dt}" />, so link them through <Katex tex="V" /> with the chain rule. That needs <Katex tex="V" /> as a function of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="V = \frac{3\pi}{5}\left((h+8)^{5/3}-32\right) \implies \frac{dV}{dh} = \pi(h+8)^{2/3}" />,
    reason: <>The water fills the vessel from <Katex tex="y=0" /> up to <Katex tex="y=h" />, so its volume is part a.ii. with <Katex tex="H" /> replaced by the depth <Katex tex="h" />. Differentiating, the <Katex tex="\tfrac35" /> and the <Katex tex="\tfrac53" /> cancel. (<Katex tex="\pi(h+8)^{2/3}" /> is the area of the water&apos;s surface, a disc of radius <Katex tex="x=(h+8)^{1/3}" />.)</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt} = -4\sqrt h\times\frac{1}{\pi(h+8)^{2/3}}" />,
    reason: <><Katex tex="\tfrac{dh}{dV}" /> is the reciprocal of <Katex tex="\tfrac{dV}{dh}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt} = \frac{-4\sqrt h}{\pi(h+8)^{2/3}}}" />,
    reason: <>Negative, as it must be while the vessel leaks. As required.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{maximise } {-\frac{dh}{dt}} = \frac{4\sqrt h}{\pi(h+8)^{2/3}}" />,
    reason: <>The depth is falling, so <Katex tex="\tfrac{dh}{dt}" /> is negative. The rate of <em>decrease</em> is its size, <Katex tex="-\tfrac{dh}{dt}" />, so that is what to maximise. (The largest value of <Katex tex="\tfrac{dh}{dt}" /> itself is 0, at <Katex tex="h=0" />: an empty vessel.) Two effects compete: deeper water leaks faster, but higher up the vessel is wider, so each cm³ lost lowers the level less. Slide <Katex tex="h" /> in the diagram below to watch them trade places.</>,
  },
  {
    working: (
      <>
        <Cas fn="fMax">fMax(4√h/(π(h+8)^(2/3)), h) | h &gt; 0</Cas>
        <Katex display tex="h = 24" />
      </>
    ),
    reason: <>fMax gives the depth where the maximum occurs, not the maximum rate. By hand, the product rule on <Katex tex="\sqrt h\,(h+8)^{-2/3}" /> gives a zero derivative when <Katex tex="\tfrac12(h+8)=\tfrac23h" />, i.e. <Katex tex="3h+24=4h" />, so <Katex tex="h=24" />. It is a maximum: the rate is 0 at <Katex tex="h=0" /> and shrinks back towards 0 as <Katex tex="h" /> grows (assuming the vessel is at least 24 cm tall).</>,
  },
  {
    working: <Katex display tex="h = 24: \ {-\frac{dh}{dt}} = \frac{4\sqrt{24}}{\pi(32)^{2/3}} = 0.6188\ldots" />,
    reason: <>Substitute <Katex tex="h=24" /> back in to get the rate itself. <Katex tex="32^{2/3}=\left(2^5\right)^{2/3}=2^{10/3}\approx10.08" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\boxed{0.62 \text{ cm per minute}}" />
        <Katex display tex="\boxed{\text{at a depth of } 24 \text{ cm}}" />
      </>
    ),
    reason: <>The question asks for two numbers, the rate and the depth; the report notes that some students gave only one. The rate of decrease is quoted as a positive number.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{full vessel} \implies h = H = 50" />,
    reason: <>The vessel starts full, so the water is at the brim.</>,
  },
  {
    working: <Katex display tex="\text{rate in} \le \text{rate out at } h=50" />,
    reason: <>If water is added faster than it leaks out at the brim, the volume increases and a full vessel overflows. Added at that rate or slower, the level can&apos;t rise above 50 cm.</>,
  },
  {
    working: <Katex display tex="\text{rate out at } h=50: \ 4\sqrt{50}" />,
    reason: <>The leak rate <Katex tex="4\sqrt h" /> changes with the depth, so it isn&apos;t the answer yet (the report notes a number of students stopped there). Substitute the depth that matters, <Katex tex="h=50" />.</>,
  },
  {
    working: <Katex display tex="\boxed{20\sqrt2 \approx 28.28\ \text{cm}^3\text{ per minute}}" />,
    reason: <><Katex tex="\sqrt{50}=5\sqrt2" />, so <Katex tex="4\sqrt{50}=20\sqrt2" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dV}{dt} = 40\sqrt2-4\sqrt h" />,
    reason: <>Rate in minus rate out: the crack keeps leaking while the water is poured in. The leak is at most <Katex tex="4\sqrt{50}=20\sqrt2" />, less than the <Katex tex="40\sqrt2" /> poured in, so the level rises the whole way.</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt} = \frac{40\sqrt2-4\sqrt h}{\pi(h+8)^{2/3}}" />,
    reason: <>Same chain rule as part b.i.: divide the new <Katex tex="\tfrac{dV}{dt}" /> by <Katex tex="\tfrac{dV}{dh}=\pi(h+8)^{2/3}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dh} = \frac{\pi(h+8)^{2/3}}{40\sqrt2-4\sqrt h}" />,
    reason: <>We want a time, and <Katex tex="\tfrac{dh}{dt}" /> depends only on <Katex tex="h" />, so flip it over: <Katex tex="\tfrac{dt}{dh}" /> is the number of minutes per centimetre of rise.</>,
  },
  {
    working: <Katex display tex="t = \int_{25}^{50}\frac{\pi(h+8)^{2/3}}{40\sqrt2-4\sqrt h}\,dh" />,
    reason: <>Integrate with respect to <Katex tex="h" />, from the depth when pouring starts (25 cm, at <Katex tex="t=0" />) to the full depth (50 cm). The diagram below shades this area as the level rises.</>,
  },
  {
    working: <Cas fn="nInt">∫(π(h+8)^(2/3)/(40√2 − 4√h), h, 25, 50)</Cas>,
    reason: <>A decimal is asked for, so integrate numerically. The integrand stays finite on <Katex tex="[25, 50]" /> because its denominator <Katex tex="40\sqrt2-4\sqrt h" /> is never 0 there.</>,
  },
  {
    working: <Katex display tex="\boxed{31.4 \text{ minutes}}" />,
    reason: <>To one decimal place, as asked.</>,
  },
]

export default function SpecialistQ3_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          A thin-walled vessel is produced by rotating the graph of{' '}
          <Katex tex="y=x^3-8" /> about the <Katex tex="y" />-axis for{' '}
          <Katex tex="0\le y\le H" />.
          <br />
          All lengths are measured in centimetres.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={vesselSrc}
            alt="A vase-shaped vessel of height H formed by rotating a cubic about the y-axis, with the water depth h marked from the base — from the original 2021 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            Write down a definite integral in terms of <Katex tex="y" /> and{' '}
            <Katex tex="H" /> for the volume of the vessel in cubic centimetres.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            Hence, find an expression for the volume of the vessel in terms of{' '}
            <Katex tex="H" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Water is poured into the vessel. However, due to a crack in the base, water leaks
          out at a rate proportional to the square root of the depth <Katex tex="h" /> of
          water in the vessel, that is <Katex tex="\dfrac{dV}{dt}=-4\sqrt h" />, where{' '}
          <Katex tex="V" /> is the volume of water remaining in the vessel, in cubic
          centimetres, after <Katex tex="t" /> minutes.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Related Rates"
        marks={2}
        statement={
          <>
            Show that <Katex tex="\dfrac{dh}{dt}=\dfrac{-4\sqrt h}{\pi(h+8)^{2/3}}" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Maximum Rate"
        marks={2}
        statement={
          <>
            Find the maximum rate, in centimetres per minute, at which the depth of water in
            the vessel decreases, correct to two decimal places, and find the corresponding
            depth in centimetres.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <Explore title="Why the level falls fastest at 24 cm, not at the top">
          <FastestFallWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Maximum Rate"
        marks={1}
        statement={
          <>
            Let <Katex tex="H=50" /> for a particular vessel. The vessel is initially full
            and water continues to leak out at a rate of{' '}
            <Katex tex="4\sqrt h\ \text{cm}^3\text{ min}^{-1}" />.
            <br />
            Find the maximum rate at
            which water can be added, in cubic centimetres per minute, without the vessel
            overflowing.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Time Integral"
        marks={3}
        statement={
          <>
            The vessel is initially full where <Katex tex="H=50" /> and water leaks out at a
            rate of <Katex tex="4\sqrt h\ \text{cm}^3\text{ min}^{-1}" />. When the depth of
            the water drops to 25 cm, extra water is poured in at a rate of{' '}
            <Katex tex="40\sqrt2\ \text{cm}^3\text{ min}^{-1}" />.
            <br />
            Find how long it takes for
            the vessel to refill completely from a depth of 25 cm. Give your answer in
            minutes, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="The refill time is the area under dt/dh, using the net inflow">
          <RefillTimeWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
