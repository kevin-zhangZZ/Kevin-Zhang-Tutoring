// 2017 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 47% correct.
// The region between y = cos(x) and y = √3 sin(x), compared with the triangle under the
// chord. Question text transcribed from the original paper; the figure is a crop of
// VCAA's own artwork. Answers verified with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2017-mcq20-shaded.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 47, C: 18, D: 18, E: 9 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(x)=\sqrt3\sin(x) \implies \tan(x)=\frac{1}{\sqrt3}" />,
    reason: <>Find <Katex tex="B" /> first — every other quantity is measured relative to it. Divide both sides by <Katex tex="\cos(x)" /> to turn the equation into one about <Katex tex="\tan" />.</>,
  },
  {
    working: <Katex display tex="x=\frac{\pi}{6}, \qquad y=\cos\!\left(\frac{\pi}{6}\right)=\frac{\sqrt3}{2}" />,
    reason: <>So <Katex tex="B=\left(\tfrac{\pi}{6},\tfrac{\sqrt3}{2}\right)" />. Exact values throughout — the options are all exact.</>,
  },
  {
    working: <Katex display tex="A_{\triangle} = \frac12\times\frac{\pi}{2}\times\frac{\sqrt3}{2}" />,
    reason: <>Triangle <Katex tex="OAB" /> has base <Katex tex="OA" /> along the <Katex tex="x" />-axis of length <Katex tex="\tfrac{\pi}{2}" />, and the height is the <Katex tex="y" />-coordinate of <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex="A_{\triangle} = \frac{\sqrt3\pi}{8}" />,
    reason: <>About <Katex tex="0.68" />.</>,
  },
  {
    working: <Katex display tex="A_{\text{shaded}} = \int_0^{\pi/6}\!\sqrt3\sin(x)\,dx + \int_{\pi/6}^{\pi/2}\!\cos(x)\,dx" />,
    reason: <>The upper boundary of the shaded region switches at <Katex tex="B" />: to the left of <Katex tex="B" /> the sine curve is lower, to the right the cosine curve is. Splitting at <Katex tex="B" /> is the step most students missed.</>,
  },
  {
    working: <Katex display tex="= \Bigl[-\sqrt3\cos(x)\Bigr]_0^{\pi/6} + \Bigl[\sin(x)\Bigr]_{\pi/6}^{\pi/2}" />,
    reason: <>Antidifferentiating each piece.</>,
  },
  {
    working: <Katex display tex="= \left(-\frac32+\sqrt3\right) + \left(1-\frac12\right)" />,
    reason: <><Katex tex="-\sqrt3\cos\!\left(\tfrac{\pi}{6}\right)=-\sqrt3\times\tfrac{\sqrt3}{2}=-\tfrac32" />, and <Katex tex="-\sqrt3\cos(0)=-\sqrt3" /> is subtracted.</>,
  },
  {
    working: <Katex display tex="A_{\text{shaded}} = \sqrt3-1" />,
    reason: <>About <Katex tex="0.73" /> — a bit larger than the triangle, which matches the picture.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt3-1 \;:\; \frac{\sqrt3\pi}{8}}" />,
    reason: <>Option B. Ratios are not usually simplified to a single number here — read the options and stop when one matches. Option D halves the triangle a second time.</>,
  },
]

export default function MethodsQ20_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graphs of <Katex tex="f:\left[0,\tfrac{\pi}{2}\right]\to R" />,{' '}
            <Katex tex="f(x)=\cos(x)" /> and{' '}
            <Katex tex="g:\left[0,\tfrac{\pi}{2}\right]\to R" />,{' '}
            <Katex tex="g(x)=\sqrt3\sin(x)" /> are shown below. The graphs intersect at{' '}
            <Katex tex="B" />.
          </p>
          <p>
            The ratio of the area of the shaded region to the area of triangle{' '}
            <Katex tex="OAB" /> is
          </p>
        </>
      }
      diagram={
        <img
          src={diagramSrc}
          alt="y = cos(x) falling from 1 and y = √3 sin(x) rising from 0, crossing at B; the region between the chords OB and BA and the two curves is shaded, with A at (π/2, 0) — from the original 2017 VCAA exam paper"
          className="w-full max-w-[400px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="9:8" /> },
        { letter: 'B', content: <Katex tex="\sqrt3-1:\dfrac{\sqrt3\pi}{8}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="8\sqrt3-3:3\pi" /> },
        { letter: 'D', content: <Katex tex="\sqrt3-1:\dfrac{\sqrt3\pi}{4}" /> },
        { letter: 'E', content: <Katex tex="1:\dfrac{\sqrt3\pi}{8}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
