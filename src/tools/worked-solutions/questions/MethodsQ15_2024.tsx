// 2024 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 53% correct.
// Every branch of a tangent graph has one point of inflection, at its centre. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 53, B: 19, C: 13, D: 15 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \tan(\theta) \text{ has a point of inflection wherever } \theta = k\pi,\ k\in\mathbb{Z}" />,
    reason: 'The centre of each branch — the one place a tangent curve stops curving one way and starts curving the other. No calculus needed if you know the shape.',
  },
  {
    working: <Katex display tex="\pi\left(x-\frac14\right) = k\pi" />,
    reason: 'Setting the argument to a multiple of π.',
  },
  {
    working: <Katex display tex="x-\frac14 = k \implies x = k+\frac14" />,
    reason: <>Dividing by <Katex tex="\pi" />. Equivalently, the period is <Katex tex="\tfrac{\pi}{\pi}=1" />, so the inflections sit one unit apart starting from <Katex tex="x=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="y = 2-\tan(k\pi) = 2-0 = 2" />,
    reason: <>At every inflection the tangent term vanishes, so the height is the same each time. Options <b>C</b> and <b>D</b> take <Katex tex="-2" />, dropping the fact that the graph is <Katex tex="2" /> <em>minus</em> the tangent.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(k+\tfrac14,\ 2\right),\ k\in\mathbb{Z}}" />,
    reason: <>Option <b>A</b>. Option <b>B</b> uses <Katex tex="k-\tfrac14" />, which is the <em>asymptote</em> pattern shifted — the asymptotes are actually at <Katex tex="x=k+\tfrac34" />.</>,
  },
]

export default function MethodsQ15_2024() {
  return (
    <MCQShell
      question={
        <p>
          The points of inflection of the graph of{' '}
          <Katex tex="y=2-\tan\!\left(\pi\left(x-\tfrac14\right)\right)" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(k+\tfrac14,\,2\right),\ k\in\mathbb{Z}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left(k-\tfrac14,\,2\right),\ k\in\mathbb{Z}" /> },
        { letter: 'C', content: <Katex tex="\left(k+\tfrac14,\,-2\right),\ k\in\mathbb{Z}" /> },
        { letter: 'D', content: <Katex tex="\left(k-\tfrac34,\,-2\right),\ k\in\mathbb{Z}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
