// 2021 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 57% correct.
// The smallest n making a binomial tail reach 0.5. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 18, C: 57, D: 10, E: 5 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(n,\ 0.1), \quad \Pr(X\ge2) \ge 0.5" />,
    reason: <>With <Katex tex="X" /> the number of successes, "at least two successes" is <Katex tex="X\ge2" />. Here the unknown is the number of trials <Katex tex="n" />, not the probability.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge2) = 1-\Pr(X=0)-\Pr(X=1)" />,
    reason: <>The complement of "at least 2" is "0 or 1" — only two terms, far quicker than adding <Katex tex="\Pr(X=2)" /> up to <Katex tex="\Pr(X=n)" />.</>,
  },
  {
    working: <Katex display tex="= 1-(0.9)^n-n(0.1)(0.9)^{n-1}" />,
    reason: <>Binomial formula: <Katex tex="\Pr(X=0)=0.9^n" /> (every trial fails) and <Katex tex="\Pr(X=1)=\binom n1(0.1)(0.9)^{n-1}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} n=16: \ &1-0.18530-0.32943 \\ &= 0.4853 < 0.5 \end{aligned}" />,
    reason: <>More trials, more chances: the probability grows with <Katex tex="n" />, so find the first option reaching 0.5. 16 falls just short, so 15 does too.</>,
    more: <>On CAS, <Cas fn="binomCdf">binomCdf(16, 0.1, 2, 16)</Cas> gives the same value. Option A, <Katex tex="n=15" />, gives 0.4510, further below.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} n=17: \ &1-0.16677-0.31501 \\ &= 0.5182 \ge 0.5 \end{aligned}" />,
    reason: <>Just enough. On CAS, <Cas fn="binomCdf">binomCdf(17, 0.1, 2, 17)</Cas>.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 17}" />,
    reason: <>Matches option <b>C</b>: 17 is the first whole number of trials that reaches 0.5.</>,
    more: <>Solving <Katex tex="\Pr(X\ge2)=0.5" /> with the formula above, <Cas fn="solve">solve(1-0.9^n-n·0.1·0.9^(n-1) = 0.5, n) | n &gt; 2</Cas>, gives <Katex tex="n=16.44\ldots" />. The number of trials must be a whole number and the probability must reach 0.5, so round <em>up</em> to 17. Rounding to the nearest whole number gives 16, option B, which falls just short.</>,
  },
]

export default function MethodsQ17_2021() {
  return (
    <MCQShell
      question={
        <p>
          A discrete random variable <Katex tex="X" /> has a binomial distribution with a
          probability of success of <Katex tex="p=0.1" /> for <Katex tex="n" /> trials, where{' '}
          <Katex tex="n>2" />.
          <br />
          If the probability of obtaining at least two successes after <Katex tex="n" /> trials
          is at least 0.5, then the smallest possible value of <Katex tex="n" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="15" /> },
        { letter: 'B', content: <Katex tex="16" /> },
        { letter: 'C', content: <Katex tex="17" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="18" /> },
        { letter: 'E', content: <Katex tex="19" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
