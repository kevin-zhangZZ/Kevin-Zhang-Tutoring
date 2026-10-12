// 2024 Mathematical Methods — Exam 2, Section B Question 1 (12 marks). A quartic with a
// parameter: counting distinct roots, then calculus on the a = 1 case, then matching one
// quartic to another by transformation. Question text transcribed from the original paper
// (2024 papers are image-only, so read from rendered pages). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>This question was answered well.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [29, 61, 10],
  average: 0.8,
  comment: <>Some of the values were often missing.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [69, 31],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. Some students did not exclude <Katex tex="1" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [5, 95],
  average: 1.0,
  comment: <>This question was answered well.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      Exact answers were required. <Katex tex="(0.5,5.06)" /> was sometimes seen.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Some students used square brackets instead of round
      brackets. Others put <Katex tex="\cap" /> instead of <Katex tex="\cup" />.
    </>
  ),
}

const EXAM_CIV: SAExaminerStats = {
  marks: [32, 17, 51],
  average: 1.2,
  comment: (
    <>
      This question was answered reasonably well. A common incorrect answer was{' '}
      <Katex tex="\left(\tfrac12,\tfrac{81}{16}\right)" />.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [63, 37],
  average: 0.4,
  comment: (
    <>
      Some students incorrectly translated to the left and down. Others had an incorrect value
      for the vertical translation such as <Katex tex="\tfrac{81}{16}" />. Exact answers were
      required. <Katex tex="1.06" /> was sometimes seen.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [76, 19, 5],
  average: 0.3,
  comment: (
    <>
      This question was not done well. The vertical translation could be completed at any stage
      in the sequence. The other transformations had to be in the correct order.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (x+1)(x+a)(x-2)(x-2a) = 0" />,
    reason: <>Already fully factorised — the null factor law is all that is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -1,\ -a,\ 2,\ 2a}" />,
    reason: <>Each bracket set to zero in turn. Note the signs: <Katex tex="x+a=0" /> gives <Katex tex="x=-a" />, not <Katex tex="x=a" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\{-1,\ -a,\ 2,\ 2a\}" />,
    reason: <>Each <em>distinct</em> root is one <Katex tex="x" />-intercept. Three intercepts from four roots means exactly one pair of them coincides.</>,
    more: <>A repeated root still touches or crosses the axis at just one point, so the number of intercepts is the number of different values in this list. Two of the roots, <Katex tex="-1" /> and <Katex tex="2" />, are fixed; the other two move with <Katex tex="a" />. Four roots make six pairs: <Katex tex="-1=-a" />, <Katex tex="-1=2" />, <Katex tex="-1=2a" />, <Katex tex="-a=2" />, <Katex tex="-a=2a" /> and <Katex tex="2=2a" />. Testing all six in order is what stops a value going missing.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-a = 2 \implies a = -2: \\ \{-1,\,2,\,2,\,-4\} \to \text{3 distinct}\end{gathered}" />,
    reason: <>Test the six pairs one at a time. Here the moving root <Katex tex="-a" /> lands on the fixed root <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-a = 2a \implies a = 0: \\ \{-1,\,0,\,2,\,0\} \to \text{3 distinct}\end{gathered}" />,
    reason: <>The two moving roots can also meet each other. Easy to overlook because both become 0.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}2a = -1 \implies a = -\tfrac12: \\ \{-1,\,\tfrac12,\,2,\,-1\} \to \text{3 distinct}\end{gathered}" />,
    reason: <>The root <Katex tex="2a" /> lands on <Katex tex="-1" />, while <Katex tex="-a=\tfrac12" /> differs from the rest, so exactly three values remain.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-a = -1 \text{ or } 2a = 2 \implies a = 1: \\ \{-1,\,-1,\,2,\,2\} \to \text{2 distinct}\end{gathered}" />,
    reason: <>Two pairs give the same <Katex tex="a" />. Both coincidences happen at once, so <Katex tex="a=1" /> gives two intercepts, not three — exclude it.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -2,\ -\tfrac12,\ 0}" />,
    reason: <>The sixth pair, <Katex tex="-1=2" />, is impossible, so these three values are all of them.</>,
    more: <>The report notes some of the values were often missing. Students who only compare the moving roots with the fixed roots <Katex tex="-1" /> and <Katex tex="2" /> lose <Katex tex="a=0" />, where <Katex tex="-a" /> and <Katex tex="2a" /> meet each other. A CAS graph of <Katex tex="y=f(x)" /> for each candidate is a quick check that it really has three intercepts.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Four intercepts} \iff \text{all four roots distinct}" />,
    reason: <>So exclude every value of <Katex tex="a" /> that makes any two of the roots coincide.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{Excluded: } a = -2,\ -\tfrac12,\ 0 \ \text{(3 distinct)}; \\ a = 1 \ \text{(2 distinct)}\end{gathered}" />,
    reason: <>The three values from part b.i., plus <Katex tex="a=1" />, which makes two pairs coincide and leaves only two intercepts.</>,
    more: <>The report notes some students did not exclude <Katex tex="1" />. It is the value that never appears in the answer to b.i. — not because the roots are all distinct, but because it removes <em>two</em> intercepts. Any coincidence at all, single or double, spoils four intercepts.</>,
  },
  {
    working: <Katex display tex="\boxed{a \in R\setminus\left\{-2,\,-\tfrac12,\,0,\,1\right\}}" />,
    reason: <>Every other value of <Katex tex="a" /> leaves four separate roots.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = (x+1)^2(x-2)^2" />,
    reason: <>Putting <Katex tex="a=1" /> into <Katex tex="f" /> pairs the brackets up.</>,
  },
  {
    working: <Katex display tex="g'(x) = 2(x+1)(x-2)^2 + (x+1)^2\cdot 2(x-2)" />,
    reason: <>Product rule, with the chain rule on each squared bracket.</>,
  },
  {
    working: <Katex display tex="= 2(x+1)(x-2)\bigl[(x-2)+(x+1)\bigr]" />,
    reason: <>Taking out the common factor rather than expanding — the factorised form is what parts c.ii. and c.iii. need.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} g'(x) &= 2(x+1)(x-2)(2x-1) \\ &= 4x^3-6x^2-6x+4\end{aligned}}" />,
    reason: <>Either form is accepted.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 0 \implies x = -1,\ 2,\ \tfrac12" />,
    reason: <>The three stationary points, straight from the factorised derivative.</>,
  },
  {
    working: <Katex display tex="g(-1) = 0, \quad g(2) = 0" />,
    reason: <><Katex tex="g" /> is a square, so <Katex tex="g(x)\ge 0" />; it equals 0 here, so these two are local <em>minima</em> on the axis.</>,
  },
  {
    working: <Katex display tex="g\!\left(\tfrac12\right) = \left(\tfrac32\right)^2\left(-\tfrac32\right)^2 = \tfrac94\cdot\tfrac94" />,
    reason: <>Between two minima on the axis the graph must rise and turn back down, so the middle stationary point is the local maximum.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\tfrac12,\ \tfrac{81}{16}\right)}" />,
    reason: <>Exact coordinates were required — <Katex tex="(0.5,\,5.0625)" /> is also exact, but <Katex tex="(0.5,\,5.06)" /> is not.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 2(x+1)(x-2)(2x-1)" />,
    reason: <>A cubic with positive leading coefficient and three simple zeros at <Katex tex="-1" />, <Katex tex="\tfrac12" />, <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\text{sign of } g': \quad - \ \big|_{-1} \ + \ \big|_{1/2} \ - \ \big|_{2} \ +" />,
    reason: <>The sign alternates across each simple zero, and the rightmost region is positive.</>,
    more: <>Check with a test value: <Katex tex="g'(0)=4>0" />, so <Katex tex="\left(-1,\tfrac12\right)" /> is indeed a positive region. It also fits part c.ii.: <Katex tex="g" /> rises from the minimum at <Katex tex="x=-1" /> to the maximum at <Katex tex="x=\tfrac12" />, then falls to the minimum at <Katex tex="x=2" /> and rises again.</>,
  },
  {
    working: <Katex display tex="\boxed{x\in\left(-1,\tfrac12\right)\cup(2,\infty)}" />,
    reason: <>Strict inequality, so round brackets, and a union — the two intervals don't overlap, so an intersection would be empty.</>,
    more: <>The report notes some students used square brackets instead of round brackets, and others put <Katex tex="\cap" /> instead of <Katex tex="\cup" />. At <Katex tex="x=-1,\ \tfrac12,\ 2" /> the derivative is 0, not positive, so those endpoints must be left out.</>,
  },
]

