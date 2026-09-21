// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 9. VCAA examination report: 76% correct.
// The inverse of 1/sqrt(x) + 4, domain included. Question text transcribed from the original
// paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 76, B: 2, C: 3, D: 4, E: 15 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{1}{\sqrt x}+4 \implies x = \frac{1}{\sqrt y}+4" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then make the new <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x-4 = \frac{1}{\sqrt y} \implies \sqrt y = \frac{1}{x-4}" />,
    reason: <>Taking reciprocals of both sides.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x) = \frac{1}{(x-4)^2}" />,
    reason: <>Squaring. Options with <Katex tex="(x+4)^2" /> have the translation the wrong way.</>,
  },
  {
    working: <Katex display tex="x>0 \implies \frac{1}{\sqrt x} > 0 \implies f(x) > 4" />,
    reason: <>The range of <Katex tex="f" />: the reciprocal of a positive square root is positive but can be made as small or as large as you like, so <Katex tex="f" /> takes every value above 4.</>,
  },
  {
    working: <Katex display tex="\text{domain of } f^{-1} = \text{range of } f = (4,\infty)" />,
    reason: <>The domain is half the answer — the rule alone appears in both options A and E.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}:(4,\infty)\to R,\ f^{-1}(x) = \tfrac{1}{(x-4)^2}}" />,
    reason: <>Option A. Option E has the same rule with the domain <Katex tex="(-\infty,4)" />, which was the most popular wrong answer at 15%.</>,
  },
]

export default function MethodsQ9_2014() {
  return (
    <MCQShell
      question={
        <p>
          The inverse of the function <Katex tex="f:R^+\to R" />,{' '}
          <Katex tex="f(x)=\dfrac{1}{\sqrt x}+4" /> is
        </p>
      }
      background={
        <p>
          An inverse is not finished until its domain is stated, and that domain is the{' '}
          <em>range</em> of the original function. Here two options share the correct rule and
          differ only in the domain, so the range of <Katex tex="f" /> is what decides it.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f^{-1}:(4,\infty)\to R,\ f^{-1}(x)=\tfrac{1}{(x-4)^2}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="f^{-1}:R^+\to R,\ f^{-1}(x)=\tfrac{1}{x^2}+4" /> },
        { letter: 'C', content: <Katex tex="f^{-1}:R^+\to R,\ f^{-1}(x)=(x+4)^2" /> },
        { letter: 'D', content: <Katex tex="f^{-1}:(-4,\infty)\to R,\ f^{-1}(x)=\tfrac{1}{(x+4)^2}" /> },
        { letter: 'E', content: <Katex tex="f^{-1}:(-\infty,4)\to R,\ f^{-1}(x)=\tfrac{1}{(x-4)^2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
