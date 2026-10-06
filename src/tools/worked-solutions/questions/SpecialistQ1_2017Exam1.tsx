// 2017 Specialist Mathematics — Exam 1, Question 1 (3 marks). Implicit differentiation of
// 3xy² + 2y = x, then the tangent at (1, −1). Question text transcribed from the original
// paper (no diagram given). Answer checked with sympy, against the VCAA examination report
// (y = x/2 − 3/2) and against itute (same line, written x − 2y = 3). Solution is original.
// This question has no lettered parts, so it uses the plain card layout rather than PartCard.
// Correction (Sept 2026): the Background used to say the curve can't be rearranged into y = …
// without a cubic formula. It can: the equation is quadratic in y, and x = 2y/(1 − 3y²).
// Interactive: spec-2017e1-q1-two-tangents (drag a point along the curve; the line x = 1 meets it
// at (1, −1) and (1, 1/3) with gradients 1/2 and 1/6, which is why dy/dx must contain y; a toggle
// shows the no-chain-rule slip giving gradient 2 and a line that cuts across the curve).
// WrongMethod boxes (all three named in the report): no chain rule on y², d/dx(x) = 0, and the
// general dy/dx put into the tangent equation.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TwoTangentsWidget = lazyWidget(() => import('../interactives/spec-2017e1-q1-two-tangents'))

const EXAM: SAExaminerStats = {
  marks: [13, 18, 11, 57],
  average: 2.1,
  comment: (
    <>
      This question was answered well by most students. Typical errors included not being
      able to use the product rule and/or chain rule on the first term, finding the correct
      derivative and not continuing to find the equation of the tangent. There were several
      arithmetic errors made that gave the derivative as{' '}
      <Katex tex="-\tfrac12,\ -2\text{ or }2" />. There were also notational errors. A few
      students found the equation of the normal instead. Some tried to make <Katex tex="x" />{' '}
      or <Katex tex="y" /> the subject before differentiating, with these attempts usually
      leading to difficulties. Many realised that substitution could occur without isolating
      the derivative first, but in both cases some errors occurred in substituting numbers into
      their equation to find the gradient. A number of students gave the derivative of{' '}
      <Katex tex="x" /> to be zero. A few found the derivative in terms of <Katex tex="x" /> and{' '}
      <Katex tex="y" /> and used that in their equation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\bigl(3xy^2\bigr)+\frac{d}{dx}(2y) = \frac{d}{dx}(x)" />,
    reason: <>A tangent needs a gradient, and the curve is given as an equation in <Katex tex="x" /> and <Katex tex="y" /> rather than as <Katex tex="y=\ldots" />. That combination is the signal for implicit differentiation: apply <Katex tex="\tfrac{d}{dx}" /> to every term on both sides.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\bigl(3xy^2\bigr) = 3y^2 + 3x\cdot 2y\frac{dy}{dx}" />,
    reason: <><Katex tex="3xy^2" /> is <Katex tex="3x" /> times <Katex tex="y^2" />, and both change as <Katex tex="x" /> changes, so use the product rule: <Katex tex="(3x)'\,y^2 + 3x\,(y^2)'" />. For <Katex tex="(y^2)'" /> use the chain rule: differentiate with respect to <Katex tex="y" /> to get <Katex tex="2y" />, then multiply by <Katex tex="\tfrac{dy}{dx}" /> because <Katex tex="y" /> depends on <Katex tex="x" />. The report lists this term first among the typical errors.</>,
  },
  {
    working: <Katex display tex="3y^2+6xy\frac{dy}{dx}+2\frac{dy}{dx} = 1" />,
    reason: <>By the same chain rule, <Katex tex="\tfrac{d}{dx}(2y)=2\tfrac{dy}{dx}" />. The right-hand side is <Katex tex="x" />, whose derivative is <Katex tex="1" />, not <Katex tex="0" /> (the report says a number of students gave <Katex tex="0" />).</>,
  },
  {
    working: <Katex display tex="3(-1)^2+6(1)(-1)\frac{dy}{dx}+2\frac{dy}{dx}=1" />,
    reason: <>Substitute <Katex tex="x=1" /> and <Katex tex="y=-1" /> now, before rearranging: the equation is linear in <Katex tex="\tfrac{dy}{dx}" /> either way, and numbers are easier to handle than letters. Take care with the signs: <Katex tex="(-1)^2=1" /> but <Katex tex="6(1)(-1)=-6" />. The report saw arithmetic errors giving the derivative as <Katex tex="-\tfrac12" />, <Katex tex="-2" /> or <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 3-4\frac{dy}{dx}&=1 \\ \frac{dy}{dx}&=\frac12 \end{aligned}" />,
    reason: <>Collect the <Katex tex="\tfrac{dy}{dx}" /> terms (<Katex tex="-6+2=-4" />), so <Katex tex="-4\tfrac{dy}{dx}=1-3=-2" />. This is the gradient at <Katex tex="(1,-1)" /> only. The general formula <Katex tex="\tfrac{dy}{dx}=\tfrac{1-3y^2}{6xy+2}" /> needs <em>both</em> coordinates, because the curve also passes through <Katex tex="\left(1,\tfrac13\right)" />, where the gradient is <Katex tex="\tfrac16" /> (see the diagram below).</>,
  },
  {
    working: <Katex display tex="y-(-1) = \tfrac12(x-1)" />,
    reason: <>A tangent is a straight line, so all it needs is one point and one number for the gradient: use <Katex tex="y-y_1=m(x-x_1)" />. The gradient of the <em>tangent</em> is <Katex tex="\tfrac12" />; the report notes a few students found the normal instead, whose gradient would be <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{x}{2}-\frac32}" />,
    reason: <>Equivalently <Katex tex="x-2y=3" />. Check: at <Katex tex="x=1" />, <Katex tex="y=\tfrac12-\tfrac32=-1" /> ✓, so the line does pass through the given point.</>,
  },
]

