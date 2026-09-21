// 2015 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 63% correct.
// A large power of a complex number via De Moivre. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 16, C: 8, D: 8, E: 4 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="z^{63}=\left(2\sqrt3\right)^{63}\mathrm{cis}(21\pi)=\left(2\sqrt3\right)^{63}\mathrm{cis}(\pi)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = \sqrt{\left(\sqrt3\right)^2+3^2} = \sqrt{3+9} = 2\sqrt3" />,
    reason: <>The modulus. <Katex tex="\sqrt{12}=2\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}(z) = \arctan\!\left(\frac{3}{\sqrt3}\right) = \arctan\!\left(\sqrt3\right) = \tfrac\pi3" />,
    reason: <><Katex tex="z" /> is in the first quadrant, so the principal argument is the arctangent outright. Note <Katex tex="\tfrac3{\sqrt3}=\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="z^{63} = \left(2\sqrt3\right)^{63}\mathrm{cis}\!\left(63\times\tfrac\pi3\right)" />,
    reason: <>De Moivre. The modulus is a huge positive number, so only the argument decides the answer.</>,
  },
  {
    working: <Katex display tex="63\times\tfrac\pi3 = 21\pi" />,
    reason: <>The reason the question chose 63: it divides by 3 exactly.</>,
  },
  {
    working: <Katex display tex="21\pi = 10\times2\pi + \pi \implies \mathrm{cis}(21\pi) = \mathrm{cis}(\pi) = -1" />,
    reason: <>Subtracting full turns. An <em>odd</em> multiple of <Katex tex="\pi" /> lands on the negative real axis.</>,
  },
  {
    working: <Katex display tex="\boxed{z^{63} = -\left(2\sqrt3\right)^{63}}" />,
    reason: <>Real and negative — option A. Landing on <Katex tex="\mathrm{cis}\!\left(\tfrac{3\pi}2\right)" /> instead (a negative multiple of <Katex tex="i" />) is option B, the most popular wrong answer.</>,
  },
]

export default function SpecialistQ7_2015() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="z=\sqrt3+3i" />, then <Katex tex="z^{63}" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <>real and negative</>, isAnswer: true },
        { letter: 'B', content: <>equal to a negative real multiple of <Katex tex="i" /></> },
        { letter: 'C', content: <>real and positive</> },
        { letter: 'D', content: <>equal to a positive real multiple of <Katex tex="i" /></> },
        { letter: 'E', content: <>a positive real multiple of <Katex tex="1+i\sqrt3" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
