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

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import curveSrc from './meth-2018e1-q9-xsinx.png'
import tangentsSrc from './meth-2018e1-q9d-tangents.png'

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
    reason: <>What is left after the sines go.</>,
  },
  {
    working: <Katex display tex="n \text{ even} \implies \cos(n\pi) = 1, \quad \cos\bigl((n+1)\pi\bigr) = -1" />,
    reason: <>Consecutive integer multiples of <Katex tex="\pi" /> always give opposite cosines: <Katex tex="+1" /> at even multiples, <Katex tex="-1" /> at odd ones. Keeping <Katex tex="n" /> as a letter is the whole point — the report says many students substituted a value instead and produced a specific solution rather than the general one.</>,
  },
  {
    working: <Katex display tex="= -(n+1)\pi(-1) + n\pi(1) = (n+1)\pi + n\pi" />,
    reason: <>Both terms come out positive.</>,
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
    reason: <>The two <Katex tex="\tfrac{5\pi}{2}" /> terms cancel exactly. A tangent through the origin is a striking result, and worth checking the given point satisfies it: <Katex tex="-\left(-\tfrac{5\pi}{2}\right)=\tfrac{5\pi}{2}" /> ✓.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}x\\y\end{bmatrix} + \begin{bmatrix}a\\0\end{bmatrix} \implies \begin{cases} x' = x+a \\ y' = y \end{cases}" />,
    reason: <>Read the column-vector statement one row at a time. Nothing is multiplied, so <Katex tex="T" /> is a horizontal translation by <Katex tex="a" /> and nothing else.</>,
  },
  {
    working: <Katex display tex="x = x'-a, \quad y = y' \implies y' = (x'-a)\sin(x'-a)" />,
    reason: <>Substituting the inverse relation into <Katex tex="y=x\sin(x)" /> gives the equation of the image curve.</>,
  },
  {
    working: <Katex display tex="(x-a)\sin(x-a) = (3\pi-x)\sin(x)" />,
    reason: <>This must match the target rule for every <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="a = 3\pi: \ \sin(x-3\pi) = -\sin(x) \implies (x-3\pi)\bigl(-\sin(x)\bigr) = (3\pi-x)\sin(x) \ \checkmark" />,
    reason: <>Shifting a sine by an odd multiple of <Katex tex="\pi" /> flips its sign, and that flip is exactly what converts <Katex tex="(x-3\pi)" /> into <Katex tex="(3\pi-x)" />. Both sign changes have to happen together, which is what pins <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 3\pi}" />,
    reason: <>Positive: the graph moves to the <em>right</em>. The report names <Katex tex="-3\pi" /> as a common incorrect answer — the sign inside the bracket is not the sign of the translation.</>,
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
    reason: <>Triangle minus lenses. (<Katex tex="\approx32.3" /> square units — about a third of the triangle's <Katex tex="9\pi^2\approx88.8" />, which matches how much white the figure shows.) Only <Katex tex="4\%" /> of students scored both marks; the report says students who found the area between each tangent and the curve directly, while using a valid method, had lengthy calculations and were rarely successful.</>,
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
          <img src={curveSrc} alt="Graph of y = x sin(x) from −5π to 5π: humps of growing amplitude either side of the origin, symmetric about the y-axis, from the original 2018 VCAA exam paper" className="w-full max-w-[460px]" />
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
            the question asks for, and the report says many students did exactly that.
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
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Definite Integral"
        marks={1}
        statement={<>Given that <Katex tex="\int\bigl(x\sin(x)\bigr)dx = \sin(x)-x\cos(x)+c" />, evaluate <Katex tex="\int_{n\pi}^{(n+1)\pi}\bigl(x\sin(x)\bigr)dx" /> when <Katex tex="n" /> is a positive <b>odd</b> integer. Give your answer in simplest form.</>}
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Tangent Line"
        marks={2}
        statement={<>Find the equation of the tangent to <Katex tex="y=x\sin(x)" /> at the point <Katex tex="\left(-\dfrac{5\pi}{2},\ \dfrac{5\pi}{2}\right)" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
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
              <img src={tangentsSrc} alt="The curves f and g on [0, 3π] between the tangent lines l1 and l2, which form a triangle with the y-axis; the regions inside the triangle outside the three lens shapes enclosed by f and g are shaded — from the original 2018 VCAA exam paper" className="w-full max-w-[300px]" />
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
      </PartCard>
    </div>
  )
}
