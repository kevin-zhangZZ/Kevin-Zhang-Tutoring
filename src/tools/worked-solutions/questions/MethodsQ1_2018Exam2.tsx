// 2018 Mathematical Methods — Exam 2, Section B, Question 1 (13 marks). A quartic, its
// minimum, a tangent and the area it cuts off, then the same quartic generalised with a
// parameter a. Question text transcribed from the original paper; both figures are cropped
// directly from the original VCAA exam PDF, not redrawings. Every answer re-derived
// independently in sympy and checked against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import quarticSrc from './meth-2018exam2-q1-quartic.png'
import tangentSrc from './meth-2018exam2-q1-tangent.png'

const EXAM_A: SAExaminerStats = {
  marks: [5, 95],
  average: 1.0,
  comment: <>This question was answered well. Some students only gave the <Katex tex="x" /> value when coordinates were required.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Common incorrect answers were{' '}
      <Katex tex="(-\infty,32)" />, <Katex tex="b\ge32" />, <Katex tex="b<32" />,{' '}
      <Katex tex="[33,\infty)" /> and <Katex tex="b\ge33" />. Others used the{' '}
      <Katex tex="x" />-coordinate and gave <Katex tex="x>-2" /> as their answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: <>An equation and exact values were required.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 13, 67],
  average: 1.5,
  comment: (
    <>
      Exact values were required. There were many sign errors, for example{' '}
      <Katex tex="x=\tfrac{1\pm\sqrt{42}}{3}" />. Some students found the values of{' '}
      <Katex tex="x" /> where the gradient of <Katex tex="l" /> was equal to the gradient of{' '}
      <Katex tex="f" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [38, 13, 49],
  average: 1.1,
  comment: (
    <>
      Students who answered Question 1d. correctly were generally able to answer this question
      correctly. Some students split the integral, which was unnecessary. Others put a
      negative sign in front of the integral for the bounded area below the{' '}
      <Katex tex="x" />-axis. Some had their terminals or expressions the reverse of what was
      required.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: (
    <>
      Some students gave an additional expression <Katex tex="a=6x(x-2)" />, which was
      obtained if technology was used rather than equating coefficients.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      A common error was <Katex tex="x=-1\pm\sqrt{1-a}" /> written as{' '}
      <Katex tex="x=\tfrac{-1\pm\sqrt{9-4a}}{\ }" />. <Katex tex="x=0" /> was often given.
      This comes from forgetting to differentiate <Katex tex="-12ax" /> when differentiating{' '}
      <Katex tex="p(x)" />.
    </>
  ),
}

const EXAM_HI: SAExaminerStats = {
  marks: [82, 18],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. Common incorrect answers were{' '}
      <Katex tex="a\ge1" />, <Katex tex="a>0" /> or <Katex tex="a\ge0" />.
    </>
  ),
}

const EXAM_HII: SAExaminerStats = {
  marks: [47, 53],
  average: 0.6,
  comment: (
    <>
      This question was answered well. The minimum value needed to be stated, not just the
      coordinates of the turning point.
    </>
  ),
}

