// 2023 Specialist NHT — Exam 2, Section B Question 4 (11 marks). The NHT report gives sample
// answers only, with no statistics; its one note (part b.: starting point and direction both
// needed) is quoted. Larry swims round an ellipse r(t) = (50 + 50 sin t) i + (40 + 40 cos t) j:
// its Cartesian equation, start point and direction, distance once round (arc length), average
// speed, speed as √(1600 + 900 cos² t), maximum speed and where, and the values of a for which a
// dolphin at (120 − at) i + (10 + t²) j meets him. Question text transcribed from the original
// paper. The closed-path graph is VCAA's own figure, cropped from page 18 of the original VCAA exam
// PDF at 300 dpi (spec-2023nhte2-q4-path.png); the part b. answer is an SVG overlay on it,
// calibrated from the gridlines measured on the crop (origin at (136, 800), 6.975 px per metre
// horizontally and 6.63 px per metre vertically). The part e. figure (spec-2023nhte2-q4e-meet.png)
// is this site's own explanatory graph, which VCAA never printed. Answers checked with
// scipy/sympy and against the report's sample answers, which agree: a. (x−50)²/2500 + (y−40)²/1600
// = 1; b. (50, 80), clockwise; c. 283.62 m and 45.1 m/min; d. √(1600 + 900 cos² t), 50 m/min at
// (50, 80) and (50, 0); e. a = 13.78 or 26.56. The report's c.ii line prints 283.62/5 = 45.1: the
// 5 is a slip for 2π (283.62/5 = 56.7), and the working says so. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import pathSrc from './spec-2023nhte2-q4-path.png'
import meetSrc from './spec-2023nhte2-q4e-meet.png'

const REPORT_B: SAExaminerStats = {
  comment: <>Both the starting point and the direction needed to be shown for full marks.</>,
}

// Calibration of VCAA's grid in the crop's own pixels (1130 × 890).
const OX = 136
const OY = 800
const SX = 6.975
const SY = 6.63
const px = (x: number) => OX + x * SX
const py = (y: number) => OY - y * SY
const ORANGE = '#f97316'
const LABEL = { fontSize: 40, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

// One arrow along Larry's path, from t0 to t1, with its head at t1 pointing the way he swims.
function PathArrow({ t0, t1 }: { t0: number; t1: number }) {
  const n = 24
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n
    pts.push([px(50 + 50 * Math.sin(t)), py(40 + 40 * Math.cos(t))])
  }
  const [xe, ye] = pts[n]
  const [xp, yp] = pts[n - 2]
  const len = Math.hypot(xe - xp, ye - yp)
  const ux = (xe - xp) / len
  const uy = (ye - yp) / len
  const head = 34
  const half = 17
  const bx = xe - ux * head
  const by = ye - uy * head
  const line = pts.slice(0, n - 1).map(([x, y]) => `${x},${y}`).join(' ') + ` ${bx},${by}`
  return (
    <>
      <polyline points={line} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinecap="round" />
      <polygon points={`${xe},${ye} ${bx - uy * half},${by + ux * half} ${bx + uy * half},${by - ux * half}`} fill={ORANGE} />
    </>
  )
}

