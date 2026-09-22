// 2020 Specialist Mathematics — Exam 2, Section B Question 1 (12 marks). A parametric
// curve: distance from the origin, a tangent, velocity and acceleration vectors, and an
// arc length. Question text transcribed from the original paper. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [14, 12, 73],
  average: 1.6,
  comment: (
    <>
      This question was generally done well. Some students found the distance from the point
      when <Katex tex="t=0" /> rather than from the origin.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [12, 9, 22, 56],
  average: 2.2,
  comment: (
    <>
      Most students were able to correctly apply the chain rule to find the derivative in
      terms of <Katex tex="t" />. Some students made a subsequent sign error, giving{' '}
      <Katex tex="y=3" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [38, 27, 35],
  average: 1,
  comment: <>Many students gave the (scalar) magnitude of the velocity rather than the required velocity.</>,
}

const EXAM_BIII: SAExaminerStats = {
  marks: [40, 7, 53],
  average: 1.1,
  comment: (
    <>
      Errors here generally arose from using a form of <Katex tex="\tfrac{dy}{dx}" /> in part
      b(ii) rather than <Katex tex="\tfrac{dx}{dt}" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = { marks: [30, 70], average: 0.7 }

const EXAM_D: SAExaminerStats = {
  marks: [37, 9, 54],
  average: 1.2,
  comment: (
    <>
      Errors included missing <Katex tex="dt" /> or giving the distance to fewer decimal
      places than required.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="t = \tfrac\pi6: \ x = 2\sin\!\left(\tfrac\pi3\right) = 2\cdot\tfrac{\sqrt3}{2} = \sqrt3" />,
    reason: <>Note the argument doubles: <Katex tex="2t=\tfrac\pi3" />, not <Katex tex="\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="y = 3\cos\!\left(\tfrac\pi6\right) = \tfrac{3\sqrt3}{2}" />,
    reason: 'Exact values throughout — the question asks for a distance, and nothing says to round.',
  },
  {
    working: <Katex display tex="d^2 = \left(\sqrt3\right)^2+\left(\tfrac{3\sqrt3}{2}\right)^2 = 3+\tfrac{27}{4} = \tfrac{39}{4}" />,
    reason: <>Distance from the <em>origin</em>, so it is <Katex tex="\sqrt{x^2+y^2}" /> — not the distance from the position at <Katex tex="t=0" />, which is the report's common error.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \frac{\sqrt{39}}{2}\ \text{m}}" />,
    reason: <>About 3.12 m.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = 4\cos(2t), \quad \frac{dy}{dt} = -3\sin(t)" />,
    reason: <>The chain rule supplies the factor 2 in <Katex tex="\tfrac{dx}{dt}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{-3\sin(t)}{4\cos(2t)}}" />,
    reason: <>Divide, do not subtract. Dropping the minus sign here is what produces the report's <Katex tex="y=3" />.</>,
  },
  {
    working: <Katex display tex="t = \pi: \ \frac{dy}{dx} = \frac{-3\sin(\pi)}{4\cos(2\pi)} = \frac{0}{4} = 0" />,
    reason: 'A horizontal tangent.',
  },
  {
    working: <Katex display tex="x = 2\sin(2\pi) = 0, \quad y = 3\cos(\pi) = -3" />,
    reason: <>The point of contact: the particle is at the origin's level on the <Katex tex="y" />-axis, three metres below.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -3}" />,
    reason: <>The <em>equation</em> of the tangent, which the report notes many students never wrote after finding the derivative.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v} = \frac{dx}{dt}\underset{\sim}{i}+\frac{dy}{dt}\underset{\sim}{j} = 4\cos(2t)\,\underset{\sim}{i}-3\sin(t)\,\underset{\sim}{j}" />,
    reason: 'Differentiate each component with respect to time — not with respect to each other.',
  },
  {
    working: <Katex display tex="t = \pi: \ 4\cos(2\pi) = 4, \quad -3\sin(\pi) = 0" />,
    reason: <><Katex tex="\cos(2\pi)=1" /> and <Katex tex="\sin(\pi)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{v} = 4\underset{\sim}{i}\ \text{m s}^{-1}}" />,
    reason: <>A <em>vector</em>. Writing 4 alone gives the speed, which is what the report says many students answered.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a} = \frac{d\underset{\sim}{v}}{dt} = -8\sin(2t)\,\underset{\sim}{i}-3\cos(t)\,\underset{\sim}{j}" />,
    reason: 'Differentiating the velocity vector, again with respect to time.',
  },
  {
    working: <Katex display tex="t = \pi: \ -8\sin(2\pi) = 0, \quad -3\cos(\pi) = 3" />,
    reason: <><Katex tex="\cos(\pi)=-1" />, so the two minus signs cancel.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a} = 3\underset{\sim}{j}" />,
    reason: <>Perpendicular to the velocity <Katex tex="4\underset{\sim}{i}" /> — the particle is turning, not speeding up, at this instant.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{a}\right| = 3\ \text{m s}^{-2}}" />,
    reason: <>Here the <em>magnitude</em> is what is asked for, the opposite of part b(ii).</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x = 0: \ 2\sin(2t) = 0 \implies t = 0, \tfrac\pi2, \pi, \tfrac{3\pi}{2},\ldots" />,
    reason: <>Multiples of <Katex tex="\tfrac\pi2" />, because the argument is <Katex tex="2t" />.</>,
  },
  {
    working: <Katex display tex="y = 0: \ 3\cos(t) = 0 \implies t = \tfrac\pi2, \tfrac{3\pi}{2},\ldots" />,
    reason: <>Odd multiples of <Katex tex="\tfrac\pi2" /> only.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \tfrac\pi2\ \text{seconds}}" />,
    reason: <>The first time both are zero <em>at once</em>. <Katex tex="t=0" /> puts the particle at <Katex tex="(0,3)" />, on the axis but not at the origin.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="d = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: 'The parametric arc length formula from the formula sheet.',
  },
  {
    working: <Katex display tex="\boxed{d = \int_0^{\pi/6}\sqrt{\left(4\cos(2t)\right)^2+\left(3\sin(t)\right)^2}\,dt}" />,
    reason: <>The minus sign disappears inside the square. Include the <Katex tex="dt" /> — the report docks for leaving it off.</>,
  },
  {
    working: <Cas fn="nInt">∫(√((4cos(2t))² + (3sin(t))²), t, 0, π/6)</Cas>,
    reason: 'No closed form; evaluate numerically.',
  },
  {
    working: <Katex display tex="\boxed{d = 1.804\ \text{m}}" />,
    reason: <>Three decimal places, as asked — <Katex tex="1.80" /> loses the mark.</>,
  },
]