const EXAM_HIII: SAExaminerStats = {
  marks: [92, 4, 4],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. Many students did not attempt this question. Some
      students solved <Katex tex="p'(x)=0" /> or <Katex tex="p(x)=0" /> for <Katex tex="x" />.
      Others tried to apply the discriminant to a cubic equation. Others, who used a correct
      method, sometimes gave an incorrect inequality.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 12x^3+12x^2-24x = 12x\left(x^2+x-2\right) = 12x(x+2)(x-1)" />,
    reason: <>Differentiate and factorise fully. Taking out <Katex tex="12x" /> first leaves an easy quadratic.</>,
  },
  {
    working: <Katex display tex="f'(x)=0 \implies x = -2,\ 0,\ 1" />,
    reason: <>Three stationary points, so they must be compared — the question asks for the <em>minimum</em>, not just any turning point.</>,
  },
  {
    working: <Katex display tex="f(-2) = -32, \quad f(0) = 0, \quad f(1) = -5" />,
    reason: <>Substituting each back. The graph confirms the shape: a deep trough on the left, a local maximum at the origin, a shallower trough on the right.</>,
  },
  {
    working: <Katex display tex="\boxed{M = (-2,\ -32)}" />,
    reason: <>The lowest of the three. Give <em>coordinates</em> — the report notes students who stopped at <Katex tex="x=-2" /> and lost the mark.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="y = f(x)+b \ \text{ is } \ y=f(x) \text{ shifted up by } b" />,
    reason: <>No <Katex tex="x" />-intercepts means the whole curve sits strictly above the axis, so the shift must lift the <em>lowest</em> point clear of it.</>,
  },
  {
    working: <Katex display tex="\text{Minimum of } f(x)+b \ = \ -32+b" />,
    reason: <>From part (a). Everything else on the curve is higher, so this one value decides it.</>,
  },
  {
    working: <Katex display tex="-32+b>0 \implies \boxed{b>32}" />,
    reason: <>Strictly greater. At <Katex tex="b=32" /> exactly, the minimum sits <em>on</em> the axis — that is an <Katex tex="x" />-intercept, so <Katex tex="b=32" /> must be excluded. The report lists <Katex tex="b\ge32" /> and <Katex tex="b\ge33" /> among the common wrong answers, along with <Katex tex="x>-2" /> from students who quoted the <Katex tex="x" />-coordinate instead.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f\!\left(-\tfrac13\right) = \frac{1}{27}-\frac{4}{27}-\frac{36}{27} = -\frac{13}{9}" />,
    reason: <>The point of contact. Everything over <Katex tex="27" /> keeps it exact — the report stresses that exact values were required.</>,
  },
  {
    working: <Katex display tex="f'\!\left(-\tfrac13\right) = -\frac49+\frac{12}{9}+8 = \frac{80}{9}" />,
    reason: <>The gradient, from the derivative in part (a).</>,
  },
  {
    working: <Katex display tex="y+\frac{13}{9} = \frac{80}{9}\left(x+\frac13\right)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{80x}{9}+\frac{41}{27}}" />,
    reason: <><Katex tex="\tfrac{80}{27}-\tfrac{13}{9}=\tfrac{80-39}{27}=\tfrac{41}{27}" />. Write it as an <em>equation</em>, not just a gradient — the report flags that too.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="3x^4+4x^3-12x^2 = \frac{80x}{9}+\frac{41}{27}" />,
    reason: <>Intersections of the curve and its tangent. Solve for <Katex tex="x" /> — the report warns against instead solving <Katex tex="f'(x)=\tfrac{80}{9}" />, which finds where the gradients match, a different question.</>,
  },
  {
    working: <Katex display tex="x = -\frac13 \ \text{ is a repeated root (tangency)}" />,
    reason: <>A tangent touches rather than crosses, so <Katex tex="x=-\tfrac13" /> appears <em>twice</em> among the four roots of this quartic. That leaves exactly two others, which is what the question says.</>,
  },
  {
    working: <Cas fn="solve">solve(3x^4+4x^3-12x^2 = 80x/9+41/27, x)</Cas>,
    reason: <>Technology handles the quartic directly. By hand you would divide out <Katex tex="\left(x+\tfrac13\right)^2" /> and solve the remaining quadratic <Katex tex="3x^2+2x-\tfrac{41}{3}=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{-1-\sqrt{42}}{3} \ \text{ and } \ x = \frac{-1+\sqrt{42}}{3}}" />,
    reason: <>In the required form <Katex tex="\tfrac{a\pm\sqrt b}{c}" /> with <Katex tex="a=-1" />, <Katex tex="b=42" />, <Katex tex="c=3" />. The sign matters: the report names <Katex tex="\tfrac{1\pm\sqrt{42}}{3}" /> as a frequent slip. (<Katex tex="\approx-2.49" /> and <Katex tex="\approx1.83" /> — either side of the contact point, as the figure shows.)</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{On } \left(\frac{-1-\sqrt{42}}{3},\ \frac{-1+\sqrt{42}}{3}\right): \ l \ \text{ lies above } f" />,
    reason: <>Between the two outer intersections the tangent runs above the curve, touching it at <Katex tex="x=-\tfrac13" /> without crossing. So a single integral covers both regions.</>,
  },
  {
    working: <Katex display tex="A = \int_{\frac{-1-\sqrt{42}}{3}}^{\frac{-1+\sqrt{42}}{3}} \left(\frac{80x}{9}+\frac{41}{27} - \left(3x^4+4x^3-12x^2\right)\right)dx" />,
    reason: <>Upper minus lower, across the whole span. The report is explicit that splitting the integral was unnecessary and that inserting a negative sign for the part below the <Katex tex="x" />-axis was wrong — the axis is irrelevant here, only which of the two graphs is on top.</>,
  },
  {
    working: <Cas fn="nInt">nInt(80x/9+41/27-(3x^4+4x^3-12x^2), x, (-1-√42)/3, (-1+√42)/3)</Cas>,
    reason: <>Use the exact terminals from part (d), not rounded decimals, or the surd form will not come out.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{784\sqrt{42}}{135}}" />,
    reason: <>The required form <Katex tex="\tfrac{a\sqrt b}{c}" /> with <Katex tex="a=784" />, <Katex tex="b=42" />, <Katex tex="c=135" />. (<Katex tex="\approx37.6" /> square units. The two lobes are equal, at <Katex tex="\tfrac{392\sqrt{42}}{135}\approx18.8" /> each — a symmetry worth noticing as a check.)</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="p(x)-f(x) = 6(a-2)x^2+12x^2 - 12ax + a^2 = 6a x^2 - 12ax + a^2" />,
    reason: <>Subtracting term by term: the <Katex tex="3x^4" /> and <Katex tex="4x^3" /> cancel, and <Katex tex="6(a-2)x^2-(-12x^2)=6ax^2" />.</>,
  },
  {
    working: <Katex display tex="6a = 0, \quad -12a = 0, \quad a^2 = 0" />,
    reason: <>"For all <Katex tex="x" />" means every coefficient must vanish independently — equate coefficients rather than solving an equation in <Katex tex="x" />. The report notes that students who put this to technology got the spurious extra answer <Katex tex="a=6x(x-2)" />, which is not a constant and so cannot be the value of <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 0}" />,
    reason: <>All three conditions agree.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="p'(x) = 12x^3+12x^2+12(a-2)x-12a" />,
    reason: <>Differentiating. The <Katex tex="-12ax" /> term contributes <Katex tex="-12a" /> — the report says forgetting to differentiate it is what produced the common wrong root <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="= 12\left(x^3+x^2+(a-2)x-a\right)" />,
    reason: <>Taking out the common factor <Katex tex="12" />.</>,
  },
  {
    working: <Katex display tex="p'(1) = 12(1+1+a-2-a) = 0 \implies (x-1) \text{ is a factor}" />,
    reason: <>The <Katex tex="a" />s cancel at <Katex tex="x=1" />, so <Katex tex="x=1" /> is a stationary point for <em>every</em> value of <Katex tex="a" />. Spotting that is what makes the cubic factorise.</>,
  },
  {
    working: <Katex display tex="p'(x) = 12(x-1)\left(x^2+2x+a\right)" />,
    reason: <>Dividing the cubic by <Katex tex="(x-1)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1 \quad \text{or} \quad x = -1\pm\sqrt{1-a}}" />,
    reason: <>Completing the square on <Katex tex="x^2+2x+a" /> gives <Katex tex="(x+1)^2 = 1-a" />. The second pair exists only when <Katex tex="1-a\ge0" />, which sets up part (h).</>,
  },
]

