// 2026 Mathematical Methods NHT — Exam 1, Question 8 (6 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// f(x) = log_e(1 + x²) and g(x) = 2 − f(x): the intersections (±√(e − 1), 1), a sketch of g on
// the printed axes, and the image of (√2, log_e(3)) under a dilation from the x-axis then a
// translation. Question text transcribed from the original paper; the graph of f is cropped from
// the original VCAA exam PDF, and the part b. answer is an SVG overlay on that crop (calibrated
// from its gridlines: origin at (486.5, 540.5), 141.83 px per unit on both axes). Answers checked
// with sympy and against the VCAA report's sample answers ((±√(e − 1), 1); y-intercept (0, 2),
// x-intercepts ≈ ±2.5; (√2 + 3, ½log_e(3)) or (√2 + 3, log_e(√3))). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2026nhte1-q8-graph.png'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      This question required rearrangement of the terms and use of logarithm laws to arrive at a quadratic equation in
      terms of <Katex tex="x" />. The quadratic equation could be readily solved and symmetry could be used to find the{' '}
      <Katex tex="y" />-value of <Katex tex="y=1" /> for both points.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      This question required students to sketch the graph of the transformed function <Katex tex="g(x)=2-f(x)" />,
      whereby the graph of <Katex tex="y=f(x)" /> is reflected in the <Katex tex="x" />-axis and then translated up 2
      units. The resulting graph needed to look like a reflection of the original graph in the line <Katex tex="y=1" />,
      with <Katex tex="x" />-intercepts at approximately <Katex tex="x=\pm2.5" />, a <Katex tex="y" />-intercept labelled at{' '}
      <Katex tex="(0,2)" /> and intersection points with the graph of <Katex tex="y=f(x)" /> at <Katex tex="y=1" />.
    </>
  ),
}

const REPORT_C: SAExaminerStats = {
  comment: (
    <>
      This question involved transforming the point <Katex tex="\left(\sqrt2,\log_e(3)\right)" /> according to a sequence
      of transformations. Students chose to either transform the point directly or construct a set of mapping rules for{' '}
      <Katex tex="x'" /> and <Katex tex="y'" /> to find the transformed point.
    </>
  ),
}

