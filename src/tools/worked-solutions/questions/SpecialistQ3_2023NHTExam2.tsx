// 2023 Specialist NHT — Exam 2, Section B Question 3 (10 marks). The NHT report gives sample
// answers only, with no statistics; its notes on a. and d. are quoted. An express lift with
// v = 2t²(1 − t/6) for the first 4 s, then a constant 32/3 m/s, with a v–t graph symmetrical about
// t = T/2: the maximum acceleration (4 m/s² at t = 2), T from the 96 m journey (T = 13), the
// velocity rule for the last 4 s (v = 2(t − 13)²(1 + (t − 13)/6), 9 ≤ t ≤ 13), and the minimum and
// maximum reaction forces on a 60 kg student (348 N and 828 N). Question text transcribed from the
// original paper; the velocity–time graph is cropped from page 16 of the original VCAA exam PDF at
// 300 dpi (spec-2023nhte2-q3-graph.png; its "(T, O)" label is as printed). The acceleration–time
// graph in part d. is this site's own explanatory figure, of a function VCAA never printed
// (spec-2023nhte2-q3d-acceleration.png). Answers checked with sympy and against the report's sample
// answers, which agree. The report states no domain for c.; the working adds 9 ≤ t ≤ 13.
// Part d. needs Newton's second law for a reaction force (Mechanics, which the current study design
// no longer has); it is written up as set, with a Background note on the one physics fact used.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import graphSrc from './spec-2023nhte2-q3-graph.png'
import accelSrc from './spec-2023nhte2-q3d-acceleration.png'

const REPORT_A: SAExaminerStats = {
  comment: <>Convincing working out leading to the given result was required.</>,
}

