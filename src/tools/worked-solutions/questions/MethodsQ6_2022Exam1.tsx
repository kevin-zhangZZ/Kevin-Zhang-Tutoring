// 2022 Mathematical Methods — Exam 1 Question 6 (8 marks). Reflecting a sine in the
// horizontal axis, finding its zeros, then recovering the translation and domain that map
// one onto the other. Question text transcribed from the original paper; the printed axes
// are a crop of VCAA's own artwork, and the part a. answer is an SVG overlay on that crop
// (never a redrawing of it). Calibration measured from the crop's own gridlines (300 dpi):
// origin at (119.5, 497), 118.7 px per unit on both axes; checked with a PIL composite — the
// calibrated f(x) = 2sin(2x) − 1 lies exactly on VCAA's printed curve. Answers checked with
// sympy and against the VCAA examination report. Solution is original.
// Interactive: c.iii — meth-2022e1-q6ciii-domain (slide D, translate, see where the image lands).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2022e1-q6-graph.png'

const DomainWidget = lazyWidget(() => import('../interactives/meth-2022e1-q6ciii-domain'))

const OX = 119.5
const OY = 497
const S = 118.7
const toX = (x: number) => OX + x * S
const toY = (y: number) => OY - y * S
const g = (x: number) => 1 - 2 * Math.sin(2 * x)
const ORANGE = '#f97316'

