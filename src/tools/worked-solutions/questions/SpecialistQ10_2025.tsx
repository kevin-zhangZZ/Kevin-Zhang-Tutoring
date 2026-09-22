// 2025 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 69% correct. This
// year's paper used four options (A–D) rather than five. Recovering the upper terminal of a
// volume-of-revolution integral about the y-axis. Question text transcribed from the
// original paper. Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 12, C: 11, D: 69 },
  answer: 'D',
  comment: <>Equate the formula for the volume of revolution to the given expression.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = 3\cos^{-1}(x) \implies x = \cos\left(\frac{y}{3}\right)" />,
    reason: 'Rotation is about the y-axis, so x must be written as a function of y.',
  },
  {
    working: <Katex display tex="V = \pi\int_0^{a} x^2\,dy = \pi\int_0^{a}\cos^2\left(\frac{y}{3}\right)dy" />,
    reason: 'The disc formula in y. The line x = 0 is the axis of rotation itself, and y runs from 0 to a.',
  },
  {
    working: <Katex display tex="\cos^2\left(\frac{y}{3}\right) = \frac{1+\cos\left(\frac{2y}{3}\right)}{2}" />,
    reason: 'The double-angle identity from the formula sheet, so the integral can be done by hand.',
  },
  {
    working: <Katex display tex="V = \frac{\pi}{2}\left[y+\frac{3}{2}\sin\left(\frac{2y}{3}\right)\right]_0^{a} = \frac{\pi}{2}\left(a+\frac{3}{2}\sin\left(\frac{2a}{3}\right)\right)" />,
    reason: 'Antidifferentiating and substituting. The lower terminal contributes nothing.',
  },
  {
    working: <Katex display tex="\frac{\pi}{2}\left(a+\frac{3}{2}\sin\left(\frac{2a}{3}\right)\right) = \frac{\pi\left(4\pi+3\sqrt3\right)}{8}" />,
    reason: <>Equate to the given volume and solve for a with <Cas fn="solve" />.</>,
  },
  {
    working: <Katex display tex="a = \pi: \quad \frac{\pi}{2}\left(\pi+\frac{3}{2}\cdot\frac{\sqrt3}{2}\right) = \frac{\pi}{2}\cdot\frac{4\pi+3\sqrt3}{4} = \frac{\pi\left(4\pi+3\sqrt3\right)}{8}\ \checkmark" />,
    reason: <><Katex tex="\sin\left(\tfrac{2\pi}{3}\right) = \tfrac{\sqrt3}{2}" />, and the two sides agree exactly.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \pi}" />,
    reason: <>Option <b>D</b>. Note <Katex tex="y=3\cos^{-1}(x)" /> has range <Katex tex="[0,3\pi]" />, so <Katex tex="a=\pi" /> is inside it.</>,
  },
]

export default function SpecialistQ10_2025() {
  return (
    <MCQShell
      question={
        <p>
          The region bounded by the curve given by <Katex tex="y = 3\cos^{-1}(x)" />, for{' '}
          <Katex tex="0\leq y\leq a" />, where <Katex tex="a>0" />, and the line <Katex tex="x = 0" />{' '}
          is rotated about the <Katex tex="y" />-axis to form a solid of revolution. The volume of
          the solid is <Katex tex="\dfrac{\pi\left(4\pi+3\sqrt3\right)}{8}" />.
          <br />
          The value of <Katex tex="a" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{3}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\pi}{2}" /> },
        { letter: 'D', content: <Katex tex="\pi" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
