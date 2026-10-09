// 2018 Mathematical Methods — Exam 1, Question 9 (8 marks). A parameterised definite integral
// of x sin(x) over consecutive π-intervals, a tangent, a translation, then a shaded area built
// from two tangent lines. Question text transcribed from the original paper; both figures are
// cropped directly from the original VCAA exam PDF, not redrawings.
//
// Part (d) is worth reading the cross-check note on. A first pass computed the area as the
// region between each tangent and its curve over the whole domain, giving 9π² − 6π. That is
// wrong: the shaded region is the triangle *minus* the three lens-shaped lobes enclosed
// between f and g, which is 9π² − 18π. The VCAA report's value is 9π² − 18π and an
// independent piecewise integration in sympy agrees with it.
//
// Part (c) writes its transformation in column-vector form, but the matrix is the identity,
// so T is a plain translation and the part is ordinary transformation work (guide §13.7 —
// judge the mathematics, not the vocabulary). Solution is original.
//
// Interactives: a.i — each hump of x sin(x) has area (2n+1)π, and a sine hump of height
// (n + ½)π balances it exactly; a.ii — the antiderivative at kπ lands on y = ±x, so the integral
// jumps between the two lines, up for even n and down for odd n (toggle: a.i's cosines kept);
// b — slide the point of contact, the intercept is −t²cos(t), so the tangent passes through O
// exactly where the curve touches y = ±x; c — slide the translation a onto the target (a = −3π
// shown failing); d — triangle minus lenses in steps, with the ∫(l₁ − f) double count as a
// toggle. Common Mistake boxes: a.i (substituting a value of n — report; writing the even
// integer as 2n — no source, a forum thread reported it), a.ii (keeping a.i's cosines — report),
// c (−3π — report), d (∫(l₁ − f), no source). All wrong values checked in sympy.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import curveSrc from './meth-2018e1-q9-xsinx.png'
import tangentsSrc from './meth-2018e1-q9d-tangents.png'

const HumpWidget = lazyWidget(() => import('../interactives/meth-2018e1-q9ai-hump'))
const EndpointsWidget = lazyWidget(() => import('../interactives/meth-2018e1-q9aii-endpoints'))
const TangentWidget = lazyWidget(() => import('../interactives/meth-2018e1-q9b-tangent'))
const TranslateWidget = lazyWidget(() => import('../interactives/meth-2018e1-q9c-translate'))
const LensesWidget = lazyWidget(() => import('../interactives/meth-2018e1-q9d-lenses'))

