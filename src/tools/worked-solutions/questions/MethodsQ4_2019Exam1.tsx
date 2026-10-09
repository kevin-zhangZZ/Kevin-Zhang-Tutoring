// 2019 Mathematical Methods — Exam 1, Question 4 (4 marks).
// f(x)=cos(x/2) on [-2π,π] — solve 1-cos(x/2)=cos(x/2) (part a), then sketch g(x)=1-f(x) on
// the same real axes (part b). Question text transcribed from the original paper; the
// diagram is cropped directly from the original VCAA exam PDF, not a redrawing. Cross-
// checked against the VCAA examination report and itute's independent solutions — both
// agree with the derivation below (re-checked with sympy's solveset). Solution is original.
// Interactives: part a. — the unit circle and the graph of cos(x/2), showing that x ∈ [-2π,π]
// lets the angle x/2 sweep only [-π,π/2], and what solving on [0,2π] instead loses
// (meth-2019e1-q4a-halved-domain); part b. — g built from f in two moves (reflect in the x-axis,
// translate up 1), then g as f mirrored in y = 1/2, so the crossings are part a.'s answers, with
// the "forgot the translation" sketch as a toggle (meth-2019e1-q4b-reflect-shift).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { functionToPath } from '../graphUtils'
import fAxesSrc from './meth-2019e1-q4b-f-axes.png'

const HalvedDomainWidget = lazyWidget(() => import('../interactives/meth-2019e1-q4a-halved-domain'))
const ReflectShiftWidget = lazyWidget(() => import('../interactives/meth-2019e1-q4b-reflect-shift'))

