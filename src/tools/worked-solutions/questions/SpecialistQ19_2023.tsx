// 2023 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 67% correct.
// A total, not a mean: the variance is multiplied by n, not divided. Question text transcribed from the original paper.
// Answer checked with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 67, C: 17, D: 7, E: 3 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}X_i \sim \mathrm{N}\!\left(800,\ 200^2\right)\\ T = X_1+X_2+\cdots+X_{16}\end{gathered}" />,
    reason: <>Let <Katex tex="X_i" /> be the amount owed on the <Katex tex="i" />th invoice and <Katex tex="T" /> the total of all 16. The question asks about the total owed, not the average. The invoices are a random sample, so they are independent.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(T) = 16\times800 = 12\,800" />,
    reason: <>Means add: <Katex tex="\mathrm{E}(T)" /> is the sum of the 16 means, each 800.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{Var}(T) &= 16\times200^2\\ &= 640\,000\end{aligned}" />,
    reason: <>For independent variables, <em>variances</em> add (standard deviations don&rsquo;t), so add 16 copies of <Katex tex="200^2" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(T) = \sqrt{640\,000} = 800" />,
    reason: <>Take the square root to get back to a standard deviation. Adding 16 invoices multiplies the spread by <Katex tex="\sqrt{16}=4" />, not by 16.</>,
    more: (
      <>
        The tempting shortcut is to treat <Katex tex="T" /> as <Katex tex="16X" />, one invoice multiplied by 16. That
        gives <Katex tex="\mathrm{sd}=16\times200=3200" /> and a probability of <Katex tex="0.413" />, option{' '}
        <b>C</b>, the most common wrong answer (17%). But <Katex tex="16X" /> would mean all 16 invoices owe exactly the
        same amount, so every high or low is repeated 16 times. Sixteen separate invoices partly cancel each
        other&rsquo;s highs and lows, which is why the spread of the total grows only by a factor of 4.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}z &= \frac{13\,500-12\,800}{800}\\ &= 0.875\end{aligned}" />,
    reason: <>A sum of independent normal variables is itself normal, so <Katex tex="T\sim\mathrm{N}\!\left(12\,800,\ 800^2\right)" />. Standardise: subtract the mean and divide by the standard deviation.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(T>13\,500) &= \Pr(Z>0.875)\\ &= 0.19078\ldots\end{aligned}" />,
    reason: <>By <Cas fn="normCdf" /> with lower 0.875, upper ∞, μ = 0, σ = 1.</>,
    more: <>You can skip standardising: <Cas fn="normCdf" /> straight from <Katex tex="T" />, with lower 13 500, upper ∞, μ = 12 800, σ = 800, gives the same value.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(T>13\,500)\approx0.191}" />,
    reason: <>Matches option <b>B</b>, to three decimal places.</>,
    more: (
      <>
        Option <b>C</b>, <Katex tex="0.413" />, comes from the <Katex tex="16X" /> shortcut described at the{' '}
        <Katex tex="\mathrm{sd}(T)" /> step, and <b>D</b>, <Katex tex="0.587" />, is the complement of <b>C</b>.{' '}
        <b>E</b>, <Katex tex="0.809" />, is the complement of the right answer: the probability of owing{' '}
        <em>less</em> than $13 500. <b>A</b>, <Katex tex="0.087" />, is <Katex tex="0.5-0.413" />: under that same{' '}
        <Katex tex="16X" /> model, the probability that the total lands between the mean, $12 800, and $13 500.
      </>
    ),
  },
]

export default function SpecialistQ19_2023() {
  return (
    <MCQShell
      question={
        <p>
          A company accountant knows that the amount owed on any individual unpaid invoice is
          normally distributed with a mean of $800 and a standard deviation of $200.
          <br />
          What is the probability, correct to three decimal places, that in a random sample of
          16 unpaid invoices the <b>total</b> amount owed is more than $13 500?
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
