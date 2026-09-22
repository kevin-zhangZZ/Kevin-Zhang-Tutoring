// 2024 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Given the vector resolute of r in
// the direction of s, find the scalar resolute of s in the direction of r. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 36, C: 33, D: 17 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{vector resolute of } \underset{\sim}{r} \text{ on } \underset{\sim}{s} = \left(\frac{\underset{\sim}{r}\cdot\underset{\sim}{s}}{|\underset{\sim}{s}|^2}\right)\underset{\sim}{s}" />,
    reason: 'Standard formula for a vector resolute.',
  },
  {
    working: <Katex display tex="-4\underset{\sim}{i}+4\underset{\sim}{j}-2\underset{\sim}{k} = -2\big(2\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k}\big) = -2\underset{\sim}{s}" />,
    reason: <>Recognise the given resolute as a scalar multiple of <Katex tex="\underset{\sim}{s}" /> itself.</>,
  },
  {
    working: <Katex display tex="\frac{\underset{\sim}{r}\cdot\underset{\sim}{s}}{|\underset{\sim}{s}|^2} = -2 \;\implies\; \underset{\sim}{r}\cdot\underset{\sim}{s} = -2|\underset{\sim}{s}|^2" />,
    reason: 'Match coefficients with the formula above.',
  },
  {
    working: <Katex display tex="|\underset{\sim}{s}|^2 = 2^2+(-2)^2+1^2 = 9 \;\implies\; \underset{\sim}{r}\cdot\underset{\sim}{s} = -18" />,
    reason: <>Compute <Katex tex="|\underset{\sim}{s}|^2" /> directly from its components.</>,
  },
  {
    working: <Katex display tex="\text{scalar resolute of } \underset{\sim}{s} \text{ on } \underset{\sim}{r} = \frac{\underset{\sim}{s}\cdot\underset{\sim}{r}}{|\underset{\sim}{r}|}" />,
    reason: <>Different formula from the vector resolute — this one divides by <Katex tex="|\underset{\sim}{r}|" />, not <Katex tex="|\underset{\sim}{r}|^2" />, and the dot product is symmetric.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{-18}{9} = -2}" />,
    reason: <>Using <Katex tex="|\underset{\sim}{r}|=9" /> — matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ14_2024() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors <Katex tex="\underset{\sim}{r}" /> and <Katex tex="\underset{\sim}{s}" /> where <Katex tex="|\underset{\sim}{r}|=9" /> and{' '}
          <Katex tex="\underset{\sim}{s}=2\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k}" />.
          <br />
          If the vector resolute of <Katex tex="\underset{\sim}{r}" /> in the direction of <Katex tex="\underset{\sim}{s}" /> is equal to{' '}
          <Katex tex="-4\underset{\sim}{i}+4\underset{\sim}{j}-2\underset{\sim}{k}" />, then the scalar resolute of <Katex tex="\underset{\sim}{s}" /> in the direction
          of <Katex tex="\underset{\sim}{r}" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-18" /> },
        { letter: 'B', content: <Katex tex="-2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
