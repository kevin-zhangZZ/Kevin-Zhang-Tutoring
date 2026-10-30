// 2024 Mathematical Methods NHT — Exam 2, Section B Question 5 (12 marks). The NHT report gives
// sample answers only, with no statistics; it adds marking notes to part c.ii., transcribed as
// that part's report comment. Exponentials and their inverses: the inverse of f(x) = e^(−ex),
// the area bounded by f, f⁻¹ and the axes, the tangent to g₁(x) = e^(x/e) at x = e (which is
// y = x), a sketch of g₁ and its inverse touching at (e, e), the inverse of g₂(x) = e^(−4x) and
// its three intersections with g₂, and how the number of intersections of e^(ax) with its
// inverse depends on a. Question text transcribed from the original paper; the graph in b. and
// the blank axes in c.ii. are cropped from the original VCAA exam PDF at 300 dpi
// (meth-2024nhte2-q5b-graph.png, meth-2024nhte2-q5cii-blank-axes.png); the c.ii. answer is this
// site's own matplotlib sketch on that grid, measured from the crop (x and y from −4 to 6,
// gridlines every 1, square cells; meth-2024nhte2-q5cii-sketch.png). Answers checked with
// sympy/scipy and against the VCAA report's sample answers: b. (2e − 3)/e²; c.i. y = x;
// d.i. −¼log_e(x); d.ii. 0.028, 0.301, 0.894; e. a > 1/e; [−e, 0) ∪ {1/e}; a < −e.
// Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import graphSrc from './meth-2024nhte2-q5b-graph.png'
import blankAxesSrc from './meth-2024nhte2-q5cii-blank-axes.png'
import sketchSrc from './meth-2024nhte2-q5cii-sketch.png'

