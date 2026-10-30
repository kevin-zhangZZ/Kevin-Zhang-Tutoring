// 2023 Mathematical Methods NHT — Exam 2, MCQ 20. The NHT report gives the answer key only, with
// no statistics. Functions: undoing a transformation — recovering y = f(x) from the graph of
// y = f(−2(x + 1)). Question text transcribed from the original paper; the stem graph and the
// five option graphs are cropped from the original VCAA exam PDF. Solution is original; the answer
// D agrees with the report's key. Feature positions on the stem graph read from the 300 dpi crop
// (local maximum at x = −1 under the printed tick; touching point near x = −0.5; minimum near x = −1.75, measured against the
// tick: y-axis at px 309, x = −1 tick at px 208, minimum at px 132).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2023nht-mcq20-stem.png'
import optASrc from './meth-2023nht-mcq20-optA.png'
import optBSrc from './meth-2023nht-mcq20-optB.png'
import optCSrc from './meth-2023nht-mcq20-optC.png'
import optDSrc from './meth-2023nht-mcq20-optD.png'
import optESrc from './meth-2023nht-mcq20-optE.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full max-w-[240px]" />
    </div>
  )
}

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h(x)=f\big(-2(x+1)\big)" />,
    reason: <>Call the graph we are given <Katex tex="h" />. We know <Katex tex="h" /> and want <Katex tex="f" />, so we need the map that takes a point on <Katex tex="h" /> to the matching point on <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="(x,\,y)\ \text{on } h\ \Rightarrow\ \big(-2(x+1),\ y\big)\ \text{on } f" />,
    reason: <>If <Katex tex="(x,y)" /> is on <Katex tex="h" />, then <Katex tex="y=f(-2(x+1))" />, which says exactly that <Katex tex="f" /> takes the input <Katex tex="-2(x+1)" /> to <Katex tex="y" />. Heights don&apos;t change; only the <Katex tex="x" />-coordinates move.</>,
    more: <>In words: translate 1 unit right (<Katex tex="x+1" />), then dilate by factor 2 from the <Katex tex="y" />-axis, then reflect in the <Katex tex="y" />-axis (the <Katex tex="\times(-2)" />). So the graph of <Katex tex="f" /> is twice as wide as the one shown, and mirror-imaged.</>,
  },
  {
    working: <Katex display tex="\text{local max: } x=-1\ \mapsto\ -2(0)=0" />,
    reason: <>The local maximum sits above the printed tick at <Katex tex="x=-1" />, so on <Katex tex="f" /> it is on the <Katex tex="y" />-axis, at the same positive height.</>,
  },
  {
    working: <Katex display tex="\text{touch: } x\approx-\tfrac12\ \mapsto\ -2\left(\tfrac12\right)=-1" />,
    reason: <>The point where the given graph touches the <Katex tex="x" />-axis, just right of the maximum, moves to the <b>left</b> of the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="\text{min: } x\approx-1.75\ \mapsto\ -2(-0.75)\approx1.5" />,
    reason: <>The minimum below the axis, on the far left of the given graph, moves to the <b>right</b> of the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{D}}" />,
    reason: <>Matches option <b>D</b>: it touches the <Katex tex="x" />-axis left of the origin, has its local maximum on the <Katex tex="y" />-axis, and dips below the axis to the right — and it is wider than the given graph.</>,
    more: <>Option <b>C</b> is option D reflected: it has the stretch and shift but misses the reflection in the <Katex tex="y" />-axis. Options <b>A</b>, <b>B</b> and <b>E</b> all put a zero at the origin; but the origin on <Katex tex="f" /> comes from <Katex tex="x=-1" /> on the given graph, where the curve is at its local maximum, well above the axis.</>,
  },
]

export default function MethodsQ20_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The graph of <Katex tex="y=f\big(-2(x+1)\big)" /> is shown below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={stemSrc}
              alt="The graph of y = f(−2(x + 1)), a quartic-shaped curve entirely left of the y-axis: down from the top left to a minimum below the x-axis, up to a local maximum above the tick at x = −1, down to touch the x-axis just left of the origin, then up steeply — from the original 2023 NHT VCAA exam paper"
              className="w-full max-w-[320px]"
            />
          </div>
          <p>
            If all axes are to the same scale as the graph above, the graph of <Katex tex="y=f(x)" /> is
            best represented by
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Panel src={optASrc} alt="Option A: touches the x-axis on the left, local maximum left of the y-axis, crosses through the origin to a minimum below the axis on the right" /> },
        { letter: 'B', content: <Panel src={optBSrc} alt="Option B: a narrow curve touching the x-axis at the origin, with a local maximum and then a minimum below the axis to the right" /> },
        { letter: 'C', content: <Panel src={optCSrc} alt="Option C: a minimum below the axis on the left, local maximum on the y-axis, touching the x-axis on the right" /> },
        { letter: 'D', content: <Panel src={optDSrc} alt="Option D: touching the x-axis on the left, local maximum on the y-axis, minimum below the axis on the right" />, isAnswer: true },
        { letter: 'E', content: <Panel src={optESrc} alt="Option E: a minimum below the axis on the left, crossing through the origin to a local maximum, then touching the x-axis on the right" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
