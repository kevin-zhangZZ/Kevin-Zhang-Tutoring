// 2024 Specialist NHT — Exam 2, Section B Question 4 (10 marks). The NHT report gives sample
// answers only, with no statistics. A drone on a helical path
// r(t) = (50 + 25 sin(πt/30)) i + (50 + 25 cos(πt/30)) j + (3t/5) k: the time to reach 30 m, the
// angle of elevation from O there, the first time it is directly above take-off, velocity
// perpendicular to acceleration, its constant speed, and its closest approach to a tree top.
// Question text transcribed from the original paper (no diagram). The 3D figure in e. is this
// site's own explanatory graph of the path (VCAA printed none). Answers checked with sympy/scipy and
// against the VCAA report's sample answers: a.ii 24°; b. t = 60; d. 2.69; e. 7.9 m (at t ≈ 25.76;
// the later local minima on the climb are all further away). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import pathSrc from './spec-2024nhte2-q4e-path.png'

const I = '\\underset{\\sim}{i}'
const J = '\\underset{\\sim}{j}'
const K = '\\underset{\\sim}{k}'
const R = '\\underset{\\sim}{r}'

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="z = \frac{3t}{5}" />,
    reason: <>Altitude is the vertical component: the <Katex tex={K} /> component of <Katex tex={`${R}(t)`} />, since <Katex tex={K} /> points vertically up.</>,
  },
  {
    working: <Katex display tex="\frac{3t}{5} = 30 \implies t = \frac{30\times5}{3} = 50" />,
    reason: <>Set the altitude equal to 30 m and solve. The drone climbs at a steady 0.6 m every second.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 50 \text{ seconds}}" />,
    reason: <>As required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex={`\\begin{aligned}${R}(50) = {}&\\left(50+25\\sin\\left(\\tfrac{5\\pi}{3}\\right)\\right)${I} \\\\ &+\\left(50+25\\cos\\left(\\tfrac{5\\pi}{3}\\right)\\right)${J}+30${K}\\end{aligned}`} />,
    reason: <>The position at <Katex tex="t=50" />, from part a.i.</>,
  },
  {
    working: <Katex display tex={`= \\left(50-\\tfrac{25\\sqrt3}{2}\\right)${I}+62.5${J}+30${K}`} />,
    reason: <><Katex tex="\tfrac{5\pi}{3}" /> is in the fourth quadrant: <Katex tex="\sin\tfrac{5\pi}{3}=-\tfrac{\sqrt3}{2}" />, <Katex tex="\cos\tfrac{5\pi}{3}=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="d_{\text{horiz}} = \sqrt{\left(50-\tfrac{25\sqrt3}{2}\right)^2+62.5^2} = 68.628\ldots" />,
    reason: <>The angle of elevation is measured up from the horizontal, so the side adjacent to it is the drone&apos;s horizontal distance from <Katex tex="O" />: the length of the <Katex tex={I} /> and <Katex tex={J} /> part only.</>,
    more: <>Picture a right-angled triangle: <Katex tex="O" />, the point on the ground directly below the drone, and the drone. The vertical side is the altitude 30 m; the horizontal side is this distance.</>,
  },
  {
    working: <Katex display tex="\tan\theta = \frac{30}{68.628\ldots} \implies \theta = 23.61\ldots^\circ" />,
    reason: <>Opposite (the altitude) over adjacent (the horizontal distance). Use <Katex tex="\tan^{-1}" /> in degree mode.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta \approx 24^\circ}" />,
    reason: <>To the nearest degree, as asked.</>,
    more: <>Sanity check: the drone is about 69 m away horizontally and only 30 m up, so the angle should be well under 45°. Equivalently, <Katex tex="\theta" /> is the angle between <Katex tex={`${R}(50)`} /> and the horizontal plane.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex={`${R}(0) = 50${I}+75${J}`} />,
    reason: <>Take-off is at <Katex tex="t=0" />: <Katex tex="\sin0=0" /> and <Katex tex="\cos0=1" />, on the ground at <Katex tex="(50,75,0)" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}50+25\sin\left(\tfrac{\pi t}{30}\right)=50 \\ \text{and} \\ 50+25\cos\left(\tfrac{\pi t}{30}\right)=75\end{gathered}" />,
    reason: <>&ldquo;Directly above&rdquo; means the same east and north coordinates as take-off, at any altitude. Both horizontal components must match at the same time.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\sin\left(\tfrac{\pi t}{30}\right)=0 \text{ and } \cos\left(\tfrac{\pi t}{30}\right)=1 \\ \implies \tfrac{\pi t}{30} = 0, 2\pi, 4\pi, \ldots\end{gathered}" />,
    reason: <>The sine equation alone gives <Katex tex="t=0,30,60,90,\ldots" />, but at <Katex tex="t=30" /> the cosine is <Katex tex="-1" /> (the opposite side of the circle). Both hold only where the angle is a whole number of turns: <Katex tex="t=0,60,120,\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 60 \text{ seconds}}" />,
    reason: <><Katex tex="t=0" /> is the take-off itself, so the first time after it is one full turn later. The horizontal motion is a circle with period <Katex tex="\tfrac{2\pi}{\pi/30}=60" /> s.</>,
    more: <>At <Katex tex="t=60" /> the drone is at <Katex tex="(50,75,36)" />, 36 m straight above where it left the ground.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex={`\\dot{${R}}(t) = \\frac{25\\pi}{30}\\cos\\left(\\tfrac{\\pi t}{30}\\right)${I}-\\frac{25\\pi}{30}\\sin\\left(\\tfrac{\\pi t}{30}\\right)${J}+\\frac35${K}`} />,
    reason: <>Differentiate each component. Chain rule: the inner function <Katex tex="\tfrac{\pi t}{30}" /> brings out a factor <Katex tex="\tfrac{\pi}{30}" />, and <Katex tex="\cos" /> differentiates to <Katex tex="-\sin" />.</>,
  },
  {
    working: <Katex display tex={`\\ddot{${R}}(t) = -\\frac{25\\pi^2}{900}\\sin\\left(\\tfrac{\\pi t}{30}\\right)${I}-\\frac{25\\pi^2}{900}\\cos\\left(\\tfrac{\\pi t}{30}\\right)${J}`} />,
    reason: <>Differentiate again; another factor <Katex tex="\tfrac{\pi}{30}" /> comes out. The <Katex tex={K} /> component is constant, so its derivative is 0: the climb has no acceleration.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}\\dot{${R}}\\cdot\\ddot{${R}} = {}&-\\tfrac{625\\pi^3}{27000}\\cos\\left(\\tfrac{\\pi t}{30}\\right)\\sin\\left(\\tfrac{\\pi t}{30}\\right) \\\\ &+\\tfrac{625\\pi^3}{27000}\\sin\\left(\\tfrac{\\pi t}{30}\\right)\\cos\\left(\\tfrac{\\pi t}{30}\\right) \\\\ &+\\tfrac35\\times0\\end{aligned}`} />,
    reason: <>Two non-zero vectors are perpendicular exactly when their dot product is zero, so compute it component by component.</>,
  },
  {
    working: <Katex display tex="= 0 \ \text{ for all } t" />,
    reason: <>The <Katex tex={I} /> and <Katex tex={J} /> terms are equal and opposite, and the <Katex tex={K} /> term is zero.</>,
  },
  {
    working: <Katex display tex={`\\boxed{\\dot{${R}}(t)\\cdot\\ddot{${R}}(t) = 0, \\text{ so } \\dot{${R}}(t) \\perp \\ddot{${R}}(t) \\text{ for all } t}`} />,
    reason: <>Neither vector is ever zero (the velocity always has <Katex tex="\tfrac35" /> in the <Katex tex={K} /> direction, and the acceleration has length <Katex tex="\tfrac{25\pi^2}{900}" />), so a zero dot product does mean perpendicular. As required.</>,
    more: <>This is the general fact behind part d.: the dot product <Katex tex={`\\dot{${R}}\\cdot\\ddot{${R}}`} /> is half the derivative of the speed squared, so it is zero exactly when the speed never changes. Acceleration perpendicular to velocity turns the drone without speeding it up or slowing it down.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex={`\\begin{aligned}\\left|\\dot{${R}}(t)\\right|^2 = {}&\\left(\\tfrac{25\\pi}{30}\\right)^2\\cos^2\\left(\\tfrac{\\pi t}{30}\\right) \\\\ &+\\left(\\tfrac{25\\pi}{30}\\right)^2\\sin^2\\left(\\tfrac{\\pi t}{30}\\right) \\\\ &+\\left(\\tfrac35\\right)^2\\end{aligned}`} />,
    reason: <>Speed is the magnitude of the velocity from part c.</>,
  },
  {
    working: <Katex display tex="\left|\dot{\underset{\sim}{r}}(t)\right| = \sqrt{\left(\tfrac{25\pi}{30}\right)^2+\left(\tfrac35\right)^2}" />,
    reason: <>Factor out <Katex tex="\left(\tfrac{25\pi}{30}\right)^2" /> from the first two terms: <Katex tex="\cos^2+\sin^2=1" />, so <Katex tex="t" /> disappears and the speed really is constant. Then take the square root.</>,
  },
  {
    working: <Katex display tex="= \frac{\sqrt{625\pi^2+324}}{30} = 2.6858\ldots" />,
    reason: <>Write both squares over 900, <Katex tex="\left(\tfrac{25\pi}{30}\right)^2=\tfrac{625\pi^2}{900}" /> and <Katex tex="\left(\tfrac35\right)^2=\tfrac{324}{900}" />, then use <Katex tex="\sqrt{900}=30" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2.69 \text{ m s}^{-1}}" />,
    reason: <>Correct to two decimal places.</>,
    more: <>Plausible: the horizontal circle has circumference <Katex tex="2\pi\times25\approx157" /> m covered in 60 s, about 2.6 m/s, plus a slow 0.6 m/s climb.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex={`\\begin{aligned}${R}(t)-${R}_{\\text{tree}} = {}&\\left(25\\sin\\left(\\tfrac{\\pi t}{30}\\right)-10\\right)${I} \\\\ &+\\left(25+25\\cos\\left(\\tfrac{\\pi t}{30}\\right)\\right)${J} \\\\ &+\\left(\\tfrac{3t}{5}-8\\right)${K}\\end{aligned}`} />,
    reason: <>The vector from the tree top to the drone: subtract the two position vectors component by component (<Katex tex="50-60=-10" />, <Katex tex="50-25=25" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}d(t)^2 = {}&\left(25\sin\left(\tfrac{\pi t}{30}\right)-10\right)^2 \\ &+\left(25+25\cos\left(\tfrac{\pi t}{30}\right)\right)^2 \\ &+\left(\tfrac{3t}{5}-8\right)^2\end{aligned}" />,
    reason: <>The distance <Katex tex="d(t)" /> is the magnitude of that vector: the square root of the sum of the squared components. The question is to minimise it over <Katex tex="t\ge0" />.</>,
    more: <>Mixing trigonometric terms with a <Katex tex="t^2" /> term means <Katex tex="d'(t)=0" /> can&apos;t be solved by hand, so this is a technology step.</>,
  },
  {
    working: (
      <>
        <Cas fn="define">Define d(t) = √((25sin(πt/30) − 10)² + (25 + 25cos(πt/30))² + (3t/5 − 8)²)</Cas>
        <Cas fn="fMin">fMin(d(t), t) | 0 ≤ t ≤ 60</Cas>
      </>
    ),
    reason: <>Define the distance, then ask for the <Katex tex="t" /> that minimises it, in radian mode. fMin gives <Katex tex="t\approx25.76" />. Searching only the first turn, <Katex tex="0\le t\le60" />, is enough: after that the drone is above 36 m and still climbing, far above the 8 m tree top.</>,
    more: <>Every later pass is further away: the next local minimum, on the second turn, is about 42.8 m. Check the endpoint too: <Katex tex="d(0)=\sqrt{(-10)^2+50^2+(-8)^2}\approx51.6" />.</>,
  },
  {
    working: <Katex display tex="d(25.76\ldots) = 7.874\ldots" />,
    reason: <>fMin returns the time, not the distance: substitute back into <Katex tex="d(t)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{7.9 \text{ m}}" />,
    reason: <>Correct to one decimal place.</>,
    more: (
      <>
        <span className="block">
          At <Katex tex="t\approx25.76" /> the drone is at about <Katex tex="(60.7,\,27.4,\,15.5)" />: only about 2.5 m from the tree horizontally and about 7.5 m above its top. The figure shows the first turn of the path (this site&apos;s own graph; VCAA printed none).
        </span>
        <span className="block mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={pathSrc}
            alt="This site's own 3D graph of the drone's helical path for 0 ≤ t ≤ 60, rising from take-off at (50, 75, 0) to (50, 75, 36), with the tree top at (60, 25, 8) and the shortest 7.9 m segment to the path at t ≈ 25.8 marked in orange"
            className="w-full max-w-[420px]"
          />
        </span>
      </>
    ),
  },
]

export default function SpecialistQ4_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (10 marks)</p>
        <p>
          The position vector, <Katex tex={`${R}(t)`} />, from an origin, <Katex tex="O" />, of a drone{' '}
          <Katex tex="t" /> seconds after leaving the ground is given by
        </p>
        <Katex display tex={`\\begin{aligned}${R}(t) = {}&\\left(50+25\\sin\\left(\\frac{\\pi t}{30}\\right)\\right)${I} \\\\ &+\\left(50+25\\cos\\left(\\frac{\\pi t}{30}\\right)\\right)${J} \\\\ &+\\frac{3t}{5}${K},\\ t\\ge0\\end{aligned}`} />
        <p>
          where <Katex tex={I} /> is a unit vector to the east, <Katex tex={J} /> is a unit vector to the
          north and <Katex tex={K} /> is a unit vector vertically up. Displacement components are
          measured in metres.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Read the rule one piece at a time. The <Katex tex={I} /> and <Katex tex={J} /> parts are{' '}
              <Katex tex="50+25\sin" /> and <Katex tex="50+25\cos" /> of the same angle, so seen from
              above the drone goes round a circle of radius 25 centred at <Katex tex="(50,50)" />, once
              every 60 seconds. The <Katex tex={K} /> part rises steadily at 0.6 m every second. Put
              together, the path is a helix: a spiral staircase.
            </p>
            <p>
              Most parts use only one piece: altitude (a.) is the <Katex tex={K} /> part, &ldquo;directly
              above&rdquo; (b.) is the <Katex tex={I} /> and <Katex tex={J} /> parts, and the speed (d.) is
              constant because circling at a steady rate and climbing at a steady rate are both steady.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Vertical Component"
        marks={1}
        statement={<>Show that it takes 50 seconds for the drone to gain an altitude of 30 m.</>}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Angle of Elevation"
        marks={2}
        statement={
          <>
            Find the angle of elevation from <Katex tex="O" /> of the drone when it is at an altitude of 30 m.
            <br />
            Give your answer in degrees, correct to the nearest degree.
          </>
        }
      >
        <WorkingTable rows={ROWS_AII} />
        <WrongMethod
          title="Use the full distance from O as the adjacent side"
          working={<Katex display tex="\begin{gathered}\tan\theta=\frac{30}{\left|\underset{\sim}{r}(50)\right|}=\frac{30}{74.90\ldots} \\ \implies\theta\approx22^\circ\end{gathered}" />}
        >
          <Katex tex="|\underset{\sim}{r}(50)|\approx74.9" /> m is the straight-line distance to the drone, the
          hypotenuse of the triangle, not the horizontal side. In <Katex tex="\tan\theta" /> the adjacent side must be
          the horizontal distance, using only the <Katex tex="\underset{\sim}{i}" /> and{' '}
          <Katex tex="\underset{\sim}{j}" /> components.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Position Vector"
        marks={1}
        statement={<>After how many seconds will the drone first be directly above the point of take-off?</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Velocity and Acceleration"
        marks={2}
        statement={<>Show that the velocity of the drone is always perpendicular to its acceleration.</>}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Speed"
        marks={1}
        statement={
          <>
            Find the constant speed of the drone, in <Katex tex="\text{m s}^{-1}" />, correct to two decimal places.
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
            The top of a tree has the position vector <Katex tex={`${R}_{\\text{tree}} = 60${I}+25${J}+8${K}`} />.
            <br />
            Find the minimum distance from the drone to the top of the tree. Give your answer in metres,
            correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
