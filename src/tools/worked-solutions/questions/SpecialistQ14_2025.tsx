// 2025 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 48% correct. This
// year's paper used four options (A–D) rather than five. The angle between two vectors when
// their dot product equals the magnitude of their cross product. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 48, C: 30, D: 5 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\vec a\cdot\vec b = |\vec a||\vec b|\cos\theta \qquad |\vec a\times\vec b| = |\vec a||\vec b|\sin\theta" />,
    reason: <>Standard formulas, where <Katex tex="\theta" /> is the angle between <Katex tex="\vec a" /> and <Katex tex="\vec b" />, <Katex tex="\theta\in[0,\pi]" /> (so <Katex tex="\sin\theta\geq0" /> always).</>,
  },
  {
    working: <Katex display tex="|\vec a||\vec b|\cos\theta = |\vec a||\vec b|\sin\theta" />,
    reason: 'Set the two given quantities equal.',
  },
  {
    working: <Katex display tex="\cos\theta = \sin\theta \;\implies\; \tan\theta = 1" />,
    reason: <>Divide through by <Katex tex="|\vec a||\vec b|\cos\theta" /> (non-zero, since both vectors are non-zero and the equality forces <Katex tex="\cos\theta\geq0" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \tfrac{\pi}{4}}" />,
    reason: <>The only solution in <Katex tex="[0,\pi]" /> with <Katex tex="\cos\theta=\sin\theta" /> and both positive — matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ14_2025() {
  return (
    <MCQShell
      question={
        <p>
          For non-zero vectors <Katex tex="\vec a" /> and <Katex tex="\vec b" />, if{' '}
          <Katex tex="\vec a\cdot\vec b = |\vec a\times\vec b|" />, then the angle between <Katex tex="\vec a" /> and{' '}
          <Katex tex="\vec b" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac{\pi}{4}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac{\pi}{2}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{3\pi}{4}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
