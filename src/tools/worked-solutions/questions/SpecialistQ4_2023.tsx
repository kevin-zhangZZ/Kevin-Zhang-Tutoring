// 2023 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 62% correct.
// A quotient whose parameter cancels, then converting to polar form. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 62, C: 6, D: 17, E: 4 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = -(2a+1)+2ai \implies \bar z = -(2a+1)-2ai" />,
    reason: <>The conjugate flips the sign of the imaginary part only. The question asks about z̄, not z.</>,
  },
  {
    working: <Katex display tex="1+\bar z = 1-2a-1-2ai = -2a-2ai = -2a(1+i)" />,
    reason: <>The constant term cancels, leaving a common factor of <Katex tex="-2a" />.</>,
  },
  {
    working: <Katex display tex="\frac{4a}{1+\bar z} = \frac{4a}{-2a(1+i)} = \frac{-2}{1+i}" />,
    reason: <>Every <Katex tex="a" /> disappears — which is why the answer is a fixed complex number, not a family.</>,
  },
  {
    working: <Katex display tex="= \frac{-2(1-i)}{(1+i)(1-i)} = \frac{-2(1-i)}{2} = -1+i" />,
    reason: <>Multiply above and below by the conjugate of the denominator.</>,
  },
  {
    working: <Katex display tex="|-1+i| = \sqrt2, \qquad \arg(-1+i) = \frac{3\pi}{4}" />,
    reason: <>Second quadrant, so the argument is obtuse and positive.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt2\,\mathrm{cis}\!\left(\frac{3\pi}{4}\right)}" />,
    reason: <>Matches option <b>B</b>. Option <b>D</b> has the same modulus with the argument in the wrong quadrant — that is what using <Katex tex="z" /> instead of <Katex tex="\bar z" /> produces.</>,
  },
]

export default function SpecialistQ4_2023() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="z=-(2a+1)+2ai" />, where <Katex tex="a" /> is a non-zero real
          constant, then <Katex tex="\dfrac{4a}{1+\bar z}" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt2\,\mathrm{cis}\!\left(\frac\pi4\right)" /> },
        { letter: 'B', content: <Katex tex="\sqrt2\,\mathrm{cis}\!\left(\frac{3\pi}{4}\right)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\mathrm{cis}\!\left(\frac\pi4\right)" /> },
        { letter: 'D', content: <Katex tex="\sqrt2\,\mathrm{cis}\!\left(-\frac{3\pi}{4}\right)" /> },
        { letter: 'E', content: <Katex tex="\mathrm{cis}\!\left(-\frac\pi4\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
