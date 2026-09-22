// 2025 Specialist Mathematics — Exam 1 Question 6 (4 marks). A solid of revolution whose
// integral is a reverse chain rule in arctan. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [16, 13, 13, 20, 38],
  average: 2.5,
  comment: (
    <>
      Common errors included a missing factor of <Katex tex="\pi" /> through the working,
      neglecting to adjust the terminals for the definite integral when a substitution was
      used, and algebraic or arithmetic errors.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx = \pi\int_1^{\sqrt3}\frac{\arctan(x)}{1+x^2}\,dx" />,
    reason: <>Rotation about the <Katex tex="x" />-axis. The square root disappears straight away — which is why the curve was written that way.</>,
  },
  {
    working: <Katex display tex="\text{let } u = \arctan(x) \implies du = \frac{dx}{1+x^2}" />,
    reason: <>The integrand is exactly <Katex tex="u\,du" />: an arctan multiplied by its own derivative.</>,
  },
  {
    working: <Katex display tex="x=1 \implies u = \frac{\pi}{4}; \qquad x=\sqrt3 \implies u = \frac{\pi}{3}" />,
    reason: 'Adjusting the terminals — the step the examiner flagged most often.',
  },
  {
    working: <Katex display tex="V = \pi\int_{\pi/4}^{\pi/3}u\,du = \pi\left[\frac{u^2}{2}\right]_{\pi/4}^{\pi/3}" />,
    reason: <>Equivalently, without substituting: <Katex tex="\tfrac{\pi}{2}\left[\arctan^2(x)\right]_1^{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{2}\left(\frac{\pi^2}{9}-\frac{\pi^2}{16}\right) = \frac{\pi^3}{2}\cdot\frac{16-9}{144}" />,
    reason: <>A common denominator of 144. Losing the leading <Katex tex="\pi" /> here was the other listed error.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{7\pi^3}{288} \ \text{ cubic units}}" />,
    reason: <>So <Katex tex="a=7" />, <Katex tex="b=3" />, <Katex tex="c=288" />, all positive integers. Numerically about <Katex tex="0.754" />.</>,
  },
]

export default function SpecialistQ6_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (4 marks)</p>
        <p>
          Find the volume of the solid of revolution formed when the area between the curve{' '}
          <Katex tex="y=\sqrt{\dfrac{\arctan(x)}{1+x^2}}" /> and the <Katex tex="x" />-axis
          from <Katex tex="x=1" /> to <Katex tex="x=\sqrt3" /> is rotated about the{' '}
          <Katex tex="x" />-axis. Give your answer in the form{' '}
          <Katex tex="\dfrac{a\pi^b}{c}" />, where <Katex tex="a,b,c\in\mathbb{Z}^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Squaring <Katex tex="y" /> leaves <Katex tex="\tfrac{\arctan(x)}{1+x^2}" />,
            which is a function multiplied by its own derivative. Any integral of the form{' '}
            <Katex tex="\int u\,\tfrac{du}{dx}\,dx" /> antidifferentiates to{' '}
            <Katex tex="\tfrac{u^2}{2}" />, so no integration by parts is needed.
          </p>
          <p>
            The terminals <Katex tex="1" /> and <Katex tex="\sqrt3" /> are chosen because{' '}
            <Katex tex="\arctan" /> sends them to the exact values{' '}
            <Katex tex="\tfrac{\pi}{4}" /> and <Katex tex="\tfrac{\pi}{3}" /> — which is what
            makes the answer a clean multiple of <Katex tex="\pi^3" />.
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
