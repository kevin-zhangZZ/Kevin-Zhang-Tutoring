// 2025 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 38% correct. This
// year's paper used four options (A–D) rather than five. Which graph is consistent with a
// given inequality between two definite integrals. Question text and diagrams transcribed
// from the original paper (schematic redrawings capturing the same shape and sign pattern as
// the originals). Solution is original.

import type { ReactNode } from 'react'
import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

function Axes({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 170 120" className="w-full max-w-[170px]">
      <line x1="8" y1="60" x2="160" y2="60" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
      <line x1="20" y1="110" x2="20" y2="10" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
      {[1, 2, 3, 4].map(n => (
        <line key={n} x1={20 + n * 30} y1="57" x2={20 + n * 30} y2="63" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
      ))}
      {children}
    </svg>
  )
}

const OPT_A = <Axes><path d="M 20 30 Q 65 95 110 95 Q 140 95 155 45" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-600 dark:text-sky-400" /></Axes>
const OPT_B = (
  <Axes>
    <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-300" />
    <circle cx="80" cy="40" r="3" className="fill-gray-600 dark:fill-gray-300" />
    <circle cx="80" cy="80" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600 dark:text-gray-300" />
    <path d="M 80 80 L 130 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-300" />
  </Axes>
)
const OPT_C = (
  <Axes>
    <path d="M 20 100 L 80 25" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-300" />
    <circle cx="80" cy="25" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600 dark:text-gray-300" />
    <circle cx="80" cy="45" r="3" className="fill-gray-600 dark:fill-gray-300" />
    <line x1="80" y1="45" x2="140" y2="45" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-300" />
  </Axes>
)
const OPT_D = <Axes><path d="M 20 15 Q 35 60 50 85 Q 70 100 90 65 Q 100 45 115 55 Q 130 65 140 100" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-300" /></Axes>

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
    reason: <>A: an upward parabola crossing the <Katex tex="x" />-axis near <Katex tex="x=1" /> and <Katex tex="x=3" />, dipping <b>below</b> the axis in between — so <Katex tex="f<0" /> throughout <Katex tex="(1,3)\supset[2,3]" />. ✓</>,
  },
  {
    working: OPT_B,
    reason: <>B: mostly positive on <Katex tex="[2,3]" /> (rising from near zero up through positive values). Doesn't satisfy the condition.</>,
  },
  {
    working: OPT_C,
    reason: <>C: constant and clearly positive on <Katex tex="[2,3]" />. Doesn't satisfy the condition.</>,
  },
  {
    working: OPT_D,
    reason: <>D: positive (a small hump above the axis) on most of <Katex tex="[2,3]" />. Doesn't satisfy the condition.</>,
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
