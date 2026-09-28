// 2020 Mathematical Methods — Exam 1, Question 1 (3 marks). A product rule, then a chain
// rule on an exponential evaluated at a point. Question text transcribed from the original
// paper (no diagram given). Answers checked with sympy and against the VCAA examination
// report and itute (which agree; itute factorises part a. as x(2 sin x + x cos x), the same
// thing). Solution is original. Interactive diagrams (§15): part a. reads x² sin(x) as the area
// of a rectangle whose width and height both grow, so the two strips become the two terms of the
// product rule and the corner (the "differentiate each factor and multiply" product) vanishes
// (interactives/meth-2020e1-q1a-rectangle.tsx); part b. follows a nudge to x through the inside
// u = x² − x + 3 and the outside e^u, with toggles drawing the line a bracket-less derivative or a
// forgotten chain factor would give (interactives/meth-2020e1-q1b-chain.tsx). The forgotten-factor
// mistake is ours, not the report's: it is worth showing because at x = 1 the chain factor
// 2x − 1 equals 1, so it lands on the right number with the wrong working.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RectangleWidget = lazyWidget(() => import('../interactives/meth-2020e1-q1a-rectangle'))
const ChainWidget = lazyWidget(() => import('../interactives/meth-2020e1-q1b-chain'))

const EXAM_A: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: <>This question was well answered. Most students competently and confidently applied the product rule.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 21, 60],
  average: 1.4,
  comment: (
    <>
      Students applied the chain rule; however, too often the lack of brackets resulted in an
      incorrect answer: for example,{' '}
      <Katex tex="(2x-1)e^{x^2-x+3}\ne2x-1e^{x^2-x+3}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^2\sin(x)" />,
    reason: (
      <>
        Two functions of <Katex tex="x" />, <Katex tex="x^2" /> and <Katex tex="\sin(x)" />, multiplied together:
        a product, so the product rule. Both factors change when <Katex tex="x" /> changes, and the product rule
        accounts for each change. The diagram below shows <Katex tex="y" /> as the area of a rectangle whose
        width and height both grow.
      </>
    ),
  },
  {
    working: <Katex display tex="u = x^2, \qquad v = \sin(x)" />,
    reason: <>Name the two factors.</>,
  },
  {
    working: <Katex display tex="\frac{du}{dx} = 2x, \qquad \frac{dv}{dx} = \cos(x)" />,
    reason: (
      <>
        Differentiate each factor on its own. Both are standard: the formula sheet's{' '}
        <Katex tex="\tfrac{d}{dx}\left(\sin(ax)\right) = a\cos(ax)" /> with <Katex tex="a=1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{du}{dx}\,v + u\,\frac{dv}{dx}" />,
    reason: (
      <>
        The product rule, on the formula sheet as <Katex tex="\tfrac{d}{dx}(uv) = u\tfrac{dv}{dx}+v\tfrac{du}{dx}" />.
        Each factor takes a turn at being differentiated while the other is left alone: &ldquo;derivative of the
        first times the second, plus the first times the derivative of the second&rdquo;. It is <em>not</em>{' '}
        <Katex tex="\tfrac{du}{dx}\times\tfrac{dv}{dx}" />: that product, <Katex tex="2x\cos(x)" />, is only the
        tiny corner of the rectangle, which vanishes. The two terms are added, so their order doesn&apos;t matter
        (unlike the quotient rule).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 2x\sin(x)+x^2\cos(x)}" />,
    reason: (
      <>
        Substituting. No factorising is needed; itute writes it as <Katex tex="x\left(2\sin(x)+x\cos(x)\right)" />,
        which is the same thing. Check at <Katex tex="x=0" />: <Katex tex="y=x^2\sin(x)" /> is flat there (both
        factors are <Katex tex="0" />), and the answer gives <Katex tex="0" /> too.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = e^{x^2-x+3}" />,
    reason: (
      <>
        The index isn&apos;t just <Katex tex="x" />: it is a whole function of <Katex tex="x" />. A function inside
        another function is a composite, and a composite needs the chain rule. Call the inside{' '}
        <Katex tex="u" />, so that <Katex tex="y=e^u" />.
      </>
    ),
  },
  {
    working: <Katex display tex="u = x^2-x+3 \implies \frac{du}{dx} = 2x-1" />,
    reason: <>The inside, differentiated with respect to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="y = e^u \implies \frac{dy}{du} = e^u" />,
    reason: <>The outside, differentiated with respect to <Katex tex="u" />: <Katex tex="e^u" /> is its own derivative.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{dy}{du}\cdot\frac{du}{dx} = e^u(2x-1)" />,
    reason: (
      <>
        The chain rule (formula sheet): multiply the two rates. <Katex tex="u" /> changes <Katex tex="(2x-1)" />{' '}
        times as fast as <Katex tex="x" />, and <Katex tex="y" /> changes <Katex tex="e^u" /> times as fast as{' '}
        <Katex tex="u" />, so <Katex tex="y" /> changes <Katex tex="e^u(2x-1)" /> times as fast as <Katex tex="x" />.
        The diagram below follows a small nudge to <Katex tex="x" /> through both steps.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = (2x-1)e^{x^2-x+3}" />,
    reason: (
      <>
        Putting <Katex tex="u=x^2-x+3" /> back. With practice this is one step: <Katex tex="e^{\text{something}}" />{' '}
        differentiates to <Katex tex="e^{\text{something}}" /> times the derivative of the something. The brackets
        around <Katex tex="2x-1" /> are essential: the report notes that too often the lack of brackets resulted in
        an incorrect answer, because <Katex tex="2x-1e^{x^2-x+3}" /> means only the <Katex tex="1" /> multiplies the
        exponential.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(1) = \left(2(1)-1\right)e^{1^2-1+3} = 1\times e^{3}" />,
    reason: (
      <>
        Substitute <Katex tex="x=1" /> into <Katex tex="f'(x)" />, not into <Katex tex="f(x)" />, on a line of its
        own. There is no need to tidy <Katex tex="f'(x)" /> first, since only its value at one point is wanted.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(1) = e^3}" />,
    reason: (
      <>
        An exact value, as Exam 1 requires (<Katex tex="e^3\approx20.1" />). Check the sign: the index{' '}
        <Katex tex="x^2-x+3" /> is a parabola with its minimum at <Katex tex="x=\tfrac12" />, so right of{' '}
        <Katex tex="\tfrac12" /> the index, and with it <Katex tex="f" />, is increasing, and <Katex tex="f'(1)" /> must be
        positive ✓. Notice that the chain factor <Katex tex="2(1)-1" /> is exactly <Katex tex="1" /> here, so
        forgetting it would also give <Katex tex="e^3" />, from wrong working (the second mistake below).
      </>
    ),
  },
]

export default function MethodsQ1_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={<>Let <Katex tex="y=x^2\sin(x)" />.<br />Find <Katex tex="\dfrac{dy}{dx}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why the product rule has two terms: x² sin(x) as a rectangle whose width and height both grow">
          <RectangleWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={2}
        statement={
          <>
            Evaluate <Katex tex="f'(1)" />, where <Katex tex="f:R\to R" />,{' '}
            <Katex tex="f(x)=e^{x^2-x+3}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title={<>Why the chain rule multiplies: the inside&apos;s rate <Katex tex="2x-1" /> times the outside&apos;s rate <Katex tex="e^u" /></>}>
          <ChainWidget />
        </Explore>
        <WrongMethod
          title="Write the chain factor without brackets"
          source="Examiner's report"
          working={<Katex display tex="f'(x) = 2x-1e^{x^2-x+3}" />}
        >
          By the order of operations this says <Katex tex="2x-(1\times e^{x^2-x+3})" />: only the{' '}
          <Katex tex="1" /> multiplies the exponential. Taken as written, at <Katex tex="x=1" /> it gives{' '}
          <Katex tex="2-e^3\approx-18.1" />, a graph falling steeply, yet <Katex tex="f" /> is increasing at{' '}
          <Katex tex="x=1" />. A negative gradient there is the signal to go back. The chain rule multiplies by the{' '}
          <em>whole</em> derivative of the index, so it goes in brackets: <Katex tex="(2x-1)e^{x^2-x+3}" />. Press
          &ldquo;What if I drop the brackets?&rdquo; in the diagram above to see the line it describes.
        </WrongMethod>
        <WrongMethod
          title="e to the power of anything differentiates to itself"
          working={
            <>
              <Katex display tex="f'(x) = e^{x^2-x+3}" />
              <Katex display tex="f'(1) = e^{3}" />
            </>
          }
        >
          The right number from the wrong working. <Katex tex="\tfrac{d}{dx}\left(e^x\right)=e^x" /> only when the index is
          plain <Katex tex="x" />; here the index is <Katex tex="x^2-x+3" />, so the chain rule multiplies by its
          derivative <Katex tex="2x-1" />. It lands on <Katex tex="e^3" /> only because <Katex tex="2(1)-1=1" />, a
          coincidence of <Katex tex="x=1" />. Test the rule at <Katex tex="x=\tfrac12" />, where the index has its
          minimum: <Katex tex="f" /> has its minimum there too, so <Katex tex="f'\left(\tfrac12\right)" /> must be{' '}
          <Katex tex="0" />, but <Katex tex="e^{11/4}\approx15.6" /> isn&apos;t. Don&apos;t be reassured by the final
          number: in a 2-mark question the instructions require appropriate working to be shown, and this working is
          wrong.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
