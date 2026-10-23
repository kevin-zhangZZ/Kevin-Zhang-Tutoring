// 2025 Mathematical Methods NHT — Exam 2, MCQ 19. The NHT report gives the answer key and a
// worked comment (a 6 × 6 tick table), with no statistics. Probability: counting outcomes of two
// dice that make a discriminant non-negative. Question text transcribed from the original paper
// (image-only, read from the rendered page); the report's comment is transcribed from the rendered
// report page, with its table summarised as counts per B. Solution is original; the answer A
// agrees with the report's key (brute-force count of B² ≥ 4C over 36 outcomes: 19).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      Consider a table of <Katex tex="B" /> against <Katex tex="C" />. For each cell, as long as{' '}
      <Katex tex="B^2-4C\ge0" />, put a tick. For example, when <Katex tex="B=1" /> and <Katex tex="C=1" />,{' '}
      <Katex tex="1<4\times1" />, a cross; and when <Katex tex="B=2" /> and <Katex tex="C=1" />,{' '}
      <Katex tex="2^2=4=4" />, a tick.
      <br />
      Each cell has a probability <Katex tex="\tfrac16\times\tfrac16=\tfrac1{36}" />. Counting the number of
      ticks – there are 19.
      <br />
      Hence, <Katex tex="\Pr\left(B^2\ge4C\right)=\tfrac{19}{36}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta=B^2-4C\ge0" />,
    reason: <>&ldquo;At least one real solution&rdquo; means the discriminant is zero (one solution) or positive (two).</>,
  },
  {
    working: <Katex display tex="C\le\frac{B^2}{4}" />,
    reason: <>For each value of <Katex tex="B" />, count the values of <Katex tex="C" /> from 1 to 6 that satisfy this.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{array}{c|cccccc} B & 1 & 2 & 3 & 4 & 5 & 6 \\ \hline B^2/4 & 0.25 & 1 & 2.25 & 4 & 6.25 & 9 \\ \text{valid } C & 0 & 1 & 2 & 4 & 6 & 6 \end{array}"
      />
    ),
    reason: <>The number of valid <Katex tex="C" /> values is <Katex tex="B^2/4" /> rounded down, capped at 6.</>,
  },
  {
    working: <Katex display tex="0+1+2+4+6+6=19\ \text{ of }\ 36" />,
    reason: <>All 36 ordered pairs <Katex tex="(B,C)" /> are equally likely.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{19}{36}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>C</b>, <Katex tex="\tfrac{17}{36}" />, is the complement (no real solutions). Using a strict <Katex tex="\Delta>0" /> drops the two cases where <Katex tex="\Delta=0" /> exactly, <Katex tex="(B,C)=(2,1)" /> and <Katex tex="(4,4)" />, and gives <Katex tex="\tfrac{17}{36}" /> too, but &ldquo;at least one&rdquo; includes the repeated root.</>,
  },
]

export default function MethodsQ19_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="B" /> and <Katex tex="C" /> be discrete random variables whose values are obtained from two
          rolls of a fair six-sided die.
          <br />
          Let <Katex tex="B" /> be the number obtained on the first roll and <Katex tex="C" /> be the number obtained on
          the second roll.
          <br />
          Find the probability that the quadratic equation <Katex tex="x^2+Bx+C=0" /> has <b>at least one</b> real
          solution.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{19}{36}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac12" /> },
        { letter: 'C', content: <Katex tex="\tfrac{17}{36}" /> },
        { letter: 'D', content: <Katex tex="\tfrac1{18}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
