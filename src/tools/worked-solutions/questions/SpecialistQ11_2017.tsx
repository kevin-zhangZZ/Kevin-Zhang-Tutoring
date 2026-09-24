// 2017 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 76% correct.
// Linear dependence of three vectors, solved for the unknown component. Question text
// transcribed from the original paper; answer checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 9, C: 76, D: 7, E: 2 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a} = k\underset{\sim}{b}+l\underset{\sim}{c}" />,
    reason: <>Three vectors in space are linearly dependent exactly when one is a combination of the other two. Solving the three component equations for <Katex tex="k" />, <Katex tex="l" /> and <Katex tex="d" /> is the standard route.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}:\ 2 = k+2l; \qquad \underset{\sim}{j}:\ 3 = k+l" />,
    reason: <>Take the two components that do not involve <Katex tex="d" /> first, so they solve on their own.</>,
  },
  {
    working: <Katex display tex="l = -1, \qquad k = 4" />,
    reason: <>Subtracting the second equation from the first gives <Katex tex="-1=l" />, then <Katex tex="k=3-l=4" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{k}:\ d = 4(-4)+(-1)(-2)" />,
    reason: <>Now the third component fixes <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d = -14}" />,
    reason: <>Matches option <b>C</b>. Option B is the condition for independence. Check: <Katex tex="4\underset{\sim}{b}-\underset{\sim}{c}=4\underset{\sim}{i}+4\underset{\sim}{j}-16\underset{\sim}{k}-2\underset{\sim}{i}-\underset{\sim}{j}+2\underset{\sim}{k}=2\underset{\sim}{i}+3\underset{\sim}{j}-14\underset{\sim}{k}" /> ✓.</>,
  },
]

export default function SpecialistQ11_2017() {
  return (
    <MCQShell
      question={
        <p>
          The vectors{' '}
          <Katex tex="\underset{\sim}{a}=2\underset{\sim}{i}+3\underset{\sim}{j}+d\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+\underset{\sim}{j}-4\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{c}=2\underset{\sim}{i}+\underset{\sim}{j}-2\underset{\sim}{k}" />
          , where <Katex tex="d" /> is a real constant, are linearly dependent if
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="d=-10" /> },
        { letter: 'B', content: <Katex tex="d\in R\setminus\{-14\}" /> },
        { letter: 'C', content: <Katex tex="d=-14" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="d\in R\setminus\{-10\}" /> },
        { letter: 'E', content: <Katex tex="d\in R" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
