// 2021 Mathematical Methods — Exam 1 Question 8 (5 marks). Recovering a function from its
// gradient and a point on it, then classifying the stationary point. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original. Part b. leads with the sign test (the report's
// method, and where students lost the mark) with the second derivative as the alternative.
// Interactive diagram (§15): part b. drags a test point either side of x = 3 along the part a.
// curve (meth-2021e1-q8b-test-points), showing the exact substituted gradient and why x-values
// that make x + 6 a perfect square give the convincing line. Part a. (21% full marks) has no
// widget: its lost marks were antidifferentiation coefficients and evaluating 9^(3/2), pure algebra.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TestPointsWidget = lazyWidget(() => import('../interactives/meth-2021e1-q8b-test-points'))

const EXAM_A: SAExaminerStats = {
  marks: [26, 16, 38, 21],
  average: 1.6,
  comment: (
    <>
      Most students were able to anti-differentiate to get the correct powers, but often with
      incorrect coefficients. Some students lost the <Katex tex="(x+6)" /> term and just had{' '}
      <Katex tex="x" />. Students who had included the constant of integration knew to
      substitute <Katex tex="\left(3,\tfrac{29}{4}\right)" /> in to find <Katex tex="c" />.
      Solving to find <Katex tex="c" /> caused problems; students encountered difficulties
      evaluating terms like <Katex tex="\sqrt{9^3}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [50, 27, 23],
  average: 0.8,
  comment: (
    <>
      Most students knew that they had to consider the slope of the curve on either side of{' '}
      <Katex tex="x=3" />. Appropriate <Katex tex="x" /> values were chosen. The most common{' '}
      <Katex tex="x" /> values used were −6, −2, 0, 2, 4 and 10. Most students had a valid
      approach, but not all provided
      convincing arguments that showed the working out of substituting suitable{' '}
      <Katex tex="x" /> values. Those who tried a second derivative approach met with mixed
      success.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \int\left(\sqrt{x+6}-\frac{x}{2}-\frac32\right)dx" />,
    reason: <>The rule of the function is <Katex tex="y" />, and we are given its derivative, so antidifferentiate to get back to <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\int(x+6)^{\frac12}\,dx = \frac{(x+6)^{\frac32}}{\frac32} = \frac{2(x+6)^{\frac32}}{3}" />,
    reason: (
      <>
        Write <Katex tex="\sqrt{x+6}" /> as <Katex tex="(x+6)^{\frac12}" />, add 1 to the power and divide by the new
        power. Dividing by <Katex tex="\tfrac32" /> is multiplying by <Katex tex="\tfrac23" />: the report says most
        students had the right powers but often the wrong coefficients. Keep the bracket <Katex tex="(x+6)" /> whole
        (some students lost it and just had <Katex tex="x" />). Its <Katex tex="x" /> has coefficient 1, so there is
        nothing extra to divide by.
      </>
    ),
  },
  {
    working: <Katex display tex="\int\frac{x}{2}\,dx = \frac{x^2}{4}, \qquad \int\frac32\,dx = \frac{3x}{2}" />,
    reason: <><Katex tex="\tfrac{x}{2}=\tfrac12x^1" />: raise the power to 2 and divide by 2, giving <Katex tex="\tfrac12\cdot\tfrac{x^2}{2}=\tfrac{x^2}{4}" />. A constant <Katex tex="k" /> antidifferentiates to <Katex tex="kx" />.</>,
  },
  {
    working: <Katex display tex="y = \frac{2(x+6)^{\frac32}}{3}-\frac{x^2}{4}-\frac{3x}{2}+c" />,
    reason: <>Put the three pieces together, keeping the minus signs. The <Katex tex="+c" /> is essential: every vertical translation of this curve has the same gradient, and the given point picks out the one we want.</>,
  },
  {
    working: <Katex display tex="x=3:\ \ 9^{\frac32} = \left(\sqrt9\right)^3 = 3^3 = 27" />,
    reason: <>The stationary point <Katex tex="\left(3,\tfrac{29}{4}\right)" /> lies on the graph, so substitute <Katex tex="x=3" />, <Katex tex="y=\tfrac{29}{4}" />. First the awkward term, flagged in the report: <Katex tex="x+6=9" />, and a power of <Katex tex="\tfrac32" /> means square root, then cube. Rooting first keeps the numbers small.</>,
  },
  {
    working: <Katex display tex="\frac{2(27)}{3}-\frac{3^2}{4}-\frac{3(3)}{2}+c = \frac{29}{4}" />,
    reason: <>Substituting into every term of the rule.</>,
  },
  {
    working: <Katex display tex="18-\frac94-\frac{18}{4}+c = \frac{29}{4}" />,
    reason: <><Katex tex="\tfrac{2(27)}{3}=18" />, and <Katex tex="\tfrac92=\tfrac{18}{4}" /> so the fractions share a denominator.</>,
  },
  {
    working: <Katex display tex="c = \frac{29}{4}+\frac{27}{4}-18 = 14-18 = -4" />,
    reason: <>Move the other terms across: <Katex tex="\tfrac94+\tfrac{18}{4}=\tfrac{27}{4}" />, and <Katex tex="\tfrac{29}{4}+\tfrac{27}{4}=\tfrac{56}{4}=14" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{2(x+6)^{\frac32}}{3}-\frac{x^2}{4}-\frac{3x}{2}-4}" />,
    reason: (
      <>
        The question asks for the rule, so give the whole function, not just <Katex tex="c=-4" /> (the report&apos;s
        general comments make this point about this question). Check the coefficient by differentiating back:{' '}
        <Katex tex="\tfrac23\cdot\tfrac32(x+6)^{\frac12}=\sqrt{x+6}" /> ✓.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} x=-2:\ \frac{dy}{dx} &= \sqrt{4}-\frac{(-2)}{2}-\frac32 \\ &= 2+1-\frac32 = \frac32 > 0 \end{aligned}"
      />
    ),
    reason: (
      <>
        Test the gradient on each side of <Katex tex="x=3" />. To change sign, <Katex tex="\tfrac{dy}{dx}" /> would have
        to pass through 0, and it is 0 only at <Katex tex="x=3" /> (the single stationary point), so one test point per
        side gives the sign for that whole side. Choose <Katex tex="x" /> so that <Katex tex="x+6" /> is a perfect
        square (here 4): the square root is then exact without a calculator. The point must also have{' '}
        <Katex tex="x\ge-6" />, where <Katex tex="\sqrt{x+6}" /> is defined.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} x=10:\ \frac{dy}{dx} &= \sqrt{16}-\frac{10}{2}-\frac32 \\ &= 4-5-\frac32 = -\frac52 < 0 \end{aligned}"
      />
    ),
    reason: <><Katex tex="x+6=16" /> is the next perfect square to the right of <Katex tex="x=3" />. Write each substitution out in full: the report says not all students showed the working out of substituting their <Katex tex="x" /> values.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{array}{c|ccc} x & -2 & 3 & 10 \\ \hline \frac{dy}{dx} & + & 0 & - \\ \text{slope} & \nearrow & \rightarrow & \searrow \end{array}"
      />
    ),
    reason: <>Set the results out as a sign table. The gradient goes positive, zero, negative: the curve rises to <Katex tex="\left(3,\tfrac{29}{4}\right)" /> and then falls.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(3,\tfrac{29}{4}\right) \text{ is a local maximum}}" />,
    reason: (
      <>
        The second derivative also works:{' '}
        <Katex tex="\tfrac{d^2y}{dx^2}=\tfrac12(x+6)^{-\frac12}-\tfrac12=\tfrac{1}{2\sqrt{x+6}}-\tfrac12" />, which
        at <Katex tex="x=3" /> is <Katex tex="\tfrac16-\tfrac12=-\tfrac13<0" />, so the curve is concave down there,
        giving a local maximum. The diagram below shows which test values make the substitution easy to write down.
      </>
    ),
  },
]

export default function MethodsQ8_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (5 marks)</p>
        <p>
          The gradient of a function is given by{' '}
          <Katex tex="\dfrac{dy}{dx}=\sqrt{x+6}-\dfrac{x}{2}-\dfrac32" />.
          <br />
          The graph of the function has a single stationary point at{' '}
          <Katex tex="\left(3,\tfrac{29}{4}\right)" />.
        </p>
      </div>

      <PartCard letter="a" topic="Antidifferentiation" marks={3} statement={<>Find the rule of the function.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Nature of Point"
        marks={2}
        statement={<>Determine the nature of the stationary point.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Choose test points where √(x + 6) comes out exact">
          <TestPointsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
