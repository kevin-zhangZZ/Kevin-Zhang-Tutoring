// 2025 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 45% correct. This
// year's paper used four options (A–D) rather than five. Identifying the graph of (g∘f)(x)
// from sketches of f and g alone, using the standard trick of substituting concrete functions
// with matching qualitative shape. Question text transcribed from the original paper; the
// stem graph and all four option graphs are cropped directly from the original VCAA exam PDF,
// not redrawings. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2025-mcq13-stem.png'
import optASrc from './meth-2025-mcq13-optA.png'
import optBSrc from './meth-2025-mcq13-optB.png'
import optCSrc from './meth-2025-mcq13-optC.png'
import optDSrc from './meth-2025-mcq13-optD.png'

const STEM = <img src={stemSrc} alt="Graphs of y=f(x), a line through the origin with negative gradient, and y=g(x), a W-shaped quartic through the origin, from the original 2025 VCAA exam paper" className="w-full max-w-[320px]" />
const OPT_A = <img src={optASrc} alt="Option A: a W-shaped quartic symmetric about the y-axis, meeting at the origin" className="w-full max-w-[300px]" />
const OPT_B = <img src={optBSrc} alt="Option B: an M-shaped quartic (ends pointing down) with two humps above the x-axis" className="w-full max-w-[300px]" />
const OPT_C = <img src={optCSrc} alt="Option C: a W-shaped quartic, asymmetric, shifted toward negative x" className="w-full max-w-[300px]" />
const OPT_D = <img src={optDSrc} alt="Option D: an M-shaped quartic (ends pointing down) with two humps of different heights" className="w-full max-w-[300px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 17, C: 45, D: 25 },
  answer: 'C',
  comment: (
    <>
      Try sensible functions with similar characteristic curves, e.g. <Katex tex="g(x)=x(x+1)(x-1)(x-2)" /> and{' '}
      <Katex tex="f(x)=-x" />, then sketch <Katex tex="y=(g\circ f)(x) = x(x-1)(x+1)(x+2)" />. Option C is the only
      graph developed through these transformations.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: STEM,
    reason: <><Katex tex="f" /> is a straight line through the origin with negative gradient; <Katex tex="g" /> is a quartic ("W"-shaped) also passing through the origin, with a local max between two local minima.</>,
  },
  {
    working: <>Since only the <i>shapes</i> are given (not formulas), pick concrete functions with matching shapes: let <Katex tex="g(x)=x(x+1)(x-1)(x-2)" /> (roots at <Katex tex="-1,0,1,2" />, a W-shape through the origin) and <Katex tex="f(x)=-x" /> (a line through the origin with negative gradient).</>,
    reason: 'Standard technique for "identify the composite from a sketch" questions — the specific choice doesn\'t matter as long as the qualitative shape matches.',
  },
  {
    working: <Katex display tex="(g\circ f)(x) = g(-x) = (-x)(-x+1)(-x-1)(-x-2)" />,
    reason: 'Substitute f(x) = −x into g.',
  },
  {
    working: <Katex display tex="= (-x)(1-x)(x+1)(x+2)" />,
    reason: <>Simplify <Katex tex="(-x-1)=-(x+1)" /> and <Katex tex="(-x-2)=-(x+2)" /> — the two sign flips cancel each other.</>,
  },
  {
    working: <Katex display tex="\boxed{(g\circ f)(x) = x(x-1)(x+1)(x+2)}" />,
    reason: <>Rewrite <Katex tex="(-x)(1-x)=x(x-1)" />. Roots at <Katex tex="-2,-1,0,1" /> — three non-positive and only one positive, so <b>not</b> symmetric about the <Katex tex="y" />-axis.</>,
  },
  {
    working: <>This is a product of four linear factors, so the leading term is <Katex tex="x^4" /> with a <b>positive</b> coefficient — the graph must rise to <Katex tex="+\infty" /> at <i>both</i> ends (a "W"-family shape), never dropping away at either end.</>,
    reason: <>Immediately rules out <b>B</b> and <b>D</b> — both curve back downward at the far left and right ends ("M"-family shapes), which would mean a negative leading coefficient instead.</>,
  },
  {
    working: <>Between the two remaining "W"-shaped candidates: <b>A</b> is symmetric about the <Katex tex="y" />-axis (its roots and dip-depths mirror each other either side of <Katex tex="x=0" />); <b>C</b> is visibly asymmetric, shifted toward negative <Katex tex="x" />.</>,
    reason: <>The roots <Katex tex="-2,-1,0,1" /> are <i>not</i> symmetric about <Katex tex="x=0" /> (three of the four roots are negative or zero) — so the graph can't be symmetric either. Rules out <b>A</b>.</>,
  },
  {
    working: OPT_C,
    reason: <>Matches option <b>C</b> — the only "W"-family graph that's also visibly asymmetric, shifted toward negative <Katex tex="x" />, consistent with roots <Katex tex="-2,-1,0,1" />.</>,
  },
]

export default function MethodsQ13_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=g(x)" /> are sketched on the same set of axes below.</p>
          <p>Which of the following could be the graph of <Katex tex="y=(g\circ f)(x)" />?</p>
        </>
      }
      diagram={STEM}
      options={[
        { letter: 'A', content: OPT_A },
        { letter: 'B', content: OPT_B },
        { letter: 'C', content: OPT_C, isAnswer: true },
        { letter: 'D', content: OPT_D },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
