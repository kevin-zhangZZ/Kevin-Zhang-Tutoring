// 2019 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 70% correct. Setting
// up the arc-length integral for a curve given parametrically. Question text transcribed from
// the original paper (no diagram). Note this is arc length from *parametric* equations, which
// is still on the current study design — only arc length from a cartesian rule y = f(x) was
// removed. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 70, C: 5, D: 2, E: 5 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\sqrt{\left(\dfrac{dx}{dt}\right)^2+\left(\dfrac{dy}{dt}\right)^2}\ dt" />,
    reason: <>Arc length of a parametric curve, straight from the formula sheet. Note both derivatives are <em>squared</em>, so signs disappear — which already rules out options D and A.</>,
  },
  {
    working: <Katex display tex="\dfrac{dx}{dt} = 3\cos(t), \qquad \dfrac{dy}{dt} = -4\sin(t)" />,
    reason: <>Differentiating each parametric equation with respect to <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\left(\dfrac{dx}{dt}\right)^2+\left(\dfrac{dy}{dt}\right)^2 = 9\cos^2(t)+16\sin^2(t)" />,
    reason: <>The minus sign on <Katex tex="-4\sin(t)" /> vanishes on squaring.</>,
  },
  {
    working: <Katex display tex="= 9\left(1-\sin^2(t)\right)+16\sin^2(t)" />,
    reason: <>Use <Katex tex="\cos^2(t)=1-\sin^2(t)" /> to get everything in terms of <Katex tex="\sin" />, matching the form of the options.</>,
  },
  {
    working: <Katex display tex="= 9-9\sin^2(t)+16\sin^2(t) = 9+7\sin^2(t)" />,
    reason: <>Collecting the <Katex tex="\sin^2(t)" /> terms.</>,
  },
  {
    working: <Katex display tex="\boxed{L = \int_0^{\pi}\sqrt{9+7\sin^2(t)}\ dt}" />,
    reason: <>Matches option <b>B</b>. Option <b>A</b> subtracts instead of adds inside the root (and would go negative), option <b>E</b> forgets to square the coefficients, option <b>D</b> has no square root at all, and option <b>C</b> has the shape of the cartesian formula <Katex tex="\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}" />, which does not apply to a parametric curve.</>,
  },
]

export default function SpecialistQ7_2019() {
  return (
    <MCQShell
      question={
        <p>
          The length of the curve defined by the parametric equations <Katex tex="x=3\sin(t)" />{' '}
          and <Katex tex="y=4\cos(t)" /> for <Katex tex="0\le t\le\pi" /> is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{\pi}\sqrt{9\cos^2(t)-16\sin^2(t)}\,dt" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_0^{\pi}\sqrt{9+7\sin^2(t)}\,dt" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\displaystyle\int_0^{\pi}\sqrt{1+16\sin^2(t)}\,dt" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{\pi}\bigl(3\cos(t)-4\sin(t)\bigr)\,dt" /> },
        { letter: 'E', content: <Katex tex="\displaystyle\int_0^{\pi}\sqrt{3\cos^2(t)+4\sin^2(t)}\,dt" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
