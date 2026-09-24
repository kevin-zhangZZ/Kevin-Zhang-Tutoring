// 2015 Specialist Mathematics — Exam 2, Section 2 Question 4 (12 marks). A model helicopter
// climbing on a helix: altitude, angle of elevation, period of the horizontal motion,
// velocity perpendicular to acceleration, speed, and a distance to a fixed point. Question
// text transcribed from the original paper (no diagram given). Answers checked with sympy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_AI: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      Most students answered this question well. A number of students attempted to solve{' '}
      <Katex tex="\underset{\sim}{r}(t)=60" />, failing to realise that only the{' '}
      <Katex tex="\underset{\sim}{k}" /> component was 60.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [52, 15, 33],
  average: 0.8,
  comment: (
    <>
      A significant number of students seemed not to know what "angle of elevation" meant. A
      number found the complementary angle – the angle with the vertical. Others found angles
      made with the <Katex tex="\underset{\sim}{i}" /> or <Katex tex="\underset{\sim}{j}" />{' '}
      directions. A small number of students tried to find the angle of elevation using the
      velocity vector. A common error was to assume that the helicopter, when at an altitude of 60 m, was directly above its
      initial location.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [57, 43],
  average: 0.5,
  comment: (
    <>
      Most students didn't realise that the period of the horizontal motion was required.
      Many students gave lengthy answers to this question, which was not necessary.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [19, 9, 21, 52],
  average: 2.1,
  comment: (
    <>
      A significant number of students gave answers with <Katex tex="x" /> as the variable
      instead of <Katex tex="t" />. Some students differentiated using CAS technology in
      degree mode, and a significant number omitted the <Katex tex="\underset{\sim}{k}" />{' '}
      component from the velocity. Often, <Katex tex="\underset{\sim}{i}" />,{' '}
      <Katex tex="\underset{\sim}{j}" /> or <Katex tex="\underset{\sim}{k}" /> were just
      dropped in the midst of working. Some students simply asserted that{' '}
      <Katex tex="\dot{\underset{\sim}{r}}(t).\ddot{\underset{\sim}{r}}(t)=0" />, without
      setting out the scalar product to show it.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [26, 35, 39],
  average: 1.2,
  comment: (
    <>
      Most students knew that they needed to find{' '}
      <Katex tex="\left|\dot{\underset{\sim}{r}}(t)\right|" />. Leaving out the{' '}
      <Katex tex="\underset{\sim}{k}" /> component was a common error. Some students could not
      simplify{' '}
      <Katex tex="\left(-\tfrac{5\pi}{6}\sin\!\left(\tfrac{\pi t}{30}\right)\right)^2+\left(\tfrac{5\pi}{6}\cos\!\left(\tfrac{\pi t}{30}\right)\right)^2" />{' '}
      using the Pythagorean identity.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [26, 16, 6, 53],
  average: 1.9,
  comment: (
    <>
      This question was moderately well answered. Frequent errors occurred in finding <Katex tex="\underset{\sim}{r}(45)" />, and many
      students attempted to find the distance using{' '}
      <Katex tex="\left|\underset{\sim}{r}(45)\right|-\left|\underset{\sim}{r}_{\text{tree}}\right|" />{' '}
      instead of{' '}
      <Katex tex="\left|\underset{\sim}{r}(45)-\underset{\sim}{r}_{\text{tree}}\right|" />.
      Occasionally an exact value of <Katex tex="5\sqrt{17}" /> was given instead of an answer
      correct to one decimal place.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{altitude} = \tfrac{2t}5" />,
    reason: <>Altitude is the <Katex tex="\underset{\sim}{k} " /> component alone — <Katex tex="\underset{\sim}{k}" /> is the vertical unit vector.</>,
  },
  {
    working: <Katex display tex="\tfrac{2t}5 = 60 \implies t = 150" />,
    reason: <>Solving <Katex tex="\left|\underset{\sim}{r}(t)\right|=60" /> instead would answer a different question — the distance from the origin, not the height.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="t=150:\quad \tfrac{\pi t}{30} = 5\pi" />,
    reason: <>Evaluate the trigonometric argument first — <Katex tex="5\pi" /> is an odd multiple of <Katex tex="\pi" />, so the values are exact.</>,
  },
  {
    working: <Katex display tex="\cos(5\pi) = -1, \qquad \sin(5\pi) = 0" />,
    reason: <>Radians.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(150) = 25\underset{\sim}{i}+50\underset{\sim}{j}+60\underset{\sim}{k}" />,
    reason: <><Katex tex="50+25(-1)=25" /> and <Katex tex="50+25(0)=50" />. The helicopter is <em>not</em> above where it started — that assumption is the report's headline error.</>,
  },
  {
    working: <Katex display tex="\text{horizontal distance} = \sqrt{25^2+50^2} = \sqrt{3125} = 55.90\ldots" />,
    reason: <>The angle of elevation from <Katex tex="O" /> is measured in the vertical plane through <Katex tex="O" /> and the helicopter, so the adjacent side is the horizontal distance.</>,
  },
  {
    working: <Katex display tex="\tan(\text{elevation}) = \frac{60}{55.90\ldots} \implies \text{elevation} = 47.02\ldots^\circ" />,
    reason: <>Opposite over adjacent. Taking <Katex tex="\arctan" /> the other way up gives <Katex tex="43^\circ" />, the angle with the vertical.</>,
  },
  {
    working: <Katex display tex="\boxed{47^\circ}" />,
    reason: <>To the nearest degree.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{horizontal position} = \left(50+25\cos\!\left(\tfrac{\pi t}{30}\right),\ 50+25\sin\!\left(\tfrac{\pi t}{30}\right)\right)" />,
    reason: <>A circle of radius 25 about <Katex tex="(50,50)" />, traced once per period. "Directly above the point of take-off" means the horizontal position has returned to where it began.</>,
  },
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\pi/30} = 60" />,
    reason: <>Both components share the same period, so one full circuit brings the helicopter back over its launch point.</>,
  },
  {
    working: <Katex display tex="\boxed{60\ \text{seconds}}" />,
    reason: <>"First" — so one period, not two. Nothing longer is needed; the report notes many students wrote far more than this.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(t) = -\tfrac{5\pi}6\sin\!\left(\tfrac{\pi t}{30}\right)\underset{\sim}{i}+\tfrac{5\pi}6\cos\!\left(\tfrac{\pi t}{30}\right)\underset{\sim}{j}+\tfrac25\underset{\sim}{k}" />,
    reason: <>Differentiating componentwise; the chain rule brings out <Katex tex="25\times\tfrac\pi{30}=\tfrac{5\pi}6" />. Keep the <Katex tex="\underset{\sim}{k}" /> component — dropping it is the report's common error.</>,
  },
  {
    working: <Katex display tex="\ddot{\underset{\sim}{r}}(t) = -\tfrac{\pi^2}{36}\cos\!\left(\tfrac{\pi t}{30}\right)\underset{\sim}{i}-\tfrac{\pi^2}{36}\sin\!\left(\tfrac{\pi t}{30}\right)\underset{\sim}{j}" />,
    reason: <>Differentiating again; <Katex tex="\tfrac{5\pi}6\times\tfrac\pi{30}=\tfrac{\pi^2}{36}" />. The constant vertical velocity differentiates to zero, so there is no <Katex tex="\underset{\sim}{k}" /> component.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}\cdot\ddot{\underset{\sim}{r}} = \tfrac{5\pi^3}{216}\sin\!\left(\tfrac{\pi t}{30}\right)\cos\!\left(\tfrac{\pi t}{30}\right) - \tfrac{5\pi^3}{216}\cos\!\left(\tfrac{\pi t}{30}\right)\sin\!\left(\tfrac{\pi t}{30}\right)" />,
    reason: <>Componentwise products. The <Katex tex="\underset{\sim}{k}" /> terms contribute nothing because the acceleration has none.</>,
  },
  {
    working: <Katex display tex="= 0" />,
    reason: <>The two terms are identical and opposite in sign. Write the scalar product out in full — the report singles out students who simply asserted it was zero.</>,
  },
  {
    working: <Katex display tex="\therefore\ \dot{\underset{\sim}{r}}\perp\ddot{\underset{\sim}{r}} \text{ for all } t" />,
    reason: <>Neither vector is ever the zero vector, so a zero scalar product means the velocity is perpendicular to the acceleration, as required. (Geometrically: the speed is constant, so the acceleration can only turn the velocity, never lengthen it.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\dot{\underset{\sim}{r}}(t)\right| = \sqrt{\left(\tfrac{5\pi}6\right)^2\sin^2\!\left(\tfrac{\pi t}{30}\right)+\left(\tfrac{5\pi}6\right)^2\cos^2\!\left(\tfrac{\pi t}{30}\right)+\left(\tfrac25\right)^2}" />,
    reason: <>Speed is the magnitude of the velocity, all three components included.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\left(\tfrac{5\pi}6\right)^2\left(\sin^2+\cos^2\right)+\tfrac4{25}} = \sqrt{\tfrac{25\pi^2}{36}+\tfrac4{25}}" />,
    reason: <>The Pythagorean identity collapses the first two terms, and the <Katex tex="t" /> disappears — the speed is constant.</>,
  },
  {
    working: <Katex display tex="= \sqrt{6.8538\ldots+0.16} = 2.6483\ldots" />,
    reason: <>Evaluating.</>,
  },
  {
    working: <Katex display tex="\boxed{2.65\ \text{ms}^{-1}}" />,
    reason: <>To two decimal places. Omitting the <Katex tex="\underset{\sim}{k}" /> component gives <Katex tex="2.62" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="t=45:\quad \tfrac{\pi t}{30} = \tfrac{3\pi}2" />,
    reason: <>Again an exact angle: <Katex tex="\cos\!\left(\tfrac{3\pi}2\right)=0" />, <Katex tex="\sin\!\left(\tfrac{3\pi}2\right)=-1" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(45) = 50\underset{\sim}{i}+25\underset{\sim}{j}+18\underset{\sim}{k}" />,
    reason: <><Katex tex="50+25(0)=50" />, <Katex tex="50+25(-1)=25" />, and <Katex tex="\tfrac{2(45)}5=18" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(45)-\underset{\sim}{r}_{\text{tree}} = (50-60)\underset{\sim}{i}+(25-40)\underset{\sim}{j}+(18-8)\underset{\sim}{k}" />,
    reason: <>Subtract the <em>vectors</em>, then take the magnitude — not the difference of the two magnitudes, which is the report's common error.</>,
  },
  {
    working: <Katex display tex="= -10\underset{\sim}{i}-15\underset{\sim}{j}+10\underset{\sim}{k}" />,
    reason: <>The displacement from the treetop to the helicopter.</>,
  },
  {
    working: <Katex display tex="\left|\cdot\right| = \sqrt{100+225+100} = \sqrt{425} = 5\sqrt{17}" />,
    reason: <>The exact distance.</>,
  },
  {
    working: <Katex display tex="\boxed{20.6\ \text{metres}}" />,
    reason: <>The question asks for one decimal place, so the exact surd on its own does not answer it.</>,
  },
]

