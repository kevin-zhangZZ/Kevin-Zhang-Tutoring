// 2017 Mathematical Methods — Exam 2, Section B, Question 1 (11 marks).
// f(x) = x³ − 5x: turning points, a chord, then the same ideas with the parameter k in
// g(x) = x³ − kx, ending with an area that collapses to (k+1)²/4. Question text
// transcribed from the original paper; both figures are crops of VCAA's own artwork.
// Answers verified with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import cubicSrc from './meth-2017exam2-q1-cubic.png'
import shadedSrc from './meth-2017exam2-q1d-shaded.png'

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
      As in Question 1b.ii. some students did their solutions by hand and made arithmetic
      errors, especially sign errors. This would have been time consuming.{' '}
      <Katex tex="\sqrt{2^2+(2-2k)^2}=2+2-2k" /> was sometimes given. Some incorrect answers
      contained <Katex tex="\pm" />. When defining <Katex tex="g(x)=x^3-kx" /> on the
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
      Students who answered Question 1c.i. correctly were generally able to answer this
      question. Some students gave only one value for <Katex tex="k" />.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      A common incorrect answer was <Katex tex="a=-\sqrt{k+1}" />. By inspection of the graph,
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
      <Katex tex="\int_0^{\sqrt{k+1}}x-x^3-kx\,dx" /> was a common error, leaving out the
      brackets. To avoid these errors it would have been better to use the expression{' '}
      <Katex tex="\int_0^{\sqrt{k+1}}\bigl(x-g(x)\bigr)dx" />. Some students overcomplicated
      the question by breaking up the areas into different sections. The easiest approach was
      to use "upper function subtract lower function". There was evidence that students
      substituted <Katex tex="\sqrt{k-1}" /> instead of <Katex tex="\sqrt{k+1}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=3x^2-5" />,
    reason: <>Turning points are stationary points, so differentiate and set to zero.</>,
  },
  {
    working: <Katex display tex="3x^2-5=0 \implies x=\pm\sqrt{\frac53}=\pm\frac{\sqrt{15}}{3}" />,
    reason: <>Rationalising: <Katex tex="\sqrt{\tfrac53}=\tfrac{\sqrt5}{\sqrt3}=\tfrac{\sqrt{15}}{3}" />. Exact form is required — the report notes decimals scored zero.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{\sqrt{15}}{3}\right) = \frac{15\sqrt{15}}{27}-\frac{5\sqrt{15}}{3} = \frac{5\sqrt{15}}{9}-\frac{15\sqrt{15}}{9}" />,
    reason: <>Cubing: <Katex tex="\left(\tfrac{\sqrt{15}}{3}\right)^3=\tfrac{15\sqrt{15}}{27}=\tfrac{5\sqrt{15}}{9}" />.</>,
  },
  {
    working: <Katex display tex="= -\frac{10\sqrt{15}}{9}" />,
    reason: <>And by oddness, <Katex tex="f\!\left(-\tfrac{\sqrt{15}}{3}\right)=+\tfrac{10\sqrt{15}}{9}" /> — no need to repeat the arithmetic, since <Katex tex="f" /> is an odd function.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-\frac{\sqrt{15}}{3},\ \frac{10\sqrt{15}}{9}\right) \text{ and } \left(\frac{\sqrt{15}}{3},\ -\frac{10\sqrt{15}}{9}\right)}" />,
    reason: <>Roughly <Katex tex="(-1.29,4.30)" /> and <Katex tex="(1.29,-4.30)" />, which matches the printed graph — maximum on the left, minimum on the right.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f(-1)=-1+5=4, \qquad f(1)=1-5=-4" />,
    reason: <>So <Katex tex="A=(-1,4)" /> and <Katex tex="B=(1,-4)" />.</>,
  },
  {
    working: <Katex display tex="m = \frac{-4-4}{1-(-1)} = \frac{-8}{2} = -4" />,
    reason: <>The chord goes down as you move right, so a negative gradient is expected. The report's popular wrong answer <Katex tex="y=4x" /> fails this check on sight.</>,
  },
  {
    working: <Katex display tex="y-4 = -4(x+1)" />,
    reason: <>Point–gradient form through <Katex tex="A(-1,4)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-4x}" />,
    reason: <>The constant cancels, which is no accident: <Katex tex="f" /> is odd, so <Katex tex="A" /> and <Katex tex="B" /> are symmetric about the origin and the chord must pass through it.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="AB = \sqrt{(x_2-x_1)^2+(y_2-y_1)^2}" />,
    reason: <>The distance formula — note the plus sign between the brackets, which the report says some students replaced with a multiplication.</>,
  },
  {
    working: <Katex display tex="= \sqrt{(1-(-1))^2+(-4-4)^2} = \sqrt{4+64}" />,
    reason: <>Both differences squared. Taking only the vertical difference gives <Katex tex="\sqrt{64}=8" />, the report's common wrong answer.</>,
  },
  {
    working: <Katex display tex="\boxed{AB = \sqrt{68} = 2\sqrt{17}}" />,
    reason: <>Since <Katex tex="68=4\times17" />. About <Katex tex="8.25" /> — just longer than the vertical drop of <Katex tex="8" />, as it should be.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="g(-1)=-1+k, \qquad g(1)=1-k" />,
    reason: <>So <Katex tex="C=(-1,k-1)" /> and <Katex tex="D=(1,1-k)" />.</>,
  },
  {
    working: <Katex display tex="CD = \sqrt{2^2+\bigl((1-k)-(k-1)\bigr)^2}" />,
    reason: <>The horizontal separation is always <Katex tex="2" />; the vertical one depends on <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="= \sqrt{4+(2-2k)^2}" />,
    reason: <><Katex tex="(1-k)-(k-1)=2-2k" />. Watch the double negative here — it is the sign error the report highlights.</>,
  },
  {
    working: <Katex display tex="= \sqrt{4+4(1-k)^2} = 2\sqrt{1+(1-k)^2}" />,
    reason: <>Taking a factor of <Katex tex="4" /> out of the surd.</>,
  },
  {
    working: <Katex display tex="\boxed{CD = 2\sqrt{k^2-2k+2}}" />,
    reason: <>Expanding inside. Check against part (b): at <Katex tex="k=5" /> this gives <Katex tex="2\sqrt{17}" /> ✓.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="2\sqrt{k^2-2k+2} = k+1" />,
    reason: <>Setting the distance equal to <Katex tex="k+1" />.</>,
  },
  {
    working: <Katex display tex="4(k^2-2k+2) = (k+1)^2" />,
    reason: <>Squaring. Safe here because <Katex tex="k\in R^+" />, so both sides are positive.</>,
  },
  {
    working: <Katex display tex="4k^2-8k+8 = k^2+2k+1" />,
    reason: <>Expanding both sides.</>,
  },
  {
    working: <Katex display tex="3k^2-10k+7=0 \implies (3k-7)(k-1)=0" />,
    reason: <>Collecting and factorising.</>,
  },
  {
    working: <Katex display tex="\boxed{k=1 \text{ or } k=\frac73}" />,
    reason: <>Both are positive, so both are valid. The report notes that many students found only one of them — always check whether a quadratic has a second usable root.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="g(x)=x \implies x^3-kx=x" />,
    reason: <>The curve meets the line <Katex tex="y=x" /> where the rule equals <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="x^3 = (k+1)x \implies x\bigl(x^2-(k+1)\bigr)=0" />,
    reason: <>Factorise rather than divide by <Katex tex="x" /> — dividing would lose the intersection at the origin, which the question has already told us about.</>,
  },
  {
    working: <Katex display tex="x=0 \text{ or } x=\pm\sqrt{k+1}" />,
    reason: <>Three intersections in all.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \sqrt{k+1}}" />,
    reason: <>The diagram puts <Katex tex="(a,a)" /> in the first quadrant, so take the positive root. The report lists <Katex tex="-\sqrt{k+1}" /> as the common error.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_0^{\sqrt{k+1}}\bigl(x-g(x)\bigr)\,dx" />,
    reason: <>Upper curve minus lower curve, across the whole region. Between <Katex tex="0" /> and <Katex tex="a" /> the line <Katex tex="y=x" /> is above <Katex tex="g" /> throughout, even where both dip below the axis — so one integral does the lot, with no splitting.</>,
  },
  {
    working: <Katex display tex="= \int_0^{\sqrt{k+1}}\bigl(x-x^3+kx\bigr)\,dx" />,
    reason: <>Note the bracket around <Katex tex="g(x)" /> when expanding: <Katex tex="-(x^3-kx)=-x^3+kx" />. Dropping it is the error the report singles out.</>,
  },
  {
    working: <Katex display tex="= \int_0^{\sqrt{k+1}}\bigl((k+1)x-x^3\bigr)\,dx" />,
    reason: <>Collecting the two <Katex tex="x" /> terms.</>,
  },
  {
    working: <Katex display tex="= \left[\frac{(k+1)x^2}{2}-\frac{x^4}{4}\right]_0^{\sqrt{k+1}}" />,
    reason: <>Antidifferentiating, treating <Katex tex="k" /> as a constant.</>,
  },
  {
    working: <Katex display tex="= \frac{(k+1)^2}{2}-\frac{(k+1)^2}{4}" />,
    reason: <>Because <Katex tex="\left(\sqrt{k+1}\right)^2=k+1" /> and <Katex tex="\left(\sqrt{k+1}\right)^4=(k+1)^2" /> — the surd disappears completely.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{(k+1)^2}{4}}" />,
    reason: <>Check with the original <Katex tex="f" />, where <Katex tex="k=5" />: the area would be <Katex tex="\tfrac{36}{4}=9" />, which is a plausible size for that region.</>,
  },
  {
    working: <Cas fn="define">Define g(x) = x^3 - k·x</Cas>,
    reason: <>On CAS, store <Katex tex="g" /> first and then integrate <Katex tex="x-g(x)" /> with the integral template. The report warns that the multiplication sign between <Katex tex="k" /> and <Katex tex="x" /> is not optional — without it the CAS reads <Katex tex="kx" /> as a single new variable.</>,
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
          <img
            src={cubicSrc}
            alt="Graph of y = x³ − 5x between x = −5 and x = 5, with a local maximum near x = −1.3 and a local minimum near x = 1.3, from the original 2017 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard letter="a" marks={2} statement={<>Find the coordinates of the turning points.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
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
      </PartCard>

      <PartCard letter="b.ii" marks={1} statement={<>Find the distance <Katex tex="AB" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g:R\to R" />, <Katex tex="g(x)=x^3-kx" />, <Katex tex="k\in R^+" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
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
            whole design of the question — and it gives you a free check at every stage:
            substituting <Katex tex="k=5" /> into any part (c) answer must reproduce the
            matching part (b) answer.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
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
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The diagram below shows part of the graphs of <Katex tex="g" /> and{' '}
          <Katex tex="y=x" />. These graphs intersect at the points with the coordinates{' '}
          <Katex tex="(0,0)" /> and <Katex tex="(a,a)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={shadedSrc}
            alt="The line y = x and the curve y = g(x) meeting at the origin and at (a, a), with the region between them shaded — the curve dips below the x-axis in between, from the original 2017 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
      </div>

      <PartCard
        letter="d.i"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="a" /> in terms of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        marks={2}
        statement={
          <>
            Find the area of the shaded region in terms of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
