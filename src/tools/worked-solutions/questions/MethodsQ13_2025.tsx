// 2025 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 45% correct. This
// year's paper used four options (A–D) rather than five. Identifying the graph of (g∘f)(x)
// from sketches of f and g alone, using the standard trick of substituting concrete functions
// with matching qualitative shape. Question text and diagrams transcribed from the original
// paper (the worked substitute functions are original, following the same method VCAA's own
// report uses). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const STEM = (
  <svg viewBox="0 0 220 140" className="w-full max-w-[260px]">
    <line x1="15" y1="70" x2="205" y2="70" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
    <line x1="110" y1="130" x2="110" y2="10" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
    <line x1="60" y1="15" x2="165" y2="120" stroke="currentColor" strokeWidth="1.8" className="text-gray-500 dark:text-gray-400" />
    <path d="M 30 25 Q 65 25 90 60 Q 110 85 130 60 Q 155 25 190 25" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-600 dark:text-sky-400" />
    <text x="45" y="15" fontSize="10" className="fill-gray-500 dark:fill-gray-400">f</text>
    <text x="185" y="18" fontSize="10" className="fill-sky-600 dark:fill-sky-400">g</text>
  </svg>
)

const RESULT = (
  <svg viewBox="0 0 220 140" className="w-full max-w-[260px]">
    <line x1="15" y1="70" x2="205" y2="70" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
    <line x1="110" y1="130" x2="110" y2="10" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
    <path d="M 55 20 Q 75 75 95 62 Q 112 52 130 65 Q 150 90 175 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 dark:text-emerald-400" />
  </svg>
)

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
    reason: <>Rewrite <Katex tex="(-x)(1-x)=x(x-1)" />. Roots at <Katex tex="-2,-1,0,1" /> — <b>not</b> symmetric about the <Katex tex="y" />-axis (the roots aren't evenly spread either side of 0).</>,
  },
  {
    working: RESULT,
    reason: <>A "W"-shape whose hump sits just right of centre and whose two dips are at different depths — matches option <b>C</b> (the other options are either fully symmetric, or have the asymmetry the wrong way round).</>,
  },
]

export default function MethodsQ13_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=g(x)" /> are sketched on the same set of axes below.</p>
          <div className="mb-3">{STEM}</div>
          <p>Which of the following could be the graph of <Katex tex="y=(g\circ f)(x)" />?</p>
        </>
      }
      diagram={STEM}
      options={[
        { letter: 'A', content: 'A symmetric W-shape, hump centred exactly on the y-axis, both dips equally deep.' },
        { letter: 'B', content: 'An asymmetric shape with one branch turning back down as x increases.' },
        { letter: 'C', content: RESULT, isAnswer: true },
        { letter: 'D', content: 'An asymmetric W-shape with the two humps at clearly different heights.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
