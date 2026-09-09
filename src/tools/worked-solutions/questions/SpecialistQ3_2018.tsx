// 2018 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 46% correct.
// The trap: the numerator shares factors with the denominator, so the "obvious" partial
// fraction form (matching the denominator as printed) is wrong — it must be simplified first.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 31, C: 5, D: 46, E: 15 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      Option B did not account for common factors, and its last term is not irreducible, so should not have{' '}
      <Katex tex="Dx" /> in the numerator.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2x^2+3x+1 = (2x+1)(x+1)" />,
    reason: <>Before setting up partial fractions, check whether the numerator factorises — it's the same degree pattern as <Katex tex="(2x+1)(x+1)" /> here.</>,
  },
  {
    working: <Katex display tex="x^2-1 = (x-1)(x+1)" />,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{2x^2+3x+1}{(2x+1)^3(x^2-1)} = \frac{(2x+1)(x+1)}{(2x+1)^3(x-1)(x+1)}" />
        <Katex display tex="= \frac{1}{(2x+1)^2(x-1)}" />
      </>
    ),
    reason: <>Cancel the common factors <Katex tex="(2x+1)" /> and <Katex tex="(x+1)" /> — this is the step option B misses.</>,
  },
  {
    working: <Katex display tex="\frac{1}{(2x+1)^2(x-1)} = \frac{A}{2x+1} + \frac{B}{(2x+1)^2} + \frac{C}{x-1}" />,
    reason: <>Now set up partial fractions for the <em>simplified</em> denominator — a repeated linear factor <Katex tex="(2x+1)^2" /> needs both <Katex tex="A/(2x+1)" /> and <Katex tex="B/(2x+1)^2" /> terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{A}{2x+1} + \frac{B}{(2x+1)^2} + \frac{C}{x-1}}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function SpecialistQ3_2018() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following, where <Katex tex="A" />, <Katex tex="B" />, <Katex tex="C" /> and{' '}
          <Katex tex="D" /> are non-zero real numbers, is the partial fraction form for the expression{' '}
          <Katex tex="\dfrac{2x^2+3x+1}{(2x+1)^3(x^2-1)}" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{B}{x-1} + \dfrac{C}{x+1}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{B}{(2x+1)^2} + \dfrac{C}{(2x+1)^3} + \dfrac{Dx}{x^2-1}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{Bx+C}{x^2-1}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{B}{(2x+1)^2} + \dfrac{C}{x-1}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{Bx+C}{(2x+1)^2} + \dfrac{D}{x-1}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
