// 2024 Mathematical Methods NHT — Exam 2, MCQ 5. The NHT report gives the answer key only, with
// no statistics. Probability: the binomial probability formula. Question text transcribed from
// the original paper. Solution is original; the answer B agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\text{Bi}(10,\,0.25)" />,
    reason: <>Let <Katex tex="X" /> be the number of heads. Ten independent tosses, each a head or not, with the same probability <Katex tex="0.25" /> of a head every time: a binomial distribution with <Katex tex="n=10" />, <Katex tex="p=0.25" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=x)=\binom{n}{x}p^x(1-p)^{n-x}" />,
    reason: <>The binomial formula. <Katex tex="p" /> is raised to the number of successes and <Katex tex="1-p" /> to the number of failures; the two powers add to <Katex tex="n" />.</>,
    more: <><Katex tex="\binom{n}{x}" /> counts the orders in which the <Katex tex="x" /> heads can appear among the <Katex tex="n" /> tosses, and each such order has probability <Katex tex="p^x(1-p)^{n-x}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\binom{10}{x}(0.25)^x(0.75)^{10-x}}" />,
    reason: <>Matches option <b>B</b>: <Katex tex="x" /> heads at <Katex tex="0.25" /> each, <Katex tex="10-x" /> tails at <Katex tex="0.75" /> each.</>,
    more: <>Option A swaps the exponents, which gives the probability of exactly <Katex tex="x" /> <b>tails</b>. In options C, D and E the two exponents don&apos;t add to <Katex tex="10" />, so they can&apos;t describe ten tosses.</>,
  },
]

export default function MethodsQ5_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          When a biased coin is tossed, the probability of the coin landing on heads is <Katex tex="0.25" />. The coin is tossed <Katex tex="10" /> times and the number of heads is recorded.
          <br />
          The probability that exactly <Katex tex="x" /> heads are recorded is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dbinom{10}{x}(0.25)^{10-x}(0.75)^{x}" /> },
        { letter: 'B', content: <Katex tex="\dbinom{10}{x}(0.25)^{x}(0.75)^{10-x}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dbinom{10}{x}(0.25)^{10-x}(0.75)^{10}" /> },
        { letter: 'D', content: <Katex tex="\dbinom{10}{x}(0.25)^{x}(0.75)^{10}" /> },
        { letter: 'E', content: <Katex tex="\dbinom{10}{x}(0.25)^{10}(0.75)^{10-x}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
