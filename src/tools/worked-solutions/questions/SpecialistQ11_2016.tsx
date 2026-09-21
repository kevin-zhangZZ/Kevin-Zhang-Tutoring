// 2016 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 75% correct.
// A scalar resolute equation solved for a parameter. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 10, C: 10, D: 75, E: 2 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}=\tfrac{10+\alpha^3}{\sqrt{17+\alpha^4}}=\tfrac{74}{\sqrt{273}}" />
      .
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 3(4)+2(-1)+\alpha\left(\alpha^2\right) = 10+\alpha^3" />,
    reason: <>Matching components. The <Katex tex="\underset{\sim}{k} " /> terms multiply to <Katex tex="\alpha^3" />, which is what makes this a cubic rather than a quadratic.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right| = \sqrt{16+1+\alpha^4} = \sqrt{17+\alpha^4}" />,
    reason: <>The <em>scalar</em> resolute divides by <Katex tex="\left|\underset{\sim}{b}\right|" />, not its square — that would be the vector resolute.</>,
  },
  {
    working: <Katex display tex="\frac{10+\alpha^3}{\sqrt{17+\alpha^4}} = \frac{74}{\sqrt{273}}" />,
    reason: <>Setting up the equation. Rather than solving it, match the two sides against the five options — one substitution each.</>,
  },
  {
    working: <Katex display tex="\alpha=4: \quad 17+256 = 273 \ \checkmark" />,
    reason: <>The denominator alone identifies the answer: only <Katex tex="\alpha^4=256" /> gives <Katex tex="273" />.</>,
  },
  {
    working: <Katex display tex="10+4^3 = 74 \ \checkmark" />,
    reason: <>And the numerator agrees.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = 4}" />,
    reason: <>Option D. On a multiple-choice question, checking candidates against a messy equation is almost always faster than solving it.</>,
  },
]

export default function SpecialistQ11_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let{' '}
            <Katex tex="\underset{\sim}{a}=3\underset{\sim}{i}+2\underset{\sim}{j}+\alpha\underset{\sim}{k}" />{' '}
            and{' '}
            <Katex tex="\underset{\sim}{b}=4\underset{\sim}{i}-\underset{\sim}{j}+\alpha^2\underset{\sim}{k}" />
            , where <Katex tex="\alpha" /> is a real constant.
          </p>
          <p>
            If the scalar resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of{' '}
            <Katex tex="\underset{\sim}{b}" /> is <Katex tex="\dfrac{74}{\sqrt{273}}" />,
            then <Katex tex="\alpha" /> equals
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
