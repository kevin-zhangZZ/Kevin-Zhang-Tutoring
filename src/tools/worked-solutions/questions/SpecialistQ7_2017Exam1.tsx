// 2017 Specialist Mathematics — Exam 1, Question 7 (4 marks). Arc length of the astroid
// r(t) = cos³(t)i + sin³(t)j on [0, π/4]. Question text transcribed from the original paper
// (no diagram given). Answer checked with sympy and against the VCAA examination report and
// itute (both 3/4). Solution is original. No lettered parts, so this uses the plain card layout.
// Interactives (this site's own explanatory widgets, not VCAA figures):
//   spec-2017e1-q7-chords — arc length as a sum of chords (n = 1 is the report's |r(π/4) − r(0)|
//     ≈ 0.737; the total climbs to 3/4), with a toggle adding the legs |Δx| + |Δy| instead,
//     which is 1 for every n (the "square root of individual terms" error).
//   spec-2017e1-q7-speed — the integrand is the speed (length of the velocity vector); the area
//     under the speed graph is the distance travelled; a toggle shows the no-chain-rule
//     "velocity" (3cos²t, 3sin²t), which points off the path.
// Wrong methods verified with sympy: chord = √(5/4 − √2/2) ≈ 0.737; dy/dx form with dt gives
// ∫₀^{π/4} sec t dt = logₑ(1 + √2) ≈ 0.881; square-rooting each term gives exactly 1.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ChordsWidget = lazyWidget(() => import('../interactives/spec-2017e1-q7-chords'))
const SpeedWidget = lazyWidget(() => import('../interactives/spec-2017e1-q7-speed'))