const EXAM_CII: SAExaminerStats = {
  comment: (
    <>
      The graphs must be drawn correctly.
      <br />
      Asymptotes must be labelled with their equations.
      <br />
      The coordinates of the point of intersection must be shown with exact values.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Inverse: } x = e^{-ey}" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" /> in <Katex tex="y=e^{-ex}" />.</>,
  },
  {
    working: <Katex display tex="\log_e(x) = -ey" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides: <Katex tex="\log_e" /> undoes <Katex tex="e^{(\,)}" />.</>,
  },
  {
    working: <Katex display tex="y = -\frac1e\log_e(x)" />,
    reason: <>Divide by <Katex tex="-e" />.</>,
  },
  {
    working: <Katex display tex="\text{dom}\,f^{-1} = \text{ran}\,f = (0,\infty)" />,
    reason: <>The domain of an inverse is the range of the original. <Katex tex="e^{-ex}" /> is always positive and takes every positive value as <Katex tex="x" /> runs over <Katex tex="R" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = -\frac1e\log_e(x), \quad x\in(0,\infty)}" />,
    reason: <>As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_0^{\frac1e} f(x)\,dx + \int_{\frac1e}^{1} f^{-1}(x)\,dx" />,
    reason: <>The shaded region lies under whichever curve is lower: <Katex tex="f" /> from <Katex tex="x=0" /> to the intersection at <Katex tex="x=\tfrac1e" />, then <Katex tex="f^{-1}" /> from there to its <Katex tex="x" />-intercept at <Katex tex="x=1" /> (<Katex tex="\log_e(1)=0" />). Split at the intersection.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int_0^{\frac1e} e^{-ex}\,dx &= \left[-\frac1e e^{-ex}\right]_0^{\frac1e}\\ &= -\frac1e e^{-1}+\frac1e = \frac1e-\frac1{e^2}\end{aligned}" />,
    reason: <>The antiderivative of <Katex tex="e^{kx}" /> is <Katex tex="\tfrac1k e^{kx}" />, here with <Katex tex="k=-e" />.</>,
  },
  {
    working: <Katex display tex="\int_{\frac1e}^{1} -\frac1e\log_e(x)\,dx = -\frac1e\Big[x\log_e(x)-x\Big]_{\frac1e}^{1}" />,
    reason: <>The antiderivative of <Katex tex="\log_e(x)" /> is <Katex tex="x\log_e(x)-x" />.</>,
    more: <>You can confirm it by differentiating: the product rule gives <Katex tex="\log_e(x)+x\cdot\tfrac1x-1=\log_e(x)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= -\frac1e\left[(0-1)-\left(-\frac1e-\frac1e\right)\right]\\ &= -\frac1e\left(-1+\frac2e\right) = \frac1e-\frac2{e^2}\end{aligned}" />,
    reason: <>At <Katex tex="x=\tfrac1e" />, <Katex tex="\log_e\!\left(\tfrac1e\right)=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac2e-\frac3{e^2} = \frac{2e-3}{e^2}}" />,
    reason: <>Add the two pieces. Exact, as asked.</>,
    more: <>About 0.33. The region fits inside the unit square, touching the axes at <Katex tex="(0,1)" /> and <Katex tex="(1,0)" />, and is roughly a triangle with a sagging hypotenuse, so a bit under a half is sensible. The two pieces are different sizes even though the curves are reflections: the reflection of the first piece is the region <em>beside</em> <Katex tex="f^{-1}" />, not under it.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="g_1(x) = e^{\frac xe}, \qquad g_1'(x) = \frac1e e^{\frac xe}" />,
    reason: <>The derivative of <Katex tex="e^{kx}" /> is <Katex tex="ke^{kx}" />, with <Katex tex="k=a=\tfrac1e" />.</>,
  },
  {
    working: <Katex display tex="g_1(e) = e^1 = e, \qquad g_1'(e) = \frac1e\cdot e = 1" />,
    reason: <>The point of contact is <Katex tex="(e,e)" /> and the gradient there is 1.</>,
  },
  {
    working: <Katex display tex="y-e = 1(x-e)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x}" />,
    reason: <>The tangent at <Katex tex="x=e" /> is the line <Katex tex="y=x" /> itself.</>,
    more: <>This is the key to part c.ii.: <Katex tex="g_1" /> touches <Katex tex="y=x" /> at <Katex tex="(e,e)" /> without crossing it, so its inverse, the reflection in <Katex tex="y=x" />, touches the same line at the same point. The two graphs meet only there.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="g_1^{-1}(x) = e\log_e(x), \quad x>0" />,
    reason: <>Swap and solve: <Katex tex="x=e^{y/e}\implies \tfrac ye=\log_e(x)" />.</>,
  },
  {
    working: <Katex display tex="g_1: \text{ asymptote } y=0, \ y\text{-intercept } (0,1)" />,
    reason: <><Katex tex="e^{x/e}\to0" /> as <Katex tex="x\to-\infty" />, and <Katex tex="e^0=1" />.</>,
  },
  {
    working: <Katex display tex="g_1^{-1}: \text{ asymptote } x=0, \ x\text{-intercept } (1,0)" />,
    reason: <>Reflecting in <Katex tex="y=x" /> turns the horizontal asymptote into a vertical one and swaps the intercept&apos;s coordinates.</>,
  },
  {
    working: <Katex display tex="\text{intersection } (e,\ e)" />,
    reason: <>From part c.i.: both graphs touch <Katex tex="y=x" /> at <Katex tex="(e,e)" />, and nowhere else. Label it with exact values, not <Katex tex="(2.72,2.72)" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's sketch on VCAA's grid: y = g₁(x) = e^(x/e) in blue, rising from just above the dashed asymptote y = 0 on the left through (0, 1); its inverse y = e·log_e(x) in orange, rising from the dashed asymptote x = 0 through (1, 0); the two curves touch at the labelled point (e, e)"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>Both graphs, the asymptotes labelled <Katex tex="y=0" /> and <Katex tex="x=0" />, and the point <Katex tex="(e,e)" />, as asked.</>,
    more: <>Draw the two curves just touching at <Katex tex="(e,e)" />, not crossing: for <Katex tex="x>e" /> the exponential is above, and for <Katex tex="0<x<e" /> it is still above. The exponential leaves the grid at the top near <Katex tex="x=e\log_e(6)\approx4.9" />, and the logarithm leaves at the bottom near <Katex tex="x=e^{-4/e}\approx0.23" />.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="x = e^{-4y} \implies \log_e(x) = -4y" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />, then take <Katex tex="\log_e" /> of both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{g_2^{-1}(x) = -\frac14\log_e(x)}" />,
    reason: <>Same pattern as part a. with <Katex tex="-4" /> in place of <Katex tex="-e" />. Its domain is <Katex tex="(0,\infty)" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(e^(−4x) = −¼·ln(x), x)</Cas>,
    reason: <>Set the function equal to its inverse. There is no algebraic way to solve this, so use technology. Graph both first to see how many solutions to expect. Solving <Katex tex="e^{-4x}=x" /> is not enough here: for a decreasing function, the graph and its inverse can also meet at pairs of points off the line <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="x = 0.02797\ldots,\ \ 0.30054\ldots,\ \ 0.89414\ldots" />,
    reason: <>CAS gives three solutions, matching the three crossings you see when you graph both.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0.028,\ \ 0.301,\ \ 0.894}" />,
    reason: <>Correct to three decimal places.</>,
    more: <>A check on the outer pair: <Katex tex="g_2(0.028)=e^{-0.112}\approx0.894" /> and <Katex tex="g_2(0.894)\approx0.028" />, so the points <Katex tex="(0.028,0.894)" /> and <Katex tex="(0.894,0.028)" /> are reflections of each other in <Katex tex="y=x" />. The middle one is on <Katex tex="y=x" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="a>0: \ \text{intersections lie on } y=x" />,
    reason: <>For <Katex tex="a>0" /> the function is increasing, and an increasing function can only meet its inverse on <Katex tex="y=x" />. So count the solutions of <Katex tex="e^{ax}=x" />.</>,
  },
  {
    working: <Katex display tex="a=\tfrac1e: \ 1 \qquad a>\tfrac1e: \ 0" />,
    reason: <>Part c. showed <Katex tex="a=\tfrac1e" /> is the borderline case, where <Katex tex="e^{ax}" /> just touches <Katex tex="y=x" />. A larger <Katex tex="a" /> makes the exponential steeper and lifts it clear of the line; a smaller one (the given row) lets it cross twice.</>,
  },
  {
    working: <Katex display tex="a<0: \ \text{exactly one point on } y=x" />,
    reason: <>A decreasing exponential falls from <Katex tex="+\infty" /> to 0 as <Katex tex="x" /> goes from <Katex tex="-\infty" /> to <Katex tex="+\infty" />, so it crosses <Katex tex="y=x" /> exactly once.</>,
  },
  {
    working: <Katex display tex="a<-e: \ 3 \qquad -e\le a<0: \ 1" />,
    reason: <>Extra pairs of points off <Katex tex="y=x" /> appear when the graph crosses <Katex tex="y=x" /> more steeply than gradient <Katex tex="-1" />. Part b. (<Katex tex="a=-e" />) has a unique intersection, and part d.ii. (<Katex tex="a=-4<-e" />) has three.</>,
    more: <>Where <Katex tex="e^{ax}" /> crosses <Katex tex="y=x" /> at <Katex tex="x_0" />, its gradient is <Katex tex="ae^{ax_0}=ax_0" />. The borderline gradient <Katex tex="-1" /> gives <Katex tex="x_0=-\tfrac1a" />, and substituting into <Katex tex="e^{ax_0}=x_0" /> gives <Katex tex="e^{-1}=-\tfrac1a" />, so <Katex tex="a=-e" />. This is exactly part a.&apos;s <Katex tex="f(x)=e^{-ex}" />: it crosses <Katex tex="y=x" /> at <Katex tex="\left(\tfrac1e,\tfrac1e\right)" /> with gradient <Katex tex="-1" />, and its inverse is tangent to it there (the dashed and solid curves in part b.&apos;s graph just touch). A slider on <Katex tex="a" /> in a CAS graph shows the same thing.</>,
  },
  {
    working: (
      <table className="border-collapse text-[14px]">
        <thead>
          <tr>
            <th className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">Number of points of intersection</th>
            <th className="border border-gray-400 dark:border-gray-600 px-4 py-1.5">Value(s) of <Katex tex="a" /></th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-center">0</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5"><Katex tex="a>\tfrac1e" /></td></tr>
          <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-center">1</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5"><Katex tex="a\in[-e,0)\cup\left\{\tfrac1e\right\}" /></td></tr>
          <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-center">2</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5"><Katex tex="0<a<\tfrac1e" /> (given)</td></tr>
          <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-center">3</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5"><Katex tex="a<-e" /></td></tr>
        </tbody>
      </table>
    ),
    reason: <>The completed table. Remember <Katex tex="a\ne0" />, so <Katex tex="0" /> is left out of the &ldquo;1&rdquo; row, and <Katex tex="a=-e" /> belongs there, not with 3.</>,
    more: <>VCAA writes <Katex tex="\tfrac1e" /> as <Katex tex="e^{-1}" /> in the &ldquo;1&rdquo; row.</>,
  },
]