function StartAnswer() {
  const x0 = px(50)
  const y0 = py(80)
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img loading="lazy" decoding="async" src={pathSrc}
          alt="VCAA's graph of the closed elliptical path with the answer drawn over it: a dot at the top of the ellipse labelled (50, 80), and arrows along the path pointing clockwise (rightwards along the top, leftwards along the bottom)"
          className="w-full block" />
        <svg viewBox="0 0 1130 890" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <PathArrow t0={0.35} t1={0.85} />
          <PathArrow t0={Math.PI + 0.35} t1={Math.PI + 0.85} />
          <circle cx={x0} cy={y0} r={13} fill={ORANGE} />
          <text x={x0 - 10} y={y0 - 28} textAnchor="middle" {...LABEL}>(50, 80)</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = 50+50\sin(t), \qquad y = 40+40\cos(t)" />,
    reason: <>Read the two components of <Katex tex="\underset{\sim}{r}_{\text{L}}(t)" /> as parametric equations for <Katex tex="x" /> and <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\sin(t) = \frac{x-50}{50}, \qquad \cos(t) = \frac{y-40}{40}" />,
    reason: <>Isolate the sine and the cosine so the parameter can be eliminated.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{(x-50)^2}{2500}+\frac{(y-40)^2}{1600}=1}" />,
    reason: <>Square and add: <Katex tex="\sin^2(t)+\cos^2(t)=1" /> removes <Katex tex="t" />. An ellipse centred at <Katex tex="(50,40)" /> with semi-axes 50 across and 40 up.</>,
    more: <>Check against the graph in part b.: it runs from <Katex tex="x=0" /> to <Katex tex="x=100" /> and from <Katex tex="y=0" /> to <Katex tex="y=80" />, which is exactly centre <Katex tex="(50,40)" /> plus or minus 50 and 40.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_{\text{L}}(0) = (50+0)\underset{\sim}{i}+(40+40)\underset{\sim}{j} = 50\underset{\sim}{i}+80\underset{\sim}{j}" />,
    reason: <>Larry starts at <Katex tex="t=0" />: <Katex tex="\sin(0)=0" />, <Katex tex="\cos(0)=1" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{\dot r}_{\text{L}}(0) = 50\cos(0)\underset{\sim}{i}-40\sin(0)\underset{\sim}{j} = 50\underset{\sim}{i}" />,
    reason: <>The velocity at the start points in the direction he swims. Here it is straight in the positive <Katex tex="x" /> direction: from the top of the ellipse he heads right.</>,
    more: <>A second check: a quarter of the way round, <Katex tex="t=\tfrac{\pi}{2}" /> gives <Katex tex="(100,40)" />, the right-hand end. Top, then right, then bottom (<Katex tex="t=\pi" />, <Katex tex="(50,0)" />): clockwise.</>,
  },
  {
    working: <StartAnswer />,
    reason: <>Mark and label the start <Katex tex="(50,80)" />, and draw arrows along the path showing he swims clockwise.</>,
    more: <>Both are needed: the report notes that the starting point and the direction each had to be shown for full marks.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}_{\text{L}}(t) = 50\cos(t)\underset{\sim}{i}-40\sin(t)\underset{\sim}{j}" />,
    reason: <>Differentiate each component with respect to <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\bigl|\underset{\sim}{\dot r}_{\text{L}}(t)\bigr| = \sqrt{2500\cos^2(t)+1600\sin^2(t)}" />,
    reason: <>Speed is the magnitude of the velocity.</>,
  },
  {
    working: <Katex display tex="\text{distance} = \int_0^{2\pi}\bigl|\underset{\sim}{\dot r}_{\text{L}}(t)\bigr|\,dt" />,
    reason: <>Distance travelled is the integral of speed, <Katex tex="\bigl|\underset{\sim}{\dot r}_{\text{L}}(t)\bigr|" />, over the time taken. Once around the path is <Katex tex="0\le t\le 2\pi" />.</>,
  },
  {
    working: <Cas fn="nInt">nInt(√((50cos(t))² + (−40sin(t))²), t, 0, 2π)</Cas>,
    reason: <>The perimeter of an ellipse has no elementary antiderivative, so this is a numerical integral on CAS.</>,
  },
  {
    working: <Katex display tex="\boxed{283.62 \text{ m}}" />,
    reason: <><Katex tex="283.6166\ldots" />, correct to two decimal places.</>,
    more: <>Sanity check: the ellipse sits between a circle of radius 40 (perimeter <Katex tex="80\pi\approx251" />) and one of radius 50 (perimeter <Katex tex="100\pi\approx314" />), and 283.62 is between the two.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average speed} = \frac{\text{distance}}{\text{time}} = \frac{283.6166\ldots}{2\pi}" />,
    reason: <>Average speed is total distance over total time. Once round takes <Katex tex="2\pi" /> minutes, the length of the domain <Katex tex="0\le t\le2\pi" />. Use the unrounded distance from part c.i.</>,
  },
  {
    working: <Katex display tex="\boxed{45.1 \text{ m/min}}" />,
    reason: <><Katex tex="45.139\ldots" />, correct to one decimal place.</>,
    more: <>The report&apos;s line reads <Katex tex="\tfrac{283.62}{5}=45.1" />: the 5 is a slip for <Katex tex="2\pi" /> (283.62 divided by 5 would be 56.7), and its answer 45.1 is right. A check: the answer sits between his minimum speed 40 and maximum speed 50 (part d.).</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\bigl|\underset{\sim}{\dot r}_{\text{L}}(t)\bigr| = \sqrt{2500\cos^2(t)+1600\sin^2(t)}" />,
    reason: <>Speed is the magnitude of the velocity from part c.i.</>,
  },
  {
    working: <Katex display tex="= \sqrt{2500\cos^2(t)+1600\bigl(1-\cos^2(t)\bigr)}" />,
    reason: <>The form <Katex tex="\sqrt{a+bf(t)}" /> needs a single trigonometric function, so replace <Katex tex="\sin^2(t)" /> with <Katex tex="1-\cos^2(t)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt{1600+900\cos^2(t)}}" />,
    reason: <>So <Katex tex="a=1600" />, <Katex tex="b=900" />, <Katex tex="f(t)=\cos^2(t)" />.</>,
    more: <>Replacing <Katex tex="\cos^2(t)" /> instead gives the equally correct <Katex tex="\sqrt{2500-900\sin^2(t)}" />; VCAA accepts either.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}0 \le \cos^2(t) \le 1 \\ \text{max speed} = \sqrt{1600+900}\end{gathered}" />,
    reason: <>The speed is largest when <Katex tex="\cos^2(t)" /> is largest, which is 1.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{max speed} = 50 \text{ m/min}}" />,
    reason: <>The square root of 2500.</>,
  },
  {
    working: <Katex display tex="\cos^2(t)=1 \implies t = 0,\ \pi,\ 2\pi" />,
    reason: <>On <Katex tex="0\le t\le2\pi" />, <Katex tex="\cos(t)=\pm1" /> at these three times.</>,
  },
  {
    working: <Katex display tex="\boxed{(50,80) \text{ and } (50,0)}" />,
    reason: <><Katex tex="t=0" /> and <Katex tex="t=2\pi" /> both give <Katex tex="(50,80)" />; <Katex tex="t=\pi" /> gives <Katex tex="(50,0)" />. These are the top and bottom of the ellipse.</>,
    more: <>Makes sense: at the top and bottom he is moving parallel to the long (100 m) axis, and the <Katex tex="x" />-component has amplitude 50, the larger of the two. His slowest, 40 m/min, is at the ends <Katex tex="(0,40)" /> and <Katex tex="(100,40)" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_{\text{L}}(t) = \underset{\sim}{r}_{\text{D}}(t)" />,
    reason: <>To meet, Larry and the dolphin must be at the same point <em>at the same time</em>, so set the position vectors equal for the same <Katex tex="t" />, with <Katex tex="0\le t\le2\pi" /> (Larry only swims for one lap).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 50+50\sin(t) &= 120-at \\ 40+40\cos(t) &= 10+t^2 \end{aligned}" />,
    reason: <>Equate the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components.</>,
  },
  {
    working: <Cas fn="solve">solve(40 + 40cos(t) = 10 + t², t) | 0 ≤ t ≤ 2π</Cas>,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> equation does not involve <Katex tex="a" />, so it fixes the possible meeting times on its own.</>,
  },
  {
    working: <Katex display tex="t = 2.2446\ldots \quad \text{or} \quad t = 4.4559\ldots" />,
    reason: <>Two times in Larry&apos;s lap when the dolphin is at the same height as him.</>,
  },
  {
    working: <Katex display tex="a = \frac{70-50\sin(t)}{t}" />,
    reason: <>Rearrange the <Katex tex="\underset{\sim}{i}" /> equation for <Katex tex="a" />, so that each meeting time gives the dolphin speed that puts it at Larry&apos;s <Katex tex="x" />-coordinate at that moment.</>,
  },
  {
    working: <Katex display tex="\boxed{a \approx 13.78 \quad \text{or} \quad a \approx 26.56}" />,
    reason: <>Substitute each unrounded <Katex tex="t" />: <Katex tex="t=2.2446\ldots" /> gives <Katex tex="a=13.779\ldots" /> and <Katex tex="t=4.4559\ldots" /> gives <Katex tex="a=26.563\ldots" />. Both are positive, as the question requires, correct to two decimal places.</>,
    more: (
      <>
        <span className="block">
          They meet at about <Katex tex="(89.07,15.04)" /> and <Katex tex="(1.63,29.86)" /> respectively, both on the ellipse. In the graph, Larry&apos;s path is blue and the dolphin&apos;s path for each value of <Katex tex="a" /> is orange.
        </span>
        <img loading="lazy" decoding="async" src={meetSrc}
          alt="This site's own graph: Larry's elliptical path in blue, and the dolphin's path for a ≈ 13.78 (solid orange) and a ≈ 26.56 (dashed orange), each starting at (120, 10) and heading left and up; the meeting points are marked at t ≈ 2.245 near (89, 15) and t ≈ 4.456 near (2, 30)"
          className="w-full max-w-[420px] mt-2 bg-white rounded-lg" />
        <span className="block mt-2">
          The solid path also crosses the ellipse at the top left, but at that place the dolphin and Larry arrive at different times: crossing paths is not meeting.
        </span>
      </>
    ),
  },
]

