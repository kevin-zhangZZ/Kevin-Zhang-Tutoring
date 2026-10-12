// 2020 Specialist Mathematics — Exam 2, Section B Question 4 (14 marks). An aeroplane on an
// elliptical path and a drone on a parabolic one: maximum speed, the cartesian equation,
// both sketches, and whether the two ever meet. Question text transcribed from the original
// paper; the sketch is this site's own matplotlib drawing of the answer, on VCAA's axes
// (x 0 to 1400, y 0 to 800, gridlines every 50). Note on part d.: the report's values 348.73 and
// 219.03 come from rounding t to 12.84 first; with t = 12.849… they are 348.87 and 219.45. Answers checked with sympy
// and scipy, and against the VCAA examination report. Solution is original.
// Interactive widgets (this site's own, in the working, never the stem): a. the velocity arrow
// round the ellipse beside a speed-vs-t graph (fastest at the left/right ends, 100π/3), with the
// "combine the two biggest components" mistake as a toggle; b.ii. tracing r_A(t) from t = 0 with
// a table of hand-computed points (clockwise from (450, 200)); d. both craft on one clock, with
// the drone's two path crossings, the single time the x-coordinates agree, and the closest
// approach (about 29 m at t ≈ 20.94; the plane reaches (600, 400) at t = 21, the drone at t = 20).
// The sketch's alt text used to say the parabola "touches" the ellipse at (600, 400); it crosses
// there (vertical tangent on the ellipse, horizontal on the parabola), so that wording was fixed.
// Concise/Detailed rebalance (12 Oct 2026): long reasons split into `more`; b.i. gained the
// substitution line; b.ii. final row now states the three required features instead of pointing at a diagram.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import pathsSrc from './spec-2020e2-q4-paths.png'

const SpeedWidget = lazyWidget(() => import('../interactives/spec-2020e2-q4a-speed'))
const DirectionWidget = lazyWidget(() => import('../interactives/spec-2020e2-q4bii-direction'))
const CollisionWidget = lazyWidget(() => import('../interactives/spec-2020e2-q4d-collision'))

