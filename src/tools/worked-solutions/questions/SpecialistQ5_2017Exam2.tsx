// 2017 Specialist Mathematics — Exam 2, Section B, Question 5 (10 marks).
// A boat on an ellipse and a jet ski on a circle: starting points and directions, when
// their speeds match, the distance between them, and a collision condition. Question text
// transcribed from the original paper; the path figure is a crop of VCAA's own artwork, and
// the part a. answer marks the starting points and directions over that same crop
// (calibrated to its gridlines) rather than redrawing the paths. Answers verified with sympy
// and scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import pathsSrc from './spec-2017e2-q5-paths.png'

const EXAM_A: SAExaminerStats = {
  marks: [19, 29, 52],
  average: 1.4,
  comment: (
    <>
      Students plotted the initial positions correctly but significant numbers of students
      did not label the direction of motion or clearly identify the jet ski and the boat.
      Both requirements were explicitly stated in the question.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [31, 13, 56],
  average: 1.3,
  comment: (
    <>
      Most students found correct expressions for velocity vectors. The most common error
      was to equate these velocity <em>vectors</em> rather than equating speeds.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: <>Some answers were not given in coordinate form.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      A variety of correct forms was given by students; many of these were likely produced
      by CAS technology, including expressions involving double angles. Students should take
      care when transcribing expressions from technology output as errors frequently occur,
      particularly regarding the number and placement of brackets. Some incorrect answers
      retained vectors in the expression.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [85, 15],
  average: 0.2,
  comment: <>Many students found this question difficult. Incorrect answers involving other locally minimum values were frequent.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [39, 25, 9, 27],
  average: 1.3,
  comment: (
    <>
      Most students correctly equated the vector components and solved for <Katex tex="t" />.
      Many went on to give decimal approximations rather than supplying the exact forms.
      Students are reminded of the instruction saying that an exact answer is required unless
      otherwise specified.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_B(0) = (1-2)\underset{\sim}{i}+(3+0)\underset{\sim}{j} = -\underset{\sim}{i}+3\underset{\sim}{j}" />,
    reason: <>Boat at <Katex tex="(-1,3)" /> — the leftmost point of the ellipse.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}_J(0) = (1-0)\underset{\sim}{i}+(2-1)\underset{\sim}{j} = \underset{\sim}{i}+\underset{\sim}{j}" />,
    reason: <>Jet ski at <Katex tex="(1,1)" /> — the bottom of the circle.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}_B(0) = 2\sin(0)\underset{\sim}{i}+\cos(0)\underset{\sim}{j} = \underset{\sim}{j}" />,
    reason: <>Differentiating and substituting <Katex tex="t=0" />: the boat sets off straight up from the left edge of its ellipse, which means it is going <strong>clockwise</strong>.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}_J(0) = -\cos(0)\underset{\sim}{i}+\sin(0)\underset{\sim}{j} = -\underset{\sim}{i}" />,
    reason: <>The jet ski sets off to the left from the bottom of its circle — also <strong>clockwise</strong>. The report says significant numbers of students plotted the starting points correctly but did not show the direction of motion or clearly identify which vessel was which — both explicitly asked for.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\dot{\underset{\sim}{r}}_B\right| = \sqrt{4\sin^2 t+\cos^2 t}" />,
    reason: <>Speed is the <em>magnitude</em> of velocity. Equating the velocity vectors themselves asks a different (and here unsolvable) question — the report's most common error.</>,
  },
  {
    working: <Katex display tex="\left|\dot{\underset{\sim}{r}}_J\right| = \sqrt{\cos^2 t+\sin^2 t} = 1" />,
    reason: <>The jet ski travels at constant speed <Katex tex="1" /> km/min — it is going round a unit circle at unit angular rate.</>,
  },
  {
    working: <Katex display tex="4\sin^2 t+\cos^2 t = 1" />,
    reason: <>Setting the two speeds equal and squaring.</>,
  },
  {
    working: <Katex display tex="3\sin^2 t = 0 \implies \sin t = 0" />,
    reason: <>Using <Katex tex="\cos^2 t = 1-\sin^2 t" />. Tidier than going to the CAS.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \pi}" />,
    reason: <><Katex tex="t=0" /> also satisfies it, but the question asks for the first time <Katex tex="t>0" />. Geometrically: the boat matches the jet ski's speed only at the two ends of its ellipse, where it is moving along the short direction.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_B(\pi) = (1-2\cos\pi)\underset{\sim}{i}+(3+\sin\pi)\underset{\sim}{j}" />,
    reason: <>Substituting <Katex tex="t=\pi" />.</>,
  },
  {
    working: <Katex display tex="= (1+2)\underset{\sim}{i}+3\underset{\sim}{j}" />,
    reason: <><Katex tex="\cos\pi=-1" /> and <Katex tex="\sin\pi=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(3,3)}" />,
    reason: <>The rightmost point of the ellipse — half a lap from where it started, which is right after time <Katex tex="\pi" /> out of a period of <Katex tex="2\pi" />. Give it as coordinates, not a vector: the report notes some answers were not given in coordinate form.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_J-\underset{\sim}{r}_B = \bigl(2\cos t-\sin t\bigr)\underset{\sim}{i}-\bigl(1+\cos t+\sin t\bigr)\underset{\sim}{j}" />,
    reason: <>Component by component: <Katex tex="(1-\sin t)-(1-2\cos t)=2\cos t-\sin t" />, and <Katex tex="(2-\cos t)-(3+\sin t)=-1-\cos t-\sin t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d(t) = \sqrt{\bigl(2\cos t-\sin t\bigr)^2+\bigl(1+\cos t+\sin t\bigr)^2}}" />,
    reason: <>The magnitude of the difference. It must be a <em>scalar</em> — the report notes answers that left <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> in.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Cas fn="fMin">fMin(√((2cos(t)-sin(t))² + (1+cos(t)+sin(t))²), t, 0, 2π)</Cas>,
    reason: <>Both motions have period <Katex tex="2\pi" />, so one full period covers every possibility. The graph of <Katex tex="d(t)" /> has two dips per cycle — a local minimum of about <Katex tex="2.24" /> at <Katex tex="t=\tfrac{\pi}{2}" /> and the true minimum near <Katex tex="t\approx4.28" /> — and the report says answers giving other local minimum values were frequent.</>,
  },
  {
    working: <Katex display tex="\boxed{d_{\min} \approx 0.33 \text{ km}}" />,
    reason: <>Two decimal places — about <Katex tex="330" /> m. The paths themselves cross, but the two vessels are never at a crossing point at the same time, so the gap never closes.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="1-\sin t = 1-2\cos t" />,
    reason: <>A collision needs both components to agree at the <em>same</em> time — not just the paths to cross. Start with the <Katex tex="\underset{\sim}{i} " /> component, which does not involve <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\sin t = 2\cos t \implies \tan t = 2" />,
    reason: <>Dividing by <Katex tex="\cos t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \arctan(2)}" />,
    reason: <>About <Katex tex="1.107" /> minutes — "shortly after starting", as the question says, so this first solution is the one wanted. Exact form was required.</>,
  },
  {
    working: <Katex display tex="\sin t = \frac{2}{\sqrt5}, \qquad \cos t = \frac{1}{\sqrt5}" />,
    reason: <>From a right triangle with opposite <Katex tex="2" />, adjacent <Katex tex="1" />, hypotenuse <Katex tex="\sqrt5" />. Both positive, since <Katex tex="\arctan(2)" /> is in the first quadrant.</>,
  },
  {
    working: <Katex display tex="a-\cos t = 3+\sin t \implies a = 3+\sin t+\cos t" />,
    reason: <>Now the <Katex tex="\underset{\sim}{j} " /> component, with <Katex tex="t" /> known.</>,
  },
  {
    working: <Katex display tex="a = 3+\frac{2}{\sqrt5}+\frac{1}{\sqrt5} = 3+\frac{3}{\sqrt5}" />,
    reason: <>Adding the two fractions.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 3+\frac{3\sqrt5}{5}}" />,
    reason: <>Rationalised — about <Katex tex="4.34" />. The jet ski would have to start from <Katex tex="(1, a-1)\approx(1,3.34)" />, about <Katex tex="2.34" /> km further in the <Katex tex="\underset{\sim}{j}" /> direction than on the first morning.</>,
  },
]

