// 2025 Specialist NHT — Exam 2, Section B Question 4 (10 marks). The NHT report gives sample
// answers only, with no statistics. A duck swims on an elliptical path (Cartesian equation,
// distance travelled in the first 5 s); a drone's velocity is integrated to its position, its
// constants found so it meets the duck at t = 10, and the time the duck is closest to the drone's
// starting point. Question text transcribed from the original paper (no diagram; the 2025 NHT paper
// has no text layer, so it was read from the page images). Part e.'s figure
// (spec-2025nhte2-q4e-closest.png) is this site's own explanatory graph, drawn with matplotlib — VCAA
// printed no figure. Answers checked with sympy/scipy and against the VCAA report's sample answers,
// which agree: a. (x − 2)²/25 + (y − 1)²/36 = 1; b. 27.4 m; d. a = −4.3, b = −6.5, c = −0.3;
// e. t = 4.2 s. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import closestSrc from './spec-2025nhte2-q4e-closest.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = 2-5\cos(t), \qquad y = 1-6\sin(t)" />,
    reason: <>Read the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components off the position vector: these are the parametric equations of the path.</>,
  },
  {
    working: <Katex display tex="\cos(t) = \frac{2-x}{5}, \qquad \sin(t) = \frac{1-y}{6}" />,
    reason: <>To remove <Katex tex="t" />, make <Katex tex="\cos(t)" /> and <Katex tex="\sin(t)" /> the subjects, ready for <Katex tex="\cos^2(t)+\sin^2(t)=1" />.</>,
  },
  {
    working: <Katex display tex="\frac{(2-x)^2}{25} + \frac{(1-y)^2}{36} = 1" />,
    reason: <>Square and add: the Pythagorean identity eliminates <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{(x-2)^2}{25} + \frac{(y-1)^2}{36} = 1}" />,
    reason: <><Katex tex="(2-x)^2=(x-2)^2" />, so this is an ellipse centred at <Katex tex="(2,1)" /> with semi-axes 5 (horizontal) and 6 (vertical).</>,
    more: <>The domain <Katex tex="0\le t\le10" /> is longer than one period <Katex tex="2\pi\approx6.28" />, so the duck covers the whole ellipse (and then some): no part of the curve needs to be excluded. Check: <Katex tex="t=0" /> gives <Katex tex="(-3,1)" />, and <Katex tex="\tfrac{25}{25}+0=1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}_D(t) = 5\sin(t)\,\underset{\sim}{i} - 6\cos(t)\,\underset{\sim}{j}" />,
    reason: <>Distance along the path is the integral of speed, so first differentiate the position vector to get the velocity.</>,
  },
  {
    working: <Katex display tex="\left|\dot{\underset{\sim}{r}}_D(t)\right| = \sqrt{25\sin^2(t)+36\cos^2(t)}" />,
    reason: <>Speed is the magnitude of the velocity.</>,
  },
  {
    working: (
      <>
        <Katex display tex="s = \int_0^5 \sqrt{25\sin^2(t)+36\cos^2(t)}\,dt" />
        <Cas fn="nInt">nInt(√(25sin(t)²+36cos(t)²), t, 0, 5)</Cas>
      </>
    ),
    reason: <>The speed is never zero, so the duck never turns back and the integral of speed is the distance travelled. It has no elementary antiderivative, so evaluate it numerically.</>,
  },
  {
    working: <Katex display tex="\boxed{27.4 \text{ m}}" />,
    reason: <><Katex tex="27.418\ldots" />, correct to one decimal place.</>,
    more: <>Sanity check: the ellipse&apos;s perimeter is about 34.6 m, and 5 s is <Katex tex="\tfrac{5}{2\pi}\approx0.8" /> of a lap, so roughly <Katex tex="0.8\times34.6\approx27.5" /> m. Don&apos;t confuse this with the displacement <Katex tex="\left|\underset{\sim}{r}_D(5)-\underset{\sim}{r}_D(0)\right|" />, which is only the straight-line gap between start and finish.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{r}_R(t) = \int \Big( &(at+20)\,\underset{\sim}{i} + (bt+30)\,\underset{\sim}{j} \\ &+ (ct^2+2t)\,\underset{\sim}{k} \Big)\, dt\end{aligned}" />,
    reason: <>Position is the antiderivative of velocity, one component at a time.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= \left(\tfrac{a}{2}t^2+20t\right)\underset{\sim}{i} + \left(\tfrac{b}{2}t^2+30t\right)\underset{\sim}{j} \\ &\quad + \left(\tfrac{c}{3}t^3+t^2\right)\underset{\sim}{k} + \underset{\sim}{d}\end{aligned}" />,
    reason: <>The constant of integration is a constant <em>vector</em> <Katex tex="\underset{\sim}{d}" />, not a number.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}_R(0) = \underset{\sim}{d} = 20\underset{\sim}{i}+30\underset{\sim}{j}" />,
    reason: <>At <Katex tex="t=0" /> every term with <Katex tex="t" /> vanishes, and the initial position is given as <Katex tex="20\underset{\sim}{i}+30\underset{\sim}{j}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{r}_R(t) &= \left(\tfrac{a}{2}t^2+20t+20\right)\underset{\sim}{i} \\ &\quad + \left(\tfrac{b}{2}t^2+30t+30\right)\underset{\sim}{j} \\ &\quad +\left(\tfrac{c}{3}t^3+t^2\right)\underset{\sim}{k}\end{aligned}" />,
    reason: <>As required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_R(10) = \underset{\sim}{r}_D(10)" />,
    reason: <>&ldquo;Reaches the duck when <Katex tex="t=10" />&rdquo; means both are at the same point at the same time. Equate the components one at a time. The duck is on the lake, so its <Katex tex="\underset{\sim}{k}" /> component is 0.</>,
  },
  {
    working: <Katex display tex="\tfrac{c}{3}(10)^3 + 10^2 = 0 \implies c = -\tfrac{3}{10} = -0.3" />,
    reason: <><Katex tex="\underset{\sim}{k}" />: the drone must come down to height 0.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\tfrac{a}{2}(10)^2 + 20(10) + 20 = 2-5\cos(10) \\ \implies a = \tfrac{-218-5\cos(10)}{50}\end{gathered}" />,
    reason: <><Katex tex="\underset{\sim}{i}" />: the left side simplifies to <Katex tex="50a+220=2-5\cos(10)" />, so subtract 220 and divide by 50. Calculator in radians.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\tfrac{b}{2}(10)^2 + 30(10) + 30 = 1-6\sin(10) \\ \implies b = \tfrac{-329-6\sin(10)}{50}\end{gathered}" />,
    reason: <><Katex tex="\underset{\sim}{j}" />: the left side simplifies to <Katex tex="50b+330=1-6\sin(10)" />, so subtract 330 and divide by 50.</>,
  },
  {
    working: <Katex display tex="\boxed{a \approx -4.3, \quad b \approx -6.5, \quad c = -0.3}" />,
    reason: <><Katex tex="a=-4.276\ldots" />, <Katex tex="b=-6.514\ldots" />, each correct to one decimal place.</>,
    more: <>Sanity check: the drone starts at <Katex tex="(20,30)" />, up and to the right of the duck&apos;s ellipse, moving further away at 20 and 30 m/s, so <Katex tex="a" /> and <Katex tex="b" /> must be negative (decelerating, then reversing) to bring it back to the duck near <Katex tex="(6.2,\ 4.3)" />. A negative <Katex tex="c" /> likewise makes the climb <Katex tex="ct^2+2t" /> turn into a descent.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\underset{\sim}{r}_D(t) - \left(20\underset{\sim}{i}+30\underset{\sim}{j}\right) \\ &= \left(-18-5\cos(t)\right)\underset{\sim}{i} + \left(-29-6\sin(t)\right)\underset{\sim}{j}\end{aligned}" />,
    reason: <>The drone&apos;s <em>initial</em> position is the fixed point <Katex tex="(20,30)" />. The vector from it to the duck is the duck&apos;s position minus it.</>,
  },
  {
    working: <Katex display tex="D(t) = \sqrt{\left(18+5\cos(t)\right)^2 + \left(29+6\sin(t)\right)^2}" />,
    reason: <>The distance is the magnitude of that vector (signs inside the squares don&apos;t matter).</>,
  },
  {
    working: (
      <>
        <Cas fn="fMin">fMin(D(t), t) | 0 ≤ t ≤ 10</Cas>
        <Katex display tex="t = 4.2113\ldots" />
      </>
    ),
    reason: <>Minimise <Katex tex="D" /> over the duck&apos;s whole domain <Katex tex="0\le t\le10" />, and give the CAS that domain: the motion repeats every <Katex tex="2\pi" /> seconds, so without it the CAS could return a closest time outside the domain (such as <Katex tex="4.21-2\pi\approx-2.07" />).</>,
    more: <>
      Without fMin, solve <Katex tex="D'(t)=0" />. Since <Katex tex="D" /> is positive, this is the same as <Katex tex="\tfrac{d}{dt}D^2=0" />, which avoids the square root: <Katex tex="\tfrac{d}{dt}D^2 = 348\cos(t)-180\sin(t)+22\sin(t)\cos(t)=0" />. That derivative is zero at <Katex tex="t\approx1.12,\ 4.21,\ 7.40" /> in <Katex tex="[0,10]" />: 1.12 and 7.40 (one period apart) are the <em>farthest</em> point, 4.21 the closest. The next closest moment, <Katex tex="4.21+2\pi\approx10.49" />, is past <Katex tex="t=10" />. Endpoints: <Katex tex="D(0)=\sqrt{1370}\approx37.0" />, <Katex tex="D(10)\approx29.2" />, both more than <Katex tex="D(4.21)\approx28.4" />.
      <span className="block mt-2 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={closestSrc}
          alt="This site's own explanatory graph, not from the VCAA paper: the duck's elliptical path centred at (2, 1), the drone's starting point (20, 30), and a dashed line of about 28.4 m from it to the closest point on the ellipse, reached at t ≈ 4.2"
          className="w-full max-w-[340px]" />
      </span>
    </>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 4.2 \text{ s}}" />,
    reason: <>Correct to one decimal place. At that moment the duck is at about <Katex tex="(4.4,\ 6.3)" />, the point on the ellipse nearest the drone&apos;s starting point <Katex tex="(20,30)" />.</>,
  },
]

