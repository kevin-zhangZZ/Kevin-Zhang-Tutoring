// 2023 Specialist Mathematics — Exam 1 Question 1 (4 marks). Dividing a quadratic over a
// linear to expose an oblique asymptote, then sketching. Question text transcribed from the
// original paper; the sketch is our own matplotlib drawing of the answer on VCAA's grid. Answers checked with sympy
// and against the VCAA examination report. Solution is original.
// Widget (part b): interactives/spec-2023e1-q1b-gap.tsx — slide a probe along the curve to see the
// gap to y = x + 2 is −4/(x − 1), so each branch closes in on its asymptotes and never retreats.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './spec-2023e1-q1b-sketch.png'

const GapWidget = lazyWidget(() => import('../interactives/spec-2023e1-q1b-gap'))

const EXAM_A: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      This question was answered well. Various approaches were seen, including long and
      synthetic division. Some students made algebraic or arithmetic errors in their
      calculations.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [18, 20, 23, 39],
  average: 1.9,
  comment: (
    <>
      The graph needed to have both asymptotes, <Katex tex="x=1" /> and <Katex tex="y=x+2" />,
      correct and labelled. While the axial intercepts did not need to be labelled, the graph
      line needed to pass through the correct points.
      <br />
      Some graphs did not display asymptotic behaviour, retreating from the asymptotes. The
      oblique asymptote <Katex tex="y=x+2" /> was sometimes missing, even when a graph with
      reasonable asymptotic behaviour was drawn.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+x-6 = x(x-1)+2(x-1)-4" />,
    reason: <>To divide by <Katex tex="x-1" />, write the numerator as multiples of <Katex tex="(x-1)" />. To get the <Katex tex="x^2" /> term use <Katex tex="x(x-1)=x^2-x" />; to then reach <Katex tex="+x" /> you need <Katex tex="2x" /> more, so add <Katex tex="2(x-1)=2x-2" />. That makes <Katex tex="x^2+x-2" />, which is <Katex tex="4" /> more than <Katex tex="x^2+x-6" />, so subtract <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x(x-1)}{x-1}+\frac{2(x-1)}{x-1}-\frac{4}{x-1}" />,
    reason: <>Split into three fractions over <Katex tex="x-1" />: the first two cancel to <Katex tex="x" /> and <Katex tex="2" />. Long division gives the same result.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x+2-\frac{4}{x-1}}" />,
    reason: <>Check by recombining over <Katex tex="x-1" />: <Katex tex="(x+2)(x-1)-4=x^2+x-2-4=x^2+x-6" /> ✓. The quotient <Katex tex="x+2" /> becomes the oblique asymptote in part b. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x-1 = 0 \implies x = 1 \ \text{(vertical asymptote)}" />,
    reason: <><Katex tex="f" /> is undefined where the denominator is <Katex tex="0" />. At <Katex tex="x=1" /> the numerator is <Katex tex="1+1-6=-4\ne0" />, so the graph has a vertical asymptote there (not just a hole).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x\to\pm\infty \implies \tfrac{4}{x-1}\to0\\&\implies y = x+2 \ \text{(oblique asymptote)}\end{aligned}" />,
    reason: <>From part a, <Katex tex="f(x)" /> is <Katex tex="x+2" /> plus the extra piece <Katex tex="-\tfrac{4}{x-1}" />. As <Katex tex="x" /> gets large in either direction that piece shrinks to <Katex tex="0" />, so the graph gets closer and closer to the line <Katex tex="y=x+2" />. Both asymptotes must be drawn and labelled with their equations; the report notes the oblique asymptote was sometimes missing.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f(x) = 0 &\implies x^2+x-6 = 0\\ &\implies (x+3)(x-2) = 0\\ &\implies x = -3 \ \text{or} \ x = 2\end{aligned}" />,
    reason: <>A fraction is <Katex tex="0" /> only when its numerator is <Katex tex="0" /> (and its denominator is not). Neither <Katex tex="-3" /> nor <Katex tex="2" /> is <Katex tex="1" />, so both are valid. One intercept on each branch: <Katex tex="x=-3" /> is left of the asymptote <Katex tex="x=1" />, and <Katex tex="x=2" /> is right of it.</>,
  },
  {
    working: <Katex display tex="f(0) = \frac{-6}{-1} = 6 \implies (0,\,6)" />,
    reason: <>The <Katex tex="y" />-intercept, on the left branch.</>,
  },
  {
    working: <Katex display tex="f'(x) = 1+\frac{4}{(x-1)^2} > 0 \ \text{ for all } x\ne1" />,
    reason: <>Differentiate the part a form: the derivative of <Katex tex="-4(x-1)^{-1}" /> is <Katex tex="4(x-1)^{-2}" />, which is positive because <Katex tex="(x-1)^2>0" />. So <Katex tex="f'(x)>0" />: there are no stationary points, and each branch is increasing from left to right.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x<1&: \ -\tfrac{4}{x-1}>0 \implies \textbf{above} \ y=x+2\\ x>1&: \ -\tfrac{4}{x-1}<0 \implies \textbf{below} \ y=x+2\end{aligned}" />,
    reason: <>The gap from the curve to the line is <Katex tex="f(x)-(x+2)=-\tfrac{4}{x-1}" />. For <Katex tex="x<1" /> the denominator is negative, so the gap is positive; for <Katex tex="x>1" /> it is negative. The gap is never <Katex tex="0" />, so neither branch crosses the line, and its size shrinks as <Katex tex="x" /> moves away from <Katex tex="1" />, so each branch keeps closing in on the line. The report notes some graphs instead retreated from the asymptotes.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x\to1^-&: \ f(x)\to+\infty\\ x\to1^+&: \ f(x)\to-\infty\end{aligned}" />,
    reason: <>Near <Katex tex="x=1" /> the denominator <Katex tex="x-1" /> is tiny, so <Katex tex="-\tfrac{4}{x-1}" /> is huge. Just left of <Katex tex="1" /> it is large and positive (for example, <Katex tex="f(0.9)=42.9" />); just right of <Katex tex="1" /> it is large and negative. So the left branch climbs up beside <Katex tex="x=1" /> and the right branch drops down beside it.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The answer on VCAA's grid (x from about −5.7 to 5.7, y from −5 to 11): two increasing branches either side of the dashed vertical asymptote x = 1, the left branch above the dashed oblique asymptote y = x + 2 passing through (−3, 0) and (0, 6), the right branch below it passing through (2, 0)"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>Both asymptotes labelled with their equations. The intercepts did not need labels, the report notes, but the curve must pass through them.</>,
  },
]

export default function SpecialistQ1_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
        <p>
          Consider the function <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=\dfrac{x^2+x-6}{x-1}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              A rational function whose numerator is one degree higher than its denominator has
              an <em>oblique</em> asymptote: a slanted straight line the graph approaches as{' '}
              <Katex tex="x\to\pm\infty" />. Division is what reveals it. Part a. does the
              division; part b. then follows, because{' '}
              <Katex tex="f(x)=x+2-\tfrac{4}{x-1}" /> says "the line <Katex tex="y=x+2" />, plus
              an extra piece <Katex tex="-\tfrac{4}{x-1}" /> that shrinks to nothing as{' '}
              <Katex tex="x" /> gets large".
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Oblique Asymptote"
        marks={1}
        statement={
          <>
            Show that the rule for the function <Katex tex="f" /> can be written as{' '}
            <Katex tex="f(x)=x+2-\dfrac{4}{x-1}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f" /> on the axes below, labelling any
            asymptotes with their equations.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="The gap to y = x + 2 is −4/(x − 1), so each branch closes in and never retreats">
          <GapWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
