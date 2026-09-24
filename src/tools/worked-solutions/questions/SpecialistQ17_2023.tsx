// 2023 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 73% correct.
// A cross product matched component by component. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 8, C: 73, D: 6, E: 7 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\times\underset{\sim}{b} = \begin{vmatrix}\underset{\sim}{i}&\underset{\sim}{j}&\underset{\sim}{k}\\\alpha&1&-1\\3&\beta&4\end{vmatrix}" />,
    reason: <>Set up the determinant with a on the middle row.</>,
  },
  {
    working: <Katex display tex="= \bigl(4+\beta\bigr)\underset{\sim}{i}-\bigl(4\alpha+3\bigr)\underset{\sim}{j}+\bigl(\alpha\beta-3\bigr)\underset{\sim}{k}" />,
    reason: <><Katex tex="1(4)-(-1)\beta=4+\beta" />; <Katex tex="\alpha(4)-(-1)(3)=4\alpha+3" />, with the middle term's leading minus; <Katex tex="\alpha\beta-3" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \ 4+\beta = 2 \implies \beta = -2" />,
    reason: <>The first component involves only β, so start there.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \ -(4\alpha+3) = -7 \implies 4\alpha = 4 \implies \alpha = 1" />,
    reason: <>The second involves only α. Losing the leading minus sign here flips the answer.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{k}: \ \gamma = \alpha\beta-3 = (1)(-2)-3 = -5" />,
    reason: <>The third then follows from the first two.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = 1, \quad \beta = -2, \quad \gamma = -5}" />,
    reason: <>Matches option <b>C</b>. Testing the options directly is just as fast on a CAS; option <b>E</b> has the right <Katex tex="\alpha" /> and <Katex tex="\beta" /> but the sign of <Katex tex="\gamma" /> wrong.</>,
  },
]

export default function SpecialistQ17_2023() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors{' '}
          <Katex tex="\underset{\sim}{a}=\alpha\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" />,{' '}
          <Katex tex="\underset{\sim}{b}=3\underset{\sim}{i}+\beta\underset{\sim}{j}+4\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{c}=2\underset{\sim}{i}-7\underset{\sim}{j}+\gamma\underset{\sim}{k}" />
          , where <Katex tex="\alpha,\beta,\gamma\in R" />. If{' '}
          <Katex tex="\underset{\sim}{a}\times\underset{\sim}{b}=\underset{\sim}{c}" />, then
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\alpha=-2,\ \beta=-1,\ \gamma=-5" /> },
        { letter: 'B', content: <Katex tex="\alpha=-1,\ \beta=2,\ \gamma=-1" /> },
        { letter: 'C', content: <Katex tex="\alpha=1,\ \beta=-2,\ \gamma=-5" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\alpha=-2,\ \beta=-1,\ \gamma=-1" /> },
        { letter: 'E', content: <Katex tex="\alpha=1,\ \beta=-2,\ \gamma=5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