const EXAM: SAExaminerStats = {
  marks: [27, 16, 18, 9, 30],
  average: 2.0,
  comment: (
    <>
      Students had varied success with this question. A number of students were unable to
      find the necessary derivatives, neglecting to use the chain rule. Of those who did use
      the chain rule, the question was reasonably well answered, although there were many who
      did not recognise the appropriate form of the arc length formula. Some incorrect answers
      involved:
      <ul className="list-disc pl-5 my-1">
        <li>
          finding{' '}
          <Katex tex="\left|\underset{\sim}{r}\!\left(\tfrac{\pi}{4}\right)-\underset{\sim}{r}(0)\right|" />
        </li>
        <li>
          using the formula with <Katex tex="dy/dx" /> (sometimes with correct working, except
          for using <Katex tex="dt" /> rather than <Katex tex="dx" />)
        </li>
        <li>errors in derivatives</li>
        <li>an inability to correctly simplify the expression under the square root</li>
        <li>taking the square root of individual terms</li>
        <li>
          correct simplification but an error at the end with terminals or substitution and
          missing <Katex tex="dt" /> in lines of working.
        </li>
      </ul>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_0^{\pi/4}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: (
      <>
        &ldquo;Length of the path&rdquo; is arc length. Both forms are on the formula sheet; the curve is given in
        terms of <Katex tex="t" />, so use the <em>parametric</em> form, with the terminals{' '}
        <Katex tex="t=0" /> and <Katex tex="t=\tfrac{\pi}{4}" /> read straight from the question. The integrand is
        the particle&apos;s speed (see Before You Start). The form with <Katex tex="\tfrac{dy}{dx}" /> integrates
        with respect to <Katex tex="x" />, so it doesn&apos;t fit a curve given in <Katex tex="t" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\frac{dx}{dt} = 3\cos^2(t)\times\bigl(-\sin(t)\bigr)" />
        <Katex display tex="= -3\cos^2(t)\sin(t)" />
        <Katex display tex="\frac{dy}{dt} = 3\sin^2(t)\cos(t)" />
      </>
    ),
    reason: (
      <>
        <Katex tex="\cos^3(t)" /> means <Katex tex="\bigl(\cos(t)\bigr)^3" />, a function of a function, so it needs
        the chain rule: bring down the 3, reduce the power, then multiply by the derivative of the inside,{' '}
        <Katex tex="\cos(t)\to-\sin(t)" />. Leaving out that last factor was the first error the report names. Sense
        check: <Katex tex="\cos(t)" /> decreases on <Katex tex="\left[0,\tfrac{\pi}{4}\right]" />, so{' '}
        <Katex tex="x" /> decreases and <Katex tex="\tfrac{dx}{dt}" /> must be negative. It is.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2" />
        <Katex display tex="= 9\cos^4(t)\sin^2(t) + 9\sin^4(t)\cos^2(t)" />
      </>
    ),
    reason: (
      <>
        Square each derivative; the minus sign disappears. Don&apos;t take the square root yet:{' '}
        <Katex tex="\sqrt{a^2+b^2}" /> is <em>not</em> <Katex tex="a+b" />, so the sum has to become a single
        product first.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="= 9\sin^2(t)\cos^2(t)\bigl(\cos^2(t)+\sin^2(t)\bigr)" />
        <Katex display tex="= 9\sin^2(t)\cos^2(t)" />
      </>
    ),
    reason: (
      <>
        Both terms contain <Katex tex="9\sin^2(t)\cos^2(t)" />. Taking it out leaves{' '}
        <Katex tex="\cos^2(t)+\sin^2(t)=1" />. With powers of <Katex tex="\cos" /> and <Katex tex="\sin" /> under
        the root, look for exactly this: the Pythagorean identity is what makes the square root come out. The
        report lists &ldquo;an inability to correctly simplify the expression under the square root&rdquo;.
      </>
    ),
  },
  {
    working: <Katex display tex="\sqrt{9\sin^2(t)\cos^2(t)} = 3\sin(t)\cos(t)" />,
    reason: (
      <>
        Strictly, <Katex tex="\sqrt{A^2}=|A|" />. On <Katex tex="\left[0,\tfrac{\pi}{4}\right]" /> both{' '}
        <Katex tex="\sin(t)" /> and <Katex tex="\cos(t)" /> are non-negative, so no absolute value is needed. That
        fits: this is the speed, which can&apos;t be negative.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="L = \int_0^{\pi/4} 3\sin(t)\cos(t)\,dt" />
        <Katex display tex="= \int_0^{\pi/4}\frac32\sin(2t)\,dt" />
      </>
    ),
    reason: (
      <>
        <Katex tex="\sin(2t)=2\sin(t)\cos(t)" />, so <Katex tex="\sin(t)\cos(t)=\tfrac12\sin(2t)" />, a standard
        integral. Keep the <Katex tex="dt" /> on every line: the report mentions it going missing. (Substituting{' '}
        <Katex tex="u=\sin(t)" /> works too: <Katex tex="\int_0^{\sqrt2/2}3u\,du=\tfrac34" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="= \left[-\frac34\cos(2t)\right]_0^{\pi/4}" />,
    reason: (
      <>
        <Katex tex="\int\sin(kt)\,dt=-\tfrac1k\cos(kt)" />, so the coefficient is{' '}
        <Katex tex="\tfrac32\times\left(-\tfrac12\right)=-\tfrac34" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="= -\frac34\cos\!\left(\frac{\pi}{2}\right)-\left(-\frac34\cos(0)\right)" />
        <Katex display tex="= 0+\frac34" />
      </>
    ),
    reason: (
      <>
        Upper terminal minus lower: <Katex tex="\cos\!\left(\tfrac{\pi}{2}\right)=0" /> and{' '}
        <Katex tex="\cos(0)=1" />. Keep the brackets so the double negative isn&apos;t lost; the report mentions
        errors with terminals or substitution at this last step.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{L = \frac34}" />,
    reason: (
      <>
        Sense check: the particle runs from <Katex tex="(1,0)" /> to{' '}
        <Katex tex="\left(\tfrac{\sqrt2}{4},\tfrac{\sqrt2}{4}\right)\approx(0.354,0.354)" />, a straight-line
        distance of about <Katex tex="0.737" /> (the report notes students who gave this chord length instead). A
        curved path is always longer than the straight line between its ends, so <Katex tex="0.75" /> is believable.
      </>
    ),
  },
]

export default function SpecialistQ7_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 7 (4 marks)" always>
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
      <Background title="Before You Start">
        <p>
          <b>Arc length adds up tiny hypotenuses.</b> In a short time <Katex tex="\Delta t" /> the particle moves{' '}
          <Katex tex="\Delta x" /> across and <Katex tex="\Delta y" /> up, so it covers a piece of path of length about{' '}
          <Katex tex="\sqrt{\Delta x^2+\Delta y^2}" /> (Pythagoras). Written as{' '}
          <Katex tex="\sqrt{\left(\tfrac{\Delta x}{\Delta t}\right)^2+\left(\tfrac{\Delta y}{\Delta t}\right)^2}\,\Delta t" />{' '}
          and added up as <Katex tex="\Delta t\to0" />, this becomes
        </p>
        <Katex display tex="L=\int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt." />
        <p>
          <b>The integrand is the speed.</b> <Katex tex="\left(\tfrac{dx}{dt},\tfrac{dy}{dt}\right)" /> is the
          velocity <Katex tex="\dot{\underset{\sim}{r}}(t)" />, and the square root is its length{' '}
          <Katex tex="\bigl|\dot{\underset{\sim}{r}}(t)\bigr|" />, so the formula says distance{' '}
          <Katex tex="=\int\text{speed}\,dt" />. That is the distance along the curve, not the straight-line gap{' '}
          <Katex tex="\left|\underset{\sim}{r}(t_2)-\underset{\sim}{r}(t_1)\right|" /> between the ends.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="Arc length is a sum of tiny hypotenuses, not the chord and not the legs">
        <ChordsWidget />
      </Explore>
      <Explore title="The square root is the speed, and the length is the area under the speed graph">
        <SpeedWidget />
      </Explore>
      <WrongMethod
        title="The length is the distance from the start point to the end point"
        source="Examiner's report"
        working={
          <>
            <Katex display tex="\left|\underset{\sim}{r}\!\left(\tfrac{\pi}{4}\right)-\underset{\sim}{r}(0)\right|" />
            <Katex display tex="=\left|\left(\tfrac{\sqrt2}{4}-1\right)\underset{\sim}{i}+\tfrac{\sqrt2}{4}\underset{\sim}{j}\right|" />
            <Katex display tex="=\sqrt{\tfrac54-\tfrac{\sqrt2}{2}}\approx0.737" />
          </>
        }
      >
        That is the length of the straight chord between the ends, but the particle travels along the curve, which
        bends. It is the size of the displacement, not the distance travelled. Here the two are close (<Katex tex="0.737" /> against{' '}
        <Katex tex="0.75" />), which is why the mistake looks believable; over the whole quarter of the curve,{' '}
        <Katex tex="0\le t\le\tfrac{\pi}{2}" />, it would be <Katex tex="\sqrt2\approx1.41" /> against{' '}
        <Katex tex="\tfrac32" />. &ldquo;Length of the path&rdquo; always means an arc-length integral.
      </WrongMethod>
      <WrongMethod
        title="Use the dy/dx arc-length formula, with dt"
        source="Examiner's report"
        working={
          <>
            <Katex display tex="\frac{dy}{dx}=\frac{3\sin^2(t)\cos(t)}{-3\cos^2(t)\sin(t)}=-\tan(t)" />
            <Katex display tex="L=\int_0^{\pi/4}\sqrt{1+\tan^2(t)}\,dt" />
            <Katex display tex="=\int_0^{\pi/4}\sec(t)\,dt" />
          </>
        }
      >
        The formula <Katex tex="\int\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}\,dx" /> adds up pieces of length{' '}
        <Katex tex="\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}\,dx" />. Swapping <Katex tex="dx" /> for{' '}
        <Katex tex="dt" /> drops the factor <Katex tex="\left|\tfrac{dx}{dt}\right|" /> that converts one into the
        other, and the result, <Katex tex="\log_e\!\left(1+\sqrt2\right)\approx0.881" />, is not the length (nor an
        integral you can do by hand here). Put the factor back and you get{' '}
        <Katex tex="\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}\,dt" />, the parametric form.
        When the curve is given in <Katex tex="t" />, integrate in <Katex tex="t" />.
      </WrongMethod>
      <WrongMethod
        title="Square-root each term separately"
        source="Examiner's report"
        working={
          <>
            <Katex display tex="\sqrt{9\cos^4(t)\sin^2(t)+9\sin^4(t)\cos^2(t)}" />
            <Katex display tex="=3\cos^2(t)\sin(t)+3\sin^2(t)\cos(t)" />
            <Katex display tex="L=\Bigl[-\cos^3(t)+\sin^3(t)\Bigr]_0^{\pi/4}=1" />
          </>
        }
      >
        <Katex tex="\sqrt{a^2+b^2}\ne a+b" />: try <Katex tex="\sqrt{3^2+4^2}=5" />, not <Katex tex="7" />. Adding
        the square roots adds the two legs of each little right triangle instead of its hypotenuse, so it measures
        a staircase, <Katex tex="|\Delta x|+|\Delta y|=\left(1-\tfrac{\sqrt2}{4}\right)+\tfrac{\sqrt2}{4}=1" />,
        not the curve (see &ldquo;Add the legs instead&rdquo; above). Always simplify what is under the root to a
        single product before rooting it.
      </WrongMethod>
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
