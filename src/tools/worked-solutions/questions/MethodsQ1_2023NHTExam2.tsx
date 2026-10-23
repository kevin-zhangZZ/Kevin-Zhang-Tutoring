// 2023 Mathematical Methods NHT — Exam 2, Section B Question 1 (16 marks). The NHT report gives
// sample answers only, with no statistics. The quadratic g(x) = (x + 2)² − 1: expanded and
// factorised forms, translations through the origin, a dilation, then a linear h(x) = mx + n
// added to it (turning point on each axis), multiplied by it (exactly two x-intercepts) and
// composed with it (turning point of g(h(x))). Question text transcribed from the original paper
// (no diagram). Answers checked with sympy and against the VCAA report's sample answers:
// a. x² + 4x + 3; b. p = −1, q = −3 (or swapped); c. k = −3; d. d = 1 or 3; e. dilation by
// factor 1/3 from the y-axis; f. m = −4; g. n = (m² + 8m + 4)/4; h. any pair with n = m or
// n = 3m (m ≠ 0), or m = 0 with n ≠ 0 — the report lists m = 1, n = 1; m = 1, n = 3; and
// m = 0, n ∈ R\{0}; i. (−(n + 2)/m, −1). The WrongMethod in h. is a verified slip, not taken
// from the report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = (x+2)^2 - 1 = x^2 + 4x + 4 - 1" />,
    reason: <>Expand the square: <Katex tex="(x+2)^2 = x^2 + 2(2)(x) + 2^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x) = x^2 + 4x + 3}" />,
    reason: <>So <Katex tex="a=1" />, <Katex tex="b=4" />, <Katex tex="c=3" />.</>,
    more: <>Check at <Katex tex="x=0" />: the original form gives <Katex tex="2^2-1=3" />, the expanded form gives 3.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = x^2 + 4x + 3 = (x+1)(x+3)" />,
    reason: <>Factorise the expanded form from part a.: two numbers that multiply to 3 and add to 4 are 1 and 3.</>,
    more: <>Or treat <Katex tex="(x+2)^2-1" /> as a difference of two squares: <Katex tex="(x+2-1)(x+2+1)" />.</>,
  },
  {
    working: <Katex display tex="(x+1)(x+3) = \big(x-(-1)\big)\big(x-(-3)\big)" />,
    reason: <>Match the form <Katex tex="(x-p)(x-q)" />: the signs flip, so <Katex tex="p" /> and <Katex tex="q" /> are the negatives of 1 and 3.</>,
  },
  {
    working: <Katex display tex="\boxed{p=-1,\ q=-3 \ \ (\text{or } p=-3,\ q=-1)}" />,
    reason: <>Both integers, as required. <Katex tex="p" /> and <Katex tex="q" /> are the <Katex tex="x" />-intercepts of <Katex tex="g" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="g(0) + k = 0" />,
    reason: <>Passing through the origin means the point <Katex tex="(0,0)" /> satisfies <Katex tex="y=g(x)+k" />: substitute <Katex tex="x=0" />, <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="3 + k = 0" />,
    reason: <><Katex tex="g(0)=3" /> from part a.: the <Katex tex="y" />-intercept of <Katex tex="g" /> is 3.</>,
  },
  {
    working: <Katex display tex="\boxed{k=-3}" />,
    reason: <>Adding <Katex tex="k" /> translates the graph vertically. Moving it down 3 brings the <Katex tex="y" />-intercept <Katex tex="(0,3)" /> to the origin.</>,
    more: <>Check: <Katex tex="g(x)-3 = x^2+4x = x(x+4)" />, which is 0 at <Katex tex="x=0" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g(0-d) = 0" />,
    reason: <>The origin lies on <Katex tex="y=g(x-d)" /> when <Katex tex="x=0" /> gives <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="(-d+2)^2 - 1 = 0" />,
    reason: <>Substitute <Katex tex="x=-d" /> into the rule <Katex tex="g(x)=(x+2)^2-1" />.</>,
  },
  {
    working: <Katex display tex="2-d = \pm 1" />,
    reason: <>Add 1 to both sides and take the square root, keeping both signs.</>,
  },
  {
    working: <Katex display tex="\boxed{d=1 \ \text{ or } \ d=3}" />,
    reason: <>The question says &ldquo;using algebra&rdquo;, so the substitution and solving must be shown, not just read off.</>,
    more: <>Check with the picture: <Katex tex="g(x-d)" /> is <Katex tex="g" /> translated <Katex tex="d" /> units right. The <Katex tex="x" />-intercepts of <Katex tex="g" /> are <Katex tex="-1" /> and <Katex tex="-3" /> (part b.), and moving either one to the origin takes a shift of 1 or 3 to the right.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="x \mapsto 3x" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="3x" /> means the new graph reaches each output at one third of the old <Katex tex="x" />-value: if <Katex tex="g(x_0)=y_0" />, then <Katex tex="y=g(3x)" /> takes the value <Katex tex="y_0" /> at <Katex tex="x=\tfrac{x_0}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Dilation by a factor of } \tfrac{1}{3} \text{ from the } y\text{-axis}}" />,
    reason: <>Every point moves to one third of its distance from the <Katex tex="y" />-axis (in the direction of the <Katex tex="x" />-axis); <Katex tex="y" />-values are unchanged.</>,
    more: <>An easy slip is &ldquo;factor 3&rdquo;. A factor inside the bracket acts in reverse: <Katex tex="g(3x)" /> squeezes the graph horizontally. Check with an intercept: <Katex tex="g(-1)=0" />, and <Katex tex="g(3x)=0" /> at <Katex tex="x=-\tfrac13" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} y &= x^2 + 4x + 3 + mx + n \\ &= x^2 + (4+m)x + 3 + n\end{aligned}" />,
    reason: <>Add the two rules. The sum is still a quadratic, so its only turning point is its vertex.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2x + 4 + m" />,
    reason: <>The turning point is where the gradient is zero.</>,
  },
  {
    working: <Katex display tex="x=0: \quad 4 + m = 0" />,
    reason: <>A turning point on the <Katex tex="y" />-axis has <Katex tex="x=0" />, so the gradient must be zero there.</>,
  },
  {
    working: <Katex display tex="\boxed{m=-4}" />,
    reason: <>Any value of <Katex tex="n" /> works: it only shifts the graph up or down.</>,
    more: <>Check: with <Katex tex="m=-4" /> the sum is <Katex tex="x^2+3+n" />, a parabola symmetric about the <Katex tex="y" />-axis. Adding <Katex tex="-4x" /> cancels the <Katex tex="4x" /> term that put the vertex of <Katex tex="g" /> at <Katex tex="x=-2" />.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^2 + (4+m)x + (3+n)" />,
    reason: <>The sum function from part f.</>,
  },
  {
    working: <Katex display tex="\Delta = (4+m)^2 - 4(1)(3+n) = 0" />,
    reason: <>An upright parabola has its vertex on the <Katex tex="x" />-axis exactly when it touches the axis once: one repeated root, so the discriminant <Katex tex="b^2-4ac" /> is zero.</>,
    more: <>The other route is the report&apos;s second method: the turning point is at <Katex tex="x=-\tfrac{4+m}{2}" />, and setting <Katex tex="y=0" /> there gives the same equation.</>,
  },
  {
    working: <Katex display tex="16 + 8m + m^2 - 12 - 4n = 0" />,
    reason: <>Expand.</>,
  },
  {
    working: <Katex display tex="\boxed{n = \frac{m^2 + 8m + 4}{4}}" />,
    reason: <>Rearrange for <Katex tex="n" />, as asked. Equivalently <Katex tex="n=\tfrac{m^2}{4}+2m+1" />.</>,
    more: <>Check with <Katex tex="m=0" />: <Katex tex="n=1" />, and <Katex tex="g(x)+1=(x+2)^2" /> has its vertex at <Katex tex="(-2,0)" />, on the <Katex tex="x" />-axis.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="y = g(x)h(x) = (x+1)(x+3)(mx+n)" />,
    reason: <>Use the factorised form of <Katex tex="g" /> from part b.: the <Katex tex="x" />-intercepts of a product are the zeros of each factor.</>,
  },
  {
    working: <Katex display tex="x = -1,\quad x = -3,\quad x = -\frac{n}{m}\ \ (m \ne 0)" />,
    reason: <>The quadratic always contributes two intercepts. When <Katex tex="m\ne0" />, the linear factor adds a third zero.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-\frac{n}{m} = -1 \ \text{ or } \ -\frac{n}{m} = -3 \\ \implies n = m \ \text{ or } \ n = 3m\end{gathered}" />,
    reason: <>For exactly two intercepts, the third zero must land on one already there, giving a repeated root.</>,
    more: <>The report also allows <Katex tex="m=0" /> with <Katex tex="n\ne0" />: then <Katex tex="h" /> is a nonzero constant, which scales <Katex tex="g" /> without changing its intercepts. <Katex tex="m=n=0" /> must be avoided: the product is then 0 everywhere.</>,
  },
  {
    working: <Katex display tex="\boxed{m=1,\ n=1 \quad\text{and}\quad m=1,\ n=3}" />,
    reason: <>One pair from each condition. Any pair with <Katex tex="n=m" /> or <Katex tex="n=3m" /> (<Katex tex="m\ne0" />) is correct.</>,
    more: <>Check: <Katex tex="m=n=1" /> gives <Katex tex="(x+1)^2(x+3)" />, intercepts <Katex tex="-1" /> (touching) and <Katex tex="-3" />; <Katex tex="m=1,\ n=3" /> gives <Katex tex="(x+1)(x+3)^2" />, intercepts <Katex tex="-1" /> and <Katex tex="-3" /> (touching).</>,
  },
]

