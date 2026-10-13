// 2016 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 75% correct.
// The inverse of g(x) = √(2x − 6) on [3, ∞): rule and domain. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 2, C: 2, D: 75, E: 12 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = \sqrt{2y-6}" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x^2 = 2y-6 \implies y = \frac{x^2+6}{2}" />,
    reason: <>Square both sides to remove the root, add 6, then halve.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g) = [0,\infty)" />,
    reason: <>The inverse's domain is the range of <Katex tex="g" />. On <Katex tex="[3,\infty)" />, <Katex tex="2x-6" /> runs over <Katex tex="[0,\infty)" />, and so does its square root.</>,
    more: <>Swapping <Katex tex="x" /> and <Katex tex="y" /> swaps the roles of domain and range, so <Katex tex="\text{dom}(g^{-1})=\text{ran}(g)" /> and <Katex tex="\text{ran}(g^{-1})=\text{dom}(g)=[3,\infty)" />. The rule <Katex tex="\frac{x^2+6}{2}" /> on its own would accept negative <Katex tex="x" />, but <Katex tex="g" /> never outputs a negative number (a square root is never negative), so those values can't be in the inverse's domain.</>,
  },
  {
    working: <Katex display tex="g^{-1}(0)=\frac{0+6}{2}=3 \ \checkmark" />,
    reason: <>A quick check: the inverse should send the smallest output of <Katex tex="g" /> back to the smallest input, and <Katex tex="g(3)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g^{-1}:[0,\infty)\to R,\ g^{-1}(x)=\frac{x^2+6}{2}}" />,
    reason: <>Matches option <b>D</b>: the right rule on the domain <Katex tex="[0,\infty)" />.</>,
    more: <>A (10%) and E (12%) carry the same rule on the wrong domain: A uses the domain of <Katex tex="g" />, <Katex tex="[3,\infty)" />, instead of its range, and E uses all of <Katex tex="R" />. B squares the expression under the root, <Katex tex="(2x-6)^2" />, instead of solving for <Katex tex="y" />. C halves and adds 6 in the wrong order and keeps a square root where it should square; it also fails the check above, since <Katex tex="\sqrt{0+6}=\sqrt6\neq3" />. The inverse undoes <Katex tex="g" />'s steps (double, subtract 6, square-root) in reverse: square, add 6, then halve.</>,
  },
]

export default function MethodsQ5_2016() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following is the inverse function of{' '}
          <Katex tex="g:[3,\infty)\to R" />, <Katex tex="g(x)=\sqrt{2x-6}" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="g^{-1}:[3,\infty)\to R,\ g^{-1}(x)=\tfrac{x^2+6}{2}" /> },
        { letter: 'B', content: <Katex tex="g^{-1}:[0,\infty)\to R,\ g^{-1}(x)=(2x-6)^2" /> },
        { letter: 'C', content: <Katex tex="g^{-1}:[0,\infty)\to R,\ g^{-1}(x)=\sqrt{\tfrac{x}{2}+6}" /> },
        { letter: 'D', content: <Katex tex="g^{-1}:[0,\infty)\to R,\ g^{-1}(x)=\tfrac{x^2+6}{2}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="g^{-1}:R\to R,\ g^{-1}(x)=\tfrac{x^2+6}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
