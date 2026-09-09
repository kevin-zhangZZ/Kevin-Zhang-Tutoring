// 2017 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 38% correct.
// Smallest binomial n so that "mean = standard deviation" forces p below a threshold.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 16, C: 25, D: 38, E: 9 },
  answer: 'D',
  noAnswer: 2,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(n,p), \qquad \mathrm{E}(X)=np, \qquad \mathrm{sd}(X)=\sqrt{np(1-p)}" />,
    reason: 'The standard mean and standard deviation formulas for a binomial variable.',
  },
  {
    working: (
      <>
        <Katex display tex="np = \sqrt{np(1-p)}" />
        <Katex display tex="\implies\; n^2p^2 = np(1-p)" />
      </>
    ),
    reason: 'Set mean equal to standard deviation, then square both sides to clear the root.',
  },
  {
    working: <Katex display tex="np = 1-p" />,
    reason: <>Divide both sides by <Katex tex="np" /> (valid since <Katex tex="0<p<1" /> and <Katex tex="n\ge1" />, so <Katex tex="np\ne0" />).</>,
  },
  {
    working: (
      <>
        <Katex display tex="np+p = 1 \;\implies\; p(n+1)=1" />
        <Katex display tex="\implies\; p = \frac{1}{n+1}" />
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="p \le 0.01 \;\implies\; \frac{1}{n+1} \le 0.01" />
        <Katex display tex="\implies\; n+1 \ge 100 \implies n \ge 99" />
      </>
    ),
    reason: 'Smaller p means larger n+1, so this inequality flips when taking reciprocals.',
  },
  {
    working: <Katex display tex="\boxed{n=99}" />,
    reason: <>The smallest integer satisfying <Katex tex="n\ge99" /> — matches option <b>D</b>.</>,
  },
]

export default function MethodsQ18_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="X" /> be a discrete random variable with binomial distribution{' '}
            <Katex tex="X \sim \mathrm{Bi}(n,p)" />. The mean and the standard deviation of this
            distribution are equal.
          </p>
          <p>
            Given that <Katex tex="0&lt;p&lt;1" />, the smallest number of trials, <Katex tex="n" />, such
            that <Katex tex="p \le 0.01" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="37" /> },
        { letter: 'B', content: <Katex tex="49" /> },
        { letter: 'C', content: <Katex tex="98" /> },
        { letter: 'D', content: <Katex tex="99" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="101" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
