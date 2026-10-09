// 2022 Specialist Mathematics — Exam 1 Question 2 (3 marks). A separable differential
// equation whose y-side is a standard arcsin form. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original. Reviewed Oct 2026 for clarity/completeness/accuracy/relevance
// (no widget: 60% full marks). Oct 2026 Concise/Detailed pass: reasons trimmed to what a
// student needs to follow each line; the extra checks and the report-slip note moved to `more`.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [12, 19, 9, 60],
  average: 2.2,
  comment: (
    <>
      A small number of students correctly separated and integrated to find an answer in
      terms of inverse cosine leading to the result{' '}
      <Katex tex="y=2\cos\left(\tfrac12x^2+\tfrac\pi2-2\right)" />.
      <br />
      This question was answered well with most students recognising and attempting to solve
      the separable differential equation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = -x\sqrt{4-y^2} \implies \frac{1}{\sqrt{4-y^2}}\,dy = -x\,dx" />,
    reason: <>The right side is (a function of <Katex tex="x" />) × (a function of <Katex tex="y" />), so the equation is separable. Divide both sides by <Katex tex="\sqrt{4-y^2}" /> (and multiply by <Katex tex="dx" />) so that every <Katex tex="y" /> is with <Katex tex="dy" /> and every <Katex tex="x" /> is with <Katex tex="dx" />.</>,
  },
  {
    working: <Katex display tex="\int\frac{1}{\sqrt{4-y^2}}\,dy = \int -x\,dx" />,
    reason: <>Integrate both sides. A single <Katex tex="+c" /> on the right is enough.</>,
    more: <>Each side would give its own constant, but two unknown constants combine into a single unknown constant, so writing one is not a shortcut — it is the same thing.</>,
  },
  {
    working: <Katex display tex="\arcsin\!\left(\frac{y}{2}\right) = -\frac{x^2}{2}+c" />,
    reason: <>Formula sheet: <Katex tex="\int\tfrac{1}{\sqrt{a^2-y^2}}dy=\arcsin\!\left(\tfrac ya\right)" />, here with <Katex tex="a=2" />.</>,
    more: <>There is no <Katex tex="\tfrac12" /> out the front: the integrand's numerator is 1, exactly as in the formula. Check by differentiating: the chain rule gives <Katex tex="\dfrac{d}{dy}\arcsin\!\left(\tfrac y2\right)=\dfrac{1}{\sqrt{1-\frac{y^2}{4}}}\cdot\dfrac12=\dfrac{1}{\sqrt{4-y^2}}" />, exactly the integrand.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y(2)=0: \quad \arcsin(0) &= -\frac{4}{2}+c \\ 0 &= -2+c \\ c &= 2 \end{aligned}" />,
    reason: <>Substitute <Katex tex="x=2" />, <Katex tex="y=0" /> to find <Katex tex="c" />. Doing it now, before rearranging for <Katex tex="y" />, keeps the algebra short.</>,
  },
  {
    working: <Katex display tex="\arcsin\!\left(\frac{y}{2}\right) = 2-\frac{x^2}{2} \implies \frac{y}{2} = \sin\!\left(2-\frac{x^2}{2}\right)" />,
    reason: <>Take <Katex tex="\sin" /> of both sides: <Katex tex="\sin(\arcsin u)=u" />, so this undoes the <Katex tex="\arcsin" />.</>,
    more: <>Because <Katex tex="\arcsin" /> only outputs values in <Katex tex="\left[-\tfrac\pi2,\tfrac\pi2\right]" />, the solution only holds while <Katex tex="2-\tfrac{x^2}{2}" /> stays in that interval, i.e. <Katex tex="\sqrt{4-\pi}\le x\le\sqrt{4+\pi}" /> around <Katex tex="x=2" />. The question doesn't ask for this domain, so it isn't needed for the marks.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 2\sin\!\left(2-\frac{x^2}{2}\right)}" />,
    reason: <>Multiply both sides by 2 to get the required form <Katex tex="y=f(x)" />. Check: at <Katex tex="x=2" />, <Katex tex="y=2\sin(0)=0" /> ✓.</>,
    more: <>If you compare with the examination report: its working writes the condition as "y(0) = 2", a slip — the paper's condition is <Katex tex="y(2)=0" />, which is what gives <Katex tex="c=2" />.</>,
  },
]

export default function SpecialistQ2_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Solve the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=-x\sqrt{4-y^2}" /> given that{' '}
          <Katex tex="y(2)=0" />. Give your answer in the form{' '}
          <Katex tex="y=f(x)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A <Katex tex="\tfrac{1}{\sqrt{a^2-y^2}}" /> (here <Katex tex="a=2" />) is the
            signature of an <Katex tex="\arcsin" />. Separate first and the whole question
            becomes two formula-sheet integrals.
          </p>
          <p>
            The formula sheet also gives{' '}
            <Katex tex="\int\tfrac{-1}{\sqrt{a^2-y^2}}dy=\arccos\!\left(\tfrac ya\right)" />,
            so <Katex tex="-\arccos\!\left(\tfrac y2\right)" /> is an equally correct
            antiderivative — it differs from <Katex tex="\arcsin\!\left(\tfrac y2\right)" /> only
            by the constant <Katex tex="\tfrac\pi2" />. That route ends at the report's inverse-cosine answer{' '}
            <Katex tex="y=2\cos\!\left(\tfrac12x^2+\tfrac\pi2-2\right)" />, which is the same
            function: <Katex tex="\cos\!\left(\theta+\tfrac\pi2\right)=-\sin\theta" /> with{' '}
            <Katex tex="\theta=\tfrac12x^2-2" /> turns it into{' '}
            <Katex tex="-2\sin\!\left(\tfrac12x^2-2\right)=2\sin\!\left(2-\tfrac12x^2\right)" />.
          </p>
          <p>
            Setting the problem up as definite integrals also works, and builds the condition{' '}
            <Katex tex="y(2)=0" /> into the limits:{' '}
            <Katex tex="\int_0^y\tfrac{1}{\sqrt{4-t^2}}\,dt=\int_2^x -s\,ds" />. The report's
            general comments stress using a 'dummy' variable here: the letter inside each
            integral must be something like <Katex tex="t" /> or <Katex tex="s" />, not{' '}
            <Katex tex="y" /> or <Katex tex="x" />, because <Katex tex="y" /> and{' '}
            <Katex tex="x" /> are already being used as the upper limits. Evaluating both sides
            gives <Katex tex="\arcsin\!\left(\tfrac y2\right)-\arcsin(0)=-\tfrac{x^2}{2}+2" />.
            Since <Katex tex="\arcsin(0)=0" />, this is the same equation the working reaches
            once <Katex tex="c=2" /> is found, with no <Katex tex="c" /> to solve for.
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
