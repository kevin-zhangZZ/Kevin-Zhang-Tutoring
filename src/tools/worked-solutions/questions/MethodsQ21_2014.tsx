// 2014 Mathematical Methods — Exam 2, MCQ 21.
// Isosceles trapezium with three equal sides p; find the angle that maximises its area.
// Question text transcribed from the original paper; the diagram is the actual VCAA figure
// (cropped from the official exam PDF), not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import trapeziumSrc from './meth-2014-mcq21-trapezium.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 18, C: 27, D: 28, E: 15 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Area of a trapezium <Katex tex="=\dfrac{h(a+b)}{2} = \dfrac{p\sin(x)\bigl(p+p+2\cos(x)\bigr)}{2}" />.
      Maximum area is when <Katex tex="x=\dfrac{\pi}{3}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{height} = p\sin x, \qquad DC = p + 2p\cos x" />,
    reason: (
      <>
        Each leg (length <Katex tex="p" />) makes angle <Katex tex="x" /> with the top side <Katex tex="DC" />
        , so it contributes a vertical rise <Katex tex="p\sin x" /> and a horizontal overhang{' '}
        <Katex tex="p\cos x" /> on each side.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} A(x) &= \tfrac{1}{2}(AB+DC)(\text{height}) \\ &= \tfrac12\bigl(p+p(1+2\cos x)\bigr)(p\sin x) \\ &= p^2\sin x(1+\cos x) \end{aligned}"
      />
    ),
    reason: 'Trapezium area = ½ × (sum of parallel sides) × height.',
  },
  {
    working: <Katex display tex="A(x) = p^2\left(\sin x + \tfrac12\sin 2x\right)" />,
    reason: <>Expand, using <Katex tex="\sin x\cos x = \tfrac12\sin 2x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} A'(x) &= p^2(\cos x + \cos 2x) \\ &= 0 \end{aligned}" />,
  },
  {
    working: (
      <>
        <Katex display tex="2\cos^2x + \cos x - 1 = 0" />
        <Katex display tex="\implies\; (2\cos x - 1)(\cos x+1)=0" />
      </>
    ),
    reason: <>Write <Katex tex="\cos 2x = 2\cos^2x-1" /> and factorise.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\cos x = \tfrac12" />
        <Katex display tex="\implies\; x=\tfrac{\pi}{3} \qquad (\cos x=-1 \text{ rejected, not acute})" />
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x = \dfrac{\pi}{3}}" />,
    reason: (
      <>
        <Katex tex="A''(x) = p^2(-\sin x - 2\sin 2x) < 0" /> at <Katex tex="x=\tfrac{\pi}{3}" /> — confirms a
        maximum. Matches option <b>D</b>.
      </>
    ),
  },
]

export default function MethodsQ21_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            The trapezium <Katex tex="ABCD" /> is shown below. The sides <Katex tex="AB" />, <Katex tex="BC" />{' '}
            and <Katex tex="DA" /> are of equal length, <Katex tex="p" />. The size of the acute angle{' '}
            <Katex tex="BCD" /> is <Katex tex="x" /> radians.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex justify-center">
            <img src={trapeziumSrc} alt="Isosceles trapezium ABCD with sides AB, BC, DA of equal length p and acute angle BCD of x radians, from the original 2014 VCAA exam paper" className="w-full max-w-[300px]" />
          </div>
          <p className="mt-3">The area of the trapezium is a maximum when the value of <Katex tex="x" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi}{12}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{6}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\pi}{4}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi}{3}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{5\pi}{12}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
