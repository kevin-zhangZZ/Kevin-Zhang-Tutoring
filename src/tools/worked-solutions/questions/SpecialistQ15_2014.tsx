// 2014 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 69% correct.
// The angle between two vectors, then a double angle. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 69, C: 12, D: 8, E: 5 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = \sqrt3(1)+4(-4)+(-1)\sqrt3" />,
    reason: <>Componentwise. The two <Katex tex="\sqrt3" /> terms cancel.</>,
  },
  {
    working: <Katex display tex="= -16" />,
    reason: <>Negative, so the angle is obtuse and <Katex tex="\cos(\theta)<0" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = \sqrt{3+16+1} = \sqrt{20}, \qquad \left|\underset{\sim}{b}\right| = \sqrt{1+16+3} = \sqrt{20}" />,
    reason: <>Both magnitudes are the same, which keeps the arithmetic tidy.</>,
  },
  {
    working: <Katex display tex="\cos(\theta) = \frac{-16}{\sqrt{20}\sqrt{20}} = -\frac{16}{20} = -\frac45" />,
    reason: <>This is <Katex tex="\cos(\theta)" />, not the answer — option A stops here.</>,
  },
  {
    working: <Katex display tex="\cos(2\theta) = 2\cos^2(\theta)-1" />,
    reason: <>The double-angle identity in the form that needs only <Katex tex="\cos(\theta)" />.</>,
  },
  {
    working: <Katex display tex="= 2\times\tfrac{16}{25}-1 = \tfrac{32}{25}-\tfrac{25}{25}" />,
    reason: <>Squaring removes the sign, so the answer comes out positive.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{7}{25}}" />,
    reason: <>Option B. Option C is the same magnitude with the sign of <Katex tex="\cos\theta" /> carried through by mistake.</>,
  },
]

export default function SpecialistQ15_2014() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\theta" /> is the angle between{' '}
          <Katex tex="\underset{\sim}{a}=\sqrt3\,\underset{\sim}{i}+4\underset{\sim}{j}-\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-4\underset{\sim}{j}+\sqrt3\,\underset{\sim}{k}" />
          , then <Katex tex="\cos(2\theta)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\tfrac45" /> },
        { letter: 'B', content: <Katex tex="\tfrac{7}{25}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="-\tfrac{7}{25}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{14}{25}" /> },
        { letter: 'E', content: <Katex tex="-\tfrac{24}{25}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
