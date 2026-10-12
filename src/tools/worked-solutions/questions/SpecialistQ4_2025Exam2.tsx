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
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
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
        <img loading="lazy" decoding="async" src={pathSrc} alt={ALT[part]} className="w-full block" />
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
    reason: <>Give the position as a coordinate pair.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} t = 2\pi: \quad x &= 5\cos(2\pi)-4\cos(5\pi) \\ &= 5-4(-1) = 9 \\ y &= 5\sin(2\pi)-4\sin(5\pi) = 0 \end{aligned}" />,
    reason: <>First find when the particle is at (9, 0). <Katex tex="x=9" /> needs <Katex tex="\cos(t)=1" /> and <Katex tex="\cos\left(\tfrac{5t}{2}\right)=-1" /> together, and <Katex tex="t=2\pi" /> does both.</>,
    more: <>The largest <Katex tex="x" /> can ever be is <Katex tex="5+4=9" />, and only when both cosines are at their extremes: <Katex tex="\cos(t)=1" /> (so <Katex tex="t=0,\,2\pi,\ldots" />) and <Katex tex="\cos\left(\tfrac{5t}{2}\right)=-1" />. At <Katex tex="t=0" /> the second cosine is <Katex tex="+1" />, but at <Katex tex="t=2\pi" /> it is <Katex tex="\cos(5\pi)=-1" />. So (9, 0) is the right-most point of the whole path, reached at <Katex tex="t=2\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \underset{\sim}{v}(t) = {}&\left(-5\sin(t)+10\sin\left(\tfrac{5t}{2}\right)\right)\underset{\sim}{i} \\ &+\left(5\cos(t)-10\cos\left(\tfrac{5t}{2}\right)\right)\underset{\sim}{j} \end{aligned}" />,
    reason: <>The velocity gives the direction of motion. Differentiate each component (chain rule on the <Katex tex="\tfrac{5t}{2}" /> terms).</>,
  },
  {
    working: <Katex display tex="t = 2\pi: \quad \underset{\sim}{v} = (0)\underset{\sim}{i}+\big(5-10(-1)\big)\underset{\sim}{j} = 15\,\underset{\sim}{j}" />,
    reason: <>Straight up, with no horizontal component.</>,
  },
  {
    working: <Katex display tex="\text{moving up at } (9,\,0) \implies \text{anticlockwise}" />,
    reason: <>At the right-most point of the path, moving upward means turning anticlockwise.</>,
  },
  {
    working: <PathAnswer part="b" />,
    reason: <>The arrow starts at <Katex tex="(9,0)" /> and points straight up.</>,
    more: <>The report notes many responses did not follow the instruction to base the arrow on the point (9, 0). The path crosses itself several times, so an arrow drawn anywhere else is easy to misread — put it exactly where the question says.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(t), \sin(t) \text{ have period } 2\pi" />,
    reason: <>The particle is surely back at the start once both pairs of terms are back to their <Katex tex="t=0" /> values. The first pair repeats every 2π.</>,
  },
  {
    working: <Katex display tex="\cos\left(\tfrac{5t}{2}\right), \sin\left(\tfrac{5t}{2}\right) \text{ have period } \frac{2\pi}{\frac52} = \frac{4\pi}{5}" />,
    reason: <>Period <Katex tex="\tfrac{2\pi}{n}" /> with <Katex tex="n=\tfrac52" />: this pair repeats two and a half times as often as the first.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{need } t = 2\pi k = \frac{4\pi}{5}m \\ &\implies 10k = 4m \implies m = \frac{5k}{2} \end{aligned}" />,
    reason: <>Both pairs must come back together, so t must be a whole number of each period. <Katex tex="m" /> is a whole number only when <Katex tex="k" /> is even.</>,
  },
  {
    working: <Katex display tex="k = 2 \implies \boxed{t = 4\pi}" />,
    reason: <>The smallest even <Katex tex="k" /> gives the lowest common multiple of <Katex tex="2\pi" /> and <Katex tex="\tfrac{4\pi}{5}" />, and the particle does not pass through (1, 0) any earlier. Leave it exact.</>,
    more: (
      <>
        The report notes many responses gave a decimal rather than the exact form — 12.57 is not 4π. Two
        checks that <Katex tex="4\pi" /> really is the <em>first</em> return. At{' '}
        <Katex tex="t=2\pi" /> only the first pair has come round: the particle is at (9, 0), as
        found in part b. And could the particle pass through (1, 0) earlier, mid-cycle? Squaring
        and adding the components (the same identities as part d) gives{' '}
        <Katex tex="|\underset{\sim}{r}|^2 = 41-40\cos\left(\tfrac{3t}{2}\right)" />, which equals 1
        only when <Katex tex="\cos\left(\tfrac{3t}{2}\right)=1" />, i.e. at{' '}
        <Katex tex="t=\tfrac{4\pi}{3}" /> and <Katex tex="\tfrac{8\pi}{3}" /> before{' '}
        <Katex tex="4\pi" />. There the particle is at{' '}
        <Katex tex="\left(-\tfrac12,\mp\tfrac{\sqrt3}{2}\right)" />: one unit from the origin, but
        not at (1, 0).
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \dot x &= -5\sin(t)+10\sin\left(\tfrac{5t}{2}\right) \\ \dot y &= 5\cos(t)-10\cos\left(\tfrac{5t}{2}\right) \end{aligned}" />,
    reason: <>Differentiating the position vector component by component.</>,
  },
  {
    working: <Katex display tex="\text{speed} = |\underset{\sim}{v}| = \sqrt{\dot x^2+\dot y^2}" />,
    reason: <>Speed is the magnitude of the velocity vector. Work with <Katex tex="\text{speed}^2" /> and take the root at the end.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{speed}^2 = {}&25\sin^2(t)-100\sin(t)\sin\left(\tfrac{5t}{2}\right) \\ &+100\sin^2\left(\tfrac{5t}{2}\right) \end{aligned}" />,
    reason: <>Expanding <Katex tex="\dot x^2" /> as a perfect square.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &+25\cos^2(t)-100\cos(t)\cos\left(\tfrac{5t}{2}\right) \\ &+100\cos^2\left(\tfrac{5t}{2}\right) \end{aligned}" />,
    reason: <>And <Katex tex="\dot y^2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= 25+100 \\ &\quad -100\Big(\cos(t)\cos\left(\tfrac{5t}{2}\right) \\ &\qquad\quad +\sin(t)\sin\left(\tfrac{5t}{2}\right)\Big) \end{aligned}" />,
    reason: <>Pair the squares: <Katex tex="25\left(\sin^2(t)+\cos^2(t)\right)=25" />, and likewise 100 for the <Katex tex="\tfrac{5t}{2}" /> terms. The two cross terms share <Katex tex="-100" />.</>,
  },
  {
    working: <Katex display tex="\cos(A)\cos(B)+\sin(A)\sin(B) = \cos(A-B)" />,
    reason: <>The bracket has this shape: the formula sheet&rsquo;s <Katex tex="\cos(x-y)" /> identity read right to left, with <Katex tex="A=\tfrac{5t}{2}" /> and <Katex tex="B=t" />.</>,
    more: <>The report says this &lsquo;show that&rsquo; question required working that shows the use of the trigonometric identities on the formula sheet, and that the main reason for lost marks was taking short cuts. Jumping from the squared components straight to <Katex tex="125-100\cos\left(\tfrac{3t}{2}\right)" /> is such a short cut: write the expansion, the <Katex tex="\sin^2+\cos^2=1" /> step and this identity as separate lines. The order of <Katex tex="A" /> and <Katex tex="B" /> does not matter, since <Katex tex="\cos(-\theta)=\cos(\theta)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{speed}^2 &= 125-100\cos\left(\tfrac{5t}{2}-t\right) \\ &= 125-100\cos\left(\tfrac{3t}{2}\right) \end{aligned}" />,
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
    reason: <>The result of part d — usable here even if you could not prove it.</>,
  },
  {
    working: <Katex display tex="-1 \le \cos\left(\tfrac{3t}{2}\right) \le 1" />,
    reason: <>The speed is largest when the cosine is most negative, since it is being subtracted.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\cos\left(\tfrac{3t}{2}\right) = -1 \\ &\implies \text{speed} = \sqrt{125+100} = \sqrt{225} \end{aligned}" />,
    reason: <>This really happens, e.g. at <Katex tex="t=\tfrac{2\pi}{3}" /> (where <Katex tex="\tfrac{3t}{2}=\pi" />), so the bound is reached.</>,
  },
  {
    working: <Katex display tex="\boxed{15 \text{ m s}^{-1}}" />,
    reason: <>No calculus needed — the bound on the cosine does all the work.</>,
    more: <>A check against part b: at <Katex tex="t=2\pi" /> the velocity was <Katex tex="15\,\underset{\sim}{j}" />, speed 15, and indeed <Katex tex="\cos(3\pi)=-1" />. The slowest speed is <Katex tex="\sqrt{125-100}=5" />, when the cosine is <Katex tex="+1" />, for example at the start.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="t = 0 \implies (1,\,0), \qquad \underset{\sim}{v}(0) = -5\,\underset{\sim}{j}" />,
    reason: <>Start at the point from part a, moving straight down (put <Katex tex="t=0" /> into the velocity from part b).</>,
  },
  {
    working: <Katex display tex="t = \tfrac{\pi}{2}: \quad \left(2\sqrt2,\; 5+2\sqrt2\right) \approx (2.8,\,7.8)" />,
    reason: <>A midway point shows the arc goes up over the top of the large loop. Uses <Katex tex="\cos\left(\tfrac{5\pi}{4}\right)=\sin\left(\tfrac{5\pi}{4}\right)=-\tfrac{\sqrt2}{2}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t = \pi: \quad x &= 5\cos(\pi)-4\cos\left(\tfrac{5\pi}{2}\right) \\ &= -5-0 = -5 \end{aligned}" />,
    reason: <>The end point. <Katex tex="\cos\left(\tfrac{5\pi}{2}\right)=0" />, so only the first term survives.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t = \pi: \quad y &= 5\sin(\pi)-4\sin\left(\tfrac{5\pi}{2}\right) \\ &= 0-4 = -4 \end{aligned}" />,
    reason: <><Katex tex="\sin\left(\tfrac{5\pi}{2}\right)=1" />.</>,
  },
  {
    working: <PathAnswer part="f" />,
    reason: <>From <Katex tex="(1,0)" /> the arc dips below the <Katex tex="x" />-axis, swings anticlockwise round the large outer loop and stops at <Katex tex="(-5,-4)" />.</>,
    more: <>The report notes some students did not take care to finish their drawing at <Katex tex="(-5,-4)" />. Mark both end points on the graph first, then follow the printed curve between them, stopping exactly at <Katex tex="(-5,-4)" /> rather than running on along the curve.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\left|\underset{\sim}{v}(t)\right|dt" />,
    reason: <>Arc length is the integral of the speed over the time interval.</>,
    more: <>The report notes several responses only included the answer without stating how it was found, and says the definite integral was required — so write the integral, with its terminals, before the number.</>,
  },
  {
    working: <Katex display tex="L = \int_0^{\pi}\sqrt{125-100\cos\left(\tfrac{3t}{2}\right)}\,dt" />,
    reason: <>Using the speed from part d, over the interval <Katex tex="[0,\pi]" /> traced in part f.</>,
  },
  {
    working: <Katex display tex="= 36.6078\ldots" />,
    reason: <>By <Cas fn="nInt" /> — there is no elementary antiderivative.</>,
    more: <>A sense check: the speed stays between 5 and 15 (part e), so over <Katex tex="\pi" /> seconds the length must lie between <Katex tex="5\pi\approx15.7" /> and <Katex tex="15\pi\approx47.1" />.</>,
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
            tex="\begin{aligned} \underset{\sim}{r}(t) = {}&\left(5\cos(t)-4\cos\left(\frac{5t}{2}\right)\right)\underset{\sim}{i} \\ &+\left(5\sin(t)-4\sin\left(\frac{5t}{2}\right)\right)\underset{\sim}{j} \end{aligned}"
          />
        </div>
        <p>is shown below for time <Katex tex="t\ge0" />.</p>
        <p>All lengths are in metres and time is measured in seconds.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={pathSrc}
            alt="VCAA's graph of the path on a grid from −10 to 10: a closed curve of large outer loops and three small inner loops, passing through (1, 0) and reaching as far right as (9, 0)"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <DetailOnly>
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
      </DetailOnly>

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
