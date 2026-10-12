// 2017 Specialist Mathematics — Exam 1, Question 6 (3 marks). Differentiate the reciprocal
// of arcsin, then state where the derivative exists. Only 18% scored full marks. Question
// text transcribed from the original paper (no diagram given). Answer checked with sympy
// and against the VCAA examination report; itute's solution agrees. Solution is original. No
// lettered parts, so this uses the plain card layout, with the working split in two (the
// derivative, then the set where it is defined) so each half sits next to its diagram.
// Interactive diagrams: spec-2017e1-q6-reciprocal-slope (arcsin rises so its reciprocal falls:
// the tangent always slopes down, and a toggle shows the report's wrong derivative √(1 − x²)
// rising instead) and spec-2017e1-q6-domain (the set built condition by condition on number
// lines, then a zoom on (1, 2/π) where the tangent turns vertical). WrongMethod boxes cover the
// report's two most common wrong derivatives and its wrong set [−1, 1] \ {0}.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ReciprocalSlopeWidget = lazyWidget(() => import('../interactives/spec-2017e1-q6-reciprocal-slope'))
const DomainWidget = lazyWidget(() => import('../interactives/spec-2017e1-q6-domain'))

const EXAM: SAExaminerStats = {
  marks: [33, 30, 19, 18],
  average: 1.2,
  comment: (
    <>
      This question was not answered well. Some students confused the inverse function with
      the reciprocal function. The most common incorrect derivatives were{' '}
      <Katex tex="\sqrt{1-x^2}" /> and <Katex tex="\dfrac{\log_e(\sin^{-1}x)}{\sqrt{1-x^2}}" />,
      while some had <Katex tex="\dfrac{d(\arcsin x)}{dx}=\log_e(\arcsin x)" />. Common errors
      for the domain included <Katex tex="R" />, <Katex tex="R\setminus\{-1,0,1\}" />,{' '}
      <Katex tex="[-1,1]" />, <Katex tex="(-1,1)" /> and <Katex tex="[-1,1]\setminus\{0\}" />.
      Many students did not exclude zero. The incorrect answer{' '}
      <Katex tex="(-\infty,0)\cup(0,\infty)" /> was also relatively common.
    </>
  ),
}

const ROWS_DERIV: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \bigl(\arcsin(x)\bigr)^{-1}" />,
    reason: (
      <>
        Write &ldquo;1 over <Katex tex="\arcsin(x)" />&rdquo; as a power of <Katex tex="-1" /> so the chain
        rule applies. This <Katex tex="-1" /> is a genuine power: <Katex tex="f" /> is the <em>reciprocal</em> of{' '}
        <Katex tex="\arcsin" />, not its inverse.
      </>
    ),
    more: (
      <>
        The quotient rule with numerator 1 gives the same answer.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = -\bigl(\arcsin(x)\bigr)^{-2}\times\frac{d}{dx}\arcsin(x)" />,
    reason: (
      <>
        Chain rule with <Katex tex="u=\arcsin(x)" />: <Katex tex="\tfrac{d}{du}\,u^{-1} = -u^{-2}" />, then
        multiply by <Katex tex="\tfrac{du}{dx}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{d}{dx}\arcsin(x) = \frac{1}{\sqrt{1-x^2}}" />,
    reason: (
      <>
        From the formula sheet (the <Katex tex="\sin^{-1}\!\left(\tfrac{x}{a}\right)" /> rule with{' '}
        <Katex tex="a=1" />).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{-1}{\bigl(\arcsin(x)\bigr)^2\sqrt{1-x^2}}}" />,
    reason: (
      <>
        Multiply the two pieces.
      </>
    ),
    more: (
      <>
        Check the sign: the square and the surd are positive, so <Katex tex="f'(x)<0" />. That is as expected:{' '}
        <Katex tex="\arcsin" /> is increasing, so 1 divided by it is decreasing. Slide <Katex tex="x" /> in the diagram below: the tangent always slopes down.
      </>
    ),
  },
]

const ROWS_DOMAIN: WorkingRow[] = [
  {
    working: <Katex display tex="1-x^2>0 \implies -1<x<1" />,
    reason: (
      <>
        The surd is in a denominator, so it must exist <em>and</em> be non-zero: <Katex tex="1-x^2>0" />,
        strictly. This excludes <Katex tex="x=\pm1" />, even though <Katex tex="f(\pm1)=\pm\tfrac{2}{\pi}" />{' '}
        exists.
      </>
    ),
    more: (
      <>
        At <Katex tex="x=\pm1" /> the graph of <Katex tex="f" /> has a vertical tangent, which has no gradient.
        This condition also keeps <Katex tex="x" /> inside <Katex tex="[-1,1]" />, where{' '}
        <Katex tex="\arcsin" /> exists, so answers such as <Katex tex="R" /> or{' '}
        <Katex tex="(-\infty,0)\cup(0,\infty)" /> (common errors in the report) can&apos;t be right.
      </>
    ),
  },
  {
    working: <Katex display tex="\arcsin(x)\ne0 \implies x\ne0" />,
    reason: (
      <>
        The other factor in the denominator, <Katex tex="\bigl(\arcsin(x)\bigr)^2" />, must be non-zero
        too, and <Katex tex="\arcsin(x)=0" /> only at <Katex tex="x=0" />.
      </>
    ),
    more: (
      <>
        At <Katex tex="x=0" />, <Katex tex="f" /> itself has a vertical asymptote. The report says many
        students did not exclude zero.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(-1,0)\cup(0,1)}" />,
    reason: (
      <>
        Both conditions at once (also written <Katex tex="(-1,1)\setminus\{0\}" />).
      </>
    ),
  },
]