const REPORT_D: SAExaminerStats = {
  comment: <>Accept <Katex tex="N=-240+60g" /> and <Katex tex="N=240+60g" /></>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="v = 2t^2\left(1-\frac{t}{6}\right) = 2t^2-\frac{t^3}{3}" />,
    reason: <>Expand first so each term can be differentiated on its own.</>,
  },
  {
    working: <Katex display tex="a = \frac{dv}{dt} = 4t-t^2" />,
    reason: <>Acceleration is the rate of change of velocity.</>,
  },
  {
    working: <Katex display tex="\frac{da}{dt} = 4-2t = 0 \implies t=2" />,
    reason: <>To find where <Katex tex="a" /> is largest, find where <em>its</em> derivative is zero: the stationary point of the acceleration, not of the velocity.</>,
    more: <><Katex tex="a=4t-t^2" /> is a parabola opening downwards, so its one stationary point is its maximum. The endpoints confirm it: <Katex tex="a(0)=0" /> and <Katex tex="a(4)=0" />, both less than <Katex tex="a(2)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a(2) = 4(2)-2^2 = 4 \ \text{m s}^{-2}}" />,
    reason: <>The maximum acceleration occurs at <Katex tex="t=2" /> and has magnitude <Katex tex="4" /> m/s². As required.</>,
    more: <>On the graph, <Katex tex="t=2" /> is where the curve on the left is steepest: the point of inflection of the velocity curve.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^4 \left(2t^2-\frac{t^3}{3}\right)dt = \left[\frac{2t^3}{3}-\frac{t^4}{12}\right]_0^4" />,
    reason: <>Distance travelled is the area under the velocity–time graph. The lift never moves backwards (<Katex tex="v\ge0" />), so the integral of <Katex tex="v" /> is the distance.</>,
  },
  {
    working: <Katex display tex="= \frac{128}{3}-\frac{256}{12} = \frac{128}{3}-\frac{64}{3} = \frac{64}{3}" />,
    reason: <>Substitute the terminals; the lower terminal gives 0. So the lift covers <Katex tex="\tfrac{64}{3}\approx21.3" /> m while speeding up.</>,
  },
  {
    working: <Katex display tex="2\times\frac{64}{3} + (T-8)\times\frac{32}{3} = 96" />,
    reason: <>The graph is symmetrical about <Katex tex="t=\tfrac T2" />, so slowing down over the last 4 s covers the same <Katex tex="\tfrac{64}{3}" /> m. In between, the lift travels at <Katex tex="\tfrac{32}{3}" /> m/s for <Katex tex="T-8" /> seconds: a rectangle.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} (T-8)\times\frac{32}{3} = 96-\frac{128}{3} = \frac{160}{3} \\ \implies T-8 = 5 \end{gathered}" />,
  },
  {
    working: <Katex display tex="\boxed{T=13}" />,
    reason: <>A check: 4 s speeding up, 5 s at constant velocity, 4 s slowing down. The middle section is <Katex tex="5\times\tfrac{32}{3}=\tfrac{160}{3}" /> m, and <Katex tex="\tfrac{64}{3}+\tfrac{160}{3}+\tfrac{64}{3}=\tfrac{288}{3}=96" /> m.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="v(t) = v_1(13-t), \quad v_1(t)=2t^2\left(1-\frac t6\right)" />,
    reason: <>Symmetry about <Katex tex="t=\tfrac{13}{2}" /> means the velocity <Katex tex="s" /> seconds before the end equals the velocity <Katex tex="s" /> seconds after the start. At time <Katex tex="t" /> the lift is <Katex tex="13-t" /> seconds from the end, so use the first rule at <Katex tex="13-t" />.</>,
    more: <>As transformations: reflect the first section in the vertical axis (<Katex tex="t\to-t" />), then translate it 13 units to the right (<Katex tex="t\to t-13" />). That is how VCAA sets it out, and it gives the same rule.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} v &= 2(13-t)^2\left(1-\frac{13-t}{6}\right) \\ &= 2(t-13)^2\left(1+\frac{t-13}{6}\right) \end{aligned}" />,
    reason: <><Katex tex="(13-t)^2=(t-13)^2" />, and <Katex tex="-\tfrac{13-t}{6}=+\tfrac{t-13}{6}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{v = 2(t-13)^2\left(1+\frac{t-13}{6}\right), \quad 9\le t\le13}" />,
    reason: <>The last 4 seconds run from <Katex tex="t=9" /> to <Katex tex="t=13" />. Checks: <Katex tex="v(9)=2(16)\left(\tfrac13\right)=\tfrac{32}{3}" />, joining the constant section, and <Katex tex="v(13)=0" />, the lift stopped.</>,
    more: <>This simplifies to <Katex tex="v=\tfrac13(t-13)^2(t-7)" />, since <Katex tex="1+\tfrac{t-13}{6}=\tfrac{t-7}{6}" />. VCAA&apos;s sample answer gives the rule without a domain, but stating it shows which part of the motion the rule describes.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="N-60g = 60a \implies N = 60(g+a)" />,
    reason: <>Take up as positive. Two forces act on the student: the reaction <Katex tex="N" /> up and the weight <Katex tex="60g" /> down. The net force equals mass times acceleration, and the student has the lift&apos;s acceleration.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={accelSrc}
          alt="This site's acceleration–time graph for the whole journey: a hump rising from 0 to a maximum at (2, 4) and back to 0 at t = 4, zero from t = 4 to t = 9, then a dip down to a minimum at (11, −4) and back to 0 at t = 13"
          className="w-full max-w-[460px]"
        />
      </div>
    ),
    reason: <>Speeding up, <Katex tex="0\le a\le4" /> (part a.); at constant velocity, <Katex tex="a=0" />; slowing down, the mirror image gives <Katex tex="-4\le a\le0" />. So <Katex tex="a" /> ranges from <Katex tex="-4" /> to <Katex tex="4" /> m/s².</>,
    more: <>From part c., the slowing-down acceleration is <Katex tex="-\left(4s-s^2\right)" /> with <Katex tex="s=13-t" />: reflecting the velocity graph flips the sign of its gradient. Its most negative value is <Katex tex="-4" />, at <Katex tex="t=11" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} a=-4&: \ N = 60(9.8-4) = 348 \\ a=4&: \ N = 60(9.8+4) = 828 \end{aligned}" />,
    reason: <><Katex tex="N" /> grows with <Katex tex="a" />, so the extremes of <Katex tex="a" /> give the extremes of <Katex tex="N" />, with <Katex tex="g=9.8" /> as the instructions say.</>,
  },
  {
    working: <Katex display tex="\boxed{N_{\min} = 348 \ \text{N}, \quad N_{\max} = 828 \ \text{N}}" />,
    reason: <>In newtons, as asked. Sanity check: standing still, the floor pushes with <Katex tex="60\times9.8=588" /> N. Speeding up on the way up the floor must push harder; slowing down near the top, less. 348 and 828 sit either side of 588.</>,
    more: <>VCAA also accepts the answers in terms of <Katex tex="g" />: <Katex tex="60g-240" /> and <Katex tex="60g+240" />.</>,
  },
]

