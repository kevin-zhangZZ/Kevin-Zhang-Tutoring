// 2016 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 41% correct.
// Derive ∫xe^(kx)dx from a given derivative identity, via integration by parts in disguise.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 16, C: 9, D: 41, E: 21 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\bigl(xe^{kx}\bigr) = (kx+1)e^{kx}" />,
    reason: 'The given identity — the starting point for the whole derivation.',
  },
  {
    working: <Katex display tex="xe^{kx} = \int (kx+1)e^{kx}\,dx" />,
    reason: 'Integrate both sides — the fundamental theorem of calculus undoes the derivative on the left.',
  },
  {
    working: (
      <>
        <Katex display tex="\int (kx+1)e^{kx}\,dx = k\int xe^{kx}\,dx + \int e^{kx}\,dx" />
        <Katex display tex="\implies\; xe^{kx} = k\int xe^{kx}\,dx + \int e^{kx}\,dx" />
      </>
    ),
    reason: 'Split the integral on the right into the two separate pieces the question is after.',
  },
  {
    working: <Katex display tex="k\int xe^{kx}\,dx = xe^{kx} - \int e^{kx}\,dx" />,
    reason: <>Rearrange to isolate <Katex tex="\int xe^{kx}\,dx" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int xe^{kx}\,dx = \frac{1}{k}\left(xe^{kx} - \int e^{kx}\,dx\right) + c}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ9_2016() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\dfrac{d}{dx}\bigl(xe^{kx}\bigr) = (kx+1)e^{kx}" />, then{' '}
          <Katex tex="\displaystyle\int xe^{kx}\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="xe^{kx}+c" /> },
        { letter: 'B', content: <Katex tex="\left(\dfrac{kx+1}{k}\right)e^{kx}+c" /> },
        { letter: 'C', content: <Katex tex="\dfrac1k\displaystyle\int e^{kx}\,dx" /> },
        { letter: 'D', content: <Katex tex="\dfrac1k\left(xe^{kx}-\displaystyle\int e^{kx}\,dx\right)+c" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{1}{k^2}\left(xe^{kx}-e^{kx}\right)+c" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
