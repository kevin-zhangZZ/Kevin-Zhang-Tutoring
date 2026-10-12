// 2025 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 71% correct.
// A reflection in the y-axis followed by a vertical translation. Question text transcribed from the original paper;
// the stem graph and the four option graphs are crops of VCAA's own artwork (300 dpi, option letters excluded).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2025-mcq3-stem.png'
import optASrc from './meth-2025-mcq3-optA.png'
import optBSrc from './meth-2025-mcq3-optB.png'
import optCSrc from './meth-2025-mcq3-optC.png'
import optDSrc from './meth-2025-mcq3-optD.png'

const OPT_A = <img loading="lazy" decoding="async" src={optASrc} alt="Option A: from 3 at x = −4 down to a trough just below the axis near x = −2, up to 2 at the origin, a shallow trough near x = 2 and ending at 1.5" className="w-full max-w-[300px]" />
const OPT_B = <img loading="lazy" decoding="async" src={optBSrc} alt="Option B: from 4 at x = −4 down to a trough of about 0.6 near x = −2, up to 3 at the origin, a shallow trough of about 1.3 near x = 2 and ending at 2.5" className="w-full max-w-[300px]" />
const OPT_C = <img loading="lazy" decoding="async" src={optCSrc} alt="Option C: humps near x = −2 and x = 2 with a local minimum of 1 at the origin, falling to 0 at x = 4" className="w-full max-w-[300px]" />
const OPT_D = <img loading="lazy" decoding="async" src={optDSrc} alt="Option D: humps near x = −2 and x = 2 with a local minimum of 3 at the origin, falling to 2 at x = 4" className="w-full max-w-[300px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 71, C: 12, D: 13 },
  answer: 'B',
  comment: (
    <>
      The graph of <Katex tex="y=f(x)" /> has been reflected in the <Katex tex="y" />-axis and
      translated 2 units up to get the graph of <Katex tex="y=f(-x)+2" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = f(-x)+2" />,
    reason: <>The <Katex tex="-x" /> inside the brackets reflects the graph in the <Katex tex="y" />-axis; the <Katex tex="+2" /> outside translates it 2 units up.</>,
    more: <>A change inside the brackets acts on <Katex tex="x" />, so it moves the graph sideways; a change outside acts on <Katex tex="y" />, so it moves the graph up or down. That is why <Katex tex="f(-x)" /> is a reflection in the <Katex tex="y" />-axis, while <Katex tex="-f(x)" /> would be a reflection in the <Katex tex="x" />-axis. The order doesn't matter here: one transformation only moves points sideways, the other only up.</>,
  },
  {
    working: <Katex display tex="(x,y) \mapsto (-x,\ y+2)" />,
    reason: <>Every point of the original swaps sides of the <Katex tex="y" />-axis and rises 2. Now track a few distinctive points.</>,
  },
  {
    working: <Katex display tex="\text{local max } (0,1) \mapsto (0,3)" />,
    reason: <>A point on the <Katex tex="y" />-axis doesn't move sideways, so it rises to 3 and is still a local maximum. <b>C</b> and <b>D</b> have a minimum there, so they are out; <b>A</b> peaks at only 2.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{min } (2,\,-1.4) &\mapsto (-2,\ 0.6) \\ \text{min } (-2,\,-0.7) &\mapsto (2,\ 1.3) \end{aligned}" />,
    reason: <>Approximate troughs read off the graph. They swap sides and each rises 2, so the deeper trough is now on the left.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x=-4: &\ \ f(4)+2 = 2+2 = 4 \\ x=4: &\ \ f(-4)+2 \approx 0.5+2 = 2.5 \end{aligned}" />,
    reason: <>For the ends, substitute into <Katex tex="y=f(-x)+2" />: read the original graph at <Katex tex="-x" />, then add 2.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Graph B}}" />,
    reason: <>Matches option <b>B</b>: 4 at the left end, a peak of 3 at the origin.</>,
    more: <>Option <b>A</b> has the right reflection but is lifted only 1 unit (2 at the origin, 3 at <Katex tex="x=-4" />): it is <Katex tex="y=f(-x)+1" />. Options <b>C</b> and <b>D</b> have a local <em>minimum</em> at the origin: they are <Katex tex="y=2-f(x)" /> and <Katex tex="y=4-f(x)" />, reflections in the <Katex tex="x" />-axis rather than the <Katex tex="y" />-axis. Between them they drew 25% of students — mixing up <Katex tex="f(-x)" /> with <Katex tex="-f(x)" /> was the main trap.</>,
  },
]

export default function MethodsQ3_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>The graph of <Katex tex="y=f(x)" /> is shown below.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={stemSrc}
              alt="A wavy curve with a shallow trough near x = −2, a local maximum of 1 at the origin, a deeper trough near x = 2, then rising to 2 at x = 4 — from the original 2025 VCAA exam paper"
              className="w-full max-w-[420px]"
            />
          </div>
          <p>
            Which one of the following options best represents the graph of{' '}
            <Katex tex="y=f(-x)+2" />?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: OPT_A },
        { letter: 'B', content: OPT_B, isAnswer: true },
        { letter: 'C', content: OPT_C },
        { letter: 'D', content: OPT_D },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
