// 2025 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 70% correct. This
// year's paper used four options (A–D) rather than five. The real part of 1/(1-z) for z on
// the unit circle. Question text transcribed from the original paper. Answers checked with
// sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 11, C: 70, D: 10 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="z=a+bi" />
      <br />
      <Katex tex="|z|=1\Rightarrow a^2+b^2=1" />
      <br />
      <Katex tex="re\left(\dfrac{1}{1-z}\right)=\dfrac{-a+1}{a^2-2a+b^2+1}" />
      <br />
      <Katex tex="=\dfrac{-a+1}{1-2a+1}" />
      <br />
      <Katex tex="=\dfrac{-(a-1)}{-2(a-1)}" />
      <br />
      <Katex tex="=\dfrac{1}{2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = 1 \implies z = \cos(\theta)+i\sin(\theta)" />,
    reason: <>Every point on the unit circle can be written this way. Working with a general θ shows the answer is the same for all of them.</>,
  },
  {
    working: <Katex display tex="1-z = \big(1-\cos(\theta)\big)-i\sin(\theta)" />,
    reason: <>Subtracting, and collecting real and imaginary parts.</>,
  },
  {
    working: <Katex display tex="\frac{1}{1-z} = \frac{\big(1-\cos(\theta)\big)+i\sin(\theta)}{\big(1-\cos(\theta)\big)^2+\sin^2(\theta)}" />,
    reason: <>Multiply numerator and denominator by the conjugate of the denominator.</>,
  },
  {
    working: <Katex display tex="\big(1-\cos\theta\big)^2+\sin^2\theta = 1-2\cos\theta+\cos^2\theta+\sin^2\theta = 2-2\cos\theta" />,
    reason: <>Using <Katex tex="\cos^2+\sin^2=1" />. The denominator is twice the real part of the numerator — that is the whole trick.</>,
  },
  {
    working: <Katex display tex="\operatorname{Re}\left(\frac{1}{1-z}\right) = \frac{1-\cos(\theta)}{2\big(1-\cos(\theta)\big)}" />,
    reason: <>The condition <Katex tex="z\neq1" /> guarantees <Katex tex="\cos\theta\neq1" />, so this cancellation is legal.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{1}{2}}" />,
    reason: <>Matches option <b>C</b> — a constant, independent of where z sits on the circle.</>,
  },
]

export default function SpecialistQ6_2025() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z\in C" />.
          <br />
          Given that <Katex tex="|z| = 1" /> and <Katex tex="z\neq1" />,{' '}
          <Katex tex="\operatorname{Re}\left(\dfrac{1}{1-z}\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{1}{2}" /> },
        { letter: 'B', content: <Katex tex="0" /> },
        { letter: 'C', content: <Katex tex="\dfrac{1}{2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{\sqrt3}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
