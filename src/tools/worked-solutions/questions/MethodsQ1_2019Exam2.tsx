// 2019 Mathematical Methods — Exam 2, Question 1 (11 marks).
// f(x) = x²e^(−x²) — its derivative, the stationary point at the origin, the maximum value
// (part b), the tangent at x=−1 and the area it encloses with f (part c), then the minimum
// distance from a point on the graph to (0, e) (part d). Question text transcribed from the
// original paper. VCAA printed no diagram for this question, so the three graphs below are
// this site's own explanatory figures, plotted with matplotlib — the examination report
// itself says "errors could have been avoided in Question 1 if a graph of the function had
// been sketched", so the solution shows that sketch. Cross-checked against the VCAA
// examination report and itute's independent solutions, and independently re-derived (the
// numeric parts of b, c and d by computer algebra, matching both sources exactly).
// Solution is original.
// Interactive widgets (after the working): b.i — slide a tangent along f and read the sign of f′
// either side of each stationary point (meth-2019e2-q1bi-sign); b.iii — slide the graph down by d
// until even the peaks are below the axis, with d = −1/e exactly as the failing boundary case
// (meth-2019e2-q1biii-shift); c.ii — what each integral set-up (the correct one, the report's
// rectangle method and its three listed incorrect set-ups) actually measures
// (meth-2019e2-q1cii-which-area); d — drag M along the curve with the link to (0, e), the tangent
// at M and a graph of D(m): the minimum is where the link meets the curve at 90°, and m = 0 is the
// other (maximum) solution of D′(m) = 0 (meth-2019e2-q1d-closest).
// Note: the examination report's part d answer line writes "d(0.738...) = 2.511", a digit swap
// for m = 0.783 (the report's own stated m value); we follow 0.783.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import curveSrc from './meth-2019e2-q1-curve.png'
import areaSrc from './meth-2019e2-q1-area.png'
import distanceSrc from './meth-2019e2-q1-distance.png'

const SignWidget = lazyWidget(() => import('../interactives/meth-2019e2-q1bi-sign'))
const ShiftWidget = lazyWidget(() => import('../interactives/meth-2019e2-q1biii-shift'))
const WhichAreaWidget = lazyWidget(() => import('../interactives/meth-2019e2-q1cii-which-area'))
const ClosestWidget = lazyWidget(() => import('../interactives/meth-2019e2-q1d-closest'))