export default function SpecialistQ3_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          The velocity–time graph below shows the velocity of an express lift as it travels from the
          ground floor to the top floor of a city building. The displacement of the lift from the
          ground floor is measured in metres, and its velocity, <Katex tex="v" />, after travelling for{' '}
          <Katex tex="t" /> seconds is measured in <Katex tex="\text{ms}^{-1}" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="VCAA's velocity–time graph: v rises smoothly from the origin to the point (4, 32/3), stays level, then falls smoothly back to 0 at (T, 0), the falling section the mirror image of the rising one"
            className="w-full max-w-[460px]"
          />
        </div>
        <p>
          For the first 4 seconds of motion, the velocity of the lift is given by{' '}
          <Katex tex="v=2t^2\left(1-\dfrac{t}{6}\right)" />.
          <br />
          After the first 4 seconds, the lift travels at a constant velocity of{' '}
          <Katex tex="\dfrac{32}{3}\ \text{ms}^{-1}" /> until it slows down to stop at the top floor,
          having travelled for <Katex tex="T" /> seconds. The velocity–time graph is symmetrical about{' '}
          <Katex tex="t=\dfrac{T}{2}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              On a velocity–time graph, the <em>gradient</em> is the acceleration and the{' '}
              <em>area underneath</em> is the distance travelled. Part a. is about the gradient of the
              first section, part b. about the total area, and part c. uses the symmetry to get the last
              section from the first.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Maximum Acceleration"
        marks={2}
        examinerReport={REPORT_A}
        statement={
          <>
            Show that the maximum acceleration of the lift during the first 4 seconds occurs when{' '}
            <Katex tex="t=2" /> and that the magnitude of this acceleration is{' '}
            <Katex tex="4\ \text{ms}^{-2}" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Distance Travelled"
        marks={3}
        statement={<>Given that the lift travels 96 m from the ground floor to the top floor, find <Katex tex="T" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Velocity Rule"
        marks={2}
        statement={
          <>
            Find a relation that gives the velocity of the lift, <Katex tex="v" />, in terms of{' '}
            <Katex tex="t" /> for the last 4 seconds of motion.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Reaction Force"
        marks={3}
        examinerReport={REPORT_D}
        statement={
          <>
            A 60 kg student stands in the lift.
            <br />
            Find, in newtons, the minimum and maximum reaction forces that the floor of the lift exerts
            on the student during the journey from the ground floor to the top floor.
          </>
        }
      >
        <Background title="Force Wording: Newton's Second Law">
          <p>
            Forces belong to Mechanics, which the current Specialist study design no longer includes,
            so this part goes slightly beyond today&apos;s course. The one physics fact it needs: the
            net force on an object equals its mass times its acceleration, <Katex tex="F_{\text{net}}=ma" />.
            Standing on the floor, the student feels the floor push up (the reaction{' '}
            <Katex tex="N" />) and gravity pull down (the weight <Katex tex="mg" />). Everything after
            that is finding the largest and smallest acceleration, which is calculus.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
