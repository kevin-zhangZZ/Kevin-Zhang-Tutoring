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

const OPT_A = <img src={optASrc} alt="Option A: negative everywhere except a touch at zero near the origin, dipping to a trough and crossing up through zero at x = 5" className="w-full max-w-[220px]" />
const OPT_B = <img src={optBSrc} alt="Option B: rises to a positive hump between the origin and x = 5, then plunges steeply negative after 5" className="w-full max-w-[220px]" />
const OPT_C = <img src={optCSrc} alt="Option C: a downward parabola, positive from the origin until it crosses to negative between 5 and 6" className="w-full max-w-[220px]" />
const OPT_D = <img src={optDSrc} alt="Option D: a positive hump peaking well before 5, dropping to touch zero between 5 and 6, then rising steeply — never negative" className="w-full max-w-[220px]" />
const OPT_E = <img src={optESrc} alt="Option E: the same shape as option A but crossing up through zero at x = 6 instead of x = 5" className="w-full max-w-[220px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 7, C: 7, D: 9, E: 14 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={stemSrc} alt="Graph of y = f(x): falling steeply from the upper left, flattening onto the axis at the origin, continuing down to a minimum turning point at x = 5, then rising steeply and crossing the axis at x = 6" className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <>Read off the two features that control the shape of <Katex tex="f'" />: a <b>flattening at the origin</b> where the curve touches the axis but keeps going down, and a <b>minimum turning point at <Katex tex="x=5" /></b>. (The curve then cuts the axis at <Katex tex="x=6" /> — an important feature of <Katex tex="f" />, but not of <Katex tex="f'" />.)</>,
  },
  {
    working: <Katex display tex="\text{At } x=0: \ f \text{ is momentarily flat} \implies f'(0)=0" />,
    reason: <>But <Katex tex="f" /> is falling both before and after <Katex tex="x=0" /> — it flattens without turning around, a stationary point of inflection. So <Katex tex="f'" /> <em>touches</em> zero there and goes straight back down; it does not change sign.</>,
  },
  {
    working: <Katex display tex="\text{On } 0<x<5: \ f \text{ is decreasing} \implies f'(x)<0" />,
  },
  {
    working: <Katex display tex="\text{At } x=5: \ \text{minimum turning point} \implies f'(5)=0, \ \text{changing } - \text{ to } +" />,
    reason: <>This is the one genuine sign change, and it happens at the <em>turning point</em>, not at the <Katex tex="x" />-intercept.</>,
  },
  {
    working: <Katex display tex="\text{On } x>5: \ f \text{ is increasing steeply} \implies f'(x)>0" />,
  },
  {
    working: OPT_A,
    reason: <>Everything matches: negative throughout, a touch-and-return at the origin, and a single crossing from negative to positive at <Katex tex="x=5" />. ✓</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option A}}" />,
  },
  {
    working: <>Why the others fail:</>,
  },
  {
    working: OPT_E,
    reason: <>The trap, chosen by <Katex tex="14\%" />: identical in shape to A, but it crosses zero at <Katex tex="x=6" /> instead of <Katex tex="x=5" />. That's the point where <Katex tex="f" /> crosses the <Katex tex="x" />-<em>axis</em>, not where it turns around — and <Katex tex="f(x)=0" /> tells you nothing at all about <Katex tex="f'(x)" />.</>,
  },
  {
    working: OPT_B,
    reason: <>Positive between the origin and <Katex tex="x=5" />, which would mean <Katex tex="f" /> is <em>rising</em> there — but the given graph is clearly falling. It also turns negative after <Katex tex="5" />, the opposite way round.</>,
  },
  {
    working: OPT_C,
    reason: <>Positive near the origin then negative later: that describes a function that rises to a maximum and falls — the reverse of the given shape.</>,
  },
  {
    working: OPT_D,
    reason: <>Never negative, so it describes a function that never decreases. The given <Katex tex="f" /> decreases over the whole stretch from the origin to <Katex tex="x=5" />.</>,
  },
]

export default function MethodsQ16_2019() {
  return (
    <MCQShell
      question={<p>Part of the graph of <Katex tex="y=f(x)" /> is shown below. The corresponding part of the graph of <Katex tex="y=f'(x)" /> is best represented by</p>}
      diagram={<img src={stemSrc} alt="Graph of y = f(x): falling steeply from the upper left, flattening at the origin, continuing down to a minimum at x = 5, then rising steeply through the axis at x = 6" className="w-full max-w-[300px]" />}
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