const EXAM_A: SAExaminerStats = {
  marks: [15, 19, 19, 47],
  average: 2,
  comment: (
    <>
      Most students were able to make a satisfactory start by correctly finding the velocity.
      Of those who proceeded to find the speed, quite a few were unable to find the maximum
      speed.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [14, 8, 78],
  average: 1.6,
  comment: (
    <>
      This question was generally done well, with most students showing sufficient steps to
      obtain the given result.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [12, 11, 22, 55],
  average: 2.2,
  comment: (
    <>
      Most students drew a correct ellipse, but the required information was not always
      correctly shown. The starting position and coordinates may have been missing or not
      made explicit or the direction of travel was not always indicated.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [25, 6, 17, 52],
  average: 1.9,
  comment: (
    <>
      Most students sketched a parabola with the correct shape and intercepts; however, the
      coordinates of the points of intersection were occasionally rounded incorrectly.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [31, 9, 9, 51],
  average: 1.8,
  comment: (
    <>
      Students attempted a variety of satisfactory approaches. In addition to the approach
      above, many students listed all
      solutions within the domain for each equation, correctly noting that they had no
      solutions in common. It was not sufficient to simply assert that the pair of equations
      had no solution.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}_A(t) = -150\cdot\tfrac\pi6\cos\!\left(\tfrac{\pi t}{6}\right)\underset{\sim}{i}+200\cdot\tfrac\pi6\sin\!\left(\tfrac{\pi t}{6}\right)\underset{\sim}{j}" />,
    reason: <>Speed comes from velocity, so differentiate each component. The chain rule brings out <Katex tex="\tfrac\pi6" />; in the <Katex tex="\underset{\sim}{j}" /> component the two minus signs cancel.</>,
    more: <>The two minus signs in the <Katex tex="\underset{\sim}{j}" /> component are the one in front of 200 and the one from differentiating <Katex tex="\cos" />.</>,
  },
  {
    working: <Katex display tex="= -25\pi\cos\!\left(\tfrac{\pi t}{6}\right)\underset{\sim}{i}+\tfrac{100\pi}{3}\sin\!\left(\tfrac{\pi t}{6}\right)\underset{\sim}{j}" />,
    reason: <><Katex tex="150\cdot\tfrac\pi6=25\pi" /> and <Katex tex="200\cdot\tfrac\pi6=\tfrac{100\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="\text{speed} = \sqrt{625\pi^2\cos^2\!\left(\tfrac{\pi t}{6}\right)+\tfrac{10\,000\pi^2}{9}\sin^2\!\left(\tfrac{\pi t}{6}\right)}" />,
    reason: <>Speed is the magnitude of the velocity: square each component, add, square-root.</>,
  },
  {
    working: <Katex display tex="= \sqrt{625\pi^2+\tfrac{4375\pi^2}{9}\sin^2\!\left(\tfrac{\pi t}{6}\right)}" />,
    reason: <>With <Katex tex="t" /> in two places the largest value is hard to see, so replace <Katex tex="\cos^2" /> by <Katex tex="1-\sin^2" />: <Katex tex="\tfrac{10\,000}{9}-625=\tfrac{4375}{9}" />.</>,
    more: <>Whenever a speed mixes <Katex tex="\cos^2" /> and <Katex tex="\sin^2" /> of the same angle, this is the move: it leaves <Katex tex="t" /> in one place only.</>,
  },
  {
    working: <Katex display tex="= \tfrac{25\pi}{3}\sqrt{9+7\sin^2\!\left(\tfrac{\pi t}{6}\right)}" />,
    reason: <>Taking out <Katex tex="\left(\tfrac{25\pi}{3}\right)^2=\tfrac{625\pi^2}{9}" /> leaves <Katex tex="9+7\sin^2" />. Now the speed only grows as <Katex tex="\sin^2" /> grows.</>,
    more: <>This is the form in the report.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}0\le\sin^2\!\left(\tfrac{\pi t}{6}\right)\le1\\ \implies \text{speed}\le\tfrac{25\pi}{3}\sqrt{9+7}=\tfrac{25\pi}{3}\sqrt{16}\end{gathered}" />,
    reason: <>The largest <Katex tex="\sin^2" /> can be is 1, reached at <Katex tex="t=3,9,15,\ldots" />, so no calculus is needed.</>,
    more: <>This is where marks were lost: rewriting the speed with <Katex tex="t" /> in one place is what makes the maximum visible.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum speed} = \frac{100\pi}{3} \approx 104.72\ \text{m s}^{-1}}" />,
    reason: <><Katex tex="\tfrac{25\pi}{3}\times4=\tfrac{100\pi}{3}" />. The question asks for <Katex tex="\text{m s}^{-1}" />, so state the unit.</>,
    more: <>At <Katex tex="t=3" /> and <Katex tex="t=9" /> the plane is at <Katex tex="(300,400)" /> and <Katex tex="(600,400)" />, the left and right ends of the ellipse, moving straight up or down. The maximum is the long vertical semi-axis times the rate: <Katex tex="200\times\tfrac\pi6" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="x = 450-150\sin\!\left(\tfrac{\pi t}{6}\right) \implies \sin\!\left(\tfrac{\pi t}{6}\right) = \frac{x-450}{-150}" />,
    reason: <>A cartesian equation has no <Katex tex="t" />. Here <Katex tex="t" /> sits inside a sine and a cosine of the <em>same</em> angle, so isolate each trig function first.</>,
  },
  {
    working: <Katex display tex="y = 400-200\cos\!\left(\tfrac{\pi t}{6}\right) \implies \cos\!\left(\tfrac{\pi t}{6}\right) = \frac{y-400}{-200}" />,
    reason: <>Same again for the vertical component.</>,
  },
  {
    working: <Katex display tex="\sin^2\!\left(\tfrac{\pi t}{6}\right)+\cos^2\!\left(\tfrac{\pi t}{6}\right) = 1" />,
    reason: <>The Pythagorean identity links <Katex tex="\sin" /> and <Katex tex="\cos" /> of the same angle, so it eliminates <Katex tex="t" />. Write it down: in a "show that" it is the step being marked.</>,
  },
  {
    working: <Katex display tex="\left(\frac{x-450}{-150}\right)^2+\left(\frac{y-400}{-200}\right)^2 = 1" />,
    reason: <>Substitute the two expressions from the first two lines into the identity.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{(x-450)^2}{22\,500}+\frac{(y-400)^2}{40\,000} = 1}" />,
    reason: <>The minus signs vanish under the squares: <Katex tex="(-150)^2=22\,500" /> and <Katex tex="(-200)^2=40\,000" />. As required.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}\text{ellipse: centre } (450,400),\\ \text{semi-axes } 150 \text{ across and } 200 \text{ up}\end{gathered}" />,
    reason: <>Read these from part b.i.: the centre from the numbers subtracted from <Katex tex="x" /> and <Katex tex="y" />, the semi-axes from <Katex tex="\sqrt{22\,500}=150" /> and <Katex tex="\sqrt{40\,000}=200" />.</>,
    more: <>So <Katex tex="x" /> runs 300 to 600 and <Katex tex="y" /> runs 200 to 600: taller than it is wide, not a circle. Mark those four extreme points, <Katex tex="(300,400)" />, <Katex tex="(600,400)" />, <Katex tex="(450,200)" /> and <Katex tex="(450,600)" />, on the grid first, then join them.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}t=0:\ x &= 450-150\sin(0) = 450\\ y &= 400-200\cos(0) = 200\end{aligned}" />,
    reason: <>Substituting <Katex tex="t=0" /> gives the start, the bottom of the ellipse. The question asks for it labelled with coordinates.</>,
  },
  {
    working: <Katex display tex="\left.\frac{dx}{dt}\right|_{t=0} = -25\pi\cos(0) = -25\pi < 0" />,
    reason: <>Using the velocity from part a., the sign of <Katex tex="\tfrac{dx}{dt}" /> at the start says the plane leaves it moving left. Moving left along the bottom of a loop is clockwise.</>,
    more: <>If you prefer points to derivatives, <Katex tex="t=1" /> gives <Katex tex="(375,\ 226.8)" />, left of and above the start: same conclusion.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{ellipse, } (450,200) \text{ labelled at } t=0,\\ \text{clockwise arrow}\end{gathered}" />,
    reason: <>The three things the sketch must show. It is drawn together with the drone's path in part c., on the same axes.</>,
    more: <>This is where marks were lost: write the coordinates <Katex tex="(450,200)" /> next to the starting point and mark it <Katex tex="t=0" />, and put at least one arrow on the curve.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x = 30t \implies t = \tfrac{x}{30}" />,
    reason: <>To sketch the drone's path and intersect it with the ellipse, eliminate <Katex tex="t" />. The horizontal component is linear, so solve it for <Katex tex="t" /> and substitute.</>,
  },
  {
    working: <Katex display tex="y = -t^2+40t = -\frac{x^2}{900}+\frac{4x}{3}" />,
    reason: <>A parabola: <Katex tex="(0,0)" /> at <Katex tex="t=0" />, apex <Katex tex="(600,400)" /> at <Katex tex="t=20" />, <Katex tex="(1200,0)" /> at <Katex tex="t=40" />. The domain <Katex tex="0\le t\le40" /> gives exactly that arch.</>,
    more: <>So the drone's path starts and stops on the <Katex tex="x" />-axis: draw only the arch, not a parabola continuing below the axis.</>,
  },
  {
    working: <Cas fn="solve">solve(((x−450)²/22500 + (y−400)²/40000 = 1) and (y = −x²/900 + 4x/3), x, y)</Cas>,
    reason: <>Where the paths cross is about <em>places</em>, not times, so intersect the two cartesian equations and leave <Katex tex="t" /> out.</>,
    more: <>Whether both craft are there at the same moment is a separate question: that is part d.</>,
  },
  {
    working: <Katex display tex="\boxed{(316,\ 310) \ \text{ and } \ (600,\ 400)}" />,
    reason: <>CAS gives <Katex tex="(315.92\ldots,\ 310.33\ldots)" /> and <Katex tex="(600,400)" />; round each coordinate to the nearest metre only at the end.</>,
    more: <>This is where marks were lost: round from the full CAS value (315.92… rounds to 316, 310.33… to 310), not from an already-rounded one. The second point is exact and checkable by hand: at <Katex tex="x=600" /> the ellipse gives <Katex tex="\tfrac{150^2}{22\,500}=1" />, so <Katex tex="y=400" />, and the parabola gives <Katex tex="-400+800=400" />. The apex of the parabola is the rightmost point of the ellipse.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={pathsSrc}
          alt="On VCAA's axes: the aeroplane's ellipse centred at (450, 400) with a clockwise arrow from its lowest point, labelled t = 0: (450, 200), and the drone's parabola from (0, 0) to (1200, 0), crossing the ellipse at (316, 310) and again at (600, 400)"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Parts b.ii. and c. on one set of axes, as the question intends: the ellipse with its start and arrow, the parabola with both crossings labelled.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{crossing paths} \ne \text{colliding}" />,
    reason: <>Part c. found where the two <em>curves</em> meet. Contact needs the two objects there at the <em>same time</em>, so both components must agree for one value of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="x: \ 30t = 450-150\sin\!\left(\tfrac{\pi t}{6}\right)" />,
    reason: <>Match the horizontal positions first: the drone's <Katex tex="x=30t" /> only increases while the plane's <Katex tex="x" /> stays between 300 and 600, so they can share an <Katex tex="x" /> only while <Katex tex="10\le t\le20" />.</>,
    more: <>That window comes from <Katex tex="300\le30t\le600" />. Starting with <Katex tex="x" /> gives one candidate time, instead of the four times the heights agree.</>,
  },
  {
    working: <Cas fn="solve">solve(30t = 450 − 150·sin(πt/6), t) | 0 ≤ t ≤ 40</Cas>,
    reason: <>Gives <Katex tex="t=12.849\ldots" />, the only time the two are at the same <Katex tex="x" />.</>,
    more: <>The lower graph in the widget below shows the single crossing.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}t &= 12.849\ldots\\ y_{\text{drone}} &= -t^2+40t = 348.87\ldots\end{aligned}" />,
    reason: <>The drone's height at that instant, using the unrounded <Katex tex="t" />.</>,
    more: <>The report rounds <Katex tex="t" /> to 12.84 first and gets 348.73 and 219.03; the conclusion is the same.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}y_{\text{plane}} &= 400-200\cos\!\left(\tfrac{\pi t}{6}\right)\\ &= 219.45\ldots\end{aligned}" />,
    reason: <>The aeroplane's height at the same instant.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}348.87 \ne 219.45, \text{ so the drone does not}\\ \text{make contact with the aeroplane}\end{gathered}}" />,
    reason: <>At the only moment their <Katex tex="x" />-coordinates agree, their heights differ by about 130 m, so they are never in the same place at the same time.</>,
    more: <>Equally valid, and used by many students according to the report: list every solution of each equation in <Katex tex="0\le t\le40" /> (<Katex tex="x" /> agrees only at 12.85; <Katex tex="y" /> at <Katex tex="t=10" />, 14.73, 21.01 and 26.58) and note that none is shared.</>,
  },
]

