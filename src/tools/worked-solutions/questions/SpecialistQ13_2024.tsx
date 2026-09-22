// 2024 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 81% correct.
// A known angle between two vectors, solved for the missing component. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 81, C: 10, D: 4 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (2)(2)+(-1)(m)+(2)(6) = 16-m" />,
    reason: 'The dot product carries the unknown.',
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = \sqrt{4+1+4} = 3, \qquad \left|\underset{\sim}{b}\right| = \sqrt{4+m^2+36} = \sqrt{40+m^2}" />,
    reason: 'A tidy 3 for the first magnitude.',
  },
  {
    working: <Katex display tex="\frac{16-m}{3\sqrt{40+m^2}} = \frac{13}{21}" />,
    reason: <>The angle is given as <Katex tex="\cos^{-1}\!\left(\tfrac{13}{21}\right)" />, so this is just <Katex tex="\cos\theta" /> written two ways.</>,
  },
  {
    working: <Katex display tex="21(16-m) = 39\sqrt{40+m^2} \implies 7(16-m) = 13\sqrt{40+m^2}" />,
    reason: <>Dividing by 3. Note <Katex tex="16-m" /> must be positive, since the right side is.</>,
  },
  {
    working: <Katex display tex="49\left(256-32m+m^2\right) = 169\left(40+m^2\right)" />,
    reason: 'Squaring both sides.',
  },
  {
    working: <Katex display tex="120m^2+1568m-5784 = 0 \implies 15m^2+196m-723 = 0" />,
    reason: 'Dividing through by 8.',
  },
  {
    working: <Katex display tex="m = \frac{-196\pm286}{30} \implies m = 3 \ \text{ or } \ m = -\tfrac{241}{15}" />,
    reason: <><Katex tex="\sqrt{196^2+4(15)(723)}=\sqrt{81796}=286" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 3}" />,
    reason: <>Option <b>B</b>: the question restricts <Katex tex="m\in\mathbb{R}^+" />, so the negative root is rejected. Substituting the four options into the cosine formula is a perfectly good alternative route.</>,
  },
]

export default function SpecialistQ13_2024() {
  return (
    <MCQShell
      question={
        <p>
          If the angle between the vectors{' '}
          <Katex tex="2\underset{\sim}{i}-\underset{\sim}{j}+2\underset{\sim}{k}" /> and{' '}
          <Katex tex="2\underset{\sim}{i}+m\underset{\sim}{j}+6\underset{\sim}{k}" /> is{' '}
          <Katex tex="\cos^{-1}\!\left(\dfrac{13}{21}\right)" />, then the value of{' '}
          <Katex tex="m" />, where <Katex tex="m\in\mathbb{R}^+" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
