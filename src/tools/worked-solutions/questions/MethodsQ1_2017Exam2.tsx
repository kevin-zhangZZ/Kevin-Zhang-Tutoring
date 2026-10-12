// 2017 Mathematical Methods — Exam 2, Section B, Question 1 (11 marks).
// f(x) = x³ − 5x: turning points, a chord, then the same ideas with the parameter k in
// g(x) = x³ − kx, ending with an area that collapses to (k+1)²/4. Question text
// transcribed from the original paper; both figures are crops of VCAA's own artwork.
// Answers verified with sympy (and agree with itute). Solution is original.
//
// Interactive widgets (in ../interactives): b.i the chord through ±t always passes through O
// because f is odd (toggle: swapped signs give y = 4x); c.i CD as Pythagoras on run 2 and rise
// 2 − 2k (toggle: adding the legs, the report's √(2² + (2 − 2k)²) = 2 + 2 − 2k); c.ii CD(k) against
// k + 1, meeting at k = 1 and 7/3; d.i the three solutions of g(x) = x and why a is the positive
// one; d.ii a strip swept from 0 to a, one integral even below the axis (toggle: brackets dropped).
//
// Report note (d.ii): the report says substituting k + 1 instead of √(k + 1) "resulted in"
// −(k − 3)(k + 1)/4. We could not reproduce that: using k + 1 as the upper limit gives
// −(k − 1)(k + 1)³/4, while −(k − 3)(k + 1)/4 is what ∫₀^√(k+1) (x + g(x)) dx gives. So no
// WrongMethod box is built on that remark; the report text is still shown verbatim.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import cubicSrc from './meth-2017e2-q1-cubic.png'
import shadedSrc from './meth-2017e2-q1d-shaded.png'

const ChordWidget = lazyWidget(() => import('../interactives/meth-2017e2-q1bi-chord'))
const DistanceWidget = lazyWidget(() => import('../interactives/meth-2017e2-q1ci-distance'))
const TwoKWidget = lazyWidget(() => import('../interactives/meth-2017e2-q1cii-two-k'))
const IntersectionsWidget = lazyWidget(() => import('../interactives/meth-2017e2-q1di-intersections'))
const StripsWidget = lazyWidget(() => import('../interactives/meth-2017e2-q1dii-strips'))

