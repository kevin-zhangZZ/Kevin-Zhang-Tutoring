// 2017 Mathematical Methods — Exam 1, Question 9 (9 marks).
// f(x) = √x(1 − x) on [0, 1]: area, a "show that" derivative, then the right-angled
// triangle whose two slant edges are tangents to the curve. Parts (c) and (d) were answered
// poorly (0.2 average on each). Question text transcribed from the
// original paper; both figures are crops of VCAA's own artwork. Answers verified with
// sympy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import curveSrc from './meth-2017e1-q9-curve.png'
import triangleSrc from './meth-2017e1-q9-triangle.png'

const EXAM_A: SAExaminerStats = {
  marks: [44, 9, 47],
  average: 0.6,
  comment: (
    <>
      Concise and correct solutions were produced by many students. Common incorrect
      approaches included{' '}
      <Katex tex="\int f(x)g(x)\,dx = \int f(x)\,dx\times\int g(x)\,dx" /> or splitting the
      expression into a sum, <Katex tex="\int\sqrt{x}\,dx+\int(1-x)\,dx" />, then
      anti-differentiating. Other students struggled with manipulation of rational exponents.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [65, 35],
  average: 0.3,
  comment: (
    <>
      When answering "show that" questions, students should include all steps to demonstrate
      exactly what was done, but many students often left steps out. A common pattern was to
      go straight from the first line of differentiation immediately to the final line, with
      no indication of obtaining a common denominator.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [77, 6, 17],
  average: 0.2,
  comment: (
    <>
      Many students recognised <Katex tex="m=-1" /> and gave the correct equation of tangent{' '}
      <Katex tex="BC" />, but were not able to fully determine <Katex tex="B(1,0)" /> due to
      insufficient working. Students had difficulty solving{' '}
      <Katex tex="\tfrac{1-3x}{2\sqrt{x}}=-1" />. The highest-scoring responses were where
      students used a pronumeral such as 'let <Katex tex="a=\sqrt{x}" />'. This created the
      correct answer version <Katex tex="a=-\tfrac13" /> or <Katex tex="a=1" />. Students should be
      made aware that squaring both sides introduces extra solutions. Some students found the
      equation of the line through <Katex tex="A" /> and <Katex tex="C" /> rather than through{' '}
      <Katex tex="B" /> and <Katex tex="C" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [75, 7, 5, 5, 9],
  average: 0.2,
  comment: (
    <>
      Many students did not attempt this question. There were, however, some successful
      responses. These students knew to equate the equation from part c. with their equation
      in this question and solve these equations simultaneously. A common error involved
      calculating the coordinates accurately.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sqrt{x}(1-x) = x^{\frac12}-x^{\frac32}" />,
    reason: <>Expand first. There is no product rule for integration, so the only way forward is to turn the product into a sum of powers.</>,
  },
  {
    working: <Katex display tex="\text{Area}=\int_0^1\left(x^{\frac12}-x^{\frac32}\right)dx" />,
    reason: <>The curve is above the axis on all of <Katex tex="[0,1]" />, so no absolute values or splitting is needed.</>,
  },
  {
    working: <Katex display tex="=\left[\frac{2}{3}x^{\frac32}-\frac{2}{5}x^{\frac52}\right]_0^1" />,
    reason: <>Add one to each index and divide: <Katex tex="\tfrac12\to\tfrac32" /> so divide by <Katex tex="\tfrac32" />, which is multiplying by <Katex tex="\tfrac23" />.</>,
  },
  {
    working: <Katex display tex="=\frac{2}{3}-\frac{2}{5}=\frac{10-6}{15}" />,
    reason: <>At <Katex tex="x=1" /> every power is <Katex tex="1" />; at <Katex tex="x=0" /> everything vanishes.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area}=\frac{4}{15}}" />,
    reason: <>About <Katex tex="0.267" />. Sensible — the hump peaks a little below <Katex tex="0.4" /> and sits over an interval of width <Katex tex="1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=x^{\frac12}-x^{\frac32}" />,
    reason: <>Same expansion as part (a).</>,
  },
  {
    working: <Katex display tex="f'(x)=\frac12x^{-\frac12}-\frac32x^{\frac12}" />,
    reason: <>Power rule on each term.</>,
  },
  {
    working: <Katex display tex="=\frac{1}{2\sqrt{x}}-\frac{3\sqrt{x}}{2}" />,
    reason: <>Rewriting the negative and fractional indices as surds.</>,
  },
  {
    working: <Katex display tex="=\frac{1}{2\sqrt{x}}-\frac{3\sqrt{x}}{2}\times\frac{\sqrt{x}}{\sqrt{x}}" />,
    reason: <>Common denominator <Katex tex="2\sqrt{x}" />. This is the step the report says many students skipped — and it is the only step, so skipping it costs the mark.</>,
  },
  {
    working: <Katex display tex="=\frac{1}{2\sqrt{x}}-\frac{3x}{2\sqrt{x}}=\boxed{\frac{1-3x}{2\sqrt{x}}}" />,
    reason: <>As required. In a "show that", finish on exactly the printed expression — do not simplify past it.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\theta=45^\circ \implies m_{AC}=\tan(45^\circ)=1" />,
    reason: <><Katex tex="\theta" /> is the angle <Katex tex="AC" /> makes with the positive <Katex tex="x" />-direction, and gradient is the tangent of that angle.</>,
  },
  {
    working: <Katex display tex="AC\perp BC \implies m_{BC}=-\frac{1}{1}=-1" />,
    reason: <>The triangle is right-angled at <Katex tex="C" />, and perpendicular gradients multiply to <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\frac{1-3x}{2\sqrt{x}}=-1" />,
    reason: <><Katex tex="BC" /> is a tangent to the curve, so at its point of contact the curve has gradient <Katex tex="-1" />. Use part (b).</>,
  },
  {
    working: <Katex display tex="1-3x=-2\sqrt{x} \;\Longrightarrow\; 3x-2\sqrt{x}-1=0" />,
    reason: <>Multiply through by <Katex tex="2\sqrt{x}" /> (non-zero on <Katex tex="(0,1)" />) and collect on one side.</>,
  },
  {
    working: <Katex display tex="\text{let } a=\sqrt{x}:\quad 3a^2-2a-1=0" />,
    reason: <>Since <Katex tex="x=(\sqrt{x})^2=a^2" />. The report is explicit that the top responses substituted a pronumeral like this rather than squaring both sides, which would have introduced a spurious solution.</>,
  },
  {
    working: <Katex display tex="(3a+1)(a-1)=0 \implies a=-\tfrac13 \text{ or } a=1" />,
    reason: <><Katex tex="a=\sqrt{x}\ge0" />, so <Katex tex="a=-\tfrac13" /> is rejected.</>,
  },
  {
    working: <Katex display tex="\sqrt{x}=1 \implies x=1" />,
    reason: <>The tangent with gradient <Katex tex="-1" /> touches the curve at <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="f(1)=\sqrt{1}\,(1-1)=0 \implies B=(1,0)" />,
    reason: <>The point of contact is on the <Katex tex="x" />-axis, so it is <Katex tex="B" /> itself. The report says many students did not fully establish <Katex tex="B(1,0)" />.</>,
  },
  {
    working: <Katex display tex="y-0=-1(x-1)" />,
    reason: <>Point–gradient form through <Katex tex="B(1,0)" /> with gradient <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-x+1}" />,
    reason: <>So <Katex tex="m=-1" /> and <Katex tex="c=1" />, in the required form.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1-3x}{2\sqrt{x}}=1" />,
    reason: <>Now do the same for <Katex tex="AC" />, whose gradient is <Katex tex="\tan(45^\circ)=1" />.</>,
  },
  {
    working: <Katex display tex="1-3x=2\sqrt{x} \;\Longrightarrow\; 3x+2\sqrt{x}-1=0" />,
    reason: <>The sign of the middle term is the only difference from part (c).</>,
  },
  {
    working: <Katex display tex="\text{let } a=\sqrt{x}:\quad 3a^2+2a-1=0" />,
    reason: <>Same substitution.</>,
  },
  {
    working: <Katex display tex="(3a-1)(a+1)=0 \implies a=\tfrac13 \text{ (rejecting } a=-1)" />,
    reason: <><Katex tex="\sqrt{x}" /> cannot be negative.</>,
  },
  {
    working: <Katex display tex="x=\left(\tfrac13\right)^2=\tfrac19" />,
    reason: <>The point of contact of <Katex tex="AC" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac19\right)=\tfrac13\left(1-\tfrac19\right)=\tfrac13\times\tfrac89=\tfrac{8}{27}" />,
    reason: <>So <Katex tex="AC" /> touches the curve at <Katex tex="\left(\tfrac19,\tfrac8{27}\right)" />.</>,
  },
  {
    working: <Katex display tex="y-\tfrac{8}{27}=1\left(x-\tfrac19\right)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="y=x-\tfrac{3}{27}+\tfrac{8}{27}=x+\tfrac{5}{27}" />,
    reason: <>Writing <Katex tex="\tfrac19=\tfrac3{27}" /> so the fractions combine.</>,
  },
  {
    working: <Katex display tex="x+\tfrac{5}{27}=-x+1" />,
    reason: <><Katex tex="C" /> is where <Katex tex="AC" /> meets <Katex tex="BC" />, so set the two line equations equal.</>,
  },
  {
    working: <Katex display tex="2x=1-\tfrac{5}{27}=\tfrac{22}{27} \implies x=\tfrac{11}{27}" />,
    reason: <>Collecting.</>,
  },
  {
    working: <Katex display tex="y=-\tfrac{11}{27}+1=\tfrac{16}{27}" />,
    reason: <>Back-substituting into <Katex tex="y=-x+1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{C=\left(\frac{11}{27},\ \frac{16}{27}\right)}" />,
    reason: <>Roughly <Katex tex="(0.41,0.59)" />: above the curve (whose peak is about <Katex tex="0.38" /> high, at <Katex tex="x=\tfrac13" />) and a little to the right of the peak, as the figure shows. Check: <Katex tex="C" /> is on both lines, and <Katex tex="-\tfrac{11}{27}+1=\tfrac{16}{27}=\tfrac{11}{27}+\tfrac{5}{27}" /> ✓.</>,
  },
]

