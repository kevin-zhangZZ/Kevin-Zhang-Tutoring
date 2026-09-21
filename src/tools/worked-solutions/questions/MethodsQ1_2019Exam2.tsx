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

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import curveSrc from './meth-2019exam2-q1-curve.png'
import areaSrc from './meth-2019exam2-q1-area.png'
import distanceSrc from './meth-2019exam2-q1-distance.png'

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
      <Katex tex="d\ge-\tfrac1e" /> and <Katex tex="d<\tfrac1e" />. Some students wrote{' '}
      <Katex tex="-\tfrac1e" /> alone, with no inequality. Others did not attempt the question.
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
      incorrect methods integrated <Katex tex="f" /> on its own, or used the wrong terminals —
      for example <Katex tex="\int_0^1" /> instead of <Katex tex="\int_{-1}^{1}" />.
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
  },
  {
    working: <Katex display tex="v=e^{-x^2} \implies v'=-2x\,e^{-x^2}" />,
    reason: <>Chain rule: <Katex tex="\tfrac{d}{dx}e^{g(x)}=g'(x)e^{g(x)}" />, and here the inside function is <Katex tex="g(x)=-x^2" />, whose derivative is <Katex tex="-2x" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x\cdot e^{-x^2} + x^2\cdot\left(-2x\,e^{-x^2}\right)" />,
    reason: <>Substitute into <Katex tex="u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = 2xe^{-x^2}-2x^3e^{-x^2}}" />,
  },
  {
    working: <Katex display tex="= 2x\left(1-x^2\right)e^{-x^2}" />,
    reason: <>Any equivalent form scores the mark, but take the factorised version forward — it makes the stationary points in part (b) readable straight off.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2x(1-x^2)e^{-x^2} = 0" />,
    reason: <>Stationary points are where the gradient is zero.</>,
  },
  {
    working: <Katex display tex="e^{-x^2}>0 \text{ for every } x \implies 2x(1-x^2)=0 \implies x=-1,\ 0 \text{ or } 1" />,
    reason: <>An exponential is never zero, so it can be divided out — only the polynomial factor can make <Katex tex="f'" /> vanish.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f'(-0.5) = 2(-0.5)(1-0.25)e^{-0.25} < 0" />
        <Katex display tex="f'(0.5) = 2(0.5)(1-0.25)e^{-0.25} > 0" />
      </>
    ),
    reason: <>Test the sign of <Katex tex="f'" /> just to the left and just to the right of <Katex tex="x=0" />. (Only the sign matters, so there's no need to evaluate these.)</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Local minimum}}" />,
    reason: <><Katex tex="f" /> is decreasing on the left of <Katex tex="x=0" /> and increasing on the right, so the curve turns around from falling to rising — a minimum turning point.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Stationary points at } x=-1,\ 0,\ 1 \quad \text{(part b.i)}" />,
  },
  {
    working: (
      <>
        <Katex display tex="f(-1) = (-1)^2e^{-(-1)^2} = e^{-1} = \dfrac1e" />
        <Katex display tex="f(1) = 1^2e^{-1^2} = \dfrac1e, \qquad f(0)=0" />
      </>
    ),
    reason: <>Evaluate <Katex tex="f" /> at each one. <Katex tex="f(-1)=f(1)" /> because <Katex tex="f" /> only ever sees <Katex tex="x^2" />, so it's an <b>even</b> function — its graph is symmetric about the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="f(x)=x^2e^{-x^2}\ge0 \text{ for every } x, \qquad f(x)\to0 \text{ as } x\to\pm\infty" />,
    reason: <>A square times a positive exponential can't be negative, and <Katex tex="e^{-x^2}" /> collapses far faster than <Katex tex="x^2" /> grows. So the curve sits on or above the axis and flattens towards it at both ends — the two turning points at <Katex tex="x=\pm1" /> are therefore the highest the graph ever gets, not just locally.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={curveSrc} alt="Graph of f(x) = x²e^(−x²): a twin-humped curve with equal maximum points at (−1, 1/e) and (1, 1/e) and a minimum at the origin" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>The examination report notes that errors here could have been avoided by sketching the graph first — the two equal humps make it obvious that there are <em>two</em> values of <Katex tex="x" /> to give, not one.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum value } \dfrac1e, \text{ at } x=-1 \text{ and } x=1}" />,
    reason: <>Both pieces are needed for the two marks: the <em>value</em> and the <em>x</em>-values. Leave it as <Katex tex="\tfrac1e" /> — an exact answer was required, so <Katex tex="0.368" /> would not score.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Range of } f = \left[0,\ \dfrac1e\right]" />,
    reason: <>From part (b)(ii): the smallest value <Katex tex="f" /> takes is <Katex tex="0" /> (at the origin) and the largest is <Katex tex="\tfrac1e" /> (at <Katex tex="x=\pm1" />).</>,
  },
  {
    working: <Katex display tex="f(x)+d<0 \ \text{ for every } x \iff d < -f(x) \ \text{ for every } x" />,
    reason: <>Rearrange. The condition has to hold at <em>every</em> <Katex tex="x" />, so <Katex tex="d" /> must beat the hardest case.</>,
  },
  {
    working: <Katex display tex="\text{Hardest case: } x=\pm1, \text{ where } f(x) \text{ is largest} \implies d<-\dfrac1e" />,
    reason: <>The graph of <Katex tex="f(x)+d" /> is the graph of <Katex tex="f" /> shifted down by <Katex tex="|d|" />. To push the whole curve below the axis, the shift has to clear the <em>highest</em> point of the curve.</>,
  },
  {
    working: <Katex display tex="\boxed{d<-\dfrac1e}" />,
    reason: <>Strictly less than: at <Katex tex="d=-\tfrac1e" /> the peaks land exactly on the axis, giving <Katex tex="f(x)+d=0" /> at <Katex tex="x=\pm1" /> — zero isn't negative, so that value of <Katex tex="d" /> fails. This is why <Katex tex="d\le-\tfrac1e" /> was marked wrong.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(-1) = 2(-1)\bigl(1-(-1)^2\bigr)e^{-1} = -2\times 0\times e^{-1} = 0" />,
    reason: <><Katex tex="x=-1" /> is one of the stationary points from part (b), so the gradient there is zero — the tangent is <b>horizontal</b>.</>,
  },
  {
    working: <Katex display tex="f(-1) = \dfrac1e \implies \text{the tangent passes through } \left(-1,\ \dfrac1e\right)" />,
  },
  {
    working: <Katex display tex="\boxed{y=\dfrac1e}" />,
    reason: <>A horizontal line through a point takes the <Katex tex="y" />-value of that point. Write it as an <em>equation</em> — the report notes that answers of just "<Katex tex="\tfrac1e" />" did not score.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac1e = x^2e^{-x^2} \implies x=-1 \text{ or } x=1" />,
    reason: <>Find where the tangent line meets the curve again. Since <Katex tex="\tfrac1e" /> is the <em>maximum</em> value of <Katex tex="f" /> (part b.ii), the line <Katex tex="y=\tfrac1e" /> touches the curve at both peaks and never cuts it anywhere else — so these are the only two intersection points, and they are the terminals of the enclosed region.</>,
  },
  {
    working: <Katex display tex="\text{On } [-1,1]: \quad f(x) \le \dfrac1e" />,
    reason: <>The line is the upper boundary and the curve is the lower one, so the integrand is <Katex tex="(\text{line})-(\text{curve})" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_{-1}^{1}\left(\dfrac1e - x^2e^{-x^2}\right)dx" />,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={areaSrc} alt="The same curve with the horizontal tangent y = 1/e drawn, and the region enclosed between the line and the curve from x = −1 to x = 1 shaded" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>The enclosed region is the gap between the flat tangent and the dip of the curve between the two peaks.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} \approx 0.3568}" />,
    reason: <>Evaluate on CAS. <Katex tex="x^2e^{-x^2}" /> has no antiderivative that can be written with the functions in this course, so this integral genuinely has to be done by technology — which is exactly what Exam 2 expects.</>,
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
        <img src={distanceSrc} alt="The curve with the fixed point (0, e) marked well above it and the shortest segment drawn down to the point M on the curve, of length about 2.511" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <>The point <Katex tex="(0,e)" /> sits high above the curve (<Katex tex="e\approx2.72" />, while the curve never rises past <Katex tex="\tfrac1e\approx0.37" />), so the shortest link runs down and slightly to the right.</>,
  },
  {
    working: <Katex display tex="\text{Minimise } D(m) \text{ for } m\in[0,1] \text{ (by CAS)}" />,
    reason: <>Graph <Katex tex="D" /> against <Katex tex="m" /> and read off the minimum, or solve <Katex tex="D'(m)=0" />. (Minimising <Katex tex="D^2" /> instead gives the same <Katex tex="m" /> and avoids the square root, which is handy by hand.)</>,
  },
  {
    working: <Katex display tex="D(0)=e\approx2.718, \qquad D(1)\approx2.554" />,
    reason: <>Worth checking the endpoints of the restricted domain too — both are bigger than the interior value below, confirming the minimum really is inside <Katex tex="[0,1]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Minimum distance} \approx 2.511, \text{ at } m\approx0.783}" />,
    reason: <>Both values are asked for, each to three decimal places — the report notes that many students found <Katex tex="m" /> but stopped before the distance.</>,
  },
]

