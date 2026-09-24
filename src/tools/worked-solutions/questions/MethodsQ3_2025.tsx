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

const OPT_A = <img src={optASrc} alt="Option A: from 3 at x = −4 down to a trough just below the axis near x = −2, up to 2 at the origin, a shallow trough near x = 2 and ending at 1.5" className="w-full max-w-[300px]" />
const OPT_B = <img src={optBSrc} alt="Option B: from 4 at x = −4 down to a trough of about 0.6 near x = −2, up to 3 at the origin, a shallow trough of about 1.3 near x = 2 and ending at 2.5" className="w-full max-w-[300px]" />
const OPT_C = <img src={optCSrc} alt="Option C: humps near x = −2 and x = 2 with a local minimum of 1 at the origin, falling to 0 at x = 4" className="w-full max-w-[300px]" />
const OPT_D = <img src={optDSrc} alt="Option D: humps near x = −2 and x = 2 with a local minimum of 3 at the origin, falling to 2 at x = 4" className="w-full max-w-[300px]" />

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
    reason: <>Two transformations: <Katex tex="x\mapsto-x" /> is a reflection in the <Katex tex="y" />-axis, and <Katex tex="+2" /> lifts everything two units.</>,
  },
  {
    working: <Katex display tex="(x,y) \mapsto (-x,\ y+2)" />,
    reason: <>The mapping applied to every point of the original graph.</>,
  },
  {
    working: <Katex display tex="\text{local max } (0,1) \mapsto (0,3)" />,
    reason: <>A point on the <Katex tex="y" />-axis stays put horizontally, so it simply rises to 3 — still a local maximum. Options <b>C</b> and <b>D</b> have a local <em>minimum</em> at the origin: they match <Katex tex="2-f(x)" /> and <Katex tex="4-f(x)" />, reflections in the <Katex tex="x" />-axis instead.</>,
  },
  {
    working: <Katex display tex="\text{deeper min near } x=2 \ \mapsto \ \text{near } x=-2" />,
    reason: <>The reflection swaps the two troughs: the deeper one (originally on the right) ends up on the left, as it does in both <b>A</b> and <b>B</b>.</>,
  },
  {
    working: <Katex display tex="\text{right-hand end } f(-4)\approx0.5 \ \mapsto \ \text{value} \approx2.5 \text{ at } x=4" />,
    reason: <>Tracking the ends confirms the orientation.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Graph B}}" />,
    reason: <>Matches option <b>B</b>: high at the left, deep trough near <Katex tex="x=-2" />, peak of 3 at the origin, shallow trough near <Katex tex="x=2" />. Option <b>A</b> has the right reflection but is lifted only 1 unit — its value at the origin is 2.</>,
  },
]

export default function MethodsQ3_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>The graph of <Katex tex="y=f(x)" /> is shown below.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
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
