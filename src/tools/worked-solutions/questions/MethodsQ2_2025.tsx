// 2025 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 51% correct.
// Asymptotes of a tangent graph, written as a general solution. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 51, B: 10, C: 21, D: 18 },
  answer: 'A',
  comment: <>The period is 1. The general solution for the equations of the asymptotes follows from it.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\theta) \text{ is undefined when } \theta = \frac{\pi}{2}+k\pi, \ k\in\mathbb{Z}" />,
    reason: 'Every asymptote of a tangent graph comes from this one condition.',
  },
  {
    working: <Katex display tex="\pi\left(x+\tfrac12\right) = \frac{\pi}{2}+k\pi" />,
    reason: 'Setting the argument equal to it.',
  },
  {
    working: <Katex display tex="x+\tfrac12 = \tfrac12+k \implies x = k" />,
    reason: <>Dividing by <Katex tex="\pi" />. The <Katex tex="+\tfrac12" /> inside exactly cancels the <Katex tex="\tfrac12" /> from the tangent's own offset.</>,
  },
  {
    working: <Katex display tex="\text{check the period: } \frac{\pi}{\pi} = 1" />,
    reason: <>Asymptotes are one period apart, so consecutive integers is exactly right. Option <b>B</b> spaces them 2 apart and <b>C</b> keeps only the odd ones.</>,
  },
  {
    working: <Katex display tex="\boxed{x = k, \quad k\in\mathbb{Z}}" />,
    reason: <>Option <b>A</b>. A quick sanity check: at <Katex tex="x=0" /> the argument is <Katex tex="\tfrac{\pi}{2}" />, so there really is an asymptote there.</>,
  },
]

export default function MethodsQ2_2025() {
  return (
    <MCQShell
      question={
        <p>
          All asymptotes of the graph of{' '}
          <Katex tex="y=2\tan\!\left(\pi\left(x+\tfrac12\right)\right)" /> are given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=k,\ k\in\mathbb{Z}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="x=2k,\ k\in\mathbb{Z}" /> },
        { letter: 'C', content: <Katex tex="x=2k+1,\ k\in\mathbb{Z}" /> },
        { letter: 'D', content: <Katex tex="x=\frac{4k+1}{2},\ k\in\mathbb{Z}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
