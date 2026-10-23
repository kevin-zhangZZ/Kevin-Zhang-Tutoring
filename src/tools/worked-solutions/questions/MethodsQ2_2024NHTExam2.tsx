// 2024 Mathematical Methods NHT — Exam 2, Section B Question 2 (13 marks). The NHT report gives
// sample answers only, with no statistics. A simple pendulum: height h(θ) = 3/2 − ½cos(θ) on
// [−π/3, π/3], the angle θ(t) = (π/3)cos(9t/2) on [0, 30]: maximum and minimum heights, the
// angles giving a height under 1.1 m, the starting point, the period, how often the mass is at
// A, the arc length from A to C, and the composite h(θ(t)) with its value at t = 1 and its
// average. Question text transcribed from the original paper; the pendulum diagram is cropped
// from the original VCAA exam PDF at 300 dpi (meth-2024nhte2-q2-pendulum.png). Answers checked
// with numpy/scipy and against the VCAA report's sample answers: a. 5/4 and 1; b. −0.64 < θ <
// 0.64; d. 4π/9; e. 22; f. π/3; g.i. 1.01; g.iii. 1.13 (1.1279 by numerical integration).
// Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import pendulumSrc from './meth-2024nhte2-q2-pendulum.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="h\!\left(\pm\tfrac{\pi}{3}\right) = \frac32-\frac12\cos\!\left(\frac{\pi}{3}\right) = \frac32-\frac14 = \frac54" />,
    reason: <>The stem says the maximum height is at <Katex tex="A" /> and <Katex tex="C" />, where <Katex tex="\theta=\pm\tfrac\pi3" />. <Katex tex="\cos" /> is even, so both give the same height.</>,
    more: <>This agrees with the rule: on <Katex tex="\left[-\tfrac\pi3,\tfrac\pi3\right]" />, <Katex tex="\cos(\theta)" /> is smallest (<Katex tex="\tfrac12" />) at the endpoints, and subtracting the smallest amount gives the largest height.</>,
  },
  {
    working: <Katex display tex="h(0) = \frac32-\frac12\cos(0) = \frac32-\frac12 = 1" />,
    reason: <>The minimum is at <Katex tex="B" />, <Katex tex="\theta=0" />, where <Katex tex="\cos(\theta)" /> takes its largest value, 1.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum } \tfrac54 \text{ m}, \quad \text{minimum } 1 \text{ m}}" />,
    reason: <>The difference, 0.25 m, is how far the mass rises from <Katex tex="B" /> to <Katex tex="A" />.</>,
    more: <>Sense check with the string: the mass hangs 0.5 m below <Katex tex="O" />, so <Katex tex="O" /> is 1.5 m above the ground (the <Katex tex="\tfrac32" /> in the rule). At <Katex tex="\theta=\tfrac\pi3" /> the mass is <Katex tex="0.5\cos\tfrac\pi3=0.25" /> m below <Katex tex="O" />, so 1.25 m up.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac32-\frac12\cos(\theta) < 1.1 \iff \cos(\theta) > 0.8" />,
    reason: <>Subtract <Katex tex="\tfrac32" /> and multiply by <Katex tex="-2" />, which reverses the inequality.</>,
    more: <>The reversal makes sense physically: the lower the mass, the closer it is to the bottom <Katex tex="B" />, where <Katex tex="\cos(\theta)" /> is largest.</>,
  },
  {
    working: <Cas fn="solve">solve(1.5 − 0.5cos(θ) = 1.1, θ) | −π/3 ≤ θ ≤ π/3</Cas>,
    reason: <>Find where the height is exactly 1.1 m: <Katex tex="\theta=\pm\cos^{-1}(0.8)" />.</>,
  },
  {
    working: <Katex display tex="\theta = \pm0.6435\ldots" />,
    reason: <>Both lie inside <Katex tex="\left[-\tfrac\pi3,\tfrac\pi3\right]" /> (<Katex tex="\tfrac\pi3\approx1.047" />), and they are symmetric because <Katex tex="h" /> is even.</>,
  },
  {
    working: <Katex display tex="\boxed{-0.64 < \theta < 0.64}" />,
    reason: <>The height is lowest at <Katex tex="\theta=0" />, so it is under 1.1 m <em>between</em> the two boundary angles. Strict inequalities, since the question says less than 1.1 m. Correct to two decimal places.</>,
    more: <>VCAA also accepts the interval form <Katex tex="(-0.64,\ 0.64)" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\theta(0) = \frac{\pi}{3}\cos(0) = \frac{\pi}{3}" />,
    reason: <>&ldquo;Initially&rdquo; means <Katex tex="t=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta(0)=\tfrac{\pi}{3}, \text{ which is point } A}" />,
    reason: <>The stem defines <Katex tex="A" /> as the point where <Katex tex="\theta=\tfrac\pi3" />. As required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="T = \frac{2\pi}{n} \ \text{ for } \cos(nt)" />,
    reason: <>From <Katex tex="A" /> to <Katex tex="C" /> and back to <Katex tex="A" /> is one full cycle of <Katex tex="\theta(t)" />: from <Katex tex="\tfrac\pi3" /> down to <Katex tex="-\tfrac\pi3" /> and back up.</>,
  },
  {
    working: <Katex display tex="T = \frac{2\pi}{9/2} = \frac{4\pi}{9}" />,
    reason: <>Here <Katex tex="n=\tfrac92" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{4\pi}{9} \text{ seconds}}" />,
    reason: <>Exact, since no rounding was asked for. About 1.40 s, a sensible swing time for a half-metre pendulum.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\theta(t)=\frac\pi3 \iff \cos\!\left(\frac{9t}{2}\right) = 1\\ &\iff t = \frac{4\pi k}{9},\ k=0,1,2,\ldots\end{aligned}" />,
    reason: <>The mass is at <Katex tex="A" /> once every period, starting at <Katex tex="t=0" /> (part c.).</>,
  },
  {
    working: <Katex display tex="\frac{4\pi k}{9} \le 30 \iff k \le \frac{270}{4\pi} = 21.48\ldots" />,
    reason: <>The largest whole <Katex tex="k" /> is 21: <Katex tex="t=\tfrac{84\pi}{9}\approx29.3" /> is inside <Katex tex="[0,30]" />, but <Katex tex="k=22" /> gives about 30.7.</>,
  },
  {
    working: <Katex display tex="\boxed{22 \text{ times}}" />,
    reason: <><Katex tex="k=0,1,\ldots,21" /> is 22 values. The count includes the start, <Katex tex="t=0" />, which is in the domain.</>,
    more: <>Dividing 30 by the period gives 21.48 complete swings, and rounding that down to 21 misses the visit at <Katex tex="t=0" />. Counting the solutions of <Katex tex="\theta(t)=\tfrac\pi3" /> on <Katex tex="[0,30]" /> (by CAS or by listing <Katex tex="k" />) avoids that trap.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{angle swept} = \frac\pi3-\left(-\frac\pi3\right) = \frac{2\pi}{3}" />,
    reason: <>From <Katex tex="A" /> to <Katex tex="C" /> the string turns through the angle <Katex tex="AOC" />.</>,
  },
  {
    working: <Katex display tex="\text{arc length} = r\theta = 0.5 \times \frac{2\pi}{3}" />,
    reason: <>The mass moves along a circular arc of radius 0.5 m (the string length). Arc length is radius × angle in radians.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{\pi}{3} \text{ m}}" />,
    reason: <>About 1.05 m.</>,
    more: <>Not the straight-line distance <Katex tex="AC" /> (that would be the chord, <Katex tex="2\times0.5\sin\tfrac\pi3=\tfrac{\sqrt3}{2}" />): the mass travels along the curved path.</>,
  },
]

