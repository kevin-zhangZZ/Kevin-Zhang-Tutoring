// 2019 Mathematical Methods — Exam 1, Question 7 (4 marks).
// P is a point on y=√(1-x²), A=(-1,0), B=(x,0) — find PB in terms of x (part a), then the
// maximum area of triangle ABP (part b). Question text transcribed from the original paper;
// the diagram is cropped directly from the original VCAA exam PDF, not a redrawing. Cross-
// checked against the VCAA examination report and itute's independent solutions — both
// agree with the derivation below (x = 1/2, maximum area 3√3/8; confirmed with sympy).
// Solution is original.
// Interactives (part b): meth-2019e1-q7b-tradeoff (drag P round the semicircle; A(x) with its
// tangent, and A'(x) split into the base-gain and height-loss product-rule terms, with a toggle
// for the lost chain-rule minus) and meth-2019e1-q7b-mirror (reflect ABP in the x-axis: the
// maximum is where triangle APP' in the unit circle becomes equilateral).
// Wrong methods: part a, the distance formula left unsimplified (report); part b, the lost
// chain-rule minus and the unbracketed −x(x+1) (report: brackets and negative terms), each
// computed with sympy.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2019e1-q7-semicircle.png'

const TradeoffWidget = lazyWidget(() => import('../interactives/meth-2019e1-q7b-tradeoff'))
const MirrorWidget = lazyWidget(() => import('../interactives/meth-2019e1-q7b-mirror'))