const EXAM_A: SAExaminerStats = {
  marks: [6, 94],
  average: 1.0,
  comment: (
    <>
      This question was answered well. Some students appeared to transcribe the output from
      technology incorrectly: <Katex tex="f'(x)=2x^3e^{-x^2}-2xe^{-x^2}" /> and{' '}
      <Katex tex="f'(x)=2e^{-x^2}-2x^3e^{-x^2}" /> were occasionally seen. Others tried to find
      the derivative by hand or further engaged with the output from technology and made
      errors.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Some students did not understand what the term
      "nature of the stationary point" meant. Common incorrect answers were point of
      inflection, stationary points and turning points. Some gave the coordinates of the
      turning point, <Katex tex="(0,0)" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [10, 22, 67],
  average: 1.6,
  comment: (
    <>
      Some students included <Katex tex="x=0" /> or only gave one answer for <Katex tex="x" />.
      Others did not find the maximum value. Some gave the approximate answer for the maximum
      value. An exact answer was required.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [65, 35],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Common incorrect answers were{' '}
      <Katex tex="d=-\tfrac1e" />, <Katex tex="d\le-\tfrac1e" />, <Katex tex="d>\tfrac1e" />,{' '}
      <Katex tex="d>-\tfrac1e" />, <Katex tex="d<\tfrac1e" /> or{' '}
      <Katex tex="d<-x^2e^{-x^2}" />. Some students wrote{' '}
      <Katex tex="\left(-\tfrac1e,-\infty\right)" />. Others did not attempt the question.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: <>This question was answered well. An equation was required.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [32, 12, 56],
  average: 1.3,
  comment: (
    <>
      Most students were able to subtract <Katex tex="f" /> from their tangent. Common
      incorrect methods were{' '}
      <Katex tex="\displaystyle\int_0^1\left(\frac1e-x^2e^{-x^2}\right)dx" /> and{' '}
      <Katex tex="\displaystyle\int_{-1}^1\left(x^2e^{-x^2}\right)dx" /> and{' '}
      <Katex tex="\displaystyle\int_{-1}^1\left(x^2e^{-x^2}-\frac1e\right)dx" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [46, 23, 7, 24],
  average: 1.1,
  comment: (
    <>
      Many students were able to use the distance formula. Others found <Katex tex="m" /> but
      not the distance. Some gave their answers correct to two decimal places.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \underbrace{x^2}_{u}\cdot\underbrace{e^{-x^2}}_{v}" />,
    reason: <><Katex tex="f" /> is a <b>product</b> of two functions of <Katex tex="x" />, so differentiate it with the product rule <Katex tex="(uv)'=u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="u=x^2 \implies u'=2x" />,
    reason: <>Power rule.</>,
  },
  {
    working: <Katex display tex="v=e^{-x^2} \implies v'=-2x\,e^{-x^2}" />,
    reason: <>Chain rule: <Katex tex="\tfrac{d}{dx}e^{g(x)}=g'(x)e^{g(x)}" />, with inside function <Katex tex="g(x)=-x^2" />, so <Katex tex="g'(x)=-2x" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x\cdot e^{-x^2} + x^2\cdot\left(-2x\,e^{-x^2}\right)" />,
    reason: <>Substitute into <Katex tex="u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = 2xe^{-x^2}-2x^3e^{-x^2} = 2x\left(1-x^2\right)e^{-x^2}}" />,
    reason: <>On Exam 2, <Cas fn="derivative">d/dx(x^2*e^(-x^2))</Cas> gives this directly. Any equivalent form is accepted; take the factorised one forward, as part b. reads off it.</>,
    more: <>The hand working above shows where the CAS output comes from. Copy that output carefully: the report notes transcription errors such as <Katex tex="2x^3e^{-x^2}-2xe^{-x^2}" /> (the signs swapped) and <Katex tex="2e^{-x^2}-2x^3e^{-x^2}" /> (an <Katex tex="x" /> dropped), and errors from students who went on to rework the output by hand.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2x(1-x^2)e^{-x^2} = 0" />,
    reason: <>Stationary points are where the gradient is zero.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &e^{-x^2}>0 \text{ for every } x \\ &\implies 2x(1-x^2)=0 \\ &\implies x=-1,\ 0 \text{ or } 1 \end{aligned}" />,
    reason: <>An exponential is never zero, so it can be divided out — only the polynomial factor can make <Katex tex="f'" /> vanish.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f'(-0.5) = 2(-0.5)(1-0.25)e^{-0.25} < 0" />
        <Katex display tex="f'(0.5) = 2(0.5)(1-0.25)e^{-0.25} > 0" />
      </>
    ),
    reason: <>Test the sign of <Katex tex="f'" /> just either side of <Katex tex="x=0" />. Only the sign matters: <Katex tex="1-x^2" /> and <Katex tex="e^{-x^2}" /> are positive here, so the sign is that of <Katex tex="2x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Local minimum}}" />,
    reason: <>Negative then positive: <Katex tex="f" /> falls then rises, so the origin is a local minimum. The "nature" is this word, not the coordinates.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Stationary points at } x=-1,\ 0,\ 1 \quad \text{(part b.i)}" />,
    reason: <>If this smooth function has a maximum on <Katex tex="R" />, it must be at a stationary point, so check each solution of <Katex tex="f'(x)=0" /> from part b.i.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f(-1) = (-1)^2e^{-(-1)^2} = e^{-1} = \dfrac1e" />
        <Katex display tex="f(1) = 1^2e^{-1^2} = \dfrac1e, \qquad f(0)=0" />
      </>
    ),
    reason: <>Evaluate <Katex tex="f" /> at each. <Katex tex="f(-1)=f(1)" /> because <Katex tex="f" /> only involves <Katex tex="x^2" />: it is an <b>even</b> function.</>,
    more: <>An even function's graph is symmetric about the <Katex tex="y" />-axis, so a peak at <Katex tex="x=1" /> always has a mirror-image twin at <Katex tex="x=-1" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} f(x)=x^2e^{-x^2}\ge0 \text{ for every } x \\ f(x)\to0 \text{ as } x\to\pm\infty \end{gathered}" />,
    reason: <>The curve never dips below the axis and flattens towards it at both ends, so the peaks at <Katex tex="x=\pm1" /> are the highest points overall, not just locally.</>,
    more: <>Why: a square times a positive exponential can't be negative, and <Katex tex="e^{-x^2}" /> shrinks far faster than <Katex tex="x^2" /> grows, so <Katex tex="f(x)" /> heads to <Katex tex="0" /> as <Katex tex="x" /> moves away from the origin in either direction.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={curveSrc} alt="Graph of f(x) = x²e^(−x²): a twin-humped curve with equal maximum points at (−1, 1/e) and (1, 1/e) and a minimum at the origin" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>A quick sketch shows two equal humps, so there are <em>two</em> values of <Katex tex="x" /> to give, not one.</>,
    more: <>The examination report's general advice says errors in Question 1 could have been avoided if a graph of the function had been sketched. On CAS, graph <Katex tex="f" /> before answering any of the parts.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum value } \dfrac1e, \text{ at } x=-1 \text{ and } x=1}" />,
    reason: <>Give both the maximum <em>value</em> and the <Katex tex="x" />-values. Keep <Katex tex="\tfrac1e" /> exact: the report says an exact answer was required.</>,
    more: <>The report notes some students did not find the maximum value at all, and some gave an approximate answer (such as <Katex tex="0.368" />) instead of <Katex tex="\tfrac1e" />.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Range of } f = \left[0,\ \dfrac1e\right]" />,
    reason: <>From part b.ii.: the smallest value <Katex tex="f" /> takes is <Katex tex="0" /> (at the origin) and the largest is <Katex tex="\tfrac1e" /> (at <Katex tex="x=\pm1" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &f(x)+d<0 \ \text{ for every } x \\ &\iff d < -f(x) \ \text{ for every } x \end{aligned}" />,
    reason: <>Rearrange. The condition has to hold at <em>every</em> <Katex tex="x" />, so <Katex tex="d" /> must beat the hardest case.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{Hardest case: } x=\pm1, \text{ where } f(x) \text{ is largest} \\ &\implies d<-\dfrac1e \end{aligned}" />,
    reason: <>Adding <Katex tex="d" /> shifts the whole graph vertically. To get every point below the axis, the shift must clear the <em>highest</em> point, <Katex tex="\tfrac1e" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d<-\dfrac1e}" />,
    reason: <>Strict inequality: at <Katex tex="d=-\tfrac1e" /> the peaks sit exactly on the axis, and zero isn't negative.</>,
    more: <>In interval notation the answer is <Katex tex="\left(-\infty,-\tfrac1e\right)" />, smaller end first; the report saw students write <Katex tex="\left(-\tfrac1e,-\infty\right)" />. Answers such as <Katex tex="d>-\tfrac1e" /> or <Katex tex="d<\tfrac1e" /> fail a quick test: <Katex tex="d=0" /> satisfies both, yet leaves the peaks above the axis. And <Katex tex="d>\tfrac1e" /> lifts the whole graph above the axis, the opposite of what is asked.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}f'(-1) &= 2(-1)\bigl(1-(-1)^2\bigr)e^{-1}\\ &= -2\times 0\times e^{-1}\\ &= 0\end{aligned}" />,
    reason: <><Katex tex="x=-1" /> is a stationary point (part b.), so the gradient is zero and the tangent is <b>horizontal</b>.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &f(-1) = \dfrac1e \\ &\implies \text{the tangent passes through } \left(-1,\ \dfrac1e\right) \end{aligned}" />,
    reason: <>The point of contact, from part b.ii.</>,
  },
  {
    working: <Katex display tex="\boxed{y=\dfrac1e}" />,
    reason: <>The horizontal line through <Katex tex="\left(-1,\tfrac1e\right)" />. Write it as an <em>equation</em>: the report says an equation was required.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac1e = x^2e^{-x^2} \implies x=-1 \text{ or } x=1" />,
    reason: <>Find where the tangent meets the curve. As <Katex tex="\tfrac1e" /> is the maximum of <Katex tex="f" /> (part b.ii), the line only touches at the two peaks: these are the terminals (limits of integration).</>,
  },
  {
    working: <Katex display tex="\text{On } [-1,1]: \quad f(x) \le \dfrac1e" />,
    reason: <>The line is the upper boundary and the curve is the lower one, so the integrand is <Katex tex="(\text{line})-(\text{curve})" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_{-1}^{1}\left(\dfrac1e - x^2e^{-x^2}\right)dx" />,
    reason: <>Integrate between the terminals <Katex tex="x=\pm1" />: each thin vertical strip has height <Katex tex="\tfrac1e-f(x)" />.</>,
    more: <>The report's other method gives the same number: the rectangle under the tangent, <Katex tex="2\times\tfrac1e\approx0.7358" />, minus the area under the curve, <Katex tex="\int_{-1}^{1}x^2e^{-x^2}dx\approx0.3789" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={areaSrc} alt="The same curve with the horizontal tangent y = 1/e drawn, and the region enclosed between the line and the curve from x = −1 to x = 1 shaded" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>The enclosed region is the gap between the flat tangent and the dip of the curve between the two peaks.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} \approx 0.3568}" />,
    reason: <>Evaluate with <Cas fn="nInt">nInt(1/e - x^2*e^(-x^2), x, -1, 1)</Cas> and round to four decimal places, as asked.</>,
    more: <><Katex tex="x^2e^{-x^2}" /> has no antiderivative that can be written with the functions in this course, so this integral has to be done by technology, which is what Exam 2 expects. The definite-integral template does the same job.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="M=(m,\ n) \text{ lies on } f \implies n=f(m)=m^2e^{-m^2}" />,
    reason: <>"On the graph of <Katex tex="f" />" is what pins <Katex tex="n" /> to <Katex tex="m" />, turning a two-variable problem into a one-variable one.</>,
  },
  {
    working: <Katex display tex="D(m) = \sqrt{(m-0)^2 + \left(m^2e^{-m^2}-e\right)^2}" />,
    reason: <>Distance formula <Katex tex="\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}" /> between <Katex tex="M(m,\ m^2e^{-m^2})" /> and the fixed point <Katex tex="(0,\ e)" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={distanceSrc} alt="The curve with the fixed point (0, e) marked well above it and the shortest segment drawn down to the point M on the curve, of length about 2.511" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <><Katex tex="(0,e)" /> sits far above the curve (<Katex tex="e\approx2.72" />, but <Katex tex="f(x)\le\tfrac1e\approx0.37" />), so the shortest link runs steeply down to the curve.</>,
  },
  {
    working: <Katex display tex="\text{Minimise } D(m) \text{ for } m\in[0,1]" />,
    reason: <>Use technology: <Cas fn="define">Define dist(m)=√(m^2+(m^2*e^(-m^2)-e)^2)</Cas>, then <Cas fn="fMin">fMin(dist(m), m) | 0&lt;=m&lt;=1</Cas> gives the minimising <Katex tex="m\approx0.783" />.</>,
    more: <>Graphing <Katex tex="D" /> against <Katex tex="m" /> and reading off the minimum works just as well. If you solve <Katex tex="D'(m)=0" /> instead, you get <em>two</em> solutions in <Katex tex="[0,1]" />: <Katex tex="m\approx0.783" /> and <Katex tex="m=0" />. At <Katex tex="m=0" /> the curve is flat and <Katex tex="(0,e)" /> is directly above it, so <Katex tex="D" /> is stationary there too, but <Katex tex="D(0)=e" /> is the <em>largest</em> distance on the interval, so discard it.</>,
  },
  {
    working: <Katex display tex="D(0)=e\approx2.718, \qquad D(1)\approx2.554" />,
    reason: <>Check the endpoints of <Katex tex="[0,1]" /> too: both exceed <Katex tex="D(0.783\ldots)\approx2.511" />, so the minimum is not at an endpoint.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Minimum distance} \approx 2.511, \text{ at } m\approx0.783}" />,
    reason: <>The minimum distance is <Katex tex="D(0.783\ldots)\approx2.511" />. Give both values, each to three decimal places, as asked.</>,
    more: <>The report notes some students found <Katex tex="m" /> but not the distance, and some gave their answers correct to two decimal places.</>,
  },
]