export default function MethodsQ5_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (12 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=e^{-ex}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The whole question is about where <Katex tex="y=e^{ax}" /> meets its inverse. A graph and
              its inverse are mirror images in <Katex tex="y=x" />, so they always meet on that line;
              an increasing function meets its inverse <em>only</em> there. A decreasing one can also
              meet it at pairs of mirror-image points off the line, which is why part d.ii. has three
              answers.
            </p>
            <p>
              Parts a.–c. are the two borderline cases: <Katex tex="a=-e" /> (part a.) and{' '}
              <Katex tex="a=\tfrac1e" /> (part c.). Part e. puts them together.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Inverse Function"
        marks={2}
        statement={
          <>
            Show that the rule and domain for <Katex tex="f^{-1}" />, the inverse function of{' '}
            <Katex tex="f" />, is
            <Katex display tex="f^{-1}(x)=-\frac1e\log_e(x)" />
            where <Katex tex="x\in(0,\infty)" />
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            The graphs of <Katex tex="f" /> and <Katex tex="f^{-1}" /> are shown below. Their unique
            intersection point <Katex tex="\left(\tfrac1e,\tfrac1e\right)" /> is also labelled.
            <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={graphSrc}
                alt="The graphs of f (solid) through (0, 1) and f⁻¹ (dashed) through (1, 0), meeting at the labelled point (1/e, 1/e); the region between the axes and the lower of the two curves is shaded — from the original VCAA exam paper"
                className="w-full max-w-[400px]"
              />
            </div>
            Find the exact area of the shaded region that is bounded by the graphs of{' '}
            <Katex tex="f" />, <Katex tex="f^{-1}" /> and the coordinate axes.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Let <Katex tex="g:R\to R,\ g(x)=e^{ax}" />, where <Katex tex="a\in R\setminus\{0\}" />.
        </p>
      </div>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          Consider the function <Katex tex="g_1(x)=e^{ax}" />, where <Katex tex="a=\tfrac1e" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Tangent Line"
        marks={1}
        statement={<>Find the equation of the tangent line to the graph of <Katex tex="y=g_1(x)" /> at <Katex tex="x=e" />.</>}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            <p>
              Sketch the graph of <Katex tex="g_1" /> and its inverse on the axes provided below. Label
              equations of asymptotes and the coordinates of the point of intersection between the two
              functions.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank axes from the original VCAA exam paper: x and y each from −4 to 6, numbered every 2, with gridlines every 1"
                className="w-full max-w-[380px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          Now let <Katex tex="a=-4" /> and consider <Katex tex="g_2(x)=e^{-4x}" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Inverse Function"
        marks={1}
        statement={<>Find the rule for <Katex tex="g_2^{-1}" />, the inverse function of <Katex tex="g_2" />.</>}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Intersections with Inverse"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="x" /> where <Katex tex="g_2" /> intersects with its inverse,
            correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Number of Solutions"
        marks={2}
        statement={
          <>
            The value of <Katex tex="a" /> determines the number of intersection points of the graphs
            of <Katex tex="g" /> and <Katex tex="g^{-1}" />.
            <br />
            Complete the following table by stating the value(s) of <Katex tex="a" /> in each case.
            <table className="mt-3 border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className="border border-gray-400 dark:border-gray-600 px-3 py-1.5">Number of points of intersection</th>
                  <th className="border border-gray-400 dark:border-gray-600 px-4 py-1.5">Value(s) of <Katex tex="a" /></th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-center">0</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5">&nbsp;</td></tr>
                <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-center">1</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5">&nbsp;</td></tr>
                <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-center">2</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5 text-center"><Katex tex="0<a<\tfrac1e" /></td></tr>
                <tr><td className="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-center">3</td><td className="border border-gray-400 dark:border-gray-600 px-4 py-1.5">&nbsp;</td></tr>
              </tbody>
            </table>
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
