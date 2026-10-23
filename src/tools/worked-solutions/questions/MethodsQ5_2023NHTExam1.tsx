// 2023 Mathematical Methods NHT — Exam 1, Question 5 (6 marks). The NHT report gives sample
// answers only, with no statistics or comments. A linear probability density f(x) = (x + c)/2 on
// [−d, d]: total area 1 gives d = 1/c, then E(X) = 1/24 gives d = 1/2 and c = 2. Question text
// transcribed from the original paper. Answers checked with sympy and against the report's sample
// answers (d = 1/c; d = 1/2, c = 2). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-d}^{d}\frac{x+c}{2}\,dx=1" />,
    reason: <>The total area under a probability density function is 1, and <Katex tex="f" /> is zero outside <Katex tex="[-d,d]" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{2}\left[\frac{x^2}{2}+cx\right]_{-d}^{d}=1" />,
    reason: <>Take the constant <Katex tex="\tfrac12" /> outside. <Katex tex="c" /> is a constant, so <Katex tex="\int c\,dx=cx" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{2}\left[\left(\frac{d^2}{2}+cd\right)-\left(\frac{d^2}{2}-cd\right)\right]=1" />,
    reason: <>Upper terminal minus lower terminal. At <Katex tex="x=-d" />: <Katex tex="\tfrac{(-d)^2}{2}=\tfrac{d^2}{2}" /> and <Katex tex="c(-d)=-cd" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{2}(2cd)=1\implies cd=1" />,
    reason: <>The <Katex tex="\tfrac{d^2}{2}" /> terms cancel.</>,
    more: <>That cancellation is no accident: <Katex tex="\tfrac{x}{2}" /> is an odd function, so its integral over an interval symmetric about 0 is zero. Only the constant part, <Katex tex="\tfrac{c}{2}" />, contributes: a rectangle of height <Katex tex="\tfrac c2" /> and width <Katex tex="2d" />, area <Katex tex="cd" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d=\frac{1}{c}}" />,
    reason: <>Divide by <Katex tex="c" />, which is safe since <Katex tex="c\ge1" />.</>,
    more: <>Why the paper insists on <Katex tex="c\ge1" />: a density can&apos;t be negative, so <Katex tex="x+c\ge0" /> all the way down to <Katex tex="x=-d" />, which needs <Katex tex="c\ge d=\tfrac1c" />, that is, <Katex tex="c^2\ge1" />. With <Katex tex="c=1" /> the line touches zero exactly at the left end, <Katex tex="x=-1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{E}(X)=\int_{-d}^{d}x\cdot\frac{x+c}{2}\,dx=\int_{-d}^{d}\left(\frac{x^2}{2}+\frac{cx}{2}\right)dx" />,
    reason: <><Katex tex="\text{E}(X)=\int x f(x)\,dx" /> over the region where <Katex tex="f" /> is non-zero. Expand before integrating.</>,
  },
  {
    working: <Katex display tex="=\left[\frac{x^3}{6}+\frac{cx^2}{4}\right]_{-d}^{d}" />,
  },
  {
    working: <Katex display tex="=\left(\frac{d^3}{6}+\frac{cd^2}{4}\right)-\left(-\frac{d^3}{6}+\frac{cd^2}{4}\right)=\frac{d^3}{3}" />,
    reason: <>At <Katex tex="x=-d" />, <Katex tex="(-d)^3=-d^3" /> but <Katex tex="(-d)^2=d^2" />. This time it is the <Katex tex="c" /> terms that cancel.</>,
    more: <>Same symmetry idea as part a., the other way round: <Katex tex="\tfrac{cx}{2}" /> is odd and integrates to zero over <Katex tex="[-d,d]" />, while <Katex tex="\tfrac{x^2}{2}" /> is even and doubles.</>,
  },
  {
    working: <Katex display tex="\frac{d^3}{3}=\frac{1}{24}\implies d^3=\frac{1}{8}\implies d=\frac{1}{2}" />,
    reason: <>Set the mean equal to the given <Katex tex="\tfrac{1}{24}" />. The cube root of <Katex tex="\tfrac18" /> is <Katex tex="\tfrac12" />, and a cube has only one real root.</>,
  },
  {
    working: <Katex display tex="c=\frac{1}{d}=2" />,
    reason: <>From part a., <Katex tex="cd=1" />.</>,
    more: <>The report also works with <Katex tex="c" /> directly: substituting <Katex tex="d=\tfrac1c" /> gives <Katex tex="\tfrac{1}{3c^3}=\tfrac{1}{24}" />, so <Katex tex="c^3=8" /> and <Katex tex="c=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c=2,\quad d=\frac{1}{2}}" />,
    reason: <>Check against the conditions: <Katex tex="c=2\ge1" /> ✓. With these values <Katex tex="f(x)=\tfrac{x+2}{2}" /> on <Katex tex="\left[-\tfrac12,\tfrac12\right]" />, which runs from <Katex tex="\tfrac34" /> up to <Katex tex="\tfrac54" />: never negative, and its area is <Katex tex="1\times1=1" /> (average height 1, width 1) ✓.</>,
    more: <>Does a small positive mean make sense? The density slopes upward, so slightly more probability sits right of 0 than left, nudging the mean just above the centre of <Katex tex="\left[-\tfrac12,\tfrac12\right]" />: <Katex tex="\tfrac{1}{24}\approx0.04" /> ✓.</>,
  },
]

export default function MethodsQ5_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (6 marks)</p>
        <p>
          Consider a continuous random variable <Katex tex="X" /> with probability density function <Katex tex="f" /> given by
        </p>
        <Katex display tex="f(x)=\begin{cases}\dfrac{x+c}{2} & -d\le x\le d\\[2mm] 0 & \text{elsewhere}\end{cases}" />
        <p>
          where <Katex tex="c,d\in R" /> and <Katex tex="c\ge1" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Probability Density Function"
        marks={3}
        statement={
          <>
            Find <Katex tex="d" /> in terms of <Katex tex="c" />.
          </>
        }
      >
        <Background>
          <p>
            Any probability density function has two properties: it is never negative, and the total area under it is 1
            (the probability that <Katex tex="X" /> takes <em>some</em> value). With two unknowns, the area condition gives
            one equation linking them; part b. supplies the second.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Expected Value"
        marks={3}
        statement={
          <>
            Given that <Katex tex="\text{E}(X)=\dfrac{1}{24}" />, find the values of <Katex tex="c" /> and <Katex tex="d" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
