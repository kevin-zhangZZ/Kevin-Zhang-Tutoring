// 2015 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 81% correct.
// A quotient of complex numbers raised to the fifth power. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 81, C: 7, D: 7, E: 3 },
  answer: 'B',
  noAnswer: 0,
  comment: <><Katex tex="z" /> first simplifies to <Katex tex="z=\sqrt2\,\mathrm{cis}\!\left(\tfrac\pi{12}\right)" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="1+i\sqrt3 = 2\,\mathrm{cis}\!\left(\tfrac\pi3\right)" />,
    reason: <>Modulus <Katex tex="\sqrt{1+3}=2" />, argument <Katex tex="\arctan\!\left(\sqrt3\right)=\tfrac\pi3" /> (first quadrant).</>,
  },
  {
    working: <Katex display tex="1+i = \sqrt2\,\mathrm{cis}\!\left(\tfrac\pi4\right)" />,
    reason: <>Modulus <Katex tex="\sqrt2" />, argument <Katex tex="\tfrac\pi4" />.</>,
  },
  {
    working: <Katex display tex="z = \frac{2\,\mathrm{cis}\!\left(\tfrac\pi3\right)}{\sqrt2\,\mathrm{cis}\!\left(\tfrac\pi4\right)} = \sqrt2\,\mathrm{cis}\!\left(\tfrac\pi3-\tfrac\pi4\right)" />,
    reason: <>Dividing in polar form: divide the moduli, subtract the arguments. <Katex tex="\tfrac2{\sqrt2}=\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\tfrac\pi3-\tfrac\pi4 = \tfrac{4\pi-3\pi}{12} = \tfrac\pi{12}" />,
    reason: <>So <Katex tex="z=\sqrt2\,\mathrm{cis}\!\left(\tfrac\pi{12}\right)" />.</>,
  },
  {
    working: <Katex display tex="z^5 = \left(\sqrt2\right)^5\mathrm{cis}\!\left(\tfrac{5\pi}{12}\right)" />,
    reason: <>De Moivre: raise the modulus to the power, multiply the argument by it.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|z^5\right| = 4\sqrt2,\quad \mathrm{Arg}\!\left(z^5\right) = \tfrac{5\pi}{12}}" />,
    reason: <>Option B, since <Katex tex="\left(\sqrt2\right)^5=4\sqrt2" />. The argument <Katex tex="\tfrac{5\pi}{12}" /> is already in <Katex tex="(-\pi,\pi]" />, so no adjustment is needed.</>,
  },
]

export default function SpecialistQ5_2015() {
  return (
    <MCQShell
      question={
        <p>
          Given <Katex tex="z=\dfrac{1+i\sqrt3}{1+i}" />, the modulus and argument of the
          complex number <Katex tex="z^5" /> are respectively
        </p>
      }
      background={
        <p>
          Anything raised to a power in this subject wants polar form. Convert numerator and
          denominator separately, divide, and only then apply De Moivre — expanding{' '}
          <Katex tex="(1+i\sqrt3)^5" /> in cartesian form is a much longer road to the same
          place.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\sqrt2 \text{ and } \tfrac{5\pi}6" /> },
        { letter: 'B', content: <Katex tex="4\sqrt2 \text{ and } \tfrac{5\pi}{12}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4\sqrt2 \text{ and } \tfrac{7\pi}{12}" /> },
        { letter: 'D', content: <Katex tex="2\sqrt2 \text{ and } \tfrac{5\pi}{12}" /> },
        { letter: 'E', content: <Katex tex="4\sqrt2 \text{ and } -\tfrac\pi{12}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
