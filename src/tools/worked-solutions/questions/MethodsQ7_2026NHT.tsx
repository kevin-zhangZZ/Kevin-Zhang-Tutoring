// 2026 Mathematical Methods NHT — Exam 2, MCQ 7. The NHT report gives the answer key only, with no
// statistics; its worked comment is transcribed below, with its graph cropped from the report PDF
// (meth-2026nht-mcq7-report-graph.png). Functions: locating a solution of f(x) + g(x) = 0 from two graphs drawn to scale.
// Question text transcribed from the original paper; the graph is cropped from the original VCAA
// exam PDF (300 dpi). The working shows an SVG overlay on that crop: y = −g(x), the reflection of
// the printed g in the x-axis, digitised from the printed curve (calibrated from the gridlines:
// x = 0 at px 96.5, 509.25 px per unit; y = 0 at px 617.5, 509.5 px per unit; fit residual under
// 2 px) and its crossing with f at x ≈ 0.19. Solution is original; the answer A agrees with the
// report's key, and the report's "approximately x = 0.2".

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2026nht-mcq7-graph.png'
import reportGraphSrc from './meth-2026nht-mcq7-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      The equation <Katex tex="f(x)+g(x)=0" /> is equivalent to <Katex tex="f(x)=-g(x)" />.
      <br />
      We are looking for a value of <i>x</i> such that <Katex tex="f(x)" /> and <Katex tex="g(x)" /> are of
      opposite sign but equal distance from the <i>x</i>-axis.
      <br />
      The required <i>x</i>-value is approximately <Katex tex="x=0.2" />, as shown on the graph below.
      <br />
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's copy of the graphs of f and g with a red dashed vertical line at about x = 0.2 joining y = f(x) to y = g(x), where the two are the same distance above and below the x-axis" className="w-full max-w-[360px] mt-1" />
      <br />
      So, <i>x</i> is in the interval <Katex tex="\left[0,\dfrac12\right)" />.
    </>
  ),
}

