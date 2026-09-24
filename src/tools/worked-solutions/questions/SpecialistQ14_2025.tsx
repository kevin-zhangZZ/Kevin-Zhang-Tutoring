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
  comment: (
    <>
      Use the definitions of vectors
      <br />
      <Katex tex="\underset{\sim}{a}\cdot \underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos(\theta)" />
      <br />
      <Katex tex="\underset{\sim}{a}\times \underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\sin(\theta)" />
      <br />
      <em>Equating gives</em>
      <br />
      <Katex tex="\cos(\theta)=|\sin(\theta)|" />
      <br />
      <Katex tex="\tan(\theta)=1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = |\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta \qquad |\underset{\sim}{a}\times\underset{\sim}{b}| = |\underset{\sim}{a}||\underset{\sim}{b}|\sin\theta" />,
    reason: <>Standard formulas, where <Katex tex="\theta" /> is the angle between <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, <Katex tex="\theta\in[0,\pi]" /> (so <Katex tex="\sin\theta\geq0" /> always).</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta = |\underset{\sim}{a}||\underset{\sim}{b}|\sin\theta" />,
    reason: <>Set the two given quantities equal.</>,
  },
  {
    working: <Katex display tex="\cos\theta = \sin\theta \;\implies\; \tan\theta = 1" />,
    reason: <>Divide through by <Katex tex="|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" /> (non-zero, since both vectors are non-zero and the equality forces <Katex tex="\cos\theta\geq0" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \tfrac{\pi}{4}}" />,
    reason: <>The only solution in <Katex tex="[0,\pi]" /> with <Katex tex="\cos\theta=\sin\theta" /> and both positive . Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ14_2025() {
  return (
    <MCQShell
      question={
        <p>
          For non-zero vectors <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, if{' '}
          <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = |\underset{\sim}{a}\times\underset{\sim}{b}|" />, then the angle between <Katex tex="\underset{\sim}{a}" /> and{' '}
          <Katex tex="\underset{\sim}{b}" /> is
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