const EXAM_A: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: <>Though mostly well done, some students left their answer as an incorrect and unsimplified form of the distance formula.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 33, 15, 11],
  average: 1.0,
  comment: (
    <>
      The majority of students used calculus to solve this problem. Some students used
      geometry and trigonometry to obtain a correct solution. Most students managed to find an
      expression for the area in terms of <Katex tex="x" />. Many of those who used calculus
      found the differentiation of the expression difficult, generally as a result of poor
      setting out, particularly with lack of brackets, or dealing with negative terms. Students
      are encouraged to practice differentiations involving combinations of product and chain
      rules.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="P=(x,y) \text{ is on } y=\sqrt{1-x^2}, \text{ and } B=(x,0)" />,
    reason: (
      <>
        Look at the coordinates before reaching for a formula: <Katex tex="P" /> and <Katex tex="B" /> share the
        same <Katex tex="x" />-coordinate, so <Katex tex="PB" /> is the vertical drop from <Katex tex="P" /> to
        the <Katex tex="x" />-axis. A vertical length is just the difference in <Katex tex="y" />-coordinates,{' '}
        <Katex tex="y-0=y" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{PB = \sqrt{1-x^2}}" />,
    reason: (
      <>
        The question says <em>in terms of <Katex tex="x" /> only</em>, so replace <Katex tex="y" /> using the
        equation of the curve, <Katex tex="y=\sqrt{1-x^2}" />. This is also the height of triangle{' '}
        <Katex tex="ABP" />, which part b needs.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="AB = x-(-1) = x+1" />,
    reason: (
      <>
        To maximise an area, first write the area in terms of one variable. <Katex tex="A" /> and{' '}
        <Katex tex="B" /> are both on the <Katex tex="x" />-axis, so the base <Katex tex="AB" /> is a horizontal
        distance: right <Katex tex="x" />-coordinate minus left.
      </>
    ),
  },
  {
    working: <Katex display tex="A(x) = \tfrac12 (x+1)\sqrt{1-x^2},\quad -1<x<1" />,
    reason: (
      <>
        <Katex tex="AB" /> is horizontal and <Katex tex="PB" /> is vertical, so the triangle is right-angled at{' '}
        <Katex tex="B" />: area <Katex tex="=\tfrac12\times\text{base}\times\text{height}" /> with the height from
        part a. <Katex tex="B" /> can only move between <Katex tex="x=-1" /> and <Katex tex="x=1" />; at either end
        the triangle collapses to zero area.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\left(1-x^2\right)^{\frac12} = \tfrac12\left(1-x^2\right)^{-\frac12}(-2x) = \dfrac{-x}{\sqrt{1-x^2}}" />,
    reason: (
      <>
        A maximum is where the area stops increasing and starts decreasing, so we need <Katex tex="A'(x)" />. Do the
        awkward piece first, on its own line: <Katex tex="\sqrt{1-x^2}" /> is a function of{' '}
        <Katex tex="1-x^2" />, so the chain rule multiplies by the derivative of the inside,{' '}
        <Katex tex="-2x" />. That minus is the one most easily lost.
      </>
    ),
  },
  {
    working: <Katex display tex="A'(x) = \tfrac12\left[(1)\sqrt{1-x^2} + (x+1)\left(\dfrac{-x}{\sqrt{1-x^2}}\right)\right]" />,
    reason: (
      <>
        <Katex tex="A" /> is a product of <Katex tex="x+1" /> and <Katex tex="\sqrt{1-x^2}" />, so use the product
        rule: (derivative of the first)(second) + (first)(derivative of the second). Put brackets round every
        factor: the report says the differentiation went wrong mostly through poor setting out, missing
        brackets and negative terms. Each term has a meaning: the first is the area gained because the base
        grows; the second is the effect of the changing height, negative once <Katex tex="x>0" /> because the
        height is then shrinking. The maximum is where the two balance.
      </>
    ),
  },
  {
    working: <Katex display tex="= \dfrac{(1-x^2) - x(x+1)}{2\sqrt{1-x^2}} = \dfrac{1-x-2x^2}{2\sqrt{1-x^2}}" />,
    reason: (
      <>
        A sum is hard to set equal to zero; a single fraction is easy, because it is zero exactly when its numerator
        is. Multiply the first term by <Katex tex="\tfrac{\sqrt{1-x^2}}{\sqrt{1-x^2}}" /> to get the common
        denominator, then expand <Katex tex="-x(x+1)=-x^2-x" />. Both terms are negative: the minus multiplies
        the whole bracket.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} A'(x)=0 \;&\Rightarrow\; 2x^2+x-1=0 \\ &\Rightarrow\; (2x-1)(x+1)=0 \end{aligned}" />,
    reason: (
      <>
        The denominator <Katex tex="2\sqrt{1-x^2}" /> is positive for <Katex tex="-1<x<1" />, so only the numerator
        can be zero. Multiply <Katex tex="1-x-2x^2=0" /> by <Katex tex="-1" /> to get a positive leading coefficient,
        then factorise.
      </>
    ),
  },
  {
    working: <Katex display tex="x=\tfrac12 \quad (x=-1 \text{ gives zero area})" />,
    reason: (
      <>
        How do we know <Katex tex="x=\tfrac12" /> is a maximum? The area is <Katex tex="0" /> at both ends and
        positive in between, so it must reach a highest point inside, and a highest point inside is a stationary
        point. <Katex tex="x=\tfrac12" /> is the only one. (Or check signs: <Katex tex="A'(0)=\tfrac12>0" /> and
        the numerator is negative for <Katex tex="x>\tfrac12" />, so <Katex tex="A" /> rises then falls.)
      </>
    ),
  },
  {
    working: <Katex display tex="A\!\left(\tfrac12\right) = \tfrac12\left(\tfrac32\right)\sqrt{1-\tfrac14} = \tfrac12\left(\tfrac32\right)\left(\tfrac{\sqrt3}{2}\right)" />,
    reason: (
      <>
        The question asks for the maximum <em>area</em>, not the <Katex tex="x" />-value where it happens, so
        substitute <Katex tex="x=\tfrac12" /> back into <Katex tex="A(x)" />. Stopping at{' '}
        <Katex tex="x=\tfrac12" /> gives up the final mark.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum area} = \dfrac{3\sqrt3}{8}}" />,
    reason: (
      <>
        Exact form, since the question sets no rounding. Sanity check: at <Katex tex="x=0" /> the triangle has base
        and height both <Katex tex="1" />, area <Katex tex="\tfrac12" />, and{' '}
        <Katex tex="\tfrac{3\sqrt3}{8}\approx0.65" /> is a little bigger, as a maximum must be.
      </>
    ),
  },
]

export default function MethodsQ7_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (4 marks)</p>
        <p className="mb-2">
          The graph of the relation <Katex tex="y=\sqrt{1-x^2}" /> is shown on the axes below.{' '}
          <Katex tex="P" /> is a point on the graph of this relation, <Katex tex="A" /> is the
          point <Katex tex="(-1,0)" /> and <Katex tex="B" /> is the point <Katex tex="(x,0)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={diagramSrc}
            alt="Upper semicircle y=√(1-x²) with A at (-1,0), B at (x,0), and P at (x,y) on the curve, with the right-angled triangle ABP shaded, from the original 2019 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Length Expression" marks={1} statement={<>Find an expression for the length <Katex tex="PB" /> in terms of <Katex tex="x" /> only.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Use the distance formula between P and B"
          source="Examiner's report"
          working={<Katex display tex="PB=\sqrt{(x-x)^2+(y-0)^2}" />}
        >
          Not wrong as a start, but it is not an answer: it still contains <Katex tex="y" />, and the question asks
          for <Katex tex="x" /> only. It simplifies to <Katex tex="\sqrt{y^2}=y=\sqrt{1-x^2}" />, which you could
          have read straight off the diagram. Whenever two points share an <Katex tex="x" />-coordinate, the distance
          between them is just the difference of their <Katex tex="y" />-coordinates (and vice versa).
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Optimisation" marks={3} statement={<>Find the maximum area of the triangle <Katex tex="ABP" />.</>} examinerReport={EXAM_B}>
        <Background title="Maximising a quantity">
          <p>
            (1) Write the quantity as a function of one variable, and note which values that variable can take.
            (2) Differentiate and solve for where the derivative is zero. (3) Justify that the stationary point is a
            maximum, using the sign of the derivative or the values at the ends of the domain. (4) Answer the
            question asked, which here is the area itself, not the <Katex tex="x" /> that gives it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the area peaks at x = ½: a growing base against a shrinking height">
          <TradeoffWidget />
        </Explore>
        <WrongMethod
          title="The derivative of √(1 − x²) is x / √(1 − x²)"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="A'(x)=\tfrac12\left[\sqrt{1-x^2}+\dfrac{x(x+1)}{\sqrt{1-x^2}}\right]=\dfrac{1+x}{2\sqrt{1-x^2}}"
            />
          }
        >
          The chain rule's <Katex tex="-2x" /> has lost its minus. Now <Katex tex="A'(x)=0" /> only at{' '}
          <Katex tex="x=-1" />, where there is no triangle at all, and <Katex tex="A'(x)>0" /> everywhere else, as if
          the area kept growing all the way to <Katex tex="x=1" />. But the area is <Katex tex="0" /> at{' '}
          <Katex tex="x=1" />, so it must turn round somewhere in between. When your derivative has no zero where the
          picture clearly has a peak, hunt for a lost minus sign.
        </WrongMethod>
        <WrongMethod
          title="Expand −x(x + 1) as −x² + x"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{aligned} (1-x^2)-x^2+x=0 \;&\Rightarrow\; (2x+1)(x-1)=0 \\ &\Rightarrow\; x=-\tfrac12,\ A=\tfrac{\sqrt3}{8} \end{aligned}"
            />
          }
        >
          Without brackets, the minus reaches only the first term of <Katex tex="x(x+1)" />. The equation now gives{' '}
          <Katex tex="x=1" /> (zero area) and <Katex tex="x=-\tfrac12" />, where the area is{' '}
          <Katex tex="\tfrac{\sqrt3}{8}\approx0.22" />. A quick check catches it: at <Katex tex="x=0" /> the area is
          already <Katex tex="\tfrac12" />, which is bigger, so <Katex tex="x=-\tfrac12" /> cannot be the maximum.
          Write <Katex tex="-x(x+1)=-x^2-x" /> with the bracket every time.
        </WrongMethod>
        <Explore title="Reflect it: the biggest triangle is half an equilateral triangle">
          <MirrorWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
