// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 2. VCAA examination report: 50% correct.
// The inverse of 1/√(x+2), rule and domain. Question text transcribed from the original
// paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 50, B: 42, C: 3, D: 2, E: 2 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = \frac{1}{\sqrt{y+2}}" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x^2 = \frac{1}{y+2} \implies y+2 = \frac{1}{x^2}" />,
    reason: <>Squaring, then taking reciprocals.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x) = \frac{1}{x^2}-2" />,
    reason: <>The rule. Three of the five options carry it — the domain is what decides.</>,
  },
  {
    working: <Katex display tex="x>-2 \implies \sqrt{x+2}>0 \implies \frac{1}{\sqrt{x+2}}>0" />,
    reason: <>So <Katex tex="\text{ran}(f)=R^+" />: the outputs are strictly positive, never zero and never negative.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}:R^+\to R,\ f^{-1}(x)=\frac{1}{x^2}-2}" />,
    reason: <>Option A. Option B's <Katex tex="R\setminus\{0\}" /> — chosen by 42% — allows negative inputs, but <Katex tex="f" /> never produces a negative output, so those values are not in the domain of the inverse.</>,
  },
]

export default function MethodsQ2_2015() {
  return (
    <MCQShell
      question={
        <p>
          The inverse function of <Katex tex="f:(-2,\infty)\to R" />,{' '}
          <Katex tex="f(x)=\dfrac{1}{\sqrt{x+2}}" /> is
        </p>
      }
      background={
        <p>
          When several options share a rule, the question is really about the domain. The
          domain of an inverse is the <em>range</em> of the original — so work that out
          first and the answer usually falls out without touching the algebra.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f^{-1}:R^+\to R,\ f^{-1}(x)=\tfrac{1}{x^2}-2" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="f^{-1}:R\setminus\{0\}\to R,\ f^{-1}(x)=\tfrac{1}{x^2}-2" /> },
        { letter: 'C', content: <Katex tex="f^{-1}:R^+\to R,\ f^{-1}(x)=\tfrac{1}{x^2}+2" /> },
        { letter: 'D', content: <Katex tex="f^{-1}:(-2,\infty)\to R,\ f^{-1}(x)=x^2+2" /> },
        { letter: 'E', content: <Katex tex="f^{-1}:(2,\infty)\to R,\ f^{-1}(x)=\tfrac{1}{x^2-2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
