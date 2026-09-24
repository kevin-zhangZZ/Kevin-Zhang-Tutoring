// 2019 Specialist Mathematics — Exam 1, Question 10 (5 marks).
// Implicit differentiation of sin(x²) + cos(y²) = (3√2/π)xy, evaluated at (√π/√6, √π/√3) and
// presented in the required surd form. Question text transcribed from the original paper (no
// diagram given). Cross-checked against the VCAA examination report and itute's independent
// solutions, and verified by computer algebra — all give (π − 2√3)/(√2(π + √3)), i.e. a = 2,
// b = 3. Solution is original.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAMINER: SAExaminerStats = {
  marks: [12, 4, 8, 21, 36, 18],
  average: 3.2,
  comment: (
    <>
      Most students were able to differentiate implicitly correctly. It made little difference
      if students substituted the values of <Katex tex="x" /> and <Katex tex="y" /> into their
      equation before or after obtaining an expression for <Katex tex="\dfrac{dy}{dx}" />. Although
      various arithmetic and algebraic errors were seen, many students knew the exact values for{' '}
      <Katex tex="\cos\left(\dfrac{\pi}{6}\right)" /> and <Katex tex="\sin\left(\dfrac{\pi}{3}\right)" />.
      Some students were unable to express the answer in the required form.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{d}{dx}\Bigl[\sin\left(x^2\right)+\cos\left(y^2\right)\Bigr] = \dfrac{d}{dx}\left[\dfrac{3\sqrt2}{\pi}xy\right]" />,
    reason: <>Differentiate both sides with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\sin\left(x^2\right) = 2x\cos\left(x^2\right)" />,
    reason: <>Chain rule.</>,
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\cos\left(y^2\right) = -\sin\left(y^2\right)\times 2y\dfrac{dy}{dx} = -2y\sin\left(y^2\right)\dfrac{dy}{dx}" />,
    reason: <>Chain rule again, but with an extra link: <Katex tex="y" /> depends on <Katex tex="x" />, so differentiating anything containing <Katex tex="y" /> produces a factor of <Katex tex="\tfrac{dy}{dx}" />. That is the whole idea of implicit differentiation.</>,
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\left[\dfrac{3\sqrt2}{\pi}xy\right] = \dfrac{3\sqrt2}{\pi}\left(y+x\dfrac{dy}{dx}\right)" />,
    reason: <>Product rule on <Katex tex="xy" />: <Katex tex="(x)'y+x(y)' = y+x\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="2x\cos\left(x^2\right)-2y\sin\left(y^2\right)\dfrac{dy}{dx} = \dfrac{3\sqrt2}{\pi}\left(y+x\dfrac{dy}{dx}\right)" />,
    reason: <>The three derivatives assembled.</>,
  },
  {
    working: <Katex display tex="x = \dfrac{\sqrt\pi}{\sqrt6} \implies x^2 = \dfrac{\pi}{6}, \qquad y = \dfrac{\sqrt\pi}{\sqrt3} \implies y^2 = \dfrac{\pi}{3}" />,
    reason: <>Substituting now — before rearranging — keeps the algebra lighter. Squaring the coordinates is what makes the angles come out nice.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\dfrac{\pi}{6}\right) = \dfrac{\sqrt3}{2}, \qquad \sin\!\left(\dfrac{\pi}{3}\right) = \dfrac{\sqrt3}{2}" />,
    reason: <>The exact values the question has been engineered around.</>,
  },
  {
    working: (
      <>
        <Katex display tex="2\sqrt{\dfrac{\pi}{6}}\cdot\dfrac{\sqrt3}{2} - 2\sqrt{\dfrac{\pi}{3}}\cdot\dfrac{\sqrt3}{2}\dfrac{dy}{dx} = \dfrac{3\sqrt2}{\pi}\left(\sqrt{\dfrac{\pi}{3}}+\sqrt{\dfrac{\pi}{6}}\dfrac{dy}{dx}\right)" />
        <Katex display tex="\sqrt{\dfrac{\pi}{2}} - \sqrt{\pi}\,\dfrac{dy}{dx} = \sqrt{\dfrac{6}{\pi}}+\sqrt{\dfrac{3}{\pi}}\,\dfrac{dy}{dx}" />
      </>
    ),
    reason: <>Tidying each piece: <Katex tex="\sqrt3\sqrt{\tfrac{\pi}{6}}=\sqrt{\tfrac{3\pi}{6}}=\sqrt{\tfrac{\pi}{2}}" /> and <Katex tex="\sqrt3\sqrt{\tfrac{\pi}{3}}=\sqrt{\pi}" />; on the right, <Katex tex="\tfrac{3\sqrt2}{\pi}\sqrt{\tfrac{\pi}{3}}=\sqrt{\tfrac{6}{\pi}}" /> and <Katex tex="\tfrac{3\sqrt2}{\pi}\sqrt{\tfrac{\pi}{6}}=\sqrt{\tfrac{3}{\pi}}" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{\pi}{\sqrt2} - \pi\dfrac{dy}{dx} = \sqrt6 + \sqrt3\,\dfrac{dy}{dx}" />,
    reason: <>Multiply every term by <Katex tex="\sqrt\pi" /> to clear the <Katex tex="\pi" />'s out of the denominators: <Katex tex="\sqrt\pi\sqrt{\tfrac{\pi}{2}}=\tfrac{\pi}{\sqrt2}" />, <Katex tex="\sqrt\pi\sqrt\pi=\pi" />, and so on.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{\pi}{\sqrt2}-\sqrt6 = \left(\pi+\sqrt3\right)\dfrac{dy}{dx}" />
        <Katex display tex="\dfrac{dy}{dx} = \dfrac{\dfrac{\pi}{\sqrt2}-\sqrt6}{\pi+\sqrt3}" />
      </>
    ),
    reason: <>Collect the <Katex tex="\tfrac{dy}{dx}" /> terms on one side and factor.</>,
  },
  {
    working: (
      <>
        <Katex display tex="= \dfrac{\dfrac{\pi-\sqrt2\sqrt6}{\sqrt2}}{\pi+\sqrt3} = \dfrac{\pi-\sqrt{12}}{\sqrt2\left(\pi+\sqrt3\right)}" />
      </>
    ),
    reason: <>Put the numerator over the common denominator <Katex tex="\sqrt2" />, using <Katex tex="\sqrt6=\tfrac{\sqrt2\sqrt6}{\sqrt2}" /> and <Katex tex="\sqrt2\times\sqrt6=\sqrt{12}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{dy}{dx} = \dfrac{\pi-2\sqrt3}{\sqrt2\left(\pi+\sqrt3\right)}}" />,
    reason: <><Katex tex="\sqrt{12}=2\sqrt3" />, which lands the answer in the required form <Katex tex="\tfrac{\pi-a\sqrt b}{\sqrt a\left(\pi+\sqrt b\right)}" /> with <Katex tex="a=2" /> and <Katex tex="b=3" />. (Numerically <Katex tex="\approx-0.047" /> — a shallow negative gradient.)</>,
  },
]

