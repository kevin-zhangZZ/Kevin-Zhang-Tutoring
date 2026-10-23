// 2025 Specialist NHT — Exam 1, Question 7 (6 marks). The NHT report gives sample answers only,
// with no statistics. Rectilinear motion with piecewise constant acceleration (no force analysis):
// a toy car speeds up from rest to 10 m/s, decelerates at 4 m/s² to −2 m/s, then accelerates for
// 2 s to rest at line F. a. the velocity–time graph; b.i the total time 4 + 3 + 2 = 9 s; b.ii
// v = 26 − 4t for 4 ≤ t ≤ 7; b.iii the displacement 30 m as signed area; c. a train at constant
// 10/3 m/s first level with the car at t = 8/3 s. Question text transcribed from the original paper
// (read from rendered page images; the 2025 paper has no text layer). The two track diagrams
// (spec-2025nhte1-q7-track.png, spec-2025nhte1-q7c-tracks.png) and part a.'s blank axes
// (spec-2025nhte1-q7a-blank-axes.png: v from −2 to 10, ticks every 1, numbered every 2; t unscaled
// with t_F marked) are cropped from pages 9 and 11 of the original VCAA exam PDF at 300 dpi. The
// finished v–t graph (spec-2025nhte1-q7a-sketch.png) is this site's own matplotlib answer sketch on
// matching axes, with the times from part b. drawn to scale; spec-2025nhte1-q7c-displacement.png is
// this site's own explanatory displacement–time graph of the car and train, which VCAA never
// printed. Answers checked with sympy and against the report's sample answers, which agree.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'
import trackSrc from './spec-2025nhte1-q7-track.png'
import blankAxesSrc from './spec-2025nhte1-q7a-blank-axes.png'
import sketchSrc from './spec-2025nhte1-q7a-sketch.png'
import tracksSrc from './spec-2025nhte1-q7c-tracks.png'
import displacementSrc from './spec-2025nhte1-q7c-displacement.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\text{Stage 1: } v \text{ rises in a straight line} \\ &\text{from } 0 \text{ to } 10 \end{aligned}" />,
    reason: <>Constant acceleration means a constant gradient on a velocity–time graph, so each stage is a straight segment. The car starts from rest at the origin.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{Stage 2: gradient } -4, \\ &v \text{ falls from } 10 \text{ through } 0 \text{ to } -2 \end{aligned}" />,
    reason: <>The velocity passes through zero (the car stops and reverses) and continues to <Katex tex="-2" />: the car is then moving back towards <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{Stage 3: } v \text{ rises in a straight line} \\ &\text{from } -2 \text{ to } 0 \text{ at } t_F \end{aligned}" />,
    reason: <>The car finishes at line <Katex tex="F" /> with zero velocity, the marked point <Katex tex="t_F" /> on the <Katex tex="t" />-axis.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's answer sketch: a velocity–time graph of three straight segments, from the origin up to v = 10, then down through the t-axis to v = −2, then up to v = 0 at the marked point t_F"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Three straight segments: up to 10, down to <Katex tex="-2" />, back up to 0 at <Katex tex="t_F" />. For a 1-mark sketch the shape and the velocity values matter; the times (4, 7 and 9 s, drawn to scale here) only come out in part b.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Stage 2: } t=\frac{v-u}{a}=\frac{-2-10}{-4}=3\text{ s}" />,
    reason: <>The only stage with a known acceleration. From <Katex tex="v=u+at" />, the time is the change in velocity divided by the acceleration.</>,
  },
  {
    working: <Katex display tex="\text{Stage 3: } a=\frac{0-(-2)}{2}=1>0" />,
    reason: <>Check the sign of the acceleration in the last stage: the velocity goes from <Katex tex="-2" /> up to 0, so the acceleration is <b>positive</b>, even though the car is slowing down. So the acceleration is positive in stages 1 and 3 and negative only in stage 2.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{positive time}=2\times3=6\text{ s} \\ &\text{Stage 1: } 6-2=4\text{ s} \end{aligned}" />,
    reason: <>The acceleration is positive for twice as long as it is negative. Stage 3 accounts for 2 of those 6 seconds, which leaves 4 for stage 1.</>,
  },
  {
    working: <Katex display tex="\boxed{t_F=4+3+2=9\text{ s}}" />,
    reason: <>As required.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="t=4:\ v=10" />,
    reason: <>From part b.i, stage 1 lasts 4 s, so the negative acceleration starts at <Katex tex="t=4" /> with the car at 10 m/s.</>,
  },
  {
    working: <Katex display tex="v=10-4(t-4)" />,
    reason: <>Velocity changes by <Katex tex="-4" /> m/s every second <b>after</b> <Katex tex="t=4" />, i.e. over <Katex tex="t-4" /> seconds. (Equivalently: <Katex tex="v=\int-4\,dt=-4t+c" />, with <Katex tex="10=-16+c" /> giving <Katex tex="c=26" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{v=26-4t}\quad (4\le t\le7)" />,
    reason: <>As required. Check: at <Katex tex="t=7" />, <Katex tex="v=26-28=-2" />, the velocity at the end of stage 2 ✓.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="26-4t=0\implies t=\frac{13}{2}" />,
    reason: <>Displacement is the <b>signed</b> area under the velocity–time graph. The graph crosses the axis when the car stops and turns, so find that time first.</>,
  },
  {
    working: <Katex display tex="\text{Area above}=\frac12\times\frac{13}{2}\times10=\frac{65}{2}" />,
    reason: <>From <Katex tex="t=0" /> to <Katex tex="t=\tfrac{13}{2}" /> the graph is a triangle above the axis with base <Katex tex="\tfrac{13}{2}" /> and height 10: the distance travelled forwards.</>,
  },
  {
    working: <Katex display tex="\text{Area below}=\frac12\times\left(9-\frac{13}{2}\right)\times2=\frac52" />,
    reason: <>From <Katex tex="t=\tfrac{13}{2}" /> to <Katex tex="t=9" /> the graph is a triangle below the axis, base <Katex tex="\tfrac52" />, depth 2: the distance travelled back towards <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x=\frac{65}{2}-\frac52=30\text{ m}}" />,
    reason: <>Displacement counts the backwards distance as negative. As required.</>,
    more: <>Adding the two areas instead (35 m) would give the total <i>distance</i> travelled, not the displacement.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="v_{\text{train}}=\frac{30}{9}=\frac{10}{3}\text{ m/s},\quad x_{\text{train}}=\frac{10}{3}t" />,
    reason: <>The train covers the same 30 m (part b.iii) in the same 9 s (part b.i) at constant velocity.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 0\le t\le4:\ a&=\frac{10}{4}=\frac52 \\ x_{\text{car}}&=\frac12\cdot\frac52t^2=\frac54t^2 \end{aligned}" />,
    reason: <>In stage 1 the car accelerates uniformly from rest to 10 m/s in 4 s. From rest at <Katex tex="O" />, <Katex tex="x=\tfrac12at^2" />.</>,
    more: <>Why stage 1? Both start at <Katex tex="O" />, but the car starts from rest while the train is already moving, so the train is ahead at first. The car catches up while it is still speeding up: at <Katex tex="t=4" /> it is at 20 m, the train only at <Katex tex="\tfrac{40}{3}\approx13.3" /> m. So the first meeting is before <Katex tex="t=4" />.</>,
  },
  {
    working: <Katex display tex="\frac54t^2=\frac{10}{3}t\implies t\left(\frac54t-\frac{10}{3}\right)=0" />,
    reason: <>Equal displacement from <Katex tex="O" />. Factorise rather than divide by <Katex tex="t" />, so no solution is lost.</>,
  },
  {
    working: <Katex display tex="t=0\ \text{(rejected, } t>0\text{)}\quad\text{or}\quad t=\frac{10}{3}\times\frac45=\frac83" />,
    reason: <><Katex tex="t=0" /> is the start, ruled out by <Katex tex="t>0" />. <Katex tex="\tfrac83\approx2.67" /> is in <Katex tex="[0,4]" />, so the stage 1 formula was the right one to use.</>,
  },
  {
    working: <Katex display tex="\boxed{t=\frac83\text{ s}}" />,
    reason: <>Sanity check: both are at <Katex tex="\tfrac{10}{3}\times\tfrac83=\tfrac{80}{9}\approx8.9" /> m, and <Katex tex="\tfrac54\left(\tfrac83\right)^2=\tfrac{80}{9}" /> ✓.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={displacementSrc}
          alt="This site's explanatory figure: displacement–time graphs of the toy car (a curve rising to a peak of 32.5 m at t = 6.5, then easing back to 30 m at t = 9) and the toy train (a straight line from the origin to (9, 30)); they cross first at (8/3, 80/9) and meet again at (9, 30)"
          className="w-full max-w-[460px]"
        />
      </div>
    ),
    reason: <>Displacement against time for both (our own figure). The train&apos;s straight line is ahead until the car&apos;s curve crosses it at <Katex tex="t=\tfrac83" />; they meet again only at <Katex tex="F" />, when <Katex tex="t=9" />.</>,
  },
]

