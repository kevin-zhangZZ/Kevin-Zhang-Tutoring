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
    working: <Katex display tex="\begin{aligned} z &= -(2a+1)+2ai \\ \implies \bar z &= -(2a+1)-2ai \end{aligned}" />,
    reason: <>The expression has <Katex tex="\bar z" /> in it, not <Katex tex="z" />, so find the conjugate first: it keeps the real part and flips the sign of the imaginary part.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 1+\bar z &= 1-2a-1-2ai \\ &= -2a-2ai = -2a(1+i) \end{aligned}" />,
    reason: <>The 1s cancel, leaving <Katex tex="-2a" /> as a common factor. Factorising it out sets up the cancellation in the next line.</>,
  },
  {
    working: <Katex display tex="\frac{4a}{1+\bar z} = \frac{4a}{-2a(1+i)} = \frac{-2}{1+i}" />,
    reason: <>We are told <Katex tex="a\neq0" />, so cancelling to <Katex tex="\tfrac{4a}{-2a}=-2" /> is allowed. Every <Katex tex="a" /> disappears, so the answer is one fixed complex number whatever the value of <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="= \frac{-2(1-i)}{(1+i)(1-i)} = \frac{-2(1-i)}{2} = -1+i" />,
    reason: <>To get a real denominator, multiply above and below by its conjugate <Katex tex="1-i" />: <Katex tex="(1+i)(1-i)=1-i^2=2" />.</>,
  },
  {
    working: <Katex display tex="|-1+i| = \sqrt{(-1)^2+1^2} = \sqrt2" />,
    reason: <>Modulus: <Katex tex="|x+yi|=\sqrt{x^2+y^2}" />.</>,
  },
  {
    working: <Katex display tex="\arg(-1+i) = \pi-\frac{\pi}{4} = \frac{3\pi}{4}" />,
    reason: <>The point <Katex tex="(-1,\,1)" /> is in the second quadrant. Its angle with the negative real axis is <Katex tex="\tan^{-1}\!\left(\tfrac11\right)=\tfrac\pi4" />, so the argument is <Katex tex="\pi-\tfrac\pi4" />. Plain <Katex tex="\tan^{-1}\!\left(\tfrac{1}{-1}\right)=-\tfrac\pi4" /> would point into the fourth quadrant, so always place the point first.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt2\,\mathrm{cis}\!\left(\frac{3\pi}{4}\right)}" />,
    reason: <>Matches option <b>B</b>. Option <b>D</b>, <Katex tex="\sqrt2\,\mathrm{cis}\!\left(-\tfrac{3\pi}{4}\right)=-1-i" />, is what using <Katex tex="z" /> instead of <Katex tex="\bar z" /> gives: <Katex tex="1+z=-2a(1-i)" />, so <Katex tex="\tfrac{4a}{1+z}=\tfrac{-2}{1-i}=-1-i" />. Option <b>A</b> has the right modulus but the argument <Katex tex="\tfrac\pi4" />, which points into the first quadrant.</>,
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
