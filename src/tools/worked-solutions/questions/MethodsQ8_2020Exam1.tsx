// 2020 Mathematical Methods — Exam 1, Question 8 (8 marks). The minimum of x·log_e(x), a
// show-that antiderivative, the area under the curve, and two conditions on a vertical
// translation. Question text transcribed from the original paper; the figure is cropped from the
// original VCAA exam PDF. Answers checked with sympy and against the VCAA examination report and
// itute (which agree throughout: Q(1/e, −1/e), (e² − 3)/(4e²), k = e, k > 1). Solution is original.
// The part d.ii working uses the gap g(x) − x, whose stationary point is the report's "gradient of
// g equals the gradient of y = x"; itute does the same via g′(x) = 1. The stem box before d.i now
// carries the paper's "d." label (Sept 2026 review).
// Oct 2026 Concise/Detailed rebalance: reasons trimmed to the step itself; checks, report commentary
// and diagram pointers moved to each row's `more`. All answers re-verified with sympy.
//
// Interactive diagrams (§15): part a. drags a point along f to watch the tangent's gradient
// log_e(x) + 1 go through 0 at Q, with a toggle for the multiply-the-derivatives slip
// (interactives/meth-2020e1-q8a-flat.tsx); part c. sweeps the upper terminal from a to show every
// strip below the axis counting as negative, so the area is minus the integral
// (interactives/meth-2020e1-q8c-signed.tsx); part d.i. lifts g against y = 2x, with the tangent at
// x = e always parallel to the line (interactives/meth-2020e1-q8di-tangent.tsx); part d.ii. lifts
// g against g⁻¹ and y = x, with a button for the "lift Q above y = x" wrong idea
// (interactives/meth-2020e1-q8dii-inverse.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2020e1-q8-graph.png'

const FlatWidget = lazyWidget(() => import('../interactives/meth-2020e1-q8a-flat'))
const SignedWidget = lazyWidget(() => import('../interactives/meth-2020e1-q8c-signed'))
const TangentWidget = lazyWidget(() => import('../interactives/meth-2020e1-q8di-tangent'))
const InverseWidget = lazyWidget(() => import('../interactives/meth-2020e1-q8dii-inverse'))