const EXAM_A: SAExaminerStats = {
  marks: [7, 19, 74],
  average: 1.7,
  comment: (
    <>
      This question was answered well. Exact answers were required to obtain full marks. Some
      students gave their answers as <Katex tex="(-1.29,4.3)" /> and{' '}
      <Katex tex="(1.29,-4.3)" />. Others gave only the <Katex tex="x" /> values. Some mixed
      up the signs.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [16, 9, 75],
  average: 1.6,
  comment: (
    <>
      This question was answered well. A common incorrect answer was <Katex tex="y=4x" />. By
      inspection of the graph, the gradient was negative. Some students made arithmetic errors
      when calculating the gradient and/or <Katex tex="y" />-intercept.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: (
    <>
      The distance formula was used well. Some students applied this by hand and made
      arithmetic errors. Others had an incorrect distance formula using a multiplication
      operation between the two brackets instead of a plus. A common incorrect answer was{' '}
      <Katex tex="\sqrt{64}" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [17, 20, 64],
  average: 1.5,
  comment: (
    <>
      As in Question 1bii. some students did their solutions by hand and made arithmetic
      errors, especially sign errors. This would have been time consuming.{' '}
      <Katex tex="\sqrt{2^2+(2-2k)^2}=2+2-2k" /> was sometimes given. Some incorrect answers
      contained <Katex tex="x" />. When defining <Katex tex="g(x)=x^3-kx" /> on the
      technology, a multiplication sign must be inserted between <Katex tex="k" /> and{' '}
      <Katex tex="x" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: (
    <>
      Students who answered Question 1ci. correctly were generally able to answer this
      question. Some students gave only one value for <Katex tex="k" />.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      A common incorrect answer was <Katex tex="a=\pm\sqrt{k+1}" />. By inspection of the graph,
      the answer was positive. Some students found <Katex tex="k" /> in terms of{' '}
      <Katex tex="a" />, instead of <Katex tex="a" /> in terms of <Katex tex="k" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [40, 18, 42],
  average: 1.0,
  comment: (
    <>
      <Katex tex="\int_0^{\sqrt{k+1}}\left(x-x^3-kx\right)dx" /> was a common error, leaving
      out the brackets in <Katex tex="\int_0^{\sqrt{k+1}}\left(x-(x^3-kx)\right)dx" />. To avoid
      these errors it would have been better to use the expression{' '}
      <Katex tex="\int_0^{\sqrt{k+1}}\bigl(x-g(x)\bigr)dx" />. Some students overcomplicated
      the question by breaking up the areas into different sections. The easiest approach was
      to use 'upper function subtract lower function'. There was evidence that students
      substituted <Katex tex="k+1" /> instead of <Katex tex="\sqrt{k+1}" /> and this resulted
      in the answer of <Katex tex="\dfrac{-(k-3)(k+1)}{4}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=3x^2-5" />,
    reason: <>The graph shows a maximum left of <Katex tex="O" /> and a minimum right of it. Turning points are where the gradient <Katex tex="f'(x)" /> is zero.</>,
  },
  {
    working: <Katex display tex="3x^2-5=0 \implies x=\pm\sqrt{\frac53}=\pm\frac{\sqrt{15}}{3}" />,
    reason: <>Keep <Katex tex="x" /> exact, rationalising <Katex tex="\sqrt{\tfrac53}=\tfrac{\sqrt5}{\sqrt3}=\tfrac{\sqrt{15}}{3}" />. On CAS, <Cas fn="solve">solve(d/dx(x^3-5x)=0, x)</Cas> gives both at once.</>,
    more: <>The report says exact answers were required for full marks; some students gave decimals such as <Katex tex="(-1.29,4.3)" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{\sqrt{15}}{3}\right) = \frac{5\sqrt{15}}{9}-\frac{5\sqrt{15}}{3}" />,
    reason: <>Substitute into <Katex tex="f" />. Cubing: <Katex tex="\left(\tfrac{\sqrt{15}}{3}\right)^3=\tfrac{15\sqrt{15}}{27}=\tfrac{5\sqrt{15}}{9}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{5\sqrt{15}}{9}-\frac{15\sqrt{15}}{9} = -\frac{10\sqrt{15}}{9}" />,
    reason: <>Common denominator <Katex tex="9" />. For the other point, <Katex tex="f" /> is odd (<Katex tex="f(-x)=-x^3+5x=-f(x)" />), so <Katex tex="f\!\left(-\tfrac{\sqrt{15}}{3}\right)=+\tfrac{10\sqrt{15}}{9}" />.</>,
    more: <>Geometrically, the maximum is the minimum turned half a revolution about <Katex tex="O" />, so there is no need to repeat the arithmetic.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\left(-\frac{\sqrt{15}}{3},\ \frac{10\sqrt{15}}{9}\right),\ \left(\frac{\sqrt{15}}{3},\ -\frac{10\sqrt{15}}{9}\right)\end{gathered}}" />,
    reason: <>&ldquo;Coordinates&rdquo; means both <Katex tex="x" /> and <Katex tex="y" /> of both points: maximum on the left, minimum on the right, as in the graph.</>,
    more: <>As decimals these are about <Katex tex="(-1.29,4.30)" /> and <Katex tex="(1.29,-4.30)" />: a useful check against the graph, but not the exact answer asked for. The report says some students gave only the <Katex tex="x" /> values and some mixed up the signs; pairing <Katex tex="-\tfrac{\sqrt{15}}{3}" /> with a negative <Katex tex="y" /> would put the left-hand turning point below the axis, which the graph rules out.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f(-1)=-1+5=4, \qquad f(1)=1-5=-4" />,
    reason: <>Substitute <Katex tex="x=\pm1" />, taking care with <Katex tex="-5\times(-1)=+5" />. So <Katex tex="A=(-1,4)" /> and <Katex tex="B=(1,-4)" />.</>,
    more: <>The graph agrees: at <Katex tex="x=-1" /> the curve is above the axis, at <Katex tex="x=1" /> below it.</>,
  },
  {
    working: <Katex display tex="m = \frac{-4-4}{1-(-1)} = \frac{-8}{2} = -4" />,
    reason: <>Rise over run, subtracting in the same order top and bottom. The chord falls from <Katex tex="A" /> (upper left) to <Katex tex="B" /> (lower right), so expect a negative gradient.</>,
    more: <>The report mentions arithmetic errors in the gradient and the <Katex tex="y" />-intercept; bracketing each negative, as here, avoids them.</>,
  },
  {
    working: <Katex display tex="y-4 = -4(x+1)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> through <Katex tex="A(-1,4)" />; <Katex tex="B" /> would give the same line.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-4x}" />,
    reason: <>Expanding: <Katex tex="y=-4x-4+4" />, so the constant cancels.</>,
    more: <>That is no accident: <Katex tex="f" /> is odd, so <Katex tex="A" /> and <Katex tex="B" /> are symmetric about the origin and the chord must pass through it. The widget below shows why.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="AB = \sqrt{(x_2-x_1)^2+(y_2-y_1)^2}" />,
    reason: <>The distance formula is Pythagoras, with the run and the rise as the two legs. So the squares are <b>added</b>.</>,
    more: <><Katex tex="AB" /> is the hypotenuse of a right triangle whose legs are the run <Katex tex="x_2-x_1" /> and the rise <Katex tex="y_2-y_1" />. The report says some students multiplied the two brackets instead of adding them.</>,
  },
  {
    working: <Katex display tex="= \sqrt{(1-(-1))^2+(-4-4)^2} = \sqrt{4+64}" />,
    reason: <>Run <Katex tex="2" />, rise <Katex tex="-8" />. Squaring removes the sign, so the order of subtraction doesn&apos;t matter.</>,
    more: <>Lose the run (for example by letting <Katex tex="1-(-1)" /> slip to <Katex tex="0" />) and only <Katex tex="\sqrt{64}" /> is left, which is the report&apos;s common incorrect answer. The report also notes arithmetic errors from students who did this by hand.</>,
  },
  {
    working: <Katex display tex="\boxed{AB = \sqrt{68} = 2\sqrt{17}}" />,
    reason: <>Since <Katex tex="68=4\times17" />, <Katex tex="\sqrt{68}=\sqrt4\sqrt{17}=2\sqrt{17}" />.</>,
    more: <>The part (c)(i) widget shows this same triangle at <Katex tex="k=5" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="g(-1)=-1+k, \qquad g(1)=1-k" />,
    reason: <>Part (b) with <Katex tex="5" /> replaced by <Katex tex="k" />: <Katex tex="C=(-1,k-1)" />, <Katex tex="D=(1,1-k)" />. On CAS, <Cas fn="define">Define g(x) = x^3 - k·x</Cas>, with the multiplication sign.</>,
    more: <>The report warns that the multiplication sign between <Katex tex="k" /> and <Katex tex="x" /> must be inserted: typed as <Katex tex="kx" />, the CAS treats it as one new variable.</>,
  },
  {
    working: <Katex display tex="CD = \sqrt{2^2+\bigl((1-k)-(k-1)\bigr)^2}" />,
    reason: <>Pythagoras on the run and rise again. The run from <Katex tex="x=-1" /> to <Katex tex="x=1" /> is always <Katex tex="2" />; only the rise depends on <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="= \sqrt{4+(2-2k)^2}" />,
    reason: <><Katex tex="(1-k)-(k-1)=1-k-k+1=2-2k" />. Bracket the whole of <Katex tex="g(-1)" /> before subtracting.</>,
    more: <>This double negative is where the report&apos;s sign errors come from. The report notes that students who worked by hand made such errors and that it was time consuming; the CAS does the algebra safely.</>,
  },
  {
    working: <Katex display tex="= \sqrt{4+4(1-k)^2} = 2\sqrt{1+(1-k)^2}" />,
    reason: <>Take out the common factor <Katex tex="4" />, then <Katex tex="\sqrt4=2" />. The surd can&apos;t be split: <Katex tex="\sqrt{4+(2-2k)^2}" /> is not <Katex tex="2+(2-2k)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{CD = 2\sqrt{k^2-2k+2}}" />,
    reason: <>Expanding <Katex tex="1+(1-k)^2=k^2-2k+2" />.</>,
    more: <>Check: <Katex tex="k=5" /> gives <Katex tex="2\sqrt{17}" />, part (b)&apos;s answer ✓. The answer must contain only <Katex tex="k" />; the report says some incorrect answers contained <Katex tex="x" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="2\sqrt{k^2-2k+2} = k+1" />,
    reason: <>Set the part (c)(i) distance equal to <Katex tex="k+1" />. On CAS, <Cas fn="solve">solve(2√(k^2-2k+2)=k+1, k)</Cas> returns both values.</>,
  },
  {
    working: <Katex display tex="4(k^2-2k+2) = (k+1)^2" />,
    reason: <>Square both sides. Both sides are positive (as <Katex tex="k>0" />), so squaring adds no false solutions.</>,
  },
  {
    working: <Katex display tex="4k^2-8k+8 = k^2+2k+1" />,
    reason: <>Expanding both sides.</>,
  },
  {
    working: <Katex display tex="3k^2-10k+7=0 \implies (3k-7)(k-1)=0" />,
    reason: <>Collecting and factorising. A quadratic, so expect up to two values; the question says &ldquo;values&rdquo; too.</>,
  },
  {
    working: <Katex display tex="\boxed{k=1 \text{ or } k=\frac73}" />,
    reason: <>Both are positive, so both satisfy <Katex tex="k\in R^+" />. Give both: the report notes some students gave only one.</>,
    more: <>Both check in the original equation: <Katex tex="k=1" /> gives <Katex tex="CD=2\sqrt1=2=k+1" />, and <Katex tex="k=\tfrac73" /> gives <Katex tex="CD=2\sqrt{\tfrac{25}{9}}=\tfrac{10}{3}=k+1" />. There are two because <Katex tex="CD" /> is U-shaped in <Katex tex="k" />, and a line can cut a U twice; the widget below shows this.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="g(x)=x \implies x^3-kx=x" />,
    reason: <>The curve meets the line <Katex tex="y=x" /> where the two rules are equal.</>,
  },
  {
    working: <Katex display tex="x^3 - (k+1)x = 0 \implies x\bigl(x^2-(k+1)\bigr)=0" />,
    reason: <>Factorise rather than divide by <Katex tex="x" />: dividing would lose the intersection at the origin.</>,
  },
  {
    working: <Katex display tex="x=0 \text{ or } x=\pm\sqrt{k+1}" />,
    reason: <>Three solutions, so three intersections on the whole graph. The diagram only shows <Katex tex="x\ge0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \sqrt{k+1}}" />,
    reason: <>The diagram puts <Katex tex="(a,a)" /> to the right of the origin, so take the positive root, written as <Katex tex="a=\ldots" />.</>,
    more: <>The report says <Katex tex="a=\pm\sqrt{k+1}" /> was a common incorrect answer, and that some students found <Katex tex="k" /> in terms of <Katex tex="a" /> (<Katex tex="k=a^2-1" />) instead, which answers a different question.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_0^{\sqrt{k+1}}\bigl(x-g(x)\bigr)\,dx" />,
    reason: <>Upper minus lower, between the intersections <Katex tex="x=0" /> and <Katex tex="x=a" />. The line is on top the whole way, even below the axis, so one integral does it.</>,
    more: <>On CAS, with <Katex tex="g" /> already defined (part (c)(i)), type exactly this with the integral template; writing <Katex tex="g(x)" /> keeps the brackets for you, which is the report&apos;s advice. The report also says some students overcomplicated the question by breaking the area into sections: top minus bottom already handles the part below the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="= \int_0^{\sqrt{k+1}}\bigl(x-(x^3-kx)\bigr)\,dx" />,
    reason: <>By hand, keep the bracket around <Katex tex="g(x)" /> until you expand: <Katex tex="-(x^3-kx)=-x^3+kx" />.</>,
    more: <>Dropping the bracket is the common error the report singles out.</>,
  },
  {
    working: <Katex display tex="= \int_0^{\sqrt{k+1}}\bigl((k+1)x-x^3\bigr)\,dx" />,
    reason: <>Collecting <Katex tex="x+kx=(k+1)x" />. This is <Katex tex="x\bigl(k+1-x^2\bigr)" />, positive between <Katex tex="0" /> and <Katex tex="a" />, as the line is on top.</>,
    more: <>It is the strip height in the widget below.</>,
  },
  {
    working: <Katex display tex="= \left[\frac{(k+1)x^2}{2}-\frac{x^4}{4}\right]_0^{\sqrt{k+1}}" />,
    reason: <>Antidifferentiating, treating <Katex tex="k" /> as a constant.</>,
  },
  {
    working: <Katex display tex="= \frac{(k+1)^2}{2}-\frac{(k+1)^2}{4}" />,
    reason: <>Substitute the limit <Katex tex="\sqrt{k+1}" />, not <Katex tex="k+1" />: <Katex tex="\left(\sqrt{k+1}\right)^2=k+1" /> and <Katex tex="\left(\sqrt{k+1}\right)^4=(k+1)^2" />. The lower limit gives <Katex tex="0" />.</>,
    more: <>The report says there was evidence of students substituting <Katex tex="k+1" /> instead of <Katex tex="\sqrt{k+1}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{(k+1)^2}{4}}" />,
    reason: <>Common denominator <Katex tex="4" />: <Katex tex="\tfrac12-\tfrac14=\tfrac14" /> of <Katex tex="(k+1)^2" />.</>,
    more: <>Check with <Katex tex="f" />, where <Katex tex="k=5" />: <Katex tex="\int_0^{\sqrt6}\bigl(x-f(x)\bigr)dx=\tfrac{36}{4}=9" />, positive as an area must be.</>,
  },
]

export default function MethodsQ1_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p className="mb-3">
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=x^3-5x" />. Part of the graph of{' '}
          <Katex tex="f" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={cubicSrc}
            alt="Graph of y = x³ − 5x between x = −5 and x = 5, with a local maximum near x = −1.3 and a local minimum near x = 1.3, from the original 2017 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Turning Points" marks={2} statement={<>Find the coordinates of the turning points.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Line Equation"
        marks={2}
        statement={
          <>
            <Katex tex="A(-1,f(-1))" /> and <Katex tex="B(1,f(1))" /> are two points on the
            graph of <Katex tex="f" />. Find the equation of the straight line through{' '}
            <Katex tex="A" /> and <Katex tex="B" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
        <Explore title="Why the chord through A and B passes through the origin">
          <ChordWidget />
        </Explore>
        <WrongMethod
          title="f(−1) = −4 and f(1) = 4, so the gradient is 4"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned} m&=\frac{4-(-4)}{1-(-1)}=4\\ y+4&=4(x+1) \implies y=4x \end{aligned}" />}
        >
          Swapping the signs of the two <Katex tex="y" />-coordinates is one way to land on{' '}
          <Katex tex="y=4x" />, the report&apos;s common incorrect answer. Neither point is on the
          curve: <Katex tex="f(-1)=(-1)^3-5(-1)=-1+5=4" />. The report&apos;s own check catches it
          instantly: on the graph the chord from <Katex tex="A" /> to <Katex tex="B" /> goes
          downhill, so its gradient must be negative.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b.ii" topic="Distance" marks={1} statement={<>Find the distance <Katex tex="AB" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
        <WrongMethod
          title="Multiply the two brackets in the distance formula"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\sqrt{(1-(-1))^2\times(-4-4)^2}\\&=\sqrt{4\times64}=16\end{aligned}" />}
        >
          That is the product of the legs, not Pythagoras. A quick sense check exposes it: walking
          along both legs is only <Katex tex="2+8=10" /> units, and the straight line from{' '}
          <Katex tex="A" /> to <Katex tex="B" /> can&apos;t be longer than that. The hypotenuse
          must lie between the longer leg (<Katex tex="8" />) and the sum of the legs{' '}
          (<Katex tex="10" />), and <Katex tex="\sqrt{68}\approx8.25" /> does.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g:R\to R" />, <Katex tex="g(x)=x^3-kx" />, <Katex tex="k\in R^+" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Distance"
        marks={2}
        statement={
          <>
            Let <Katex tex="C(-1,g(-1))" /> and <Katex tex="D(1,g(1))" /> be two points on the
            graph of <Katex tex="g" />. Find the distance <Katex tex="CD" /> in terms of{' '}
            <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <Background title="Why part (b) is a special case">
          <p>
            Everything in part (c) is part (b) with <Katex tex="5" /> replaced by{' '}
            <Katex tex="k" />. Doing part (b) first, then repeating it symbolically, is the
            whole design of the question, and it gives you a free check at every stage:
            substituting <Katex tex="k=5" /> into any part (c) answer must reproduce the
            matching part (b) answer.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <Explore title="CD is Pythagoras: a run that never changes and a rise that does">
          <DistanceWidget />
        </Explore>
        <WrongMethod
          title="Take the square root of each term separately"
          source="Examiner's report"
          working={<Katex display tex="\sqrt{2^2+(2-2k)^2}=2+2-2k" />}
        >
          A square root undoes a square, not a sum, so it can&apos;t be split across the plus
          sign. Test it with part (b)&apos;s <Katex tex="k=5" />: it gives{' '}
          <Katex tex="4-2k=-6" />, a negative distance, where the answer should be{' '}
          <Katex tex="\sqrt{68}" />. Adding the legs only matches the hypotenuse when one leg is
          zero (here <Katex tex="k=1" />), so a single lucky value never proves the step.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Find Parameter"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="k" /> such that the distance <Katex tex="CD" /> is
            equal to <Katex tex="k+1" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <Explore title="Why CD = k + 1 has two solutions">
          <TwoKWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The diagram below shows part of the graphs of <Katex tex="g" /> and{' '}
          <Katex tex="y=x" />. These graphs intersect at the points with the coordinates{' '}
          <Katex tex="(0,0)" /> and <Katex tex="(a,a)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={shadedSrc}
            alt="The line y = x and the curve y = g(x) meeting at the origin and at (a, a), with the region between them shaded — the curve dips below the x-axis in between, from the original 2017 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
      </div>

      <PartCard
        letter="d.i"
        topic="Find Parameter"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="a" /> in terms of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
        <Explore title="Three intersections, but only one is (a, a)">
          <IntersectionsWidget />
        </Explore>
        <WrongMethod
          title="x² = k + 1, so a = ±√(k + 1)"
          source="Examiner's report"
          working={<Katex display tex="a=\pm\sqrt{k+1}" />}
        >
          Both signs do solve <Katex tex="g(x)=x" />, but they are different points. The negative
          root gives <Katex tex="\left(-\sqrt{k+1},-\sqrt{k+1}\right)" /> in the third quadrant,
          which the diagram doesn&apos;t show. <Katex tex="(a,a)" /> is drawn to the right of the
          origin, so <Katex tex="a" /> is one positive number. Whenever a question labels a point
          on a diagram, read its sign off the picture before giving a <Katex tex="\pm" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area of the shaded region in terms of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="Why one integral covers the whole region, even below the axis">
          <StripsWidget />
        </Explore>
        <WrongMethod
          title="Leave out the brackets: integrate x − x³ − kx"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{aligned}&\int_0^{\sqrt{k+1}}\bigl(x-x^3-kx\bigr)dx\\&=-\frac{(k+1)(3k-1)}{4}\end{aligned}"
            />
          }
        >
          Without the bracket the{' '}
          <Katex tex="kx" /> term keeps its minus sign when it should have become <Katex tex="+kx" />. In effect you have integrated <Katex tex="x" /> minus a
          different function, <Katex tex="x^3+kx" />, instead of <Katex tex="x-g(x)" />. Try{' '}
          <Katex tex="k=5" />: the result is <Katex tex="-21" />, and an area can&apos;t be
          negative. Write <Katex tex="x-g(x)" /> first and expand the bracket as its own step.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