const ROWS_I: WorkingRow[] = [
  {
    working: <Katex display tex="g\big(h(x)\big) = (mx + n + 2)^2 - 1" />,
    reason: <>Substitute <Katex tex="h(x)=mx+n" /> for <Katex tex="x" /> in the turning-point form <Katex tex="g(x)=(x+2)^2-1" />.</>,
  },
  {
    working: <Katex display tex="mx + n + 2 = 0 \implies x = -\frac{n+2}{m}" />,
    reason: <>The squared bracket is never negative, so the least value, <Katex tex="-1" />, occurs where the bracket is zero (this needs <Katex tex="m\ne0" />).</>,
    more: <>The derivative agrees: <Katex tex="\tfrac{d}{dx}\left[(mx+n+2)^2-1\right]=2m(mx+n+2)" />, which is zero at the same <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-\frac{n+2}{m},\ -1\right)}" />,
    reason: <>The <Katex tex="y" />-coordinate is the minimum value of <Katex tex="g" />, which is unchanged: composing with a linear <Katex tex="h" /> only stretches and shifts the graph horizontally.</>,
    more: <>Check with <Katex tex="m=1,\ n=0" />: <Katex tex="g(h(x))=g(x)" />, and the formula gives <Katex tex="(-2,-1)" />, the vertex of <Katex tex="g" />.</>,
  },
]