export default function MethodsQ9_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (9 marks)</p>
        <p className="mb-3">
          The graph of <Katex tex="f:[0,1]\to R" />, <Katex tex="f(x)=\sqrt{x}\,(1-x)" /> is
          shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={curveSrc}
            alt="Graph of y = √x(1 − x) on the interval from 0 to 1: a single hump rising steeply from the origin and coming back down to the axis at x = 1, from the original 2017 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Calculate the area between the graph of <Katex tex="f" /> and the{' '}
            <Katex tex="x" />-axis.
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
            For <Katex tex="x" /> in the interval <Katex tex="(0,1)" />, show that the
            gradient of the tangent to the graph of <Katex tex="f" /> is{' '}
            <Katex tex="\dfrac{1-3x}{2\sqrt{x}}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          The edges of the <strong>right-angled</strong> triangle <Katex tex="ABC" /> are the
          line segments <Katex tex="AC" /> and <Katex tex="BC" />, which are tangent to the
          graph of <Katex tex="f" />, and the line segment <Katex tex="AB" />, which is part of
          the horizontal axis, as shown below.
        </p>
        <p className="mb-3">
          Let <Katex tex="\theta" /> be the angle that <Katex tex="AC" /> makes with the
          positive direction of the horizontal axis, where{' '}
          <Katex tex="45^\circ\le\theta<90^\circ" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={triangleSrc}
            alt="The same curve with a right-angled triangle above it: vertex A on the x-axis left of the origin, vertex B on the x-axis to the right, and the apex C above the curve, with AC and BC tangent to the curve and the right angle marked at C; the angle theta between AC and the x-axis is marked at A — from the original 2017 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="c"
        topic="Line Equation"
        marks={2}
        statement={
          <>
            Find the equation of the line through <Katex tex="B" /> and <Katex tex="C" /> in
            the form <Katex tex="y=mx+c" />, for <Katex tex="\theta=45^\circ" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Why a pronumeral beats squaring">
          <p>
            <Katex tex="\tfrac{1-3x}{2\sqrt{x}}=\pm1" /> rearranges to something with both{' '}
            <Katex tex="x" /> and <Katex tex="\sqrt{x}" /> in it. Squaring both sides to
            clear the surd works, but it manufactures solutions that do not satisfy the
            original equation, and you then have to test each one.
          </p>
          <p>
            Substituting <Katex tex="a=\sqrt{x}" /> instead makes it an honest quadratic in{' '}
            <Katex tex="a" />, and the only thing to discard is a negative{' '}
            <Katex tex="a" /> — which is obviously impossible rather than subtly wrong. The
            examiners singled this out as what separated the full-mark responses.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Coordinates"
        marks={4}
        statement={
          <>
            Find the coordinates of <Katex tex="C" /> when <Katex tex="\theta=45^\circ" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
