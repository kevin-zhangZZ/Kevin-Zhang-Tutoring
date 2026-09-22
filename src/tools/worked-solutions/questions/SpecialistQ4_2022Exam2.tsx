// 2022 Specialist Mathematics — Exam 2, Section B Question 4 (11 marks). A minigolf ball on
// a sinusoidal path: launch angle, speed, closest approach to the hole, and arc length.
// Question text transcribed from the original paper; the figure is a crop of VCAA's own
// artwork. Answers checked with sympy/scipy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import diagramSrc from './spec-2022e2-q4-diagram.png'

const EXAM_A: SAExaminerStats = {
  marks: [44, 21, 35],
  average: 0.9,
  comment: (
    <>
      Other successful approaches involved using the parametric expressions to find{' '}
      <Katex tex="\tfrac{dy}{dx}" /> using the chain rule, or the scalar product{' '}
      <Katex tex="\underset{\sim}{v}\cdot\underset{\sim}{j}" />. The complementary angle,{' '}
      <Katex tex="\theta=78.9" />, was the most frequent incorrect response.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [22, 5, 73],
  average: 1.5,
  comment: (
    <>
      This question was well responded to, including by some students who did not find the
      velocity in part a.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [43, 8, 49],
  average: 1.1,
  comment: <>Some students with a correct minimum speed gave other incorrect values of <Katex tex="t" />.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [50, 3, 9, 38],
  average: 1.4,
  comment: (
    <>
      A small number of students approached the question using perpendicularity, but this was
      less frequently successful.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [49, 6, 45],
  average: 1.0,
  comment: (
    <>
      A number of incorrect student responses found the straight-line distance between the
      endpoints of the travel. Some students used the Cartesian form of the curve to find the
      integrand, but very few of these used the correct limits, incorrectly using the time
      values.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(t) = \frac{\pi}{8}\cos\!\left(\frac{\pi t}{4}\right)\underset{\sim}{i}+2\underset{\sim}{j}" />,
    reason: <>Differentiating each component; <Katex tex="\tfrac12\cdot\tfrac\pi4=\tfrac\pi8" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(0) = \frac{\pi}{8}\underset{\sim}{i}+2\underset{\sim}{j}" />,
    reason: <><Katex tex="\cos(0)=1" />. This vector points along the path as the ball leaves O.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = \frac{\text{sideways}}{\text{forward}} = \frac{\pi/8}{2} = \frac{\pi}{16}" />,
    reason: <>The angle is measured from the <em>forward</em> direction <Katex tex="\underset{\sim}{j}" />, so the <Katex tex="\underset{\sim}{j}" /> component is the adjacent side. Putting them the other way up gives <Katex tex="78.9^\circ" />, the report's most common wrong answer.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta \approx 11.1^\circ}" />,
    reason: <><Katex tex="\arctan\!\left(\tfrac{\pi}{16}\right)=0.1939" /> radians. Degrees are asked for, and the diagram confirms a small angle off the <Katex tex="y" />-axis.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(0)\right| = \sqrt{\left(\frac{\pi}{8}\right)^2+2^2}" />,
    reason: 'Speed is the magnitude of velocity.',
  },
  {
    working: <Katex display tex="= \sqrt{\frac{\pi^2}{64}+4} = \sqrt{4.1542\ldots}" />,
    reason: <><Katex tex="\tfrac{\pi^2}{64}\approx0.1542" /> — the sideways drift contributes very little.</>,
  },
  {
    working: <Katex display tex="\boxed{2.04 \ \mathrm{ms^{-1}}}" />,
    reason: 'Correct to two decimal places.',
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(t)\right| = \sqrt{\frac{\pi^2}{64}\cos^2\!\left(\frac{\pi t}{4}\right)+4}" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component is constant, so only the cosine term varies.</>,
  },
  {
    working: <Katex display tex="\text{minimised when } \cos^2\!\left(\frac{\pi t}{4}\right) = 0" />,
    reason: 'No calculus needed: the expression under the root is smallest when the squared term vanishes.',
  },
  {
    working: <Katex display tex="\frac{\pi t}{4} = \frac\pi2 \implies t = 2 \quad\left(\text{or } \frac{3\pi}{2}\implies t=6 \notin[0,5]\right)" />,
    reason: <>The domain <Katex tex="t\in[0,5]" /> rules out the second solution — this is where the report says students gave other values of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum speed } 2\ \mathrm{ms^{-1}}, \text{ at } t = 2\ \text{seconds}}" />,
    reason: <>Both parts must be stated; the report lists the missing time as one of the paper's recurring "didn't answer every aspect" slips. At <Katex tex="t=2" /> the ball is momentarily travelling straight forward.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{hole at } (0,7) \implies \underset{\sim}{d}(t) = \underset{\sim}{r}(t)-7\underset{\sim}{j}" />,
    reason: <>The hole is 7 m from <Katex tex="O" /> in the forward direction, as the diagram shows.</>,
  },
  {
    working: <Katex display tex="d(t) = \sqrt{\left(\frac12\sin\!\left(\frac{\pi t}{4}\right)\right)^2+\left(2t-7\right)^2}" />,
    reason: 'The distance from ball to hole at time t.',
  },
  {
    working: (
      <Cas fn="fMin">
        fMin(√((sin(πt/4)/2)²+(2t−7)²), t) | 0 ≤ t ≤ 5
      </Cas>
    ),
    reason: <>Minimising the distance directly. Minimising <Katex tex="d^2" /> instead gives the same <Katex tex="t" /> and avoids the square root, if you prefer.</>,
  },
  {
    working: <Katex display tex="t \approx 3.5169 \ \text{seconds}" />,
    reason: <>Note it is <em>not</em> <Katex tex="t=3.5" />, where <Katex tex="2t=7" /> — the sideways term shifts the minimum slightly.</>,
  },
  {
    working: <Katex display tex="\boxed{0.188 \ \text{metres}}" />,
    reason: <>Three decimal places, as asked. The ball misses the hole by under 19 cm.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\left|\underset{\sim}{\dot r}(t)\right|dt" />,
    reason: <>Distance travelled is arc length — the integral of <em>speed</em>, not the straight-line gap between start and finish, which is the report's named wrong approach.</>,
  },
  {
    working: <Katex display tex="L = \int_0^4\sqrt{\frac{\pi^2}{64}\cos^2\!\left(\frac{\pi t}{4}\right)+4}\;dt" />,
    reason: <>The speed from part b.ii., over the first four seconds. The terminals are <em>times</em> because the variable of integration is <Katex tex="t" />.</>,
  },
  {
    working: (
      <Cas fn="nInt">
        nInt(√((π²/64)·cos(πt/4)²+4), t, 0, 4)
      </Cas>
    ),
    reason: 'No elementary antiderivative exists, so a numerical integral is the intended route.',
  },
  {
    working: <Katex display tex="\boxed{8.077 \ \text{metres}}" />,
    reason: <>Three decimal places. Sanity check: the forward displacement alone is <Katex tex="2\times4=8" /> m, and the weaving adds only a few centimetres — exactly what the answer shows.</>,
  },
]

export default function SpecialistQ4_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (11 marks)</p>
        <p>
          A student is playing minigolf on a day when there is a very strong wind, which
          affects the path of the ball. The student hits the ball so that at time{' '}
          <Katex tex="t=0" /> seconds it passes through a fixed origin <Katex tex="O" />. The
          student aims to hit the ball into a hole that is 7 m from <Katex tex="O" />. When
          the ball passes through <Katex tex="O" />, its path makes an angle of{' '}
          <Katex tex="\theta" /> degrees to the forward direction, as shown in the diagram
          below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={diagramSrc}
            alt="A curved path leaving the origin at a small angle θ to the y-axis, bulging to the right and returning to cross near the point (0, 7) marked on the y-axis — from the original 2022 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
        <p>
          The path of the ball <Katex tex="t" /> seconds after passing through{' '}
          <Katex tex="O" /> is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\tfrac12\sin\!\left(\tfrac{\pi t}{4}\right)\underset{\sim}{i}+2t\,\underset{\sim}{j}" />{' '}
          for <Katex tex="t\in[0,5]" />, where <Katex tex="\underset{\sim}{i}" /> is a unit
          vector to the right, perpendicular to the forward direction,{' '}
          <Katex tex="\underset{\sim}{j}" /> is a unit vector in the forward direction and
          displacement components are measured in metres.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Every part of this question is one of the four standard things you do to a
            position vector: differentiate it (a.), take the magnitude of that (b.), minimise
            a distance (c.), and integrate the speed (d.). Knowing which of{' '}
            <Katex tex="\underset{\sim}{r}" />, <Katex tex="\left|\underset{\sim}{r}\right|" />,{' '}
            <Katex tex="\underset{\sim}{\dot r}" /> and{' '}
            <Katex tex="\left|\underset{\sim}{\dot r}\right|" /> a phrase is asking for is most
            of the work.
          </p>
          <p>
            The one trap is the direction the angle is measured from. Here the{' '}
            <Katex tex="\underset{\sim}{j}" /> direction is "forward", not the{' '}
            <Katex tex="x" />-axis, so <Katex tex="\theta" /> is small. A quick look at the
            diagram settles it before any arithmetic.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={<>Find <Katex tex="\theta" /> correct to one decimal place.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        marks={2}
        statement={
          <>
            Find the speed of the ball as it passes through <Katex tex="O" />. Give your
            answer in metres per second, correct to two decimal places.
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
            Find the minimum speed of the ball, in metres per second, and the time, in
            seconds, at which this minimum speed occurs.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Find the minimum distance from the ball to the hole. Give your answer in metres,
            correct to three decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            How far does the ball travel during the first four seconds after passing through{' '}
            <Katex tex="O" />? Give your answer in metres, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
