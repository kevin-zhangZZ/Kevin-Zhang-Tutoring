// 2015 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 63% correct.
// A large power of a complex number via De Moivre. Question text transcribed from the
// original paper; solution is original.
// Review, Oct 2026 (2014–2016 pass): Concise reasons tightened; distractor analysis
// (where B, C, D, E come from) moved into the final row's `more`. Not a qualifying part
// (63% correct), so no interactive.

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
    reason: <>The modulus. <Katex tex="\sqrt{12}=\sqrt{4\times3}=2\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}(z) = \arctan\!\left(\frac{3}{\sqrt3}\right) = \arctan\!\left(\sqrt3\right) = \tfrac\pi3" />,
    reason: <><Katex tex="z" /> is in the first quadrant, so the principal argument is <Katex tex="\arctan\bigl(\tfrac{\text{Im}}{\text{Re}}\bigr)" /> directly. Note <Katex tex="\tfrac3{\sqrt3}=\sqrt3" />.</>,
    more: <>Keep the imaginary part on top. The upside-down <Katex tex="\arctan\bigl(\tfrac{\sqrt3}{3}\bigr)=\tfrac\pi6" /> gives <Katex tex="63\times\tfrac\pi6=\tfrac{21\pi}{2}=10\pi+\tfrac\pi2" />, which lands on the positive imaginary axis — option D.</>,
  },
  {
    working: <Katex display tex="z^{63} = \left(2\sqrt3\right)^{63}\mathrm{cis}\!\left(63\times\tfrac\pi3\right)" />,
    reason: <>De Moivre: raise the modulus to the power and multiply the argument by it. The modulus part is positive, so only the argument decides the answer.</>,
  },
  {
    working: <Katex display tex="63\times\tfrac\pi3 = 21\pi" />,
    reason: <>63 is a multiple of 3, so the argument becomes a whole number of half-turns.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 21\pi &= 10\times2\pi + \pi \\ \mathrm{cis}(21\pi) &= \mathrm{cis}(\pi) = -1 \end{aligned}" />,
    reason: <>Subtract full turns of <Katex tex="2\pi" />. An <em>odd</em> multiple of <Katex tex="\pi" /> lands on the negative real axis.</>,
  },
  {
    working: <Katex display tex="\boxed{z^{63} = -\left(2\sqrt3\right)^{63}}" />,
    reason: <>Real and negative. Matches option <b>A</b>.</>,
    more: (
      <>
        Where the other options come from. C (real and positive) would need an <em>even</em>{' '}
        multiple of <Katex tex="\pi" />. B (16%, the most popular wrong answer) and D both sit on
        the imaginary axis, so 63 times the argument would have to land on{' '}
        <Katex tex="\tfrac{3\pi}2" /> (B) or <Katex tex="\tfrac\pi2" /> (D), plus full turns. D is
        the upside-down arctan slip above. The report doesn't say how students reached B; a sign
        slip giving an argument of <Katex tex="-\tfrac\pi6" /> is one route, since{' '}
        <Katex tex="-\tfrac{21\pi}2=-12\pi+\tfrac{3\pi}2" />. E is the direction of <Katex tex="z" /> itself, since{' '}
        <Katex tex="1+i\sqrt3=2\,\mathrm{cis}\bigl(\tfrac\pi3\bigr)" />: it forgets to multiply the
        argument by 63.
      </>
    ),
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
