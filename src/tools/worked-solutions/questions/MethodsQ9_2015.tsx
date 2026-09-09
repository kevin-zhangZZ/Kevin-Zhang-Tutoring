// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 9. VCAA examination report: 37% correct.
// Find E(X) for a uniform distribution once the unknown upper endpoint is pinned down by the
// total-area-equals-1 condition. Question text transcribed from the original paper; solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 37, C: 21, D: 15, E: 9 },
  answer: 'B',
  noAnswer: 1,
  comment: <>Solve <Katex tex="\int_2^a \tfrac16\,dx=1" /> for <Katex tex="a" />: <Katex tex="a=8" />. Then <Katex tex="\mathrm{E}(X) = \int_2^8 \tfrac{x}{6}\,dx = 5" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <UniformPdfDiagram />
      </div>
    ),
    reason: <>The graph shows a constant density <Katex tex="\tfrac16" /> from <Katex tex="x=2" /> to some unknown <Katex tex="x=a" />.</>,
  },
  {
    working: <Katex display tex="\int_2^a \frac16\,dx = 1" />,
    reason: 'Total area under any probability density function must equal 1.',
  },
  {
    working: (
      <>
        <Katex display tex="\frac{a-2}{6} = 1" />
        <Katex display tex="\implies\; a=8" />
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \mathrm{E}(X) &= \frac{2+8}{2} \\ &= 5 \end{aligned}" />,
    reason: <>For a <em>uniform</em> distribution, the mean is always exactly halfway between the endpoints — no integration needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = 5}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ9_2015() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit mb-3">
            <UniformPdfDiagram />
          </div>
          <p>
            The graph of the probability density function of a continuous random variable,{' '}
            <Katex tex="X" />, is shown above. If <Katex tex="a>2" />, then <Katex tex="\mathrm{E}(X)" /> is
            equal to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="8" /> },
        { letter: 'B', content: <Katex tex="5" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}

// A constant-height rectangle from x=2 to x=a=8, height 1/6 — the uniform pdf.
function UniformPdfDiagram() {
  const ox = 30
  const oy = 140
  const scale = 26
  const x2 = ox + 2 * scale
  const xa = ox + 8 * scale
  const h = 90
  return (
    <svg viewBox="0 0 260 160" width={260} height={160}>
      <line x1={0} y1={oy} x2={250} y2={oy} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={ox} y1={10} x2={ox} y2={oy} stroke="#9ca3af" strokeWidth={1.5} />
      <text x={228} y={oy + 14} fontSize={11} className="fill-gray-500 dark:fill-gray-400">x</text>
      <text x={ox - 20} y={oy - h - 4} fontSize={11} className="fill-gray-500 dark:fill-gray-400">1/6</text>

      <line x1={x2} y1={oy} x2={x2} y2={oy - h} stroke="#9ca3af" strokeWidth={1} strokeDasharray="3 3" />
      <line x1={x2} y1={oy - h} x2={xa} y2={oy - h} stroke="#38bdf8" strokeWidth={2.5} />
      <line x1={x2} y1={oy} x2={x2} y2={oy - h} stroke="#38bdf8" strokeWidth={2.5} />
      <line x1={xa} y1={oy} x2={xa} y2={oy - h} stroke="#38bdf8" strokeWidth={2.5} />

      <text x={x2 - 4} y={oy + 14} fontSize={11} className="fill-gray-700 dark:fill-gray-300">2</text>
      <text x={xa - 4} y={oy + 14} fontSize={11} className="fill-rose-600 dark:fill-rose-400">a</text>
    </svg>
  )
}
