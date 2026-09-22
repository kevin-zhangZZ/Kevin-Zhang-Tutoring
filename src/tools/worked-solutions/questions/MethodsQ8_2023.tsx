// 2023 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 49% correct.
// "At least once" is the complement of "never". Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 14, C: 49, D: 16, E: 9 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{green on one draw}) = \frac{n}{n+m}" />,
    reason: <>There are <Katex tex="n+m" /> balls in total, and the ball is replaced, so every draw is identical and independent.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{at least one green}) = 1-\Pr(\text{no greens in 8 draws})" />,
    reason: '"At least one" almost always wants the complement — the alternative is summing eight separate binomial terms.',
  },
  {
    working: <Katex display tex="\Pr(\text{red on one draw}) = \frac{m}{n+m}" />,
    reason: <>Note the numerator is <Katex tex="m" />, not <Katex tex="n" /> — option <b>B</b> is this slip.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{8 reds}) = \left(\frac{m}{n+m}\right)^{8}" />,
    reason: 'Independence lets the probabilities multiply.',
  },
  {
    working: <Katex display tex="\boxed{1-\left(\frac{m}{n+m}\right)^{8}}" />,
    reason: <>Option <b>C</b>. Options <b>A</b>, <b>D</b> and <b>E</b> all use the binomial term for <em>exactly one</em> green, which answers a different question.</>,
  },
]

export default function MethodsQ8_2023() {
  return (
    <MCQShell
      question={
        <p>
          A box contains <Katex tex="n" /> green balls and <Katex tex="m" /> red balls. A ball
          is selected at random, and its colour is noted. The ball is then replaced in the box.
          In 8 such selections, where <Katex tex="n\ne m" />, what is the probability that a
          green ball is selected at least once?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="8\left(\frac{n}{n+m}\right)\left(\frac{m}{n+m}\right)^{7}" /> },
        { letter: 'B', content: <Katex tex="1-\left(\frac{n}{n+m}\right)^{8}" /> },
        { letter: 'C', content: <Katex tex="1-\left(\frac{m}{n+m}\right)^{8}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="1-\left(\frac{n}{n+m}\right)\left(\frac{m}{n+m}\right)^{7}" /> },
        { letter: 'E', content: <Katex tex="1-8\left(\frac{n}{n+m}\right)\left(\frac{m}{n+m}\right)^{7}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