const ROWS_HI: WorkingRow[] = [
  {
    working: <Katex display tex="x=1 \text{ is always a stationary point}" />,
    reason: <>From part (g). So "only one stationary point" means the other two must fail to exist.</>,
  },
  {
    working: <Katex display tex="x^2+2x+a = 0 \ \text{ has no real solutions} \iff \Delta = 4-4a < 0" />,
    reason: <>Discriminant of the quadratic factor.</>,
  },
  {
    working: <Katex display tex="4-4a<0 \implies \boxed{a>1}" />,
    reason: <>Strict. At <Katex tex="a=1" /> the quadratic has the repeated root <Katex tex="x=-1" />, which is a genuine second stationary point — so <Katex tex="a=1" /> gives two, not one. That boundary is exactly what the report's common wrong answer <Katex tex="a\ge1" /> gets wrong; only <Katex tex="18\%" /> scored this mark.</>,
  },
]

const ROWS_HII: WorkingRow[] = [
  {
    working: <Katex display tex="a=2>1 \implies \text{the only stationary point is } x=1" />,
    reason: <>Part (h)(i) applies, so there is nothing to compare — the single turning point of a positive quartic must be its minimum.</>,
  },
  {
    working: <Katex display tex="p(x) = 3x^4+4x^3+0\cdot x^2-24x+4" />,
    reason: <>Substituting <Katex tex="a=2" />: the <Katex tex="x^2" /> coefficient <Katex tex="6(a-2)" /> vanishes.</>,
  },
  {
    working: <Katex display tex="p(1) = 3+4-24+4" />,
    reason: <>Evaluating at the stationary point.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Minimum value} = -13}" />,
    reason: <>State the <em>value</em>, not the point — the report notes marks lost to answers given as <Katex tex="(1,-13)" /> when a single number was asked for.</>,
  },
]

