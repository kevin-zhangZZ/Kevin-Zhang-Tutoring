// 2020 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 72% correct.
// Finding the parameter that makes three vectors linearly dependent. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 7, D: 5, E: 72 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{b} = m\underset{\sim}{a}+n\underset{\sim}{c}" />,
    reason: <>Linear dependence means one vector is a combination of the other two. Writing <Katex tex="\underset{\sim}{b}" /> in terms of the other two is easiest, because <Katex tex="\underset{\sim}{c}" /> has no <Katex tex="\underset{\sim}{j}" /> component.</>,
  },
  {
    working: <Katex display tex="\lambda\underset{\sim}{i}+3\underset{\sim}{j}+2\underset{\sim}{k} = m\left(\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)+n\left(\underset{\sim}{i}+\underset{\sim}{k}\right)" />,
    reason: <>Substituting the three vectors.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \ 2m = 3 \implies m = \tfrac32" />,
    reason: <>Start with the <Katex tex="\underset{\sim}{j}" /> equation — only one unknown appears in it.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{k}: \ -m+n = 2 \implies n = 2+\tfrac32 = \tfrac72" />,
    reason: <>Now the second unknown falls out.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \ m+n = \lambda \implies \lambda = \tfrac32+\tfrac72" />,
    reason: <>The remaining component equation fixes the parameter.</>,
  },
  {
    working: <Katex display tex="\boxed{\lambda = 5}" />,
    reason: <>Matches option <b>E</b>; every other option leaves the determinant non-zero. The determinant test gives the same thing: <Katex tex="\begin{vmatrix}1&2&-1\\\lambda&3&2\\1&0&1\end{vmatrix}=10-2\lambda=0" />.</>,
  },
]

export default function SpecialistQ13_2020() {
  return (
    <MCQShell
      question={
        <p>
          The vectors{' '}
          <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{b}=\lambda\underset{\sim}{i}+3\underset{\sim}{j}+2\underset{\sim}{k}" />{' '}
          and <Katex tex="\underset{\sim}{c}=\underset{\sim}{i}+\underset{\sim}{k}" /> will be{' '}
          <b>linearly dependent</b> when the value of <Katex tex="\lambda" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="5" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
