// 2025 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 38% correct. This
// year's paper used four options (A–D) rather than five. Which graph is consistent with a
// given inequality between two definite integrals. Question text transcribed from the
// original paper; all four option graphs are cropped directly from the original VCAA exam
// PDF, not redrawings. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './meth-2025-mcq17-optA.png'
import optBSrc from './meth-2025-mcq17-optB.png'
import optCSrc from './meth-2025-mcq17-optC.png'
import optDSrc from './meth-2025-mcq17-optD.png'

const OPT_A = <img src={optASrc} alt="Option A: an upward-opening curve, negative between roughly x=1 and x=3" className="w-full max-w-[220px]" />
const OPT_B = <img src={optBSrc} alt="Option B: a horizontal segment then a steep discontinuous line rising from below the axis at x=2 through positive values" className="w-full max-w-[220px]" />
const OPT_C = <img src={optCSrc} alt="Option C: a rising line then a discontinuous horizontal segment, constant and positive from x=2 onward" className="w-full max-w-[220px]" />
const OPT_D = <img src={optDSrc} alt="Option D: a wiggling curve, negative near x=1, positive with a small hump between roughly x=2 and x=3" className="w-full max-w-[220px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 38, B: 20, C: 17, D: 24 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\int_1^2f - \int_1^3f > 0 \;\iff\; \int_2^3 f(x)\,dx < 0" />. The only graph for which this
      integral is negative is Option A.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^2 f(x)\,dx > \int_1^3 f(x)\,dx" />,
    reason: 'The given condition.',
  },
  {
    working: <Katex display tex="\int_1^2 f(x)\,dx - \left(\int_1^2 f(x)\,dx + \int_2^3 f(x)\,dx\right) > 0" />,
    reason: <>Split <Katex tex="\int_1^3" /> at <Katex tex="x=2" /> and rearrange.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_2^3 f(x)\,dx < 0}" />,
    reason: <>The <Katex tex="\int_1^2" /> terms cancel — the condition is really just about the sign of <Katex tex="f" /> on <Katex tex="[2,3]" />.</>,
  },
  {
    working: <>Check each option for whether <Katex tex="f" /> is negative on <Katex tex="[2,3]" />:</>,
    reason: 'The graph shape everywhere else is irrelevant.',
  },
  {
    working: OPT_A,
    reason: <>A: an upward-curving graph crossing the <Katex tex="x" />-axis near <Katex tex="x=1" /> and <Katex tex="x=3" />, dipping <b>below</b> the axis in between — so <Katex tex="f<0" /> throughout <Katex tex="(1,3)\supset[2,3]" />. ✓</>,
  },
  {
    working: OPT_B,
    reason: <>B: jumps to a negative value right at <Katex tex="x=2" />, but rises steeply through <Katex tex="f=0" /> well before <Katex tex="x=3" /> and finishes strongly positive — the positive area past the crossing clearly outweighs the small negative sliver near <Katex tex="x=2" />, so <Katex tex="\int_2^3 f(x)\,dx" /> comes out positive overall. Doesn't satisfy the condition.</>,
  },
  {
    working: OPT_C,
    reason: <>C: constant and clearly positive across all of <Katex tex="[2,3]" />. Doesn't satisfy the condition.</>,
  },
  {
    working: OPT_D,
    reason: <>D: crosses <Katex tex="f=0" /> right around <Katex tex="x=2" /> and stays non-negative (a small hump) for the rest of <Katex tex="[2,3]" />, only turning negative again after <Katex tex="x=3" />. Doesn't satisfy the condition.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option A}}" />,
    reason: <>The only graph negative throughout <Katex tex="[2,3]" />.</>,
  },
]

export default function MethodsQ17_2025() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="f:\mathbb{R}\to\mathbb{R}" /> satisfies{' '}
          <Katex tex="\displaystyle\int_1^2 f(x)\,dx > \int_1^3 f(x)\,dx" />, the graph of <Katex tex="y=f(x)" />{' '}
          could be
        </p>
      }
      options={[
        { letter: 'A', content: OPT_A, isAnswer: true },
        { letter: 'B', content: OPT_B },
        { letter: 'C', content: OPT_C },
        { letter: 'D', content: OPT_D },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
