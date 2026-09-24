// 2020 Specialist Mathematics — Exam 2, Section B Question 4 (14 marks). An aeroplane on an
// elliptical path and a drone on a parabolic one: maximum speed, the cartesian equation,
// both sketches, and whether the two ever meet. Question text transcribed from the original
// paper; the sketch is this site's own matplotlib drawing of the answer, on VCAA's axes
// (x 0 to 1400, y 0 to 800, gridlines every 50). Note on part d.: the report's values 348.73 and
// 219.03 come from rounding t to 12.84 first; with t = 12.849… they are 348.87 and 219.45. Answers checked with sympy
// and scipy, and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import pathsSrc from './spec-2020e2-q4-paths.png'

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
    reason: <>Differentiating each component; the chain rule supplies the <Katex tex="\tfrac\pi6" />, and the <Katex tex="\underset{\sim}{j}" /> component's two minus signs cancel.</>,
  },
  {
    working: <Katex display tex="= -25\pi\cos\!\left(\tfrac{\pi t}{6}\right)\underset{\sim}{i}+\tfrac{100\pi}{3}\sin\!\left(\tfrac{\pi t}{6}\right)\underset{\sim}{j}" />,
    reason: <><Katex tex="150\cdot\tfrac\pi6=25\pi" /> and <Katex tex="200\cdot\tfrac\pi6=\tfrac{100\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="\text{speed}^2 = 625\pi^2\cos^2\!\left(\tfrac{\pi t}{6}\right)+\tfrac{10000\pi^2}{9}\sin^2\!\left(\tfrac{\pi t}{6}\right)" />,
    reason: <>Speed is the magnitude of velocity, so square, add, square-root. Maximising the square is the same as maximising the speed.</>,
  },
  {
    working: <Katex display tex="\tfrac{10000}{9} = 1111.1\ldots > 625" />,
    reason: <>The <Katex tex="\sin^2" /> term carries the bigger coefficient, so the speed is largest when <Katex tex="\sin^2=1" /> and <Katex tex="\cos^2=0" /> — no calculus needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum speed} = \frac{100\pi}{3} \approx 104.72\ \text{m s}^{-1}}" />,
    reason: <>At the ends of the horizontal axis of the ellipse, <Katex tex="t=3,9,15,\ldots" />. The report notes that of those who found the speed, quite a few were unable to find the maximum speed.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="x = 450-150\sin\!\left(\tfrac{\pi t}{6}\right) \implies \sin\!\left(\tfrac{\pi t}{6}\right) = \frac{x-450}{-150}" />,
    reason: <>Isolate the trigonometric function in each component.</>,
  },
  {
    working: <Katex display tex="y = 400-200\cos\!\left(\tfrac{\pi t}{6}\right) \implies \cos\!\left(\tfrac{\pi t}{6}\right) = \frac{y-400}{-200}" />,
    reason: <>Same again.</>,
  },
  {
    working: <Katex display tex="\sin^2\!\left(\tfrac{\pi t}{6}\right)+\cos^2\!\left(\tfrac{\pi t}{6}\right) = 1" />,
    reason: <>The Pythagorean identity is what eliminates <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{(x-450)^2}{22\,500}+\frac{(y-400)^2}{40\,000} = 1}" />,
    reason: <>The minus signs vanish under the squares: <Katex tex="(-150)^2=22\,500" /> and <Katex tex="(-200)^2=40\,000" />. As required.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ellipse: centre } (450,400), \text{ semi-axes } 150 \text{ across and } 200 \text{ up}" />,
    reason: <>Reading off the denominators: <Katex tex="\sqrt{22\,500}=150" />, <Katex tex="\sqrt{40\,000}=200" />. So <Katex tex="x" /> runs 300 to 600 and <Katex tex="y" /> runs 200 to 600.</>,
  },
  {
    working: <Katex display tex="t=0: \ x = 450-150\sin(0) = 450, \quad y = 400-200\cos(0) = 200" />,
    reason: <>The bottom of the ellipse — a coordinate the question explicitly asks to be labelled.</>,
  },
  {
    working: <Katex display tex="\left.\frac{dx}{dt}\right|_{t=0} = -25\pi\cos(0) = -25\pi < 0" />,
    reason: <>Moving left at the bottom of the ellipse means the motion is clockwise. Checking the sign of one derivative beats guessing at the arrow.</>,
  },
  {
    working: <Katex display tex="\text{see the blue ellipse in the diagram in part c.}" />,
    reason: <>With the starting point, its coordinates, and a direction arrow — the report notes these were not always shown.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x = 30t \implies t = \tfrac{x}{30}" />,
    reason: <>The horizontal component is linear, so it inverts cleanly.</>,
  },
  {
    working: <Katex display tex="y = -t^2+40t = -\frac{x^2}{900}+\frac{4x}{3}" />,
    reason: <>A parabola from <Katex tex="(0,0)" /> to <Katex tex="(1200,0)" /> with its apex at <Katex tex="(600,400)" />. The domain <Katex tex="0\le t\le40" /> gives exactly that stretch.</>,
  },
  {
    working: <Cas fn="solve">solve(((x−450)²/22500 + (y−400)²/40000 = 1) and (y = −x²/900 + 4x/3), x, y)</Cas>,
    reason: <>Intersecting the two cartesian paths — no need to match times here, which is part d.</>,
  },
  {
    working: <Katex display tex="\boxed{(316,\ 310) \ \text{ and } \ (600,\ 400)}" />,
    reason: <>To the nearest metre, from <Katex tex="(315.92,310.33)" />. The second is exact: the apex of the parabola is also the rightmost point of the ellipse.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={pathsSrc}
          alt="On VCAA's axes: the aeroplane's ellipse centred at (450, 400) with a clockwise arrow from its lowest point, labelled t = 0: (450, 200), and the drone's parabola from (0, 0) to (1200, 0), crossing the ellipse at (316, 310) and touching it at (600, 400)"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Both parts b.ii. and c. on one set of axes, as the question intends.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{crossing paths} \ne \text{colliding}" />,
    reason: <>Part c. found where the two <em>curves</em> meet. Contact needs the two objects there at the <em>same time</em>, so both components must agree for one value of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="x: \ 30t = 450-150\sin\!\left(\tfrac{\pi t}{6}\right)" />,
    reason: <>Match the horizontal positions first — it has a single solution, which pins the only candidate time.</>,
  },
  {
    working: <Cas fn="solve">solve(30t = 450 − 150·sin(πt/6), t) | 0 ≤ t ≤ 40</Cas>,
    reason: <>Gives <Katex tex="t=12.84\ldots" />, the only time the two are at the same <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="t = 12.849\ldots: \ y_{\text{drone}} = -t^2+40t = 348.87\ldots" />,
    reason: <>The drone at that instant. (The report rounds <Katex tex="t" /> to 12.84 first and gets 348.73; the conclusion is the same.)</>,
  },
  {
    working: <Katex display tex="t = 12.849\ldots: \ y_{\text{plane}} = 400-200\cos\!\left(\tfrac{\pi t}{6}\right) = 219.45\ldots" />,
    reason: <>The aeroplane at the same instant.</>,
  },
  {
    working: <Katex display tex="\boxed{348.87 \ne 219.45, \text{ so the drone does not make contact with the aeroplane}}" />,
    reason: <>About 130 m apart vertically. Show the reasoning — the report notes it was not sufficient to simply assert that the pair of equations had no solution.</>,
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
      </PartCard>
    </div>
  )
}
