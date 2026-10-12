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
    reason: <>Every point on the unit circle can be written this way. Keeping <Katex tex="\theta" /> general shows whether the answer depends on <Katex tex="z" />.</>,
    more: <>The report works with <Katex tex="z=a+bi" /> and <Katex tex="a^2+b^2=1" /> instead — the same calculation with <Katex tex="a=\cos(\theta)" /> and <Katex tex="b=\sin(\theta)" />.</>,
  },
  {
    working: <Katex display tex="1-z = \big(1-\cos(\theta)\big)-i\sin(\theta)" />,
    reason: <>Subtracting, and collecting real and imaginary parts.</>,
  },
  {
    working: <Katex display tex="\frac{1}{1-z} = \frac{\big(1-\cos(\theta)\big)+i\sin(\theta)}{\big(1-\cos(\theta)\big)^2+\sin^2(\theta)}" />,
    reason: <>To find a real part, make the denominator real: multiply top and bottom by the conjugate of <Katex tex="1-z" />.</>,
    more: <>This works because <Katex tex="w\overline{w}=|w|^2" /> is always real; here <Katex tex="w=1-z" />, so the denominator becomes (real part)² + (imaginary part)².</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\big(1-\cos(\theta)\big)^2+\sin^2(\theta) \\ &= 1-2\cos(\theta)+\cos^2(\theta)+\sin^2(\theta) \\ &= 2-2\cos(\theta) \end{aligned}" />,
    reason: <>Expand and use <Katex tex="\cos^2(\theta)+\sin^2(\theta)=1" />. The denominator is <Katex tex="2\big(1-\cos(\theta)\big)" />, twice the numerator's real part.</>,
  },
  {
    working: <Katex display tex="\operatorname{Re}\left(\frac{1}{1-z}\right) = \frac{1-\cos(\theta)}{2\big(1-\cos(\theta)\big)}" />,
    reason: <>The condition <Katex tex="z\neq1" /> guarantees <Katex tex="\cos(\theta)\neq1" />, so the factor <Katex tex="1-\cos(\theta)" /> cancels.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{1}{2}}" />,
    reason: <>Matches option <b>C</b> — the same for every allowed <Katex tex="z" /> on the circle.</>,
    more: <>
      Because the answer is a constant, testing one allowed point is a fast check:{' '}
      <Katex tex="z=i" /> gives <Katex tex="\dfrac{1}{1-i}=\dfrac{1+i}{2}" />, real part <Katex tex="\tfrac{1}{2}" />.
      Option <b>A</b> (<Katex tex="-\tfrac{1}{2}" />) is the real part of <Katex tex="\dfrac{1}{z-1}" />, a sign slip.
      Option <b>D</b> (<Katex tex="\tfrac{\sqrt3}{2}" />) is the imaginary part when <Katex tex="z=\operatorname{cis}\left(\tfrac{\pi}{3}\right)" />, not the real part.
    </>,
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
