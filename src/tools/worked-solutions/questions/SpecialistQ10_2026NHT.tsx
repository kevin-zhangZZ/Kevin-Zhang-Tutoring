// 2026 Specialist NHT — Exam 2, MCQ 10. The NHT report gives the answer key and a short comment
// only, with no statistics. Calculus: surface area of revolution for a parametric curve (one arch
// of a cycloid) about the x-axis, simplified with double-angle formulas to 16π∫₀^π sin³(t) dt.
// Question text transcribed from the original paper. Solution is original; the answer B agrees
// with the report's key (sympy: (x′)² + (y′)² − 16 sin²(t) simplifies to 0, and the original
// integral and option B both evaluate to 67.0206…).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      <Katex tex="area=2\pi\displaystyle\int_0^{\pi}\left(1-\cos(2t)\right)\sqrt{\left(2-2\cos(2t)\right)^2+\left(2\sin(2t)\right)^2}\,dt" />
      <br />
      Simplify and use double angle formulas.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S=2\pi\int_0^{\pi}y\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>Rotation about the <Katex tex="x" />-axis: each small piece of curve, of length <Katex tex="\sqrt{(x')^2+(y')^2}\,dt" />, sweeps out a band of radius <Katex tex="y" />. Here <Katex tex="y=1-\cos(2t)\ge0" />, so <Katex tex="y" /> is the radius as it stands.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{dx}{dt}&=2-2\cos(2t)=4\sin^2(t)\\ \frac{dy}{dt}&=2\sin(2t)=4\sin(t)\cos(t)\end{aligned}" />,
    reason: <>Differentiate, then rewrite with the double-angle formulas <Katex tex="1-\cos(2t)=2\sin^2t" /> and <Katex tex="\sin(2t)=2\sin t\cos t" />, so everything is in powers of <Katex tex="\sin t" /> and <Katex tex="\cos t" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(x')^2+(y')^2&=16\sin^4t+16\sin^2t\cos^2t\\ &=16\sin^2t\left(\sin^2t+\cos^2t\right)\\ &=16\sin^2t\end{aligned}" />,
    reason: <>Take out the common factor <Katex tex="16\sin^2t" />; the bracket is 1.</>,
  },
  {
    working: <Katex display tex="\sqrt{16\sin^2t}=4\sin t\quad(0\le t\le\pi)" />,
    reason: <>In general <Katex tex="\sqrt{16\sin^2t}=4|\sin t|" />, but <Katex tex="\sin t\ge0" /> on <Katex tex="[0,\pi]" />, so the modulus can go.</>,
  },
  {
    working: <Katex display tex="S=2\pi\int_0^{\pi}2\sin^2t\cdot4\sin t\,dt=16\pi\int_0^{\pi}\sin^3t\,dt" />,
    reason: <>The radius is <Katex tex="y=1-\cos(2t)=2\sin^2t" /> by the same double-angle formula.</>,
  },
  {
    working: <Katex display tex="\boxed{16\pi\int_0^{\pi}\sin^3(t)\,dt}" />,
    reason: <>Matches option <b>B</b>. Sanity check: <Katex tex="\int_0^\pi\sin^3t\,dt=\tfrac43" />, so <Katex tex="S=\tfrac{64\pi}{3}\approx67.0" />, the same value a numerical integral of the unsimplified formula gives.</>,
    more: <>Option <b>C</b>, <Katex tex="64\pi\int_0^\pi\sin^4t\,dt" />, is what you get by forgetting the square root: <Katex tex="2\pi\cdot2\sin^2t\cdot16\sin^2t" />. Option <b>A</b> can&apos;t be an area at all: <Katex tex="\int_0^\pi\cos^3t\,dt=0" />, and a surface area is positive.</>,
  },
]

export default function SpecialistQ10_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          The curve defined by the parametric equations <Katex tex="x=2t-\sin(2t)" />, <Katex tex="y=1-\cos(2t)" /> for{' '}
          <Katex tex="0\le t\le\pi" /> is rotated about the <Katex tex="x" />-axis to form a surface of revolution.
          <br />
          The area of this surface is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="16\pi\displaystyle\int_0^{\pi}\cos^3(t)\,dt" /> },
        { letter: 'B', content: <Katex tex="16\pi\displaystyle\int_0^{\pi}\sin^3(t)\,dt" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="64\pi\displaystyle\int_0^{\pi}\sin^4(t)\,dt" /> },
        { letter: 'D', content: <Katex tex="64\pi\displaystyle\int_0^{\pi}\cos^4(t)\,dt" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