export default function SpecialistQ1_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 1 (3 marks)" always>
        <p>
          Find the equation of the tangent to the curve given by{' '}
          <Katex tex="3xy^2+2y=x" /> at the point <Katex tex="(1,-1)" />.
        </p>
      </Background>
      <Background>
        <p>
          In an equation like this, <Katex tex="y" /> is still a function of <Katex tex="x" />: move
          along the curve and <Katex tex="y" /> changes as <Katex tex="x" /> does. So when you
          differentiate a term containing <Katex tex="y" /> with respect to <Katex tex="x" />, the chain
          rule attaches a factor of <Katex tex="\tfrac{dy}{dx}" />:{' '}
          <Katex tex="\dfrac{d}{dx}\left(y^n\right)=ny^{n-1}\dfrac{dy}{dx}" />. This is implicit
          differentiation.
        </p>
        <p>
          The answer for <Katex tex="\tfrac{dy}{dx}" /> usually contains both <Katex tex="x" /> and{' '}
          <Katex tex="y" />. That is not a defect: a curve like this one can pass through several points
          with the same <Katex tex="x" />, each with its own gradient, so <Katex tex="x" /> alone can&apos;t
          say which point you mean.
        </p>
        <p>
          You <em>could</em> make a variable the subject first (the equation is quadratic in{' '}
          <Katex tex="y" />, and <Katex tex="x=\tfrac{2y}{1-3y^2}" />), but the report notes these attempts
          usually led to difficulties. Implicit differentiation takes one line, and with the point given you
          never need the general expression for <Katex tex="\tfrac{dy}{dx}" /> at all.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="One x, two points, two gradients: why dy/dx needs y as well">
        <TwoTangentsWidget />
      </Explore>
      <WrongMethod
        title={<>The derivative of <Katex tex="y^2" /> is <Katex tex="2y" /></>}
        source="Examiner's report"
        working={
          <Katex
            display
            tex="\begin{aligned} 3y^2+6xy+2\frac{dy}{dx}&=1 \\ 3-6+2\frac{dy}{dx}&=1 \\ \frac{dy}{dx}&=2 \end{aligned}"
          />
        }
      >
        That treats <Katex tex="y" /> as if it were the variable you are differentiating with respect to. It
        isn&apos;t: you are differentiating with respect to <Katex tex="x" />, and <Katex tex="y" /> depends
        on <Katex tex="x" />, so <Katex tex="\tfrac{d}{dx}(y^2)=2y\tfrac{dy}{dx}" />. The resulting line{' '}
        <Katex tex="y=2x-3" /> cuts across the curve instead of touching it (turn on the chain-rule toggle in
        the diagram above). To catch it, check that every term containing <Katex tex="y" /> came out with a{' '}
        <Katex tex="\tfrac{dy}{dx}" /> attached.
      </WrongMethod>
      <WrongMethod
        title={<>The derivative of <Katex tex="x" /> is <Katex tex="0" /></>}
        source="Examiner's report"
        working={
          <Katex
            display
            tex="\begin{aligned} 3-6\frac{dy}{dx}+2\frac{dy}{dx}&=0 \\ \frac{dy}{dx}&=\frac34 \end{aligned}"
          />
        }
      >
        Only constants differentiate to <Katex tex="0" />. The right-hand side <Katex tex="x" /> is the
        variable itself, and <Katex tex="\tfrac{d}{dx}(x)=1" /> (the line <Katex tex="y=x" /> has gradient{' '}
        <Katex tex="1" />). This slip leads to <Katex tex="y=\tfrac34x-\tfrac74" />, which is not the
        tangent.
      </WrongMethod>
      <WrongMethod
        title="Put the formula for dy/dx straight into the tangent equation"
        source="Examiner's report"
        working={<Katex display tex="y+1=\frac{1-3y^2}{6xy+2}\,(x-1)" />}
      >
        The formula gives the gradient at a <em>general</em> point of the curve. The tangent at{' '}
        <Katex tex="(1,-1)" /> uses its value <em>there</em>, the single number <Katex tex="\tfrac12" />. The
        equation above has <Katex tex="y^2" /> and <Katex tex="xy" /> terms, so it isn&apos;t even a straight
        line. A tangent&apos;s equation is always of the form <Katex tex="y=mx+c" /> with <Katex tex="m" />{' '}
        and <Katex tex="c" /> numbers: if <Katex tex="x" /> or <Katex tex="y" /> appears in your gradient,
        you haven&apos;t substituted the point yet.
      </WrongMethod>
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
