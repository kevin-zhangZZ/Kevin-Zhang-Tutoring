// 2016 Specialist Mathematics — Exam 2, Question 4 (10 marks).
// Two ships' position vectors: collision check, angle between paths, closest approach.
// Question text transcribed from the original paper; worked solutions below are original.
// Part (b)'s sketch axes VCAA supplied were blank (shown cropped in the part statement), so
// the plotted ship paths are this site's own matplotlib figure, drawn on the same grid
// (x from −10 to 10, y from −6 to 10) and starting at t = 0 (midday). No video walkthrough yet — the tutor will record and add these later.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import shipPathsSrc from './spec-2016e2-q4b-ship-paths.png'
import blankAxesSrc from './spec-2016e2-q4b-blank-axes.png'

const EXAMINER_A: SAExaminerStats = {
  marks: [23, 18, 58],
  average: 1.4,
  comment: (
    <>
      A variety of correct approaches were used by students but the approach above led to success most
      frequently. Many students did not find both times correctly due to
      simple algebraic errors.
    </>
  ),
}

const EXAMINER_B: SAExaminerStats = {
  marks: [25, 19, 19, 36],
  average: 1.7,
  comment:
    'The majority of students found correct cartesian expressions for the paths. Many students did not take note of when the vector functions applied and consequently plotted the paths over incorrect domains. The instruction to show the direction of motion was usually followed.',
}

const EXAMINER_C: SAExaminerStats = {
  marks: [69, 7, 24],
  average: 0.6,
  comment:
    'Students who found velocity vectors before finding the angle between them using a scalar product were more successful than those who used the gradients from the cartesian expressions. Some students found the angle between position vectors at chosen times, which indicated that a greater appreciation of the meaning of position and velocity vectors is required. Occasionally students gave the acute angle between the paths.',
}

const EXAMINER_DI: SAExaminerStats = {
  marks: [64, 9, 27],
  average: 0.7,
  comment:
    'Students who found a displacement vector frequently went on to find the correct time. Some students used an expression for the difference between position vector magnitudes. Students are reminded that the instruction to give the answer correct to three decimal places must be followed to gain full marks. A rational answer did not suffice here.',
}

const EXAMINER_DII: SAExaminerStats = {
  marks: [71, 29],
  average: 0.3,
  comment: 'Many students who did not attempt Question 4di. did not attempt this question.',
}

