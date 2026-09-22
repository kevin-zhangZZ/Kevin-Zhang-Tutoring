// 2023 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 69% correct.
// Dividing exponentials means subtracting indices. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 69, C: 8, D: 5, E: 4 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)\,g(x) = e^{(x-1)^2} \implies g(x) = \frac{e^{(x-1)^2}}{e^{x-1}}" />,
    reason: 'Divide both sides by f(x). Both are exponentials, so the division is an index subtraction.',
  },
  {
    working: <Katex display tex="g(x) = e^{(x-1)^2-(x-1)}" />,
    reason: <><Katex tex="\tfrac{e^A}{e^B}=e^{A-B}" />. Nothing is expanded yet.</>,
  },
  {
    working: <Katex display tex="(x-1)^2-(x-1) = (x-1)\bigl[(x-1)-1\bigr]" />,
    reason: <>Factorising by the common <Katex tex="(x-1)" /> is faster than expanding to <Katex tex="x^2-3x+2" /> and re-factorising.</>,
  },
  {
    working: <Katex display tex="= (x-1)(x-2)" />,
    reason: 'Simplifying the bracket.',
  },
  {
    working: <Katex display tex="\boxed{g(x) = e^{(x-2)(x-1)}}" />,
    reason: <>Option <b>B</b>. Check at <Katex tex="x=0" />: <Katex tex="f(0)g(0)=e^{-1}\cdot e^{2}=e" /> and <Katex tex="e^{(0-1)^2}=e" /> ✓.</>,
  },
]

export default function MethodsQ16_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=e^{x-1}" />. Given that the product function{' '}
          <Katex tex="f(x)\cdot g(x)=e^{(x-1)^2}" />, the rule for the function{' '}
          <Katex tex="g" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="g(x)=e^{x-1}" /> },
        { letter: 'B', content: <Katex tex="g(x)=e^{(x-2)(x-1)}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="g(x)=e^{(x+2)(x-1)}" /> },
        { letter: 'D', content: <Katex tex="g(x)=e^{x(x-2)}" /> },
        { letter: 'E', content: <Katex tex="g(x)=e^{x(x-3)}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
