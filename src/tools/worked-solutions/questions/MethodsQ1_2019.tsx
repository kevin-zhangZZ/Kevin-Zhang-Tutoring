// 2019 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 89% correct. The
// period and range of a scaled, shifted sine function. Question text transcribed from the
// original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 89, C: 4, D: 4, E: 1 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 3\sin\!\left(\dfrac{2x}{5}\right)-2" />,
  },
  {
    working: <Katex display tex="\text{Period} = \dfrac{2\pi}{2/5} = 5\pi" />,
    reason: <>A sine of the form <Katex tex="\sin(kx)" /> has period <Katex tex="\tfrac{2\pi}{k}" />; here <Katex tex="k=\tfrac25" />.</>,
  },
  {
    working: <Katex display tex="-1\le\sin\!\left(\dfrac{2x}{5}\right)\le1 \;\implies\; -3\le3\sin\!\left(\dfrac{2x}{5}\right)\le3 \;\implies\; -5\le f(x)\le1" />,
    reason: <>Amplitude <Katex tex="3" />, then shift down <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Period} = 5\pi, \ \text{range} = [-5,1]}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ1_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=3\sin\!\left(\dfrac{2x}{5}\right)-2" />. The
          period and range of <Katex tex="f" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="5\pi \text{ and } [-3,3]" /> },
        { letter: 'B', content: <Katex tex="5\pi \text{ and } [-5,1]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="5\pi \text{ and } [-1,5]" /> },
        { letter: 'D', content: <Katex tex="\tfrac{5\pi}{2} \text{ and } [-5,1]" /> },
        { letter: 'E', content: <Katex tex="\tfrac{5\pi}{2} \text{ and } [-3,3]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
