// 2026 Specialist NHT — Exam 2, Section B Question 4 (10 marks). The NHT report gives sample
// answers only, with no statistics. Drones as position vectors: the speed of a drone moving in a
// straight line, the angle between two position vectors at t = 2 (scalar product), the shortest
// distance between two drones (minimising a quadratic), a cross product that vanishes at t = 1 (the
// two drones and O collinear), and the times when a malfunctioning drone has the same speed as
// another. Question text transcribed from the original paper (no diagram). Answers checked with
// sympy and against the VCAA report's sample answers, which agree: a.i 6.2 km/h; a.ii 17.8°;
// b. 9.893 km at t = 8/31 ≈ 0.258 h; c.i (1 − t)i + (t − 1)k; c.ii the zero vector; d. t = π/4 + kπ,
// k ∈ Z⁺ ∪ {0}. The report's marking notes for c.ii and d. are given as the examiner's comments; its
// step labels ("Scalar product applied.") are part of the sample answer and not repeated. The
// WrongMethod in b. (97.871, the squared distance) is a verified slip, not taken from the report, which has no comments.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const r = String.raw
const I = r`\underset{\sim}{i}`
const J = r`\underset{\sim}{j}`
const K = r`\underset{\sim}{k}`
const ZERO = r`\underset{\sim}{0}`
const D1 = r`\underset{\sim}{\mathrm{D}}_1`
const D2 = r`\underset{\sim}{\mathrm{D}}_2`
const D3 = r`\underset{\sim}{\mathrm{D}}_3`
const D4 = r`\underset{\sim}{\mathrm{D}}_4`
const d4 = r`\underset{\sim}{\mathrm{d}}_4`

const REPORT_CII: SAExaminerStats = {
  comment: (
    <>
      <Katex tex={r`${D3}(1)\times ${D4}(1)=${ZERO}`} /> null vector – requires tilde or equivalent
      vector notation.
    </>
  ),
}