export default function SpecialistQ6_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 6 (3 marks)" always>
        <p>
          Let <Katex tex="f(x)=\dfrac{1}{\arcsin(x)}" />. Find <Katex tex="f'(x)" /> and state
          the largest set of values of <Katex tex="x" /> for which <Katex tex="f'(x)" /> is
          defined.
        </p>
      </Background>
      <Background>
        <p>
          <strong>Reciprocal or inverse?</strong> <Katex tex="\arcsin(x)" />, also written{' '}
          <Katex tex="\sin^{-1}(x)" />, is the <em>inverse</em> of sine: that <Katex tex="-1" /> is not a
          power. <Katex tex="\dfrac{1}{\arcsin(x)}=\bigl(\arcsin(x)\bigr)^{-1}" /> is its{' '}
          <em>reciprocal</em>. For a reciprocal the
          chain rule gives <Katex tex="\dfrac{d}{dx}\Bigl(\dfrac1u\Bigr)=-\dfrac{u'}{u^2}" />; the
          &ldquo;flip the derivative&rdquo; rule <Katex tex="\tfrac{dy}{dx}=1\div\tfrac{dx}{dy}" /> belongs
          to inverse functions.
        </p>
        <p className="mt-2">
          <strong>Where does a derivative exist?</strong> <Katex tex="f'(a)" /> needs a point on the graph
          at <Katex tex="x=a" /> <em>and</em> a tangent there with a gradient (not a vertical one). So the
          domain of <Katex tex="f'" /> sits inside the domain of <Katex tex="f" /> and can be smaller. Read
          it off the formula for <Katex tex="f'(x)" />: every denominator non-zero, everything under a
          square root non-negative.
        </p>
      </Background>
      <WorkingTable rows={ROWS_DERIV} />
      <Explore title="arcsin rises, so its reciprocal falls: why f′(x) is always negative">
        <ReciprocalSlopeWidget />
      </Explore>
      <WrongMethod
        title="The derivative of 1/arcsin(x) is 1 over the derivative of arcsin(x)"
        source="Examiner's report"
        working={<Katex display tex="f'(x)=1\div\frac{1}{\sqrt{1-x^2}}=\sqrt{1-x^2}" />}
      >
        This gives <Katex tex="\sqrt{1-x^2}" />, one of the report&apos;s most common wrong derivatives.
        Flipping a derivative is the rule for an <em>inverse</em> function; this <Katex tex="f" /> is a{' '}
        <em>reciprocal</em>, and <Katex tex="\tfrac{d}{dx}\bigl(\tfrac1u\bigr)=-\tfrac{u'}{u^2}" />, not{' '}
        <Katex tex="\tfrac{1}{u'}" />. The sign check in the last row of the working catches it:{' '}
        <Katex tex="f'(x)" /> must be negative, but <Katex tex="\sqrt{1-x^2}" /> never is. Turn on the toggle in the diagram above to see this line
        rise while the curve falls.
      </WrongMethod>
      <WrongMethod
        title="1/u differentiates to logₑ(u), then multiply by the chain-rule factor"
        source="Examiner's report"
        working={<Katex display tex="\begin{aligned}f'(x)&=\log_e(\sin^{-1}x)\times\frac{1}{\sqrt{1-x^2}}\\&=\frac{\log_e(\sin^{-1}x)}{\sqrt{1-x^2}}\end{aligned}" />}
      >
        That runs a rule backwards: <Katex tex="\log_e(u)" /> is an <em>antiderivative</em> of{' '}
        <Katex tex="\tfrac1u" />, not its derivative. Differentiating{' '}
        <Katex tex="\tfrac1u=u^{-1}" /> gives <Katex tex="-u^{-2}" />. A quick check exposes it: for{' '}
        <Katex tex="-1<x<0" />, <Katex tex="\arcsin(x)" /> is negative, so{' '}
        <Katex tex="\log_e(\arcsin x)" /> doesn&apos;t even exist, yet <Katex tex="f'(x)" /> does.
      </WrongMethod>
      <WorkingTable rows={ROWS_DOMAIN} />
      <Explore title="f(1) exists but f′(1) doesn't: building the set where f′ is defined">
        <DomainWidget />
      </Explore>
      <WrongMethod
        title="f′ is defined wherever f is"
        source="Examiner's report"
        working={<Katex display tex="[-1,1]\setminus\{0\}" />}
      >
        The report lists this among the common errors, and it is exactly the domain of{' '}
        <Katex tex="f" />: <Katex tex="\arcsin" /> exists on <Katex tex="[-1,1]" /> and only{' '}
        <Katex tex="x=0" /> makes the denominator zero. But <Katex tex="f'" /> needs more than a point on
        the graph. At <Katex tex="x=\pm1" /> the formula for <Katex tex="f'(x)" /> has{' '}
        <Katex tex="\sqrt{1-1}=0" /> on the bottom, so <Katex tex="\pm1" /> must go too (step 3 of the
        diagram above shows the vertical tangent there).
      </WrongMethod>
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
