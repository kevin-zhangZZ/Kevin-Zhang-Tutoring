// 2020 Specialist Mathematics — Exam 2, Section B Question 1 (12 marks). A parametric
// curve: distance from the origin, a tangent, velocity and acceleration vectors, and an
// arc length. Question text transcribed from the original paper. Answers checked with
// sympy and against the VCAA examination report (and itute's solutions, which agree).
// Solution is original.
//
// Interactive widgets (interactives/spec-2020e2-q1*): a. distance to the origin as a
// hypotenuse, with the report's "distance from the start" slip; b.i. the velocity arrow's
// rise over run as dy/dx, with the y = 3 sign slip; b.ii. velocity vs speed; b.iii. the
// acceleration as the change in the velocity arrow (perpendicular at t = π); c. x(t) and
// y(t) zero at the same t; d. the arc length as a sum of short straight steps. WrongMethod
// boxes follow the report's comments for a, b.i, b.ii, b.iii and d.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const OriginWidget = lazyWidget(() => import('../interactives/spec-2020e2-q1a-origin'))
const TangentWidget = lazyWidget(() => import('../interactives/spec-2020e2-q1bi-tangent'))
const ArrowWidget = lazyWidget(() => import('../interactives/spec-2020e2-q1bii-arrow'))
const TurnWidget = lazyWidget(() => import('../interactives/spec-2020e2-q1biii-turn'))
const OriginTimesWidget = lazyWidget(() => import('../interactives/spec-2020e2-q1c-origin'))
const StepsWidget = lazyWidget(() => import('../interactives/spec-2020e2-q1d-steps'))

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
      Errors here generally arose from using a form of <Katex tex="\dfrac{dy}{dx}" /> in Question
      1bii. rather than <Katex tex="\dfrac{dx}{dt}" />.
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
    reason: <>First find where the particle is: substitute <Katex tex="t=\tfrac\pi6" /> into both rules. Watch the argument — <Katex tex="x" /> uses <Katex tex="2t" />, so the angle is <Katex tex="\tfrac\pi3" />, not <Katex tex="\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="y = 3\cos\!\left(\tfrac\pi6\right) = \tfrac{3\sqrt3}{2}" />,
    reason: <>Here the argument is just <Katex tex="t" />. Keep exact values: Section B wants an exact answer unless a question says otherwise, and this one doesn&apos;t.</>,
  },
  {
    working: <Katex display tex="d^2 = \left(\sqrt3\right)^2+\left(\tfrac{3\sqrt3}{2}\right)^2 = 3+\tfrac{27}{4} = \tfrac{39}{4}" />,
    reason: <>Distance from the <em>origin</em>: the coordinates <Katex tex="x" /> and <Katex tex="y" /> are the two legs of a right triangle with its corner at <Katex tex="(0,0)" />, so Pythagoras gives <Katex tex="d=\sqrt{x^2+y^2}" />. It is not the distance from the position at <Katex tex="t=0" />, which the report notes some students found.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \frac{\sqrt{39}}{2}\ \text{m}}" />,
    reason: <>About 3.12 m.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = 4\cos(2t), \quad \frac{dy}{dt} = -3\sin(t)" />,
    reason: <><Katex tex="y" /> isn&apos;t given as a function of <Katex tex="x" /> — both coordinates are given in terms of <Katex tex="t" />. So differentiate each with respect to <Katex tex="t" /> first. The chain rule supplies the factor 2 in <Katex tex="\tfrac{dx}{dt}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{-3\sin(t)}{4\cos(2t)}}" />,
    reason: <>The chain rule in parametric form: the gradient is the rise per unit time divided by the run per unit time (see Background). This is the first answer the question asks for.</>,
  },
  {
    working: <Katex display tex="t = \pi: \ \frac{dy}{dx} = \frac{-3\sin(\pi)}{4\cos(2\pi)} = \frac{0}{4} = 0" />,
    reason: <>&ldquo;Hence&rdquo; says use this derivative: substituting <Katex tex="t=\pi" /> gives the gradient of the tangent. A gradient of 0 means a horizontal tangent.</>,
  },
  {
    working: <Katex display tex="x = 2\sin(2\pi) = 0, \quad y = 3\cos(\pi) = -3" />,
    reason: <>A line needs a point as well as a gradient. The point of contact is where the particle is at <Katex tex="t=\pi" />: <Katex tex="(0,-3)" />, the bottom of the path. <Katex tex="\cos(\pi)=-1" /> — the report notes some students made a sign error here, giving <Katex tex="y=3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -3}" />,
    reason: <>The <em>equation</em> of the tangent: the horizontal line through <Katex tex="(0,-3)" />. The report&apos;s general comments note that some students stated the derivative correctly and then never gave this equation — &ldquo;hence find the equation&rdquo; is a second task.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\underset{\sim}{v} &= \frac{dx}{dt}\underset{\sim}{i}+\frac{dy}{dt}\underset{\sim}{j}\\ &= 4\cos(2t)\,\underset{\sim}{i}-3\sin(t)\,\underset{\sim}{j}\end{aligned}"
      />
    ),
    reason: <>Velocity is the rate of change of position. Write the position as the vector <Katex tex="\underset{\sim}{r}=x\underset{\sim}{i}+y\underset{\sim}{j}" /> and differentiate each component with respect to <Katex tex="t" /> — the same two derivatives as in b.i, kept as components instead of divided.</>,
  },
  {
    working: <Katex display tex="t = \pi: \ 4\cos(2\pi) = 4, \quad -3\sin(\pi) = 0" />,
    reason: <><Katex tex="\cos(2\pi)=1" /> and <Katex tex="\sin(\pi)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{v} = 4\underset{\sim}{i}\ \text{m s}^{-1}}" />,
    reason: <>The question writes <Katex tex="\underset{\sim}{v}" /> with a tilde, so it wants a <em>vector</em>: 4 m/s in the direction of <Katex tex="\underset{\sim}{i}" />. Writing 4 alone gives the speed, which is what the report says many students answered.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a} = \frac{d\underset{\sim}{v}}{dt} = -8\sin(2t)\,\underset{\sim}{i}-3\cos(t)\,\underset{\sim}{j}" />,
    reason: <>For the magnitude of the acceleration, first find the acceleration vector: differentiate each component of the velocity from b.ii with respect to <Katex tex="t" />. That is why b.ii needed the velocity vector — the report says errors here generally arose from using a form of <Katex tex="\tfrac{dy}{dx}" /> in b.ii.</>,
  },
  {
    working: <Katex display tex="t = \pi: \ -8\sin(2\pi) = 0, \quad -3\cos(\pi) = 3" />,
    reason: <><Katex tex="\sin(2\pi)=0" />, and <Katex tex="\cos(\pi)=-1" /> so the two minus signs cancel.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a} = 3\underset{\sim}{j}" />,
    reason: <>Straight up, at right angles to the velocity <Katex tex="4\underset{\sim}{i}" />: at the bottom of its path the particle is being turned, not sped up.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{a}\right| = 3\ \text{m s}^{-2}}" />,
    reason: <>Here the <em>magnitude</em> is what is asked for, the opposite of part b.ii: <Katex tex="\left|3\underset{\sim}{j}\right|=3" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x = 0: \ 2\sin(2t) = 0 \implies t = 0, \tfrac\pi2, \pi, \tfrac{3\pi}{2},\ldots" />,
    reason: <>At the origin <em>both</em> coordinates are zero at the same instant, so list when each one is zero. <Katex tex="x" /> first: its argument is <Katex tex="2t" />, so it is zero at every multiple of <Katex tex="\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="y = 0: \ 3\cos(t) = 0 \implies t = \tfrac\pi2, \tfrac{3\pi}{2},\ldots" />,
    reason: <><Katex tex="\cos(t)=0" /> only at the odd multiples of <Katex tex="\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \tfrac\pi2\ \text{seconds}}" />,
    reason: <>The first time in both lists. Not <Katex tex="t=0" />: <Katex tex="x=0" /> then, but <Katex tex="y=3" />, so the particle is at <Katex tex="(0,3)" /> on the <Katex tex="y" />-axis, not at the origin.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="d = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>Distance travelled along a curved path is its arc length. With <Katex tex="x" /> and <Katex tex="y" /> given in terms of <Katex tex="t" />, use the parametric form from the formula sheet — the integrand is the speed, so this is <Katex tex="\int\text{speed}\,dt" /> (see Background).</>,
  },
  {
    working: <Katex display tex="\boxed{d = \int_0^{\pi/6}\sqrt{\left(4\cos(2t)\right)^2+\left(-3\sin(t)\right)^2}\,dt}" />,
    reason: <>The terminals are the times <Katex tex="0" /> and <Katex tex="\tfrac\pi6" />, because the integration is with respect to <Katex tex="t" />. The minus sign disappears when squared. Include the <Katex tex="dt" /> — the report notes errors included missing <Katex tex="dt" />.</>,
  },
  {
    working: <Cas fn="nInt">nInt(√((4cos(2t))^2 + (-3sin(t))^2), t, 0, π/6)</Cas>,
    reason: <>This integrand has no antiderivative we can find, and the question wants a decimal anyway, so evaluate it numerically.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 1.804\ \text{m}}" />,
    reason: <>Three decimal places, as asked — the report notes some students gave the distance to fewer decimal places than required.</>,
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
        topic="Distance"
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
        <Explore title="The distance from the origin is a hypotenuse, not the distance from the start">
          <OriginWidget />
        </Explore>
        <WrongMethod
          title="Measure from where the particle started"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\sqrt{\left(\sqrt3-0\right)^2+\left(\tfrac{3\sqrt3}{2}-3\right)^2}=\tfrac{\sqrt{75-36\sqrt3}}{2}\approx1.78"
            />
          }
        >
          That is the distance from <Katex tex="(0,3)" />, where the particle was at <Katex tex="t=0" />. The question
          says &ldquo;from the origin&rdquo;, which is the fixed point <Katex tex="(0,0)" /> — it doesn&apos;t matter
          where the particle began. Before calculating, write down the two points you are measuring between.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Parametric Tangent"
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
        <Background title="Parametric Gradient">
          <p>
            When <Katex tex="x" /> and <Katex tex="y" /> are both given in terms of <Katex tex="t" />,
          </p>
          <Katex display tex="\frac{dy}{dx}=\frac{dy/dt}{dx/dt},\quad \frac{dx}{dt}\ne0." />
          <p>
            Why: in a short time <Katex tex="\Delta t" /> the particle moves about{' '}
            <Katex tex="\tfrac{dx}{dt}\Delta t" /> across and <Katex tex="\tfrac{dy}{dt}\Delta t" /> up, and the
            gradient is rise over run — the <Katex tex="\Delta t" /> cancels. Where{' '}
            <Katex tex="\tfrac{dx}{dt}=0" /> the particle is moving straight up or down, and the tangent is vertical.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <Explore title="The velocity arrow lies along the tangent, so its rise over run is dy/dx">
          <TangentWidget />
        </Explore>
        <WrongMethod
          title="cos(π) = 1, so the tangent is y = 3"
          source="Examiner's report"
          working={<Katex display tex="y=3\cos(\pi)=3 \implies y=3" />}
        >
          <Katex tex="\cos(\pi)=-1" />: <Katex tex="\pi" /> is the point <Katex tex="(-1,0)" /> on the unit circle. The
          line <Katex tex="y=3" /> is a horizontal tangent to the path, but at the <em>top</em>, where the particle was
          at <Katex tex="t=0" /> — right gradient, wrong point of contact. Check: <Katex tex="3\cos(t)" /> only equals
          3 when <Katex tex="t" /> is a multiple of <Katex tex="2\pi" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Velocity"
        marks={2}
        statement={
          <>
            Find the velocity, <Katex tex="\underset{\sim}{v}" />, in{' '}
            <Katex tex="\text{m s}^{-1}" />, of the particle when <Katex tex="t=\pi" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="Velocity and Speed">
          <p>
            Velocity <Katex tex="\underset{\sim}{v}=\tfrac{d\underset{\sim}{r}}{dt}" /> is a vector: it has a size and a
            direction, and it always points along the path, the way the particle is moving. Speed is its magnitude{' '}
            <Katex tex="\left|\underset{\sim}{v}\right|" /> — a number with no direction. &ldquo;Find the
            velocity&rdquo; wants the vector; &ldquo;find the speed&rdquo; wants the number.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <Explore title="Velocity is the whole arrow; speed is only its length">
          <ArrowWidget />
        </Explore>
        <WrongMethod
          title="The velocity is 4"
          source="Examiner's report"
          working={<Katex display tex="\left|\underset{\sim}{v}\right|=\sqrt{4^2+0^2}=4" />}
        >
          That is the speed — the length of the velocity arrow. It says how fast, but not which way: 4 m/s to the left or
          straight down would give the same number. The velocity must also say the particle is moving in the direction
          of <Katex tex="\underset{\sim}{i}" />, so the answer is <Katex tex="4\underset{\sim}{i}" />. If the question
          names a vector (a tilde under the letter, or &ldquo;velocity&rdquo; rather than &ldquo;speed&rdquo;), the
          answer has <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> in it.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Acceleration"
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
        <Explore title="Acceleration shows how the velocity arrow is changing">
          <TurnWidget />
        </Explore>
        <WrongMethod
          title="Differentiate dy/dx to get the acceleration"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\frac{d}{dt}\left(\frac{-3\sin(t)}{4\cos(2t)}\right)\bigg|_{t=\pi}=\frac34"
            />
          }
        >
          <Katex tex="\tfrac{dy}{dx}" /> is the gradient of the path — metres up per metre across — and it would be the
          same whatever speed the particle went round the path, so it can&apos;t be a velocity. The report says errors
          here generally arose from using a form of <Katex tex="\tfrac{dy}{dx}" /> in b.ii. Acceleration is the
          derivative of the velocity <em>vector</em>: differentiate <Katex tex="4\cos(2t)" /> and{' '}
          <Katex tex="-3\sin(t)" /> separately. Units are a check: m s⁻² comes from differentiating m s⁻¹ with
          respect to seconds.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Time at Origin"
        marks={1}
        statement={<>Find the time, in seconds, when the particle first passes through the origin.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="At the origin, x and y must both be zero at the same instant">
          <OriginTimesWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d"
        topic="Distance Travelled"
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
        <Background title="Distance Travelled Along a Path">
          <p>
            Split the time into short steps <Katex tex="\Delta t" />. In each step the particle moves about{' '}
            <Katex tex="\tfrac{dx}{dt}\Delta t" /> across and <Katex tex="\tfrac{dy}{dt}\Delta t" /> up, so by
            Pythagoras the step is about <Katex tex="\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}\,\Delta t" />{' '}
            long: speed × time. Adding the steps and letting <Katex tex="\Delta t\to0" /> gives the arc length
            integral — the <Katex tex="dt" /> is what remains of the step width.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Distance travelled is the sum of many tiny straight steps">
          <StepsWidget />
        </Explore>
        <WrongMethod
          title="Leave the dt off the integral"
          source="Examiner's report"
          working={<Katex display tex="d=\int_0^{\pi/6}\sqrt{\left(4\cos(2t)\right)^2+\left(-3\sin(t)\right)^2}" />}
        >
          Without <Katex tex="dt" /> the integral no longer says which variable the terminals <Katex tex="0" /> and{' '}
          <Katex tex="\tfrac\pi6" /> belong to, and it has lost the step width that turns a speed (m s⁻¹) into a
          distance (m). The report lists a missing <Katex tex="dt" /> among the errors in this part — it is part of the
          expression, not decoration.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
