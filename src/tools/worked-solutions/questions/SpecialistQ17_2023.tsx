// 2023 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 73% correct.
// A cross product matched component by component. Question text transcribed from the original paper.
// Solution is original. Options A, B and D (5%, 8%, 6%) match no sign or row-order slip in the
// expansion (checked with sympy), so only E is explained in the final row's `more`.

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
    reason: <>Write the cross product as a determinant (it is on the formula sheet): the unit vectors on top, then the components of <Katex tex="\underset{\sim}{a}" />, then those of <Katex tex="\underset{\sim}{b}" />.</>,
    more: (
      <>
        The order of the rows matters: <Katex tex="\underset{\sim}{b}\times\underset{\sim}{a}=-\underset{\sim}{a}\times\underset{\sim}{b}" />,
        so putting <Katex tex="\underset{\sim}{b}" /> in the second row would flip the sign of every component. On
        CAS, crossP([α, 1, −1], [3, β, 4]) does this expansion in one step, with <Katex tex="\alpha" /> and{' '}
        <Katex tex="\beta" /> left as letters.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} &= \bigl[1(4)-(-1)\beta\bigr]\underset{\sim}{i} \\ &\qquad-\bigl[\alpha(4)-(-1)(3)\bigr]\underset{\sim}{j} \\ &\qquad+\bigl[\alpha\beta-1(3)\bigr]\underset{\sim}{k} \\ &= (4+\beta)\underset{\sim}{i}-(4\alpha+3)\underset{\sim}{j}+(\alpha\beta-3)\underset{\sim}{k} \end{aligned}" />,
    reason: <>Expand along the top row. For each unit vector, cover its row and column and cross-multiply the <Katex tex="2\times2" /> block left over: (top-left)(bottom-right) minus (top-right)(bottom-left). The <Katex tex="\underset{\sim}{j}" /> term takes a minus sign.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \ 4+\beta = 2 \implies \beta = -2" />,
    reason: <>Equal vectors have equal components, so match each component with <Katex tex="\underset{\sim}{c}=2\underset{\sim}{i}-7\underset{\sim}{j}+\gamma\underset{\sim}{k}" />. The <Katex tex="\underset{\sim}{i}" /> component involves only <Katex tex="\beta" />, so start there.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \ -(4\alpha+3) = -7 \implies 4\alpha = 4 \implies \alpha = 1" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> component involves only <Katex tex="\alpha" />. Keep the minus sign from the expansion.</>,
    more: (
      <>
        Without it, <Katex tex="4\alpha+3=-7" /> gives <Katex tex="\alpha=-\tfrac52" />, which is not in any option: a
        signal to go back and check the expansion.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{k}: \ \gamma = \alpha\beta-3 = (1)(-2)-3 = -5" />,
    reason: <>The <Katex tex="\underset{\sim}{k}" /> component then gives <Katex tex="\gamma" /> from the values just found.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = 1, \quad \beta = -2, \quad \gamma = -5}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: (
      <>
        Once <Katex tex="\alpha=1" /> and <Katex tex="\beta=-2" /> are known, only options <b>C</b> and <b>E</b> are
        left, and <Katex tex="\gamma" /> decides between them. Option <b>E</b> cross-multiplies the{' '}
        <Katex tex="\underset{\sim}{k}" /> block in the reverse order to the rule in the expansion step, giving{' '}
        <Katex tex="3-\alpha\beta=3-(-2)=5" /> instead of <Katex tex="\alpha\beta-3=-5" />.
      </>
    ),
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
