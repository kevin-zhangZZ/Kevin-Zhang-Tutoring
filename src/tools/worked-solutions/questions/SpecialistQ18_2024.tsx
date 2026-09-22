// 2024 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 68% correct.
// Substitute the parametrised line into the plane and solve for the parameter. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 9, C: 14, D: 68 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = 1-2t, \qquad y = 1+t, \qquad z = -2+3t" />,
    reason: 'Reading the components off the vector equation.',
  },
  {
    working: <Katex display tex="3(1-2t)-2(1+t)+4(-2+3t) = 5" />,
    reason: 'Substituting into the plane. This reduces three unknowns to one.',
  },
  {
    working: <Katex display tex="3-6t-2-2t-8+12t = 4t-7" />,
    reason: 'Collecting terms — the t coefficients are −6, −2 and +12.',
  },
  {
    working: <Katex display tex="4t-7 = 5 \implies t = 3" />,
    reason: 'A single value, so the line meets the plane exactly once.',
  },
  {
    working: <Katex display tex="\boxed{(1-6,\ 1+3,\ -2+9) = (-5,\,4,\,7)}" />,
    reason: <>Option <b>D</b>. Substituting back is the free check: <Katex tex="3(-5)-2(4)+4(7) = -15-8+28 = 5" /> ✓ — which also rules out option <b>A</b>, the near-miss chosen by students who slipped a sign.</>,
  },
]

export default function SpecialistQ18_2024() {
  return (
    <MCQShell
      question={
        <p>
          The point of intersection of the line{' '}
          <Katex tex="\underset{\sim}{r} = \underset{\sim}{i}+\underset{\sim}{j}-2\underset{\sim}{k}+t\left(-2\underset{\sim}{i}+\underset{\sim}{j}+3\underset{\sim}{k}\right)" />,
          where <Katex tex="t\in\mathbb{R}" />, and the plane{' '}
          <Katex tex="3x-2y+4z=5" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-5,-1,2)" /> },
        { letter: 'B', content: <Katex tex="(-1,2,1)" /> },
        { letter: 'C', content: <Katex tex="(3,4,1)" /> },
        { letter: 'D', content: <Katex tex="(-5,4,7)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
