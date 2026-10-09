// 2019 Specialist Mathematics — Exam 1, Question 1 (4 marks).
// Solve the separable differential equation dy/dx = 2ye^(2x)/(1+e^(2x)) with y(0) = π.
// Question text transcribed from the original paper (no diagram given). Cross-checked against
// the VCAA examination report and itute's independent solutions, and independently re-derived
// by computer algebra — all three agree on y = (π/2)(1+e^(2x)). Solution is original.
// Interactives: spec-2019e1-q1-family (slope field with a draggable start: every solution is
// 1+e^(2x) stretched by A, and a shifted "+c" curve cuts across the marks) and spec-2019e1-q1-check
// (test our answer and the report's two wrong answers: pass through (0, π) and match the DE's slope).
// Wrong methods (all four from the examiner's report) were re-derived with sympy: ∫2y dy gives
// y² = ½log_e(1+e^(2x)) + π² − ½log_e 2, which passes through (0, π) but has slope 1/(4π) there,
// not π; the index-law slip e^(2x)+1+π/2 gives y(0) = 2 + π/2.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FamilyWidget = lazyWidget(() => import('../interactives/spec-2019e1-q1-family'))
const CheckWidget = lazyWidget(() => import('../interactives/spec-2019e1-q1-check'))

const EXAMINER: SAExaminerStats = {
  marks: [21, 9, 15, 13, 42],
  average: 2.5,
  comment: (
    <>
      Most students recognised that they needed to separate and integrate in order to solve the
      differential equation although not all were then able to obtain the correct equation.
      Common errors were{' '}
      <Katex tex="\displaystyle\int2y\,dy=\int\frac{e^{2x}}{1+e^{2x}}\,dx" /> and{' '}
      <Katex tex="\displaystyle\int2ye^{2x}\,dx=\int\frac{1}{1+e^{2x}}\,dx" />. Students who
      failed to recognise that <Katex tex="\dfrac{d}{dx}\left(1+e^{2x}\right)=2e^{2x}" /> did not
      score highly. Some students spent time using a substitution to determine{' '}
      <Katex tex="\displaystyle\int\frac{2e^{2x}}{1+e^{2x}}\,dx" />, which was not necessary. Some
      students who managed to correctly find the value of the constant of integration did not
      use log or index laws correctly, presenting incorrect solutions such as{' '}
      <Katex tex="y=e^{2x}+1+\dfrac{\pi}{2}" />.
      <br />
      An alternative approach was to solve{' '}
      <Katex tex="\displaystyle\int_{\pi}^{y}\frac1t\,dt=\int_0^x\frac{2e^{2t}}{1+e^{2t}}\,dt" />. Note
      that a different variable of integration must be used. Students using this method
      typically retained <Katex tex="x" /> and <Katex tex="y" /> as the variables of integration and
      thus did not obtain full marks.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dy}{dx} = \dfrac{2ye^{2x}}{1+e^{2x}}" />,
    reason: (
      <>
        How would I know to separate? The right-hand side is a function of <Katex tex="y" /> times a function
        of <Katex tex="x" />: <Katex tex="2y\times\tfrac{e^{2x}}{1+e^{2x}}" />. A product like that is the signal
        that the variables can be pulled apart.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{1}{y}\,\dfrac{dy}{dx} = \dfrac{2e^{2x}}{1+e^{2x}}" />,
    reason: (
      <>
        Divide both sides by <Katex tex="y" /> to get every <Katex tex="y" /> on the left. <Katex tex="y" /> is
        multiplying on the right, so it crosses over <em>dividing</em>; moving it across as a multiplier is how
        the report&apos;s common error <Katex tex="\int2y\,dy" /> arises. Leave the <Katex tex="2" /> with{' '}
        <Katex tex="e^{2x}" />: the next rows show why. (Dividing by <Katex tex="y" /> sets aside{' '}
        <Katex tex="y=0" />, a constant solution; ours starts at <Katex tex="\pi" />, so that&apos;s fine.)
      </>
    ),
  },
  {
    working: <Katex display tex="\int\dfrac{1}{y}\,dy = \int\dfrac{2e^{2x}}{1+e^{2x}}\,dx" />,
    reason: (
      <>
        Integrate both sides with respect to <Katex tex="x" />. By the chain rule,{' '}
        <Katex tex="\int\tfrac1y\tfrac{dy}{dx}\,dx" /> is just <Katex tex="\int\tfrac1y\,dy" />, so each side now
        involves only one variable and can be integrated on its own.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\left(1+e^{2x}\right) = 2e^{2x}" />,
    reason: (
      <>
        The key observation: the numerator on the right is <em>exactly</em> the derivative of the denominator,
        so the integrand is <Katex tex="\tfrac{f'(x)}{f(x)}" /> and integrates straight to a logarithm. How would
        I know to check? Whenever the bottom of a fraction is a function whose derivative looks like the top,
        differentiate the bottom and compare. No substitution is needed; the report notes some students spent
        time using a substitution, which was not necessary.
      </>
    ),
  },
  {
    working: <Katex display tex="\log_e|y| = \log_e\left(1+e^{2x}\right)+c" />,
    reason: (
      <>
        Both sides are now standard. <Katex tex="1+e^{2x}>0" /> always, so no absolute value is needed on the
        right. One constant <Katex tex="c" /> is enough: the constants from the two sides combine into one.
      </>
    ),
  },
  {
    working: <Katex display tex="\log_e\left(\dfrac{|y|}{1+e^{2x}}\right) = c \implies \dfrac{y}{1+e^{2x}} = \pm e^{c} = A" />,
    reason: (
      <>
        To undo the logs, collect them on one side (<Katex tex="\log_e a-\log_e b=\log_e\tfrac ab" />) and
        exponentiate. The <Katex tex="c" /> was <em>added</em> inside the log, so it comes out as a{' '}
        <em>factor</em> <Katex tex="e^{c}" />, because <Katex tex="e^{a+b}=e^a\times e^b" />. Writing the constant
        as <Katex tex="A=\pm e^c" /> absorbs the sign from the absolute value.
      </>
    ),
  },
  {
    working: <Katex display tex="y = A\left(1+e^{2x}\right)" />,
    reason: (
      <>
        Every solution is <Katex tex="1+e^{2x}" /> stretched vertically by some factor <Katex tex="A" />. The DE
        itself says this should happen: <Katex tex="\tfrac{dy}{dx}" /> is proportional to <Katex tex="y" />, so
        doubling a solution doubles its slope everywhere and it is still a solution. Adding a constant would
        not do that.
      </>
    ),
    more: <>See the first interactive below.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}y(0)=\pi:\quad \pi &= A\left(1+e^{0}\right) = 2A \\ A &= \dfrac{\pi}{2}\end{aligned}" />,
    reason: (
      <>
        The general solution is a whole family of curves; the initial condition picks out the one through{' '}
        <Katex tex="(0,\pi)" />. Substitute <Katex tex="x=0" /> and <Katex tex="y=\pi" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{y = \dfrac{\pi}{2}\left(1+e^{2x}\right)}" />,
    reason: (
      <>
        Quick check: at <Katex tex="x=0" /> this gives <Katex tex="\tfrac{\pi}{2}\times2=\pi" /> ✓, and
        differentiating returns <Katex tex="\pi e^{2x}" />, which equals{' '}
        <Katex tex="\tfrac{2ye^{2x}}{1+e^{2x}}" /> when <Katex tex="y" /> is substituted ✓.
      </>
    ),
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
            <Katex tex="y" /> and <Katex tex="x" />. &ldquo;Moving the <Katex tex="dx" /> across&rdquo; is
            shorthand for the chain rule:{' '}
            <Katex tex="\int g(y)\tfrac{dy}{dx}\,dx=\int g(y)\,dy" />.
          </p>
          <p>
            The second thing to spot is the standard form{' '}
            <Katex tex="\displaystyle\int\frac{f'(x)}{f(x)}\,dx = \log_e|f(x)|+c" />. Whenever the
            top of a fraction is the derivative of the bottom, the integral is a log — recognising
            this saves doing a substitution.
          </p>
          <p>
            A solution of a differential equation is a curve whose slope at every point equals what the
            equation demands there. A <b>slope field</b> draws that demanded slope as a short mark at many
            points, and every solution curve runs along the marks. So any answer can be checked two ways: it must
            pass through the initial point, and its derivative must satisfy the equation.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Why the constant multiplies: every solution is 1 + e²ˣ stretched vertically">
          <FamilyWidget />
        </Explore>
        <WrongMethod
          title="Move the 2y across by multiplying: ∫2y dy = ∫e²ˣ/(1 + e²ˣ) dx"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\int2y\,dy=\int\frac{e^{2x}}{1+e^{2x}}\,dx" />
              <Katex display tex="y^2=\tfrac12\log_e\left(1+e^{2x}\right)+\pi^2-\tfrac12\log_e2" />
            </>
          }
        >
          <Katex tex="2y" /> is <em>multiplying</em> the right-hand side, so it has to cross over dividing:{' '}
          <Katex tex="\tfrac{1}{2y}\,dy" /> (or divide by <Katex tex="y" /> only and keep the <Katex tex="2" /> on the
          right, as in the working). This wrong curve still passes through <Katex tex="(0,\pi)" />, so substituting
          the initial condition won&apos;t catch it. Differentiate instead:{' '}
          <Katex tex="2y\tfrac{dy}{dx}=\tfrac{e^{2x}}{1+e^{2x}}" /> puts <Katex tex="y" /> in the denominator, and at{' '}
          <Katex tex="x=0" /> the slope is <Katex tex="\tfrac{1}{4\pi}" /> instead of <Katex tex="\pi" />.
        </WrongMethod>
        <WrongMethod
          title="Integrate with y still on the x side: ∫2ye²ˣ dx = ∫1/(1 + e²ˣ) dx"
          source="Examiner's report"
          working={<Katex display tex="\int2ye^{2x}\,dx=\int\frac{1}{1+e^{2x}}\,dx" />}
        >
          Both sides are integrals with respect to <Katex tex="x" />, and <Katex tex="y" /> is still inside one of
          them. <Katex tex="y" /> depends on <Katex tex="x" />, so it can&apos;t be treated as a constant, and{' '}
          <Katex tex="\int2ye^{2x}\,dx" /> can&apos;t be evaluated: nothing has been separated. Before integrating,
          check that one side has only <Katex tex="y" /> and <Katex tex="dy" /> and the other only{' '}
          <Katex tex="x" /> and <Katex tex="dx" />.
        </WrongMethod>
        <WrongMethod
          title="Exponentiate term by term: y = e²ˣ + 1 + π/2"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\log_e y=\log_e\left(1+e^{2x}\right)+\log_e\tfrac{\pi}{2}" />
              <Katex display tex="y=e^{2x}+1+\tfrac{\pi}{2}\quad\times" />
            </>
          }
        >
          The constant <Katex tex="c=\log_e\tfrac{\pi}{2}" /> is right, but <Katex tex="e^{a+b}=e^a\times e^b" />,
          not <Katex tex="e^a+e^b" />. Combine the logs first:{' '}
          <Katex tex="\log_e\left(1+e^{2x}\right)+\log_e\tfrac{\pi}{2}=\log_e\left(\tfrac{\pi}{2}\left(1+e^{2x}\right)\right)" />.
          Catch it by substituting <Katex tex="x=0" />: <Katex tex="1+1+\tfrac{\pi}{2}=2+\tfrac{\pi}{2}\neq\pi" />.
        </WrongMethod>
        <WrongMethod
          title="Use definite integrals but keep y and x as the variables of integration"
          source="Examiner's report"
          working={<Katex display tex="\int_{\pi}^{y}\frac1y\,dy=\int_0^x\frac{2e^{2x}}{1+e^{2x}}\,dx\quad\times" />}
        >
          The method is fine (the report gives it as an alternative), but a letter can&apos;t be both a limit and the
          variable of integration. Use a dummy variable:{' '}
          <Katex tex="\int_{\pi}^{y}\tfrac1t\,dt=\int_0^x\tfrac{2e^{2t}}{1+e^{2t}}\,dt" />. This gives{' '}
          <Katex tex="\log_e y-\log_e\pi=\log_e\left(1+e^{2x}\right)-\log_e2" />, the same answer. The report says
          students who kept <Katex tex="x" /> and <Katex tex="y" /> did not obtain full marks.
        </WrongMethod>
        <Explore title="How to catch a wrong answer: check y(0), then check the slope everywhere">
          <CheckWidget />
        </Explore>
        <SAExaminerReport stats={EXAMINER} maxMarks={4} />
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
