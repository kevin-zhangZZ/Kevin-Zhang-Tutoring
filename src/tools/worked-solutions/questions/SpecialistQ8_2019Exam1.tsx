// 2019 Specialist Mathematics — Exam 1, Question 8 (4 marks).
// Volume of the solid of revolution for y = √((1+2x)/(1+x²)) rotated about the x-axis on [0,1].
// Question text transcribed from the original paper. VCAA printed no diagram; the graph of the
// region being rotated is this site's own explanatory figure (matplotlib). Cross-checked against
// the VCAA examination report and itute's independent solutions, and verified by computer
// algebra — all give π²/4 + π log_e(2) ≈ 4.645. Solution is original.
//
// Interactive diagrams (§15), both this site's own explanatory figures: the solid sliced into n
// discs of volume πy²Δx, with a toggle for the two bounding cylinders behind the size check
// (radius 1 and √φ ≈ 1.272, so 3.14 < V < 5.08) (interactives/spec-2019e1-q8-discs.tsx); the area
// under y² stacked as the two layers 1/(1+x²) and 2x/(1+x²), whose areas are tan⁻¹(x) and
// log_e(1+x²) — π/4 and log_e 2 at x = 1 (interactives/spec-2019e1-q8-split.tsx).
// WrongMethods, both from the examiner's report: partial fractions (1 + x² has no real factors, so the
// only partial-fraction form is the integrand itself); and the u = 1 + x² substitution, illustrated
// with the x-terminals kept, which gives [log_e u]₀¹ and so log_e(0), undefined — the correct
// u-terminals 1 and 2 give log_e 2. The report says the substitution cost marks "if not done
// correctly" without saying how; the terminal slip is our illustration, not attributed to it.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import regionSrc from './spec-2019e1-q8-region.png'

const DiscsWidget = lazyWidget(() => import('../interactives/spec-2019e1-q8-discs'))
const SplitWidget = lazyWidget(() => import('../interactives/spec-2019e1-q8-split'))

