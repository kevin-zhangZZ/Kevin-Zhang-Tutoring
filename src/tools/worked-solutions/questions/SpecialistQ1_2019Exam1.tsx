// 2019 Specialist Mathematics — Exam 1, Question 1 (4 marks).
// Solve the separable differential equation dy/dx = 2ye^(2x)/(1+e^(2x)) with y(0) = π.
// Question text transcribed from the original paper (no diagram given). Cross-checked against
// the VCAA examination report and itute's independent solutions, and independently re-derived
// by computer algebra — all three agree on y = (π/2)(1+e^(2x)). Solution is original.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAMINER: SAExaminerStats = {
  marks: [21, 9, 15, 13, 42],
  average: 2.5,
  comment: (
    <>
      Most students recognised that they needed to separate and integrate in order to solve the
      differential equation, although not all were then able to obtain the correct equation.
      Students who failed to recognise the <Katex tex="\tfrac{f'(x)}{f(x)}" /> form did not score
      highly, and some spent time using a substitution that was not necessary. Some students who
      correctly found the constant of integration did not use log or index laws correctly.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dy}{dx} = \dfrac{2ye^{2x}}{1+e^{2x}}" />,
  },
  {
    working: <Katex display tex="\dfrac{1}{y}\,dy = \dfrac{2e^{2x}}{1+e^{2x}}\,dx" />,
    reason: <>Separate the variables: every <Katex tex="y" /> on the left, every <Katex tex="x" /> on the right. This is possible because the right-hand side is a product of a function of <Katex tex="y" /> and a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\int\dfrac{1}{y}\,dy = \int\dfrac{2e^{2x}}{1+e^{2x}}\,dx" />,
    reason: <>Integrate both sides.</>,
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\left(1+e^{2x}\right) = 2e^{2x}" />,
    reason: <>The key observation: the numerator on the right is <em>exactly</em> the derivative of the denominator, so the integrand is in the form <Katex tex="\tfrac{f'(x)}{f(x)}" /> and integrates straight to a logarithm. No substitution is needed — the report notes that students who reached for one lost time and sometimes marks.</>,
  },
  {
    working: <Katex display tex="\log_e|y| = \log_e\left(1+e^{2x}\right)+c" />,
    reason: <><Katex tex="1+e^{2x}>0" /> always, so no absolute value is needed on the right.</>,
  },
  {
    working: <Katex display tex="\log_e\left(\dfrac{y}{1+e^{2x}}\right) = c \implies \dfrac{y}{1+e^{2x}} = e^{c} = A" />,
    reason: <>Subtract the logs and exponentiate. Writing the arbitrary constant as a single new constant <Katex tex="A=e^c" /> keeps the algebra clean.</>,
  },
  {
    working: <Katex display tex="y = A\left(1+e^{2x}\right)" />,
  },
  {
    working: <Katex display tex="y(0)=\pi: \quad \pi = A\left(1+e^{0}\right) = 2A \implies A = \dfrac{\pi}{2}" />,
    reason: <>Apply the initial condition to pin down <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \dfrac{\pi}{2}\left(1+e^{2x}\right)}" />,
    reason: <>Quick check: at <Katex tex="x=0" /> this gives <Katex tex="\tfrac{\pi}{2}\times2=\pi" /> ✓, and differentiating returns <Katex tex="\pi e^{2x}" />, which equals <Katex tex="\tfrac{2ye^{2x}}{1+e^{2x}}" /> when <Katex tex="y" /> is substituted ✓.</>,
  },
]

export default function SpecialistQ1_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (4 marks)</p>
        <p>
          Solve the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx} = \dfrac{2ye^{2x}}{1+e^{2x}}" /> given that{' '}
          <Katex tex="y(0)=\pi" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A differential equation is <b>separable</b> when you can get all the{' '}
            <Katex tex="y" />'s (with <Katex tex="dy" />) on one side and all the{' '}
            <Katex tex="x" />'s (with <Katex tex="dx" />) on the other. Then integrating both
            sides turns the differential equation into an ordinary equation relating{' '}
            <Katex tex="y" /> and <Katex tex="x" />.
          </p>
          <p>
            The second thing to spot is the standard form{' '}
            <Katex tex="\displaystyle\int\frac{f'(x)}{f(x)}\,dx = \log_e|f(x)|+c" />. Whenever the
            top of a fraction is the derivative of the bottom, the integral is a log — recognising
            this saves doing a substitution.
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
