// 2021 Mathematical Methods — Exam 2, Section B Question 3 (12 marks). A log difference
// that collapses to a single log, a tangent and a normal, then a squared exponential, the
// angle between two lines, and an area. Question text transcribed from the original paper;
// the figure is a crop of VCAA's own artwork. Answers checked with sympy/scipy and against
// the VCAA examination report. Solution is original. Part e. uses the Methods approach (gradient =
// tan of the angle with the x-axis, so the tangent sits at 45° ± 60°), not the Specialist
// angle-between-lines formula. Interactive diagrams (§15): part e. drags the point of tangency
// along p while the angle with y = x + 2 is marked, with a small graph of θ against a crossing
// 60° twice (interactives/meth-2021e2-q3e-two-angles.tsx); part f. sweeps a strip whose top
// switches from the line to p at x ≈ −0.750 (interactives/meth-2021e2-q3f-lower-graph.tsx).
// Part a. (36% full marks) has no widget: the marks were lost by leaving out the range and by
// not intersecting the two log conditions, which the working states directly.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2021e2-q3-graph.png'

const TwoAnglesWidget = lazyWidget(() => import('../interactives/meth-2021e2-q3e-two-angles'))
const LowerGraphWidget = lazyWidget(() => import('../interactives/meth-2021e2-q3f-lower-graph'))

