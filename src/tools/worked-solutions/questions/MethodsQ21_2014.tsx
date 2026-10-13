// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 21. VCAA examination report: 28% correct — the
// hardest MCQ on this paper. Isosceles trapezium with three equal sides p; find the angle that
// maximises its area. Question text transcribed from the original paper; the diagram is
// cropped from the original VCAA exam PDF. Solution is original. The report's comment writes the
// long side as p + 2cos(x) (should be p + 2p cos(x)); kept verbatim, noted in row 2's `more`.
// Interactive: interactives/meth-2014-mcq21-pieces.tsx (rectangle vs end triangles, option C trap).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import trapeziumSrc from './meth-2014-mcq21-trapezium.png'

const PiecesWidget = lazyWidget(() => import('../interactives/meth-2014-mcq21-pieces'))

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
    working: <Katex display tex="h = p\sin x, \qquad DC = p + 2p\cos x" />,
    reason: (
      <>
        Drop perpendiculars from <Katex tex="A" /> and <Katex tex="B" />. By symmetry, both end triangles have
        hypotenuse <Katex tex="p" /> and angle <Katex tex="x" />: height <Katex tex="p\sin x" />, base{' '}
        <Katex tex="p\cos x" />. <Katex tex="DC" /> is two bases plus <Katex tex="p" />.
      </>
    ),
    more: (
      <>
        Why is the angle at <Katex tex="D" /> also <Katex tex="x" />? Because <Katex tex="DA=BC" />, the trapezium is
        symmetric about the vertical line through the midpoints of <Katex tex="AB" /> and <Katex tex="DC" />. So the long
        side is the middle piece under <Katex tex="AB" /> plus the two triangle bases:{' '}
        <Katex tex="DC = p\cos x + p + p\cos x" />. Opposite over hypotenuse gives the height, adjacent over hypotenuse
        gives the base.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} A(x) &= \tfrac{1}{2}(AB+DC)\,h \\ &= \tfrac12(2p+2p\cos x)(p\sin x) \\ &= p^2\sin x(1+\cos x) \end{aligned}"
      />
    ),
    reason: 'Trapezium area = ½ × (sum of parallel sides) × height.',
    more: (
      <>
        The examiner&apos;s report writes the long side as <Katex tex="p+2\cos(x)" />; it should be{' '}
        <Katex tex="p+2p\cos(x)" />. The slip doesn&apos;t change the answer.
      </>
    ),
  },
  {
    working: <Katex display tex="A(x) = p^2\left(\sin x + \tfrac12\sin 2x\right)" />,
    reason: (
      <>
        Expand, using <Katex tex="\sin x\cos x = \tfrac12\sin 2x" />, so each term can be differentiated on its own.
      </>
    ),
    more: (
      <>
        The two terms are the two pieces of the shape: <Katex tex="p^2\sin x" /> is the middle rectangle
        (<Katex tex="p" /> wide, <Katex tex="p\sin x" /> high) and <Katex tex="p^2\sin x\cos x" /> is the two end
        triangles together. The product rule on <Katex tex="p^2\sin x(1+\cos x)" /> gives the same derivative.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} A'(x) &= p^2(\cos x + \cos 2x) \\ &= 0 \end{aligned}" />,
    reason: (
      <>
        The maximum area is at a stationary point, so set <Katex tex="A'(x)=0" />. Note{' '}
        <Katex tex="\tfrac{d}{dx}\bigl(\tfrac12\sin 2x\bigr) = \cos 2x" />.
      </>
    ),
    more: (
      <>
        <Katex tex="p^2" /> is a positive constant, so it doesn&apos;t affect where the maximum is. On CAS, with{' '}
        <Katex tex="p=1" />, <Cas fn="fMax">{'fMax(sin(x)·(1+cos(x)),x)|0<x<π/2'}</Cas> gives{' '}
        <Katex tex="x=\tfrac{\pi}{3}" /> directly.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="2\cos^2x + \cos x - 1 = 0" />
        <Katex display tex="\implies\; (2\cos x - 1)(\cos x+1)=0" />
      </>
    ),
    reason: (
      <>
        Write <Katex tex="\cos 2x = 2\cos^2x-1" /> so the equation is a quadratic in <Katex tex="\cos x" />, then
        factorise.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\cos x = \tfrac12 \quad\text{or}\quad \cos x = -1" />
        <Katex display tex="\implies\; x=\tfrac{\pi}{3}" />
      </>
    ),
    reason: (
      <>
        <Katex tex="x" /> is acute, so <Katex tex="0 < x < \tfrac{\pi}{2}" />: <Katex tex="\cos x=-1" /> (at{' '}
        <Katex tex="x=\pi" />) is rejected.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x = \dfrac{\pi}{3}}" />,
    reason: (
      <>
        <Katex tex="A''(x) = p^2(-\sin x - 2\sin 2x)" />, which is negative at <Katex tex="x=\tfrac{\pi}{3}" />, so this
        is a maximum. Matches option <b>D</b>.
      </>
    ),
    more: (
      <>
        <Katex tex="A''(\tfrac{\pi}{3}) = -\tfrac{3\sqrt3}{2}p^2" />. Option C, <Katex tex="\tfrac{\pi}{4}" /> (27%, the
        most popular wrong answer), is where the two end triangles alone, <Katex tex="p^2\sin x\cos x" />, are
        largest. It forgets the rectangle in the middle, whose area <Katex tex="p^2\sin x" /> keeps growing past{' '}
        <Katex tex="\tfrac\pi4" />: <Katex tex="A'(\tfrac{\pi}{4}) = \tfrac{\sqrt2}{2}p^2 > 0" />, so the total is
        still rising there. Checking every option: the areas are about <Katex tex="0.51p^2" /> (A),{' '}
        <Katex tex="0.93p^2" /> (B), <Katex tex="1.21p^2" /> (C), <Katex tex="1.30p^2" /> (D) and{' '}
        <Katex tex="1.22p^2" /> (E). Option E, <Katex tex="\tfrac{5\pi}{12}" />, overshoots: past{' '}
        <Katex tex="\tfrac\pi3" />, <Katex tex="A'(x) < 0" />, so the area is already falling again. Options A and B
        are where it is still rising steeply. At <Katex tex="x=\tfrac\pi3" />, <Katex tex="DC = 2p" /> and the shape is half a
        regular hexagon. The diagram below shows the pieces changing.
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
            <img loading="lazy" decoding="async" src={trapeziumSrc} alt="Isosceles trapezium ABCD with sides AB, BC, DA of equal length p and acute angle BCD of x radians, from the original 2014 VCAA exam paper" className="w-full max-w-[300px]" />
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
      extras={
        <Explore title="The end triangles peak at π/4, but the rectangle keeps growing">
          <PiecesWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