export default function SpecialistQ4_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (14 marks)</p>
        <p>
          A pilot is performing at an air show. The position of her aeroplane at time{' '}
          <Katex tex="t" /> relative to a fixed origin <Katex tex="O" /> is given by{' '}
          <Katex tex="\underset{\sim}{r}_A(t)=\left(450-150\sin\!\left(\tfrac{\pi t}{6}\right)\right)\underset{\sim}{i}+\left(400-200\cos\!\left(\tfrac{\pi t}{6}\right)\right)\underset{\sim}{j}" />
          , where <Katex tex="\underset{\sim}{i}" /> is a unit vector in a horizontal
          direction, <Katex tex="\underset{\sim}{j}" /> is a unit vector vertically up,
          displacement components are measured in metres and time <Katex tex="t" /> is
          measured in seconds where <Katex tex="t\ge0" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Maximum Speed"
        marks={3}
        statement={
          <>
            Find the maximum speed of the aeroplane. Give your answer in{' '}
            <Katex tex="\text{m s}^{-1}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why the plane is fastest at the sides of the ellipse">
          <SpeedWidget />
        </Explore>
        <WrongMethod
          title="Put the biggest i-component and the biggest j-component together"
          working={<Katex display tex="\sqrt{(25\pi)^2+\left(\tfrac{100\pi}{3}\right)^2}\approx 130.90\ \text{m s}^{-1}" />}
        >
          The two components never peak at the same time. The horizontal one is largest when{' '}
          <Katex tex="\cos\left(\tfrac{\pi t}{6}\right)=\pm1" />, and then{' '}
          <Katex tex="\sin\left(\tfrac{\pi t}{6}\right)=0" />, so the vertical one is zero. The plane never
          reaches 130.90. To catch it, ask at what time <Katex tex="t" /> your maximum happens, and
          substitute that <Katex tex="t" /> back into the speed.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Cartesian Equation"
        marks={2}
        statement={
          <>
            Use <Katex tex="\underset{\sim}{r}_A(t)" /> to show that the cartesian equation of
            the path of the aeroplane is given by{' '}
            <Katex tex="\dfrac{(x-450)^2}{22\,500}+\dfrac{(y-400)^2}{40\,000}=1" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Sketch Path"
        marks={3}
        statement={
          <>
            Sketch the path of the aeroplane on the axes provided below. Label the position of the
            aeroplane when <Katex tex="t=0" />, using coordinates, and use an arrow to show
            the direction of motion of the aeroplane.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <Explore title="Where the plane starts, and why it goes round clockwise">
          <DirectionWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A friend of the pilot launches an experimental jet-powered drone to take
          photographs of the air show. The position of the drone at time <Katex tex="t" />{' '}
          relative to the fixed origin is given by{' '}
          <Katex tex="\underset{\sim}{r}_D(t)=(30t)\underset{\sim}{i}+\left(-t^2+40t\right)\underset{\sim}{j}" />
          , where <Katex tex="t" /> is in seconds and <Katex tex="0\le t\le40" />,{' '}
          <Katex tex="\underset{\sim}{i}" /> is a unit vector in the same horizontal
          direction, <Katex tex="\underset{\sim}{j}" /> is a unit vector vertically up, and
          displacement components are measured in metres.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Path Intersections"
        marks={3}
        statement={
          <>
            Sketch the path of the drone on the axes provided in <b>part b.ii.</b> Using
            coordinates, label the points where the path of the drone crosses the path of the
            aeroplane, correct to the nearest metre.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Collision"
        marks={3}
        statement={
          <>
            Determine whether the drone will make contact with the aeroplane. Give reasons
            for your answer.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Crossing paths is not colliding: same place, same time">
          <CollisionWidget />
        </Explore>
        <WrongMethod
          title="The paths cross in part c., so the drone hits the plane"
          working={<Katex display tex="\begin{gathered}\text{paths meet at } (316,310) \text{ and } (600,400)\\ \implies \text{contact}\end{gathered}" />}
        >
          A crossing point is a place both craft visit, not necessarily at the same moment. The drone
          passes <Katex tex="(316,\ 310)" /> at <Katex tex="t\approx10.53" />, but the plane is there at{' '}
          <Katex tex="t\approx2.11" />, <Katex tex="14.11" />, <Katex tex="26.11" /> and{' '}
          <Katex tex="38.11" />. The drone reaches <Katex tex="(600,\ 400)" /> at{' '}
          <Katex tex="t=20" />; the plane gets there at <Katex tex="t=9" />, <Katex tex="21" /> and{' '}
          <Katex tex="33" />. The closest they come is about 29 m, at <Katex tex="t\approx20.94" />. "Contact" always
          means the same <Katex tex="t" /> in both position vectors.
        </WrongMethod>
        <WrongMethod
          title="Just say the two equations have no common solution"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="30t = 450-150\sin\left(\tfrac{\pi t}{6}\right) \text{ and}" />
              <Katex display tex="-t^2+40t = 400-200\cos\left(\tfrac{\pi t}{6}\right)" />
              <Katex display tex="\text{have no solution, so no contact}" />
            </>
          }
        >
          The report says it was not sufficient to simply assert that the pair of equations had no
          solution. "Give reasons" means showing the evidence: the one time the <Katex tex="x" />-coordinates
          agree and the two different heights at that time, or the full list of solutions of each equation
          with no value in common.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
