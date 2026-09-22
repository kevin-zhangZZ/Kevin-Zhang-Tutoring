// 2025 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 49% correct. This
// year's paper used four options (A–D) rather than five. Finding unknown constants from where
// two 3D lines intersect. Question text transcribed from the original paper. Solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 23, C: 19, D: 49 },
  answer: 'D',
  comment: <>Knowing the lines intersect at the point <Katex tex="(4,3,t)" /> allows simultaneous equations to be solved.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r_1}(\lambda) = (2+\lambda)\underset{\sim}{i} + (r-\lambda)\underset{\sim}{j} + (-3+4\lambda)\underset{\sim}{k}" />,
    reason: <>Expand <Katex tex="\underset{\sim}{r_1}(\lambda)=2\underset{\sim}{i}+r\underset{\sim}{j}-3\underset{\sim}{k}+\lambda(\underset{\sim}{i}-\underset{\sim}{j}+4\underset{\sim}{k})" /> component-wise.</>,
  },
  {
    working: <Katex display tex="2+\lambda = 4 \;\implies\; \lambda=2" />,
    reason: <>Match the <Katex tex="x" />-coordinate to the given intersection point (4, 3, t).</>,
  },
  {
    working: <Katex display tex="r - \lambda = 3 \;\implies\; r = 3+2 = 5" />,
    reason: <>Match the <Katex tex="y" />-coordinate.</>,
  },
  {
    working: <Katex display tex="t = -3+4\lambda = -3+8 = 5" />,
    reason: <>Match the <Katex tex="z" />-coordinate.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r_2}(\mu) = (1+\mu)\underset{\sim}{i} + \mu\underset{\sim}{j} + (s-\mu)\underset{\sim}{k}" />,
    reason: <>Now expand <Katex tex="\underset{\sim}{r_2}(\mu)=\underset{\sim}{i}+s\underset{\sim}{k}+\mu(\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k})" />.</>,
  },
  {
    working: <Katex display tex="1+\mu = 4 \;\implies\; \mu=3 \qquad (\text{check: } \mu=3 \text{ matches } y=3\ \checkmark)" />,
    reason: <>Match the <Katex tex="x" />-coordinate, then confirm consistency against <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\boxed{s-\mu = t \;\implies\; s = t+\mu = 5+3 = 8}" />,
    reason: <>Match the <Katex tex="z" />-coordinate — so <Katex tex="r=5" />, <Katex tex="s=8" />, <Katex tex="t=5" />, matching option <b>D</b>.</>,
  },
]

export default function SpecialistQ18_2025() {
  return (
    <MCQShell
      question={
        <p>
          The lines given by <Katex tex="\underset{\sim}{r_1}(\lambda) = 2\underset{\sim}{i}+r\underset{\sim}{j}-3\underset{\sim}{k}+\lambda(\underset{\sim}{i}-\underset{\sim}{j}+4\underset{\sim}{k})" />{' '}
          and <Katex tex="\underset{\sim}{r_2}(\mu) = \underset{\sim}{i}+s\underset{\sim}{k}+\mu(\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k})" /> intersect at the point{' '}
          <Katex tex="(4,3,t)" />, where <Katex tex="\lambda,\mu\in\mathbb{R}" /> and <Katex tex="r" />, <Katex tex="s" />{' '}
          and <Katex tex="t" /> are real constants.
          <br />
          The values of <Katex tex="r" />, <Katex tex="s" /> and <Katex tex="t" /> respectively are
        </p>
      }
      options={[
        { letter: 'A', content: '2, 3 and 5' },
        { letter: 'B', content: '5, 3 and 5' },
        { letter: 'C', content: '5, 5 and 8' },
        { letter: 'D', content: '5, 8 and 5', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
