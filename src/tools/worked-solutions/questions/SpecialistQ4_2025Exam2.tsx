// 2025 Specialist Mathematics — Exam 2, Section B Question 4 (10 marks). An epitrochoid
// traced by a particle: starting point, direction, period, a "show that" for the speed using
// the compound-angle formula, maximum speed, and arc length. Question text transcribed from
// the original paper; the path is the actual VCAA figure, cropped from the official exam PDF
// at 300 dpi, and the part b. and f. answers are drawn over it (origin at (531.5, 575.5) in
// the crop, 47.25 px per unit, read from the gridlines; the traced arc was checked against
// the printed curve with a PIL composite). Answers checked with
// sympy/scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import pathSrc from './spec-2025e2-q4-path.png'

const OX = 531.5
const OY = 575.5
const U = 47.25
const ORANGE = '#f97316'
const TRACE = Array.from({ length: 241 }, (_, k) => {
  const t = (Math.PI * k) / 240
  const x = 5 * Math.cos(t) - 4 * Math.cos(2.5 * t)
  const y = 5 * Math.sin(t) - 4 * Math.sin(2.5 * t)
  return `${(OX + U * x).toFixed(1)},${(OY - U * y).toFixed(1)}`
}).join(' ')
const AX9 = OX + 9 * U

const ALT = {
  b: "VCAA's graph of the path with the answer drawn over it: an arrow at (9, 0) pointing straight up",
  f: "VCAA's graph of the path with the arc for t in [0, π] traced over it: from (1, 0) it dips below the x-axis, swings anticlockwise round the large outer loop and stops at (−5, −4)",
} as const

