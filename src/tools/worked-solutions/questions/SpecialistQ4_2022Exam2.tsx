// 2022 Specialist Mathematics — Exam 2, Section B Question 4 (11 marks). A minigolf ball on
// a sinusoidal path: launch angle, speed, closest approach to the hole, and arc length.
// Question text transcribed from the original paper; the figure is a crop of VCAA's own
// artwork. Answers checked with sympy/scipy and against the VCAA examination report.
// Solution is original.
// Widgets: a. interactives/spec-2022e2-q4a-launch-angle (the velocity arrow along the path, θ
// measured from forward vs the 78.9° complement); c. interactives/spec-2022e2-q4c-closest (the
// ball-to-hole distance near the hole: level with the hole at t = 3.5 is not the minimum).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './spec-2022e2-q4-diagram.png'

const LaunchAngleWidget = lazyWidget(() => import('../interactives/spec-2022e2-q4a-launch-angle'))
const ClosestWidget = lazyWidget(() => import('../interactives/spec-2022e2-q4c-closest'))

const EXAM_A: SAExaminerStats = {
  marks: [44, 21, 35],
  average: 0.9,
  comment: (
    <>
      Other successful approaches involved using the parametric expressions to find{' '}
      <Katex tex="\tfrac{dy}{dx}" /> using the chain rule.
      <br />
      Some students successfully used the scalar product{' '}
      <Katex tex="\underset{\sim}{v}.\underset{\sim}{j}" />. The complementary angle,{' '}
      <Katex tex="\theta=78.9" /> was the most frequent incorrect response.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [22, 5, 73],
  average: 1.5,
  comment: (
    <>
      This question was well responded to, including by some students who did not find the
      velocity in Question 4a.
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
      A number of incorrect student responses incorrectly found the straight-line distance
      between the
      endpoints of the travel. Some students used the Cartesian form of the curve to find the
      integrand, but very few of these used the correct limits, incorrectly using the time
      values.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(t) = \frac{\pi}{8}\cos\!\left(\frac{\pi t}{4}\right)\underset{\sim}{i}+2\underset{\sim}{j}" />,
    reason: <>The direction of the path is the direction of motion, which is the velocity, so differentiate each component. Chain rule on the sine: <Katex tex="\tfrac12\cdot\tfrac\pi4=\tfrac\pi8" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(0) = \frac{\pi}{8}\underset{\sim}{i}+2\underset{\sim}{j}" />,
    reason: <><Katex tex="\cos(0)=1" />. The velocity always points the way the ball is moving, along the path, so this vector gives the direction of the path at <Katex tex="O" />. (The position <Katex tex="\underset{\sim}{r}(0)" /> is the zero vector, so it gives no direction.)</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = \frac{\text{sideways}}{\text{forward}} = \frac{\pi/8}{2} = \frac{\pi}{16}" />,
    reason: <>Draw the velocity as a right-angled triangle: 2 forward and <Katex tex="\tfrac\pi8" /> sideways. The angle is measured from the <em>forward</em> direction <Katex tex="\underset{\sim}{j}" />, so the <Katex tex="\underset{\sim}{j}" /> component is the adjacent side. Putting them the other way up gives <Katex tex="78.9^\circ" />, the angle from the <Katex tex="x" />-axis, which the report says was the most frequent incorrect response.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \tan^{-1}\!\left(\frac{\pi}{16}\right) \approx 11.1^\circ}" />,
    reason: <>Degrees are asked for, so use degree mode (or, in radian mode, <Katex tex="\tan^{-1}\!\left(\tfrac{\pi}{16}\right)\approx0.1939" /> and <Katex tex="0.1939\times\tfrac{180}{\pi}\approx11.1^\circ" />). The diagram confirms a small angle off the <Katex tex="y" />-axis.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(0)\right| = \sqrt{\left(\frac{\pi}{8}\right)^2+2^2}" />,
    reason: <>Speed is the magnitude of velocity.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{\pi^2}{64}+4} = \sqrt{4.1542\ldots}" />,
    reason: <><Katex tex="\tfrac{\pi^2}{64}\approx0.1542" /> — the sideways drift contributes very little.</>,
  },
  {
    working: <Katex display tex="\boxed{2.04 \ \mathrm{ms^{-1}}}" />,
    reason: <>Correct to two decimal places.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(t)\right| = \sqrt{\frac{\pi^2}{64}\cos^2\!\left(\frac{\pi t}{4}\right)+4}" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component is constant, so only the cosine term varies.</>,
  },
  {
    working: <Katex display tex="\text{minimised when } \cos^2\!\left(\frac{\pi t}{4}\right) = 0" />,
    reason: <>No calculus needed: a square can't be negative, so the expression under the root is at least <Katex tex="4" />, and it equals <Katex tex="4" /> exactly when the squared term is zero.</>,
  },
  {
    working: <Katex display tex="\frac{\pi t}{4} = \frac\pi2 \implies t = 2 \quad\left(\text{or } \frac{3\pi}{2}\implies t=6 \notin[0,5]\right)" />,
    reason: <>For <Katex tex="t\in[0,5]" />, <Katex tex="\tfrac{\pi t}{4}\in\left[0,\tfrac{5\pi}{4}\right]" />, and cosine is zero only at <Katex tex="\tfrac\pi2" /> in that interval, so the domain rules out the second solution. The report notes some students with a correct minimum speed gave other incorrect values of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum speed } \sqrt4 = 2\ \mathrm{ms^{-1}}, \text{ at } t = 2\ \text{seconds}}" />,
    reason: <>Both parts must be stated — the report's general comments note some students did not give the required time. At <Katex tex="t=2" /> the ball is momentarily travelling straight forward.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{hole at } (0,7) \implies \underset{\sim}{d}(t) = \underset{\sim}{r}(t)-7\underset{\sim}{j}" />,
    reason: <>The hole is 7 m from <Katex tex="O" /> in the forward direction, as the diagram shows.</>,
  },
  {
    working: <Katex display tex="d(t) = \sqrt{\left(\frac12\sin\!\left(\frac{\pi t}{4}\right)\right)^2+\left(2t-7\right)^2}" />,
    reason: <>The distance from ball to hole at time <Katex tex="t" /> is the magnitude of that vector: subtract 7 from the <Katex tex="\underset{\sim}{j}" /> component, then use Pythagoras.</>,
  },
  {
    working: (
      <Cas fn="fMin">
        fMin(√((sin(πt/4)/2)²+(2t−7)²), t) | 0 ≤ t ≤ 5
      </Cas>
    ),
    reason: <>The distance is a function of one variable, <Katex tex="t" />, so minimise it over the domain. Minimising <Katex tex="d^2" /> instead gives the same <Katex tex="t" /> and avoids the square root, if you prefer.</>,
  },
  {
    working: <Katex display tex="t \approx 3.5169 \ \text{seconds}" />,
    reason: <>Note it is <em>not</em> <Katex tex="t=3.5" />, where <Katex tex="2t=7" /> and the ball is level with the hole: the path is slanting back towards the <Katex tex="y" />-axis, so the ball keeps getting closer for a moment longer. At the true minimum the line from hole to ball is perpendicular to the path, <Katex tex="\left(\underset{\sim}{r}(t)-7\underset{\sim}{j}\right)\cdot\underset{\sim}{\dot r}(t)=0" />, which gives the same <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="d(3.5169\ldots) = 0.18825\ldots" />,
    reason: <>fMin gives the time, not the distance, so substitute back. (The endpoints are far away: <Katex tex="d(0)=7" /> and <Katex tex="d(5)\approx3.02" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{0.188 \ \text{metres}}" />,
    reason: <>Three decimal places, as asked. Using <Katex tex="t=3.5" /> would give <Katex tex="0.191" />, which is wrong at this accuracy.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\left|\underset{\sim}{\dot r}(t)\right|dt" />,
    reason: <>Distance travelled is arc length — the integral of <em>speed</em>, not the straight-line gap between start and finish, which the report notes a number of students found instead.</>,
  },
  {
    working: <Katex display tex="L = \int_0^4\sqrt{\frac{\pi^2}{64}\cos^2\!\left(\frac{\pi t}{4}\right)+4}\;dt" />,
    reason: <>The speed from part b.ii., over the first four seconds. The terminals are <em>times</em>, 0 and 4, because the variable of integration is <Katex tex="t" />. (If you use the Cartesian form <Katex tex="x=\tfrac12\sin\!\left(\tfrac{\pi y}{8}\right)" /> instead, the variable is <Katex tex="y" />, so the terminals become <Katex tex="y=0" /> to <Katex tex="y=8" />; the report notes very few students who used the Cartesian form used the correct limits.)</>,
  },
  {
    working: (
      <Cas fn="nInt">
        nInt(√((π²/64)·cos(πt/4)²+4), t, 0, 4)
      </Cas>
    ),
    reason: <>This can't be integrated by hand, so a numerical integral is the intended route.</>,
  },
  {
    working: <Katex display tex="\boxed{8.077 \ \text{metres}}" />,
    reason: <>Three decimal places. Sanity check: <Katex tex="\underset{\sim}{r}(4)=8\underset{\sim}{j}" />, so the straight-line distance from <Katex tex="O" /> is exactly 8 m. The ball weaves sideways on the way, so the distance travelled must be a little more than that.</>,
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
            alt="A curved path leaving the origin at a small angle θ to the y-axis, bulging to the right and returning to cross the y-axis just above the point (0, 7) marked on it — from the original 2022 VCAA exam paper"
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

      <DetailOnly>
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
              The one trap is the direction the angle is measured from. Here{' '}
              <Katex tex="\theta" /> is measured from the forward direction{' '}
              <Katex tex="\underset{\sim}{j}" /> (the <Katex tex="y" />-axis), not from the{' '}
              <Katex tex="x" />-axis, so <Katex tex="\theta" /> is small. A quick look at the
              diagram settles it before any arithmetic.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Launch Angle"
        marks={2}
        statement={<>Find <Katex tex="\theta" /> correct to one decimal place.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="The path's direction is the velocity, and θ is measured from forward, not from the x-axis">
          <LaunchAngleWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Speed"
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
        topic="Minimum Speed"
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
        topic="Minimum Distance"
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
        <Explore title="The closest approach isn't when the ball is level with the hole">
          <ClosestWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d"
        topic="Distance Travelled"
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
