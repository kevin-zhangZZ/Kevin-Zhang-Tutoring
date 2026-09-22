// 2024 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 66% correct.
// Bayes, read straight off a two-branch tree. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 18, C: 66, D: 11 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(L\cap P) = 0.45\times0.30 = 0.135" />,
    reason: 'Limousine, then photo — the product along that branch of the tree.',
  },
  {
    working: <Katex display tex="\Pr(D\cap P) = 0.55\times0.60 = 0.33" />,
    reason: 'Driven by a parent, then photo.',
  },
  {
    working: <Katex display tex="\Pr(P) = 0.135+0.33 = 0.465" />,
    reason: 'Every student took one route or the other, so the two branches cover all the photos.',
  },
  {
    working: <Katex display tex="\Pr(L\mid P) = \frac{\Pr(L\cap P)}{\Pr(P)} = \frac{0.135}{0.465}" />,
    reason: 'The conditional probability formula — the question reverses the conditioning, which is what makes it a Bayes problem.',
  },
  {
    working: <Katex display tex="\boxed{\frac{135}{465} = \frac{9}{31}}" />,
    reason: <>Option <b>C</b>; about <Katex tex="0.29" />. Sensible: limousine riders are both fewer and less likely to be photographed, so among photographed students they are well under half.</>,
  },
]

export default function MethodsQ9_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            At a Year 12 formal, 45% of the students travelled to the event in a hired
            limousine, while the remaining 55% were driven to the event by a parent.
          </p>
          <p>
            Of the students who travelled in a hired limousine, 30% had a professional photo
            taken. Of the students who were driven by a parent, 60% had a professional photo
            taken.
          </p>
          <p>
            Given that a student had a professional photo taken, what is the probability that
            the student travelled to the event in a hired limousine?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac18" /> },
        { letter: 'B', content: <Katex tex="\frac{27}{200}" /> },
        { letter: 'C', content: <Katex tex="\frac{9}{31}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\frac{22}{31}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
