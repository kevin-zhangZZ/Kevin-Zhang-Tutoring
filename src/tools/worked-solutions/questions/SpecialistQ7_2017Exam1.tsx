// 2017 Specialist Mathematics — Exam 1, Question 7 (4 marks). Arc length of the astroid
// r(t) = cos³(t)i + sin³(t)j on [0, π/4]. Question text transcribed from the original paper
// (no diagram given). Answer checked with sympy and against the VCAA examination report.
// Solution is original. No lettered parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [27, 16, 18, 9, 30],
  average: 2.0,
  comment: (
    <>
      Students had varied success with this question. A number of students were unable to
      find the necessary derivatives, neglecting to use the chain rule. Of those who did use
      the chain rule, the question was reasonably well answered, although there were many who
      did not recognise the appropriate form of the arc length formula. Some incorrect
      answers involved using the formula with <Katex tex="\tfrac{dy}{dx}" />, errors in
      derivatives, an inability to correctly simplify the expression under the square root,
      and taking the square root of individual terms.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>The <em>parametric</em> arc-length formula. The curve is given in terms of <Katex tex="t" />, so this is the form to use — the Cartesian version with <Katex tex="\tfrac{dy}{dx}" /> would need <Katex tex="y" /> as a function of <Katex tex="x" /> first.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = -3\cos^2(t)\sin(t), \qquad \frac{dy}{dt} = 3\sin^2(t)\cos(t)" />,
    reason: <>Chain rule on each cube: bring the <Katex tex="3" /> down, reduce the power, times the derivative of the inside function.</>,
  },
  {
    working: <Katex display tex="\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 = 9\cos^4 t\sin^2 t + 9\sin^4 t\cos^2 t" />,
    reason: <>Squaring; the minus sign disappears.</>,
  },
  {
    working: <Katex display tex="= 9\sin^2 t\cos^2 t\bigl(\cos^2 t+\sin^2 t\bigr) = 9\sin^2 t\cos^2 t" />,
    reason: <>Taking out the common factor makes the Pythagorean identity appear. Without this step the square root stays unmanageable — the report's "inability to correctly simplify".</>,
  },
  {
    working: <Katex display tex="\sqrt{9\sin^2 t\cos^2 t} = 3\sin(t)\cos(t)" />,
    reason: <>No absolute values needed: both <Katex tex="\sin t" /> and <Katex tex="\cos t" /> are non-negative on <Katex tex="\left[0,\tfrac{\pi}{4}\right]" />.</>,
  },
  {
    working: <Katex display tex="L = \int_0^{\pi/4} 3\sin(t)\cos(t)\,dt = \int_0^{\pi/4}\frac32\sin(2t)\,dt" />,
    reason: <>The double-angle identity <Katex tex="\sin(2t)=2\sin t\cos t" /> turns this into a standard integral.</>,
  },
  {
    working: <Katex display tex="= \left[-\frac34\cos(2t)\right]_0^{\pi/4}" />,
    reason: <>Antidifferentiating: <Katex tex="\tfrac32\times\left(-\tfrac12\right)=-\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="= -\frac34\cos\!\left(\frac{\pi}{2}\right)+\frac34\cos(0) = 0+\frac34" />,
    reason: <>Exact values.</>,
  },
  {
    working: <Katex display tex="\boxed{L = \frac34}" />,
    reason: <>Plausible as a check: the particle runs from <Katex tex="(1,0)" /> to <Katex tex="\left(\tfrac{1}{2\sqrt2},\tfrac{1}{2\sqrt2}\right)\approx(0.354,0.354)" />, a straight-line distance of about <Katex tex="0.72" /> — so a path length a touch longer, <Katex tex="0.75" />, is right.</>,
  },
]

export default function SpecialistQ7_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 7 (4 marks)">
        <p>
          The position vector of a particle moving along a curve at time <Katex tex="t" /> is
          given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\cos^3(t)\,\underset{\sim}{i}+\sin^3(t)\,\underset{\sim}{j}" />
          , <Katex tex="0\le t\le\tfrac{\pi}{4}" />.
        </p>
        <p>
          Find the length of the path that the particle travels along the curve from{' '}
          <Katex tex="t=0" /> to <Katex tex="t=\tfrac{\pi}{4}" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