function PathAnswer({ part }: { part: 'b' | 'f' }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[440px]">
        <img src={pathSrc} alt={ALT[part]} className="w-full block" />
        <svg viewBox="0 0 1096 1082" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {part === 'b' ? (
            <g>
              <line x1={AX9} y1={OY} x2={AX9} y2={OY - 1.45 * U} stroke={ORANGE} strokeWidth={8} />
              <polygon points={`${AX9},${OY - 2 * U} ${AX9 - 16},${OY - 1.4 * U} ${AX9 + 16},${OY - 1.4 * U}`} fill={ORANGE} />
            </g>
          ) : (
            <polyline points={TRACE} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
          )}
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [6.56, 93.44],
  average: 0.93,
  comment: <>A common error was not presenting the answer in coordinate form.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [37.24, 62.76],
  average: 0.62,
  comment: <>Many responses did not follow the instruction to base the direction arrow on the point (9, 0).</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [47.08, 52.92],
  average: 0.52,
  comment: (
    <>
      Finding the lowest common multiple of the two periods <Katex tex="2\pi" /> and{' '}
      <Katex tex="\dfrac{4\pi}{5}" /> was the simplest method to find this.
      <br />
      Many responses quoted the answer as a decimal rather than exact form.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [16.82, 27.94, 19.68, 35.56],
  average: 1.73,
  comment: (
    <>
      Another &lsquo;show that&rsquo; question which required working that shows the use of
      trigonometric identities that are given on the formula sheet.
      <br />
      Speed = magnitude of the velocity vector.
      <br />
      The main reason some responses were not awarded full marks was taking short cuts and not
      showing the development of the solution.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [27.06, 72.94],
  average: 0.72,
  comment: (
    <>
      Students could use the given result from part d to find this.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [34.22, 65.78],
  average: 0.65,
  comment: (
    <>
      Some students did not take care to finish their drawing at the point with coordinates{' '}
      <Katex tex="(-5,-4)" />.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [27.2, 9.1, 63.7],
  average: 1.36,
  comment: (
    <>
      Several responses only included the answer without stating how it was found. The definite
      integral was required.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="t = 0: \quad x = 5\cos(0)-4\cos(0) = 5-4 = 1" />,
    reason: <>Substituting t = 0 into the i-component.</>,
  },
  {
    working: <Katex display tex="t = 0: \quad y = 5\sin(0)-4\sin(0) = 0" />,
    reason: <>And into the j-component.</>,
  },
  {
    working: <Katex display tex="\boxed{(1,\,0)}" />,
    reason: <>In coordinate form — the report notes a common error was not presenting the answer this way.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t = 2\pi: \quad x = 5\cos(2\pi)-4\cos(5\pi) = 5-4(-1) = 9, \qquad y = 0-0 = 0" />,
    reason: <>So (9, 0) is where the particle sits after one full turn of the slower pair of terms — the point the arrow must be drawn at.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \left(-5\sin(t)+10\sin\left(\tfrac{5t}{2}\right)\right)\underset{\sim}{i}+\left(5\cos(t)-10\cos\left(\tfrac{5t}{2}\right)\right)\underset{\sim}{j}" />,
    reason: <>Differentiating each component.</>,
  },
  {
    working: <Katex display tex="t = 2\pi: \quad \underset{\sim}{v} = (0)\underset{\sim}{i}+\big(5-10(-1)\big)\underset{\sim}{j} = 15\,\underset{\sim}{j}" />,
    reason: <>Straight up, with no horizontal component.</>,
  },
  {
    working: <Katex display tex="\text{moving up at } (9,\,0) \implies \text{anticlockwise}" />,
    reason: <>At the rightmost reach of the path, moving upward means turning anticlockwise.</>,
  },
  {
    working: <PathAnswer part="b" />,
    reason: <>The arrow drawn from <Katex tex="(9,0)" />, as the question asks — the report notes many responses did not follow the instruction to base the arrow on that point.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(t), \sin(t) \text{ have period } 2\pi" />,
    reason: <>The first pair of terms repeats every 2π.</>,
  },
  {
    working: <Katex display tex="\cos\left(\tfrac{5t}{2}\right), \sin\left(\tfrac{5t}{2}\right) \text{ have period } \frac{2\pi}{\frac52} = \frac{4\pi}{5}" />,
    reason: <>The second pair has the shorter period, repeating two and a half times as often as the first.</>,
  },
  {
    working: <Katex display tex="\text{need } t = 2\pi k = \frac{4\pi}{5}m \implies 10k = 4m \implies m = \frac{5k}{2}" />,
    reason: <>Both pairs must come back together, so t must be a common multiple. <Katex tex="m" /> is a whole number only when <Katex tex="k" /> is even.</>,
  },
  {
    working: <Katex display tex="k = 2 \implies \boxed{t = 4\pi}" />,
    reason: <>The lowest common multiple of <Katex tex="2\pi" /> and <Katex tex="\tfrac{4\pi}{5}" />. The report notes many responses gave a decimal rather than the exact form. At <Katex tex="t=2\pi" /> the particle is at (9, 0), not back at the start.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\dot x = -5\sin(t)+10\sin\left(\tfrac{5t}{2}\right), \qquad \dot y = 5\cos(t)-10\cos\left(\tfrac{5t}{2}\right)" />,
    reason: <>Differentiating the position vector component by component.</>,
  },
  {
    working: <Katex display tex="\text{speed}^2 = 25\sin^2(t)-100\sin(t)\sin\left(\tfrac{5t}{2}\right)+100\sin^2\left(\tfrac{5t}{2}\right)" />,
    reason: <>Expanding the square of the i-component.</>,
  },
  {
    working: <Katex display tex="\qquad\quad +\;25\cos^2(t)-100\cos(t)\cos\left(\tfrac{5t}{2}\right)+100\cos^2\left(\tfrac{5t}{2}\right)" />,
    reason: <>And of the j-component.</>,
  },
  {
    working: <Katex display tex="= 25+100-100\left(\cos(t)\cos\left(\tfrac{5t}{2}\right)+\sin(t)\sin\left(\tfrac{5t}{2}\right)\right)" />,
    reason: <>Using <Katex tex="\sin^2+\cos^2=1" /> twice, then grouping the two cross terms.</>,
  },
  {
    working: <Katex display tex="\cos(A)\cos(B)+\sin(A)\sin(B) = \cos(A-B)" />,
    reason: <>The compound-angle formula from the formula sheet — the report says the working must show the use of these identities.</>,
  },
  {
    working: <Katex display tex="\text{speed}^2 = 125-100\cos\left(\tfrac{5t}{2}-t\right) = 125-100\cos\left(\tfrac{3t}{2}\right)" />,
    reason: <>Subtracting the angles.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{speed} = \sqrt{125-100\cos\left(\tfrac{3t}{2}\right)}}" />,
    reason: <>Positive root, since speed is a magnitude. As required.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{speed} = \sqrt{125-100\cos\left(\tfrac{3t}{2}\right)}" />,
    reason: <>The result of part d.</>,
  },
  {
    working: <Katex display tex="-1 \le \cos\left(\tfrac{3t}{2}\right) \le 1" />,
    reason: <>The speed is largest when the cosine is most negative, since it is being subtracted.</>,
  },
  {
    working: <Katex display tex="\cos\left(\tfrac{3t}{2}\right) = -1 \implies \text{speed} = \sqrt{125+100} = \sqrt{225}" />,
    reason: <>First attained at <Katex tex="t=\tfrac{2\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{15 \text{ m s}^{-1}}" />,
    reason: <>No calculus needed — the bound on the cosine does all the work.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="t = 0 \implies (1,\,0)" />,
    reason: <>The starting point from part a.</>,
  },
  {
    working: <Katex display tex="t = \pi: \quad x = 5\cos(\pi)-4\cos\left(\tfrac{5\pi}{2}\right) = -5-0 = -5" />,
    reason: <><Katex tex="\cos\left(\tfrac{5\pi}{2}\right)=0" />, so only the first term survives.</>,
  },
  {
    working: <Katex display tex="t = \pi: \quad y = 5\sin(\pi)-4\sin\left(\tfrac{5\pi}{2}\right) = 0-4 = -4" />,
    reason: <><Katex tex="\sin\left(\tfrac{5\pi}{2}\right)=1" />.</>,
  },
  {
    working: <PathAnswer part="f" />,
    reason: <>From <Katex tex="(1,0)" /> the arc dips below the <Katex tex="x" />-axis, swings anticlockwise round the large outer loop and stops at <Katex tex="(-5,-4)" /> — the report notes some students did not take care to finish their drawing there.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\left|\underset{\sim}{v}(t)\right|dt" />,
    reason: <>Arc length is the integral of the speed. The report says the definite integral was required.</>,
  },
  {
    working: <Katex display tex="L = \int_0^{\pi}\sqrt{125-100\cos\left(\tfrac{3t}{2}\right)}\,dt" />,
    reason: <>Using the speed from part d. over the interval traced in part f.</>,
  },
  {
    working: <Katex display tex="= 36.6078\ldots" />,
    reason: <>By <Cas fn="nInt" /> — there is no elementary antiderivative.</>,
  },
  {
    working: <Katex display tex="\boxed{36.6 \text{ metres}}" />,
    reason: <>One decimal place, as asked.</>,
  },
]

export default function SpecialistQ4_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (10 marks)</p>
        <p>The path of a moving particle with position vector</p>
        <div className="py-1">
          <Katex
            display
            tex="\underset{\sim}{r}(t) = \left(5\cos(t)-4\cos\left(\frac{5t}{2}\right)\right)\underset{\sim}{i}+\left(5\sin(t)-4\sin\left(\frac{5t}{2}\right)\right)\underset{\sim}{j}"
          />
        </div>
        <p>is shown below for time <Katex tex="t\ge0" />.</p>
        <p>All lengths are in metres and time is measured in seconds.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={pathSrc}
            alt="VCAA's graph of the path on a grid from −10 to 10: a closed curve of large outer loops and three small inner loops, passing through (1, 0) and reaching as far right as (9, 0)"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The two angles <Katex tex="t" /> and <Katex tex="\tfrac{5t}{2}" /> are what make
            this curve loop. They also make part d. work: squaring and adding the two velocity
            components leaves a pair of cross terms in exactly the shape of{' '}
            <Katex tex="\cos(A)\cos(B)+\sin(A)\sin(B)" />, which collapses to{' '}
            <Katex tex="\cos\!\left(\tfrac{5t}{2}-t\right)" />.
          </p>
          <p>
            Once the speed is in that closed form, parts e. and g. are short: the maximum comes
            from the range of the cosine, with no calculus at all, and the path length is one
            numerical integral.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Starting Point"
        marks={1}
        statement={<>Write down the coordinates of the particle&rsquo;s starting point.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Direction of Motion"
        marks={1}
        statement={
          <>
            On the graph above, draw an arrow from the point <Katex tex="(9,0)" /> to indicate
            the direction of motion of the particle.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Period"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="t" /> for which the particle will first return to its
            starting point.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Speed"
        marks={3}
        statement={
          <>
            Show that the speed of the particle, in m s<Katex tex="^{-1}" />, at time{' '}
            <Katex tex="t" /> can be expressed as{' '}
            <Katex tex="\sqrt{125-100\cos\left(\frac{3t}{2}\right)}" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Maximum Speed"
        marks={1}
        statement={
          <>
            What is the maximum speed of the particle in m s<Katex tex="^{-1}" />?
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Sketch Path"
        marks={1}
        statement={
          <>
            On the graph above, trace the path of the particle for{' '}
            <Katex tex="t\in[0,\pi]" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Arc Length"
        marks={2}
        statement={
          <>
            Find the length of the path traced in <b>part f</b>, giving your answer in metres,
            correct to one decimal place.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
