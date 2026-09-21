// 2018 Specialist Mathematics — Exam 2, Section B, Question 4 (10 marks). Two yachts given
// by position vectors: cartesian paths, whether they collide, where the paths cross, which
// is faster, and how long they spend within 0.2 km. Question text transcribed from the
// original paper (VCAA printed no diagram for this question). Answers re-derived in
// sympy/scipy and checked against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [11, 8, 81],
  average: 1.7,
  comment: <>A variety of less simplified, but correct, forms were given and accepted.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 8, 72],
  average: 1.6,
  comment: <>The approach shown is one of several correct ways to show that the yachts do not collide.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [25, 41, 34],
  average: 1.1,
  comment: (
    <>
      Missing the condition that <Katex tex="t\ge0" /> led, incorrectly, to two points being
      provided. Many otherwise correct responses were not expressed in the required form, as
      coordinates correct to three decimal places.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [43, 32, 25],
  average: 0.8,
  comment: (
    <>
      Many students approached this question incorrectly. Some set up inequalities using
      magnitudes of the position vectors, others attempted to compare the velocities of the
      yachts rather than correctly set up an equation or inequation involving the speeds.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [54, 18, 28],
  average: 0.8,
  comment: (
    <>
      Many students did not attempt Question 4e. A common misconception was evident when
      students attempted to solve{' '}
      <Katex tex="\left|\underset{\sim}{r}_B-\underset{\sim}{r}_A\right|=0.2" /> rather than
      the correct{' '}
      <Katex tex="\left|\underset{\sim}{r}_B-\underset{\sim}{r}_A\right|<0.2" />. Responses
      in terms of hours, rather than minutes, were given by a number of students.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="A: \ x = t+1 \implies t = x-1" />,
    reason: <>Eliminate the parameter by making <Katex tex="t" /> the subject of the easier component.</>,
  },
  {
    working: <Katex display tex="y = t^2+2t = (x-1)^2+2(x-1) = x^2-1" />,
    reason: <>Substituting and expanding. A parabola — and since <Katex tex="t\ge0" />, only the branch with <Katex tex="x\ge1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A: \ y = x^2-1, \ x\ge1}" />,
    reason: <>The domain restriction matters in part (c).</>,
  },
  {
    working: <Katex display tex="B: \ x = t^2, \quad y = t^2+3 \implies y = x+3" />,
    reason: <>Here the parameter appears identically in both components, so subtracting gives the relation immediately.</>,
  },
  {
    working: <Katex display tex="\boxed{B: \ y = x+3, \ x\ge0}" />,
    reason: <>A straight line, again restricted because <Katex tex="x=t^2" /> is never negative.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Collision} \iff \underset{\sim}{r}_A(t) = \underset{\sim}{r}_B(t) \ \text{ for the same } t" />,
    reason: <>This is the whole point: a collision needs both yachts at the same place <em>at the same time</em>. Paths crossing is not enough.</>,
  },
  {
    working: <Katex display tex="j\text{-components: } t^2+2t = t^2+3 \implies 2t = 3 \implies t = \frac32" />,
    reason: <>Start with the easier equation. The <Katex tex="t^2" /> terms cancel, leaving one candidate time.</>,
  },
  {
    working: <Katex display tex="i\text{-components at } t=\tfrac32: \quad t+1 = \frac52, \qquad t^2 = \frac94" />,
    reason: <>Test that time in the other component.</>,
  },
  {
    working: <Katex display tex="\frac52 = \frac{10}{4} \ne \frac94" />,
    reason: <>The <Katex tex="i" />-components disagree at the only time the <Katex tex="j" />-components agree.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{No } t\ge0 \text{ satisfies both} \implies \text{the yachts do not collide}}" />,
    reason: <>State the conclusion. (Equivalently, solving the <Katex tex="i" />-components gives <Katex tex="t^2-t-1=0" />, i.e. <Katex tex="t=\tfrac{1\pm\sqrt5}{2}" />, neither of which is <Katex tex="\tfrac32" />.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-1 = x+3 \implies x^2-x-4 = 0" />,
    reason: <>Where the two <em>paths</em> meet, ignoring time. Part (b) has already shown they are not there together.</>,
  },
  {
    working: <Katex display tex="x = \frac{1\pm\sqrt{17}}{2}" />,
    reason: <>Quadratic formula: <Katex tex="\tfrac{1\pm\sqrt{1+16}}{2}" />.</>,
  },
  {
    working: <Katex display tex="\frac{1-\sqrt{17}}{2} \approx -1.562 \ \text{ rejected}" />,
    reason: <>Both paths require <Katex tex="x\ge0" /> (indeed <Katex tex="x\ge1" /> for yacht A), because <Katex tex="t\ge0" />. The report names dropping this condition — and so giving two points — as the main error.</>,
  },
  {
    working: <Katex display tex="x = \frac{1+\sqrt{17}}{2} \approx 2.5616, \qquad y = x+3 \approx 5.5616" />,
    reason: <>Substituting into the simpler of the two equations.</>,
  },
  {
    working: <Katex display tex="\boxed{(2.562,\ 5.562)}" />,
    reason: <>Three decimal places, as prescribed — the report notes otherwise-correct answers losing marks on the form.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v}_A = \underset{\sim}{i} + (2t+2)\underset{\sim}{j}, \qquad \underset{\sim}{v}_B = 2t\,\underset{\sim}{i} + 2t\,\underset{\sim}{j}" />,
    reason: <>Differentiate each position vector. Speed is the <em>magnitude</em> of velocity — the report notes students comparing the velocity vectors themselves, which are not ordered quantities.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}_A\right|^2 = 1+(2t+2)^2 = 4t^2+8t+5" />,
    reason: <>Comparing squared speeds avoids two square roots and is legitimate because speeds are non-negative.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}_B\right|^2 = (2t)^2+(2t)^2 = 8t^2" />,
    reason: <>Yacht B accelerates steadily from rest.</>,
  },
  {
    working: <Katex display tex="4t^2+8t+5 > 8t^2 \implies 4t^2-8t-5 < 0" />,
    reason: <>A faster than B.</>,
  },
  {
    working: <Katex display tex="(2t-5)(2t+1) < 0 \implies -\frac12 < t < \frac52" />,
    reason: <>An upward parabola is negative strictly between its roots.</>,
  },
  {
    working: <Katex display tex="\boxed{0 \le t < \frac52}" />,
    reason: <>Intersect with the stated <Katex tex="t\ge0" />. So A leads for the first two and a half hours, then B — which started from rest but keeps accelerating — overtakes it in speed.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_B-\underset{\sim}{r}_A = \left(t^2-t-1\right)\underset{\sim}{i} + \left(3-2t\right)\underset{\sim}{j}" />,
    reason: <>The displacement between the yachts at time <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{r}_B-\underset{\sim}{r}_A\right|^2 = \left(t^2-t-1\right)^2+(3-2t)^2 = t^4-2t^3+3t^2-10t+10" />,
    reason: <>Expanding. Again square both sides rather than carry a root.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{r}_B-\underset{\sim}{r}_A\right| < 0.2 \iff t^4-2t^3+3t^2-10t+10 < 0.04" />,
    reason: <>An <em>inequality</em>, not an equation — the report names solving the equality as the common misconception. The equality only locates the two endpoints of the interval.</>,
  },
  {
    working: <Cas fn="solve">solve(t^4-2t^3+3t^2-10t+10 = 0.04, t) | t&gt;=0</Cas>,
    reason: <>The two boundary times.</>,
  },
  {
    working: <Katex display tex="t \approx 1.5288 \ \text{ and } \ t \approx 1.5973 \text{ hours}" />,
    reason: <>Between them the distance dips to a minimum of about <Katex tex="0.174" /> km, comfortably inside the <Katex tex="0.2" /> km limit.</>,
  },
  {
    working: <Katex display tex="(1.5973-1.5288)\times60 \approx 4.11" />,
    reason: <>Convert the duration from hours to minutes — the report notes answers left in hours.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 4.1 \text{ minutes}}" />,
    reason: <>One decimal place. Only <Katex tex="28\%" /> of the state scored both marks, and more than half did not attempt it.</>,
  },
]

