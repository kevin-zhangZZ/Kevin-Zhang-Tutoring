// 2022 Specialist Mathematics — Exam 1 Question 9 (4 marks). Antidifferentiating
// cos(2x)/sin³(2x) by substitution, then fixing the constant. Question text transcribed
// from the original paper. Answer checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [32, 10, 15, 10, 34],
  average: 2.0,
  comment: (
    <>
      A number of students attempted to manipulate the integrand using trigonometric
      identities prior to integration, often with little success. Of those who used an
      appropriate substitution, errors including integrating <Katex tex="\tfrac{1}{u^3}" /> to
      get <Katex tex="-2u^{-2}+c" /> or <Katex tex="-2u^{-4}+c" /> were often seen.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \int\frac{\cos(2x)}{\sin^3(2x)}\,dx" />,
    reason: <>The numerator is (a multiple of) the derivative of <Katex tex="\sin(2x)" />, which is the signal to substitute.</>,
  },
  {
    working: <Katex display tex="u = \sin(2x) \implies \frac{du}{dx} = 2\cos(2x) \implies \cos(2x)\,dx = \frac{du}{2}" />,
    reason: 'The chain-rule factor 2 is carried across so nothing is lost.',
  },
  {
    working: <Katex display tex="f(x) = \frac12\int u^{-3}\,du" />,
    reason: <>Every trace of <Katex tex="x" /> has gone, which is what a correct substitution looks like.</>,
  },
  {
    working: <Katex display tex="= \frac12\cdot\frac{u^{-2}}{-2}+c = -\frac{1}{4u^2}+c" />,
    reason: <>Raise the index by one and divide: <Katex tex="\int u^{-3}du=\tfrac{u^{-2}}{-2}" />. The report names <Katex tex="-2u^{-2}" /> and <Katex tex="-2u^{-4}" /> as the common wrong answers here.</>,
  },
  {
    working: <Katex display tex="f(x) = -\frac{1}{4\sin^2(2x)}+c" />,
    reason: 'Back-substituting.',
  },
  {
    working: <Katex display tex="f\!\left(\frac\pi8\right) = \frac34: \quad -\frac{1}{4\sin^2\!\left(\frac\pi4\right)}+c = \frac34" />,
    reason: <><Katex tex="2x=\tfrac\pi4" /> when <Katex tex="x=\tfrac\pi8" />.</>,
  },
  {
    working: <Katex display tex="\sin^2\!\left(\frac\pi4\right) = \frac12 \implies -\frac{1}{2}+c = \frac34 \implies c = \frac54" />,
    reason: <><Katex tex="\tfrac{1}{4\times\frac12}=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = -\frac{1}{4\sin^2(2x)}+\frac54 = -\frac14\operatorname{cosec}^2(2x)+\frac54}" />,
    reason: <>Either form is accepted. Check by differentiating: <Katex tex="-\tfrac14\cdot(-2)\sin^{-3}(2x)\cdot2\cos(2x)=\tfrac{\cos(2x)}{\sin^3(2x)}" /> ✓.</>,
  },
]

export default function SpecialistQ9_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (4 marks)</p>
        <p>
          Given that <Katex tex="f'(x)=\dfrac{\cos(2x)}{\sin^3(2x)}" /> and{' '}
          <Katex tex="f\!\left(\dfrac\pi8\right)=\dfrac34" />, find <Katex tex="f(x)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A quotient of trigonometric functions in which the numerator is essentially the
            derivative of the thing being powered in the denominator is a substitution, not
            an identity. Rewriting as{' '}
            <Katex tex="\cot(2x)\operatorname{cosec}^2(2x)" /> or similar is legal but leads
            nowhere useful, which is the report's complaint.
          </p>
          <p>
            Once the integral is done, the condition <Katex tex="f\!\left(\tfrac\pi8\right)=\tfrac34" />{' '}
            exists solely to pin down <Katex tex="c" />. Notice the angle is chosen so that{' '}
            <Katex tex="2x" /> is an exact value.
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
