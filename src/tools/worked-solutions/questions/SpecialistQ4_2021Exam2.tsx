// 2021 Specialist Mathematics — Exam 2, Section B Question 4 (11 marks). A stunt car: a
// given position vector turned into a cartesian path, the launch conditions that clear or
// meet a ramp, then rectilinear motion along the run-up. Question text transcribed from the
// original paper; the figure is a crop of VCAA's own artwork. Note: the second section of
// track slopes DOWN at 10° from C (the landing gradient is tan 170°). Answers checked with scipy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import trackSrc from './spec-2021e2-q4-track.png'

const EXAM_A: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      Some students used the Pythagorean identity and eliminated <Katex tex="\theta" />,
      which was unproductive.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [51, 10, 40],
  average: 0.9,
  comment: (
    <>
      Incorrect approaches using vector calculus were frequently seen. Some incorrect
      responses swapped the values <Katex tex="(16,4)" /> when substituting into the
      cartesian equation. Some students who were unsuccessful in Question 4a. used the given
      cartesian equation and gained full marks in this question.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [80, 9, 5, 6],
  average: 0.4,
  comment: (
    <>
      Many students did not provide a response. Very few students were able to use the
      information given to state two correct equations. Of those that showed some working, a
      common error was to incorrectly use <Katex tex="m=\tan10^\circ" />, rather than the
      correct <Katex tex="m=\tan(170^\circ)" />, <Katex tex="m=-\tan(10^\circ)" /> or{' '}
      <Katex tex="m=\tan(-10^\circ)" />.
      <br />
      It should be noted that <Katex tex="\tan\theta" /> can be isolated by hand by solving
      the simultaneous equations by elimination.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [50, 19, 31],
  average: 0.8,
  comment: (
    <>
      A number of incorrect responses inappropriately used a constant acceleration formula.
      Of those that correctly used an appropriate form of acceleration, a number did not
      explicitly include a constant of integration or demonstrate that <Katex tex="c=0" /> to
      show the given result.
    </>
  ),
}

const EXAM_E: SAExaminerStats = { marks: [87, 10, 1, 3], average: 0.2 }

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = ut\cos(\theta), \quad y = ut\sin(\theta)-\tfrac12gt^2" />,
    reason: <>Reading the two components off the given position vector.</>,
  },
  {
    working: <Katex display tex="t = \frac{x}{u\cos(\theta)}" />,
    reason: <>Eliminate <Katex tex="t" />, not <Katex tex="\theta" /> — the target equation still contains <Katex tex="\theta" />, so trying the Pythagorean identity leads nowhere.</>,
  },
  {
    working: <Katex display tex="y = u\sin(\theta)\cdot\frac{x}{u\cos(\theta)}-\tfrac12(9.8)\left(\frac{x}{u\cos(\theta)}\right)^2" />,
    reason: <>Substituting into the vertical component.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x\tan(\theta)-\frac{4.9x^2}{u^2\cos^2(\theta)}}" />,
    reason: <>The first term collapses because <Katex tex="\tfrac{\sin}{\cos}=\tan" />, and <Katex tex="\tfrac12(9.8)=4.9" />. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{land at or beyond } C(16,4) \implies \text{at } x=16, \ y \ge 4" />,
    reason: <>The second track slopes <em>down</em> from <Katex tex="C" />, so landing at or beyond <Katex tex="C" /> means the path passes through or above <Katex tex="C" />; the minimum speed is the one that passes exactly through it.</>,
  },
  {
    working: <Katex display tex="4 = 16\tan(30^\circ)-\frac{4.9(16)^2}{u^2\cos^2(30^\circ)}" />,
    reason: <>Substituting <Katex tex="x=16" />, <Katex tex="y=4" /> — in that order, not swapped.</>,
  },
  {
    working: <Cas fn="solve">solve(4 = 16·tan(30°) − 4.9·16²/(u²·cos²(30°)), u) | u &gt; 0</Cas>,
    reason: <>One positive root: <Katex tex="16\tan30^\circ=9.2376" />, so the drop term must be 5.2376.</>,
  },
  {
    working: <Katex display tex="\boxed{u = 17.87\ \text{m s}^{-1}}" />,
    reason: <>To two decimal places. Any faster and the car lands beyond <Katex tex="C" />, which the question allows.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{join smoothly} \implies \text{same point } and \text{ same gradient at } C" />,
    reason: <>Two conditions, so two equations — which is exactly what the three marks are for.</>,
  },
  {
    working: <Katex display tex="\text{(1) } 4 = 16\tan(\theta)-\frac{4.9(16)^2}{u^2\cos^2(\theta)}" />,
    reason: <>The path passes through <Katex tex="C(16,4)" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \tan(\theta)-\frac{9.8x}{u^2\cos^2(\theta)}" />,
    reason: <>Differentiating the cartesian path from part a.</>,
  },
  {
    working: <Katex display tex="\text{(2) } \tan(170^\circ) = \tan(\theta)-\frac{9.8(16)}{u^2\cos^2(\theta)}" />,
    reason: <>The track slopes <em>down</em> at <Katex tex="10^\circ" /> to the horizontal, so the required gradient is <Katex tex="\tan(170^\circ)=-\tan(10^\circ)" />, negative. The report notes using <Katex tex="\tan10^\circ" /> as a common error.</>,
  },
  {
    working: <Cas fn="solve">solve({'{'}eq1, eq2{'}'}, {'{'}θ, u{'}'}) | 0 &lt; θ &lt; 90°, u &gt; 0</Cas>,
    reason: <>Eliminating <Katex tex="\tfrac{1}{u^2\cos^2\theta}" /> between the two by hand also works: it isolates <Katex tex="\tan\theta" /> directly.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = 34^\circ, \quad u = 16.4\ \text{m s}^{-1}}" />,
    reason: <>A steeper launch than 30° but a lower speed — the extra angle buys the descent it needs to meet the track tangentially.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{60}{v} \text{ with } a = v\frac{dv}{ds}" />,
    reason: <>The acceleration is not constant, so a constant-acceleration formula is not available — the report notes a number of incorrect responses used one.</>,
  },
  {
    working: <Katex display tex="v\frac{dv}{ds} = \frac{60}{v} \implies \frac{ds}{dv} = \frac{v^2}{60}" />,
    reason: <>Separating, then inverting so the integration is with respect to v.</>,
  },
  {
    working: <Katex display tex="s = \int\frac{v^2}{60}\,dv = \frac{v^3}{180}+c" />,
    reason: <>Include the constant — the report notes a number of students did not.</>,
  },
  {
    working: <Katex display tex="\text{from rest at } A: \ s=0 \text{ when } v=0 \implies c=0" />,
    reason: <>Showing <Katex tex="c=0" /> rather than assuming it.</>,
  },
  {
    working: <Katex display tex="v^3 = 180s \implies \boxed{v = (180s)^{1/3}}" />,
    reason: <>Cube-rooting. As required.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="v = 20 \text{ at } B: \ 20^3 = 180s \implies AB = \frac{8000}{180} = \frac{400}{9}\ \text{m}" />,
    reason: <>About 44.4 m — the length of the run-up, from part d.</>,
  },
  {
    working: <Katex display tex="\text{let } d = WB. \text{ At } W: \ v_W = \left(180\left(\tfrac{400}{9}-d\right)\right)^{1/3}" />,
    reason: <>The speed the car has reached when it is still <Katex tex="d" /> metres short of <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex="\text{braking: } 0-v_W^2 = 2(-9)d" />,
    reason: <>Now the acceleration <em>is</em> constant, so <Katex tex="v^2=u^2+2as" /> applies; it must bring the car to rest in exactly <Katex tex="d" /> metres.</>,
  },
  {
    working: <Cas fn="solve">solve((180(400/9 − d))^(2/3) = 18d, d) | 0 &lt; d &lt; 400/9</Cas>,
    reason: <>One root in range.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 16.4\ \text{m}}" />,
    reason: <>To one decimal place. Beyond that point the car is going too fast to stop before <Katex tex="B" />. Only 3% of students scored all three marks.</>,
  },
]

