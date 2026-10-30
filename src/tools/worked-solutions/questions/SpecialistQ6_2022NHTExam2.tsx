// 2022 Specialist NHT — Exam 2, Section B Question 6 (11 marks). The NHT report gives sample
// answers only, with no statistics. A supply aircraft on a straight descending path
// r(t) = 60t i + (500 − 2t) j: its cartesian equation, its speed, its closest approach to the drop
// position (1800, 0), then a package released under gravity (d.–e.). Question text transcribed from
// the original paper; the diagram is cropped from the original VCAA exam PDF. Parts d.–e. are kept
// under KZ's ruling, with a Background saying the gravity wording sits over current mathematics:
// the package's acceleration is −9.8j, antidifferentiated with the aircraft's velocity as the initial
// velocity. Answers checked with sympy/scipy and against the VCAA report's sample answers:
// a. y = 500 − x/30; b. 60.03; c. 439.76 (VCAA by the scalar resolute onto the normal (2i + 60j)/√3604;
// its note "Alternatively, minimise d = √((60t − 1800)² + (500 − 2t)²)." is the route the working
// uses, with VCAA's in `more`); d. 30.8 m; e. 458.95 m. Widget: interactives/spec-2022nhte2-q6e-release
// (release altitude slider; where the package lands; the falls-straight-down idea failing).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './spec-2022nhte2-q6-diagram.png'

const ReleaseWidget = lazyWidget(() => import('../interactives/spec-2022nhte2-q6e-release'))

