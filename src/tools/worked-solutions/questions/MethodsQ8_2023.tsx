// 2023 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 49% correct.
// "At least once" is the complement of "never". Question text transcribed from the original paper.
// Solution is original.
// Oct 2026 Concise/Detailed pass (no interactive: 49% correct): the "none, not exactly one" trap behind D and E
// moved to row 3's `more`; option analysis and the role of n != m moved to the last row's `more`. Rechecked in sympy.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 14, C: 49, D: 16, E: 9 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      Let <Katex tex="G" /> represent a green ball being selected.
      <br />
      <Katex tex="\Pr(G\ge1)" />
      <br />
      <Katex tex="=1-\Pr(G=0)" />
      <br />
      <Katex tex="=1-\left(\tfrac{m}{n+m}\right)^8" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{green on one draw}) = \frac{n}{n+m}" />,
    reason: <>There are <Katex tex="n+m" /> balls in total and <Katex tex="n" /> of them are green. The ball is replaced, so every draw has this same chance and the draws are independent.</>,
  },
  {
    working: <Katex display tex="X\sim\text{Bi}\left(8,\ \frac{n}{n+m}\right)" />,
    reason: <>Let <Katex tex="X" /> be the number of green balls in the 8 draws. A fixed number of independent draws, each with the same chance of green, is a binomial setting.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge1) = 1-\Pr(X=0)" />,
    reason: <>"At least once" fails in only one way: no greens at all. The complement needs one term instead of adding the eight terms <Katex tex="\Pr(X=1)+\dots+\Pr(X=8)" />.</>,
    more: (
      <>
        The opposite of &ldquo;at least one green&rdquo; is &ldquo;no greens&rdquo;, not &ldquo;exactly one
        green&rdquo;. Options <b>E</b> and <b>D</b> both come from subtracting a one-green term instead of the
        no-green term.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(\text{red on one draw}) = 1-\frac{n}{n+m} = \frac{m}{n+m}" />,
    reason: <>Every ball is either green or red. The numerator is <Katex tex="m" />, the number of red balls.</>,
  },
  {
    working: <Katex display tex="\Pr(X=0) = \left(\frac{m}{n+m}\right)^{8}" />,
    reason: <>No greens means all eight draws are red, and independence lets the eight probabilities multiply.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge1) = \boxed{1-\left(\frac{m}{n+m}\right)^{8}}" />,
    reason: <>Matches option <b>C</b>: one minus the chance that all eight draws are red.</>,
    more: (
      <>
        Option <b>E</b> is <Katex tex="1-\Pr(X=1)=1-8\left(\tfrac{n}{n+m}\right)\left(\tfrac{m}{n+m}\right)^7" />, and
        option <b>D</b> is the same with the factor 8 dropped; that 8 counts the 8 positions the single green could be
        in. Option <b>A</b> is <Katex tex="\Pr(X=1)" /> itself, the chance of <em>exactly</em> one green. Option{' '}
        <b>B</b> uses green&apos;s probability where red&apos;s belongs: it is{' '}
        <Katex tex="1-\Pr(\text{all eight green})" />, the chance of at least one <em>red</em>. The condition{' '}
        <Katex tex="n\ne m" /> is there so that B and C are different: if <Katex tex="n=m" />, both fractions equal{' '}
        <Katex tex="\tfrac12" />.
      </>
    ),
  },
]

export default function MethodsQ8_2023() {
  return (
    <MCQShell
      question={
        <p>
          A box contains <Katex tex="n" /> green balls and <Katex tex="m" /> red balls. A ball
          is selected at random, and its colour is noted. The ball is then replaced in the box.
          <br />
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
