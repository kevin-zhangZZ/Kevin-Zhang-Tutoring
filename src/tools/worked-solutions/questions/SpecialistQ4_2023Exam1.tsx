// 2023 Specialist Mathematics — Exam 1 Question 4 (3 marks). Implicit differentiation of a
// product containing arcsin of y². Question text transcribed from the original paper. Answer
// checked with sympy and against the VCAA examination report. Solution is original.
//
// Interactive (after the working): interactives/spec-2023e1-q4-rectangle.tsx. Read the relation
// as a rectangle of width x and height arcsin(y²) with area always π: moving along the relation,
// the strip gained on the side equals the strip lost off the top, and per unit of x those are
// the two product-rule terms. A toggle drops the arcsin(y²)·1 term (dy/dx = 0), and the
// area grows past π.
//
// Concise/Detailed review (Oct 2026): the product-rule trap, the chain-rule slips (√(1 − y²)
// under the root → −π/72; dropping the 2y → −π√3/72, both checked with sympy), the on-relation
// check and the decimal check live in the rows' `more` fields; the reasons alone carry the method.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RectangleWidget = lazyWidget(() => import('../interactives/spec-2023e1-q4-rectangle'))

const EXAM: SAExaminerStats = {
  marks: [25, 6, 32, 37],
  average: 1.8,
  comment: (
    <>
      Students were required to demonstrate appropriate use of the product and/or chain rule
      (depending on the approach taken). This was often not done well. Students who performed
      the implicit differentiation well were often able to proceed through to the answer.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x\arcsin\left(y^2\right) = \pi" />,
    reason: <>The left side is <Katex tex="x" /> times a function of <Katex tex="y" />, so differentiating it with respect to <Katex tex="x" /> needs the product rule, with the chain rule for the <Katex tex="\arcsin\left(y^2\right)" /> factor.</>,
  },
  {
    working: <Katex display tex="\arcsin\left(y^2\right)\cdot1+x\cdot\frac{d}{dx}\left[\arcsin\left(y^2\right)\right] = 0" />,
    reason: <>Differentiate both sides with respect to <Katex tex="x" />. Product rule with <Katex tex="u=x" /> and <Katex tex="v=\arcsin\left(y^2\right)" />: <Katex tex="u'v+uv'" />, where <Katex tex="u'=1" />. The right side <Katex tex="\pi" /> is a constant, so its derivative is <Katex tex="0" />.</>,
    more: (
      <>
        Keep both terms: the first comes from <Katex tex="x" /> changing, the second from <Katex tex="y" /> changing.
        Dropping the first term, <Katex tex="\arcsin\left(y^2\right)\cdot1" /> (differentiating only the{' '}
        <Katex tex="\arcsin\left(y^2\right)" /> factor, as if <Katex tex="x" /> were a constant), leaves <Katex tex="x\cdot\tfrac{2y}{\sqrt{1-y^4}}\cdot\tfrac{dy}{dx}=0" />,
        which forces <Katex tex="\tfrac{dy}{dx}=0" />. That can't be right: the relation says{' '}
        <Katex tex="\arcsin\left(y^2\right)=\tfrac{\pi}{x}" />, so as <Katex tex="x" /> grows,{' '}
        <Katex tex="\arcsin\left(y^2\right)" /> shrinks and <Katex tex="y" /> has to change. Substituting{' '}
        <Katex tex="x=6" /> before differentiating makes the same mistake: <Katex tex="6\arcsin\left(y^2\right)=\pi" />{' '}
        is a different relation, just the horizontal lines <Katex tex="y=\pm\tfrac{1}{\sqrt2}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{d}{dx}\left[\arcsin\left(y^2\right)\right] \\ &\quad= \frac{1}{\sqrt{1-\left(y^2\right)^2}}\cdot\frac{d}{dx}\left(y^2\right) \\ &\quad= \frac{1}{\sqrt{1-y^4}}\cdot2y\frac{dy}{dx}\end{aligned}" />,
    reason: <>Chain rule for <Katex tex="\arcsin" />: <Katex tex="\tfrac{d}{dx}\arcsin(u)=\tfrac{1}{\sqrt{1-u^2}}\cdot\tfrac{du}{dx}" /> with <Katex tex="u=y^2" />, so <Katex tex="u^2=y^4" /> goes under the root. Then the chain rule again, because <Katex tex="y" /> is a function of <Katex tex="x" />: <Katex tex="\tfrac{d}{dx}\left(y^2\right)=2y\tfrac{dy}{dx}" />.</>,
    more: (
      <>
        The formula sheet gives <Katex tex="\tfrac{d}{dx}\left(\sin^{-1}(ax)\right)=\tfrac{a}{\sqrt{1-(ax)^2}}" />;
        with <Katex tex="a=1" /> that is the <Katex tex="\tfrac{1}{\sqrt{1-u^2}}" /> above, and the chain rule multiplies
        it by the derivative of whatever is inside. Two chain-rule slips to watch for:
        writing <Katex tex="\sqrt{1-y^2}" /> under the root (the inside is <Katex tex="y^2" />, and squaring it gives{' '}
        <Katex tex="y^4" />), and dropping the <Katex tex="2y" />. They lead to <Katex tex="-\tfrac{\pi}{72}" /> and{' '}
        <Katex tex="-\tfrac{\pi\sqrt3}{72}" />, and both of those still fit the form{' '}
        <Katex tex="-\tfrac{\pi\sqrt a}{b}" />, so the answer format won't warn you.
      </>
    ),
  },
  {
    working: <Katex display tex="\arcsin\left(y^2\right)+\frac{2xy}{\sqrt{1-y^4}}\cdot\frac{dy}{dx} = 0" />,
    reason: <>Substitute this into the product-rule line, collecting <Katex tex="x" /> and <Katex tex="2y" /> over the root.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{At } \left(6,\tfrac{1}{\sqrt2}\right)\text{:} \\ &y^2 = \tfrac12, \quad y^4 = \tfrac14, \\ &\arcsin\!\left(\tfrac12\right) = \tfrac\pi6, \quad \sqrt{1-\tfrac14} = \tfrac{\sqrt3}{2}\end{aligned}" />,
    reason: <>Work out every piece at the point before substituting. <Katex tex="\arcsin\left(\tfrac12\right)=\tfrac\pi6" /> because <Katex tex="\sin\left(\tfrac\pi6\right)=\tfrac12" />.</>,
    more: <>This also confirms the point is on the relation: <Katex tex="6\times\tfrac\pi6=\pi" />.</>,
  },
  {
    working: <Katex display tex="\frac\pi6+\frac{2(6)\left(\tfrac{1}{\sqrt2}\right)}{\tfrac{\sqrt3}{2}}\cdot\frac{dy}{dx} = 0" />,
    reason: <>Substituting <Katex tex="x=6" />, <Katex tex="y=\tfrac{1}{\sqrt2}" /> and the values above.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{12/\sqrt2}{\sqrt3/2} &= \frac{24}{\sqrt2\sqrt3} \\ &= \frac{24}{\sqrt6} = 4\sqrt6 \\ \therefore\ \frac\pi6+4\sqrt6\,\frac{dy}{dx} &= 0\end{aligned}" />,
    reason: <>Simplify the coefficient of <Katex tex="\tfrac{dy}{dx}" />: dividing by <Katex tex="\tfrac{\sqrt3}{2}" /> is multiplying by <Katex tex="\tfrac{2}{\sqrt3}" />, then rationalise, <Katex tex="\tfrac{24}{\sqrt6}=\tfrac{24\sqrt6}{6}=4\sqrt6" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = -\frac{\pi}{6\cdot4\sqrt6} = -\frac{\pi}{24\sqrt6}" />,
    reason: <>Subtract <Katex tex="\tfrac\pi6" /> from both sides, then divide by <Katex tex="4\sqrt6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{\pi\sqrt6}{144}}" />,
    reason: <>To match the form <Katex tex="-\tfrac{\pi\sqrt a}{b}" />, multiply top and bottom by <Katex tex="\sqrt6" />: <Katex tex="24\sqrt6\times\sqrt6=24\times6=144" />. So <Katex tex="a=6" />, <Katex tex="b=144" />.</>,
    more: (
      <>
        Check: <Katex tex="-\tfrac{\pi\sqrt6}{144}\approx-0.053" />. Negative is right: with <Katex tex="y" /> positive,{' '}
        <Katex tex="y" /> has to fall as <Katex tex="x" /> grows, because <Katex tex="\arcsin\left(y^2\right)=\tfrac{\pi}{x}" />{' '}
        is shrinking.
      </>
    ),
  },
]

export default function SpecialistQ4_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (3 marks)</p>
        <p>
          Consider the relation <Katex tex="x\arcsin\left(y^2\right)=\pi" />.
          <br />
          Use implicit differentiation to find <Katex tex="\dfrac{dy}{dx}" /> at the point{' '}
          <Katex tex="\left(6,\dfrac{1}{\sqrt2}\right)" />.
          <br />
          Give your answer in the form{' '}
          <Katex tex="-\dfrac{\pi\sqrt a}{b}" />, where <Katex tex="a,b\in Z^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            <em>Implicit differentiation</em> means differentiating both sides of the relation
            with respect to <Katex tex="x" /> as it stands, without first making <Katex tex="y" />{' '}
            the subject. Anything in <Katex tex="y" />, differentiated with respect to{' '}
            <Katex tex="x" />, picks up a factor of <Katex tex="\tfrac{dy}{dx}" /> by the chain
            rule, because <Katex tex="y" /> is a function of <Katex tex="x" />. The report notes the
            product and chain rules were often not applied well here.
          </p>
          <p>
            The point is designed so that{' '}
            <Katex tex="y^2=\tfrac12" /> gives the exact value{' '}
            <Katex tex="\arcsin\!\left(\tfrac12\right)=\tfrac\pi6" />, and the given answer
            form warns you a surd is coming.
          </p>
          <p>
            Another valid route avoids the product rule: divide by <Katex tex="x" /> first, giving{' '}
            <Katex tex="\arcsin\left(y^2\right)=\tfrac{\pi}{x}" />, then differentiate (chain rule only):{' '}
            <Katex tex="\tfrac{2y}{\sqrt{1-y^4}}\cdot\tfrac{dy}{dx}=-\tfrac{\pi}{x^2}" />. At the point this is{' '}
            <Katex tex="\tfrac{2\sqrt6}{3}\cdot\tfrac{dy}{dx}=-\tfrac{\pi}{36}" />, so{' '}
            <Katex tex="\tfrac{dy}{dx}=-\tfrac{\pi}{36}\cdot\tfrac{3}{2\sqrt6}=-\tfrac{\pi\sqrt6}{144}" />, the same answer.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="The product rule's two terms are two strips of a rectangle whose area stays π">
          <RectangleWidget />
        </Explore>
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
