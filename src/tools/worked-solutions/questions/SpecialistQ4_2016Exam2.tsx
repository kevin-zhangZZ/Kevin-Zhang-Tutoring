// 2016 Specialist Mathematics — Exam 2, Question 4 (10 marks).
// Two ships' position vectors: collision check, angle between paths, closest approach.
// Question text transcribed from the original paper; worked solutions below are original.
// Part (b)'s sketch axes VCAA supplied were blank (shown cropped in the part statement), so
// the plotted ship paths are this site's own matplotlib figure, drawn on the same grid
// (x from −10 to 10, y from −6 to 10) and starting at t = 0 (midday). No video walkthrough yet — the tutor will record and add these later.
// Interactives (qualifying parts, under 40% full marks): b (rays from t = 0 vs the whole line),
// c (velocity vectors vs position vectors), d.i (displacement length D(t) vs |r_A| − |r_B|).
// d.ii skipped: it is read straight off the d.i widget (minimum of D(t) ≈ 2.06 km), so a second
// widget would repeat it.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import shipPathsSrc from './spec-2016e2-q4b-ship-paths.png'
import blankAxesSrc from './spec-2016e2-q4b-blank-axes.png'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const RaysWidget = lazyWidget(() => import('../interactives/spec-2016e2-q4b-rays'))
const AngleWidget = lazyWidget(() => import('../interactives/spec-2016e2-q4c-angle'))
const ClosestWidget = lazyWidget(() => import('../interactives/spec-2016e2-q4d-closest'))

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
          To collide, the ships must be at the same point at the <em>same</em> time, so both components must agree
          for one value of <Katex tex="t" />. Solve the <Katex tex="\underset{\sim}{i}" />-components first.
        </>
      ),
      more: (
        <>
          The report says this approach (find the time from each component, then compare) led to success most
          often, and that many students lost marks through simple algebraic errors. Expand carefully:{' '}
          <Katex tex="5(1-t)=5-5t" /> and <Katex tex="4(t-2)=4t-8" />, so <Katex tex="9t=13" />.
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
      reason: <>Now the <Katex tex="\underset{\sim}{j}" />-components: <Katex tex="5=2t" />.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{No common solution for } t}" />,
      reason: (
        <>
          <Katex tex="\tfrac{13}{9} \ne \tfrac{5}{2}" />, so no single time makes both components equal: the ships are
          never at the same point at the same time. They do not collide, as required.
        </>
      ),
      more: (
        <>
          The paths themselves do cross, at <Katex tex="\left(-\tfrac{40}{37}, \tfrac{246}{37}\right)" />, but{' '}
          <Katex tex="A" /> passes that point at <Katex tex="t=\tfrac{45}{37}\approx1.22" /> and <Katex tex="B" /> at{' '}
          <Katex tex="t=\tfrac{64}{37}\approx1.73" />, about half an hour later. Crossing paths is not a collision;
          that is why it is not enough to show the lines meet.
        </>
      ),
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\text{Ship } A: \ y = 6 - \tfrac{3}{5}x, \ x \le 5" />
          <Katex display tex="\text{Ship } B: \ y = 1.25x + 8, \ x \ge -8" />
        </>
      ),
      reason: (
        <>
          Eliminate <Katex tex="t" /> to get each line. The vectors only describe the ships for <Katex tex="t\ge0" /> (from midday on),
          so each path is only part of its line.
        </>
      ),
      more: (
        <>
          <p>
            For <Katex tex="A" />: <Katex tex="x=5-5t" /> gives <Katex tex="t=\tfrac{5-x}{5}" />, so{' '}
            <Katex tex="y=3+3t=3+\tfrac{3(5-x)}{5}=6-\tfrac35x" />. For <Katex tex="B" />:{' '}
            <Katex tex="x=4t-8" /> gives <Katex tex="t=\tfrac{x+8}{4}" />, so{' '}
            <Katex tex="y=\tfrac{5(x+8)}{4}-2=1.25x+8" />.
          </p>
          <p className="mt-2">
            The restrictions come from <Katex tex="t\ge0" />: <Katex tex="x=5-5t\le5" /> for <Katex tex="A" /> and{' '}
            <Katex tex="x=4t-8\ge-8" /> for <Katex tex="B" />. The report notes many students did not take note of when
            the vector functions applied, and plotted the paths over incorrect domains.
          </p>
        </>
      ),
    },
    {
      working: (
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={shipPathsSrc}
            alt="Our sketch on VCAA's grid: ship A's path starting at (5, 3) at t = 0 and heading up-left, and ship B's path starting at (−8, −2) at t = 0 and heading up-right, each with an arrow for its direction"
            className="w-full max-w-[320px]"
          />
        </div>
      ),
      reason: (
        <>
          Each path starts at its <Katex tex="t=0" /> point: <Katex tex="A" /> at <Katex tex="(5,3)" />,{' '}
          <Katex tex="B" /> at <Katex tex="(-8,-2)" />. The coefficients of <Katex tex="t" />,{' '}
          <Katex tex="(-5,3)" /> and <Katex tex="(4,5)" />, give each arrow&apos;s direction.
        </>
      ),
      more: (
        <>
          Check with one more point: at <Katex tex="t=1" />, <Katex tex="A" /> is at <Katex tex="(0,6)" /> (left of and
          above its start) and <Katex tex="B" /> at <Katex tex="(-4,3)" /> (right of and above its start). Label each
          path with its ship&apos;s name, as the question asks.
        </>
      ),
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\dot{\underset{\sim}{r}}_A = -5\underset{\sim}{i} + 3\underset{\sim}{j}" />
          <Katex display tex="\dot{\underset{\sim}{r}}_B = 4\underset{\sim}{i} + 5\underset{\sim}{j}" />
        </>
      ),
      reason: (
        <>
          A ship&apos;s velocity points along its path, so the angle between the paths is the angle between the
          velocity vectors. Differentiate each position vector.
        </>
      ),
      more: (
        <>
          The report notes some students found the angle between <em>position</em> vectors at chosen times. That angle
          changes with the time you pick, so it cannot be the angle between two fixed paths. It also says students who
          used velocity vectors and a scalar product were more successful than those who used the gradients of the cartesian
          lines. That method works, but gives the acute angle between the lines first:{' '}
          <Katex tex="\tan^{-1}\!\left(\tfrac54\right)-\tan^{-1}\!\left(-\tfrac35\right)\approx51.34^\circ+30.96^\circ=82.3^\circ" />.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="\cos\theta = \frac{\dot{\underset{\sim}{r}}_A \cdot \dot{\underset{\sim}{r}}_B}{|\dot{\underset{\sim}{r}}_A||\dot{\underset{\sim}{r}}_B|}" />
          <Katex display tex="= \frac{(-5)(4)+(3)(5)}{\sqrt{34}\sqrt{41}}" />
          <Katex display tex="= \frac{-5}{\sqrt{1394}}" />
        </>
      ),
      reason: (
        <>
          Scalar product formula, with <Katex tex="|-5\underset{\sim}{i}+3\underset{\sim}{j}|=\sqrt{34}" /> and{' '}
          <Katex tex="|4\underset{\sim}{i}+5\underset{\sim}{j}|=\sqrt{41}" />.
        </>
      ),
    },
    {
      working: (
        <>
          <Katex display tex="\theta = \cos^{-1}\!\left(\tfrac{-5}{\sqrt{1394}}\right)" />
          <Katex display tex="\boxed{\theta \approx 97.7^\circ}" />
        </>
      ),
      reason: (
        <>
          Inverse cosine on the CAS in degree mode. <Katex tex="\cos\theta" /> is negative, so{' '}
          <Katex tex="\theta" /> is already obtuse.
        </>
      ),
      more: (
        <>
          In radian mode the CAS gives <Katex tex="1.705" />, which is not in degrees. Had{' '}
          <Katex tex="\cos\theta" /> been positive, the obtuse angle would be <Katex tex="180^\circ-\theta" />.
          The report notes students occasionally gave the acute angle, <Katex tex="180^\circ-97.7^\circ=82.3^\circ" />,
          which is not what was asked.
        </>
      ),
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
      reason: (
        <>
          The distance between the ships, <Katex tex="D(t)=|\underset{\sim}{r}_A-\underset{\sim}{r}_B|" />, is the
          length of the displacement from <Katex tex="B" /> to <Katex tex="A" />, so find that vector first.
        </>
      ),
      more: (
        <>
          The report notes students who found a displacement vector frequently went on to the correct time, while some
          used the difference between position vector magnitudes, <Katex tex="|\underset{\sim}{r}_A|-|\underset{\sim}{r}_B|" />.
          That only compares how far each ship is from the lighthouse, not from each other: at{' '}
          <Katex tex="t=\tfrac{26-\sqrt{438}}{7}\approx0.725" /> it is <Katex tex="0" /> (both ships equally far from{' '}
          <Katex tex="O" />), yet the ships are about <Katex tex="7.39" /> km apart.
        </>
      ),
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
      reason: (
        <>
          Closest means <Katex tex="D" /> is a minimum, so set the derivative to zero. Use <Katex tex="D^2" />: no square
          root, and since <Katex tex="D\ge0" /> the same <Katex tex="t" /> minimises both.
        </>
      ),
      more: (
        <>
          <Katex tex="D^2" /> is an upright parabola in <Katex tex="t" />, so its only stationary point is the minimum,
          and <Katex tex="t=\tfrac{127}{85}" /> is positive, so it is after midday. On the CAS,{' '}
          <Cas fn="fMin">fMin((13−9t)^2+(5−2t)^2, t) | t≥0</Cas> gives the same <Katex tex="t" />.
        </>
      ),
    },
    {
      working: <Katex display tex="\boxed{t \approx 1.494 \text{ hours}}" />,
      reason: <>Three decimal places, as instructed — the exact <Katex tex="\tfrac{127}{85}" /> on its own did not earn the mark.</>,
    },
  ]

  const rowsDii: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="D_{\min}^2 = 85\left(\tfrac{127}{85}\right)^2-254\left(\tfrac{127}{85}\right)+194" />
          <Katex display tex="= 194-\tfrac{16129}{85} = \tfrac{361}{85}" />
          <Katex display tex="\boxed{D_{\min} = \sqrt{\tfrac{361}{85}} \approx 2.06 \text{ km}}" />
        </>
      ),
      reason: (
        <>
          Substitute the exact <Katex tex="t=\tfrac{127}{85}" /> from d.i. into <Katex tex="D(t)^2" />, then take the
          square root.
        </>
      ),
      more: (
        <>
          Using the rounded <Katex tex="t=1.494" /> happens to give <Katex tex="2.06" /> too, but substituting the exact
          (or CAS-stored) value is the safe habit. The report notes many students who did not attempt d.i. did not
          attempt this question either: d.ii. needs only the <Katex tex="D(t)" /> and <Katex tex="t" /> from d.i.
        </>
      ),
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
        <Katex display tex="\underset{\sim}{r}_A = 5(1-t)\underset{\sim}{i} + 3(1+t)\underset{\sim}{j}," className="mt-2" />
        <Katex display tex="\underset{\sim}{r}_B = 4(t-2)\underset{\sim}{i} + (5t-2)\underset{\sim}{j}" className="mb-2" />
        <p>where displacements are measured in kilometres.</p>
      </div>

      <PartCard letter="a" topic="Collision" marks={2} statement="Show that the two ships will not collide, clearly stating your reason." examinerReport={EXAMINER_A}>
        <WorkingTable rows={rowsA} />
      </PartCard>

      <PartCard letter="b" topic="Sketch Paths" marks={3} statement={
          <>
            <p>Sketch and label the path of each ship on the axes below. Show the direction of motion of each ship with an arrow.</p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank axes with x from −10 to 10 and y from −6 to 10 — from the original 2016 VCAA exam paper"
                className="w-full max-w-[380px]"
              />
            </div>
          </>
        } examinerReport={EXAMINER_B}>
        <WorkingTable rows={rowsB} />
        <Explore title="Each path is a ray starting at midday, not a whole line">
          <RaysWidget />
        </Explore>
      </PartCard>

      <PartCard letter="c" topic="Angle Between Paths" marks={2} statement="Find the obtuse angle between the paths of the two ships. Give your answer in degrees, correct to one decimal place." examinerReport={EXAMINER_C}>
        <WorkingTable rows={rowsC} />
        <Explore title="The paths' angle comes from the velocity vectors, which never change">
          <AngleWidget />
        </Explore>
      </PartCard>

      <PartCard letter="d.i" topic="Closest Approach" marks={2} statement={<>Find the value of <Katex tex="t" />, correct to three decimal places, when the ships are closest.</>} examinerReport={EXAMINER_DI}>
        <WorkingTable rows={rowsDi} />
        <Explore title={<>The ships' distance apart is <Katex tex="|\underset{\sim}{r}_A - \underset{\sim}{r}_B|" />, not <Katex tex="|\underset{\sim}{r}_A| - |\underset{\sim}{r}_B|" /></>}>
          <ClosestWidget />
        </Explore>
      </PartCard>

      <PartCard letter="d.ii" topic="Minimum Distance" marks={1} statement="Find the minimum distance between the ships, in kilometres, correct to two decimal places." examinerReport={EXAMINER_DII}>
        <WorkingTable rows={rowsDii} />
      </PartCard>
    </div>
  )
}
