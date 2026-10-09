// 2021 Specialist Mathematics — Exam 2, Section B Question 4 (11 marks). A stunt car: a
// given position vector turned into a cartesian path, the launch conditions that clear or
// meet a ramp, then rectilinear motion along the run-up. Question text transcribed from the
// original paper; the figure is a crop of VCAA's own artwork. Note: the second section of
// track slopes DOWN at 10° from C (the landing gradient is tan 170°). Answers checked with scipy
// and against the VCAA examination report. Solution is original.
// Interactives: part c, spec-2021e2-q4c-smooth-landing (vary θ with u fixed by "through C";
// only θ ≈ 34° meets the downward track without a kink; a toggle shows the tan 10° error);
// part e, spec-2021e2-q4e-brake-point (drag W on the v–s run-up curve; braking curve lands at B).
// Part d qualifies (31%) but has no widget: its marks were lost to using a constant-acceleration
// formula and not showing c = 0, which the working addresses directly. Reviewed Oct 2026: part c
// now eliminates u by hand ((1) − 8×(2)), as the report suggests; part e shows the combined equation.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import trackSrc from './spec-2021e2-q4-track.png'
import { Explore, lazyWidget } from '../Explore'

const SmoothLandingWidget = lazyWidget(() => import('../interactives/spec-2021e2-q4c-smooth-landing'))
const BrakePointWidget = lazyWidget(() => import('../interactives/spec-2021e2-q4e-brake-point'))

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
    reason: <>Reading the two components off the given position vector: the <Katex tex="\underset{\sim}{i}" /> component is <Katex tex="x" /> and the <Katex tex="\underset{\sim}{j}" /> component is <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="t = \frac{x}{u\cos(\theta)}" />,
    reason: <>A cartesian equation links <Katex tex="x" /> and <Katex tex="y" /> with no <Katex tex="t" />, so eliminate <Katex tex="t" />: make it the subject of the simpler <Katex tex="x" /> equation. Don&apos;t eliminate <Katex tex="\theta" /> — the target equation still contains <Katex tex="\theta" />, so the Pythagorean identity leads nowhere.</>,
  },
  {
    working: <Katex display tex="y = u\sin(\theta)\cdot\frac{x}{u\cos(\theta)}-\tfrac12(9.8)\left(\frac{x}{u\cos(\theta)}\right)^2" />,
    reason: <>Substituting into the <Katex tex="y" /> equation, with <Katex tex="g=9.8" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x\tan(\theta)-\frac{4.9x^2}{u^2\cos^2(\theta)}}" />,
    reason: <>In the first term <Katex tex="u" /> cancels and <Katex tex="\tfrac{\sin(\theta)}{\cos(\theta)}=\tan(\theta)" />; in the second, <Katex tex="\tfrac12(9.8)=4.9" /> and the bracket squared is <Katex tex="\tfrac{x^2}{u^2\cos^2(\theta)}" />. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{land at or beyond } C(16,4) \implies \text{at } x=16, \ y \ge 4" />,
    reason: <>The second track slopes <em>down</em> from <Katex tex="C" />, so the car lands at or beyond <Katex tex="C" /> exactly when its path is at or above <Katex tex="C" /> at <Katex tex="x=16" />. A faster launch makes the drop term <Katex tex="\tfrac{4.9x^2}{u^2\cos^2(\theta)}" /> smaller, so the path is higher at <Katex tex="x=16" />: the minimum speed is the one whose path passes exactly through <Katex tex="C" />.</>,
  },
  {
    working: <Katex display tex="4 = 16\tan(30^\circ)-\frac{4.9(16)^2}{u^2\cos^2(30^\circ)}" />,
    reason: <>Use the cartesian equation from part a. (you may use it even if you couldn&apos;t show it): you know <em>where</em> <Katex tex="C" /> is, not <em>when</em> the car gets there, so the vector form in <Katex tex="t" /> is the hard way. Substitute <Katex tex="x=16" />, <Katex tex="y=4" /> — in that order, not swapped.</>,
  },
  {
    working: <Cas fn="solve">solve(4 = 16·tan(30°) − 4.9·16²/(u²·cos²(30°)), u) | u &gt; 0</Cas>,
    reason: <>With the calculator in degree mode. <Katex tex="16\tan(30^\circ)\approx9.2376" />, so the drop term must be about 5.2376; there is one positive root.</>,
  },
  {
    working: <Katex display tex="\boxed{u = 17.87\ \text{m s}^{-1}}" />,
    reason: <>To two decimal places. Any faster and the car lands beyond <Katex tex="C" />, which the question allows.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{smooth at } C \implies \text{same point and same gradient}" />,
    reason: <><b>Smoothly</b> means no corner where the flight path meets the track: the path must reach <Katex tex="C" /> <em>and</em> be heading along the track there (its tangent at <Katex tex="C" /> lies along the track). These two conditions give the two equations needed for the two unknowns, <Katex tex="\theta" /> and <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\text{(1) } 4 = 16\tan(\theta)-\frac{4.9(16)^2}{u^2\cos^2(\theta)}" />,
    reason: <>The path passes through <Katex tex="C(16,4)" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \tan(\theta)-\frac{9.8x}{u^2\cos^2(\theta)}" />,
    reason: <>Differentiating the cartesian path from part a. with respect to <Katex tex="x" />; <Katex tex="\theta" /> and <Katex tex="u" /> are constants during the flight.</>,
  },
  {
    working: <Katex display tex="\text{(2) } \tan(170^\circ) = \tan(\theta)-\frac{9.8(16)}{u^2\cos^2(\theta)}" />,
    reason: <>In the diagram the track runs <em>down</em> from <Katex tex="C" /> to the <Katex tex="x" />-axis, so it makes an angle of <Katex tex="180^\circ-10^\circ=170^\circ" /> with the positive <Katex tex="x" />-direction and its gradient is <Katex tex="\tan(170^\circ)=-\tan(10^\circ)" />, which is negative. The report notes using <Katex tex="\tan10^\circ" /> as a common error.</>,
  },
  {
    working: <Katex display tex="\text{(1)}-8\times\text{(2)}: \ 4+8\tan(10^\circ) = 8\tan(\theta)" />,
    reason: <>Since <Katex tex="4.9(16)^2 = 1254.4 = 8\times9.8(16)" />, the <Katex tex="u" /> term in (1) is 8 times the one in (2), so subtracting 8 × (2) from (1) removes <Katex tex="u" /> completely; the report notes <Katex tex="\tan\theta" /> can be isolated by hand this way. (Or solve both at once on CAS, in degree mode: <Cas fn="solve">solve(eq1 and eq2, {'{'}θ, u{'}'}) | 0 &lt; θ &lt; 90°, u &gt; 0</Cas>.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \tan(\theta) &= \tfrac12+\tan(10^\circ) \approx 0.6763 \\ \theta &\approx 34.07^\circ \end{aligned}" />,
    reason: <>Dividing by 8. The ramp points upwards, so <Katex tex="0^\circ<\theta<90^\circ" /> and <Katex tex="\theta=\tan^{-1}(0.6763)" /> is the only solution.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} u^2\cos^2(\theta) &= \frac{9.8(16)}{\tan(\theta)+\tan(10^\circ)} \approx 183.90 \\ u &= \frac{\sqrt{183.90}}{\cos(34.07^\circ)} \approx 16.37 \end{aligned}" />,
    reason: <>Rearranging (2) for <Katex tex="u^2\cos^2(\theta)" />, using the unrounded <Katex tex="\theta" />. Take the positive root, since <Katex tex="u" /> is a speed.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = 34^\circ, \quad u = 16.4\ \text{m s}^{-1}}" />,
    reason: <>Rounded as the question asks.</>,
    more: <>Slide <Katex tex="\theta" /> in the diagram below: every launch there passes through <Katex tex="C" />, but only <Katex tex="\theta\approx34^\circ" /> arrives heading along the track.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{60}{v} \text{ with } a = v\frac{dv}{ds}" />,
    reason: <>The acceleration changes with <Katex tex="v" />, so it is not constant and a constant-acceleration formula can&apos;t be used — the report notes a number of incorrect responses used one. You have <Katex tex="a" /> in terms of <Katex tex="v" /> and want <Katex tex="v" /> in terms of <Katex tex="s" />, so use the form of acceleration that links <Katex tex="v" /> and <Katex tex="s" />.</>,
  },
  {
    working: <Katex display tex="v\frac{dv}{ds} = \frac{60}{v} \implies \frac{ds}{dv} = \frac{v^2}{60}" />,
    reason: <>Dividing by <Katex tex="v" /> gives <Katex tex="\tfrac{dv}{ds}=\tfrac{60}{v^2}" />, a function of <Katex tex="v" /> only. Flipping both sides, <Katex tex="\tfrac{ds}{dv}=1\big/\tfrac{dv}{ds}" />, lets you find <Katex tex="s" /> by antidifferentiating with respect to <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="s = \int\frac{v^2}{60}\,dv = \frac{v^3}{180}+c" />,
    reason: <>Include the constant — the report notes a number of students did not.</>,
  },
  {
    working: <Katex display tex="\text{from rest at } A: \ s=0 \text{ when } v=0 \implies c=0" />,
    reason: <>Substituting: <Katex tex="0=\tfrac{0^3}{180}+c" />. Show this rather than assuming it.</>,
  },
  {
    working: <Katex display tex="v^3 = 180s \implies \boxed{v = (180s)^{1/3}}" />,
    reason: <>Multiplying by 180, then taking the cube root. As required.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} v = 20 \text{ at } B: \ 20^3 &= 180s \\ AB &= \tfrac{8000}{180} = \tfrac{400}{9}\ \text{m} \end{aligned}" />,
    reason: <>Using part d. with <Katex tex="v=20" />: the run-up <Katex tex="AB" /> is about 44.4 m long.</>,
  },
  {
    working: <Katex display tex="\text{let } d = WB. \text{ At } W: \ v_W = \left(180\left(\tfrac{400}{9}-d\right)\right)^{1/3}" />,
    reason: <><Katex tex="W" /> is <Katex tex="\tfrac{400}{9}-d" /> metres from <Katex tex="A" />, so part d. gives the speed the car has reached there.</>,
  },
  {
    working: <Katex display tex="\text{braking: } 0-v_W^2 = 2(-9)d" />,
    reason: <>Now the acceleration <em>is</em> constant (<Katex tex="-9" />, as the car slows), so <Katex tex="v^2-u^2=2as" /> applies, from speed <Katex tex="v_W" /> to rest. The stopping distance must be exactly <Katex tex="d" />: called off any later, the car is faster and has less room, so it runs past <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} v_W^2 &= 18d \\ \left(180\left(\tfrac{400}{9}-d\right)\right)^{2/3} &= 18d \end{aligned}" />,
    reason: <>Substituting <Katex tex="v_W" /> from the second line; squaring a cube root gives the power <Katex tex="\tfrac23" />.</>,
  },
  {
    working: <Cas fn="solve">solve((180(400/9 − d))^(2/3) = 18d, d) | 0 &lt; d &lt; 400/9</Cas>,
    reason: <>As <Katex tex="d" /> increases the left side decreases while <Katex tex="18d" /> increases, so there is exactly one root between 0 and <Katex tex="\tfrac{400}{9}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 16.4\ \text{m}}" />,
    reason: <>To one decimal place. Check: at <Katex tex="W" /> the car is doing about <Katex tex="17.16\ \text{m s}^{-1}" /> and needs <Katex tex="\tfrac{17.16^2}{18}\approx16.4" /> m to stop, exactly the distance left.</>,
    more: <>Drag <Katex tex="W" /> in the diagram below.</>,
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

      <DetailOnly>
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6">
          <Background title="Projectile wording, current mathematics">
            <p>
              Working out a projectile&apos;s path from the forces on it was Mechanics, which is
              no longer in Specialist Mathematics — but here the position vector is{' '}
              <em>given</em> to you, so no forces are ever needed.
            </p>
            <p>
              Parts a. to c. are then parametric-to-cartesian conversion and a tangency
              condition; parts d. and e. are rectilinear motion with{' '}
              <Katex tex="a=v\tfrac{dv}{ds}" />, which is current content. Worth doing in
              full.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
        <Explore title="Why passing through C is not enough: smooth means the same gradient too">
          <SmoothLandingWidget />
        </Explore>
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
        <Explore title="Why W depends on d twice: the speed at W and the room left to stop">
          <BrakePointWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
