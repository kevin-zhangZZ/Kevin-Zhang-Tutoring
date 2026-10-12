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
  comment: (
    <>
      Equate the formula for the volume of revolution to the given expression.
      <br />
      <Katex tex="\pi\displaystyle\int_0^a\cos^2\left(\frac{y}{3}\right)dy=\frac{\pi\left(4\pi+3\sqrt{3}\right)}{8}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = 3\cos^{-1}(x) \implies x = \cos\left(\frac{y}{3}\right)" />,
    reason: <>Rotation is about the y-axis, so x must be written as a function of y: divide by 3, then take cos of both sides.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_0^{a} x^2\,dy = \pi\int_0^{a}\cos^2\left(\frac{y}{3}\right)dy" />,
    reason: <>The disc formula in y: the region reaches the axis <Katex tex="x=0" />, so there is no hole. y runs from 0 to a.</>,
    more: <>Each horizontal slice at height <Katex tex="y" /> is a disc whose radius is the distance from the <Katex tex="y" />-axis to the curve, <Katex tex="x=\cos\left(\frac{y}{3}\right)" />, so its area is <Katex tex="\pi x^2" />. Because the region reaches all the way to <Katex tex="x=0" />, there is no hole: a disc, not a washer. This is exactly the integral the report equates to the given volume.</>,
  },
  {
    working: <Katex display tex="\cos^2\left(\frac{y}{3}\right) = \frac{1+\cos\left(\frac{2y}{3}\right)}{2}" />,
    reason: <>Rearrange <Katex tex="\cos(2x)=2\cos^2 x-1" /> from the formula sheet, so the integral can be done by hand.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} V &= \frac{\pi}{2}\left[y+\frac{3}{2}\sin\left(\frac{2y}{3}\right)\right]_0^{a} \\ &=\frac{\pi}{2}\left(a+\frac{3}{2}\sin\left(\frac{2a}{3}\right)\right) \end{aligned}" />,
    reason: <>An antiderivative of <Katex tex="\cos\left(\frac{2y}{3}\right)" /> is <Katex tex="\frac{3}{2}\sin\left(\frac{2y}{3}\right)" />. The lower terminal gives <Katex tex="0+\frac{3}{2}\sin 0=0" />.</>,
  },
  {
    working: <Katex display tex="\frac{\pi}{2}\left(a+\frac{3}{2}\sin\left(\frac{2a}{3}\right)\right) = \frac{\pi\left(4\pi+3\sqrt3\right)}{8}" />,
    reason: <>Equate to the given volume and solve for a with <Cas fn="solve" />: CAS gives <Katex tex="a=\pi" />.</>,
    more: <>By hand, write the given volume in the same shape: <Katex tex="\frac{\pi(4\pi+3\sqrt3)}{8}=\frac{\pi}{2}\left(\pi+\frac{3\sqrt3}{4}\right)" />. The term <Katex tex="a" /> lines up with <Katex tex="\pi" />, which suggests <Katex tex="a=\pi" />; the next row confirms the sine term matches too. There is only one solution: the integrand <Katex tex="\cos^2\left(\frac{y}{3}\right)" /> is never negative, so the volume can only grow as <Katex tex="a" /> increases.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} a = \pi: \quad &\frac{\pi}{2}\left(\pi+\frac{3}{2}\cdot\frac{\sqrt3}{2}\right) \\ &= \frac{\pi}{2}\cdot\frac{4\pi+3\sqrt3}{4} \\ &=\frac{\pi\left(4\pi+3\sqrt3\right)}{8}\ \checkmark \end{aligned}" />,
    reason: <><Katex tex="\sin\left(\tfrac{2\pi}{3}\right) = \tfrac{\sqrt3}{2}" />, and the two sides agree exactly.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \pi}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>This value is allowed: <Katex tex="y=3\cos^{-1}(x)" /> has range <Katex tex="[0,3\pi]" />, so <Katex tex="0\le y\le\pi" /> is part of the curve. The other options give volumes that are far too small: <Katex tex="a=\frac{\pi}{4}" />, <Katex tex="\frac{\pi}{3}" /> and <Katex tex="\frac{\pi}{2}" /> give about 2.41, 3.16 and 4.51 cubic units, against the required <Katex tex="\frac{\pi(4\pi+3\sqrt3)}{8}\approx 6.98" />. Substituting each option into the expression for V found above is a quick way to check an answer on any question like this.</>,
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
