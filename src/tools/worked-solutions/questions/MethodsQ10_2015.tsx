// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 10. VCAA examination report: 59% correct.
// Recovering n and p from the mean and variance of a binomial. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 16, D: 59, E: 9 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = np = 2, \qquad \mathrm{Var}(X) = np(1-p) = \frac43" />,
    reason: <>The binomial mean and variance formulas give two equations in the two unknowns <Katex tex="n" /> and <Katex tex="p" />.</>,
    more: <>You need <Katex tex="n" /> as well as <Katex tex="p" />, because the binomial formula's coefficient and exponents depend on it. On CAS, <Cas fn="solve">solve(n·p=2 and n·p·(1−p)=4/3, {'{'}n,p{'}'})</Cas> gives the same pair.</>,
  },
  {
    working: <Katex display tex="\frac{np(1-p)}{np} = 1-p = \frac{4/3}{2} = \frac23" />,
    reason: <>Dividing the variance by the mean cancels <Katex tex="np" /> and isolates <Katex tex="1-p" /> in one step.</>,
  },
  {
    working: <Katex display tex="p = \frac13 \implies n = \frac{2}{1/3} = 6" />,
    reason: <>Substitute <Katex tex="p" /> back into <Katex tex="np=2" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=1) = \binom{6}{1}\left(\frac13\right)^1\left(\frac23\right)^5" />,
    reason: <>Binomial formula <Katex tex="\binom{n}{x}p^x(1-p)^{n-x}" /> with one success and five failures; <Katex tex="\binom61=6" /> places the success could fall.</>,
  },
  {
    working: <Katex display tex="\boxed{6\times\frac13\times\left(\frac23\right)^5}" />,
    reason: <>Matches option <b>D</b>, about <Katex tex="0.263" />.</>,
    more: <>Check on CAS: <Cas fn="binomPdf">binomPdf(6, 1/3, 1)</Cas> <Katex tex="\approx 0.263" />. Option E swaps the roles of <Katex tex="p" /> and <Katex tex="1-p" />. Options A and B are <Katex tex="\Pr(X=6)" /> and <Katex tex="\Pr(X=0)" />. Option C, the most common wrong answer, is one particular order of one success in <Katex tex="3" /> trials, <Katex tex="\tfrac13\left(\tfrac23\right)^2" />. Here <Katex tex="n=6" />, and the success can fall in any of <Katex tex="\binom61=6" /> places.</>,
  },
]

export default function MethodsQ10_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The binomial random variable <Katex tex="X" /> has <Katex tex="\mathrm{E}(X)=2" />{' '}
            and <Katex tex="\mathrm{Var}(X)=\tfrac43" />.
          </p>
          <p>
            <Katex tex="\Pr(X=1)" /> is equal to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(\tfrac13\right)^6" /> },
        { letter: 'B', content: <Katex tex="\left(\tfrac23\right)^6" /> },
        { letter: 'C', content: <Katex tex="\tfrac13\times\left(\tfrac23\right)^2" /> },
        { letter: 'D', content: <Katex tex="6\times\tfrac13\times\left(\tfrac23\right)^5" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="6\times\tfrac23\times\left(\tfrac13\right)^5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