const ORANGE = '#f97316'
const LABEL = { fontSize: 44, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

// y = −g(x) in the crop's pixel frame: the printed g, reflected in the x-axis (y = 617.5 px).
const NEG_G =
  'M96.5,249.8 L109.4,274.7 L122.3,298.3 L135.2,320.5 L148.1,341.6 L161.0,361.7 L173.9,380.8 L186.7,399.0 L199.6,416.4 L212.5,433.2 L225.4,449.2 L238.3,464.7 L251.2,479.6 L264.1,494.0 L277.0,507.9 L289.9,521.4 L302.8,534.4 L315.7,547.0 L328.6,559.3 L341.5,571.2 L354.3,582.7 L367.2,593.9 L380.1,604.9 L393.0,615.5 L405.9,625.9 L418.8,636.0 L431.7,645.9 L444.6,655.5 L457.5,664.9 L470.4,674.1 L483.3,683.1 L496.2,691.9 L509.1,700.5 L521.9,708.9 L534.8,717.2 L547.7,725.3 L560.6,733.2 L573.5,741.0 L586.4,748.6 L599.3,756.1 L612.2,763.5 L625.1,770.7 L638.0,777.8 L650.9,784.8 L663.8,791.6 L676.7,798.4 L689.6,805.0 L702.4,811.6 L715.3,818.0 L728.2,824.3 L741.1,830.6 L754.0,836.7 L766.9,842.8 L779.8,848.7 L792.7,854.6 L805.6,860.4 L818.5,866.1 L831.4,871.8 L844.3,877.3 L857.2,882.8 L870.0,888.3 L882.9,893.6 L895.8,898.9 L908.7,904.1 L921.6,909.3 L934.5,914.3 L947.4,919.4 L960.3,924.3 L973.2,929.2 L986.1,934.1 L999.0,938.9 L1011.9,943.6 L1024.8,948.3 L1037.6,952.9 L1050.5,957.4 L1063.4,962.0 L1076.3,966.4 L1089.2,970.8 L1102.1,975.2 L1115.0,979.5'

const DIAGRAM = (
  <img
    loading="lazy"
    decoding="async"
    src={graphSrc}
    alt="Graphs of y = f(x), decreasing from about 0.45 at x = 0 to about −0.45 at x = 2, and y = g(x), increasing from about −0.72 at x = 0 to about 0.72 at x = 2, on a grid with lines every 0.5 units, from the original VCAA exam paper"
    className="w-full max-w-[420px]"
  />
)

function ReflectionOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img
          loading="lazy"
          decoding="async"
          src={graphSrc}
          alt="VCAA's graphs of f and g with y = −g(x), the reflection of g in the x-axis, drawn over them in orange; it crosses y = f(x) at about x = 0.2, marked with a dashed line down to y = g(x)"
          className="w-full block"
        />
        <svg viewBox="0 0 1300 1176" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={NEG_G} fill="none" stroke={ORANGE} strokeWidth={8} />
          <line x1={195} y1={411} x2={195} y2={825} stroke={ORANGE} strokeWidth={6} strokeDasharray="18 12" />
          <circle cx={195} cy={411} r={13} fill={ORANGE} />
          <circle cx={195} cy={825} r={13} fill={ORANGE} />
          <text x={225} y={375} {...LABEL}>x ≈ 0.2</text>
          <text x={720} y={1010} {...LABEL}>y = −g(x)</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)+g(x)=0\iff f(x)=-g(x)" />,
    reason: <>There are no rules to solve with, so turn the equation into something you can <em>see</em>: a solution is where <Katex tex="y=f(x)" /> meets <Katex tex="y=-g(x)" />, the reflection of <Katex tex="g" /> in the <Katex tex="x" />-axis.</>,
    more: <>Equivalently, you want an <Katex tex="x" /> where <Katex tex="f(x)" /> and <Katex tex="g(x)" /> are the same distance from the <Katex tex="x" />-axis but on opposite sides. Note that it is <b>not</b> where the two printed curves cross (near <Katex tex="x=0.9" />) — that solves <Katex tex="f(x)=g(x)" />, i.e. <Katex tex="f(x)-g(x)=0" />.</>,
  },
  {
    working: <ReflectionOverlay />,
    reason: <>Reflect <Katex tex="g" /> in the <Katex tex="x" />-axis (orange). It meets <Katex tex="y=f(x)" /> at about <Katex tex="x=0.2" />: there <Katex tex="f(x)\approx0.40" /> and <Katex tex="g(x)\approx-0.40" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=0&:\ f+g\approx0.45+(-0.72)<0\\x=\tfrac12&:\ f+g\approx0.33+(-0.06)>0\end{aligned}" />,
    reason: <>Confirm with values read off the grid: <Katex tex="f+g" /> changes sign between <Katex tex="0" /> and <Katex tex="\tfrac12" />, and both functions are continuous, so <Katex tex="f+g" /> must pass through 0 in between.</>,
    more: <>The other intervals have no solution: on <Katex tex="\left[\tfrac12,2\right]" />, <Katex tex="g" /> is either small and negative while <Katex tex="f" /> is clearly positive (up to about <Katex tex="x=0.6" />), or both are positive (up to about <Katex tex="x=1.45" />), or <Katex tex="f" /> is negative but <Katex tex="g" /> is larger in size (at <Katex tex="x=2" />, <Katex tex="-0.45+0.72>0" />). In the picture, the orange curve stays below <Katex tex="f" /> all the way from <Katex tex="x\approx0.2" /> to <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x\in\left[0,\ \tfrac12\right)}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>B</b>, <Katex tex="\left[\tfrac12,1\right)" />, holds the crossing of the two printed curves (about <Katex tex="x=0.9" />), which is where <Katex tex="f(x)=g(x)" />, not <Katex tex="f(x)+g(x)=0" />; it also holds the <Katex tex="x" />-intercept of <Katex tex="g" /> (about <Katex tex="x=0.6" />). Option C holds the <Katex tex="x" />-intercept of <Katex tex="f" /> (about <Katex tex="x=1.4" />). At an intercept only one of the two functions is zero, so the sum is not.</>,
  },
]

export default function MethodsQ7_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Consider the continuous functions <Katex tex="f:[0,2]\to R" /> and <Katex tex="g:[0,2]\to R" />, whose
            graphs are drawn to scale below.
          </p>
          <p>
            There is a value of <Katex tex="x" /> for which <Katex tex="f(x)+g(x)=0" /> within the interval
          </p>
        </div>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\left[0,\ \dfrac12\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left[\dfrac12,\ 1\right)" /> },
        { letter: 'C', content: <Katex tex="\left[1,\ \dfrac32\right)" /> },
        { letter: 'D', content: <Katex tex="\left[\dfrac32,\ 2\right]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
