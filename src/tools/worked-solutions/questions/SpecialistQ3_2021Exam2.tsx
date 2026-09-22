// 2021 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). A vessel made by
// rotating y = x³ − 8 about the y-axis, leaking at a rate proportional to √h. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork. Answers
// checked with sympy/scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import vesselSrc from './spec-2021e2-q3-vessel.png'

const EXAM_AI: SAExaminerStats = { marks: [20, 80], average: 0.8 }

const EXAM_AII: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      A variety of equivalent forms were accepted. A common error concerned notation, such
      as incorrectly placing the 32 outside the bracket, or using <Katex tex="h" /> rather
      than <Katex tex="H" />.
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

const EXAM_C: SAExaminerStats = { marks: [77, 9, 2, 12], average: 0.5 }

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^3-8 \implies x = (y+8)^{1/3}" />,
    reason: <>Rotating about the <Katex tex="y" />-axis, so the radius of each disc must be written in terms of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^H(y+8)^{2/3}\,dy}" />,
    reason: <>Disc volume <Katex tex="\pi x^2\,dy" />, with the terminals the question gives.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\int(y+8)^{2/3}dy = \frac{3}{5}(y+8)^{5/3}" />,
    reason: <>Power rule: divide by <Katex tex="\tfrac53" />.</>,
  },
  {
    working: <Katex display tex="V = \pi\left[\tfrac35(y+8)^{5/3}\right]_0^H = \tfrac{3\pi}{5}\left((H+8)^{5/3}-8^{5/3}\right)" />,
    reason: 'Substituting the terminals.',
  },
  {
    working: <Katex display tex="8^{5/3} = \left(\sqrt[3]{8}\right)^5 = 2^5 = 32" />,
    reason: 'Cube root first, then fifth power.',
  },
  {
    working: <Katex display tex="\boxed{V = \frac{3\pi}{5}\left((H+8)^{5/3}-32\right)}" />,
    reason: <>The 32 stays <em>inside</em> the bracket — the report's named notation error.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dh}{dt} = \frac{dV}{dt}\times\frac{dh}{dV}" />,
    reason: 'The chain rule, linking the given leak rate to the depth.',
  },
  {
    working: <Katex display tex="V(h) = \frac{3\pi}{5}\left((h+8)^{5/3}-32\right) \implies \frac{dV}{dh} = \pi(h+8)^{2/3}" />,
    reason: <>Differentiating part a(ii) with <Katex tex="H" /> replaced by the current depth <Katex tex="h" />. The <Katex tex="\tfrac35" /> and the <Katex tex="\tfrac53" /> cancel.</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt} = \frac{-4\sqrt h}{\pi(h+8)^{2/3}} \ \checkmark" />,
    reason: <>Dividing the given <Katex tex="\tfrac{dV}{dt}=-4\sqrt h" /> by <Katex tex="\tfrac{dV}{dh}" />. Negative, as it must be for a leak.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{maximise } \left|\frac{dh}{dt}\right| = \frac{4\sqrt h}{\pi(h+8)^{2/3}}" />,
    reason: <>Both effects compete: more depth means faster leaking, but a wider vessel means the level drops more slowly.</>,
  },
  {
    working: <Cas fn="fMax">fMax(4√h/(π(h+8)^(2/3)), h) | h &gt; 0</Cas>,
    reason: <>Or solve <Katex tex="\tfrac{d}{dh}\left(\tfrac{\sqrt h}{(h+8)^{2/3}}\right)=0" /> by hand, which gives <Katex tex="h=24" /> exactly.</>,
  },
  {
    working: <Katex display tex="h = 24: \ \frac{dh}{dt} = \frac{-4\sqrt{24}}{\pi(32)^{2/3}} = -0.6188\ldots" />,
    reason: <><Katex tex="32^{2/3}=\left(2^5\right)^{2/3}=2^{10/3}\approx10.08" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.62 \text{ cm per minute, at a depth of } 24 \text{ cm}}" />,
    reason: <>Both parts are asked for. The rate of <em>decrease</em>, so quoted positive.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{full vessel} \implies h = H = 50" />,
    reason: 'The water is already at the brim, so any net inflow would overflow it.',
  },
  {
    working: <Katex display tex="\text{leak rate at } h=50: \ 4\sqrt{50}" />,
    reason: 'Substituting into the given rate.',
  },
  {
    working: <Katex display tex="\boxed{20\sqrt2 \approx 28.28\ \text{cm}^3\text{ per minute}}" />,
    reason: <><Katex tex="\sqrt{50}=5\sqrt2" />. Adding water at exactly this rate holds the level steady; any faster and it overflows.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dV}{dt} = 40\sqrt2-4\sqrt h" />,
    reason: 'Inflow minus outflow. The inflow is constant; the outflow shrinks as the level falls, so the net rate is positive throughout the refill.',
  },
  {
    working: <Katex display tex="\frac{dh}{dt} = \frac{40\sqrt2-4\sqrt h}{\pi(h+8)^{2/3}}" />,
    reason: <>Same chain rule as part b(i), with the new <Katex tex="\tfrac{dV}{dt}" />.</>,
  },
  {
    working: <Katex display tex="t = \int_{25}^{50}\frac{\pi(h+8)^{2/3}}{40\sqrt2-4\sqrt h}\,dh" />,
    reason: <>Inverting: <Katex tex="\tfrac{dt}{dh}" /> integrated over the depths the level has to climb through.</>,
  },
  {
    working: <Cas fn="nInt">∫(π(h+8)^(2/3)/(40√2 − 4√h), h, 25, 50)</Cas>,
    reason: <>No closed form; note the integrand stays finite because <Katex tex="40\sqrt2>4\sqrt{50}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{31.4 \text{ minutes}}" />,
    reason: <>To one decimal place. Only 12% of students scored all three marks.</>,
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
          <Katex tex="0\le y\le H" />. All lengths are measured in centimetres.
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

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
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
      </PartCard>

      <PartCard
        letter="b.iii"
        marks={1}
        statement={
          <>
            Let <Katex tex="H=50" /> for a particular vessel. The vessel is initially full
            and water continues to leak out at a rate of{' '}
            <Katex tex="4\sqrt h\ \text{cm}^3\text{ min}^{-1}" />. Find the maximum rate at
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
        marks={3}
        statement={
          <>
            The vessel is initially full where <Katex tex="H=50" /> and water leaks out at a
            rate of <Katex tex="4\sqrt h\ \text{cm}^3\text{ min}^{-1}" />. When the depth of
            the water drops to 25 cm, extra water is poured in at a rate of{' '}
            <Katex tex="40\sqrt2\ \text{cm}^3\text{ min}^{-1}" />. Find how long it takes for
            the vessel to refill completely from a depth of 25 cm. Give your answer in
            minutes, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