const ROWS_GI: WorkingRow[] = [
  {
    working: <Katex display tex="\theta(1) = \frac\pi3\cos\!\left(\frac92\right) = -0.2207\ldots" />,
    reason: <>First find the angle after one second. Calculator in radian mode: <Katex tex="\tfrac92" /> is radians, not degrees.</>,
    more: <>The negative angle means the mass is on the <Katex tex="C" /> side of <Katex tex="B" /> after one second: it is most of the way through its first period (about 1.40 s).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}h(-0.2207\ldots) &= \frac32-\frac12\cos(-0.2207\ldots)\\ &= 1.0121\ldots\end{aligned}" />,
    reason: <>Then substitute that angle into <Katex tex="h" />. Keep the unrounded angle.</>,
  },
  {
    working: <Katex display tex="\boxed{1.01 \text{ m}}" />,
    reason: <>Correct to two decimal places. Between the minimum 1 m and maximum 1.25 m, and close to 1 because the angle is small.</>,
  },
]

const ROWS_GII: WorkingRow[] = [
  {
    working: <Katex display tex="h(\theta(t)) = \frac32-\frac12\cos\!\big(\theta(t)\big)" />,
    reason: <>Replace <Katex tex="\theta" /> in the rule for <Katex tex="h" /> by the whole expression for <Katex tex="\theta(t)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h(\theta(t)) = \frac32-\frac12\cos\!\left(\frac\pi3\cos\!\left(\frac{9t}{2}\right)\right)}" />,
    reason: <>A cosine of a cosine: it does not simplify further. This gives the height directly as a function of time.</>,
    more: <>Part g.i. was this rule evaluated at <Katex tex="t=1" />. The composite exists because every value of <Katex tex="\theta(t)" /> lies in <Katex tex="\left[-\tfrac\pi3,\tfrac\pi3\right]" />, the domain of <Katex tex="h" />.</>,
  },
]