export default function SpecialistQ4_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (11 marks)</p>
        <p>
          A car that performs stunts moves along a track, as shown in the diagram below. The
          car accelerates from rest at point <Katex tex="A" />, is launched into the air by
          the ramp <Katex tex="BO" /> and lands on a second section of track at or beyond
          point <Katex tex="C" />. This second section of track is inclined at 10° to the
          horizontal.
          <br />
          Due to a tailwind, the effect of air resistance is negligible. Point{' '}
          <Katex tex="O" /> is taken as the origin of a cartesian coordinate system and all
          displacements are measured in metres. Point <Katex tex="C" /> has the coordinates{' '}
          <Katex tex="(16,4)" />.
          <br />
          At point <Katex tex="O" />, the speed of the car is{' '}
          <Katex tex="u\ \text{m s}^{-1}" /> and it takes off at an angle of{' '}
          <Katex tex="\theta" /> to the horizontal direction.
          <br />
          After the car passes point <Katex tex="O" />, it follows a trajectory where the
          position of the car's rear wheels relative to point <Katex tex="O" />, at time{' '}
          <Katex tex="t" /> seconds after passing point <Katex tex="O" />, is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=ut\cos(\theta)\,\underset{\sim}{i}+\left(ut\sin(\theta)-\tfrac12gt^2\right)\underset{\sim}{j}" />{' '}
          until the car lands on the second section of track that starts at point{' '}
          <Katex tex="C" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={trackSrc}
            alt="A stunt track: a horizontal run-up from A through W to B below the x-axis, a ramp curving up to the origin O where the car takes off at angle θ, a dashed flight path, and a second track sloping down at 10° to the horizontal from C(16, 4) to the x-axis — from the original 2021 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6">
        <Background title="Projectile wording, current mathematics">
          <p>
            Projectile motion belongs to the Mechanics area of study, which Specialist
            Mathematics no longer has — but the position vector is <em>given</em> to you
            here, so no forces are ever resolved.
          </p>
          <p>
            Parts a. to c. are then parametric-to-cartesian conversion and a tangency
            condition; parts d. and e. are rectilinear motion with{' '}
            <Katex tex="a=v\tfrac{dv}{ds}" />, which is current content. Worth doing in
            full.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Projectile Path"
        marks={1}
        statement={
          <>
            Show that the path of the rear wheels of the car, while in the air, is given in
            cartesian form by{' '}
            <Katex tex="y=x\tan(\theta)-\dfrac{4.9x^2}{u^2\cos^2(\theta)}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Minimum Speed"
        marks={2}
        statement={
          <>
            If <Katex tex="\theta=30^\circ" />, find the minimum speed, in{' '}
            <Katex tex="\text{m s}^{-1}" />, that the car must reach at point{' '}
            <Katex tex="O" /> for the rear wheels to land on the second section of track at
            or beyond point <Katex tex="C" />. Give your answer correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Smooth Landing"
        marks={3}
        statement={
          <>
            The ramp <Katex tex="BO" /> is constructed so that the angle{' '}
            <Katex tex="\theta" /> can be varied.
            <br />
            For what values of <Katex tex="\theta" /> and <Katex tex="u" /> will the path of
            the rear wheels of the car join up <b>smoothly</b> with the beginning of the second
            section of track at point <Katex tex="C" />? Give your answer for{' '}
            <Katex tex="\theta" /> in degrees, correct to the nearest degree, and give your
            answer for <Katex tex="u" /> in{' '}
            <Katex tex="\text{m s}^{-1}" />, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The car accelerates from rest along the horizontal section of track{' '}
          <Katex tex="AB" />, where its acceleration, <Katex tex="a\ \text{m s}^{-2}" />,
          after it has travelled <Katex tex="s" /> metres from point <Katex tex="A" />, is
          given by <Katex tex="a=\dfrac{60}{v}" />, where <Katex tex="v" /> is its speed at{' '}
          <Katex tex="s" /> metres.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Velocity-Distance"
        marks={2}
        statement={
          <>
            Show that <Katex tex="v" /> in terms of <Katex tex="s" /> is given by{' '}
            <Katex tex="v=(180s)^{1/3}" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Stopping Distance"
        marks={3}
        statement={
          <>
            After the car leaves point <Katex tex="A" />, it accelerates to reach a speed of{' '}
            <Katex tex="20\ \text{m s}^{-1}" /> at point <Katex tex="B" />. However, if the
            stunt is called off, the car immediately brakes and reduces its speed at a rate
            of <Katex tex="9\ \text{m s}^{-2}" />. It is only safe to call off the stunt if
            the car can come to rest at or before point <Katex tex="B" />. Point{' '}
            <Katex tex="W" /> is the furthest point along the section <Katex tex="AB" /> at
            which the stunt can be called off.
            <br />
            How far is point <Katex tex="W" /> from point{' '}
            <Katex tex="B" />? Give your answer in metres, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
