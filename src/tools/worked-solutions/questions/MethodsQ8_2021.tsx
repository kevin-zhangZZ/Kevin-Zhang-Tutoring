// 2021 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 40% correct. Matching a
// function's graph to the graph of its derivative. Question text transcribed from the
// original paper; the stem graph and all five option graphs are cropped directly from the
// original VCAA exam PDF, not redrawings. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2021-mcq8-stem.png'
import optASrc from './meth-2021-mcq8-optA.png'
import optBSrc from './meth-2021-mcq8-optB.png'
import optCSrc from './meth-2021-mcq8-optC.png'
import optDSrc from './meth-2021-mcq8-optD.png'
import optESrc from './meth-2021-mcq8-optE.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img src={src} alt={alt} className="w-full max-w-[160px]" />
    </div>
  )
}

const STEM = <Panel src={stemSrc} alt="Graph of f, rising from an asymptote at x=a, from the original 2021 VCAA exam paper" />
const OPT_A = <Panel src={optASrc} alt="Option A: an increasing curve defined for all x, above a horizontal dashed asymptote labelled a" />
const OPT_B = <Panel src={optBSrc} alt="Option B: a positive increasing curve defined only for x < a, rising steeply towards the dashed asymptote x = a" />
const OPT_C = <Panel src={optCSrc} alt="Option C: a curve defined only for x > a, below the x-axis, rising from the dashed asymptote x = a towards the x-axis" />
const OPT_D = <Panel src={optDSrc} alt="Option D: two branches either side of the dashed asymptote x = a, negative and decreasing for x < a, positive and decreasing for x > a" />
const OPT_E = <Panel src={optESrc} alt="Option E: a curve defined only for x > a, above the x-axis, falling from the dashed asymptote x = a towards the x-axis" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 9, C: 3, D: 29, E: 40 },
  answer: 'E',
  comment: <>The gradient is decreasing and positive over the interval <Katex tex="(a,\infty)" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <>The graph of <Katex tex="f" /> exists only for <Katex tex="x>a" />, falls to <Katex tex="-\infty" /> as <Katex tex="x\to a^+" />, and is increasing and concave down.</>,
    reason: <>Reading the stem graph: always increasing, but with a <b>decreasing</b> gradient — a log-like shape.</>,
  },
  {
    working: <>Since <Katex tex="f" /> is only defined for <Katex tex="x>a" />, so is <Katex tex="f'" />.</>,
    reason: <>Rules out option A (defined for all <Katex tex="x" />), option B (drawn only for <Katex tex="x<a" />) and option D (drawn with a second branch for <Katex tex="x<a" />).</>,
  },
  {
    working: <>Since <Katex tex="f" /> is always increasing, <Katex tex="f'(x)>0" /> throughout <Katex tex="(a,\infty)" />.</>,
    reason: <>Rules out option C, which lies below the <Katex tex="x" />-axis.</>,
  },
  {
    working: <>Since <Katex tex="f" /> is concave down (its steepness eases off as <Katex tex="x" /> increases), <Katex tex="f'" /> must be <b>decreasing</b>.</>,
    reason: <>Option C fails this too: its curve is <i>increasing</i>.</>,
  },
  {
    working: <Katex display tex="f'(x)\to\infty \text{ as } x\to a^+" />,
    reason: <>The steep near-vertical drop of <Katex tex="f" /> just right of the asymptote means its gradient is very large there.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}}" />,
    reason: <>The only graph that is positive, decreasing, restricted to <Katex tex="x>a" />, and shoots up sharply as <Katex tex="x\to a^+" />. Matches option <b>E</b>. Option D has the same branch for <Katex tex="x>a" /> but adds a second branch where <Katex tex="f" /> is not defined.</>,
  },
]

export default function MethodsQ8_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The graph of the function <Katex tex="f" /> is shown below.</p>
          <div className="mb-3">{STEM}</div>
          <p>The graph corresponding to <Katex tex="f'" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: OPT_A },
        { letter: 'B', content: OPT_B },
        { letter: 'C', content: OPT_C },
        { letter: 'D', content: OPT_D },
        { letter: 'E', content: OPT_E, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