export default function MethodsQ1_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=x^2e^{-x^2}" />.
        </p>
      </div>

      <PartCard letter="a" topic="Derivative" marks={1} statement={<>Find <Katex tex="f'(x)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" topic="Nature of Point" marks={1} statement={<>State the nature of the stationary point on the graph of <Katex tex="f" /> at the origin.</>} examinerReport={EXAM_BI}>
        <Background>
          <p>
            The <b>nature</b> of a stationary point means <em>which kind</em> it is: a local
            minimum, a local maximum, or a stationary point of inflection. The report lists "point of inflection",
            "stationary points", "turning points" and the coordinates{' '}
            <Katex tex="(0,0)" /> among the common incorrect answers.
          </p>
          <p>
            You find it by checking the sign of <Katex tex="f'" /> either side of the point:
            negative then positive is a minimum, positive then negative is a maximum, and the
            same sign on both sides is a stationary point of inflection.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <Explore title="Falling then rising: the sign of f′ tells you the nature">
          <SignWidget />
        </Explore>
      </PartCard>

      <PartCard letter="b.ii" topic="Maximum Value" marks={2} statement={<>Find the maximum value of the function <Katex tex="f" /> and the values of <Katex tex="x" /> for which the maximum occurs.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
        <WrongMethod
          title="Every solution of f′(x) = 0 is where the maximum occurs"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned} &f'(x)=0 \implies x=-1,\ 0,\ 1 \\ &\implies \text{maximum at } x=-1,\ 0,\ 1 \end{aligned}" />}
        >
          Solving <Katex tex="f'(x)=0" /> finds <em>every</em> stationary point, and part b.i already showed
          that <Katex tex="x=0" /> is the minimum: <Katex tex="f(0)=0" />, well below{' '}
          <Katex tex="\tfrac1e" />. Evaluate <Katex tex="f" /> at each solution and keep only the ones that
          give the largest value. The report also saw students give only one of <Katex tex="x=\pm1" />: by
          symmetry, both peaks count.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b.iii" topic="Vertical Translation" marks={1} statement={<>Find the values of <Katex tex="d\in R" /> for which <Katex tex="f(x)+d" /> is always negative.</>} examinerReport={EXAM_BIII}>
        <Background>
          <p>
            Adding a constant <Katex tex="d" /> to a function slides its whole graph up (if{' '}
            <Katex tex="d>0" />) or down (if <Katex tex="d<0" />) without changing its shape.
            "Always negative" therefore means: every point of the shifted graph must end up strictly
            below the <Katex tex="x" />-axis.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
        <Explore title="Slide the graph down until even the peaks are below the axis">
          <ShiftWidget />
        </Explore>
        <WrongMethod
          title="d ≤ −1/e: shifting the peaks down onto the axis is enough"
          source="Examiner's report"
          working={<Katex display tex="d=-\tfrac1e:\quad f(\pm1)+d=\tfrac1e-\tfrac1e=0" />}
        >
          Whenever a question says &ldquo;negative&rdquo; (not &ldquo;non-positive&rdquo;), test the boundary
          value itself. Here <Katex tex="d=-\tfrac1e" /> puts the peaks exactly on the axis, which fails, so it is excluded
          and the inequality is strict.
        </WrongMethod>
        <WrongMethod
          title="Rearrange and stop: d < −x²e^(−x²)"
          source="Examiner's report"
          working={<Katex display tex="x^2e^{-x^2}+d<0 \implies d<-x^2e^{-x^2}" />}
        >
          That is the condition at <em>one</em> value of <Katex tex="x" />, and its right-hand side changes
          as <Katex tex="x" /> changes. But <Katex tex="d" /> is a single number that has to work for every{' '}
          <Katex tex="x" /> at once, so it must sit below <Katex tex="-x^2e^{-x^2}" /> at its lowest,
          which is <Katex tex="-\tfrac1e" /> (at <Katex tex="x=\pm1" />). An answer for &ldquo;the values of{' '}
          <Katex tex="d" />&rdquo; can&apos;t contain <Katex tex="x" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c.i" topic="Tangent Line" marks={1} statement={<>Find the equation of the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=-1" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" topic="Area Between Curves" marks={2} statement={<>Find the area enclosed by the graph of <Katex tex="f" /> and the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=-1" />, correct to four decimal places.</>} examinerReport={EXAM_CII}>
        <Background>
          <p>
            The area of a region trapped between two graphs is{' '}
            <Katex tex="\displaystyle\int_a^b\bigl(\text{upper} - \text{lower}\bigr)dx" />, where{' '}
            <Katex tex="a" /> and <Katex tex="b" /> are the <Katex tex="x" />-coordinates of the
            points where the two graphs meet. So there are three things to find before
            integrating: the two meeting points, and which graph is on top in between.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <Explore title="What each integral actually measures">
          <WhichAreaWidget />
        </Explore>
        <WrongMethod
          title="Integrate the curve alone from −1 to 1"
          source="Examiner's report"
          working={<Katex display tex="\int_{-1}^{1}x^2e^{-x^2}\,dx\approx0.3789" />}
        >
          That is the area between the curve and the <Katex tex="x" />-axis; the tangent never appears in
          it. The region is bounded by the curve <em>and the tangent</em>, so the line has to be in the
          integrand: line minus curve.
        </WrongMethod>
        <WrongMethod
          title="Integrate from 0 to 1"
          source="Examiner's report"
          working={<Katex display tex="\int_{0}^{1}\left(\tfrac1e-x^2e^{-x^2}\right)dx\approx0.1784" />}
        >
          The limits are where the tangent meets the curve, <Katex tex="x=-1" /> and <Katex tex="x=1" />,
          not the minimum at the origin. Starting at 0 collects only the right half of the region; by
          symmetry this is exactly half the answer.
        </WrongMethod>
        <WrongMethod
          title="Curve minus line"
          source="Examiner's report"
          working={<Katex display tex="\int_{-1}^{1}\left(x^2e^{-x^2}-\tfrac1e\right)dx\approx-0.3568" />}
        >
          The curve is <em>below</em> the line on <Katex tex="(-1,1)" />, so every strip height{' '}
          <Katex tex="f(x)-\tfrac1e" /> is negative and so is the integral. A negative &ldquo;area&rdquo; is the
          sign that the subtraction is upside down: it&apos;s always upper minus lower.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Minimum Distance"
        marks={3}
        statement={<>Let <Katex tex="M(m,n)" /> be a point on the graph of <Katex tex="f" />, where <Katex tex="m\in[0,1]" />. Find the minimum distance between <Katex tex="M" /> and the point <Katex tex="(0,e)" />, and the value of <Katex tex="m" /> for which this occurs, correct to three decimal places.</>}
        examinerReport={EXAM_D}
      >
        <Background>
          <p>
            This is an optimisation question in disguise. The trick with any "shortest
            distance to a curve" problem is to write the distance as a function of <em>one</em>{' '}
            variable — here <Katex tex="m" /> — by using the fact that the moving point sits on
            the curve, so its <Katex tex="y" />-coordinate is forced to be <Katex tex="f(m)" />.
            Then minimise that function.
          </p>
          <p>
            There is also a picture behind it, which the report gives as a second method: at the
            closest point, the segment from <Katex tex="M" /> to <Katex tex="(0,e)" /> is{' '}
            <b>perpendicular</b> to the tangent at <Katex tex="M" />, so their gradients multiply to{' '}
            <Katex tex="-1" />. If the segment met the curve at any other angle, sliding{' '}
            <Katex tex="M" /> a little along the curve would bring it closer.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="The shortest link meets the curve at right angles">
          <ClosestWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
