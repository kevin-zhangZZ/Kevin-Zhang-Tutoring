// 2018 Specialist Mathematics — Exam 1, Question 3 (4 marks). Implicit differentiation of
// 2x²sin(y) + xy = π²/18 at (π/6, π/6). Question text transcribed from the original paper
// (no diagram given). Answer checked independently with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [8, 4, 9, 33, 46],
  average: 3.1,
  comment: (
    <>
      Most students knew to use implicit differentiation in this problem and were successful
      in their application of the chain and product rules. Many students attempted to find an
      expression for <Katex tex="\tfrac{dy}{dx}" /> in terms of <Katex tex="x" /> and{' '}
      <Katex tex="y" />. This was not necessary, with a more effective approach being to
      substitute <Katex tex="x=\tfrac{\pi}{6}" /> and <Katex tex="y=\tfrac{\pi}{6}" />{' '}
      immediately following the implicit differentiation. Some students had difficulty with
      arithmetic.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2x^2\sin(y) + xy = \frac{\pi^2}{18}" />,
    reason: <>Differentiate both sides with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" />. The right-hand side is a constant, so it differentiates to <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(2x^2\sin(y)\right) = 4x\sin(y) + 2x^2\cos(y)\frac{dy}{dx}" />,
    reason: <>Product rule on <Katex tex="2x^2" /> and <Katex tex="\sin(y)" />, with the chain rule supplying the <Katex tex="\tfrac{dy}{dx}" /> when <Katex tex="\sin(y)" /> is differentiated.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}(xy) = y + x\frac{dy}{dx}" />,
    reason: <>Product rule again.</>,
  },
  {
    working: <Katex display tex="4x\sin(y) + 2x^2\cos(y)\frac{dy}{dx} + y + x\frac{dy}{dx} = 0" />,
    reason: <>The differentiated equation. Substitute the point now rather than rearranging first — the report is explicit that finding a general expression for <Katex tex="\tfrac{dy}{dx}" /> was unnecessary work.</>,
  },
  {
    working: <Katex display tex="x=y=\frac{\pi}{6}: \quad \sin\!\left(\frac{\pi}{6}\right)=\frac12, \quad \cos\!\left(\frac{\pi}{6}\right)=\frac{\sqrt3}{2}" />,
    reason: <>The exact values that make everything collapse.</>,
  },
  {
    working: <Katex display tex="4\!\left(\frac{\pi}{6}\right)\!\left(\frac12\right) + 2\!\left(\frac{\pi^2}{36}\right)\!\left(\frac{\sqrt3}{2}\right)\frac{dy}{dx} + \frac{\pi}{6} + \frac{\pi}{6}\frac{dy}{dx} = 0" />,
    reason: <>Substituting. Note <Katex tex="x^2=\tfrac{\pi^2}{36}" />.</>,
  },
  {
    working: <Katex display tex="\frac{\pi}{3} + \frac{\pi}{6} + \left(\frac{\sqrt3\pi^2}{36} + \frac{\pi}{6}\right)\frac{dy}{dx} = 0" />,
    reason: <>Collecting the constant terms and the <Katex tex="\tfrac{dy}{dx}" /> terms.</>,
  },
  {
    working: <Katex display tex="\frac{\pi}{2} + \frac{\pi\left(\sqrt3\pi + 6\right)}{36}\frac{dy}{dx} = 0" />,
    reason: <><Katex tex="\tfrac{\pi}{3}+\tfrac{\pi}{6}=\tfrac{\pi}{2}" />, and factoring <Katex tex="\tfrac{\pi}{36}" /> out of the bracket gives <Katex tex="\tfrac{\pi}{36}\left(\sqrt3\pi+6\right)" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = -\frac{\pi}{2}\times\frac{36}{\pi\left(\sqrt3\pi+6\right)}" />,
    reason: <>The <Katex tex="\pi" />s cancel — which is what makes the prescribed answer form possible.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-18}{\pi\sqrt3 + 6}}" />,
    reason: <>The required form <Katex tex="\tfrac{a}{\pi\sqrt b+c}" /> with <Katex tex="a=-18" />, <Katex tex="b=3" />, <Katex tex="c=6" />, all integers. (<Katex tex="\approx-1.57" />: the curve is falling fairly steeply at that point.)</>,
  },
]

export default function SpecialistQ3_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (4 marks)</p>
        <p>
          Find the gradient of the curve with equation{' '}
          <Katex tex="2x^2\sin(y)+xy=\dfrac{\pi^2}{18}" /> at the point{' '}
          <Katex tex="\left(\dfrac{\pi}{6},\ \dfrac{\pi}{6}\right)" />. Give your answer in
          the form <Katex tex="\dfrac{a}{\pi\sqrt{b}+c}" />, where <Katex tex="a" />,{' '}
          <Katex tex="b" /> and <Katex tex="c" /> are integers.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The equation cannot be rearranged for <Katex tex="y" />, so differentiate it as it
            stands. Every time a <Katex tex="y" /> is differentiated, the chain rule leaves a{' '}
            <Katex tex="\tfrac{dy}{dx}" /> behind; everything else is the ordinary product
            rule.
          </p>
          <p>
            The efficiency point the report makes is worth taking: substitute the numbers{' '}
            <em>immediately</em> after differentiating, before rearranging. Solving a general
            expression for <Katex tex="\tfrac{dy}{dx}" /> and only then substituting gives the
            same answer through far messier algebra.
          </p>
          <p>
            Worth a check first that the point is actually on the curve:{' '}
            <Katex tex="2\left(\tfrac{\pi}{6}\right)^2\left(\tfrac12\right)+\left(\tfrac{\pi}{6}\right)^2 = \tfrac{\pi^2}{36}+\tfrac{\pi^2}{36}=\tfrac{\pi^2}{18}" /> ✓
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
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
