// 2025 Mathematical Methods NHT — Exam 2, MCQ 6. The NHT report gives the answer key only, with
// no statistics. Probability: a cumulative binomial probability, "at most twice". Question text
// transcribed from the original paper (the 2025 NHT paper is image-only, so read from the
// rendered page). Solution is original; the answer D agrees with the report's key
// (scipy: Pr(X ≤ 2) = 0.16728…). Distractors checked: Pr(X = 2) = 0.1209… (A),
// Pr(1 ≤ X ≤ 2) = 0.1612… (C).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\text{Bi}(10,\,0.4)" />,
    reason: <>Let <Katex tex="X" /> be the number of heads. Ten independent flips, each a head with the same probability 0.4: a binomial distribution.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(X\le2)&=\Pr(X=0)+\Pr(X=1)\\&\quad+\Pr(X=2)\end{aligned}" />,
    reason: <>&ldquo;At most twice&rdquo; means 0, 1 or 2 heads — zero heads counts too.</>,
  },
  {
    working: <Katex display tex="=0.6^{10}+10(0.4)(0.6)^9+45(0.4)^2(0.6)^8" />,
    reason: <><Katex tex="\Pr(X=x)=\binom{10}{x}0.4^x\,0.6^{10-x}" />, with <Katex tex="\binom{10}{1}=10" /> and <Katex tex="\binom{10}{2}=45" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(10, 0.4, 0, 2) = 0.16728…</Cas>,
    reason: <>On CAS, the cumulative binomial from 0 to 2 gives the same sum in one step.</>,
    more: <>The three terms are <Katex tex="0.0060\ldots" />, <Katex tex="0.0403\ldots" /> and <Katex tex="0.1209\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.17}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>A</b>, <Katex tex="0.1209\ldots" />, is <Katex tex="\Pr(X=2)" /> only — &ldquo;exactly twice&rdquo;. Option <b>C</b>, <Katex tex="0.1612\ldots" />, is <Katex tex="\Pr(1\le X\le2)" />, leaving out zero heads.</>,
  },
]

export default function MethodsQ6_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          A biased coin has a probability of 0.4 of showing heads. The coin is flipped 10 times.
          <br />
          The probability of the coin showing heads at most twice is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.12" /> },
        { letter: 'B', content: <Katex tex="0.13" /> },
        { letter: 'C', content: <Katex tex="0.16" /> },
        { letter: 'D', content: <Katex tex="0.17" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
