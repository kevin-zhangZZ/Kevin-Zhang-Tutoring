// 2024 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 53% correct.
// Every branch of a tangent graph has one point of inflection, at its centre. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 53, B: 19, C: 13, D: 15 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\pi\left(x-\frac14\right) = k\pi,\ k\in Z" />,
    reason: <><Katex tex="y=\tan(\theta)" /> has a point of inflection at the centre of each branch, <Katex tex="\theta=k\pi" />, so set the argument of tan equal to <Katex tex="k\pi" />.</>,
    more: <>At <Katex tex="\theta=k\pi" /> the tan graph changes from concave down to concave up (its gradient is smallest there, 1, and grows on both sides). Calculus confirms it: <Katex tex="\tfrac{d^2}{d\theta^2}\tan(\theta)=2\sec^2(\theta)\tan(\theta)" /> changes sign only where <Katex tex="\tan(\theta)" /> does, at <Katex tex="\theta=k\pi" />. The transformations in <Katex tex="y=2-\tan(\ldots)" /> — a reflection in the <Katex tex="x" />-axis and a translation up 2 — flip and lift the graph but keep each inflection at the centre of its branch.</>,
  },
  {
    working: <Katex display tex="x-\frac14 = k \implies x = k+\frac14" />,
    reason: <>Dividing by <Katex tex="\pi" />.</>,
    more: <>Equivalently: the period is <Katex tex="\tfrac{\pi}{\pi}=1" /> and the graph is translated <Katex tex="\tfrac14" /> right, so the inflections sit one unit apart starting from <Katex tex="x=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="y = 2-\tan(k\pi) = 2-0 = 2" />,
    reason: <>Substitute back: <Katex tex="\tan(k\pi)=0" />, so every inflection is at height 2. That rules out options <b>C</b> and <b>D</b>.</>,
    more: <>The height is the vertical translation, <Katex tex="+2" />; the minus sign belongs to the tan term only, so it reflects the curve but does not make the 2 negative. Note that option <b>D</b>'s <Katex tex="x" />-values, <Katex tex="k-\tfrac34=(k-1)+\tfrac14" />, are the same set as option A's — D is wrong only in its height.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(k+\tfrac14,\ 2\right),\ k\in Z}" />,
    reason: <>Matches option <b>A</b>; option <b>B</b>'s <Katex tex="x" />-values are the asymptotes.</>,
    more: <>The asymptotes are where <Katex tex="\pi\left(x-\tfrac14\right)=\tfrac{\pi}{2}+k\pi" />, giving <Katex tex="x=k+\tfrac34" />. Option <b>B</b>'s <Katex tex="x" />-values, <Katex tex="k-\tfrac14=(k-1)+\tfrac34" />, are the same set, and the graph has no points at all there.</>,
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
        { letter: 'A', content: <Katex tex="\left(k+\tfrac14,\,2\right),\ k\in Z" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left(k-\tfrac14,\,2\right),\ k\in Z" /> },
        { letter: 'C', content: <Katex tex="\left(k+\tfrac14,\,-2\right),\ k\in Z" /> },
        { letter: 'D', content: <Katex tex="\left(k-\tfrac34,\,-2\right),\ k\in Z" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
