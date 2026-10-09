// 2023 Specialist Mathematics — Exam 1 Question 1 (4 marks). Dividing a quadratic over a
// linear to expose an oblique asymptote, then sketching. Question text transcribed from the
// original paper; the sketch is our own matplotlib drawing of the answer on VCAA's grid. Answers checked with sympy
// and against the VCAA examination report. Solution is original.
// Widget (part b): interactives/spec-2023e1-q1b-gap.tsx — slide a probe along the curve to see the
// gap to y = x + 2 is −4/(x − 1), so each branch closes in on its asymptotes and never retreats.
// Concise/Detailed pass (Oct 2026): alternative methods, checks and the report's two errors
// (retreating branches, missing y = x + 2) sit in each row's `more`; reasons stand alone.

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
    reason: <>To divide by <Katex tex="x-1" />, rewrite the numerator using multiples of <Katex tex="(x-1)" />. Start with <Katex tex="x(x-1)=x^2-x" /> for the <Katex tex="x^2" /> term; you need <Katex tex="+x" />, not <Katex tex="-x" />, which is <Katex tex="2x" /> more, so add <Katex tex="2(x-1)=2x-2" />. That gives <Katex tex="x^2+x-2" />, which is <Katex tex="4" /> more than <Katex tex="x^2+x-6" />, so subtract <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x(x-1)}{x-1}+\frac{2(x-1)}{x-1}-\frac{4}{x-1}" />,
    reason: <>Divide each piece by <Katex tex="x-1" />, giving three fractions.</>,
    more: <>Long division (or synthetic division) gives the same result: quotient <Katex tex="x+2" />, remainder <Katex tex="-4" />, so <Katex tex="f(x)=x+2+\tfrac{-4}{x-1}" />. Use whichever method you are fastest and most accurate with.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x+2-\frac{4}{x-1}}" />,
    reason: <>The first two fractions cancel to <Katex tex="x" /> and <Katex tex="2" />. As required.</>,
    more: <>The report notes some students made algebraic or arithmetic errors, so check by recombining over <Katex tex="x-1" />: <Katex tex="(x+2)(x-1)-4=x^2+x-2-4=x^2+x-6" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x-1 = 0 \implies x = 1 \ \text{(vertical asymptote)}" />,
    reason: <><Katex tex="f" /> is undefined where the denominator is <Katex tex="0" />. At <Katex tex="x=1" /> the numerator is <Katex tex="1+1-6=-4\ne0" />, so the graph has a vertical asymptote there.</>,
    more: <>If the numerator had also been <Katex tex="0" /> at <Katex tex="x=1" />, the factor <Katex tex="(x-1)" /> would cancel, and the graph would just have a hole (one missing point) instead of an asymptote.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x\to\pm\infty \implies \tfrac{4}{x-1}\to0\\&\implies y = x+2 \ \text{(oblique asymptote)}\end{aligned}" />,
    reason: <>From part a, <Katex tex="f(x)" /> is <Katex tex="x+2" /> plus the extra piece <Katex tex="-\tfrac{4}{x-1}" />. As <Katex tex="x" /> gets large in either direction that piece shrinks to <Katex tex="0" />, so the graph gets closer and closer to the line <Katex tex="y=x+2" />.</>,
    more: <>The report notes <Katex tex="y=x+2" /> was sometimes missing, even on graphs with reasonable asymptotic behaviour. The question asks for any asymptotes, and a slanted line counts. Draw it as a dashed line labelled with its equation, just like <Katex tex="x=1" />, before you draw the curve: then each branch has a line to close in on.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f(x) = 0 &\implies x^2+x-6 = 0\\ &\implies (x+3)(x-2) = 0\\ &\implies x = -3 \ \text{or} \ x = 2\end{aligned}" />,
    reason: <>A fraction is <Katex tex="0" /> only when its numerator is <Katex tex="0" /> (and its denominator is not); neither <Katex tex="-3" /> nor <Katex tex="2" /> is <Katex tex="1" />, so both count. <Katex tex="x=-3" /> is left of the asymptote <Katex tex="x=1" /> and <Katex tex="x=2" /> is right of it: one intercept on each branch.</>,
  },
  {
    working: <Katex display tex="f(0) = \frac{-6}{-1} = 6 \implies (0,\,6)" />,
    reason: <>The <Katex tex="y" />-intercept, on the left branch.</>,
  },
  {
    working: <Katex display tex="f'(x) = 1+\frac{4}{(x-1)^2} > 0 \ \text{ for all } x\ne1" />,
    reason: <>Differentiate the part a form: the derivative of <Katex tex="-4(x-1)^{-1}" /> is <Katex tex="4(x-1)^{-2}" />, which is positive because <Katex tex="(x-1)^2>0" />. So there are no stationary points, and each branch is increasing from left to right.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x<1&: \ -\tfrac{4}{x-1}>0 \implies \textbf{above} \ y=x+2\\ x>1&: \ -\tfrac{4}{x-1}<0 \implies \textbf{below} \ y=x+2\end{aligned}" />,
    reason: <>The gap from the curve to the line is <Katex tex="f(x)-(x+2)=-\tfrac{4}{x-1}" />: positive for <Katex tex="x<1" /> (the denominator is negative), negative for <Katex tex="x>1" />. It is never <Katex tex="0" />, and its size shrinks as <Katex tex="x" /> moves away from <Katex tex="1" />, so each branch closes in on the line without crossing it.</>,
    more: <>The report notes some graphs retreated from the asymptotes instead: picture a branch that bends away from <Katex tex="y=x+2" /> as it heads to the edge of the axes. The gap rules that out: the curve is <Katex tex="1" /> above the line at <Katex tex="x=-3" /> but only <Katex tex="0.5" /> above at <Katex tex="x=-7" />, and <Katex tex="1" /> below at <Katex tex="x=5" /> but only <Katex tex="0.5" /> below at <Katex tex="x=9" />. Draw each outer end so its distance to the dashed line visibly keeps shrinking. The interactive below lets you slide along the curve and watch the gap.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x\to1^-&: \ f(x)\to+\infty\\ x\to1^+&: \ f(x)\to-\infty\end{aligned}" />,
    reason: <>Near <Katex tex="x=1" /> the denominator <Katex tex="x-1" /> is tiny, so <Katex tex="-\tfrac{4}{x-1}" /> is huge: large and positive just left of <Katex tex="1" /> (where <Katex tex="x-1<0" />), large and negative just right of it. So the left branch climbs up beside <Katex tex="x=1" /> and the right branch drops down beside it.</>,
    more: <>For example, <Katex tex="f(0.9)=2.9+40=42.9" /> and <Katex tex="f(1.1)=3.1-40=-36.9" />. Each branch runs alongside <Katex tex="x=1" />, getting ever closer to it without touching it; a branch that curves away from <Katex tex="x=1" /> would also be retreating from an asymptote.</>,
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
    reason: <>Both asymptotes drawn and labelled with their equations. Each branch passes through its intercepts (these need not be labelled) and closes in on both asymptotes.</>,
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
              <Katex tex="x\to\pm\infty" />. Dividing the numerator by the denominator reveals
              it: the quotient is the line, and the remainder over the denominator is the part that
              dies away. Part a does the division; part b sketches from it.
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