// Calibration of the 1022 × 1029 crop, measured from its gridlines.
const PX = (x: number) => 486.5 + 141.83 * x
const PY = (y: number) => 540.5 - 141.83 * y
const G_PATH = (() => {
  const pts: string[] = []
  for (let i = 0; i <= 240; i++) {
    const x = -3.32 + (6.68 * i) / 240
    pts.push(`${PX(x).toFixed(1)},${PY(2 - Math.log(1 + x * x)).toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
})()
const R = Math.sqrt(Math.E - 1)
const LABEL = { fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' as const, fontSize: 40, fontFamily: 'Times New Roman, serif' }

function SketchOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[400px]">
        <img loading="lazy" decoding="async" src={graphSrc} alt="VCAA's graph of y = f(x) with this site's answer drawn over it in orange: the graph of y = g(x), a bell-shaped curve with its maximum at the labelled y-intercept (0, 2), crossing y = f(x) at the two points where y = 1 and the x-axis near x = ±2.5" className="w-full block" />
        <svg viewBox="0 0 1022 1029" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={G_PATH} fill="none" stroke="#f97316" strokeWidth={7.5} strokeLinejoin="round" />
          <circle cx={PX(0)} cy={PY(2)} r={11} fill="#f97316" />
          <circle cx={PX(R)} cy={PY(1)} r={9} fill="#f97316" />
          <circle cx={PX(-R)} cy={PY(1)} r={9} fill="#f97316" />
          <text x={PX(0) + 22} y={PY(2) - 22} style={LABEL}>(0, 2)</text>
          <text x={PX(-2.95)} y={PY(-0.78)} style={{ ...LABEL, fontStyle: 'italic' }}>y = g(x)</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(1+x^2)=2-\log_e(1+x^2)" />,
    reason: <>The graphs meet where <Katex tex="f(x)=g(x)" />, and <Katex tex="g(x)=2-f(x)" />.</>,
  },
  {
    working: <Katex display tex="2\log_e(1+x^2)=2 \implies \log_e(1+x^2)=1" />,
    reason: <>Collect the log terms on one side; they are the same log, so they simply add.</>,
    more: <>
      In other words <Katex tex="f(x)=2-f(x)" /> means <Katex tex="f(x)=1" />: the curves meet exactly where{' '}
      <Katex tex="f" /> is halfway to 2, which is why both points will have <Katex tex="y=1" />.
    </>,
  },
  {
    working: <Katex display tex="\begin{gathered}1+x^2=e^1 \implies x^2=e-1\\ \implies x=\pm\sqrt{e-1}\end{gathered}" />,
    reason: <>
      Undo the log with the definition <Katex tex="\log_e(A)=1\iff A=e" />. Both square roots are valid:{' '}
      <Katex tex="e-1>0" />, and <Katex tex="f" /> is defined for all real <Katex tex="x" />.
    </>,
  },
  {
    working: <Katex display tex="\begin{aligned}y=f\left(\pm\sqrt{e-1}\right)&=\log_e(1+e-1)\\ &=\log_e(e)=1\end{aligned}" />,
    reason: <>
      Substitute back for the <Katex tex="y" />-coordinate. Both points give the same <Katex tex="y" /> because{' '}
      <Katex tex="f" /> is even (symmetric about the <Katex tex="y" />-axis).
    </>,
  },
  {
    working: <Katex display tex="\boxed{\left(\sqrt{e-1},\,1\right)\ \text{and}\ \left(-\sqrt{e-1},\,1\right)}" />,
    reason: <>
      Coordinates, as asked, not just the <Katex tex="x" />-values. Check against the graph:{' '}
      <Katex tex="\sqrt{e-1}\approx\sqrt{1.72}\approx1.31" />, and the printed curve reaches height 1 a little past{' '}
      <Katex tex="x=1" />.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x)=-f(x)+2" />,
    reason: <>
      Read as transformations of <Katex tex="f" />: reflect in the <Katex tex="x" />-axis (the minus sign), then translate
      up 2. The result is the mirror image of <Katex tex="f" /> in the line <Katex tex="y=1" />.
    </>,
    more: <>
      Why <Katex tex="y=1" />: the midpoint of <Katex tex="f(x)" /> and <Katex tex="g(x)=2-f(x)" /> is always{' '}
      <Katex tex="\tfrac{f(x)+2-f(x)}{2}=1" />. So the two curves are equally far above and below <Katex tex="y=1" /> at
      every <Katex tex="x" />, and they cross on that line, at the points from part a.
    </>,
  },
  {
    working: <Katex display tex="g(0)=2-\log_e(1)=2 \implies (0,2)" />,
    reason: <>The <Katex tex="y" />-intercept, the only label asked for. It is the maximum of <Katex tex="g" />, the reflection of the minimum <Katex tex="(0,0)" /> of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}g(x)=0 \implies \log_e(1+x^2)=2\\ \implies x=\pm\sqrt{e^2-1}\approx\pm2.5\end{gathered}" />,
    reason: <>
      Not required to be labelled, but the <Katex tex="x" />-intercepts must be in the right place. Equivalently, they are
      where the printed <Katex tex="f" /> reaches height 2, about <Katex tex="x=\pm2.5" /> on the graph.
    </>,
  },
  {
    working: <SketchOverlay />,
    reason: <>
      The graph of <Katex tex="g" /> drawn on the printed axes: a hump peaking at the labelled <Katex tex="(0,2)" />, meeting{' '}
      <Katex tex="y=f(x)" /> at the two points from part a. (both at height 1), and crossing the <Katex tex="x" />-axis
      near <Katex tex="\pm2.5" />.
    </>,
    more: <>
      The report lists exactly these accuracy checks: the shape (a reflection of <Katex tex="f" /> in{' '}
      <Katex tex="y=1" />), the <Katex tex="x" />-intercepts at about <Katex tex="\pm2.5" />, the labelled{' '}
      <Katex tex="y" />-intercept and the crossings with <Katex tex="f" /> at <Katex tex="y=1" />. At the edges of the grid{' '}
      <Katex tex="g" /> has dropped to about <Katex tex="-0.5" />, as far below <Katex tex="y=1" /> as <Katex tex="f" /> is
      above it. <Katex tex="g" /> keeps decreasing forever, slowly, with no asymptote.
    </>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="(x,y)\to\left(x,\tfrac12y\right)\to\left(x+3,\tfrac12y\right)" />,
    reason: <>
      A dilation from the <Katex tex="x" />-axis acts on <Katex tex="y" />-values (distances from the{' '}
      <Katex tex="x" />-axis), so it halves <Katex tex="y" />. The translation in the positive <Katex tex="x" /> direction
      adds 3 to <Katex tex="x" />. As mapping rules: <Katex tex="x'=x+3" />, <Katex tex="y'=\tfrac12y" />.
    </>,
    more: <>
      The order would matter if the translation were vertical; here the two transformations act on different
      coordinates, so either order gives the same image.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\left(\sqrt2+3,\ \tfrac12\log_e(3)\right)}" />,
    reason: <>
      Apply the rules to <Katex tex="\left(\sqrt2,\log_e(3)\right)" />. The report also accepts{' '}
      <Katex tex="\left(\sqrt2+3,\log_e\!\left(\sqrt3\right)\right)" />, since{' '}
      <Katex tex="\tfrac12\log_e(3)=\log_e\!\left(3^{1/2}\right)" />.
    </>,
  },
]

export default function MethodsQ8_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (6 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=\log_e(1+x^2)" />.
          <br />
          The graph of <Katex tex="y=f(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The graph of y = f(x) on a grid from −3 to 3 on both axes: a U-shaped curve with its minimum at the origin, symmetric about the y-axis, rising to about 2.5 at x = ±3.3 — from the original VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
        <p>
          Let <Katex tex="g:R\to R,\ g(x)=2-f(x)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Intersection Points"
        marks={3}
        statement={
          <>
            Determine the coordinates of the points of intersection of the graphs of <Katex tex="y=f(x)" /> and{' '}
            <Katex tex="y=g(x)" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Treat log_e(1 + x²) as log_e(1) + log_e(x²)"
          working={<Katex display tex="\begin{gathered}\log_e(1+x^2)=1 \implies 0+2\log_e(x)=1\\ \implies x=\sqrt e\end{gathered}" />}
        >
          There is no log law for the log of a <em>sum</em>: <Katex tex="\log_e(A+B)" /> does not split.{' '}
          <Katex tex="\log_e(AB)=\log_e(A)+\log_e(B)" /> is for a product. Solve <Katex tex="\log_e(1+x^2)=1" /> by
          exponentiating the whole argument instead. This slip also loses the negative solution.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Transformations"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="y=g(x)" /> on the axes above.
            <br />
            Label the coordinates of the <Katex tex="y" />-intercept.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Transformations"
        marks={1}
        statement={
          <>
            The point <Katex tex="\left(\sqrt2,\log_e(3)\right)" /> lies on the graph of <Katex tex="y=f(x)" />.
            <br />
            The graph of <Katex tex="y=f(x)" /> has the following sequence of transformations applied:
            <ol className="list-decimal pl-6 my-1">
              <li>a dilation by a factor of <Katex tex="\dfrac12" /> from the <Katex tex="x" />-axis</li>
              <li>a translation by 3 units in the positive direction of the <Katex tex="x" />-axis</li>
            </ol>
            Find the coordinates of the image of the point <Katex tex="\left(\sqrt2,\log_e(3)\right)" /> after the above
            transformations have been applied.
          </>
        }
        examinerReport={REPORT_C}
      >
        <Background>
          <p>
            &ldquo;From the <Katex tex="x" />-axis&rdquo; names the line the stretch pulls away from, not the direction it
            acts in. Every point keeps its <Katex tex="x" />-coordinate and its distance from the <Katex tex="x" />-axis is
            multiplied by the factor, so only <Katex tex="y" /> changes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Apply the dilation to the x-coordinate"
          working={<Katex display tex="\left(\tfrac{\sqrt2}{2}+3,\ \log_e(3)\right)" />}
        >
          That would be a dilation <em>from the <Katex tex="y" />-axis</em>. A dilation from the <Katex tex="x" />-axis
          scales distances measured from the <Katex tex="x" />-axis, which are the <Katex tex="y" />-values.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
