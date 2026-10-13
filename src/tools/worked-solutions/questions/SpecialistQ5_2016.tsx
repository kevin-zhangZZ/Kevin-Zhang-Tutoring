// 2016 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 72% correct.
// Finding a from Arg(−1 + ai) = −2π/3. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 72, B: 6, C: 7, D: 4, E: 10 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(-1+ai) = -\frac{2\pi}{3} \implies \text{third quadrant}" />,
    reason: <>An argument between <Katex tex="-\pi" /> and <Katex tex="-\tfrac{\pi}{2}" /> means below the real axis and left of the imaginary axis (real part <Katex tex="-1" /> ✓). So <Katex tex="a" /> must be negative: D and E are out.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(-\frac{2\pi}{3}\right) = \frac{a}{-1}" />,
    reason: <>The tangent of the argument is imaginary part over real part.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(-\frac{2\pi}{3}\right) = \tan\!\left(\frac{\pi}{3}\right) = \sqrt3" />,
    reason: <>Reference angle <Katex tex="\tfrac{\pi}{3}" />, and tangent is positive in the third quadrant.</>,
  },
  {
    working: <Katex display tex="\frac{a}{-1} = \sqrt3 \implies a = -\sqrt3" />,
    reason: <>Multiply both sides by <Katex tex="-1" />. The negative sign agrees with the first line.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\sqrt3}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Check: <Katex tex="-1-\sqrt3i" /> has modulus <Katex tex="2" /> and sits <Katex tex="\tfrac{\pi}{3}" /> below the negative real axis, so its argument is <Katex tex="-\pi+\tfrac{\pi}{3}=-\tfrac{2\pi}{3}" /> ✓. Option E (10%) is the second-quadrant point <Katex tex="-1+\sqrt3i" />, whose argument is <Katex tex="+\tfrac{2\pi}{3}" /> — the sign of the argument was ignored. Option B is <Katex tex="\sin\!\left(-\tfrac{2\pi}{3}\right)" />, which would be the imaginary part only if the modulus were 1; here it is 2. Option C comes from real over imaginary (<Katex tex="\cot" /> instead of <Katex tex="\tan" />): <Katex tex="\tfrac{-1}{a}=\sqrt3" /> gives <Katex tex="a=-\tfrac{1}{\sqrt3}" />. D makes that slip and also drops the sign.</>,
  },
]

export default function SpecialistQ5_2016() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\operatorname{Arg}(-1+ai)=-\dfrac{2\pi}{3}" />, then the real number{' '}
          <Katex tex="a" /> is
        </p>
      }
      background={
        <p>
          Arguments are where quadrant errors live. <Katex tex="\operatorname{Arg}" /> is measured
          from the positive real axis, anticlockwise if positive and clockwise if negative, and
          lies in <Katex tex="(-\pi,\pi]" />. Decide the quadrant <em>first</em>: turning{' '}
          <Katex tex="\tfrac{2\pi}{3}" /> clockwise lands in the third quadrant, and the signs of
          both parts follow before any arithmetic.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\sqrt3" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-\dfrac{\sqrt3}{2}" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{1}{\sqrt3}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{1}{\sqrt3}" /> },
        { letter: 'E', content: <Katex tex="\sqrt3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