const EXAM_A: SAExaminerStats = {
  marks: [23, 29, 48],
  average: 1.3,
  comment: (
    <>
      Most students were able to rearrange to form a correct expression. Some students did not
      identify the correct reference angle. Many students did not account for the restricted
      domain.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 27, 37],
  average: 1.0,
  comment: (
    <>
      Students who were successful with this question made a connection between part a. and
      what was expected in part b. Most students were able to generate a horizontally
      reflected version of the given graph; however, some students dilated it or did not
      correctly reflect it in every section. Some students forgot the translation or did not
      label the points specified by the question. Students are advised to practise sketching
      graphs, with attention to curvature.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="1-\cos\!\left(\tfrac{x}{2}\right) = \cos\!\left(\tfrac{x}{2}\right)" />,
    reason: (
      <>
        The same cosine, <Katex tex="\cos\!\left(\tfrac x2\right)" />, appears on both sides, so treat it as a
        single unknown: this is just <Katex tex="1-c=c" />. Get it on its own before thinking about any angles.
      </>
    ),
  },
  {
    working: <Katex display tex="2\cos\!\left(\tfrac{x}{2}\right) = 1 \;\implies\; \cos\!\left(\tfrac{x}{2}\right) = \tfrac12" />,
    reason: (
      <>
        Now it is a standard exact-value equation. Cosine is <Katex tex="\tfrac12" /> at the reference angle{' '}
        <Katex tex="\tfrac{\pi}{3}" />, not <Katex tex="\tfrac{\pi}{6}" /> — the report notes some students did not
        identify the correct reference angle.
      </>
    ),
    more: <>See Background above.</>,
  },
  {
    working: <Katex display tex="x\in[-2\pi,\pi] \;\implies\; \tfrac{x}{2}\in\left[-\pi,\tfrac{\pi}{2}\right]" />,
    reason: (
      <>
        The angle inside the cosine is <Katex tex="\tfrac x2" />, not <Katex tex="x" />, so first find where{' '}
        <em>that</em> angle lives: halve both ends of the domain. This is the step the report says many students
        missed. <Katex tex="\left[-\pi,\tfrac{\pi}{2}\right]" /> is only three-quarters of a turn, so expect only a
        couple of solutions.
      </>
    ),
    more: (
      <>
        Slide <Katex tex="x" /> in the diagram below to see the arc.
      </>
    ),
  },
  {
    working: <Katex display tex="\tfrac{x}{2} = -\tfrac{\pi}{3},\ \tfrac{\pi}{3}" />,
    reason: (
      <>
        Cosine is positive in quadrants 1 and 4, so the angles are <Katex tex="\pm\tfrac{\pi}{3}" /> plus whole
        turns. Inside <Katex tex="\left[-\pi,\tfrac{\pi}{2}\right]" /> the quadrant-4 angle must be written as{' '}
        <Katex tex="-\tfrac{\pi}{3}" /> (its other name, <Katex tex="\tfrac{5\pi}{3}" />, is outside the interval),
        and adding or subtracting <Katex tex="2\pi" /> pushes either angle out. So there are exactly two.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x = -\dfrac{2\pi}{3},\ \dfrac{2\pi}{3}}" />,
    reason: (
      <>
        Double each angle to get <Katex tex="x" />. Both lie in <Katex tex="[-2\pi,\pi]" />, and{' '}
        <Katex tex="\cos\!\left(\pm\tfrac{\pi}{3}\right)=\tfrac12" /> checks.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = 1-\cos\!\left(\tfrac{x}{2}\right) = -f(x)+1" />,
    reason: (
      <>
        Read the rule as moves applied to the graph you are given, in order: the minus sign reflects{' '}
        <Katex tex="f" /> in the <Katex tex="x" />-axis, then the <Katex tex="+1" /> translates it up{' '}
        <Katex tex="1" />. Nothing multiplies <Katex tex="f" /> or <Katex tex="x" />, so there is no dilation: same
        shape, same <Katex tex="x" />-values (the report says some students dilated it).
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="g(-2\pi) = 1-\cos(-\pi) = 2" />
        <Katex display tex="g(\pi) = 1-\cos\!\left(\tfrac{\pi}{2}\right) = 1" />
      </>
    ),
    reason: (
      <>
        Endpoints of <Katex tex="g" />: the same <Katex tex="x" />-values as <Katex tex="f" />, because neither move is
        horizontal. Follow each point of <Katex tex="f" /> through both moves as a check:{' '}
        <Katex tex="(-2\pi,-1)\to(-2\pi,1)\to(-2\pi,2)" />, and <Katex tex="(\pi,0)" /> stays put on the reflection,
        then goes up to <Katex tex="(\pi,1)" />. The maximum <Katex tex="(0,1)" /> of <Katex tex="f" /> becomes the
        minimum <Katex tex="(0,0)" /> of <Katex tex="g" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="f(x)=g(x) \iff \cos\!\left(\tfrac{x}{2}\right) = 1-\cos\!\left(\tfrac{x}{2}\right)" />
        <Katex display tex="\implies x=\pm\tfrac{2\pi}{3},\quad y=\cos\!\left(\pm\tfrac{\pi}{3}\right)=\tfrac12" />
      </>
    ),
    reason: (
      <>
        Setting <Katex tex="f(x)=g(x)" /> gives exactly the equation of part a., so its answers are the{' '}
        <Katex tex="x" />-values of the intersections; this is the connection the report says successful students
        made. It also makes sense geometrically: <Katex tex="f(x)+g(x)=1" />, so <Katex tex="g" /> is{' '}
        <Katex tex="f" /> reflected in the line <Katex tex="y=\tfrac12" />, and the graphs can only meet on that line.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <GOverlay />
      </div>
    ),
    reason: (
      <>
        Plot and label the four points, then join them with the reflected, lifted shape (orange, drawn over the real
        exam figure). Mind the curvature, as the report advises: <Katex tex="g" /> starts <em>flat</em> at{' '}
        <Katex tex="(-2\pi,2)" /> because <Katex tex="f" /> starts flat there, bends over through{' '}
        <Katex tex="(-\pi,1)" />, is U-shaped around its minimum <Katex tex="(0,0)" />, and is still rising at{' '}
        <Katex tex="(\pi,1)" />. It crosses <Katex tex="f" /> at <Katex tex="\left(-\tfrac{2\pi}{3},\ \tfrac12\right)" />{' '}
        and <Katex tex="\left(\tfrac{2\pi}{3},\ \tfrac12\right)" />.
      </>
    ),
  },
]

export default function MethodsQ4_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Trig Equation"
        marks={2}
        statement={<>Solve <Katex tex="1-\cos\!\left(\tfrac{x}{2}\right) = \cos\!\left(\tfrac{x}{2}\right)" /> for <Katex tex="x\in[-2\pi,\pi]" />.</>}
        examinerReport={EXAM_A}
      >
        <Background title="Where π/3 comes from">
          <p>
            Cut an equilateral triangle of side <Katex tex="2" /> in half: a right-angled triangle with hypotenuse{' '}
            <Katex tex="2" />, sides <Katex tex="1" /> and <Katex tex="\sqrt3" />, and angles{' '}
            <Katex tex="\tfrac{\pi}{3}" /> and <Katex tex="\tfrac{\pi}{6}" />. Cosine is adjacent over hypotenuse, so{' '}
            <Katex tex="\cos\tfrac{\pi}{3}=\tfrac12" /> but <Katex tex="\cos\tfrac{\pi}{6}=\tfrac{\sqrt3}{2}" />.
          </p>
          <p>
            On the unit circle, <Katex tex="\cos\theta" /> is the horizontal position of the point at angle{' '}
            <Katex tex="\theta" />. Two points have horizontal position <Katex tex="\tfrac12" />, at{' '}
            <Katex tex="\theta=\tfrac{\pi}{3}" /> and <Katex tex="\theta=-\tfrac{\pi}{3}" />, so{' '}
            <Katex tex="\cos\theta=\tfrac12" /> means <Katex tex="\theta=\pm\tfrac{\pi}{3}+2k\pi" />. Which of these
            count depends on the interval <Katex tex="\theta" /> is allowed to be in.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Halve the angle, halve the domain: where x/2 can sit on the unit circle">
          <HalvedDomainWidget />
        </Explore>
        <WrongMethod
          title="cos = ½ means the angle is π/6"
          source="Examiner's report"
          working={<Katex display tex="\tfrac{x}{2}=\pm\tfrac{\pi}{6} \implies x=\pm\tfrac{\pi}{3}" />}
        >
          The report says some students did not identify the correct reference angle. <Katex tex="\tfrac{\pi}{6}" /> is
          the easy mix-up: it is the reference angle for <Katex tex="\sin\theta=\tfrac12" /> and for{' '}
          <Katex tex="\cos\theta=\tfrac{\sqrt3}{2}" />. Catch it by substituting back:{' '}
          <Katex tex="\cos\tfrac{\pi}{6}\approx0.87" />, not <Katex tex="0.5" />. In the half-equilateral triangle, the
          angle next to the side of length <Katex tex="1" /> is <Katex tex="\tfrac{\pi}{3}" />.
        </WrongMethod>
        <WrongMethod
          title="Solve for x/2 between 0 and 2π, as usual"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\tfrac{x}{2}=\tfrac{\pi}{3},\ \tfrac{5\pi}{3} \implies x=\tfrac{2\pi}{3},\ \tfrac{10\pi}{3}" />
              <Katex display tex="\tfrac{10\pi}{3}>\pi, \text{ so } x=\tfrac{2\pi}{3} \text{ only}" />
            </>
          }
        >
          The report says many students did not account for the restricted domain. Here{' '}
          <Katex tex="\tfrac x2" /> lives in <Katex tex="\left[-\pi,\tfrac{\pi}{2}\right]" />, which runs into negative
          angles, so the quadrant-4 solution must be named <Katex tex="-\tfrac{\pi}{3}" />, not{' '}
          <Katex tex="\tfrac{5\pi}{3}" />: the same point on the circle, but only one of those angles doubles to an{' '}
          <Katex tex="x" /> in the domain. Convert the domain first, every time; the toggle in the diagram above shows
          the lost solution.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            <p className="mb-2">
              The function <Katex tex="f:[-2\pi,\pi]\to R,\ f(x)=\cos\!\left(\tfrac{x}{2}\right)" /> is shown on the axes below.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-2">
              <img
                src={fAxesSrc}
                alt="Axes with f(x)=cos(x/2) already drawn on them for -2π≤x≤π, from the original 2019 VCAA exam paper"
                className="w-full max-w-[420px]"
              />
            </div>
            <p>
              Let <Katex tex="g:[-2\pi,\pi]\to R,\ g(x)=1-f(x)" />. Sketch the graph of{' '}
              <Katex tex="g" /> on the axes above. Label all points of intersection of the
              graphs of <Katex tex="f" /> and <Katex tex="g" />, and the endpoints of{' '}
              <Katex tex="g" />, with their coordinates.
            </p>
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Transformations written with function notation">
          <p>
            Starting from <Katex tex="y=f(x)" />: <Katex tex="y=-f(x)" /> reflects the graph in the{' '}
            <Katex tex="x" />-axis (every <Katex tex="y" /> changes sign); <Katex tex="y=f(x)+c" /> translates it up{' '}
            <Katex tex="c" />; <Katex tex="y=a f(x)" /> dilates it by factor <Katex tex="a" /> from the{' '}
            <Katex tex="x" />-axis; <Katex tex="y=f(-x)" /> reflects it in the <Katex tex="y" />-axis.
          </p>
          <p>
            <Katex tex="1-f(x)" /> is <Katex tex="-f(x)+1" />: reflect first, then translate. The other order gives{' '}
            <Katex tex="-\big(f(x)+1\big)=-f(x)-1" />, a different graph.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Reflect, then lift, and why g meets f on the line y = ½">
          <ReflectShiftWidget />
        </Explore>
        <WrongMethod
          title="g is just f flipped upside down"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="y=-\cos\!\left(\tfrac{x}{2}\right)\text{: endpoints } (-2\pi,1),\ (\pi,0)" />
              <Katex display tex="\text{meets } f \text{ at } (-\pi,0),\ (\pi,0)" />
            </>
          }
        >
          That is only the first move; the report notes some students forgot the translation. The giveaway is the
          intersections: <Katex tex="-\cos\!\left(\tfrac x2\right)=\cos\!\left(\tfrac x2\right)" /> gives{' '}
          <Katex tex="\cos\!\left(\tfrac x2\right)=0" />, so <Katex tex="x=\pm\pi" />, but part a. already told you{' '}
          <Katex tex="f" /> and <Katex tex="g" /> meet at <Katex tex="x=\pm\tfrac{2\pi}{3}" />. If your sketch crosses{' '}
          <Katex tex="f" /> anywhere else, recheck the transformation.
        </WrongMethod>
      </PartCard>
    </div>
  )
}