const ROWS_CIV: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} g(x) &= (x+1)^2(x-2)^2 \\ &= \left[(x+1)(x-2)\right]^2 \\ &= \left(x^2-x-2\right)^2\end{aligned}" />,
    reason: <>Both given <Katex tex="x" />-values average to <Katex tex="\tfrac12" />, which hints at symmetry. Writing <Katex tex="g" /> as a perfect square exposes it.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}x^2-x-2 = \left(x-\tfrac12\right)^2-\tfrac94 \\ \implies g \text{ is symmetric about } x = \tfrac12\end{gathered}" />,
    reason: <>Completing the square inside. With <Katex tex="u=x-\tfrac12" />, <Katex tex="g=\left(u^2-\tfrac94\right)^2" />, which is unchanged when <Katex tex="u" /> becomes <Katex tex="-u" />.</>,
  },
  {
    working: <Katex display tex="\frac{-\sqrt3+1}{2} = \tfrac12-\tfrac{\sqrt3}{2}, \qquad \frac{\sqrt3+1}{2} = \tfrac12+\tfrac{\sqrt3}{2}" />,
    reason: <>The two points are mirror images in <Katex tex="x=\tfrac12" />, so their tangents are mirror images too and must meet <em>on</em> that line.</>,
    more: <>Reflecting in <Katex tex="x=\tfrac12" /> sends the graph to itself, the right-hand point to the left-hand point, and so the right-hand tangent to the left-hand tangent. The two tangents have gradients <Katex tex="\pm3\sqrt3" /> (opposite signs, so not parallel), and the point where they cross is sent to itself — which only happens on the mirror line.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}g\!\left(\tfrac12+\tfrac{\sqrt3}{2}\right) = \left(\tfrac34-\tfrac94\right)^2 = \tfrac94, \\ g'\!\left(\tfrac12+\tfrac{\sqrt3}{2}\right) = -3\sqrt3\end{gathered}" />,
    reason: <>Substitute <Katex tex="u=\tfrac{\sqrt3}{2}" /> into <Katex tex="g=\left(u^2-\tfrac94\right)^2" /> and <Katex tex="g'=2\left(u^2-\tfrac94\right)\cdot 2u=4u^3-9u" />.</>,
    more: <>Since <Katex tex="u=x-\tfrac12" /> has <Katex tex="\tfrac{du}{dx}=1" />, differentiating with respect to <Katex tex="u" /> gives the same gradient as with respect to <Katex tex="x" />. Here <Katex tex="u^2=\tfrac34" />, so <Katex tex="g'=2\left(-\tfrac32\right)\left(\sqrt3\right)=-3\sqrt3" />. The same value comes from substituting into <Katex tex="g'(x)=4x^3-6x^2-6x+4" /> from part c.i., or from <Cas fn="derivative" /> on CAS.</>,
  },
  {
    working: <Katex display tex="y - \tfrac94 = -3\sqrt3\left(x-\tfrac12-\tfrac{\sqrt3}{2}\right)" />,
    reason: <>The tangent at the right-hand point, in point–gradient form.</>,
  },
  {
    working: <Katex display tex="x = \tfrac12: \quad y = \tfrac94 + 3\sqrt3\cdot\tfrac{\sqrt3}{2} = \tfrac94+\tfrac92" />,
    reason: <>The tangents meet on <Katex tex="x=\tfrac12" />, so substitute <Katex tex="x=\tfrac12" /> into this tangent.</>,
    more: <>Without the symmetry, the standard Exam 2 route works too: store <Katex tex="g" /> with <Cas fn="define" />, find both tangents (the report lists <Katex tex="y_1=3\sqrt3x-\tfrac{3\sqrt3}{2}+\tfrac{27}{4}" /> and <Katex tex="y_2=-3\sqrt3x+\tfrac{3\sqrt3}{2}+\tfrac{27}{4}" />), then <Cas fn="solve" /> <Katex tex="y_1=y_2" /> for <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\tfrac12,\ \tfrac{27}{4}\right)}" />,
    reason: <>Equivalently <Katex tex="(0.5,\,6.75)" />. The tangents cross <em>above</em> the curve's local maximum, which has height only <Katex tex="\tfrac{81}{16}" />.</>,
    more: <>The report notes a common incorrect answer was <Katex tex="\left(\tfrac12,\tfrac{81}{16}\right)" /> — the local maximum from part c.ii. Getting <Katex tex="x=\tfrac12" /> by symmetry is not enough; the height has to come from the tangent line, not from the curve. The two given <Katex tex="x" />-values are in fact the points of inflection of <Katex tex="g" /> (where <Katex tex="g''(x)=12x^2-12x-6=0" />), which is why these tangents are the steepest between the two minima.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} h(x) &= (x+1)(x-1)(x+2)(x-2) \\ &= \left(x^2-1\right)\left(x^2-4\right) \\ &= x^4-5x^2+4\end{aligned}" />,
    reason: <>Pairing the brackets shows <Katex tex="h" /> is even (symmetric about the <Katex tex="y" />-axis); expanding makes it quick to differentiate.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}h'(x) = 4x^3-10x = 2x\left(2x^2-5\right) \\ \implies x = 0,\ \pm\sqrt{\tfrac52}\end{gathered}" />,
    reason: <>Differentiate term by term and solve <Katex tex="h'(x)=0" />. A positive quartic has minima at the outer two, so <Katex tex="x=0" /> is the local maximum.</>,
  },
  {
    working: <Katex display tex="h(0) = 4 \implies \text{local maximum } (0,4)" />,
    reason: <>Compare with <Katex tex="g" />, whose local maximum is at <Katex tex="\left(\tfrac12,\tfrac{81}{16}\right)" /> from part c.ii.</>,
  },
  {
    working: <Katex display tex="\tfrac12-0 = \tfrac12, \qquad \tfrac{81}{16}-4 = \tfrac{81}{16}-\tfrac{64}{16} = \tfrac{17}{16}" />,
    reason: <>Each translation is target minus start (<Katex tex="g" />'s maximum minus <Katex tex="h" />'s). Both are positive: right and up.</>,
    more: <>The report notes some students incorrectly translated to the left and down — the result of subtracting the wrong way round, moving <Katex tex="g" /> onto <Katex tex="h" /> instead of <Katex tex="h" /> onto <Katex tex="g" />. Others gave <Katex tex="\tfrac{81}{16}" /> for the vertical translation, forgetting that <Katex tex="h" />'s maximum already sits at height 4, not on the axis.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{translate } \tfrac12 \text{ unit right and } \tfrac{17}{16} \text{ units up}}" />,
    reason: <>An exact value was required — <Katex tex="1.0625" /> is exact, <Katex tex="1.06" /> is not.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}g: \text{ minima at } (-1,0) \text{ and } (2,0) \\ \text{separation } 3\end{gathered}" />,
    reason: <>From part c.ii.: <Katex tex="g" />'s repeated roots are its minima, on the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}h: \text{ minima at } x = \pm\sqrt{\tfrac52} = \pm\tfrac{\sqrt{10}}{2} \\ \text{separation } \sqrt{10}\end{gathered}" />,
    reason: <>From part d.i. Translations can't change this gap; a dilation from the <Katex tex="y" />-axis is what makes <Katex tex="\sqrt{10}" /> into 3.</>,
  },
  {
    working: <Katex display tex="\text{dilation factor} = \frac{3}{\sqrt{10}} = \frac{3\sqrt{10}}{10} \ \text{ from the } y\text{-axis}" />,
    reason: <>Factor = new gap ÷ old gap. It is just under 1 (about 0.95), a slight squeeze towards the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{minima move to } x = \pm\frac{3}{\sqrt{10}}\cdot\frac{\sqrt{10}}{2} = \pm\tfrac32, \\ y = h\!\left(\pm\tfrac{\sqrt{10}}{2}\right) = -\tfrac94\end{gathered}" />,
    reason: <>The dilation multiplies <Katex tex="x" />-coordinates and leaves heights alone. Height from <Katex tex="\left(x^2-1\right)\left(x^2-4\right)" /> with <Katex tex="x^2=\tfrac52" />: <Katex tex="\tfrac32\times\left(-\tfrac32\right)=-\tfrac94" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\pm\tfrac32 \to -1 \text{ and } 2: \ \text{ right } \tfrac12; \\ -\tfrac94 \to 0: \ \text{ up } \tfrac94\end{gathered}" />,
    reason: <>The gap is now right, so translate: the midpoint moves from 0 to <Katex tex="\tfrac12" />, and the height from <Katex tex="-\tfrac94" /> to 0.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{dilate by } \tfrac{3\sqrt{10}}{10} \text{ from the } y\text{-axis,} \\ \text{then } \tfrac12 \text{ right and } \tfrac94 \text{ up}\end{gathered}}" />,
    reason: <>Order matters: dilate <em>before</em> the <Katex tex="\tfrac12" /> right translation. A dilation from the <Katex tex="y" />-axis would also shrink any horizontal shift made before it. The <Katex tex="\tfrac94" /> up can go anywhere.</>,
    more: <>Translate <Katex tex="\tfrac12" /> right first and the dilation shrinks that shift to <Katex tex="\tfrac{3}{\sqrt{10}}\cdot\tfrac12" />, missing the target. That is why the report says the other transformations had to be in the correct order. The report also accepts the reverse order with a different shift: translate <Katex tex="\tfrac{\sqrt{10}}{6}" /> units right, then dilate by <Katex tex="\tfrac{3}{\sqrt{10}}" />, since <Katex tex="\tfrac{\sqrt{10}}{6}\cdot\tfrac{3}{\sqrt{10}}=\tfrac12" />. The vertical translation is free because a dilation from the <Katex tex="y" />-axis never changes heights.</>,
  },
]

