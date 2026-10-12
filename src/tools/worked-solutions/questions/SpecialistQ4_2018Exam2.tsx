// 2018 Specialist Mathematics — Exam 2, Section B, Question 4 (10 marks). Two yachts given
// by position vectors: cartesian paths, whether they collide, where the paths cross, which
// is faster, and how long they spend within 0.2 km. Question text transcribed from the
// original paper (VCAA printed no diagram for this question), including the stem text the
// paper prints between parts c. and d. Answers re-derived in sympy/scipy and checked against
// the VCAA examination report and itute (all agree). Solution is original.
//
// Interactives: b. a time slider that sails both yachts past the crossing point (A there at
// t ≈ 1.562 h, B at t ≈ 1.600 h); c. negative t tracing the rejected second root; d. velocity
// arrows from one point with a |v_A| circle, plus the speed-difference graph and the report's
// |r_A| > |r_B| misconception; e. the A-to-B arrow with a 0.2 km circle and the distance graph,
// with the report's |r_B| − |r_A| misconception.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const NearMissWidget = lazyWidget(() => import('../interactives/spec-2018e2-q4b-near-miss'))
const DomainWidget = lazyWidget(() => import('../interactives/spec-2018e2-q4c-domain'))
const SpeedWidget = lazyWidget(() => import('../interactives/spec-2018e2-q4d-speed-arrows'))
const GapWidget = lazyWidget(() => import('../interactives/spec-2018e2-q4e-gap'))