const EXAM_AI: SAExaminerStats = {
  marks: [55, 27, 17],
  average: 0.6,
  comment: (
    <>
      Students in general seemed to find dealing with the parameter <Katex tex="n" />{' '}
      difficult. Many tried substituting a value of <Katex tex="n" />, rather than using{' '}
      <Katex tex="n" />, thus resulting in a specific solution rather than the general
      solution required by the problem. Quite a few students included <Katex tex="+c" /> in
      the definite integral, which then appeared to cause them some confusion.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [81, 19],
  average: 0.2,
  comment: (
    <>
      This question was not well attempted. Students generally did not relate this question to
      the previous question, with many overlooking the fact that the cosine of a positive even
      integer multiple of <Katex tex="\pi" /> was equivalent to the negative of an odd
      positive integer multiple of <Katex tex="\pi" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 21, 39],
  average: 1.0,
  comment: (
    <>
      This question was answered well. Students who had difficulty were those who could not
      successfully differentiate or who substituted incorrectly.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [66, 34],
  average: 0.4,
  comment: <>Many students answered this well. <Katex tex="-3\pi" /> was a common incorrect answer.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [89, 6, 4],
  average: 0.2,
  comment: (
    <>
      Many students had difficulty with this question. Students who recognised that the graph for this question was simply a
      combination of translations and reflections of an earlier simpler graph were able to use
      symmetry to determine the areas under the curves. Some students were able to see that
      the shaded area was simply the areas under the curves subtracted from the area of two
      triangles. Students who determined the equation of the tangents to find the area between
      those tangents and the curve were rarely successful. While a valid method, students who
      chose this approach had lengthy calculations.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{n\pi}^{(n+1)\pi}\! x\sin(x)\,dx = \Bigl[\sin(x)-x\cos(x)\Bigr]_{n\pi}^{(n+1)\pi}" />,
    reason: <>The antiderivative is handed to you. Do not carry a <Katex tex="+c" /> into a <em>definite</em> integral — it cancels, and the report notes it caused confusion.</>,
  },
  {
    working: <Katex display tex="\sin(k\pi) = 0 \ \text{ for every integer } k" />,
    reason: <>Both sine terms vanish, so only the cosine terms survive. This is why the answer comes out so clean.</>,
  },
  {
    working: <Katex display tex="= -(n+1)\pi\cos\bigl((n+1)\pi\bigr) + n\pi\cos(n\pi)" />,
    reason: <>What is left after the sines go. Keep <Katex tex="(n+1)\pi" /> and <Katex tex="n\pi" /> exactly as they are — the next step only needs to know which kind of multiple of <Katex tex="\pi" /> each one is.</>,
  },
  {
    working: <Katex display tex="n \text{ even} \implies \cos(n\pi) = 1, \quad \cos\bigl((n+1)\pi\bigr) = -1" />,
    reason: <>Consecutive integer multiples of <Katex tex="\pi" /> always give opposite cosines: <Katex tex="+1" /> at even multiples, <Katex tex="-1" /> at odd ones. Keeping <Katex tex="n" /> as a letter is the whole point — the report says many students substituted a value instead and produced a specific solution rather than the general one.</>,
  },
  {
    working: <Katex display tex="= -(n+1)\pi(-1) + n\pi(1) = (n+1)\pi + n\pi" />,
    reason: <>Both terms come out positive: the minus sign in front of <Katex tex="(n+1)\pi" /> meets <Katex tex="\cos\bigl((n+1)\pi\bigr)=-1" />, and the two minuses cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{(2n+1)\pi}" />,
    reason: <>Check against the figure: for <Katex tex="n=0" /> this gives <Katex tex="\pi" />, the area of the small first hump on <Katex tex="[0,\pi]" />, and the humps grow steadily as <Katex tex="x" /> increases — which is what the graph shows.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="n \text{ odd} \implies \cos(n\pi) = -1, \quad \cos\bigl((n+1)\pi\bigr) = 1" />,
    reason: <>Exactly the previous case with both cosines swapped, because <Katex tex="n" /> and <Katex tex="n+1" /> have traded parity.</>,
  },
  {
    working: <Katex display tex="= -(n+1)\pi(1) + n\pi(-1) = -(n+1)\pi - n\pi" />,
    reason: <>Now both terms come out negative.</>,
  },
  {
    working: <Katex display tex="\boxed{-(2n+1)\pi}" />,
    reason: <>The same magnitude as part a.i. with the sign reversed — only <Katex tex="19\%" /> of students scored this mark. It makes sense from the figure: on an odd interval the curve lies <em>below</em> the axis, so the signed area is negative. Recognising that part a.ii. is part a.i. with one sign flipped is the intended one-line answer.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="y = x\sin(x) \implies \frac{dy}{dx} = \sin(x) + x\cos(x)" />,
    reason: <>Product rule.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(-\frac{5\pi}{2}\right) = -1, \qquad \cos\!\left(-\frac{5\pi}{2}\right) = 0" />,
    reason: <><Katex tex="-\tfrac{5\pi}{2} = -2\pi-\tfrac{\pi}{2}" />, which lands in the same place on the unit circle as <Katex tex="-\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="m = -1 + \left(-\frac{5\pi}{2}\right)(0) = -1" />,
    reason: <>The <Katex tex="x\cos(x)" /> term dies, leaving a gradient of exactly <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="y - \frac{5\pi}{2} = -1\left(x+\frac{5\pi}{2}\right)" />,
    reason: <>Point–gradient form through the given point.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -x}" />,
    reason: <>The two <Katex tex="\tfrac{5\pi}{2}" /> terms cancel exactly. A tangent through the origin is a striking result, and worth checking the given point satisfies it: <Katex tex="-\left(-\tfrac{5\pi}{2}\right)=\tfrac{5\pi}{2}" /> ✓. It is no accident. Because <Katex tex="\left|\sin(x)\right|\le1" />, the graph is trapped between the lines <Katex tex="y=x" /> and <Katex tex="y=-x" />, and at <Katex tex="x=-\tfrac{5\pi}{2}" />, where <Katex tex="\sin(x)=-1" />, it just touches <Katex tex="y=-x" />. A line the curve touches without crossing is its tangent.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x' = x + a, \qquad y' = y" />,
    reason: <>Read the column-vector statement one row at a time. Nothing is multiplied, so <Katex tex="T" /> adds <Katex tex="a" /> to every <Katex tex="x" />-coordinate and leaves <Katex tex="y" /> alone: a horizontal translation by <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="x = x'-a, \quad y = y'" />,
    reason: <>To find the image's equation, make the old coordinates the subject. This is the step that decides the sign: the rule uses <Katex tex="x'-a" />, not <Katex tex="x'+a" />.</>,
  },
  {
    working: <Katex display tex="y' = (x'-a)\sin(x'-a)" />,
    reason: <>Substitute into <Katex tex="y=x\sin(x)" />. Dropping the dashes, the image is <Katex tex="y=(x-a)\sin(x-a)" />.</>,
  },
  {
    working: <Katex display tex="(x-a)\sin(x-a) = (3\pi-x)\sin(x)" />,
    reason: <>This must match the target rule for every <Katex tex="x" />. How would I know what to try? The target's first factor is <Katex tex="3\pi-x=-(x-3\pi)" />, which looks like <Katex tex="x-a" /> with <Katex tex="a=3\pi" /> apart from a stray minus sign. So try <Katex tex="a=3\pi" /> and see whether the sine supplies that minus.</>,
  },
  {
    working: <Katex display tex="a = 3\pi: \ (x-3\pi)\sin(x-3\pi)" />,
    reason: <>Substitute the candidate.</>,
  },
  {
    working: <Katex display tex="= (x-3\pi)\bigl(-\sin(x)\bigr) = (3\pi-x)\sin(x) \ \checkmark" />,
    reason: <>Shifting a sine by an odd multiple of <Katex tex="\pi" /> flips its sign, <Katex tex="\sin(x-3\pi)=-\sin(x)" />, and that flip is exactly what turns <Katex tex="(x-3\pi)" /> into <Katex tex="(3\pi-x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 3\pi}" />,
    reason: <>Positive: the graph moves to the <em>right</em>. Picture check: <Katex tex="y=x\sin(x)" /> touches the <Katex tex="x" />-axis at the origin (both factors are zero there), and the target touches it at <Katex tex="x=3\pi" /> (both <Katex tex="3\pi-x" /> and <Katex tex="\sin(x)" /> are zero), so the origin has moved <Katex tex="3\pi" /> right. The report names <Katex tex="-3\pi" /> as a common incorrect answer.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Shaded} = \text{triangle} - \text{three lenses}" />,
    reason: <>Read the shading carefully before computing anything. The grey region is the <em>whole triangle</em> with three white lens shapes cut out of it — each lens being a region enclosed between <Katex tex="f" /> and <Katex tex="g" />. So the answer is a triangle area minus lobe areas, not an area between a tangent and a curve.</>,
  },
  {
    working: <Katex display tex="f'(x) = -\sin(x)+(3\pi-x)\cos(x), \quad f'\!\left(\tfrac{\pi}{2}\right) = -1" />,
    reason: <>Product rule, then <Katex tex="\sin\left(\tfrac{\pi}{2}\right)=1" /> and <Katex tex="\cos\left(\tfrac{\pi}{2}\right)=0" />. The same gradient as part b., because this curve <em>is</em> part b.'s curve translated by part c.'s <Katex tex="T" /> — so <Katex tex="l_1" /> is part b.'s tangent <Katex tex="y=-x" /> translated <Katex tex="3\pi" /> to the right.</>,
  },
  {
    working: <Katex display tex="l_1: \ y = 3\pi - x, \qquad l_2: \ y = x - 3\pi" />,
    reason: <><Katex tex="l_1" /> through <Katex tex="\left(\tfrac{\pi}{2},\tfrac{5\pi}{2}\right)" /> with gradient <Katex tex="-1" />; <Katex tex="g=-f" />, so <Katex tex="l_2" /> is <Katex tex="l_1" /> reflected in the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\text{Vertices: } (0,3\pi),\ (0,-3\pi),\ (3\pi,0)" />,
    reason: <>The two tangents meet the <Katex tex="y" />-axis at <Katex tex="\pm3\pi" /> and cross each other at <Katex tex="(3\pi,0)" />.</>,
  },
  {
    working: <Katex display tex="\text{Triangle} = \frac12\times 6\pi\times 3\pi = 9\pi^2" />,
    reason: <>Base <Katex tex="6\pi" /> along the <Katex tex="y" />-axis, perpendicular height <Katex tex="3\pi" />.</>,
  },
  {
    working: <Katex display tex="\int_0^{\pi}\! f = 5\pi, \quad \int_{\pi}^{2\pi}\! f = -3\pi, \quad \int_{2\pi}^{3\pi}\! f = \pi" />,
    reason: <>These are part a. in disguise: <Katex tex="f(x)=(3\pi-x)\sin(x)" /> is the reflected, shifted version of <Katex tex="x\sin(x)" />, so its humps have the same sizes running the other way. This is the symmetry the report says successful students exploited.</>,
  },
  {
    working: <Katex display tex="\int_0^{3\pi}\!\left|f\right| = 5\pi+3\pi+\pi = 9\pi" />,
    reason: <>Take magnitudes: each hump contributes its own area regardless of sign.</>,
  },
  {
    working: <Katex display tex="\text{Lobes} = \int_0^{3\pi}\!\left|f-g\right| = 2\int_0^{3\pi}\!\left|f\right| = 18\pi" />,
    reason: <>Since <Katex tex="g=-f" />, the gap between the two curves is <Katex tex="2\left|f\right|" /> everywhere — the three lenses are each symmetric about the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Shaded} = 9\pi^2 - 18\pi = 9\pi(\pi-2)}" />,
    reason: <>Triangle minus lenses. (<Katex tex="\approx32.3" /> square units — about a third of the triangle's <Katex tex="9\pi^2\approx88.8" />, which matches how much grey the figure shows.) Only <Katex tex="4\%" /> of students scored both marks; the report says students who found the area between each tangent and the curve directly, while using a valid method, had lengthy calculations and were rarely successful.</>,
  },
]

