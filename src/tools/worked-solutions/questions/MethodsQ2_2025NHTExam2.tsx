// 2025 Mathematical Methods NHT — Exam 2, Section B Question 2 (12 marks). The NHT report gives
// sample answers only, with no statistics. f(x) = 4e^(3 log_e(x)) = 4x³ on its maximal domain
// (0, ∞): the domain, the simplification, an area, the antiderivative through (1, −5) sketched and
// used to write an area as g(a) + b, and h(x) = f(2x − 3) − f(x): its quadratic derivative, the
// point of minimum gradient and the interval where the gradient decreases. Question text
// transcribed from the original paper (the 2025 NHT paper has no text layer, so it was read from
// rendered pages). The blank axes for d.i. are cropped from the original VCAA exam PDF (300 dpi);
// the d.i. answer is this site's own matplotlib sketch on the same grid (measured from the crop:
// gridlines x = −1, 1, 2 and y = ±5, ±10, axes running to about x = 2.55 and y = 13.2).
// Answers checked with sympy and against the VCAA report's sample answers: a. R⁺ / (0, ∞);
// c. 15; d.i. g(x) = x⁴ − 6 with (0, −6) open, (6^(1/4), 0), (1, −5), (2, 10); d.ii. 95/16;
// e.i. 84x² − 288x + 216; e.ii. (12/7, −972/49); e.iii. 12/7. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import axesSrc from './meth-2025nhte2-q2di-axes.png'
import sketchSrc from './meth-2025nhte2-q2di-sketch.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(x) \text{ is defined only for } x>0" />,
    reason: <>List what can fail: the exponential and the multiplication by 3 and 4 accept any real input, so the only restriction comes from the logarithm.</>,
  },
  {
    working: <Katex display tex="\boxed{D=(0,\infty)}" />,
    reason: <>VCAA writes this as <Katex tex="R^+" /> or <Katex tex="(0,\infty)" />. Round bracket at 0: <Katex tex="\log_e(0)" /> is undefined.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="3\log_e(x) = \log_e\!\left(x^3\right)" />,
    reason: <>Log law <Katex tex="n\log_e(x)=\log_e(x^n)" />: move the coefficient 3 inside as a power.</>,
  },
  {
    working: <Katex display tex="f(x) = 4e^{\log_e\left(x^3\right)}" />,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 4x^3, \quad x\in D}" />,
    reason: <><Katex tex="e^{\log_e(u)}=u" /> for <Katex tex="u>0" />, since the exponential and logarithm are inverse functions, and <Katex tex="x^3>0" /> on <Katex tex="D" />. The domain stays <Katex tex="D" />: the simpler rule doesn't widen it. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_1^2 4x^3\,dx" />,
    reason: <><Katex tex="f(x)=4x^3>0" /> on <Katex tex="[1,2]" />, so the graph is above the <Katex tex="x" />-axis and the integral is the area itself.</>,
  },
  {
    working: <Katex display tex="= \Big[x^4\Big]_1^2" />,
    reason: <>Antiderivative of <Katex tex="4x^3" /> is <Katex tex="x^4" />.</>,
  },
  {
    working: <Katex display tex="= 16-1 = \boxed{15}" />,
    reason: <>Square units. Plausible: <Katex tex="f" /> rises from 4 to 32 over an interval of width 1, so the area lies between 4 and 32.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \int 4x^3\,dx = x^4 + c" />,
    reason: <>An antiderivative of <Katex tex="f" /> (using part b.), with the constant still to find.</>,
  },
  {
    working: <Katex display tex="g(1) = -5 \implies 1 + c = -5 \implies c = -6" />,
    reason: <>The graph passes through <Katex tex="(1,-5)" />, which fixes <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="g(x) = x^4 - 6, \quad x\in(0,\infty)" />,
    reason: <>Over the domain <Katex tex="D" /> from part a., so the graph starts at <Katex tex="x=0" /> without including it.</>,
  },
  {
    working: <Katex display tex="g(0)=-6 \ (\text{excluded}), \quad g(2) = 16-6 = 10" />,
    reason: <>The endpoint <Katex tex="(0,-6)" /> is an open circle because <Katex tex="0\notin D" />. The point at <Katex tex="x=1" /> is <Katex tex="(1,-5)" />, given.</>,
  },
  {
    working: <Katex display tex="x^4 = 6 \implies x = 6^{\frac14}" />,
    reason: <>The <Katex tex="x" />-intercept. <Katex tex="x=-6^{\frac14}" /> is rejected: it is not in <Katex tex="D" />.</>,
    more: <><Katex tex="6^{\frac14}\approx1.57" />, between 1 and 2, consistent with <Katex tex="g" /> going from <Katex tex="-5" /> to <Katex tex="10" /> there.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          loading="lazy"
          decoding="async"
          src={sketchSrc}
          alt="This site's sketch of y = x^4 − 6 for x > 0 on VCAA's grid: an open circle at (0, −6), the curve nearly flat at first, passing through (1, −5), crossing the x-axis at (6^(1/4), 0) and rising steeply through (2, 10)"
          className="w-full max-w-[460px]"
        />
      </div>
    ),
    reason: <>Starts flat at the open circle <Katex tex="(0,-6)" /> (the gradient <Katex tex="4x^3" /> is 0 there) and gets steeper as <Katex tex="x" /> grows. The four labelled points are the ones the question asks for.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_{0.5}^{a} f(x)\,dx" />,
    reason: <><Katex tex="f>0" /> on <Katex tex="D" />, so this integral is the area.</>,
  },
  {
    working: <Katex display tex="= \Big[g(x)\Big]_{0.5}^{a} = g(a) - g(0.5)" />,
    reason: <><Katex tex="g" /> is an antiderivative of <Katex tex="f" />, so the fundamental theorem of calculus applies with <Katex tex="g" /> directly. That is exactly why the area comes out in the form <Katex tex="g(a)+b" />.</>,
  },
  {
    working: <Katex display tex="g(0.5) = \tfrac1{16} - 6 = -\tfrac{95}{16}" />,
  },
  {
    working: <Katex display tex="A = g(a) + \tfrac{95}{16} \implies \boxed{b = \tfrac{95}{16}}" />,
    reason: <>VCAA also accepts 5.9375.</>,
    more: <>Check with <Katex tex="a=1" />: <Katex tex="\int_{0.5}^1 4x^3\,dx = 1-\tfrac1{16}=\tfrac{15}{16}" />, and <Katex tex="g(1)+\tfrac{95}{16}=-5+\tfrac{95}{16}=\tfrac{15}{16}" />.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = 4(2x-3)^3 - 4x^3" />,
    reason: <>Use <Katex tex="f(x)=4x^3" /> from part b. with input <Katex tex="2x-3" />.</>,
  },
  {
    working: <Katex display tex="h'(x) = 12(2x-3)^2\times 2 - 12x^2" />,
    reason: <>Chain rule on the first term: the derivative of the inside, <Katex tex="2x-3" />, contributes the factor 2.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &= 24\left(4x^2-12x+9\right)-12x^2 \\ &= \boxed{84x^2-288x+216} \end{aligned}"
      />
    ),
    reason: <>Expand to get the quadratic expression asked for.</>,
    more: <>VCAA also accepts the turning-point form <Katex tex="84\left(x-\tfrac{12}{7}\right)^2-\tfrac{216}{7}" />, which is useful in the next part.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\big(h'(x)\big) = 168x - 288 = 0 \implies x = \tfrac{12}{7}" />,
    reason: <>The gradient of <Katex tex="h" /> is <Katex tex="h'(x)" />, an upward parabola (leading coefficient <Katex tex="84>0" />), so its minimum is at its vertex. Equivalently <Katex tex="x=\tfrac{288}{2\times84}" />.</>,
    more: <><Katex tex="\tfrac{12}{7}\approx1.71" /> is inside the domain <Katex tex="(1.5,\infty)" />, so the vertex is a genuine minimum of the gradient.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} h\!\left(\tfrac{12}7\right) &= 4\left(\tfrac{24}7-\tfrac{21}7\right)^3-4\left(\tfrac{12}7\right)^3 \\ &= \tfrac{4(27-1728)}{343} = -\tfrac{6804}{343} = -\tfrac{972}{49} \end{aligned}"
      />
    ),
    reason: <>The question asks for the point on the graph of <Katex tex="y=h(x)" />, so substitute into <Katex tex="h" />, not into <Katex tex="h'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\tfrac{12}{7},\ -\tfrac{972}{49}\right)}" />,
    reason: <>About <Katex tex="(1.71,\ -19.84)" />.</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Katex display tex="h'(x) \text{ is strictly decreasing for } x \le \tfrac{12}{7}" />,
    reason: <>An upward parabola decreases to the left of its vertex. From part e.ii., the vertex is at <Katex tex="x=\tfrac{12}7" />, and that endpoint can be included: for any <Katex tex="x_1<x_2\le\tfrac{12}7" />, <Katex tex="h'(x_1)>h'(x_2)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = \tfrac{12}{7}}" />,
    reason: <>Any larger <Katex tex="p" /> would take the interval past the vertex, where the gradient starts increasing again.</>,
  },
]