const ROWS_HIII: WorkingRow[] = [
  {
    working: <Katex display tex="a>1 \implies \text{one stationary point, at } x=1, \text{ a minimum}" />,
    reason: <>Carrying part (h)(i) forward. A quartic with a positive leading coefficient and a single turning point has that point as its global minimum.</>,
  },
  {
    working: <Katex display tex="p(x)=0 \text{ has no solutions} \iff \text{minimum} > 0 \iff p(1)>0" />,
    reason: <>The curve never reaches the axis exactly when its lowest point is above it. This is the step the report says students missed — many attacked <Katex tex="p(x)=0" /> or <Katex tex="p'(x)=0" /> directly, or tried a discriminant on a cubic, which does not apply.</>,
  },
  {
    working: <Katex display tex="p(1) = 3+4+6(a-2)-12a+a^2 = a^2-6a-5" />,
    reason: <>Substituting <Katex tex="x=1" /> into the general rule and collecting.</>,
  },
  {
    working: <Katex display tex="a^2-6a-5 = 0 \implies a = \frac{6\pm\sqrt{56}}{2} = 3\pm\sqrt{14}" />,
    reason: <>Quadratic formula; <Katex tex="\sqrt{56}=2\sqrt{14}" />.</>,
  },
  {
    working: <Katex display tex="a^2-6a-5>0 \implies a<3-\sqrt{14} \ \text{ or } \ a>3+\sqrt{14}" />,
    reason: <>An upward parabola in <Katex tex="a" /> is positive outside its roots.</>,
  },
  {
    working: <Katex display tex="3-\sqrt{14}\approx-0.74 \ \text{ fails } a>1" />,
    reason: <>The left branch is entirely below <Katex tex="1" />, so the constraint from part (h)(i) removes it. Both conditions have to hold at once, and forgetting to intersect them is the "incorrect inequality" the report describes.</>,
  },
  {
    working: <Katex display tex="\boxed{a > 3+\sqrt{14}}" />,
    reason: <>(<Katex tex="3+\sqrt{14}\approx6.74" />.) Spot-check: at <Katex tex="a=7" /> the minimum of <Katex tex="p" /> is <Katex tex="+2" />, so the curve clears the axis ✓; at <Katex tex="a=6.7" /> it is <Katex tex="-0.31" />, so it still cuts ✓. Only <Katex tex="4\%" /> of the state scored both marks.</>,
  },
]

