// 2021 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 57% correct.
// The smallest n making a binomial tail reach 0.5. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 18, C: 57, D: 10, E: 5 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(n,\ 0.1), \quad \Pr(X\ge2) \ge 0.5" />,
    reason: <>A cumulative condition with the number of trials as the unknown.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge2) = 1-\Pr(X=0)-\Pr(X=1)" />,
    reason: <>The complement has only two terms, so this is far quicker than summing the tail.</>,
  },
  {
    working: <Katex display tex="= 1-(0.9)^n-n(0.1)(0.9)^{n-1}" />,
    reason: <>Writing it in <Katex tex="n" /> makes it clear the expression increases with <Katex tex="n" />, so there is a single cut-off.</>,
  },
  {
    working: <Katex display tex="n=16: \ 1-0.18530-0.32943 = 0.4853 < 0.5" />,
    reason: <>Not yet enough.</>,
  },
  {
    working: <Katex display tex="n=17: \ 1-0.16677-0.31501 = 0.5182 \ge 0.5" />,
    reason: <>Just enough.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 17}" />,
    reason: <>Matches option <b>C</b>. Solving with a CAS gives <Katex tex="n\ge16.44\ldots" />, which rounds up to 17; option B rounds down.</>,
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
