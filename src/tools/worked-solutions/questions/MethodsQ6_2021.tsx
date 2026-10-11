// 2021 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 88% correct.
// A single binomial term. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 88, B: 4, C: 2, D: 3, E: 2 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(10,\ 0.25)" />,
    reason: <>Let <Katex tex="X" /> be the number of games Ben wins: 10 independent games, each won with the same probability 0.25, so <Katex tex="X" /> is binomial.</>,
    more: <>The remaining binomial conditions also hold: the number of trials is fixed at 10, and each game has exactly two outcomes, win or not.</>,
  },
  {
    working: <Katex display tex="\Pr(X=4) = \binom{10}{4}(0.25)^4(0.75)^6" />,
    reason: (
      <>
        "Exactly four times" is a single value of <Katex tex="X" />, so use one term of{' '}
        <Katex tex="\Pr(X=x)=\binom{n}{x}p^x(1-p)^{n-x}" />. On CAS,{' '}
        <Cas fn="binomPdf">binomPdf(10, 0.25, 4)</Cas> gives it directly.
      </>
    ),
    more: (
      <>
        <Katex tex="\binom{10}{4}" /> counts the ways to choose which 4 of the 10 games are the wins; each of
        those wins has probability 0.25 and each of the other 6 games (losses) has probability 0.75. It is not a
        cumulative probability: "exactly" rules out "at least" and "at most".
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} &= 210\times0.00390625\times0.177978\ldots \\ &= 0.14599\ldots \end{aligned}" />,
    reason: <><Katex tex="\binom{10}{4}=\dfrac{10\times9\times8\times7}{4\times3\times2\times1}=210" />, <Katex tex="0.25^4=0.00390625" /> and <Katex tex="0.75^6=0.177978\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.1460}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Every other option is a cumulative probability: <Katex tex="\Pr(X\ge4)=0.2241" /> (B), <Katex tex="\Pr(X\le4)=0.9219" /> (C), <Katex tex="\Pr(X\ge5)=0.0781" /> (D) and <Katex tex="\Pr(X\le3)=0.7759" /> (E).</>,
  },
]

export default function MethodsQ6_2021() {
  return (
    <MCQShell
      question={
        <p>
          The probability of winning a game is 0.25
          <br />
          The probability of winning a game is independent of winning any other game.
          <br />
          If Ben plays 10 games, the probability that he will win exactly four times is closest
          to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.1460" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0.2241" /> },
        { letter: 'C', content: <Katex tex="0.9219" /> },
        { letter: 'D', content: <Katex tex="0.0781" /> },
        { letter: 'E', content: <Katex tex="0.7759" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
