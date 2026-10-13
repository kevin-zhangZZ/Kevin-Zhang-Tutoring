// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 14. VCAA examination report: 45% correct.
// A conditional probability expressed in terms of two tail probabilities. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 18, C: 10, D: 14, E: 45 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      If <Katex tex="X" /> is a continuous random variable, then{' '}
      <Katex tex="\Pr(X<5\mid X<8)=\dfrac{\Pr(X<5\cap X<8)}{\Pr(X<8)}=\dfrac{\Pr(X<5)}{\Pr(X<8)}=\dfrac{1-a}{1-b}=\dfrac{a-1}{b-1}" />
      .
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<5\mid X<8) = \frac{\Pr(X<5 \cap X<8)}{\Pr(X<8)}" />,
    reason: <>The conditional probability formula: <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &X<5 \implies X<8 \\ &\Pr(X<5\cap X<8) = \Pr(X<5) \end{aligned}" />,
    reason: <>Any value below 5 is also below 8, so "both" is the same event as "below 5".</>,
    more: <>The events are not independent, so don't multiply <Katex tex="\Pr(X<5)\times\Pr(X<8)" />. One event sits inside the other, and the intersection is simply the smaller event.</>,
  },
  {
    working: <Katex display tex="\Pr(X<5) = 1-\Pr(X>5) = 1-a" />,
    reason: <>Complement rule, treating <Katex tex="X" /> as continuous so <Katex tex="\Pr(X=5)=0" />.</>,
    more: <>The question doesn't say <Katex tex="X" /> is continuous; the report's solution assumes it. That assumption is what lets <Katex tex="X<5" /> be the complement of <Katex tex="X>5" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X<8) = 1-\Pr(X>8) = 1-b" />,
    reason: <>The same complement rule at 8.</>,
  },
  {
    working: <Katex display tex="\Pr(X<5\mid X<8) = \frac{1-a}{1-b}" />,
    reason: <>This form is not among the options. Multiply top and bottom by <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{a-1}{b-1}}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        B was the most popular wrong answer:{' '}
        <Katex tex="\tfrac{a-b}{1-b}=\tfrac{\Pr(5<X<8)}{\Pr(X<8)}=\Pr(X>5\mid X<8)" />, the
        opposite conditional (B and E add to 1). A, <Katex tex="\tfrac ab" />, divides the given
        upper tails without taking complements, and C is the correct fraction upside down —
        both are greater than 1 (here <Katex tex="b<a" />, since <Katex tex="X>8" /> is a smaller event than{' '}
        <Katex tex="X>5" />), and a conditional probability can never exceed 1. D,{' '}
        <Katex tex="\tfrac{ab}{1-b}" />, multiplies the given tails <Katex tex="a=\Pr(X>5)" /> and{' '}
        <Katex tex="b=\Pr(X>8)" /> as if the events were independent, and never takes complements
        (the numerator should be <Katex tex="\Pr(X<5)=1-a" />).
      </>
    ),
  },
]

export default function MethodsQ14_2014() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="X" /> is a random variable such that{' '}
          <Katex tex="\Pr(X>5)=a" /> and <Katex tex="\Pr(X>8)=b" />, then{' '}
          <Katex tex="\Pr(X<5\mid X<8)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac ab" /> },
        { letter: 'B', content: <Katex tex="\tfrac{a-b}{1-b}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{1-b}{1-a}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{ab}{1-b}" /> },
        { letter: 'E', content: <Katex tex="\tfrac{a-1}{b-1}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
