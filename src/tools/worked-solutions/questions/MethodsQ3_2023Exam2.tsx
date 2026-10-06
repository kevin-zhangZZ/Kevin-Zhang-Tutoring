// 2023 Mathematical Methods — Exam 2, Section B Question 3 (12 marks). An exponential and
// its tangents, then 2^x − x²: inflection, strict decrease, Newton's method and when it
// breaks. Question text transcribed from the original paper; the graph is our own drawing.
// Answers checked with sympy and against the VCAA examination report. Solution is original.
// Interactive diagrams (§15): part c.ii. slides the point of tangency until the tangent's
// y-intercept is 0, with a toggle for the tangent at x = 0 (interactives/meth-2023e2-q3cii-tangent.tsx);
// part g. drags Newton's starting value x₀ onto a turning point, where the tangent goes flat and x₁
// is undefined (interactives/meth-2023e2-q3g-newton.tsx); part h. slides n until the local minimum
// of nˣ − xⁿ lands on the x-axis at n = e (interactives/meth-2023e2-q3h-touch.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2023e2-q3-graph.png'

const TangentWidget = lazyWidget(() => import('../interactives/meth-2023e2-q3cii-tangent'))
const NewtonWidget = lazyWidget(() => import('../interactives/meth-2023e2-q3g-newton'))
const TouchWidget = lazyWidget(() => import('../interactives/meth-2023e2-q3h-touch'))

