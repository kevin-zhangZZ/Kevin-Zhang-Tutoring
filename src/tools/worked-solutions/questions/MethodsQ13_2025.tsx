// 2025 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 45% correct. This
// year's paper used four options (A–D) rather than five. Identifying the graph of (g∘f)(x)
// from sketches of f and g alone, using the standard trick of substituting concrete functions
// with matching qualitative shape. Question text transcribed from the original paper; the
// stem graph and all four option graphs are cropped directly from the original VCAA exam PDF,
// not redrawings. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2025-mcq13-report-graph.png'
import stemSrc from './meth-2025-mcq13-stem.png'
import optASrc from './meth-2025-mcq13-optA.png'
import optBSrc from './meth-2025-mcq13-optB.png'
import optCSrc from './meth-2025-mcq13-optC.png'
import optDSrc from './meth-2025-mcq13-optD.png'

const STEM = <img loading="lazy" decoding="async" src={stemSrc} alt="Graphs of y=f(x), a line through the origin with negative gradient, and y=g(x), a W-shaped quartic through the origin, from the original 2025 VCAA exam paper" className="w-full max-w-[320px]" />
const OPT_A = <img loading="lazy" decoding="async" src={optASrc} alt="Option A: a W-shaped quartic symmetric about the y-axis, meeting at the origin" className="w-full max-w-[300px]" />
const OPT_B = <img loading="lazy" decoding="async" src={optBSrc} alt="Option B: an M-shaped quartic (ends pointing down) with two humps above the x-axis" className="w-full max-w-[300px]" />
const OPT_C = <img loading="lazy" decoding="async" src={optCSrc} alt="Option C: a W-shaped quartic, asymmetric, shifted toward negative x" className="w-full max-w-[300px]" />
const OPT_D = <img loading="lazy" decoding="async" src={optDSrc} alt="Option D: an M-shaped quartic (ends pointing down) with two humps of different heights" className="w-full max-w-[300px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 17, C: 45, D: 25 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="(g\circ f)(x)=g(f(x))=g(-kx)" />, where <Katex tex="k\in R^+" />
      <br />
      The graph of <Katex tex="g" /> has been reflected in the <Katex tex="y" />-axis and dilated
      by a factor of <Katex tex="\dfrac{1}{k}" /> from the <Katex tex="y" />-axis. Option C is the
      only graph developed through these transformations.
      <br />
      OR
      <br />
      Try sensible functions with similar characteristic curves for the rules; for example, let{' '}
      <Katex tex="g(x)=x(x+1)(x-1)(x-2)" /> and <Katex tex="f(x)=-x" /> and then sketch{' '}
      <Katex tex="y=(g\circ f)(x)=x(x-1)(x+1)(x+2)" />.
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph of y = x(x − 1)(x + 1)(x + 2): a W-shaped quartic crossing the x-axis at −2, −1, 0 and 1" className="w-full max-w-[360px] mt-1" />
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
    reason: <>Any formulas with the right shapes will do: a different negative gradient only stretches the answer sideways. This <Katex tex="g" /> fits the sketch: one negative root, a root at <Katex tex="0" />, then two positive roots.</>,
    more: <>Why a particular choice is safe: every line through the origin with negative gradient is <Katex tex="f(x)=-kx" /> for some <Katex tex="k>0" />, so <Katex tex="(g\circ f)(x)=g(-kx)" />. That is the graph of <Katex tex="g" /> reflected in the <Katex tex="y" />-axis and then dilated by a factor of <Katex tex="\tfrac1k" /> from the <Katex tex="y" />-axis, which is the report&apos;s first method. The dilation only stretches or squeezes sideways, so the <i>shape</i> is the same for every <Katex tex="k" />, and taking <Katex tex="k=1" /> loses nothing.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}(g\circ f)(x) &= g(-x)\\ &= (-x)(-x+1)(-x-1)(-x-2)\end{aligned}"
      />
    ),
    reason: <><Katex tex="(g\circ f)(x)" /> means <Katex tex="g(f(x))" />: <Katex tex="f" /> acts first, so replace every <Katex tex="x" /> in <Katex tex="g" /> by <Katex tex="f(x)=-x" />.</>,
  },
  {
    working: <Katex display tex="= (-x)(1-x)(x+1)(x+2)" />,
    reason: <>Simplify <Katex tex="(-x-1)=-(x+1)" /> and <Katex tex="(-x-2)=-(x+2)" />: the two sign flips cancel each other.</>,
  },
  {
    working: <Katex display tex="\boxed{(g\circ f)(x) = x(x-1)(x+1)(x+2)}" />,
    reason: <>Rewrite <Katex tex="(-x)(1-x)=x(x-1)" />. Roots at <Katex tex="-2,-1,0,1" />: two negative, <Katex tex="0" /> and one positive. So the local maximum lies between <Katex tex="-1" /> and <Katex tex="0" />.</>,
    more: <>These are <Katex tex="g" />&apos;s roots <Katex tex="-1,0,1,2" /> with their signs flipped, exactly what a reflection in the <Katex tex="y" />-axis does. The turning points flip too: <Katex tex="g" />&apos;s local maximum is just to the <i>right</i> of the origin, so the local maximum of <Katex tex="y=(g\circ f)(x)" /> is just to the <i>left</i>.</>,
  },
  {
    working: <>This is a product of four linear factors, so the leading term is <Katex tex="x^4" /> with a <b>positive</b> coefficient — the graph must rise to <Katex tex="+\infty" /> at <i>both</i> ends (a "W"-family shape), never dropping away at either end.</>,
    reason: <>Rules out <b>B</b> and <b>D</b>: both fall away downward at the far left and right ("M" shapes), which needs a negative leading coefficient.</>,
  },
  {
    working: <>Between the two remaining "W"-shaped candidates: <b>A</b> is symmetric about the <Katex tex="y" />-axis (its roots and dip-depths mirror each other either side of <Katex tex="x=0" />); <b>C</b> is visibly asymmetric, shifted toward negative <Katex tex="x" />.</>,
    reason: <>The roots <Katex tex="-2,-1,0,1" /> are <i>not</i> symmetric about <Katex tex="x=0" />, so the graph can&apos;t be symmetric either. Rules out <b>A</b>.</>,
  },
  {
    working: OPT_C,
    reason: <>Matches option <b>C</b>: a "W" with roots like <Katex tex="-2,-1,0,1" /> and its local maximum between <Katex tex="-1" /> and <Katex tex="0" />.</>,
    more: <>
      Where the wrong answers come from:
      <br />• <b>D</b> (25%, the most common wrong answer) is the graph of <Katex tex="y=-g(x)" />: <Katex tex="g" /> reflected in the <Katex tex="x" />-axis, still with roots <Katex tex="-1,0,1,2" />. That is <Katex tex="(f\circ g)(x)=f(g(x))" />, the composition done in the wrong order. In <Katex tex="g\circ f" />, <Katex tex="f" /> acts on <Katex tex="x" /> first, so it moves the graph <i>sideways</i> (a reflection in the <Katex tex="y" />-axis), not up and down.
      <br />• <b>B</b> is <b>C</b> turned upside down: the right roots, but a negative leading coefficient.
      <br />• <b>A</b> is symmetric about the <Katex tex="y" />-axis, which would need the roots to come in <Katex tex="\pm" /> pairs.
    </>,
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
