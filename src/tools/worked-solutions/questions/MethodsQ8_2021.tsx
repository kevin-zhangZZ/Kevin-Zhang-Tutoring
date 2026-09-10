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
const OPT_A = <Panel src={optASrc} alt="Option A: candidate graph of f′" />
const OPT_B = <Panel src={optBSrc} alt="Option B: candidate graph of f′" />
const OPT_C = <Panel src={optCSrc} alt="Option C: candidate graph of f′" />
const OPT_D = <Panel src={optDSrc} alt="Option D: candidate graph of f′" />
const OPT_E = <Panel src={optESrc} alt="Option E: candidate graph of f′" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 9, C: 3, D: 29, E: 40 },
  answer: 'E',
  comment: <>The gradient is decreasing and positive over the interval <Katex tex="(a,\infty)" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: STEM,
    reason: <>The graph of <Katex tex="f" /> exists only for <Katex tex="x>a" />: it falls to <Katex tex="-\infty" /> as <Katex tex="x\to a^+" />, then rises, always increasing but with a <b>decreasing</b> gradient (concave down) — a log-like shape.</>,
  },
  {
    working: <>Since <Katex tex="f" /> is only defined for <Katex tex="x>a" />, so is <Katex tex="f'" />.</>,
    reason: <>Rules out options A and B (both drawn continuing past <Katex tex="x=a" /> to the left) and option D (drawn with a second branch for <Katex tex="x<a" />).</>,
  },
  {
    working: <>Since <Katex tex="f" /> is always increasing, <Katex tex="f'(x)>0" /> throughout <Katex tex="(a,\infty)" />.</>,
    reason: 'Every candidate graph restricted to x > a must stay above the x-axis.',
  },
  {
    working: <>Since <Katex tex="f" /> is concave down (its steepness eases off as <Katex tex="x" /> increases), <Katex tex="f'" /> must be <b>decreasing</b>.</>,
    reason: <>Rules out option C, whose curve for <Katex tex="x>a" /> is <i>increasing</i>, not decreasing.</>,
  },
  {
    working: <Katex display tex="f'(x)\to\infty \text{ as } x\to a^+" />,
    reason: <>The steep near-vertical drop of <Katex tex="f" /> just right of the asymptote means its gradient is very large there.</>,
  },
  {
    working: OPT_E,
    reason: <>Option <b>E</b> is the only graph that is positive, decreasing, restricted to <Katex tex="x>a" />, and shoots up sharply as <Katex tex="x\to a^+" /> — exactly matching every property of <Katex tex="f'" /> derived above.</>,
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
      diagram={STEM}
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