export default function MethodsQ1_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (13 marks)</p>
        <p className="mb-3">
          Consider the quartic{' '}
          <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=3x^4+4x^3-12x^2" /> and part of the
          graph of <Katex tex="y=f(x)" /> below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={quarticSrc} alt="Part of the graph of y = 3x⁴+4x³−12x²: a deep minimum M on the left, a local maximum at the origin and a shallower minimum on the right, from the original 2018 VCAA exam paper" className="w-full max-w-[420px]" />
        </div>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find the coordinates of the point <Katex tex="M" />, at which the minimum value of the function <Katex tex="f" /> occurs.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>State the values of <Katex tex="b\in\mathbb{R}" /> for which the graph of <Katex tex="y=f(x)+b" /> has no <Katex tex="x" />-intercepts.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Part of the tangent, <Katex tex="l" />, to <Katex tex="y=f(x)" /> at{' '}
          <Katex tex="x=-\dfrac13" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={tangentSrc} alt="The same quartic with the tangent line l drawn through it, crossing the curve at two further points either side of the contact point, from the original 2018 VCAA exam paper" className="w-full max-w-[420px]" />
        </div>
      </div>

      <PartCard letter="c" marks={1} statement={<>Find the equation of the tangent <Katex tex="l" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={2} statement={<>The tangent <Katex tex="l" /> intersects <Katex tex="y=f(x)" /> at <Katex tex="x=-\dfrac13" /> and at two other points. State the <Katex tex="x" />-values of the two other points of intersection. Express your answers in the form <Katex tex="\dfrac{a\pm\sqrt{b}}{c}" />, where <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are integers.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            A tangent meets its curve at a <em>repeated</em> root. So{' '}
            <Katex tex="f(x)-l(x)" /> is a quartic with <Katex tex="\left(x+\tfrac13\right)^2" />{' '}
            as a factor, leaving a quadratic — which is why the answers come out in the
            surd form the question prescribes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={2} statement={<>Find the total area of the regions bounded by the tangent <Katex tex="l" /> and <Katex tex="y=f(x)" />. Express your answer in the form <Katex tex="\dfrac{a\sqrt{b}}{c}" />, where <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are positive integers.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            "Total area of the regions" sounds like it needs splitting, but it does not. The
            tangent touches the curve at <Katex tex="x=-\tfrac13" /> without crossing, so{' '}
            <Katex tex="l" /> stays above <Katex tex="f" /> right across the interval between
            the two outer intersections. One integral of{' '}
            <Katex tex="(\text{upper}-\text{lower})" /> therefore collects both lobes with the
            correct sign already.
          </p>
          <p>
            Where the regions sit relative to the <Katex tex="x" />-axis is irrelevant — an
            area between two curves depends only on which is on top.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let{' '}
          <Katex tex="p:\mathbb{R}\to\mathbb{R},\ p(x)=3x^4+4x^3+6(a-2)x^2-12ax+a^2,\ a\in\mathbb{R}" />.
        </p>
      </div>

      <PartCard letter="f" marks={1} statement={<>State the value of <Katex tex="a" /> for which <Katex tex="f(x)=p(x)" /> for all <Katex tex="x" />.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard letter="g" marks={1} statement={<>Find all solutions to <Katex tex="p'(x)=0" />, in terms of <Katex tex="a" /> where appropriate.</>} examinerReport={EXAM_G}>
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard letter="h.i" marks={1} statement={<>Find the values of <Katex tex="a" /> for which <Katex tex="p" /> has only one stationary point.</>} examinerReport={EXAM_HI}>
        <WorkingTable rows={ROWS_HI} />
      </PartCard>

      <PartCard letter="h.ii" marks={1} statement={<>Find the minimum value of <Katex tex="p" /> when <Katex tex="a=2" />.</>} examinerReport={EXAM_HII}>
        <WorkingTable rows={ROWS_HII} />
      </PartCard>

      <PartCard letter="h.iii" marks={2} statement={<>If <Katex tex="p" /> has only one stationary point, find the values of <Katex tex="a" /> for which <Katex tex="p(x)=0" /> has no solutions.</>} examinerReport={EXAM_HIII}>
        <Background>
          <p>
            The hardest part on the paper — <Katex tex="92\%" /> scored zero, and many left it
            blank. The wording carries two separate conditions and both must be imposed: "if{' '}
            <Katex tex="p" /> has only one stationary point" is part (h)(i)'s{' '}
            <Katex tex="a>1" />, and "<Katex tex="p(x)=0" /> has no solutions" is a statement
            about where the graph sits.
          </p>
          <p>
            The second condition is the one to translate carefully. A quartic with a single
            turning point misses the <Katex tex="x" />-axis exactly when that turning point is
            above it — so the whole thing reduces to the inequality{' '}
            <Katex tex="p(1)>0" />. No discriminant is involved; the report notes that trying
            to apply one to a cubic was a common dead end.
          </p>
        </Background>
        <WorkingTable rows={ROWS_HIII} />
      </PartCard>
    </div>
  )
}
