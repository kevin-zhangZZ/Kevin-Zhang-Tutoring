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
    reason: <>Let <Katex tex="X" /> be the number of games Ben wins. It is binomial: a fixed number of trials (10 games), each either a win or not, independent of each other (given), with the same probability of a win, 0.25, every game.</>,
  },
  {
    working: <Katex display tex="\Pr(X=4) = \binom{10}{4}(0.25)^4(0.75)^6" />,
    reason: (
      <>
        "Exactly four times" is a single value of <Katex tex="X" />, so it is one term of{' '}
        <Katex tex="\Pr(X=x)=\binom{n}{x}p^x(1-p)^{n-x}" />, not a cumulative probability.{' '}
        <Katex tex="\binom{10}{4}" /> counts the ways to choose which 4 of the 10 games are wins; each win has
        probability 0.25 and each of the 6 losses 0.75. On CAS,{' '}
        <Cas fn="binomPdf">binomPdf(10, 0.25, 4)</Cas> gives it directly.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} &= 210\times0.00390625\times0.177978\ldots \\ &= 0.14599\ldots \end{aligned}" />,
    reason: <><Katex tex="\binom{10}{4}=\dfrac{10\times9\times8\times7}{4\times3\times2\times1}=210" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.1460}" />,
    reason: <>Matches option <b>A</b>. Every other option is a cumulative probability: <Katex tex="\Pr(X\ge4)=0.2241" /> (B), <Katex tex="\Pr(X\le4)=0.9219" /> (C), <Katex tex="\Pr(X\ge5)=0.0781" /> (D) and <Katex tex="\Pr(X\le3)=0.7759" /> (E).</>,
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
