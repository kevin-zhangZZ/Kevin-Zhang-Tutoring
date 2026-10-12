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
      <Katex tex="y" /> as a function of <Katex tex="x" /> as required by the question, instead
      writing their final answer as <Katex tex="y^2=5-\sqrt{x^2+1}" />. Some students failed to
      choose the correct sign and gave <Katex tex="y=\sqrt{5-\sqrt{x^2+1}}" /> as their
      answer.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x+2y\sqrt{x^2+1}\,\frac{dy}{dx} = 0" />,
    reason: <>The equation as given. Rearranged, <Katex tex="\frac{dy}{dx}" /> is a function of <Katex tex="x" /> times a function of <Katex tex="y" />, so it is separable.</>,
    more: <>Here <Katex tex="\frac{dy}{dx}=\frac{-x}{\sqrt{x^2+1}}\cdot\frac{1}{2y}" />. Recognising the type is the first decision: once it is spotted, move each variable to its own side and integrate.</>,
  },
  {
    working: <Katex display tex="2y\,\frac{dy}{dx} = \frac{-x}{\sqrt{x^2+1}}" />,
    reason: <>Subtract <Katex tex="x" />, then divide both sides by <Katex tex="\sqrt{x^2+1}" />: all the <Katex tex="y" /> on the left, all the <Katex tex="x" /> on the right.</>,
    more: <>Dividing by <Katex tex="\sqrt{x^2+1}" /> is always allowed, since <Katex tex="x^2+1\geq 1" />. Keep the <Katex tex="2y" /> together on the left: it integrates neatly to <Katex tex="y^2" />.</>,
  },
  {
    working: <Katex display tex="\int 2y\,dy = -\int x\left(x^2+1\right)^{-1/2}dx" />,
    reason: <>Integrate both sides with respect to <Katex tex="x" />; on the left, <Katex tex="\int 2y\,\frac{dy}{dx}\,dx" /> becomes <Katex tex="\int 2y\,dy" />.</>,
  },
  {
    working: <Katex display tex="y^2 = -\left(x^2+1\right)^{1/2}+c" />,
    reason: <>Left side: <Katex tex="y^2" />. Right side is a reverse chain rule: <Katex tex="\tfrac{d}{dx}\left(x^2+1\right)^{1/2} = x\left(x^2+1\right)^{-1/2}" />, so no extra factor is needed.</>,
    more: (
      <>
        <p>
          No <Katex tex="+c" /> on the left: one constant <Katex tex="c" /> on the right covers both sides.
        </p>
        <p>
          The report mentions occasional integration errors. The usual ones here are dropping the minus sign, or
          writing <Katex tex="2\sqrt{x^2+1}" /> by forgetting that the power <Katex tex="\tfrac12" /> brought
          down cancels the 2 from the chain rule. Differentiating your answer catches both.
        </p>
        <p>
          Equivalently, substitute <Katex tex="u=x^2+1" />, <Katex tex="du=2x\,dx" />:{' '}
          <Katex tex="-\int x\,u^{-1/2}\,\tfrac{du}{2x} = -\tfrac12\int u^{-1/2}\,du = -u^{1/2}" />.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="y(0) = -2: \quad 4 = -\sqrt{1}+c \implies c = 5" />,
    reason: <>Substitute <Katex tex="x=0" />, <Katex tex="y=-2" />. Squaring <Katex tex="-2" /> gives <Katex tex="+4" />, so the sign is lost here — it comes back at the last step.</>,
  },
  {
    working: <Katex display tex="y^2 = 5-\sqrt{x^2+1}" />,
    reason: <>Not the place to stop: the question asks for <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
    more: <>The report notes some students gave this as their final answer.</>,
  },
  {
    working: <Katex display tex="y = \pm\sqrt{5-\sqrt{x^2+1}}" />,
    reason: <>Take the square root of both sides. Both signs satisfy the differential equation, so the initial condition must choose.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\sqrt{5-\sqrt{x^2+1}}}" />,
    reason: <>The negative root: at <Katex tex="x=0" /> it gives <Katex tex="-\sqrt{5-1}=-2" />, matching <Katex tex="y(0)=-2" />. The positive root gives <Katex tex="+2" />.</>,
    more: (
      <>
        <p>
          The positive root is the solution through <Katex tex="(0,\,2)" />, not{' '}
          <Katex tex="(0,\,-2)" />. The report notes some students failed to choose the correct sign and gave that
          one.
        </p>
        <p>
          The solution cannot switch to the positive branch part-way along: to change sign it would have to pass
          through <Katex tex="y=0" />, where <Katex tex="\frac{dy}{dx}" /> is undefined (<Katex tex="2y" /> is in the
          denominator).
        </p>
        <p>
          The question doesn't ask for a domain, but this solution needs{' '}
          <Katex tex="\sqrt{x^2+1}<5" />, i.e. <Katex tex="-2\sqrt6<x<2\sqrt6" />. At the ends{' '}
          <Katex tex="y=0" />, so for the reason above the curve stops there.
        </p>
      </>
    ),
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
            The last steps matter. "Expressing <Katex tex="y" /> as a function of{' '}
            <Katex tex="x" />" rules out leaving the answer as{' '}
            <Katex tex="y^2=\ldots" />, and taking the square root then forces a choice of
            sign.
          </p>
          <p>
            The general solution is a family of curves, one for each value of{' '}
            <Katex tex="c" />. The initial condition picks one curve: first it fixes{' '}
            <Katex tex="c" />, then it fixes the sign.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