export default function MethodsQ1_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=x^2e^{-x^2}" />.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find <Katex tex="f'(x)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" marks={1} statement={<>State the nature of the stationary point on the graph of <Katex tex="f" /> at the origin.</>} examinerReport={EXAM_BI}>
        <Background>
          <p>
            The <b>nature</b> of a stationary point means <em>which kind</em> it is: a local
            minimum, a local maximum, or a stationary point of inflection. The question is
            asking for that word, not for coordinates — the report notes that students who
            answered "<Katex tex="(0,0)" />" or "turning point" scored nothing.
          </p>
          <p>
            You find it by checking the sign of <Katex tex="f'" /> either side of the point:
            negative then positive is a minimum, positive then negative is a maximum, and the
            same sign on both sides is a stationary point of inflection.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" marks={2} statement={<>Find the maximum value of the function <Katex tex="f" /> and the values of <Katex tex="x" /> for which the maximum occurs.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard letter="b.iii" marks={1} statement={<>Find the values of <Katex tex="d\in\mathbb{R}" /> for which <Katex tex="f(x)+d" /> is always negative.</>} examinerReport={EXAM_BIII}>
        <Background>
          <p>
            Adding a constant <Katex tex="d" /> to a function slides its whole graph up (if{' '}
            <Katex tex="d>0" />) or down (if <Katex tex="d<0" />) without changing its shape.
            "Always negative" therefore means: push the graph down far enough that <em>every</em>{' '}
            point of it, including the very highest one, ends up strictly below the{' '}
            <Katex tex="x" />-axis.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard letter="c.i" marks={1} statement={<>Find the equation of the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=-1" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" marks={2} statement={<>Find the area enclosed by the graph of <Katex tex="f" /> and the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=-1" />, correct to four decimal places.</>} examinerReport={EXAM_CII}>
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
      </PartCard>

      <PartCard
        letter="d"
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
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
