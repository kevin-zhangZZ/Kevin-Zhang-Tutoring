// 2022 Specialist Mathematics — Exam 1 Question 7 (3 marks). Implicit differentiation of
// a product containing cos(x + y). Question text transcribed from the original paper.
// Answer checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [33, 18, 15, 34],
  average: 1.5,
  comment: (
    <>
      A large number of students used a trigonometric identity to expand{' '}
      <Katex tex="\cos(x+y)" /> before differentiating. Only a minority of students who used
      this approach were able to find the correct answer, with many students finding
      themselves overwhelmed by the large number of terms produced using this method.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x\cos(x+y) = \frac{\pi}{48}" />,
    reason: <>Differentiate both sides with respect to x, as it stands — no expansion.</>,
  },
  {
    working: <Katex display tex="\cos(x+y)+x\cdot\left(-\sin(x+y)\right)\left(1+\frac{dy}{dx}\right) = 0" />,
    reason: <>Product rule on the left; the chain rule on <Katex tex="\cos(x+y)" /> contributes <Katex tex="\tfrac{d}{dx}(x+y)=1+\tfrac{dy}{dx}" />. The right side is constant, so it differentiates to 0.</>,
  },
  {
    working: <Katex display tex="x+y = \frac{\pi}{24}+\frac{7\pi}{24} = \frac{8\pi}{24} = \frac{\pi}{3}" />,
    reason: <>Work this out before substituting — it is the whole reason the given point was chosen.</>,
  },
  {
    working: <Katex display tex="\frac{1}{2}-\frac{\pi}{24}\cdot\frac{\sqrt3}{2}\left(1+\frac{dy}{dx}\right) = 0" />,
    reason: <><Katex tex="\cos\!\left(\tfrac\pi3\right)=\tfrac12" /> and <Katex tex="\sin\!\left(\tfrac\pi3\right)=\tfrac{\sqrt3}{2}" />, with <Katex tex="x=\tfrac{\pi}{24}" />.</>,
  },
  {
    working: <Katex display tex="\frac{\sqrt3\,\pi}{48}\left(1+\frac{dy}{dx}\right) = \frac{1}{2} \implies 1+\frac{dy}{dx} = \frac{48}{2\sqrt3\,\pi} = \frac{24}{\sqrt3\,\pi}" />,
    reason: <>Isolating the bracket.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{24}{\sqrt3\,\pi}-1 = \frac{24\sqrt3}{3\pi}-1 = \frac{8\sqrt3}{\pi}-1" />,
    reason: <>Rationalising: <Katex tex="\tfrac{24}{\sqrt3}=\tfrac{24\sqrt3}{3}=8\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{8\sqrt3-\pi}{\pi}}" />,
    reason: <>The required form with <Katex tex="a=8" /> and <Katex tex="b=3" />; about <Katex tex="3.41" />.</>,
  },
]

export default function SpecialistQ7_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (3 marks)</p>
        <p>
          A curve has equation <Katex tex="x\cos(x+y)=\dfrac{\pi}{48}" />.
        </p>
        <p>
          Find the gradient of the curve at the point{' '}
          <Katex tex="\left(\dfrac{\pi}{24},\dfrac{7\pi}{24}\right)" />. Give your answer in
          the form <Katex tex="\dfrac{a\sqrt b-\pi}{\pi}" />, where{' '}
          <Katex tex="a,b\in Z" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Leave <Katex tex="\cos(x+y)" /> alone. Expanding it with the compound-angle
            formula turns one clean product rule into four terms, each needing its own
            product and chain rule — the report notes only a minority of students who did
            this found the correct answer. Differentiate the expression exactly as printed, then substitute.
          </p>
          <p>
            Substituting numbers <em>after</em> differentiating, rather than trying to make{' '}
            <Katex tex="\tfrac{dy}{dx}" /> the subject first, also saves a great deal of
            algebra: once <Katex tex="x+y=\tfrac\pi3" /> is known, everything becomes
            arithmetic.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
