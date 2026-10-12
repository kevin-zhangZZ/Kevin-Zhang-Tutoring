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

const OPT_A = <img loading="lazy" decoding="async" src={optASrc} alt="Option A: an upward-opening curve, negative between roughly x=1 and x=3" className="w-full max-w-[220px]" />
const OPT_B = <img loading="lazy" decoding="async" src={optBSrc} alt="Option B: a horizontal segment then a steep discontinuous line rising from below the axis at x=2 through positive values" className="w-full max-w-[220px]" />
const OPT_C = <img loading="lazy" decoding="async" src={optCSrc} alt="Option C: a rising line then a discontinuous horizontal segment, constant and positive from x=2 onward" className="w-full max-w-[220px]" />
const OPT_D = <img loading="lazy" decoding="async" src={optDSrc} alt="Option D: a wiggling curve, negative near x=1, positive with a small hump between roughly x=2 and x=3" className="w-full max-w-[220px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 38, B: 20, C: 17, D: 24 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\displaystyle\int_1^2 f(x)\,dx>\int_1^3 f(x)\,dx" />
      <br />
      <Katex tex="\displaystyle\int_1^2 f(x)\,dx-\int_1^3 f(x)\,dx>0" />
      <br />
      <Katex tex="\displaystyle\int_1^2 f(x)\,dx-\left(\int_1^2 f(x)\,dx+\int_2^3 f(x)\,dx\right)>0" />
      <br />
      <Katex tex="\displaystyle\int_2^3 f(x)\,dx<0" />
      <br />
      The only graph for which the integral <Katex tex="\displaystyle\int_2^3 f(x)\,dx" /> is
      negative is Option A.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^2 f(x)\,dx > \int_1^3 f(x)\,dx" />,
    reason: <>The given condition.</>,
  },
  {
    working: <Katex display tex="\int_1^2 f(x)\,dx - \left(\int_1^2 f(x)\,dx + \int_2^3 f(x)\,dx\right) > 0" />,
    reason: <>Move everything to one side, then split <Katex tex="\int_1^3" /> at <Katex tex="x=2" />: integrals over adjacent intervals add.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_2^3 f(x)\,dx < 0}" />,
    reason: <>The <Katex tex="\int_1^2" /> terms cancel, so the condition is only about the signed area between <Katex tex="x=2" /> and <Katex tex="x=3" />.</>,
    more: <>In words: integrating from 1 to 3 instead of 1 to 2 adds on the piece <Katex tex="\int_2^3 f(x)\,dx" />. For the total to go <i>down</i>, that added piece must be negative. It is a <i>signed</i> area: <Katex tex="f" /> could rise above the axis somewhere in <Katex tex="[2,3]" /> as long as the area below the axis there is bigger overall.</>,
  },
  {
    working: <>Check each option for whether <Katex tex="\int_2^3 f(x)\,dx<0" />:</>,
    reason: <>Only the graph on <Katex tex="[2,3]" /> matters; its shape on <Katex tex="[1,2]" /> is irrelevant because that part cancelled.</>,
  },
  {
    working: OPT_A,
    reason: <>A: <Katex tex="x" />-intercepts at <Katex tex="x=1" /> and <Katex tex="x=3" />, below the axis between them, so <Katex tex="f<0" /> on <Katex tex="[2,3)" /> and the integral is negative. ✓</>,
  },
  {
    working: OPT_B,
    reason: <>B: negative just after <Katex tex="x=2" />, but crosses the axis near <Katex tex="x\approx2.3" />; the triangle above is wider and taller than the one below, so <Katex tex="\int_2^3 f(x)\,dx>0" />. ✗</>,
    more: <>The line starts below the axis at the open circle and, by <Katex tex="x=3" />, is about twice as far above it. So the triangle below the axis (width about <Katex tex="\tfrac13" />) is much smaller than the triangle above it (width about <Katex tex="\tfrac23" />, twice as tall): roughly four times as much area above as below. The filled dot at <Katex tex="x=2" /> is a single point and does not change the integral. B also has a large positive <Katex tex="\int_1^2 f(x)\,dx" />, which may look like it makes the left side bigger, but that part appears on both sides and cancels.</>,
  },
  {
    working: OPT_C,
    reason: <>C: constant and positive across all of <Katex tex="[2,3]" />, so <Katex tex="\int_2^3 f(x)\,dx>0" />. ✗</>,
  },
  {
    working: OPT_D,
    reason: <>D: <Katex tex="x" />-intercepts at <Katex tex="x=2" /> and <Katex tex="x=3" />, <b>above</b> the axis between them, so <Katex tex="\int_2^3 f(x)\,dx>0" />. ✗</>,
    more: <>D is below the axis on <Katex tex="(1,2)" />, which can make it look like a candidate, but that region is part of <i>both</i> integrals. Here <Katex tex="\int_1^3 f(x)\,dx" /> is <Katex tex="\int_1^2 f(x)\,dx" /> plus the positive hump on <Katex tex="[2,3]" />, so it is the <i>larger</i> of the two: the inequality goes the wrong way.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option A}}" />,
    reason: <>Only A has <Katex tex="\int_2^3 f(x)\,dx<0" />. Matches option <b>A</b>.</>,
  },
]

export default function MethodsQ17_2025() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="f:R\to R" /> satisfies{' '}
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
