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
    working: <Katex display tex="f(x) = \underbrace{3}_{\text{amplitude}}\sin\!\left(\underbrace{\tfrac25}_{n}\,x\right)\underbrace{-\,2}_{\text{shift down}}" />,
    reason: <>Read the three numbers that control a sine graph straight off the rule: the amplitude, the coefficient <Katex tex="n" /> of <Katex tex="x" /> inside the sine, and the vertical shift.</>,
  },
  {
    working: <Katex display tex="\text{Period} = \dfrac{2\pi}{n} = \dfrac{2\pi}{2/5} = 2\pi\times\dfrac52 = 5\pi" />,
    reason: <>For <Katex tex="\sin(nx)" /> the period is <Katex tex="\tfrac{2\pi}{n}" />. Dividing by a fraction means multiplying by its reciprocal — the step that produces the wrong answer <Katex tex="\tfrac{5\pi}{2}" /> if the <Katex tex="\tfrac25" /> is accidentally multiplied instead.</>,
  },
  {
    working: (
      <>
        <Katex display tex="-1\le\sin\!\left(\dfrac{2x}{5}\right)\le1" />
        <Katex display tex="-3\le 3\sin\!\left(\dfrac{2x}{5}\right)\le3" />
        <Katex display tex="-5\le 3\sin\!\left(\dfrac{2x}{5}\right)-2\le1" />
      </>
    ),
    reason: <>Build the range up one step at a time: every sine sits between <Katex tex="-1" /> and <Katex tex="1" />; multiplying by <Katex tex="3" /> stretches that to <Katex tex="[-3,3]" />; subtracting <Katex tex="2" /> slides the whole interval down to <Katex tex="[-5,1]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Period} = 5\pi, \ \text{range} = [-5,1]}" />,
    reason: <>Matches option <b>B</b>. Note the range is <em>not</em> <Katex tex="[-3,3]" /> (option A) — that's what it would be without the vertical shift.</>,
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