export default function SpecialistQ10_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (5 marks)</p>
        <p className="mb-2">
          Find <Katex tex="\dfrac{dy}{dx}" /> at the point{' '}
          <Katex tex="\left(\dfrac{\sqrt\pi}{\sqrt6},\ \dfrac{\sqrt\pi}{\sqrt3}\right)" /> for the
          curve defined by the relation{' '}
          <Katex tex="\sin\left(x^2\right)+\cos\left(y^2\right) = \dfrac{3\sqrt2}{\pi}xy" />.
        </p>
        <p>
          Give your answer in the form{' '}
          <Katex tex="\dfrac{\pi-a\sqrt b}{\sqrt a\left(\pi+\sqrt b\right)}" />, where{' '}
          <Katex tex="a,b\in Z^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            This relation can't be rearranged into <Katex tex="y=\ldots" />, so{' '}
            <b>implicit differentiation</b> is the only way in: differentiate both sides with
            respect to <Katex tex="x" />, remembering that <Katex tex="y" /> is secretly a
            function of <Katex tex="x" />. Every time you differentiate something containing{' '}
            <Katex tex="y" />, the chain rule leaves behind a factor of{' '}
            <Katex tex="\tfrac{dy}{dx}" />.
          </p>
          <p>
            Then it is an algebra problem: gather the <Katex tex="\tfrac{dy}{dx}" /> terms on one
            side, factor, and divide. The report's general comments list algebra in this question
            as an area of weakness, so it's worth substituting the given point early to keep the
            expressions small (the report says it made little difference whether students
            substituted before or after finding <Katex tex="\tfrac{dy}{dx}" />).
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAMINER} maxMarks={5} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