const EXAM_A: SAExaminerStats = {
  marks: [25, 75],
  average: 0.7,
  comment: (
    <>
      This question was done well. Some students did not attempt the question and appear not
      to have recognised the notation <Katex tex="\lim_{x\to-\infty}g(x)" />. A common incorrect
      answer was 6.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>This question was done well. Some students did not include the base.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      An equation was required. There were many transcription errors such as{' '}
      <Katex tex="y=2^a\ln(2)-2^a a\ln(2)+2a-5" /> and{' '}
      <Katex tex="y=2^a\ln(2)-2^a\ln(2)+2^a+5" />. Some students attempted to find the
      equation by hand, making algebraic errors.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [52, 34, 15],
  average: 0.6,
  comment: (
    <>
      Some students did not substitute <Katex tex="(0,0)" /> into the correct equation. Many
      misread the question and found the equation of the tangent line at <Katex tex="x=0" />,
      giving <Katex tex="y=0.693x+6" /> as the answer. Some substituted <Katex tex="a=0" />{' '}
      rather than <Katex tex="x=0" /> into their equation.{' '}
      <Katex tex="y=4.255x+8.14\mathrm{E}-10" /> was often seen.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Many students gave the coordinates of the stationary points{' '}
      <Katex tex="(0.49,1.16)" /> and <Katex tex="(3.21,-1.05)" /> rather than the
      coordinates of the point of inflection. There were some rounding errors.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [65, 35],
  average: 0.4,
  comment: (
    <>
      Round brackets were often seen; these were incorrect as the largest interval of{' '}
      <Katex tex="x" /> values was required, which included the interval endpoints. In some
      cases, it was impossible to determine whether the student meant round or square
      brackets. Another incorrect response was{' '}
      <Katex tex="(-\infty,0.49]\cup[3.21,\infty)" />. These students have incorrectly
      interpreted the question requirements as asking for intervals where the function is
      strictly increasing.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [36, 10, 54],
  average: 1.2,
  comment: (
    <>
      Many students were familiar with Newton's method. Answers were required to three decimal
      places. Some students only had one correct answer. Others had rounding errors.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [79, 21],
  average: 0.2,
  comment: <>There were some good explanations. Some students only mentioned the two solutions.</>,
}

const EXAM_H: SAExaminerStats = {
  marks: [86, 12, 3],
  average: 0.2,
  comment: (
    <>
      This question was not done well. Many students indicated that{' '}
      <Katex tex="f'(x)=0" /> but did not combine it with <Katex tex="f(x)=0" />. Some
      formulated the question correctly but did not provide an answer. Others found an
      approximate value for the answer such as <Katex tex="n=2.7" />. An exact answer was
      required.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x\to-\infty \implies 2^x\to0" />,
    reason: <>As <Katex tex="x" /> becomes large and negative, <Katex tex="2^x" /> gets closer and closer to 0 (for example <Katex tex="2^{-10}=\tfrac{1}{1024}" />) but never reaches it.</>,
  },
  {
    working: <Katex display tex="\boxed{\lim_{x\to-\infty}g(x) = 0+5 = 5}" />,
    reason: <>The horizontal asymptote. The report notes 6 was a common incorrect answer — that is <Katex tex="g(0)" />, not the limit as <Katex tex="x\to-\infty" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="2^x = \left(e^{\log_e(2)}\right)^x = e^{x\log_e(2)}" />,
    reason: <>The formula sheet only differentiates <Katex tex="e^{ax}" />, so first write <Katex tex="2^x" /> with base <Katex tex="e" />: since <Katex tex="e^{\log_e(2)}=2" />, this is <Katex tex="e^{ax}" /> with <Katex tex="a=\log_e(2)" />.</>,
  },
  {
    working: <Katex display tex="g'(x) = \log_e(2)\,e^{x\log_e(2)} = \log_e(2)\cdot2^x" />,
    reason: <>Using <Katex tex="\tfrac{d}{dx}e^{ax}=ae^{ax}" />; the constant 5 differentiates to 0. A CAS derivative gives <Katex tex="2^x\cdot\ln(2)" /> directly.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \log_e(2)}" />,
    reason: <>Write the base: the report notes some students did not include it.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Point: } \left(a,\ 2^a+5\right); \quad \text{gradient: } g'(a) = 2^a\log_e(2)" />,
    reason: <>The point comes from substituting <Katex tex="x=a" /> into <Katex tex="g(x)=2^x+5" />; the gradient from part b.</>,
  },
  {
    working: <Katex display tex="y-\left(2^a+5\right) = 2^a\log_e(2)\,(x-a)" />,
    reason: <>Point–gradient form, <Katex tex="y-y_1=m(x-x_1)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 2^a\log_e(2)\,x-a\,2^a\log_e(2)+2^a+5}" />,
    reason: <>Expand and make <Katex tex="y" /> the subject. An <em>equation</em> is required, not just a gradient, and every <Katex tex="x" /> and <Katex tex="a" /> must survive the copying: the report notes many transcription errors. The constant term <Katex tex="-a\,2^a\log_e(2)+2^a+5" /> is the <Katex tex="y" />-intercept, which part c.ii. needs.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Origin on the tangent: } x=0,\ y=0" />,
    reason: <>In the tangent, <Katex tex="a" /> is where the line touches the curve (unknown), while <Katex tex="x" /> and <Katex tex="y" /> are the coordinates of any point on the line. The origin is a point <em>on the line</em>, so substitute <Katex tex="x=0" /> and <Katex tex="y=0" /> into the tangent from part c.i., not <Katex tex="a=0" />. Putting <Katex tex="a=0" /> gives the tangent at <Katex tex="x=0" />, <Katex tex="y=0.693x+6" />, which the report notes many students gave.</>,
  },
  {
    working: <Katex display tex="0 = 2^a\log_e(2)\times0-a\,2^a\log_e(2)+2^a+5" />,
    reason: <>The <Katex tex="x" />-term vanishes, leaving the tangent's <Katex tex="y" />-intercept equal to 0.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve(−a·2^a·ln(2)+2^a+5=0, a)
      </Cas>
    ),
    reason: <><Katex tex="a" /> appears both in a power and as a multiplier, so this can't be rearranged by hand. Solve it with CAS: there is only one solution.</>,
  },
  {
    working: <Katex display tex="a = 2.61784\ldots" />,
    reason: <>The <Katex tex="x" />-coordinate of the point of tangency. This is not the answer yet: the report's general comments note many students found <Katex tex="a" /> and did not go on to the equation.</>,
  },
  {
    working: <Katex display tex="m = 2^{2.61784\ldots}\log_e(2) = 4.25476\ldots" />,
    reason: <>The gradient <Katex tex="g'(a)" />, using the unrounded <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 4.255x}" />,
    reason: <>The <Katex tex="y" />-intercept is 0 because we chose <Katex tex="a" /> to make it 0. A CAS may report the intercept as <Katex tex="8.14\mathrm{E}\!-\!10" /> (that is, <Katex tex="8.14\times10^{-10}" />), a rounding leftover from its numerical solve; the report's general comments note it should be recognised as zero.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = 2^x-x^2 \implies h'(x) = \log_e(2)\cdot2^x-2x" />,
    reason: <>First derivative.</>,
  },
  {
    working: <Katex display tex="h''(x) = \left(\log_e(2)\right)^2 2^x-2" />,
    reason: <>A point of inflection is where the curve changes concavity, which is where <Katex tex="h''(x)" /> changes sign, so solve <Katex tex="h''(x)=0" />. Setting <Katex tex="h'(x)=0" /> instead gives the stationary points, which the report notes many students gave.</>,
  },
  {
    working: <Katex display tex="\left(\log_e(2)\right)^2 2^x = 2 \implies 2^x = \frac{2}{\left(\log_e(2)\right)^2}" />,
    reason: <>Rearranging <Katex tex="h''(x)=0" />.</>,
  },
  {
    working: <Katex display tex="x = \log_2\!\left(\frac{2}{\left(\log_e(2)\right)^2}\right) = 2.05753\ldots" />,
    reason: <>Take <Katex tex="\log_2" /> of both sides (or solve <Katex tex="h''(x)=0" /> with CAS). <Katex tex="h''(x)" /> is increasing (it is a positive multiple of <Katex tex="2^x" />, minus 2), so it goes from negative to positive here: a genuine inflection.</>,
  },
  {
    working: <Katex display tex="\boxed{(2.06,\ -0.07)}" />,
    reason: <>Substitute the unrounded <Katex tex="x" /> into <Katex tex="h" />: <Katex tex="h(2.05753\ldots)=4.1627-4.2334=-0.0707" />. Both coordinates to two decimal places, as asked.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={graphSrc}
          alt="The curve y = 2^x − x² rising to a local maximum near (0.49, 1.16), falling through an inflection at (2.06, −0.07) to a local minimum near (3.21, −1.05), then rising again; the left x-intercept is near x = −0.767"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>The inflection sits between the two stationary points the report notes many students gave instead.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="h'(x) = \log_e(2)\cdot2^x-2x = 0" />,
    reason: <>From the graph, <Katex tex="h" /> falls from its local maximum down to its local minimum, so the interval runs between the two stationary points. Find them by solving <Katex tex="h'(x)=0" />.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve(ln(2)·2^x−2x=0, x)
      </Cas>
    ),
    reason: <>Two solutions, both needed.</>,
  },
  {
    working: <Katex display tex="x = 0.48509\ldots \ \text{ and } \ x = 3.21243\ldots" />,
    reason: <>The local maximum <Katex tex="(0.49,\ 1.16)" /> and the local minimum <Katex tex="(3.21,\ -1.05)" /> of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="h'(2) = 4\log_e(2)-4 = -1.23 < 0" />,
    reason: <>A check between them: <Katex tex="h'(x)<0" /> on <Katex tex="0.485<x<3.212" />, so <Katex tex="h" /> is decreasing there. Outside this interval <Katex tex="h'(x)>0" /> and <Katex tex="h" /> is increasing: giving <Katex tex="(-\infty,0.49]\cup[3.21,\infty)" /> answers the wrong question, an error the report notes.</>,
  },
  {
    working: <Katex display tex="\boxed{[0.49,\ 3.21]}" />,
    reason: <><strong>Square</strong> brackets. <Katex tex="h" /> is strictly decreasing on an interval if, for any <Katex tex="x_1<x_2" /> in it, <Katex tex="h(x_1)>h(x_2)" />. Including the endpoints keeps this true: <Katex tex="h(0.485)=1.164" /> is larger than every other value of <Katex tex="h" /> on the interval, and <Katex tex="h(3.212)=-1.051" /> is smaller. A gradient of 0 at a single point does not stop the function decreasing. So the <em>largest</em> interval includes its endpoints; the report notes round brackets were often seen, and were incorrect.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="x_{n+1} = x_n-\frac{h(x_n)}{h'(x_n)}, \qquad h'(x) = \log_e(2)\cdot2^x-2x" />,
    reason: <>Newton's method (on the formula sheet), with <Katex tex="h'(x)" /> from part d.</>,
  },
  {
    working: <Katex display tex="x_1 = 0-\frac{h(0)}{h'(0)} = 0-\frac{1}{0.69315} = -1.442695\ldots" />,
    reason: <><Katex tex="h(0)=2^0-0=1" /> and <Katex tex="h'(0)=\log_e(2)\times2^0-0=\log_e(2)" />.</>,
  },
  {
    working: <Katex display tex="x_2 = -1.442695-\frac{-1.71349}{3.14038} = -0.897065\ldots" />,
    reason: <>Substitute the unrounded <Katex tex="x_1" /> into <Katex tex="h" /> and <Katex tex="h'" /> (on CAS, store each estimate and reuse it), and round only when writing the answers in the table: the report notes rounding errors.</>,
  },
  {
    working: <Katex display tex="x_3 = -0.897065-\frac{-0.26775}{2.16633} = -0.773470\ldots" />,
    reason: <>The same step once more, from the unrounded <Katex tex="x_2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x_1 = -1.443,\quad x_2 = -0.897,\quad x_3 = -0.773}" />,
    reason: <>Each to three decimal places, as the table asks: the report's general comments note some students gave two. The estimates are converging towards the root <Katex tex="x\approx-0.7667" />, the left-hand <Katex tex="x" />-intercept of <Katex tex="h" />.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(2)\cdot2^x-2x = h'(x)" />,
    reason: <>Recognise the expression: this is exactly the derivative from part d.</>,
  },
  {
    working: <Katex display tex="\log_e(2)\cdot2^x-2x = 0 \iff h'(x) = 0" />,
    reason: <>So its solutions are the <Katex tex="x" />-coordinates of the two turning points from part e., <Katex tex="x\approx0.49" /> and <Katex tex="x\approx3.21" />.</>,
  },
  {
    working: <Katex display tex="h(0.485)=1.164\neq0, \qquad h(3.212)=-1.051\neq0" />,
    reason: <>Neither turning point is on the <Katex tex="x" />-axis, so the tangent there is a horizontal line above or below the axis.</>,
  },
  {
    working: <Katex display tex="x_1 = x_0-\frac{h(x_0)}{h'(x_0)} = x_0-\frac{h(x_0)}{0}" />,
    reason: <>Newton's method takes <Katex tex="x_1" /> to be where the tangent at <Katex tex="x_0" /> crosses the <Katex tex="x" />-axis. A horizontal tangent never crosses it, and in the formula this shows up as division by 0.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{These } x_0 \text{ are the turning points of } h,\\ \text{where } h'(x_0)=0\text{: the tangent is horizontal}\\ \text{and never meets the } x\text{-axis, so}\\ x_1=x_0-\tfrac{h(x_0)}{h'(x_0)} \text{ is undefined.}\end{gathered}}"
      />
    ),
    reason: <>The report notes some students only mentioned the two solutions. The explanation needs the consequence: <Katex tex="h'(x_0)=0" />, a horizontal tangent, and an undefined <Katex tex="x_1" />.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = n^x-x^n \ \text{ has a local minimum } \textbf{on the } x\textbf{-axis}" />,
    reason: <>Two conditions at the same point: it is a stationary point, so <Katex tex="f'(x)=0" />, and it sits on the <Katex tex="x" />-axis, so <Katex tex="f(x)=0" />. The graph just touches the axis there.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(x) = 0&: \ n^x = x^n \\ f'(x) = 0&: \ n^x\log_e(n) = n\,x^{n-1}\end{aligned}" />,
    reason: <>Differentiate <Katex tex="n^x" /> as in part b. and <Katex tex="x^n" /> with the power rule. Both equations are needed: the report notes many students indicated <Katex tex="f'(x)=0" /> but did not combine it with <Katex tex="f(x)=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{n^x\log_e(n)}{n^x} &= \frac{n\,x^{n-1}}{x^n} \\ \log_e(n) &= \frac nx \implies x = \frac{n}{\log_e(n)}\end{aligned}" />,
    reason: <>Divide the second equation by the first: the <Katex tex="n^x" /> cancels on the left and <Katex tex="x^{n-1}" /> cancels on the right. This is allowed because <Katex tex="x\neq0" /> here (<Katex tex="f(0)=1\neq0" />).</>,
  },
  {
    working: <Katex display tex="n^x = x^n \implies x\log_e(n) = n\log_e(x)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides of the first condition to bring the powers down. Both sides are positive because <Katex tex="x>0" />: a power <Katex tex="x^n" /> with non-integer <Katex tex="n" /> needs <Katex tex="x\geq0" />, and <Katex tex="x\neq0" /> from above.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{n}{\log_e(n)}\cdot\log_e(n) &= n\log_e(x) \\ n &= n\log_e(x) \implies x = e\end{aligned}" />,
    reason: <>Substitute <Katex tex="x=\tfrac{n}{\log_e(n)}" /> on the left, then divide both sides by <Katex tex="n" /> (<Katex tex="n>0" />): <Katex tex="\log_e(x)=1" />, so <Katex tex="x=e" />.</>,
  },
  {
    working: <Katex display tex="e = \frac{n}{\log_e(n)} \implies \log_e(n) = \frac{n}{e}" />,
    reason: <>Put <Katex tex="x=e" /> back into <Katex tex="x=\tfrac{n}{\log_e(n)}" />.</>,
  },
  {
    working: <Katex display tex="n = e: \quad \log_e(e) = 1 = \frac{e}{e} \ \checkmark" />,
    reason: <><Katex tex="n=e" /> works, and it is the only solution: <Katex tex="y=\tfrac{n}{e}" /> is the tangent to <Katex tex="y=\log_e(n)" /> at <Katex tex="n=e" /> (gradient <Katex tex="\tfrac1e" />, through <Katex tex="(e,\,1)" />), and the concave-down log curve lies below its tangent everywhere else.</>,
  },
  {
    working: <Katex display tex="f''(e) = e^e-e(e-1)\,e^{e-2} = e^{e-1} > 0" />,
    reason: <>With <Katex tex="n=e" />, <Katex tex="f''(x)=e^x-e(e-1)x^{e-2}" />. It is positive at <Katex tex="x=e" />, so the stationary point <Katex tex="(e,\,0)" /> is a local minimum, as required.</>,
  },
  {
    working: <Katex display tex="\boxed{n = e}" />,
    reason: <>Exact: the report notes some students gave approximate values such as <Katex tex="n=2.7" />, and an exact answer was required.</>,
  },
]

