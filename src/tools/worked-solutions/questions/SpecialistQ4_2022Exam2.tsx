// 2022 Specialist Mathematics — Exam 2, Section B Question 4 (11 marks). A minigolf ball on
// a sinusoidal path: launch angle, speed, closest approach to the hole, and arc length.
// Question text transcribed from the original paper; the figure is a crop of VCAA's own
// artwork. Answers checked with sympy/scipy and against the VCAA examination report.
// Solution is original.
// Widgets: a. interactives/spec-2022e2-q4a-launch-angle (the velocity arrow along the path, θ
// measured from forward vs the 78.9° complement); c. interactives/spec-2022e2-q4c-closest (the
// ball-to-hole distance near the hole: level with the hole at t = 3.5 is not the minimum; the
// velocity is drawn with its angle to the ball-to-hole segment, 90° only at the minimum).
// Both re-audited 9 Oct 2026 (Concise/Detailed review): numbers rechecked with scipy; b.i, b.ii
// and d. don't qualify (over 40% full marks), so no widgets there. Concise rows keep the reason
// a student needs; report commentary, alternatives and checks sit in each row's `more`.

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
    reason: <>Substitute <Katex tex="t=0" />, using <Katex tex="\cos(0)=1" />. This vector points along the path at <Katex tex="O" />.</>,
    more: <>The velocity always points the way the ball is moving, so at every instant it lies along the path. The position <Katex tex="\underset{\sim}{r}(0)" /> is the zero vector, so it gives no direction at all: the direction of the path at <Katex tex="O" /> has to come from <Katex tex="\underset{\sim}{\dot r}(0)" />.</>,
  },
  {
    working: <Katex display tex="\tan(\theta) = \frac{\text{sideways}}{\text{forward}} = \frac{\pi/8}{2} = \frac{\pi}{16}" />,
    reason: <>Draw the velocity as a right-angled triangle: 2 forward and <Katex tex="\tfrac\pi8" /> sideways. <Katex tex="\theta" /> is measured from the <em>forward</em> direction <Katex tex="\underset{\sim}{j}" />, so the forward 2 is the adjacent side.</>,
    more: (
      <>
        <p>
          Putting the components the other way up,{' '}
          <Katex tex="\tan^{-1}\!\left(\tfrac{2}{\pi/8}\right)\approx78.9^\circ" />, gives the angle from
          the <Katex tex="x" />-axis instead: the complementary angle, which the report says was the
          most frequent incorrect response. VCAA&apos;s diagram draws <Katex tex="\theta" /> as a small
          angle against the <Katex tex="y" />-axis, so a quick look rules out <Katex tex="78.9^\circ" />.
        </p>
        <p>
          The report notes two other successful routes to the same angle. The scalar product with the
          forward unit vector:{' '}
          <Katex tex="\cos(\theta)=\tfrac{\underset{\sim}{\dot r}(0)\cdot\underset{\sim}{j}}{\left|\underset{\sim}{\dot r}(0)\right|}=\tfrac{2}{\sqrt{\pi^2/64+4}}" />.
          Or the chain rule:{' '}
          <Katex tex="\tfrac{dy}{dx}=\tfrac{dy/dt}{dx/dt}=\tfrac{2}{\pi/8}=\tfrac{16}{\pi}" /> at{' '}
          <Katex tex="t=0" />. That gradient is the tangent of the angle from the <Katex tex="x" />-axis,
          so <Katex tex="\theta=90^\circ-\tan^{-1}\!\left(\tfrac{16}{\pi}\right)" />. All three give{' '}
          <Katex tex="11.1^\circ" />.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\theta = \tan^{-1}\!\left(\frac{\pi}{16}\right) \approx 11.1^\circ}" />,
    reason: <><Katex tex="\theta" /> is in degrees, so use degree mode. Correct to one decimal place.</>,
    more: <>In radian mode, <Katex tex="\tan^{-1}\!\left(\tfrac{\pi}{16}\right)\approx0.1939" />, and <Katex tex="0.1939\times\tfrac{180}{\pi}\approx11.1^\circ" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(0)\right| = \sqrt{\left(\frac{\pi}{8}\right)^2+2^2}" />,
    reason: <>Speed is the magnitude of the velocity, here the velocity at <Katex tex="O" /> from part a.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{\pi^2}{64}+4} = \sqrt{4.1542\ldots}" />,
    reason: <>Square each component: <Katex tex="\left(\tfrac\pi8\right)^2=\tfrac{\pi^2}{64}\approx0.1542" /> and <Katex tex="2^2=4" />.</>,
    more: <>The sideways part adds only about <Katex tex="0.15" /> to the <Katex tex="4" /> under the root, so expect a speed only just above the forward speed of <Katex tex="2\ \mathrm{ms^{-1}}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2.04 \ \mathrm{ms^{-1}}}" />,
    reason: <>Correct to two decimal places.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(t)\right| = \sqrt{\frac{\pi^2}{64}\cos^2\!\left(\frac{\pi t}{4}\right)+4}" />,
    reason: <>The speed at any time <Katex tex="t" />. The <Katex tex="\underset{\sim}{j}" /> component is a constant 2, so only the cosine term varies.</>,
  },
  {
    working: <Katex display tex="\text{minimised when } \cos^2\!\left(\frac{\pi t}{4}\right) = 0" />,
    reason: <>No calculus needed: a square can't be negative, so the expression under the root is at least <Katex tex="4" />, and it equals <Katex tex="4" /> exactly when the squared term is zero.</>,
  },
  {
    working: <Katex display tex="\frac{\pi t}{4} = \frac\pi2 \implies t = 2 \quad\left(\text{or } \frac{3\pi}{2}\implies t=6 \notin[0,5]\right)" />,
    reason: <>For <Katex tex="t\in[0,5]" />, <Katex tex="\tfrac{\pi t}{4}\in\left[0,\tfrac{5\pi}{4}\right]" />, and cosine is zero only at <Katex tex="\tfrac\pi2" /> in that interval.</>,
    more: <>The report notes some students with a correct minimum speed gave other incorrect values of <Katex tex="t" />. Write down the interval that <Katex tex="\tfrac{\pi t}{4}" /> covers before solving: the next zero of cosine, <Katex tex="\tfrac{3\pi}{2}" />, needs <Katex tex="t=6" />, which is outside the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum speed } \sqrt4 = 2\ \mathrm{ms^{-1}}, \text{ at } t = 2\ \text{seconds}}" />,
    reason: <>The question asks for the speed <em>and</em> the time, so state both.</>,
    more: <>The report&apos;s general comments list this part as one where some students did not give the required time. At <Katex tex="t=2" /> the sideways velocity is zero, so the ball is momentarily travelling straight forward, at just its forward speed of <Katex tex="2\ \mathrm{ms^{-1}}" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{hole at } (0,7) \implies \underset{\sim}{d}(t) = \underset{\sim}{r}(t)-7\underset{\sim}{j}" />,
    reason: <>The hole is 7 m from <Katex tex="O" /> in the forward direction, at the point <Katex tex="(0,7)" /> marked on VCAA&apos;s diagram. Subtracting its position vector gives the vector from the hole to the ball.</>,
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
    reason: <>The distance is a function of one variable, <Katex tex="t" />, so minimise it over the domain.</>,
    more: <>Minimising <Katex tex="d^2" /> instead gives the same <Katex tex="t" /> and avoids the square root, if you prefer.</>,
  },
  {
    working: <Katex display tex="t \approx 3.5169 \ \text{seconds}" />,
    reason: <>The time of closest approach.</>,
    more: (
      <>
        <p>
          Note it is <em>not</em> <Katex tex="t=3.5" />, where <Katex tex="2t=7" /> and the ball is
          level with the hole. At that instant the forward gap is zero, so moving forward hardly
          changes the distance yet. Meanwhile the path is slanting back towards the{' '}
          <Katex tex="y" />-axis, so the sideways gap is still shrinking, and the ball keeps getting
          closer for a moment longer. Using <Katex tex="t=3.5" /> gives <Katex tex="d\approx0.191" />, which
          is wrong at three decimal places.
        </p>
        <p>
          The perpendicularity approach the report mentions rests on a geometric fact: at the
          closest point, the line from the hole to the ball is perpendicular to the path, so{' '}
          <Katex tex="\left(\underset{\sim}{r}(t)-7\underset{\sim}{j}\right)\cdot\underset{\sim}{\dot r}(t)=0" />.
          Solving that on CAS gives the same <Katex tex="t" />, but it has more places to slip: the
          vector must start at the hole (<Katex tex="\underset{\sim}{r}(t)-7\underset{\sim}{j}" />, not{' '}
          <Katex tex="\underset{\sim}{r}(t)" />), the dot product must use the velocity, and you still
          have to substitute back to get the distance. Minimising <Katex tex="d(t)" /> directly is the
          safer route.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="d(3.5169\ldots) = 0.18825\ldots" />,
    reason: <>fMin gives the time, not the distance, so substitute back.</>,
    more: <>The endpoints are far away (<Katex tex="d(0)=7" /> and <Katex tex="d(5)\approx3.02" />), so this interior value is the minimum over the whole domain.</>,
  },
  {
    working: <Katex display tex="\boxed{0.188 \ \text{metres}}" />,
    reason: <>Three decimal places, as asked.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\left|\underset{\sim}{\dot r}(t)\right|dt" />,
    reason: <>Distance travelled along a curved path is the integral of <em>speed</em> over the time interval, not the straight-line gap between start and finish.</>,
    more: <>This is the mistake the report describes. Integrating speed adds up the distance covered in every small time interval, so it follows the ball&apos;s actual, weaving path; the straight-line gap ignores the weaving.</>,
  },
  {
    working: <Katex display tex="L = \int_0^4\sqrt{\frac{\pi^2}{64}\cos^2\!\left(\frac{\pi t}{4}\right)+4}\;dt" />,
    reason: <>The speed from part b.ii., over the first four seconds. The terminals are <em>times</em>, 0 and 4, because the variable of integration is <Katex tex="t" />.</>,
    more: <>If you use the Cartesian form <Katex tex="x=\tfrac12\sin\!\left(\tfrac{\pi y}{8}\right)" /> instead, the integrand is <Katex tex="\sqrt{1+\left(\tfrac{dx}{dy}\right)^2}" /> with <Katex tex="\tfrac{dx}{dy}=\tfrac{\pi}{16}\cos\!\left(\tfrac{\pi y}{8}\right)" />. The variable of integration is now <Katex tex="y" />, so the terminals must be <Katex tex="y" />-values: <Katex tex="y=0" /> to <Katex tex="y=8" /> (since <Katex tex="y=2t" />). The report notes very few students who used the Cartesian form used the correct limits, incorrectly using the time values; integrating from <Katex tex="y=0" /> to <Katex tex="y=4" /> gives only <Katex tex="4.038" />, the length of the first two seconds of the path.</>,
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
    reason: <>Three decimal places.</>,
    more: <>Sanity check: <Katex tex="\underset{\sim}{r}(4)=8\underset{\sim}{j}" />, so the straight-line distance from <Katex tex="O" /> is exactly 8 m. The ball weaves sideways on the way, so the distance travelled must be a little more than that.</>,
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
              Every part of this question is one of the standard things you do with a position
              vector <Katex tex="\underset{\sim}{r}(t)" />. Most of the work is translating each
              phrase into the right vector quantity:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>
                the direction of the path (a.) is the direction of the velocity{' '}
                <Katex tex="\underset{\sim}{\dot r}(t)" />;
              </li>
              <li>
                speed (b.) is the magnitude of the velocity,{' '}
                <Katex tex="\left|\underset{\sim}{\dot r}(t)\right|" />;
              </li>
              <li>
                the distance from the ball to a fixed point (c.) is the magnitude of the vector
                from that point to the ball,{' '}
                <Katex tex="\left|\underset{\sim}{r}(t)-\underset{\sim}{p}\right|" />, where{' '}
                <Katex tex="\underset{\sim}{p}" /> is the point&apos;s position vector;
              </li>
              <li>
                the distance travelled along the path (d.) is the integral of speed,{' '}
                <Katex tex="\int\left|\underset{\sim}{\dot r}(t)\right|dt" />.
              </li>
            </ul>
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
