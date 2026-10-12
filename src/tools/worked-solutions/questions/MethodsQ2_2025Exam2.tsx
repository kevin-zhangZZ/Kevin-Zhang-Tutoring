// 2025 Mathematical Methods — Exam 2, Section B Question 2 (14 marks). A line meeting an
// exponential twice: solving for the two parameters, the area between, the biggest gap,
// inverses, and an antiderivative that cannot fit both points. Question text transcribed
// from the original paper; the stem figure is a crop of VCAA's own artwork. Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import graphSrc from './meth-2025e2-q2-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [22, 35, 12, 31],
  average: 1.5,
  comment: (
    <>
      This was a ‘show that’ question and students were required to show the algebraic steps.
      Many students were able to set up the two simultaneous equations; but some unnecessarily
      solved <Katex tex="f(x)=g(x)" /> when the values were on the diagram. Some used a
      combination of their CAS and algebraic steps and were unable to gain full marks.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Common incorrect responses were <Katex tex="b=\dfrac{3}{4}" /> and{' '}
      <Katex tex="b=\dfrac{3}{4}\ln(2)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [13, 10, 77],
  average: 1.6,
  comment: (
    <>
      Some students set up the correct definite integral but had the wrong answer. Other
      students who wrote the definite integral in terms of <Katex tex="x" /> sometimes made
      transcription errors.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      This question was answered well. However, some students just wrote <Katex tex="h'(x)" /> or{' '}
      <Katex tex="\dfrac{d}{dx}\big(f(x)-g(x)\big)" />. Others wrote the expression for{' '}
      <Katex tex="h(x)" />, not <Katex tex="h'(x)" />. There were also some transcription
      errors.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: (
    <>
      This question was answered reasonably well. Some students just gave the{' '}
      <Katex tex="x" />-value, <Katex tex="-3.8\ldots" /> Others gave the coordinates of the
      turning point without stating the maximum value. <Katex tex="0.35" /> was a common incorrect
      answer.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [26, 12, 62],
  average: 1.4,
  comment: (
    <>
      This question was answered well. Some students, however, just gave the{' '}
      <Katex tex="x" />-values or the equation for the inverse function <Katex tex="g^{-1}" />.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [41, 21, 39],
  average: 1.0,
  comment: (
    <>
      A common incorrect answer was <Katex tex="F(x)=\dfrac{1}{4}x^2+7x" />. Some students
      substituted <Katex tex="-12" /> and <Katex tex="2" /> incorrectly into <Katex tex="F(x)" />,
      obtaining the wrong <Katex tex="c" /> values. Others found{' '}
      <Katex tex="F(x)=\dfrac{1}{4}x^2+7x+c" /> but then assumed <Katex tex="c=0" />.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [62, 11, 28],
  average: 0.7,
  comment: (
    <>
      Some students multiplied by <Katex tex="\dfrac{1}{m}" /> instead of <Katex tex="m" />.
      Others did not multiple their <Katex tex="c" /> values by <Katex tex="m" />, using{' '}
      <Katex tex="mF(x)=\dfrac{m}{4}x^2+7mx+c" />. Some attempted to solve their equations by hand
      and made algebraic errors giving incorrect answers; <Katex tex="m=9" /> was a common
      incorrect answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="(-12,1) \text{ on } g: \quad Ae^{-12k} = 1 \qquad (1)" />,
    reason: <>Both points lie on <Katex tex="g" />, so substitute each into <Katex tex="y=Ae^{kx}" /> — using <Katex tex="g" />, not <Katex tex="f" />, brings in <Katex tex="A" /> and <Katex tex="k" />.</>,
    more: <>The points are labelled on the diagram, so there is nothing to find first — the report notes some students unnecessarily solved <Katex tex="f(x)=g(x)" />.</>,
  },
  {
    working: <Katex display tex="(2,8) \text{ on } g: \quad Ae^{2k} = 8 \qquad (2)" />,
    reason: <>The same for the second point.</>,
  },
  {
    working: <Katex display tex="\frac{(2)}{(1)}: \quad e^{14k} = 8" />,
    reason: <>Dividing cancels <Katex tex="A" />, and <Katex tex="\dfrac{e^{2k}}{e^{-12k}}=e^{2k+12k}=e^{14k}" />.</>,
    more: <>This is the algebra the "show that" is testing. The report notes that students who used a combination of CAS and algebraic steps were unable to gain full marks — every step here has to be written by hand.</>,
  },
  {
    working: <Katex display tex="14k = \log_e(8) = 3\log_e(2) \implies k = \frac{3}{14}\log_e(2)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides; writing <Katex tex="8=2^3" /> gives <Katex tex="3\log_e(2)" />, the form asked for.</>,
  },
  {
    working: <Katex display tex="A = e^{12k} = e^{\frac{36}{14}\log_e(2)} = 2^{\frac{18}{7}}" />,
    reason: <>From (1), <Katex tex="A=\dfrac{1}{e^{-12k}}=e^{12k}" />, with <Katex tex="12k=\tfrac{36}{14}\log_e(2)" />. Then <Katex tex="e^{a\log_e(2)}=2^a" /> and <Katex tex="\tfrac{36}{14}=\tfrac{18}{7}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 2^{\frac{18}{7}}, \qquad k = \frac{3}{14}\log_e(2)}" />,
    reason: <>As required.</>,
    more: <>Numerically <Katex tex="A\approx5.944" /> and <Katex tex="k\approx0.1485" /> — but keep the exact values (or define <Katex tex="g" /> on CAS) for the later parts, because rounded values shift the answers.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="Ae^{kx} = A\times2^{bx} \implies e^{kx} = 2^{bx}" />,
    reason: <>The <Katex tex="A" /> cancels, so this is purely about changing the base.</>,
  },
  {
    working: <Katex display tex="2^{bx} = e^{bx\log_e(2)} \implies kx = bx\log_e(2)" />,
    reason: <>Write <Katex tex="2=e^{\log_e(2)}" />, so both sides are powers of <Katex tex="e" />; then equate the exponents.</>,
  },
  {
    working: <Katex display tex="b = \frac{k}{\log_e(2)} = \frac{\tfrac{3}{14}\log_e(2)}{\log_e(2)}" />,
    reason: <>The logarithms cancel — which is exactly why <Katex tex="k" /> was given in that form.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \frac{3}{14}}" />,
    reason: <>So <Katex tex="g(x)=2^{\frac{18}{7}}\times2^{\frac{3x}{14}}" />.</>,
    more: <>A check: at <Katex tex="x=2" />, <Katex tex="2^{\frac{18}{7}+\frac{3}{7}}=2^3=8" /> ✓. The answer is a plain number — a <Katex tex="\log_e(2)" /> left in <Katex tex="b" /> (as in the report's common incorrect response <Katex tex="b=\tfrac34\ln(2)" />) means the change of base was not finished.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{on } (-12,2): \ f(x) > g(x)" />,
    reason: <>The exponential is concave up, so between the two points where it meets the line it lies below the line — as the diagram shows.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_{-12}^{2}\left(\frac{x}{2}+7-2^{\frac{18}{7}}e^{\frac{3}{14}\log_e(2)\,x}\right)dx" />,
    reason: <>Area between curves is the integral of (upper − lower) between the intersections. Evaluate by <Cas fn="nInt" />.</>,
    more: <>Defining <Katex tex="f" /> and <Katex tex="g" /> first with <Cas fn="define" /> and integrating <Katex tex="f(x)-g(x)" /> avoids retyping the exponential — the report notes that students who wrote the integral in terms of <Katex tex="x" /> sometimes made transcription errors. Rounding first costs the mark: with <Katex tex="A=5.94" /> and <Katex tex="k=0.149" /> the integral comes out as <Katex tex="15.96" />.</>,
  },
  {
    working: <Katex display tex="= 15.87196\ldots" />,
    reason: <>Use the exact <Katex tex="A" /> and <Katex tex="k" />, not rounded values.</>,
  },
  {
    working: <Katex display tex="\boxed{15.87 \text{ square units}}" />,
    reason: <>Two decimal places, as asked.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = f(x)-g(x) = \frac{x}{2}+7-Ae^{kx}" />,
    reason: <>The vertical gap between the line and the curve.</>,
  },
  {
    working: <Katex display tex="h'(x) = \frac12-Ake^{kx}" />,
    reason: <>Differentiate term by term, using <Katex tex="\dfrac{d}{dx}e^{kx}=ke^{kx}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} Ak &= 2^{\frac{18}{7}}\times\tfrac{3}{14}\log_e(2) \\ &= 4\times2^{\frac47}\times\tfrac{3}{14}\log_e(2) \\ &= \tfrac{6}{7}\log_e(2)\,2^{\frac47} \end{aligned}" />,
    reason: <>Split <Katex tex="2^{\frac{18}{7}}=2^{2+\frac47}=4\times2^{\frac47}" />, then <Katex tex="4\times\tfrac{3}{14}=\tfrac{6}{7}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h'(x) = \frac12-\frac{6\log_e(2)}{7}\,2^{\frac{3x}{14}+\frac47}}" />,
    reason: <>Use <Katex tex="e^{kx}=2^{\frac{3x}{14}}" /> (part b.), then add the powers of 2.</>,
    more: <>Numerically <Katex tex="Ak\approx0.8829" />. CAS gives this expression directly if <Katex tex="f" /> and <Katex tex="g" /> are defined. The report notes some students just wrote <Katex tex="h'(x)" /> or <Katex tex="\tfrac{d}{dx}\big(f(x)-g(x)\big)" />, and others wrote the expression for <Katex tex="h(x)" /> — the mark needs an actual expression for the derivative.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="h'(x) = 0 \implies Ake^{kx} = \tfrac12" />,
    reason: <>A maximum inside the interval is a stationary point, so set the derivative from d.i. to zero.</>,
    more: <>Geometrically, this is where the tangent to <Katex tex="g" /> is parallel to the line <Katex tex="f" /> (gradient <Katex tex="\tfrac12" />) — where the gap stops growing and starts shrinking.</>,
  },
  {
    working: <Katex display tex="x = -3.8279\ldots" />,
    reason: <>By <Cas fn="nSolve" />. It is the only stationary point (<Katex tex="h'" /> is decreasing); as <Katex tex="h(-12)=h(2)=0" /> and <Katex tex="h>0" /> in between (part c.), it is the maximum.</>,
    more: <><Katex tex="h'(x)=\tfrac12-Ake^{kx}" /> is decreasing because <Katex tex="Ake^{kx}" /> is increasing, so <Katex tex="h'" /> crosses zero just once. The report prints <Katex tex="x=-3.829\ldots" />; to four decimal places it is <Katex tex="-3.8279" />. The maximum value is unaffected.</>,
  },
  {
    working: <Katex display tex="h(-3.8279) = 1.71974\ldots" />,
    reason: <>Substitute into <Katex tex="h" /> (not <Katex tex="h'" />) to get the value.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum value } 1.72}" />,
    reason: <>The question asks for the maximum <em>value</em>, not where it occurs.</>,
    more: <>The report notes some students gave just the <Katex tex="x" />-value, or the coordinates of the turning point without stating the maximum value, and that <Katex tex="0.35" /> was a common incorrect answer.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} y &= \frac{x}{2}+7 \implies x = 2(y-7) \\ &\implies f^{-1}(x) = 2(x-7) \end{aligned}" />,
    reason: <>Making <Katex tex="x" /> the subject of <Katex tex="f" /> shows the given line <em>is</em> <Katex tex="f^{-1}" />.</>,
    more: <>Whenever a question pairs an inverse with an unfamiliar line, check whether that line is the inverse of the other function in the question.</>,
  },
  {
    working: <Katex display tex="(a,b) \text{ on } f \text{ and } g \iff (b,a) \text{ on } f^{-1} \text{ and } g^{-1}" />,
    reason: <>Reflecting in <Katex tex="y=x" /> swaps coordinates, so each common point of <Katex tex="f" /> and <Katex tex="g" /> becomes a common point of the inverses.</>,
  },
  {
    working: <Katex display tex="f \text{ and } g \text{ meet at } (-12,1) \text{ and } (2,8)" />,
    reason: <>Given in the stem. A line meets a concave-up exponential at most twice, so there are no other points.</>,
  },
  {
    working: <Katex display tex="\boxed{(1,\,-12) \ \text{ and } \ (8,\,2)}" />,
    reason: <>Swap each coordinate pair. The question asks for <em>points</em>, so give both coordinates.</>,
    more: <>The report notes some students just gave the <Katex tex="x" />-values or the equation for the inverse function. The long way also works: <Katex tex="g^{-1}(x)=\dfrac{14\log_e(x)-36\log_e(2)}{3\log_e(2)}" />, then <Cas fn="solve" /> <Katex tex="g^{-1}(x)=2(x-7)" /> gives <Katex tex="x=1" /> and <Katex tex="x=8" />.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="F(x) = \int\left(\frac{x}{2}+7\right)dx = \frac{x^2}{4}+7x+c" />,
    reason: <>The constant of integration is <Katex tex="c" />, because "passes through <Katex tex="(0,c)" />" means <Katex tex="F(0)=c" />.</>,
    more: <>Keep the <Katex tex="+c" />: the report notes a common incorrect answer was <Katex tex="F(x)=\tfrac14x^2+7x" />, and that others found <Katex tex="F(x)=\tfrac14x^2+7x+c" /> but then assumed <Katex tex="c=0" />. Here <Katex tex="c" /> is the unknown the whole part is about.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} F(-12) = 1: \quad &\frac{144}{4}-84+c = 1 \\ &36-84+c = 1 \end{aligned}" />,
    reason: <>For <Katex tex="(-12,1)" /> to be on the graph, <Katex tex="F(-12)" /> must equal 1.</>,
  },
  {
    working: <Katex display tex="c = 49" />,
    reason: <>So the first point forces <Katex tex="c=49" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} F(2) = 8: \quad &\frac44+14+c = 8 \\ &15+c = 8 \implies c = -7 \end{aligned}" />,
    reason: <>The second point forces a different value of <Katex tex="c" />.</>,
    more: <>The report notes some students substituted <Katex tex="-12" /> and <Katex tex="2" /> incorrectly — watch the signs: <Katex tex="(-12)^2=144" /> but <Katex tex="7\times(-12)=-84" />. Equivalently, with <Katex tex="c=49" />, <Katex tex="F(2)=64\ne8" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &49 \ne -7, \text{ so no single } c \text{ works:} \\ &F \text{ cannot pass through both} \end{aligned}}" />,
    reason: <>One constant cannot take two different values, so no antiderivative of <Katex tex="f" /> passes through both points. As required.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\text{dilation of factor } m \text{ from the } x\text{-axis:} \\ &y = mF(x) \end{aligned}" />,
    reason: <>A dilation from the <Katex tex="x" />-axis multiplies every <Katex tex="y" />-value by <Katex tex="m" /> — including the constant <Katex tex="c" />.</>,
    more: <>The report notes some students multiplied by <Katex tex="\tfrac1m" /> instead of <Katex tex="m" /> (that route gives <Katex tex="m=9" />, the report's common incorrect answer), and others did not multiply <Katex tex="c" /> by <Katex tex="m" />, using <Katex tex="mF(x)=\tfrac{m}{4}x^2+7mx+c" />.</>,
  },
  {
    working: <Katex display tex="mF(-12) = 1: \quad m(c-48) = 1 \qquad (1)" />,
    reason: <>The image passes through <Katex tex="(-12,1)" />, and <Katex tex="F(-12)=36-84+c=c-48" /> from part f.i.</>,
  },
  {
    working: <Katex display tex="mF(2) = 8: \quad m(c+15) = 8 \qquad (2)" />,
    reason: <>The image passes through <Katex tex="(2,8)" />, and <Katex tex="F(2)=1+14+c=c+15" />.</>,
  },
  {
    working: <Katex display tex="\frac{(2)}{(1)}: \quad \frac{c+15}{c-48} = 8 \implies c+15 = 8c-384" />,
    reason: <>Dividing eliminates <Katex tex="m" />, as in part a., leaving a linear equation in <Katex tex="c" />.</>,
    more: <>Alternatively <Cas fn="solve" /> equations (1) and (2) for <Katex tex="m" /> and <Katex tex="c" /> together — the report notes some students attempted to solve by hand and made algebraic errors.</>,
  },
  {
    working: <Katex display tex="7c = 399 \implies c = 57" />,
    reason: <>Collect the <Katex tex="c" /> terms: <Katex tex="8c-c=15+384" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m = \frac{1}{57-48} = \frac19, \qquad c = 57}" />,
    reason: <>From (1), <Katex tex="m=\dfrac{1}{c-48}" />.</>,
    more: <>Check with (2): <Katex tex="\tfrac19(57+15)=\tfrac{72}{9}=8" /> ✓.</>,
  },
]