export default function SpecialistQ4_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (10 marks)</p>
        <p className="mb-2">
          Two yachts, <Katex tex="A" /> and <Katex tex="B" />, are competing in a race and
          their position vectors on a certain section of the race after time <Katex tex="t" />{' '}
          hours are given by
        </p>
        <p className="text-center mb-2">
          <Katex display tex="\underset{\sim}{r}_A(t) = (t+1)\underset{\sim}{i} + \left(t^2+2t\right)\underset{\sim}{j}, \qquad \underset{\sim}{r}_B(t) = t^2\,\underset{\sim}{i} + \left(t^2+3\right)\underset{\sim}{j}, \quad t\ge0" />
        </p>
        <p>
          where displacement components are measured in kilometres from a given reference buoy
          at origin <Katex tex="O" />.
        </p>
      </div>

      <PartCard letter="a" marks={2} statement={<>Find the cartesian equation of the path for each yacht.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>Show that the two yachts will not collide if they follow these paths.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            Crossing paths and colliding are different things. Two yachts collide only if
            they are at the same point at the <em>same time</em>, so the test is whether one
            value of <Katex tex="t" /> satisfies both component equations at once.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Find the coordinates of the point where the paths of the two yachts cross. Give your coordinates correct to three decimal places.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={2} statement={<>For what values of <Katex tex="t" /> is yacht <Katex tex="A" /> travelling faster than yacht <Katex tex="B" />?</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            Speed is <Katex tex="\left|\underset{\sim}{v}\right|" />, a single non-negative
            number, so "faster" is a comparison of two scalars. Comparing the velocity{' '}
            <em>vectors</em>, or the magnitudes of the <em>position</em> vectors, answers a
            different question — the report records both mistakes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={2} statement={<>If yacht <Katex tex="A" /> does not alter its course, for what period of time will yacht <Katex tex="A" /> be within <Katex tex="0.2" /> km of yacht <Katex tex="B" />? Give your answer in minutes, correct to one decimal place.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