export default function MethodsQ2_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (12 marks)</p>
        <p>
          Consider the function <Katex tex="f:D\to R,\ f(x)=4e^{3\log_e(x)}" />, where{' '}
          <Katex tex="D" /> is the maximal domain of <Katex tex="f" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The odd-looking rule is just <Katex tex="4x^3" /> in disguise, but only for{' '}
              <Katex tex="x>0" />: the logarithm fixes the domain, and that domain follows{' '}
              <Katex tex="f" /> into every later part (the open endpoint in d.i., the rejected
              negative intercept).
            </p>
            <p>
              Part e. is about the <em>gradient</em> of <Katex tex="h" />. Its derivative is a
              quadratic, so &ldquo;where the gradient is a minimum&rdquo; and &ldquo;where the
              gradient is decreasing&rdquo; are both questions about one parabola's vertex.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Maximal Domain" marks={1} statement={<>Find <Katex tex="D" />.</>}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Log and Exponential Laws"
        marks={1}
        statement={<>Show that <Katex tex="f" /> can be expressed in the form <Katex tex="f:D\to R,\ f(x)=4x^3" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Under a Curve"
        marks={1}
        statement={<>Find the area bounded by the graph of <Katex tex="y=f(x)" />, the <Katex tex="x" />-axis and the lines <Katex tex="x=1" /> and <Katex tex="x=2" />.</>}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          The function <Katex tex="g" /> is the anti-derivative of <Katex tex="f" /> that passes
          through the point <Katex tex="(1,-5)" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the function <Katex tex="g" /> on the axes below, over the domain <Katex tex="D" />.
            <br />
            Label the coordinates of the endpoint, the <Katex tex="x" />-intercept and the points on
            the graph where <Katex tex="x=1" /> and <Katex tex="x=2" />.
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
              <img
                loading="lazy"
                decoding="async"
                src={axesSrc}
                alt="Blank axes with x from −1 to 2 and y from −10 to 10 in steps of 5 — from the original 2025 NHT VCAA exam paper"
                className="w-full max-w-[420px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Area and Antiderivatives"
        marks={2}
        statement={
          <>
            Let <Katex tex="a>0.5" />
            <br />
            The area bounded by the graph of <Katex tex="y=f(x)" />, the <Katex tex="x" />-axis and the
            lines <Katex tex="x=0.5" /> and <Katex tex="x=a" /> can be expressed in the form{' '}
            <Katex tex="g(a)+b" />.
            <br />
            Find the value of <Katex tex="b" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">e.</p>
        <p>
          Consider the function <Katex tex="h:(1.5,\infty)\to R,\ h(x)=f(2x-3)-f(x)" />.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="Chain Rule"
        marks={1}
        statement={<>Find a quadratic expression for <Katex tex="h'(x)" />.</>}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Minimum Gradient"
        marks={2}
        statement={
          <>
            Hence, or otherwise, find the coordinates of the point on the graph of{' '}
            <Katex tex="y=h(x)" /> where the <b>gradient</b> is a minimum.
          </>
        }
      >
        <WorkingTable rows={ROWS_EII} />
        <WrongMethod
          title="Solve h′(x) = 0 to find the minimum"
          working={<Katex display tex="84x^2-288x+216=0 \implies x=\tfrac{12\pm\sqrt{18}}{7}" />}
        >
          That finds the stationary points of <Katex tex="h" />, where the gradient is zero, not where
          the gradient is smallest. The minimum <em>gradient</em> is a stationary point of{' '}
          <Katex tex="h'" />, so set <Katex tex="h''(x)=0" /> (or find the parabola's vertex).
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="e.iii"
        topic="Decreasing Gradient"
        marks={1}
        statement={
          <>
            Over the interval <Katex tex="(1.5,p]" />, the <b>gradient</b> of <Katex tex="h" /> is
            strictly decreasing.
            <br />
            Find the largest possible value of <Katex tex="p" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_EIII} />
      </PartCard>
    </div>
  )
}