const EXAM_A: SAExaminerStats = {
  marks: [11, 8, 81],
  average: 1.7,
  comment: <>A variety of less simplified, but correct, forms were given and accepted.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 8, 72],
  average: 1.6,
  comment: <>The approach shown is one of several of correct ways to show that the yachts do not collide.</>,
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
      yachts rather than correctly set up an equation or inequation involving the speeds. Of
      those who approached the question correctly, a number ignored the domain of{' '}
      <Katex tex="t" />, giving answers that included negative values.
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
      <Katex tex="\left|\underset{\sim}{r}_B\right|-\left|\underset{\sim}{r}_A\right|<0.2" />,
      rather than the correct{' '}
      <Katex tex="\left|\underset{\sim}{r}_B-\underset{\sim}{r}_A\right|<0.2" />. Responses
      in terms of hours, rather than minutes, were given by a number of students who did not
      respond to the specifics of the question.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="A: \ x = t+1 \implies t = x-1" />,
    reason: <>A cartesian equation links <Katex tex="x" /> and <Katex tex="y" /> directly, so eliminate <Katex tex="t" />. The <Katex tex="i" />-component is linear, so make <Katex tex="t" /> the subject there.</>,
  },
  {
    working: <Katex display tex="y = t^2+2t = (x-1)^2+2(x-1) = x^2-1" />,
    reason: <>Substitute into the <Katex tex="j" />-component and expand. A parabola.</>,
  },
  {
    working: <Katex display tex="\boxed{A: \ y = x^2-1, \ x\ge1}" />,
    reason: <>Since <Katex tex="t\ge0" />, <Katex tex="x=t+1\ge1" />: yacht A only sails the part of the parabola starting at <Katex tex="(1,\ 0)" />.</>,
  },
  {
    working: <Katex display tex="B: \ x = t^2, \quad y = t^2+3 \implies y = x+3" />,
    reason: <>Both components contain <Katex tex="t^2" />, so replace <Katex tex="t^2" /> by <Katex tex="x" /> straight away. No square roots needed.</>,
  },
  {
    working: <Katex display tex="\boxed{B: \ y = x+3, \ x\ge0}" />,
    reason: <>A straight line, but <Katex tex="x=t^2" /> is never negative, so B only sails the half-line starting at <Katex tex="(0,\ 3)" />.</>,
    more: <>The report accepts just the two equations, but keep the restrictions: part c. uses them to reject a root.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Collision} \iff \underset{\sim}{r}_A(t) = \underset{\sim}{r}_B(t) \ \text{ for the same } t" />,
    reason: <>A collision needs both yachts at the same place <em>at the same time</em>, so keep <Katex tex="t" />: the cartesian equations from part a. have thrown it away.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} j\text{-components: } t^2+2t &= t^2+3 \\ 2t &= 3 \implies t = \frac32 \end{aligned}" />,
    reason: <>Two vectors are equal only if <em>both</em> components agree. Start with the easier one: the <Katex tex="t^2" /> terms cancel, leaving a single candidate time.</>,
    more: <>Either component works. The report starts with the <Katex tex="i" />-components instead; that version is under the conclusion below.</>,
  },
  {
    working: <Katex display tex="i\text{-components at } t=\tfrac32: \quad t+1 = \frac52, \qquad t^2 = \frac94" />,
    reason: <>A collision would need this same <Katex tex="t" /> to make the <Katex tex="i" />-components agree too. Test it.</>,
  },
  {
    working: <Katex display tex="\frac52 = \frac{10}{4} \ne \frac94" />,
    reason: <>The <Katex tex="i" />-components disagree at the only time the <Katex tex="j" />-components agree.</>,
    more: <>At <Katex tex="t=\tfrac32" /> both yachts are <Katex tex="5.25" /> km north of the buoy, but A is at <Katex tex="x=2.5" /> and B at <Katex tex="x=2.25" />: level north–south, <Katex tex="\tfrac14" /> km apart east–west.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{No } t\ge0 \text{ satisfies both, so} \\ \text{the yachts do not collide}\end{gathered}}" />,
    reason: <>No single <Katex tex="t" /> makes both components agree, so there is no collision. As required.</>,
    more: <>The report&apos;s order works just as well: the <Katex tex="i" />-components give <Katex tex="t+1=t^2" />, i.e. <Katex tex="t^2-t-1=0" />, so <Katex tex="t=\tfrac{1\pm\sqrt5}{2}" />. Neither value is <Katex tex="\tfrac32" />, so the two components never agree at the same time.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-1 = x+3 \implies x^2-x-4 = 0" />,
    reason: <>This asks where the <em>paths</em> meet, so time doesn&apos;t matter: set the <Katex tex="y" />&apos;s from the cartesian equations in part a. equal.</>,
    more: <>Part b. has already shown the yachts are not at this point together; here we only want the point both paths pass through.</>,
  },
  {
    working: <Katex display tex="x = \frac{1\pm\sqrt{17}}{2}" />,
    reason: <>Quadratic formula: <Katex tex="\tfrac{1\pm\sqrt{1+16}}{2}" />.</>,
  },
  {
    working: <Katex display tex="\frac{1-\sqrt{17}}{2} \approx -1.562 \ \text{ rejected}" />,
    reason: <>Check each root against the domains from part a.: A needs <Katex tex="x\ge1" />, B needs <Katex tex="x\ge0" />. This root fails both, so it is on neither path.</>,
  },
  {
    working: <Katex display tex="x = \frac{1+\sqrt{17}}{2} \approx 2.5616" />,
    reason: <>This root satisfies <Katex tex="x\ge1" />, so it is on both paths.</>,
  },
  {
    working: <Katex display tex="y = x+3 = \frac{7+\sqrt{17}}{2} \approx 5.5616" />,
    reason: <>Substitute into the simpler equation, <Katex tex="y=x+3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(2.562,\ 5.562)}" />,
    reason: <>Coordinates correct to three decimal places, as the question asks.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v}_A = \underset{\sim}{i} + (2t+2)\underset{\sim}{j}" />,
    reason: <>&ldquo;Faster&rdquo; is about speed, and speed comes from velocity, so differentiate each position vector first.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}_B = 2t\,\underset{\sim}{i} + 2t\,\underset{\sim}{j}" />,
    reason: <>Speed is the <em>magnitude</em> of velocity, so it is the lengths of these two vectors that get compared.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}_A\right|^2 = 1+(2t+2)^2 = 4t^2+8t+5" />,
    reason: <>Compare squared speeds to avoid two square roots. That is safe because speeds are never negative.</>,
    more: <>For non-negative numbers, squaring keeps the order: <Katex tex="\left|\underset{\sim}{v}_A\right|>\left|\underset{\sim}{v}_B\right| \iff \left|\underset{\sim}{v}_A\right|^2>\left|\underset{\sim}{v}_B\right|^2" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}_B\right|^2 = (2t)^2+(2t)^2 = 8t^2" />,
    reason: <>The same for B.</>,
    more: <>B starts from rest (speed <Katex tex="0" /> at <Katex tex="t=0" />) and its speed <Katex tex="\sqrt8\,t" /> grows steadily, while A starts at <Katex tex="\sqrt5" />. So A is faster at first; the question is when B catches up.</>,
  },
  {
    working: <Katex display tex="4t^2+8t+5 > 8t^2 \implies 4t^2-8t-5 < 0" />,
    reason: <>&ldquo;A faster than B&rdquo; is the inequality between the speeds. Collect everything on one side.</>,
  },
  {
    working: <Katex display tex="(2t-5)(2t+1) < 0 \implies -\frac12 < t < \frac52" />,
    reason: <>Factorise (or solve <Katex tex="4t^2-8t-5=0" /> on CAS). An upward parabola is negative strictly between its roots.</>,
  },
  {
    working: <Katex display tex="\boxed{0 \le t < \frac52}" />,
    reason: <>Intersect with the given domain <Katex tex="t\ge0" />: the root <Katex tex="-\tfrac12" /> is before the race starts.</>,
    more: <>A is faster for the first two and a half hours; after that B, which started from rest but keeps speeding up, is faster.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}_B-\underset{\sim}{r}_A = \left(t^2-t-1\right)\underset{\sim}{i} + \left(3-2t\right)\underset{\sim}{j}" />,
    reason: <>Subtract component by component: this is the vector from A to B at time <Katex tex="t" />, and its length is the distance between the yachts.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{r}_B-\underset{\sim}{r}_A\right|^2 = \left(t^2-t-1\right)^2+(3-2t)^2" />,
    reason: <>Pythagoras on the components. Work with the square to avoid carrying a root.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\left|\underset{\sim}{r}_B-\underset{\sim}{r}_A\right| < 0.2 \\ \iff &\left(t^2-t-1\right)^2+(3-2t)^2 < 0.2^2 \end{aligned}" />,
    reason: <>&ldquo;Within <Katex tex="0.2" /> km&rdquo; is an inequality on the distance. Squaring both sides is safe because both are non-negative.</>,
  },
  {
    working: <Cas fn="solve">solve((t^2-t-1)^2+(3-2t)^2 &lt; 0.2^2, t)</Cas>,
    reason: <>Solve the inequality on CAS. It returns a single interval, whose two ends are the times the gap crosses <Katex tex="0.2" /> km.</>,
  },
  {
    working: <Katex display tex="1.5288 < t < 1.5973" />,
    reason: <>The times (in hours) when the yachts are within <Katex tex="0.2" /> km. Keep four decimal places so rounding doesn&apos;t affect the final answer.</>,
    more: <>The closest approach is about <Katex tex="0.174" /> km, at <Katex tex="t\approx1.563" />. The whole window is before <Katex tex="t=\tfrac52" />, so by part d. A is the faster yacht and would take the time penalty.</>,
  },
  {
    working: <Katex display tex="(1.5973-1.5288)\times60 \approx 4.11" />,
    reason: <>The question wants the <em>length</em> of that period in minutes: multiply the duration in hours by <Katex tex="60" />.</>,
    more: <>The window itself runs from about <Katex tex="91.7" /> to <Katex tex="95.8" /> minutes after <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 4.1 \text{ minutes}}" />,
    reason: <>Correct to one decimal place, as the question asks.</>,
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
          <Katex display tex="\underset{\sim}{r}_A(t) = (t+1)\underset{\sim}{i} + \left(t^2+2t\right)\underset{\sim}{j} \quad \text{and}" />
          <Katex display tex="\underset{\sim}{r}_B(t) = t^2\,\underset{\sim}{i} + \left(t^2+3\right)\underset{\sim}{j}, \quad t\ge0" />
        </p>
        <p>
          where displacement components are measured in kilometres from a given reference buoy
          at origin <Katex tex="O" />.
        </p>
      </div>

      <PartCard letter="a" topic="Cartesian Equation" marks={2} statement={<>Find the cartesian equation of the path for each yacht.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Collision" marks={2} statement={<>Show that the two yachts will not collide if they follow these paths.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            A cartesian equation describes a yacht&apos;s path: every point it ever visits, with
            the times erased. Two paths crossing only means each yacht passes that point at{' '}
            <em>some</em> time. A collision needs one value of <Katex tex="t" /> at which both
            component equations hold at once.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="The paths cross, but the yachts get there at different times">
          <NearMissWidget />
        </Explore>
        <WrongMethod
          title="The paths cross, so the yachts must collide"
          working={<Katex display tex="\begin{gathered} x^2-1=x+3 \\ \implies \text{they meet at } (2.562,\ 5.562) \end{gathered}" />}
        >
          The cartesian equations describe <em>where</em> each yacht sails, not <em>when</em>. Yacht A
          passes that point at <Katex tex="t=\tfrac{\sqrt{17}-1}{2}\approx1.562" /> but B only gets there
          at <Katex tex="t=\sqrt{\tfrac{1+\sqrt{17}}{2}}\approx1.600" />, about <Katex tex="2.3" /> minutes
          later. To test for a collision, keep <Katex tex="t" />: solve{' '}
          <Katex tex="\underset{\sim}{r}_A(t)=\underset{\sim}{r}_B(t)" /> component by component.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Intersection" marks={2} statement={<>Find the coordinates of the point where the paths of the two yachts cross. Give your coordinates correct to three decimal places.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why only one of the two crossing points is real">
          <DomainWidget />
        </Explore>
        <WrongMethod
          title="Keep both roots of x² − x − 4 = 0"
          source="Examiner's report"
          working={<Katex display tex="(2.562,\ 5.562) \ \text{ and } \ (-1.562,\ 1.438)" />}
        >
          The second point satisfies both cartesian equations, but neither yacht ever gets there. A
          would be at <Katex tex="x=-1.562" /> only when <Katex tex="t=x-1\approx-2.562" />, before the
          race, and B would need <Katex tex="t^2=-1.562" />, which is impossible. Eliminating{' '}
          <Katex tex="t" /> loses the restriction, so carry the domains from part a. and check every root
          against them.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          One of the rules for the race is that the yachts are not allowed to be within{' '}
          <Katex tex="0.2" /> km of each other. If this occurs there is a time penalty for the
          yacht that is travelling faster.
        </p>
      </div>

      <PartCard letter="d" topic="Speed Comparison" marks={2} statement={<>For what values of <Katex tex="t" /> is yacht <Katex tex="A" /> travelling faster than yacht <Katex tex="B" />?</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            Speed is <Katex tex="\left|\underset{\sim}{v}\right|" />, a single non-negative
            number, so &ldquo;faster&rdquo; is a comparison of two scalars. Comparing the velocity{' '}
            <em>vectors</em>, or the magnitudes of the <em>position</em> vectors, answers a
            different question. The report records both mistakes.
          </p>
          <p>
            Picture the velocity as an arrow: its direction is where the yacht is heading and its
            length is how fast it is going. &ldquo;A is faster&rdquo; means A&apos;s arrow is longer,
            whatever directions the two arrows point in.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Faster means a longer velocity arrow">
          <SpeedWidget />
        </Explore>
        <WrongMethod
          title="Compare distances from the buoy: |r_A| > |r_B|"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\sqrt{(t+1)^2+\left(t^2+2t\right)^2} > \sqrt{t^4+\left(t^2+3\right)^2}" />
              <Katex display tex="\implies 1.402 < t < 3.720" />
            </>
          }
        >
          <Katex tex="\left|\underset{\sim}{r}\right|" /> is how far a yacht is from the buoy: where it
          is, not how fast it is going. At <Katex tex="t=0" /> B is <Katex tex="3" /> km out and A only{' '}
          <Katex tex="1" /> km, yet B is not moving at all. Speed needs the derivative first,{' '}
          <Katex tex="\underset{\sim}{v}=\tfrac{d\underset{\sim}{r}}{dt}" />, and then its magnitude.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e" topic="Time Within Distance" marks={2} statement={<>If yacht <Katex tex="A" /> does not alter its course, for what period of time will yacht <Katex tex="A" /> be within <Katex tex="0.2" /> km of yacht <Katex tex="B" />? Give your answer in <b>minutes</b>, correct to one decimal place.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            The distance between the yachts changes as they sail: it is a function
            of <Katex tex="t" />, and &ldquo;within <Katex tex="0.2" /> km&rdquo; picks out the times
            when it is less than <Katex tex="0.2" />. The &ldquo;period of time&rdquo; is the length of
            that interval.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="The gap is the length of the arrow from A to B">
          <GapWidget />
        </Explore>
        <WrongMethod
          title="Subtract the distances from the buoy: |r_B| − |r_A| < 0.2"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\begin{aligned}&\sqrt{t^4+\left(t^2+3\right)^2}\\&\quad-\sqrt{(t+1)^2+\left(t^2+2t\right)^2} < 0.2\end{aligned}" />
              <Katex display tex="\begin{aligned}&\implies 1.233 < t < 3.900,\\&\quad\text{ i.e. } \approx 160 \text{ minutes}\end{aligned}" />
            </>
          }
        >
          This measures how much further B is from the buoy than A is, which says nothing about how far
          apart the yachts are. At <Katex tex="t\approx1.402" /> both yachts are <Katex tex="5.341" /> km
          from the buoy, so <Katex tex="\left|\underset{\sim}{r}_B\right|-\left|\underset{\sim}{r}_A\right|=0" />,
          yet they are <Katex tex="0.478" /> km apart. Subtract the vectors first, then take the
          magnitude.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