const REPORT_D: SAExaminerStats = {
  comment: (
    <>
      Solves to give <Katex tex={r`t=\frac{\pi}{4}+k\pi`} /> where{' '}
      <Katex tex={r`k\in Z^+\cup\{0\}`} />. Accepted <Katex tex="N" /> or{' '}
      <Katex tex={r`N\cup\{0\}`} />
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex={r`\dot{\underset{\sim}{\mathrm{D}}}_1(t) = 2${I}+3${J}+5${K}`} />,
    reason: <>Velocity is the derivative of position. Every component of <Katex tex={D1 + '(t)'} /> is linear in <Katex tex="t" />, so the velocity is constant: Drone 1 flies in a straight line at a steady speed.</>,
  },
  {
    working: <Katex display tex={r`\left|\dot{\underset{\sim}{\mathrm{D}}}_1(t)\right| = \sqrt{2^2+3^2+5^2} = \sqrt{38}`} />,
    reason: <>Speed is the magnitude of the velocity vector.</>,
  },
  {
    working: <Katex display tex={r`\boxed{\approx 6.2 \text{ km/h}}`} />,
    reason: <><Katex tex={r`\sqrt{38}=6.164\ldots`} />, correct to one decimal place.</>,
    more: <>Plausible: <Katex tex="\sqrt{36}=6" />, so <Katex tex="\sqrt{38}" /> is a little over 6. The question asks for <em>the</em> speed with no time given, which already hints that it doesn&apos;t depend on <Katex tex="t" />.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex={r`\begin{aligned}${D1}(2) &= 5${I}+7${J}+10${K} \\ ${D2}(2) &= 10${I}+22${J}+16${K}\end{aligned}`} />,
    reason: <>Substitute <Katex tex="t=2" /> into each position vector. The angle is between the two <em>position</em> vectors, the lines from <Katex tex="O" /> out to each drone.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}${D1}(2)\cdot${D2}(2) &= 50+154+160 = 364 \\ \left|${D1}(2)\right| &= \sqrt{25+49+100} = \sqrt{174} \\ \left|${D2}(2)\right| &= \sqrt{100+484+256} = \sqrt{840}\end{aligned}`} />,
    reason: <>The scalar product and the two magnitudes are the ingredients of the angle formula.</>,
  },
  {
    working: <Katex display tex={r`\cos\theta = \frac{364}{\sqrt{174}\sqrt{840}}`} />,
    reason: <>From <Katex tex={r`\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta`} />.</>,
  },
  {
    working: <Katex display tex={r`\boxed{\theta \approx 17.8^\circ}`} />,
    reason: <><Katex tex={r`\cos^{-1}(0.95210\ldots)=17.803\ldots^\circ`} />, in degrees and correct to one decimal place, as asked. Make sure the calculator is in degree mode.</>,
    more: <>Plausible: the cosine is close to 1, so the angle is small. Both position vectors point broadly the same way (all components positive and similar ratios), so a small acute angle makes sense.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex={r`\begin{aligned}${D2}(t)-${D1}(t) &= (5t-2t-1)${I} \\ &\quad +(10t+2-3t-1)${J} \\ &\quad +(3t+10-5t)${K} \\ &= (3t-1)${I}+(7t+1)${J} \\ &\quad +(10-2t)${K}\end{aligned}`} />,
    reason: <>The vector from Drone 1 to Drone 2 at time <Katex tex="t" /> is &ldquo;end minus start&rdquo;. Its length is the distance between them.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}\left|${D2}(t)-${D1}(t)\right|^2 &= (3t-1)^2+(7t+1)^2 \\ &\quad +(10-2t)^2 \\ &= 62t^2-32t+102\end{aligned}`} />,
    reason: <>Work with the <em>square</em> of the distance: it is smallest at the same time as the distance itself, and it has no square root to differentiate.</>,
    more: <>Expanding: <Katex tex="(9t^2-6t+1)+(49t^2+14t+1)+(4t^2-40t+100)" />.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}\frac{d}{dt}\left(62t^2-32t+102\right) &= 124t-32 \\ 124t-32 = 0 \implies t &= \frac{8}{31}\end{aligned}`} />,
    reason: <>The square of the distance is an upward parabola in <Katex tex="t" />, so its single stationary point is the minimum. (Equivalently, the turning point of <Katex tex="at^2+bt+c" /> is at <Katex tex={r`t=-\tfrac{b}{2a}=\tfrac{32}{124}`} />.)</>,
    more: <>Check the domain: <Katex tex={r`t=\tfrac{8}{31}\approx0.258`} /> satisfies <Katex tex="t\ge0" />, so the minimum is actually reached. At <Katex tex="t=0" /> the squared distance is 102, larger, as it should be.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}\left|${D2}-${D1}\right|_{\min} &= \sqrt{62\left(\tfrac{8}{31}\right)^2-32\left(\tfrac{8}{31}\right)+102} \\ &= \sqrt{\tfrac{3034}{31}} = 9.8929\ldots\end{aligned}`} />,
    reason: <>Substitute the time back into the squared distance, then take the square root.</>,
  },
  {
    working: <Katex display tex={r`\boxed{\text{shortest distance} \approx 9.893 \text{ km, at } t \approx 0.258 \text{ h}}`} />,
    reason: <>Both correct to three decimal places, with units, as asked. Both values are needed.</>,
    more: <>On CAS, define the squared distance and use fMin over <Katex tex="t\ge0" />. Sanity check: the drones never get closer than about 9.9 km, a little less than the <Katex tex={r`\sqrt{102}\approx10.1`} /> km at the start.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex={r`${D3}(t)\times${D4}(t) = \begin{vmatrix} ${I} & ${J} & ${K} \\ t & 1 & t \\ t+1 & 2 & t+1 \end{vmatrix}`} />,
    reason: <>Set up the cross product with the components of <Katex tex={D3 + '(t)'} /> in the second row and <Katex tex={D4 + '(t)'} /> in the third, in that order: swapping them reverses the sign.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}&= \big(1(t+1)-2t\big)${I} - \big(t(t+1)-t(t+1)\big)${J} \\ &\quad + \big(2t-(t+1)\big)${K}\end{aligned}`} />,
    reason: <>Expand along the top row. Remember the minus sign on the <Katex tex={J} /> term.</>,
  },
  {
    working: <Katex display tex={r`\boxed{${D3}(t)\times${D4}(t) = (1-t)${I}+(t-1)${K}}`} />,
    reason: <>The <Katex tex={J} /> component is zero for every <Katex tex="t" />.</>,
    more: <>Check: a cross product is perpendicular to both vectors. <Katex tex={r`(t,1,t)\cdot(1-t,0,t-1)=t-t^2+t^2-t=0`} /> and <Katex tex={r`(t+1,2,t+1)\cdot(1-t,0,t-1)=(t+1)(1-t)+(t+1)(t-1)=0`} />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex={r`${D3}(1)\times${D4}(1) = 0${I}+0${K} = ${ZERO}`} />,
    reason: <>Substitute <Katex tex="t=1" /> into part c.i. The result is the zero <em>vector</em>: write it with a tilde (or as <Katex tex="0\underset{\sim}{i}+0\underset{\sim}{j}+0\underset{\sim}{k}" />), not as the number 0.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}${D3}(1) &= ${I}+${J}+${K} \\ ${D4}(1) &= 2${I}+2${J}+2${K} = 2\,${D3}(1)\end{aligned}`} />,
    reason: <>A cross product of two non-zero vectors is zero exactly when they are parallel. Here you can see it directly: one position vector is twice the other.</>,
  },
  {
    working: <Katex display tex={r`\boxed{\begin{gathered}${D3}(1)\times${D4}(1)=${ZERO}\text{: the position} \\ \text{vectors are parallel, so } O\text{, Drone 3} \\ \text{and Drone 4 lie on the same line}\end{gathered}}`} />,
    reason: <>The question asks what this means for the drones&apos; <em>locations</em>, so say it in those terms: at <Katex tex="t=1" /> both drones are on one straight line through the origin (Drone 4 twice as far out as Drone 3).</>,
    more: <>Saying only &ldquo;the vectors are parallel&rdquo; describes the vectors, not where the drones are. Because both position vectors start at <Katex tex="O" />, parallel position vectors put the drones on a single line from <Katex tex="O" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex={r`\dot{\underset{\sim}{\mathrm{D}}}_3(t) = ${I}+${K}, \qquad \left|\dot{\underset{\sim}{\mathrm{D}}}_3(t)\right| = \sqrt2`} />,
    reason: <>Drone 3&apos;s speed is constant.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}\dot{\underset{\sim}{\mathrm{d}}}_4(t) &= ${I}+\big(\cos(t)-\sin(t)\big)${J}+${K} \\ \left|\dot{\underset{\sim}{\mathrm{d}}}_4(t)\right| &= \sqrt{2+\big(\cos(t)-\sin(t)\big)^2}\end{aligned}`} />,
    reason: <>Differentiate the new position vector component by component: the derivative of <Katex tex={r`\sin(t)+\cos(t)`} /> is <Katex tex={r`\cos(t)-\sin(t)`} />.</>,
  },
  {
    working: <Katex display tex={r`\begin{gathered}\sqrt2 = \sqrt{2+\big(\cos(t)-\sin(t)\big)^2} \\ \implies \big(\cos(t)-\sin(t)\big)^2 = 0\end{gathered}`} />,
    reason: <>Equate the speeds and square both sides.</>,
    more: <>Drone 4&apos;s speed is never less than <Katex tex="\sqrt2" />, because a square can&apos;t be negative. The speeds match only at the instants when the extra <Katex tex={J} /> component of its velocity is zero.</>,
  },
  {
    working: <Katex display tex={r`\begin{gathered}\sin(t) = \cos(t) \implies \tan(t) = 1 \\ \implies t = \frac{\pi}{4}+k\pi\end{gathered}`} />,
    reason: <>Divide by <Katex tex={r`\cos(t)`} /> (it can&apos;t be zero here, since then <Katex tex={r`\sin(t)=\pm1\ne\cos(t)`} />). The tangent function repeats every <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex={r`\boxed{t = \frac{\pi}{4}+k\pi, \quad k \in Z^+\cup\{0\}}`} />,
    reason: <>The new position vector applies only from <Katex tex={r`t=\tfrac12`} />. The first solution, <Katex tex={r`t=\tfrac{\pi}{4}\approx0.785`} />, is after <Katex tex={r`\tfrac12`} />, so it counts; negative <Katex tex="k" /> gives negative times, which are rejected.</>,
    more: <>Before the malfunction, <Katex tex={r`\dot{\underset{\sim}{\mathrm{D}}}_4(t)=${I}+${K}`} />, so the two drones had the same speed all the time. That is why the question says to use the new position vector.</>,
  },
]

export default function SpecialistQ4_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (10 marks)</p>
        <p>
          Vectors <Katex tex={r`${D1}(t)=(2t+1)${I}+(3t+1)${J}+5t${K}`} /> and{' '}
          <Katex tex={r`${D2}(t)=5t${I}+(10t+2)${J}+(3t+10)${K}`} /> are the respective position
          vectors of two drones, Drone 1 and Drone 2, relative to an origin <Katex tex="O" />.
          Displacements are measured in kilometres. Time, <Katex tex={r`t\ge0`} />, is measured in
          hours.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              A position vector <Katex tex={r`\underset{\sim}{r}(t)`} /> says where something is at
              time <Katex tex="t" />. Differentiate it to get the velocity; the magnitude of the
              velocity is the speed. The distance between two moving objects is the magnitude of the
              difference of their position vectors.
            </p>
            <p>
              Two products of vectors appear. The scalar (dot) product gives an angle:{' '}
              <Katex tex={r`\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta`} />.
              The cross product gives a vector perpendicular to both, of length{' '}
              <Katex tex={r`|\underset{\sim}{a}||\underset{\sim}{b}|\sin\theta`} />, so it is the zero
              vector exactly when the two vectors are parallel.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Speed"
        marks={1}
        statement={
          <>
            Find the speed of Drone 1.
            <br />
            Give your answer in kilometres per hour, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Angle Between Vectors"
        marks={2}
        statement={
          <>
            Find the angle between vector <Katex tex={D1 + '(t)'} /> and vector{' '}
            <Katex tex={D2 + '(t)'} /> when <Katex tex="t=2" />.
            <br />
            Give your answer in degrees, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Minimum Distance"
        marks={3}
        statement={
          <>
            Determine the shortest distance between Drone 1 and Drone 2, and the time when this
            occurs.
            <br />
            Give the distance in kilometres and the time in hours, each correct to three decimal
            places.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Give the minimum of the squared distance as the answer"
          working={<Katex display tex={r`62\left(\tfrac{8}{31}\right)^2-32\left(\tfrac{8}{31}\right)+102 = 97.871 \text{ km}`} />}
        >
          Squaring the distance was only a convenience for finding the time. The value it gives is a
          distance <em>squared</em> (in km²), so take the square root before answering. A check
          catches it: at <Katex tex="t=0" /> the drones are <Katex tex={r`\sqrt{102}\approx10.1`} /> km
          apart, so a minimum near 98 km can&apos;t be right.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">
          Use the following information to answer part c and part d.
        </p>
        <p>
          Two other drones, Drone 3 and Drone 4, have respective position vectors{' '}
          <Katex tex={r`${D3}(t)=t${I}+${J}+t${K}`} /> and{' '}
          <Katex tex={r`${D4}(t)=(t+1)${I}+2${J}+(t+1)${K}`} /> for <Katex tex={r`t\ge0`} />,
          relative to the same origin <Katex tex="O" />. Displacements are measured in kilometres and
          time is measured in hours.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Cross Product"
        marks={1}
        statement={<>Find the cross product <Katex tex={r`${D3}(t)\times${D4}(t)`} />.</>}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Parallel Vectors"
        marks={1}
        statement={
          <>
            Evaluate this cross product when <Katex tex="t=1" /> and explain what this result means
            in terms of the locations of Drone 3 and Drone 4.
          </>
        }
        examinerReport={REPORT_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Equal Speeds"
        marks={2}
        statement={
          <>
            At time <Katex tex={r`t=\frac12`} />, Drone 4 begins to malfunction so that its position
            is given by the new position vector{' '}
            <Katex tex={r`${d4}(t)=(t+1)${I}+\big(\sin(t)+\cos(t)\big)${J}+(t+1)${K}`} />.
            <br />
            Using this new position vector, determine the values of <Katex tex="t" /> when Drone 3 and
            Drone 4 have the same speed.
          </>
        }
        examinerReport={REPORT_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