// Overlays g(x)=1-cos(x/2) (orange, computed exactly via functionToPath) on top of the
// *real* cropped VCAA figure, which already has f(x)=cos(x/2) drawn on it — rather than
// redrawing f itself. Pixel calibration (ox, oy, scaleX, scaleY) was measured directly off
// the real image's own gridlines (10 vertical gridlines at intervals of π/3, spanning
// -2π to π; 5 horizontal gridlines at intervals of 1, spanning -2 to 2), and re-checked
// against a PIL composite: the curve meets f exactly at x = ±2π/3.
function GOverlay() {
  const ox = 1406.5
  const oy = 472.5
  const scaleX = 611.7 / Math.PI // px per radian, measured from the 3-interval span -π to 0
  const scaleY = 136.75 // px per unit y
  const toSvgX = (x: number) => ox + x * scaleX
  const toSvgY = (y: number) => oy - y * scaleY
  const g = (x: number) => 1 - Math.cos(x / 2)
  return (
    <div className="relative w-full max-w-[420px]">
      <img
        src={fAxesSrc}
        alt="Axes with f(x)=cos(x/2) already drawn on them, from the original 2019 VCAA exam paper"
        className="w-full block"
      />
      <svg viewBox="0 0 2250 800" className="absolute inset-0 w-full h-full">
        <path d={functionToPath(g, -2 * Math.PI, Math.PI, toSvgX, toSvgY)} fill="none" stroke="#f97316" strokeWidth={5} />
        <circle cx={toSvgX(-2 * Math.PI)} cy={toSvgY(2)} r={9} className="fill-orange-500" />
        <circle cx={toSvgX(Math.PI)} cy={toSvgY(1)} r={9} className="fill-orange-500" />
        <circle cx={toSvgX((-2 * Math.PI) / 3)} cy={toSvgY(0.5)} r={9} fill="#16a34a" />
        <circle cx={toSvgX((2 * Math.PI) / 3)} cy={toSvgY(0.5)} r={9} fill="#16a34a" />
        <text x={toSvgX(-2 * Math.PI) + 20} y={toSvgY(2) - 22} fontSize={60} fill="#c2410c" stroke="white" strokeWidth={10} paintOrder="stroke">(−2π, 2)</text>
        <text x={toSvgX(Math.PI)} y={toSvgY(1) - 40} fontSize={60} textAnchor="end" fill="#c2410c" stroke="white" strokeWidth={10} paintOrder="stroke">(π, 1)</text>
        <text x={toSvgX((-2 * Math.PI) / 3) - 40} y={toSvgY(0.5) + 130} fontSize={60} textAnchor="start" fill="#15803d" stroke="white" strokeWidth={10} paintOrder="stroke">(−2π/3, 1/2)</text>
        <text x={toSvgX((2 * Math.PI) / 3) + 40} y={toSvgY(0.5) + 130} fontSize={60} textAnchor="end" fill="#15803d" stroke="white" strokeWidth={10} paintOrder="stroke">(2π/3, 1/2)</text>
      </svg>
    </div>
  )
}