const EXAMINER: SAExaminerStats = {
  marks: [13, 16, 10, 9, 52],
  average: 2.7,
  comment: (
    <>
      Most students were able to write down the correct integral to find the volume of the solid
      of revolution. Some students did not recognise the way in which the integrand split
      naturally and had difficulty proceeding further with the question. Some attempted
      solutions using partial fractions were seen. Many students who were able to successfully
      split the integrand used a substitution method to integrate{' '}
      <Katex tex="\displaystyle\int_0^1\frac{2x}{1+x^2}\,dx" />. This was unnecessary and resulted
      in a loss of marks if not done correctly.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx = \pi\int_0^1\left(\sqrt{\dfrac{1+2x}{1+x^2}}\right)^2 dx" />,
    reason: (
      <>
        &ldquo;Rotated about the <Katex tex="x" />-axis&rdquo; means every cross-section is a disc of
        radius <Katex tex="y" /> and area <Katex tex="\pi y^2" />; adding up the discs gives this
        formula. Write the <Katex tex="\pi" /> in from the start:
        it is the easiest thing to drop, and the size check at the end catches it.
      </>
    ),
    more: <>The first diagram below builds this formula.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_0^1 \dfrac{1+2x}{1+x^2}\,dx" />,
    reason: (
      <>
        Squaring undoes the square root, so the integrand is a plain fraction. That is the first
        clue the question was designed around <Katex tex="y^2" />: a root you would never want to
        integrate simply vanishes.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={regionSrc} alt="The curve y = √((1+2x)/(1+x²)) from (0,1) to (1, √(3/2)), with the region beneath it on [0,1] shaded — this is the region rotated about the x-axis" className="w-full max-w-[360px]" />
      </div>
    ),
    reason: (
      <>
        The shaded region spins around the <Katex tex="x" />-axis. Its radius starts at{' '}
        <Katex tex="y(0)=1" />, ends at <Katex tex="y(1)=\sqrt{1.5}\approx1.22" /> and bulges a little
        in between, never reaching <Katex tex="1.3" />. So the solid is a slightly bulging cylinder of
        length <Katex tex="1" />, and <Katex tex="V" /> should lie between{' '}
        <Katex tex="\pi(1)^2(1)\approx3.1" /> and <Katex tex="\pi(1.3)^2(1)\approx5.3" />. Keep that
        range to check the answer.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{1+2x}{1+x^2} = \dfrac{1}{1+x^2} + \dfrac{2x}{1+x^2}" />,
    reason: (
      <>
        The key move: split the <b>numerator</b> over the common denominator. How would you know?
        Look at the denominator. <Katex tex="1+x^2" /> turns up in exactly two standard integrals: a
        constant over it (an inverse tan) and its own derivative, <Katex tex="2x" />, over it (a log).
        The numerator <Katex tex="1+2x" /> is exactly one of each. Partial fractions is the wrong tool
        here, because it splits the <em>denominator</em>, and <Katex tex="1+x^2" /> has no real
        factors.
      </>
    ),
  },
  {
    working: <Katex display tex="\int\dfrac{1}{1+x^2}\,dx = \tan^{-1}(x)" />,
    reason: (
      <>
        The formula-sheet result{' '}
        <Katex tex="\int\tfrac{a}{a^2+x^2}\,dx=\tan^{-1}\!\left(\tfrac{x}{a}\right)" /> with{' '}
        <Katex tex="a=1" />. No <Katex tex="+c" /> is needed, since this is going into a definite
        integral.
      </>
    ),
  },
  {
    working: <Katex display tex="\int\dfrac{2x}{1+x^2}\,dx = \log_e\left(1+x^2\right)" />,
    reason: (
      <>
        The numerator <Katex tex="2x" /> is exactly the derivative of the denominator{' '}
        <Katex tex="1+x^2" />, so this is the <Katex tex="\tfrac{f'(x)}{f(x)}" /> form, which integrates
        to <Katex tex="\log_e|f(x)|" />. Spotting it takes one line; a <Katex tex="u" />-substitution
        reaches the same place in several, with more chances to slip. No absolute value is needed
        since <Katex tex="1+x^2>0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="V = \pi\Bigl[\tan^{-1}(x)+\log_e\left(1+x^2\right)\Bigr]_0^1" />,
    reason: <>Both antiderivatives go in one bracket, so each terminal is substituted only once.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned}&= \pi\Bigl[\left(\tan^{-1}(1)+\log_e 2\right)\\ &\qquad-\left(\tan^{-1}(0)+\log_e 1\right)\Bigr]\end{aligned}" />
        <Katex display tex="= \pi\left[\left(\dfrac{\pi}{4}+\log_e 2\right)-(0+0)\right]" />
      </>
    ),
    reason: (
      <>
        <Katex tex="\tan^{-1}(1)=\tfrac{\pi}{4}" /> because <Katex tex="\tan\tfrac{\pi}{4}=1" />, and{' '}
        <Katex tex="\tan^{-1}(0)=0" />. Careful with <Katex tex="\log_e(1)=0" />, not{' '}
        <Katex tex="1" />, an easy slip under pressure. The whole lower terminal contributes nothing.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{V = \dfrac{\pi^2}{4}+\pi\log_e(2) \ \text{ cubic units}}" />,
    reason: (
      <>
        Equivalently <Katex tex="\pi\left(\tfrac{\pi}{4}+\log_e(2)\right)" />. Numerically this is
        about <Katex tex="4.64" />, inside the range <Katex tex="3.1" /> to <Katex tex="5.3" /> from
        the picture ✓. Dropping the <Katex tex="\pi" /> would give about <Katex tex="1.48" />, which
        fails that check.
      </>
    ),
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
          <p>
            When the denominator is <Katex tex="x^2+a^2" />, which has no real roots and so can&apos;t
            be factorised, split the numerator into a multiple of the denominator&apos;s derivative{' '}
            <Katex tex="2x" /> plus a constant. The <Katex tex="2x" /> piece integrates to a log (the{' '}
            <Katex tex="\tfrac{f'}{f}" /> form) and the constant piece to an inverse tan.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Why V = π∫y² dx: each disc has face area πy², so the square root never gets integrated">
          <DiscsWidget />
        </Explore>
        <Explore title="How the integrand splits: two layers under y², one an inverse tan and one a log">
          <SplitWidget />
        </Explore>
        <WrongMethod
          title="It's a fraction with a quadratic underneath, so use partial fractions"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\frac{1+2x}{1+x^2}=\frac{A}{x-p}+\frac{B}{x-q}\ ?" />
              <Katex display tex="1+x^2=0 \implies x^2=-1" />
            </>
          }
        >
          <p>
            Partial fractions splits the <em>denominator</em> into factors, so it needs{' '}
            <Katex tex="1+x^2=(x-p)(x-q)" />. That is impossible: <Katex tex="x^2=-1" /> has no real
            solutions (the discriminant is <Katex tex="0-4<0" />), so there are no linear factors to
            split into. The partial-fraction form for an unfactorisable quadratic is{' '}
            <Katex tex="\tfrac{Ax+B}{1+x^2}" />, which is the integrand you started with (
            <Katex tex="A=2" />, <Katex tex="B=1" />). The method goes round in a circle.
          </p>
          <p>
            To catch it: before reaching for partial fractions, check that the denominator factorises.
            When it is <Katex tex="1+x^2" />, split the numerator instead, as in the fourth line of the
            working. The second diagram above shows the two pieces.
          </p>
        </WrongMethod>
        <WrongMethod
          title="Substitute u = 1 + x² for the second piece"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="u=1+x^2,\quad du=2x\,dx" />
              <Katex display tex="\int_0^1\frac{2x}{1+x^2}\,dx=\int_0^1\frac{1}{u}\,du" />
              <Katex display tex="=\Bigl[\log_e(u)\Bigr]_0^1=\log_e(1)-\log_e(0)\ ?" />
            </>
          }
        >
          <p>
            The report says many students used a substitution here, that it was unnecessary, and that
            it cost marks when not done correctly. The working above shows one easy way to go wrong:
            the terminals <Katex tex="0" /> and <Katex tex="1" /> are values of <Katex tex="x" />, but
            the new integral is in <Katex tex="u" />. They must become{' '}
            <Katex tex="u=1+0^2=1" /> and <Katex tex="u=1+1^2=2" />, giving{' '}
            <Katex tex="\bigl[\log_e(u)\bigr]_1^2=\log_e(2)" />. That is the same as{' '}
            <Katex tex="\log_e\left(1+x^2\right)" /> evaluated from <Katex tex="0" /> to{' '}
            <Katex tex="1" />.
          </p>
          <p>
            To catch it: <Katex tex="\log_e(0)" /> is undefined, so if it appears the terminals were
            not converted. The safer route is not to substitute at all. The numerator{' '}
            <Katex tex="2x" /> is exactly the derivative of <Katex tex="1+x^2" />, so write{' '}
            <Katex tex="\log_e\left(1+x^2\right)" /> straight down.
          </p>
        </WrongMethod>
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