const EXAM_A: SAExaminerStats = {
  marks: [24, 17, 59],
  average: 1.3,
  comment: (
    <>
      The most common errors were incorrect differentiation of{' '}
      <Katex tex="f(x)=x\log_e(x)" /> or incorrect evaluation of{' '}
      <Katex tex="f\!\left(\tfrac1e\right)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      Many students made-up their working as the answer was given, rather than clearly
      demonstrating progression to the answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [66, 23, 11],
  average: 0.5,
  comment: (
    <>
      Many students were unsure of which terminals to use for the definite integral, opting to
      use a generic 'a' and 'b'. A common oversight was the fact that the required area was
      below the <Katex tex="x" />-axis. Other errors occurred in evaluation.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [84, 16],
  average: 0.2,
  comment: (
    <>
      Many students did not attempt this question. Those who persisted recognised that the
      gradient was 2, though often gave the incorrect answer of <Katex tex="x=e" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [95, 2, 3],
  average: 0.1,
  comment: (
    <>
      Some students tried to algebraically find the point of intersection of the graphs of
      function and its inverse function, with limited progress. This question could also be solved
      by consideration of the point where the gradient of <Katex tex="g(x)" /> was equal to
      the gradient of <Katex tex="y=x" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 1\cdot\log_e(x)+x\cdot\frac1x" />,
    reason: <><Katex tex="f(x)=x\log_e(x)" /> is a product, so use the product rule <Katex tex="(uv)'=u'v+uv'" /> with <Katex tex="u=x" /> and <Katex tex="v=\log_e(x)" />.</>,
    more: <>Each factor is differentiated in turn while the other is left alone, and the two products are added. The report names incorrect differentiation of <Katex tex="f" /> as one of the most common errors. Drag P in the diagram below to watch the tangent's gradient <Katex tex="\log_e(x)+1" /> pass through 0 at Q.</>,
  },
  {
    working: <Katex display tex="f'(x) = \log_e(x)+1 = 0" />,
    reason: <>Q is a turning point, so its gradient is 0. The question already says Q is a minimum, so there is no need to test its nature.</>,
  },
  {
    working: <Katex display tex="\log_e(x) = -1 \implies x = e^{-1} = \tfrac1e" />,
    reason: <>Rewrite in exponential form: <Katex tex="\log_e(x)=c \iff x=e^c" />. So <Katex tex="a=\tfrac1e" />.</>,
    more: <>Don't be put off by the <Katex tex="-1" />: a log <em>can</em> be negative; it is the input <Katex tex="x" /> that must be positive, and <Katex tex="e^{-1}>0" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac1e\right) = \tfrac1e\log_e\!\left(e^{-1}\right) = \tfrac1e\times(-1)" />,
    reason: <>Substitute back for the <Katex tex="y" />-coordinate. A log undoes an exponential: <Katex tex="\log_e\!\left(e^{c}\right)=c" />, so <Katex tex="\log_e\!\left(e^{-1}\right)=-1" />.</>,
    more: <>This is the evaluation the report names as the other most common error.</>,
  },
  {
    working: <Katex display tex="\boxed{Q = \left(\tfrac1e,\,-\tfrac1e\right)}" />,
    reason: <>Both coordinates of Q.</>,
    more: <>Check against the printed graph: <Katex tex="x\approx0.37" /> is just right of <Katex tex="O" /> and <Katex tex="y\approx-0.37" /> is below the axis, where Q is drawn.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\!\left(x^2\log_e(x)\right) = 2x\log_e(x)+x" />,
    reason: <>The given result. The question says to use it, so the mark is for turning this derivative fact into an integral fact.</>,
  },
  {
    working: <Katex display tex="\int\bigl(2x\log_e(x)+x\bigr)dx = x^2\log_e(x)+c" />,
    reason: <>Read the derivative backwards: if <Katex tex="\tfrac{d}{dx}(A)=B" />, then <Katex tex="\int B\,dx=A+c" /> (integration by recognition).</>,
    more: <>This is always the first move when a question hands you a derivative and asks for an antiderivative.</>,
  },
  {
    working: <Katex display tex="2\int x\log_e(x)\,dx + \int x\,dx = x^2\log_e(x)+c" />,
    reason: <>Split the integral. The one we want, <Katex tex="\int x\log_e(x)\,dx" />, appears doubled, next to an easy one.</>,
  },
  {
    working: <Katex display tex="2\int x\log_e(x)\,dx = x^2\log_e(x)-\frac{x^2}{2}+c" />,
    reason: <>Move the easy integral across: <Katex tex="\int x\,dx=\tfrac{x^2}2" /> (its constant is absorbed into <Katex tex="c" />).</>,
    more: <>This step is where the <Katex tex="-\tfrac{x^2}{4}" /> in the answer comes from.</>,
  },
  {
    working: <Katex display tex="\int x\log_e(x)\,dx = \frac{x^2\log_e(x)}{2}-\frac{x^2}{4}+\frac c2" />,
    reason: <>Divide by 2 to isolate the integral we want.</>,
  },
  {
    working: <Katex display tex="\boxed{\int x\log_e(x)\,dx = \frac{x^2\log_e(x)}{2}-\frac{x^2}{4}}" />,
    reason: <>The question asks for <em>an</em> antiderivative, so any constant will do: take <Katex tex="c=0" />. As required.</>,
    more: <>The report's alternative is to differentiate the given answer and show it returns <Katex tex="x\log_e(x)" />. Either way every line has to follow from the one before: the report notes many students made up their working because the answer was given.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x\log_e(x) = 0 \implies x = 1, \text{ so } b = 1" />,
    reason: <><Katex tex="b" /> is where <Katex tex="f(x)=0" />, so <Katex tex="x=0" /> or <Katex tex="\log_e(x)=0" />. But <Katex tex="x=0" /> is not in the domain <Katex tex="(0,\infty)" />, so <Katex tex="x=e^0=1" />.</>,
    more: <>A product is 0 when one of its factors is 0. The open circle at <Katex tex="O" /> on the graph shows that <Katex tex="x=0" /> is excluded.</>,
  },
  {
    working: <Katex display tex="\tfrac1e \le x \le 1 \implies f(x) \le 0" />,
    reason: <>Here <Katex tex="x>0" /> but <Katex tex="\log_e(x)\le0" />, so the region is below the axis: the integral is negative, and the area is its negative.</>,
    more: <>The report calls forgetting that the region is below the axis a common oversight.</>,
  },
  {
    working: <Katex display tex="A = -\int_{1/e}^{1}x\log_e(x)\,dx" />,
    reason: <>The terminals are actual numbers: <Katex tex="a=\tfrac1e" /> from part a and <Katex tex="b=1" /> from the first line.</>,
    more: <>The report notes many students used a generic <Katex tex="a" /> and <Katex tex="b" />, which can't be evaluated.</>,
  },
  {
    working: <Katex display tex="= -\left[\frac{x^2\log_e(x)}{2}-\frac{x^2}{4}\right]_{1/e}^{1}" />,
    reason: <>Using the antiderivative from part b (that is what part b was for).</>,
  },
  {
    working: <Katex display tex="x=1: \quad 0-\tfrac14 = -\tfrac14" />,
    reason: <><Katex tex="\log_e(1)=0" />.</>,
  },
  {
    working: <Katex display tex="x=\tfrac1e: \quad \frac{e^{-2}(-1)}{2}-\frac{e^{-2}}{4} = -\frac{3}{4e^2}" />,
    reason: <><Katex tex="\left(\tfrac1e\right)^2=e^{-2}" /> and <Katex tex="\log_e\!\left(e^{-1}\right)=-1" />, so <Katex tex="-\tfrac1{2e^2}-\tfrac1{4e^2}=-\tfrac3{4e^2}" />.</>,
  },
  {
    working: <Katex display tex="A = -\left(-\tfrac14+\tfrac{3}{4e^2}\right) = \tfrac14-\tfrac{3}{4e^2}" />,
    reason: <>Upper value minus lower value, then the minus sign out the front.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{e^2-3}{4e^2}}" />,
    reason: <>Over a common denominator <Katex tex="4e^2" />, as VCAA writes it. About <Katex tex="0.148" />: positive, as an area must be.</>,
    more: <>That size is plausible for a sliver <Katex tex="1-\tfrac1e\approx0.63" /> wide and at most <Katex tex="\tfrac1e\approx0.37" /> deep.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = x\log_e(x)+k \implies g'(x) = \log_e(x)+1" />,
    reason: <><Katex tex="g" /> is <Katex tex="f" /> moved up <Katex tex="k" /> units; the <Katex tex="k" /> differentiates to 0, so <Katex tex="g'=f'" /> from part a.</>,
    more: <>Moving a graph up doesn't change how steep it is anywhere.</>,
  },
  {
    working: <Katex display tex="g'(x) = 2 \implies \log_e(x) = 1 \implies x = e" />,
    reason: <>A tangent has the curve's gradient where it touches, and <Katex tex="y=2x" /> has gradient 2. This finds <em>where</em> it touches, not <Katex tex="k" />.</>,
    more: <>The report notes students often stopped here and gave <Katex tex="x=e" />.</>,
  },
  {
    working: <Katex display tex="g(e) = e\log_e(e)+k = e+k" />,
    reason: <>A tangent also shares its <em>point</em> with the curve. That second condition is the one with <Katex tex="k" /> in it.</>,
  },
  {
    working: <Katex display tex="y = 2x \text{ at } x=e \text{ gives } y = 2e" />,
    reason: <>The line's height at the same <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="e+k = 2e \implies \boxed{k = e}" />,
    reason: <>Equal heights at <Katex tex="x=e" />. The question asks for <Katex tex="k" />, not the <Katex tex="x" />-value (both happen to be <Katex tex="e" />).</>,
    more: <>Check: <Katex tex="x=e" /> is in the domain <Katex tex="\left(\tfrac1e,\infty\right)" />, and the tangent at <Katex tex="(e,2e)" /> is <Katex tex="y-2e=2(x-e)" />, which is <Katex tex="y=2x" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = \log_e(x)+1 > 0 \text{ for } x > \tfrac1e" />,
    reason: <>The domain <Katex tex="(a,\infty)" /> starts at the minimum, so <Katex tex="g" /> is increasing on all of it (hence one-to-one, so <Katex tex="g^{-1}" /> exists).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&g \text{ increasing} \implies \\ &g \text{ and } g^{-1} \text{ can only meet on } y = x\end{aligned}" />,
    reason: <><Katex tex="g^{-1}" /> is <Katex tex="g" /> reflected in <Katex tex="y=x" />, and an increasing function meets its inverse only on that line. So compare <Katex tex="g" /> with <Katex tex="y=x" />.</>,
    more: <>The Background above proves the &ldquo;only on <Katex tex="y=x" />&rdquo; fact. This avoids needing the rule of <Katex tex="g^{-1}" />.</>,
  },
  {
    working: <Katex display tex="\text{Let } d(x) = g(x)-x = x\log_e(x)-x+k" />,
    reason: <>The gap between curve and line. It is large and positive far to the right, so no intersection means its smallest value is positive.</>,
    more: <>No intersection means <Katex tex="d(x)" /> is never 0. For large <Katex tex="x" />, <Katex tex="d(x)=x\bigl(\log_e(x)-1\bigr)+k" /> is large and positive, so &ldquo;never 0&rdquo; means &ldquo;positive everywhere&rdquo;.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}d'(x) &= \log_e(x)+1-1 = \log_e(x) \\ d'(x) &= 0 \implies x = 1\end{aligned}" />,
    reason: <><Katex tex="d'(x)=g'(x)-1" />, so the gap is stationary where <Katex tex="g'(x)=1" />: where the curve runs parallel to <Katex tex="y=x" />.</>,
    more: <>This is the report's &ldquo;point where the gradient of <Katex tex="g(x)" /> was equal to the gradient of <Katex tex="y=x" />&rdquo;.</>,
  },
  {
    working: <Katex display tex="d(1) = 1\cdot0-1+k = k-1, \quad\text{a minimum}" />,
    reason: <><Katex tex="d'(x)=\log_e(x)" /> is negative for <Katex tex="x<1" /> and positive for <Katex tex="x>1" />, so <Katex tex="k-1" /> is the smallest gap anywhere.</>,
    more: <>The gap shrinks and then grows, so this is a minimum of <Katex tex="d" />. (The lifted curve passes through <Katex tex="(1,k)" />.)</>,
  },
  {
    working: <Katex display tex="k-1 > 0 \implies \boxed{k > 1}" />,
    reason: <>Strictly greater: at <Katex tex="k=1" /> the curves touch at <Katex tex="(1,1)" />, which is still an intersection.</>,
    more: <>Another way to see it: <Katex tex="g(x)=x \iff k=x-x\log_e(x)" />, and the right-hand side has maximum value 1 (at <Katex tex="x=1" />), so there is no solution exactly when <Katex tex="k>1" />. Only 3% of students scored both marks.</>,
  },
]

export default function MethodsQ8_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (8 marks)</p>
        <p>
          Part of the graph of <Katex tex="y=f(x)" />, where{' '}
          <Katex tex="f:(0,\infty)\to R" />, <Katex tex="f(x)=x\log_e(x)" />, is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The curve y = x log_e(x) starting at an open circle at O, dipping just below the x-axis to a minimum labelled Q(a, f(a)), crossing back at (b, 0) and then rising steeply — from the original 2020 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
        <p>
          The graph of <Katex tex="f" /> has a minimum at the point{' '}
          <Katex tex="Q\bigl(a,f(a)\bigr)" />, as shown above.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Minimum Point"
        marks={2}
        statement={<>Find the coordinates of the point <Katex tex="Q" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="Q is where the tangent lies flat: slide P and watch the gradient pass through 0">
          <FlatWidget />
        </Explore>
        <WrongMethod
          title="Differentiate each factor and multiply"
          working={
            <>
              <Katex display tex="f'(x) = 1\times\frac1x = \frac1x" />
              <Katex display tex="\frac1x = 0 \text{ has no solution}" />
            </>
          }
        >
          That is not the product rule, and the result says the curve has no turning point, which the
          graph plainly contradicts. The rule differentiates one factor at a time and adds:{' '}
          <Katex tex="(x)'\log_e(x)+x\left(\log_e(x)\right)'=\log_e(x)+1" />. Whenever a derivative
          gives an answer the printed graph can't have, suspect the differentiation.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Antiderivative"
        marks={1}
        statement={
          <>
            Using{' '}
            <Katex tex="\dfrac{d}{dx}\!\left(x^2\log_e(x)\right)=2x\log_e(x)+x" />, show that{' '}
            <Katex tex="x\log_e(x)" /> has an antiderivative{' '}
            <Katex tex="\dfrac{x^2\log_e(x)}{2}-\dfrac{x^2}{4}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Halve the given derivative, then write in the −x²/4"
          working={
            <>
              <Katex display tex="\int x\log_e(x)\,dx = \tfrac12x^2\log_e(x)" />
              <Katex display tex="\ldots = \tfrac12x^2\log_e(x)-\tfrac{x^2}{4}" />
            </>
          }
        >
          The first line is wrong: differentiating it gives{' '}
          <Katex tex="\tfrac{d}{dx}\left(\tfrac12x^2\log_e(x)\right)=x\log_e(x)+\tfrac x2" />, which has
          an extra <Katex tex="\tfrac x2" /> (half of the <Katex tex="+x" /> in the given result). Removing
          it means subtracting <Katex tex="\int\tfrac x2\,dx=\tfrac{x^2}4" />, and that is where the{' '}
          <Katex tex="-\tfrac{x^2}4" /> comes from. Writing it in because the answer needs it shows
          nothing; the mark is for the line that produces it.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Find the area of the region that is bounded by <Katex tex="f" />, the line{' '}
            <Katex tex="x=a" /> and the horizontal axis for <Katex tex="x\in[a,b]" />, where{' '}
            <Katex tex="b" /> is the <Katex tex="x" />-intercept of <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Below the axis every strip counts as negative, so the area is minus the integral">
          <SignedWidget />
        </Explore>
        <WrongMethod
          title="The area is just the integral from a to b"
          source="Examiner's report"
          working={<Katex display tex="\int_{1/e}^{1}x\log_e(x)\,dx = -\tfrac14+\tfrac3{4e^2} = \frac{3-e^2}{4e^2}" />}
        >
          Since <Katex tex="e^2\approx7.4>3" />, this is about <Katex tex="-0.148" />: a negative
          &ldquo;area&rdquo;, which is the giveaway. The region is below the axis, so every strip has a
          negative height and the integral is negative. The area is its opposite,{' '}
          <Katex tex="\tfrac{e^2-3}{4e^2}" />. Before integrating, look at the graph and ask whether the
          region is above or below the axis.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">d.</p>
        <p>
          Let <Katex tex="g:(a,\infty)\to R" />, <Katex tex="g(x)=f(x)+k" /> for{' '}
          <Katex tex="k\in R" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="k" /> for which <Katex tex="y=2x" /> is a tangent to
            the graph of <Katex tex="g" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
        <Explore title="Lift the curve until y = 2x touches it: the gradient fixes where, the point fixes k">
          <TangentWidget />
        </Explore>
        <WrongMethod
          title="Solve g′(x) = 2 and stop"
          source="Examiner's report"
          working={<Katex display tex="g'(x) = \log_e(x)+1 = 2 \implies x = e" />}
        >
          This is the <Katex tex="x" />-coordinate of the point of contact, not the value of{' '}
          <Katex tex="k" />. It can't be the whole answer: <Katex tex="k" /> disappeared when you
          differentiated, so the gradient condition knows nothing about how far the curve is lifted. A
          tangent needs a second condition, that the point is on both the curve and the line:{' '}
          <Katex tex="g(e)=2e" />, which gives <Katex tex="k=e" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Inverse Intersections"
        marks={2}
        statement={
          <>
            Find all values of <Katex tex="k" /> for which the graphs of <Katex tex="g" /> and{' '}
            <Katex tex="g^{-1}" /> do not intersect.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <Background title="Why an increasing function can only meet its inverse on y = x">
          <p>
            Suppose a point <Katex tex="(p,q)" /> is on both graphs. It is on <Katex tex="g" />, so{' '}
            <Katex tex="q=g(p)" />. It is also on <Katex tex="g^{-1}" />, whose points are the points of{' '}
            <Katex tex="g" /> with their coordinates swapped, so <Katex tex="(q,p)" /> is on{' '}
            <Katex tex="g" />: <Katex tex="p=g(q)" />.
          </p>
          <p>
            If <Katex tex="p<q" />, then because <Katex tex="g" /> is increasing, <Katex tex="g(p)<g(q)" />,
            that is <Katex tex="q<p" />: a contradiction. The same happens if <Katex tex="p>q" />. So{' '}
            <Katex tex="p=q" />, and the point is on <Katex tex="y=x" />. The two graphs meet exactly where{' '}
            <Katex tex="g" /> meets the line <Katex tex="y=x" />.
          </p>
          <p>
            This needs <Katex tex="g" /> increasing. A decreasing function can meet its inverse off the
            line: <Katex tex="y=-x^3" /> meets its inverse at <Katex tex="(1,-1)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <Explore title="g and g⁻¹ can only meet on y = x, so lift g until it clears the line">
          <InverseWidget />
        </Explore>
        <WrongMethod
          title="Find where g and g⁻¹ meet by solving g(x) = g⁻¹(x)"
          source="Examiner's report"
          working={<Katex display tex="x = y\log_e(y)+k \implies y = \;?" />}
        >
          To use <Katex tex="g^{-1}" /> you would need its rule, and <Katex tex="x=y\log_e(y)+k" /> can't
          be rearranged to make <Katex tex="y" /> the subject with any function in the course. The report
          notes students who went this way made limited progress. Because <Katex tex="g" /> is
          increasing, the intersections are on <Katex tex="y=x" />, so compare <Katex tex="g" /> with{' '}
          <Katex tex="y=x" /> and never find the inverse at all.
        </WrongMethod>
        <WrongMethod
          title="Lift the minimum Q above y = x"
          working={<Katex display tex="-\tfrac1e+k > \tfrac1e \implies k > \tfrac2e" />}
        >
          Take <Katex tex="k=0.9" />, which satisfies this. Then <Katex tex="g(1)=0.9<1" />, so at{' '}
          <Katex tex="x=1" /> the curve is <em>below</em> <Katex tex="y=x" />, while near Q it is above:
          it still crosses the line twice (press the button in the diagram above). The curve leans the
          same way as <Katex tex="y=x" />, so the last place to clear the line is not the lowest point
          but where the curve runs parallel to it, <Katex tex="g'(x)=1" /> at <Katex tex="x=1" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
