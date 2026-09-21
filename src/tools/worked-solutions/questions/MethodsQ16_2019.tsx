// 2019 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 63% correct. Given
// part of the graph of f, identify the matching part of the graph of f'. Question text
// transcribed from the original paper; the stem graph and all five option graphs are cropped
// directly from the original VCAA exam PDF, not redrawings. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2019-mcq16-stem.png'
import optASrc from './meth-2019-mcq16-optA.png'
import optBSrc from './meth-2019-mcq16-optB.png'
import optCSrc from './meth-2019-mcq16-optC.png'
import optDSrc from './meth-2019-mcq16-optD.png'
import optESrc from './meth-2019-mcq16-optE.png'

const OPT_A = <img src={optASrc} alt="Option A: negative, touching near zero close to the origin, dipping to a trough just before 5, crossing to positive between 5 and 6" className="w-full max-w-[220px]" />
const OPT_B = <img src={optBSrc} alt="Option B: negative, rising to a positive hump around x=5, then falling steeply negative again after 5" className="w-full max-w-[220px]" />
const OPT_C = <img src={optCSrc} alt="Option C: a downward parabola, positive near the origin, crossing to negative between 5 and 6" className="w-full max-w-[220px]" />
const OPT_D = <img src={optDSrc} alt="Option D: a positive hump peaking well before 5, dropping to touch zero between 5 and 6, then rising steeply" className="w-full max-w-[220px]" />
const OPT_E = <img src={optESrc} alt="Option E: negative, a small hump near the origin, dipping to a trough around 5, crossing to positive just before 6" className="w-full max-w-[220px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 7, C: 7, D: 9, E: 14 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={stemSrc} alt="Graph of y=f(x): steep from the upper left, flattening through the origin, dipping to a local minimum between 5 and 6, then rising steeply" className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <>The given part of <Katex tex="y=f(x)" />.</>,
  },
  {
    working: <>Read the gradient of <Katex tex="f" /> off the shape of its graph, left to right:</>,
  },
  {
    working: <>Far left: steeply <b>decreasing</b> — so <Katex tex="f'" /> is a large negative number there.</>,
    reason: <>The curve falls very steeply as it enters from the top left.</>,
  },
  {
    working: <>Near the origin: the curve flattens (an inflection-like S-bend) before continuing to fall — so <Katex tex="f'" /> rises toward, but doesn't cross, zero, then dips negative again.</>,
    reason: <>A flattening without an actual turning point means <Katex tex="f'" /> touches near zero but stays negative.</>,
  },
  {
    working: <>Between <Katex tex="5" /> and <Katex tex="6" />: a local <b>minimum</b> of <Katex tex="f" /> — so <Katex tex="f'=0" /> exactly there, changing from negative to positive.</>,
  },
  {
    working: <>After <Katex tex="6" />: steeply <b>increasing</b> — so <Katex tex="f'" /> is large and positive.</>,
  },
  {
    working: OPT_A,
    reason: <>Negative throughout except a touch near zero close to the origin (matching the inflection) and a genuine zero crossing between <Katex tex="5" /> and <Katex tex="6" /> (matching the local minimum). ✓</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option A}}" />,
    reason: <>The only option consistent with <Katex tex="f'" /> being negative everywhere shown except a single sign change at the local minimum.</>,
  },
]

export default function MethodsQ16_2019() {
  return (
    <MCQShell
      question={<p>Part of the graph of <Katex tex="y=f(x)" /> is shown below. The corresponding part of the graph of <Katex tex="y=f'(x)" /> is best represented by</p>}
      diagram={<img src={stemSrc} alt="Graph of y=f(x): steep from the upper left, flattening through the origin, dipping to a local minimum between 5 and 6, then rising steeply" className="w-full max-w-[300px]" />}
      options={[
        { letter: 'A', content: OPT_A, isAnswer: true },
        { letter: 'B', content: OPT_B },
        { letter: 'C', content: OPT_C },
        { letter: 'D', content: OPT_D },
        { letter: 'E', content: OPT_E },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