// Part a.: y = g(x) drawn on VCAA's own axes, which already carry y = f(x).
function ReflectionOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[380px]">
        <img src={graphSrc} alt="VCAA's axes with y = f(x), and the answer y = g(x) = 1 − 2sin(2x) drawn over them on [0, 2π]: starting at (0, 1), dipping to −1 at x = π/4 and 5π/4, peaking at 3 at x = 3π/4 and 7π/4, ending at (2π, 1), crossing f at the four x-intercepts" className="w-full block" />
        <svg viewBox="0 0 1024 952" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={functionToPath(g, 0, 2 * Math.PI, toX, toY)} fill="none" stroke={ORANGE} strokeWidth={6} />
          <text x={toX(3.25)} y={toY(2.4)} fontSize={44} fill="#c2410c" stroke="white" strokeWidth={10} paintOrder="stroke">y = g(x)</text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [16, 27, 57],
  average: 1.4,
  comment: (
    <>
      There were some well-presented graphs produced, displaying correct and precisely
      sketched shape, symmetry and positioning. Some, however, finished at the incorrect
      endpoint and some had the incorrect curvature. Many came close to, but not exactly at,
      the correct <Katex tex="x" />-intercepts. Many students sketched the reflection of{' '}
      <Katex tex="f(x)" /> in its centre line <Katex tex="y=-1" />, rather than the reflection
      in the horizontal axis as required. Gridlines were provided so that students could
      produce graphs that adhere to the correct positioning. Students are encouraged to use
      the grid to assist with sketching and to practise this skill in their preparation for
      examinations.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 11, 31, 46],
  average: 2.1,
  comment: (
    <>
      This question required solutions for <Katex tex="k" /> (not <Katex tex="x" />) in the
      domain <Katex tex="[0,2\pi]" />, and most students recognised that they needed to find
      four solutions. The correct reference angle of <Katex tex="\tfrac\pi6" /> was common,
      although some students gave <Katex tex="\tfrac\pi3" /> or <Katex tex="\tfrac\pi4" />. It
      is expected that students will have a way of remembering the exact values of{' '}
      <Katex tex="\sin\theta,\ \cos\theta" /> and <Katex tex="\tan\theta" /> for values of{' '}
      <Katex tex="\theta=\left\{0,\tfrac\pi6,\tfrac\pi4,\tfrac\pi3,\tfrac\pi2\right\}" />{' '}
      between 0 and <Katex tex="\tfrac\pi2" /> inclusive, as specified in the key knowledge
      of the study design. Errors included not finding the third and fourth angle correctly.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      This question was well done when attempted. Some students seemed to confuse the
      vertical and horizontal translations. Common errors were <Katex tex="b=-2" /> or <Katex tex="b=\tfrac\pi2" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
  comment: (
    <>
      This question was done well when attempted. Some students seemed to confuse the
      vertical and horizontal translations. A common error was{' '}
      <Katex tex="a=\tfrac\pi4" />.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [88, 12],
  average: 0.1,
  comment: (
    <>
      This question was not answered well, with students commonly translating in the wrong
      direction. The incorrect answer of{' '}
      <Katex tex="\left[\tfrac\pi2,\tfrac{5\pi}{2}\right]" /> was common.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = -f(x) = -\bigl(2\sin(2x)-1\bigr) = 1-2\sin(2x)" />,
    reason: <>Reflecting in the <em>horizontal axis</em> sends each point <Katex tex="(x,y)" /> to <Katex tex="(x,-y)" />, so the whole output is negated, including the <Katex tex="-1" />. Reflecting in the centre line <Katex tex="y=-1" /> instead would leave the graph oscillating about <Katex tex="y=-1" />; the report notes many students did this.</>,
  },
  {
    working: <Katex display tex="\text{range } [-3,1] \to [-1,3]; \quad \text{maxima become minima}" />,
    reason: <>Every <Katex tex="y" />-value changes sign: <Katex tex="f" /> peaks at 1 and troughs at <Katex tex="-3" />, so <Katex tex="g" /> troughs at <Katex tex="-1" /> and peaks at 3. The centre line moves from <Katex tex="y=-1" /> to <Katex tex="y=1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{min: } \left(\tfrac\pi4,-1\right),\ \left(\tfrac{5\pi}4,-1\right)\\&\text{max: } \left(\tfrac{3\pi}4,3\right),\ \left(\tfrac{7\pi}4,3\right)\end{aligned}" />,
    reason: <>Read <Katex tex="f" />&apos;s turning points off the grid: maxima of 1 at <Katex tex="x=\tfrac\pi4,\tfrac{5\pi}4" /> and minima of <Katex tex="-3" /> at <Katex tex="x=\tfrac{3\pi}4,\tfrac{7\pi}4" />. The reflection keeps each <Katex tex="x" />-coordinate and flips the <Katex tex="y" />-value. Plotting these first fixes the curvature: <Katex tex="g" /> goes <em>down</em> from <Katex tex="(0,1)" />.</>,
  },
  {
    working: <Katex display tex="x\text{-intercepts are unchanged}" />,
    reason: <>A reflection in the <Katex tex="x" />-axis fixes every point on that axis, so <Katex tex="g" /> crosses at the same four places as <Katex tex="f" />: <Katex tex="x=\tfrac{\pi}{12},\tfrac{5\pi}{12},\tfrac{13\pi}{12},\tfrac{17\pi}{12}" /> (found in part b.). Use the grid to place them exactly.</>,
  },
  {
    working: <ReflectionOverlay />,
    reason: <>Drawn on the printed axes, as the question asks. <Katex tex="g" /> starts at <Katex tex="(0,1)" /> and ends at <Katex tex="(2\pi,1)" />, because it has the same domain <Katex tex="[0,2\pi]" /> as <Katex tex="f" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="2\sin(2k)-1 = 0 \implies \sin(2k) = \tfrac12" />,
    reason: <>Set <Katex tex="f(k)=0" /> and make the sine the subject. The question names the variable <Katex tex="k" />, so the answers are values of <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="k\in[0,2\pi] \implies 2k\in[0,4\pi]" />,
    reason: <>The angle inside the sine is <Katex tex="2k" />, so double both ends of the interval. Two full revolutions are why there are four solutions instead of two.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{reference angle } \tfrac\pi6\\ &2k = \tfrac\pi6,\ \tfrac{5\pi}{6} \ \text{(first revolution)}\end{aligned}" />,
    reason: <><Katex tex="\sin\tfrac\pi6=\tfrac12" /> is an exact value to know (<Katex tex="\sin\tfrac\pi4=\tfrac{\sqrt2}2" /> and <Katex tex="\sin\tfrac\pi3=\tfrac{\sqrt3}2" />, so not those). Sine is positive in the first and second quadrants: <Katex tex="\tfrac\pi6" /> and <Katex tex="\pi-\tfrac\pi6=\tfrac{5\pi}6" />.</>,
  },
  {
    working: <Katex display tex="2k = \tfrac\pi6,\ \tfrac{5\pi}{6},\ \tfrac{13\pi}{6},\ \tfrac{17\pi}{6}" />,
    reason: <>Add <Katex tex="2\pi=\tfrac{12\pi}{6}" /> to each of the first two for the second revolution; both are still inside <Katex tex="[0,4\pi]" />. Adding <Katex tex="2\pi" /> again gives at least <Katex tex="\tfrac{25\pi}6" />, which is past <Katex tex="4\pi" />, so there are no more.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \tfrac{\pi}{12},\ \tfrac{5\pi}{12},\ \tfrac{13\pi}{12},\ \tfrac{17\pi}{12}}" />,
    reason: <>Halve each value; all four lie in <Katex tex="[0,2\pi]" />. The report notes errors included not finding the third and fourth correctly.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}y &= h(x-a)+b\\ &= 2\sin\bigl(2(x-a)\bigr)-1+b\end{aligned}" />,
    reason: <>Replacing <Katex tex="x" /> with <Katex tex="x-a" /> moves a graph right by <Katex tex="a" />; adding <Katex tex="b" /> moves it up by <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\text{centre line } y=-1+b \ \text{ must be } \ y=1" />,
    reason: <>The term <Katex tex="2\sin\bigl(2(x-a)\bigr)" /> oscillates between <Katex tex="-2" /> and 2 whatever <Katex tex="a" /> is, so a horizontal shift never moves the centre line. Only <Katex tex="b" /> can lift it from <Katex tex="y=-1" /> (for <Katex tex="h" />) to <Katex tex="y=1" /> (for <Katex tex="g(x)=1-2\sin(2x)" />).</>,
  },
  {
    working: <Katex display tex="\boxed{b = 2}" />,
    reason: <>Positive, as required: the graph moves up 2. <Katex tex="b=-2" /> would push the centre line down to <Katex tex="y=-3" />, and <Katex tex="\tfrac\pi2" /> is the horizontal shift <Katex tex="a" /> (part c.ii.), not the vertical one.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}2\sin\bigl(2(x-a)\bigr)+1 &= 1-2\sin(2x)\\ \sin\bigl(2(x-a)\bigr) &= -\sin(2x)\end{aligned}" />,
    reason: <>Put <Katex tex="b=2" /> into the translated rule and set it equal to <Katex tex="g(x)" />. The 1s cancel, so the horizontal shift alone must turn <Katex tex="\sin(2x)" /> into <Katex tex="-\sin(2x)" />.</>,
  },
  {
    working: <Katex display tex="-\sin(2x) = \sin(2x-\pi) = \sin\bigl(2\bigl(x-\tfrac\pi2\bigr)\bigr)" />,
    reason: <>The symmetry property <Katex tex="\sin(\theta-\pi)=-\sin\theta" /> (the angles <Katex tex="\theta" /> and <Katex tex="\theta-\pi" /> are on opposite sides of the unit circle). Taking the 2 out as a factor shows the shift: <Katex tex="x-\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="a = \tfrac\pi2+n\pi,\ n\in Z" />,
    reason: <>The period of <Katex tex="\sin(2x)" /> is <Katex tex="\tfrac{2\pi}2=\pi" />, so shifting by any further whole number of periods also works. A shift of half a period is what flips a sine wave upside down.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac\pi2}" />,
    reason: <>The smallest positive value (<Katex tex="n=0" />). Check with a turning point: <Katex tex="h" />&apos;s maximum <Katex tex="\left(\tfrac\pi4,1\right)" /> moves to <Katex tex="\left(\tfrac{3\pi}4,3\right)" />, a maximum of <Katex tex="g" />. The report&apos;s common error <Katex tex="a=\tfrac\pi4" /> is only a quarter period: <Katex tex="\sin\bigl(2\bigl(x-\tfrac\pi4\bigr)\bigr)=-\cos(2x)" />, not <Katex tex="-\sin(2x)" />.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the translation maps } D \text{ onto dom}(g) = [0,2\pi]" />,
    reason: <><Katex tex="g" /> is <Katex tex="f" /> reflected, so it has <Katex tex="f" />&apos;s domain <Katex tex="[0,2\pi]" />. &ldquo;Mapped onto the graph of <Katex tex="y=g(x)" />&rdquo; means the image is all of <Katex tex="g" /> and nothing more, so the translated domain must be exactly <Katex tex="[0,2\pi]" />.</>,
  },
  {
    working: <Katex display tex="x \to x+a = x+\tfrac\pi2" />,
    reason: <>The translation adds <Katex tex="a=\tfrac\pi2" /> to every <Katex tex="x" />-coordinate (the vertical shift does not change <Katex tex="x" />), so the domain moves right with the graph.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}D+\tfrac\pi2 &= [0,2\pi]\\ \implies D &= \left[0-\tfrac\pi2,\ 2\pi-\tfrac\pi2\right]\end{aligned}" />,
    reason: <><Katex tex="D" /> is where <Katex tex="h" /> sits <em>before</em> the shift, so undo the shift: subtract <Katex tex="\tfrac\pi2" />. Adding instead (translating in the wrong direction) gives <Katex tex="\left[\tfrac\pi2,\tfrac{5\pi}{2}\right]" />, the report&apos;s common wrong answer.</>,
  },
  {
    working: <Katex display tex="\boxed{D = \left[-\tfrac\pi2,\ \tfrac{3\pi}{2}\right]}" />,
    reason: <>Check: <Katex tex="-\tfrac\pi2+\tfrac\pi2=0" /> and <Katex tex="\tfrac{3\pi}2+\tfrac\pi2=2\pi" />.</>,
  },
]

