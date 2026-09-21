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
    reason: <>The conditional probability formula.</>,
  },
  {
    working: <Katex display tex="X<5 \implies X<8, \quad\text{so}\quad \Pr(X<5\cap X<8) = \Pr(X<5)" />,
    reason: <>One event is contained in the other, so the intersection is just the smaller one.</>,
  },
  {
    working: <Katex display tex="\Pr(X<5) = 1-\Pr(X>5) = 1-a" />,
    reason: <>The complement. (For a continuous variable <Katex tex="\Pr(X=5)=0" />, so <Katex tex="<" /> and <Katex tex="\le" /> make no difference.)</>,
  },
  {
    working: <Katex display tex="\Pr(X<8) = 1-b" />,
    reason: <>Likewise.</>,
  },
  {
    working: <Katex display tex="\Pr(X<5\mid X<8) = \frac{1-a}{1-b}" />,
    reason: <>Which is not among the options as written — multiply top and bottom by <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{a-1}{b-1}}" />,
    reason: <>Option E. Option A, <Katex tex="\tfrac ab" />, forgets the complements; option B is the probability of <Katex tex="5<X<8" /> divided by <Katex tex="\Pr(X<8)" />, a different conditional.</>,
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
