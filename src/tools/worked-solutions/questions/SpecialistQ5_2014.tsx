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
    reason: <><Katex tex="\left(2\sqrt2\right)^2=2^2\times\left(\sqrt2\right)^2=4\times2=8" /> (square both factors, so not 4), and <Katex tex="2\times\tfrac{3\pi}{4}=\tfrac{3\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{cis}\!\left(\tfrac{3\pi}{2}\right) = \cos\!\left(\tfrac{3\pi}2\right)+i\sin\!\left(\tfrac{3\pi}2\right) = -i" />,
    reason: <>An angle of <Katex tex="\tfrac{3\pi}{2}" /> is three-quarters of a turn anticlockwise: straight down the negative imaginary axis.</>,
  },
  {
    working: <Katex display tex="\boxed{z^2 = -8i}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Every option is a multiple of <Katex tex="i" />, so the distractors differ only in size and direction. Option E, <Katex tex="-4i" />, has the right direction but squares <Katex tex="2\sqrt2" /> to 4 instead of 8. Option C, <Katex tex="-2\sqrt2\,i" />, doubles the argument but forgets to square the modulus. Options B and D point up the positive imaginary axis (argument <Katex tex="\tfrac{\pi}{2}" />), which no correct doubling of <Katex tex="\tfrac{3\pi}{4}" /> gives.</>,
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
