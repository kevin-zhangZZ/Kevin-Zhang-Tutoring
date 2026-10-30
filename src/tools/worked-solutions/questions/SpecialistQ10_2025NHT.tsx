// 2025 Specialist NHT — Exam 2, MCQ 10. The NHT report gives the answer key only, with no
// statistics. Calculus: surface area of revolution about the x-axis, done by hand with the
// substitution u = 1 + x⁴. Question text transcribed from the original paper (the 2025 NHT paper is
// image-only, so read from the rendered page). Solution is original; the answer B agrees with the
// report's key (sympy: S = π(2√2 − 1)/9 ≈ 0.638). Distractors checked: D forgets the ¼ from
// du = 4x³ dx; A drops the lower terminal's 1; C uses π instead of 2π.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S=2\pi\int_0^1 y\sqrt{1+\left(\frac{dy}{dx}\right)^2}\,dx" />,
    reason: <>Surface area of revolution about the <Katex tex="x" />-axis, from the formula sheet. Each small piece of curve sweeps out a band of circumference <Katex tex="2\pi y" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=x^2\ \Rightarrow\ S=2\pi\int_0^1\frac{x^3}{3}\sqrt{1+x^4}\,dx" />,
    reason: <>Differentiate the curve, then put <Katex tex="y=\tfrac13x^3" /> and <Katex tex="\left(\tfrac{dy}{dx}\right)^2=\left(x^2\right)^2=x^4" /> into the formula.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&u=1+x^4,\quad \frac{du}{dx}=4x^3\ \Rightarrow\ x^3\,dx=\tfrac14\,du\\&x=0\to u=1,\quad x=1\to u=2\end{aligned}" />,
    reason: <>The <Katex tex="x^3" /> outside the root is a multiple of the derivative of <Katex tex="1+x^4" />, so substitute. Change the terminals as well.</>,
  },
  {
    working: <Katex display tex="S=\frac{2\pi}{3}\cdot\frac14\int_1^2 u^{\frac12}\,du=\frac{\pi}{6}\left[\frac23u^{\frac32}\right]_1^2" />,
    reason: <>Replace <Katex tex="x^3\,dx" /> by <Katex tex="\tfrac14\,du" /> and <Katex tex="\sqrt{1+x^4}" /> by <Katex tex="u^{\frac12}" />; the constants combine as <Katex tex="\tfrac{2\pi}{3}\cdot\tfrac14=\tfrac{\pi}{6}" />. Then antidifferentiate: add 1 to the power and divide by the new power.</>,
  },
  {
    working: <Katex display tex="=\frac{\pi}{9}\left(2^{\frac32}-1\right)=\frac{\pi}{9}\left(2\sqrt2-1\right)" />,
    reason: <><Katex tex="2^{3/2}=2\sqrt2" />, and the lower terminal contributes <Katex tex="1^{3/2}=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S=\frac{\pi}{9}\left(2\sqrt2-1\right)}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Size check: <Katex tex="S\approx0.638" />. The curve rises only to <Katex tex="y=\tfrac13" />, so the surface is a thin trumpet 1 unit long; a cylinder of radius <Katex tex="\tfrac13" /> and length 1 would have <Katex tex="\tfrac{2\pi}{3}\approx2.09" />, comfortably more. Option <b>D</b> forgets the <Katex tex="\tfrac14" /> from <Katex tex="du=4x^3\,dx" />. Option <b>A</b> drops the lower terminal&apos;s <Katex tex="-1" />. Option <b>C</b> uses <Katex tex="\pi" /> in place of <Katex tex="2\pi" />.</>,
  },
]

export default function SpecialistQ10_2025NHT() {
  return (
    <MCQShell
      question={
        <>
          <p>
            The curve given by <Katex tex="y=\dfrac13x^3" />, where <Katex tex="x\in[0,\,1]" />, is rotated about
            the <Katex tex="x" />-axis to form a surface of revolution.
          </p>
          <p className="mt-2">The area of this surface is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{2\sqrt2\,\pi}{9}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{9}\left(2\sqrt2-1\right)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{\pi}{18}\left(2\sqrt2-1\right)" /> },
        { letter: 'D', content: <Katex tex="\dfrac{4\pi}{9}\left(2\sqrt2-1\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