const REPORT_C: SAExaminerStats = {
  comment: (
    <>
      Alternatively, minimise <Katex tex="d=\sqrt{\left(60t-1800\right)^2+\left(500-2t\right)^2}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = 60t, \qquad y = 500-2t" />,
    reason: <>Read the parametric equations off the two components of <Katex tex="\underset{\sim}{r}(t)" />.</>,
  },
  {
    working: <Katex display tex="t = \frac{x}{60} \implies y = 500-2\times\frac{x}{60}" />,
    reason: <>Eliminate <Katex tex="t" />: make it the subject of the simpler equation and substitute into the other.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 500-\frac{x}{30}}" />,
    reason: <>A straight line: the aircraft starts at height 500 m above <Katex tex="O" /> and descends 1 m for every 30 m it travels horizontally.</>,
    more: <>For <Katex tex="0\le t\le100" /> the path runs from <Katex tex="x=0" /> to <Katex tex="x=6000" />, so you may add <Katex tex="0\le x\le6000" />; VCAA&apos;s sample answer gives the equation alone.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(t) = 60\underset{\sim}{i}-2\underset{\sim}{j}" />,
    reason: <>Velocity is the derivative of position, component by component.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(t)\right| = \sqrt{60^2+(-2)^2} = \sqrt{3604}" />,
    reason: <>Speed is the magnitude of the velocity. It is the same at every <Katex tex="t" />, since the velocity is constant.</>,
  },
  {
    working: <Katex display tex="\boxed{60.03 \ \mathrm{ms^{-1}}}" />,
    reason: <><Katex tex="\sqrt{3604}=60.0333\ldots" />, correct to two decimal places.</>,
    more: <>Only just over the horizontal 60 m/s, because the descent rate of 2 m/s is tiny beside it.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t)-1800\underset{\sim}{i} = (60t-1800)\underset{\sim}{i}+(500-2t)\underset{\sim}{j}" />,
    reason: <>The drop position is on the ground, 1800 m from <Katex tex="O" />: the point <Katex tex="(1800,0)" />. Subtracting its position vector gives the vector from the drop position to the aircraft.</>,
  },
  {
    working: <Katex display tex="d(t) = \sqrt{(60t-1800)^2+(500-2t)^2}" />,
    reason: <>The distance is the magnitude of that vector. Minimise it over <Katex tex="0\le t\le100" />.</>,
  },
  {
    working: (
      <Cas fn="fMin">
        fMin(√((60t−1800)²+(500−2t)²), t) | 0 ≤ t ≤ 100
      </Cas>
    ),
    reason: <>The distance depends on <Katex tex="t" /> alone, so CAS can find the value of <Katex tex="t" /> in the interval that makes it smallest.</>,
    more: (
      <>
        By hand, minimise <Katex tex="d^2" />, a quadratic in <Katex tex="t" />:{' '}
        <Katex tex="\tfrac{d}{dt}\left(d^2\right)=120(60t-1800)-4(500-2t)=7208t-218\,000=0" />, so{' '}
        <Katex tex="t=\tfrac{27\,250}{901}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{gathered}t = 30.244\ldots \text{ s} \\ d(30.244\ldots) = 439.7557\ldots\end{gathered}" />,
    reason: <>fMin gives the time; substitute it back for the distance. <Katex tex="t\approx30.2" /> is inside <Katex tex="[0,100]" />.</>,
    more: (
      <>
        <p>
          VCAA&apos;s sample answer takes a geometric route instead. The path is a straight line, so
          the shortest distance from the drop position to it is the perpendicular distance. The
          vector <Katex tex="2\underset{\sim}{i}+60\underset{\sim}{j}" /> is perpendicular to the
          direction of motion <Katex tex="60\underset{\sim}{i}-2\underset{\sim}{j}" /> (their dot
          product is <Katex tex="120-120=0" />), and the vector from the drop position to the point{' '}
          <Katex tex="(0,500)" /> on the path is <Katex tex="-1800\underset{\sim}{i}+500\underset{\sim}{j}" />. The
          distance is its scalar resolute onto that perpendicular:
        </p>
        <Katex display tex="\begin{aligned}d&=\left(-1800\underset{\sim}{i}+500\underset{\sim}{j}\right)\cdot\frac{2\underset{\sim}{i}+60\underset{\sim}{j}}{\sqrt{3604}} \\ &=\frac{26\,400}{\sqrt{3604}}=439.76\end{aligned}" />
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{439.76 \ \text{m}}" />,
    reason: <>Correct to two decimal places.</>,
    more: <>Plausible: at <Katex tex="t=30" /> the aircraft is directly above the drop position at height 440 m, so the minimum can be at most 440 m. Because the path keeps descending, the closest point comes a moment later (at <Katex tex="x\approx1815" />) and is just under 440 m.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}500-2t = 460 \implies t = 20 \\ \underset{\sim}{r}(20) = 1200\underset{\sim}{i}+460\underset{\sim}{j}\end{gathered}" />,
    reason: <>First find where the aircraft is when it releases the package: its altitude is the <Katex tex="\underset{\sim}{j}" /> component, <Katex tex="500-2t" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}(T) = -9.8\underset{\sim}{j}" />,
    reason: <>Let <Katex tex="T" /> be the time in seconds after release. With air resistance negligible, the only effect on the package is gravity: an acceleration of <Katex tex="9.8\ \mathrm{ms^{-2}}" /> straight down.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(T) = 60\underset{\sim}{i}+(-2-9.8T)\underset{\sim}{j}" />,
    reason: <>Antidifferentiate. At release the package is moving with the aircraft, so its initial velocity is the aircraft&apos;s, <Katex tex="60\underset{\sim}{i}-2\underset{\sim}{j}" /> from part b.</>,
    more: <>This is the key idea: the package does not fall straight down. Nothing acts horizontally, so it keeps the aircraft&apos;s 60 m/s forward speed all the way to the ground, and it also starts already descending at 2 m/s.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{r}_p(T) &= (1200+60T)\underset{\sim}{i} \\ &\quad+\left(460-2T-4.9T^2\right)\underset{\sim}{j}\end{aligned}" />,
    reason: <>Antidifferentiate again; the constant is the release position <Katex tex="1200\underset{\sim}{i}+460\underset{\sim}{j}" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}460-2T-4.9T^2 = 0 \\ T = \frac{-2+\sqrt{9020}}{9.8} = 9.4871\ldots\end{gathered}" />,
    reason: <>It lands when its height is zero. Quadratic formula; the negative root is rejected since <Katex tex="T\ge0" />.</>,
    more: <>VCAA writes this line as <Katex tex="460=2t+\tfrac12\times9.8\times t^2" />: the same equation, with the drop measured downwards.</>,
  },
  {
    working: <Katex display tex="x = 1200+60\times9.4871\ldots = 1769.22\ldots" />,
    reason: <>Where it lands: the <Katex tex="\underset{\sim}{i}" /> component at that time, using the unrounded <Katex tex="T" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}1800-1769.22\ldots = 30.77\ldots \\ \boxed{30.8 \ \text{m short}}\end{gathered}" />,
    reason: <>Correct to one decimal place.</>,
    more: <>Plausible: the package travels about 569 m forward while it falls, so releasing 600 m before the drop position leaves it a little over 30 m short.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}500-2t = h \implies t = \frac{500-h}{2} \\ x = 60t = 30(500-h)\end{gathered}" />,
    reason: <>Let <Katex tex="h" /> be the release altitude. As in part d., the release point is where the aircraft reaches height <Katex tex="h" />; its <Katex tex="x" />-coordinate also follows from part a.: <Katex tex="h=500-\tfrac{x}{30}" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}h-2T-4.9T^2 = 0 \\ T = \frac{-2+\sqrt{4+19.6h}}{9.8}\end{gathered}" />,
    reason: <>The package&apos;s motion is the same as in part d. (the aircraft&apos;s velocity does not change) except that it starts at height <Katex tex="h" />. Its fall time comes from the quadratic formula, positive root.</>,
  },
  {
    working: <Katex display tex="30(500-h)+60\times\frac{-2+\sqrt{4+19.6h}}{9.8} = 1800" />,
    reason: <>Landing position = release <Katex tex="x" /> + horizontal distance <Katex tex="60T" /> covered while falling. Set it equal to the drop position.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve(30(500−h)+60(−2+√(4+19.6h))/9.8 = 1800, h)
      </Cas>
    ),
    reason: <>One equation in <Katex tex="h" />, with a square root: let CAS solve it.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 458.95 \ \text{m}}" />,
    reason: <><Katex tex="h=458.952\ldots" />, correct to two decimal places.</>,
    more: <>Check against part d.: released at 460 m the package fell 30.8 m short, so it must be released a little later, which on a descending path means a little lower. 458.95 m is about 1 m lower, half a second later and about 31 m further along. Slide the release altitude in the diagram below to see it land.</>,
  },
]