export default function MethodsQ6_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (8 marks)</p>
        <p>
          The graph of <Katex tex="y=f(x)" />, where{' '}
          <Katex tex="f:[0,2\pi]\to R,\ f(x)=2\sin(2x)-1" />, is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="Two full cycles of y = 2sin(2x) − 1 on 0 ≤ x ≤ 2π, oscillating between 1 and −3 — from the original 2022 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Reflection"
        marks={2}
        statement={
          <>
            On the axes above, draw the graph of <Katex tex="y=g(x)" />, where{' '}
            <Katex tex="g(x)" /> is the reflection of <Katex tex="f(x)" /> in the horizontal
            axis.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Trig Equation"
        marks={3}
        statement={
          <>
            Find all values of <Katex tex="k" /> such that <Katex tex="f(k)=0" /> and{' '}
            <Katex tex="k\in[0,2\pi]" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="h:D\to R" />, <Katex tex="h(x)=2\sin(2x)-1" />, where{' '}
          <Katex tex="h(x)" /> has the same rule as <Katex tex="f(x)" /> with a different
          domain.
          <br />
          The graph of <Katex tex="y=h(x)" /> is translated <Katex tex="a" /> units
          in the positive horizontal direction and <Katex tex="b" /> units in the positive
          vertical direction so that it is mapped onto the graph of <Katex tex="y=g(x)" />,
          where <Katex tex="a,b\in(0,\infty)" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Transformations"
        marks={1}
        statement={<>Find the value for <Katex tex="b" />.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Transformations"
        marks={1}
        statement={<>Find the smallest positive value for <Katex tex="a" />.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Domain"
        marks={1}
        statement={
          <>
            Hence, or otherwise, state the domain, <Katex tex="D" />, of{' '}
            <Katex tex="h(x)" />.
          </>
        }
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
        <Explore title="D is g's domain moved back π/2, not forward">
          <DomainWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