export default function SpecialistQ1_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (12 marks)</p>
        <p>
          A particle moves in the <Katex tex="x" />–<Katex tex="y" /> plane such that its
          position in terms of <Katex tex="x" /> and <Katex tex="y" /> metres at{' '}
          <Katex tex="t" /> seconds is given by the parametric equations
        </p>
        <p className="py-1">
          <Katex display tex="x = 2\sin(2t), \qquad y = 3\cos(t)" />
        </p>
        <p>
          where <Katex tex="t\ge0" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Find the distance, in metres, of the particle from the origin when{' '}
            <Katex tex="t=\tfrac\pi6" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        marks={3}
        statement={
          <>
            Express <Katex tex="\dfrac{dy}{dx}" /> in terms of <Katex tex="t" /> and, hence,
            find the equation of the tangent to the path of the particle at{' '}
            <Katex tex="t=\pi" /> seconds.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={2}
        statement={
          <>
            Find the velocity, <Katex tex="\underset{\sim}{v}" />, in{' '}
            <Katex tex="\text{m s}^{-1}" />, of the particle when <Katex tex="t=\pi" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        marks={2}
        statement={
          <>
            Find the magnitude of the acceleration, in <Katex tex="\text{m s}^{-2}" />, when{' '}
            <Katex tex="t=\pi" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={<>Find the time, in seconds, when the particle first passes through the origin.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Express the distance, <Katex tex="d" /> metres, travelled by the particle from{' '}
            <Katex tex="t=0" /> to <Katex tex="t=\tfrac\pi6" /> as a definite integral and
            find this distance correct to three decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
