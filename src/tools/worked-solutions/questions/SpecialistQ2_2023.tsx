// 2023 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 59% correct.
// An oblique asymptote pins two coefficients; a vertical one pins the third. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 59, C: 13, D: 14, E: 2 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{x^3}{ax^2+bx+c} = \frac{x}{a}-\frac{b}{a^2}+\frac{\text{remainder}}{ax^2+bx+c}" />,
    reason: <>Long division: a cubic over a quadratic gives a linear quotient, which is the oblique asymptote.</>,
  },
  {
    working: <Katex display tex="\frac{x}{a}-\frac{b}{a^2} = 2x+1" />,
    reason: <>Match the quotient to the given asymptote.</>,
  },
  {
    working: <Katex display tex="\frac1a = 2 \implies a = \frac12" />,
    reason: <>The gradient.</>,
  },
  {
    working: <Katex display tex="-\frac{b}{a^2} = -\frac{b}{1/4} = -4b = 1 \implies b = -\frac14" />,
    reason: <>The intercept: <Katex tex="a^2=\tfrac14" />, not <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="x=1 \text{ is a vertical asymptote} \implies a+b+c = 0" />,
    reason: <>The denominator must vanish there.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac12, \quad b = -\frac14, \quad c = -\frac14}" />,
    reason: <>Matches option <b>B</b>: <Katex tex="\tfrac12-\tfrac14+c=0" />. Check: the denominator factorises as <Katex tex="\tfrac14(2x+1)(x-1)" />, so <Katex tex="x=1" /> really is an asymptote.</>,
  },
]

export default function SpecialistQ2_2023() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\dfrac{x^3}{ax^2+bx+c}" /> has asymptotes given by{' '}
          <Katex tex="y=2x+1" /> and <Katex tex="x=1" />. The values of <Katex tex="a" />,{' '}
          <Katex tex="b" /> and <Katex tex="c" /> are, respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2,\ -4,\ 2" /> },
        { letter: 'B', content: <Katex tex="\tfrac12,\ -\tfrac14,\ -\tfrac14" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac12,\ \tfrac14,\ -\tfrac34" /> },
        { letter: 'D', content: <Katex tex="\tfrac12,\ -\tfrac14,\ -\tfrac34" /> },
        { letter: 'E', content: <Katex tex="2,\ -4,\ -8" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