const ROWS_GIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average} = \frac{1}{30-0}\int_0^{30} h(\theta(t))\,dt" />,
    reason: <>The average value of a function over an interval <Katex tex="[a,b]" /> is <Katex tex="\tfrac{1}{b-a}\int_a^b" />. The height is a function of time on <Katex tex="[0,30]" />, so average over that.</>,
    more: <>Average value means the constant height that would give the same area under the height–time graph. It is <em>not</em> the midpoint of the maximum and minimum, <Katex tex="\tfrac{1+1.25}{2}=1.125" />, even though that happens to be close here.</>,
  },
  {
    working: <Cas fn="nInt">nInt(1.5 − 0.5cos(π/3·cos(9t/2)), t, 0, 30) / 30</Cas>,
    reason: <>A cosine of a cosine has no antiderivative you can find by hand, so integrate numerically.</>,
  },
  {
    working: <Katex display tex="= 1.1278\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{1.13 \text{ m}}" />,
    reason: <>Correct to two decimal places. Between 1 and 1.25, as it must be.</>,
    more: <>It sits above the midpoint 1.125 because a pendulum moves slowest at the ends of its swing, where it is highest, so it spends more of its time up high.</>,
  },
]

export default function MethodsQ2_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (13 marks)</p>
        <p>
          A simple pendulum consists of a mass at the end of a string of fixed length 0.5 m. The
          other end of the string is attached to a fixed point, <Katex tex="O" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={pendulumSrc}
            alt="A pendulum hanging from O: the string makes angle θ with the dashed vertical OB, the mass swinging on a dashed circular arc from C on the left through B at the bottom to A on the right, and h the vertical height of the mass above the horizontal ground — from the original VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p>
          The mass swings back and forth in a circular arc between points <Katex tex="A" /> and{' '}
          <Katex tex="C" />, each time passing through point <Katex tex="B" />.
          <br />
          The height, <Katex tex="h" /> metres, of the mass above the horizontal ground is given by
          the function
        </p>
        <div className="py-1">
          <Katex display tex="h:\left[-\frac\pi3,\frac\pi3\right]\to R,\ h(\theta)=\frac32-\frac12\cos(\theta)" />
        </div>
        <p>
          where <Katex tex="\theta" /> is the angle in radians measured anticlockwise from the
          vertical line <Katex tex="OB" />.
          <br />
          The mass reaches its maximum height at point <Katex tex="A" />, when{' '}
          <Katex tex="\theta=\tfrac\pi3" />, and at point <Katex tex="C" />, when{' '}
          <Katex tex="\theta=-\tfrac\pi3" />. It reaches a minimum height at point <Katex tex="B" />,
          when <Katex tex="\theta=0" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two functions are chained together here. <Katex tex="h" /> turns an <em>angle</em> into
              a height; <Katex tex="\theta" /> (from part c.) turns a <em>time</em> into an angle.
              Parts a., b. and f. only need the angle; parts c.–e. only need{' '}
              <Katex tex="\theta(t)" />; part g. joins them into height as a function of time,{' '}
              <Katex tex="h(\theta(t))" />.
            </p>
            <p>
              Keep the calculator in radians throughout: every angle in this question is in radians.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Maximum and Minimum"
        marks={2}
        statement={<>Find the maximum and minimum heights of the mass, in metres, above the ground.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Trig Inequality"
        marks={2}
        statement={
          <>
            Find, correct to two decimal places, the values of <Katex tex="\theta" /> for which the
            mass has a height, <Katex tex="h" />, less than 1.1 m.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Initial Position"
        marks={1}
        statement={
          <>
            The angle, <Katex tex="\theta" /> radians, as a function of time, <Katex tex="t" />{' '}
            seconds, is given by the function
            <Katex display tex="\theta:[0,30]\to R,\ \theta(t)=\frac\pi3\cos\!\left(\frac{9t}{2}\right)" />
            Show that the mass is initially at point <Katex tex="A" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Period"
        marks={1}
        statement={
          <>
            Determine the period of the pendulum. The period is the time in seconds taken for the
            mass to travel from <Katex tex="A" /> to <Katex tex="C" /> and back to{' '}
            <Katex tex="A" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Counting Solutions"
        marks={1}
        statement={<>How many times for <Katex tex="t\in[0,30]" /> is the mass at point <Katex tex="A" />?</>}
      >
        <WorkingTable rows={ROWS_E} />
        <WrongMethod
          title="Divide the time by the period"
          working={<Katex display tex="\frac{30}{4\pi/9} = 21.48\ldots \implies 21 \text{ times}" />}
        >
          That counts complete swings, and each swing ends back at <Katex tex="A" />, so it counts the
          visits <em>after</em> the start. The mass is also at <Katex tex="A" /> at{' '}
          <Katex tex="t=0" /> (part c.), which is inside <Katex tex="[0,30]" />, so the total is 22.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="f"
        topic="Arc Length"
        marks={1}
        statement={
          <>
            Determine the distance, in metres, that the mass travels as it swings from point{' '}
            <Katex tex="A" /> to point <Katex tex="C" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g.i"
        topic="Composite Evaluation"
        marks={2}
        statement={<>Find, correct to two decimal places, the height of the mass, in metres, after one second has elapsed.</>}
      >
        <WorkingTable rows={ROWS_GI} />
      </PartCard>

      <PartCard
        letter="g.ii"
        topic="Composite Function"
        marks={1}
        statement={<>State the rule for the composite function <Katex tex="h(\theta(t))" />.</>}
      >
        <WorkingTable rows={ROWS_GII} />
      </PartCard>

      <PartCard
        letter="g.iii"
        topic="Average Value"
        marks={2}
        statement={<>Find, correct to two decimal places, the <b>average</b> height of the mass, in metres.</>}
      >
        <WorkingTable rows={ROWS_GIII} />
      </PartCard>
    </div>
  )
}
