// 2024 Specialist NHT — Exam 2, MCQ 9. The NHT report gives the answer key only, with no
// statistics. Calculus: arc length of the parametric curve x = 3(1 − tan²t), y = 4 sec²t for
// t ∈ [π/6, π/3]. Question text transcribed from the original paper. Solution is original; the
// answer A agrees with the report's key (sympy: (dx/dt)² + (dy/dt)² = 100 tan²t sec⁴t; both
// integrals = 40/3).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="s=\int_{\pi/6}^{\pi/3}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>Arc length of a parametric curve (formula sheet).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{dx}{dt}&=-6\tan(t)\sec^2(t)\\ \frac{dy}{dt}&=8\sec^2(t)\tan(t)\end{aligned}" />,
    reason: <>Chain rule: <Katex tex="\tfrac{d}{dt}\tan^2(t)=2\tan(t)\sec^2(t)" />, and <Katex tex="\tfrac{d}{dt}\sec^2(t)=2\sec(t)\cdot\sec(t)\tan(t)=2\sec^2(t)\tan(t)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2\\&\quad=(36+64)\tan^2(t)\sec^4(t)\\&\quad=100\tan^2(t)\sec^4(t)\end{aligned}" />,
    reason: <>Both derivatives share the factor <Katex tex="\tan(t)\sec^2(t)" />, so squaring and adding just adds <Katex tex="6^2+8^2" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{100\tan^2(t)\sec^4(t)}=10\tan(t)\sec^2(t)" />,
    reason: <>On <Katex tex="\left[\tfrac\pi6,\tfrac\pi3\right]" />, <Katex tex="\tan(t)>0" />, so the square root of <Katex tex="\tan^2(t)" /> is <Katex tex="\tan(t)" /> itself, not its negative.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_{\pi/6}^{\pi/3}10\tan(t)\sec^2(t)\,dt}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>B</b> is the sum of squares with the square root left off. Option <b>D</b> also leaves off the root and <em>subtracts</em> the squares, <Katex tex="64-36=28" />. Option <b>C</b> simply adds the two derivatives, <Katex tex="-6+8=2" />. Sanity check: the integral is <Katex tex="5\tan^2(t)\Big|_{\pi/6}^{\pi/3}=5\left(3-\tfrac13\right)=\tfrac{40}{3}" />, and the curve is actually a straight segment (<Katex tex="y=4+4\tan^2(t)" />, so <Katex tex="y=8-\tfrac43x" />) from <Katex tex="\left(2,\tfrac{16}{3}\right)" /> to <Katex tex="(-6,\,16)" />, whose length is <Katex tex="\sqrt{8^2+\left(\tfrac{32}{3}\right)^2}=\tfrac{40}{3}" />.</>,
  },
]

export default function SpecialistQ9_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The length of the curve given by <Katex tex="x=3\left(1-\tan^2(t)\right)" />, <Katex tex="y=4\sec^2(t)" /> where{' '}
          <Katex tex="t\in\left[\dfrac{\pi}{6},\,\dfrac{\pi}{3}\right]" />, is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_{\frac{\pi}{6}}^{\frac{\pi}{3}}10\tan(t)\sec^2(t)\,dt" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\displaystyle\int_{\frac{\pi}{6}}^{\frac{\pi}{3}}100\tan^2(t)\sec^4(t)\,dt" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_{\frac{\pi}{6}}^{\frac{\pi}{3}}2\tan(t)\sec^2(t)\,dt" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_{\frac{\pi}{6}}^{\frac{\pi}{3}}28\tan^2(t)\sec^4(t)\,dt" /> },
        { letter: 'E', content: <Katex tex="\displaystyle\int_{\frac{\pi}{6}}^{\frac{\pi}{3}}\sqrt2\sqrt{\tan(t)}\sec^2(t)\,dt" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