export default function SpecialistQ4_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (11 marks)</p>
        <p>
          Larry goes for a morning swim in a river that flows into the ocean. He swims once around a
          closed path. His position vector, <Katex tex="\underset{\sim}{r}_{\text{L}}(t)" />, relative
          to an origin, <Katex tex="O" />, after <Katex tex="t" /> minutes, is given by{' '}
          <Katex tex="\underset{\sim}{r}_{\text{L}}(t) = \bigl(50+50\sin(t)\bigr)\underset{\sim}{i}+\bigl(40+40\cos(t)\bigr)\underset{\sim}{j}" />,
          for <Katex tex="0\le t\le2\pi" />, where the displacement components are measured in metres.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The position vector does two jobs here. Its components are parametric equations of
              the path, which give the shape (parts a. and b.). Its derivative is the velocity,
              whose magnitude is the speed, which gives the distance and the speeds (parts c. and d.).
            </p>
            <p>
              Part e. is about two moving objects. They meet only if they are at the same place at
              the same moment, so both position vectors are evaluated at the <em>same</em>{' '}
              <Katex tex="t" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Cartesian Equation"
        marks={1}
        statement={<>Find the Cartesian equation of the closed path using <Katex tex="\underset{\sim}{r}_{\text{L}}(t)" /> above.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Start and Direction"
        marks={2}
        examinerReport={REPORT_B}
        statement={
          <>
            The graph of the closed path is shown on the set of axes below.
            <br />
            Label Larry&apos;s starting point with its coordinates and show the direction in which he swims.
            <img loading="lazy" decoding="async" src={pathSrc}
              alt="VCAA's graph: an ellipse on a grid, x from 0 to 120 and y from 0 to 100 in steps of 20, touching x = 0 and x = 100 at y = 40 and y = 0 and y = 80 at x = 50"
              className="w-full max-w-[420px] mt-3 bg-white rounded-lg" />
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Arc Length"
        marks={1}
        statement={
          <>
            Find the distance that Larry travels when he swims once around the closed path. Give
            your answer in metres, correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Average Speed"
        marks={1}
        statement={
          <>
            Find Larry&apos;s average speed when he swims once around the closed path. Give your
            answer in metres per minute, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_CII} />
        <WrongMethod
          title="Average the velocity instead of the speed"
          working={<Katex display tex="\frac{\bigl|\underset{\sim}{r}_{\text{L}}(2\pi)-\underset{\sim}{r}_{\text{L}}(0)\bigr|}{2\pi} = 0" />}
        >
          That is the average <em>velocity</em>&apos;s magnitude: displacement over time. Larry ends
          where he started, so his displacement is zero. Average <em>speed</em> uses the distance
          actually swum, from part c.i.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Speed"
        marks={1}
        statement={
          <>
            Express Larry&apos;s speed at time <Katex tex="t" /> in the form{' '}
            <Katex tex="\sqrt{a+bf(t)}" />, where <Katex tex="a,b\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Maximum Speed"
        marks={2}
        statement={
          <>
            Find Larry&apos;s maximum speed, in metres per minute, and give the coordinates of the
            points at which he reaches this maximum speed.
          </>
        }
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Meeting Point"
        marks={3}
        statement={
          <>
            On a particular morning, a dolphin is seen in the river.
            <br />
            The position of the dolphin, <Katex tex="\underset{\sim}{r}_{\text{D}}(t)" />, at time,{' '}
            <Katex tex="t" /> minutes, is given by{' '}
            <Katex tex="\underset{\sim}{r}_{\text{D}} = (120-at)\underset{\sim}{i}+\bigl(10+t^2\bigr)\underset{\sim}{j}" />,
            relative to the origin, <Katex tex="O" />, where <Katex tex="t\ge0" />, <Katex tex="a" /> is
            a positive real constant and the displacement components are measured in metres.
            <br />
            For what values of <Katex tex="a" /> will Larry meet the dolphin? Give your answers
            correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
        <WrongMethod
          title="Substitute the dolphin's x and y into the Cartesian equation from part a."
          working={<Katex display tex="\begin{gathered}x=120-at \\ y=10+t^2\end{gathered}" />}
        >
          The Cartesian equation has lost the time: it says where Larry <em>could</em> be, not where
          he is at time <Katex tex="t" />. Solving this finds every <Katex tex="t" /> at which the dolphin
          is somewhere on Larry&apos;s path, whether or not Larry is there then. Equate the two
          position vectors at the same <Katex tex="t" /> instead.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