export default function MethodsQ2_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (14 marks)</p>
        <p>Let</p>
        <div className="pl-5">
          <Katex tex="f:R\to R,\ f(x)=\dfrac{x}{2}+7" />
        </div>
        <p>and</p>
        <div className="pl-5">
          <Katex tex="g:R\to R,\ g(x)=Ae^{kx}" />
        </div>
        <p>
          where <Katex tex="A,k\in R" />.
        </p>
        <p>
          The graphs of <Katex tex="y=f(x)" /> and{' '}
          <Katex tex="y=g(x)" /> intersect at the points <Katex tex="(-12,1)" /> and{' '}
          <Katex tex="(2,8)" />, as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="A straight line and a rising exponential curve crossing at the labelled points (−12, 1) and (2, 8), with the line above the curve between them — from the original 2025 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Dividing one equation by another is the move that appears twice. In part a. it
              eliminates <Katex tex="A" /> and leaves <Katex tex="e^{14k}=8" />; in part f.ii.
              it eliminates <Katex tex="m" /> and leaves a linear equation in{' '}
              <Katex tex="c" />. Both are far quicker than substitution.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Simultaneous Equations"
        marks={3}
        statement={
          <>
            Write down two simultaneous equations in terms of <Katex tex="A" /> and{' '}
            <Katex tex="k" />.
            <br />
            Solve them, using algebra, to show that{' '}
            <Katex tex="A=2^{\frac{18}{7}}" /> and{' '}
            <Katex tex="k=\frac{3}{14}\log_e(2)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Index Laws"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="b" />, where <Katex tex="b\in R" />, such
            that <Katex tex="g(x)" /> can be expressed in the form{' '}
            <Katex tex="g(x)=A\times2^{bx}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Use a definite integral to evaluate the area bounded by the graphs of{' '}
            <Katex tex="y=f(x)" /> and <Katex tex="y=g(x)" />, where{' '}
            <Katex tex="x\in[-12,2]" />.
            <br />
            Give the area correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          Let <Katex tex="h(x)=f(x)-g(x)" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Derivative"
        marks={1}
        statement={<>Write down an expression for the derivative of <Katex tex="h(x)" />.</>}
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Maximum Value"
        marks={1}
        statement={
          <>
            Find the maximum value of <Katex tex="h(x)" />, where{' '}
            <Katex tex="x\in[-12,2]" />.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Inverse Intersections"
        marks={2}
        statement={
          <>
            Let <Katex tex="g^{-1}" /> be the inverse of <Katex tex="g" />.
            <br />
            Find the points
            where the graph of <Katex tex="y=g^{-1}(x)" /> intersects with the graph of{' '}
            <Katex tex="y=2(x-7)" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">f.</span> Let{' '}
          <Katex tex="F" /> be an anti-derivative of <Katex tex="f" /> that passes through{' '}
          <Katex tex="(0,c)" />, where <Katex tex="c\in R" />.
        </p>
      </div>

      <PartCard
        letter="f.i"
        topic="Antiderivative"
        marks={2}
        statement={
          <>
            Show that it is <b>not</b> possible for the graph of <Katex tex="y=F(x)" /> to
            pass through both <Katex tex="(-12,1)" /> and <Katex tex="(2,8)" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Dilation"
        marks={2}
        statement={
          <>
            The graph of <Katex tex="y=F(x)" /> can be dilated by a factor of{' '}
            <Katex tex="m" /> from the <Katex tex="x" />-axis such that its image passes
            through both <Katex tex="(-12,1)" /> and <Katex tex="(2,8)" />.
            <br />
            Find the values of <Katex tex="m" /> and <Katex tex="c" />.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>
    </div>
  )
}