export default function SpecialistQ5_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (10 marks)</p>
        <p className="mb-3">
          On a particular morning, the position vectors of a boat and a jet ski on a lake{' '}
          <Katex tex="t" /> minutes after they have started moving are given by{' '}
          <Katex tex="\underset{\sim}{r}_B(t)=\bigl(1-2\cos(t)\bigr)\underset{\sim}{i}+\bigl(3+\sin(t)\bigr)\underset{\sim}{j}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{r}_J(t)=\bigl(1-\sin(t)\bigr)\underset{\sim}{i}+\bigl(2-\cos(t)\bigr)\underset{\sim}{j}" />{' '}
          respectively for <Katex tex="t\ge0" />, where distances are measured in kilometres.
          The boat and the jet ski start moving at the same time. The graphs of their paths
          are shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={pathsSrc}
            alt="Two closed curves on grid axes: a wide ellipse centred at (1, 3) spanning x from −1 to 3 and y from 2 to 4, and a unit circle centred at (1, 2) — from the original 2017 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Initial Positions"
        marks={2}
        statement={
          <>
            On the diagram above, mark the initial positions of the boat and the jet ski,
            clearly identifying each of them. Use arrows to show the directions in which they move.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <StartOverlay />
        </div>
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Equal Speeds"
        marks={2}
        statement={
          <>
            Find the first time for <Katex tex="t>0" /> when the speeds of the boat and the
            jet ski are the same.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <Background title="Same speed is not the same velocity">
          <p>
            Speed is <Katex tex="\left|\dot{\underset{\sim}{r}}\right|" />, a single number.
            Two vessels can have the same speed while heading in completely different
            directions — which is exactly what happens here.
          </p>
          <p>
            Setting the velocity <em>vectors</em> equal is a much stronger condition and has
            no solution in this question. The report says that was the most common error.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Position"
        marks={1}
        statement={<>State the coordinates of the boat at this time.</>}
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Distance"
        marks={1}
        statement={
          <>
            Write down an expression for the distance between the jet ski and the boat at any
            time <Katex tex="t" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Minimum Distance"
        marks={1}
        statement={
          <>
            Find the minimum distance separating the boat and the jet ski. Give your answer
            in kilometres, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          On another morning, the boat's position vector remained the same but the jet skier
          considered starting from a different location with a new position vector given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\bigl(1-\sin(t)\bigr)\underset{\sim}{i}+\bigl(a-\cos(t)\bigr)\underset{\sim}{j}" />
          , <Katex tex="t\ge0" />, where <Katex tex="a" /> is a real constant. Both vessels
          are to start at the same time.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Collision"
        marks={3}
        statement={
          <>
            Assuming the vessels would collide shortly after starting, find the time of the
            collision and the value of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}

// The part a. answer drawn over the real cropped VCAA figure, not a redrawing of it.
// Calibration measured from spec-2017e2-q5-paths.png (813×733 px): the gridlines
// x = −2 … 4 sit at 57.5 … 734.5 px (112.5 px per unit, x = 0 at 282.5) and y = −1 … 5 at
// 704 … 79 px (about 104.2 px per unit, y = 0 at 600).
const PX = (x: number) => 282.5 + 112.5 * x
const PY = (y: number) => 600 - 104.2 * y

function StartOverlay() {
  return (
    <div className="relative w-full max-w-[400px]">
      <img
        src={pathsSrc}
        alt="The two paths with the boat's starting point marked at (−1, 3) with an arrow pointing up, and the jet ski's at (1, 1) with an arrow pointing left — both indicating clockwise motion"
        className="w-full block"
      />
      <svg viewBox="0 0 813 733" className="absolute inset-0 w-full h-full">
        <defs>
          <marker id="s17e2q5-boat" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9" />
          </marker>
          <marker id="s17e2q5-ski" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#f97316" />
          </marker>
        </defs>
        <line x1={PX(-1)} y1={PY(3)} x2={PX(-1)} y2={PY(3.55)} stroke="#0ea5e9" strokeWidth={6} markerEnd="url(#s17e2q5-boat)" />
        <circle cx={PX(-1)} cy={PY(3)} r={10} fill="#0ea5e9" />
        <text x={PX(-1) - 16} y={PY(3) + 44} fontSize={28} textAnchor="middle" fill="#0284c7" stroke="white" strokeWidth={6} paintOrder="stroke">boat (−1, 3)</text>
        <line x1={PX(1)} y1={PY(1)} x2={PX(0.45)} y2={PY(1)} stroke="#f97316" strokeWidth={6} markerEnd="url(#s17e2q5-ski)" />
        <circle cx={PX(1)} cy={PY(1)} r={10} fill="#f97316" />
        <text x={PX(1) + 20} y={PY(1) + 42} fontSize={28} textAnchor="start" fill="#ea580c" stroke="white" strokeWidth={6} paintOrder="stroke">jet ski (1, 1)</text>
      </svg>
    </div>
  )
}

