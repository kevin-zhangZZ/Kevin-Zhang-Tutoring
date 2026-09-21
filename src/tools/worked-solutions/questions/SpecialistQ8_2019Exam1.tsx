// 2019 Specialist Mathematics — Exam 1, Question 8 (4 marks).
// Volume of the solid of revolution for y = √((1+2x)/(1+x²)) rotated about the x-axis on [0,1].
// Question text transcribed from the original paper. VCAA printed no diagram; the graph of the
// region being rotated is this site's own explanatory figure (matplotlib). Cross-checked against
// the VCAA examination report and itute's independent solutions, and verified by computer
// algebra — all give π²/4 + π log_e(2). Solution is original.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import regionSrc from './spec-2019exam1-q8-region.png'

const EXAMINER: SAExaminerStats = {
  marks: [13, 16, 10, 9, 52],
  average: 2.7,
  comment: (
    <>
      Most students were able to write down the correct integral to find the volume of the solid
      of revolution. Some students did not recognise the way in which the integrand split
      naturally and had difficulty proceeding; some attempted partial fractions. Many students
      who did split the integrand used a substitution to integrate the second piece — this was
      unnecessary and resulted in a loss of marks if not done correctly.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx = \pi\int_0^1\left(\sqrt{\dfrac{1+2x}{1+x^2}}\right)^2 dx" />,
    reason: <>The standard formula for rotation about the <Katex tex="x" />-axis. Squaring <Katex tex="y" /> is the first stroke of luck here — it cancels the square root completely.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_0^1 \dfrac{1+2x}{1+x^2}\,dx" />,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={regionSrc} alt="The curve y = √((1+2x)/(1+x²)) from (0,1) to (1, √(3/2)), with the region beneath it on [0,1] shaded — this is the region rotated about the x-axis" className="w-full max-w-[360px]" />
      </div>
    ),
    reason: <>The shaded region is what spins around the <Katex tex="x" />-axis, sweeping out a solid a bit like a slightly bulging cylinder of radius roughly <Katex tex="1.2" /> and length <Katex tex="1" /> — so expect a volume of the order of <Katex tex="\pi(1.2)^2(1)\approx4.5" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{1+2x}{1+x^2} = \dfrac{1}{1+x^2} + \dfrac{2x}{1+x^2}" />,
    reason: <>The key move: split the fraction over its two numerator terms. Each piece is then a standard form — no substitution and no partial fractions needed, which is precisely where the report says marks were lost.</>,
  },
  {
    working: <Katex display tex="\int\dfrac{1}{1+x^2}\,dx = \tan^{-1}(x)" />,
    reason: <>Straight off the formula sheet.</>,
  },
  {
    working: <Katex display tex="\int\dfrac{2x}{1+x^2}\,dx = \log_e\left(1+x^2\right)" />,
    reason: <>The numerator is exactly the derivative of the denominator, so this is the <Katex tex="\tfrac{f'(x)}{f(x)}" /> form and integrates to a logarithm. No absolute value is needed since <Katex tex="1+x^2>0" />.</>,
  },
  {
    working: <Katex display tex="V = \pi\Bigl[\tan^{-1}(x)+\log_e\left(1+x^2\right)\Bigr]_0^1" />,
  },
  {
    working: (
      <>
        <Katex display tex="= \pi\left[\left(\tan^{-1}(1)+\log_e 2\right)-\left(\tan^{-1}(0)+\log_e 1\right)\right]" />
        <Katex display tex="= \pi\left[\left(\dfrac{\pi}{4}+\log_e 2\right)-(0+0)\right]" />
      </>
    ),
    reason: <>Using <Katex tex="\tan^{-1}(1)=\tfrac{\pi}{4}" /> and <Katex tex="\log_e1=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \dfrac{\pi^2}{4}+\pi\log_e(2) \ \text{ cubic units}}" />,
    reason: <>Equivalently <Katex tex="\tfrac{\pi}{4}\bigl(\pi+4\log_e2\bigr)" />. Numerically this is about <Katex tex="4.64" />, matching the rough estimate from the picture ✓.</>,
  },
]

export default function SpecialistQ8_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (4 marks)</p>
        <p>
          Find the volume of the solid of revolution formed when the graph of{' '}
          <Katex tex="y=\sqrt{\dfrac{1+2x}{1+x^2}}" /> is rotated about the <Katex tex="x" />-axis
          over the interval <Katex tex="[0,1]" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Rotating the region under a curve about the <Katex tex="x" />-axis sweeps out a solid
            whose cross-sections are circles of radius <Katex tex="y" />. Adding up their areas{' '}
            <Katex tex="\pi y^2" /> along the interval gives{' '}
            <Katex tex="V=\pi\displaystyle\int_a^b y^2\,dx" />.
          </p>
          <p>
            Because the formula uses <Katex tex="y^2" />, a square root in <Katex tex="y" /> is
            usually good news — it disappears immediately. The real work is then recognising the
            standard forms in what's left; this is a technology-free exam, so the integrand is
            always designed to be one you know.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAMINER} maxMarks={4} />
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
