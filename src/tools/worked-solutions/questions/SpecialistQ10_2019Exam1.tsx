// 2019 Specialist Mathematics — Exam 1, Question 10 (5 marks).
// Implicit differentiation of sin(x²) + cos(y²) = (3√2/π)xy, evaluated at (√π/√6, √π/√3) and
// presented in the required surd form. Question text transcribed from the original paper (no
// diagram given). Cross-checked against the VCAA examination report and itute's independent
// solutions, and verified by computer algebra — all give (π − 2√3)/(√2(π + √3)), i.e. a = 2,
// b = 3. Solution is original.
// Interactive: interactives/spec-2019e1-q10-tangent — slide P along the curve; the two sides of the
// relation stay equal (why we may differentiate both sides) and the green tangent has the implicit
// slope, ≈ −0.047 at the exam's point; a toggle drops the dy/dx from cos(y²) and its line cuts
// through the curve. Wrong methods (computed with sympy): dropping that dy/dx gives ≈ −1.95;
// rationalising the denominator gives (√2π − 2√6)/(2(π + √3)), right value but not the required form.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TangentWidget = lazyWidget(() => import('../interactives/spec-2019e1-q10-tangent'))

const EXAMINER: SAExaminerStats = {
  marks: [12, 4, 8, 21, 36, 18],
  average: 3.2,
  comment: (
    <>
      Most students were able to differentiate implicitly correctly. It made little difference
      if students substituted the values of <Katex tex="x" /> and <Katex tex="y" /> into their
      equation before or after obtaining an expression for <Katex tex="\dfrac{dy}{dx}" />. Although
      various arithmetic and algebraic errors were seen, many students knew the exact values for{' '}
      <Katex tex="\cos\left(\dfrac{\pi}{6}\right)" /> and <Katex tex="\sin\left(\dfrac{\pi}{3}\right)" />.
      Some students were unable to express the answer in the required form.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{d}{dx}\Bigl[\sin\left(x^2\right)+\cos\left(y^2\right)\Bigr] = \dfrac{d}{dx}\left[\dfrac{3\sqrt2}{\pi}xy\right]" />,
    reason: (
      <>
        <Katex tex="y" /> can't be made the subject, so differentiate both sides with respect
        to <Katex tex="x" />. The two sides stay equal all along the curve, so they change at the same
        rate.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\sin\left(x^2\right) = 2x\cos\left(x^2\right)" />,
    reason: (
      <>
        Chain rule: <Katex tex="\sin(u)" /> gives <Katex tex="\cos(u)" />, times the derivative of{' '}
        <Katex tex="u=x^2" />, which is <Katex tex="2x" />. No <Katex tex="y" /> here, so no{' '}
        <Katex tex="\tfrac{dy}{dx}" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{d}{dx}\cos\left(y^2\right) = -\sin\left(y^2\right)\times 2y\dfrac{dy}{dx}" />
        <Katex display tex="= -2y\sin\left(y^2\right)\dfrac{dy}{dx}" />
      </>
    ),
    reason: (
      <>
        Chain rule with <Katex tex="u=y^2" />, and <Katex tex="y" /> itself depends on{' '}
        <Katex tex="x" />, so <Katex tex="\tfrac{d}{dx}\left(y^2\right)=2y\tfrac{dy}{dx}" />, not
        just <Katex tex="2y" />.
      </>
    ),
    more: (
      <>
        A reliable habit: differentiate a <Katex tex="y" />-term as if <Katex tex="y" /> were{' '}
        <Katex tex="x" />, then multiply by <Katex tex="\tfrac{dy}{dx}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\left[\dfrac{3\sqrt2}{\pi}xy\right] = \dfrac{3\sqrt2}{\pi}\left(y+x\dfrac{dy}{dx}\right)" />,
    reason: (
      <>
        Product rule, since both <Katex tex="x" /> and <Katex tex="y" /> change:{' '}
        <Katex tex="(x)'y+x(y)' = y+x\tfrac{dy}{dx}" />. The constant{' '}
        <Katex tex="\tfrac{3\sqrt2}{\pi}" /> stays in front.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="2x\cos\left(x^2\right)-2y\sin\left(y^2\right)\dfrac{dy}{dx}" />
        <Katex display tex="= \dfrac{3\sqrt2}{\pi}\left(y+x\dfrac{dy}{dx}\right)" />
      </>
    ),
    reason: (
      <>
        The three derivatives assembled; the rest is algebra. Check first that each{' '}
        <Katex tex="y" />-term of the relation, <Katex tex="\cos\left(y^2\right)" /> and{' '}
        <Katex tex="xy" />, produced a <Katex tex="\tfrac{dy}{dx}" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x = \dfrac{\sqrt\pi}{\sqrt6} \implies x^2 = \dfrac{\pi}{6}" />
        <Katex display tex="y = \dfrac{\sqrt\pi}{\sqrt3} \implies y^2 = \dfrac{\pi}{3}" />
      </>
    ),
    reason: (
      <>
        Substitute the point now, while each term is a simple product. Inside the trig functions
        the coordinates appear squared, giving the standard angles <Katex tex="\tfrac{\pi}{6}" /> and{' '}
        <Katex tex="\tfrac{\pi}{3}" />.
      </>
    ),
    more: (
      <>
        The report says it made little difference whether students substituted before or after
        finding <Katex tex="\tfrac{dy}{dx}" />; before is simply less writing. Its general comments
        list algebra in this question as an area of weakness, and keeping the expressions small is
        the best protection.
      </>
    ),
  },
  {
    working: <Katex display tex="\cos\!\left(\dfrac{\pi}{6}\right) = \dfrac{\sqrt3}{2}, \qquad \sin\!\left(\dfrac{\pi}{3}\right) = \dfrac{\sqrt3}{2}" />,
    reason: (
      <>
        Exact values from the unit circle.
      </>
    ),
    more: (
      <>
        A quick check that the point really is on the curve:{' '}
        <Katex tex="\sin\left(\tfrac{\pi}{6}\right)+\cos\left(\tfrac{\pi}{3}\right)=\tfrac12+\tfrac12=1" />{' '}
        and <Katex tex="\tfrac{3\sqrt2}{\pi}\cdot\sqrt{\tfrac{\pi}{6}}\cdot\sqrt{\tfrac{\pi}{3}}=\tfrac{3\sqrt2}{\pi}\cdot\tfrac{\pi}{3\sqrt2}=1" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="2\sqrt{\dfrac{\pi}{6}}\cdot\dfrac{\sqrt3}{2} - 2\sqrt{\dfrac{\pi}{3}}\cdot\dfrac{\sqrt3}{2}\dfrac{dy}{dx}" />
        <Katex display tex="= \dfrac{3\sqrt2}{\pi}\left(\sqrt{\dfrac{\pi}{3}}+\sqrt{\dfrac{\pi}{6}}\dfrac{dy}{dx}\right)" />
        <Katex display tex="\sqrt{\dfrac{\pi}{2}} - \sqrt{\pi}\,\dfrac{dy}{dx} = \sqrt{\dfrac{6}{\pi}}+\sqrt{\dfrac{3}{\pi}}\,\dfrac{dy}{dx}" />
      </>
    ),
    reason: (
      <>
        Substitute, then simplify each coefficient on its own:{' '}
        <Katex tex="\sqrt3\sqrt{\tfrac{\pi}{6}}=\sqrt{\tfrac{3\pi}{6}}=\sqrt{\tfrac{\pi}{2}}" /> and{' '}
        <Katex tex="\sqrt3\sqrt{\tfrac{\pi}{3}}=\sqrt{\pi}" />; on the right,{' '}
        <Katex tex="\tfrac{3\sqrt2}{\pi}\sqrt{\tfrac{\pi}{3}}=\sqrt{\tfrac{6}{\pi}}" /> and{' '}
        <Katex tex="\tfrac{3\sqrt2}{\pi}\sqrt{\tfrac{\pi}{6}}=\sqrt{\tfrac{3}{\pi}}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{\pi}{\sqrt2} - \pi\dfrac{dy}{dx} = \sqrt6 + \sqrt3\,\dfrac{dy}{dx}" />,
    reason: (
      <>
        Multiply every term by <Katex tex="\sqrt\pi" />: the target form has plain{' '}
        <Katex tex="\pi" />'s, and every term here has one <Katex tex="\sqrt\pi" /> on top or
        underneath, so this clears them all.
      </>
    ),
    more: (
      <>
        Term by term:{' '}
        <Katex tex="\sqrt\pi\sqrt{\tfrac{\pi}{2}}=\tfrac{\pi}{\sqrt2}" />,{' '}
        <Katex tex="\sqrt\pi\sqrt\pi=\pi" />, <Katex tex="\sqrt\pi\sqrt{\tfrac{6}{\pi}}=\sqrt6" /> and{' '}
        <Katex tex="\sqrt\pi\sqrt{\tfrac{3}{\pi}}=\sqrt3" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{\pi}{\sqrt2}-\sqrt6 = \left(\pi+\sqrt3\right)\dfrac{dy}{dx}" />
        <Katex display tex="\dfrac{dy}{dx} = \dfrac{\dfrac{\pi}{\sqrt2}-\sqrt6}{\pi+\sqrt3}" />
      </>
    ),
    reason: (
      <>
        Collect the <Katex tex="\tfrac{dy}{dx}" /> terms on the right (where both are positive) and
        everything else on the left, then factor out <Katex tex="\tfrac{dy}{dx}" /> and divide by{' '}
        <Katex tex="\pi+\sqrt3" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="= \dfrac{\dfrac{\pi-\sqrt2\sqrt6}{\sqrt2}}{\pi+\sqrt3}" />
        <Katex display tex="= \dfrac{\pi-\sqrt{12}}{\sqrt2\left(\pi+\sqrt3\right)}" />
      </>
    ),
    reason: (
      <>
        The target has <Katex tex="\sqrt a" /> downstairs and a plain <Katex tex="\pi" /> on top, so
        put the numerator over <Katex tex="\sqrt2" />:{' '}
        <Katex tex="\sqrt6=\tfrac{\sqrt2\sqrt6}{\sqrt2}=\tfrac{\sqrt{12}}{\sqrt2}" />. Don't
        rationalise: the form keeps the surd downstairs.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\dfrac{dy}{dx} = \dfrac{\pi-2\sqrt3}{\sqrt2\left(\pi+\sqrt3\right)}}" />,
    reason: (
      <>
        <Katex tex="\sqrt{12}=2\sqrt3" /> gives the required form with <Katex tex="a=2" /> and{' '}
        <Katex tex="b=3" />. Both places <Katex tex="a" /> appears agree: <Katex tex="2\sqrt3" /> on
        top and <Katex tex="\sqrt2" /> downstairs.
      </>
    ),
    more: (
      <>
        Sign check: <Katex tex="\pi\approx3.14<2\sqrt3\approx3.46" />, so{' '}
        <Katex tex="\tfrac{dy}{dx}\approx-0.047" />. The curve is almost flat and falling slightly
        at this point.
      </>
    ),
  },
]

export default function SpecialistQ10_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (5 marks)</p>
        <p className="mb-2">
          Find <Katex tex="\dfrac{dy}{dx}" /> at the point{' '}
          <Katex tex="\left(\dfrac{\sqrt\pi}{\sqrt6},\ \dfrac{\sqrt\pi}{\sqrt3}\right)" /> for the
          curve defined by the relation{' '}
          <Katex tex="\sin\left(x^2\right)+\cos\left(y^2\right) = \dfrac{3\sqrt2}{\pi}xy" />.
        </p>
        <p>
          Give your answer in the form{' '}
          <Katex tex="\dfrac{\pi-a\sqrt b}{\sqrt a\left(\pi+\sqrt b\right)}" />, where{' '}
          <Katex tex="a,b\in Z^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Here <Katex tex="y" /> is trapped inside <Katex tex="\cos\left(y^2\right)" /> and in{' '}
            <Katex tex="xy" />, so the relation can't be rearranged into <Katex tex="y=\ldots" />. That
            is the signal for <b>implicit differentiation</b>: the relation holds at every point of the
            curve, so the derivatives of the two sides with respect to <Katex tex="x" /> are equal.
          </p>
          <p>
            Treat <Katex tex="y" /> as a function of <Katex tex="x" />. Every time you differentiate
            something containing <Katex tex="y" />, the chain rule leaves behind a factor of{' '}
            <Katex tex="\tfrac{dy}{dx}" />, and a product such as <Katex tex="xy" /> needs the product
            rule because both factors change. The value of <Katex tex="\tfrac{dy}{dx}" /> at a point
            is the gradient of the tangent to the curve there.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="dy/dx is the slope of the curve at P, because both sides stay equal as P slides">
          <TangentWidget />
        </Explore>
        <WrongMethod
          title="Differentiate cos(y²) as −2y sin(y²), treating y like a constant"
          working={
            <>
              <Katex display tex="2x\cos\left(x^2\right)-2y\sin\left(y^2\right)" />
              <Katex display tex="= \dfrac{3\sqrt2}{\pi}\left(y+x\dfrac{dy}{dx}\right)" />
              <Katex display tex="\dfrac{\pi}{\sqrt2}-\pi =\sqrt6+\sqrt3\,\dfrac{dy}{dx}" />
              <Katex display tex="\dfrac{dy}{dx} = \dfrac{\frac{\pi}{\sqrt2}-\pi-\sqrt6}{\sqrt3}\approx-1.95" />
            </>
          }
        >
          <Katex tex="\cos\left(y^2\right)" /> only changes because <Katex tex="y" /> changes as you
          move along the curve, so its rate of change with respect to <Katex tex="x" /> must carry the
          factor <Katex tex="\tfrac{dy}{dx}" />. Without it the gradient comes out near{' '}
          <Katex tex="-1.95" />: a steep line that cuts straight through a curve which is almost flat at
          this point (turn on the toggle in the widget above). The check after assembling the
          derivatives, that both <Katex tex="\cos\left(y^2\right)" /> and <Katex tex="xy" /> produced
          a <Katex tex="\tfrac{dy}{dx}" />, catches it.
        </WrongMethod>
        <WrongMethod
          title="Rationalise the denominator to finish, like always"
          working={
            <>
              <Katex display tex="\dfrac{\pi-2\sqrt3}{\sqrt2\left(\pi+\sqrt3\right)}\times\dfrac{\sqrt2}{\sqrt2}" />
              <Katex display tex="= \dfrac{\sqrt2\,\pi-2\sqrt6}{2\left(\pi+\sqrt3\right)}" />
            </>
          }
        >
          The value is right, but the question asked for a particular form, and the report notes that
          some students were unable to express the answer in the required form. After rationalising,
          the numerator starts with <Katex tex="\sqrt2\,\pi" /> instead of a plain <Katex tex="\pi" />,
          and the denominator has <Katex tex="2" /> where the form has <Katex tex="\sqrt a" />, so{' '}
          <Katex tex="a" /> and <Katex tex="b" /> can't be read off. Clear the{' '}
          <Katex tex="\sqrt\pi" />'s instead, and stop as soon as the shape matches.
        </WrongMethod>
        <SAExaminerReport stats={EXAMINER} maxMarks={5} />
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
