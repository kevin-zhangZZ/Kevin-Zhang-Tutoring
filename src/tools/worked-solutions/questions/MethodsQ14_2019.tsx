// 2019 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 67% correct. Finding
// the standard deviation of a normal distribution from a given tail probability. Question text
// transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 67, C: 8, D: 7, E: 3 },
  noAnswer: 1,
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N(200,\ \sigma^2)" />,
  },
  {
    working: <Katex display tex="\Pr(X>190) = 0.97 \implies \Pr(X<190)=0.03" />,
  },
  {
    working: <Katex display tex="\Pr\!\left(Z < \dfrac{190-200}{\sigma}\right) = 0.03 \implies \dfrac{-10}{\sigma} = \operatorname{invNorm}(0.03)" />,
    reason: <>Standardise, then invert the standard normal CDF (by CAS).</>,
  },
  {
    working: <Katex display tex="\dfrac{-10}{\sigma} \approx -1.8808 \implies \sigma \approx 5.317" />,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 5.3 \text{ g}}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ14_2019() {
  return (
    <MCQShell
      question={
        <p>
          The weights of packets of lollies are normally distributed with a mean of{' '}
          <Katex tex="200" /> g. If <Katex tex="97\%" /> of these packets of lollies have a
          weight of more than <Katex tex="190" /> g, then the standard deviation of the
          distribution, correct to one decimal place, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3.3\text{ g}" /> },
        { letter: 'B', content: <Katex tex="5.3\text{ g}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="6.1\text{ g}" /> },
        { letter: 'D', content: <Katex tex="9.4\text{ g}" /> },
        { letter: 'E', content: <Katex tex="12.1\text{ g}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