export default function SpecialistQ4_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (12 marks)</p>
        <p>
          The position vector <Katex tex="\underset{\sim}{r}(t)" />, from origin{' '}
          <Katex tex="O" />, of a model helicopter <Katex tex="t" /> seconds after leaving the
          ground is given by
        </p>
        <div>
          <Katex
            display
            tex="\underset{\sim}{r}(t) = \left(50+25\cos\!\left(\tfrac{\pi t}{30}\right)\right)\underset{\sim}{i} + \left(50+25\sin\!\left(\tfrac{\pi t}{30}\right)\right)\underset{\sim}{j} + \tfrac{2t}{5}\underset{\sim}{k}"
          />
        </div>
        <p>
          where <Katex tex="\underset{\sim}{i}" /> is a unit vector to the east,{' '}
          <Katex tex="\underset{\sim}{j}" /> is a unit vector to the north and{' '}
          <Katex tex="\underset{\sim}{k}" /> is a unit vector vertically up. Displacement
          components are measured in metres.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The path is a helix: a circle of radius 25 about <Katex tex="(50,50)" /> in plan
            view, climbing steadily. Two facts do most of the work — the take-off point is{' '}
            <Katex tex="(75,50,0)" />, not the origin, and the horizontal motion has period 60
            seconds.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a.i"
        topic="Vector Kinematics"
        marks={1}
        statement={<>Find the time, in seconds, required for the helicopter to gain an altitude of 60 m.</>}
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Angle of Elevation"
        marks={2}
        statement={
          <>
            Find the angle of elevation from <Katex tex="O" /> of the helicopter when it is at
            an altitude of 60 m. Give your answer in degrees, correct to the nearest degree.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Period"
        marks={1}
        statement={<>After how many seconds will the helicopter first be directly above the point of take-off?</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Perpendicular Vectors"
        marks={3}
        statement={<>Show that the velocity of the helicopter is perpendicular to its acceleration.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Speed"
        marks={2}
        statement={
          <>
            Find the speed of the helicopter in ms<sup>−1</sup>, giving your answer correct to
            two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Distance"
        marks={3}
        statement={
          <>
            A treetop has position vector{' '}
            <Katex tex="\underset{\sim}{r}=60\underset{\sim}{i}+40\underset{\sim}{j}+8\underset{\sim}{k}" />
            . Find the distance of the helicopter from the treetop after it has been
            travelling for 45 seconds. Give your answer in metres, correct to one decimal
            place.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
