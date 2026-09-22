// 2023 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 67% correct.
// A total, not a mean: the variance is multiplied by n, not divided. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 67, C: 17, D: 7, E: 3 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X_i \sim \mathrm{N}\!\left(800,\ 200^2\right), \qquad T = X_1+X_2+\cdots+X_{16}" />,
    reason: 'The question asks about the total owed, not the average.',
  },
  {
    working: <Katex display tex="\mathrm{E}(T) = 16\times800 = 12\,800" />,
    reason: 'Means add.',
  },
  {
    working: <Katex display tex="\mathrm{Var}(T) = 16\times200^2 = 640\,000 \implies \mathrm{sd}(T) = 800" />,
    reason: <>Variances add, so the standard deviation of a sum is <Katex tex="\sqrt{16}\times200" />. For a sample <em>mean</em> it would instead be <Katex tex="200/\sqrt{16}=50" /> — that mix-up is what the distractors reward.</>,
  },
  {
    working: <Katex display tex="\Pr(T>13\,500) = \Pr\!\left(Z>\frac{13\,500-12\,800}{800}\right) = \Pr(Z>0.875)" />,
    reason: 'Standardising.',
  },
  {
    working: <Katex display tex="\boxed{0.191}" />,
    reason: <>Option <b>B</b>, to three decimal places. Option <b>D</b>, <Katex tex="0.809" />, is the complement — the probability of owing <em>less</em> than $13 500.</>,
  },
]

export default function SpecialistQ19_2023() {
  return (
    <MCQShell
      question={
        <p>
          A company accountant knows that the amount owed on any individual unpaid invoice is
          normally distributed with a mean of $800 and a standard deviation of $200. What is
          the probability, correct to three decimal places, that in a random sample of 16
          unpaid invoices the total amount owed is more than $13 500?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.087" /> },
        { letter: 'B', content: <Katex tex="0.191" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.413" /> },
        { letter: 'D', content: <Katex tex="0.587" /> },
        { letter: 'E', content: <Katex tex="0.809" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