export default function SpecialistQ4_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (10 marks)</p>
        <p>
          A duck swims on a lake. The duck&apos;s position vector, relative to an origin,{' '}
          <Katex tex="O" />, at time <Katex tex="t" /> seconds, is given by
        </p>
        <Katex display tex="\begin{aligned}\underset{\sim}{r}_D(t) &= \left(2-5\cos(t)\right)\underset{\sim}{i} \\ &\quad + \left(1-6\sin(t)\right)\underset{\sim}{j}, \\ &\text{where } 0 \le t \le 10.\end{aligned}" />
        <p>Displacement components are measured in metres.</p>
      </div>

      <PartCard
        letter="a"
        topic="Cartesian Equation"
        marks={2}
        statement={<>Find the Cartesian equation of the path of the duck.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Distance Travelled"
        marks={2}
        statement={
          <>
            How far does the duck travel along the path in the first 5 seconds?
            <br />
            Give your answer in metres correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          The duck is to be monitored by a drone. The drone is dispatched at <Katex tex="t=0" /> and
          its velocity vector is given by
        </p>
        <Katex display tex="\begin{aligned}\dot{\underset{\sim}{r}}_R(t) &= (at+20)\,\underset{\sim}{i} + (bt+30)\,\underset{\sim}{j} \\ &\quad + \left(ct^2+2t\right)\underset{\sim}{k}, \\ &\text{where } t \ge 0.\end{aligned}" />
        <p>
          Components are measured in metres per second and <Katex tex="a" />, <Katex tex="b" /> and{' '}
          <Katex tex="c" /> are real constants.
        </p>
        <p>
          The initial position of the drone is <Katex tex="20\underset{\sim}{i}+30\underset{\sim}{j}" />{' '}
          relative to the origin <Katex tex="O" /> used for the duck&apos;s position vector.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Position from Velocity"
        marks={1}
        statement={
          <>
            Use integration to show that the position vector of the drone is
            <Katex display tex="\begin{aligned}\underset{\sim}{r}_R(t) &= \left(\tfrac{a}{2}t^2+20t+20\right)\underset{\sim}{i} \\ &\quad + \left(\tfrac{b}{2}t^2+30t+30\right)\underset{\sim}{j} \\ &\quad +\left(\tfrac{c}{3}t^3+t^2\right)\underset{\sim}{k}.\end{aligned}" />
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Meeting Point"
        marks={2}
        statement={
          <>
            Find the values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> if the drone
            reaches the duck when <Katex tex="t=10" />.
            <br />
            Give your answers correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Minimum Distance"
        marks={3}
        statement={
          <>
            At what time is the duck closest to the initial position of the drone?
            <br />
            Give your answer in seconds correct to one decimal place.
          </>
        }
      >
        <DetailOnly>
          <Background>
            <p>
              The drone has nothing to do with this part except its starting point,{' '}
              <Katex tex="(20,30)" />, which stays fixed. The question is about the duck alone: when is
              it nearest that fixed point? Write the distance as a function of <Katex tex="t" /> and
              minimise it over <Katex tex="0\le t\le10" />, remembering that the duck goes round the
              ellipse more than once in that time.
            </p>
          </Background>
        </DetailOnly>
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
