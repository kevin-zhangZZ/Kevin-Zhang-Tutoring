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
    reason: <>The cross product in determinant form (on the formula sheet). For <Katex tex="\underset{\sim}{a}\times\underset{\sim}{b}" />, the components of <Katex tex="\underset{\sim}{a}" /> go in the second row and those of <Katex tex="\underset{\sim}{b}" /> in the third; the order matters, since <Katex tex="\underset{\sim}{b}\times\underset{\sim}{a}=-\underset{\sim}{a}\times\underset{\sim}{b}" />.</>,
  },
  {
    working: <Katex display tex="= \bigl(4+\beta\bigr)\underset{\sim}{i}-\bigl(4\alpha+3\bigr)\underset{\sim}{j}+\bigl(\alpha\beta-3\bigr)\underset{\sim}{k}" />,
    reason: <>Expand along the top row: for each unit vector, cover its row and column and cross-multiply the <Katex tex="2\times2" /> block left over. <Katex tex="\underset{\sim}{i}" />: <Katex tex="1(4)-(-1)\beta=4+\beta" />. <Katex tex="\underset{\sim}{j}" />: <Katex tex="\alpha(4)-(-1)(3)=4\alpha+3" />, with a minus sign in front. <Katex tex="\underset{\sim}{k}" />: <Katex tex="\alpha\beta-1(3)=\alpha\beta-3" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \ 4+\beta = 2 \implies \beta = -2" />,
    reason: <>Equal vectors have equal components. The <Katex tex="\underset{\sim}{i}" /> component involves only <Katex tex="\beta" />, so start there.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \ -(4\alpha+3) = -7 \implies 4\alpha = 4 \implies \alpha = 1" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component involves only <Katex tex="\alpha" />. Keep the minus sign in front: without it, <Katex tex="4\alpha+3=-7" /> gives <Katex tex="\alpha=-\tfrac52" />, which is not in any option.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{k}: \ \gamma = \alpha\beta-3 = (1)(-2)-3 = -5" />,
    reason: <>The <Katex tex="\underset{\sim}{k}" /> component then gives <Katex tex="\gamma" /> from the values just found.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = 1, \quad \beta = -2, \quad \gamma = -5}" />,
    reason: <>Matches option <b>C</b>. Option <b>E</b> has the right <Katex tex="\alpha" /> and <Katex tex="\beta" /> but cross-multiplies the <Katex tex="\underset{\sim}{k}" /> term the wrong way round: <Katex tex="3-\alpha\beta=3-(-2)=5" />. On CAS, substituting an option's values into crossP checks it just as fast.</>,
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