const EXAM_A: SAExaminerStats = {
  marks: [27, 37, 36],
  average: 1.1,
  comment: (
    <>
      Some students only gave the domain and not the range. Others gave the domain as{' '}
      <Katex tex="(-\infty,1)" /> or <Katex tex="(-\infty,1]" /> or <Katex tex="(-1,-\infty)" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [26, 74],
  average: 0.8,
  comment: (
    <>
      An equation was required. Many students worked out the equation without using
      technology. This would have been time consuming.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: <>Once again, an equation was required and it could be found easily using technology.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      Some students wrote that there exists two <Katex tex="x" />-values for every{' '}
      <Katex tex="y" />-value, which is not the case, or <Katex tex="p" /> fails the vertical
      line test. Others gave the meaning of a
      one-to-one function without relating it to the question.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      Some students gave their answer in terms of <Katex tex="x" /> and not{' '}
      <Katex tex="a" />. There were some transcription errors and brackets were used poorly.
      Others wrote the equation of the tangent.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [83, 4, 9, 4],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Some students were able to find either{' '}
      <Katex tex="a=-0.67" /> or <Katex tex="a=-0.11" /> but not both.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [41, 23, 7, 29],
  average: 1.3,
  comment: (
    <>
      Many students were able to find <Katex tex="x=-0.750" />. Some wrote their answer as{' '}
      <Katex tex="x=-0.75" />, but three decimal places were required. Others were unable to
      set up the definite integrals correctly.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-1>0 \implies x<-1 \text{ or } x>1" />,
    reason: <>You can only take the log of a positive number, so each log's argument must be positive. <Katex tex="x^2>1" /> means <Katex tex="x" /> is further than 1 from zero, on either side.</>,
  },
  {
    working: <Katex display tex="1-x>0 \implies x<1" />,
    reason: <>The second log's condition. Both conditions must hold at once, since <Katex tex="q" /> needs both logs to exist.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{domain } (-\infty,-1)}" />,
    reason: <>The <Katex tex="x" />-values that satisfy both: of <Katex tex="x<-1" /> or <Katex tex="x>1" />, only <Katex tex="x<-1" /> also has <Katex tex="x<1" />.</>,
    more: <>Checking only one condition goes wrong: <Katex tex="1-x>0" /> alone gives <Katex tex="(-\infty,1)" />, and <Katex tex="x^2-1>0" /> alone would admit <Katex tex="x>1" />. Write the interval with the smaller end first: <Katex tex="(-\infty,-1)" />, not <Katex tex="(-1,-\infty)" />. The endpoint <Katex tex="-1" /> is excluded because <Katex tex="\log_e(0)" /> is undefined.</>,
  },
  {
    working: <Katex display tex="q(x) = \log_e\!\left(\frac{(x-1)(x+1)}{1-x}\right) = \log_e(-x-1)" />,
    reason: <>For the range, simplify to one log: use <Katex tex="\log_e A-\log_e B=\log_e\!\left(\tfrac AB\right)" />, factorise <Katex tex="x^2-1" />, and cancel using <Katex tex="\tfrac{x-1}{1-x}=-1" />.</>,
    more: <>The log law is valid here because both arguments, <Katex tex="x^2-1" /> and <Katex tex="1-x" />, are positive everywhere on the domain.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x\to-1^-: \ -x-1\to0^+, \ q\to-\infty \\ &x\to-\infty: \ -x-1\to\infty, \ q\to\infty\end{aligned}" />,
    reason: <>On the domain, <Katex tex="-x-1" /> takes every positive value, and <Katex tex="\log_e" /> of all the positive numbers gives every real number.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{range } R}" />,
    reason: <>The question asks for the domain <em>and</em> the range, so state both.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}q(x) &= \log_e(-x-1) \\ q'(x) &= \frac{-1}{-x-1} = \frac{1}{x+1}\end{aligned}" />,
    reason: <>Use the simplified form from part a. Then only the chain rule is needed: the derivative of <Katex tex="\log_e(-x-1)" /> is <Katex tex="\tfrac{-1}{-x-1}" />.</>,
    more: <>On CAS you can also get the tangent's equation directly from the Calculus menu. The report notes that many students worked the equation out without technology, which would have been time consuming.</>,
  },
  {
    working: <Katex display tex="q'(-2) = \frac{1}{-1} = -1, \quad q(-2) = \log_e(1) = 0" />,
    reason: <>The gradient at <Katex tex="x=-2" />, and the point of tangency <Katex tex="(-2,0)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -x-2}" />,
    reason: <>From <Katex tex="y-y_1=m(x-x_1)" />: <Katex tex="y-0=-1(x+2)" />. The question asks for an <em>equation</em>, not just the gradient.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="m_{\perp} = \frac{-1}{-1} = 1" />,
    reason: <>&ldquo;Perpendicular to the graph&rdquo; means perpendicular to the tangent, so take the negative reciprocal of the tangent gradient <Katex tex="-1" /> from part b.i.</>,
    more: <>Perpendicular gradients multiply to <Katex tex="-1" />: <Katex tex="m_1m_2=-1" />, so <Katex tex="m_\perp=-\tfrac{1}{m}" />. This line is often called the normal to the graph.</>,
  },
  {
    working: <Katex display tex="y-0 = 1\left(x-(-2)\right)" />,
    reason: <>Through the given point <Katex tex="(-2,0)" />, which is also the point of tangency.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x+2}" />,
    reason: <>An equation again, not just the gradient. This is the line <Katex tex="y=x+2" /> used in parts e and f.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="p(x) = e^{-2x}-2e^{-x}+1 = \left(e^{-x}-1\right)^2" />,
    reason: <>Since <Katex tex="e^{-2x}=\left(e^{-x}\right)^2" />, this is a quadratic in <Katex tex="e^{-x}" />: <Katex tex="u^2-2u+1=(u-1)^2" /> with <Katex tex="u=e^{-x}" />. A perfect square.</>,
  },
  {
    working: <Katex display tex="p(x) \ge 0, \text{ with } p(0) = 0" />,
    reason: <>A square is never negative, and it is zero only when <Katex tex="e^{-x}=1" />, i.e. <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&p'(x) = 2e^{-x}\left(1-e^{-x}\right) \\ &\text{negative for } x<0, \text{ positive for } x>0\end{aligned}" />,
    reason: <>For <Katex tex="x<0" />, <Katex tex="e^{-x}>1" /> makes the bracket negative; for <Katex tex="x>0" /> it is positive. So <Katex tex="p" /> falls to a minimum at the origin, then rises, so <Katex tex="y" />-values between 0 and 1 are taken once on each side.</>,
    more: <>Graphing <Katex tex="p" /> on CAS shows the same shape: steeply down from the upper left to touch the <Katex tex="x" />-axis at the origin, then up towards the asymptote <Katex tex="y=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}p \text{ is many-to-one:} \\ \text{it fails the horizontal} \\ \text{line test}\end{gathered}}" />,
    reason: <>For example <Katex tex="p\left(\log_e\left(\tfrac23\right)\right)=p(\log_e(2))=\tfrac14" />: two different <Katex tex="x" />-values give the same <Katex tex="y" />-value.</>,
    more: <>Check: <Katex tex="e^{-\log_e(2/3)}=\tfrac32" /> and <Katex tex="e^{-\log_e 2}=\tfrac12" />, so <Katex tex="p=\left(\tfrac32-1\right)^2=\left(\tfrac12-1\right)^2=\tfrac14" />. Relate the answer to <Katex tex="p" /> itself, not just the definition of one-to-one. It is <em>some</em> <Katex tex="y" />-values (those between 0 and 1) that have two <Katex tex="x" />-values, not every one: values of 1 or more occur only once, left of the origin. And the <em>vertical</em> line test is about being a function at all, which <Katex tex="p" /> passes.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="p(x) = e^{-2x}-2e^{-x}+1" />,
    reason: <>Differentiating the expanded form term by term is easiest here.</>,
  },
  {
    working: <Katex display tex="p'(x) = -2e^{-2x}+2e^{-x}" />,
    reason: <>The derivative of <Katex tex="e^{kx}" /> is <Katex tex="ke^{kx}" />: here <Katex tex="k=-2" /> and <Katex tex="k=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p'(a) = 2\left(e^a-1\right)e^{-2a}}" />,
    reason: <>Replace <Katex tex="x" /> by <Katex tex="a" /> and take out <Katex tex="2e^{-2a}" />, since <Katex tex="e^{-2a}\cdot e^{a}=e^{-a}" />; equivalently <Katex tex="2e^{-a}-2e^{-2a}" />. The answer is a gradient, in terms of <Katex tex="a" />.</>,
    more: <>Only the gradient is asked for, not the tangent's equation, and it must use <Katex tex="a" />, not <Katex tex="x" />. Copy the brackets carefully: dropping them turns <Katex tex="2\left(e^{a}-1\right)e^{-2a}" /> into <Katex tex="2e^{a}-e^{-2a}" />, a different expression.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="y=x+2: \ m=1=\tan45^\circ" />,
    reason: <>A line's gradient is <Katex tex="\tan" /> of its angle with the positive <Katex tex="x" />-axis (measured anticlockwise). So <Katex tex="y=x+2" /> sits at <Katex tex="45^\circ" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\alpha &= 45^\circ+60^\circ = 105^\circ \\ \text{or } \alpha &= 45^\circ-60^\circ = -15^\circ\end{aligned}" />,
    reason: <>Let <Katex tex="\alpha" /> be the tangent's angle. To make <Katex tex="60^\circ" /> with the line, the tangent is turned <Katex tex="60^\circ" /> from <Katex tex="45^\circ" />, anticlockwise <em>or</em> clockwise: two cases.</>,
    more: <>Both cases give an acute angle of <Katex tex="60^\circ" /> between the lines. Turning by <Katex tex="120^\circ" /> gives nothing new: the acute angle is then <Katex tex="60^\circ" /> again, and <Katex tex="45^\circ+120^\circ=165^\circ" /> is the same line as <Katex tex="-15^\circ" /> (so <Katex tex="\tan165^\circ=\tan(-15^\circ)" />). Missing the second case was the main trap: the report notes some students found only one of the two values of <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}p'(a) &= \tan105^\circ \approx -3.732 \\ \text{or } p'(a) &= \tan(-15^\circ) \approx -0.268\end{aligned}" />,
    reason: <>The tangent's gradient is <Katex tex="\tan\alpha" />, and it equals <Katex tex="p'(a)" /> from part d.</>,
  },
  {
    working: <Cas fn="solve">solve(2(e^a − 1)·e^(−2a) = tan(105°), a)</Cas>,
    reason: <>Gives <Katex tex="a=-0.6702\ldots" />. Type the degree symbol (or set degree mode) so <Katex tex="\tan" /> reads the angle in degrees.</>,
  },
  {
    working: <Cas fn="solve">solve(2(e^a − 1)·e^(−2a) = tan(−15°), a)</Cas>,
    reason: <>Gives <Katex tex="a=-0.1130\ldots" />. CAS returns one solution for each equation, so there are exactly two values of <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -0.67 \ \text{ or } \ a = -0.11}" />,
    reason: <>Both values, to two decimal places.</>,
    more: <>Only 4% of students scored full marks on this part. Drag P in the diagram below to watch <Katex tex="\theta" /> pass <Katex tex="60^\circ" /> twice.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(e^(−2x) − 2e^(−x) + 1 = x + 2, x)</Cas>,
    reason: <>Where the line meets the curve. CAS gives one solution, <Katex tex="x=-0.7504\ldots" />, on the left of the origin, matching the graph in the question.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -0.750}" />,
    reason: <>Three decimal places means writing the final zero: <Katex tex="-0.75" /> is only two, and the report points out that three were required.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{upper edge} = x+2 \ \text{ for } -2\le x\le-0.7504 \\ &\text{upper edge} = p(x) \ \text{ for } -0.7504\le x\le0\end{aligned}" />,
    reason: <>The region runs from <Katex tex="x=-2" /> (the line's <Katex tex="x" />-intercept) to <Katex tex="x=0" /> (where <Katex tex="p" /> touches the axis). Each vertical strip stops at the <em>lower</em> graph: the line left of the crossing, <Katex tex="p" /> right of it.</>,
    more: <>Left of the crossing <Katex tex="p" /> is above the line (e.g. at <Katex tex="x=-2" />, <Katex tex="p(-2)\approx40.8" /> while the line is at 0), so a strip there reaches the line first. Right of the crossing <Katex tex="p" /> is below the line, so the strip reaches <Katex tex="p" /> first. Sweep the strip in the diagram below to see it.</>,
  },
  {
    working: <Katex display tex="A = \int_{-2}^{-0.7504}(x+2)\,dx+\int_{-0.7504}^{0}p(x)\,dx" />,
    reason: <>The upper edge changes at the crossing, so the area is two integrals split there.</>,
    more: <>Use the stored root <Katex tex="-0.7504\ldots" /> as the limit, not the rounded <Katex tex="-0.750" />: rounding a limit before integrating can change the last decimal place (here it happens to round the same either way). The report notes some students were unable to set up the definite integrals correctly. A single integral of either graph from <Katex tex="-2" /> to <Katex tex="0" /> would count the wrong region.</>,
  },
  {
    working: <><Cas fn="nInt">nInt(x + 2, x, −2, r)</Cas> + <Cas fn="nInt">nInt(e^(−2x) − 2e^(−x) + 1, x, r, 0)</Cas> <Katex display tex="\approx 0.78075+0.25735" /></>,
    reason: <>Each definite integral evaluated on CAS, with <Katex tex="r" /> the stored root <Katex tex="-0.7504\ldots" /> from the first step.</>,
    more: <>Check the first: it is a triangle with base and height both <Katex tex="-0.7504-(-2)=1.2496" />, so its area is <Katex tex="\tfrac12\times1.2496^2\approx0.78075" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 1.038}" />,
    reason: <>To three decimal places, as asked.</>,
  },
]