export default function MethodsQ1_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (16 marks)</p>
        <p>
          Let <Katex tex="g:R\to R" />, <Katex tex="g(x)=(x+2)^2-1" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The same parabola is written three ways and each part picks the form that makes it
              easy: turning-point form <Katex tex="(x+2)^2-1" /> shows the vertex <Katex tex="(-2,-1)" />,
              expanded form <Katex tex="x^2+4x+3" /> shows the <Katex tex="y" />-intercept 3, and
              factorised form <Katex tex="(x+1)(x+3)" /> shows the <Katex tex="x" />-intercepts.
            </p>
            <p>
              Parts f.–i. combine <Katex tex="g" /> with a straight line <Katex tex="h(x)=mx+n" />{' '}
              three ways. Adding it gives another parabola (f., g.); multiplying gives a cubic (h.);
              composing substitutes <Katex tex="mx+n" /> for <Katex tex="x" /> inside the bracket (i.).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Expanding"
        marks={1}
        statement={
          <>
            Express the rule for <Katex tex="g" /> in the form <Katex tex="g(x)=ax^2+bx+c" />, where{' '}
            <Katex tex="a,b,c\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Factorising"
        marks={1}
        statement={
          <>
            The function <Katex tex="g" /> can also be written in the form{' '}
            <Katex tex="g(x)=(x-p)(x-q)" />, where <Katex tex="p,q\in Z" />. Give the values of{' '}
            <Katex tex="p" /> and <Katex tex="q" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Translations"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="k" /> for which the graph of <Katex tex="y=g(x)+k" /> passes
            through the origin.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Translations"
        marks={2}
        statement={
          <>
            Using algebra, find the value(s) of <Katex tex="d" /> such that the graph of{' '}
            <Katex tex="y=g(x-d)" /> will pass through the origin.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Dilations"
        marks={1}
        statement={
          <>
            Describe the transformation from the graph of <Katex tex="y=g(x)" /> to the graph of{' '}
            <Katex tex="y=g(3x)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="h:R\to R" />, <Katex tex="h(x)=mx+n" />, where <Katex tex="m" /> and{' '}
          <Katex tex="n" /> are real numbers.
        </p>
      </div>

      <PartCard
        letter="f"
        topic="Turning Points"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="m" />, such that the graph of the sum function{' '}
            <Katex tex="y=g(x)+h(x)" /> has a turning point on the <Katex tex="y" />-axis.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Discriminant"
        marks={2}
        statement={
          <>
            Find <Katex tex="n" /> in terms of <Katex tex="m" />, such that the graph of the sum
            function <Katex tex="y=g(x)+h(x)" /> has a turning point on the <Katex tex="x" />-axis.
          </>
        }
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        topic="Product Functions"
        marks={3}
        statement={
          <>
            Find <b>two</b> pairs of values for <Katex tex="m" /> and <Katex tex="n" />, such that the
            graph of the product function <Katex tex="y=g(x)h(x)" /> has exactly two{' '}
            <Katex tex="x" />-intercepts.
          </>
        }
      >
        <WorkingTable rows={ROWS_H} />
        <WrongMethod
          title="Take m = 0 and n = 0, so h adds no new intercept"
          working={<Katex display tex="g(x)\times 0 = 0 \ \text{ for every } x" />}
        >
          With <Katex tex="h(x)=0" /> the product is the zero function, whose graph lies along the
          whole <Katex tex="x" />-axis: infinitely many intercepts, not two. A constant{' '}
          <Katex tex="h" /> only works when the constant is nonzero.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="i"
        topic="Composite Functions"
        marks={2}
        statement={
          <>
            Find the coordinates of the turning point of the graph of{' '}
            <Katex tex="y=g\big(h(x)\big)" />, giving your answer in terms of <Katex tex="m" /> and{' '}
            <Katex tex="n" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_I} />
      </PartCard>
    </div>
  )
}