export default function MethodsQ9_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (8 marks)</p>
        <p className="mb-3">
          Consider a part of the graph of <Katex tex="y=x\sin(x)" />, as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={curveSrc} alt="Graph of y = x sin(x) from −5π to 5π: humps of growing amplitude either side of the origin, symmetric about the y-axis, from the original 2018 VCAA exam paper" className="w-full max-w-[460px]" />
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Definite Integral"
        marks={2}
        statement={<>Given that <Katex tex="\int\bigl(x\sin(x)\bigr)dx = \sin(x)-x\cos(x)+c" />, evaluate <Katex tex="\int_{n\pi}^{(n+1)\pi}\bigl(x\sin(x)\bigr)dx" /> when <Katex tex="n" /> is a positive <b>even</b> integer or <Katex tex="0" />. Give your answer in simplest form.</>}
        examinerReport={EXAM_AI}
      >
        <Background>
          <p>
            The only thing that makes this hard is that <Katex tex="n" /> stays a letter. Keep
            it that way: substituting <Katex tex="n=2" /> gives you one number, not the rule
            the question asks for, and the report says many students substituted a value of{' '}
            <Katex tex="n" /> and ended up with a specific solution.
          </p>
          <p>
            Two facts do all the work. <Katex tex="\sin(k\pi)=0" /> for every integer{' '}
            <Katex tex="k" />, which kills half the expression, and{' '}
            <Katex tex="\cos(k\pi)=(-1)^k" />, which alternates. Because{' '}
            <Katex tex="n" /> and <Katex tex="n+1" /> always have opposite parity, the two
            cosine terms always have opposite signs — and that is what makes the two
            contributions add rather than cancel.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <Explore title="Why each hump has area (2n + 1)π">
          <HumpWidget />
        </Explore>
        <WrongMethod
          title="Pick an even value, say n = 2, and evaluate that integral"
          source="Examiner's report"
          working={<Katex display tex="\int_{2\pi}^{3\pi}\! x\sin(x)\,dx = 5\pi" />}
        >
          <Katex tex="5\pi" /> is correct for <Katex tex="n=2" />, but it is one hump, not the rule. The
          question says &ldquo;when <Katex tex="n" /> is a positive even integer or 0&rdquo;, so the
          answer has to work for every such <Katex tex="n" /> at once, which means it must still contain{' '}
          <Katex tex="n" />. Use a substituted value the other way round, as a check:{' '}
          <Katex tex="(2n+1)\pi" /> gives <Katex tex="\pi" /> for <Katex tex="n=0" /> and{' '}
          <Katex tex="5\pi" /> for <Katex tex="n=2" />, matching the humps in the widget.
        </WrongMethod>
        <WrongMethod
          title="n is even, so write it as 2n before integrating"
          working={<Katex display tex="\int_{2n\pi}^{(2n+1)\pi}\! x\sin(x)\,dx = (4n+1)\pi" />}
        >
          The letter <Katex tex="n" /> already <em>is</em> the even integer, so renaming it{' '}
          <Katex tex="2n" /> quietly changes the question: this <Katex tex="n" /> is half of the
          question&apos;s <Katex tex="n" />. The answer <Katex tex="(4n+1)\pi" /> is right for the new
          letter and wrong for the question&apos;s. Use the fact that <Katex tex="n" /> is even directly:{' '}
          <Katex tex="\cos(n\pi)=1" /> and <Katex tex="\cos\bigl((n+1)\pi\bigr)=-1" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Definite Integral"
        marks={1}
        statement={<>Given that <Katex tex="\int\bigl(x\sin(x)\bigr)dx = \sin(x)-x\cos(x)+c" />, evaluate <Katex tex="\int_{n\pi}^{(n+1)\pi}\bigl(x\sin(x)\bigr)dx" /> when <Katex tex="n" /> is a positive <b>odd</b> integer. Give your answer in simplest form.</>}
        examinerReport={EXAM_AII}
      >
        <Background>
          <p>
            The report&apos;s diagnosis is that students did not relate this part to part a.i. The
            working is identical line for line; the only thing that changes is which cosine is{' '}
            <Katex tex="+1" /> and which is <Katex tex="-1" />. Odd multiples of{' '}
            <Katex tex="\pi" /> sit at <Katex tex="(-1,0)" /> on the unit circle and even multiples at{' '}
            <Katex tex="(1,0)" />, so when <Katex tex="n" /> is odd, <Katex tex="\cos(n\pi)=-1" /> and{' '}
            <Katex tex="\cos\bigl((n+1)\pi\bigr)=1" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <Explore title="Why the sign flips when n is odd">
          <EndpointsWidget />
        </Explore>
        <WrongMethod
          title="Same working as a.i, same cosines, so the answer is (2n + 1)π again"
          source="Examiner's report"
          working={<Katex display tex="-(n+1)\pi(-1) + n\pi(1) = (2n+1)\pi" />}
        >
          <Katex tex="\cos(n\pi)=1" /> and <Katex tex="\cos\bigl((n+1)\pi\bigr)=-1" /> are only true for
          even <Katex tex="n" />. For odd <Katex tex="n" /> they swap, which is the fact the report says
          many students overlooked. Catch it with the figure: the hump from <Katex tex="\pi" /> to{' '}
          <Katex tex="2\pi" /> (<Katex tex="n=1" />) lies <em>below</em> the <Katex tex="x" />-axis, so
          its integral must be negative, and <Katex tex="(2n+1)\pi" /> never is.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Tangent Line"
        marks={2}
        statement={<>Find the equation of the tangent to <Katex tex="y=x\sin(x)" /> at the point <Katex tex="\left(-\dfrac{5\pi}{2},\ \dfrac{5\pi}{2}\right)" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why this tangent passes through the origin">
          <TangentWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c"
        topic="Translation"
        marks={1}
        statement={<>The translation <Katex tex="T" /> maps the graph of <Katex tex="y=x\sin(x)" /> onto the graph of <Katex tex="y=(3\pi-x)\sin(x)" />, where <Katex tex="T:R^2\to R^2,\ T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}a\\0\end{bmatrix}" /> and <Katex tex="a" /> is a real constant. State the value of <Katex tex="a" />.</>}
        examinerReport={EXAM_C}
      >
        <Background>
          <p>
            The column-vector notation looks like matrix work, but the matrix here is the
            identity — nothing is being multiplied. <Katex tex="T" /> adds <Katex tex="a" /> to
            every <Katex tex="x" /> and leaves <Katex tex="y" /> alone, which is the definition
            of a horizontal translation.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="A positive a moves the graph right, onto the target at a = 3π">
          <TranslateWidget />
        </Explore>
        <WrongMethod
          title="Replace x with x + a and match it to the target"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&(x+a)\sin(x+a) = (3\pi-x)\sin(x)\\ &\implies a = -3\pi\end{aligned}" />}
        >
          The algebra matches, but the substitution runs the wrong way. <Katex tex="T" /> sends a point{' '}
          <Katex tex="(x,y)" /> to <Katex tex="(x+a,\,y)" />, so the image equation comes from replacing{' '}
          <Katex tex="x" /> with <Katex tex="x-a" />; using <Katex tex="x+a" /> flips the sign of{' '}
          <Katex tex="a" />. Catch it by moving one point: <Katex tex="\left(\tfrac{\pi}{2},\tfrac{\pi}{2}\right)" />{' '}
          is on <Katex tex="y=x\sin(x)" />. With <Katex tex="a=-3\pi" /> it goes to{' '}
          <Katex tex="\left(-\tfrac{5\pi}{2},\tfrac{\pi}{2}\right)" />, but the target there gives{' '}
          <Katex tex="\tfrac{11\pi}{2}\sin\left(-\tfrac{5\pi}{2}\right)=-\tfrac{11\pi}{2}" />. With{' '}
          <Katex tex="a=3\pi" /> it goes to <Katex tex="\left(\tfrac{7\pi}{2},\tfrac{\pi}{2}\right)" />, and{' '}
          <Katex tex="\left(-\tfrac{\pi}{2}\right)\sin\left(\tfrac{7\pi}{2}\right)=\tfrac{\pi}{2}" /> ✓.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Shaded Area"
        marks={2}
        statement={
          <>
            Let <Katex tex="f:[0,3\pi]\to R,\ f(x)=(3\pi-x)\sin(x)" /> and{' '}
            <Katex tex="g:[0,3\pi]\to R,\ g(x)=(x-3\pi)\sin(x)" />. The line{' '}
            <Katex tex="l_1" /> is the tangent to the graph of <Katex tex="f" /> at the point{' '}
            <Katex tex="\left(\dfrac{\pi}{2},\dfrac{5\pi}{2}\right)" /> and the line{' '}
            <Katex tex="l_2" /> is the tangent to the graph of <Katex tex="g" /> at{' '}
            <Katex tex="\left(\dfrac{\pi}{2},-\dfrac{5\pi}{2}\right)" />, as shown in the
            diagram below.
            <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async" src={tangentsSrc} alt="The curves f and g on [0, 3π] between the tangent lines l1 and l2, which form a triangle with the y-axis; the regions inside the triangle outside the three lens shapes enclosed by f and g are shaded — from the original 2018 VCAA exam paper" className="w-full max-w-[300px]" />
            </div>
            Find the total area of the shaded regions shown in the diagram above.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background>
          <p>
            Jointly the hardest part on the paper with 8b. — <Katex tex="89\%" /> scored zero.
            The trap is reaching straight for{' '}
            <Katex tex="\int(\text{tangent}-\text{curve})" />; the report says that route,
            while valid, involved lengthy calculations and was rarely successful.
          </p>
          <p>
            Look at what is actually shaded instead. The two tangents and the{' '}
            <Katex tex="y" />-axis bound a triangle, and everything in it is grey <em>except</em>{' '}
            three lens-shaped holes where the two curves enclose a region between them. So:
            triangle, minus lenses. The triangle is elementary, and the lenses are part a.'s
            integrals reused, because <Katex tex="f" /> is nothing but the original{' '}
            <Katex tex="x\sin(x)" /> translated and reflected.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="The shaded area is a triangle with part a.'s humps cut out">
          <LensesWidget />
        </Explore>
        <WrongMethod
          title="The grey is between l₁ and f, so integrate l₁ − f from 0 to 3π and double it"
          working={<Katex display tex="2\int_0^{3\pi}\!\bigl((3\pi-x)-f(x)\bigr)dx = 9\pi^2-6\pi" />}
        >
          On <Katex tex="[\pi,2\pi]" /> the curve <Katex tex="f" /> dips below the axis and becomes the{' '}
          <em>lower</em> edge of the middle lens, so <Katex tex="l_1-f" /> measures straight through the
          unshaded middle lens, and the doubled copy measures through it again. The upper grey region's lower
          edge is always the higher of <Katex tex="f" /> and <Katex tex="g" />, which is{' '}
          <Katex tex="\left|f\right|" />, not <Katex tex="f" />. Done
          directly, it is <Katex tex="2\int_0^{3\pi}\bigl(l_1-\left|f\right|\bigr)dx" />, split at{' '}
          <Katex tex="\pi" /> and <Katex tex="2\pi" /> — the lengthy route the report warns about. Step
          5 of the widget shades the double count.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