export default function MethodsQ3_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (12 marks)</p>
        <p>
          Consider the function <Katex tex="g:R\to R" />,{' '}
          <Katex tex="g(x)=2^x+5" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Most parts turn on differentiating an exponential whose base isn't <Katex tex="e" />:
              writing <Katex tex="a^x=e^{x\log_e(a)}" /> gives{' '}
              <Katex tex="\tfrac{d}{dx}a^x=\log_e(a)\,a^x" /> (part b.). Parts
              d. to g. all concern the same function <Katex tex="h(x)=2^x-x^2" />, so it is
              worth graphing it once and keeping the picture: two turning points at{' '}
              <Katex tex="x\approx0.49" /> and <Katex tex="3.21" />, an inflection between them,
              and three <Katex tex="x" />-intercepts (one near <Katex tex="-0.77" />, then
              exactly 2 and 4).
            </p>
            <p>
              Part g. is the payoff: Newton's method divides by <Katex tex="h'(x_0)" />, so the
              turning points found in part e. are precisely the starting values that break it.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Limit"
        marks={1}
        statement={
          <>
            State the value of <Katex tex="\displaystyle\lim_{x\to-\infty}g(x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Derivative"
        marks={1}
        statement={
          <>
            The derivative, <Katex tex="g'(x)" />, can be expressed in the form{' '}
            <Katex tex="g'(x)=k\times2^x" />.
            <br />
            Find the real number <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Let <Katex tex="a" /> be a real number. Find, in terms of <Katex tex="a" />, the
            equation of the tangent to <Katex tex="g" /> at the point{' '}
            <Katex tex="\bigl(a,\,g(a)\bigr)" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Tangent Through Origin"
        marks={2}
        statement={
          <>
            Hence, or otherwise, find the equation of the tangent to <Katex tex="g" /> that
            passes through the origin, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <Explore title="The origin is a point on the tangent, not where it touches the curve">
          <TangentWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Let <Katex tex="h:R\to R" />, <Katex tex="h(x)=2^x-x^2" />.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Point of Inflection"
        marks={1}
        statement={
          <>
            Find the coordinates of the point of inflection for <Katex tex="h" />, correct to
            two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Decreasing Interval"
        marks={1}
        statement={
          <>
            Find the largest interval of <Katex tex="x" /> values for which <Katex tex="h" />{' '}
            is strictly decreasing.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Newton's Method"
        marks={2}
        statement={
          <>
            <div className="flex flex-col gap-3">
              <p>
                Apply Newton's method, with an initial estimate of <Katex tex="x_0=0" />, to
                find an approximate <Katex tex="x" />-intercept of <Katex tex="h" />.
                <br />
                Write the estimates <Katex tex="x_1" />, <Katex tex="x_2" /> and{' '}
                <Katex tex="x_3" /> in the table below, correct to three decimal places.
              </p>
              <table className="border-collapse text-[13.5px] text-center w-fit">
                <tbody>
                  <tr><td className="border border-gray-300 dark:border-gray-700 px-6 py-1.5"><Katex tex="x_0" /></td><td className="border border-gray-300 dark:border-gray-700 px-6 py-1.5">0</td></tr>
                  <tr><td className="border border-gray-300 dark:border-gray-700 px-6 py-1.5"><Katex tex="x_1" /></td><td className="border border-gray-300 dark:border-gray-700 px-6 py-1.5" /></tr>
                  <tr><td className="border border-gray-300 dark:border-gray-700 px-6 py-1.5"><Katex tex="x_2" /></td><td className="border border-gray-300 dark:border-gray-700 px-6 py-1.5" /></tr>
                  <tr><td className="border border-gray-300 dark:border-gray-700 px-6 py-1.5"><Katex tex="x_3" /></td><td className="border border-gray-300 dark:border-gray-700 px-6 py-1.5" /></tr>
                </tbody>
              </table>
            </div>
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Newton's Method"
        marks={1}
        statement={
          <>
            For the function <Katex tex="h" />, explain why a solution to the equation{' '}
            <Katex tex="\log_e(2)\times\left(2^x\right)-2x=0" /> should not be used as an
            initial estimate <Katex tex="x_0" /> in Newton's method.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
        <Explore title="Newton's method follows the tangent to the axis, and a flat tangent never arrives">
          <NewtonWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="h"
        topic="Local Minimum"
        marks={2}
        statement={
          <>
            There is a positive real number <Katex tex="n" /> for which the function{' '}
            <Katex tex="f(x)=n^x-x^n" /> has a local minimum on the <Katex tex="x" />-axis.
            <br />
            Find this value of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
        <Explore title="Each n here has a local minimum, but only n = e puts it on the x-axis">
          <TouchWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
