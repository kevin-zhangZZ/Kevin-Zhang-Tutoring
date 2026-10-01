// 2021 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 35% correct.
// Arg(z·z̄ / (z − z̄)) given Im(z) > 0. Question text transcribed from the original paper.
// Solution is original.
// Interactive: spec-2021-mcq4-quotient-direction (drag z; numerator on the positive real axis, divisor on
// the positive imaginary axis, quotient always on the negative imaginary axis; toggle shows the 1/i = i slip).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Explore, lazyWidget } from '../Explore'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const QuotientWidget = lazyWidget(() => import('../interactives/spec-2021-mcq4-quotient-direction'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 35, B: 11, C: 21, D: 29, E: 3 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="\mathrm{Arg}\!\left(\dfrac{z\bar z}{z-\bar z}\right) = \mathrm{Arg}\!\left(\dfrac{a^2+b^2}{2bi}\times\dfrac ii\right)" />
      <br />
      <Katex tex="= \mathrm{Arg}\!\left(-\dfrac{a^2+b^2}{2b}i\right) = -\dfrac{\pi}{2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = a+bi,\quad a,b\in R,\; b>0" />,
    reason: <>Write <Katex tex="z" /> in Cartesian form, so the condition <Katex tex="\mathrm{Im}(z)>0" /> becomes simply <Katex tex="b>0" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}z\bar z &= (a+bi)(a-bi)\\ &= a^2+b^2\\[6pt] z-\bar z &= (a+bi)-(a-bi)\\ &= 2bi\end{aligned}"
      />
    ),
    reason: (
      <>
        The conjugate is <Katex tex="\bar z = a-bi" />. In the product, <Katex tex="-b^2i^2 = +b^2" />, so{' '}
        <Katex tex="z\bar z" /> is real and positive (<Katex tex="z\neq0" /> because <Katex tex="b>0" />). In the
        difference the <Katex tex="a" />&rsquo;s cancel, leaving a purely imaginary number.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\frac{z\bar z}{z-\bar z} &= \frac{a^2+b^2}{2bi}\times\frac{i}{i}\\ &= \frac{(a^2+b^2)\,i}{2b\,i^2}\\ &= -\frac{a^2+b^2}{2b}\,i\end{aligned}"
      />
    ),
    reason: (
      <>
        To see where the quotient lies, write it in the form <Katex tex="x+yi" />: multiply top and bottom by{' '}
        <Katex tex="i" />, so the denominator becomes <Katex tex="2b\,i^2 = -2b" />, a real number.
      </>
    ),
  },
  {
    working: (
      <>
        Since <Katex tex="a^2+b^2>0" /> and <Katex tex="b>0" />, the coefficient <Katex tex="-\dfrac{a^2+b^2}{2b}" /> is
        negative, so the quotient lies on the negative imaginary axis.
      </>
    ),
    reason: (
      <>
        This is true for <i>every</i> <Katex tex="a" /> and every <Katex tex="b>0" />, so the answer cannot depend on{' '}
        <Katex tex="z" />. Quick check with <Katex tex="z=i" />: <Katex tex="z\bar z=1" /> and{' '}
        <Katex tex="z-\bar z=2i" />, so the quotient is <Katex tex="\dfrac{1}{2i} = -\dfrac12 i" />. The
        principal argument Arg lies in <Katex tex="(-\pi,\pi]" />, so a point straight below{' '}
        <Katex tex="O" /> has Arg <Katex tex="-\tfrac\pi2" /> (not <Katex tex="\tfrac{3\pi}2" />).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\mathrm{Arg}\!\left(\frac{z\bar z}{z-\bar z}\right) = -\frac{\pi}{2}}" />,
    reason: (
      <>
        Matches option <b>A</b>. Option D, <Katex tex="\tfrac\pi2" />, is what taking <Katex tex="\tfrac1i=i" /> gives
        (the quotient would point straight up). But <Katex tex="i\times(-i) = -i^2 = 1" />, so{' '}
        <Katex tex="\tfrac1i=-i" />. Adding arguments instead of subtracting them also lands on D:{' '}
        <Katex tex="z\bar z" /> has Arg <Katex tex="0" /> and <Katex tex="z-\bar z" /> has Arg <Katex tex="\tfrac\pi2" />,
        and dividing <i>subtracts</i> arguments, <Katex tex="0-\tfrac\pi2=-\tfrac\pi2" />, not <Katex tex="0+\tfrac\pi2" />.
      </>
    ),
  },
]

export default function SpecialistQ4_2021() {
  return (
    <MCQShell
      question={
        <p>
          For <Katex tex="z\in C" />, if <Katex tex="\mathrm{Im}(z)>0" />, then{' '}
          <Katex tex="\mathrm{Arg}\!\left(\dfrac{z\bar z}{z-\bar z}\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\tfrac{\pi}{2}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0" /> },
        { letter: 'C', content: <Katex tex="\tfrac{\pi}{4}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{\pi}{2}" /> },
        { letter: 'E', content: <Katex tex="\pi" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="Drag z: the quotient always points straight down">
          <QuotientWidget />
        </Explore>
      }
    />
  )
}
