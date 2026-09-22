// 2025 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 67% correct. This
// year's paper used four options (A–D) rather than five. Finding the constant that makes
// acceleration perpendicular to velocity at a given instant. Question text transcribed from
// the original paper. Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 12, C: 67, D: 15 },
  answer: 'C',
  comment: <>This question may be completed manually or using CAS. Find the velocity and acceleration vectors by differentiation, substitute the given time, and set their dot product to zero.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = ne^{-2t}\underset{\sim}{i}-t^2\underset{\sim}{j}" />,
    reason: 'The given position vector.',
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = -2ne^{-2t}\underset{\sim}{i}-2t\,\underset{\sim}{j}" />,
    reason: 'Differentiate each component.',
  },
  {
    working: <Katex display tex="\underset{\sim}{a}(t) = 4ne^{-2t}\underset{\sim}{i}-2\underset{\sim}{j}" />,
    reason: 'Differentiate again.',
  },
  {
    working: <Katex display tex="\underset{\sim}{v}\cdot\underset{\sim}{a} = -8n^2e^{-4t}+4t" />,
    reason: 'Perpendicular vectors have zero dot product.',
  },
  {
    working: <Katex display tex="t = \frac{1}{2}: \quad -8n^2e^{-2}+2 = 0" />,
    reason: 'Substituting the given time.',
  },
  {
    working: <Katex display tex="n^2 = \frac{2e^2}{8} = \frac{e^2}{4} \implies n = \frac{e}{2}" />,
    reason: <>The positive root, since the question states <Katex tex="n>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = \frac{e}{2}}" />,
    reason: <>Option <b>C</b>, about 1.359. Option B, <Katex tex="\tfrac{e^{0.5}}{2}" />, comes from forgetting to square n.</>,
  },
]

export default function SpecialistQ16_2025() {
  return (
    <MCQShell
      question={
        <p>
          The position vector of a particle at time <Katex tex="t" /> is given by{' '}
          <Katex tex="\underset{\sim}{r}(t) = ne^{-2t}\underset{\sim}{i}-t^2\underset{\sim}{j}" />,
          where <Katex tex="n" /> is a positive constant.
          <br />
          For what value of <Katex tex="n" /> is the particle&rsquo;s acceleration perpendicular to
          its velocity when <Katex tex="t = \dfrac{1}{2}" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2e" /> },
        { letter: 'B', content: <Katex tex="\dfrac{e^{0.5}}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{e}{2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{e}{2\sqrt2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
