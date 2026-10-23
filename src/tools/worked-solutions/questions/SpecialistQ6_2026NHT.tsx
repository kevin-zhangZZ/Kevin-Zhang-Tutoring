// 2026 Specialist NHT — Exam 2, MCQ 6. The NHT report gives the answer key and a short comment
// only, with no statistics. Complex numbers: describing a shaded sector of an annulus with modulus
// and argument inequalities, reading solid versus dashed boundaries and an angle marked from the
// imaginary axis. Question text transcribed from the original paper; the Argand diagram is the
// actual VCAA figure, cropped from the official exam PDF at 300 dpi. Solution is original; the
// answer D agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2026nht-mcq6-argand.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      Take care with inequalities. Dotted lines indicate excluded values; solid lines indicate that values are included.
      <br />
      The required region lies between the arguments of <Katex tex="\dfrac{\pi}{3}\ and\ \dfrac{\pi}{2}" /> and between
      the circles with radius 1 and radius 2.
    </>
  ),
}

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={argandSrc}
      alt="VCAA's Argand diagram: two solid upper semicircles of radius 1 and 2 centred at O, a dashed ray from O making an angle of π/6 with the positive imaginary axis, and the region between the semicircles, the dashed ray and the positive imaginary axis shaded"
      className="w-full max-w-[380px]"
    />
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="1\le|z|\le2" />,
    reason: <>The shading lies between the circles of radius 1 and 2, and both arcs are drawn <b>solid</b>, so both boundaries are included: <Katex tex="\le" /> at each end.</>,
  },
  {
    working: <Katex display tex="\arg(z)\text{ of dashed ray}=\frac{\pi}{2}-\frac{\pi}{6}=\frac{\pi}{3}" />,
    reason: <>The <Katex tex="\tfrac{\pi}{6}" /> is marked between the ray and the <b>imaginary</b> axis. An argument is measured anticlockwise from the positive <b>real</b> axis, and the imaginary axis is at <Katex tex="\tfrac{\pi}{2}" />, so subtract.</>,
  },
  {
    working: <Katex display tex="\frac{\pi}{3}<\arg(z)\le\frac{\pi}{2}" />,
    reason: <>The ray at <Katex tex="\tfrac{\pi}{3}" /> is <b>dashed</b>, so it is excluded (strict <Katex tex="<" />). The other edge of the shading is the positive imaginary axis, <Katex tex="\arg(z)=\tfrac{\pi}{2}" />, drawn solid, so it is included.</>,
  },
  {
    working: <Katex display tex="\boxed{\{z:1\le|z|\le2\}\cap\left\{z:\frac{\pi}{3}<\arg(z)\le\frac{\pi}{2}\right\}}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>C</b> reads the <Katex tex="\tfrac{\pi}{6}" /> label as the argument itself, but it is measured from the imaginary axis. Option <b>A</b> has the right angles with the wrong inequalities: it includes the dashed ray, excludes the solid imaginary axis and excludes the inner circle. Option <b>B</b> describes the sector between <Katex tex="\tfrac{\pi}{6}" /> and <Katex tex="\tfrac{\pi}{3}" />, which is not shaded.</>,
  },
]

export default function SpecialistQ6_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider the Argand diagram below.
          <br />
          The shaded region is best described by
        </p>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\{z:1<|z|\le2\}\cap\left\{z:\dfrac{\pi}{3}\le\arg(z)<\dfrac{\pi}{2}\right\}" /> },
        { letter: 'B', content: <Katex tex="\{z:1<|z|<2\}\cap\left\{z:\dfrac{\pi}{6}\le\arg(z)\le\dfrac{\pi}{3}\right\}" /> },
        { letter: 'C', content: <Katex tex="\{z:1\le|z|\le2\}\cap\left\{z:\dfrac{\pi}{6}<\arg(z)\le\dfrac{\pi}{2}\right\}" /> },
        { letter: 'D', content: <Katex tex="\{z:1\le|z|\le2\}\cap\left\{z:\dfrac{\pi}{3}<\arg(z)\le\dfrac{\pi}{2}\right\}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
