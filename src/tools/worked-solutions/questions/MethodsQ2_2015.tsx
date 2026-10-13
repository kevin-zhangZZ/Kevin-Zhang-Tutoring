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
    reason: <>Square both sides, then take the reciprocal of both sides.</>,
    more: <>Squaring can add extra solutions (a negative <Katex tex="x" /> gives the same <Katex tex="x^2" />), but here nothing extra comes in: in the inverse, <Katex tex="x" /> stands for an output of <Katex tex="f" />, which is always positive.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x) = \frac{1}{x^2}-2" />,
    reason: <>Subtract <Katex tex="2" />. Options A and B both have this rule, so the domain decides between them.</>,
  },
  {
    working: <Katex display tex="x>-2 \implies \sqrt{x+2}>0 \implies \frac{1}{\sqrt{x+2}}>0" />,
    reason: <>The domain of <Katex tex="f^{-1}" /> is the range of <Katex tex="f" />. Every output of <Katex tex="f" /> is positive, so <Katex tex="\text{ran}(f)=R^+" />.</>,
    more: <>Every positive value is actually reached: as <Katex tex="x\to-2^+" />, <Katex tex="f(x)\to\infty" />, and as <Katex tex="x\to\infty" />, <Katex tex="f(x)\to0^+" />, with <Katex tex="f" /> continuous in between. So the range is all of <Katex tex="(0,\infty)" />, not just part of it.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}:R^+\to R,\ f^{-1}(x)=\frac{1}{x^2}-2}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option B (chosen by 42%) has the right rule, but <Katex tex="R\setminus\{0\}" /> is just where the rule <Katex tex="\tfrac{1}{x^2}-2" /> is defined. It includes negative inputs, and <Katex tex="f" /> never produces a negative output, so those values cannot be in the domain of the inverse. Always take the inverse's domain from the range of <Katex tex="f" />, not from where its rule happens to work. Option C adds <Katex tex="2" /> instead of subtracting it; option D drops the reciprocal, adds <Katex tex="2" /> instead of subtracting it, and reuses <Katex tex="f" />'s domain; option E subtracts <Katex tex="2" /> before taking the reciprocal and has the wrong domain.</>,
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
          first: here it rules out B, D and E at once, leaving only the rule to check.
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