export default function MethodsQ1_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (12 marks)</p>
        <p>
          Consider the function <Katex tex="f:R\to R" />,{' '}
          <Katex tex="f(x)=(x+1)(x+a)(x-2)(x-2a)" /> where <Katex tex="a\in R" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts a. and b. are about <em>distinct</em> roots. The four bracket-roots{' '}
              <Katex tex="-1,\,-a,\,2,\,2a" /> are a list, not a set: whenever two of them are
              equal the quartic loses an intercept.
            </p>
            <p>
              Parts c. and d. both turn on the same hidden symmetry. Writing{' '}
              <Katex tex="g(x)=\left[(x+1)(x-2)\right]^2=\left(x^2-x-2\right)^2" /> shows that{' '}
              <Katex tex="g" /> is a perfect square, and completing the square inside puts its
              axis of symmetry at <Katex tex="x=\tfrac12" />. That explains why the local maximum
              sits at <Katex tex="x=\tfrac12" />, and it gives the tangent intersection in part
              c.iv. directly.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Solve Equation"
        marks={1}
        statement={
          <>
            State, in terms of <Katex tex="a" /> where required, the values of{' '}
            <Katex tex="x" /> for which <Katex tex="f(x)=0" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Find the values of <Katex tex="a" /> for which the graph of{' '}
          <Katex tex="y=f(x)" /> has
        </p>
      </div>

      <PartCard letter="b.i" topic="Intercepts" marks={2} statement={<>exactly three <Katex tex="x" />-intercepts.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" topic="Intercepts" marks={1} statement={<>exactly four <Katex tex="x" />-intercepts.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          Let <Katex tex="g" /> be the function <Katex tex="g:R\to R" />,{' '}
          <Katex tex="g(x)=(x+1)^2(x-2)^2" />,
          <br />
          which is the function <Katex tex="f" /> where <Katex tex="a=1" />.
        </p>
      </div>

      <PartCard letter="c.i" topic="Derivative" marks={1} statement={<>Find <Katex tex="g'(x)" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Local Maximum"
        marks={1}
        statement={<>Find the coordinates of the local maximum of <Katex tex="g" />.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Increasing Interval"
        marks={1}
        statement={<>Find the values of <Katex tex="x" /> for which <Katex tex="g'(x)>0" />.</>}
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <PartCard
        letter="c.iv"
        topic="Tangent Lines"
        marks={2}
        statement={
          <>
            Consider the two tangent lines to the graph of <Katex tex="y=g(x)" /> at the points
            where
            <br />
            <Katex tex="x=\dfrac{-\sqrt3+1}{2}" /> and <Katex tex="x=\dfrac{\sqrt3+1}{2}" />.
            <br />
            Determine the coordinates of the point of intersection of these two tangent lines.
          </>
        }
        examinerReport={EXAM_CIV}
      >
        <WorkingTable rows={ROWS_CIV} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          Let <Katex tex="g" /> remain as the function <Katex tex="g:R\to R" />,{' '}
          <Katex tex="g(x)=(x+1)^2(x-2)^2" />,
          <br />
          which is the function <Katex tex="f" /> where <Katex tex="a=1" />.
        </p>
        <p>
          Let <Katex tex="h" /> be the function <Katex tex="h:R\to R" />,{' '}
          <Katex tex="h(x)=(x+1)(x-1)(x+2)(x-2)" />,
          <br />
          which is the function <Katex tex="f" /> where <Katex tex="a=-1" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Transformations"
        marks={1}
        statement={
          <>
            Using translations only, describe a sequence of transformations of{' '}
            <Katex tex="h" />, for which its image would have a local maximum at the same
            coordinates as that of <Katex tex="g" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Transformations"
        marks={2}
        statement={
          <>
            Using a dilation and translations, describe a different sequence of transformations
            of <Katex tex="h" />, for which its image would have both local minimums at the
            same coordinates as that of <Katex tex="g" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
