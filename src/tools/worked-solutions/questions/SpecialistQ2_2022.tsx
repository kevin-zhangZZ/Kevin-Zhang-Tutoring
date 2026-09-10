// 2022 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 59% correct.
// Simplifying 1 − 4sin²(x)/(tan²(x)+1). Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 18, C: 7, D: 13, E: 59 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tan^2(x)+1 = \sec^2(x) = \frac{1}{\cos^2(x)}" />,
    reason: 'Pythagorean identity.',
  },
  {
    working: <Katex display tex="\frac{4\sin^2(x)}{\tan^2(x)+1} = 4\sin^2(x)\cos^2(x)" />,
    reason: 'Dividing by 1/cos²(x) is the same as multiplying by cos²(x).',
  },
  {
    working: <Katex display tex="4\sin^2(x)\cos^2(x) = \big(2\sin(x)\cos(x)\big)^2 = \sin^2(2x)" />,
    reason: <>Recognise the double-angle identity <Katex tex="\sin(2x)=2\sin(x)\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="1 - \sin^2(2x)" />,
    reason: 'Substitute back into the original expression.',
  },
  {
    working: <Katex display tex="\boxed{1-\sin^2(2x) = \cos^2(2x)}" />,
    reason: <>Pythagorean identity again — matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ2_2022() {
  return (
    <MCQShell
      question={<p>The expression <Katex tex="1 - \dfrac{4\sin^2(x)}{\tan^2(x)+1}" /> simplifies to</p>}
      options={[
        { letter: 'A', content: <Katex tex="\sin(x)\cos(x)" /> },
        { letter: 'B', content: <Katex tex="1-2\cos^2(2x)" /> },
        { letter: 'C', content: <Katex tex="2\sin(2x)" /> },
        { letter: 'D', content: <Katex tex="2\sin^2(2x)" /> },
        { letter: 'E', content: <Katex tex="\cos^2(2x)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