export default function SpecialistQ4_2016Exam2() {
  const rowsA: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="5(1-t) = 4(t-2)" />
          <Katex display tex="5-5t=4t-8" />
          <Katex display tex="t = \tfrac{13}{9}" />
        </>
      ),
      reason: (
        <>
          Ships collide only if both components of <Katex tex="\underset{\sim}{r}_A" /> and{' '}
          <Katex tex="\underset{\sim}{r}_B" /> match at the <em>same</em> <Katex tex="t" />. Set the{' '}
          <Katex tex="\underset{\sim}{i}" />-components equal — the approach the report says led to success most
          often.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="3(1+t) = 5t-2" />
          <Katex display tex="3+3t=5t-2" />
          <Katex display tex="t = \tfrac{5}{2}" />
        </>
      ),
      reason: <>Set the <Katex tex="\underset{\sim}{j}" />-components equal.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{No common solution for } t}" />,
      reason: (
        <>
          <Katex tex="\tfrac{13}{9} \ne \tfrac{5}{2}" /> — the paths cross, but the ships are never at that
          crossing point at the same time, so the ships do not collide, as required.
        </>
      ),
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\text{Ship } A: \ y = 6 - \tfrac{3}{5}x" />
          <Katex display tex="\text{Ship } B: \ y = 1.25x + 8" />
        </>
      ),
      reason: <>Eliminating <Katex tex="t" /> from each vector gives the cartesian line each ship travels along. But the paths are only the parts for <Katex tex="t\ge0" /> (after midday) — the report notes many students plotted over the wrong domain.</>,
    },
    {
      working: (
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={shipPathsSrc}
            alt="Our sketch on VCAA's grid: ship A's path starting at (5, 3) at t = 0 and heading up-left, and ship B's path starting at (−8, −2) at t = 0 and heading up-right, each with an arrow for its direction"
            className="w-full max-w-[320px]"
          />
        </div>
      ),
      reason: (
        <>
          Start each path at <Katex tex="t=0" />: <Katex tex="A" /> at <Katex tex="(5,3)" />,{' '}
          <Katex tex="B" /> at <Katex tex="(-8,-2)" />. The direction vectors <Katex tex="(-5,3)" /> and{' '}
          <Katex tex="(4,5)" /> (the coefficients of <Katex tex="t" />) fix which way each arrow points.
        </>
      ),
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\cos\theta = \frac{\underset{\sim}{d}_A \cdot \underset{\sim}{d}_B}{|\underset{\sim}{d}_A||\underset{\sim}{d}_B|}" />
          <Katex display tex="= \frac{(-5)(4)+(3)(5)}{\sqrt{34}\sqrt{41}}" />
          <Katex display tex="= \frac{-5}{\sqrt{1394}}" />
        </>
      ),
      reason: <>Using direction vectors <Katex tex="\underset{\sim}{d}_A=(-5,3)" /> and <Katex tex="\underset{\sim}{d}_B=(4,5)" />.</>,
    },
    {
      working: <Katex display tex="\boxed{\theta \approx 97.7^\circ}" />,
      reason: <><Katex tex="\cos\theta \approx -0.1339" />, negative, so this angle is already the obtuse one. Use the velocity (direction) vectors, not position vectors at particular times.</>,
    },
  ]

  const rowsDi: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\underset{\sim}{r}_A - \underset{\sim}{r}_B" />
          <Katex display tex="= \bigl[5(1-t)-4(t-2)\bigr]\underset{\sim}{i}" />
          <Katex display tex="{}+ \bigl[3(1+t)-(5t-2)\bigr]\underset{\sim}{j}" />
          <Katex display tex="= (13-9t)\underset{\sim}{i} + (5-2t)\underset{\sim}{j}" />
        </>
      ),
      reason: <>Displacement from <Katex tex="B" /> to <Katex tex="A" />.</>,
    },
    {
      working: (
        <>
          <Katex display tex="D(t)^2=(13-9t)^2+(5-2t)^2" />
          <Katex display tex="= 85t^2-254t+194" />
          <Katex display tex="\begin{aligned} \frac{d}{dt}\bigl(D^2\bigr) &= 170t - 254 \\ &= 0 \end{aligned}" />
          <Katex display tex="\begin{aligned} t &= \frac{254}{170} \\ &= \frac{127}{85} \end{aligned}" />
        </>
      ),
      reason: <>Minimise the square of the distance — the same <Katex tex="t" /> minimises the distance itself. Use the displacement vector between the ships, not the difference of their magnitudes.</>,
    },
    {
      working: <Katex display tex="\boxed{t \approx 1.494 \text{ hours}}" />,
      reason: <>Three decimal places, as instructed — the exact <Katex tex="\tfrac{127}{85}" /> on its own did not earn the mark.</>,
    },
  ]

  const rowsDii: WorkingRow[] = [
    {
      working: <Katex display tex="\boxed{D_{\min} = \sqrt{4.2471} \approx 2.06 \text{ km}}" />,
      reason: <>Substitute <Katex tex="t\approx1.494" /> back; the minimum value of <Katex tex="D(t)^2 \approx 4.2471" />.</>,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (10 marks)</p>
        <p className="mb-2">
          Two ships, <Katex tex="A" /> and <Katex tex="B" />, are observed from a lighthouse at origin{' '}
          <Katex tex="O" />. Relative to <Katex tex="O" />, their position vectors at time <Katex tex="t" /> hours
          after midday are given by
        </p>
        <Katex display tex="\underset{\sim}{r}_A = 5(1-t)\underset{\sim}{i} + 3(1+t)\underset{\sim}{j}, \qquad \underset{\sim}{r}_B = 4(t-2)\underset{\sim}{i} + (5t-2)\underset{\sim}{j}" className="my-2" />
        <p>where displacements are measured in kilometres.</p>
      </div>

      <PartCard letter="a" topic="Collision" marks={2} statement="Show that the two ships will not collide, clearly stating your reason." examinerReport={EXAMINER_A}>
        <WorkingTable rows={rowsA} />
      </PartCard>

      <PartCard letter="b" topic="Sketch Paths" marks={3} statement={
          <>
            <p>Sketch and label the path of each ship on the axes below. Show the direction of motion of each ship with an arrow.</p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
              <img
                src={blankAxesSrc}
                alt="Blank axes with x from −10 to 10 and y from −6 to 10 — from the original 2016 VCAA exam paper"
                className="w-full max-w-[380px]"
              />
            </div>
          </>
        } examinerReport={EXAMINER_B}>
        <WorkingTable rows={rowsB} />
      </PartCard>

      <PartCard letter="c" topic="Angle Between Paths" marks={2} statement="Find the obtuse angle between the paths of the two ships. Give your answer in degrees, correct to one decimal place." examinerReport={EXAMINER_C}>
        <WorkingTable rows={rowsC} />
      </PartCard>

      <PartCard letter="d.i" topic="Closest Approach" marks={2} statement={<>Find the value of <Katex tex="t" />, correct to three decimal places, when the ships are closest.</>} examinerReport={EXAMINER_DI}>
        <WorkingTable rows={rowsDi} />
      </PartCard>

      <PartCard letter="d.ii" topic="Minimum Distance" marks={1} statement="Find the minimum distance between the ships, in kilometres, correct to two decimal places." examinerReport={EXAMINER_DII}>
        <WorkingTable rows={rowsDii} />
      </PartCard>
    </div>
  )
}
