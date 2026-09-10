// 2019 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 56% correct.
// Finding Arg(z^5/w^4) given Arg(z) and Arg(w). Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 56, B: 15, C: 8, D: 15, E: 6 },
  answer: 'A',
  noAnswer: 1,
  comment: <>Reduce <Katex tex="\mathrm{Arg}(z^5)" /> back into <Katex tex="(-\pi,\pi]" /> before subtracting.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Arg}(z^5) = 5\,\mathrm{Arg}(z) = 5\cdot\tfrac{\pi}{2} = \tfrac{5\pi}{2}" />,
    reason: <>Argument of a power multiplies: <Katex tex="\mathrm{Arg}(z^n)=n\,\mathrm{Arg}(z)" /> (before reducing to the principal range).</>,
  },
  {
    working: <Katex display tex="\tfrac{5\pi}{2} - 2\pi = \tfrac{\pi}{2}" />,
    reason: <>Reduce into the principal range <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}(w^4) = 4\,\mathrm{Arg}(w) = 4\cdot\tfrac{\pi}{4} = \pi" />,
    reason: 'Already in the principal range.',
  },
  {
    working: <Katex display tex="\mathrm{Arg}\!\left(\frac{z^5}{w^4}\right) = \mathrm{Arg}(z^5) - \mathrm{Arg}(w^4) = \tfrac{\pi}{2} - \pi" />,
    reason: 'Argument of a quotient subtracts.',
  },
  {
    working: <Katex display tex="\boxed{= -\tfrac{\pi}{2}}" />,
    reason: <>Already inside <Katex tex="(-\pi,\pi]" /> — matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ6_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z,w\in\mathbb{C}" />, where <Katex tex="\mathrm{Arg}(z) = \tfrac{\pi}{2}" /> and{' '}
          <Katex tex="\mathrm{Arg}(w) = \tfrac{\pi}{4}" />. The value of <Katex tex="\mathrm{Arg}\!\left(\dfrac{z^5}{w^4}\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\tfrac{\pi}{2}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac{\pi}{2}" /> },
        { letter: 'C', content: <Katex tex="\pi" /> },
        { letter: 'D', content: <Katex tex="2\pi" /> },
        { letter: 'E', content: <Katex tex="\tfrac{7\pi}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
