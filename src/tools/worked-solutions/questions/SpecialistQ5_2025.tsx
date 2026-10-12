// 2025 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 69% correct. This
// year's paper used four options (A–D) rather than five. A real cubic with one known
// complex root. Question text transcribed from the original paper. Answers checked with
// sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 69, B: 16, C: 9, D: 6 },
  answer: 'A',
  comment: (
    <>
      Either use substitution and then equate coefficients or use the conjugate root theorem as
      shown below.
      <br />
      <Katex tex="(2-3i)^3+a(2-3i)^2+b(2-3i)-52=0" />
      <br />
      <Katex tex="(-5a+2b-98)+(-12a-3b-9)i=0" />
      <br />
      <em>Use CAS to equate the real and imaginary components to 0 to find a and b.</em>
      <br />
      <Katex tex="a=-8 \text{ and } b=29" />
      <br />
      <Katex tex="ab=-232" />
      <br />
      <em>OR</em>
      <br />
      <Katex tex="(z-(2-3i))(z-(2+3i))=z^2-4z+13" />
      <br />
      <Katex tex="z^3+az^2+bz-52=\left(z^2-4z+13\right)(z-4)" />
      <br />
      <Katex tex="a=-8,\ b=29" />
      <br />
      <Katex tex="ab=-232" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &a,b\in R \text{ and } 2-3i \text{ is a root} \\ &\implies 2+3i \text{ is also a root} \end{aligned}" />,
    reason: <>The conjugate root theorem: non-real roots of a polynomial with real coefficients come in conjugate pairs. The question states <Katex tex="a,b\in R" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} (z-(2-3i))(z-(2+3i)) &= (z-2)^2-(3i)^2 \\ &= z^2-4z+13 \end{aligned}" />,
    reason: <>Multiply the conjugate pair as a difference of two squares; <Katex tex="-(3i)^2=+9" />. The result is a real quadratic factor.</>,
  },
  {
    working: <Katex display tex="z^3+az^2+bz-52 = \left(z^2-4z+13\right)(z-k)" />,
    reason: <>The cubic has leading coefficient 1, so the other factor is <Katex tex="z-k" /> for the third root <Katex tex="k" />, which is real, since the non-real roots are already paired.</>,
    more: <>A fourth non-real root would need its own conjugate, but a cubic has only three roots. You could also solve without the conjugate: substitute <Katex tex="z=2-3i" />, expand to <Katex tex="(-5a+2b-98)+(-12a-3b-9)i=0" />, and set the real and imaginary parts to 0 (two simultaneous equations — <Cas fn="solve">solve</Cas> on CAS), as the report shows.</>,
  },
  {
    working: <Katex display tex="13\times(-k) = -52 \implies k = 4" />,
    reason: <>Equate the constant terms on each side — the only coefficient that does not involve <Katex tex="a" /> or <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \left(z^2-4z+13\right)(z-4) &= z^3-8z^2+29z-52 \\ \implies a=-8,\ b&=29 \end{aligned}" />,
    reason: <>Expand (by hand or with CAS) and equate the <Katex tex="z^2" /> and <Katex tex="z" /> coefficients.</>,
  },
  {
    working: <Katex display tex="\boxed{ab = -8\times29 = -232}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>The question asks for the product <Katex tex="ab" />, not the pair. Option <b>C</b> (<Katex tex="-8" />) is <Katex tex="a" /> on its own — stopping one step early. Option <b>D</b> (<Katex tex="0" />) comes from a sign slip on the third root: using <Katex tex="z+4" /> gives <Katex tex="(z^2-4z+13)(z+4)=z^3-3z+52" />, so <Katex tex="a=0" />. The constant comes out <Katex tex="+52" />, not <Katex tex="-52" />, which exposes the slip.</>,
  },
]

export default function SpecialistQ5_2025() {
  return (
    <MCQShell
      question={
        <p>
          The equation <Katex tex="z^3+az^2+bz-52 = 0" />, where <Katex tex="a,b\in R" /> and{' '}
          <Katex tex="z\in C" />, has a solution <Katex tex="z = 2-3i" />.
          <br />
          The value of <Katex tex="ab" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-232" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-64" /> },
        { letter: 'C', content: <Katex tex="-8" /> },
        { letter: 'D', content: <Katex tex="0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