export default function SpecialistQ7_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (6 marks)</p>
        <p>A toy car travels along a straight, horizontal track.</p>
        <p>
          At time <Katex tex="t=0" /> seconds, the toy car starts from rest at line <Katex tex="O" /> and accelerates with
          positive constant acceleration until it reaches a velocity of 10 <Katex tex="\text{m s}^{-1}" />.
        </p>
        <p>
          It then undergoes a constant acceleration of <Katex tex="-4" /> <Katex tex="\text{m s}^{-2}" /> until it attains a
          velocity, <Katex tex="v" />, of <Katex tex="-2" /> <Katex tex="\text{m s}^{-1}" />.
        </p>
        <p>
          Finally, the toy car accelerates with constant acceleration for 2 seconds, until it arrives at a line{' '}
          <Katex tex="F" /> with zero velocity, at time <Katex tex="t_F" /> seconds.
        </p>
        <p>
          Lines <Katex tex="O" /> and <Katex tex="F" /> are perpendicular to the track.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-1">
          <img loading="lazy" decoding="async"
            src={trackSrc}
            alt="Diagram from the original VCAA exam paper: a toy car at the start of a straight horizontal track, with dashed lines O (at the car) and F (further along) perpendicular to the track"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Velocity–Time Graph"
        marks={1}
        statement={
          <>
            <p>Sketch the velocity-time graph of the toy car on the axes below.</p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank velocity–time axes from the original VCAA exam paper: v from −2 to 10, ticks every 1 and numbered every 2; the t-axis has no scale, with the point t_F marked on it"
                className="w-full max-w-[480px]"
              />
            </div>
          </>
        }
      >
        <Background>
          <p>
            On a velocity–time graph the gradient is the acceleration and the signed area under the graph is the
            displacement. Constant acceleration means each stage is a straight line; negative velocity (below the axis)
            means the car is moving backwards, towards <Katex tex="O" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          The acceleration of the toy car is positive for twice the amount of time that the acceleration of the toy car is
          negative.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Constant Acceleration"
        marks={1}
        statement={
          <>
            Show that it takes 9 seconds for the toy car to reach line <Katex tex="F" /> from line <Katex tex="O" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BI} />
        <WrongMethod
          title="Count the last stage as negative acceleration"
          working={<Katex display tex="\text{negative: }3+2=5\text{ s},\ \text{positive: }10\text{ s}" />}
        >
          In the last stage the car is slowing down, but it is moving backwards, so slowing down means its velocity rises
          from <Katex tex="-2" /> to 0: the acceleration is <Katex tex="+1" />. The sign of the acceleration is the sign
          of the gradient of the <Katex tex="v" />–<Katex tex="t" /> graph, not whether the car is speeding up.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Constant Acceleration"
        marks={1}
        statement={
          <>
            Show that the equation for the velocity of the toy car when it has negative acceleration is given by{' '}
            <Katex tex="v=26-4t" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Displacement"
        marks={1}
        statement={
          <>
            Show that the displacement of the toy car, from line <Katex tex="O" />, when it reaches line <Katex tex="F" />, is
            30 m.
          </>
        }
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Constant Acceleration"
        marks={2}
        statement={
          <>
            <p>
              A toy train moves with a constant velocity on an adjacent, parallel track such that the toy car and the toy
              train are at line <Katex tex="O" /> at the same time, and both arrive at line <Katex tex="F" /> at time{' '}
              <Katex tex="t_F" />.
            </p>
            <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={tracksSrc}
                alt="Diagram from the original VCAA exam paper: the toy car on its track and a toy train on an adjacent parallel track, both starting at dashed line O, with dashed line F further along"
                className="w-full max-w-[520px]"
              />
            </div>
            <p>
              Find the value of <Katex tex="t" />, where <Katex tex="t>0" />, when the toy car and the toy train first have
              the same displacement from <Katex tex="O" />.
            </p>
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
