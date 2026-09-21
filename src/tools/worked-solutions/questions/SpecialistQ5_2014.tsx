// 2014 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 85% correct.
// Squaring a complex number in polar form. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 85, B: 3, C: 5, D: 3, E: 4 },
  answer: 'A',
  noAnswer: 0,
  comment: <><Katex tex="z^2=8\,\mathrm{cis}\!\left(\tfrac{3\pi}{2}\right)" /></>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = 2\sqrt2\,\mathrm{cis}\!\left(\tfrac{3\pi}{4}\right)" />,
    reason: <>The given modulus and argument, written in polar form.</>,
  },
  {
    working: <Katex display tex="z^2 = \left(2\sqrt2\right)^2\mathrm{cis}\!\left(2\times\tfrac{3\pi}{4}\right)" />,
    reason: <>De Moivre: square the modulus, double the argument.</>,
  },
  {
    working: <Katex display tex="= 8\,\mathrm{cis}\!\left(\tfrac{3\pi}{2}\right)" />,
    reason: <><Katex tex="\left(2\sqrt2\right)^2=4\times2=8" /> — not 4, which is where option B comes from.</>,
  },
  {
    working: <Katex display tex="\mathrm{cis}\!\left(\tfrac{3\pi}{2}\right) = \cos\!\left(\tfrac{3\pi}2\right)+i\sin\!\left(\tfrac{3\pi}2\right) = -i" />,
    reason: <>Three-quarters of the way round, i.e. the negative imaginary axis.</>,
  },
  {
    working: <Katex display tex="\boxed{z^2 = -8i}" />,
    reason: <>Option A.</>,
  },
]

export default function SpecialistQ5_2014() {
  return (
    <MCQShell
      question={
        <p>
          If the complex number <Katex tex="z" /> has modulus <Katex tex="2\sqrt2" /> and
          argument <Katex tex="\tfrac{3\pi}{4}" />, then <Katex tex="z^2" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-8i" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="4i" /> },
        { letter: 'C', content: <Katex tex="-2\sqrt2 i" /> },
        { letter: 'D', content: <Katex tex="2\sqrt2 i" /> },
        { letter: 'E', content: <Katex tex="-4i" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