export default function SpecialistQ6_2022NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (11 marks)</p>
        <p>
          A supply aircraft has the position vector{' '}
          <Katex tex="\underset{\sim}{r}(t)=60t\,\underset{\sim}{i}+(500-2t)\underset{\sim}{j}" /> for{' '}
          <Katex tex="0\le t\le100" /> seconds relative to a fixed observation point{' '}
          <Katex tex="O" />, where <Katex tex="\underset{\sim}{i}" /> is a horizontal unit vector in
          the direction of the drop position and <Katex tex="\underset{\sim}{j}" /> is a unit vector
          vertically up. Displacement components are measured in metres.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={diagramSrc}
            alt="Axes with origin O: an aircraft drawn above and to the right of O, and the drop position marked as a dot on the x-axis at 1800 m — from the original 2022 NHT VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts a.–c. are about the aircraft alone, using the standard tools for a position
              vector: eliminate <Katex tex="t" /> for the path, take the magnitude of{' '}
              <Katex tex="\underset{\sim}{\dot r}(t)" /> for the speed, and minimise{' '}
              <Katex tex="\left|\underset{\sim}{r}(t)-\underset{\sim}{p}\right|" /> for the closest
              approach to a fixed point <Katex tex="\underset{\sim}{p}" />.
            </p>
            <p>
              Parts d.–e. follow a second object, the package, from the moment it leaves the
              aircraft. It needs its own position vector, built by antidifferentiating its
              acceleration with its own initial velocity and position.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Cartesian Equation"
        marks={1}
        statement={<>Find the cartesian equation of the path of the aircraft.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Speed"
        marks={2}
        statement={
          <>
            Find the speed of the aircraft, in <Katex tex="\mathrm{ms^{-1}}" />, correct to two
            decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Minimum Distance"
        marks={2}
        statement={
          <>
            Assuming that the aircraft maintains its course, how close does it get to the drop
            position, which is located 1800 m horizontally from <Katex tex="O" />? Give your answer
            in metres, correct to two decimal places.
          </>
        }
        examinerReport={REPORT_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Projectile Motion"
        marks={3}
        statement={
          <>
            When the aircraft is at an altitude of 460 m, it releases a package to try to land it at
            the drop position, which is located 1800 m horizontally from <Katex tex="O" />.
            <br />
            Assuming negligible air resistance acting on the package, find how far short of the drop
            position the package lands. Give your answer in metres, correct to one decimal place.
          </>
        }
      >
        <Background title="Gravity wording, vector calculus">
          <p>
            Projectile motion under gravity used to sit in Mechanics, which Specialist Mathematics no
            longer has. But the only physics needed here is one fact: with air resistance negligible,
            the package&apos;s acceleration is the acceleration due to gravity, 9.8{' '}
            <Katex tex="\mathrm{ms^{-2}}" /> straight down, so{' '}
            <Katex tex="\underset{\sim}{a}=-9.8\underset{\sim}{j}" />.
          </p>
          <p>
            Everything after that is current vector calculus: antidifferentiate a constant
            acceleration vector twice, using the aircraft&apos;s velocity at release as the initial
            velocity and the release point as the initial position, then solve for when the height is
            zero. Parts d. and e. are well worth doing.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Release Altitude"
        marks={3}
        statement={
          <>
            At what altitude should the package be released so that it lands at the drop position?
            Give your answer in metres, correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="Where the package lands depends on when it leaves, and it never falls straight down">
          <ReleaseWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