export default function MethodsQ3_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (12 marks)</p>
        <p>
          Let <Katex tex="q(x)=\log_e\left(x^2-1\right)-\log_e(1-x)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Domain & Range"
        marks={2}
        statement={<>State the maximal domain and the range of <Katex tex="q" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Find the equation of the tangent to the graph of <Katex tex="q" /> when{' '}
            <Katex tex="x=-2" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Normal Line"
        marks={1}
        statement={
          <>
            Find the equation of the line that is perpendicular to the graph of{' '}
            <Katex tex="q" /> when <Katex tex="x=-2" /> and passes through the point{' '}
            <Katex tex="(-2,0)" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="p(x)=e^{-2x}-2e^{-x}+1" />.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="One-to-One"
        marks={1}
        statement={<>Explain why <Katex tex="p" /> is not a one-to-one function.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Tangent Gradient"
        marks={1}
        statement={
          <>
            Find the gradient of the tangent to the graph of <Katex tex="p" /> at{' '}
            <Katex tex="x=a" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The diagram below shows parts of the graph of <Katex tex="p" /> and the line{' '}
          <Katex tex="y=x+2" />. The line <Katex tex="y=x+2" /> and the tangent to the graph
          of <Katex tex="p" /> at <Katex tex="x=a" /> intersect with an acute angle of{' '}
          <Katex tex="\theta" /> between them.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The curve p falling steeply from the upper left to touch the x-axis at the origin then rising slowly towards y = 1, with the straight line y = x + 2 crossing it — from the original 2021 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        topic="Angle Between Lines"
        marks={3}
        statement={
          <>
            Find the value(s) of <Katex tex="a" /> for which <Katex tex="\theta=60^\circ" />.
            Give your answer(s) correct to two decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="Why θ = 60° happens twice">
          <TwoAnglesWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="f"
        topic="Area Between Curves"
        marks={3}
        statement={
          <>
            Find the <Katex tex="x" />-coordinate of the point of intersection between the
            line <Katex tex="y=x+2" /> and the graph of <Katex tex="p" />, and hence find the
            area bounded by <Katex tex="y=x+2" />, the graph of <Katex tex="p" /> and the{' '}
            <Katex tex="x" />-axis, both correct to three decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
        <Explore title="Why the area needs two integrals: the strip stops at the lower graph">
          <LowerGraphWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
