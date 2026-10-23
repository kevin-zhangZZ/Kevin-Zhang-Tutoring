// 2025 Specialist NHT — Exam 2, MCQ 9. The NHT report gives the answer key only, with no
// statistics. Calculus: arc length of a parametric curve, where the cross terms cancel and the
// speed simplifies to √2·eᵗ. Question text transcribed from the original paper (the 2025 NHT paper
// is image-only, so read from the rendered page). Solution is original; the answer C agrees with
// the report's key (sympy: (dx/dt)² + (dy/dt)² = 2e^{2t}). Distractors checked: B is the sum of
// squares without the square root; D drops the √2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L=\int_0^{\frac{\pi}{2}}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>Arc length of a parametric curve, from the formula sheet.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{dx}{dt}&=e^t\sin(t)+e^t\cos(t)=e^t\big(\sin(t)+\cos(t)\big)\\ \frac{dy}{dt}&=e^t\cos(t)-e^t\sin(t)=e^t\big(\cos(t)-\sin(t)\big)\end{aligned}" />,
    reason: <>Each coordinate is a product of <Katex tex="e^t" /> and a trig function, so use the product rule.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2\\&\quad=e^{2t}\Big[(\sin t+\cos t)^2+(\cos t-\sin t)^2\Big]\\&\quad=e^{2t}\big[2\sin^2 t+2\cos^2 t\big]=2e^{2t}\end{aligned}" />,
    reason: <>Expanding the two squares, the <Katex tex="2\sin(t)\cos(t)" /> cross terms appear with opposite signs and cancel. Then <Katex tex="\sin^2(t)+\cos^2(t)=1" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{2e^{2t}}=\sqrt2\,e^t" />,
    reason: <><Katex tex="\sqrt{e^{2t}}=e^t" />, since <Katex tex="e^t>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{L=\sqrt2\int_0^{\frac{\pi}{2}}e^t\,dt}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Its value is <Katex tex="\sqrt2\left(e^{\pi/2}-1\right)\approx 5.39" />. Option <b>B</b> is the sum of squares, <Katex tex="2e^{2t}" />, integrated without taking its square root. Option <b>D</b> drops the factor <Katex tex="\sqrt2" />.</>,
  },
]

export default function SpecialistQ9_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          The length of the curve defined by <Katex tex="x=e^t\sin(t)" /> and <Katex tex="y=e^t\cos(t)" />, where{' '}
          <Katex tex="t\in\left[0,\,\dfrac{\pi}{2}\right]" />, can be found by evaluating
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\sqrt2\int_0^{\frac{\pi}{2}}e^{\sqrt2 t}\,dt" /> },
        { letter: 'B', content: <Katex tex="\displaystyle 2\int_0^{\frac{\pi}{2}}e^{2t}\,dt" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\sqrt2\int_0^{\frac{\pi}{2}}e^{t}\,dt" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{\frac{\pi}{2}}e^{t}\,dt" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
