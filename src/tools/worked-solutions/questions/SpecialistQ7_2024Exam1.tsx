// 2024 Specialist Mathematics — Exam 1 Question 7 (4 marks). A separable differential
// equation with an initial condition that fixes the sign of the square root. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [17, 13, 21, 22, 27],
  average: 2.3,
  comment: (
    <>
      Most students recognised that this was a separable differential equation. Occasional
      errors in integration were seen. Some students did not give their answer in the form of{' '}
      <Katex tex="y" /> as a function of <Katex tex="x" /> as required, instead leaving{' '}
      <Katex tex="y^2=\ldots" />. Some students failed to choose the correct sign.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x+2y\sqrt{x^2+1}\,\frac{dy}{dx} = 0" />,
    reason: 'The equation as given.',
  },
  {
    working: <Katex display tex="2y\,\frac{dy}{dx} = \frac{-x}{\sqrt{x^2+1}}" />,
    reason: 'Separating: all the y on the left, all the x on the right.',
  },
  {
    working: <Katex display tex="\int 2y\,dy = -\int x\left(x^2+1\right)^{-1/2}dx" />,
    reason: 'Integrating both sides.',
  },
  {
    working: <Katex display tex="y^2 = -\left(x^2+1\right)^{1/2}+c" />,
    reason: <>The right side is a standard reverse chain rule: <Katex tex="\tfrac{d}{dx}\left(x^2+1\right)^{1/2} = x\left(x^2+1\right)^{-1/2}" />, so no factor of 2 is needed.</>,
  },
  {
    working: <Katex display tex="y(0) = -2: \quad 4 = -\sqrt{1}+c \implies c = 5" />,
    reason: <>Squaring <Katex tex="-2" /> gives <Katex tex="+4" />, so the sign of the initial value is lost here — it comes back at the last step.</>,
  },
  {
    working: <Katex display tex="y^2 = 5-\sqrt{x^2+1}" />,
    reason: <>Stopping here loses marks: the question asks for <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\sqrt{5-\sqrt{x^2+1}}}" />,
    reason: <>The negative root, because <Katex tex="y(0)=-2<0" /> and a solution of a differential equation is continuous — it cannot jump branches. Check: at <Katex tex="x=0" />, <Katex tex="-\sqrt{5-1}=-2" /> ✓.</>,
  },
]

export default function SpecialistQ7_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (4 marks)</p>
        <p>
          Solve the differential equation{' '}
          <Katex tex="x+2y\sqrt{x^2+1}\,\dfrac{dy}{dx}=0" />, expressing <Katex tex="y" /> as
          a function of <Katex tex="x" />, given that <Katex tex="y(0)=-2" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two of the four marks sit at the very end. "Expressing <Katex tex="y" /> as a
            function of <Katex tex="x" />" rules out leaving the answer as{' '}
            <Katex tex="y^2=\ldots" />, and taking the square root then forces a choice of
            sign.
          </p>
          <p>
            The initial condition settles it. Squaring lost the sign of{' '}
            <Katex tex="y(0)=-2" />, but a solution curve is continuous, so a solution that
            starts below the axis stays below it — the negative branch is the only one that
            passes through the given point.
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
