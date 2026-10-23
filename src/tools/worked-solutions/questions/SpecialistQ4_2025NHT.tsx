// 2025 Specialist NHT — Exam 2, MCQ 4. The NHT report gives the answer key only, with no
// statistics. Complex numbers: recover Arg(z) from Arg(zw) and Arg(w), then Arg(z³), adjusting to
// the principal range twice. Question text transcribed from the original paper (the 2025 NHT paper
// is image-only, so read from the rendered page). Solution is original; the answer C agrees with
// the report's key (sympy: z = √2 cis(3π/4), Arg(z³) = π/4). Distractors checked: D is Arg(z)
// itself; A comes from taking Arg(w) = π/3 (wrong quadrant), giving Arg(z) = −11π/12 and
// Arg(z³) = −3π/4.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}|w|&=\sqrt{1+3}=2\\ \operatorname{Arg}(w)&=\pi-\frac{\pi}{3}=\frac{2\pi}{3}\end{aligned}" />,
    reason: <><Katex tex="w" /> has negative real part and positive imaginary part, so it is in the second quadrant. The reference angle is <Katex tex="\tan^{-1}(\sqrt3)=\tfrac{\pi}{3}" />, measured back from <Katex tex="\pi" />.</>,
    more: <>Taking <Katex tex="\operatorname{Arg}(w)=\tfrac{\pi}{3}" /> straight from the calculator&apos;s <Katex tex="\tan^{-1}" /> puts <Katex tex="w" /> in the first quadrant. Always sketch where the number sits first.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(z)=-\frac{7\pi}{12}-\frac{2\pi}{3}=-\frac{15\pi}{12}=-\frac{5\pi}{4}" />,
    reason: <>Multiplying complex numbers adds their arguments, so subtract <Katex tex="\operatorname{Arg}(w)" /> from <Katex tex="\operatorname{Arg}(zw)" />. (The modulus <Katex tex="|z|=\sqrt2" /> isn&apos;t needed.)</>,
  },
  {
    working: <Katex display tex="-\frac{5\pi}{4}+2\pi=\frac{3\pi}{4}\ \Rightarrow\ \operatorname{Arg}(z)=\frac{3\pi}{4}" />,
    reason: <>The principal argument must lie in <Katex tex="(-\pi,\pi]" />, and <Katex tex="-\tfrac{5\pi}{4}" /> doesn&apos;t. Adding <Katex tex="2\pi" /> gives the same direction in range.</>,
    more: <>The rule &ldquo;arguments add&rdquo; is true only up to a multiple of <Katex tex="2\pi" />, which is exactly why the adjustment is needed. Check: <Katex tex="\tfrac{3\pi}{4}+\tfrac{2\pi}{3}=\tfrac{17\pi}{12}" />, and <Katex tex="\tfrac{17\pi}{12}-2\pi=-\tfrac{7\pi}{12}" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\arg(z^3)&=3\times\frac{3\pi}{4}=\frac{9\pi}{4}\\ \operatorname{Arg}(z^3)&=\frac{9\pi}{4}-2\pi=\frac{\pi}{4}\end{aligned}" />,
    reason: <>De Moivre: cubing multiplies the argument by 3. Then bring <Katex tex="\tfrac{9\pi}{4}" /> back into <Katex tex="(-\pi,\pi]" /> by subtracting <Katex tex="2\pi" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{Arg}(z^3)=\frac{\pi}{4}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>D</b>, <Katex tex="\tfrac{3\pi}{4}" />, is <Katex tex="\operatorname{Arg}(z)" />, stopping before cubing. Option <b>A</b>, <Katex tex="-\tfrac{3\pi}{4}" />, comes from the wrong-quadrant <Katex tex="\operatorname{Arg}(w)=\tfrac{\pi}{3}" />: then <Katex tex="\operatorname{Arg}(z)=-\tfrac{11\pi}{12}" /> and <Katex tex="3\times\left(-\tfrac{11\pi}{12}\right)+4\pi=\tfrac{5\pi}{4}" />, which is <Katex tex="-\tfrac{3\pi}{4}" /> in range.</>,
  },
]

export default function SpecialistQ4_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider the complex numbers <Katex tex="z" /> and <Katex tex="w" />, where <Katex tex="w=-1+\sqrt3 i" />,{' '}
          <Katex tex="|zw|=2\sqrt2" /> and <Katex tex="\operatorname{Arg}(zw)=-\dfrac{7\pi}{12}" />.
          <br />
          The value of <Katex tex="\operatorname{Arg}(z^3)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{3\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{\pi}{4}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\pi}{4}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{3\pi}{4}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
